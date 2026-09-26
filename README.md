# E-Portofolio PPG Prajabatan BK - PPG dan PPL

Portofolio **Fahira Firzha Wianda** (NIM 26960002, IKIP Siliwangi, PPG Prajabatan
Bimbingan dan Konseling), praktik lapangan di **SMA Negeri 1 Cisarua**.

Situs terbagi dua pintu, mengikuti pola halaman Refleksi di situs rujukan:

- **PPG (Modul Akademik)**: refleksi 4C, analisis artefak, dan kaitan praktis dari mata
  kuliah semester I (6) dan semester II (5). Isinya dipindah apa adanya dari dua situs
  lama (Seminar-PPG-UTS-Porto dan UAS-Seminar-PPG).
- **PPL (Praktik Lapangan)**: tugas **LK 3**, enam analisis atas dua layanan bimbingan
  klasikal (Pribadi di X I, 13 Agustus 2026; Sosial di XI J, 20 Agustus 2026), plus tempat
  tugas UTS dan UAS yang menyusul.

Beberapa halaman statis. Tanpa build step, tanpa framework, tanpa dependensi. Buka
`index.html` langsung dari berkas dan halaman tampil utuh.

```
index.html          beranda: profil singkat, video Home, dua pintu PPG dan PPL
profil.html         profil lengkap (bagian riwayat masih placeholder)
ppl.html            PPL Mandiri, tugas LK 3 (enam analisis + rangkaian tugas)
ppg-1.html          PPG semester I, enam mata kuliah
ppg-2.html          PPG semester II, lima mata kuliah
style.css           token warna, tata letak, animasi (dipakai semua halaman)
script.js           reveal dan penanda nav, jejak kursor, slider foto, video hero, kotak YouTube
assets/profile.jpeg foto profil
assets/dokumentasi/ foto pelaksanaan dua layanan (slider kartu RPL)
assets/nonmengajar/ foto empat kegiatan nonmengajar (slider)
assets/lkpd/        dua LKPD yang dipakai di kelas
assets/video/       home.mp4 di hero beranda
assets/RPL .../     RPL dan PPT yang ditautkan sebagai unduhan dari ppl.html
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
itu membuat aksen halaman terbaca ungu, bukan merah muda. Rona per mata kuliah dari situs
PPG lama (termasuk lavender) sengaja tidak ikut dipindah.

**Tema dikunci terang** (`color-scheme: light`, tanpa blok
`@media (prefers-color-scheme: dark)`). Mode gelap pernah ada dan dibuang: di perangkat
yang setelan sistemnya gelap, latar plum gelapnya terbaca sebagai ungu dan halaman terasa
gelap. Sekarang semua orang melihat merah muda yang sama, apa pun setelan perangkatnya.

**Bila salah satu nilai warna diubah, sapu ulang** kontras (nol elemen teks di bawah
4.5:1) dan rona (nol warna di keluarga ungu) di kelima halaman.

## Gerak dan hiasan

Kelopak sakura berjatuhan, stiker bergaris mengambang di hero, kepala tiap bagian, dan
footer, kartu memantul saat disinggahi, dan kursor meninggalkan jejak kelopak yang
memercik saat diklik. Bunga di nav punya satu kelopak per bagian halaman (6 di PPL dan
PPG semester I, 5 di PPG semester II) dan mekar mengikuti bagian yang terbaca.

Halaman mengikuti `prefers-reduced-motion`. Di mode hemat gerak semua animasi mati, jejak
kursornya tidak dipasang sama sekali, dan garis serta bayangannya tetap ada sehingga
tampilannya utuh. Jejak kursor juga tidak dipasang pada perangkat layar sentuh.

Acuan bahasa visualnya: <https://ppganthonioakbar.vercel.app/>.

## Yang masih kosong

- Kartu **UTS** dan **UAS** di bagian "Rangkaian Tugas" (ppl.html) masih placeholder.
- **Video Praktik** (ppl.html#video): dua kotak YouTube menunggu ID video. Isi atribut
  `data-yt` dengan ID-nya (mis. `data-yt="AbCdEfGhIjK"`); sampul dan tombol putar
  dipasang otomatis, dan klik memutar video di tempat.
- **Riwayat dan pengalaman** di profil.html: enam kartu placeholder.

## Catatan privasi

Foto dokumentasi kelas di repo ini memuat murid yang wajahnya dapat dikenali.
Penerbitannya adalah keputusan pemilik portofolio. Sebelum `git push`, periksa kembali
isi `assets/` dan pastikan hanya berkas yang memang dimaksudkan untuk publik yang ikut
terbawa. Dokumen kerja (LK, PDF), arsip zip, dan foto mentah tetap diabaikan lewat
`.gitignore`. Artefak PPG ditampilkan sebagai kartu kode, bukan berkasnya; buktinya
ditautkan lewat folder Google Drive seperti di situs lama.

## Menerbitkan

Live di **<https://zonkdbr.github.io/UTS-PPL/>**, dilayani dari akar repo lewat GitHub
Pages (Settings, Pages, Source: `main`, folder `/ (root)`). Cukup `git push origin main`;
Pages menyebar ulang sekitar satu menit. Periksa lewat jendela incognito karena cache-nya
cukup agresif.
