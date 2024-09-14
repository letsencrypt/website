---
title: Připravované funkce
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

Oznámení o chystaných změnách naleznete v kategorii [API Announcements](https://community.letsencrypt.org/c/api-announcements/18) na komunitním fóru Let's Encrypt.

# Dokončené funkce

## Kořenové a zprostředkující certifikáty ECDSA

* Spuštěno 6. června 2024

Vydáváme certifikáty od námi vytvořených zprostředkujících ECDSA certifikátů až po leaf certifikáty ECDSA. Podrobnosti o naší hierarchii PKI najdete v dokumentaci [Chains of Trust](/certificates/).

## Informace o obnově ACME (ARI)

* Spuštěno 23. března 2023

Spouštíme [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), systém, který nám umožňuje upozornit předplatitele prostřednictvím API na potřebu obnovy.

## Víceperspektivní ověřování

* Spuštěno 19. února 2020

Nyní ověřujeme řízení domény z [více síťových perspektiv](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Protokol o transparentnosti certifikátu

* Spuštěno 15. května 2019

Nyní provozujeme [Protokol transparentnosti certifikátů](/docs/ct-logs).

## Podpora výzev TLS ALPN

* Spuštěno 12. července 2018

Zadali jsme a implementovali [náhradu](https://tools.ietf.org/html/rfc8737) za metodu ověřování TLS-SNI, která byla [z bezpečnostních důvodů ukončena](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Zavedení náhrady bylo důležité pro odběratele, kteří chtějí používat port 443 pouze pro ověřování.

## Wildcard certifikáty

* Spuštěno 13. března 2018

## ACME v2 API

* Spuštěno 13. března 2018

## Plná podpora IPv6

* Spuštěno 26. července 2016
