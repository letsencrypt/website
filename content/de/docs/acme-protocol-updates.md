---
title: Aktualisierung des ACME-Protokolls
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---


Das [IETF-standardisierte](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME-Protokoll, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), ist der Grundstein für die Funktionsweise von Let's Encrypt.

# API-Endpunkte

Wir haben derzeit die folgenden API-Endpunkte. Bitte lesen Sie [unsere Dokumentation zu den Abweichungen](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), um deren Umsetzung mit der ACME-Spezifikation zu vergleichen.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (veraltet)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Neue abwärtskompatible ACME-Funktionen

Von Zeit zu Zeit kann Let's Encrypt neue abwärtskompatible Funktionen für bestehende API-Endpunkte implementieren. Normalerweise werden neue, abwärtskompatible Funktionen eingeführt, weil wir uns entschlossen haben, einen Teil der ACME-Spezifikation zu implementieren, den wir zuvor noch nicht implementiert hatten.

Wenn neue Funktionen für bestehende API-Endpunkte eingeführt werden, sind diese Funktionen immer klar in einer öffentlichen ACME-Spezifikation spezifiziert und werden ordnungsgemäß implementierte Clients nicht stören.

# Neue Versionen von ACME mit Inkompatibilitäten

Wir planen keine einschneidenden Änderungen an unserem ACME-Support, aber wenn wir es für wichtig halten, werden wir uns bemühen, einen reibungslosen Übergang über einen ausreichenden Zeitraum zu ermöglichen und so weit wie möglich im Voraus zu kommunizieren. Systemadministratoren sollten in der Lage sein, ihre ACME-Clients rechtzeitig zu aktualisieren, falls eine grundlegende Änderung erforderlich ist.
