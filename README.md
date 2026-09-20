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

## Tema: satu keluarga merah muda

Tidak ada lagi enam rona berbeda per bagian. Seluruh halaman memakai satu aksen merah
muda; yang membedakan tiap bagian adalah bentuk layoutnya dan pergantian latar
(`--page`, `--card`, `--sand`).

| Token | Terang | Gelap | Catatan |
|---|---|---|---|
| `--page` | `#FFF6F8` | `#1E141A` | latar halaman |
| `--sand` | `#FBF1E9` | `#241820` | latar bagian selang-seling |
| `--ink` | `#3A2430` | `#FBEFF3` | 13.4:1 di atas `--page` |
| `--muted` | `#7A5A66` | `#D0AFBE` | 5.5:1 di atas `--page` |
| `--rose` | `#B9265A` | `#FFA6C0` | 6.0:1 di atas putih, 5.2:1 di atas `--tint` |
| `--blossom` | `#FF9FB6` | `#C4567C` | **hiasan saja**, tidak pernah dipakai sebagai teks |

**Bila salah satu nilai warna diubah, hitung ulang rasio kontrasnya** sampai memenuhi
WCAG AA (>= 4.5:1) di atas putih, di atas `--tint`-nya sendiri, dan di atas `--page`.

Halaman mengikuti `prefers-color-scheme` dan `prefers-reduced-motion`. Di mode hemat
gerak, kelopak sakura dan animasi reveal mati sepenuhnya, isi tetap terbaca.

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

Situs dilayani dari akar repo lewat GitHub Pages (Settings, Pages, Source: `main`,
folder `/ (root)`). Pages menyebar ulang sekitar satu menit; periksa lewat jendela
incognito karena cache-nya cukup agresif.
