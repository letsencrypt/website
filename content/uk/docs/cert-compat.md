---
title: Сертифікаційна сумісність
slug: certificate-compatibility
lastmod: 2024-05-07
show_lastmod: 1
---


Основним фактором визначення того чи платформа може перевірити сертифікати Let's Encrypt є те, чи платформа довіряє сертифікації ISRG Root X1 сертифікату. Обидва ці корені включені до магазинів довіри платформ протягом декількох років (ISRG Root X1 з кінця 2016 року. ISRG Root X2 з середини 2022), але для широкого встановлення платформ може знадобитися набагато більше часу. Сьогодні довіра до RootISRG X1 майже всюдисущий, тоді як довіра до ISRG Root X2 все ще поширюється.

Якщо Ваш сертифікат підтвердиться на деяких з "Сумісних" платформ, але не на інших, то проблема може бути в неправильній конфігурації веб-сервера. Якщо у вас виникли проблеми з новітніми платформами, найбільш поширеною причиною є помилка при здачі правильного ланцюжка сертифікату. Перевірте свій сайт з допомогою [SSL Lab's Server Test](https://www.ssllabs.com/ssltest/). Якщо це не розпізнає проблему, зверніться по допомогу до нашої[Форум-спільноти](https://community.letsencrypt.org/).

Якщо вашої платформи немає в цьому списку, ми будемо вдячні за [розгляди](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md), які містять документацію про те, коли кожну деталь було додано до сховища довіри цієї платформи.

# Платформи, які довіряють ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (якщо не вимкнено [Автоматичне оновлення кореневих сертифікатів](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)))
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (з застосованими оновленнями)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (з додатковими оновленнями)
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (більш ранні версії використовують магазин довіри операційної системи)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Платформи, які довіряють ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (якщо не вимкнено [Автоматичне оновлення кореневих сертифікатів](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)))
* macOS >= [13](https://support.apple.com/en-us/103100)
* macOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (із застосуванням оновлення)
* Debian >= [11 / Jessie](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/) (з додатковими оновленнями)
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (більш ранні версії використовують магазин довіри операційної системи)

Крім того, всі платформи, які довіряють ISRG Root X1, також[затвердженій кількома особами версії ISRG Root X2](/certificates#root-cas).
