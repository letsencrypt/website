---
title: Mises à jour du protocol ACME
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---


Le protocole ACME [normalisé par l'IETF](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html), [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), est la pierre angulaire du fonctionnement de Let's Encrypt.

# Points d'entré de l'API

Nous disposons actuellement des points de terminaison API suivants. Veuillez consulter [notre documentation sur les différences](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) pour comparer leur mise en œuvre à la spécification ACME.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Bac à sable] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (obsolète)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Bac à sable] `https://acme-staging-v02.api.letsencrypt.org/directory`

# Nouvelles fonctionnalités ACME rétro-compatibles

De temps à autre, Let's Encrypt peut mettre en œuvre de nouvelles fonctionnalités rétrocompatibles pour les points de terminaison API existants. En général, les nouvelles fonctionnalités rétrocompatibles sont introduites parce que nous avons décidé d'implémenter une partie de la spécification ACME que nous n'avions pas implémentée auparavant.

Lorsque de nouvelles fonctionnalités sont introduites dans des points de terminaison d'API existants, elles seront toujours clairement spécifiées dans une spécification ACME publique et ne perturberont pas les clients correctement implémentés.

# Nouvelles versions d'ACME avec des modifications importantes

Nous ne prévoyons pas d'apporter des changements radicaux à notre support ACME, mais si nous estimons qu'il est important de le faire, nous nous efforcerons d'assurer une transition en douceur sur une période suffisante et nous communiquerons le plus longtemps possible à l'avance. Les administrateurs système doivent maintenir la capacité de déployer des mises à jour en temps utile à leurs clients ACME dans le cas où une modification importante est nécessaire.
