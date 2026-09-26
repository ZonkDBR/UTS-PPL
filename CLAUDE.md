# LK 3 E-Portfolio — PPL Mandiri

Situs statis beberapa halaman, tema merah muda dan sakura, bahasa Indonesia. Sejak
26 September 2026 situs ini menggabungkan dua portofolio: **PPG** (refleksi mata kuliah
dua semester, dulu dua situs terpisah di `Seminar PPG\Topik 2\website` dan
`Seminar PPG\Topik 3\website`) dan **PPL** (tugas LK 3). Polanya meniru halaman Refleksi
situs rujukan: beranda dengan dua pintu, "Modul Akademik" dan "Praktik Lapangan".

**ppl.html adalah tugas LK 3.** Tugas UTS dan UAS nanti ditambahkan ke halaman yang
sama; tempatnya sudah disiapkan sebagai kartu placeholder di bagian `#tugas`.

## Profil (fakta tetap — jangan tanya ulang)

| | |
|---|---|
| Nama | Fahira Firzha Wianda |
| NIM | 26960002 |
| Prodi | Bimbingan dan Konseling |
| Kampus | IKIP Siliwangi |
| Program | PPG Prajabatan |
| Sekolah PPL Mandiri | SMA Negeri 1 Cisarua |
| Kelas layanan | X I (Pribadi) dan XI J (Sosial) |

Sumber: header LK.1 dan LK.2 di folder ini. `<html lang="id">`.

## Bentuk teknis

```
index.html   beranda: hero profil + video Home + strip identitas + dua pintu (PPG, PPL)
profil.html  profil lengkap: tentang, alasan dan nilai, jejak langkah, riwayat (placeholder)
ppl.html     PPL Mandiri = tugas LK 3: enam analisis + #tugas
ppg-1.html   PPG semester I, enam mata kuliah (refleksi 4C, artefak, kaitan praktis)
ppg-2.html   PPG semester II, lima mata kuliah
style.css    satu berkas untuk semua halaman
script.js    reveal + kelopak + nav aktif, jejak kursor, slider, video hero, kotak YouTube
assets/      foto profil, dokumentasi, LKPD, video Home, RPL dan PPT yang ditautkan
```

Tiap halaman menyalin sendiri `<head>`, set `<symbol>` stiker, lapisan kelopak, nav, dan
footer (tanpa build step, jadi tidak ada include). Kalau mengubah salah satunya, ubah di
kelima berkas.

**Nav bersama**: di awal `<body>` semua halaman. Isinya bunga penanda (hanya di halaman
yang punya bagian bernomor), `.saklar` pil Beranda/Profil/PPG/PPL dengan
`aria-current="page"` pada halaman aktif (latar `--rose`, teks putih), lalu `.navlinks`
bagian halaman itu. Bunga punya satu kelopak per `main .sec` (6 di ppl dan ppg-1, 5 di
ppg-2, diputar per 72 derajat). `script.js` memasangkan kelopak dan tautan ke bagian
menurut urutan, jadi jumlahnya harus sama.

**Halaman PPG** dipindah apa adanya dari dua situs lama, kata-katanya tidak diubah (suara
"aku" di semester II dibiarkan). Yang diubah hanya: emoji dan label "Mata Kuliah 01"
dibuang, em/en dash jadi tanda hubung, rona per mata kuliah (termasuk lavender) dibuang,
dan kelasnya disesuaikan (`.refleksi-4c` > `.stage`, `.block.artefak` dengan `.doc-grid`,
`.block.kaitan-praktis`). Artefak berupa kartu kode, bukan berkas; bukti semester I
menaut ke folder Google Drive. Jangan menambah `class="intro"` di halaman mana pun:
`.intro` adalah wadah video hero dan lebarnya dikunci 220px.

Tanpa framework, tanpa build step, tanpa dependensi npm. Buka `index.html` langsung dari
berkas (`file://`) dan halaman harus tampil utuh — tidak boleh butuh server. Font lewat
Google Fonts, sisanya inline/lokal.

Publikasi: GitHub Pages dari akar repo (`main`, folder `/`) pada repo
`ZonkDBR/UTS-PPL`. Alamat yang dikirim sebagai jawaban tugas:
**<https://zonkdbr.github.io/UTS-PPL/>**. Cukup `git push origin main`, Pages menyebar
ulang sendiri sekitar satu menit.

