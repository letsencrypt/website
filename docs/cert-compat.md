---
layout: page
title: Certificate Compatibility
permalink: /docs/certificate-compatibility/
top_graphic: 1
date: 2016-12-05T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

Let's Encrypt aims to be compatible with as much software as possible without compromising security. The main determining factor for whether a platform can validate Let's Encrypt certificates is whether that platform includes IdenTrust's DST Root X3 certificate in its trust store. A secondary factor is whether the platform supports modern [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) certificates, since all Let's Encrypt certificates use SHA-2.

If your certificate validates on some of the "Known Compatible" platforms but not others, the problem may be a web server misconfiguration, most likely failure to provide the correct certificate chain. Test your site with [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). If that doesn't identify the problem, ask for help in our [Community Forums](https://community.letsencrypt.org/).

You may want to visit [this particular community forum discussion](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) for more information about compatibility.

# Known Compatible

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

# Possibly Incompatible

* Sony PS3 and PS4 Game Consoles

# Known Incompatible

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP prior to SP3
  * cannot handle SHA-2 signed certificates
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 mail client, not webmail)
  * cannot handle certificates without a CRL
