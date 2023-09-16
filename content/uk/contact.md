---
title: Контакти
slug: contact
description: Як з нами зв'язатися
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**Ми не надаємо підтримку електронною поштою. Якщо у вас є запитання, будь ласка, відвідайте [форум спільноти](https://community.letsencrypt.org). Електронні адреси перелічені нижче лише для зазначених конкретних тем.**

## Запити ЗМІ

Електронна пошта: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Спонсорство

Електронна пошта: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Розсилка

Щоб підписатися на нашу розсилку, [натисніть тут.](https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51)

## Безпека

**Будь ласка, не пишіть на цю адресу, якщо ваше повідомлення не стосується проблеми безпеки Let's Encrypt.**

<span id="email">Електронна пошта: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Шифроване спілкування

Щоб встановити захищений канал комунікації з нашою командою безпеки, будь ласка, завантажте наш GPG ключ. Він складається з декількох частин, підписаних офлайн майстер-ключем. Будь-яка остання версія GnuPG підтримуватиме такий гібридний ключ. Поточна структура ключа:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

[Завантажте публічний GPG ключ](/security_letsencrypt.org-publickey.asc), або скористайтесь вашим улюбленим севером керування ключами.

Відбиток ключа має бути `0148 3B31 D8F9 DBA2 5D41 4DAA 718E 9F6D 10EC 230B`.
