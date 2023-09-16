---
title: Контакты
slug: contact
description: Как с нами связаться
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**Мы не предоставляем поддержку по электронной почте. Если у вас возникли вопросы, пожалуйста, обратитесь на наш [форум сообщества](https://community.letsencrypt.org/). Приведенные ниже адреса электронной почты предназначены только для указанных тем.**

## Контакты для прессы

Электронная почта: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Спонсорство

Электронная почта: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Почтовая рассылка

Чтобы подписаться на нашу рассылку, [нажмите здесь](https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51).

## Безопасность

**Пожалуйста, не пишите на этот адрес, если ваше сообщение не касается проблем с безопасностью Let's Encrypt.**

<span id="email">Электронная почта: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Зашифрованный обмен информацией

Для защищённой переписки с группой безопасности, используйте наш GPG ключ. Он состоит из нескольких частей, каждая из которых подписана оффлайновым мастер-ключом. Этот гибридный ключ поддерживает любая из недавних версий GnuPG. Текущая структура ключа:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Вы можете загрузить [открытый ключ GPG здесь](/security_letsencrypt.org-publickey.asc) или использовать ваш любимый сервер ключей.

Отпечаток ключа должен соответствовать `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.
