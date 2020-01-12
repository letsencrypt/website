---
title: Datenschutzerklärung
slug: privacy
top_graphic: 4
date: 2019-09-19
lastmod: 2019-09-19
english_is_canonical: 1
---

{{< lastmod >}}

In der Datenschutzerklärung von Let's Encrypt wird beschrieben, wie wir
Ihre Informationen in drei verschiedenen Kontexten erfassen, verwenden
und weitergeben:

* Wenn Sie als Relying Party eine mit HTTPS gesicherte Website besuchen,
die ein Zertifikat von Let’s Encrypt verwendet, 
* Wenn Sie ein Abonnent sind, d. h. wenn Sie Zertifikate von Let's Encrypt anfordern und
verwenden, 
* Wenn Sie Besucher der Let's Encrypt-Webseite, des
Community-Diskussionsforums, anderer Websites unter letsencrypt.org und
von Social Media-Websites von Drittanbietern sind, auf denen Let’s Encrypt ein Konto unterhält.

## Vertrauende Partei

Wenn Sie eine HTTPS-Website oder einen anderen TLS-Dienst mit einem
Let's Encrypt-Zertifikat verwenden, fragt Ihr Browser (oder TLS-Client)
möglicherweise ab, ob das Zertifikat gesperrt wurde
("OCSP-Anforderung"). Wenn Ihr Browser eine OCSP-Anforderung stellt,
zeichnen unsere Server Ihre IP-Adresse, Ihren Browser und Ihr
Betriebssystem automatisch in temporären Serverprotokolldateien auf. Wir
verwenden keine Daten aus OCSP-Anforderungen, um Profile zu erstellen
oder Personen zu identifizieren. Temporäre Serverprotokolle werden nur
für betriebliche Zwecke verwendet und werden normalerweise innerhalb von
weniger als sieben Tagen gelöscht. Wir können eine Teilmenge von
Serverprotokollen für längere Zeit aufbewahren, um Softwarefehler oder
Missbrauch zu untersuchen. In diesem Fall werden alle gespeicherten
Protokolle gelöscht, wenn die Untersuchung abgeschlossen ist. Wir können
auch gesammelte Informationen aus Serverprotokollen berechnen,
aufbewahren und veröffentlichen, z. B. welche Zertifikate das grösste
Volumen an Anforderungen generieren. Wir sind stets bemüht
sicherzustellen, dass diese Datensätze keine Informationen über die
Aktivitäten identifizierbarer Benutzer oder Geräte enthalten.

## Abonnent

Wenn Sie ein Abonnent sind, fordern Sie ein vertrauenswürdiges
Zertifikat von Let's Encrypt an, mit dem öffentlich bestätigt werden
soll, dass Sie einen bestimmten Domainnnamen oder Namen kontrollieren,
die im Internet erreichbar sind. Let's Encrypt sammelt im Rahmen des
Nachweises dieser Kontrolle verschiedene Informationen, die sich auf die
Authentifizierung und Verwaltung von Zertifikaten beziehen. Zu diesen
Informationen gehören die IP-Adressen, von denen aus Sie auf den Let's
Encrypt-Dienst zugreifen; alle aufgelösten IP-Adressen für angeforderte
Domainnamen; Serverinformationen in Bezug auf Validierungsanfragen;
vollständige Protokolle aller eingehenden HTTP/ACME-Anforderungen,
aller ausgehenden Validierungsanforderungen; und Informationen, die von
Ihrer Client-Software gesendet oder abgeleitet werden. Wir bewahren
diese Informationen mindestens sieben Jahre lang auf, je nach
vertraglicher Notwendigkeit und im öffentlichen Interesse. Wir müssen in
der Lage sein, der Öffentlichkeit, einschliesslich derjenigen, die sich
auf die Vertrauenswürdigkeit unserer Zertifikate verlassen, zu zeigen,
dass unsere Dienstleistungen wie erwartet funktionieren. Daher können
wir Informationen, einschliesslich IP-Adressen, möglicherweise nicht
löschen. Diese Informationen können auf verschiedene Weise
veröffentlicht werden, z.B. über eine öffentliche API, öffentliche
Repositories und/oder öffentliche Diskussionen.

