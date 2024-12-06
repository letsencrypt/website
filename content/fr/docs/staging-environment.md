---
title: Environnement de pré-production
slug: staging-environment
date: 2018-01-05
lastmod: 2024-06-11
show_lastmod: 1
---


Nous recommandons vivement de procéder à des tests dans notre environnement de pré-production avant d'utiliser notre environnement de production. Cela vous permettra de faire les choses correctement avant d'émettre des certificats de confiance et de réduire le risque de vous heurter à des limites d'utilisation.

L'URL d'ACME pour notre [environnement de préproduction d'ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) est :

`https://acme-staging-v02.api.letsencrypt.org/directory`

Si vous utilisez Certbot, vous pouvez utiliser notre environnement de pré-production avec l'option `--test-cert` ou `--dry-run`. Pour les autres clients d'ACME, veuillez lire leurs instructions pour obtenir des informations sur les tests avec notre environnement de pré-production.

# Limites d'utilisation

L'environnement de pré-production utilise les mêmes limites d'utilisation que celles [décrites pour l'environnement de production](/docs/rate-limits) avec les exceptions suivantes :

* La limite de **certificats par domaine enregistré** est de 30 000 par semaine.
* La limite de **duplicata de certificat** est de 30 000 par semaine.
* La limite d'**échec de validation** est de 60 par heure.
* La limite de **comptes par adresse IP** est de 50 comptes par période de 3 heures par IP.
* Pour ACME v2, la limite des **nouvelles demandes** est de 1 500 nouvelles demandes par période de 3 heures par compte.

# Hiérarchie des certificats de préproduction

L'environnement de préproduction possède une hiérarchie de certificats qui [imite la production](/certificates). Les noms ont été modifiés par l'ajout du préfixe (STAGING) et d'un nom unique afin de les distinguer clairement de leurs homologues de production.

## AC racine

L'environnement de préproduction comporte deux certificats racine actifs qui sont **absents** des magasins de confiance des navigateurs/clients : « (STAGING) Pretend Pear X1 » et “(STAGING) Bogus Broccoli X2”.

Si vous souhaitez modifier un client test uniquement pour qu'il fasse confiance à l'environnement de préproduction à des fins de test, vous pouvez le faire en ajoutant ses certificats magasin de confiance de l'environnement de test. **Note importante:** N'ajoutez pas la racine ou l'intermédiaire de préproduction à un magasin de confiance que vous utilisez pour la navigation ordinaire ou d'autres activités, car ils ne sont pas audités ou soumis aux mêmes normes que nos racines de production, et ne sont donc pas sûrs à utiliser pour autre chose que des tests.

* **Pretend Pear X1**
  * Objet : `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Type de clé : `RSA 4096`
  * Détails du certificat : [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
* **Bogus Broccoli X2**
  * Objet : `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Type de clé : `ECDSA P-384`
  * Détails du certificat (auto-signé) : [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Détails du certificat (signé par Pretend Pear X1) : [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)

## AC subalternes (intermédiaires)

L'environnement de préproduction dispose de certificats intermédiaires qui imitent la production, émis à partir des racines non fiables décrites ci-dessus. Comme dans le cas de la production, tous ne sont pas utilisés à tout moment. La liste complète des intermédiaires actuels est la suivante :

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14

Ces intermédiaires sont susceptibles d'être modifiés à tout moment et ne doivent pas faire l'objet d'une quelconque confiance de la part d'un système. En général, on peut s'attendre à ce que les intermédiaires de préproduction soient comparables aux intermédiaires de production (de confiance) correspondants. Si cela est strictement nécessaire, vous pouvez obtenir tous les détails du certificat [ici](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Transparence des Certificats

L'environnement de préproduction soumet des pré-certificats aux journaux de test CT de Let's Encrypt [Sapling](/docs/ct-logs) et Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) et inclut les SCT retournés dans les certificats émis.

# Intégration continue / Test de développement

L'environnement de pré-production a des limites d'utilisation généreuses pour permettre les tests, mais il n'est pas très adapté à l'intégration avec des environnements de développement ou à intégration continue (IC). Faire des requêtes réseau vers des serveurs externes peut introduire de l'instabilité et l'environnement de pré-production n'offre aucun moyen de "falsifier" le DNS ou de contester le succès de la validation, ce qui rend les configurations de test plus compliquées.

En plus de l'environnement de pré-production, Let's Encrypt propose un petit serveur ACME conçu pour les environnements de CI et de développement appelé [Pebble](https://github.com/letsencrypt/pebble). Faire tourner Pebble sur votre machine de développement ou dans un environnement CI est [rapide et facile](https://github.com/letsencrypt/pebble#docker).
