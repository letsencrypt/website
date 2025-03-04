---
title: Контакти
slug: contact
description: Як з нами зв'язатися
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**Ми не надаємо підтримку електронною поштою. Якщо у вас є запитання, будь ласка, відвідайте [форум спільноти](https://community.letsencrypt.org). Електронні адреси перелічені нижче лише для зазначених конкретних тем.**

## Запити ЗМІ

Електронна пошта: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Спонсорство

Електронна пошта: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Підписуйтеся на наші новини

<iframe id="newsletter-iframe" src="https://outreach.abetterinternet.org/l/1011011/2025-01-14/31v6r" style="width: 100%; border: 0; overflow: hidden;"></iframe>
<script>
let hasResized = false;
window.addEventListener('message', function(e) {
    if (hasResized) return; // Only allow one resize
    if (e.origin !== 'https://outreach.abetterinternet.org') return;
    if (e.data && typeof e.data === 'object' && e.data.type === 'resize' && e.data.height) {
        hasResized = true;
        document.getElementById('newsletter-iframe').style.height = (e.data.height + 20) + 'px';
    }
});
</script>

## Приватність

Електронна пошта: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

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
