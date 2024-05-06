---
title: Kommande funktioner
slug: upcoming-features
lastmod: 2020-02-20
show_lastmod: 1
---


## IP-adresser i certifikat

Vi planerar införa stöd för att validera och inkludera IP-adresser i
certifikat.

## ECDSA-rot- och mellancertifikat

För tillfället signerar Let's Encrypt bara lövcertifikat med
RSA-mellancertifikat. Let's Encrypt kommer att generera en ECDSA-rot och
mellancertifikat som kan användas för att signera lövcertifikat.

# Klara funktioner

## Flerperspektivsvalidering

* Aktiverat: den 19 februari 2020

Nu validerar vi kontroll över en domän från [flera nätverksperspektiv
(engelska)](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certifikattransparenslogg

* Aktiverat: den 15 maj 2019

Vi driftar en [certifikattransparenslogg](/docs/ct-logs).

## Stöd för TLS ALPN-utmaningar

* Aktiverat: den 12 juli 2018

Vi har specificerat och implementerat en
[ersättare](https://tools.ietf.org/html/rfc8737) till
TLS-SNI-valideringsmetoden som [stängdes ner av
säkerhetsskäl](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811).
Att introducera en ersättare var viktigt för prenumeranter som bara vill
använda port 443 för validering.

## Inbakning av SCT-kvitton i certifikat

* Aktiverat: den 29 mars 2018

## Wildcard-certifikat

* Aktiverat: den 13 mars 2018

## ACME v2-API

* Aktiverat: den 13 mars 2018

## IDN-stöd

* Aktiverat: den 20 oktober 2016

Let's Encrypt stöder nu utfärdande av certifikat för internationaliserade
domännamn (IDN).

## Fullt IPv6-stöd

* Aktiverat: den 26 juli 2016

Från början kunde bara delar av Let's Encrypts API-infrastruktur kommunicera
över IPv6. Detta hindrade system med bara IPv6 från att fullt ut interagera med
Let's Encrypt. Detta har nu lösts. Nu har IPv6-stöd aktiverats för att
funktionalitet.

## Certifikatkompabilitet i Windows XP

* Aktiverat: den 25 mars 2016

Löste ett problem med vår certifikatkedja som hindrade Let's Encrypt-certifikat
att accepteras av webbläsare i Windows XP.

## Stöd för signering av ECDSA-nycklar

* Aktiverat: den 10 februari 2016

Lade till stöd för Let's Encrypt att signera ECDSA-nycklar med Let's Encrypts
RSA-mellancertifikat. Stöd för att signera ECDSA-nycklar med en komplett
ECDSA-certifikatkedja kommer läggas till senare.

## Stöd för ACME DNS-utmaningar

* Aktiverat: den 20 januari 2016

Let's Encrypt tillåter validering via DNS-poster enligt definitionen i
ACME-specifikationen.
