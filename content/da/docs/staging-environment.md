---
title: Stagning Miljø
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2021-05-13
show_lastmod: 1
---


Vi anbefaler stærkt test mod vores staging miljø, før du bruger vores produktionsmiljø. Dette vil give dig mulighed for at få tingene rigtigt, før du udsteder betroede certifikater og reducere chancen for din kører op mod kalds begrænsninger.

ACME-URL'en til vores [ACME v2 staging miljø](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) er:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Hvis du bruger Certbot, kan du bruge vores staging miljø med flaget `--dry-run`. For andre ACME-klienter bedes du læse deres anvisninger for information om test med vores staging miljø. Bemærk venligst, at v2 staging miljøet kræver en v2 kompatibel ACME-klient.

# Grænser For kald

Staging miljøet bruger de samme kaldsbegrænsninger som [beskrevet for produktionsmiljøet](/docs/rate-limits) med følgende undtagelser:

* Grænsen for **Certifikater pr. registreret domæne** er 30.000 pr. uge.
* Grænsen for **Duplikat certifikater** er 30.000 om ugen.
* Grænsen for **Mislykkede Valideringer** er 60 i timen.
* Grænsen for **Konti pr. IP-adresse** er 50 konti pr. 3 timers periode pr. IP.
* For ACME v2 er grænsen på **nye ordrer** 1.500 nye ordrer pr. 3 timers periode pr. konto.

# Staging miljøets Certifikat Hierarki

Staging miljøet har et certifikathierarki, der [efterligner produktion](/certificates).

## Intermediate Certifikater

Staging miljøet har to aktive mellemliggende certifikater: en RSA intermediate ["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) og en ECDSA intermediate ["(STAGING) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

ECDSA-udstedelse blev [aktiveret i Staging](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) den 24. marts 2021, og alle anmodninger om Staging-certifikater med ECDSA-nøgler er underskrevet af "(STAGING) Ersatz Edamame E1" og anvender ECDSA-hierarkiet. Tilsvarende er alle anmodninger om staging certifikater med RSA-nøgler underskrevet af "(STAGING) Artificial Apricot R3" og bruger RSA-hierarkiet. Der er ingen måde at få et RSA-signeret certifikat til en ECDSA-nøgle på, eller omvendt. Måden du kan kontrollere, hvilken udsteder du får, er ved kontrollere, hvilken slags nøgle du genererer lokalt.

## Root Certifikater

Staging miljøet har to aktive rodcertifikater, som **ikke er til stede** i browser/klient trust stores: "(STAGING) Forestil Pære X1" og "(STAGING) Bogus Brocoli X2". Hvis du ønsker at ændre en kun testklient til at stole på staging miljøet til testformål, kan du gøre det ved at tilføje ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) og/eller ["(STAGING) Bogus Broccoli X2"](/certs/staging/letsencrypt-stg-root-x2.pem) certifikatet til din test trust store. Du kan finde alle vores staging certifikater [her](https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Vigtigt: Du må ikke tilføje staging rod-certifikatet eller intermediates til en trust store, som du bruger til almindelig browsing eller andre aktiviteter, da de ikke revideres eller holdes i overensstemmelse med de samme standarder som vores Root certifikater, og det er ikke sikkert at bruge til andet end test.

# Certifikatets Gennemsigtighed

Staging miljøet indsender for-certifikater til Let's Encrypt [Testflume](/docs/ct-logs) og Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT-testlogs og omfatter returnerede SCT'er i de udstedte certifikater.

# Løbende Integration / Udviklingstest

Staging miljøet har generøse hastighedsgrænser for at muliggøre testning, men det er ikke velegnet til integration i udviklingsmiljøer eller løbende integration (CI). At lave netværkskald til eksterne servere kan introducere ustabilitet og staging miljøet tilbyder ingen måde at "falske" DNS eller challenge validering succes, hvilket gør det mere kompliceret at lave test opsætninger.

Ud over staging miljøet tilbyder Let's Encrypt en lille ACME-server med det formål at kunnne anvendes til CI og udviklingsmiljøer kaldet [Pebble](https://github.com/letsencrypt/pebble). At kør Pebble på din udviklingsmaskine eller i et CI miljø er [hurtig og nem](https://github.com/letsencrypt/pebble#docker).
