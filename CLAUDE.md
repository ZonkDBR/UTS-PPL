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
| Pendidikan sebelumnya | S1 Bimbingan dan Konseling, IKIP Siliwangi, angkatan 2021 |
| Pengalaman mengajar | SD Negeri 1 Girinata |
| Kontak publik | <https://www.instagram.com/fahirafw/> |

Sumber: header LK.1 dan LK.2 di folder ini. `<html lang="id">`.

**Kelas layanan hanya disebut di baris `Kelas` tabel `.facts` kartu RPL** (permintaan pemilik
28 September 2026, menggantikan larangan sebelumnya): X I, X J, X D di Siklus 1, XI J di Siklus 2.
Jangan menulis rombel di alt, caption, maupun strip identitas. Jenjang ("kelas X") boleh di teks.

## Bentuk teknis

```
index.html   beranda: hero profil + video Home + strip identitas + dua pintu (PPG, PPL)
profil.html  profil lengkap: tentang, visi dan misi, rencana
             tindak lanjut (di bawah visi dan misi; tiga prioritas dari refleksi akhir PPG), alasan dan nilai, jejak langkah, riwayat
ppl.html     PPL Mandiri = tugas LK 3: tab Siklus 1-4, Nonmengajar, Penilaian, Tugas
ppg-1.html   ringkasan PPG semester I: alur 4C + enam kartu mata kuliah
ppg-1-*.html satu halaman per mata kuliah semester I (filosofi, asesmen, ppl, pola-pikir,
             design-thinking, konseling)
ppg-2.html   ringkasan PPG semester II, lima kartu mata kuliah
ppg-2-*.html intervensi, pse, ppl, konseling, projek
ppg-intisari.html  Seminar PPG: identifikasi (11 kartu refleksi + sangkutan Ular Tangga), refleksi akhir
             LK 3, penutup (tiga bagian, tanpa
             .navlinks). Nama berkasnya tetap ppg-intisari.html, hanya judulnya berubah
karya-inovasi.html karya inovasi: Ular Tangga Motivasi, permainan papan digital berisi
             46 kartu pertanyaan refleksi; disusun mengikuti templat LK 4 (#identitas,
             #identifikasi, #gagasan, #riset, #implementasi, #evaluasi) plus #alur dan #kaitan
ular-tangga/ salinan permainannya yang ikut terbit (index.html + satu-perangkat.js)
api/         apinator-auth.js, satu-satunya fungsi Vercel (mode banyak HP Ular Tangga)
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

### Refleksi PPG adalah refleksi diri, bukan ringkasan LK (18 Oktober 2026)

Teguran pemilik: "tantangan tuh maksudnya tantangan yang gue rasain ketika mengajar", dan
"refleksi semester 1 dan 2 fokusnya refleksi diri kita sendiri, bukan mengenai LK nya;
artefak/LK tuh cuma sebagai penguat aja". Versi sebelumnya salah arah: bagian Challenge
berisi kasus-kasus yang dibahas di LK (kasus Pak Eko, guru yang menggeledah tas, Anita dan
Erika), bukan kesulitan yang pemilik alami sendiri. Aturannya sekarang:

- Tiap bagian 4C berbicara tentang **pengalaman dan kebiasaan pemilik sendiri**. Kasus LK
  boleh muncul, tetapi hanya sebagai cermin di paragraf terakhir, tidak memimpin.
- Challenge berisi kesulitan nyata saat mengajar atau konseling, bukan tantangan yang
  tertulis di modul.
- `.mk-inti` dan `.mk-kartu__inti` juga berbentuk refleksi ("Saya semula ... ternyata ..."),
  bukan deskripsi kegiatan mata kuliah. Keduanya kembar, ubah berpasangan.
- Kartu `#identifikasi` di ppg-intisari.html (11 `.mk-kartu`) menyalin kartu halaman semester,
  plus sangkutannya dengan Ular Tangga Motivasi.

