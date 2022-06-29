---
title: Zukünftige Funktionen
slug: upcoming-features
top_graphic: 1
lastmod: 2020-08-03
show_lastmod: 1
---


## IP-Adressen in Zertifikaten

Wir planen, Unterstützung für die Validierung und Einbeziehung von IP-Adressen in Zertifikate hinzuzufügen.

## ECDSA Root and Intermediates

Derzeit signiert Let's Encrypt nur Endentität-Zertifikate mit RSA-Intermediates. Wir haben jetzt einen ECDSA Root und Intermediates, aber wir müssen diese noch in Root-Programme einreichen und in unser Ausstellungssystem integrieren.

# Implementierte Funktionen

## Multiperspektive Validierung

* Aktiviert: 19. Februar 2020

Wir validieren jetzt die Domänenkontrolle aus [mehreren Netzwerkperspektiven (network perspectives)](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## Certificate Transparency Log

* Aktiviert: 15. Mai 2019

Wir haben ein [Certificate Transparency Log](/docs/ct-logs) in Betrieb genommen.

## TLS ALPN Challenge Support

* Aktiviert: 12. Juli 2018

Wir haben einen [Ersatz](https://tools.ietf.org/html/rfc8737) für die TLS-SNI Validierungsmethode spezifiziert und implementiert, welche [aus Sicherheitsgründen deaktiviert war](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Die Einführung eines Ersatzes war wichtig für Personen, die nur Port 443 zur Validierung verwenden wollen.

## Einbindung von SCT-Bestätigungen in Zertifikaten

* Aktiviert: 29. März 2018

## Wildcard-Zertifikate

* Aktiviert: 13. März 2018

## ACME v2 API

* Aktiviert: 13. März 2018

## IDN-Unterstützung

* Aktiviert: 20. Oktober 2016

Let's Encrypt unterstützt jetzt die Ausstellung für Internationalized Domain Names (IDNs).

## Vollständige IPv6-Unterstützung

* Aktiviert: 26. Juli 2016

Anfänglich waren nur Teile der Let's Encrypt-API-Infrastruktur über IPv6 erreichbar. Das hat IPv6-only Systeme davon abgehalten, mit Let's Encrypt zu interagieren. Das wurde gelöst - IPv6-Unterstützung wurde für alle Funktionen aktiviert.

## Zertifikatkompatibilität mit Windows XP

* Aktiviert: 25. März 2016

Wir haben ein Problem in unserer Zertifikatkette gelöst, was Browser auf Windows XP abgehalten hat, Let's Encrypt-Zertifikaten zu vertrauen.

## Unterstützung von ECDSA-Signierung

* Aktiviert: 10. Februar 2016

Es wurde die Möglichkeit zu Let's Encrypt hinzugefügt, ECDSA-Schlüssel mit Let's Encrypt's RSA-Zwischenzertifikat zu signieren. Unterstützung für Signierung von ECDSA-Schlüsseln mit voller ECDSA-Zertifikatkette soll später hinzugefügt werden.

## Unterstützung der ACME DNS Challenge

* Aktiviert: 20. Januar 2016

Let's Encrypt erlaubt Validierung über DNS Einträge, wie in der ACME-Spezifikation definiert.
