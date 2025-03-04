---
title: Contatti
slug: contact
description: Come contattarci
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**Non forniamo supporto via email. Se hai una domanda, usa il nostro [forum della comunità](https://community.letsencrypt.org). Gli indirizzi email qui sotto sono solo per gli argomenti specifici descritti.**

## Ufficio stampa

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorizzazione

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Iscriviti alla nostra newsletter

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

## Privacy

E-mail: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Sicurezza

**Non scrivere a questo indirizzo a meno che il messaggio non riguardi un problema di sicurezza con Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
