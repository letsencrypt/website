---
title: Challenge Typen
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2020-12-08
show_lastmod: 1
---


Wenn Sie ein Zertifikat von Let’s Encrypt erhalten, überprüfen unsere Server, ob Sie die Domänennamen in diesem Zertifikat mithilfe von "Challenges" steuern, die im ACME-Standard definiert sind. Meistens wird diese Validierung automatisch von Ihrem ACME-Client durchgeführt. Wenn Sie jedoch komplexere Konfigurationsentscheidungen treffen müssen, ist es hilfreich, mehr darüber zu erfahren. Wenn Sie sich nicht sicher sind, gehen Sie zu den Standardeinstellungen Ihres Clients oder zu HTTP-01.

# HTTP-01 challenge

Dies ist heute die häufigste Art der Challenge. Let's Encrypt gibt Ihrem ACME-Client einen Token und Ihr ACME-Client legt eine Datei auf Ihrem Webserver unter `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>` ab. Diese Datei enthält den Token sowie einen Fingerabdruck Ihres Kontoschlüssels. Sobald Ihr ACME-Client Let’s Encrypt mitteilt, dass die Datei fertig ist, versucht Let’s Encrypt sie abzurufen (möglicherweise mehrmals von mehreren Standorten aus). Wenn unsere Validierungsprüfunge mit den Antworten von Ihrem Webserver übereinstimmen, wird die Validierung als erfolgreich angesehen und Sie können mit der Ausstellung Ihres Zertifikats fortfahren. Wenn die Validierungsprüfungen fehlschlagen, müssen Sie es mit einem neuen Zertifikat erneut versuchen.

Unsere Implementierung der HTTP-01-Challenge folgt Weiterleitungen, bis zu 10 Weiterleitungen tief. Es werden nur Weiterleitungen zu "http:" oder "https:" akzeptiert und nur zu den Ports 80 oder 443. Es werden keine Umleitungen zu IP-Adressen akzeptiert. Bei der Umleitung zu einer HTTPS-URL werden keine Zertifikate überprüft (da diese Abfrage gültige Zertifikate erstellen soll, kann es vorkommen, dass selbstsignierte oder abgelaufene Zertifikate vorhanden sind).

Die HTTP-01 Challenge kann nur auf Port 80 durchgeführt werden. Erlauben von anderen Ports, würde die Challenge weniger sicher machen und ist nach dem ACME Standard nicht erlaubt.

Vorteile:

 - Ohne Fachkenntnisse in der Domainverwaltung einfach zu automatisieren.
 - Erlaubt Hosting Providern das Ausstellen von Zertifikaten für CNAME Domains.
 - Funkioniert mit jedem Standard-Webserver.

Nachteile:

 - Funktioniert nicht, wenn Ihr ISP Port 80 blockiert (selten, aber es gibt solche ISPs).
 - Let’s Encrypt erlaubt diese Challenge nicht zum Ausstellen von Wildcard Zertifikaten.
 - Wenn Sie mehrere Webserver haben, müssen Sie sicherstellen, dass die Dateien überall verfügbar sind.

# DNS-01 challenge

Diese Challenge fragt Sie zur Überprüfung der Kontrolle des DNS für Ihren Domainnamen durch Einfügen eines speziellen TXT Eintrags unter der Domain. Es ist schwieriger zu konfigurieren als HTTP-01, aber funktioniert in Szenarien, wo HTTP-01 nicht funktioniert. Es erlaubt auch die Ausstellung von Wildcard-Zertifikaten. Nachdem Let’s Encrypt Ihrem ACME Client einen Token gegeben hat, erstellt Ihr Client einen TXT Eintrag abgeleitet von diesem Token und Ihrem Kontoschlüssel und fügt diesen Eintrag als `_acme-challenge.<YOUR_DOMAIN>`. Dann fragt Let’s Encrypt das DNS-System für diesen Eintrag. Wenn er gefunden wurde, können Sie mit der Ausstellung des Zertifikats fortfahren!

Da die Automatisierung von Ausstellung und Erneuerung sehr wichtig ist, ist die Verwendung von DNS-01-Challenge nur sinnvoll, wenn Ihr DNS-Anbieter über eine API verfügt, mit der Sie Aktualisierungen automatisieren können. Unsere Community hat eine [Liste solcher DNS-Anbieter hier](https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438) gestartet. Ihr DNS-Anbieter ist möglicherweise derselbe wie Ihr Registrar (das Unternehmen, bei dem Sie Ihren Domain-Namen gekauft haben) oder er ist möglicherweise anders. Wenn Sie Ihren DNS-Anbieter ändern möchten, müssen Sie nur einige kleine Änderungen an Ihrem Registrar vornehmen. Sie müssen nicht warten, bis Ihre Domain fast abgelaufen ist.

