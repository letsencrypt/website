---
title: Aktualisierung ACME Protokoll
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2016-07-27
---

{{< lastmod >}}

Das ACME-Protokoll ist der Grundstein für die Funktionsweise von Let's Encrypt. Es ist derzeit ein Normentwurf und noch kein endgültiger RFC. Da sich die Protokollspezifikation im Laufe der Zeit weiterentwickelt, implementiert Let's Encrypt aktualisierte Versionen von ACME. Dabei steht Sicherheit an erster Stelle, gefolgt von Abwärtskompatibilität.

# Derzeit implementierte ACME Version

Momentan haben wir folgende API Endpunkte. Es werden nicht alle Entwürfe der ACME Spezifikation implementiert, da das Dokument immer weiter entwickelt wird. Bitte schauen Sie [unser Diagramm der Unterschiede](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) zum Vergleich der Implementierung mit dem derzeitigen ACME Entwurf.

## ACME v1

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# Neue abwärtskompatible ACME Funktionen

Von Zeit zu Zeit implementiert Let's Encrypt neue abwärtskompatible Funktionen in existierende API Endpunkte. Typischerweise werden neue abwärtskompatible Funktionen vorgestellt, weil wir uns entschieden haben, einen Teil der ACME Spezifikation zu implemntieren, die wir vorher noch nicht gehabt haben.

Wenn neue Funktionen zu existierenden API Endpunkten vorgestellt werden, sind die Funktionen bereits klar in einer öffentlichen ACME Spezifikation erklärt und stören keine implementierten Clients.

# ACME Sicherheitsupdates

Wenn wir auf ein schwerwiegendes Sicherheitsproblem mit dem ACME-Protokoll aufmerksam werden (und nicht nur auf unsere Implementierung), müssen wir möglicherweise Änderungen an unseren API-Endpunkten vornehmen, die die Kompatibilität beeinträchtigen, oder den Betrieb vorhandener Endpunkte einstellen und neue einführen.

ACME wurde von vielen Parteien überprüft und erfolgreich in der Produktion eingesetzt. Es besteht jedoch immer die Möglichkeit, dass Schwachstellen nicht entdeckt werden. Systemadministratoren sollten die Möglichkeit behalten, zeitnah Aktualisierungen für ihre ACME-Clients bereitzustellen, um auf solche Sicherheitsanfälligkeiten zu reagieren.

# Neue Versionen von ACME mit Unterbrechungen

Wenn wir der Meinung sind, dass es wichtig ist, neue ACME-Versionen mit unterbrechenden Änderungen zu implementieren, tun wir dies, indem wir neue API-Endpunkte einführen und diese parallel zu den Endpunkten für ältere Versionen verwalten. Nachdem wir die neue Version verfügbar gemacht haben, werden wir allen Benutzern frühzeitig eine Abschreibungszeitleiste mitteilen.

Dies wird nicht sehr oft vorkommen, da die Unterbrechung der Kompatibilität auch dann lästig ist, wenn viel Zeit für den Übergang besteht. Wir werden dies jedoch tun, wenn die IETF beendet ist [ACME-Standardisierung](https://datatracker.ietf.org/wg/acme/charter/). Wir implementieren derzeit eine Vor-IETF-Standardisierungsversion von ACME, und es ist uns wichtig, wenn möglich einen formalisierten Standard zu verwenden.
