# LK 3 E-Portfolio — PPL Mandiri

Situs statis satu halaman, tema merah muda dan sakura, bahasa Indonesia. Ini portofolio
ketiga dengan pola yang sama; dua sebelumnya jadi rujukan bentuk, bukan disalin isinya.

**Situs ini adalah tugas LK 3.** Tugas UTS dan UAS nanti ditambahkan ke portofolio yang
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
| Kelas layanan | XI J (kedua layanan) |

Sumber: header LK.1 dan LK.2 di folder ini. `<html lang="id">`.

## Bentuk teknis

```
index.html   seluruh isi situs
style.css    token warna, tata letak, animasi
script.js    IntersectionObserver: memunculkan isi, memekarkan kelopak, menandai nav aktif
assets/      foto profil, dokumentasi, LKPD, klip video, RPL dan PPT yang ditautkan
```

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
  kutipan, bento enam sel, baris klip scroll-snap, kotak kosong, lalu klaster plus blok
  rumus. Jangan menyamakan semuanya jadi tiga kartu seragam lagi.
- **Tanpa tanda pisah panjang** (em dash dan en dash) di teks yang terlihat. Pakai tanda
  hubung biasa.
- Nav membungkus jadi dua baris di bawah 56rem, karena itu `scroll-padding-top` di lebar
  tersebut dinaikkan ke 11rem. Kalau isi nav berubah, periksa lagi angka ini.
- **Stiker** memakai satu set `<symbol>` SVG di awal `index.html`, dipakai ulang lewat
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

## Enam bagian wajib

Urutan tetap, satu `<section id="…">` masing-masing, judul persis seperti tugas:

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
LK 3 (halaman ini) plus dua kartu placeholder UTS dan UAS bertanda `<!-- TODO -->`. Nav
punya tujuh tautan; bunga di nav tetap enam kelopak untuk enam analisis.

## Empat unsur penilaian

- **Profil guru** — hero dengan foto, nama, dan alasan memilih jadi Guru BK, disusul
  strip identitas (NIM, prodi, kampus, sekolah, kelas) tepat di bawahnya.
- **Kedalaman analisis** — lihat aturan tiga bagian di atas.
- **Refleksi diri** — kotak `.refleksi` di tiap bagian, plus satu refleksi penutup yang
  menarik benang merah keenamnya.
- **Navigasi & tampilan** — nav sticky satu baris dengan penanda bagian aktif, skip link,
  `scroll-padding-top`, `:focus-visible` terlihat, rapi sampai lebar 375px.

## Bahan yang tersedia

**Dua RPL, keduanya di kelas XI J.** Sumber yang sahih adalah berkas `.docx` di dalam
`assets/`, bukan PDF di akar folder.

**`assets/RPL self awareness (Pribadi)/RPL Pribadi.docx`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Pribadi** |
| Topik | Mengenal Diri Sendiri (Self Awareness): Kunci Memahami Kekuatan dan Kelemahan Diri |
| Sasaran | Kelas **XI J** · 1 × 45 menit · dilaksanakan **20 Agustus 2026** |
| Model | **Reflective Learning** (Pengalaman Konkret → Observasi Reflektif → Konseptualisasi → Penerapan Aktif) |
| Metode | Ceramah interaktif, jurnal refleksi singkat "Siapa Aku?", diskusi kelompok, LKPD |
| Media | PPT, LCD proyektor, laptop, lembar jurnal refleksi, LKPD |
| Sumber | Goleman (2007); Santrock (2011); POP BK (2016) |
| Evaluasi | Proses (4 butir skala 1–5, diisi Guru BK) + Hasil (9 butir SS–STS) + Kepuasan murid (6 aspek) |
| Lampiran | 1 Materi · 2 LKPD · 3 Evaluasi Proses · 4 Evaluasi Hasil · 5 Kepuasan |

**`assets/RPL menghargai guru dan teman (Sosial)/RPL Sosial.docx`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Sosial** |
| Topik | Membangun Sikap Menghargai Guru dan Teman di Lingkungan Sekolah |
| Sasaran | Kelas **XI J** · 1 × 45 menit · dilaksanakan **13 Agustus 2026** |
| Model | **Cooperative Learning** (Penyajian Materi → Kerja Kelompok/Roleplay → Presentasi → Refleksi Bersama) |
| Metode | Ceramah interaktif, roleplay dua skenario, diskusi kelompok, LKPD |
| Media | PPT, skenario roleplay, LKPD, laptop, LCD proyektor |
| Sumber | Lickona (2012); POP BK (2016) |
| Evaluasi | Struktur sama dengan RPL Pribadi |
| Lampiran | 1 Materi · 2 LKPD · 3 Evaluasi Proses · 4 Evaluasi Hasil · 5 Kepuasan Murid |

Dua PDF di akar folder (`RPL kepercayaan diri (Pribadi).pdf`, `RPL Sosial.pdf`) adalah
**draft lama**. PDF kepercayaan diri untuk kelas XI I dengan model Experiential Learning
tidak pernah dilaksanakan dan tidak boleh dipakai sebagai sumber.

**LKPD yang benar-benar dipakai berbeda dari lampiran RPL.** Lampiran Pribadi menulis
tabel "Peta Diriku", sedangkan yang dicetak adalah LKPD "Kesadaran Diri" berisi enam
bagian (Siapa Aku, Kekuatanku, Kelemahanku, Emosiku, Nilai-nilaiku, Pelajaran untuk
Diriku). LKPD Sosial berisi empat bagian, termasuk rencana tiga aksi nyata selama
sepekan lengkap dengan kepada siapa dan kapan. Keduanya ada sebagai gambar di
`assets/lkpd/`. Di bagian media, LKPD "Kesadaran Diri" ditulis sebagai
**pengembangan** dari rancangan lampiran, bukan sebagai kekeliruan.

**Kegiatan nonmengajar** (foto di `assets/nonmengajar/`). Peran yang dinyatakan pemilik
portofolio: **bertugas bersama Guru BK**. Tanggal tiap kegiatan tidak diketahui, jangan
disebutkan.

| Kegiatan | Peran |
|---|---|
| Sapa Pagi | Piket di gerbang, menyambut murid yang datang pagi |
| Penanganan siswa terlambat | Ikut menangani dan mendata murid yang terlambat |
| Upacara Senin | Ikut mengatur barisan murid saat upacara bendera |
| Selasa Sehat (SASESA, Salasa Sehat Sarerea) | Ikut senam bersama warga sekolah. Fotonya potongan dari unggahan Instagram sekolah, keterangannya menyebut sumber itu |

Berkas media lain: `assets/dokumentasi/` (seluruh foto pelaksanaan dua layanan yang sudah
diperkecil: `sosial-01..06`, `pribadi-01..07`, dipakai di slider kartu RPL),
`assets/video/klip-1..4.mp4` (empat cuplikan 3 sampai 5 detik, 1024×576), dan
`assets/video/home.mp4` (15,6 detik, potret, diputar otomatis tanpa suara di hero di atas
kotak "Kenapa saya memilih menjadi Guru BK"). Rekaman utuh praktik belum ada.

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

- [ ] **Tautan rekaman utuh** praktik mengajar mandiri (YouTube/Drive tak-terdaftar).
      Empat butir di kotak "belum bisa dinilai" pada `#video` menunggu ini.
- [ ] **Tugas UTS** dan **tugas UAS**: isi kartu placeholder di `#tugas`.
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya
      rancangannya.
- [ ] Memastikan keempat klip berasal dari layanan yang mana, agar keterangannya bisa
      lebih spesifik.