Rujukan pola yang sudah terbukti: `C:\Users\ZonkDBR\Documents\Araa\Seminar PPG\Topik 2\website`
(live di <https://zonkdbr.github.io/Seminar-PPG-UTS-Porto/>). Rujukan kedua:
`C:\Users\ZonkDBR\Documents\Araa\E-Porto` (E-Portfolio PPL Terbimbing).

### Catatan alat

Di mesin ini tidak ada ffmpeg, ImageMagick, pdftotext, maupun Python. Yang tersedia:
PowerShell dengan `System.Drawing` (dipakai untuk memperkecil foto), Node (dipakai untuk
server statis sementara saat memeriksa tampilan), dan Playwright MCP. **Playwright
memblokir `file://` dan Chromium bawaannya tidak punya codec H.264**, jadi untuk
memeriksa tampilan perlu server lokal sementara, dan isi klip mp4 tidak bisa diputar di
sana.

## Gaya: neo-brutalism merah muda

Rujukan gaya: <https://ppganthonioakbar.vercel.app/> (e-portofolio PPG milik orang lain,
dipakai sebagai acuan bahasa visual saja, bukan isinya). Ciri yang diambil: garis tebal,
bayangan keras tanpa blur, blok warna datar, sudut membulat, huruf tebal, dan potongan
gambar bergaris.

**Tidak boleh ada ungu di mana pun.** Warna ungu dan lavender pernah dipakai dan ditolak
pada 20 September 2026 karena aksen halaman jadi terbaca ungu, bukan merah muda.

**Tema dikunci terang, `color-scheme: light`, tanpa blok
`@media (prefers-color-scheme: dark)` sama sekali.** Mode gelap pernah dipasang dan juga
ditolak: di perangkat yang setelan sistemnya gelap, latar plum gelapnya terbaca sebagai
ungu dan keseluruhan halaman terasa gelap, padahal temanya harus merah muda untuk semua
orang yang membuka, termasuk penilai. Jangan menambahkannya kembali.

```css
/* terang */
--ink: #17121A;  --muted: #5E4A56;  --edge: #17121A;   /* --edge = semua garis dan bayangan */
--page: #FFF1F5; --card: #FFFFFF;
--wash-pink: #FFDCE8;  --wash-blush: #FFE9F0;          /* latar bagian */

/* blok terang */
--blush: #FFE4EC;  --pink: #FFD2E0;  --butter: #FFE68C;
--blossom: #FF8FB3;   /* hiasan saja */
--rose: #C2185B;      /* isi tombol utama, teks putih 5.9:1 */
--on-block: #17121A;  /* teks di atas blok terang, >= 12:1 */

/* tidak ada varian gelap. Satu palet ini berlaku di semua perangkat. */

--hard-sm: 3px 3px 0 var(--edge);
--hard:    4px 4px 0 var(--edge);
--hard-lg: 6px 6px 0 var(--edge);
--r: 18px; --r-sm: 14px; --r-lg: 22px; --pill: 999px;

--display: "Fredoka", ...;  --body: "Plus Jakarta Sans", ...;  --mono: tumpukan monospace sistem;
```

**Aturan warna yang tidak boleh dilanggar:**

- Semua garis dan bayangan memakai `--edge`. Tidak ada lagi bayangan lembut ber-blur.
- Teks di atas blok terang (`--blush`, `--pink`, `--butter`) **selalu** `--on-block`.
  Aturan ini harus ditulis SESUDAH aturan warna umumnya, karena kekhususannya sama.
- Teks putih hanya di atas `--rose`.
- Kalau ada nilai warna diubah, sapu ulang dua hal lewat Playwright di server lokal:
  rasio kontras tiap elemen teks yang terlihat terhadap latar efektifnya (target nol
  elemen di bawah 4.5:1), dan rona tiap warna yang dipakai (target nol warna
  di rentang 255 sampai 320 derajat dengan kejenuhan di atas 0,18, yaitu keluarga ungu).

Satu skala radius saja, dan hover memakai `translate(-2px, -2px)` dengan bayangan
membesar, `:active` memakai `translate(2px, 2px)` tanpa bayangan.

Hiasan sakura: kelopak berjatuhan dari CSS murni bergaris hitam (bukan gambar, bukan
library) dan satu mark bunga enam kelopak di nav yang mekar mengikuti bagian yang
terbaca. Hormati `prefers-reduced-motion: reduce` — animasi mati, isi tetap terbaca.

### Aturan tampilan yang sudah diterapkan, jangan dibalik lagi

