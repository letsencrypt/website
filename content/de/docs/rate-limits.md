---
title: Rate Limits
slug: rate-limits
date: 2018-01-04
lastmod: 2021-10-05
show_lastmod: 1
---


Let's Encrypt erstellt Rate Limits, um eine faire Benutzung durch so viele Leute wie möglich sicherzustellen. Wir glauben, dass Rate Limits für die meisten Leute hoch genug sind. Wir haben sie auch so gestaltet, dass das Erneuern eines Zertifikats niemals in ein Rate Limit läuft, sodass auch große Organisationen eine große Anzahl an Zertifikaten ausstellen können, ohne ein Eingreifen von Let's Encrypt zu benötigen.

Wenn Sie aktiv einen Let's Encrytpt Client entwickeln oder testen, benutzen Sie bitte unsere [Staging-Umgebung](/docs/staging-environment) anstatt die Produktions-API. Wenn Sie an der Integration von Let's Encrypt als Provider oder einer großen Website arbeiten, [lesen Sie bitte unsere Integrationsanleitung](/docs/integration-guide).

Das Hauptlimit ist <a id="certificates-per-registered-domain"></a>**Zertifikate pro registrierter Domain** (50 pro Woche). Eine registrierte Domain ist, generell gesehen, der Teil der Domain, den Sie von einem Domainregistrar gekauft haben. Zum Beispiel ist im Namen `www.example.com` die registrierte Domain `example.com`. In `new.blog.example.co.uk` ist die registrierte Domain `example.co.uk`. Wir benutzen die [Public Suffix List](https://publicsuffix.org), um die registrierte Domain zu berechnen. Das Überschreiten des Limits der Zertifikate pro registrierter Domain wird mit der Fehlermeldung `too many certificates already issued` gemeldet, möglicherweise mit zusätzlichen Details.

Sie können alle 3 Stunden maximal 300 <a
id="new-orders"></a>**Neue Aufträge** pro Konto erstellen. Jedes Mal, wenn Sie ein Zertifikat von der Boulder CA anfordern, wird ein neuer Auftrag erstellt, das heißt, dass bei jeder Zertifikatsanforderung ein neuer Auftrag erstellt wird. Das Überschreiten des Limits für neue Aufträge wird mit der Fehlermeldung `too many new orders recently`.

Es ist möglich mehrere hostnames in einem Zertifikat zu kombinieren. Es ist limitiert auf 100 <a id="names-per-certificate"></a>**Namen pro Zertifikat**. Aus Sicht der Performance ist es besser, wenn möglich, weniger Namen pro Zertifikat zu verwenden.  Ein Zertifikat mit mehreren Namen wird oft SAN Zertifikat oder auch UCC Zertifikat genannt.

Aktualisierungen werden gesondert behandelt: sie zählen nicht in das **Zertifikate pro registrierte Domain** Limit, sondern in das [**Doppelte Zertifikate**]( /docs/duplicate-certificate-limit) Limit von 5 pro Woche. Überschreitet man das Doppelte Zertifikate Limit, dann erhält man die Fehlermeldung `too many certificates already issued for exact set of domains` (zu viele Zertifikate wurden beantragt für dasselbe Set an Domains).

Ein Zertifikat wird als erneuert (oder als Duplikat) eines früheren Zertifikats angesehen, wenn es dasselbe Set von hostnames enthält, ungeachtet der Groß-/Kleinschreibung und der Reihenfolge.  Wenn zum Beispiel ein neues Zertifikat für die Hostnamen [`www.example.com`, `example.com`] beantragt werden, kann man noch vier weitere Anträge für [`www.example.com`, `example.com`] in der Woche machen. Wenn das Set der Hostnamen geändert wurde durch Hinzufügen von [`blog.example.com`], ist es möglich ein zusätzliches Zertifikat zu beantragen.

Bei der Erneuerung werden der öffentliche Schlüssel und die beantragten Erweiterungen ignoriert. Die Zertifikatausstellung kann als Erneuerung betrachtet werden, auch wenn Sie einen neuen Schlüssel verwenden.

**Das Zurückziehen von Zertifikaten setzt die Ratenbeschränkungen nicht zurück**, da die für die Ausstellung dieser Zertifikate verwendeten Ressourcen bereits verbraucht wurden.

Es gibt ein <a id="failed-validations"></a>[**Failed Validation**](/docs/failed-validation-limit) Limit von 5 Fehlversuchen pro Konto, pro Hostname, pro Stunde. Diese Grenze ist in unserer [Staging-Umgebung](/docs/staging-environment) höher, so dass Sie diese Umgebung zum Debuggen von Konnektivitätsproblemen verwenden können. Das Überschreiten des Limits für fehlgeschlagene Validierungen wird mit der Fehlermeldung `zu viele fehlgeschlagene Autorisierungen in letzter Zeit` gemeldet.

Die API-Endpunkte "new-nonce", "new-account", "new-order" und "revoke-cert" haben ein <a id="overall-requests"></a>**Gesamtanfragen** Limit von 20 pro Sekunde. Der Endpunkt "/directory" und das Verzeichnis "/acme" & Unterverzeichnisse haben ein Limit von insgesamt 40 Anfragen pro Sekunde.

Es gibt noch zwei weitere Einschränkungen, die Sie wahrscheinlich nicht treffen werden.

Sie können maximal 10 <a id="accounts-per-ip-address"></a>[**Accounts pro IP-Adresse**](/docs/too-many-registrations-for-this-ip) innerhalb von 3 Stunden erstellen. Sie können maximal 500 **Accounts pro IP-Bereich** innerhalb eines IPv6 /48 pro 3 Stunden erstellen. Das Erreichen eines der beiden Kontoraten-Limits ist sehr selten, und wir empfehlen großen Integratoren, ein Design [zu bevorzugen, das ein Konto für viele Kunden verwendet](/docs/integration-guide). Das Überschreiten dieser Grenzen wird mit der Fehlermeldung `zu viele Registrierungen für diese IP` oder `zu viele Registrierungen für diesen IP-Bereich` gemeldet.

Sie können maximal 300 <a id="pending-authorizations"></a>**ausstehende Genehmigungen** in Ihrem Konto haben. Das Überschreiten dieser Ratengrenze ist selten und kommt am häufigsten bei der Entwicklung von ACME-Clients vor. In der Regel bedeutet dies, dass Ihr Client Berechtigungen erstellt, diese aber nicht einhält. Bitte verwenden Sie unsere [Staging-Umgebung](/docs/staging-environment), wenn Sie einen ACME-Client entwickeln. Das Überschreiten des Limits für ausstehende Berechtigungen wird mit der Fehlermeldung `zu viele derzeit ausstehende Berechtigungen` gemeldet.

# <a id="overrides"></a>Überschreibungen

Wenn Sie ein Rate Limit erreicht haben, gibt es keinen Weg, diesen temporär zurückzusetzen. Sie müssen warten, bis das Rate Limit nach einer Woche abgelaufen ist. Wenn Sie 25 Zertifikate am Montag ausstellen und 25 mehr am Freitag, so sind sie wieder ab Montag in der Lage, neue Zertifikate auszustellen. Sie können eine Liste von Zertifikaten ausgestellt für Ihre registrierte Domain erhalten von [crt.sh](https://crt.sh), welches die öffentliche [Certificate Transparency](https://www.certificate-transparency.org) Logs benutzt.

Wenn Sie ein grosser Hosting-Provider sind oder eine Organisation, die an einer Let's Encrypt Integration arbeitet, haben wir ein [Rate Limit Formular](https://isrg.formstack.com/forms/rate_limit_adjustment_request), welches zur Anfrage nach höheren Limits benutzt werden kann. Die Bearbeitung der Anfrage dauert ein paar Wochen, das heisst das Formular ist nicht zweckdienlich zum Zurücksetzen eines bestehendes Rate Limits, in das Sie reingelaufen sind.

# <a id="clearing-pending"></a>Ausstehende Autorisierungen bereinigen

Wenn Sie eine große Anzahl ausstehender Autorisierungsobjekte haben und einen Ratenbegrenzungsfehler für ausstehende Autorisierungen erhalten, können Sie einen Validierungsversuch auslösen, indem Sie einen JWS-signierten POST an eine seiner challenges senden, wie in [ACME-Spezifikation](https://tools.ietf.org/html/rfc8555#section-7.5.1) beschrieben. Die ausstehenden Autorisierungsobjekte werden durch URLs im Format `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ` dargestellt und sollten in Ihren Clientprotokollen angezeigt werden. Dabei ist es egal, ob die Validierung erfolgreich ist oder fehlschlägt. Bei beiden wird die Autorisierung aus dem Status „ausstehend“ genommen. Wenn Sie keine Protokolle mit den relevanten Autorisierungs-URLs haben, müssen Sie warten, bis die Ratenbegrenzung abgelaufen ist. Wie oben beschrieben, gibt es ein gleitendes Zeitfenster, sodass dies je nach Ausstellungsmuster weniger als eine Woche dauern kann.

Beachten Sie, dass eine große Anzahl ausstehender Autorisierungen im Allgemeinen das Ergebnis eines fehlerhaften Clients ist. Wenn Sie dieses Ratenlimit häufig erreichen, sollten Sie Ihren Client-Code überprüfen.
