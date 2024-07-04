---
title: "Let's Encrypt Zertificates auf GoDaddy Hosting"
slug: godaddy
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Wir haben eine Menge Anfragen bekommen, wie Let's Encrypt auf GoDaddy zu verwenden ist. Wenn Sie GoDaddy Shared Web Hosting verwenden, ist es momentan sehr schwierig, Let's Encrypt Zertifikate zu installieren, weswegen wir das momentan nicht empfehlen können. Begründet wird das damit, weil GoDaddy das [ACME Protocol][1] zum automatischen Ausstellen und Erneuern von Zertifikaten nicht unterstützt. Stattdessen bietet GoDaddy ein automatisches Ausstellen und Erneuern für seine eigenen Zertifikate an, was eine [kostenpflichtiges Zusatzfunktion][2] ist.

Wir empfehlen, bei Hosting-Anbietern, die das ACME-Protokoll nicht direkt implementieren, die Option "Let's Encrypt" nicht zu verwenden, da Sie dadurch die Erneuerungen nicht vollständig automatisieren können. Wir sind der Meinung, dass automatische Verlängerungen ein sehr wichtiger Bestandteil bei der Verwendung von Zertifikaten sind. Durch die Verwendung von Software zur Automatisierung der Erneuerung ist es weniger wahrscheinlich, dass Ihr Zertifikat abläuft, ohne ersetzt zu werden. Wenn Ihr Zertifikat abläuft, ist dies für Ihre Benutzer sehr frustrierend, da sie nicht auf Ihre Website zugreifen können.

Weil wir so stark an die automatisierte Erneuerung glauben, entwerfen wir unsere Zertifikate für die Verwendung mit ACME-Automatisierung. Ein Let's Encrypt-Zertifikat wird nach 60 Tagen automatisch erneuert und funktioniert nach 90 Tagen nicht mehr, wenn es nicht erneuert wird.

Wenn Sie immer ein Let’s Encrypt Zertifikat auf GoDaddy Shared Hosting verwenden möchten, lesen Sie die von GoDaddy [bereitgestellten Anweisungen][3]. Beachten Sie, dass diese Anweisungen zeitintensiv sind und Sie dies alle 60 Tage tun müssen (und nicht alle 90 Tage wie im Link beschrieben).

[1]: https://tools.ietf.org/html/rfc8555
[2]: https://www.godaddy.com/web-security/ssl-certificate
[3]: https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023
