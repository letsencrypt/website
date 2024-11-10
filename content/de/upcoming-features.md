---
title: Zukünftige Funktionen
slug: upcoming-features
lastmod: 2024-06-14
show_lastmod: 1
---

Für Ankündigungen zukünftiger Änderungen lesen Sie bitte die [API-Ankündigungen](https://community.letsencrypt.org/c/api-announcements/18) Kategorie im Let's Encrypt Community-Forum.

# Implementierte Funktionen

## ECDSA Root and Intermediates

* Aktiviert: 06. Juli 2024

Wir stellen Zertifikate aus unserer Produktion ECDSA Zwischenprodukte zu ECDSA Blattzertifikaten aus. Lesen Sie die [Ketten des Vertrauens](/certificates/) Dokumentation für alle Details über unsere PKI Hierarchie.

## ACME Erneuerungsinformationen (ARI)

* Aktiviert: 23. März 2023

Wir betreiben jetzt [ARI](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari.html), ein System, das es uns ermöglicht, Abonnenten über die API zu benachrichtigen, wenn sie erneuert werden müssen.

## Multiperspektive Validierung

* Aktiviert: 19. Februar 2020

Wir validieren jetzt die Domänenkontrolle aus [mehreren Netzwerkperspektiven (network perspectives)](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certificate Transparency Log

* Aktiviert: 15. Mai 2019

Wir haben ein [Certificate Transparency Log](/docs/ct-logs) in Betrieb genommen.

## TLS ALPN Challenge Support

* Aktiviert: 12. Juli 2018

Wir haben einen [Ersatz](https://tools.ietf.org/html/rfc8737) für die TLS-SNI Validierungsmethode spezifiziert und implementiert, welche [aus Sicherheitsgründen deaktiviert war](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Die Einführung eines Ersatzes war wichtig für Personen, die nur Port 443 zur Validierung verwenden wollen.

## Wildcard Zertifikate

* Aktiviert: 13. März 2018

## ACME v2 API

* Aktiviert: 13. März 2018

## Vollständige IPv6-Unterstützung

* Aktiviert: 26. Juli 2016
