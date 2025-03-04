---
title: Kontakt
slug: contact
description: Jak nás kontaktovat
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**Neposkytujeme podporu prostřednictvím e-mailu. Pokud máte dotaz na podporu, použijte prosím naše [komunitní fóra](https://community.letsencrypt.org). Níže uvedené e-mailové adresy jsou pouze pro konkrétní popsaná témata.**

## Média

E-mail: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponzorství

E-mail: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Přihlásit se k odběru novinek

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

## Soukromí

Email: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Bezpečnost

**Prosím, nepište na tuto adresu, pokud se vaše zpráva netýká bezpečnostních problémů s Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
