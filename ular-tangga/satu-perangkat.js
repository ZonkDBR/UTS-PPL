/* Ular Tangga Motivasi, versi satu perangkat.
   Versi aslinya memakai server Python (server.py) lewat WebSocket supaya tiap murid
   bisa ikut dari HP masing-masing. Hosting statis seperti Vercel tidak bisa menjalankan
   server itu, jadi berkas ini menggantikan servernya: logika giliran, dadu, ular, tangga,
   dan kartu pertanyaan dijalankan di dalam peramban, dan pemain bergantian memakai satu
   perangkat. Protokol pesannya sengaja dibuat sama persis dengan server.py, jadi kalau
   nanti servernya dipasang di tempat lain, cukup berkas ini yang dilepas.
   ponytail: giliran hot seat di satu perangkat; ganti dengan relay HTTP + penyimpanan
   bersama kalau multiperangkat memang dibutuhkan. */
(function () {
  'use strict';

  var TOTAL = 48;
  var sock = null;
  var state = null;

  function freshState() {
    return {
      phase: 'lobby', players: [], cur: 0, spinning: false,
      log: [], pendingMove: null, host_is_observer: false
    };
  }

  function warna(i) { return PC[i % PC.length]; }

  function kirim(msg) {
    if (sock && sock.onmessage) sock.onmessage({ data: JSON.stringify(msg) });
  }

  // Semua pemain memakai satu layar, jadi pemain yang sedang mendapat giliran selalu
  // dilaporkan sebagai "saya" supaya tombol dadu dan kartu pertanyaannya aktif. Perannya
  // tetap host supaya tombol ulangi permainan muncul di layar pemenang.
  function kirimState() {
    kirim({ type: 'state', state: state, my_idx: state.cur, role: 'host' });
  }

  function kirimLobby() {
    kirim({ type: 'lobby_update', players: state.players, host_is_observer: state.host_is_observer });
  }

  function tambahPemain(nama) {
    if (state.players.length >= 6) return false;
    state.players.push({ name: nama, pos: 0, col: warna(state.players.length) });
    return true;
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

  function tangani(m) {
    if (m.action === 'create') {
      state = freshState();
      kirim({ type: 'created', room: 'SATU PERANGKAT', role: 'host', state: state });
      return;
    }
    if (!state) return;

    if (m.action === 'host_role') {
      var idx = null;
      if (m.role_choice === 'play' && tambahPemain(m.name || 'Guru')) {
        idx = state.players.length - 1;
        state.host_is_observer = false;
      } else {
        state.host_is_observer = true;
      }
      kirim({ type: 'host_role_set', role: m.role_choice, my_idx: idx, state: state });
      return;
    }

    if (m.action === 'join') {
      if (!tambahPemain(m.name || 'Pemain')) {
        kirim({ type: 'error', msg: 'Pemain sudah enam, tidak bisa ditambah lagi.' });
        return;
      }
      kirimLobby();
      return;
    }

    if (m.action === 'set_name') {
      var p = state.players[state.players.length - 1];
      if (p && m.name) p.name = m.name;
      kirimLobby();
      return;
    }

    if (m.action === 'start') {
      if (!state.players.length) {
        kirim({ type: 'error', msg: 'Tambahkan pemain dulu.' });
        return;
      }
      state.phase = 'playing';
      // di satu perangkat tidak ada pengamat terpisah: layar yang sama dipakai bergantian
      state.host_is_observer = false;
      state.cur = 0;
      state.spinning = false;
      state.pendingMove = null;
      state.log = ['🎮 Game dimulai! Giliran ' + state.players[0].name];
      kirimState();
      return;
    }

    if (m.action === 'roll') {
      if (state.spinning || state.phase !== 'playing') return;
      state.spinning = true;
      kirim({ type: 'rolled', value: 1 + Math.floor(Math.random() * 6), state: state });
      return;
    }

    if (m.action === 'move') {
      var pemain = state.players[state.cur];
      var dest = pemain.pos + m.value;
      state.log.unshift('🎲 <b>' + pemain.name + '</b> melempar ' + m.value);
      if (dest > TOTAL) {
        state.log.unshift('⛔ ' + pemain.name + ' butuh tepat ' + TOTAL + '. Diam.');
        giliranBerikutnya();
        kirimState();
        return;
      }
      pemain.pos = dest;
      state.log.unshift('🚶 ' + pemain.name + ' ke kotak ' + dest);
      if (dest === TOTAL) {
        state.phase = 'finished';
        state.winner = state.cur;
        kirimState();
        return;
      }
      state.pendingMove = tujuanKhusus(dest);
      kirimState();
      if (state.pendingMove) {
        kirim({ type: 'show_modal', pendingMove: state.pendingMove, is_active: true });
      }
      return;
    }

    if (m.action === 'ack_modal') {
      var pm = state.pendingMove;
      if (pm) {
        var pl = state.players[state.cur];
        if (pm.kind !== 'question') {
          pl.pos = pm.to;
          var ikon = { snake: '🐍', ladder: '🪜', bonus: '⭐', penalty: '😬' }[pm.kind];
          state.log.unshift(ikon + ' ' + pl.name + ' → kotak ' + pm.to);
          if (pl.pos === TOTAL) {
            state.phase = 'finished';
            state.winner = state.cur;
            state.pendingMove = null;
            kirimState();
            return;
          }
        }
        state.pendingMove = null;
      }
      giliranBerikutnya();
      kirimState();
      return;
    }

    if (m.action === 'restart') {
      state = freshState();
      kirim({ type: 'restart' });
    }
  }

  function SoketLokal() {
    this.readyState = 1;
    var s = this;
    setTimeout(function () { if (s.onopen) s.onopen(); }, 0);
  }
  SoketLokal.prototype.send = function (raw) {
    try { tangani(JSON.parse(raw)); } catch (e) { /* pesan tidak dikenali */ }
  };
  SoketLokal.prototype.close = function () { this.readyState = 3; };

  window.WebSocket = function () { sock = new SoketLokal(); return sock; };

  /* ── Penyesuaian tampilan: tidak ada ruangan untuk digabungi ── */
  function siapkanTampilan() {
    var div = document.querySelector('#home-screen .or-div');
    var row = document.querySelector('#home-screen .join-row');
    if (div) div.textContent = 'Semua pemain bergantian memakai satu perangkat';
    if (div) div.style.borderTop = 'none';
    if (row) row.style.display = 'none';

    var lh = document.querySelector('#lobby-screen .lobby-header p');
    if (lh) lh.textContent = 'Tambahkan nama pemain, lalu mulai permainan';
    var badge = document.querySelector('#lobby-screen .room-badge .rc-label');
    if (badge) badge.textContent = 'Mode';
    var code = document.getElementById('lobby-code');
    if (code) { code.textContent = 'SATU PERANGKAT'; code.style.fontSize = '1rem'; }

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
    document.addEventListener('DOMContentLoaded', siapkanTampilan);
  } else {
    siapkanTampilan();
  }
})();
