---
title: Zertifizierungsstellenberechtigung (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{<lastmod>}}

CAA ist eine Art DNS-Datensatz, mit dem Websitebesitzer angeben können, welche Zertifizierungsstellen (CAs) Zertifikate mit ihren Domänennamen ausstellen dürfen. Sie wurde 2013 von [RFC 6844](https://tools.ietf.org/html/rfc6844) standardisiert, um einer Zertifizierungsstelle die Möglichkeit zu geben, "das Risiko einer unbeabsichtigten falschen Ausgabe von Zertifikaten zu verringern." Standardmäßig kann jede öffentliche Zertifizierungsstelle Zertifikate für einen beliebigen Domänennamen im öffentlichen DNS ausstellen, sofern sie die Kontrolle über diesen Domänennamen überprüfen. Dies bedeutet, dass jeder Domänenname potenziell betroffen ist, wenn in einem der vielen Validierungsprozesse einer öffentlichen Zertifizierungsstelle ein Fehler auftritt. CAA bietet Domaininhabern die Möglichkeit, dieses Risiko zu reduzieren.

# CAA verwenden

Wenn Sie sich nicht für CAA interessieren, müssen Sie im Allgemeinen nichts tun (siehe jedoch unten die CAA-Fehler). Wenn Sie mithilfe von CAA einschränken möchten, welche Zertifizierungsstellen Zertifikate für Ihre Domäne ausstellen dürfen, müssen Sie einen DNS-Anbieter verwenden, der die Einstellung von CAA-Einträgen unterstützt. Suchen Sie in der [SSLAate CAA-Seite](https://sslmate.com/caa/support) nach einer Liste solcher Anbieter. Wenn Ihr Provider aufgeführt ist, können Sie mit dem [SSLMate CAA Record Generator](https://sslmate.com/caa/) eine Gruppe von CAA-Datensätzen generieren, in denen die CAs aufgelistet sind, die Sie zulassen möchten.

Let's Encrypts identifizierender Domainname für CAA ist `letsencrypt.org`. Dies ist offiziell dokumentiert [in unserer Certification Practice Statement (CPS), Abschnitt 4.2.1](https://letsencrypt.org/repository/).

## Wo soll der Datensatz abgelegt werden?

Sie können CAA-Einträge in Ihrer Hauptdomäne oder in einer beliebigen Tiefe der Unterdomäne festlegen. Wenn Sie beispielsweise "www.community.example.com" hätten, könnten Sie CAA-Einträge für den vollständigen Namen oder für "community.example.com" oder für "example.com" festlegen. CAs prüfen jede Version von links nach rechts und halten an, sobald sie einen CAA-Datensatz sehen. Ein CAA-Eintrag bei "community.example.com" hätte zum Beispiel Vorrang vor einem bei "example.com". Die meisten Benutzer, die CAA-Datensätze hinzufügen, möchten sie zu ihrer registrierten Domäne ("example.com") hinzufügen, damit sie für alle Unterdomänen gelten. Beachten Sie auch, dass CAA-Einträge für Unterdomänen Vorrang vor ihren übergeordneten Domänen haben, unabhängig davon, ob sie zulassender oder einschränkender sind. Eine Subdomain kann also eine Einschränkung lockern, die von einer übergeordneten Domain eingeführt wird.

Die CAA-Validierung folgt wie alle anderen DNS-Anforderungen CNAMEs. Wenn "www.community.example.com" ein CNAME für "web1.example.net" ist, fordert die Zertifizierungsstelle zuerst CAA-Einträge für "www.community.example.com" an und stellt dann fest, dass für diese Domäne ein CNAME vorhanden ist und fordert stattdessen CAA-Datensätze für `web1.example.net` an. Wenn ein Domänenname über einen CNAME-Eintrag verfügt, dürfen gemäß den DNS-Standards keine anderen Einträge vorhanden sein.

Der [CAA-RFC](https://tools.ietf.org/html/rfc6844) gibt ein zusätzliches Verhalten namens "Tree-Climbing" an, bei dem CAs auch die übergeordneten Domänen des Ergebnisses der CNAME-Auflösung überprüfen müssen. Dieses zusätzliche Verhalten wurde später von [ein Erratum](https://www.rfc-editor.org/errata/eid5065) entfernt, sodass es von Let's Encrypt und anderen CAs nicht implementiert wird.

# CAA-Fehler

Da Let's Encrypt CAA-Einträge vor jedem von uns ausgestellten Zertifikat prüft, werden manchmal Fehler angezeigt, selbst wenn Domänen keine CAA-Einträge festgelegt haben. Wenn wir einen Fehler erhalten, können Sie nicht feststellen, ob wir die Ausgabe für die betroffene Domäne durchführen dürfen, da CAA-Einträge vorhanden sein könnten, die die Ausgabe verbieten, jedoch aufgrund des Fehlers nicht sichtbar sind.

Wenn Sie CAA-bezogene Fehler erhalten, versuchen Sie es einige Male mit unserer [Staging-Umgebung](/docs/staging-environment /), um festzustellen, ob sie temporär oder permanent sind. Wenn sie dauerhaft sind, müssen Sie ein Support-Problem bei Ihrem DNS-Provider oder Switch-Provider einreichen. Wenn Sie nicht sicher sind, wer Ihr DNS-Anbieter ist, fragen Sie Ihren Hosting-Anbieter.

Einige DNS-Anbieter, die mit CAA nicht vertraut sind, antworten zunächst auf Problemberichte mit "Wir unterstützen keine CAA-Einträge". Ihr DNS-Anbieter muss CAA-Einträge nicht speziell unterstützen. es muss nur mit einer NOERROR-Antwort für unbekannte Abfragetypen (einschließlich CAA) antworten. Die Rückgabe anderer Opcodes, einschließlich NOTIMP, für nicht erkannte qtypes ist eine Verletzung von [RFC 1035](https://tools.ietf.org/html/rfc1035) und muss behoben werden.

# SERVFAIL

Einer der häufigsten Fehler, auf den Leute stoßen, ist SERVFAIL. Dies weist meistens auf einen Fehler bei der DNSSEC-Validierung hin. Wenn Sie einen SERVFAIL-Fehler erhalten, sollten Sie zunächst einen DNSSEC-Debugger wie [dnsviz.net](http://dnsviz.net/) verwenden. Wenn dies nicht funktioniert, können Ihre Nameserver nur dann falsche Signaturen generieren, wenn die Antwort leer ist. CAA-Antworten sind meistens leer. Beispielsweise hatte PowerDNS [diesen Fehler in Version 4.0.3 und darunter](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Wenn Sie DNSSEC nicht aktiviert haben und eine SERVFAIL erhalten, ist der zweitwahrscheinlichste Grund der, dass Ihr autorisierender Nameserver NOTIMP zurückgegeben hat, was wie oben beschrieben eine Verletzung von RFC 1035 ist. stattdessen sollte NOERROR mit einer leeren Antwort zurückgegeben werden. Wenn dies der Fall ist, reichen Sie einen Fehler oder ein Support-Ticket bei Ihrem DNS-Anbieter ein.

Schließlich können SERVFAILs durch Ausfälle bei Ihren autorisierenden Nameservern verursacht werden. Überprüfen Sie die NS-Einträge für Ihre Nameserver und stellen Sie sicher, dass jeder Server verfügbar ist.

# Timeout

Manchmal kommt es bei CAA-Abfragen zu einer Zeitüberschreitung. Das heißt, der autorisierende Nameserver antwortet überhaupt nicht mit einer Antwort, selbst nach mehreren Wiederholungen. Am häufigsten geschieht dies, wenn sich auf Ihrem Nameserver eine falsch konfigurierte Firewall befindet, die DNS-Abfragen mit unbekannten qtypes löscht. Legen Sie bei Ihrem DNS-Anbieter ein Support-Ticket an und fragen Sie ihn, ob eine solche Firewall konfiguriert ist.
