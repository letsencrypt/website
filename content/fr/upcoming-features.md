---
title: Fonctionnalités à venir
slug: upcoming-features
top_graphic: 1
lastmod: 2021-09-16
show_lastmod: 1
---

## Informations de renouvellement de l'ACME (ARI)

Nous travaillons sur un système qui nous permettra de notifier les abonnés via une API lorsqu'ils ont besoin de renouveler. Ce système nous permettra de signaler aux abonnés qu'ils ont besoin de renouveler avant, par exemple, un évènement de révocation.

## Certificats Racine et Intermédiaires ECDSA

Nous délivrons des certificats depuis notre ECDSA intermédiaire de protection aux [comptes autorisés](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Il n’y a pas de date planifiée pour supprimer la liste d’autorisation.

# Fonctionnalités achevées

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
