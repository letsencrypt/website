---
title: Zukünftige Funktionen
slug: upcoming-features
lastmod: 2025-07-31
show_lastmod: 1
---

Für Ankündigungen anstehender Änderungen bitte [abonnieren Sie die Mailingliste](https://letsencrypt.org/opt-in/) oder lesen Sie die [API-Ankündigungen der Kategorie](https://community.letsencrypt.org/c/api-announcements/18) im Forum "Let's Encrypt Community".

# Zukünftige Funktionen

## Kurzlebige Zertifikate

Gegen Ende 2025 beabsichtigen wir, allen Clients, die ACME-Profile (siehe unten) unterstützen, die Möglichkeit zu geben, ein ["kurzlebiges" Zertifikat anzufordern](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/). Diese Zertifikate sind für eine so kurze Zeit gültig, dass sie keinerlei Widerrufsinformationen enthalten müssen.

## IP-Adresszertifikate

Gegen Ende 2025 wir beabsichtigen, jedem Client, der ein kurzlebiges Zertifikat anfordert (siehe oben), auch zu erlauben, dass das Zertifikat [IP-Adressen](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) in seinem Subject Alternative Namen enthält. Diese Adressen werden [in der gleichen Weise validiert wie heute DNS-Namen](https://www.rfc-editor.org/rfc/rfc8738.html).

## Entfernen der TLS Client-Authentifizierung EKU

Am 11. Februar 2026 beabsichtigen wir [die "TLS Client Authentication" Extended Key Usage (EKU)](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) aus unserem Standard-Zertifikatsprofil zu entfernen. Vor diesem Datum bieten wir ein alternatives Profil an, das weiterhin diese EKU enthält. Beachten Sie jedoch, dass dies nur eine vorübergehende Übergangslösung für Clients ist, die mehr Zeit benötigen, um von dieser EKU wegzukommen: Dieses alternative Profil wird am 13. Mai 2026 eingestellt.

# Implementierte Funktionen

## Abschalten von Ablaufbenachrichtigungs-E-Mails

Am 4. Juni 2025 haben wir unseren [E-Mail-Benachrichtigungsdienst für Ablaufdaten deaktiviert](https://letsencrypt.org/2025/01/22/ending-expiration-emails/) und alle mit ACME-Konten verbundenen E-Mail-Adressen aus unserer Produktionsdatenbank gelöscht.

## Entfernung von OCSP-URLs

Aktiviert: [7. Mai 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Unsere Zertifikate enthalten keine URL für das Online Certificate Status Protocol (OCSP) von Authority Information Access (AIA) mehr. Stattdessen enthalten sie eine Certificate Revocation List (CRL) Distribution Point (CRLDP) URL. Abhängige Parteien können den Widerrufsstatus über CRLs abrufen, und ACME-Clients können über ARI (s. unten) Erneuerungshinweise erhalten.

## ACME Profile

Aktiviert: [9. Januar 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Clients, die die [Entwürfe der ACME Profile Erweiterung](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html) unterstützen, können nun anfordern, dass ihr Zertifikat mit [eines unserer unterstützten Profile](https://letsencrypt.org/docs/profiles/) übereinstimmt.

## Statische CT-Logs

Aktiviert: [14. März 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Wir betreiben nun Zertifikattransparenz (CT) Logs, die den neuen [Static CT API Spec](https://c2sp.org/static-ct-api)entsprechen, mit der [Sunlight](https://github.com/FiloSottile/sunlight) Software. Nun, da verschiedene CT-Log-Programme ihre Richtlinien aktualisiert haben, um diese neue Art von Log zu akzeptieren, wir beabsichtigen, unsere Logs zur Aufnahme in diese Programme in Kürze einzureichen.

## ACME Erneuerungsinformationen (ARI)

Aktiviert: [23. März 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Wir bieten nun für alle ausgestellten Zertifikate empfohlene Verlängerungszeiträume an, die Clients mithilfe der [ACME ARI-Erweiterung](https://www.ietf.org/archive/id/draft-ietf-acme-ari-08.html) abfragen können.
