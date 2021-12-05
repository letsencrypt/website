---
title: Оновлення протоколу ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

[Стандартизований IETF](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) протокол ACME, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/) — ключова складова роботи Let's Encrypt.

# Кінцеві точки API

Наразі ми підтримуємо такі кінцеві точки API. Будь ласка, ознайомтеся з [розбіжностями](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) для порівняння їхнього втілення.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (нерекомендований)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Нові зворотно сумісні функції ACME

Час від часу Let's Encrypt запроваджує нові зворотно сумісні функції для кінцевих точок API, які вже існують. Зазвичай нові зворотно сумісні функції включаються через рішення додати частину специфікацій ACME, яких не було раніше.

Коли нові функції вводяться в існуючі кінцеві точки API, вони завжди будуть чітко зазначені у загальнодоступній специфікації ACME, без порушення сумісності з реалізованими клієнтами.

# Нові версії протоколу ACME без зворотньої сумісності

Ми не плануємо порушувати зворотну сумісність за підтримки протоколу ACME. Проте, якщо це все ж буде потрібно, ми постараємося забезпечити плавний перехід за розумний час, попередивши всіх наших користувачів заздалегідь. Системні адміністратори повинні мати можливість своєчасно оновити клієнтське ПЗ в разі, коли зворотна сумісність версій буде порушена.
