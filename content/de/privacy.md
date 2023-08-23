---
title: Datenschutzerklärung
slug: privacy
top_graphic: 4
lastmod: 2022-03-11
english_is_canonical: 1
show_lastmod: 1
---

In der Datenschutzerklärung von Let's Encrypt wird beschrieben, wie wir Ihre Informationen in drei verschiedenen Kontexten erfassen, verwenden und weitergeben:

- Wenn Sie als Relying Party (im Folgenden vertrauende Partei genannt) eine mit HTTPS gesicherte Website besuchen, die ein Zertifikat von Let’s Encrypt verwendet,
- Wenn Sie ein Abonnent sind, d.h. wenn Sie Zertifikate von Let's Encrypt anfordern und verwenden,
- Wenn Sie Besucher der Let’s Encrypt-Webseite, des Community-Diskussionsforums, anderer Websites unter letsencrypt.org und von Social Media-Websites von Drittanbietern sind, auf denen Let’s Encrypt ein Konto unterhält.

Let's Encrypt wird Ihnen von der [Internet Security Research Group](https://www.abetterinternet.org/) zur Verfügung gestellt, einer gemeinnützigen Organisation (Nonprofit Public Benefit Corporation) aus Kalifornien.

## Vertrauende Partei

Wenn Sie eine HTTPS-Website oder einen anderen TLS-Dienst mit einem Let’s Encrypt-Zertifikat verwenden, fragt Ihr Browser (oder TLS-Client) möglicherweise ab, ob das Zertifikat gesperrt wurde (“OCSP-Anforderung"). Wenn Ihr Browser eine OCSP-Anforderung stellt, zeichnen unsere Server Ihre IP-Adresse, Ihren Browser und Ihr Betriebssystem automatisch in temporären Serverprotokolldateien auf. Wir verwenden keine Daten aus OCSP-Anforderungen, um Profile zu erstellen oder Personen zu identifizieren. Temporäre Serverprotokolle werden nur zu operativen Zwecken verwendet und werden normalerweise innerhalb von weniger als sieben Tagen gelöscht. Wir können eine Teilmenge von Serverprotokollen für längere Zeit aufbewahren, um Softwarefehler oder Missbrauch zu untersuchen. In diesem Fall werden alle gespeicherten Protokolle gelöscht, wenn die Untersuchung abgeschlossen ist. Wir können auch gesammelte Informationen aus Serverprotokollen berechnen, aufbewahren und veröffentlichen, z. B. welche Zertifikate das größte Volumen an Anfragen generieren. Wir sind stets bemüht sicherzustellen, dass diese Datensätze keine Informationen über die Aktivitäten identifizierbarer Benutzer oder Geräte enthalten.

## Abonnent

Wenn Sie ein Abonnent sind, fordern Sie ein vertrauenswürdiges Zertifikat von Let's Encrypt an, das öffentlich garantieren soll, dass Sie einen bestimmten Domainnamen oder mehrere Domainnamen kontrollieren, die im Internet erreichbar sind. Let's Encrypt sammelt im Rahmen des Nachweises dieser Kontrolle verschiedene Informationen, die sich auf die Authentifizierung und Verwaltung von Zertifikaten beziehen. Zu diesen Informationen gehören die IP-Adressen, von denen aus Sie auf den Dienst von Let's Encrypt zugreifen; alle aufgelösten IP-Adressen für angeforderte Domainnamen; Serverinformationen in Bezug auf Validierungsanfragen; vollständige Protokolle aller ein- und ausgehenden HTTP/ACME-Validierungsanfragen; und Informationen, die von Ihrer Client-Software gesendet oder abgeleitet werden. Laut "trusted root program" Anforderungen speichern wir diese Informationen mindestens sieben Jahre. Die Daten werden für maximal zehn Jahre gespeichert.

Wir müssen in der Lage sein, der Öffentlichkeit, einschließlich denen, die sich auf die Vertrauenswürdigkeit unserer Zertifikate verlassen, zu zeigen, dass unsere Dienste wie erwartet funktionieren. Aus diesem Grund sind wir möglicherweise nicht in der Lage, Informationen, einschließlich IP-Adressen, zu löschen. Diese Informationen können auf verschiedene Art und Weise öffentlich zugänglich gemacht werden, unter anderem über öffentliche APIs, öffentliche Repositories und/oder öffentliche Gespräche.

Sie haben unter Umständen die Möglichkeit, Kontaktinformationen wie Ihre E-Mail-Adresse für Kontoservice- und Wiederherstellungszwecke anzugeben. Ihre Kontaktinformationen werden nicht veröffentlicht und nur gemäß den nachstehenden Abschnitten „Anfragen von Strafverfolgungsbehörden und mildernde Umstände“ weitergegeben. Durch die Angabe Ihrer E-Mail-Adresse erklären Sie sich damit einverstanden, Service-bezogene E-Mails von uns zu erhalten. Sie können sich jederzeit von Service-bezogenen E-Mails abmelden, indem Sie auf den "Abmelden"-Link am unteren Ende unserer E-Mails klicken oder uns unter privacy@abetterinternet.org kontaktieren. Wir werden Ihre Kontaktdaten nicht zu Marketing- oder Werbezwecken verwenden.

Sie müssen möglicherweise Client-Software von einem Repository herunterladen, welches beispielsweise von Debian, Ubuntu, Red Hat oder GitHub betrieben wird. Ihre Interaktion mit einem solchen Software-Repository unterliegt den eigenen Datenschutzrichtlinien und/oder Nutzungsbedingungen dieses Projektes.

## Besucher

Wenn Sie ein Besucher der Let's Encrypt-Website sind, haben Sie die Möglichkeit, eine Spende zu machen. Spenden werden von unseren vertrauenswürdigen Zahlungspartnern bearbeitet, einschließlich DonorBox, Stripe, Shopify, PayPal, The Giving Block, und Gemini abhängig von der gewählten Zahlungsmethode, und werden in der ISRG Salesforce-Datenbank gespeichert. Wir erfassen Ihren Namen und Ihre E-Mail-Adresse, wenn Sie spenden. Wir werden Ihre E-Mail-Adresse nicht verwenden, um Sie ohne Ihre Zustimmung zu kontaktieren, es sei denn, wir halten es für notwendig, ein Problem im Zusammenhang mit einer bestimmten Spende zu lösen. Ihre Interaktionen mit [DonorBox](https://donorbox.org/privacy), [Stripe](https://stripe.com/privacy/), [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full), [Shopify](https://www.shopify.com/legal/privacy), [The Giving Block](https://thegivingblock.com/about/privacy-policy/), Gemini, [SHIPHERO](https://shiphero.com/privacy-data-policy/), [Salesforce](https://www.salesforce.com/company/privacy/)und [Sage Intacct](https://www.sageintacct.com/privacy_policy_website) unterliegen ihren jeweiligen Datenschutzrichtlinien. Wir erheben oder speichern keine Kreditkarten- oder Bankdaten im Zusammenhang mit Spenden. Unsere Versandabwicklungspartner sind Shopify und SHIPHERO.

Sie haben unter Umständen die Möglichkeit, Ihre E-Mail-Adresse anzugeben, um Mitteilungen über ISRG-Projekte durch eine Anmeldung auf einer ISRG-Website und über andere Marketingmaterialien zu erhalten. Jede über MailChimp oder Salesforce übermittelte Kommunikation und Ihre Interaktionen mit [MailChimp](https://www.intuit.com/privacy/statement/) und [Salesforce](https://www.salesforce.com/company/privacy/) unterliegen deren Datenschutzrichtlinien. Wir können gelegentlich Ihre E-Mail-Adresse verwenden, um personalisierte Mitteilungen im Zusammenhang mit Let's Encrypt an Sie zu versenden. Sie können Ihre E-Mail-Adresse von unserer Liste entfernen, indem Sie sich über MailChimp oder per E-Mail an press@letsencrypt.org melden.

Wenn Sie sich registrieren, um das Support-Forum der "Let's Encrypt Community" zu nutzen, unterliegen Ihre angegebenen persönlichen Informationen und Ihre Handlungen den Datenschutzrichtlinien unseres Hosting- und Softwareanbieters für das Forum, [Civilized Discourse Construction Kit](https://www.discourse.org/privacy). Durch unser Angebot dieses Support-Forums werden keine persönlichen Daten von uns erfasst oder gespeichert.

## Wir verkaufen Ihre Daten oder Informationen nicht

Wir verkaufen Ihre Daten und Informationen nicht. Dazu gehören Vertrauenspersonen, Abonnenten- und Besucherdaten sowie andere Informationen.

## Anfragen von Strafverfolgungsbehörden und mildernde Umstände

Soweit wir darüber verfügen, können wir unter bestimmten Umständen personenbezogene Daten über Sie an Dritte weitergeben. Zu diesen Umständen gehören Fälle, in denen wir Ihre Zustimmung haben oder von der Vermutung ausgehen, dass wir gesetzlich dazu verpflichtet sind, wie z. B. aufgrund einer Vorladung oder einer anderen gerichtlichen oder behördlichen Anordnung. Wir können auch Informationen zur Kontowiederherstellung offenlegen, wenn wir vermuten, dass dies erforderlich ist, um den Verlust von Leben, Personenschäden, Sachschäden oder erheblichen finanziellen Schäden zu verhindern.

Wenn wir gesetzlich verpflichtet sind, die von Ihnen übermittelten Informationen offenzulegen, werden wir versuchen, Sie im Voraus darüber zu informieren (es sei denn, es ist uns untersagt oder es wäre sinnlos), dass eine Anfrage nach Ihren Informationen gestellt wurde, um Ihnen die Möglichkeit zu geben, der Offenlegung zu widersprechen. Wir werden versuchen, diese Mitteilung mit allen angemessen verfügbaren Mitteln bereitzustellen. Wenn Sie der Offenlegungsanfrage nicht widersprechen, sind wir möglicherweise gesetzlich verpflichtet, Ihre Daten weiterzugeben.

Darüber hinaus behalten wir uns das Recht vor, nach eigenem Ermessen bestimmten Anfragen (auf Zugang zu Informationen über Benutzer unserer Produkte und Technologien), die wir für unangemessen halten, unabhängig zu widersprechen.

## Welche Rechte haben im Europäischen Wirtschaftsraum ansässige Parteien, Abonnenten und Besucher gemäß der DSGVO und wie können Sie diese ausüben?

Wir verarbeiten personenbezogene Daten gemäß dieser Richtlinie. Zweck und rechtmäßige Grundlage für die Informationsverarbeitung ist folgende:

**Zweck:** Zertifikatsstatus (OCSP) Informationen bereitstellen

**Rechtsgrundlage:** Berechtigte Interessen

**Zusätzliche Informationen:** Wir erfassen und verarbeiten Informationen von vertrauenden Parteien, um zuverlässig Informationen zum Zertifikatsstatus bereitzustellen.

**Zweck:** Bereitstellung von Zertifikatausstellungs- und Verwaltungsdiensten

**Rechtsgrundlage:** Vertrag, berechtigte Interessen

**Zusätzliche Informationen:** Wir erfassen und verarbeiten Informationen von Abonnenten, um zuverlässige und sichere Ausstellungs- und Verwaltungsdienste für Zertifikate bereitzustellen und der Öffentlichkeit zu zeigen, dass unsere Dienste wie erwartet funktionieren.

**Zweck:** Informationen für Besucher bereitstellen

**Rechtsgrundlage:** Einwilligung, berechtigte Interessen

**Zusätzliche Informationen:** Wir sammeln und verarbeiten Informationen von Besuchern, um Informationen über das Web und per E-Mail zuverlässig und effizient zur Verfügung zu stellen.

**Zweck:** Spenden und Sponsorenanfragen bearbeiten

**Rechtsgrundlage:** Berechtigte Interessen

**Zusätzliche Informationen:** Wir sammeln und verarbeiten Informationen, um Spenden entgegenzunehmen und zu verarbeiten.

**Zweck:** Rechtliche Verpflichtungen und mildernde Umstände

**Rechtsgrundlage:** Gesetzliche Verpflichtung, berechtigte Interessen

**Zusätzliche Informationen:** Wir können Informationen sammeln und verarbeiten, um gesetzlichen Verpflichtungen nachzukommen und wenn wir glauben, dass dies notwendig ist, um den Verlust von Leben, Personenschäden, Sachschäden oder erheblichen finanziellen Schäden zu verhindern.

Bitte beachten Sie, dass wir Informationen, einschließlich IP-Adressen, möglicherweise nicht löschen können, da diese Informationen erforderlich sind, damit die Vertrauenswürdigkeit unserer Zertifikate von dritten geprüft werden kann. In einigen Fällen können wir personenbezogene Daten aufgrund einer gesetzlichen Verpflichtung verarbeiten oder um Ihre lebenswichtigen Interessen oder die einer anderen Person zu schützen.

Ihre personenbezogenen Daten können aus verschiedenen Ländern erhoben oder dorthin übertragen werden, wo wir und unsere Dienstleister Daten speichern oder verarbeiten, einschließlich der Vereinigten Staaten. Diese Rechtsprechungen bieten möglicherweise nicht das gleiche Datenschutzniveau wie Ihre Gerichtsbarkeit, einschließlich des EWR. Wir haben Maßnahmen ergriffen, um sicherzustellen, dass unsere Dienstleister ein angemessenes Schutzniveau für die personenbezogenen Daten von EWR-Bürgern bieten, einschließlich durch den Abschluss von Datenverarbeitungsvereinbarungen unter Verwendung der von der Europäischen Kommission genehmigten Standardvertragsklauseln oder durch die Verwendung anderer von der Europäischen Kommission genehmigter Sicherheitsvorkehrungen. Sie haben das Recht, Einzelheiten über die Verfahren zu erhalten, mit denen Ihre personenbezogenen Daten außerhalb der EU übertragen werden, indem Sie uns unter den unten stehenden Kontaktinformationen verständigen.

Personen im Europäischen Wirtschaftsraum (EWR) haben bestimmte Rechte in Bezug auf ihre personenbezogenen Daten, einschließlich des Rechts auf Zugang, Berichtigung oder Löschung personenbezogener Daten, die wir durch Ihre Nutzung unserer Websites und Dienste verarbeiten. Wenn Sie eine Person sind, die eine vertrauende Partei, ein Abonnent oder ein Besucher mit Sitz im EWR ist, können Sie:

- Einen Bericht zu personenbezogenen Daten anfordern, indem Sie uns eine E-Mail an privacy@abetterinternet.org senden. Dieser Bericht enthält die personenbezogenen Daten, die wir über Sie gespeichert haben, und wird Ihnen in einem strukturierten, allgemein verwendeten und tragbaren Format zur Verfügung gestellt. Bitte beachten Sie, dass wir möglicherweise zusätzliche Informationen von Ihnen anfordern, um Ihre Identität zu überprüfen, bevor wir Informationen offenlegen.

- Anfordern, dass Ihre Daten korrigiert oder gelöscht werden, indem Sie uns unter privacy@abetterinternet.org kontaktieren.

- Der Datenverarbeitung durch uns widersprechen. Sie können uns bitten, die Verwendung Ihrer Daten einzustellen, auch wenn wir Ihre Daten verwenden, um Ihnen Service-basierte E-Mails zu senden. Sie können Ihre Zustimmung zum Erhalt von Service-E-Mails jederzeit widerrufen, indem Sie auf den Link „Abmelden“ klicken, der sich in den E-Mails von Let’s Encrypt befindet.

- Bei einer Aufsichtsbehörde beschweren. Wenn Sie im EWR ansässig sind und der Meinung sind, dass wir die Datenschutzgesetze nicht eingehalten haben, haben Sie das Recht, eine Beschwerde bei Ihrer örtlichen Aufsichtsbehörde einzureichen.

Für weitere Informationen oder zur Meldung eines Datenschutzproblems wenden Sie sich bitte an: privacy@abetterinternet.org.
