---
title: Aktualizace protokolu ACME
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---


Protokol ACME standardizovaný organizací [IETF](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html), tedy [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), je základním kamenem fungování služby Let's Encrypt.

# Endpointy API

V současnosti používáme následující endpointy API. Porovnání jejich implementace se specifikací ACME najdete v [dokumentaci odchylek](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md).

## ACME v2 (RFC 8555)

* [Produkce] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (zastaralá verze)

* [Produkce] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Nové zpětně kompatibilní funkce protokolu ACME

Let's Encrypt může čas od času do stávajících endpointů API přidat nové zpětně kompatibilní funkce. Nové zpětně kompatibilní funkce obvykle zavádíme proto, že jsme se rozhodli implementovat část specifikace ACME, kterou jsme dříve nepodporovali.

Nové funkce zaváděné do stávajících endpointů API budou vždy jasně popsány ve veřejné specifikaci ACME a nenaruší správně implementované klienty.

# Nové verze ACME s nekompatibilními změnami

V podpoře ACME neplánujeme provádět nekompatibilní změny. Pokud je však budeme považovat za důležité, zajistíme dostatek času na hladký přechod a budeme o nich informovat s co největším předstihem. Správci systémů by si měli zachovat možnost včas nasazovat aktualizace klientů ACME pro případ, že bude nekompatibilní změna nezbytná.
