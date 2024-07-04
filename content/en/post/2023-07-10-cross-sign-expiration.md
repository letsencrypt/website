---
author: Aaron Gable
date: 2023-07-10T00:00:00Z
slug: cross-sign-expiration
title: "Shortening the Let's Encrypt Chain of Trust"
excerpt: "In late 2024, Let's Encrypt's cross-sign from IdenTrust will expire. Here's everything you need to know about the upcoming transition, and why it will be a non-event for most people."
menu:
  main:
    weight: 30
    parent: about
lastmod: 2024-02-08
---

When Let's Encrypt first launched, we needed to ensure that our certificates were widely trusted. To that end, we arranged to have our intermediate certificates [cross-signed by IdenTrust's DST Root CA X3](https://letsencrypt.org/2015/10/19/lets-encrypt-is-trusted.html). This meant that all certificates issued by those intermediates would be trusted, even while our own ISRG Root X1 wasn't yet. During subsequent years, our Root X1 became [widely trusted](https://letsencrypt.org/docs/certificate-compatibility/) on its own. 

Come late 2021, our cross-signed intermediates and DST Root CA X3 itself were expiring. And while all up-to-date browsers at that time trusted our root, [over a third of Android devices](https://letsencrypt.org/2020/11/06/own-two-feet.html) were still running old versions of the OS which would suddenly stop trusting websites using our certificates. That breakage would have been too widespread, so we arranged for a new cross-sign -- this time [directly onto our root](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html) rather than our intermediates -- which would outlive DST Root CA X3 itself. This stopgap allowed those old Android devices to continue trusting our certificates for three more years.

On September 30th, 2024, that cross-sign too will expire.

In the last three years, the percentage of Android devices which trust our ISRG Root X1 has risen from 66% to 93.9%. That percentage will increase further over the next year, especially as Android releases version 14, which has the ability to [update its trust store without a full OS update](https://www.xda-developers.com/android-14-root-certificates-updatable). In addition, dropping the cross-sign will reduce the number of certificate bytes sent in a TLS handshake by over 40%. Finally, it will significantly reduce our operating costs, allowing us to focus our funding on continuing to improve your privacy and security.

For these reasons, we will not be getting a new cross-sign to extend compatibility any further.

The transition will roll out as follows:

- On **Thursday, Feb 8th, 2024**, we stopped providing the cross-sign by default in requests made to our /acme/certificate API endpoint. For most Subscribers, this means that your ACME client will configure a chain which terminates at ISRG Root X1, and your webserver will begin providing this shorter chain in all TLS handshakes. The longer chain, terminating at the soon-to-expire cross-sign, will still be available as an alternate chain which you can configure your client to request.

- On **Thursday, June 6th, 2024**, we will stop providing the longer cross-signed chain entirely. This is just over [90 days](https://letsencrypt.org/2015/11/09/why-90-days.html) (the lifetime of one certificate) before the cross-sign expires, and we need to make sure subscribers have had at least one full issuance cycle to migrate off of the cross-signed chain.

- On **Monday, September 30th, 2024**, the cross-signed certificate will expire. This should be a non-event for most people, as any client breakages should have occurred over the preceding six months.

<div class="howitworks-figure">
<img alt="Infographic of the distribution of installed Android versions, showing that 93.9% of the population is running Android 7.1 or above."
     src="/images/2023.07.10-android-version-distribution.png"
     style="width: 50%"/>
</div>

**If you use Android 7.0 or earlier**, you may need to take action to ensure you can still access websites secured by Let's Encrypt certificates. We recommend installing and using [Firefox Mobile](https://www.mozilla.org/en-US/firefox/browsers/mobile/android/), which uses its own trust store instead of the Android OS trust store, and therefore trusts ISRG Root X1.

**If you are a site operator**, you should keep an eye on your website usage statistics and active user-agent strings during Q2 and Q3 of 2024. If you see a sudden drop in visits from Android, it is likely because you have a significant population of users on Android 7.0 or earlier. We encourage you to provide the same advice to them as we provided above.

**If you are an ACME client author**, please make sure that your client correctly downloads and installs the certificate chain provided by our API during every certificate issuance, including renewals. Failure modes we have seen in the past include a) never downloading the chain at all and only serving the end-entity certificate; b) never downloading the chain and instead serving a hard-coded chain; and c) only downloading the chain at first issuance and not re-downloading during renewals. Please ensure that your client does not fall into any of these buckets.

We appreciate your understanding and support, both now and in the years to come as we provide safe and secure communication to everyone who uses the web. If you have any questions about this transition or any of the other work we do, please ask on our [community forum](https://community.letsencrypt.org).

We'd like to thank IdenTrust for their years of partnership. They played an important role in helping Let's Encrypt get to where we are today and their willingness to arrange a stopgap cross sign in 2021 demonstrated a true commitment to creating a secure Web. 

We depend on contributions from our supporters in order to provide our services. If your company or organization can help our work by becoming a [sponsor](https://www.abetterinternet.org/sponsor/) of Let's Encrypt please email us at sponsor@letsencrypt.org. We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
