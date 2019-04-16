---
title: Внесите свой вклад
slug: getinvolved
top_graphic: 5
menu:
  main:
    weight: 60
    parent: donate
---

## Сообщество

Мы всегда готовы принять помощь в поиске ответов на вопросы [в техподдержку сообщества Let's Encrypt](https://community.letsencrypt.org/).
В [нашем блоге](https://letsencrypt.org/2015/08/13/lets-encrypt-community-support.html) мы объясняем, почему так важно поддерживать сообщество.

## Программирование

Нам также важна помощь в разработке программного обеспечения. Весь наш код находится на [GitHub](https://github.com/letsencrypt/).

### Разработка ACME-клиента

Утилита [Certbot](https://github.com/certbot/certbot), написанная на Python, запускается на вашем web-сервере для получения сертификатов и настройки HTTPS. Certbot рекомедуется к использованию как основной ACME-клиент, но существует [множество других клиентов](https://letsencrypt.org/docs/client-options/).

### Разработка Центра Сертификации

[Boulder](https://github.com/letsencrypt/boulder) - это реализация Центра Сертификации для Let's Encrypt . Он основан на протоколе [ACME](https://github.com/ietf-wg-acme/acme), и написан в основном на Go. Отличный способ начать - ознакомиться со списком [проблем типа 'help wanted'](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted), и [инструкцией для контрибуторов](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### Сайт letsencrypt.org

Вы можете улучшить сайт и документацию на нем [тут](https://github.com/letsencrypt/website), или помочь с [переводом](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md) на другие языки.

## Протокол ACME



The Let's Encrypt CA talks to certificate management software running on web servers.  The protocol for this is called ACME, for "Automated Certificate Management Environment." The draft ACME spec is [available on Github](https://github.com/ietf-wg-acme/acme). Work is underway within the IETF to finalize ACME as a truly open standard. You can join the ACME protocol development discussion on [this IETF mailing list](https://www.ietf.org/mailman/listinfo/acme).
