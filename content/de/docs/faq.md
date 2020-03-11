---
title: FAQ
linkTitle: Frequently Asked Questions (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Diese FAQ ist in folgende Sektionen unterteilt:

* [Allgemeine Fragen](#general)
* [Technische Fragen](#technical)

# <a id="general">Allgemeine Fragen</a>

## Welche Dienste bietet Let's Encrypt an?

Let's Encrypt ist eine globale Zertifizierungsstelle (CA). Wir lassen Menschen und Organisationen weltweit SSL/TLS Zertifikate ausstellen, erneuern und verwalten. Unsere Zertifikate können benutzt werden, um auf Webseiten sichere HTTPS Verbindungen zu aktivieren.

Let's Encrypt bietet Domain-Validierungs (DV) Zertifikate. Wir bieten keine Organisationsvalidierung (OV) oder Erweiterte Validierung (EV), weil wir für diese Typen die Ausstellung nicht automatisieren können.

Um mit Let's Encrypt zu beginnen, besuchen Sie bitte {{<link "Erste Schritte" "/getting-started" >}} Seite.

## Was kostet die Benutzung von Let's Encrypt? Ist wirklich alles frei?

Wir erheben keine Gebühr für unsere Zertifikate. Let's Encrypt ist gemeinnützig, unsere Mission ist die Erstellung eines sicheren Webs, welches die Privatsphäre akzeptiert durch weite Verbreitung von HTTPS. Unsere Dienste sind frei und einfach zu benutzen, sodass jede Webseite HTTPS bereitstellen kann.

Wir brauchen Unterstützung von grosszügigen Sponsoren, Stipendiaten und Einzelpersonen, um unsere Dienste frei rund um den Globus bereitzustellen. Wenn Sie interessiert sind, uns zu unterstützen, bitte machen Sie eine {{<link "Spende" "/donate" >}} oder {{<link "werden Sie Sponsor" "/become-a-sponsor" >}}.

In einigen Fällen wird Integratoren (z.B. Hosting-Provider) eine geringe Gebühr für Verwaltungsaufwand berechnet.

## Welche Unterstützungsmöglichkeiten werden angeboten?

Let's Encrypt läuft mit einem kleinen Team und hängt stark von Automatisierung ab, um Kosten zu senken. Aus diesem Grunde sind wir nicht in der Lage, direkten Support für unsere Abonnenten anzubieten. Wir haben dafür einige grossartige Optionen für Unterstützung:

1. Wir haben eine wirklich hilfreiche {{<link "Dokumentation" "/docs" >}}.
2. Wir haben ein sehr aktives und hilfreiches [Community Support Forum](https://community.letsencrypt.org/). Mitglieder unserer Community machen einen grossartigen Job beim Beantworten von Fragen und viele der üblichen Fragen sind schon beantwortet.

Hier ist ein [Video, was wir mögen](https://www.youtube.com/watch?v=Xe1TZaElTAs) über die Leistung der grossen Community.

## Eine Webseite, die Let's Encrypt benutzt, ist an Phishing/Malware/Scam/... beteiligt, was sollte ich tun?

Wir empfehlen das Melden solcher Seiten bei Google Safe Browsing und dem Microsoft Smart Screen Programm, welche die Benutzer mehr schützen kann. Hier ist eine Meldeseite von Google:

[https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)

Wenn Sie mehr über Regeln und Gründe lesen wollen, so können Sie das hier (in englisch):

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Technische Fragen</a>

## Wird Zertifikaten von Let's Encrypt von meinem Browser vertraut?

Für die meisten Browser und Betriebssysteme, ja. Schauen Sie in die {{<link "Kompatibilitätsliste" "/docs/cert-compat" >}} für mehr Details.

## Stellt Let's Encrypt Zertifikate für andere als SSL/TLS für Webseiten aus?

Let's Encrypt Zertifikate sind Standard Domain Validation Zertifikate, so können Sie diese für alle Server, die einen Domainnamen benutzen, verwenden: Webserver, Mailserver, FTP-Server und viele andere.

Email-Verschlüsselung und Code-Signierung sind unterschiedliche Typen von Zertifikaten, die Let's Encrypt nicht ausstellt.

## Generiert oder speichert Let's Encrypt private Schlüssel von meinen Zertifikaten auf Let's Encrypt Servern?

Nein. Niemals.
Der private Schlüssel wird immer auf Ihrem eigenen Server generiert und verwaltet, nicht bei der Let's Encrypt Zertifikat Verwaltung.

## Was ist die Laufzeit der Let's Encrypt Zertifikate? Für wie lange sind diese gültig?

Unsere Zertifikate sind 90 Tage gültig. Sie können [hier](/2015/11/09/why-90-days.html) lesen, warum das so ist.Da ist kein Weg das zu ändern, es gibt keine Ausnahme. Wir empfehlen die automatische Erneuerung Ihrer Zertifikate alle 60 Tage.

## Wird Let's Encrypt Organisations-Validierung (OV) oder Erweiterte Validierung (EV) Zertifikate anbieten?

Wir haben keine Pläne für Ausstellung von OV oder EV Zertifikaten.

## Kann ich ein Zertifikat für mehrere Domain-Namen (SAN Zertifikate oder UCC Zertifikate) bekommen?

Ja, dieselben Zertifikate können unterschiedliche Namen mit Benutzung des Subject Alternative Name (SAN) Mechanismus verwenden.

## Kann Let's Encrypt Wildcard-Zertifikate ausstellen?

Ja. Wildcard müssen über ACMEv2 mit DNS-01 Challenge ausgestellt werden. Schauen Sie [diese Nachricht](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) für mehr technische Details.

## Gibt es einen Let's Encrypt (ACME) Client für mein Betriebssystem?

Es ist eine grosse Anzahl von {{<link "ACME Clients" "/docs/client-options" >}} verfügbar. Die Wahrscheinlichkeit ist gross, dass etwas auf Ihrem Betriebssystem gut funktioniert. Wir empfehlen, mit dem [Certbot](https://certbot.eff.org/) zu starten.

## Kann ich einen bestehenden privaten Schlüssel oder ein Certificate Signing Request (CSR) benutzen?

Ja, aber nicht alle Clients unterstützen diese Funktion. [Certbot](https://certbot.eff.org/) tut das.

## Welche IP-Adressen benutzt Let's Encrypt zur Validierung meines Webservers?

Wir veröffentlichen keine Liste von IP-Adressen, die wir bei der Validierung benutzen, weil diese ändern sich zu jeder Zeit. In der Zukunft validieren wir möglichweise von verschiedenen IP-Adressen zur selben Zeit. Lesen Sie [diese Nachricht](https://community.letsencrypt.org/t/validating-challenges-from-multiple-network-vantage-points) für mehr Details.

## Ich habe erfolgreich ein Zertifikat erneuert, aber die Validierung funktioniert jetzt nicht mehr - wie ist das möglich?

Wenn Sie den Austausch für eine Domain erfolgreich abgeschlossen haben, wird die resultierende Autorisierung zwischengespeichert, damit Ihr Konto später erneut verwendet werden kann. Die zwischengespeicherten Berechtigungen sind 30 Tage ab dem Zeitpunkt der Validierung gültig. Wenn das angeforderte Zertifikat alle erforderlichen Berechtigungen zwischengespeichert hat, wird die Validierung erst nach Ablauf der relevanten zwischengespeicherten Berechtigungen erneut durchgeführt.
