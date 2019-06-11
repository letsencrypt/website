---
title: Beteiligen Sie sich
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## Community

Wir können immer Hilfe bei der Beantwortung von Fragen auf [Let's Encrypt Community Support](https://community.letsencrypt.org/) gebrauchen. Schauen Sie [dieses Blogpost](/2015/08/13/lets-encrypt-community-support.html), warum der Beitrag zum Community-Support so wichtig ist.

## Code

Wir können auch Hilfe bei der Softwareentwicklung gebrauchen. All unserer code ist auf [GitHub](https://github.com/letsencrypt/).

### Client Software

[Certbot](https://github.com/certbot/certbot) ist ein auf Python basierendes Werkzeug, welches auf Ihrem Webserver arbeitet, um automatisch ein Zertifikat abzuholen und die Webseite to HTTPS zu konvertieren. Certbot ist das Werkzeug, welches wir empfehlen und mit dem die meisten Leute starten. Viele andere [Drittanbieterwerkzeuge](/de/docs/client-options/) sind verfügbar.

### Server-side CA Software

[Boulder](https://github.com/letsencrypt/boulder) is die Let's Encrypt CA Implementierung. Sie basiert auf [ACME](https://github.com/ietf-wg-acme/acme) Protokoll und ist hauptsächlich in Go geschrieben. Ein grossartiger Platz zum Starten ist die Liste der ['help wanted' issues](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted) und der [contributors guide](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### letsencrypt.org

Sie können diese Webseite und die Dokumentation [hier](https://github.com/letsencrypt/website) verbessern oder helfen Sie mit [Übersetzungen](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md).

## Protokoil

Die Let's Encrypt CA kommuniziert mit der Zertifikatsverwaltungssoftware, welche auf dem Webserver läuft.  Das Protokoll dafür wird ACME genannt, für "Automated Certificate Management Environment". Der Entwurf der ACME Spezifikation ist [auf Github verfügbar](https://github.com/ietf-wg-acme/acme). Er ist auf dem Weg durch den IETF zur Finalisierung als offener Standard. Sie können der Entwicklerdiskussion zum ACME Protokoll auf [dieser IETF Mailingliste](https://www.ietf.org/mailman/listinfo/acme) beitreten.
