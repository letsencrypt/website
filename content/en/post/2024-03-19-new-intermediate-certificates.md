---
author: Phil Porada & Aaron Gable
date: 2024-03-19T00:00:00Z
slug: new-intermediate-certificates
title: "New Intermediate Certificates"
excerpt: "Adding new intermediates for security, efficiency, and agility."
---

On Wednesday, March 13, 2024, Let's Encrypt generated 10 new Intermediate CA Key Pairs, and issued 15 new Intermediate CA Certificates containing the new public keys. These new intermediate certificates provide smaller and more efficient certificate chains to Let's Encrypt Subscribers, enhancing the overall online experience in terms of speed, security, and accessibility.

First, a bit of history. In September, 2020, Let's Encrypt issued a [new root and collection of intermediate certificates](https://letsencrypt.org/2020/09/17/new-root-and-intermediates). Those certificates helped us improve the privacy and efficiency of Web security by making ECDSA end-entity certificates widely available. However, those intermediates are approaching their expiration dates, so it is time to replace them.

Our new batch of intermediates are very similar to the ones we issued in 2020, with a few small changes. We're going to go over what those changes are and why we made them.

## The New Certificates

We created 5 new 2048-bit RSA intermediate certificates named in sequence from R10 through R14. These are issued by ISRG Root X1. You can think of them as direct replacements for our existing R3 and R4 intermediates.

We also created 5 new P-384 ECDSA intermediate certificates named in sequence from E5 through E9. Each of these is represented by two certificates: one issued by ISRG Root X2 (exactly like our existing E1 and E2), and one issued (or cross-signed) by ISRG Root X1.

You can see details of all of the certificates on our [updated hierarchy page](https://letsencrypt.org/certificates/).

![Let's Encrypt 2024 Ceremony](/images/blog/ChainofTrust2024CeremonyBlogPost.png)

## Rotating Issuance

Rotating the set of intermediates we issue from helps keep the Internet agile and more secure. It encourages automation and efficiency, and discourages outdated practices like key pinning. "Key Pinning" is a practice in which clients --- either ACME clients getting certificates for their site, or apps connecting to their own backend servers --- decide to trust only a single issuing intermediate certificate rather than delegating trust to the system trust store. Updating pinned keys is a manual process, which leads to an increased risk of errors and potential business continuity failures.

Intermediates usually change only every five years, so this joint is exercised infrequently and client software keeps making the same mistakes. Shortening the lifetime from five years to three years means we will be conducting another ceremony in just two years, ahead of the expiration date on these recently created certificates. This ensures we exercise the joint more frequently than in the past.

We also issued _more_ intermediates this time around. Historically, we've had two of each key type (RSA and ECDSA): one for active issuance, and one held as a backup for emergencies. Moving forward we will have five: two conducting active issuance, two waiting in the wings to be introduced in about one year, and one for emergency backup. Randomizing the selected issuer for a given key type means it will be impossible to predict which intermediate a certificate will be issued from. We are very hopeful that these steps will prevent intermediate key pinning altogether, and help the WebPKI remain agile moving forward.

These shorter intermediate lifetimes and randomized intermediate issuance shouldn't impact the online experience of the general Internet user. Subscribers may be impacted if they are pinning one of our intermediates, though this should be incredibly rare.

## Providing Smaller Chains

When we issued ISRG Root X2 in 2020, we decided to cross-sign it from ISRG Root X1 so that it would be trusted even by systems that didn't yet have ISRG Root X2 in their trust store. This meant that Subscribers who wanted issuance from our ECDSA intermediates would have a choice: they could either have a very short, ECDSA-only, but low-compatibility chain terminating at ISRG Root X2, or they could have a longer, high-compatibility chain terminating at ISRG Root X1. At the time, this tradeoff (TLS handshake size vs compatibility) seemed like a reasonable choice to provide, and we provided the high-compatibility chain by default to support the largest number of configurations.

ISRG Root X2 is now trusted by most platforms, and we can now offer an improved version of the same choice. The same very short, ECDSA-only chain will still be available for Subscribers who want to optimize their TLS handshakes at the cost of some compatibility. But the high-compatibility chain will be drastically improving: instead of containing two intermediates (both E1 and the cross-signed ISRG Root X2), it will now contain only a single intermediate: the version of one of our new ECDSA intermediates cross-signed by ISRG Root X1.

This reduces the size of our default ECDSA chain by about a third, and is an important step towards removing our [ECDSA allow-list](https://docs.google.com/forms/d/e/1FAIpQLScCWnApP2eUk4cA6y5cFOENlm5S2StVedrqYNzeNdTPoArzwA/viewform).

## Other Minor Changes

We've made two other tiny changes that are worth mentioning, but will have no impact on how Subscribers and clients use our certificates:

- We've changed how the Subject Key ID field is calculated, from a SHA-1 hash of the public key, to a [truncated SHA-256 hash](https://datatracker.ietf.org/doc/html/rfc7093#section-2) of the same data. Although this use of SHA-1 was not cryptographically relevant, it is still nice to remove one more usage of that [broken algorithm](https://shattered.io/), helping move towards a world where cryptography libraries don't need to include SHA-1 support at all.

- We have removed our CPS OID from the Certificate Policies extension. This saves a few bytes in the certificate, which can add up to a lot of bandwidth saved over the course of billions of TLS handshakes.

Both of these mirror two [identical](https://community.letsencrypt.org/t/enabling-sha256-subject-key-identifiers-for-end-entity-certificates/211453/4) [changes](https://community.letsencrypt.org/t/small-change-to-end-entity-certificates-cps-url-and-oid-will-not-be-included-from-june-15/198206/5) that we made for our Subscriber Certificates in the past year.

## Deployment

We intend to put two of each of the new RSA and ECDSA keys into rotation in the next few months. Two of each will be ready to swap in at a future date, and one of each will be held in reserve in case of an emergency. Read more about the strategy in our December 2023 post on the [Community Forum](https://community.letsencrypt.org/t/lets-encrypt-new-intermediate-certificates/209498).

Not familiar with the forum? It's where Let's Encrypt publishes updates on our [Issuance Tech](https://community.letsencrypt.org/c/issuance-tech-questions/12) and [APIs](https://community.letsencrypt.org/c/api-announcements/18). It's also where you can go for troubleshooting help from community experts and Let's Encrypt staff. [Check it out](https://community.letsencrypt.org/) and subscribe to alerts for technical updates.

We hope that this has been an interesting and informative tour around our new intermediates, and we look forward to continuing to improve the Internet, one certificate at a time.

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let's Encrypt please email us at sponsor@letsencrypt.org. We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
