---
title: Mencari ID Akun
slug: account-id
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Dalam pelaporan masalah, menyertakan informasi ID Akun Let's Encrypt akan sangat membantu. Untuk kebanyakan kasus, proses pembuatan akun ditangani secara otomatis oleh klien aplikasi ACME yang Anda gunakan untuk berkomunikasi dengan Let's Encrypt. Anda dapat menkonfigurasi beberapa akun jika anda menjalankan klien ACME pada beberapa server.

ID Akun Anda akan berbentuk URL dengan format `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Jika Anda menggunakan Certbot, Anda dapat mencari ID akun Anda dengan memperhatikan kolom "uri" pada `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Jika anda menggunakan klien ACME lain, instruksi yang ada akan bergantung dari klien yang digunakan. Cek log Anda untuk URL-URL pada form yang disebutkan di atas. Jika klien ACME tidak merekam ID akun, Anda dapat membuat ID baru dengan melakukan registrasi dengan kunci yang sama. Lihat [spesifikasi ACME untuk informasi lebih detil](https://tools.ietf.org/html/rfc8555#section-7.3). Anda dapat juga mencari bentuk numerik dari ID anda pada header Boulder-Requester dari respon POST yang klien ACME buat.
