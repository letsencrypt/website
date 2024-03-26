---
title: Environnement de pré-production
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2022-06-13
show_lastmod: 1
---


Nous recommandons vivement de procéder à des tests dans notre environnement de pré-production avant d'utiliser notre environnement de production. Cela vous permettra de faire les choses correctement avant d'émettre des certificats de confiance et de réduire le risque de vous heurter à des limites de taux.

L'URL d'ACME pour notre [environnement de pré-production d'ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) est :

`https://acme-staging-v02.api.letsencrypt.org/directory`

Si vous utilisez Certbot, vous pouvez utiliser notre environnement de préproduction avec le flag `--test-cert`. Pour les autres clients d'ACME, veuillez lire leurs instructions pour obtenir des informations sur les tests avec notre environnement pré-production. Veuillez noter que l'environnement de pré-production v2 nécessite un client ACME compatible v2.

# Limites d'utilisation

L'environnement de pré-production utilise les mêmes limites d'utilisation que celles [décrites pour l'environnement de production](/docs/rate-limits) avec les exceptions suivantes :

* La limite de **certificats par domaine enregistré** est de 30 000 par semaine.
* La limite de **duplicata de certificat** est de 30 000 par semaine.
* La limite d'**échec de validation** est de 60 par heure.
* La limite de **comptes par adresse IP** est de 50 comptes par période de 3 heures par IP.
* Pour ACME v2, la limite des **nouvelles demandes** est de 1 500 nouvelles demandes par période de 3 heures par compte.

# Hiérarchie des certificats de préproduction

L'environnement de préproduction possède une hiérarchie de certificats qui [imite la production](/certificates).

## Certificats intermédiaires

L'environnement de préproduction a deux certificats intermédiaires actifs : un intermédiaire RSA ["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) et un intermédiaire ECDSA ["(STAGING) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

L'émission ECDSA a été [activée dans Staging](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) le 24 mars 2021 et toutes les demandes de certificats Staging avec des clés ECDSA sont signées par "(STAGING) Ersatz Edamame E1" et utilisent la hiérarchie ECDSA. De même, toutes les demandes de certificats de préproduction avec des clés RSA sont signées par "(STAGING) Artificial Apricot R3" et utilisent la hiérarchie RSA. Il n'y a aucun moyen d'obtenir un certificat signé par RSA pour une clé ECDSA, ni vice versa ; le seul moyen de contrôler l'émetteur est de contrôler le type de clé que vous générez localement.

## Certificats racine

L'environnement de préproduction a deux certificats racine actifs qui sont **non présents** dans les magasins de confiance des navigateurs/clients : "(STAGING) Pretend Pear X1" et "(STAGING) Bogus Broccoli X2". Si vous souhaitez modifier un client de test uniquement pour qu'il fasse confiance à l'environnement de préproduction à des fins de test, vous pouvez le faire en ajoutant le certificat ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) et/ou ["(STAGING) Bogus Broccoli X2"](/certs/staging/letsencrypt-stg-root-x2.pem) à votre magasin de certificats. Vous pouvez trouver tous nos certificats de préproduction [ici](https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Important : N'ajoutez pas le certificat racine ou intermédiaire de pré-production à un magasin de confiance que vous utilisez pour la navigation ordinaire ou d'autres activités, car ils ne sont pas audités ou tenus aux mêmes normes que nos certificats racines de production, et ne sont donc pas sûrs à utiliser pour autre chose que des tests.

# Transparence des Certificats

L'environnement de préproduction soumet des pré-certificats aux journaux de test CT de Let's Encrypt [Sapling](/docs/ct-logs) et Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) et inclut les SCT retournés dans les certificats émis.

# Intégration continue / Test de développement

L'environnement de pré-production a des limites d'utilisation généreuses pour permettre les tests, mais il n'est pas très adapté à l'intégration avec des environnements de développement ou à intégration continue (IC). Faire des requêtes réseau vers des serveurs externes peut introduire de l'instabilité et l'environnement de pré-production n'offre aucun moyen de "falsifier" le DNS ou de contester le succès de la validation, ce qui rend les configurations de test plus compliquées.

En plus de l'environnement de pré-production, Let's Encrypt propose un petit serveur ACME conçu pour les environnements de CI et de développement appelé [Pebble](https://github.com/letsencrypt/pebble). Faire tourner Pebble sur votre machine de développement ou dans un environnement CI est [rapide et facile](https://github.com/letsencrypt/pebble#docker).
