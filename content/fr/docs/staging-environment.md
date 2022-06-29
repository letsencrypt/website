---
title: Environment de qualification
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2020-01-21
show_lastmod: 1
---


Nous vous recommandons vivement d'effectuer des tests sur notre environnement de qualification avant d'utiliser notre environnement de production. Cela vous permettra de faire les choses correctement avant d'émettre des certificats de confiance et de réduire les risques de vous heurter à des limites d'utilisation.

L'URL  pour notre [environment de qualification ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) est:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Si vous utilisez Certbot, vous pouvez utiliser notre environnement de qualification avec l'option `--dry-run`. Pour d'autre clients ACME, veuillez lire leurs instructions pour plus d'information concernant la réalistion de tests sur notre environement de qualification.

Veuillez noter que l'environement de qualification V2 nécessite un client compatible ACME v2.

# Limites d'utilisation

L' environnement de qualification utilise les mêmes limites d'usage que ceux [décris pour l'environnement de production](/docs/rate-limits) avec les exceptions suivantes :

*  **Certificate par domain Enregistré** la limite est de 30,000 par semaine.
*  **Certificate Dupliqué** la limite est de 30,000 par semaine.
*  **Echec de validations** la limite est de 60 par heure.
*  **Comptes par adresse IP** la limite est de 50 comptes par periode de 3 heure par adresse IP.
* Pour ACME v2, la limite de **Nouveaux ordres** est de 1,500 nouveaux ordres par période de 3 heures par compte.

# Certificat racine

The staging environment intermediate certificate (["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem)) is issued by a root certificate **not present** in browser/client trust stores. If you wish to modify a test-only client to trust the staging environment for testing purposes you can do so by adding the ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) certificate to your testing trust store. Important: Do not add the staging root or intermediate to a trust store that you use for ordinary browsing or other activities, since they are not audited or held to the same standards as our production roots, and so are not safe to use for anything other than testing.

# Transparence des Certificats

L'environnement de qualification envoie des précertificats au serveur Let's Encrypt [Testflume](/docs/ct-logs) et aux journaux de CT de Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) et inclus les SCT dans les certificats émis.

# Intégration continue / Tests en cours développement

L'environnement de qualification dispose d'une généreuse  limite d'usage qui permet de réaliser des tests, mais il ne convient pas parfaitement à l'intégration avec des environnements de développement ou à une intégration continue (CI). Faire des requêtes réseau vers des serveurs externes peut introduire de l'instabilité et l'environnement de qualification n'offre aucun moyen de "simuler" le DNS et la réussite des défis, ce qui rend les configurations de test plus compliquées.

En plus de l'environnement de qualification, Let's Encrypt propose un petit serveur ACME conçu pour les environnements d'intégration continue (CI) et de  développement qui s'appelle [Pebble](https://github.com/letsencrypt/pebble). Exécuter Pebble sur votre machine de développement ou dans un environnement de CI est [rapide et facile](https://github.com/letsencrypt/pebble#docker).
