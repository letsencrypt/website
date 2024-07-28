---
title: Certifikatets Kompatilitet
slug: certificate-compatibility
lastmod: 2024-07-04
show_lastmod: 1
---


Den afgørende faktor for, om en platform kan validere Let's Encrypt certifikater er, om platformen stoler på ISRG's "ISRG Root X1" eller "ISRG Root X2" certifikater. Begge disse root certifikater har været med i platform trust stores i flere år nu (ISRG Root X1 siden slutningen af 2016, ISRG Root X2 siden midten af 2022), men det kan tage meget længere tid for platformopdateringer at være installeret bredt. I dag er tillid til ISRG Root X1 næsten allestedsnærværende, mens tillid til ISRG Root X2 stadig udbredes.

Hvis dit certifikat validerer på nogle af de "kendte kompatible" platforme, men ikke andre, kan problemet være en webserver fejlkonfiguration. Hvis du har et problem med moderne platforme, er den mest almindelige årsag ikke at levere den korrekte certifikatkæde. Test dit websted med [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Hvis det ikke identificerer problemet, så spørg om hjælp i vores [Community Forums](https://community.letsencrypt.org/).

Hvis din platform ikke er angivet her, vi værdsætter [pull requests](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md), der inkluderer dokumentation af, hvornår hver root blev tilføjet til platformens trust store.

# Platforme der har tillid til ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (medmindre [Automatisk rodcertifikat opdateringer](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) er blevet slået fra)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (med opdateringer installeret)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (med opdateringer installeret)
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (tidligere versioner bruger operativsystemets trust store)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Platforme der har tillid til ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (medmindre [Automatisk rodcertifikat opdateringer](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) er blevet slået fra)
* macOS >= [13](https://support.apple.com/en-us/103100)
* macOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (med opdateringer installeret)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (tidligere versioner bruger operativsystemets trust store)

Desuden stoler alle platforme, der stoler på ISRG Root X1 også på [cross-signed version af ISRG Root X2](/certificates#root-cas).
