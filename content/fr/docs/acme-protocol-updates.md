---
title: Mise à jour du protocole ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
---

{{< lastmod >}}

Le [standard IETF](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) du protocole ACME, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), est la pierre angulaire du fonctionnement de Let's Encrypt.

# Terminaisons API

Nous avons, à ce jour, les points de terminaisons API (Application Programming Interface) suivants. Veuillez consulter [notre documentation sur les  divergences](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) afin de comparer leur implémentation par rapport à la spécification ACME.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Qualification] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Obsolète)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Qualification] `https://acme-staging.api.letsencrypt.org/directory`

# Nouvelles fonctionnalités ACME rétro-compatibles

De temps en temps Let's Encrypt peut développer de nouvelles fonctions rétro-compatibles pour ses API. Typiquement de telles fonctions sont introduites car nous avons décidé d'implémenter une partie des specifications ACME qui n'ont encore jamais été implémententées.

Lorsque de telles fonctionnalités dont ajoutées à des API existantes, les fonctionnalitées seront toujours clairement indiquées dans les spécifications de l'ACME et n'auront aucun impact négatif sur des clients ACME correctement mis en oeuvre.

# Nouvelles versions d'ACME avec de profondes modifications

Nous ne prévoyons pas d'apporter des modifications profondes de notre implémentation d'ACME, mais si nous estimons qu'il est important de le faire, alors nous travaillerions à une évolution en douceur, dans un délai sufisant et en anticipant au maximum la communication sur ce sujet. Les administrateurs système doivent maintenir une capacité à déployer rapidement des mises à jour sur leurs clients ACME dans le cas où des modifications profondes seraient nécéssaires.

