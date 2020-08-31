---
title: Integrationshandbuch
linkTitle: Client und Provider Integrationsleitfaden
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2019-10-29
---

{{< lastmod >}}

Dieses Dokument enthält hilfreiche Ratschläge, wenn Sie ein
Hosting-Anbieter oder eine grosse Website sind, die Let's Encrypt
integrieren, oder wenn Sie Client-Software für Let's Encrypt schreiben.

# Planen Sie den Wandel

Let's Encrypt und die Web-PKI werden sich im Laufe der Zeit
weiterentwickeln. Sie sollten sicherstellen, dass Sie problemlos alle
Dienste aktualisieren können, die Let's Encrypt verwenden. Wenn Sie auch
Clients bereitstellen, die auf Let's Encrypt-Zertifikaten angewiesen
sind, stellen Sie besonders sicher, dass diese Clients regelmässig
aktualisiert werden.

In der Zukunft werden sich diese Dinge wahrscheinlich ändern:

  * die Stamm- und Zwischenzertifikate, von denen wir ausstellen 
  * die Hash-Algorithmen, die wir beim Signieren von Zertifikaten verwenden 
  * die Arten von Schlüsseln und die Überprüfung der Schlüsselstärke, für
    die wir End-Entity-Zertifikate signieren möchten 
  * und das ACME-Protokoll

Wir werden uns stets bemühen, solche Änderungen so früh wie möglich im
Voraus bekannt zu geben. Wenn in einer Komponente jedoch schwerwiegende
Sicherheitslücken gefunden werden, müssen wir möglicherweise sehr
kurzfristig oder sofort Änderungen vornehmen. Insbesondere für
Zwischenänderungen sollten Sie das zu verwendende Zwischenprodukt nicht
hartcodieren, sondern [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2)
Header aus dem ACME-Protokoll verwenden, da sich Zwischenzertifikate
wahrscheinlich ändern werden.