- **Tanpa emoji** di judul bagian, kartu, atau tombol. Kesan manis datang dari bentuk.
- **Tanpa penomoran bagian sebagai label** ("Analisis 01" dan sejenisnya sudah dihapus).
- **Tiap bagian punya keluarga layout sendiri**: dua kartu berdampingan, editorial dengan
  kutipan, bento enam sel, kotak YouTube, kotak kosong, lalu klaster plus blok
  rumus. Jangan menyamakan semuanya jadi tiga kartu seragam lagi.
- **Tanpa tanda pisah panjang** (em dash dan en dash) di teks yang terlihat. Pakai tanda
  hubung biasa.
- Di bawah 56rem nav jadi dua baris: saklar di atas, `.navlinks` satu baris geser di
  bawahnya (tidak membungkus), sekitar 123px. `scroll-padding-top` 11rem di sana. Di atas
  56rem nav halaman PPG bisa membungkus sampai sekitar 120px (lebar 56 sampai 68rem),
  karena itu `scroll-padding-top` dasarnya 9rem. Kalau isi nav berubah, ukur lagi.
- **Stiker** memakai satu set `<symbol>` SVG di awal tiap halaman, dipakai ulang lewat
  `<use>`. Selektor kelas **tidak menembus** isi `<use>`, jadi warnanya diberikan lewat
  properti yang diwariskan (`fill`, `stroke`, `stroke-width`) pada `.stiker`. Pernah
  keliru memakai `.stiker .badan` dan hasilnya semua stiker jadi hitam pekat.
- **Jebakan ukuran gambar**: setiap `<img>` yang punya atribut `width`/`height` wajib
  diberi `height` eksplisit di CSS (`height: auto` atau tinggi tetap). Tanpa itu
  atributnya menang dan foto potret ditarik memanjang. Pernah terjadi pada `.quote img`,
  kartunya sampai setinggi 2015px.

## Gerak

- Kelopak berjatuhan, stiker mengambang, kartu memantul dengan `--pegas`, mark bunga nav
  berputar saat disinggahi, foto hero berbentuk blob yang berubah pelan.
- **Jejak kursor** ada di `script.js`: 14 kelopak dalam satu lapisan `position: fixed`,
  digerakkan satu `requestAnimationFrame`, tiap kelopak mengejar kelopak di depannya.
  Klik memercikkan enam kelopak terakhir. Hanya `transform` dan `opacity` yang digerakkan.
- Semua gerak, termasuk jejak kursor, mati total saat `prefers-reduced-motion: reduce`.
  Jejak kursor juga tidak dipasang sama sekali kalau `(hover: hover) and (pointer: fine)`
  tidak terpenuhi, jadi layar sentuh tidak menanggung biayanya.

## Enam bagian wajib (ppl.html)

Urutan tetap, satu `<section id="…">` masing-masing di `ppl.html`, judul persis seperti tugas:

1. `#rancangan` — Analisis produk rancangan/perencanaan pembelajaran
2. `#materi` — Analisis materi pembelajaran yang disusun dan diterapkan
3. `#media` — Analisis media pembelajaran yang dipergunakan
4. `#video` — Analisis video pelaksanaan praktik mengajar mandiri
5. `#nonmengajar` — Analisis kegiatan nonmengajar
6. `#instrumen` — Instrumen penilaian yang dirancang beserta analisisnya

Setiap bagian memuat tiga hal, dalam urutan ini: **deskripsi produk** → **analisis** →
**refleksi diri**. Analisis adalah yang dinilai paling dalam, jangan biarkan bagian ini
lebih pendek dari deskripsinya.

Setelah keenam bagian ada bagian ketujuh, `#tugas` "Rangkaian Tugas PPL Mandiri": kartu
LK 3 (halaman ini) plus dua kartu placeholder UTS dan UAS bertanda `<!-- TODO -->`.
`.navlinks` ppl.html punya tujuh tautan; bunga di nav tetap enam kelopak untuk enam
analisis.

## Empat unsur penilaian

- **Profil guru** — hero beranda (index.html, alamat yang dikirim ke penilai) dengan
  foto, nama, dan alasan memilih jadi Guru BK, disusul strip identitas dan tombol ke
  profil.html. Profil lengkap di profil.html; kartu riwayat, pengalaman, organisasi,
  keterampilan, prestasi, dan kontak masih placeholder `<!-- TODO -->` karena datanya
  belum diberikan. Jangan diisi karangan.
- **Kedalaman analisis** — lihat aturan tiga bagian di atas.
- **Refleksi diri** — kotak `.refleksi` di tiap bagian, plus satu refleksi penutup yang
  menarik benang merah keenamnya.
