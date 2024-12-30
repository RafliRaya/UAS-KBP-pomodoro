# UAS-KBP-pomodoro
 Website Learning Support

Aplikasi web komprehensif yang dirancang untuk meningkatkan produktivitas belajar dengan menggabungkan timer Pomodoro, manajemen tugas, pelacakan produktivitas, dan fitur musik belajar.

## Fitur
1. Timer Pomodoro
- Sesi fokus 25 menit (Pomodoro)
- Istirahat pendek 5 menit
- Istirahat panjang 10 menit
- Kontrol:
  - Tombol Mulai/Jeda
  - Tombol Reset
  - Pemilihan tipe sesi (Pomodoro, Istirahat Pendek, Istirahat Panjang)
- Alarm berbunyi ketika timer selesai

2. Daftar Tugas
- Menambah, menyelesaikan, dan menghapus tugas
- Penyimpanan permanen menggunakan localStorage
- Fitur:
  - Kotak centang untuk menandai tugas selesai
  - Tombol hapus untuk menghapus tugas
  - Umpan balik visual untuk tugas yang selesai (dicoret)
  - Daftar dapat di-scroll untuk banyak tugas

3. Statistik Produktivitas
- Visualisasi grafik garis menggunakan Chart.js
- Melacak sesi Pomodoro yang diselesaikan per hari
- Tampilan mingguan (Senin sampai Jumat)
- Desain responsif yang mempertahankan rasio aspek

4. Musik Belajar
- Playlist Spotify yang tertanam
- Pilihan musik untuk fokus belajar
- Integrasi mulus dengan ruang kerja

Implementasi Teknis
 Logika Timer
- Menggunakan `setInterval` untuk hitung mundur
- Manajemen status timer (berjalan/dijeda)
- Mengkonversi detik ke format tampilan MM:SS

Penyimpanan Data
- Item tugas disimpan di localStorage browser
- Penyimpanan otomatis saat pembaruan tugas
- Data dimuat saat inisialisasi halaman

Styling
- Desain responsif menggunakan Tailwind CSS
- Tata letak menggunakan grid
- Antarmuka bersih dan minimal dengan spasi konsisten
- Dukungan gambar latar belakang kustom

Cara Memulai
1. Klon repositori
2. Buka `index.html` di browser web modern
3. Mulai sesi Pomodoro dan tambahkan tugas ke daftar Anda

Persyaratan
- Browser web modern dengan JavaScript aktif
- Koneksi internet (untuk integrasi Spotify)
- Kemampuan audio untuk alarm timer

Dukungan Browser
- Chrome (direkomendasikan)
- Firefox
- Safari
- Edge

Struktur File
```
/
├── index.html
├── script.js
├── style.css
├── background.png
└── README.md
```

Catatan
- Alarm timer memerlukan interaksi pengguna sebelum diputar (kebijakan browser)
- Integrasi Spotify memerlukan akun Spotify untuk fungsionalitas penuh
- Local storage harus diaktifkan untuk penyimpanan daftar tugas
