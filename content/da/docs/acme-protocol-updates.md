---
title: ACME Protokol Opdateringer
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

Den [IETF-standardiserede](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME-protokol, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), er hjørnestenen i hvordan Let's Encrypt fungerer.

# API Endpoints

Vi har i øjeblikket følgende API-endepunkter. Se venligst [vores dokumentation af forskelle](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) for at sammenligne deres implementering med ACME-specifikationen.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-v02.api.letsencrypt.org/directory`

## ACME v1 (forældet)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Nye Bagud-Kompatible ACME-Funktioner

Fra tid til anden Let's Encrypt kan implementere nye bagud-kompatible funktioner til eksisterende API endepunkter. Typisk introduceres nye bagud-kompatible funktioner, fordi vi har besluttet at implementere en del af ACME-spec som vi ikke tidligere havde implementeret.

Når nye funktioner introduceres til eksisterende API endpoints, vil funktionerne altid være klart specificeret i en offentlig ACME-specifikation og vil ikke bryde korrekt implementerede klienter.

# Nye versioner af ACME med "Breaking Changes"

Vi har ikke planer om at ændre vores ACME-understøttelse, men hvis vi føler, det er vigtigt at gøre det, vi vil arbejde for at give mulighed for en jævn overgang over tilstrækkelig tid og kommunikere så langt på forhånd som muligt. Systemadministratorer bør opretholde evnen til at implementere rettidige opdateringer til deres ACME-klienter i tilfælde af, at en ændring er nødvendig.
