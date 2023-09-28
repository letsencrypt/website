---
title: Certificate Compatibility
slug: certificate-compatibility
top_graphic: 1
lastmod: 2023-08-02
show_lastmod: 1
---


The main determining factor for whether a platform can validate Let's Encrypt certificates is whether that platform trusts ISRG's "ISRG Root X1" certificate. Prior to September 2021, some platforms could validate our certificates even though they don't include ISRG Root X1, because they trusted IdenTrust's "DST Root CA X3" certificate. From October 2021 onwards, only those platforms that trust ISRG Root X1 will validate Let's Encrypt certificates ([with the exception of Android][android-compat]).

[android-compat]: /2020/12/21/extending-android-compatibility.html

If your certificate validates on some of the "Known Compatible" platforms but not others, the problem may be a web server misconfiguration. If you're having an issue with modern platforms, the most common cause is failure to provide the correct certificate chain. Test your site with [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). If that doesn't identify the problem, ask for help in our [Community Forums](https://community.letsencrypt.org/).

# Platforms that trust ISRG Root X1

* Windows >= XP SP3 ([assuming Automatic Root Certificate Update isn't manually disabled](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 does not include it](https://support.apple.com/en-us/HT205205))
* [iPhone 5 and above can upgrade to iOS 10](https://en.wikipedia.org/wiki/IPhone_5) and can thus trust ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (but Android >= 2.3.6 will work by default [due to our special cross-sign](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin / 12.04 (with updates applied)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (with updates applied)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Browsers (Chrome, Safari, Edge, Opera) generally trust the same root certificates as the operating system they are running on. Firefox is the exception: it has its own root store. Soon, new versions of Chrome will [also have their own root store][chrome-root-store].

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy

# Platforms that trust DST Root CA X3 but not ISRG Root X1

These platforms would have worked up to September 2021 but will no longer
validate Let's Encrypt certificates.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) and < jessie /8
* Java 8 >= 8u101 and < 8u141
* Java 7 >= 7u111 and < 7u151
* NSS >= v3.11.9 and < 3.26
* Amazon FireOS (Silk Browser) (version range unknown)
* Cyanogen > v10 (version that added ISRG Root X1 unknown)
* Jolla Sailfish OS > v1.1.2.16 (version that added ISRG Root X1 unknown)
* Kindle > v3.4.1 (version that added ISRG Root X1 unknown)
* Blackberry >= 10.3.3 (version that added ISRG Root X1 unknown)
* PS4 game console with firmware >= 5.00 (version that added ISRG Root X1 unknown)

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

# ISRG Root X2 (new ECDSA root) - coming soon

We have submitted ISRG Root X2 to the Microsoft, Apple, Google, Mozilla, and Oracle root programs for inclusion.

ISRG Root X2 is already widely trusted via a cross-sign from our ISRG Root X1. Additionally, several root programs have already added ISRG Root X2 as a trust anchor.

For more information about inclusion status, check out our [community forum post](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).

While we wait for ISRG Root X2 to become widely trusted, it's possible to opt-in to use ISRG Root X2 for your ECDSA certificates. For more information, see our [community forum post](https://community.letsencrypt.org/t/root-x2-alternate-chain-for-ecdsa-opt-in-accounts/202884).
