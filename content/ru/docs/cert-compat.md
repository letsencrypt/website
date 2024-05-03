---
title: Совместимость сертификатов
slug: certificate-compatibility
lastmod: 2023-08-02
show_lastmod: 1
---


Главным определяющим фактором для того, может ли платформа проверить сертификаты шифрования является то, доверяет ли эта платформа сертификату ISRG "ISRG Root X1". До сентября 2021 г. некоторые платформы могли подтверждать наши сертификаты, даже если они не включали ISRG Root X1, поскольку они доверяли сертификату "DST Root CA X3" IdenTrust. С октября 2021 г., только те платформы, которые доверяют ISRG Root X1 подтвердят сертификаты Let's Encrypt ([за исключением Android][android-compat]).

Если ваш сертификат работает лишь на некоторых платформах из списка "Известные совместимые платформы", но не на всех, проблема может быть в неправильных настройках сервера. Если у вас есть проблемы с современными платформами, наиболее распространенной причиной является невозможность предоставить правильную цепочку сертификатов. Протестируйте ваш сайт с помощью [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Если это не поможет определить проблему, обратитесь за помощью на [Форумы сообщества](https://community.letsencrypt.org/).

# Платформы, которые доверяют ISRG Root X1

* Windows >= XP SP3 ([предполагается, что обновление корневого сертификата не отключено вручную](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=ru)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([исключая iOS 9](https://support.apple.com/en-us/HT205205))
* [iPhone 5 и выше можно обновить до iOS 10](https://en.wikipedia.org/wiki/IPhone_5) и таким образом будет доверять ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (но Android >= 2.3.6 будет работать по умолчанию [из-за нашей специальной кросс-подписи](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin/12.04 (с примененными обновлениями)
* [Debian >= jessie/8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (с обновлениями)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Браузеры (Chrome, Safari, Edge, Opera), как правило, доверяют тем же корневым сертификатам, что и операционная система, на которой они работают. Firefox является исключением: у него есть собственное хранилище корневых сертификатов. Скоро у новых версий Chrome [будет собственное хранилище корневых сертификатов][chrome-root-store].

# Платформы, которые доверяют DST Root CA X3, но не ISRG Root X1

Эти платформы работали до сентября 2021 года, но больше не будут подтверждать сертификаты Let's Encrypt.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= Intrepid/8.10
* [Debian >= squeeze/6](https://twitter.com/TokenScandi/status/600806080684359680) и < jessie/8
* Java 8 >= 8u101 и < 8u141
* Java 7 >= 7u111 и < 7u151
* NSS >= v3.11.9 и < 3.26
* Amazon FireOS (Silk Browser) (версии неизвестны)
* Cyanogen > v10 (версия, добавившая ISRG Root X1 неизвестна)
* Jolla Sailfish OS > v1.1.2.16 (версия, добавившая ISRG Root X1 неизвестна)
* Kindle > v3.4.1 (версия, добавившая ISRG Root X1 неизвестна)
* Blackberry >= 10.3.3 (версия, добавившая ISRG Root X1 неизвестна)
* Игровая консоль PS4 с прошивкой >= 5.00 (версия, добавившая ISRG Root X1 неизвестна)

# Известные несовместимые платформы

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP до SP3
  * не умеет работать с подписанными SHA-2 сертификатами
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (почтовый клиент от 2012, не веб-почта)
  * не умеет работать с сертификатами без CRL
* Игровая консоль PS3
* Игровая консоль PS4 с версией прошивки < 5.00

# ISRG Root X2 (новый корневой ECDSA) — скоро

Мы представили ISRG Root X2 для включения в программы Microsoft, Apple, Google, Mozilla и Oracle.

ISRG Root X2 уже пользуется большим доверием благодаря кросс-подписи от нашего ISRG Root X1. Кроме того, некоторые root-программы уже имеют добавленный ISRG Root X2 в качестве доверенного якоря.

Для получения дополнительной информации о статусе включения ознакомьтесь с нашим [собщением на форуме сообщества](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).

Пока ISRG Root X2 получит широкое доверие, вы можете согласиться на использование ISRG Root X2 для ваших сертификатов ECDSA. Для более подробной информации ознакомьтесь с [сообщением на форуме сообщества](https://community.letsencrypt.org/t/root-x2-alternate-chain-for-ecdsa-opt-in-accounts/202884).

[android-compat]: /2020/12/21/extending-android-compatibility.html

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy
