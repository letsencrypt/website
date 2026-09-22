---
title: Certifikatkompabilitet
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


Den avgörande faktorn för om en plattform kan validera Let's Encrypt-certifikat är om den plattformen litar på ISRG:s "ISRG Root X1" eller "ISRG Root X2"-certifikat. Båda dessa rotcertifikat har inkluderats i plattformars certifikatarkiv under flera år nu (ISRG Root X1 sedan slutet av 2016, ISRG Root X2 sedan mitten av 2022), men det kan ta betydligt längre tid innan plattformsuppdateringar installeras brett. Idag är förtroendet för ISRG Root X1 nästan allmänt, medan förtroendet för ISRG Root X2 fortfarande sprids.

Om dina certifikat validerar på vissa av de känt kompatible plattformarna nedan men inte på andra så kan problemet ligga i webbserverkonfigurationen. Om du har problem med moderna plattformar är den vanligaste anledningen att inte rätt certifikatkedja används. Testa din webbplats med [servertestet hos SSL Labs](https://www.ssllabs.com/ssltest/). Om inte det hittar problemet så kan du fråga efter hjälp på engelska i vårt [användarforum](https://community.letsencrypt.org/).

Om din plattform inte är listad här, uppskattar vi [pull-förfrågningar](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) som inkluderar dokumentation om när varje root lades till i den plattformens certifikatarkiv.

# Plattformar som litar på ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (om inte [automatiska uppdateringar av rotcertifikat](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) har inaktiverats)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (med uppdateringar applicerade)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (med uppdateringar applicerade)
* RHEL >= 6.10, 7.4 ([med uppdateringar tillämpade](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (tidigare versioner använder operativsystemets certifikatarkiv)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Plattformar som litar på ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (om inte [automatiska uppdateringar av rotcertifikat](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) har inaktiverats)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (med uppdateringar applicerade)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL >= 7.9, 8.6, 9.1 ([med uppdateringar tillämpade](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (tidigare versioner använder operativsystemets certifikatarkiv)

Dessutom litar alla plattformar som litar på ISRG Root X1 också på den [korssignerade versionen av ISRG Root X2](/certificates#root-cas).
