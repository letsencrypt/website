---
title: Zertifikate sperren
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

Wenn ein zu einem Zertifikat dazugehöriger privater Schlüssel nicht länger
sicher ist, sollten Sie das Zertifikat sperren. Das kann aus
unterschiedlichen Gründen passieren. Zum Beispiel, Sie haben unglücklicherweise
den privaten Schlüssel auf einer öffentlichen Webseite geteilt;
Hacker haben Ihren privaten Schlüssel von Ihren Servern kopiert; oder
Hacker haben temporär Kontrolle über Ihre Server oder Ihre DNS Konfiguration
erhalten und benutzten das zum Validieren und Ausstellen eines Zertifikats,
für den sie den privaten Schlüssel besitzen.

Wenn Sie ein Let's Encrypt Zertifikat sperren, wird Let's Encrypt die
Sperrinformationen durch das [Online Certificate Status Protocol 
(OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)
veröffentlichen und einige Browser werden OCSP überprüfen, ob sie
einem Zertifikat vertrauen sollten.
Beachten Sie, dass OCSP [einige grundlegende Probleme
hat](https://www.imperialviolet.org/2011/03/18/revocation.html), sodass
nicht alle Browser diese Überprüfen machen werden. Trotzdem, Sperren
von Zertifikaten, die einen kompromitierten privaten Schlüssel haben,
ist eine wichtige Praxis und ist erforderlich vom Let's Encrypt's
{{<link "Subscriber Agreement" "/repository" >}}.

Um ein Zertifikat mit Let's Encrypt zu sperren, werden Sie die [ACME
API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)
benutzen, meist durch einen ACME Client wie [Certbot](https://certbot.eff.org/).
Sie müssen gegenüber Let's Encrypt bestätigen, dass Sie die Berechtigung
zum Sperren des Zertifikats haben. Es gibt drei Wege, das zu tun:

# Vom Konto, dass das Zertifikat ausgestellt hat.

Wenn Sie ursprünglich das Zertifikat ausgestellt haben und weiterhin
Kontrolle über das Konto, welches Sie benutzten, haben, können Sie Ihre
Kontoanmeldeinformationen benutzen, welches das Zertifikat ausgestellt hat.
Certbot wird das standardmässig machen. Beispiel:

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Benutzen des privaten Schlüssels des Zertifikats

Wenn Sie nicht das Zertifikat ausgestellt haben, aber noch eine Kopie des
zugehörigen privaten Schlüssels haben, können Sie das Zertifikat unter Benutzung
des privaten Schlüssels sperren, indem Sie den Sperrauftrag signieren.
Zum Beispiel, wenn Sie sehen, dass der private Schlüssel unglücklicherweise
veröffentlich wurde, können Sie diese Methode zum Sperren des Zertifikats benutzen,
wenn Sie nicht die Person sind, die das Zertifikat ursprünglich ausgestellt hat.

Um diese Methode zu benutzen, müssen Sie zuerst das Zertifikat, welches gesperrt
werden soll, herunterladen. Let's Encrypt speichert alle Logs zu Zertifikaten
auf [Certificate Transparency](https://www.certificate-transparency.org/),
so finden Sie es und können das Zertifikat von einem Logmonitor herunterladen, wie
[crt.sh](https://crt.sh/).

Sie brauchen auch eine Kopie des privaten Schlüssels im PEM Format. Wenn Sie alles
zusammen haben, können Sie das Zertifikat sperren:

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# Benutzung eines unterschiedlich autorisierten Kontos

Wenn irgendjemand ein Zertifikat ausgestellt hat, nachdem Ihr Server oder Ihr DNS
kompromitiert wurde, möchten Sie das Zertifikat erneut sperren. Um die Richtigkeit
der Sperrung sicherzustellen, brauch Let's Encrypt die Sicherheit, dass Sie die
Kontrolle über Ihren Domainamen, in dem sich das Zertifikat befindet, haben
(andererseits könnten Leute jede anderen Zertifikate ohne Erlaubnis sperren)!
Zur Überprüfung dieser Kontrolle benutzt Let's Encrypt dieselben Methoden
wie unter Validierung bei der Ausstellung. Sie können einen [Eintrag in DNS TXT
](https://tools.ietf.org/html/rfc8555#section-8.4) machen,
eine [Datei auf Ihren HTTP Server](https://tools.ietf.org/html/rfc8555#section-8.3)
ablegen oder bieten ein [spezielles TLS Zertifikat](https://tools.ietf.org/html/rfc8737#section-3).
Im Allgemeinen wird ein ACME Client das alles für Sie erledigen. Beachten Sie, 
dass die meisten ACME CLients Validierung und Ausstellung kombinieren, der
einzige Weg nach einer Validierung zu fragen, ist der Weg der Ausstellung.
Sie können das Zertifikat im Ergebnis wieder sperren, wenn Sie es nicht
möchten oder zerstören Sie einfach den privaten Schlüssel. Wenn Sie die
Ausstellung eines Zertifikats im Allgemeinen verhindern möchten, können Sie
eine nichtexistierende Domain auf der Kommandozeile verwenden, was dazu führt,
dass die Ausstellung fehlschlägt bei gleichzeitiger Validierung der anderen
existierenden Domainnamen. Um das zu machen, führen Sie aus:

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Und folgen Sie den Anweisungen. Wenn Sie die Validierung über HTTP dem DNS
bevorzugen, ersetzen Sie  das `--preferred-challenges` Flag mit
`--preferred-challenges=http`.

Nur wenn Sie validierte Kontrolle über all die Domainnamen in dem
Zertifikat, welches Sie sperren möchten, haben, können Sie das
Zertifikat herunterladen von [crt.sh](https://crt.sh/),
und fahren Sie mit dem Sperren des Zertifikats fort, als wenn Sie
es ausgestellt haben:

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
