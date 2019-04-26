---
title: Реестр совместимости
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt стремится обеспечить совместимость с максимально возможным числом браузеров и операционных систем (платформ), без ущерба для безопасности. Первостепенное значение для принятия платформой сертификатов Let's Encrypt является наличие сертификата IdenTrust DST Root X3 в платформенном хранилище сертификатов. Дополнительно, платформа должна поддерживать работу с [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) сертификатами, т.к. все сертификаты Let's Encrypt используют SHA-2.

Если сертификат принимается на одной части совместимых платформ, и не принимается на другой части - скорее всего, проблема в настройках web-сервера. Для относительно новых платформах причиной может быть ошибка в цепочке доверия сертификатов. Для относительно старых платформ (как, например, Windows XP), основная причина отказов кроется в отсутствии нужных наборов шифрования, нужной версии TLS, или поддержки [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication). Проверьте ваш сайт с помощью сервиса [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Если и он не помог в решении проблемы, обратитесь за помощью на наш [форум сообщества](https://community.letsencrypt.org/).

Для дополнительной информации по вопросам совместимости, посетите [этот раздел форума](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/).

# Совместимые платформы

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer для Windows XP SP3 и выше
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 для macOS
* Safari для iOS >= v3.1
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
* PS4 с версией прошивки >= 5.00

# Несовместимые платформы

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP до SP3
  * не поддерживает сертификаты на основе SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (почтовый клиент 2012, не web-почта)
  * не поддерживает сертификаты без CRL
* PS3 
* PS4 с версией прошивки < 5.00
