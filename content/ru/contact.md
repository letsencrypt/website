---
title: Контакты
slug: contact
description: Как с нами связаться
lastmod: 2025-11-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

## Помощь и поддержка

**Мы не предоставляем поддержку по электронной почте.**

Если вам нужна помощь или у вас есть вопросы по поддержке, воспользуйтесь нашими [форумами сообщества](https://community.letsencrypt.org).

Приведенные ниже адреса электронной почты предназначены только для указанных тем.

## Контакты для прессы

Электронная почта: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Спонсорство

Электронная почта: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Подпишитесь на нашу рассылку

{{< newsletter-inline >}}

## Конфиденциальность

Электронная почта: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

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
