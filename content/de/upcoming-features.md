---
title: Zukünftige Funktionen
slug: upcoming-features
top_graphic: 1
lastmod: 2019-07-03
---

## Multi-Perspective Validation

Derzeitige Let's Encrypt Validierung von einer Netzwerkperspektive. Wir planen die Validierung von mehreren Netzwerkperspektiven zu starten.

## ECDSA Root and Intermediates

Derzeit signiert Let's Encrypt nur Endentität Zertifikate mit RSA Zwischenzertifikaten. Let's Encrypt wird ein ECDSA Root und Zwischenzertifikat generieren, welche zur Signierung von Endentität Zertifikaten benutzt werden kann.

# Abgeschlossene Funktionen

## Certificate Transparency Log

* Aktiviert: 15. Mai 2019

Wir haben einen [Certificate Transparency log]({{< ref "/docs/ct-logs.html" >}}) in Betrieb genommen.

## TLS ALPN Challenge Support

* Aktiviert: 12. Juli 2018

Wir haben einen [Ersatz](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn/) für die TLS-SNI Validierungsmethode spezifiziert und implementiert, welche [aus Sicherheitsgründen deaktiviert war](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811). Vorstellung des Ersatz' war wichtig für Abonennten, die nur Port 443 für Validierung benutzen möchten.

## Embed SCT receipts in certificates

* AKtiviert: 29. März 2018

## Wildcard Certificates

* AKtiviert: 13. März 2018

## ACME v2 API

* AKtiviert: 13. März 2018

## IDN Support

* Aktiviert: 20. Oktober 2016

Let's Encrypt unterstützt jetzt Ausstellung für Internationalized Domain Names (IDNs).

## Full IPv6 Support

* Aktiviert: 26. Juli 2016

Initial waren nur Teile der Let's Encrypt API Infrastruktur über IPv6 erreichbar. Das hat IPv6-only Systeme davon abgehalten, mit Let's Encrypt zu interagieren. Das wurde gelöst - IPv6 Support wurde für alle Funktionen aktiviert.

## Windows XP Certificate Compatibility

* Aktiviert: 25. März 2016

Problem gelöst in unserer Zertifikatkette, dass Browser unter Windows XP abgehalten hat, Let's Encrypt Zertifikaten zu vertrauen.

## ECDSA Signing Support

* Aktiviert: 10. Februar 2016

Die Möglichkeit zu Let's Encrypt hinzugefügt, ECDSA Schlüssel mit Let's Encrypt's RSA Zwischenzertifikat zur signieren. Unterstützung für Signierung von ECDSA Schlüsseln mit voller ECDSA Zertifikatkette soll später hinzugefügt werden.

## ACME DNS Challenge Support

* Aktiviert: 20. Januar 2016

Let's Encrypt erlaubt Validierung über DNS Einträge definiert in der ACME Spezifikation.
