---
title: Kommande funktioner
slug: upcoming-features
lastmod: 2026-07-22
show_lastmod: 1
---

För meddelanden om kommande förändringar, vänligen [prenumerera på Technical Updates-mailinglistan](https://letsencrypt.org/opt-in/) eller se [API Announcements-kategorin](https://community.letsencrypt.org/c/api-announcements/18) på Let's Encrypt communityforum.

# Kommande funktioner

## Att minska certifikatets livslängd till 45 dagar

För att följa ändringar i CA/Browser Forum Baseline Requirement minskar vi [certifikatlivslängder till 45 dagar](https://letsencrypt.org/2025/12/02/from-90-to-45). Vi kommer först att minska till 64 dagar den 10 februari 2027, och sedan till 45 dagar den 16 februari 2028. Vi minskar också auktorisationens återanvändningsperiod till 10 dagar, och sedan till 7 timmar.

# Klara funktioner

## Borttagning av EKU:n för TLS-klientautentisering

Den 11 februari 2026 tog vi [bort "TLS Client Authentication" Extended Key Usage (EKU)-](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) från vår standardcertifikatprofil. Den 8 juli 2026 pensionerade vi den temporära [tlsclient](https://letsencrypt.org/docs/profiles/#tlsclient)-profilen och slutförde borttagningen. Vi utfärdar inte längre certifikat som innehåller TLS Client Authentication EKU.

## Avstängning av e-postmeddelanden om utgångsnotifiering

Den 4 juni 2025 stängde vi [av vår tjänst för e-postmeddelanden om utgång](https://letsencrypt.org/2025/01/22/ending-expiration-emails/), och raderade alla e-postadresser som är kopplade till ACME-konton från vår produktionsdatabas.

## Borttagning av OCSP-URL:er

Aktiverad: [7 maj, 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Våra certifikat innehåller inte längre en Authority Information Access (AIA) Online Certificate Status Protocol (OCSP) URL. Istället innehåller de en Certificate Revocation List (CRL) Distribution Point (CRLDP) URL. Betrodda parter kan hämta statusinformation om återkallelser via CRL, och ACME-klienter kan få förnyelsetips via ARI (se nedan).

## Wildcard-certifikat

Aktiverad: [9 januari, 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Klienter som stöder [-utkastet ACME Profiles extension](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html) kan nu begära att deras certifikat följer [en av våra stödda profiler](https://letsencrypt.org/docs/profiles/).

## Statiska CT-loggar

Aktiverad: [14 mars, 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Vi driver nu Certificate Transparency (CT)-loggar som följer den nya [Static CT API Spec](https://c2sp.org/static-ct-api), med programvaran [Sunlight](https://github.com/FiloSottile/sunlight). Dessa loggar kan nu användas för att uppfylla webbläsarnas CT-krav. [CT-Loggar Dokumentation](https://letsencrypt.org/docs/ct-logs/) har en lista över våra nuvarande loggar.

## ACME Förnyelseinformation (ARI)

Aktiverad: [23 mars, 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Vi tillhandahåller nu rekommenderade förnyelsefönster för alla utfärdade certifikat. Klienter kan hämta dem via [ACME ARI-tillägget](https://www.rfc-editor.org/rfc/rfc9773.html).

## Kortlivade certifikat

Klienter kan [begära ett kortlivat certifikat](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) med hjälp av ACME-profiler. Dessa certifikat är giltiga under så kort tid att de inte behöver ha information om återkallande inbäddad alls.

## IP-adresscertifikat

Kortlivade certifikat (se ovan) kan begära att certifikatet [innehåller IP-adresser](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) i sina Subject Alternative Names. Dessa adresser kommer att [valideras på ungefär samma sätt som DNS-namn](https://www.rfc-editor.org/rfc/rfc8738.html) görs idag.
