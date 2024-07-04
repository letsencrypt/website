---
title: Certificate Compatibility
slug: certificate-compatibility
lastmod: 2024-07-04
show_lastmod: 1
---


The determining factor for whether a platform can validate Let's Encrypt certificates is whether that platform trusts ISRG's "ISRG Root X1" or "ISRG Root X2" certificates. Both of these roots have been included in platform trust stores for several years now (ISRG Root X1 since late 2016, ISRG Root X2 since mid 2022), but it can take much longer for platform updates to be widely installed. Today, trust in ISRG Root X1 is nearly ubiquitous, while trust in ISRG Root X2 is still propagating.

If your certificate validates on some of the "Known Compatible" platforms but not others, the problem may be a web server misconfiguration. If you're having an issue with modern platforms, the most common cause is failure to provide the correct certificate chain. Test your site with [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). If that doesn't identify the problem, ask for help in our [Community Forums](https://community.letsencrypt.org/).

If your platform is not listed here, we appreciate [pull requests](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) that include documentation of when each root was added to that platform's trust store.

# Platforms that trust ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (unless [Automatic Root Certificate Updates](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) have been disabled)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (with updates applied)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (with updates applied)
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (earlier versions use the operating system trust store)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Platforms that trust ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (unless [Automatic Root Certificate Updates](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) have been disabled)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (with updates applied)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (earlier versions use the operating system trust store)

In addition, all platforms which trust ISRG Root X1 also trust the [cross-signed version of ISRG Root X2](/certificates#root-cas).