Beachten Sie, dass das Abspeichern der vollen DNS API Zugriffsberechtigungen auf Ihren Webserver signifikant die Möglichkeit vergrössert, dass Ihr Webserver gehackt wird. Beste Praxis ist die Benutzung [spezieller DNS API Zugriffsschlüssel](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation) oder die Durchführung der DNS Validierung von einem separaten Server und automatischen Kopieren des Zertitikats auf Ihren Webserver.

Sie können CNAME Einträge oder NS Einträge zur Delegierung der Antwort zur Challenge zu anderen DNS Zonen erstellen, seitdem Let’s Encrypt bei der Suche nach TXT Einträgen für die DNS01-Validierung dem DNS Standard folgt. Das kann benutzt werden bei [Delegierung der `_acme-challenge` Subdomain](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation) zu einem speziellen Validierungs-Server oder Zone. Es kann auch benutzt werden, wenn Ihr DNS Anbieter langsam bei Aktualisierungen ist und sie zu einem schnelleren delegieren möchten.

Die meisten DNS-Anbieter haben eine "Propagierungszeit", die bestimmt, wie lange es von der Aktualisierung eines DNS-Eintrags bis zur Verfügbarkeit auf allen Servern dauert. Es kann schwierig sein, dies zu messen, da häufig auch [anycast](https://en.wikipedia.org/wiki/Anycast) verwendet wird, was bedeutet, dass mehrere Server die gleiche IP-Adresse haben können. Je nachdem, wo auf der Welt Sie sich befinden, können Sie mit einem anderen Server sprechen (und eine andere Antwort erhalten) als Let's Encrypt. Die besten DNS-APIs bieten Ihnen die Möglichkeit, automatisch zu überprüfen, ob das Update vollständig verbreitet wurde. Wenn dies bei Ihrem DNS-Anbieter nicht der Fall ist, müssen Sie Ihren Client nur so konfigurieren, dass er lange genug wartet (häufig bis zu einer Stunde), um sicherzustellen, dass das Update weitergegeben wird, bevor die Validierung ausgelöst wird.

Sie können mehrere TXT Einträge für denselben Namen vorhalten. Wenn Sie zum Beispiel zur selben Zeit eine Challenge für ein Wildcard-Zertifikat und ein Nicht-Wildcard-Zertifikat validieren. Wie auch immer sollten Sie sicherstellen, dass alte TXT Einträge immer gelöscht werden, bevor die Anfrageantwort zu gross wird und Let's Encrypt sie abweisen wird.

Vorteile:

 - Sie können diese Challenge zur Ausstellung von Wildcard-Zertifikaten verwenden.
 - Es funtioniert gut, wenn Sie mehrere Webserver verwenden.

Nachteile:

 - Das Vorhalten der API Zugriffsinformationen auf dem Webserver ist ein Risiko.
 - Ihr DNS Anbieter bietet vielleicht keine API an.
 - Ihre DNS API stellt vielleicht keine Information über die Propagierungszeit zur Verfügung.

# TLS-SNI-01

Diese Challenge war in einer Entwurfsversion von ACME definiert. Es wurde ein TLS Handshake auf Port 443 durchgeführt und ein spezieller [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) Header gesendet, welches nach einem Zertifikat mit dem Token gesucht hat. Es wurde in [März 2019 deaktiviert](https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209), da es nicht sicher genug war.

# TLS-ALPN-01

Diese Challenge wurde entwickelt, nachdem TLS-SNI-01 veraltet war und ist als [separatater Standard](https://tools.ietf.org/html/rfc8737) definiert. Wie TLS-SNI-01 arbeitet es mit TLS auf Port 443. Es benutzt ein angepasstes ALPN Protokoll, um sicherzustellen, dass nur Server auf eine Validierungsanfrage antworten, die diesen Challenge Typ erwarten. Es erlaubt auch Validierungsanfragen für diesen Challenge Typ mit Benutzung des SNI Felds, das mit dem Domainnamen übereinstimmt, was es wiederum sicherer macht.

Für die meisten Nutzer ist diese Challenge nicht sinnvoll. Es ist die beste Lösung für Entwickler von TLS-terminierenden Reverse-Proxys, die eine host-basierende Validierung wie HTTP-01 durchführen möchten, aber dies aus Separierungsgründen durchgängig als TLS Layer implementieren. Derzeit benutzt bei grossen Hostinganbieter, aber Webserver wie Apache oder Nginx könnten das irgendwann mal ([Caddy kann es jetzt schon](https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860)).

Vorteile:

 - Funktioniert wenn Port 80 für Sie nicht erreichbar ist.
 - Es kann als purer TLS Layer arbeiten

Nachteile:

 - Wird nicht unterstützt von Apache, Nginx oder Certbot und wird es auch nicht in naher Zukunft.
 - Wie HTTP-01, wenn Sie mehrere Webserver haben, brauchen zur Antwort alle denselben Content.
 - Diese Methode kann nicht verwendet werden, um Wildcard-Domains zu validieren.
