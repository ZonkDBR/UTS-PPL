# E-Portfolio 1 - PPL Mandiri

Portofolio **Fahira Firzha Wianda** (NIM 26960002, IKIP Siliwangi, PPG Prajabatan
Bimbingan dan Konseling), PPL Mandiri di **SMA Negeri 1 Cisarua**.

Enam analisis atas dua layanan bimbingan klasikal di kelas XI J: rancangan layanan,
materi, media, video pelaksanaan, kegiatan nonmengajar, dan instrumen penilaian.

Satu halaman statis. Tanpa build step, tanpa framework, tanpa dependensi. Buka
`index.html` langsung dari berkas dan halaman tampil utuh.

```
index.html          seluruh isi situs
style.css           token warna, tata letak, animasi
script.js           satu IntersectionObserver: memunculkan isi, memekarkan kelopak, menandai nav
assets/profile.jpeg foto profil
assets/dokumentasi/ foto pelaksanaan dua layanan, sudah diperkecil untuk web
assets/lkpd/        pindaian dua LKPD yang dipakai di kelas
assets/video/       empat cuplikan rekaman pelaksanaan
assets/RPL .../     RPL dan PPT yang ditautkan sebagai unduhan dari halaman
```

## Gaya: neo-brutalism merah muda

Garis tebal, bayangan keras tanpa blur, blok warna datar, sudut membulat. Merah muda
tetap warna utama; kuning mentega dan lavender hanya blok pendukung. Yang membedakan tiap
bagian adalah bentuk layoutnya dan pergantian latar.

| Token | Terang | Gelap | Catatan |
|---|---|---|---|
| `--ink` | `#17121A` | `#FFF1F5` | teks utama, 18.5:1 di atas putih |
| `--muted` | `#5E4A56` | `#DCC4D0` | teks sekunder, 8.1:1 di atas putih |
| `--edge` | `#17121A` | `#FFF1F5` | **semua** garis dan bayangan |
| `--page` | `#FFF1F5` | `#1A141C` | latar halaman |
| `--card` | `#FFFFFF` | `#241C26` | kartu |
| `--wash-pink` | `#FFDCE8` | `#2B1F2E` | latar bagian |
| `--wash-lilac` | `#E6DBFF` | `#221C2E` | latar bagian |
| `--pink` `--butter` `--lilac` | `#FFD2E0` `#FFE68C` `#D9C8FF` | sama | blok terang, teksnya selalu `--on-block` |
| `--grape` | `#5B2BD9` | sama | isi tombol utama, teks putih 7.5:1 |
| `--blossom` | `#FF8FB3` | sama | **hiasan saja**, tidak pernah jadi latar teks |

**Bila salah satu nilai warna diubah, sapu ulang kontrasnya** sampai tidak ada satu pun
elemen teks di bawah 4.5:1, di mode terang maupun gelap.

Halaman mengikuti `prefers-color-scheme` dan `prefers-reduced-motion`. Di mode hemat
gerak, kelopak sakura dan animasi reveal mati sepenuhnya, garis dan bayangannya tetap ada
sehingga tampilannya utuh.

Acuan bahasa visualnya: <https://ppganthonioakbar.vercel.app/>.

## Yang masih kosong

Bagian **Kegiatan Nonmengajar** sengaja ditampilkan sebagai kotak "menunggu catatan",
bukan diisi karangan. Bagian **Video Praktik** sudah memuat empat cuplikan, tetapi
tautan rekaman utuh belum ada, dan hal-hal yang hanya bisa dinilai dari rekaman penuh
ditandai terpisah di halaman.

## Catatan privasi

Foto dan video dokumentasi kelas di repo ini memuat murid yang wajahnya dapat dikenali.
Penerbitannya adalah keputusan pemilik portofolio. Sebelum `git push`, periksa kembali
isi `assets/` dan pastikan hanya berkas yang memang dimaksudkan untuk publik yang ikut
terbawa. Dokumen kerja (LK, PDF) tetap diabaikan lewat `.gitignore`.

## Menerbitkan

Live di **<https://zonkdbr.github.io/UTS-PPL/>**, dilayani dari akar repo lewat GitHub
Pages (Settings, Pages, Source: `main`, folder `/ (root)`). Cukup `git push origin main`;
Pages menyebar ulang sekitar satu menit. Periksa lewat jendela incognito karena cache-nya
cukup agresif.
