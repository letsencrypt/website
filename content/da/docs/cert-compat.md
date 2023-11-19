---
title: Certifikatets Kompatilitet
slug: certificate-compatibility
top_graphic: 1
lastmod: 2023-08-02
show_lastmod: 1
---


Den vigtigste afgørende faktor for, om en platform kan validere Let's Encrypt certifikater er, om platformen stoler på ISRG's "ISRG Root X1" certifikat. Før september 2021 kunne nogle platforme validere vores certifikater, selvom de ikke inkluderer ISRG Root X1, fordi de stolede på IdenTrust's "DST Root CA X3" certifikat. Efter September 2021 og fremadrettet vil kun de platforme, der stoler på ISRG Root X1 vil fortsætte med at validere Let's Encrypt certifikater ([med undtagelse af Android][android-compat]).

Hvis dit certifikat validerer på nogle af de "kendte kompatible" platforme, men ikke andre, kan problemet være en webserver fejlkonfiguration. Hvis du har et problem med moderne platforme, er den mest almindelige årsag ikke at levere den korrekte certifikatkæde. Test dit websted med [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Hvis det ikke identificerer problemet, så spørg om hjælp i vores [Community Forums](https://community.letsencrypt.org/).

# Platforme der har tillid til ISRG Root X1

* Windows >= XP SP3 ([forudsat at automatisk rodcertifikatopdatering ikke er manuelt deaktiveret](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 inkluderer det ikke](https://support.apple.com/en-us/HT205205))
* [iPhone 5 og derover kan opgradere til iOS 10](https://en.wikipedia.org/wiki/IPhone_5) og kan dermed stole på ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (men Android >= 2.3.6 vil fungere som standard [på grund af vores specielle krydssignatur](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Præcise Pangolin / 12.04 (med opdateringer anvendt)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (med opdateringer indlæst)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3,26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Browsere (Chrome, Safari, Edge, Opera) stoler generelt på de samme rodcertifikater som det styresystem, de kører på. Firefox er undtagelsen: det har sin egne rodcertifikater. Snart vil nye versioner af Chrome [også have deres egne rodcertifikater][chrome-root-store].

# Platforme der stoler DST Root CA X3, men ikke ISRG Root X1

Disse platforme ville have fungeret frem til september 2021, men vil ikke længere validere Let's Encrypt certifikater.

* macOS <= 10.12.1
* iOS < 10
* Mozilla Firefox <= 50
* Ubuntu >= intrepid / 8,10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) og < jessie /8
* Java 8 >= 8u101 og < 8u141
* Java 7 >= 7u111 og < 7u151
* NSS >= v3. 11, 9 og < 3, 26
* Amazon FireOS (Silk Browser) (ukendte versionsnumre)
* Cyanogen > v10 (version der tilføjede ISRG Root X1 ukendt)
* Jolla Sailfish OS > v1.1.2.16 (version der tilføjede ISRG Root X1 ukendt)
* Kindle > v3.4.1 (version der tilføjede ISRG Root X1 ukendt)
* Brombær >= 10.3.3 (version, der tilføjede ISRG Root X1 ukendt)
* PS4-spillekonsol med firmware >= 5.00 (version, der tilføjede ISRG Root X1 ukendt)

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

Vi har indsendt ISRG Root X2 til Microsoft, Apple, Google, Mozilla, og Oracle rod-certifikat-programmer med henblik på tilføjelse.

ISRG Root X2 er allerede bredt betroet via et krydssignatur fra vores ISRG Root X1. Derudover har flere rodprogrammer allerede tilføjet ISRG Root X2 som et trust anchor.

For yderligere information, tjek vores [community forum indlæg](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).

Mens vi venter på, at ISRG Root X2 bliver bredt betroet, er det muligt at opt-in at bruge ISRG Root X2 til dine ECDSA-certifikater. For mere information, se vores [community forum indlæg](https://community.letsencrypt.org/t/root-x2-alternate-chain-for-ecdsa-opt-in-accounts/202884).

[android-compat]: /2020/12/21/extending-android-compatibility.html

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy
