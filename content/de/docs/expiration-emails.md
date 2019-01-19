---
title: Ablauf-Emails
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2016-07-02
---

{{< lastmod >}}

# Abonnieren

Wenn Sie bei der Erstellung Ihres Kontos eine E-Mail-Adresse für Let's Encrypt angeben, senden wir Ihnen automatisch Benachrichtigungen über das Ablaufdatum, wenn Ihr Zertifikat zur Erneuerung ansteht. Wir senden die erste Benachrichtigung 20 Tage vor Ablauf des Zertifikats und weitere Benachrichtigungen 10 Tage und 1 Tag vor Ablauf.

# Wenn Sie eine Ablauf-E-Mail erhalten

Wenn Ihr Zertifikat bereits verlängert wurde, senden wir keine Verfallserklärung. Wir betrachten ein Zertifikat als erneuert, wenn ein neueres Zertifikat mit genau denselben Namen vorhanden ist, unabhängig davon, von welchem Konto es erstellt wurde.
Wenn Sie ein neues Zertifikat ausgestellt haben, das einen Namen relativ zu Ihrem alten Zertifikat hinzufügt oder entfernt, erhalten Sie eine Ablauf-E-Mail zu Ihrem alten Zertifikat.
Wenn Sie das aktuell auf Ihrer Website ausgeführte Zertifikat überprüfen und das korrekte Datum anzeigt, sind keine weiteren Massnahmen erforderlich.

# Abbestellung

Der E-Mail-Text enthält einen Link zum Abbestellen zukünftiger Benachrichtigungen. Wenn Sie auf diesen Link klicken, erhalten Sie für das nächste Jahr keine Verfallsbenachrichtigungen.
Die Liste der "Wer ist nicht abonniert" ist unabhängig von Staging-Benachrichtigungen und Produktionsbenachrichtigungen. Sie können sich also jederzeit vom Staging abmelden, ohne den Produktionsstatus zu beeinträchtigen.

Beachten Sie, dass Ihre Abmeldung nur für ein Jahr gültig ist. Daher müssen Sie sie jedes Jahr erneuern.

Es gibt noch keine Möglichkeit für uns, Sie effizient abzumelden, wenn Sie den Newsletter abbestellen. Unser E-Mail-Anbieter Mandrill [hat einen manuellen Mechanismus, den wir noch automatisieren müssen](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).

Sie können jedoch die E-Mail-Adresse Ihres Kontos ändern, wodurch Sie effektiv neu abonniert werden. In vielen gängigen E-Mail-Diensten wird `yourname+1@example.com` genauso behandelt wie` yourname@example.com. Wenn Sie also Ihre E-Mail-Adresse in `yourname+1@example.com` aktualisieren, können Sie erneut Ablauf-E-Mails erhalten. Bei Certbot verwenden Sie:

` ~/certbot/venv/bin/certbot  register --update-registration --email yourname+1@example.com`
