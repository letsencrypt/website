---
title: Fonctionnalités à venir
slug: upcoming-features
top_graphic: 1
lastmod: 2018-12-31
---

## Certificate Transparency Log

* Prévu: T1 2019

Nous prévoyons de gérer un [certificate transparency log](http://www.certificate-transparency.org/how-ct-works).

## Validation multi - points de vue
 
* Prévu: T2 2019
 
Actuellement, Let's Encrypt valide d'un point de vue unique du réseau. Nous prévoyons de commencer à valider à partir de plusieurs points de vue du réseau.

## ECDSA Racine et Intermédiaires

* Prévu : T3 2019

Actuellement, Let's Encrypt ne signe que les certificats d'entité finale avec des intermédiaires RSA. Let's Encrypt génèrera une racine ECDSA et des intermédiaires qui peuvent être utilisés pour signer les certificats d'entité finale.

# Fonctionnalités terminées

## Support du challenge TLS ALPN

* Activé : 12 juillet 2018

Nous avons spécifié et mis en œuvre un [remplacement](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/) pour la méthode de validation TLS-SNI, qui a été abandonnée pour des [raisons de sécurité](https://community.letsencrypt.org/t/important-what-you-need-ne-know-about-tls-sni-validation-issues/50811). L'introduction d'un remplacement de TLS-SNI était importante pour les abonnés qui souhaitaient uniquement utiliser le port 443 pour la validation.

## Intégrer les reçus SCT dans les certificats

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
