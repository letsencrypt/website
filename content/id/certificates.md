---
title: Rantai Kepercayaan
linkTitle: Rantai Kepercayaan (Sertifikat Root dan Perantara)
slug: certificates
top_graphic: 5
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Sertifikat *Root*

Sertifikat root kami disimpan dengan aman secara luring. Kami menerbitkan sertifikat entitas akhir untuk pelanggan dari perantara di bagian berikutnya. Sebagai tambahan kompatibilitas karena kami mendaftarkan Root X2 kami yang baru ke berbagai *root programs*, kami juga melakukan *cross-signed* dari Root X1.

* Aktif
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Tanda tangan sendiri (Self-signed)](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Tanda tangan lintas-silang (Cross-signed) oleh DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der)[pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Aktif, ketersediaan terbatas
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Tanda tangan sendiri (Self-signed)](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Kami telah mempersiapkan website untuk pengujian rantai sertifikat menuju root aktif kami.

* ISRG Root X1
  * [Valid](https://valid-isrgrootx1.letsencrypt.org/)
  * [Dicabut](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Kadaluarsa](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Valid](https://valid-isrgrootx2.letsencrypt.org/)
  * [Dicabut](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Kadaluarsa](https://expired-isrgrootx2.letsencrypt.org/)

# Sertifikat Perantara

Pada kondisi umumnya, sertifikat-sertifikat yang diterbitkan oleh Let's Encrypt akan berasal dari "R3", yaitu suatu perantara RSA. Saat ini, penerbitan sertifikat dari "E1", suatu perantara ECDSA, hanya dapat dilakukan oleh pelanggan kunci ECDSA yang [telah terdaftar dan diijinkan](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Kedepannya, penerbitan dari "E1" akan tersedia bagi semua orang.

Sertifikat perantara kami yang lain ("R4" dan "E2") dipersiapkan sebagai pemulihan kebencanaan dan hanya akan digunkan jika dan hanya jika kami kehilangan kemampuan untuk menerbitkan sertifikat perantara utama kami. Kami tidak lagi menggunakan perantara X1, X2, X3 dan X4.

IdenTrust telah menanda-tangani lintas-silang sertifikat perantara kami untuk kompatibilitas tambahan.

* Aktif
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (Telah usai)
* Aktif, ketersediaan terbatas
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Tanda tangan oleh ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Cadangan
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (Telah usai)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Tanda tangan oleh ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Ditarik
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Tanda tangan oleh ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Tanda tangan lintas silang (Cross-signed) oleh IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Tanda-tangan Silang

## Sertifikat Perantara

Pada tiap-tiap sertifikat perantara kami merepresentasikan satu pasang *public key* dan *private key*. Kunci privat dari pasangan tersebut menghasilkan tanda tangan untuk semua sertifikat entitas akhir (juga dikenal sebagai *leaf certificates*), seperti sertifikat yang kami terbitkan untuk Anda gunakan.

Sertifikat perantara RSA kami ditandatangani oleh ISRG Root X1. Pada saat ini, ISRG Root X1 telah dipercaya secara luas, tetapi sertifikat-sertifikat perantara RSA tersebut masih ditandatangani lintas-silang oleh "[DST Root CA X3](https://crt.sh/?id=8395)" dari IdenTrust (kemudian disebut sebagai "TrustID X3 Root") sebagai kompatibilitas klien tambahan. Sertifikat *Root* IdenTrust telah beredar cukup lama dan oleh sebab itu memiliki kompatibilitas yang lebih baik bagi perangkat dan sistem operasi yang lebih berumur (misalkan Windows XP, Android 7). Anda dapat [mengunduh sertifikat "TrustID X3 Root" dari IdentTrust](https://www.identrust.com/support/downloads) (atau, anda dapat juga [ mengunduh salinannya dari kami](/certs/trustid-x3-root.pem.txt)).

Dengan memiliki tanda-tangan lintas-silang, itu berarti bahwa tiap-tiap sertifikat perantara RSA kami memiliki dua sertifikat yang merepresentasikan *signing key* yang sama. Yang satu ditanda-tangani oleh DST Root CA X3 dan yang satunya lagi ditanda-tangani oleh ISRG Root X1. Cara termudah untuk membedakan keduanya adalah dengan melihat bidang Penerbit mereka.

Saat mengkonfigurasi server web, operator server mengonfigurasi tidak hanya sertifikat entitas akhir, tetapi juga daftar sertifikat perantara untuk membantu browser memverifikasi bahwa sertifikat entitas akhir memiliki rantai kepercayaan yang mengarah ke sertifikat root tepercaya. Hampir seluruh operator server akan memilih untuk melayani rantai sertifikat yang terdiri atas sertifikat perantara dengan Subyek "R3" dan Penerbit "ISRG Root X1". [Certbot](https://certbot.org), aplikasi klien Let's Encrypt yang direkomendasikan, dapat membuat pengaturan tersebut berjalan dengan mulus.

## Root
Sama halnya dengan sertifikat perantara, sertifikat *root* juga dapat ditanda-tangani dengan lintas-silang, seringkali hal ini untuk meningkatkan kompatibilitas klien. Sertifikat *root* ECDSA kami, ISRG Root X2 di susun pada kisaran september hingga november 2020 dan merupakan sertifikat *root* bagi hirarki ECDSA. Sertifikat tersebut di representasikan oleh dua sertifikat berikut: satu yang ditanda-tangani sendiri (self-signed) dan satunya yang ditanda-tangani oleh ISRG Root X1.

Seluruh sertifikat yang ditanda-tangani menggunakan sertifikat perantara ECDSA "E1" akan terbit dengan rangkaian yang mengandung sertifikat perantara dengan Subyeknya adalah "ISRG Root X2" dan Penerbitnya adalah "ISRG Root X1". Mayoritas operator server akan memilih menyediakan rankaian sertifikat ini karena menawarkan kompatibilitas terlengkap hingga ISRG Root X2 dipercaya secara luas.

# Sertifikat Penanda-tangan OCSP

Sertifikat ini digunakan untuk menandatangani tanggapan OCSP untuk sertifikat perantara Let's Encrypt, sehingga kami tidak perlu membawa kunci root online untuk menandatangani respon tersebut. Salinan sertifikat ini disertakan secara otomatis dalam respons OCSP tersebut, sehingga Pelanggan tidak perlu melakukan apa pun. Tautan berikut diberikan hanya untuk informasi saja.

* ISRG Root OCSP X1 ([Ditanda-tangani oleh ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Sertifikat perantara kami yang baru tidak memiliki URL OCSP ( informasi pencabutan disediakan melalui CRL), oleh karena itu kami tidak menerbitkan penandatanganan OCSP melalui ISRG Root X2.

# Transparansi Sertifikat

Kami berdedikasi untuk menjaga transparansi pada operasi dan sertifikat yang kami terbitkan. Kami menampilkan semua sertifikat yang kami terbitkan ke [Log Transparansi Sertifikat](https://www.certificate-transparency.org/). Anda dapat melihat semua sertifikat Let's Encrypt yang diterbitkan melalui tautan ini:

* [Diterbitkan oleh Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Diterbitkan oleh Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Diterbitkan oleh E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Diterbitkan oleh R3](https://crt.sh/?Identity=%25&iCAID=183267)
