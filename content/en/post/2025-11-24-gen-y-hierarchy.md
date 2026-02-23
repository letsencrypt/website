---
author: Aaron Gable
date: 2025-11-24T00:00:00Z
slug: gen-y-hierarchy
title: "New \"Generation Y\" Hierarchy of Root and Intermediate Certificates"
excerpt: "Let's Encrypt is beginning issuance from our new hierarchy of root and intermediate certificates."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

In a ceremony held in September, Let’s Encrypt generated two new Root Certification Authorities (CAs) and six new Intermediate CAs, which we’re collectively calling the “Generation Y” hierarchy. Now we’re moving to begin issuing certificates from this new hierarchy, and to submit it to various root programs for inclusion in their trust stores.

<figure>

![Diagram of the new Generation Y Root and Intermediate CAs](/images/blog/2025-11-24-gen-y-hierarchy.png)

</figure>

The [two new roots](/certificates/#root-cas) look very similar to our existing roots. The new [ISRG Root YR](https://letsencrypt.org/certs/gen-y/root-yr.txt) has an RSA 4096 key and is valid for twenty years, just like [ISRG Root X1](https://letsencrypt.org/certs/isrgrootx1.txt). Similarly, the new [ISRG Root YE](https://letsencrypt.org/certs/gen-y/root-ye.txt) has an ECDSA P-384 key, just like [ISRG Root X2](https://letsencrypt.org/certs/isrg-root-x2.txt). We’ve made a few adjustments (for example, replacing “Internet Security Research Group” with “ISRG” to save a few bytes), but nothing major. Each of these new roots is intended to eventually replace its corresponding predecessor, and to that end we have cross-signed the new roots from the old ones.

The [six new intermediates](/certificates/#subordinate-intermediate-cas) consist of three intermediates each issued from each of the two new roots. ISRG Root YE has issued the [YE1](https://letsencrypt.org/certs/gen-y/int-ye1.txt), [YE2](https://letsencrypt.org/certs/gen-y/int-ye2.txt), and [YE3](https://letsencrypt.org/certs/gen-y/int-ye3.txt) intermediates, while ISRG Root YR has issued the [YR1](https://letsencrypt.org/certs/gen-y/int-yr1.txt), [YR2](https://letsencrypt.org/certs/gen-y/int-yr2.txt), and [YR3](https://letsencrypt.org/certs/gen-y/int-yr3.txt) intermediates. These have two key differences from our current crop of issuing intermediates. First, their names: we’re now numbering intermediates under each root sequentially, rather than using the same numbering sequence across all intermediates. This makes it slightly easier to keep track of which intermediates are currently in use, and prepares for a possible post-quantum future where we have additional key types.

Second and more importantly: these intermediates do not contain the “TLS Web Client Authentication” Extended Key Usage. This means that these intermediates cannot issue end-entity certificates containing that EKU. As we’ve [already announced](/2025/05/14/ending-tls-client-authentication), we will be phasing out issuance of tlsClientAuth certificates in 2026 due to a root program requirement. Until that time, we will only be using the new hierarchy to issue certificates under the “[tlsserver](https://letsencrypt.org/docs/profiles/#tlsserver)” and “[shortlived](https://letsencrypt.org/docs/profiles/#shortlived)” profiles, which already omit that EKU. After the tlsClientAuth deprecation is complete, we will shift to using the new intermediates for all issuance.

If you’re requesting the tlsserver or shortlived profile, you can expect to see issuance from (the [Staging equivalent](/docs/staging-environment/) of) the new hierarchy as of today. We expect to make the same change in our Production environment next month. As before, each issuance will choose which intermediate to use at random, to [discourage intermediate key pinning](https://letsencrypt.org/2024/03/19/new-intermediate-certificates#rotating-issuance).

We’ll be submitting the new roots for inclusion in the Apple, Chrome, Microsoft, Mozilla, and other root programs shortly thereafter. We look forward to updating you again when the new hierarchy is officially included in those trust stores!