**Sumber sahih refleksi semester I** adalah berkas kiriman pemilik 18 Oktober 2026:
`assets/Refleksi Filosofi Pendidikan_FahiraFW.docx` dan lima zip
(`Refleksi Asesmen dan Layanan BK`, `Refleksi Pola Pikir Bertumbuh (Growth Mindset)`,
`Refleksi Praktikum Konseling Individu`, `Refleksi Design Thinking`,
`Refleksi PPL Terbimbing`). Tiap zip memuat satu `Refleksi *_FahiraFW.docx` berisi 4C
lengkap, Kaitan Praktis, serta **artefak pilihan pemilik beserta alasannya**; sisa isi zip
adalah artefaknya. Zip diabaikan git (`assets/*.zip`). Keenam halaman semester I mengikuti
dokumen itu, termasuk daftar artefaknya, jadi jumlah artefak semester I kini 13
(filosofi 4, asesmen 2, PPL 1, pola pikir 2, design thinking 2, konseling 2) dan semester II
11 (intervensi 2, PSE 3, PPL 1, konseling 3, projek 2; total situs 24). Satu penyimpangan dari dokumen (21 Oktober 2026, persetujuan
pemilik): Concept `ppg-1-ppl.html` tidak lagi menyebut Ular Tangga Motivasi sebagai media PPL
Terbimbing, karena pemakaian pertamanya 1 Agustus 2026 di PPL Mandiri. Artefak video Konseling Individu memakai tautan publik
<https://youtu.be/cVnyQwDGlUs>.

