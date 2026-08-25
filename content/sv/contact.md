---
title: Kontakt
slug: contact
description: Hur man kontaktar oss
lastmod: 2025-11-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

## Hjälp och stöd

**Vi tillhandahåller inte support via e-post.**

Om du behöver hjälp eller har en supportfråga, vänligen använd våra [communityforum](https://community.letsencrypt.org).

E-postadresserna nedan är bara till för de specifika ärenden som nämns.

## Pressfrågor

E-post: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorskap

E-post: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Prenumerera på vårt nyhetsbrev

{{< newsletter-inline >}}

## Sekretess

E-post: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Säkerhet

**Vänligen skicka inte till denna adress om inte ditt meddelande berör ett säkerhetsproblem med Let's Encrypt.**

<span id="email">E-post: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
