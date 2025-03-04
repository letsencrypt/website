---
title: Contact
slug: contact
description: Comment nous contacter
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**Nous ne fournissons pas de support par e-mail. Si vous avez une question de support, veuillez utiliser nos [forums de la communauté](https://community.letsencrypt.org). Les adresses e-mail ci-dessous ne sont que pour les sujets spécifiques décrits.**

## Demandes de presse

Courriel : [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Parrainage

Courriel : [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Abonnez-vous à notre newsletter

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

## Confidentialité

Courriel : [ privacy@abetterinternet.org ](mailto:privacy@abetterinternet.org)

## Sécurité

**Veuillez ne pas écrire à cette adresse à moins que votre message ne concerne un problème de sécurité avec Let's Encrypt.**

<span id="email">Courriel : </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
