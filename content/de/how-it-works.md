---
title: Wie es funktioniert
linkTitle: Wie Let’s Encrypt funktioniert
slug: how-it-works
lastmod: 2024-06-26
show_lastmod: 1
---


Das Ziel von Let's&nbsp;Encrypt und des [ACME-Protokolls](https://tools.ietf.org/html/rfc8555) besteht darin, die Einrichtung eines HTTPS-Servers zu ermöglichen, der automatisch ein vertrauenswürdiges Browserzertifikat ohne menschliches Eingreifen erhält.  Dies wird durch Ausführen eines Zertifikatsverwaltungsagenten auf dem Webserver erreicht.

Um zu verstehen, wie die Technologie funktioniert, gehen wir die Einrichtung von `https://example.com/` mit einem Zertifikatsverwaltungsagenten durch, der Let's&nbsp;Encrypt unterstützt.

Dieser Prozess umfasst zwei Schritte.  Zunächst weist der Agent der Zertifizierungsstelle nach, dass der Webserver eine Domain kontrolliert.  Anschließend kann der Agent Zertifikate für diese Domain anfordern, erneuern und widerrufen.

## Domain-Validierung

Let's&nbsp;Encrypt identifiziert den Serveradministrator anhand des öffentlichen Schlüssels.  Wenn die Agentensoftware zum ersten Mal mit Let's&nbsp;Encrypt interagiert, generiert sie ein neues Schlüsselpaar und weist der Let's&nbsp;Encrypt-Zertifizierungsstelle nach, dass der Server eine oder mehrere Domain kontrolliert.  Dies ist vergleichbar mit dem traditionellen CA-Verfahren, bei dem ein Konto erstellt und diesem Konto Domains hinzugefügt werden.

Um den Prozess zu starten, fragt der Agent die Let's Encrypt-Zertifizierungsstelle, was zu tun ist, um zu beweisen, dass sie `example.com` kontrolliert.  Die Let's Encrypt-Zertifizierungsstelle prüft den angeforderten Domainnamen und gibt eine oder mehrere Herausforderungen heraus.   Es gibt verschiedene Möglichkeiten, mit denen der Agent die Kontrolle über die Domain nachweisen kann.  Beispielsweise kann die Zertifizierungsstelle dem Agenten die Wahl zwischen folgenden Optionen geben:

* Bereitstellung eines DNS-Eintrags unter `example.com` oder
* Bereitstellung einer HTTP-Ressource unter einer bekannten URI unter `http://example.com/`

Neben den Herausforderungen bietet die Let's Encrypt-Zertifizierungsstelle auch eine Nonce, die der Agent mit seinem privaten Schlüsselpaar signieren muss, um zu beweisen, dass er das Schlüsselpaar kontrolliert.

<div class="howitworks-figure">
<img alt="Aufforderung zur Validierung von example.com stellen"
     src="/images/howitworks_challenge.png"/>
</div>

Die Agentensoftware erfüllt eine der gestellten Herausforderungen.   Nehmen wir an, sie ist in der Lage, die zweite Aufgabe oben auszuführen: Sie erstellt eine Datei in einem angegebenen Pfad auf der Website `http://example.com`.  Der Agent signiert die bereitgestellte Nonce außerdem mit seinem privaten Schlüssel.  Nachdem der Agent diese Schritte ausgeführt hat, benachrichtigt er die Zertifizierungsstelle, dass sie zur Validierung bereit ist.

Dann ist es Aufgabe der CA zu überprüfen, ob die Herausforderungen von [aus mehreren Netzwerkperspektiven](/2020/02/19/multi-perspective-validation) erfüllt wurden.  Die Zertifizierungsstelle überprüft die Signatur auf der Nonce und versucht, die Datei vom Webserver herunterzuladen und sicherzustellen, dass sie den erwarteten Inhalt hat.

<div class="howitworks-figure">
<img alt="Erfordert Autorisierung um für example.com zu agieren"
     src="/images/howitworks_authorization.png"/>
</div>

Wenn die Signatur über die Nonce gültig ist und die Herausforderungen ausgecheckt werden, ist der durch den öffentlichen Schlüssel identifizierte Agent berechtigt, die Zertifikatsverwaltung für `example.com` durchzuführen.  Wir nennen das Schlüsselpaar, dass der Agent ein "autorisiertes Schlüsselpaar" für `example.com` verwendet hat.


## Zertifikatausstellung und Widerruf

Wenn der Agent über ein autorisiertes Schlüsselpaar verfügt, ist das Anfordern, Erneuern und Sperren von Zertifikaten ganz einfach: Senden Sie einfach Zertifikatsverwaltungsnachrichten und signieren Sie sie mit dem autorisierten Schlüsselpaar.

Um ein Zertifikat für die Domain zu erhalten, erstellt der Agent eine PKCS#10-Anforderung [Zertifikatsignierungsanforderung](https://tools.ietf.org/html/rfc2986), in der die Let's&nbsp;Encrypt-Zertifizierungsstelle aufgefordert wird, ein Zertifikat für `example.com` mit einem angegebenen öffentlichen Schlüssel auszustellen.  Wie üblich enthält der CSR eine Signatur des privaten Schlüssels, der dem öffentlichen Schlüssel in dem CSR entspricht.  Der Agent signiert außerdem die gesamte CSR mit dem autorisierten Schlüssel für `example.com`, damit die Let's&nbsp;Encrypt-Zertifizierungsstelle weiß, dass sie autorisiert ist.

Wenn die Let's&nbsp;Encrypt-Zertifizierungsstelle die Anforderung erhält, werden beide Signaturen überprüft.  Wenn alles gut aussieht, wird ein Zertifikat für `example.com` mit dem öffentlichen Schlüssel aus dem CSR ausgestellt und an den Agenten zurückgegeben. Darüber hinaus wird die CA das Zertifikat in zahlreiche öffentliche Zertifikattransparenz-Protokolle (CT) einreichen. Siehe [hier](https://certificate.transparency.dev/howctworks/#pki) für weitere Details.

<div class="howitworks-figure">
<img alt="Anfordern eines Zertifikats für example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Der Widerruf funktioniert auf ähnliche Weise.  Der Agent unterzeichnet eine Sperranforderung mit dem für `example.com` autorisierten Schlüsselpaar, und die Let's&nbsp;Encrypt-Zertifizierungsstelle überprüft, ob die Anforderung autorisiert ist.  Wenn dies der Fall ist, veröffentlicht es die Sperrinformationen in den normalen Sperrkanälen (d. h. OCSP), so dass vertrauende Parteien wie Browser wissen, dass sie das widerrufene Zertifikat nicht akzeptieren sollten.

<div class="howitworks-figure">
<img alt="Anfrage zum Widerruf eines Zertifikats für example.com"
     src="/images/howitworks_revocation.png"/>
</div>

