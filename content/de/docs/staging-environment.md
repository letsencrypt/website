---
title: Staging-Umgebung
slug: staging-environment
date: 2018-01-05
lastmod: 2022-06-13
show_lastmod: 1
---


Wir empfehlen dringend das Testen gegen unsere Staging-Umgebung, bevor die Produktionsumgebung benutzt wird. Das wird Ihnen erlauben, die Dinge richtig zu machen, bevor vertrauenswürdige Zertifikate ausgestellt werden und reduziert das Risiko, gegen Rate Limits zu laufen.

Die ACME URL für unsere [ACME v2 Staging-Umgebung](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) ist:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Wenn Sie Certbot verwenden, können Sie unsere Staging-Umgebung mit dem `--test-cert` Flag verwenden. Für andere ACME Clients lesen Sie bitte die Instruktionen für Informationen zum Testen mit unserer Staging-Umgebung. Beachten Sie, die v2 Staging-Umgebung benötigt einen v2 kompatiblen ACME Client.

# Rate Limits

Die Staging-Umgebung benutzt dieselben Rate Limits wie [beschrieben für unsere Produktionsumgebung](/docs/rate-limits) mit den folgenden Ausnahmen:

* Das **Zertifikate pro registrierte Domain** Limit ist 30,000 pro Woche.
* Das **Doppelte Zertifikate** Limit ist 30,000 pro Woche.
* Das **Fehlgeschlagene Validierungen** Limit ist 60 pro Stunde.
* Das **Konten pro IP-Adresse** Limit ist 50 Accounts pro 3 Stunden Periode pro IP.
* Für ACME v2, das **Neue Aufträge** Limit ist 1,500 neue Aufträge pro 3 Stunden Periode pro Konto.

# Staging Zertifikatshierarchie

Die Staging-Umgebung hat eine Zertifikatshierarchie, die [Produktionsumgebungen emuliert](/certificates).

## Zwischenzertifikate (Intermediate-Zertifikate)

Die Staging-Umgebung verfügt über zwei aktive Zwischenzertifikate: ein RSA-Zwischenzertifikat ["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) und ein ECDSA-Zwischenzertifikat ["(STAGING) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

Die ECDSA-Ausgabe wurde am 24. März 2021 [in Staging aktiviert](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) und alle Anforderungen für Staging-Zertifikate mit ECDSA-Schlüsseln werden von "(STAGING) Ersatz Edamame E1" signiert und verwenden die ECDSA-Hierarchie. Ebenso werden alle Anforderungen für Staging-Zertifikate mit RSA-Schlüsseln von „(STAGING) Artificial Apricot R3“ signiert und verwenden die RSA-Hierarchie. Es gibt keine Möglichkeit, ein RSA-signiertes Zertifikat für einen ECDSA-Schlüssel zu erhalten, und auch nicht umgekehrt; um zu bestimmen, welchen Zertifikatsaussteller Sie erhalten, wählen Sie aus, welche Art von Schlüssel Sie lokal generieren.

## Wurzelzertifikate (Root-Zertifikate)

Die Staging-Umgebung hat zwei aktive Root-Zertifikate, die in Browser-/Client-Truststores **nicht vorhanden** sind: "(STAGING) Pretend Pear X1" und "(STAGING) Bogus Broccoli X2". Wenn Sie einen Test-Client so verändern möchten, dass er der Staging-Umgebung zu Testzwecken vertraut, können Sie dies tun, indem Sie die ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) und/oder ["(STAGING) Bogus Broccoli X2"](/certs/staging/letsencrypt-stg-root-x2.pem) Zertifikate zu Ihrem Test-Truststore hinzufügen. Alle unsere Staging-Zertifikate finden Sie [hier](https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Wichtig: Fügen Sie den Staging-Root oder das Zwischenzertifikat nicht zu einem Truststore hinzu, den Sie für das normale Browsen oder für andere Aktivitäten verwenden, da diese nicht geprüft werden oder den gleichen Standards wie unsere Produktionsstammsätze entsprechen als Tests.

# Zertifikat Transparenz

Die Staging-Umgebung übermittelt Vorzertifikate an die CT-Testprotokolle von Let's Encrypt [Sapling](/docs/ct-logs) und Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) und schließt zurückgegebene SCTs in die ausgestellten Zertifikate ein.

# Kontinuierliche Integration/Entwicklertests

Die Staging-Umgebung hat grosszügige Rate Limits zum Testen, aber passt nicht für Integration in Entwicklungsumgebungen oder Kontinuierliche Integration (CI). Netzwerkanfragen zu externen Servern können Instabilitäten verursachen und die Staging-Umgebung ermöglicht keinen "Fake"-DNS oder Challenge Validation, was das Testen komplizierter macht.

Zusätzlich zur Staging-Umgebung bietet Let's Encrypt einen kleinen ACME Server zum Einbau in CI und Entwicklungsumgebungen namens [Pebble](https://github.com/letsencrypt/pebble) an. Es ist [schnell und einfach](https://github.com/letsencrypt/pebble#docker), Pebble in Ihrer Entwicklungsmaschine oder in einer CI Umgebung zu starten.
