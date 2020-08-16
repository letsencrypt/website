---
title: Certificate Compatibility
slug: certificate-compatibility
top_graphic: 1
lastmod: 2020-08-16
---

{{< lastmod >}}

Let's Encrypt aims to be compatible with as much software as possible without compromising security. The main determining factor for whether a platform can validate Let's Encrypt certificates is whether that platform includes ISRG's "ISRG Root X1" certificate or IdenTrust's "DST Root CA X3" certificate in its trust store.

If your certificate validates on some of the "Known Compatible" platforms but not others, the problem may be a web server misconfiguration. If you're having an issue with modern platforms, the most common cause is failure to provide the correct certificate chain. If you're having an issue with older platforms like Windows XP, the most common causes are failure to configure a ciphersuite or TLS version that is supported on the platform or that the platform lacks support for Server Name Indication (SNI). Test your site with [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). If that doesn't identify the problem, ask for help in our [Community Forums](https://community.letsencrypt.org/).

You may want to visit [this particular community forum discussion](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) for more information about compatibility.

From **September 29, 2020**, Let’s Encrypt will change default certificate chain from DST Root X3 to ISRG Root X1. if you want your certificate to be trusted by ISRG Root X1 incompatible clients(ex. Android < 7.1.1), you should manually configure intermediate certificate with DST Root X3 cross-signed one.

From **September 29, 2021**, Let’s Encrypt only issue certificate under ISRG Root X1. if you want your certificate to be trusted by ISRG Root X1 incompatible clients(ex. Android < 7.1.1), you should consider other CA.

For more information please visit link below.
* https://letsencrypt.org/2019/04/15/transitioning-to-isrg-root.html
* https://community.letsencrypt.org/t/transition-to-isrgs-root-delayed-until-sep-29/125516


# Known Compataible (ISRG Root X1)
* Windows 7+ (with 2018-Jun-31 update)
* Mac OS >= 10.12.1 Sierra
* iOS >= 10
* Android >= 7.1.1
* Debian 8
* Oracle JDK 7 >= 7u151
* Oracle/Open JDK 8 >= 8u141
* Oracle/Open JDK >= 11
* Firefox >= 50
* Mozilla NSS 3.26

# Known Incompatible (ISRG Root X1)
* **Android < 7.1.1**
* iOS < 9
* Centos 6.9

# Known Compatible (DST Root X3)

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

# Known Incompatible (DST Root X3)

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
