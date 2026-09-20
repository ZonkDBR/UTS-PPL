# E-Portfolio 1 — PPL Mandiri

Situs statis satu halaman, tema merah muda dan sakura, bahasa Indonesia. Ini portofolio
ketiga dengan pola yang sama; dua sebelumnya jadi rujukan bentuk, bukan disalin isinya.

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

Publikasi: GitHub Pages dari akar repo (`main`, folder `/`). Alamat Pages itulah yang
dikirim sebagai jawaban tugas.

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

## Tema: satu keluarga merah muda

Enam rona berbeda per bagian sudah dihapus pada redesain 20 September 2026. Sekarang
satu aksen untuk seluruh halaman; pembeda antarbagian adalah bentuk layout dan
pergantian latar, bukan warna.

```css
/* terang */
--page: #FFF6F8;  --sand: #FBF1E9;  --card: #FFFFFF;
--ink:  #3A2430;  /* 13.4:1 di atas --page */
--muted:#7A5A66;  /*  5.5:1 di atas --page, 5.0:1 di atas --tint */
--rose: #B9265A;  /*  6.0:1 di atas putih, 5.2:1 di atas --tint */
--blossom: #FF9FB6;  /* HIASAN SAJA */
--tint: #FFE8EE;  --tint-2: #FFD5E0;  --line: #F6E3EA;

/* gelap, lewat prefers-color-scheme */
--page:#1E141A; --sand:#241820; --card:#291B23; --ink:#FBEFF3;
--muted:#D0AFBE; --rose:#FFA6C0; --blossom:#C4567C;
--tint:#3A2330; --tint-2:#4A2C3B; --line:#402A36;

--display: "Fredoka", "Poppins", "Segoe UI", system-ui, sans-serif;
--body:    "Plus Jakarta Sans", "Poppins", "Segoe UI", system-ui, sans-serif;
```

**Aturan warna yang tidak boleh dilanggar:** pastel hanya untuk latar dan hiasan. Teks
selalu `--ink`, `--muted`, atau `--rose`. Kalau ada nilai warna diubah, hitung ulang
rasio kontrasnya sampai >= 4.5:1 di atas putih, di atas `--tint`-nya sendiri, dan di atas
`--page`, untuk kedua mode.

Satu skala radius saja: kartu dan gambar 20px, elemen interaktif pill.

Hiasan sakura: kelopak berjatuhan dari CSS murni (bukan gambar, bukan library) dan satu
mark bunga enam kelopak di nav yang mekar mengikuti bagian yang terbaca. Hormati
`prefers-reduced-motion: reduce` — animasi mati, isi tetap terbaca.

### Aturan tampilan yang sudah diterapkan, jangan dibalik lagi

- **Tanpa emoji** di judul bagian, kartu, atau tombol. Kesan manis datang dari bentuk.
- **Tanpa penomoran bagian sebagai label** ("Analisis 01" dan sejenisnya sudah dihapus).
- **Tiap bagian punya keluarga layout sendiri**: dua kartu berdampingan, editorial dengan
  kutipan, bento enam sel, baris klip scroll-snap, kotak kosong, lalu klaster plus tile
  rumus. Jangan menyamakan semuanya jadi tiga kartu seragam lagi.
- **Tanpa tanda pisah panjang** (em dash dan en dash) di teks yang terlihat. Pakai tanda
  hubung biasa.

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
| Sasaran | Kelas **XI J** · 1 × 45 menit · dilaksanakan **9 September 2026** |
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
| Sasaran | Kelas **XI J** · 1 × 45 menit · dilaksanakan **27 Agustus 2026** |
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
`assets/lkpd/` dan perbedaan ini sudah dibahas sebagai temuan di bagian media.

Berkas media lain: `assets/dokumentasi/` (foto pelaksanaan dua layanan yang sudah
diperkecil), `assets/video/klip-1..4.mp4` (empat cuplikan 3 sampai 5 detik, 1024×576).
Rekaman utuh belum ada, catatannya masih "Videonya ada di HP".

Tiga dokumen LK di folder ini bukan sumber untuk keenam analisis. Pakai hanya untuk
konteks sekolah dan profil.

## Aturan konten

Bahasa Indonesia, sudut pandang orang pertama, nada hangat tapi tidak berlebihan.

**Jangan mengarang analisis.** Bagian yang datanya belum ada diberi placeholder eksplisit
(`<!-- TODO: … -->` plus teks placeholder yang terlihat), bukan diisi karangan yang
terdengar meyakinkan. Portofolio ini dinilai sebagai karya nyata. Keterangan foto dan
klip hanya boleh menyatakan apa yang benar-benar terverifikasi.

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
- [ ] **Catatan kegiatan nonmengajar** — apa saja, kapan, peran apa. `#nonmengajar` masih
      berupa kotak kosong yang jujur.
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya
      rancangannya.
- [ ] Memastikan keempat klip berasal dari layanan yang mana, agar keterangannya bisa
      lebih spesifik.
