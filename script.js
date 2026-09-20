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
