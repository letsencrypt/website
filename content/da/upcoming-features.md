---
title: Kommende Funktioner
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

For annonceringer af kommende ændringer, se venligst [API annonceringer](https://community.letsencrypt.org/c/api-announcements/18) kategori på Let's Encrypt community forum.

# Fuldførte Funktioner

## ECDSA Root og intermediates

* Aktiveret: 6 Juni 2024

Vi udsteder certifikater fra vores produktion ECDSA mellemcertifikater til ECDSA-brugercertifikater. Se dokumentationen [Chains of Trust](/certificates/) for alle oplysninger om vores PKI hierarki.

## ACME Fornyelsesinformation (ARI)

* Aktiveret: 23. Maj 2023

Vi kører nu [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), et system, der giver os mulighed for at underrette abonnenter via API, når de skal fornyes.

## Multi-Perspektiv Validering

* Aktiveret: 19. Februar 2020

Vi validerer nu domænekontrol fra [flere netværksperspektiver](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certifikat Gennemsigtighed Log

* Aktiveret: 15. Maj 2019

Vi driver nu en [Certifikat Gennemsigtighed log](/docs/ct-logs).

## TLS ALPN Challenge understøttelse

* Aktiveret: 12. Maj 2018

Vi har specificeret og implementeret en [udskiftning](https://tools.ietf.org/html/rfc8737) af TLS-SNI-valideringsmetoden, som blev [stoppet af sikkerhedsmæssige årsager](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Introduktionen af en erstatning var vigtigt for abonnenter, der kun ønsker at bruge port 443 til validering.

## Wildcard Certifikater

* Aktiveret: 13. Maj 2018

## ACME v2 API

* Aktiveret: 13. Maj 2018

## Fuld IPv6-understøttelse

* Aktiveret: 26. Maj 2016
