---
title: Memulai
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

Untuk mengaktifkan HTTPS pada website, anda membutuhkan sebuah sertifikat (sebuah tipe dari *file*)
dari Otoritas Sertifikasi (CA). Let's Encrypt adalah CA. Untuk mendapatkan sertifikat untuk domain
website anda dari Let's Encrypt, anda harus dapat membuktikan kontrol terdahadap domain
tersebut. Dengan Let's Encrypt, anda melakukannya dengan menggunakan perangkat-lunak yang menggunakan
[protokol ACME](https://ietf-wg-acme.github.io/acme/) yang biasanya berjalan pada *host* web anda.

Untuk mengetahui metode terbaik untuk anda, anda harus mengetahui apakah anda memiliki
[akses *shell*](https://en.wikipedia.org/wiki/Shell_account) (juga diketahui sebagai SSH)
ke host web anda. Jika anda mengontrol situs web anda seluruhnya melalui panel kontrol
seperti [cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/), or
[WordPress](https://wordpress.org/), kemungkinan besar anda tidak akan mendapatkan
akses *shell* tersebut. Anda dapat menanyakan hal tersebut ke penyedia layanan anda
untuk lebih yakin.

# Dengan Akses *Shell*
Kami merekomendasikan kebanyakan orang dengan akses *shell* untuk menggunakan Klien ACME,
[Certbot]. Dia dapat mengotomatisasi penerbitan sertifikat dan memasangnya tanpa *downtime*.

Certbot juga memiliki mode *expert* untuk orang-orang yang tidak mau menggunakan
konfigurasi otomatis. Mudah digunakan, bekerja pada banyak sistem operasi, 
dan memiliki dokumentasi yang bagus. [Kunjungi situs Certbot][Certbot] untuk melihat
instruksi kostumisasi untuk sistem operasi dan web server anda.

Jika [Certbot] tidak sesuai dengan kebutuhan anda, atau anda ingin mencoba yang lain,
ada [banyak Klien ACME yang dapat anda pilih]({{< ref "/docs/client-options.md" >}}). Setelah anda
memili Klien ACME anda, lihat dokumentasi untuk klien tersebut untuk melanjutkan.

Jika anda ingin bereksperimen dengan Klien ACME lain, gunakan [lingkungan *staging*]({{< ref "/docs/staging-environment.md" >}})
untuk menghindari [pembatasan pemanggilan]({{< ref "/docs/rate-limits.md" >}}).

[Certbot]: https://certbot.eff.org/  "Certbot"

# Tanpa Akses *Shell*

Cara terbaik untuk menggunakan Let's Encrypt tanda akses *shell* adalah dengan
menggunakan dukungan bawaan dari penyedia hosting anda. Jika pengedia hosting anda
menawarkan dukungan pada Let's Encrypt, mereka dapat menyedikan sertifikat gratis
atas nama anda, memasangnya, dan memastikan tetap terbaharui. Untuk beberapa
penyedia hosting, ini adalah pengaturan konfigurasi yang perlu anda nyalakan sendiri.
Penyedia layanan lain mungkin dapat meminta dan memasang sertifikat tersebut untuk
seluruh kustomer mereka.

[Cek daftar penyedia layanan hosting kamu](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
untuk melihat apakah anda termasuk kustomer mereka atau bukan. Jika ya, anda dapat
mengikuti dokumentasi mereka untuk memasang sertifikat Let's Encrypt anda.

Jika penyedia layanan hosting anda tidak mendukung Let's Encrypt, anda dapat
menghubungi mereka untuk meminta dukungan tersebut. Kami akan berusaha sebaik mungkin
untuk menambahkan dukungan Let's Encrypt, dan biasanya penyedia layanan tersebut
senang dengan saran dari kustomer mereka!

Jika penyedia layanan hosting anda tidak mau mengintegrasikan Let's Encrypt, namun
mendukung untuk mengunggah sertifikat khusus, anda tetap dapat memasang Certbot
pada komputer anda sendiri dalam [mode manual](https://certbot.eff.org/docs/using.html#manual).
Pada mode manual, anda mengunggah berkas spesifik pada web anda untuk membuktikan kontrol
anda. Certbot akan menerima sertifikat tersebut yang kemudian anda unggah ke penyedia
hosting anda. Kami tidak merekomendasikan hal ini karena cara ini sangat menyita waktu
dan anda akan mengulanginya beberapa kali per tahun saat sertifikat anda kadaluarsa.
Untuk kebanyakan orang, lebih baik meminta dukungan Let's Encrypt ke penyedia
layanan hosting anda, atau ganti penyedia lain jika mereka tidak berencara untuk
mendukungnya.

# Mendapatkan Bantuan
Jika anda memiliki pertanyaan tentang Klien ACME, atau tentang klien tertentu, atau
yang lain berhubungan dengan Let's Encrypt, mohon mencoba menggunakan [forum komunitas](https://community.letsencrypt.org/)
kita.
