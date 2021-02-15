---
title: Beste Praxis - Port 80 offen halten
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
---

{{< lastmod >}}

Gelegentlich erhalten wir Berichte von Personen, die Probleme mit der Verwendung des Aufforderungstyps HTTP-01 haben, weil sie den Port 80 für ihren Webserver durch eine Firewall geschützt haben. Wir empfehlen, dass alle Server, die für die allgemeine Webnutzung vorgesehen sind, sowohl HTTP auf Port 80 als auch HTTPS auf Port 443 anbieten. Sie sollten auch Weiterleitungen für alle Port 80-Anforderungen und möglicherweise einen HSTS-Header (auf Port 443-Anforderungen) senden.

Das Zulassen von Port 80 führt nicht zu einem größeren Angriffsvektor auf Ihrem Server, da Anforderungen an Port 80 im Allgemeinen von derselben Software bedient werden wie auf Port 443.

Das Schließen von Port 80 verringert nicht das Risiko für eine Person, die versehentlich Ihre Webseite über HTTP besucht. Unter normalen Umständen würde diese Person eine Weiterleitung zu HTTPS erhalten, und der nachfolgende Datenverkehr wird geschützt. Wenn diese Person einem aktiven Man-In-The-Middle-Angriff (MITM) unterliegt, antwortet der MITM auf Port 80, sodass Ihre Site niemals die Möglichkeit hat, mit "Verbindung abgelehnt" zu antworten.

Wenn Sie den Port 80 offen halten, um eine Weiterleitung zu ermöglichen, können die Benutzer die richtige Version Ihrer Webseite (die HTTPS-Version) aufrufen. Es gibt verschiedene Situationen, auf die Sie keinen Einfluss haben und die möglicherweise kurzzeitig jemanden auf der HTTP-Version Ihrer Webseite landen - beispielsweise die automatische Verknüpfung in E-Mails oder die manuelle Eingabe eines Domainnamens. Es ist für sie besser, eine Weiterleitung als einen Fehler zu erhalten.

Leider haben Sie möglicherweise keine Kontrolle darüber, ob Port 80 für Ihre Webseite blockiert ist. Einige (hauptsächlich private) Internetdienstanbieter blockieren Port 80 aus verschiedenen Gründen. Wenn Ihr ISP dies tut, Sie jedoch weiterhin Zertifikate von Let's Encrypt erhalten möchten, haben Sie zwei Möglichkeiten: Sie können DNS-01-Challenges verwenden oder Sie können [einen der Clients verwenden, der TLS-ALPN-01-Herausforderungen unterstützt](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (auf Port 443).
