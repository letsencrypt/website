---
title: Compatibilité du certificat
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


Le facteur déterminant pour qu'une plate-forme puisse valider les certificats Let's Encrypt est de savoir si cette plate-forme fait confiance aux certificats « ISRG Root X1 » ou « ISRG Root X2 » de l'ISRG. Ces deux racines sont incluses dans les magasins de confiance des plateformes depuis plusieurs années (ISRG Root X1 depuis fin 2016, ISRG Root X2 depuis mi-2022), mais il faut parfois beaucoup plus de temps pour que les mises à jour des plateformes soient installées à grande échelle. Aujourd'hui, la confiance dans l'ISRG Root X1 est presque omniprésente, tandis que la confiance dans l'ISRG Root X2 est encore en train de se diffuser.

Si votre certificat est validé sur certaines des plates-formes "compatibles connues" mais pas sur d'autres, le problème peut provenir d'une mauvaise configuration du serveur web. Si vous avez un problème avec les plateformes modernes, la cause la plus fréquente est l'incapacité à fournir la chaîne de certificats correcte. Testez votre site avec le [serveur de test de SSL Labs](https://www.ssllabs.com/ssltest/). Si cela ne permet pas d'identifier le problème, demandez de l'aide dans nos [forums communautaires](https://community.letsencrypt.org/).

Si votre plateforme n'est pas répertoriée ici, nous apprécions les [demandes d'extraction](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) qui incluent une information sur la date à laquelle chaque racine a été ajoutée au magasin de confiance de cette plateforme.

# Plateformes qui font confiance à ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (sauf si les [mises à jour automatiques du certificat racine](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) ont été désactivées)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (avec les mises à jour effectuées)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (avec les mises à jour effectuées)
* RHEL >= 6.10, 7.4 ([avec les mises à jour effectuées](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (les versions antérieures utilisent le magasin de confiance du système d'exploitation)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Plates-formes qui font confiance à l'ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (sauf si les [mises à jour automatiques du certificat racine](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) ont été désactivées)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (avec les mises à jour effectuées)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL >= 7.9, 8.6, 9.1 ([avec les mises à jour effectuées](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (les versions antérieures utilisent le magasin de confiance du système d'exploitation)

En outre, toutes les plates-formes qui font confiance à ISRG Root X1 font également confiance à la version [de ISRG Root X2](/certificates#root-cas).
