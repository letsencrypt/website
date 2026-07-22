---
title: Zukünftige Funktionen
slug: upcoming-features
lastmod: 2026-03-16
show_lastmod: 1
---

Für Ankündigungen anstehender Änderungen bitte [abonnieren Sie die Mailingliste](https://letsencrypt.org/opt-in/) oder lesen Sie die [API-Ankündigungen der Kategorie](https://community.letsencrypt.org/c/api-announcements/18) im Forum "Let's Encrypt Community".

# Zukünftige Funktionen

## Entfernen der TLS Client-Authentifizierung EKU

Am 11. Februar 2026 haben wir [die erweiterte Schlüsselverwendung (EKU) für die TLS-Clientauthentifizierung](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) aus unserem Standardzertifikatsprofil entfernt. Als vorübergehende Übergangslösung für Kunden, die mehr Zeit für die Migration benötigen, bieten wir ein [tlsclient](https://letsencrypt.org/docs/profiles/#tlsclient)-Profil an. Abonnenten, die es bereits vor dem 13. Mai 2026 verwenden, können es bis 8. Juli 2026 verwenden.

## Verkürzung der Zertifikatsgültigkeitsdauer auf 45 Tage

Um den geänderten Anforderungen des CA/Browser Forums zu entsprechen, [verkürzen wir die Gültigkeitsdauer der Zertifikate auf 45 Tage](https://letsencrypt.org/2025/12/02/from-90-to-45). Wir werden die Anzahl der Tage zunächst am 10. Februar 2027 auf 64 Tage und dann am 16. Februar 2028 auf 45 Tage reduzieren. Wir verkürzen außerdem die Wiederverwendungsfrist der Autorisierung auf 10 Tage und dann auf 7 Stunden.

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

Wir betreiben nun Zertifikattransparenz (CT) Logs, die den neuen [Static CT API Spec](https://c2sp.org/static-ct-api)entsprechen, mit der [Sunlight](https://github.com/FiloSottile/sunlight) Software. Diese Logs sind nun in der Lage, die CT-Anforderungen der Browser zu erfüllen. Die [CT Logs Dokumentation](https://letsencrypt.org/docs/ct-logs/) enthält eine Liste unserer aktuellen Logs.

## ACME Erneuerungsinformationen (ARI)

Aktiviert: [23. März 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Wir bieten nun für alle ausgestellten Zertifikate empfohlene Verlängerungszeiträume an, die Clients mithilfe der [ACME ARI-Erweiterung](https://www.rfc-editor.org/rfc/rfc9773.html) abfragen können.

## Kurzlebige Zertifikate

Clients können [ein "kurzlebiges" Zertifikat](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) mit ACME Profilen anfordern. Diese Zertifikate sind für eine so kurze Zeit gültig, dass sie keinerlei Widerrufsinformationen enthalten müssen.

## IP-Adresszertifikate

Kurzlebige Zertifikate (siehe oben) können verlangen, dass das Zertifikat [IP-Adressen](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) in seinen Subject Alternativnamen enthält. Diese Adressen werden [in der gleichen Weise validiert wie heute DNS-Namen](https://www.rfc-editor.org/rfc/rfc8738.html).
