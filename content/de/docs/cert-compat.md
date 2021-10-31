---
title: Kompatibilität der Zertifikate
slug: certificate-compatibility
top_graphic: 1
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt zielt darauf ab, mit so viel Software wie möglich kompatibel zu sein, ohne die Sicherheit zu beeinträchtigen. Der entscheidende Faktor dafür, ob eine Plattform Let's Encrypt-Zertifikate überprüfen kann, ist, ob diese Plattform das DST-Root-X3-Zertifikat von IdenTrust in den Truststore einbezieht.

Wenn Ihr Zertifikat auf einigen bekannten kompatiblen Plattformen, aber auf anderen Plattformen nicht validiert wird, kann das Problem eine falsche Konfiguration des Webservers sein. Wenn Sie ein Problem mit modernen Plattformen haben, liegt die häufigste Ursache darin, dass Sie nicht die richtige Zertifikatskette bereitstellen. Wenn Sie ein Problem mit älteren Plattformen wie Windows XP haben, sind die häufigsten Ursachen die fehlgeschlagene Konfiguration einer Chiffresuite- oder TLS-Version, die von der Plattform nicht unterstützt werden, oder Server Name Indication (SNI), die nicht unterstützt wird. Testen Sie Ihre Seite mit dem [SSL Labs Server Test](https://www.ssllabs.com/ssltest/). Wenn das Problem dadurch nicht erkannt wird, bitten Sie um Hilfe in unseren [Community-Foren](https://community.letsencrypt.org/).

Sie möchten vielleicht für mehr Informationen zu Kompatibilität auch [diesen Teil einer Forumdiskussion lesen](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/).

# Bekannte kompatible Plattformen

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer auf Windows XP SP3 und neuer
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 on macOS
* Safari auf iOS >= v3.1
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
* PS4-Konsole mit Firmware >= 5.00

# Bekannte inkompatible Plattformen

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP vor SP3
  * kann SHA-2 signierte Zertifkate nicht verarbeiten
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (Programm von 2012, nicht Webmail)
  * kann Zertifikate ohne CRL nicht verarbeiten
* PS3-Konsole
* PS4-Konsole mit Firmware < 5.00
