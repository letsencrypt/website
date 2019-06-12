---
title: Zertifikatskompatibilität
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt zielt darauf ab, mit so viel Software wie möglich kompatibel zu sein, ohne die Sicherheit zu beeinträchtigen. Der entscheidende Faktor dafür, ob eine Plattform Let's Encrypt-Zertifikate überprüfen kann, ist, ob diese Plattform das DST-Root-X3-Zertifikat von IdenTrust in den Truststore einbezieht. Ein sekundärer Faktor ist, ob die Plattform moderne [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) -Zertifikate unterstützt, da alle Let's Zertifikate verschlüsseln mit SHA-2.

Wenn Ihr Zertifikat auf einigen "Known Compatible" -Plattformen, aber nicht auf anderen Plattformen überprüft wird, kann das Problem eine falsche Konfiguration des Webservers sein. Wenn Sie ein Problem mit modernen Plattformen haben, liegt die häufigste Ursache darin, dass Sie nicht die richtige Zertifikatskette bereitstellen. Wenn Sie ein Problem mit älteren Plattformen wie Windows XP haben, sind die häufigsten Ursachen die fehlgeschlagene Konfiguration einer Chiffresuite- oder TLS-Version, die von der Plattform nicht unterstützt werden, oder Server Name Indication (SNI), die nicht unterstützt wird. Testen Sie Ihre Seite mit dem [SSL Labs Server Test](https://www.ssllabs.com/ssltest/). Wenn das Problem dadurch nicht erkannt wird, bitten Sie um Hilfe in unseren [Community-Foren](https://community.letsencrypt.org/).

Sie möchten vielleicht für mehr Informationen zu Kompatibilität auch [diesen Teil einer Forumdiskussion lesen](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/).

# bekannt kompatibel

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer on Windows XP SP3 and higher
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 on macOS
* Safari on iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* PS4 game console with firmware >= 5.00

# bekannt inkompatibel

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP prior to SP3
  * cannot handle SHA-2 signed certificates
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 mail client, not webmail)
  * cannot handle certificates without a CRL
* PS3 game console
* PS4 game console with firmware < 5.00
