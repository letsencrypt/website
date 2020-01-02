---
title: Certifikatkompabilitet
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt siktar på att vara kompatibla med så mycket mjukvara som möjligt
utan att tumma på säkerheten. Den avgörande faktorn för huruvida en plattform
kan validera Let's Encrypt-certifikat är huruvida plattformen litar på
IdenTrusts DST Root X3-certifikat. En annan faktor är huruvida plattformen
stöder moderna
[SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1)-certifikat
eftersom alla Let's Encrypt-certifikat använder SHA-2.

Om dina certifikat validerar på vissa av de känt kompatible plattformarna nedan
men inte på andra så kan problemet ligga i webbserverkonfigurationen. Om du har
problem med moderna plattformar är den vanligaste anledningen att inte rätt
certifikatkedja används. Om du har problem med äldre plattformar som Windows XP
så är de vanligaste anledningarna att en chiffersvit eller TLS-version utan stöd
på plattformen använts eller att plattformen saknar stöd för Server Name
Indication (SNI). Testa din webbplats med [servertestet hos SSL
Labs](https://www.ssllabs.com/ssltest/). Om inte det hittar problemet så kan du
fråga efter hjälp på engelska i vårt
[användarforum](https://community.letsencrypt.org/).

Besök [den här specifika diskussionen på
användarforumet](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)
(engelska) för mer information om kompabilitet.

# Känt kompatibla

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer på Windows XP SP3 och högre
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 på macOS
* Safari på iOS >= v3.1
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
* PS4 spelkonsol med firmware >= 5.00

# Känt inkompatibla

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP innan SP3
  * kan ej hantera SHA-2-signerade certifikat
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 e-postklient, inte webbmail)
  * kan ej hantera certifikat utan en CRL
* PS3 spelkonsol
* PS4 spelkonsol med firmware < 5.00
