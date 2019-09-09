---
title: Wie es funktioniert
slug: how-it-works
top_graphic: 3
lastmod: 2019-09-09
---

Das Ziel von Let's Encrypt und des [ACME-Protokolls](https://ietf-wg-acme.github.io/acme/) besteht darin, die Einrichtung eines HTTPS-Servers zu ermöglichen, der automatisch ein vertrauenswürdiges Browserzertifikat ohne menschliches Eingreifen erhält. Dies wird durch Ausführen eines Zertifikatsverwaltungsagenten auf dem Webserver erreicht.

Um zu verstehen, wie die Technologie funktioniert, gehen wir die Einrichtung von `https://example.com/` mit einem Zertifikatsverwaltungsagenten durch, der Let's Encrypt unterstützt.

Dieser Prozess umfasst zwei Schritte. Zunächst weist der Agent der Zertifizierungsstelle nach, dass der Webserver eine Domain kontrolliert. Anschliessend kann der Agent Zertifikate für diese Domain anfordern, erneuern und widerrufen.


## Domain-Validierung

Let's Encrypt identifiziert den Serveradministrator anhand des öffentlichen Schlüssels. Wenn die Agentensoftware zum ersten Mal mit Let's Encrypt interagiert, generiert sie ein neues Schlüsselpaar und weist der Let's Encrypt-Zertifizierungsstelle nach, dass der Server eine oder mehrere Domain kontrolliert. Dies ist vergleichbar mit dem traditionellen CA-Verfahren, bei dem ein Konto erstellt und diesem Konto Domains hinzugefügt werden.

Um den Prozess zu starten, fragt der Agent die Let's Encrypt-Zertifizierungsstelle, was zu tun ist, um zu beweisen, dass sie `example.com` kontrolliert. Die Let's Encrypt-Zertifizierungsstelle prüft den angeforderten Domainnamen und gibt eine oder mehrere Herausforderungen heraus. Dies sind verschiedene Möglichkeiten, mit denen der Agent die Kontrolle über die Domain nachweisen kann. Beispielsweise kann die Zertifizierungsstelle dem Agenten die Wahl zwischen folgenden Optionen geben:

* Bereitstellung eines DNS-Eintrags unter `example.com` oder
* Bereitstellung einer HTTP-Ressource unter einem bekannten URI unter `http://example.com/`

Neben den Herausforderungen bietet die Let's Encrypt-Zertifizierungsstelle auch eine Nonce, die der Agent mit seinem privaten Schlüsselpaar signieren muss, um zu beweisen, dass er das Schlüsselpaar kontrolliert.


<div class="howitworks-figure">
<img alt="Aufforderung zur Validierung von example.com stellen"
     src="/images/howitworks_challenge.png"/>
</div>

Die Agentensoftware erfüllt eine der gestellten Herausforderungen. Nehmen wir an, sie ist in der Lage, die zweite Aufgabe oben auszuführen: Sie erstellt eine Datei in einem angegebenen Pfad auf der Website `http://example.com`. Der Agent signiert die bereitgestellte Nonce ausserdem mit seinem privaten Schlüssel. Nachdem der Agent diese Schritte ausgeführt hat, benachrichtigt er die Zertifizierungsstelle, dass sie zur Validierung bereit ist.

Dann ist es die Aufgabe der Zertifizierungsstelle, zu überprüfen, ob die Aufforderungen erfüllt sind. Die Zertifizierungsstelle überprüft die Signatur auf der Nonce und versucht, die Datei vom Webserver herunterzuladen und sicherzustellen, dass sie den erwarteten Inhalt hat.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Wenn die Signatur über die Nonce gültig ist und die Herausforderungen ausgecheckt werden, ist der durch den öffentlichen Schlüssel identifizierte Agent berechtigt, die Zertifikatsverwaltung für `example.com` durchzuführen. Wir nennen das Schlüsselpaar, dass der Agent ein "autorisiertes Schlüsselpaar" für `example.com` verwendet hat.

## Zertifikatausstellung und Widerruf

Wenn der Agent über ein autorisiertes Schlüsselpaar verfügt, ist das Anfordern, Erneuern und Sperren von Zertifikaten ganz einfach: Senden Sie einfach Zertifikatsverwaltungsnachrichten und signieren Sie sie mit dem autorisierten Schlüsselpaar.

Um ein Zertifikat für die Domain zu erhalten, erstellt der Agent eine PKCS#10-Anforderung [Zertifikatsignierungsanforderung](https://tools.ietf.org/html/rfc2986), in der die Let's Encrypt-Zertifizierungsstelle aufgefordert wird, ein Zertifikat für example.com mit einem angegebenen öffentlichen Schlüssel auszustellen. Wie üblich enthält der CSR eine Signatur des privaten Schlüssels, der dem öffentlichen Schlüssel in dem CSR entspricht. Der Agent signiert ausserdem die gesamte CSR mit dem autorisierten Schlüssel für `example.com`, damit die Let's Encrypt-Zertifizierungsstelle weiss, dass sie autorisiert ist.

Wenn die Let's Encrypt-Zertifizierungsstelle die Anforderung erhält, werden beide Signaturen überprüft. Wenn alles gut aussieht, wird ein Zertifikat für `example.com` mit dem öffentlichen Schlüssel aus dem CSR ausgestellt und an den Agenten zurückgegeben.

<div class="howitworks-figure">
<img alt="Anfordern eines Zertifikats für example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Der Widerruf funktioniert auf ähnliche Weise. Der Agent unterzeichnet eine Sperranforderung mit dem für `example.com` autorisierten Schlüsselpaar, und die Let's Encrypt-Zertifizierungsstelle überprüft, ob die Anforderung autorisiert ist. In diesem Fall werden Sperrinformationen in den normalen Sperrkanälen (z.B. OCSP) veröffentlicht, sodass vertrauende Parteien wie Browser wissen können, dass sie das widerrufene Zertifikat nicht akzeptieren sollten.

<div class="howitworks-figure">
<img alt="Anfrage zum Widerruf eines Zertifikats für example.com"
     src="/images/howitworks_revocation.png"/>
</div>
