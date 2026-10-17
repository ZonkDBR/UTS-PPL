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

Sumber: header LK.1 dan LK.2 di folder ini. `<html lang="id">`.

**Kelas layanan hanya disebut di baris `Kelas` tabel `.facts` kartu RPL** (permintaan pemilik
28 September 2026, menggantikan larangan sebelumnya): X I, X J, X D di Siklus 1, XI J di Siklus 2.
Jangan menulis rombel di alt, caption, maupun strip identitas. Jenjang ("kelas X") boleh di teks.

## Bentuk teknis

```
index.html   beranda: hero profil + video Home + strip identitas + dua pintu (PPG, PPL)
profil.html  profil lengkap: tentang, alasan dan nilai, jejak langkah, riwayat (placeholder)
ppl.html     PPL Mandiri = tugas LK 3: tab Siklus 1-4, Nonmengajar, Penilaian, Tugas
ppg-1.html   ringkasan PPG semester I: alur 4C + enam kartu mata kuliah
ppg-1-*.html satu halaman per mata kuliah semester I (filosofi, asesmen, ppl, pola-pikir,
             design-thinking, konseling)
ppg-2.html   ringkasan PPG semester II, lima kartu mata kuliah
ppg-2-*.html intervensi, pse, ppl, konseling, projek
ppg-intisari.html  intisari PPG: identifikasi temuan per mata kuliah, benang merah,
             karya inovasi, Seminar PPG, penutup (lima bagian, tanpa .navlinks)
karya-inovasi.html karya inovasi: Ular Tangga Motivasi, permainan papan digital berisi
             46 kartu pertanyaan refleksi; disusun mengikuti empat komponen LK 4
             (#identitas, #gagasan, #rancangan, #evaluasi) plus #alur dan #kaitan
ular-tangga/ salinan permainannya yang ikut terbit (index.html + satu-perangkat.js)
style.css    satu berkas untuk semua halaman
script.js    reveal + kelopak + nav aktif, tab PPL, jejak kursor, slider, video hero, kotak YouTube
assets/      foto profil, dokumentasi, LKPD, video Home, RPL dan PPT yang ditautkan
```

Tiap halaman menyalin sendiri `<head>`, set `<symbol>` stiker, lapisan kelopak, nav, dan
footer (tanpa build step, jadi tidak ada include). Kalau mengubah salah satunya, ubah di
semua 18 berkas HTML.

**Nav bersama**: di awal `<body>` semua halaman. Isinya `.saklar` pil Beranda/Profil/PPG/PPL dengan `aria-current="page"` pada
halaman aktif (latar `--rose`, teks putih), lalu `.navlinks` bagian halaman itu (halaman PPG tidak punya `.navlinks` maupun bunga
nav). `script.js` memasangkan tautan `.navlinks` atau `.toc` ke `main .sec` menurut
urutan, jadi jumlahnya harus sama.

**PPG di nav adalah tombol pop-up**, bukan tautan: `<button class="saklar__ppg"
popovertarget="menu-ppg">` plus `<div id="menu-ppg" popover>` berisi empat tautan
dengan **Intisari PPG di urutan pertama** sebagai pintu masuk bagian PPG (keputusan
pemilik 16 Oktober 2026), lalu Semester I, Semester II, dan Karya Inovasi (Popover API
bawaan, tanpa JS).
Di semua halaman PPG tombolnya diberi `data-aktif` (latar `--rose`). Salin utuh ke semua
berkas bila diubah. Daftar yang sama juga muncul di `ul.pintu__daftar` kartu pintu PPG
pada index.html, jadi keduanya harus ikut berubah.

**ppl.html bertab.** Tiap tab adalah `<div class="panel" id="..." data-panel>`:
`siklus-1` sampai `siklus-4`, `nonmengajar`, `penilaian`, `tugas`. `script.js`
menampilkan panel yang cocok dengan hash URL (atau panel pemilik anchor di hash, mis.
`#s1-media`), default Siklus 1, dan menandai tautan di `.navlinks` serta baris
`.semester` di kepala halaman. Tanpa JS semua panel tampil. Penanda gulir dilewati
di halaman bertab, dan ppl.html tidak memakai bunga nav.