Ebenso ändern wir wahrscheinlich die URL der Nutzungsbedingungen (ToS),
wenn wir sie aktualisieren. Vermeiden Sie eine Hardcodierung der ToS-URL
und verlassen Sie sich stattdessen auf die [`Link: rel="Terms of Service "`](https://tools.ietf.org/html/rfc8555#section-7.3.3)
Header, um zu bestimmen, welche ToS-URL verwendet werden soll.

Sie möchten auch wissen, wie Sie Ihre TLS-Konfiguration auf dem neuesten Stand
halten können, wenn neue Angriffe auf Verschlüsselungssammlungen oder
Protokollversionen gefunden werden.

# Updates bekommen

Abonnieren Sie unsere Gruppe [API Announcements](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836),
um Updates zu wichtigen Änderungen wie den oben beschriebenen zu
erhalten. Dies ist sowohl für Cliententwickler als auch für
Hostinganbieter hilfreich.

Besuchen Sie unsere [Statusseite](https://letsencrypt.status.io/), um
Updates zu Wartungen und Ausfällen in grösserem Umfang zu erhalten, und
klicken Sie oben rechts auf Abonnieren. Dies ist besonders für
Hosting-Provider nützlich.

Stellen Sie ausserdem sicher, dass Sie eine gültige E-Mail-Adresse für
Ihr ACME-Konto verwenden. Wir werden diese E-Mail verwenden, um Ihnen
Verfallsbenachrichtigungen zuzusenden und über Probleme zu informieren,
die für Ihr Konto spezifisch sind.

# Wer ist der Abonnent?

Unser [CPS- und Abonnentenvertrag](/repository) zeigt an, dass der
Abonnent derjenige ist, der den privaten Schlüssel für ein Zertifikat
besitzt. Bei Hosting-Providern ist dies der Provider, nicht der Kunde
des Providers. Wenn Sie Software schreiben, die von den Mitarbeitern
selbst bereitgestellt wird, ist dies derjenige, der die Software
bereitstellt.

Die Kontakt-E-Mail, die Sie beim Erstellen von Konten (auch als
Registrierungen bezeichnet) erhalten, sollte an den Abonnenten gesendet
werden. Wir werden eine E-Mail an diese Adresse senden, um vor dem
Ablaufen von Zertifikaten zu warnen, und über Änderungen an unseren
[Datenschutzbestimmungen](/privacy) informieren. Wenn Sie ein
Hostinganbieter sind, sollten diese Benachrichtigungen nicht an einen
Kunden, sondern an Sie gesendet werden. Richten Sie im Idealfall eine
Mailingliste oder einen Alias ein, damit mehrere Personen
auf Benachrichtigungen reagieren können, falls Sie im Urlaub sind.

Das Ergebnis davon ist, dass Sie als Hosting-Provider nicht die
E-Mail-Adressen Ihrer Kunden senden müssen, damit diese unseren
Abonnentenvereinbarungen zustimmen. Sie können einfach Zertifikate für
die von Ihnen kontrollierten Domains ausstellen und sie verwenden.

# Ein Konto oder viele?

In ACME ist es möglich, ein Konto zu erstellen und für alle
Berechtigungen und Ausgaben zu verwenden oder pro Kunde ein Konto zu
erstellen. Diese Flexibilität kann wertvoll sein. Einige
Hosting-Provider möchten beispielsweise ein Konto pro Kunde verwenden
und die Kontoschlüssel in verschiedenen Kontexten speichern, sodass bei
einem Kontoschlüssel-Kompromiss keine Ausgabe für alle ihre Kunden
möglich ist.

Bei den meisten grösseren Hosting-Providern empfehlen wir jedoch die
Verwendung eines einzelnen Kontos und den entsprechenden Kontoschlüssel.
Dies macht es einfacher, Zertifikate zu identifizieren, die zur selben
Entität gehören, die Kontaktinformationen auf dem neuesten Stand zu
halten und bei Bedarf Anpassungen der Tarifgrenzen vorzunehmen. Wir
können die Tariflimits nicht effektiv anpassen, wenn viele verschiedene
Konten verwendet werden.

# Multi-Domain-Zertifikate (SAN-Zertifikate)

Unsere [Ausstellungsrichtlinie](/docs/rate-limits) erlaubt bis zu
100 Namen pro Zertifikat. Ob Sie für jeden Hostnamen ein separates
Zertifikat verwenden oder viele Hostnamen auf einer kleinen Anzahl von
Zertifikaten zusammenfassen, bleibt Ihnen überlassen.

Die Verwendung separater Zertifikate pro Hostname bedeutet, dass weniger
bewegliche Teile erforderlich sind, um Domains logisch hinzuzufügen und
zu entfernen, während sie bereitgestellt und zurückgezogen werden. Durch
separate Zertifikate wird auch die Zertifikatgrösse minimiert, wodurch
HTTPS-Handshakes in Netzwerken mit geringer Bandbreite beschleunigt
werden können.

Andererseits können Sie durch die Verwendung grosser Zertifikate mit
vielen Hostnamen insgesamt weniger Zertifikate verwalten. Wenn Sie
ältere Clients wie Windows XP unterstützen müssen, die keine
TLS-Servernamenangabe ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)) unterstützen,
benötigen Sie für jedes Zertifikat eine eindeutige IP-Adresse Wenn Sie
also für jedes Zertifikat mehr Namen vergeben, verringert sich die
Anzahl der benötigten IP-Adressen.

Für die meisten Bereitstellungen bieten beide Optionen die gleiche
Sicherheit.

# Speichern und Wiederverwenden von Zertifikaten und Schlüsseln

Ein grosser Teil des Wertes von Let's Encrypt besteht darin, dass die
automatische Ausgabe als Teil der Bereitstellung einer neuen Website
ermöglicht wird. Wenn Sie jedoch über eine Infrastruktur verfügen, die
möglicherweise wiederholt neue Frontends für dieselbe Website erstellt,
sollten diese Frontends zunächst versuchen, ein Zertifikat und einen
privaten Schlüssel aus einem dauerhaften Speicher zu verwenden, und erst
dann ein neues ausstellen, wenn kein Zertifikat verfügbar ist oder alle
vorhandenen Zertifikate abgelaufen sind.