- **Navigasi & tampilan** — nav sticky dengan saklar halaman dan penanda bagian aktif, skip link,
  `scroll-padding-top`, `:focus-visible` terlihat, rapi sampai lebar 375px.

## Bahan yang tersedia

**Dua RPL, dua kelas.** Sumber yang sahih adalah berkas `.docx` di dalam `assets/`
(versi yang diekstrak dari zip pada 26 September 2026), bukan PDF di akar folder.
Layanan **Self Awareness** (Reflective Learning, XI J) **sudah diganti** oleh layanan
Penyesuaian Diri atas keputusan pemilik portofolio pada 26 September 2026, beserta foto,
LKPD "Kesadaran Diri", dan keempat klip lamanya. Jangan dikembalikan.

**`assets/RPL Penyesuaian diri (Pribadi) SIKLUS 1/RPL Strategi Adaptasi dan Penyesuaian Diri di Lingkungan SMA.docx`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Pribadi** · Fungsi Pemahaman dan Pengembangan |
| Topik | Navigasi Transisi: Strategi Adaptasi dan Penyesuaian Diri di Lingkungan SMA |
| Sasaran | Kelas **X I** · 1 × 45 menit · dilaksanakan **13 Agustus 2026** (dari nama folder dokumentasi) |
| Model | **Experiential Learning** |
| Metode | Storytelling, ceramah interaktif, tanya jawab, diskusi kelas, penugasan LKPD |
| Media | PPT, LCD proyektor, laptop, lembar studi kasus, LKPD |
| Sumber | Prayitno & Amti (2004); POP BK (2016); Hurlock (1980) |
| Evaluasi | Proses (4 butir skala 1–5, skor/20 × 100) + Hasil (10 butir SS–STS, skor/50 × 100) + Kepuasan murid (6 aspek, skor 6–18) |
| Kategori | 81–100 Sangat Baik · 66–80 Baik · 51–65 Cukup Baik · 36–50 Kurang Baik · ≤35 Sangat Kurang Baik |
| PPT | `PPT_PenyesuaianDiri.pptx`, 8 slide; slide 7 berisi afirmasi "Aku memberi diriku waktu untuk beradaptasi…" |

**`assets/RPL menghargai guru dan teman (Sosial)/RPL Sosial Menghargai Guru dan Teman.docx`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Sosial** |
| Topik | Membangun Sikap Menghargai Guru dan Teman di Lingkungan Sekolah |
| Sasaran | Kelas **XI J** · 1 × 45 menit · dilaksanakan **20 Agustus 2026** (dari nama folder dokumentasi) |
| Model | **Cooperative Learning** (Penyajian Materi → Presentasi → Refleksi Bersama) |
| Metode | Ceramah interaktif, diskusi kelompok, penugasan LKPD, pertanyaan pemantik |
| Sumber | Lickona (2012); POP BK (2016) |
| Evaluasi | Butir proses sama persis dengan RPL Pribadi; hasil 10 butir; rumus dan kategori sama |
| PPT | `PPT_Klasikal_Sosial_MenghargaiGuruTeman.pptx`, 7 slide (tidak berubah) |

**Roleplay tidak ditulis di situs.** Pemilik portofolio memilih versi RPL Sosial baru
yang menghapus roleplay dari model, metode, dan kegiatan murid. Dokumennya masih
menyisakan kata roleplay di beberapa tempat (daftar media, satu kegiatan, slide
aktivitas PPT, bagian pertama LKPD), tetapi situs mengikuti keputusan itu. Bagian
pertama LKPD Sosial ditulis sebagai "mengamati dua skenario sikap menghargai".

Dua PDF di akar folder (`RPL kepercayaan diri (Pribadi).pdf`, `RPL Sosial.pdf`) adalah
**draft lama** dan tidak boleh dipakai sebagai sumber.

**LKPD** ada sebagai gambar di `assets/lkpd/`. LKPD Pribadi "Aku Siap Beradaptasi"
berisi enam bagian (Tantangan yang Kamu Alami, Kenali Diri dan Lingkungan, Apa yang
Menjadi Tantangan, Strategi Penyesuaian Diri, Manfaat Penyesuaian Diri, Komitmenku);
urutannya dibaca sebagai siklus Experiential Learning. LKPD Sosial berisi empat
bagian, termasuk rencana tiga aksi nyata selama sepekan lengkap dengan kepada siapa
dan kapan.

**Kegiatan nonmengajar** (foto di `assets/nonmengajar/`). Peran yang dinyatakan pemilik
portofolio: **bertugas bersama Guru BK**. Tanggal tiap kegiatan tidak diketahui, jangan
disebutkan.

