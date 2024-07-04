---
author: Kruti Sutaria
date: 2024-04-12T00:00:00Z
slug: changes-to-issuance-chains
title: "Deploying Let's Encrypt's New Issuance Chains"
excerpt: "Using our new RSA & ECDSA intermediates to sign certificates starting June 6th."
---

On **Thursday, June 6th, 2024**, we will be switching issuance to use our [new intermediate certificates](https://letsencrypt.org/2024/03/19/new-intermediate-certificates). Simultaneously, we are removing the DST Root CA X3 cross-sign from our API, aligning with our strategy to shorten the Let's Encrypt chain of trust. We will begin issuing ECDSA end-entity certificates from a default chain that just contains a single ECDSA intermediate, removing a second intermediate and the option to issue an ECDSA end-entity certificate from an RSA intermediate. The Let's Encrypt staging environment will make an equivalent change on April 24th, 2024.

**Most Let's Encrypt Subscribers  will not need to take any action** in response to this change because ACME clients, like [certbot](https://certbot.eff.org/), will automatically configure the new intermediates when certificates are renewed. The Subscribers who will be affected are those who currently pins intermediate certificates (more on that later).

The following diagram depicts what the new hierarchy looks like. You can see details of all of the certificates on our [updated Chain of Trust documentation page](https://letsencrypt.org/certificates/).

![](/images/blog/ChainofTrust2024CeremonyBlogPost.png)

## New Intermediate Certificates

Earlier this year, Let's Encrypt generated [new intermediate keys and certificates](https://letsencrypt.org/2024/03/19/new-intermediate-certificates). They will replace the current intermediates, which were issued in September 2020 and are approaching their expiration.

All certificates - issued by both RSA and ECDSA intermediates - will be served with a default chain of **ISRG Root X1 → (RSA or ECDSA) Intermediate → End-Entity Certificate**. That is, all certificates, regardless of whether you choose to have an RSA or ECDSA end-entity certificate, will have one intermediate which is directly signed by the ISRG Root X1, which is Let's Encrypt's most widely trusted root.

The new ECDSA intermediates will also have an alternate chain to **ISRG Root X2: ISRG Root X2 → ECDSA Intermediate → End-Entity Certificate**. This is only applicable to a small number of Subscribers who prefer the smallest TLS handshake possible. To use this ECDSA-only chain, see your ACME client's documentation on how to request alternate chains. There will not be any alternative chains for the RSA intermediates.

It is important to note that there will now be multiple active RSA and two active ECDSA intermediates at the same time. An RSA leaf certificate may be signed by any of the active RSA intermediates (a value from "R10" to "R14" in the issuer common name field of your certificate), and an ECDSA leaf certificate may be signed by any of the active ECDSA intermediates ("E5" through "E9"). Again, your ACME client should handle this automatically.

A Certificate Authority's intermediate certificates expire every few years and need to be replaced, just like a website's certificate is routinely renewed. Going forward, Let's Encrypt intends to switch what intermediates are in use annually, which will help enhance the overall security of the certificates.

## Removing DST Root CA X3 Cross-sign

The new intermediate chains will not include the DST Root CA X3 cross-sign, as previously announced in our post about [Shortening the Let's Encrypt Chain of Trust](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html). By eliminating the cross-sign, we're making our certificates leaner and more efficient, leading to faster page loads for Internet users. We already stopped providing the cross-sign in the default certificate chain on February 8th, 2024, so if your ACME client is not explicitly requesting the chain with DST Root CA X3, this will not be a change for you.

## ECDSA Intermediates as Default for ECDSA Certificates

Currently, ECDSA end-entity certificates are signed by our RSA intermediates unless users opted in via a request form to use our ECDSA intermediates. With our new intermediates, we will begin issuing all ECDSA end-entity certificates from the ECDSA intermediates. The request form and allow-list will no longer be used, [which we had introduced to make ECDSA intermediates available](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679).

Earlier, the default ECDSA chain included two intermediates: both E1 and the cross-signed ISRG Root X2 (i.e. **ISRG Root X1 → ISRG Root X2 → E1 → End-Entity Certificate**). After the change, it will contain only a single intermediate: the version of one of our new ECDSA intermediates cross-signed by ISRG Root X1 (i.e. **ISRG Root X1 → E5 → End-Entity Certificate**). This ensures that all of our intermediates, both RSA and ECDSA, are signed directly by our most widely-trusted ISRG Root X1.

We expect this change to benefit most users with smaller TLS handshakes. If compatibility problems with ECDSA intermediates arise, we recommend Let's Encrypt users switch to RSA certificates. Android 7.0 is [known to have a bug preventing it from working with most Elliptic Curve (EC) certificates](https://issuetracker.google.com/issues/37122132), including our ECDSA intermediates; however, that version of Android doesn't trust our ISRG Root X1 and thus is already incompatible.

## Risks of Pinning or Hard-Coding Intermediates

*We do not recommend pinning or otherwise hard-coding intermediates or roots.* Pinning intermediates is especially not advisable as they change often. If you do pin intermediates, make sure you have the complete set of new intermediates ([available here](https://letsencrypt.org/certificates/)).

## Questions?

We're grateful for the millions of subscribers who have trusted us to carry out best practices to make the web more secure and privacy-respecting, and rotating intermediates more frequently is one of them. We'd also like to thank our great community and the funders whose support makes this work possible. If you have any questions about this transition or any of the other work we do, please ask on our [community forum](https://community.letsencrypt.org/).

We depend on contributions from our supporters in order to provide our services. If your company or organization can help our work by becoming a [sponsor](https://www.abetterinternet.org/sponsor/) of Let's Encrypt please email us at sponsor@letsencrypt.org. We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.