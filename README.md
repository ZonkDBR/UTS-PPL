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
| `--wash-pink` | `#FFDCE8` | `#2E1F27` | latar bagian |
| `--wash-blush` | `#FFE9F0` | `#261A21` | latar bagian |
| `--blush` `--pink` `--butter` | `#FFE4EC` `#FFD2E0` `#FFE68C` | sama | blok terang, teksnya selalu `--on-block` |
| `--rose` | `#C2185B` | sama | isi tombol utama, teks putih 5.9:1 |
| `--blossom` | `#FF8FB3` | sama | **hiasan saja**, tidak pernah jadi latar teks |

**Tidak ada ungu sama sekali.** Versi sebelumnya sempat memakai lavender dan ungu, dan
itu membuat aksen halaman terbaca ungu, bukan merah muda.

**Bila salah satu nilai warna diubah, sapu ulang** kontras (nol elemen teks di bawah
4.5:1, kedua mode) dan rona (nol warna di keluarga ungu).

## Gerak dan hiasan

Kelopak sakura berjatuhan, stiker bergaris mengambang di hero, kepala tiap bagian, dan
footer, kartu memantul saat disinggahi, dan kursor meninggalkan jejak kelopak yang
memercik saat diklik.

Halaman mengikuti `prefers-color-scheme` dan `prefers-reduced-motion`. Di mode hemat
gerak semua animasi mati, jejak kursornya tidak dipasang sama sekali, dan garis serta
bayangannya tetap ada sehingga tampilannya utuh. Jejak kursor juga tidak dipasang pada
perangkat layar sentuh.

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
