# LK 3 E-Portfolio - PPL Mandiri

Portofolio **Fahira Firzha Wianda** (NIM 26960002, IKIP Siliwangi, PPG Prajabatan
Bimbingan dan Konseling), PPL Mandiri di **SMA Negeri 1 Cisarua**.

Tugas **LK 3**: enam analisis atas dua layanan bimbingan klasikal di kelas XI J (Sosial,
13 Agustus 2026; Pribadi, 20 Agustus 2026): rancangan layanan, materi, media, video
pelaksanaan, kegiatan nonmengajar, dan instrumen penilaian. Di akhir halaman ada tempat
untuk tugas UTS dan UAS yang menyusul.

Satu halaman statis. Tanpa build step, tanpa framework, tanpa dependensi. Buka
`index.html` langsung dari berkas dan halaman tampil utuh.

```
index.html          seluruh isi situs
style.css           token warna, tata letak, animasi
script.js           reveal dan penanda nav, jejak kursor, slider foto, video hero
assets/profile.jpeg foto profil
assets/dokumentasi/ seluruh foto pelaksanaan dua layanan (slider kartu RPL)
assets/nonmengajar/ foto empat kegiatan nonmengajar (slider)
assets/lkpd/        pindaian dua LKPD yang dipakai di kelas
assets/video/       empat cuplikan rekaman pelaksanaan + home.mp4 di hero
assets/RPL .../     RPL dan PPT yang ditautkan sebagai unduhan dari halaman
```

## Gaya: neo-brutalism merah muda

Garis tebal, bayangan keras tanpa blur, blok warna datar, sudut membulat. Merah muda
warna utama, kuning mentega satu-satunya pendamping. Yang membedakan tiap bagian adalah
bentuk layoutnya dan pergantian latar.

| Token | Nilai | Catatan |
|---|---|---|
| `--ink` | `#17121A` | teks utama, 18.5:1 di atas putih |
| `--muted` | `#5E4A56` | teks sekunder, 8.1:1 di atas putih |
| `--edge` | `#17121A` | **semua** garis dan bayangan |
| `--page` | `#FFF1F5` | latar halaman |
| `--card` | `#FFFFFF` | kartu |
| `--wash-pink` | `#FFDCE8` | latar bagian |
| `--wash-blush` | `#FFE9F0` | latar bagian |
| `--blush` `--pink` `--butter` | `#FFE4EC` `#FFD2E0` `#FFE68C` | blok terang, teksnya selalu `--on-block` |
| `--rose` | `#C2185B` | isi tombol utama, teks putih 5.9:1 |
| `--blossom` | `#FF8FB3` | **hiasan saja**, tidak pernah jadi latar teks |

**Tidak ada ungu sama sekali.** Versi sebelumnya sempat memakai lavender dan ungu, dan
itu membuat aksen halaman terbaca ungu, bukan merah muda.

**Tema dikunci terang** (`color-scheme: light`, tanpa blok
`@media (prefers-color-scheme: dark)`). Mode gelap pernah ada dan dibuang: di perangkat
yang setelan sistemnya gelap, latar plum gelapnya terbaca sebagai ungu dan halaman terasa
gelap. Sekarang semua orang melihat merah muda yang sama, apa pun setelan perangkatnya.

**Bila salah satu nilai warna diubah, sapu ulang** kontras (nol elemen teks di bawah
4.5:1) dan rona (nol warna di keluarga ungu).

## Gerak dan hiasan

Kelopak sakura berjatuhan, stiker bergaris mengambang di hero, kepala tiap bagian, dan
footer, kartu memantul saat disinggahi, dan kursor meninggalkan jejak kelopak yang
memercik saat diklik.

Halaman mengikuti `prefers-reduced-motion`. Di mode hemat gerak semua animasi mati, jejak
kursornya tidak dipasang sama sekali, dan garis serta bayangannya tetap ada sehingga
tampilannya utuh. Jejak kursor juga tidak dipasang pada perangkat layar sentuh.

Acuan bahasa visualnya: <https://ppganthonioakbar.vercel.app/>.

## Yang masih kosong

Kartu **UTS** dan **UAS** di bagian "Rangkaian Tugas" masih placeholder. Bagian
**Video Praktik** sudah memuat empat cuplikan, tetapi tautan rekaman utuh belum ada.

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
