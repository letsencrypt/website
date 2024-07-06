---
title: Stagning Miljø
slug: staging-environment
date: 2018-01-05
lastmod: 2024-06-11
show_lastmod: 1
---


Vi anbefaler stærkt test mod vores staging miljø, før du bruger vores produktionsmiljø. Dette vil give dig mulighed for at få tingene rigtigt, før du udsteder betroede certifikater og reducere chancen for din kører op mod kalds begrænsninger.

ACME-URL'en til vores [ACME v2 staging miljø](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) er:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Hvis du bruger Certbot, kan du bruge vores staging miljø med flaget `--test-cert` eller `--dry-run`. For andre ACME-klienter bedes du læse deres anvisninger for information om test med vores staging miljø.

# Grænser For kald

Staging miljøet bruger de samme kaldsbegrænsninger som [beskrevet for produktionsmiljøet](/docs/rate-limits) med følgende undtagelser:

* Grænsen for **Certifikater pr. registreret domæne** er 30.000 pr. uge.
* Grænsen for **Duplikat certifikater** er 30.000 om ugen.
* Grænsen for **Mislykkede Valideringer** er 60 i timen.
* Grænsen for **Konti pr. IP-adresse** er 50 konti pr. 3 timers periode pr. IP.
* For ACME v2 er grænsen på **nye ordrer** 1.500 nye ordrer pr. 3 timers periode pr. konto.

# Staging miljøets Certifikat Hierarki

Staging miljøet har et certifikathierarki, der [efterligner produktion](/certificates). Navnene er blevet ændret med et præfiks af (STAGING) og unikke navn for at gøre dem klart adskilt fra deres produktions modparter.

## Root CAs

Staging miljøet har to aktive rodcertifikater, som **ikke er til stede** i browser/klient trust stores: "(STAGING) Pretend Pear X1" og "(STAGING) Bogus Broccoli X2".

Hvis du ønsker at ændre en "kun test"-klient til at stole på staging til testformål, kan du gøre det ved at tilføje deres certifikater til din test trust butik. **Vigtigt**: Du må ikke tilføje staging rod-certifikatet eller intermediates til en trust store, som du bruger til almindelig browsing eller andre aktiviteter, da de ikke revideres eller holdes i overensstemmelse med de samme standarder som vores Root certifikater, og det er ikke sikkert at bruge til andet end test.

* **Pretend Pear X1**
  * Emne: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Nøgletype: `RSA 4096`
  * Certifikat detaljer: [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
* **Bogus Broccoli X2**
  * Emne: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Nøgletype: `ECDSA P-384`
  * Certifikatoplysninger (selvsigneret): [, der](/certs/staging/letsencrypt-stg-root-x2.der) [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Certifikat deltaljer (krydsunderskrevet af Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)

## Underordnede (CA'er)

Staging miljøet har mellemliggende certifikater, der efterligner produktion, udstedt fra de ikke-betroede root certifikater beskrevet ovenfor. Ligesom i produktionen, er ikke alle i brug på noget tidspunkt. Den fuldstændige liste over aktuelle mellemliggende certifikater er:

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14

Disse mellemliggende certifikater er under forandring når som helst, og bør ikke være fastgjort eller betroet af noget system. Generelt kan du forvente mellemliggende certifikater sin er parallelle de tilsvarende produktion (betroet) mellemliggende certifikater. Hvis strengt nødvendigt, kan du få fulde certifikat detaljer [her](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Certifikatets Gennemsigtighed

Staging miljøet indsender præ-certifikater til Let's Encrypt [Testflume](/docs/ct-logs) og Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT-testlogs og omfatter returnerede SCT'er i de udstedte certifikater.

# Løbende Integration / Udviklingstest

Staging miljøet har generøse hastighedsgrænser for at muliggøre testning, men det er ikke velegnet til integration i udviklingsmiljøer eller løbende integration (CI). At lave netværkskald til eksterne servere kan introducere ustabilitet og staging miljøet tilbyder ingen måde at "falske" DNS eller challenge validering succes, hvilket gør det mere kompliceret at lave test opsætninger.

Ud over staging miljøet tilbyder Let's Encrypt en lille ACME-server med det formål at kunnne anvendes til CI og udviklingsmiljøer kaldet [Pebble](https://github.com/letsencrypt/pebble). At kør Pebble på din udviklingsmaskine eller i et CI miljø er [hurtig og nem](https://github.com/letsencrypt/pebble#docker).
