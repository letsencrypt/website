---
title: Certificate Compatibility
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-01-21
---

{{< lastmod >}}

The main determining factor for whether a platform can validate Let's Encrypt certificates is whether that platform trusts ISRG's "ISRG Root X1" certificate. Some platforms can validate our certificates even though they don't include ISRG Root X1, because they trust IdenTrust's "DST Root CA X3" certificate. After September 2021, only those platforms that trust ISRG Root X1 will continue to validate Let's Encrypt certificates ([with the exception of Android][android-compat]).

[android-compat]: /2020/12/21/extending-android-compatibility.html

If your certificate validates on some of the "Known Compatible" platforms but not others, the problem may be a web server misconfiguration. If you're having an issue with modern platforms, the most common cause is failure to provide the correct certificate chain. Test your site with [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). If that doesn't identify the problem, ask for help in our [Community Forums](https://community.letsencrypt.org/).

# Platforms that trust ISRG Root X1

* Windows >= XP SP3 ([assuming Automatic Root Certificate Update isn't manually disabled](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 does not include it](https://support.apple.com/en-us/HT205205))
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (with updates applied)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (with updates applied)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Browsers (Chrome, Safari, Edge, Opera) generally trust the same root certificates as the operating system they are running on. Firefox is the exception: it has its own root store. Soon, new versions of Chrome will [also have their own root store][chrome-root-store].

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy

# Platforms that trust DST Root CA X3

* Windows >= XP SP3
* macOS (most versions)
* iOS (most versions)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= precise / 12.04
* [Debian >= squeee / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Blackberry >= 10.3.3
* PS4 game console with firmware >= 5.00

You may want to visit [this 2015-2017 community forum discussion](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) for more information about compatibility.

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
* PS3 game console
* PS4 game console with firmware < 5.00