Für Let's Encrypt können wir so vielen Menschen wie möglich Dienste
anbieten. Dies stellt für Sie sicher, dass Sie Ihre Website jederzeit
bereitstellen können, unabhängig vom Status von Let's Encrypt.

Beispielsweise verwenden viele Sites Docker, um bei Bedarf neue
Frontend-Instanzen bereitzustellen. Wenn Sie Ihre Docker-Container so
einrichten, dass sie beim Start ausgegeben werden, und Ihre Zertifikate
und Schlüssel nicht dauerhaft speichern, kommen Sie wahrscheinlich an
Limits, wenn Sie zu viele Instanzen gleichzeitig aufrufen. Wenn Sie
im schlimmsten Fall alle Ihre Instanzen auf einmal zerstören und neu
erstellen müssen, kann es sein, dass Sie in einer Situation landen, in
der keine Ihrer Instanzen ein Zertifikat erhalten kann und Ihre Website
bis zum Ende der letzten Tage mehrere Tage beschädigt ist bis das Rate Limit
verfällt. Diese Art von Problem ist jedoch nicht für Rate Limits
einzigartig. Wenn Let's Encrypt aus irgendeinem Grund nicht verfügbar
ist, wenn Sie Ihre Frontends aufrufen müssen, haben Sie dasselbe
Problem.

Beachten Sie, dass einige Implementierungsphilosophien besagen, dass
Kryptoschlüssel den physischen Computer, auf dem sie erstellt wurden,
niemals verlassen dürfen. Dieses Modell kann mit Let's Encrypt
problemlos funktionieren, solange Sie sicherstellen, dass die Maschinen
und ihre Daten langlebig sind und Sie Ratengrenzwerte sorgfältig
verwalten.

# Einen Austauschtyp auswählen

Wenn Sie die ACME-Challenge http-01 verwenden, müssen Sie die
Challenge-Antwort für jedes Ihrer Frontends bereitstellen, bevor Sie
Let's Encrypt benachrichtigen, dass Sie bereit sind, die Challenge zu
meistern. Wenn Sie viele Frontends haben, kann dies eine Herausforderung
sein. In diesem Fall ist die Verwendung der Challenge dns-01
wahrscheinlich einfacher. Wenn Sie über viele geografisch verteilte
DNS-Responder verfügen, müssen Sie natürlich sicherstellen, dass der
TXT-Eintrag für jeden Responder verfügbar ist.

Wenn Sie die Challenge dns-01 verwenden, müssen Sie ausserdem alte
TXT-Einträge bereinigen, damit die Antwort auf die Abfrage von Let's
Encrypt nicht zu gross wird.

Wenn Sie die Challenge http-01 trotzdem verwenden möchten, können
Sie HTTP-Weiterleitungen nutzen. Sie können jedes Ihrer Frontends so
einrichten, dass /.well-known/acme-validation/XYZ für alle XYZ-Adressen
in validation-server.example.com/XYZ umgeleitet wird. Dadurch wird die
Zuständigkeit für die Ausgabe an den Validierungsserver delegiert. Sie
sollten diesen Server also gut schützen.

# Zentrale Validierungsserver

In Verbindung mit den beiden oben genannten Punkten kann es sinnvoll
sein, bei vielen Frontends eine kleinere Teilmenge von Servern zur
Verwaltung der Ausgabe zu verwenden. Dies erleichtert die Verwendung von
Weiterleitungen für die http-01-Validierung und bietet die Möglichkeit,
Zertifikate und Schlüssel dauerhaft zu speichern.

# Implementieren Sie OCSP-Stapling

Viele Browser rufen OCSP von Let's Encrypt ab, wenn sie Ihre Site laden.
Dies ist ein [Leistungs- und Datenschutzproblem](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/).
Idealerweise sollten Verbindungen zu Ihrer Site nicht auf eine sekundäre
Verbindung zu Let's Encrypt warten. Darüber hinaus teilen
OCSP-Anforderungen Let's Encrypt mit, welche Websites von Personen
besucht werden. Wir haben eine gute Datenschutzrichtlinie und erfassen
keine Einzelangaben zur Identifizierung von OCSP-Anfragen. Wir möchten
die Daten lieber gar nicht erst erhalten. Darüber hinaus gehen wir davon
aus, dass unsere Bandbreitenkosten für die Bereitstellung von OCSP bei
jedem ersten Besuch einer Let's Encrypt-Site durch einen Browser einen
grossen Teil unserer Infrastrukturkosten ausmachen.

