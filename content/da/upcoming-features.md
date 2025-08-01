---
title: Kommende Funktioner
slug: upcoming-features
lastmod: 2025-05-13
show_lastmod: 1
---

For meddelelser om kommende ændringer, venligst [abonnér på postlisten Tekniske opdateringer](https://letsencrypt.org/opt-in/) eller se [API-annonceringer kategori](https://community.letsencrypt.org/c/api-announcements/18) på Let's Encrypt community forum.

# Kommende Funktioner

## Afslutning af Udløb Notifikation E-mails

Den 4. juni 2025 har vi til hensigt at [slukke vores udløbs-e-mail-notifikationstjeneste](https://letsencrypt.org/2025/01/22/ending-expiration-emails/), og slette alle e-mailadresser tilknyttet ACME-konti fra vores produktionsdatabase.

## Kortlevende Certifikater

Omkring slutningen af 2025 agter vi at tillade enhver klient, der understøtter ACME-profiler (se nedenfor) til [anmode om et "shortlived" certifikat](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/). Disse certifikater er gyldige i så kort tid, at de ikke behøver at have tilbagekaldelsesoplysninger (f. eks. OCSP se nedenfor) overhovedet indlejret i dem.

## Ip Adresse Certifikater

Omkring slutningen af 2025, Vi har til hensigt at tillade enhver klient, der anmoder om et kortvarigt certifikat (se ovenfor) også at anmode om, at certifikatet [indeholder IP-adresser](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) i dets Emne Alternative Navne. Disse adresser vil blive [valideret på samme måde som DNS Names](https://www.rfc-editor.org/rfc/rfc8738.html) er i dag.

## Fjernelse af TLS Client Authentication EKU

11. feb 2026 agter vi at [fjerne "TLS-klientgodkendelse" Extended Key Usage (EKU)](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) fra vores standard certifikatprofil. Før denne dato vil vi tilbyde en alternativ profil, som stadig vil indeholde den EKU men bemærk, at dette vil være en midlertidig stop-gap for kunder, der har brug for mere tid til at migrere væk fra at have brug for det: at alternativ profil vil gå væk den 13. maj, 2026.

# Fuldførte Funktioner

## Fjernelse af OCSP- URL' er

Aktiveret: [7. Maj 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Vores certifikater indeholder ikke længere en Authority Information Access (AIA) Online Certificate Status Protocol (OCSP) URL. I stedet indeholder de en certifikattilbagekaldelsesliste (CRL) distributionspunkt (CRLDP) URL. Relying parties kan hente tilbagekaldelsesstatusoplysninger via CRL'er, og ACME-klienter kan få fornyelsestips via ARI (se nedenfor).

## ACME Profiles

Aktiveret: [9. Januar 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Kunder, der understøtter [udkast til ACME-profiler forlængelse](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html) kan nu anmode om, at deres certifikat er i overensstemmelse med [en af vores understøttede profiler](https://letsencrypt.org/docs/profiles/).

## Statiske CT Logs

Aktiveret: [14. Maj 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Vi driver nu Certificate Transparency (CT) logs, som er i overensstemmelse med den nye [Static CT API Spec](https://c2sp.org/static-ct-api), kører [Sunlight](https://github.com/FiloSottile/sunlight) software. Nu, hvor forskellige CT log programmer har opdateret deres politikker til at acceptere denne nye form for log, vi agter at indsende vores logs til optagelse i disse programmer snart.

## ACME Fornyelsesinformation (ARI)

Aktiveret: [23. Maj 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Vi leverer nu foreslåede fornyelsesvinduer til alle udstedte certifikater, som kunder kan forespørge ved hjælp af [ACME ARI udvidelse](https://www.ietf.org/archive/id/draft-ietf-acme-ari-08.html).
