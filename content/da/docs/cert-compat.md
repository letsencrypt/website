---
title: Certifikatets Kompatilitet
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


Den vigtigste afgørende faktor for, om en platform kan validere Let's Encrypt certifikater er, om platformen stoler på ISRG's "ISRG Root X1" certifikat. Nogle platforme kan validere vores certifikater, selvom de ikke inkluderer ISRG Root X1, fordi de stoler på IdenTrust's "DST Root CA X3" certifikat. Efter September 2021 kun de platforme, der stoler på ISRG Root X1 vil fortsætte med at validere Lad os Kryptere certifikater ([med undtagelse af Android](/2020/12/21/extending-android-compatibility.html)).

Hvis dit certifikat validerer på nogle af de "kendte kompatible" platforme, men ikke andre, kan problemet være en webserver fejlkonfiguration. Hvis du har et problem med moderne platforme, er den mest almindelige årsag ikke at levere den korrekte certifikatkæde. Test dit websted med [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Hvis det ikke identificerer problemet, så spørg om hjælp i vores [Community Forums](https://community.letsencrypt.org/).

# Platforme der har tillid til ISRG Root X1

* Windows >= XP SP3 ([forudsat at automatisk rodcertifikatopdatering ikke er manuelt deaktiveret](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 inkluderer det ikke](https://support.apple.com/en-us/HT205205))
* [iPhone 5 og derover kan opgradere til iOS 10](https://en.wikipedia.org/wiki/IPhone_5) og kan dermed stole på ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (men Android >= 2.3.6 vil fungere som standard [på grund af vores specielle krydssignatur](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (med opdateringer indlæst)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (med opdateringer indlæst)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3,26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Browsere (Chrome, Safari, Edge, Opera) stoler generelt på de samme rodcertifikater som det styresystem, de kører på. Firefox er undtagelsen: det har sin egne rodcertifikater. Snart vil nye versioner af Chrome [også have deres egne rodcertifikater](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Platforme der stoler på DST Root CA X3

* Windows >= XP SP3
* macOS (de fleste versioner)
* iOS (de fleste versioner)
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
* Blackberry >= 10,3,3
* PS4-spillekonsol med firmware >= 5,00

Du kan evnetuelt besøge [denne 2015-2017 community forum diskussion](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) for mere information om kompatibilitet.

# Kendte Inkompatible

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP inden SP3
  * kan ikke håndtere SHA-2 signerede certifikater
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 mail-klient, ikke webmail)
  * kan ikke håndtere certifikater uden en CRL
* PS3 spilkonsol
* PS4-spillekonsol med firmware < 5.00

# ISRG Root X2 (ny ECDSA root) - kommer snart
Vi har indsendt ISRG Root X2 til Microsoft, Apple, Google, Mozilla, og Oracle rod-certifikat-programmer med henblik på tilføjelse. ISRG Root X2 er allerede bredt betroet via et krydssignatur fra vores ISRG Root X1. For yderligere information, tjek vores [community forum indlæg](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


