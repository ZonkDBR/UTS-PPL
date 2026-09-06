# E-Portfolio 1 — PPL Mandiri

Situs statis satu halaman, tema pink & sakura, bahasa Indonesia. Ini portofolio ketiga
dengan pola yang sama; dua sebelumnya jadi rujukan bentuk, bukan disalin isinya.

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

## Bentuk teknis

```
index.html   seluruh isi situs
style.css    token warna, tata letak, animasi
script.js    IntersectionObserver: memunculkan isi, menandai nav aktif
assets/      foto profil, gambar artefak yang layak publik
```

Tanpa framework, tanpa build step, tanpa dependensi npm. Buka `index.html` langsung dari
berkas (`file://`) dan halaman harus tampil utuh — tidak boleh butuh server. Font lewat
Google Fonts, sisanya inline/lokal.

Publikasi: GitHub Pages dari akar repo (`main`, folder `/`). Alamat Pages itulah yang
dikirim sebagai jawaban tugas.

Rujukan pola yang sudah terbukti: `C:\Users\ZonkDBR\Documents\Araa\Seminar PPG\Topik 2\website`
(live di <https://zonkdbr.github.io/Seminar-PPG-UTS-Porto/>). Rujukan kedua:
`C:\Users\ZonkDBR\Documents\Araa\E-Porto` (E-Portfolio PPL Terbimbing).

## Tema pink & sakura

Token dasar — salin apa adanya dari `Topik 2\website\style.css`:

```css
--page:      #FFF9FC;
--page-2:    #F7F0FA;
--card:      #FFFFFF;
--ink-dark:  #2E2430;   /* 14.3:1 di atas --page */
--ink-muted: #6B5A66;   /*  6.2:1 di atas --page */
--line:      #F2E4EC;
--display: "Fredoka", "Poppins", "Segoe UI", system-ui, sans-serif;
--body:    "Plus Jakarta Sans", "Poppins", "Segoe UI", system-ui, sans-serif;
```

Enam bagian analisis memakai enam rona sakura — warna dipakai sebagai penanda navigasi,
satu bagian satu rona, konsisten dari nav sampai kartu. Palet enam rona (`--tint` latar,
`--hue` hiasan, `--ink` teks) sudah dihitung kontrasnya di Topik 2; ambil dari sana.

**Aturan warna yang tidak boleh dilanggar:** pastel hanya untuk latar dan hiasan. Teks
selalu `--ink`, `--ink-dark`, atau `--ink-muted`. Kalau ada nilai warna diubah, hitung
ulang rasio kontrasnya sampai ≥4.5:1 di atas putih, di atas `--tint`-nya sendiri, dan di
atas `--page`.

Hiasan sakura: kelopak berjatuhan dari CSS murni (bukan gambar, bukan library). Hormati
`prefers-reduced-motion: reduce` — animasi mati, isi tetap terbaca.

## Enam bagian wajib

Urutan tetap, satu `<section id="…">` masing-masing, judul persis seperti tugas:

1. `#rancangan` — Analisis produk rancangan/perencanaan pembelajaran
2. `#materi` — Analisis materi pembelajaran yang disusun dan diterapkan
3. `#media` — Analisis media pembelajaran yang dipergunakan
4. `#video` — Analisis video pelaksanaan praktik mengajar mandiri
5. `#nonmengajar` — Analisis kegiatan nonmengajar
6. `#instrumen` — Instrumen penilaian yang dirancang beserta analisisnya

Setiap bagian memuat tiga hal, dalam urutan ini: **deskripsi produk** (apa yang dibuat,
untuk kelas/layanan apa) → **analisis** (kenapa dirancang begitu, apa yang berhasil, apa
yang tidak, dasar teorinya) → **refleksi diri** (apa yang saya pelajari, apa yang saya
ubah lain kali). Analisis adalah yang dinilai paling dalam — jangan biarkan bagian ini
lebih pendek dari deskripsinya.

## Empat unsur penilaian

- **Profil guru** — hero dengan foto, nama, NIM, kampus, sekolah, dan alasan memilih
  jadi Guru BK. Bagian pertama yang terlihat.
- **Kedalaman analisis** — lihat aturan tiga bagian di atas.
- **Refleksi diri** — di tiap bagian, plus satu refleksi penutup yang menarik benang merah
  keenamnya.
- **Navigasi & tampilan** — nav sticky dengan penanda bagian aktif, skip link ke konten,
  `html { scroll-behavior: smooth; scroll-padding-top: … }`, `:focus-visible` terlihat,
  rapi sampai lebar 375px.

## Bahan yang tersedia

Hanya dua RPL di folder ini. Tidak ada bahan lain — jangan mencari ke folder mata kuliah
lain, itu tugas berbeda.

**`RPL kepercayaan diri (Pribadi).pdf`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Pribadi** |
| Topik | Membangun Kepercayaan Diri (Self-Confidence) dalam Kehidupan Sehari-hari |
| Fungsi | Pemahaman dan Pengembangan |
| Sasaran | Kelas **XI I** · 1 × 45 menit · Semester Genap 2026/2027 |
| Model | **Experiential Learning** (Pengalaman Konkret → Refleksi → Konseptualisasi → Penerapan Aktif) |
| Metode | Ceramah interaktif, brainstorming, permainan "Aku Bangga", diskusi kelompok, LKPD |
| Media | PPT "Membangun Kepercayaan Diri", LKPD "Aku dan Kepercayaan Diriku", laptop, LCD proyektor, alat tulis |
| Sumber | Hakim (2002); Lauster (2012); POP BK (2016) |
| Evaluasi | Proses (skala STS/TS/S/SS, berbasis % murid aktif) + Hasil (pemahaman, ≥2 faktor, ≥3 langkah konkret, respon murid) |
| Lampiran | 1 Materi · 2 LKPD · 3 Evaluasi Proses |

**`RPL Sosial.pdf`**

| | |
|---|---|
| Komponen | Layanan Dasar · Bidang **Sosial** |
| Topik | Membangun Sikap Menghargai Guru dan Teman di Lingkungan Sekolah |
| Fungsi | Pemahaman dan Pengembangan |
| Sasaran | Kelas **XI J** · 1 × 45 menit · Semester Genap 2026/2027 |
| Model | **Cooperative Learning** (Penyajian Materi → Kerja Kelompok/Roleplay → Presentasi → Refleksi Bersama) |
| Metode | Ceramah interaktif, roleplay/simulasi dua skenario, diskusi kelompok, LKPD |
| Media | PPT materi, skenario roleplay, LKPD "Aksi Menghargai", laptop, LCD proyektor |
| Sumber | Lickona (2012); POP BK (2016) |
| Evaluasi | Proses (skala 1–5, observasi Guru BK) + Hasil (≥2 bentuk sikap menghargai, pemahaman manfaat, kesepakatan "Aturan Kelas Saling Menghargai") |
| Lampiran | 1 Materi · 2 LKPD · 3 Evaluasi Proses · 4 Evaluasi Hasil · 5 Kepuasan Murid |

Catatan pembacaan: lampiran LKPD di kedua PDF berupa gambar, teksnya tidak terekstrak.
Isi materi (Lampiran 1) terekstrak lengkap di kedua berkas. Ekstrak ulang dengan
`pdftotext -layout "<berkas>.pdf" -`.

Kedua RPL ini memasok lima dari enam bagian: rancangan, materi, media, dan instrumen
penilaian langsung dari isinya; nonmengajar dan video belum ada datanya.

## Aturan konten

Bahasa Indonesia, sudut pandang orang pertama, nada hangat tapi tidak berlebihan.

**Jangan mengarang analisis.** Bagian yang datanya belum ada diberi placeholder eksplisit
(`<!-- TODO: … -->` plus teks placeholder yang terlihat), bukan diisi karangan yang
terdengar meyakinkan. Portofolio ini dinilai sebagai karya nyata.

Tiga dokumen LK di folder ini — LK.1 (orientasi & manajemen sekolah), LK.2 (observasi
lingkungan belajar), LK3 (refleksi praktik mengajar **terbimbing**) — bukan sumber untuk
keenam analisis mandiri. Pakai hanya untuk konteks sekolah dan profil; sumber analisis
adalah dua RPL di atas.

## Privasi

Aturan yang dibawa dari portofolio sebelumnya:

- Foto peserta didik yang bisa dikenali dan daftar nama kelas **tidak pernah masuk repo**.
- Bukti artefak yang sensitif dibagikan lewat tautan folder Google Drive yang aksesnya
  dibatasi, bukan diunggah ke situs.
- Sebelum `git push`, periksa isi `assets/` — hanya berkas yang memang layak publik.

## Yang masih kurang

Empat bagian bisa ditulis penuh dari dua RPL. Dua bagian menunggu:

- [ ] **Tautan video** pelaksanaan praktik mengajar mandiri (YouTube/Drive tak-terdaftar)
- [ ] **Catatan kegiatan nonmengajar** — apa saja, kapan, peran apa
- [ ] Foto profil untuk `assets/` (opsional: pakai `assets/profile.jpeg` dari portofolio lama)
- [ ] Hasil pengisian instrumen, bila mau menampilkan angka nyata, bukan hanya rancangannya
