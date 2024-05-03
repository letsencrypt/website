---
title: ACME ažuriranja protokola
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---

[IETF-standardized](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME protokol, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), predstavlja prekretnicu u tome kako Let's Encrypt funkcioniše.

# Krajnje tačke API-a

Trenutno raspolažemo sa sledećim API okruženjem. Molimo Vas da pogledate [našu dokumentaciju o razlikama](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) kako bi ste bili u mogućnosti da izvršite poređenje implementacije u skladu sa ACME specifikacijom.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Zastarelo)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Nove mogućnosti ACME-a kompatibilne sa prethodnim verzijama

S vremena na vreme Let's Encrypt može implementirati nove funkcionalnosti koje će funkcionisati i biti podržane i u nekim od starijih verzija već postojećih API okruženja. Obično takve funkcionalnosti sa podrškom za prethodne verzije su uvedene u slučajevima kada odlučimo da implementiramo neku funkcionalnost u ACME-u koju nismo implementirali ranije.

Kada je nova funkcionalnost objavljena za već postojeći API, ta funkcionalnost biće jasno navedena u našoj javnoj ACME specifikaciji i neće ugroziti rad pravilno implementiranih klijenata.

# Nove verzije ACME-a sa velikim izmenama

Trenutno ne planiramo da uvodimo velike izmene u našoj ACME podršci, ali ukoliko osetimo da je to neophodno da se uradi mi ćemo raditi na tome da obezbedimo laku tranziciju sa dovoljno vremena kao i da o tome komuniciramo unapred u najranijem mogućem roku. Sistem administratori trebaju da održavaju i obezbede mogućnosti da se ažuriranja njihovih ACME klijenata mogu uraditi neometano i na vreme u slučajevima kada je to neophodno.
