---
title: Mises à jour du protocol ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

Le [protocole ACME](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) standardisé à l'IETF, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), est la pierre angulaire de la manière dont Let's Encrypt fonctionne.

# Points d'entré de l'API

Nous avons actuellement les points d'entré d'API suivants. Veuillez consulter [notre documentation sur les divergences](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) pour comparer leur implémentation aux spécifications ACME.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Bac à sable] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (obsolète)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Bac à sable] `https://acme-staging-v02.api.letsencrypt.org/directory`

# Nouvelles fonctionnalités ACME rétro-compatibles

De temps en temps, Let's Encrypt peut implémenter de nouvelles fonctionnalités compatibles avec les versions antérieures des API existantes. Généralement, de nouvelles fonctionnalités rétrocompatibles sont introduites car nous avons décidé d'implémenter une partie de la spécification ACME que nous n'avions pas implémentée auparavant.

Lorsque de nouvelles fonctionnalités seront introduites dans les API existantes, les fonctionnalités seront toujours clairement spécifiées dans une spécification publique ACME et ne casseront pas les clients correctement implémentés.

# Nouvelles versions d'ACME avec des changements non rétro-compatibles

Nous n'avons pas l'intention de modifier notre support ACME, mais si nous pensons qu'il est important de le faire, nous nous efforcerons de permettre une transition en douceur au fil du temps et de communiquer aussi à l'avance que possible. Les administrateurs système devraient maintenir la possibilité de déployer des mises à jour de leurs clients ACME si un changement est nécessaire.