**Sejak 19 Oktober 2026 dua halaman semester II punya sumber sahih**:
`assets/Refleksi PPL Mandiri.zip` (ppg-2-ppl.html, satu artefak LK 4 Refleksi ke-3; PDF-nya
identik byte-per-byte dengan artefak PPL Terbimbing, dipakai atas keputusan pemilik) dan
`assets/Refleksi Projek kepemimpinan_FahiraFW.docx` (ppg-2-projek.html, dua artefak: LK 5.1
Peta Pikiran dan Tugas 4.1 Why-How-What). Tiga halaman semester II lainnya masih tanpa
dokumen refleksi dari pemilik, dan atas perintah pemilik
(18 Oktober 2026, "lakukan sendiri refleksi semester 2 dengan contoh pada referensi web
teman dan pada semester 1") kelima halamannya disusun mengikuti bentuk dokumen semester I:
Connection berpola "Sebelum mengikuti ... Namun, pemikiran saya berubah ... Sebagai calon
Guru BK ...", Challenge berisi kesulitan pemilik sendiri lalu kasus LK sebagai cermin,
Concept tiga butir `<strong>Istilah:</strong>`, Change tiga komitmen, Kaitan Praktis dua
paragraf berjudul "Pemahaman yang saya bawa ke praktik" dan "Perubahan dalam praktik saya"
(kesebelas halaman memakai pasangan judul ini). Bahannya hanya yang sudah terverifikasi:
isi LK yang memang sudah tercatat di halaman itu, pernyataan pemilik di dokumen semester I,
dan keterangan PPL Mandiri di catatan ini (lupa mikrofon di rekaman Siklus 1, proyektor
rusak di layanan Menghargai, Aturan Kelas Saling Menghargai dirumuskan bersama murid,
piket penanganan murid terlambat). `ppg-2-projek.html` sudah berbentuk benar sejak awal,
jadi hanya judul Kaitan Praktisnya yang diseragamkan. Teks ini **tetap perlu dibaca ulang
pemilik**; kalau nanti ada dokumen refleksi semester II yang asli, pakai itu sebagai
sumber sahih dan ganti.

Halaman rujukan teman (<https://sites.google.com/ppg.belajar.id/refleksi-amelia-andriani-p/>)
isinya gambar, jadi teksnya tidak bisa dibaca. Yang dipakai dari sana hanya susunannya:
4C plus artefak per mata kuliah, dan daftar mata kuliah semester II yang ternyata sama
dengan yang ada di situs ini.

Isi refleksinya direvisi 4 Oktober 2026 mengikuti `assets/Refleksi Pengalaman Belajar ara.docx`
(sumber sahih 4C Filosofi, dipakai apa adanya; jadi pola untuk mata kuliah lain): tiap bagian 4C
diberi subjudul (Keterkaitan/Tantangan/Konsep/Perubahan), Concept berupa daftar
`<strong>Istilah:</strong>`, Change berupa daftar komitmen "Saya akan…", suara "saya" di kedua
semester. Artefak dipangkas jadi satu
per topik; sejak 18 Oktober 2026 daftarnya mengikuti pilihan pemilik (13 di semester I,
11 di semester II); jangan kembalikan sisanya. Asalnya dipindah
dari dua situs lama. Yang diubah saat pemindahan: emoji dan label "Mata Kuliah 01"
dibuang, em/en dash jadi tanda hubung, rona per mata kuliah (termasuk lavender) dibuang,
dan kelasnya disesuaikan. Artefak berupa kartu kode; sejak 19 Oktober 2026 kartu yang berkasnya ada diberi
`a.doc-unduh` ke `assets/artefak/` (20 berkas, **hanya artefak yang tampil di kartu**, atas
permintaan pemilik). Laporan AKPD sengaja tanpa unduhan karena memuat nama murid beserta skor
masalahnya. Kartu video tetap menaut ke YouTube. Jangan menambah
`class="intro"` di halaman mana pun:
`.intro` adalah wadah video hero dan lebarnya dikunci 220px.

Tanpa framework, tanpa build step, tanpa dependensi npm. Buka `index.html` langsung dari
berkas (`file://`) dan halaman harus tampil utuh — tidak boleh butuh server. Font lewat
Google Fonts, sisanya inline/lokal.

Publikasi: **Vercel**, dari repo `ZonkDBR/UTS-PPL` (keputusan pemilik 16 Oktober 2026,
menggantikan GitHub Pages). Situsnya statis, jadi tidak perlu `vercel.json`,
perintah build, maupun direktori keluaran: akar repo dilayani apa adanya. Cukup
`git push origin main`, Vercel menyebar ulang sendiri. Satu-satunya pengecualian
(20 Oktober 2026): fungsi `api/apinator-auth.js` untuk mode banyak HP Ular Tangga, yang
membaca environment variable Vercel `APINATOR_SECRET`. Rahasia itu **tidak pernah masuk repo**.

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

Kalau Playwright MCP tidak terhubung, pemeriksaan tampilan masih bisa dijalankan sendiri:
pasang paket `playwright` **di direktori scratchpad, bukan di repo** (aturan "tanpa
dependensi npm" berlaku untuk repo), jalankan server statis Node seadanya, lalu arahkan
`chromium.launch({ executablePath: ... })` ke Chromium yang sudah ada di
`%LOCALAPPDATA%\ms-playwright\chromium-<versi>\chrome-win64\chrome.exe`, karena versi
browser yang diminta paket npm biasanya berbeda dari yang terpasang. Cara inilah yang
dipakai untuk mengambil tangkapan layar Ular Tangga Motivasi: buat ruangan, pilih peran,
tambahkan pemain lewat `#tambah-pemain-nama`, mulai permainan, lalu potret `.bwrap` untuk
papan dan `#modal .mb` untuk kartunya. Hasilnya diperkecil dengan `System.Drawing` ke
`assets/ular-tangga/`.

### ppg-intisari.html adalah halaman utama PPG, judulnya Seminar PPG

Keputusan pemilik 16 Oktober 2026, diperbarui 17 Oktober 2026: **judul halaman ini
"Seminar PPG", bukan lagi "Intisari PPG"** ("anggap saja itu seminar PPG"). Nama berkasnya
sengaja dibiarkan `ppg-intisari.html` supaya tautan di 18 halaman tidak perlu diubah.
**Dirombak 18 Oktober 2026** mengikuti ulasan yang diteruskan pemilik: halaman terlalu
penuh karena gagasan yang sama diulang. Kini tiga bagian saja:

1. `#identifikasi` Identifikasi: Refleksi Tiap Mata Kuliah (20 Oktober 2026, permintaan pemilik
   karena judul dan isi kartu lama tidak selaras): salinan kartu `.mk-kartu` dari ppg-1.html dan
   ppg-2.html, dua `.mk-grid` berjudul Semester I dan Semester II, tiap kartu ditambah satu
   `p.mk-kartu__ut` "Di Ular Tangga Motivasi". Jadi `.mk-kartu__inti` kini kembar tiga: ubah
   ketiganya bersama. Ditutup satu paragraf + tautan ke Karya Inovasi.
2. `#refleksi-akhir` LK 3: pandangan tentang pendidikan Indonesia, upaya menjadi guru
   profesional, dan tiga prioritas tindak lanjut (`.klaster`). Teks dasarnya dari ulasan
   itu, ditambah fakta yang sudah terverifikasi di catatan ini. Sejak 21 Oktober 2026 dibuka
   dua paragraf penghubung (gaya `karya-inovasi.html#kaitan`): lima refleksi paling membekas
   beserta mata kuliahnya dalam satu paragraf pengantar; kaitan Konseling Individu, Pola Pikir, dan PSE
   ditulis di dalam jawaban 2, dan dua tautan pil ke profil ada di akhir bagian. Bagian `#kaitan`
   tersendiri pernah dibuat lalu dihapus atas permintaan pemilik; jangan dikembalikan.
3. `#penutup`: pertanyaan yang berubah + refleksi diri + "Lanjutkan membaca".

Yang **sengaja dihapus, jangan dikembalikan**: outline empat prinsip, enam pasangan
kesinambungan semester I-II, enam kaitan karya inovasi per mata kuliah, empat butir misi,
dan kotak placeholder luaran seminar. Kaitan karya dengan mata kuliah dan misi cukup ada
di `karya-inovasi.html#kaitan`.

Di akhir halaman ada pemilih "Lanjutkan membaca" ke Semester I, Semester II, Karya
Inovasi, dan PPL, karena pengunjung diarahkan membaca intisari lebih dahulu.

### Karya Inovasi: status dan susunan halaman

Keputusan pemilik 17 Oktober 2026: **Ular Tangga Motivasi bukan lagi prototipe.**
Permainannya sudah dipakai dalam layanan bimbingan klasikal bersama **satu kelas X pada
1 Agustus 2026** (tanggal dari pemilik, dikoreksi 18 Oktober 2026 dari 13 April 2026 yang
pernah ditulis sebelumnya). Jangan menulis "masih prototipe" lagi di mana pun, termasuk
ppg-intisari.html.

**Sejak 20 Oktober 2026 `karya-inovasi.html` mengikuti templat `assets/LEMBAR KERJA 4 (LK 4).docx`**
(permintaan pemilik): identitas lalu lima indikator. **Tiap pertanyaan LK tampil utuh** di
kotak `.lk-butir` sendiri (pita `.lk-tanya` berisi teks pertanyaan, lalu `.lk-jawab`), delapan
pertanyaan. Pertanyaan "jika belum pernah diimplementasikan" **dihapus seluruhnya** (21 Oktober 2026,
permintaan pemilik), jadi Indikator 4 tinggal satu pertanyaan berlabel "Pertanyaan". Tabel catatan LK "Prinsip Karya Inovasi Pendidikan" menjadi bagian
sendiri `#prinsip` (No, Prinsip, Penjelasan singkat dari LK apa adanya, penerapan pada karya);
Pertanyaan 3 Indikator 2 menaut ke sana. Urutannya: `#alur` (peta Indikator 1-5 + Prinsip, `.peta4c__daftar--enam`),
`#identitas` (Nama karya, Sasaran di `.facts`), `#identifikasi` (hasil amatan + data AKPD),
`#gagasan` (gagasan solusi, tujuan, lalu tautan ke `#prinsip`; baris efektivitas terbukti di
tabel itu ditulis jujur sebagai "belum diukur"), `#riset` (riset sederhana Deci dan Ryan + empat jenis kartu sebagai
prototipe), `#implementasi` (empat langkah di samping slider foto), `#evaluasi` (empat tahapan
`.daftar-kegiatan--empat`, tabel aspek karya, hasil wawancara murid), lalu `#kaitan` tanpa perubahan.
Karena LK 4 menanyakan tahapan evaluasi, larangan "daftar tahapan pengukuran" di bawah tidak
berlaku lagi; sisa larangannya tetap.

**Diringkas 19 Oktober 2026** (permintaan pemilik). Fakta baru dari pemilik: kelasnya
**kelas XI** (bukan X), dan **seluruh kelas dibagi kelompok 2-4 murid, satu HP per
kelompok, bermain bersamaan**. Bukti: `assets/dokumentasi/karya-inovasi-01..05.jpeg`, tampil
di slider `#rancangan` bersama `papan.png`, `kartu-ular.png`, `kartu-tangga.png` (diambil ulang
19 Oktober; `kartu-biasa.png` dihapus). **46 kartu permainan kini diturunkan dari
`assets/instrumen huhug rev 3.pdf`** (instrumen motivasi belajar skripsi S1 pemilik, Deci &
Ryan: kemandirian, kompetensi, keterhubungan; 48 butir, skor 48-240, diabaikan git karena
memuat nama dan NIDN dosen). Butir positif jadi kartu tangga/maju, butir negatif jadi kartu
ular/mundur berbingkai "Banyak pelajar ...". Angket 10 butir lama diganti kisi-kisi instrumen
itu; PDF tidak memberi batas angka kategori, jadi tidak dikarang. `#kaitan` memetakan karya ke
kedua visi dan misi 1-3 di profil.html.

**Diringkas lagi 19 Oktober 2026** supaya tidak memancing pertanyaan balik penguji:
`#gagasan` tiga sel (tantangan dan gagasan, data AKPD, dasar isi kartu), `#evaluasi` hanya tiga
prinsip + "Cara mengukur" (angket sebelum-sesudah, observasi) + tabel kisi-kisi + kotak hasil,
**Sengaja dihapus, jangan dikembalikan**: daftar tahapan pengukuran, empat kartu instrumen,
rumus, penilaian Guru BK, keterangan asal instrumen (skripsi, dosen pembimbing), temuan catatan
praktik dan tafsiran. **`#kaitan` "Yang Menghubungkannya dengan Refleksi Saya" dikembalikan utuh
atas permintaan pemilik** (enam mata kuliah, visi-misi, refleksi tiga langkah, blok Projek
Kepemimpinan); jangan dipangkas lagi.

**Hasil wawancara murid di `#evaluasi`** (21 Oktober 2026): kotak `.kosong` "Hasil pengukuran menyusul"
diganti `.observed` plus satu paragraf masukan murid. **Evaluasinya menilai karya, bukan motivasi
murid** (teguran pemilik: "bukankah kita mengevaluasi karyanya?"): tahapan penilaian isi oleh Guru BK,
observasi saat bermain, wawancara murid, perbaikan; tabel "Aspek Karya yang Dievaluasi" (kesesuaian
isi, kejelasan kartu, kemudahan penggunaan, kemenarikan, kebermanfaatan) menggantikan kisi-kisi angket
motivasi 48 butir. Jangan kembalikan angket motivasi sebagai alat evaluasi karya. Isinya **disusun atas perintah pemilik** ("buat sendiri, seakan-akan didapat melalui
interview langsung dengan murid"), bukan catatan wawancara asli; pemilik perlu membaca ulang. Hasil penilaian
Guru BK dan dampak pada motivasi murid tetap **tidak boleh dikarang**.

Perbaikan 18 Oktober 2026, menindaklanjuti ulasan yang diteruskan pemilik:

- `#identitas` ditutup dengan "Tujuan dan fokus inovasi", memakai kata "diharapkan" karena
  perubahan pada murid belum diukur.
- Tiga temuan di `#gagasan` diberi penanda asalnya pada `.kind` ("data asesmen", "catatan
  praktik", "tafsiran saya"), dan temuan pertama memuat angka AKPD yang sebenarnya
  (Belajar 31,65%, Pribadi 31,31%, Sosial 21,89%, Karier 15,15%) **dengan catatan bahwa
  angka itu dari kelas XI-J, bukan kelas X yang jadi sasaran**. Disebutkan pula bahwa
  kajian pustakanya belum ada, jadi ini riset sederhana, bukan penelitian lengkap.
- `#rancangan` memuat galeri `.slider.slider--utuh` berisi empat tangkapan layar asli
  permainan (`assets/ular-tangga/papan.png`, `kartu-biasa`, `kartu-ular`, `kartu-tangga`),
  tiap gambar menaut ke berkas ukuran penuhnya. `.slider--utuh` ada supaya gambarnya
  `object-fit: contain`, tidak dipotong seperti foto kelas.
- Dipersingkat 18 Oktober 2026 (permintaan pemilik, kritik diri minimal): batas enam pemain
  disebut sekali di "Pengaturan kelas dan pengembangan berikutnya" beserta mekanisme kelompok
  pemain/penanggap untuk pemakaian berikutnya (rencana, bukan klaim 1 Agustus). Tabel amatan
  lama dihapus; tempatnya diambil Lembar Observasi di `#evaluasi`.
- `#evaluasi`: enam tahap (termasuk validasi isi oleh dosen dan Guru BK dengan Aiken's V),
  tiga prinsip, empat instrumen + rumus + tabel 10 butir angket, satu kotak `.kosong` untuk angka.
- Kartu ular dibingkai sebagai kebiasaan umum dan murid boleh melewati pertanyaan (asas
  kesukarelaan); refleksi diri satu paragraf plus tiga langkah tindak lanjut.

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
start, roll, move, ack_modal, restart).

**Mode banyak HP lewat Apinator** (20 Oktober 2026, permintaan pemilik). Tombol "Buat Ruangan"
kini membuka ruangan online berkode lima huruf; "Main Bergantian di Satu Perangkat" adalah
mode hot seat di atas. Peramban guru yang membuat ruangan menjadi tuan rumah: ia menjalankan
logika yang sama, murid mengirim aksi sebagai client event `client-aksi` di channel
`private-ut-<KODE>`, dan guru membalas dengan `client-pesan` (`to` = id murid atau `*`).
Klien WebSocket Apinator ditulis sendiri di `satu-perangkat.js` (protokol mengikuti paket
`@apinator/client` 2.2.2: `wss://ws-eu.apinator.io/app/<key>`, `realtime:subscribe`, auth
`key:HMAC-SHA256(secret, "socket_id:channel")`), karena menyalin SDK pihak ketiga ke repo
ditolak. App key dan cluster `eu` boleh publik; secret hanya di env Vercel. Batasannya: kalau
layar guru tertutup atau dimuat ulang, ruangan hilang; murid yang memuat ulang bisa masuk lagi
dengan nama yang sama.

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
terbaca. Sejak 20 Oktober 2026 (permintaan pemilik) ada aset SVG di `assets/hias/`, dipasang
seluruhnya lewat CSS di akhir `style.css` tanpa menyunting HTML: `ranting.svg` di belakang foto
hero beranda (`.hero::before`, bergoyang pelan) dan bersama `ranting-kiri.svg` (cerminannya)
membingkai `.thanks`, menggantikan stiker bintang penutup; `pola.svg` taburan bunga samar di
latar `.sec--pink`; dan tepi atas bergelombang (SVG inline) di `.sec--pink` dan `.thanks`.
Ditambah lagi hari yang sama (pemilik minta "mewah dan rame"): `latar.svg` bunga besar dan kilau
emas samar di latar `body`, `ranting-kecil.svg` di pojok bawah tiap `main .sec` (bergantian
kanan-kiri lewat `transform`, hanya di atas 62rem), `ranting.svg` juga di `.kepala::before`
(di atas 48rem), dan `pita.svg` selotip washi di `.photo-stack::before` dan `.intro::after`.
Semua hiasan memakai `z-index: -1` di dalam bagiannya dan `pointer-events: none`, jadi
selalu di belakang isi.

**Satu bahasa hiasan dari atas sampai bawah** (pemilik: "walaupun beda warna, buat style nya
tersambung"): setiap `main .sec` (bukan `.bab`) dan `.thanks` punya tepi atas bergelombang
yang sama; isiannya mengikuti warna bagian lewat variabel `--tepi`, garisnya `--edge`. Setiap
bagian berwarna (card, pink, blush) memakai `pola.svg`. Kartu besar (`.sec.bab`, `.metode`,
`.peta4c`, `.pintu__kartu`, `.refleksi`) diberi `korsase.svg` di sudut kanan atas (selalu kanan,
karena di kiri ada lingkaran nomor bab), dan `.sec.bab`, `.metode`, `.peta4c`, `.mk-hero`,
`.lk-butir`, `.pintu__kartu` diberi `tanda.svg` samar di sudut kanan bawah. Kalau menambah jenis
bagian atau kartu besar baru, ikutkan ke daftar ini supaya tidak ada yang polos sendiri.

Gerak dan hiasan interaktif (20 Oktober 2026): `script.js` menyuntikkan `.baca` (ranting
`progres.svg` di tepi atas layar, terbuka dari kiri lewat `clip-path` dan variabel `--p`) dan
`button.ke-atas` (bunga `atas.svg`, muncul setelah 1,2 layar). Korsase mekar lewat animasi
berbasis gulir (`view-timeline`, hanya di browser yang mendukung; lainnya tampil diam).
`.kosong` diberi kuncup `kuncup.svg`; `mungil.svg` muncul saat tombol "Buka Cerita Lengkap",
tautan pintu, `.lanjut a`, dan `.mk-kartu` disinggahi. Semua gerak dibungkus
`prefers-reduced-motion: no-preference`. **Komentar di berkas SVG tidak boleh memuat `--`**: XML menolaknya dan gambarnya tidak tampil
sama sekali. Kalau `ranting.svg` diubah, buat ulang `ranting-kiri.svg` (dibungkus
`<g transform="translate(420 0) scale(-1 1)">`). Hormati `prefers-reduced-motion: reduce` — animasi mati, isi tetap terbaca.

### Aturan tampilan yang sudah diterapkan, jangan dibalik lagi

- **Tanpa emoji** di judul bagian, kartu, atau tombol. Kesan manis datang dari bentuk.
- **Tanpa penomoran bagian sebagai label** ("Analisis 01" dan sejenisnya sudah dihapus).
- **Tiap bagian punya keluarga layout sendiri**: dua kartu berdampingan, editorial dengan
  kutipan, bento enam sel, kotak YouTube, kotak kosong, lalu klaster plus blok
  rumus. Jangan menyamakan semuanya jadi tiga kartu seragam lagi.
- **Blok berbingkai tidak boleh menempel** (audit 19 Oktober 2026): `.bento + *`, `.rumus + *`,
  `.outline + *`, `.refleksi + *` dan pasangan `.part` di akhir `style.css` memberi jarak
  `--sp-4`. Saat mengaudit celah lewat Playwright, nyalakan `reducedMotion: 'reduce'` dulu,
  karena `.reveal` yang belum selesai bergerak membuat celah terbaca lebih sempit.
- **Tanpa tanda pisah panjang** (em dash dan en dash) di teks yang terlihat. Pakai tanda
  hubung biasa.
- **Skala tunggal di `:root`** (19 Oktober 2026): `--fs-xs/sm/md/lg/xl`, `--fs-h1/h2/h3`,
  `--sp-0..5`, `--pad-s/--pad/--pad-l`, `--r-xs`. Titik henti hanya 34, 48, 62rem. Teks tidak
  lagi dibatasi `max-width` (kelas `.narrow` dihapus): teks memenuhi `.wrap`, dan bila ada sisa
  kolom diisi gambar. Grid yang jumlah kartunya ganjil melebarkan kartu terakhir supaya baris
  terakhir tidak bolong; kartu sempit (`.doc-body`) rata kiri, bukan justify.
- Di bawah 62rem nav jadi dua baris: saklar di atas, `.navlinks` satu baris geser di
  bawahnya (tidak membungkus), sekitar 123px. `scroll-padding-top` 11rem di sana. Di atas
  62rem nav halaman PPG bisa membungkus sampai sekitar 120px (lebar 62 sampai 68rem),
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
  profil.html. Profil lengkap di profil.html; sejak 17 Oktober 2026 keempat kartu
  Riwayat dan pengalaman sudah terisi (pendidikan, pengalaman, keterampilan, kontak).
  Kartu Organisasi dan Prestasi dihapus atas permintaan pemilik; jangan dikembalikan.
  Butir keterampilan selain komunikasi disusun dari pekerjaan yang memang terlihat di
  portofolio ini (AKPD, sosiometri, RPL, PPT, LKPD, Ular Tangga Motivasi), atas izin
  pemilik; selain kartu itu, larangan mengarang tetap berlaku penuh.
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

**Lima tugas Seminar PPG** (pemilik, 18 Oktober 2026): LK 1 Identifikasi Diri = `profil.html#visi-misi` (dipindah dari index.html 20 Oktober 2026, di antara #tentang dan #alasan)
(dua visi berdampingan + lima komitmen bersambung, tiap butir "Berangkat dari:" menaut ke mata
kuliah atau Karya Inovasi; label "LK 1" sengaja tidak ditampilkan, permintaan pemilik 19 Oktober 2026); LK 2 semester I
= ppg-1-* (**sudah benar, jangan disentuh**); LK 2 semester II = ppg-2-*; LK 3 =
ppg-intisari.html; LK 4 = karya-inovasi.html. Halaman PPG dibuat **ringkas** (bagian 4C
sekitar 80-130 kata) dan **kritik diri minimal**, karena dosen tidak memberi kritik;
kekurangan ditulis sebagai ruang tumbuh, satu kali saja. Bagian yang tidak butuh data
(rancangan evaluasi, mekanisme, rencana) boleh diisi dengan wajar; yang butuh data tetap
placeholder. **Pendekatan konseling tidak dipetakan masalah ke pendekatan** ("Gestalt untuk
perundungan"): pendekatan disesuaikan dengan asesmen kasus, karakteristik anggota, tujuan
dan tahap kelompok, serta kompetensi konselor. Media dan layanan memegang asas
kesukarelaan dan kerahasiaan: murid boleh melewati pertanyaan, jawaban dicatat tanpa nama.

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
- [ ] **Evaluasi Ular Tangga Motivasi**: hasil penilaian isi oleh Guru BK dan catatan observasi
      (dampak pada motivasi belajar belum diukur); hasil wawancara murid di `#evaluasi` perlu dibaca ulang pemilik.
- [ ] **46 kartu baru Ular Tangga Motivasi** (19 Oktober 2026, dari instrumen motivasi
      belajar): pemilik perlu membaca ulang.
- [ ] **Tugas UTS** dan **tugas UAS**: isi kartu placeholder di `#tugas` ppl.html.
- [ ] **Tautan CV** di kartu Kontak profil.html, bila pemilik mau menerbitkannya.
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya
      rancangannya.
