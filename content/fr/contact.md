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

{{< newsletter-inline >}}

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
