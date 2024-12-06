---
title: Fonctionnalités à venir
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

Pour les annonces de prochains développements, veuillez consulter la catégorie [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) (Annonces API) sur le forum communautaire de Let's Encrypt.

# Fonctionnalités achevées

## Certificats Racine et Intermédiaires ECDSA

* Activé : 06 juin 2024

Nous émettons des certificats à partir de nos intermédiaires ECDSA de production vers des certificats ECDSA leaf. Voir la documentation sur les [chaînes de confiance](/certificates/) pour plus de détails sur notre hiérarchie PKI.

## Informations de renouvellement de l'ACME (ARI)

* Activé : 23 mars 2023

Nous gérons maintenant [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), un système qui nous permet d'avertir les abonnés par API lorsqu'ils doivent renouveler leur abonnement.

## Validation multi-perspectives

* Activé : 19 février 2020

Nous commençons à gérer un [journal de transparence des certificats](/docs/ct-logs).

## Journal de transparence des certificats

* Activé : 15 mai 2019

Nous exploitons maintenant un [journal de transparence des certificats](/docs/ct-logs).

## TLS ALPN Challenge Support

* Activé : 12 juillet 2018

Nous avons spécifié et mis en œuvre un outil pour [remplacer](https://tools.ietf.org/html/rfc8737) la méthode de validation TLS-SNI, qui a été [abandonnée pour des raisons de sécurité](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). L'introduction d'un outil de remplacement était importante pour les abonnés qui ne veulent utiliser le port 443 que pour la validation.

## Certificats Wildcard

* Activé : 13 mars 2018

## ACME v2 API

* Activé : 13 mars 2018

## Support complet de l'IPv6

* Activé : 26 juillet 2016
