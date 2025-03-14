---
title: Pour commencer
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt délivre des certificats par le biais d'une API automatisée basée sur le protocole [ACME](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).

Pour interagir avec l'API de Let's Encrypt et obtenir un certificat, un logiciel appelé « client ACME » est nécessaire. Aucune partie du processus d'obtention d'un certificat ne se déroule sur ce site web, qui n'a qu'une valeur informative.

La première question à laquelle doivent répondre les personnes qui souhaitent commencer à utiliser Let's Encrypt est la suivante : mon hébergeur obtiendra-t-il et gérera-t-il les certificats de Let's Encrypt pour moi, ou dois-je exécuter moi-même un client ACME ?

# Obtenir des certificats par l'intermédiaire de votre hébergeur

Pour de nombreuses personnes, leur fournisseur d'hébergement obtiendra et gérera les certificats de Let's Encrypt pour eux. Si c'est le cas, votre fournisseur utilise un client ACME et vous n'avez pas à vous préoccuper d'obtenir ou d'utiliser vous-même le logiciel client ACME.

Si votre fournisseur obtient et gère les certificats pour vous, cela se fera automatiquement ou bien vous devrez activer une option de configuration. Consultez la documentation et les options de configuration de votre fournisseur.

# Choisir et utiliser soi-même un client ACME

Si votre hébergeur ne s'occupe pas de l'obtention et de la gestion des certificats pour vous, et si vous avez la possibilité d'exécuter des commandes sur votre serveur avec des privilèges suffisants, vous pouvez sélectionner un client ACME et l'exécuter vous-même pour obtenir des certificats auprès de Let's Encrypt.

Pour la plupart des gens, nous recommandons le [Certbot ACME client](https://certbot.eff.org/). Le site web de Certbot contient une excellente documentation et des instructions sur l'utilisation de Certbot.

Il existe [beaucoup d'autres options pour le logiciel client ACME](/docs/client-options/) si pour une raison ou une autre Certbot ne répond pas à vos besoins.

Si votre client doit être configuré avec le point de terminaison de l'API ACME de Let's Encrypt, il l'est :

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

Nous recommandons d'effectuer d'abord des tests avec notre [API de pré-production](/docs/staging-environment/).

# Obtenir de l'aide

Si vous avez des questions sur la sélection d'un client ACME, ou sur l'utilisation d'un client particulier, ou sur tout autre sujet lié à Let's Encrypt, veuillez essayer notre [forums communautaires utiles](https://community.letsencrypt.org/).

Notre site web contient également une [documentation détaillée](/docs/) si vous avez besoin de plus de détails.