| Kegiatan | Peran |
|---|---|
| Sapa Pagi | Piket di gerbang, menyambut murid yang datang pagi |
| Penanganan siswa terlambat | Ikut menangani dan mendata murid yang terlambat |
| Upacara Senin | Ikut mengatur barisan murid saat upacara bendera |
| Selasa Sehat (SASESA, Salasa Sehat Sarerea) | Ikut senam bersama warga sekolah. Fotonya potongan dari unggahan Instagram sekolah, keterangannya menyebut sumber itu |

Berkas media lain: `assets/dokumentasi/` (foto pelaksanaan yang sudah diperkecil:
`pribadi-01..03` dari kelas X I, `sosial-01..06` dari kelas XI J, dipakai di slider kartu
RPL), dan `assets/video/home.mp4` (15,6 detik, potret, diputar otomatis tanpa suara di
hero beranda; **pertahankan**, pemilik portofolio memintanya secara khusus).

**Video praktik** memakai kotak YouTube `.yt[data-yt]` di `#video` ppl.html, satu per
layanan. Isi `data-yt` dengan ID video 11 karakter; `script.js` memasang sampul dari
`i.ytimg.com` dan tombol putar, dan klik mengganti sampul dengan iframe
`youtube-nocookie.com` yang langsung berputar. Dari `file://` tautannya membuka YouTube
di tab baru karena pemutar sematan ditolak di sana. Selama `data-yt` kosong, yang tampil
kotak bergaris putus-putus dengan teks placeholder.

**Slider** memakai satu komponen `[data-slider]` (lintasan scroll-snap, tombol sebelum
dan berikut, penghitung "n / total"), dipakai di kedua kartu RPL dan di bagian
nonmengajar. Untuk menambah foto, cukup tambah `<figure class="slide">` di lintasannya;
penghitung dan tombol menyesuaikan sendiri.

Tiga dokumen LK di folder ini bukan sumber untuk keenam analisis. Pakai hanya untuk
konteks sekolah dan profil.

## Aturan konten

Bahasa Indonesia, sudut pandang orang pertama, nada hangat tapi tidak berlebihan.

**Jangan mengarang analisis.** Bagian yang datanya belum ada diberi placeholder eksplisit
(`<!-- TODO: … -->` plus teks placeholder yang terlihat), bukan diisi karangan yang
terdengar meyakinkan. Portofolio ini dinilai sebagai karya nyata. Keterangan foto dan
klip hanya boleh menyatakan apa yang benar-benar terverifikasi. Ini termasuk **tidak
menceritakan reaksi murid atau kejadian kelas** yang tidak terdokumentasi (versi lama
pernah menulis "kelas sudah mengenali polanya" dan "materi yang paling berhasil", dan
pemilik portofolio menilainya salah).

**Kekurangan jangan ditonjolkan**, karena menurunkan nilai. Di tiap bagian cukup satu
kalimat bernada wajar: waktu 1 x 45 menit terbatas sehingga sebagian isi RPL belum
tersampaikan sepenuhnya. Jangan membuat daftar kesalahan diri, kartu "temuan"
kekeliruan, atau kritik terhadap dokumen sendiri. Refleksi ditulis sebagai hal yang
dipelajari dan rencana ke depan.

## Privasi

Keputusan pemilik portofolio pada 20 September 2026: **foto dan video dokumentasi kelas
boleh terbit di situs publik, termasuk yang wajah muridnya terlihat.** Ini mengganti
aturan dua portofolio sebelumnya. Yang tetap berlaku:

- Daftar nama kelas tidak pernah masuk repo.
- Dokumen kerja (LK, PDF draft) tetap diabaikan lewat `.gitignore`.
- Sebelum `git push`, periksa isi `assets/`. Hanya berkas yang memang dimaksudkan untuk
  publik yang boleh ikut.

## Yang masih kurang

- [ ] **ID video YouTube** rekaman kedua layanan: isi `data-yt` di `#video` ppl.html.
      Empat butir di kotak "belum bisa dinilai" dan paragraf analisis `#video` (sekarang
      disusun dari foto dokumentasi) perlu dilengkapi setelah rekamannya bisa ditonton.
- [ ] **Tugas UTS** dan **tugas UAS**: isi kartu placeholder di `#tugas` ppl.html.
- [ ] **Profil**: riwayat pendidikan, pengalaman, organisasi, keterampilan, prestasi,
      serta kontak dan CV di profil.html (enam kartu placeholder).
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya
      rancangannya.
