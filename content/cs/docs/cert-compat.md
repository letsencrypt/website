---
title: Kompatibilita certifikátů
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


O tom, zda platforma dokáže ověřit certifikáty Let's Encrypt, rozhoduje její důvěra v certifikáty ISRG „ISRG Root X1“ nebo „ISRG Root X2“. Oba tyto kořenové certifikáty jsou v úložištích důvěryhodných certifikátů platforem zahrnuty již několik let (ISRG Root X1 od konce roku 2016 a ISRG Root X2 od poloviny roku 2022), široké nasazení aktualizací platforem však může trvat podstatně déle. Důvěra v ISRG Root X1 je dnes téměř všeobecná, zatímco důvěra v ISRG Root X2 se stále rozšiřuje.

Pokud se certifikát ověří na některých platformách uvedených jako „kompatibilní“, ale na jiných nikoli, může být příčinou nesprávná konfigurace webového serveru. Příčinou problémů na moderních platformách bývá nejčastěji neposkytnutí správného řetězce certifikátů. Otestujte svůj web pomocí [testu serveru SSL Labs](https://www.ssllabs.com/ssltest/). Pokud test problém neodhalí, požádejte o pomoc na našem [komunitním fóru](https://community.letsencrypt.org/).

Pokud zde vaše platforma není uvedena, uvítáme [pull request](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) s doložením data, kdy byl každý kořenový certifikát přidán do jejího úložiště důvěryhodných certifikátů.

# Platformy důvěřující certifikátu ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (pokud nejsou vypnuté [automatické aktualizace kořenových certifikátů](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)))
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (s nainstalovanými aktualizacemi)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (s nainstalovanými aktualizacemi)
* RHEL >= 6.10, 7.4 ([s nainstalovanými aktualizacemi](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (starší verze používají úložiště důvěryhodných certifikátů operačního systému)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Platformy důvěřující certifikátu ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (pokud nejsou vypnuté [automatické aktualizace kořenových certifikátů](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)))
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (s nainstalovanými aktualizacemi)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL >= 7.9, 8.6, 9.1 ([s nainstalovanými aktualizacemi](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (starší verze používají úložiště důvěryhodných certifikátů operačního systému)

Všechny platformy, které důvěřují certifikátu ISRG Root X1, navíc důvěřují také [křížově podepsané verzi certifikátu ISRG Root X2](/certificates#root-cas).