Durch Aktivieren von OCSP Stapling können Sie die Leistung Ihrer Website
verbessern, den Schutz Ihrer Daten für Ihre Benutzer verbessern und
Let's Encrypt dabei helfen, möglichst viele Personen effizient zu
bedienen.

# Firewall-Konfiguration

Um Let's Encrypt verwenden zu können, müssen Sie ausgehenden Port
443-Verkehr von den Computern zulassen, auf denen Ihr ACME-Client
ausgeführt wird. Wir veröffentlichen die IP-Bereiche für unseren
ACME-Service nicht und sie werden sich auch ohne vorherige Ankündigung ändern.

Für die ACME-Herausforderung "http-01" müssen Sie den eingehenden Port
80-Verkehr zulassen. Wir veröffentlichen nicht die IP-Bereiche, von
denen aus wir die Validierung durchführen, und sie werden sich auch
ohne vorherige Ankündigung ändern.

Hinweis: Es wird empfohlen, immer einen einfachen HTTP-Zugriff auf den
Webserver zuzulassen, wobei eine Weiterleitung zu HTTPS erfolgt. Dies
bietet eine bessere Benutzererfahrung als ein Webserver, der Port
80-Verbindungen ablehnt oder abbricht, und bietet dieselbe
Sicherheitsstufe.

Für alle Challenges müssen Sie den eingehenden Port 53-Verkehr
(TCP und UDP) zu Ihren autorisierenden DNS-Servern zulassen.

# Unterstützte Schlüsselalgorithmen

Let's Encrypt akzeptiert RSA-Schlüssel mit einer Länge von 2048 bis 4096
Bit sowie P-256- und P-384-ECDSA-Schlüssel. Dies gilt sowohl für
Kontoschlüssel als auch für Zertifikatsschlüssel. Sie können einen
Kontoschlüssel nicht als Zertifikatsschlüssel wiederverwenden.

Wir empfehlen, eine Konfiguration mit zwei Zertifikaten bereitzustellen,
die standardmässig ein RSA-Zertifikat und ein (viel kleineres)
ECDSA-Zertifikat für die Clients bereitzustellen, die Unterstützung
angeben.

# HTTPS standardmässig

Für Hosting-Provider empfehlen wir, automatisch Zertifikate auszustellen
und HTTPS für alle Hostnamen zu konfigurieren, die Sie steuern, und eine
vom Benutzer konfigurierbare Einstellung für das Umleiten von HTTP-URLs
an ihre HTTPS-Entsprechungen anzubieten. Es wird empfohlen, die
Einstellung für vorhandene Konten standardmässig zu deaktivieren. Für
neue Konten ist die Einstellung jedoch standardmässig aktiviert.

Begründung: Bestehende Websites enthalten wahrscheinlich einige
HTTP-Subressourcen (Skripts, CSS und Bilder). Wenn diese Sites
automatisch zu ihren HTTPS-Versionen umgeleitet werden, blockieren
Browser einige dieser Subressourcen aufgrund von Mixed Content Blocking.
Dies kann die Funktionalität der Site beeinträchtigen. Wer jedoch eine
neue Site erstellt und feststellt, dass sie zu HTTPS umleitet, enthält
höchstwahrscheinlich nur HTTPS-Subressourcen. Wenn sie versuchen, eine
HTTP-Subressource einzuschliessen, werden sie sofort feststellen, dass
sie nicht funktioniert.

