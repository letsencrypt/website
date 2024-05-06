---
title: Tulevat ominaisuudet
slug: upcoming-features
lastmod: 2021-09-16
show_lastmod: 1
---

## ACME:n uusimista koskevat tiedot (ARI)

Työskentelemme sellaisen järjestelmän parissa, jonka avulla voimme ilmoittaa tilaajille API:n kautta, kun heidän on uusittava. Tämän järjestelmän avulla voimme viestittää tilaajille, että heidän on uusittava ennen esimerkiksi peruutustapahtumaa.

## ECDSA:n juuri ja välitoimittajat

Myönnämme tuotanto-ECDSA-välitoimittajiltamme varmenteita [sallituille tileille](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). Ei ole mitään suunniteltua päivämäärää sallittujen listojen poistamiseksi.

# Valmistuneet ominaisuudet

## Usean Perspektiivin Validointi

* Otettu käyttöön: 19.2.2020

Vahvistamme nyt toimialueen hallinnan [useista verkon näkökulmista](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Varmenteen läpinäkyvyysloki

* Otettu käyttöön: 15.5.2019

Käytössämme on nyt [Varmenteen läpinäkyvyysloki](/docs/ct-logs).

## TLS ALPN -haastetuki

* Otettu käyttöön: 12.7.2018

Olemme määrittäneet ja toteuttaneet [korvaavan](https://tools.ietf.org/html/rfc8737) TLS-SNI-vahvistusmenetelmän, joka oli [keskeytetty turvallisuussyistä](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Korvaavan osan käyttöönotto oli tärkeää tilaajille, jotka haluavat käyttää vain porttia 443 vahvistukseen.

## Jokerimerkkivarmenteet

* Otettu käyttöön: 13.3.2018

## ACME v2 API

* Otettu käyttöön: 13.3.2018

## Täysi IPv6-tuki

* Otettu käyttöön: 26.7.2016
