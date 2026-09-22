---
title: Environnement de pré-production
slug: staging-environment
lastmod: 2026-04-10
show_lastmod: 1
---


Nous recommandons vivement de procéder à des tests dans notre environnement de pré-production avant d'utiliser notre environnement de production. Cela vous permettra de faire les choses correctement avant d'émettre des certificats de confiance et de réduire le risque de vous heurter à des limites d'utilisation.

L'URL d'ACME pour notre [environnement de préproduction d'ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) est :

`https://acme-staging-v02.api.letsencrypt.org/directory`

Si vous utilisez [Certbot](https://certbot.eff.org/), vous pouvez utiliser notre environnement de pré-production avec l'option `--test-cert` ou `--dry-run`. Pour les autres clients d'ACME, veuillez lire leurs instructions pour obtenir des informations sur les tests avec notre environnement de pré-production.

Notez que les comptes ACME sont limités à chaque environnement, et donc un compte séparé pour l'environnement de test est requis. Certbot gère ceci pour vous.

# Limites d'utilisation

L'environnement de test utilise les mêmes limites d'utilisation que celles [décrites pour l'environnement de production](/docs/rate-limits), mais avec différentes valeurs :

* La limite de **[Nouvelles Inscriptions par Adresse IP](/docs/rate-limits/#new-registrations-per-ip-address)** est de 50 par 3 heures.
* La limite de **[Nouvelles Inscriptions par Plage d'IPv6](/docs/rate-limits/#new-registrations-per-ipv6-range)** est de 500 par 3 heures (identique à la production).
* La limite de **[Nouvelles Commandes par Compte](/docs/rate-limits/#new-orders-per-account)** est de 1500 par 3 heures.
* La limite de **[Nouveaux Certificats par Domaine Enregistré](/docs/rate-limits/#new-certificates-per-registered-domain)** est de 30000 par seconde.
* La limite de **[Nouveaux Certificats par Ensemble Exact d'Identifiants](/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers)** est de 30000 par semaine.
* La limite d'**[Échecs d'Autorisation par Identifiant par Compte](/docs/rate-limits/#authorization-failures-per-identifier-per-account)** est de 200 par heure.
* La limite d'**[Échecs Consécutifs d'Autorisation par Identifiant par Compte](/docs/rate-limits/#consecutive-authorization-failures-per-identifier-per-account)** est de 3600 par 6 heures.

Les [Limites Générales de Requêtes](/docs/rate-limits/#overall-requests-limit) sont :

| Point de terminaison | Requête par IP (par seconde) | Capacité de pic |
| -------------------- | ---------------------------- | --------------- |
| /acme/new-nonce      | 20                           | 10              |
| /acme/new-account    | 5                            | 15              |
| /acme/new-order      | 20                           | 40              |
| /acme/revoke-cert    | 10                           | 100             |
| /acme/renewal-info   | 1000                         | 100             |
| /acme/*              | 20                           | 20              |
| /directory           | 40                           | 40              |

# Hiérarchie des certificats de préproduction

L'environnement de préproduction possède une hiérarchie de certificats qui [imite la production](/certificates). Les noms ont été modifiés par l'ajout du préfixe (STAGING) et d'un nom unique afin de les distinguer clairement de leurs homologues de production.

## AC racine

L'environnement de test à quatre certificats racine actifs qui ne sont **pas présents** dans les magasins de certificats de confiance des navigateurs / clients : "(STAGING) Pretend Pear X1", "(STAGING) Bogus Broccoli X2", "(STAGING) Yearning Yucca Root YE", et "(STAGING) Yonder Yam Root YR".

Si vous souhaitez modifier un client test uniquement pour qu'il fasse confiance à l'environnement de préproduction à des fins de test, vous pouvez le faire en ajoutant ses certificats magasin de confiance de l'environnement de test. **Note importante:** N'ajoutez pas la racine ou l'intermédiaire de préproduction à un magasin de confiance que vous utilisez pour la navigation ordinaire ou d'autres activités, car ils ne sont pas audités ou soumis aux mêmes normes que nos racines de production, et ne sont donc pas sûrs à utiliser pour autre chose que des tests.

* **Pretend Pear X1**
  * Objet : `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Type de clé : `RSA 4096`
  * Détails du certificat : [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
  * Test de sites web : [valide](https://valid.x1.staging-test-certs.letsencrypt.org/), [révoqué](https://revoked.x1.staging-test-certs.letsencrypt.org/), [expiré](https://expired.x1.staging-test-certs.letsencrypt.org/)
* **Bogus Broccoli X2**
  * Objet : `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Type de clé : `ECDSA P-384`
  * Détails du certificat (auto-signé) : [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Détails du certificat (signé par Pretend Pear X1) : [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)
  * Test de sites web : [valide](https://valid.x2.staging-test-certs.letsencrypt.org/), [révoqué](https://revoked.x2.staging-test-certs.letsencrypt.org/), [expiré](https://expired.x2.staging-test-certs.letsencrypt.org/)
* **Yearning Yucca Root YE**
  * Sujet : `O = ISRG, CN = (STAGING) Yearning Yucca Root YE`
  * Type de clé : `ECDSA P-384`
  * Détails du certificat (autosigné) : [der](/certs/staging/gen-y/root-ye.der), [pem](/certs/staging/gen-y/root-ye.pem), [txt](/certs/staging/gen-y/root-ye.txt)
  * Détails du certificat (signé croisé par Bogus Broccoli X2) : [der](/certs/staging/gen-y/root-ye-by-x2.der), [pem](/certs/staging/gen-y/root-ye-by-x2.pem), [txt](/certs/staging/gen-y/root-ye-by-x2.txt)
  * Test de sites web : [valide](https://valid.ye.staging-test-certs.letsencrypt.org/), [révoqué](https://revoked.ye.staging-test-certs.letsencrypt.org/), [expiré](https://expired.ye.staging-test-certs.letsencrypt.org/)
* **Yonder Yam Root YR**
  * Sujet : `O = ISRG, CN = (STAGING) Yonder Yam Root YR`
  * Type de clé : `RSA 4096`
  * Détails du certificat (autosigné) : [der](/certs/staging/gen-y/root-yr.der), [pem](/certs/staging/gen-y/root-yr.pem), [txt](/certs/staging/gen-y/root-yr.txt)
  * Détails du certificat (signé croisé par Pretend Pear X1) : [der](/certs/staging/gen-y/root-yr-by-x1.der), [pem](/certs/staging/gen-y/root-yr-by-x1.pem), [txt](/certs/staging/gen-y/root-yr-by-x1.txt)
  * Test de sites web : [valide](https://valid.yr.staging-test-certs.letsencrypt.org/), [révoqué](https://revoked.yr.staging-test-certs.letsencrypt.org/), [expiré](https://expired.yr.staging-test-certs.letsencrypt.org/)

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
* (STAGING) Artificial Amaranth YE1
* (STAGING) Baloney Bulgur YE2
* (STAGING) Cad Corn YE3
* (STAGING) Dastardly Durum YR1
* (STAGING) Ersatz Emmer YR2
* (STAGING) Fake Farro YR3

Ces intermédiaires sont susceptibles d'être modifiés à tout moment et ne doivent pas faire l'objet d'une quelconque confiance de la part d'un système. En général, on peut s'attendre à ce que les intermédiaires de préproduction soient comparables aux intermédiaires de production (de confiance) correspondants. Si cela est strictement nécessaire, vous pouvez obtenir tous les détails du certificat [ici](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Transparence des Certificats

L'environnement de test utilise plusieurs journaux de test TC. Les SCTs de ces journaux sont inclus dans les certificats de test. Cependant, puisque staging est un environnement de test uniquement, les TC ne peuvent pas être utilisées pour observer la fiabilité des certificats de test émis.

Ces journaux incluent les [Journaux de Test](/docs/ct-logs#testing) de Let's Encrypt, ainsi que des journaux de test d'autres opérateurs de Transparence des Certificats.

De plus, certains journaux [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv) peuvent être utilisés qui ne sont pas des journaux réels et ne stockent pas de certificats émis.

# Intégration continue / Test de développement

L'environnement de pré-production a des limites d'utilisation généreuses pour permettre les tests, mais il n'est pas très adapté à l'intégration avec des environnements de développement ou à intégration continue (IC). Faire des requêtes réseau vers des serveurs externes peut introduire de l'instabilité et l'environnement de pré-production n'offre aucun moyen de "falsifier" le DNS ou de contester le succès de la validation, ce qui rend les configurations de test plus compliquées.

En plus de l'environnement de pré-production, Let's Encrypt propose un petit serveur ACME conçu pour les environnements de CI et de développement appelé [Pebble](https://github.com/letsencrypt/pebble). Faire tourner Pebble sur votre machine de développement ou dans un environnement CI est [rapide et facile](https://github.com/letsencrypt/pebble#docker).
