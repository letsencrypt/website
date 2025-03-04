---
title: Kontakt
slug: contact
description: Sådan kontakter du os
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**Vi yder ikke support via e-mail. Hvis du har et spørgsmål om support, så brug venligst vores [community fora](https://community.letsencrypt.org). Nedenstående e-mail-adresser er kun for de specifikke emner, der er angivet.**

## Pressehenvendelser

E-mail: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorering

E-mail: [press@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Abonner på vores nyhedsbrev

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

## Privatlivspolitik

Email: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Sikkerhed

**Skriv venligst ikke til denne adresse, medmindre din meddelelse vedrører et sikkerhedsproblem med Let's Encypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
