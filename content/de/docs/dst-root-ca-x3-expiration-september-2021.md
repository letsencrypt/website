---
title: DST Root CA X3 Ablaufdatum (September 2021)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-09-30
show_lastmod: 1
---

> **Aktualisierung am 30. September 2021** Wie geplant, ist die DST Root CA X3 Cross-Signatur abgelaufen, und wir verwenden jetzt unsere eigene ISRG Root X1 für das Vertrauen auf fast allen Geräten. Lesen Sie weiter, um mehr über den Plan zu erfahren! Wir haben auch unseren Thread zu den Änderungen an der Produktionskette in unserem Community-Forum aktualisiert - [unser Team und unsere Community sind hier und helfen gerne](https://community.letsencrypt.org/t/production-chain-changes/150739/4) bei allen Fragen, die Sie zu diesem Ablauf haben.

Am 30. September 2021 wird es eine kleine Änderung geben, wie ältere Browser und Geräte Let's Encrypt-Zertifikaten vertrauen. Wenn Sie eine typische Website betreiben, werden Sie keinen Unterschied bemerken - die große Mehrheit Ihrer Besucher wird Ihr Let's Encrypt-Zertifikat weiterhin akzeptieren. Wenn Sie eine API bereitstellen oder IoT-Geräte unterstützen müssen, müssen Sie der Änderung möglicherweise etwas mehr Aufmerksamkeit schenken.

Let's Encrypt verfügt über ein "[Wurzelzertifikat][]" namens [ISRG Root X1][]. Moderne Browser und Geräte vertrauen dem Let's Encrypt-Zertifikat, das auf Ihrer Website installiert ist, weil sie ISRG Root X1 in ihre Liste der Stammzertifikate aufnehmen. Um sicherzustellen, dass die von uns ausgestellten Zertifikate auf älteren Geräten vertrauenswürdig sind, haben wir auch eine "Gegensignatur" von einem älteren Stammzertifikat: DST Root CA X3.

Als wir anfingen, half uns dieses ältere Root-Zertifikat (DST Root CA X3) dabei, loszulegen und von fast jedem Gerät sofort als vertrauenswürdig eingestuft zu werden. Das neuere Root-Zertifikat (ISRG Root X1) genießt inzwischen ebenfalls großes Vertrauen - aber einige ältere Geräte werden ihm nie vertrauen, weil sie keine Software-Updates erhalten (z. B. ein iPhone 4 oder ein HTC Dream). [Klicken Sie hier für eine Liste, welche Plattformen ISRG Root X1 vertrauen][compatibility].

Die DST Root CA X3 wird am 30. September 2021 auslaufen. Das bedeutet, dass ältere Geräte, die ISRG Root X1 nicht vertrauen, beim Besuch von Websites, die Let's Encrypt-Zertifikate verwenden, Zertifikatswarnungen erhalten. Es gibt eine wichtige Ausnahme: Ältere Android-Geräte, die ISRG Root X1 nicht vertrauen, funktionieren weiterhin mit Let's Encrypt, [dank eines speziellen Cross-Signs von DST Root CA X3][cross-sign], das über das Auslaufen dieses Roots hinausgeht. Diese Ausnahme gilt nur für Android.

Was sollten Sie tun? Für die meisten Menschen, überhaupt nichts! Wir haben die Zertifikatausstellung so eingerichtet, dass Ihre Website in den meisten Fällen das Richtige tut und eine breite Kompatibilität bevorzugt. Wenn Sie eine API anbieten oder IoT-Geräte unterstützen müssen, müssen Sie zwei Dinge sicherstellen: (1) alle Clients Ihrer API müssen ISRG Root X1 vertrauen (nicht nur DST Root CA X3), und (2) wenn Clients Ihrer API OpenSSL verwenden, [müssen sie Version 1.1.0 oder höher verwenden][openssl]. In OpenSSL 1.0.x bedeutet eine Eigenheit in der Zertifikatsüberprüfung, dass selbst Clients, die ISRG Root X1 vertrauen, scheitern, wenn ihnen die Android-kompatible Zertifikatskette vorgelegt wird, die wir standardmäßig empfehlen.

Wenn Sie zusätzliche Informationen über unsere laufenden Änderungen in der Produktionskette wünschen, [sehen Sie sich bitte diesen Thread in unserer Community an][production].

Wenn Sie Fragen zum bevorstehenden Ablauf der Frist haben, [schreiben Sie bitte in diesen Thread in unserem Forum.][forum]

[Wurzelzertifikat]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
