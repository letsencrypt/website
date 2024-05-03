---
title: Hamarosan megjelenő funkciók
slug: upcoming-features
lastmod: 2021-09-16
show_lastmod: 1
---

## ACME megújítási információk (ARI)

Jelenleg egy olyan rendszeren dolgozunk, amely lehetővé teszi számunkra, hogy API-n keresztül értesítsük az előfizetőket, ha meg kell újítaniuk a tanúsítványukat. Ez a rendszer lehetővé teszi számunkra, hogy jelezzük az előfizetőknek a megújítás szükségességét, például egy visszavonási esemény előtt.

## ECDSA gyökér (root) és közbenső (intermediate) tanúsítványok

Tanúsítványokat állítunk ki az ECDSA közvetítőnktől az [engedélyezett fiókok](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) számára. Az engedélyezési lista eltávolításának nincs tervezett időpontja.

# Befejezett funkciók

## Multi-Perspective validáció

* Engedélyezve: 2020. február 19.

Mostantól a domain feletti rendelkezést [több hálózati perspektívából](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html) (multiple network perspective) validáljuk.

## Tanúsítvány átláthatósági napló

* Engedélyezve: 2019. május 15.

Mostantól működtetünk egy [tanúsítvány átláthatósági naplót](/docs/ct-logs).

## TLS ALPN Challenge támogatás

* Engedélyezve: 2018. július 12.

Meghatároztuk és megvalósítottuk a TLS-SNI validációs módszer [helyettesítését](https://tools.ietf.org/html/rfc8737), amelyet [biztonsági okokból megszüntettünk](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). A csere bevezetése fontos volt azon előfizetők számára, akik csak a 443-as portot szeretnék használni a validációhoz.

## Wildcard tanúsítványok

* Engedélyezve: 2018. március 13.

## ACME v2 API

* Engedélyezve: 2018. március 13.

## Teljes körű IPv6-támogatás

* Engedélyezve: 2016. július 26.
