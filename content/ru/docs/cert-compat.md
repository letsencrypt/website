---
title: Совместимость сертификатов
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


Определяющим фактором для того, может ли платформа проверять сертификаты Let's Encrypt, является доверие этой платформы к сертификатам "ISRG Root X1" или "ISRG Root X2" корневого центра ISRG. Оба этих корневых сертификата уже несколько лет включены в хранилища доверенных сертификатов платформ (ISRG Root X1 — с конца 2016 года, ISRG Root X2 — с середины 2022 года), однако для широкого распространения обновлений платформ может потребоваться гораздо больше времени. На сегодняшний день доверие к ISRG Root X1 распространено практически повсеместно, в то время как доверие к ISRG Root X2 всё ещё продолжает распространяться.

Если ваш сертификат работает лишь на некоторых платформах из списка "Известные совместимые платформы", но не на всех, проблема может быть в неправильных настройках сервера. Если у вас есть проблемы с современными платформами, наиболее распространенной причиной является невозможность предоставить правильную цепочку сертификатов. Протестируйте ваш сайт с помощью [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Если это не поможет определить проблему, обратитесь за помощью на [Форумы сообщества](https://community.letsencrypt.org/).

Если ваша платформа не указана здесь, мы будем благодарны за [pull requests](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) с документацией о том, когда каждый корневой сертификат был добавлен в хранилище доверенных сертификатов этой платформы.

# Платформы, которые доверяют ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (если [Автоматическое обновление корневых сертификатов](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) не отключено)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (с установленными обновлениями)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (с установленными обновлениями)
* RHEL >= 6.10, 7.4 ([с установленными обновлениями](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (более ранние версии используют хранилище доверенных сертификатов операционной системы)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Платформы, которые доверяют ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (если [автоматическое обновление корневых сертификатов](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) не отключено)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (с установленными обновлениями)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL >= 7.9, 8.6, 9.1 ([с установленными обновлениями](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (более ранние версии используют хранилище доверенных сертификатов операционной системы)

Кроме того, все платформы, которые доверяют ISRG Root X1, также доверяют [кросс-подписанной версии ISRG Root X2](/certificates#root-cas).
