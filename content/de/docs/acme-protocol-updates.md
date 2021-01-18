---
title: Aktualisierung des ACME-Protokolls
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
---

{{< lastmod >}}

Das [IETF-standardisierte](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME-Protokoll, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), ist der Grundstein für Let's Encrypt.

# API-Endpunkte

Momentan haben wir folgende API-Endpunkte. Bitte verwenden Sie [unser Diagramm der Unterschiede](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) zum Vergleich der Implementierung mit der ACME-Spezifikation.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (veraltet)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Neue abwärtskompatible ACME-Funktionen

Von Zeit zu Zeit implementiert Let's Encrypt neue abwärtskompatible Funktionen in existierende API-Endpunkte. Typischerweise werden neue abwärtskompatible Funktionen eingeführt, weil wir uns entschieden haben, einen Teil der ACME-Spezifikation zu implementieren, die wir vorher noch nicht implementiert hatten.

Wenn neue Funktionen zu existierenden API-Endpunkten vorgestellt werden, sind die Funktionen bereits in einer öffentlichen ACME-Spezifikation spezifiziert und stören keine implementierten Clients.

# Neue Versionen von ACME mit Inkompatibilitäten

Wir planen keine wesentlichen Änderungen an unserer ACME-Unterstützung. Wenn wir dies jedoch für wichtig halten, werden wir uns bemühen, einen reibungslosen Übergang über einen ausreichenden Zeitraum hinweg zu ermöglichen und so früh wie möglich zu kommunizieren. Systemadministratoren sollten die Möglichkeit behalten, zeitnahe Aktualisierungen für ihre ACME-Clients bereitzustellen, falls eine grundlegende Änderung erforderlich ist.
