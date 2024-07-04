---
title: IPv6-Unterstützung
slug: ipv6-support
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt unterstützt IPv6 sowohl für den Zugriff auf die ACME-API mit einem ACME-Client als auch für die DNS-Lookups und HTTP-Requests, die wir beim Validieren der Domains durchführen.

## Domain-Validierung

Wenn Sie ausgehende Domain-Validierungsanfragen für eine Domain stellen, die sowohl IPv4 als auch IPv6 Adressen hat (z.B. sowohl `A` als auch `AAA` Einträge) wird Let's Encrypt immer die IPv6 Adressen für die erste Verbindung bevorzugen. Wenn die IPv6-Verbindung auf Netzwerkebene fehlschlägt (z.B wenn es eine Zeitüberschreitung gibt) und IPv4 Adressen verfügbar sind, dann versuchen wir die Anfrage mit einer der IPv4 Adressen erneut.

## Ungültige IPv6-Adressen

Oft ist Domain Inhabern nicht bewusst, dass ein `AAAA` Eintrag für ihre Domain existiert. Wenn die IPv6-Adresse im `AAAA` Eintrag falsch ist, wirkt sich dies auf den Domain-Validierungsprozess aus.

Normalerweise wird die IPv6-Adresse ein anderer Server sein als die IPv4-Adresse, auf der der ACME-Client ausgeführt wird. Da der ACME-Client nur den IPv4 Server konfiguriert, um auf die Challenge zu reagieren, wird die Domain-Validierung fehlschlagen, wenn der IPv6 Server benutzt wird.

In den meisten Fällen ist die richtige Fehlerbehebung die IPv6-Adresse zu aktualisieren, sodass sie auf den Server verweist, auf dem ACME-Client läuft, oder den `AAAA` Eintrag zu entfernen, wenn die Domain nicht für IPv6 gedacht ist. Es gibt keine Möglichkeit Let's Encrypt die IPv4 Adresse als Präferenz nutzen zu lassen, Sie müssen die Fehlkonfiguration beheben.

## IPv6-zu-IPv4-Wiederholungsversuch Details

Der IPv6 zu IPv4 Widerholungsversuch wird nur bei Verbindungs-Zeitüberschreitungen getätigt, nicht bei anderen Typen von Fehlern.

Im obigen "Common Pitfalls"-Szenario wird beispielsweise ein erneuter Versuch nicht stattfinden, wenn ein Webserver auf die IPv6-Adresse hört, aber nicht bereit ist, auf die ACME-Aufforderung zu antworten. In diesem Fall gäbe es keine Zeitüberschreitung für den Zugriff auf die IPv6-Adresse, und die Abfrage schlägt ohne erneuten Versuch fehl, da eine falsche Antwort zurückgegeben wurde.

Um unsere CA-Software einfach zu halten, führen wir bei der Validierung von "http-01" Challenges nur bei der ersten Anfrage einen IPv6 zu IPv4 Widerholungsversuch durch. Wenn Sie Umleitungen nutzen, werden diese keine Widerholungsversuche bekommen.

Wenn zum Beispiel ein Domänenname einen `AAAA-Eintrag` hat, der immer ausläuft, und einen `A`-Eintrag mit einem Webserver, der von HTTP auf HTTPS umleitet, dann funktioniert der Fallback von IPv6 auf IPv4 nicht korrekt. Die erste Anfrage an die Domain wird ordnungsgemäß auf IPv4 zurückgreifen und eine Umleitung von HTTP zu HTTPS erhalten. Die nachfolgende Anfrage bevorzugt wieder die IPv6-Adresse, wird aber nach einer Zeitüberschreitung nicht auf IPv4 zurückgreifen. Sie können dieses Problem beheben, indem Sie entweder die IPv6-Fehlkonfiguration beheben oder die HTTP-zu-HTTPS-Umleitung für Anfragen an den ACME-HTTP-01-Challenge-Pfad entfernen.

## Hilfe bekommen

Wenn du Hilfe dabei benötigst, ein IPv6-bezogenes Problem zu lösen, besuche doch unser [Community-Forum](https://community.letsencrypt.org).