Es wird empfohlen, Kunden zu erlauben, einen
HTTP-Strict-Transport-Security-Header (HSTS) mit einem Standardalter von
maximal 60 Tagen festzulegen. Diese Einstellung sollte jedoch von einer
Warnung begleitet werden, die besagt, dass der Kunde, wenn der Kunde zu
einem anderen Hosting-Anbieter wechseln muss, der kein HTTPS anbietet, die
Website in den zwischengespeicherten HSTS-Einstellungen in Browsern
nicht verfügbar macht. Sowohl der Kunde als auch der Hosting-Anbieter
sollten sich darüber im Klaren sein, dass der HSTS-Header
Zertifikatsfehler zu schwerwiegenden Fehlern macht. Während Benutzer
normalerweise in einer Browser-Warnung vor einem Namenskonflikt oder
abgelaufenem Zertifikat klicken können, erlauben Browser kein solches
Durchklicken für Hostnamen mit einem aktiven HSTS-Header.

# Wann zu erneuern

Wir empfehlen, Zertifikate automatisch zu erneuern, wenn sie noch ein
Drittel ihrer gesamten Lebensdauer haben. Für die aktuellen
90-Tage-Zertifikate von Let's Encrypt bedeutet dies eine Erneuerung von
30 Tagen vor Ablauf.

Wenn Sie für mehr als 10.000 Hostnamen erneuern, empfehlen wir auch eine
automatische Erneuerung in kleinen Auflagen, anstatt Erneuerungen in
grossen Abschnitten aufzuteilen. Dies verringert das Risiko: Wenn zu dem
Zeitpunkt, zu dem die Erneuerung erforderlich ist, ein Ausfall von Let's
Encrypt vorliegt oder in Ihren Erneuerungssystemen ein vorübergehender
Fehler auftritt, betrifft dies nur einige Ihrer Zertifikate und nicht
alle. Dies erleichtert auch unsere Kapazitätsplanung.

Möglicherweise möchten Sie Zertifikate für alle Ihre Domains in Massen
ausstellen, um einen schnellen Einstieg zu ermöglichen. Sie können dann
die Verlängerungszeiten verteilen, indem Sie einmalig einige Zertifikate
einen Tag vor dem normalen Verlängerungszeitraum erneuern, einige davon
2 Tage im Voraus und so weiter.

Wenn Sie eine Client-Software anbieten, die automatisch einen
periodischen Batch-Job konfiguriert, stellen Sie sicher, dass sie
tagsüber zu einer zufälligen Sekunde ausgeführt werden und
nicht immer zu einem bestimmten Zeitpunkt. Dadurch wird sichergestellt,
dass Let's Encrypt nicht zu jeder Stunde oder Minute zufällige
hohe Netzwerkanfragen empfängt. Da Let's Encrypt Kapazitäten bereitstellen
muss, um Lastspitzen zu bewältigen, sollte ein hohes Aufkommen an
Netzwerkanfragen reduziert werden, um unsere Kosten zu senken.

# Wiederholungsfehler

Erneuerungsfehler sollten nicht als schwerwiegender Fehler behandelt
werden. Sie sollten eine elegante Wiederholungslogik in Ihren
ausstellenden Diensten implementieren, wobei Sie ein exponentielles
Backoff-Muster verwenden, das maximal einmal pro Tag pro Zertifikat
ausläuft. Ein sinnvoller Backoff-Zeitplan wäre beispielsweise: 1.
Wiederholung nach einer Minute, 2. Wiederholung nach zehn Minuten, 3.
Wiederholung nach 100 Minuten, 4. und nachfolgende Wiederholung nach
einem Tag. Natürlich sollten Administratoren eine Möglichkeit haben,
frühere Wiederholungen pro Domain oder global anzufordern.

Backoffs bei Wiederholungsversuchen bedeutet, dass Ihre Ausgabesoftware
Fehler sowie Erfolge nachverfolgen und prüfen sollte, ob kürzlich ein
Fehler aufgetreten ist, bevor Sie eine erneute Ausgabe versuchen. Es ist
sinnlos, hunderte Male pro Stunde auszugeben, da wiederholte Fehler
wahrscheinlich hartnäckig sind.

Alle Fehler sollten an den zuständigen Administrator gesendet werden, um
festzustellen, ob bestimmte Probleme behoben werden müssen.
