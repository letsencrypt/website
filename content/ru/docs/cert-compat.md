---
title: Совместимость сертификатов
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt стремится обеспечить совместимость с максимально возможным количеством приложений не в ущерб безопасности. Основным фактором, определяющим, может ли платформа использовать сертификаты Let's Encrypt, является наличие сертификата IdenTrust's DST Root X3 в ее доверенном хранилище. Второй фактор -- поддержка платформой современных  сертификатов [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1), так как все сертификаты Let's Encrypt используют SHA-2.

Если ваш сертификат работает лишь на некоторых платформах из списка "Известные совместимые платформы", но не на всех, проблема может быть в неправильных настройках сервера. Если у вас проблема с современными платформами, наиболее частая причина -- непредоставление правильной цепочки сертификатов. Если проблема возникает со старыми платформами, такими как Windows XP, возможная причина -- ошибка конфигурации ciphersuite, или версия TLS, которая поддерживается на платформе, или платформе не хватает поддержки Server Name Indication (SNI). Протестируйте ваш сайт с помощью [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Если это не поможет определить проблему, обратитесь за помощью на [Форумы сообщества](https://community.letsencrypt.org/).

Возможно, [это обсуждение на форумах сообщества](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) поможет вам узнать больше о совместимости.

# Известные совместимые платформы

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer на Windows XP SP3 и выше
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 на macOS
* Safari на iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* Игровая консоль PS4 с версией прошивки >= 5.00

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
