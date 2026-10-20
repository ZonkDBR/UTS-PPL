/* Ular Tangga Motivasi tanpa server.py.
   Versi aslinya memakai server Python (server.py) lewat WebSocket. Hosting statis seperti
   Vercel tidak bisa menjalankan server itu, jadi berkas ini menggantikannya: logika giliran,
   dadu, ular, tangga, dan kartu pertanyaan dijalankan di peramban guru (tuan rumah).
   Protokol pesannya sengaja sama persis dengan server.py.

   Dua mode:
   - Satu perangkat: semua pemain bergantian memakai satu layar (hot seat).
   - Banyak HP: tiap murid ikut dari HP sendiri. Pesan diteruskan lewat Apinator
     (client events di channel private-ut-<KODE>); /api/apinator-auth menandatangani
     langganannya. Guru yang membuat ruangan menjadi "server", jadi layarnya harus tetap
     terbuka selama permainan.
   ponytail: tuan rumah di peramban; kalau layar guru tertutup permainan berhenti.
   Pindahkan logika ke proses hidup (Render/Fly) bila itu jadi masalah. */
(function () {
  'use strict';

  var TOTAL = 48;
  var APINATOR = { key: 'app_2e1a7e688b9fbd51eba3962a210a8a1800f9599b', cluster: 'eu', auth: '/api/apinator-auth' };

  var mode = 'lokal';      // 'lokal' | 'tuan' (guru, banyak HP) | 'tamu' (murid)
  var sock = null;         // soket palsu yang dipakai index.html
  var state = null;
  var klien = {};          // id klien -> { idx, role }; 'guru' = peramban ini
  var relay = null;        // koneksi Apinator
  var kode = null;

  function freshState() {
    return {
      phase: 'lobby', players: [], cur: 0, spinning: false, rollVal: null,
      log: [], pendingMove: null, host_is_observer: false
    };
  }

  function warna(i) { return PC[i % PC.length]; }

  function keLayar(msg) {
    if (sock && sock.onmessage) sock.onmessage({ data: JSON.stringify(msg) });
  }

  /* ── Relay Apinator: klien WebSocket kecil, protokolnya mengikuti @apinator/client ── */
  function Relay(channel, onPesan, onSiap, onGagal) {
    var r = this, ws, ping;
    r.kirim = function (event, data) {
      if (ws && ws.readyState === 1) ws.send(JSON.stringify({ event: event, channel: channel, data: JSON.stringify(data) }));
    };
    try {
      ws = new AsliWebSocket('wss://ws-' + APINATOR.cluster + '.apinator.io/app/' + APINATOR.key + '?protocol=7&client=js&version=2.2.2');
    } catch (e) { onGagal(); return; }
    ws.onmessage = function (e) {
      var m; try { m = JSON.parse(e.data); } catch (x) { return; }
      var data; try { data = JSON.parse(m.data); } catch (x) { data = m.data; }
      if (m.event === 'realtime:connection_established') {
        ping = setInterval(function () { ws.send(JSON.stringify({ event: 'realtime:ping', data: '{}' })); }, 60000);
        fetch(APINATOR.auth, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ socket_id: data.socket_id, channel_name: channel })
        }).then(function (res) { if (!res.ok) throw 0; return res.json(); })
          .then(function (a) {
            ws.send(JSON.stringify({ event: 'realtime:subscribe', data: JSON.stringify({ channel: channel, auth: a.auth }) }));
          })
          .catch(onGagal);
      } else if (m.event === 'realtime:subscription_succeeded') {
        onSiap();
      } else if (m.event === 'realtime:subscription_error' || m.event === 'realtime:error') {
        onGagal();
      } else if (m.channel === channel && m.event.indexOf('client-') === 0) {
        onPesan(m.event, data);
      }
    };
    ws.onclose = function () { clearInterval(ping); if (sock) setBar('disc', '❌ Koneksi terputus, muat ulang halaman'); };
  }

  /* ── Pengiriman dari tuan rumah ── */
  // Pesan untuk layar ini dipersonalisasi: di satu perangkat pemain yang sedang mendapat
  // giliran selalu "saya" supaya tombol dadu dan kartunya aktif.
  function personal(msg, idx, role) {
    msg = JSON.parse(JSON.stringify(msg));
    if (msg.type === 'state') { msg.my_idx = idx; msg.role = role; }
    if (msg.type === 'show_modal') msg.is_active = idx === state.cur;
    return msg;
  }

  function kirimKe(id, msg) {
    if (id === 'guru') {
      var g = klien.guru || {};
      keLayar(personal(msg, mode === 'lokal' ? state.cur : g.idx, 'host'));
    } else if (relay) {
      relay.kirim('client-pesan', { to: id, msg: msg });
    }
  }

  function siar(msg) {
    kirimKe('guru', msg);
    if (mode === 'tuan' && relay) relay.kirim('client-pesan', { to: '*', msg: msg });
  }

  function siarState() {
    state.log = state.log.slice(0, 30);   // batas ukuran pesan Apinator
    siar({ type: 'state', state: state });
  }

  function siarLobby() {
    siar({ type: 'lobby_update', players: state.players, host_is_observer: state.host_is_observer });
  }

  /* ── Logika permainan (pengganti server.py) ── */
  function tambahPemain(nama) {
    if (state.players.length >= 6) return -1;
    state.players.push({ name: nama, pos: 0, col: warna(state.players.length) });
    return state.players.length - 1;
  }

  function tujuanKhusus(dest) {
    if (SNAKES[dest] !== undefined) return { kind: 'snake', from: dest, to: SNAKES[dest] };
    if (LADDERS[dest] !== undefined) return { kind: 'ladder', from: dest, to: LADDERS[dest] };
    if (SPECIAL[dest] !== undefined) {
      var s = SPECIAL[dest];
      var to = s.move > 0 ? Math.min(TOTAL, dest + s.move) : Math.max(1, dest + s.move);
      return { kind: s.type === 'b' ? 'bonus' : 'penalty', from: dest, to: to };
    }
    if (Q[dest] !== undefined) return { kind: 'question', from: dest, to: dest };
    return null;
  }

  function giliranBerikutnya() {
    state.spinning = false;
    state.cur = (state.cur + 1) % state.players.length;
    state.log.unshift('🔄 Giliran ' + state.players[state.cur].name);
  }

  function tangani(m, dari) {
    if (m.action === 'create') {
      state = freshState();
      klien = { guru: { idx: null, role: 'host' } };
      kirimKe('guru', { type: 'created', room: mode === 'lokal' ? 'SATU PERANGKAT' : kode, role: 'host', state: state });
      return;
    }
    if (!state) return;
    var k = klien[dari];
    var giliranku = mode === 'lokal' || (k && k.idx === state.cur);

    if (m.action === 'host_role' && dari === 'guru') {
      var idx = m.role_choice === 'play' ? tambahPemain(m.name || 'Guru') : -1;
      state.host_is_observer = idx < 0;
      klien.guru.idx = idx < 0 ? null : idx;
      kirimKe('guru', { type: 'host_role_set', role: m.role_choice, my_idx: klien.guru.idx, state: state });
      return;
    }

    if (m.action === 'join') {
      var nama = String(m.name || 'Pemain').slice(0, 20);
      // nama yang sama dianggap pemain yang memuat ulang halaman, bukan pemain baru
      var ada = state.players.findIndex(function (p) { return p.name === nama; });
      if (ada < 0 && state.phase !== 'lobby') {
        kirimKe(dari, { type: 'error', msg: 'Permainan sudah dimulai.' });
        return;
      }
      var i = ada >= 0 ? ada : tambahPemain(nama);
      if (i < 0) { kirimKe(dari, { type: 'error', msg: 'Pemain sudah enam, tidak bisa ditambah lagi.' }); return; }
      if (dari !== 'guru') {
        klien[dari] = { idx: i, role: 'player' };
        kirimKe(dari, { type: 'joined', room: kode, my_idx: i, state: state });
      }
      siarLobby();
      return;
    }

    if (m.action === 'set_name') {
      var p = state.players[mode === 'lokal' ? state.players.length - 1 : (k && k.idx)];
      if (p && m.name) p.name = String(m.name).slice(0, 20);
      siarLobby();
      if (state.phase !== 'lobby') siarState();
      return;
    }

    if (m.action === 'start' && dari === 'guru') {
      if (!state.players.length) { kirimKe('guru', { type: 'error', msg: 'Tambahkan pemain dulu.' }); return; }
      state.phase = 'playing';
      // di satu perangkat tidak ada pengamat terpisah: layar yang sama dipakai bergantian
      if (mode === 'lokal') state.host_is_observer = false;
      state.cur = 0;
      state.spinning = false;
      state.pendingMove = null;
      state.log = ['🎮 Game dimulai! Giliran ' + state.players[0].name];
      siarState();
      return;
    }

    if (m.action === 'roll') {
      if (!giliranku || state.spinning || state.phase !== 'playing') return;
      state.spinning = true;
      state.rollVal = 1 + Math.floor(Math.random() * 6);
      siar({ type: 'rolled', value: state.rollVal, state: state });
      return;
    }

    // semua layar menganimasikan dadu lalu mengirim 'move'; hanya milik pemain aktif dipakai
    if (m.action === 'move') {
      if (!giliranku || m.value !== state.rollVal) return;
      state.rollVal = null;
      var pemain = state.players[state.cur];
      var dest = pemain.pos + m.value;
      state.log.unshift('🎲 <b>' + pemain.name + '</b> melempar ' + m.value);
      if (dest > TOTAL) {
        state.log.unshift('⛔ ' + pemain.name + ' butuh tepat ' + TOTAL + '. Diam.');
        giliranBerikutnya();
        siarState();
        return;
      }
      pemain.pos = dest;
      state.log.unshift('🚶 ' + pemain.name + ' ke kotak ' + dest);
      if (dest === TOTAL) {
        state.phase = 'finished';
        state.winner = state.cur;
        siarState();
        return;
      }
      state.pendingMove = tujuanKhusus(dest);
      if (!state.pendingMove) giliranBerikutnya();
      siarState();
      if (state.pendingMove) siar({ type: 'show_modal', pendingMove: state.pendingMove });
      return;
    }

    if (m.action === 'ack_modal') {
      var pm = state.pendingMove;
      if (!giliranku || !pm) return;
      var pl = state.players[state.cur];
      if (pm.kind !== 'question') {
        pl.pos = pm.to;
        var ikon = { snake: '🐍', ladder: '🪜', bonus: '⭐', penalty: '😬' }[pm.kind];
        state.log.unshift(ikon + ' ' + pl.name + ' → kotak ' + pm.to);
        if (pl.pos === TOTAL) {
          state.phase = 'finished';
          state.winner = state.cur;
          state.pendingMove = null;
          siarState();
          return;
        }
      }
      state.pendingMove = null;
      giliranBerikutnya();
      siarState();
      return;
    }

    if (m.action === 'restart' && dari === 'guru') {
      state = freshState();
      siar({ type: 'restart' });
    }
  }

  /* ── Soket palsu untuk index.html ── */
  function Soket() {
    this.readyState = 1;
    var s = this;
    setTimeout(function () { if (s.onopen) s.onopen(); }, 0);
  }
  Soket.prototype.close = function () { this.readyState = 3; };

  // Guru (satu perangkat maupun banyak HP): pesan langsung ke logika di atas.
  Soket.prototype.send = function (raw) {
    var m; try { m = JSON.parse(raw); } catch (e) { return; }
    if (mode === 'tamu') { kirimTamu(m); return; }
    if (m.action === 'create' && mode === 'tuan') { bukaRuangan(m); return; }
    tangani(m, 'guru');
  };

  function bukaRuangan(m) {
    var huruf = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    kode = '';
    for (var i = 0; i < 5; i++) kode += huruf[Math.floor(Math.random() * huruf.length)];
    setBar('wait', '🔄 Membuka ruangan...');
    relay = new Relay('private-ut-' + kode,
      function (event, d) { if (event === 'client-aksi' && d && d.from && d.m) tangani(d.m, d.from); },
      function () { setBar('conn', '✅ Ruangan terbuka'); tangani(m, 'guru'); },
      gagalOnline);
  }

  /* ── Murid: aksi diteruskan ke guru, pesan guru diteruskan ke layar ── */
  var idSaya = Math.random().toString(36).slice(2, 10);
  var idxSaya = null, antre = [], siap = false, tungguJoin = null;

  function kirimTamu(m) {
    if (m.action === 'join' && !relay) {
      kode = String(m.room || '').toUpperCase();
      relay = new Relay('private-ut-' + kode, terimaTamu, function () {
        siap = true;
        antre.forEach(kirimTamu);
        antre = [];
      }, gagalOnline);
      tungguJoin = setTimeout(function () {
        showToast('❌ Ruangan ' + kode + ' tidak ditemukan');
        setTimeout(function () { location.reload(); }, 2500);
      }, 8000);
    }
    if (!siap) { antre.push(m); return; }
    relay.kirim('client-aksi', { from: idSaya, m: m });
  }

  function terimaTamu(event, d) {
    if (event !== 'client-pesan' || !d || !d.msg || (d.to !== '*' && d.to !== idSaya)) return;
    var msg = d.msg;
    if (msg.type === 'joined') { idxSaya = msg.my_idx; clearTimeout(tungguJoin); }
    if (msg.type === 'restart') { location.reload(); return; }
    if (idxSaya === null) return;   // belum masuk ruangan: abaikan siaran
    if (msg.type === 'state') { state = msg.state; msg.my_idx = idxSaya; msg.role = 'player'; }
    if (msg.type === 'rolled') state = msg.state;
    if (msg.type === 'show_modal') msg.is_active = state && idxSaya === state.cur;
    keLayar(msg);
  }

  function gagalOnline() {
    showToast('❌ Mode banyak HP tidak tersambung, pakai satu perangkat');
    setTimeout(function () { location.reload(); }, 3000);
  }

  var AsliWebSocket = window.WebSocket;
  window.WebSocket = function () { sock = new Soket(); return sock; };

  /* ── Penyesuaian tampilan ── */
  var buatAsli = window.goCreateRoom, joinAsli = window.submitJoin;
  window.goCreateRoom = function () { mode = 'tuan'; buatAsli(); };
  window.submitJoin = function () { mode = 'tamu'; joinAsli(); };
  function mainSatuPerangkat() { mode = 'lokal'; siapkanLobbyLokal(); buatAsli(); }

  function siapkanBeranda() {
    var btns = document.querySelector('#home-screen .home-btns');
    var buat = btns && btns.querySelector('.btn-primary');
    if (buat) buat.textContent = '✨ Buat Ruangan (tiap murid pakai HP sendiri)';
    if (!btns || document.getElementById('satu-perangkat-btn')) return;
    var div = document.createElement('div');
    div.className = 'or-div';
    div.textContent = 'atau tanpa internet';
    var b = document.createElement('button');
    b.className = 'btn btn-teal';
    b.id = 'satu-perangkat-btn';
    b.type = 'button';
    b.textContent = '📱 Main Bergantian di Satu Perangkat';
    b.addEventListener('click', mainSatuPerangkat);
    btns.appendChild(div);
    btns.appendChild(b);
  }

  function siapkanLobbyLokal() {
    var lh = document.querySelector('#lobby-screen .lobby-header p');
    if (lh) lh.textContent = 'Tambahkan nama pemain, lalu mulai permainan';
    var badge = document.querySelector('#lobby-screen .room-badge .rc-label');
    if (badge) badge.textContent = 'Mode';
    var code = document.getElementById('lobby-code');
    if (code) code.style.fontSize = '1rem';

    var aksi = document.querySelector('#lobby-screen .lobby-actions');
    if (!aksi || document.getElementById('tambah-pemain-row')) return;
    var row2 = document.createElement('div');
    row2.className = 'join-row';
    row2.id = 'tambah-pemain-row';
    row2.style.marginBottom = '14px';
    row2.innerHTML =
      '<input class="inp" id="tambah-pemain-nama" type="text" maxlength="14" placeholder="Nama pemain" autocomplete="off">' +
      '<button class="btn btn-teal btn-sm" type="button" id="tambah-pemain-btn">Tambah</button>';
    aksi.parentNode.insertBefore(row2, aksi);

    var input = document.getElementById('tambah-pemain-nama');
    function tambah() {
      var nama = input.value.trim();
      if (!nama) { showToast('Tulis nama pemainnya dulu!'); return; }
      sock.send(JSON.stringify({ action: 'join', name: nama }));
      input.value = '';
      input.focus();
    }
    document.getElementById('tambah-pemain-btn').addEventListener('click', tambah);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tambah(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', siapkanBeranda);
  } else {
    siapkanBeranda();
  }
})();
