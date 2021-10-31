---
title: Recherche d'ID de compte
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Lorsque vous signalez des problèmes, il peut être utile de fournir votre ID de compte Let's Encrypt. La plupart du temps, le processus de création d'un compte est géré automatiquement par le logiciel client ACME que vous utilisez pour dialoguer avec Let's Encrypt, et vous pouvez avoir plusieurs comptes configurés si vous exécutez des clients ACME sur plusieurs serveurs.

Votre ID de compte est une URL sous la forme suivante
`https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Si vous utilisez Certbot, vous pouvez trouver votre ID de compte en regardant le champ "uri" dans
`/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Si vous utilisez un autre client ACME, les instructions dépendent du client. Vérifiez dans vos journaux de logs les URL du format décrit ci-dessus. Si votre client ACME n'enregistre pas l'ID du compte, vous pouvez toutefois le récupérer en soumettant une nouvelle demande  d'inscription avec la même clé. Voir la [spécification ACME pour plus de 
détails](https://tools.ietf.org/html/rfc8555#section-7.3).
Vous pouvez également trouver la forme numérique de votre ID dans l'en-tête des Boulder-Requester visible dans
la réponse à chaque POST effectué par votre client ACME.
