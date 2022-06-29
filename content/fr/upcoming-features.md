---
title: Fonctionnalités à venir
slug: upcoming-features
top_graphic: 1
lastmod: 2020-02-20
show_lastmod: 1
---


## Adresses IP dans les certificats

Nous prévoyons de prendre en charge la validation et l'inclusion d'adresses IP dans les certificats.

## ECDSA Racine et Intermédiaires

Actuellement, Let's Encrypt signe les certificats d'entité finale uniquement avec des intermédiaires RSA. Let's Encrypt génèrera une racine ECDSA et des intermédiaires qui peuvent être utilisés pour signer les certificats d'entité finale.

# Fonctionnalités terminées

## Validation multi-points géographiques (Multi-Perspective Validation)

* Activé : 19 Février 2020

Désormais nous validons les noms de domaines via des [points réseaux géographiques multiples](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Journal de Transparence des Certificats (CT log)

* Activé : 15 mai 2019

Nous commençons à gérer un [journal de transparence des certificats](/docs/ct-logs).

## Support du challenge TLS ALPN

* Activé : 12 juillet 2018

Nous avons spécifié et mis en œuvre un [remplacement](https://tools.ietf.org/html/rfc8737) pour la méthode de validation TLS-SNI, qui a été [abandonnée pour des raisons de sécurité](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). L'introduction d'un remplacement de TLS-SNI était importante pour les souscripteurs qui souhaitaient uniquement utiliser le port 443 pour la validation.

### Intégrer les reçus SCT dans les certificats

* Activé : 29 mars 2018

## Certificats génériques (wildcard)

* Activé: 13 mars 2018

## API ACME v2

* Activé : 13 mars 2018

## Support IDN

* Activé : 20 octobre 2016

Let's Encrypt prend désormais en charge l'émission de certificats pour les noms de domaine internationalisés (IDN).

## Support complet d'IPv6

* Activé: 26 juillet 2016

Initialement, seules certaines parties de l'infrastructure de API Let's Encrypt pouvaient communiquer via IPv6. Cela a empêché les systèmes qui utilisent uniquement IPv6 d'interagir pleinement avec Let's Encrypt. Cela a été résolu - La prise en charge d'IPv6 a été activée pour toutes les fonctionnalités.

## Compatibilité des certificats avec Windows XP

* Activé : 25 mars 2016

Résolution d'un problème avec notre chaîne de certificats qui empêchait les certificats Let's Encrypt d'être acceptés par les navigateurs sous Windows XP.

## Support des signatures ECDSA

* Activé : 10 février 2016

Ajout de la possibilité pour Let's Encrypt de signer les clés ECDSA avec les intermédiaires RSA de Let's Encrypt. La prise en charge de la signature des clés ECDSA avec une chaîne de certificats ECDSA complète sera ajoutée plus tard.

## Support du Challenge DNS ACME

* Activé : 20 janvier 2016

Let's Encrypt permet la validation via les enregistrements DNS tels que définis dans la spécification ACME.
