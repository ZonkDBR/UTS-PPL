# E-Portfolio 1 — PPL Mandiri

Portofolio **Fahira Firzha Wianda** (NIM 26960002, IKIP Siliwangi, PPG Prajabatan
Bimbingan dan Konseling), PPL Mandiri di **SMA Negeri 1 Cisarua**.

Enam analisis atas praktik layanan bimbingan klasikal: rancangan layanan, materi, media,
video pelaksanaan, kegiatan nonmengajar, dan instrumen penilaian.

Satu halaman statis. Tanpa build step, tanpa framework, tanpa dependensi — buka
`index.html` langsung dari berkas dan halaman tampil utuh.

```
index.html   seluruh isi situs
style.css    token warna, tata letak, animasi
script.js    satu IntersectionObserver: memunculkan isi, memekarkan kelopak, menandai nav
assets/      foto profil
```

## Enam kelopak, enam analisis

Setiap bagian punya satu rona sakura sendiri, dipakai konsisten dari navigasi sampai
kartunya. Di navigasi ada satu bunga berkelopak enam: tiap kelopak mewakili satu bagian
dan mekar ketika bagiannya terbaca.

| Bagian | Rona |
|---|---|
| Analisis rancangan layanan | blossom |
| Analisis materi | sky |
| Analisis media | lavender |
| Analisis video praktik | mint |
| Analisis kegiatan nonmengajar | peach |
| Instrumen penilaian | berry |

Warna teks tiap rona (`--ink`) sudah dihitung agar memenuhi WCAG AA (≥4.5:1) di atas kartu
putih maupun di atas rona mudanya sendiri. **Bila salah satu nilai warna diubah, hitung
ulang rasio kontrasnya** — pastel hanya untuk latar dan hiasan, tidak pernah untuk teks.

## Yang masih kosong

Bagian **Video Praktik** dan **Kegiatan Nonmengajar** sengaja ditampilkan dengan kartu
"menunggu data", bukan diisi karangan. Keduanya menunggu tautan rekaman dan catatan
kegiatan.

## Catatan privasi

Repo ini hanya berisi berkas yang layak publik. RPL, materi, LKPD, dan instrumen dibagikan
lewat tautan folder Google Drive, bukan diunggah ke sini. Dokumen kerja (LK, `.docx`,
`.pdf`) sudah masuk `.gitignore`.

## Menerbitkan

Situs dilayani dari akar repo lewat GitHub Pages (Settings → Pages → Source: `main`,
folder `/ (root)`). Pages menyebar ulang sekitar satu menit; periksa lewat jendela
incognito karena cache-nya cukup agresif.
