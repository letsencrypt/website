---
title: Планируемый функционал
slug: upcoming-features
top_graphic: 1
lastmod: 2023-06-20
show_lastmod: 1
---

## Поддержка ECDSA для корневых и промежуточных сертификатов

Мы выдаем сертификаты нашего промежуточного продукта ECDSA для [списка разрешённых аккаунтов](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Пока мы не планируем удалять список разрешённых аккаунтов.

# Реализованый функционал

## Информация о продлении ACME (ARI)

* Запущено: 23 марта 2023

Мы теперь используем систему [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), которая позволяет нам уведомлять подписчиков через API, когда им необходимо обновить сертификаты.

## Многофакторная валидация

* Запущено: 19 февраля 2020

Теперь мы проверяем права на домен с [нескольких сетевых ракурсов](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Журнал Certificate Transparency

* Запущено: 15 мая 2019

Мы запустили интеграцию с [журналами Certificate Transparency](/docs/ct-logs).

## Внедрение метода проверки TLS ALPN

* Запущено: 12 июля 2018

Мы разработали и запустили [замену](https://tools.ietf.org/html/rfc8737) для метода проверки TLS-SNI, поддержка которого [прекращена по соображениям безопасности](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Замена метода была критичной для web-серверов с одним доступным портом 443 для выполнения проверок.

## Сертификаты с возможностью подстановки (wildcard-сертификаты)

* Запущено: 13 марта 2018

## ACME v2 API

* Запущено: 13 марта 2018

## Полная поддержка IPv6

* Запущено: 26 июля 2016
