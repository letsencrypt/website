---
title: Kontak
slug: contact
description: Cara untuk menghubungi kami
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**Kami tidak menyediakan dukungan via email. Jika anda memiliki pertanyaan tentang dukungan, mohon gunakan [forum komunitas](https://community.letsencrypt.org) kami. Alamat email berikut ini hanya digunakan untuk topik-topik spesifik seperti yang dijelaskan.**

## Pertanyaan Pers

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsor

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Milis

Untuk mendapatkan berita kami, [klik di sini.](https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51)

## Keamanan

**Tolong jangan menghubungi alamat ini kecuali jika bersangkutan dengan masalah keamanan pada Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Komunikasi Terenkripsi

Untuk menghubungi Tim Keamanan kami dengan aman, mohon pergunakan GPG *key* kami. Kunci kami terdiri dari beberapa subkunci yang ditanda-tangani oleh kunci master luring kami. Versi terkini apapun dari GnuPG akan mendukung kunci *hybrid* ini. Struktur kunci kami saat ini adalah:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Anda dapat mengunduh [kunci publik GPG kami di sini](/security_letsencrypt.org-publickey.asc), atau pergunakan server kunci favorit anda.

Sidik jari (*fingerprint*) kunci anda harus sesuai dengan `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.
