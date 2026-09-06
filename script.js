/* Satu observer mengurus tiga hal sekaligus: memunculkan isi bagian,
   memekarkan kelopak miliknya, dan menandai tautan navigasinya. */

(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('.course'));
  var petals   = Array.prototype.slice.call(document.querySelectorAll('.blossom .kelopak'));
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
      links.forEach(function (link, n) {
        link.classList.toggle('active', n === i);
      });
    });
    // threshold 0 + rootMargin, not a ratio: a section here can be 3000px tall,
    // and on a short viewport no ratio threshold would ever be reached.
  }, { threshold: 0, rootMargin: '0px 0px -20% 0px' });

  sections.forEach(function (section) { observer.observe(section); });
})();
