---
title: Rate Limits
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-06-04
---

{{< lastmod >}}

Let's Encrypt erstellt Rate Limits, um eine faire Benutzung durch so viele
Leute wie möglich sicherzustellen. Wir glauben, dass Rate Limits hoch genug
sind für die meisten Leute. Wir haben es auch so gestaltet, dass das
Erneuern eines Zertifikats niemals in ein Rate Limit läuft, sodass auch
grosse Organisationen eine grosse Anzahl an Zertifikaten ausstellen können,
ohne die Intervention von Let's Encrypt zu benötigen.

Wenn Sie aktiv einen Let's Encrytpt Client entwickeln oder testen, bitte
benutzen Sie unsere [Staging Umgebung](/docs/staging-environment) anstatt
die Produktions API.
Wenn Sie an der Integration von Let's Encrypt als Provider arbeiten oder
einer grossen Webseite bitte [lesen Sie unseren Integration Guide](/docs/integration-guide).

Das Hauptlimit ist <a id="certificates-per-registered-domain"></a>**Zertifikate
 pro registrierte Domain** (50 pro Woche).
Eine registrierte Domain ist, generell gesehen, der Teil der Domain, den Sie
von einem Domainregistrar gekauft haben. Zum Beispiel, im Namen `www.example.com`,
ist die registrierte Domain `example.com`. In `new.blog.example.co.uk`,
ist die registrierte Domain `example.co.uk`. Wir benutzen die
[Public Suffix List](https://publicsuffix.org), um die registrierte Domain zu
berechnen.

Wenn Sie sehr viele Subdomains haben, möchten Sie vielleicht ein einfaches
Zertifikat kombinieren, bis zu einem Limit von 100 <a id="names-per-certificate"></a>**Namen
 per Zertifikat**. Kombiniert mit dem Limit darüber bedeutet das, Sie können
Zertifikate für bis zu 5000 einzigartige Subdomains pro Woche ausstellen.
Ein Zertifikat mit mehreren Namen wird oft SAN Zertifikat genannt, 
oder manchmal UCC Zertifikat. Hinweis: Aus Gründen der Leistung und Zuverlässigkeit
 sollten Sie nach Möglichkeit weniger Namen pro Zertifikat verwenden.

Verlängerungen werden speziell behandelt: Sie werden nicht auf Ihr 
**Zertifikat pro registrierter Domain**-Limit angerechnet, unterliegen jedoch einem 
**Duplikat-Zertifikat**-Limit von 5 pro Woche.
Hinweis: Verlängerungen wurden bis März 2019 gegen Ihr **Zertifikat pro registrierter Domain**-Limit
 angerechnet, [jetzt jedoch nicht mehr](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

Zum Beispiel, Sie fordern die Ausstellung eines Zertifikates mit dem Namen
[`www.example.com`, `example.com`], und Sie stellen 4 weitere Anträge auf Zertifikate
die Woche. Wenn Sie den Hostnamen ändern durch Hinzufügen von [`blog.example.com`],
werden Sie wieder in der Lage sein, Ausstellungsanfragen zu senden.

Bei der Erneuerungsbehandlung werden der öffentliche Schlüssel und die angeforderten
 Erweiterungen ignoriert. Eine Zertifikatsausstellung kann auch dann als Erneuerung
 betrachtet werden, wenn Sie einen neuen Schlüssel verwenden.

**Sperren von Zertifikaten setzt das Rate Limit nicht zurück**, weil die
Resourcen zum Ausstellen dieser Zertifikate schon konsumiert sind.

Es gibt ein <a id="failed-validations"></a>**Fehlgeschlagene Validierung**
Limit von 5 Fehlern pro Account, pro Hostname, pro Stunde. Dieses Limit
ist höher auf unserer [Staging Umgebung](/docs/staging-environment), so können Sie diese Umgebung zur Fehlersuche bei Verbindungsproblemen
benutzen.

Die "new-reg", "new-authz" und "new-cert" Endpunkte haben ein <a
id="overall-requests"></a>**Allgemeine Anfragen** Limit von 20 pro Sekunde.
Der "/directory" Endpunkt und das "/acme" Verzeichnis und Unterverzeichnisse
haben ein Allgemeines Anfragen Limit von 40 Anfragen pro Sekunde.

Wir haben noch zwei andere Limits, in die Sie sehr unwahrscheinlich
laufen werden.

Sie können maximal 10 <a id="accounts-per-ip-address"></a>**Konten pro IP-Adresse**
pro 3 Stunden erstellen. Sie können maximal 500 **Konten pro IP-Bereich**
mit einem IPv6 /48 pro 3 Stunden erstellen.
Es ist sehr selten, dass man in dieses Kontenlimit läuft und wir empfehlen,
dass grosse Integratoren ein Design von [ein Konto für viele Kunden](/docs/integration-guide)
verwenden.

Sie können ein Maximum von 300 <a id="pending-authorizations"></a>**Ausstehende
Autorisierungen** pro Konto haben. Das Erreichen dieses Rate Limits ist
selten und entsteht meistens bei der Entwicklung von ACME Clients.
Es bedeutet üblichrweise, dass Ihr Client Autorisierungsanfragen stellt,
diese aber nicht richtig verarbeiten kann.
Bitte benutzen Sie unsere [Staging Umgebung](/docs/staging-environment),
wenn Sie neue ACME Clients entwickeln.

Benutzer der ACME v2 API können ein Maximum von 300 <a
id="new-orders"></a>**Neue Aufträge** pro Konto pro 3 Stunden erstellen.

# <a id="overrides"></a>Überschreibungen

Wenn Sie ein Rate Limit erreicht haben, gibt es keinen Weg, diesen temporär
zurückzusetzen. Sie müssen warten, bis das Rate Limit nach einer Woche
abgelaufen ist. Wie benutzen ein bewegliches Fenster. Wenn Sie 25 Zertifikate
am Montag ausstellen und 25 mehr am Freitag, so sind sie wieder ab Montag in
der Lage, neue Zertifikate auszustellen. Sie können eine Liste von
Zertifikaten ausgestellt für Ihre registrierte Domain erhalten von
[crt.sh](https://crt.sh), welches die öffentliche
[Certificate Transparency](https://www.certificate-transparency.org)
Logs benutzt.

Wenn Sie ein grosser Hosting-Provider sind oder eine Organisation, die an
einer Let's Encrypt Integration arbeitet, haben wir ein
[Rate Limit Formular](https://goo.gl/forms/plqRgFVnZbdGhE9n1), welches zur
Anfrage nach höheren Limits benutzt werden kann. Die Bearbeitung der Anfrage
dauert ein paar Wochen, das heisst das Formular ist nicht zweckdienlich zum
Zurücksetzen eines bestehendes Rate Limits, in das Sie reingelaufen sind.

Beachten Sie, dass die meisten Hosting-Provider keine Vergrösserung der
Rate Limits brauchen, weil es kein Limit an registrierten Domains und
eine Zertifikatsausstellung für diese gibt. Solange Ihre Kunden nicht mehr
als 5.000 Subdomains in einer registrierten Domain haben, brauchen Sie keine
Vergrösserung der Limits. Schauen Sie in unseren [Integration Guide](/docs/integration-guide) für mehr Anleitungen.

# <a id="clearing-pending"></a>Ausstehende Autorisierungen bereinigen

Wenn Sie eine grosse Anzahl von ausstehenden Autorisierungsanfragen haben
und dadurch in einen Rate Limit Fehler laufen, können Sie einen
Überprüfungsversuch für die Autorisierungsobjekte durch Absenden eines
JWS-Signierten POST absenden, wie in
[ACME spec](https://tools.ietf.org/html/rfc8555#section-7.5.1)
beschrieben.
Die ausstehenden Autorisierungsobjekte werden durch URLs in der Form
`https://acme-v02.api.letsencrypt.org/acme/authz/XYZ` dargestell und sollten in
Ihrem Client Log auftauchen. Beachten Sie, dass es keinen Unterschied macht,
ob die Validierung erfolgreich war oder nicht. Die Autorisierung wird immer
den Status ausserhalb von *pending* haben. Wenn Sie keine Logs mit relevanten
Autorisierungs-URLs haben, müssen Sie warten, bis das Rate Limit abgelaufen ist.
Wie oben beschrieben, ist es ein bewegliches Fenster, sodass es weniger als eine
Woche dauert, abhängig von ihrem Vorgehen bei der Ausstellung.

Beachten Sie, dass eine hohe Anzahl von ausstehenden Autorisierungen das Ergebnis
eines fehlerhaften Clients ist. Wenn Sie regelmässig in dieses Rate Limit laufen,
sollten Sie Ihren Client Code nochmals überprüfen.
