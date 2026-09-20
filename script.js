/* Satu observer mengurus tiga hal sekaligus: memunculkan isi bagian,
   memekarkan kelopak miliknya, dan menandai tautan navigasinya. */

(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('main .sec'));
  var petals   = Array.prototype.slice.call(document.querySelectorAll('.sitenav .kelopak'));
  var links    = Array.prototype.slice.call(document.querySelectorAll('.navlinks a'));

  if (!sections.length) return;

  // Hanya browser yang menjalankan skrip ini yang ikut menyembunyikan isi,
  // sehingga kegagalan JS tetap menyisakan halaman yang terbaca penuh.
  document.body.classList.add('js-reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      var i = sections.indexOf(entry.target);
      if (petals[i]) petals[i].classList.add('mekar');   // kelopak tidak pernah layu kembali
    });

    // threshold 0 + rootMargin, bukan rasio: satu bagian di sini bisa setinggi
    // 3000px, dan pada layar pendek tidak ada rasio yang akan pernah tercapai.
  }, { threshold: 0, rootMargin: '0px 0px -20% 0px' });

  sections.forEach(function (section) { observer.observe(section); });

  // Penanda nav dipegang observer kedua dengan rootMargin yang menyisakan satu pita
  // tipis di bawah nav. Bagian yang menyentuh pita itulah yang sedang dibaca, jadi
  // penandanya selalu tepat tanpa perlu satu pun pendengar scroll.
  var garis = new IntersectionObserver(function () {
    // Di perbatasan, dua bagian menyentuh pita sekaligus dan urutan entri tidak
    // dijamin. Jadi yang dipakai bukan entrinya, melainkan bagian terakhir yang
    // sudah dimulai di atas batas bawah pita. Dihitung tepat saat pita dilewati,
    // sehingga posisinya selalu yang terbaru.
    var batas = window.innerHeight * 0.15;
    var active = 0;
    sections.forEach(function (section, n) {
      if (section.getBoundingClientRect().top <= batas) active = n;
    });
    links.forEach(function (link, n) {
      link.classList.toggle('active', n === active);
    });
  }, { threshold: 0, rootMargin: '-72px 0px -85% 0px' });

  sections.forEach(function (section) { garis.observe(section); });
})();


/* Jejak kelopak di belakang kursor, plus percikan kecil saat diklik.

   Tidak dipasang sama sekali pada perangkat sentuh dan saat mode hemat gerak
   aktif. Hanya transform dan opacity yang digerakkan, semuanya di dalam satu
   requestAnimationFrame, jadi tidak ada pekerjaan tata letak per frame. */

(function () {
  var halus = window.matchMedia('(hover: hover) and (pointer: fine)');
  var hematGerak = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!halus.matches || hematGerak.matches) return;

  var JUMLAH = 14;
  var lapisan = document.createElement('div');
  lapisan.className = 'kursor';
  lapisan.setAttribute('aria-hidden', 'true');
  document.body.appendChild(lapisan);

  var rona = ['', 'muda', 'butter'];
  var kelopak = [];
  var i;

  for (i = 0; i < JUMLAH; i++) {
    var el = document.createElement('div');
    el.className = 'jejak ' + rona[i % rona.length];
    lapisan.appendChild(el);
    kelopak.push({
      el: el,
      x: -100, y: -100,
      putar: Math.random() * 360,
      skala: 1 - (i / JUMLAH) * 0.55,   // makin belakang makin kecil
      lekat: 0.32 - (i / JUMLAH) * 0.2, // dan makin lambat mengejar
      pecah: null
    });
  }

  var tujuanX = -100, tujuanY = -100, pernahGerak = false;

  window.addEventListener('pointermove', function (e) {
    tujuanX = e.clientX;
    tujuanY = e.clientY;
    pernahGerak = true;
  }, { passive: true });

  // Klik memercikkan enam kelopak paling belakang ke segala arah.
  window.addEventListener('pointerdown', function (e) {
    var mulai = JUMLAH - 6;
    for (var n = mulai; n < JUMLAH; n++) {
      var sudut = ((n - mulai) / 6) * Math.PI * 2 + Math.random() * 0.4;
      kelopak[n].pecah = {
        x: e.clientX, y: e.clientY,
        dx: Math.cos(sudut) * (3.4 + Math.random() * 1.6),
        dy: Math.sin(sudut) * (3.4 + Math.random() * 1.6),
        sisa: 34
      };
    }
  }, { passive: true });

  (function gerak() {
    var x = tujuanX, y = tujuanY;

    for (var n = 0; n < JUMLAH; n++) {
      var k = kelopak[n];

      if (k.pecah) {
        k.pecah.x += k.pecah.dx;
        k.pecah.y += k.pecah.dy;
        k.pecah.dy += 0.22;             // sedikit gravitasi supaya jatuh
        k.pecah.sisa -= 1;
        k.x = k.pecah.x;
        k.y = k.pecah.y;
        k.putar += 11;
        k.el.style.opacity = Math.max(0, k.pecah.sisa / 34);
        if (k.pecah.sisa <= 0) k.pecah = null;
      } else {
        k.x += (x - k.x) * k.lekat;
        k.y += (y - k.y) * k.lekat;
        k.putar += 2.4;
        k.el.style.opacity = pernahGerak ? (0.85 - (n / JUMLAH) * 0.6).toFixed(2) : 0;
      }

      k.el.style.transform =
        'translate3d(' + k.x + 'px,' + k.y + 'px,0) rotate(' + k.putar + 'deg) scale(' + k.skala + ')';

      // kelopak berikutnya mengejar posisi kelopak ini, bukan kursornya
      x = k.x;
      y = k.y;
    }

    requestAnimationFrame(gerak);
  })();
})();
