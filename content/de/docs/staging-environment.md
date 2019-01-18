---
title: Staging-Umgebung
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2018-03-12
---

{{< lastmod >}}

Wir empfehlen dringend das Testen gegen unser Staging-Umgebung, bevor die Produktionsumgebung benutzt wird. Das wird Ihnen erlauben, die Dinge richtig zu machen, bevor vertrauenswürdige Zertifikate ausgestellt werden und reduziert das Risiko, gegen Rate Limits zu laufen.

Die ACME URL für unsere Staging-Umgebung lautet:

`https://acme-staging.api.letsencrypt.org/directory`

Wenn Sie Certbot benutzen, können Sie unsere Staging-Umgebung mit dem `--staging` Flag benutzen. Für andere ACME Clients lesen Sie bitte die Instruktionen für Informationen zum Testen mit unserer Staging-Umgebung.

Die ACME URL für unsere [ACME v2 Staging-Umgebung](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) ist:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Wenn Sie Certbot benutzen, können Sie unsere Staging-Umgebung mit dem `--staging` Flag benutzen. Für andere ACME Clients lesen Sie bitte die Instruktionen für Informationen zum Testen mit unserer Staging-Umgebung. Beachten Sie, die v2 Staging-Umgebung benötigt einen v2 kompatiblen ACME Client.

# Rate Limits

Dei Staging-Umgebung benutzt dieselben Rate Limits wie [beschrieben für unsere Produktionsumgebung](/docs/rate-limits/) mit den folgenden Ausnahmen:

* Das **Certificates per Registered Domain** Limit ist 30,000 pro Woche.
* Das **Duplicate Certificate** Limit ist 30,000 pro Woche.
* Das **Failed Validations** Limit ist 60 pro Stunde.
* Das **Accounts per IP Address** Limit ist 50 Accounts pro 3 Stunden Periode pro IP.
* Für ACME v2, das **New Orders** Limit ist 1,500 neue Order pro 3 Stundne Periode pro Account.

# Root Zertifikate

Das Zwischenzertifikat der Staging-Umgebung (["Fake LE Intermediate X1"] (/certs/fakeleintermediatex1.pem)) wird von einem Stammzertifikat ausgestellt, **das in Browser-/Client-Truststores nicht vorhanden** ist. Wenn Sie einen Test-Only-Client so ändern möchten, dass er der Testumgebung zu Testzwecken vertraut, können Sie das Zertifikat ["Fake LE Root X1"] (/certs/fakelerootx1.pem) Ihrem Test-Truststore hinzufügen. Wichtig: Fügen Sie den Staging-Stamm oder das Zwischenprodukt nicht zu einem Truststore hinzu, den Sie für das normale Browsen oder für andere Aktivitäten verwenden, da diese nicht geprüft werden oder den gleichen Standards wie unsere Produktionsstammsätze entsprechen als Tests.

# Zertifikat Transparenz

Die Staging-Umgebung sendet Vorzertifikate zu Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test log und includiert zurückgeführte SCTs in das ausgestellte Zertifikat.
