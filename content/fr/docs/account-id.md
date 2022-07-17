---
title: Trouver les identifiants de compte
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Lorsque vous signalez des problèmes, il peut être utile de fournir votre identifiant de compte Let's Encrypt. La plupart du temps, le processus de création de compte est géré automatiquement par le logiciel client ACME que vous utilisez pour communiquer avec Let's Encrypt, et vous pouvez avoir de multiples comptes configurés si vous exécutez des clients ACME sur plusieurs serveurs.

Votre identifiant de compte est une URL de la forme `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Si vous utilisez Certbot, vous pouvez trouver votre ID de compte en regardant le champ "uri" dans `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Si vous utilisez un autre client ACME, les instructions dépendront du client. Vérifiez vos logs pour les URLs de la forme décrite ci-dessus. Si votre client ACME n'enregistre pas l'identifiant du compte, vous pouvez le récupérer en soumettant une nouvelle requête d'enregistrement avec la même clé. Voir la [spécification ACME pour plus de détails](https://tools.ietf.org/html/rfc8555#section-7.3). Vous pouvez également trouver la forme numérique de votre ID dans l'en-tête Boulder-Requester dans la réponse à chaque POST que votre client ACME fait.
