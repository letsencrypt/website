---
title: Внесите свой вклад
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## Сообщество

Мы всегда готовы принять помощь в поиске ответов на вопросы [в техподдержку сообщества Let's Encrypt](https://community.letsencrypt.org/).
В [нашем блоге](/2015/08/13/lets-encrypt-community-support.html) мы объясняем, почему так важно поддерживать сообщество.

## Программирование

Нам также важна помощь в разработке программного обеспечения. Весь наш код находится на [GitHub](https://github.com/letsencrypt/).

### Разработка ACME-клиента

Утилита [Certbot](https://github.com/certbot/certbot), написанная на Python, запускается на вашем web-сервере для получения сертификатов и настройки HTTPS. Certbot рекомедуется к использованию как основной ACME-клиент, но существует [множество других клиентов]({{< ref "/docs/client-options.md" >}}).

### Разработка Центра Сертификации

[Boulder](https://github.com/letsencrypt/boulder) - это реализация Центра Сертификации для Let's Encrypt . Он основан на протоколе [ACME](https://github.com/ietf-wg-acme/acme), и написан в основном на Go. Отличный способ начать - ознакомиться со списком [проблем типа 'help wanted'](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted), и [инструкцией для контрибуторов](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### Сайт letsencrypt.org

Вы можете улучшить сайт и документацию на нем [тут](https://github.com/letsencrypt/website), или помочь с [переводом](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md) на другие языки.

## Протокол ACME

Для взаимодействия с клиентами, запущенными на web-серверах, Центр Сертификации использует специальный протокол ACME ("Automated Certificate Management Environment"). Черновик протокола [доступен на Github](https://github.com/ietf-wg-acme/acme). Совместно с IETF ведётся работа по доведению протокола ACME до состояния открытого стандарта. Вы можете присоединиться к разработке с помощью [этого списка рассылки IETF](https://www.ietf.org/mailman/listinfo/acme).