Möglicherweise haben Sie die Möglichkeit, Kontaktinformationen wie Ihre
E-Mail-Adresse für Kontodienst und Wiederherstellungszwecke anzugeben.
Ihre Kontaktinformationen werden nicht veröffentlicht und nur über
"Strafverfolgung und mildernde Umstände" weitergegeben. Durch die Angabe
Ihrer E-Mail-Adresse erklären Sie sich damit einverstanden,
Service-bezogene E-Mails von uns zu erhalten. Sie können sich jederzeit
von E-Mails mit Dienstbezug abmelden, indem Sie auf den Link „Abmelden“
unten in unseren E-Mails klicken oder uns unter
[security@letsencrypt.org](mailto: security@letsencrypt.org)
kontaktieren. Wir werden Ihre Kontaktdaten nicht für Marketing- oder
Werbezwecke verwenden.

Sie müssen möglicherweise Client-Software von einem Repository
herunterladen, das beispielsweise von Debian, Ubuntu, Red Hat oder
Github betrieben wird. Ihre Interaktion mit einem solchen
Software-Repository unterliegt den eigenen Datenschutzrichtlinien und /
oder Nutzungsbedingungen dieses Repositorys.

## Besucher

Wenn Sie als Besucher die Let's Encrypt-Website besuchen, haben Sie die
Möglichkeit, eine Spende zu tätigen. Spenden werden von unseren
vertrauenswürdigen Zahlungspartnern wie DonorBox, Stripe und PayPal
verarbeitet, abhängig von der ausgewählten Zahlungsmethode. Wir sammeln
Ihren Namen und Ihre E-Mail-Adresse, wenn Sie spenden. Wir werden Ihre
E-Mail-Adresse nicht dazu verwenden, Sie ohne Ihre Zustimmung zu
kontaktieren. Ihre Interaktionen mit [DonorBox](https://donorbox.org/privacy), 
[Stripe](https://stripe.com/privacy/) und [PayPal](https://www.paypal.com/us)
unterliegen den jeweiligen Datenschutzbestimmungen. Wir
sammeln oder speichern keine Kreditkarten- oder Bankdaten im
Zusammenhang mit Spenden. Wenn wir eine physische Adresse sammeln,
werden wir Ihre physischen Adressdaten nur so lange aufbewahren, wie es
vernünftigerweise erforderlich ist, um die angeforderte Sendung
durchzuführen.

Sie haben die Möglichkeit, Ihre E-Mail-Adresse anzugeben,
um den Let's Encrypt-Newsletter über eine Registrierung auf dieser Website
und über andere Marketingmaterialien zu erhalten. Der Newsletter wird über
MailChimp versendet und Ihre Interaktionen mit MailChimp unterliegen den
Datenschutzbestimmungen. Gelegentlich verwenden wir Ihre E-Mail-Adresse,
um personalisierte Mitteilungen zu Let’s Encrypt zu senden. Wir verkaufen
Ihre Informationen nicht. Sie können die Entfernung Ihrer E-Mail-Adresse
von unserer Liste beantragen, indem Sie sich über MailChimp abmelden oder
eine E-Mail an [press@letsencrypt.org] (mailto:press@letsencrypt.org) senden.

Wenn Sie sich registrieren, um das Support-Forum „Let's Encrypt“ zu
nutzen, unterliegen die persönlichen Informationen, die Sie
bereitstellen, und Ihre Massnahmen dort den Datenschutzbestimmungen
unseres Hosting- und Softwareanbieters für das Forum 
[Civilized Discourse Construction Kit](https://www.discourse.org/privacy).
Wir erheben oder speichern keine personenbezogenen Daten durch unsere
Mitarbeiter des Support-Forums.

Darüber hinaus verwenden wir Google Analytics, um den Verkehr und
beliebte Seiten unserer Website zu ermitteln. Als Teil dieses Services
platzieren wir Google Analytics-Cookies auf unserer Website. Diese
Cookies enthalten keine persönlichen Informationen, können Ihre
Browser-Software jedoch im Laufe der Zeit auf unserer Website eindeutig
identifizieren. Wir respektieren den Header 
[Do Not Track](http://donottrack.us/), indem wir die Informationen, die unsere
Analysedienste für alle Besucher sammeln und freigeben können, streng
einschränken.

## Strafverfolgungsersuchen und mildernde Umstände

Soweit wir über sie verfügen, können wir unter bestimmten Umständen
personenbezogene Daten über Sie an Dritte weitergeben. Zu diesen
Umständen gehört es, wenn wir Ihre Zustimmung haben oder wenn wir nach
Treu und Glauben glauben, dass dies gesetzlich vorgeschrieben ist,
beispielsweise aufgrund einer Vorladung oder einer anderen gerichtlichen
oder behördlichen Anordnung. Wir können Kontoinformationen auch offen
legen, wenn wir in gutem Glauben der Ansicht sind, dass es notwendig
ist, den Verlust von Leben, Körperverletzungen, Sachschäden oder
erheblichen finanziellen Schaden zu verhindern.

Wenn wir gesetzlich dazu verpflichtet sind, die von Ihnen übermittelten
Informationen offenzulegen, werden wir versuchen, Ihnen eine
Vorankündigung mitzuteilen (es sei denn, es ist uns verboten oder es wäre
zwecklos), dass eine Anfrage nach Ihren Informationen vorliegt und
wir Ihnen eine Gelegenheit geben, der Offenlegung zu widersprechen. 
Wir werden versuchen, diese Mitteilung mit den zumutbaren Mitteln aufzustellen.
Wenn Sie die Offenlegungsanfrage nicht anfechten, können wir gesetzlich
dazu verpflichtet sein, Ihre Informationen weiterzugeben.

Darüber hinaus behalten wir uns das Recht vor, nach eigenem Ermessen
bestimmten Anfragen (Zugang zu Informationen über Benutzer unserer
Produkte und Technologien), die wir für unangemessen halten,
eigenständig zu widersprechen.

## Welche Rechte haben beteiligte Parteien, Abonnenten und Besucher des Europäischen Wirtschaftsraums im Rahmen der DSGVO und wie kann ich sie wahrnehmen?

Wir verarbeiten personenbezogene Daten wie in dieser Richtlinie
beschrieben. Wir sind auf Ihre Zustimmung zum Versenden von E-Mails
angewiesen. Wenn wir eine IP-Adresse erfassen, verarbeiten wir diese
Daten aufgrund der vertraglichen Notwendigkeit, den Nachweis zu
erbringen, dass der Dienst wie erwartet funktioniert. Bitte beachten
Sie, dass wir Informationen, einschliesslich IP-Adressen, möglicherweise
nicht löschen können, da diese Informationen erforderlich sind, damit
andere Personen die Vertrauenswürdigkeit unserer Zertifikate ermitteln
können. In einigen Fällen verarbeiten wir personenbezogene Daten
möglicherweise aufgrund gesetzlicher Verpflichtungen oder zum Schutz
Ihrer Lebensinteressen oder der Interessen einer anderen Person.

Personen, die im Europäischen Wirtschaftsraum (EWR) ansässig sind, haben
bestimmte Rechte in Bezug auf ihre personenbezogenen Daten,
einschliesslich des Rechts, auf personenbezogene Daten zuzugreifen, sie
zu korrigieren oder zu löschen, die wir durch Ihre Nutzung der Website
verarbeiten. Wenn Sie als beteiligte Partei, Abonnent oder Besucher im EWR
ansässig sind, gilt:

* Fordern Sie einen Bericht zu persönlichen Daten an, indem Sie uns eine
E-Mail an security@letsencrypt.org senden. Dieser Bericht enthält die
personenbezogenen Daten, die wir über Sie haben, und zwar in
strukturierter, häufig verwendeter und tragbarer Form. Bitte beachten
Sie, dass wir möglicherweise zusätzliche Informationen von Ihnen
anfordern, um Ihre Identität zu überprüfen, bevor wir Informationen
offenlegen.  
* Fordern Sie die Korrektur oder Löschung Ihrer Daten an,
indem Sie uns unter security@letsencrypt.org kontaktieren.  
* Widersprechen Sie uns bei der Verarbeitung Ihrer Daten. Sie können uns
auffordern, Ihre Daten nicht mehr zu verwenden, auch wenn wir Ihre
Informationen verwenden, um Ihnen Service-E-Mails zu senden. Sie können
Ihre Einwilligung zum Erhalt von Service-E-Mails jederzeit widerrufen,
indem Sie auf den Link "Abbestellen" klicken, der sich unter Let's
Encrypt E-Mails befindet.  
* Beschwerde bei einer Regulierungsbehörde.
Wenn Sie im EWR ansässig sind und der Meinung sind, dass wir die
Datenschutzgesetze nicht einhalten, haben Sie das Recht, bei Ihrer
lokalen Aufsichtsbehörde Beschwerde einzulegen.

Für weitere Informationen oder zur Meldung eines Datenschutzproblems
wenden Sie sich bitte an: [security@letsencrypt.org](mailto: security@letsencrypt.org)
