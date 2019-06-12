---
title: Erste Schritte
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

Um HTTPS auf Ihrer Webseite zu aktivieren, brauchen Sie ein Zertifikat (eine
Datei) von einer Zertifizierungsstelle (CA). Let's Encrypt ist eine CA. Um für
Ihre Webseiten-Domain von Let's Encrypt ein Zertifikat zu bekommen, haben Sie
zu demonstrieren, dass Sie die Kontrolle über diese Domain haben.
Mit Let's Encrypt benutzen Sie Software, die das
[ACME Protokoll](https://ietf-wg-acme.github.io/acme/) benutzt, welches
typischerweise auf Ihrem Web-Host läuft.

Um herauszufinden, welche Methode für Sie die richtige ist, ist es wichtig
herauszufinden, ob Sie zu Ihrer Webseite 
[Shell Zugang](https://en.wikipedia.org/wiki/Shell_account) haben (auch bekannnt
als SSH Zugang). Wenn Sie Ihre Webseite durch ein Kontrollschnittstelle verwalten
wie [cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/) oder
[WordPress](https://wordpress.org/), dann haben Sie wahrscheinlich keinen Shell
Zugang. Sicherheitshalber können Sie Ihren Diensteanbieter fragen.

# Mit Shell Zugang

Wir empfehlen den meisten Leuten mit Shell Zugang die Benutzung des
ACME [Certbot] ACME. Er kann Zertifikate automatisch ohne Ausfallzeit erstellen
und installieren.
Er hat auch einen Expertenmodus für Leute, die keine Autokonfiguration möchten.
Er ist einfach zu benutzen, funktioniert auf vielen Betriebssystemen und hat eine
grossartige Dokumentation. [Besuchen Sie die Certbot Seite][Certbot], um angepasste
Anleitungen für Ihr Betriebssystem und Web Server zu erhalten.

Wenn [Certbot] nicht ihren Anforderungen entspricht, können Sie auch etwas anderes
ausprobieren, es gibt [weitere ACME Clients zur Auswahl](/de/docs/client-options/).
Wenn Sie eine ACME Client Software gewählt haben, schauen Sie in die Dokumentation,
wie damit fortzufahren ist.

Wenn Sie mit unterschiedlichen ACME Clients experimentieren, benutzen Sie
[staging environment](/de/docs/staging-environment/), um das Erreichen von
[rate limits](/de/docs/rate-limits/) zu verhindern.

[Certbot]: https://certbot.eff.org/  "Certbot"

# Ohne Shell Zugriff

Der beste Weg, um Let's Encrypt ohne Shell Zugriff zu benutzen, ist der
eingebaute Support von Ihrem Hosting Provider. Wenn Ihr Hosting Provider
Let's Encrypt Unterstützung anbietet, dann kann er in ihrem Namen freie
Zertifikate anfordern, installieren und automatisch aktuell halten.
Bei einigen Hosting Providern müssen Sie diese Unterstützung einschalten.
Andere Provider machen dies automatisch für ihre Kunden.

[Überprüfen Sie unsere Liste von Hosting Providern](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920),
um zu sehen, ob Ihrer mit dabei ist. Wenn das so ist, folgen Sie der
Dokumentation, um Ihr Let's Encrypt Zertifikat einzurichten.

Wenn Ihr Hosting Provider Let's Encrypt nicht unterstützt, können Sie
ihn zur Hilfe kontaktieren. Wir tun unser Bestes, um Let's Encrypt
Unterstützung zu ermöglichen und Provider sind oft sehr froh,
wenn dieser Vorschlag von ihren Kunden kommt.

Wenn Ihr Hosting Provider Let's Encrypt nicht integrieren möchte, aber
das Hochladen von eigenen Zertifikaten unterstützt, können Sie Certbot
auf Ihrem eigenen Rechner installieren und im [manuellen Modus](https://certbot.eff.org/docs/using.html#manual)
benutzen. Im manuellen Modus laden Sie eine spezielle Datei zu Ihrer
Webseite, um die Kontrolle zu überprüfen. Certbot wird dann ein Zertifikat
abrufen, welches Sie dann zu Ihrem Hosting Provider hochladen können.
Wir empfehlen diese Methode nicht, denn sie kostet viel Zeit und Sie
müssen sie regelmässig im Jahr wiederholen, wenn Ihr Zertifikat abläuft.
Für viele Benutzer ist es besser, Let's Encrypt Unterstützung von ihrem
Hosting Provider anzufordern oder zu einem anderen Anbieter zu wechseln.

# Hilfe bekommen

Wenn Sie Fragen haben zur Auswahl eines ACME Clients, oder über Benutzung eines
besonderen Clients, oder alles andere bezüglich Let's Encrypt, probieren Sie
unser [hilfreiches Community Forum](https://community.letsencrypt.org/).
