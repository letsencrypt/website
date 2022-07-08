---
title: Tanúsítvány kompatibilitás
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


A fő meghatározó tényező, hogy egy platform képes-e validálni a Let's Encrypt tanúsítványokat, az, hogy az adott platform megbízik-e az ISRG "ISRG Root X1" tanúsítványában. Egyes platformok akkor is képesek validálni a tanúsítványainkat, ha azok nem tartalmazzák az ISRG Root X1 tanúsítványt, mivel megbíznak az IdenTrust "DST Root CA X3" tanúsítványában. 2021 szeptembere után csak azok a platformok fogják továbbra is validálni a Let's Encrypt tanúsítványokat, amelyek megbíznak az ISRG Root X1-ben ([az Android kivételével](/2020/12/21/extending-android-compatibility.html)).

Ha a tanúsítványa az "Ismert kompatibilis" platformok némelyikén validál, de másokon nem, akkor a probléma a webszerver hibás konfigurációja lehet. Ha a modern platformok esetében probléma merül fel, a leggyakoribb ok a megfelelő tanúsítványlánc megadásának elmulasztása. Tesztelje weboldalát az [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/) segítségével. Ha ez nem segít a probléma felderítésében, kérjen segítséget [közösségi fórumainkon](https://community.letsencrypt.org/).

# Platformok amelyek megbíznak a ISRG Root X1-ben

* Windows >= XP SP3 ([feltéve, hogy az automatikus root tanúsítvány frissítés nincs manuálisan letiltva](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 nem tartalmazza](https://support.apple.com/en-us/HT205205))
* [Az iPhone 5 és újabb készülékek frissíthetnek az iOS 10-re](https://en.wikipedia.org/wiki/IPhone_5), és így megbízhatnak az ISRG Root X1-ben
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (de az Android >= 2.3.6 is alapértelmezetten működik [a speciális kereszthitelesítésük révén](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (frissítésekkel együtt)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (frissítésekkel együtt)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

A böngészők (Chrome, Safari, Edge, Opera) általában ugyanazokban a gyökértanúsítványokban bíznak, mint az operációs rendszer, amelyen futnak. A Firefox a kivétel: saját gyökértárral rendelkezik. Hamarosan a Chrome új verziói [is már saját gyökértárral fognak rendelkezni](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Platformok amelyek megbíznak a DST Root CA X3-ban

* Windows >= XP SP3
* macOS (legtöbb verzió)
* iOS (legtöbb verzió)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= precise / 12.04
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Blackberry >= 10.3.3
* PS4 játékkonzol firmware-rel >= 5.00

A kompatibilitással kapcsolatos további információkért érdemes meglátogatni [ezt a 2015-2017-es közösségi fórumot](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/).

# Ismert inkompatibilis platformok

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* SP3 előtti Windows XP
  * nem tudja kezelni az SHA-2 aláírt tanúsítványokat
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012-es levelezőprogram, nem webmail)
  * CRL nélkül nem tudja kezelni a tanúsítványokat
* PS3 játékkonzol
* PS4 játékkonzol firmware-rel < 5.00

# ISRG Root X2 (új ECDSA root) - hamarosan
Az ISRG Root X2-t benyújtottuk a Microsoft, az Apple, a Google, a Mozilla és az Oracle root programjaihoz felvételre. Az ISRG Root X2 már széles körben megbízható az ISRG Root X1 kereszthitelesítése révén. További információért tekintse meg [közösségi fórumunkat](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