**Halaman PPG meniru halaman Refleksi situs rujukan** (4 Oktober 2026,
<https://ppganthonioakbar.vercel.app/refleksi/semester-1>). ppg-1/ppg-2 jadi ringkasan:
`.metode` alur 4C lalu `.mk-grid` kartu mata kuliah (inti = lede, jumlah artefak, tombol
"Buka Cerita Lengkap"). Tiap mata kuliah punya halaman sendiri: jejak + `.kembali`,
`.mk-hero` dengan `.mk-inti`, `.peta4c` yang menaut ke bagian, lalu `.mk-tata`: `.toc`
lengket (penanda aktif + "n% dibaca" dari script.js) dan `.bab-daftar` berisi enam
`section.sec.bab` (connection, challenge, concept, change, artefak, kaitan) plus
`.mk-pindah` sebelum/berikutnya. Paragraf `.cerita` dinomori CSS; `em` dan istilah
daftar diberi sorot butter. Halaman-halaman ini dibuat sekali dengan skrip pemecah dari
isi lama; tidak ada build step, jadi ubah langsung berkasnya.

**Bentuk "Analisis Artefak" seragam di kesebelas halaman** (14 Oktober 2026, mengikuti
`ppg-2-projek.html`): `div.cerita.cerita--polos` berisi **satu paragraf pengantar** lalu
`ul.doc-grid` saja. Tidak ada lagi subjudul `<h4>` ("Artefak yang saya pilih", "Mengapa
artefak ini", "Bagian yang mendukung refleksi"), tidak ada blok `.bukti`, dan **tautan
folder Google Drive di semester I sudah dihapus seluruhnya** atas permintaan pemilik.
Karena itu ubin `ppg-1.html` tidak lagi berbunyi "5 Folder Bukti". Keterangan tiap
`doc-card` diawali penanda peran ("Artefak inti Connection.", "Bukti dukung Challenge.")
di sepuluh halaman; kartu `ppg-2-projek.html` sendiri dibiarkan tanpa penanda itu.

**Bahasa halaman PPG memakai ragam formal** (14 Oktober 2026): hindari ungkapan
percakapan ("buat saya", "dulu saya ... sekarang saya", "tahu betul", "jadi berani"),
pakai padanan baku ("bagi saya", "sebelumnya ... kini"), dan tulis istilah Indonesia bila
ada ("perundungan" bukan "bullying", "telepon genggam" bukan "HP", "membingkai ulang"
bukan "mereframe"). `index.html`, `profil.html`, dan `ppl.html` **tidak ikut**; keduanya
mempertahankan nada hangat. Yang tidak berubah: sudut pandang "saya", struktur 4C beserta
subjudulnya, larangan em/en dash, dan larangan emoji.

Isi refleksinya direvisi 4 Oktober 2026 mengikuti `assets/Refleksi Pengalaman Belajar ara.docx`
(sumber sahih 4C Filosofi, dipakai apa adanya; jadi pola untuk mata kuliah lain): tiap bagian 4C
diberi subjudul (Keterkaitan/Tantangan/Konsep/Perubahan), Concept berupa daftar
`<strong>Istilah:</strong>`, Change berupa daftar komitmen "Saya akan…", suara "saya" di kedua
semester. Isi mata kuliah lain hanya disusun ulang, tidak ditambah. Artefak dipangkas jadi satu
per topik (16 di semester I, 13 di semester II); jangan kembalikan sisanya. Asalnya dipindah
dari dua situs lama. Yang diubah saat pemindahan: emoji dan label "Mata Kuliah 01"
dibuang, em/en dash jadi tanda hubung, rona per mata kuliah (termasuk lavender) dibuang,
dan kelasnya disesuaikan. Artefak berupa kartu kode, bukan berkas. Jangan menambah
`class="intro"` di halaman mana pun:
`.intro` adalah wadah video hero dan lebarnya dikunci 220px.

Tanpa framework, tanpa build step, tanpa dependensi npm. Buka `index.html` langsung dari
berkas (`file://`) dan halaman harus tampil utuh — tidak boleh butuh server. Font lewat
Google Fonts, sisanya inline/lokal.

Publikasi: **Vercel**, dari repo `ZonkDBR/UTS-PPL` (keputusan pemilik 16 Oktober 2026,
menggantikan GitHub Pages). Situsnya statis murni, jadi tidak perlu `vercel.json`,
perintah build, maupun direktori keluaran: akar repo dilayani apa adanya. Cukup
`git push origin main`, Vercel menyebar ulang sendiri.

Rujukan pola yang sudah terbukti: `C:\Users\ZonkDBR\Documents\Araa\Seminar PPG\Topik 2\website`
(live di <https://zonkdbr.github.io/Seminar-PPG-UTS-Porto/>). Rujukan kedua:
`C:\Users\ZonkDBR\Documents\Araa\E-Porto` (E-Portfolio PPL Terbimbing).

### Catatan alat

Di mesin ini tidak ada ffmpeg, ImageMagick, pdftotext, maupun Python. Yang tersedia:
PowerShell dengan `System.Drawing` (dipakai untuk memperkecil foto; ingat membaca tag
EXIF 274 supaya foto potret tidak terbalik) dan `System.IO.Compression.ZipFile` (dipakai
untuk membaca isi `.docx` dan `.pptx`: buka zipnya, ambil `word/document.xml` atau
`ppt/slides/slideN.xml`, lalu buang tagnya), Node (server statis sementara saat memeriksa
tampilan), dan Playwright MCP. Teks **PDF hasil ekspor PowerPoint tidak bisa diambil**
dengan cara sederhana karena fontnya tersubset; yang bisa dibaca hanya jumlah halamannya
lewat `/Count`. **Playwright
memblokir `file://` dan Chromium bawaannya tidak punya codec H.264**, jadi untuk
memeriksa tampilan perlu server lokal sementara, dan isi klip mp4 tidak bisa diputar di
sana.

### ppg-intisari.html adalah halaman utama PPG

Keputusan pemilik 16 Oktober 2026. Halaman ini wajib memuat tiga hal, selain identifikasi
temuan dan penutup yang sudah ada:

1. **Kaitan karya inovasi dengan mata kuliah** (bagian `#karya`), enam mata kuliah yang
   terbaca pada bentuk Ular Tangga Motivasi.
2. **Kaitan karya inovasi dengan visi dan misi** di `index.html#visi-misi`; empat butir
   misi yang terpenuhi, dua butir yang justru jadi pekerjaan rumahnya.
3. **Kesinambungan refleksi semester I dan II** (bagian `#benang-merah`), enam pasangan
   mata kuliah semester I yang bersambung ke semester II.

Di akhir halaman ada pemilih "Lanjutkan membaca" ke Semester I, Semester II, Karya
Inovasi, dan PPL, karena pengunjung diarahkan membaca intisari lebih dahulu.

### Karya Inovasi: status dan susunan halaman

Keputusan pemilik 17 Oktober 2026: **Ular Tangga Motivasi bukan lagi prototipe.**
Permainannya sudah dipakai dalam layanan bimbingan klasikal bersama **satu kelas X pada
13 April 2026** (tanggal dari pemilik; tahunnya disimpulkan dari rentang semester I, perlu
dikonfirmasi bila meleset). Jangan menulis "masih prototipe" lagi di mana pun, termasuk
ppg-intisari.html.

`karya-inovasi.html` disusun mengikuti empat komponen LK 4 Penyusunan Desain Karya
Inovatif: `#alur` (peta empat komponen, menaut ke bawah), `#identitas` (nama karya dan
sasaran inovasi, satu `.mk-kartu` dengan `.facts`), `#gagasan` (tantangan, gagasan solusi,
riset sederhana beserta tiga temuannya), `#rancangan` (isi prototipe dan proses
implementasinya di kelas), `#evaluasi` (lima tahap pengukuran plus kebaruan, kreativitas,
kebermanfaatan), lalu `#kaitan` yang sudah ada.

Yang belum ada dan **tidak boleh dikarang**: angka instrumen awal dan akhir, penilaian
Guru BK sebagai pemakai, dan dokumentasi pelaksanaan 13 April 2026. Ketiganya berupa kotak
`.kosong` yang terlihat.

### ular-tangga/ (Karya Inovasi)

`ular-tangga/index.html` adalah salinan `C:UsersZonkDBRDocumentsAraaUlar Tanggagame.html`
dengan tiga tambahan: judul dan meta, tautan kembali ke karya-inovasi.html, dan
`<script src="satu-perangkat.js">` sebelum `</body>`. **Jangan mengedit logika permainan
di dalam index.html**; semuanya ada di `satu-perangkat.js`.

Aslinya permainan ini klien tipis: seluruh logika (dadu, ular, tangga, giliran) ada di
`server.py` lewat WebSocket port 3001, supaya tiap murid ikut dari HP sendiri. Vercel
tidak bisa menjalankan server itu. `satu-perangkat.js` menggantikan servernya dengan
menimpa `window.WebSocket` memakai soket palsu yang menjalankan logika yang sama di
peramban, jadi permainannya hot seat di satu perangkat: pemain ditambahkan lewat kolom
"Tambah pemain" yang disuntikkan ke layar lobi, dan tiap pesan `state` melaporkan
`my_idx: state.cur` supaya tombol dadu aktif untuk siapa pun yang sedang mendapat giliran.
Konstanta papan (`SNAKES`, `LADDERS`, `SPECIAL`, `Q`, `PC`) dibaca dari index.html,
tidak disalin ulang.

**Protokolnya sengaja sama persis dengan server.py** (create, join, host_role, set_name,
start, roll, move, ack_modal, restart). Kalau nanti multiperangkat dibutuhkan, servernya
dipasang di tempat yang bisa menjalankan proses hidup (Render, Railway, Fly) lalu
`satu-perangkat.js` dilepas; atau logika yang sama dipindah ke dua rute HTTP di Vercel
(`GET /api/state` yang di-polling tiap 1,5 detik dan `POST /api/action`) dengan state
ruangan disimpan di Redis, karena fungsi serverless tidak punya memori bersama.

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

**Paragraf teks bacaan rata kanan-kiri** (17 Oktober 2026). Aturannya di akhir
`style.css`: `.prose p/li`, `.cerita > p`, `.lede`, `.sec__head p`, `.rpl-card p`,
`.tile p`, `.quote p`, `.refleksi p`, `.doc-body p`, `.why p`, `.outline li`,
`.observed li`, `.klaster p`, `.pintu p`. Wadah yang memang ditengahkan (`.kosong`,
`.thanks`, `.ubin`, `.step`) tidak diikutkan, dan **di bawah 34rem semuanya kembali rata
kiri** karena barisnya terlalu pendek untuk justify. Tautan aksi langsung di dalam
`.prose` (`.prose > a`, varian `.ghost`) berbentuk pil seperti di `.bukti`; sebelumnya
tampil sebagai teks bergaris bawah saja.

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

## Susunan ppl.html (per siklus, sejak 28 September 2026)

Tiap panel siklus memuat lima bagian berurutan, id diberi awalan siklus
(`s1-rancangan`, `s1-materi`, `s1-media`, `s1-video`, `s1-instrumen`; `s2-...`):
rancangan, materi, media, video, instrumen. **Materi, media, dan video berbeda per siklus,
dan satu siklus hanya punya satu video.** Analisis kegiatan nonmengajar pindah ke tab
`#nonmengajar`; penilaian Guru Pamong di tab `#penilaian` (placeholder, belum diberikan).

| Siklus | Layanan (tanggal dari pemilik portofolio, bukan nama folder) |
|---|---|
| 1 | Penyesuaian Diri (X I) 10 Agu 2026 · Regulasi Emosi (X J) 13 Agu · Manajemen Waktu (X D) 20 Agu. Semua Pribadi, Experiential Learning, kelas X |
| 2 | Kejujuran Akademik (Belajar, XI J) 27 Agu · Membangun Resiliensi (Pribadi, XI I) 31 Agu · Visi Masa Depan / Target SMART (Karier, X I) 3 Sep. Semua Experiential Learning |
| 3 | Menghargai Guru dan Teman (Sosial, XI J) 10 Sep · Penggunaan Media Sosial (Sosial, XI J) 15 Sep · Mengenal Diri Sendiri / Self Awareness (Pribadi, XI J) 17 Sep. Satu kelas yang sama sepanjang siklus, model berbeda tiap layanan |
| 4 | Kepercayaan Diri (Pribadi, XII I) 21 Sep · Perundungan (Sosial, XII I) 24 Sep · Seleksi Masuk Perguruan Tinggi (Karier, XI J) 29 Sep |

Catatan tanggal (16 Oktober 2026): layanan Menghargai **bertanggal 10 September 2026**,
bukan 20 Agustus seperti yang pernah ditulis; foto 20 Agustus ternyata milik folder
Seleksi PT dan ditandai "Belum Dipake" oleh pemilik, tetapi atas keputusan pemilik tiga
di antaranya tetap dipakai untuk kartu Seleksi PT. RPL Kepercayaan Diri memakai tanggal
tanda tangan dokumennya (21 September), bukan nama foldernya (13 Agustus).

Video Siklus 1: YouTube `CEGttnItg2I`, layanan Penyesuaian Diri. Kendala yang
dinyatakan pemilik: di video itu lupa memakai mikrofon sehingga suara murid yang
berpendapat kurang terdengar; di layanan Menghargai (kini Siklus 3) proyektor rusak
sehingga PPT tidak bisa ditayangkan.

Video Siklus 2: YouTube `cByApNz-sJA`, layanan Visi Masa Depan (3 September 2026).
Video Siklus 3: YouTube `sSPtfTE1tbs`, layanan Mengenal Diri Sendiri (17 September).
Video Siklus 4: YouTube `KjQlbfwuDuw`, layanan Perundungan (24 September).
Pemilik belum menyatakan kendala apa pun pada ketiga rekaman itu, jadi kotak
`.observed .todo` di `#s2-video`, `#s3-video`, dan `#s4-video` masih menunggu hasil
menonton ulang. Jangan mengarang isinya.

Setiap bagian memuat tiga hal, dalam urutan ini: **deskripsi produk** → **analisis** →
**refleksi diri**. Analisis jangan lebih pendek dari deskripsinya. Evaluasi proses selalu
ditulis sebelum evaluasi hasil (ikut urutan RPL), termasuk di blok rumus.

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

**Sumber Siklus 3 dan 4 adalah `assets/SIKLUS 3 PPLM/` dan `assets/SIKLUS 4 PPLM/`**
(16 Oktober 2026), masing-masing tiga folder layanan dengan pola penamaan seperti
Siklus 2. Nama foldernya dibiarkan apa adanya, termasuk yang panjang berisi tanggal,
supaya tautan unduhan tidak perlu diubah lagi. Yang dilacak git hanya `.docx` dan
`.pptx`, ditambah satu pengecualian `!assets/SIKLUS 3 PPLM/*/PPT*.pdf` karena PPT Media
Sosial terbit sebagai PDF 11 halaman, bukan pptx.

Foto terbitnya diperkecil ke `assets/dokumentasi/`: `menghargai-01..03`, `sosmed-01..03`,
`sadardiri-01..03` (Siklus 3), `percaya-01..03`, `bullying-01..02`, `seleksi-01..03`
(Siklus 4). **Bullying hanya dua** karena dua dari tiga foto mentahnya identik. Foto lama
`sosial-01/03/04` sudah dihapus karena layanan Menghargai kini memakai fotonya sendiri.
LKPD terbit sebagai `assets/lkpd/lkpd-kesadaran-diri.jpg`, `lkpd-confidence-gps.jpg`,
dan `lkpd-strategi-sukses.jpg`; LKPD Menghargai memakai `lkpd-aksi-menghargai.jpg` yang
sudah ada. **`LKPD Bullying.png` di folder Siklus 4 keliru**, isinya lembar kerja
Penyesuaian Diri Siklus 1, jadi kartu LKPD Perundungan diberi keterangan tanpa gambar.

Temuan dokumen yang ditulis sebagai analisis, bukan diam-diam diperbaiki: kolom kegiatan
murid dan Guru BK tertukar di RPL Perundungan, tiga subjudul lampiran materinya masih
terbawa dari berkas Regulasi Emosi, RPL Media Sosial tidak punya instrumen kepuasan, dan
tabel kategori evaluasi hasil RPL Seleksi PT memakai batas yang tidak cocok dengan
rumusnya (74-100, 68-73, 52-67, 36-51, 14-35).

**Foto Siklus 2 layanan Visi Masa Depan sudah berdiri sendiri** (16 Oktober 2026):
`smart-01..03`, diambil dari folder dokumentasi SMART yang diperbarui pemilik. Jadi
`siklus2-01..03` kini hanya dipakai layanan Membangun Resiliensi.

**Sumber Siklus 2 adalah `assets/SIKLUS 2 PPLM/`** (14 Oktober 2026), diekstrak dari
`SIKLUS 2 PPLM baru.zip`. Arsipnya **tidak ada di repo ini**, melainkan di
`C:\Users\ZonkDBR\Documents\Araa\Seminar PPG\Topik 3\website\assets\` bersama
`SIKLUS 1 PPLM baru.zip`. Hati-hati, kedua proyek sama-sama bernama `Topik 3`.

Tiga folder yang dilacak git, masing-masing hanya berisi `.docx` + `.pptx`:
`RPL Kejujuran Akademik (Belajar)`, `RPL Membangun Resiliensi (Pribadi)`,
`RPL Merancang target SMART (Karier)`. Ejaan folder sudah **dirapikan dari zip**, yang
menulis "Keujujuran" dan melabeli SMART sebagai "(Pribadi)" padahal dokumennya bidang
Karier. Situs mengikuti isi dokumen, bukan nama folder. Ketiga PPT masing-masing 7 slide
dengan susunan sama: pembuka, lima tujuan, konsep inti, kerangka alat, contoh penerapan,
panduan pengerjaan LKPD berikut alokasi waktu, penutup. LKPD terbit sebagai gambar di
`assets/lkpd/lkpd-jujur-itu-keren.jpg`, `lkpd-bangkit-lebih-kuat.jpg`, `lkpd-visi-smart.jpg`;
isinya mengikuti lembar cetak, yang pada LKPD Kejujuran **berbeda dari Lampiran 2 docx**
(lembar cetak tidak memuat tabel "Dilema Rafi"). Ketiga Lampiran 4 docx masih memakai judul
topik salin-tempel "Regulasi Emosi Remaja"; situs tidak mengulang kekeliruan itu, tetapi
menyebutnya sebagai temuan di analisis instrumen.

Foto Siklus 2: `assets/dokumentasi/jujur-01..03` (layanan Kejujuran Akademik) dan
`siklus2-01..03`. Yang kedua **dipakai bersama oleh layanan Resiliensi dan Visi Masa
Depan** atas keterangan pemilik (14 Oktober 2026), karena kedua folder mentahnya berisi
foto yang identik. Karena itu namanya netral dan keterangannya tidak menyebut tanggal.

Metode "studi kasus" yang tercantum di RPL Resiliensi **tidak ditulis di situs**, mengikuti
aturan "Tanpa studi kasus" di bawah. Perlu dikonfirmasi ulang ke pemilik apakah aturan itu
masih berlaku untuk layanan baru.

**Sumber Siklus 1 adalah `assets/SIKLUS 1 PPLM/`** (28 September 2026): RPL Penyesuaian Diri,
Regulasi Emosi, dan Manajemen Waktu versi bertanda tangan, beserta PPT-nya. Situs menaut ke
sana; salinan lama di `assets/RPL Penyesuaian…`, `RPL regulasi…`, `RPL manageman…` diabaikan
git. Regulasi: PPT 13 slide "Menghadapi Badai Emosi", LKPD "Singer Menghadapi Badai" lima
bagian. Manajemen Waktu: LKPD "Bener Melangkah: Menguasai Matriks Prioritas Hidup" dan
`PPT Manajemen Waktu.pptx` 8 slide. Keduanya
Experiential Learning, evaluasi proses /20, hasil /50, kepuasan 6-18. **Foto: selalu tiga
per layanan** dari folder dokumentasinya, diperkecil ke `assets/dokumentasi/regulasi-0N`,
`waktu-0N`; Menghargai memakai sosial-03, 04, 01.

Ketiga `.docx` Siklus 1 disegarkan dari `SIKLUS 1 PPLM baru.zip` pada 14 Oktober 2026.
Satu-satunya perubahan isinya adalah label semester pada kepala dokumen, dari "GENAP"
menjadi "SEMESTER 1 (GANJIL)"; seluruh foto dan PPT identik byte-per-byte. Teks Siklus 1
di situs karena itu **tidak diubah**, dan tautannya tetap sahih karena nama berkas sama.

**RPL lama.** Sumber yang sahih adalah berkas `.docx` di dalam `assets/`
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

Sejak 29 September 2026 ada 20 kegiatan lagi (24 foto total). Keterangannya diambil dari nama
berkas mentah pemilik (`assets/nonmengajar/*.jpeg`, diabaikan git), versi terbit `.jpg` bernama
rapi, maks 1400px. Daftar di situs dikelompokkan jadi empat kartu: pembiasaan dan ketertiban,
asesmen dan pendataan, layanan dan pendampingan murid, tugas sekolah dan administrasi BK.
Tiga nama berkas mentah tampak tertukar dengan isinya dan dirotasi: foto empat mata jadi
`konseling-individu`, foto berlatar layar "Sosialisasi Kokurikuler" jadi `panitia-kokurikuler`,
foto barisan pramuka jadi `pendampingan-kokurikuler`. Papan nama murid di foto pramuka dipikselkan.

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

**Refleksi diri berisi kekurangan secara keseluruhan dan apa yang perlu diperbaiki**
(permintaan pemilik 28 September 2026, menggantikan aturan lama "kekurangan jangan
ditonjolkan"). Tetap satu paragraf per kotak, nada wajar, bukan daftar kesalahan. Contoh
nada dari pemilik: kelas interaktif, tetapi murid kadang terdistraksi, jadi perlu menjaga
suasana kelas nyaman dan interaktif dari awal sampai akhir.

**Tanpa studi kasus, kecuali layanan Perundungan.** Pemilik portofolio menyatakan
layanannya tidak memakai studi kasus, jadi RPL Penyesuaian Diri (daftar media, satu
kegiatan) dan slide 8 PPT-nya yang masih menyebutnya tidak diikuti situs, sama seperti
roleplay. **Layanan Perundungan Siklus 4 adalah pengecualian** (keputusan pemilik
16 Oktober 2026): modelnya Problem Based Learning dengan studi kasus sebagai inti
kegiatan, jadi di situ studi kasusnya ditulis apa adanya.

## Privasi

Keputusan pemilik portofolio pada 20 September 2026: **foto dan video dokumentasi kelas
boleh terbit di situs publik, termasuk yang wajah muridnya terlihat.** Ini mengganti
aturan dua portofolio sebelumnya. Yang tetap berlaku:

- Daftar nama kelas tidak pernah masuk repo.
- Dokumen kerja (LK, PDF draft) tetap diabaikan lewat `.gitignore`.
- Sebelum `git push`, periksa isi `assets/`. Hanya berkas yang memang dimaksudkan untuk
  publik yang boleh ikut.

## Yang masih kurang

- [ ] Kotak "Dilengkapi setelah menonton ulang rekaman" di `#s1-video` sampai
      `#s4-video` (empat butir masing-masing).
- [ ] **Contoh perilaku kurang menghargai** hasil observasi (kotak alasan topik di
      `#s3-materi`) dan **penilaian Guru Pamong**.
- [ ] **Gambar LKPD Aksi Anti-Bullying** (`#s4-media`): berkas `LKPD Bullying.png` di
      folder Siklus 4 keliru, isinya lembar kerja Penyesuaian Diri Siklus 1.
- [ ] **Pengukuran Ular Tangga Motivasi**: angka instrumen awal dan akhir serta penilaian
      Guru BK sebagai pemakai (kotak `.kosong` di `#evaluasi`), ditambah dokumentasi
      pelaksanaan 13 April 2026 (kotak `.kosong` di `#rancangan`).
- [ ] **Seminar PPG**: luaran, umpan balik penguji, dan tindak lanjut di `#seminar`
      ppg-intisari.html masih placeholder.
- [ ] **Tugas UTS** dan **tugas UAS**: isi kartu placeholder di `#tugas` ppl.html.
- [ ] **Profil**: riwayat pendidikan, pengalaman, keterampilan, serta kontak dan CV di
      profil.html (empat kartu placeholder). Kartu Organisasi dan Prestasi dihapus atas
      permintaan pemilik 17 Oktober 2026; jangan dikembalikan.
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya
      rancangannya.
