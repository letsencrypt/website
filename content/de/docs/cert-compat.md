---
title: Kompatibilität der Zertifikate
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-10-31
show_lastmod: 1
---


Der wichtigste entscheidende Faktor dafür, ob eine Plattform Let's Encrypt Zertifikate validieren kann, ist, ob diese Plattform dem "ISRG Root X1"-Zertifikat von ISRG vertraut. Vor September 2021 konnten einige Plattformen unsere Zertifikate validieren, obwohl sie ISRG Root X1 nicht enthalten, da sie dem „DST Root CA X3“-Zertifikat von IdenTrust vertrauten. Ab Oktober 2021 validieren nur die Plattformen, die ISRG Root X1 vertrauen, Let's Encrypt-Zertifikate ([mit Ausnahme von Android](/2020/12/21/extending-android-compatibility.html)).

Wenn Ihr Zertifikat auf einigen bekannten kompatiblen Plattformen, aber auf anderen Plattformen nicht validiert wird, kann das Problem eine falsche Konfiguration des Webservers sein. Wenn Sie ein Problem mit modernen Plattformen haben, liegt die häufigste Ursache darin, dass Sie nicht die richtige Zertifikatskette bereitstellen. Testen Sie Ihre Seite mit dem [SSL Labs Server Test](https://www.ssllabs.com/ssltest/). Wenn das Problem dadurch nicht erkannt wird, bitten Sie um Hilfe in unseren [Community-Foren](https://community.letsencrypt.org/).

# Plattformen, die ISRG Root X1 vertrauen

* Windows >= XP SP3 ([angenommen, dass das automatische Root-Zertifikat Update nicht manuell deaktiviert ist](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 beinhaltet es nicht](https://support.apple.com/en-us/HT205205))
* [iPhone 5 und höher können auf iOS 10 aktualisiert werden](https://en.wikipedia.org/wiki/IPhone_5) und somit ISRG Root X1 vertrauen
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (Aber Android >= 2.3.6 wird standartmässig laufen [aufgrund unseres speziellen Cross Signs](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin / 12.04 (mit angewendeten Updates)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (mit angewendeten Updates)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Browser (Chrome, Safari, Edge, Opera) vertrauen im Allgemeinen den gleichen Root-Zertifikaten wie das Betriebssystem, auf dem sie laufen. Firefox ist die Ausnahme: Es hat seinen eigenen Root-Store. Bald werden neue Versionen von Chrome [auch einen eigenen Root-Store](https://www.chromium.org/Home/chromium-security/root-ca-policy) haben.

# Plattformen, die DST Root CA X3 vertrauen, aber nicht ISRG Root X1

Diese Plattformen haben bis September 2021 funktioniert, validieren aber keine Let’s Encrypt-Zertifikate mehr.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) und < jessie /8
* Java 8 >= 8u101 und < 8u141
* Java 7 >= 7u111 und < 7u151
* NSS >= v3.11.9 und < 3.26
* Amazon FireOS (Silk-Browser) (Versionsbereich unbekannt)
* Cyanogen > v10 (Version, die ISRG Root X1 hinzugefügt hat unbekannt)
* Jolla Sailfish OS > v1.1.2.16 (Version, die ISRG Root X1 hinzugefügt hat unbekannt)
* Kindle > v3.4.1 (Version, die ISRG Root X1 hinzugefügt hat unbekannt)
* Blackberry >= 10.3.3 (Version, die ISRG Root X1 hinzugefügt hat unbekannt)
* PS4 game console with firmware >= 5.00 (Version, die ISRG Root X1 hinzugefügt hat unbekannt)

# Bekannte inkompatible Plattformen

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP vor SP3
  * kann SHA-2 signierte Zertifkate nicht verarbeiten
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (Programm von 2012, nicht Webmail)
  * kann Zertifikate ohne CRL nicht verarbeiten
* PS3-Konsole
* PS4-Konsole mit Firmware < 5.00

# ISRG Root X2 (neuer ECDSA Root) - bald verfügbar

Wir haben ISRG Root X2 bei den Microsoft, Apple, Google, Mozilla und Oracle Root-Programmen für die Integration eingereicht. ISRG Root X2 ist bereits über ein Cross-Sign von unserem ISRG Root X1 weitgehend vertraut. Weitere Informationen finden Sie in unserem [Beitrag im Community-Forum](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).
