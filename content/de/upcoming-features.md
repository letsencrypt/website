---
title: Zukünftige Funktionen
slug: upcoming-features
lastmod: 2023-06-20
show_lastmod: 1
---

## ECDSA Root and Intermediates

Wir stellen Zertifikate von unserer Produktions-ECDSA intermediate zu [zugelassenen Konten](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) aus. Es gibt kein geplantes Datum zum Entfernen der Zulassungsliste.

# Implementierte Funktionen

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
