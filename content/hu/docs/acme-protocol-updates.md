---
title: ACME protokoll frissítések
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---

A Let's Encrypt működésének alapköve a [IETF-szabványosított](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME protokoll, az [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/).

# API endpointok

Jelenleg a következő API endpointokkal rendelkezünk. Kérjük, tekintse meg [a különbözőségekről szóló dokumentációt](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), hogy összehasonlítsa a megvalósításukat az ACME specifikációval.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Deprecated)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Új, visszafelé kompatibilis ACME funkciók

A Let's Encrypt időről időre új, visszafelé kompatibilis funkciókat vezethet be a meglévő API endpointokhoz. Általában azért vezetünk be új, visszafelé kompatibilis funkciókat, hogy az ACME specifikáció egy olyan részét implementáljuk, amelyet korábban nem valósítottunk meg.

Amikor új funkciókat vezetnek be a meglévő API endpointokhoz, a funkciókat mindig egyértelműen meghatározzák egy nyilvános ACME specifikációban, és nem törik el vele a megfelelően implementált klienseket.

# Új ACME verziók, töréssel járó változtatásokkal

Nem tervezünk töréssel járó változásokat az ACME támogatásunkban, de ha úgy érezzük, hogy mégis fontos megtenni, akkor azon dolgozunk, hogy elegendő idővel zökkenőmentes átmenetet tegyünk lehetővé, és a lehető legkorábban erről tájékoztassuk Önt. A rendszergazdáknak képesnek kell lenniük arra, a frissítéseket időben telepítsék az ACME klienseikre abban az esetben, ha töréssel járó változtatásra van szükség.
