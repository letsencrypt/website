---
title: Обновления протокола ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
---

{{< lastmod >}}

[Стандартизованный IETF](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) протокол ACME, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/) - это краеугольный камень в концепции работы Let's Encrypt.

# Версии API

В настоящее время мы поддерживаем следущие версии API. Пожалуйста, ознакомьтесь с [отступлениями от протокола ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) для сравнения реализаций.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (не рекомендовано к использованию)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Новые возможности протокола ACME, с обратной совместимостью

Время от времени, Let's Encrypt принимает решение о внедрении ранее нереализованных возможностей протокола ACME.
Как правило, такие изменения в API обладают обратной совместимостью, тщательно описаны в публичной документации,
и не вызывают сбоев в корректно реализованных ACME-клиентах.

# Новые версии протокола ACME, без обратной совместимости

Мы не планируем нарушать обратную совместимость при поддержке протокола ACME. Тем не менее, если это всё же потребуется,
мы постараемся обеспечить плавный переход за разумное время, предупредив всех наших пользователей заранее.
Системные администраторы должны иметь возможность своевременно обновить клиентское ПО в случае, когда обратная совместимость
версий будет нарушена.
