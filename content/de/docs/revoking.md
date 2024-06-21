---
title: Widerruf von Zertifikaten
slug: revoking
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


Wenn ein Zertifikat nicht mehr sicher zu verwenden ist, sollten Sie es widerrufen. Dafür kann es verschiedene Gründe geben. So könnten Sie beispielsweise den privaten Schlüssel versehentlich auf einer öffentlichen Website weitergeben; Hacker könnten den privaten Schlüssel von Ihren Servern kopieren; oder Hacker könnten vorübergehend die Kontrolle über Ihre Server oder Ihre DNS-Konfiguration übernehmen und diese zur Validierung und Ausstellung eines Zertifikats verwenden, für das sie den privaten Schlüssel besitzen.

Wenn Sie ein Let's Encrypt-Zertifikat widerrufen, veröffentlicht Let's Encrypt diese Widerrufsinformationen über das [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), und einige Browser überprüfen OCSP, um festzustellen, ob sie einem Zertifikat vertrauen sollten. Beachten Sie, dass OCSP [einige grundsätzliche Probleme hat](https://www.imperialviolet.org/2011/03/18/revocation.html), so dass nicht alle Browser diese Prüfung durchführen. Dennoch ist der Widerruf von Zertifikaten, die kompromittierten privaten Schlüsseln zuzuordnen sind, eine wichtige Praxis und wird in der [Teilnehmervereinbarung](/repository) von Let's Encrypt gefordert.

Um ein Zertifikat mit Let's Encrypt zu widerrufen, verwenden Sie die [ACME API](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md), höchstwahrscheinlich über einen ACME Client wie [Certbot](https://certbot.eff.org/). Sie müssen Let's Encrypt gegenüber nachweisen, dass Sie berechtigt sind, das Zertifikat zu widerrufen. Es gibt drei Möglichkeiten, dies zu tun: über das Konto, das das Zertifikat ausgestellt hat, über ein anderes autorisiertes Konto oder über den privaten Schlüssel des Zertifikats.

# Angabe einer Begründung

Bei der Sperrung eines Zertifikats sollten Let's Encrypt-Abonnenten einen Grund angeben, der wie folgt lautet:

* Kein Grund angegeben oder `unspecified` (RFC 5280 CRLReason #0)
  - Wenn die nachstehenden Begründungen nicht auf den Antrag auf Widerruf zutreffen, darf der Teilnehmer keinen andere Begründung als "unspecified" angeben.
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Der Zertifikatsabonnent muss den Sperrgrund "keyCompromise" wählen, wenn er Grund zu der Annahme hat, dass der private Schlüssel seines Zertifikats kompromittiert wurde, z. B. wenn eine unbefugte Person Zugriff auf den privaten Schlüssel seines Zertifikats hatte.
  - Wenn die Widerrufsanforderung mit dem privaten Schlüssel des Zertifikats und nicht mit dem privaten Schlüssel eines Abonnentenkontos signiert wird, ignoriert Let's Encrypt möglicherweise den Widerrufsgrund in der Anforderung und setzt den Grund auf "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - Der Zertifikatsabonnent sollte den Sperrgrund " superseded" wählen, wenn er ein neues Zertifikat beantragt, um sein bestehendes Zertifikat zu ersetzen.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Der Zertifikatsabonnent sollte den Sperrgrund "cessationOfOperation" wählen, wenn er nicht mehr im Besitz aller Domainnamen des Zertifikats ist oder wenn er das Zertifikat nicht mehr verwenden wird, weil er seine Website einstellt.
  - Wenn die Widerrufsanforderung von einem Abonnentenkonto stammt, das das betreffende Zertifikat nicht bestellt hat, aber die Kontrolle über alle Identifikatoren im Zertifikat nachweist, kann Let's Encrypt den Widerrufsgrund in der Anforderung ignorieren und den Grund auf "cessationOfOperation" setzen.

Löschungsanträge, die einen anderen als den oben genannten Grund angeben, werden abgelehnt.

# Von dem Account, der das Zertifikat ausgestellt hat

Wenn Sie das Zertifikat ursprünglich ausgestellt haben und noch die Kontrolle über den Account haben, mit dem Sie es ausgestellt haben, können Sie es mit Ihren Account-Anmeldedaten widerrufen. Certbot wird dies standardmäßig versuchen. Beispiel:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Benutzung eines unterschiedlich autorisierten Kontos

Wenn jemand ein Zertifikat ausgestellt hat, nachdem er Ihren Host oder Ihr DNS kompromittiert hat, müssen Sie dieses Zertifikat widerrufen, sobald Sie die Kontrolle wiedererlangt haben. Um das Zertifikat zu widerrufen, muss Let's Encrypt sicherstellen, dass Sie die Kontrolle über die Domänennamen in diesem Zertifikat haben (andernfalls könnten sich die Leute gegenseitig die Zertifikate widerrufen, ohne die Erlaubnis zu haben)!

Um dieses Steuerelement zu validieren, verwendet Let's Encrypt die gleichen Methoden wie bei der Validierung von Steuerelementen für die Ausgabe: Sie können einen [Wert in einen DNS-TXT-Eintrag](https://tools.ietf.org/html/rfc8555#section-8.4) oder eine [Datei auf einem HTTP-Server](https://tools.ietf.org/html/rfc8555#section-8.3) einfügen. In der Regel übernimmt ein ACME Client diese Aufgabe für Sie. Beachten Sie, dass die meisten ACME-Clients Validierung und Ausstellung kombinieren, so dass die einzige Möglichkeit, nach Validierungen zu fragen, darin besteht, die Ausstellung zu versuchen. Sie können dann das resultierende Zertifikat widerrufen, wenn Sie es nicht mehr benötigen, oder den privaten Schlüssel einfach vernichten.

Wenn Sie die Ausstellung eines Zertifikats vermeiden möchten, können Sie einen nicht existierenden Domänennamen in Ihre Befehlszeile einfügen, was dazu führt, dass die Ausstellung fehlschlägt, während die anderen, existierenden Domänennamen weiterhin überprüft werden. Beispiel:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Und folgen Sie den Anweisungen. Wenn Sie lieber über HTTP als über DNS validieren möchten, ersetzen Sie das Flag `--preferred-challenges` durch `--preferred-challenges=http`.

Sobald Sie die Kontrolle über alle Domänennamen in dem zu widerrufenden Zertifikat validiert haben, können Sie das Zertifikat von [crt.sh](https://crt.sh/) herunterladen und das Zertifikat widerrufen, als ob Sie es ausgestellt hätten:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Verwendung des privaten Schlüssels des Zertifikats

Wenn Sie das Zertifikat ursprünglich nicht ausgestellt haben, aber über eine Kopie des zugehörigen privaten Schlüssels verfügen, können Sie es widerrufen, indem Sie diesen privaten Schlüssel zum Signieren des Widerrufsantrags verwenden. Wenn Sie z. B. feststellen, dass ein privater Schlüssel versehentlich veröffentlicht wurde, können Sie diese Methode verwenden, um Zertifikate zu widerrufen, die diesen privaten Schlüssel verwenden, auch wenn Sie nicht die Person sind, die diese Zertifikate ursprünglich erstellt hat.

Um diese Methode zu verwenden, benötigen Sie zunächst eine Kopie des privaten Schlüssels im PEM-Format.

Laden Sie dann das zu widerrufende Zertifikat herunter, falls Sie es noch nicht haben. Let's Encrypt protokolliert alle Zertifikate in [Certificate Transparency](https://www.certificate-transparency.org/)-Protokollen, so dass Sie Zertifikate über einen Protokollmonitor wie [crt.sh](https://crt.sh/) finden und herunterladen können. Die Suche nach einem passenden `SubjectPublicKeyInfo` (SPKI) Feld findet alle Zertifikate, die den privaten Schlüssel verwenden. Um den SPKI-Hash aus einem privaten Schlüssel zu extrahieren:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Sobald Sie den privaten Schlüssel und das Zertifikat haben, können Sie das Zertifikat wie folgt widerrufen:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
