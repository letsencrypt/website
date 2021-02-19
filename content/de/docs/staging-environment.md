---
title: Staging-Umgebung
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2020-01-21
---

{{< lastmod >}}

Wir empfehlen dringend das Testen gegen unsere Staging-Umgebung, bevor die Produktionsumgebung benutzt wird. Das wird Ihnen erlauben, die Dinge richtig zu machen, bevor vertrauenswürdige Zertifikate ausgestellt werden und reduziert das Risiko, gegen Rate Limits zu laufen.

Die ACME URL für unsere [ACME v2 Staging-Umgebung](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) ist:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Wenn Sie Certbot benutzen, können Sie unsere Staging-Umgebung mit dem `--dry-run` Flag benutzen. Für andere ACME Clients lesen Sie bitte die Instruktionen für Informationen zum Testen mit unserer Staging-Umgebung. Beachten Sie, die v2 Staging-Umgebung benötigt einen v2 kompatiblen ACME Client.

# Rate Limits

Die Staging-Umgebung benutzt dieselben Rate Limits wie [beschrieben für unsere Produktionsumgebung](/docs/rate-limits) mit den folgenden Ausnahmen:

* Das **Zertifikate pro registrierte Domain** Limit ist 30,000 pro Woche.
* Das **Doppelte Zertifikate** Limit ist 30,000 pro Woche.
* Das **Fehlgeschlagene Validierungen** Limit ist 60 pro Stunde.
* Das **Konten pro IP-Adresse** Limit ist 50 Accounts pro 3 Stunden Periode pro IP.
* Für ACME v2, das **Neue Aufträge** Limit ist 1,500 neue Aufträge pro 3 Stunden Periode pro Konto.

# Root Zertifikate

Das Zwischenzertifikat der Staging-Umgebung (["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem)) wird von einem Root-Zertifikat ausgestellt, **das in Browser-/Client-Truststores nicht vorhanden** ist. Wenn Sie einen Test-Only-Client so ändern möchten, dass er der Testumgebung zu Testzwecken vertraut, können Sie das Zertifikat ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) Ihrem Test-Truststore hinzufügen. Wichtig: Fügen Sie den Staging-Root oder das Zwischenzertifikat nicht zu einem Truststore hinzu, den Sie für das normale Browsen oder für andere Aktivitäten verwenden, da diese nicht geprüft werden oder den gleichen Standards wie unsere Produktionsstammsätze entsprechen als Tests.

# Zertifikat Transparenz

Die Staging-Umgebung sendet Vorzertifikate zu Let's Encrypt [Testflume](/docs/ct-logs) und Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test log und behält die erhaltenen SCTs in den ausgestellten Zertifikaten.

# Kontinuierliche Integration/Entwicklertests

Die Staging-Umgebung hat grosszügige Rate Limits zum Testen, aber passt nicht für Integration in Entwicklungsumgebungen oder Kontinuierliche Integration (CI). Netzwerkanfragen zu externen Servern können Instabilitäten verursachen und die Staging-Umgebung ermöglicht keinen "Fake"-DNS oder Challenge Validation, was das Testen komplizierter macht.

Zusätzlich zur Staging-Umgebung bietet Let's Encrypt einen kleinen ACME Server zum Einbau in CI und Entwicklungsumgebungen namens [Pebble](https://github.com/letsencrypt/pebble) an. Es ist [schnell und einfach](https://github.com/letsencrypt/pebble#docker), Pebble in Ihrer Entwicklungsmaschine oder in einer CI Umgebung zu starten.
