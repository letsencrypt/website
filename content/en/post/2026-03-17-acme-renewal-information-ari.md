---
author: Nick Silverman
date: 2026-03-17T00:00:00Z
slug: acme-renewal-information-ari
title: "Simplifying Certificate Renewals for Millions of Domains with ACME Renewal Information (ARI)"
excerpt: "ACME Renewal Information (ARI) helped Shopify make certificate renewals for millions of domains more reliable, scalable, and easier to manage."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

> Nick Silverman is a Senior Infrastructure Engineer on the Edge Infrastructure team at Shopify, where he maintains the systems that provision, renew, and publish SSL certificates for millions of merchants' custom domains. He is also a contributor to the Ruby acme-client gem.

### The challenge

Shopify's automated certificate management system relied on a static renewal threshold: 30 days before the end of the 90-day lifetime. To spread the load of provisioning and renewing certificates, we implemented a random 0--72 hour delay for each. While this helps evenly distribute certificate management over time, it did not take into account the Certificate Authority's (CA) load. It was also incapable of reacting to a dynamic renewal window based on information provided by the CA.

However, this approach needed greater resilience to solve what is, in the end, a distributed coordination problem. The weaknesses are:

- **No rapid revocation response:** The static logic is not aware of revocations at all.

- **Brittleness to lifetime changes:** The static 30-day threshold is not resilient to changes in certificate lifetime, such as [Let's Encrypt's announced plan to move to 45-day certificates.](/2025/12/02/from-90-to-45)

- **Imperfect load distribution:** Despite the random jitter, massive renewal bursts could still occur.

Shopify needed to develop a global coordination system to balance the load and handle regular and urgent renewals. Thankfully, Let's Encrypt has led the charge on a solution for this and other very important aspects of the certificate lifecycle.

### The journey

Let's Encrypt and the Internet Engineering Task Force (IETF) published the [ACME Renewal Information (ARI)](/2025/09/16/ari-rfc) standard which makes an endpoint available that provides a recommended window of time for the renewal to occur. The endpoint returns a payload that looks something like this:

```shell
GET /renewal-info/ACME_KEY_IDENTIFIER
{
  "suggestedWindow": {
    "start": "2026-02-03T04:00:00Z",
    "end": "2026-02-04T04:00:00Z"
  }
}
```

Shopify's certificate management system uses the [acme-client](https://github.com/unixcharles/acme-client) Ruby gem originally authored by another Shopify employee. Despite Let's Encrypt enabling support for ARI in their official software, the Ruby gem did not yet support this feature. Rather than building a custom solution, we decided to enable support for the ARI extension directly in the client.

Let's Encrypt's [guide to integrating ARI](/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients) provided the necessary roadmap, and the implementation was completed with [one PR](https://github.com/unixcharles/acme-client/pull/257). This contribution means that not only Shopify, but also the wider Ruby community, can benefit from the ARI extension.

### Deployment and ARI at scale

Once we shipped the gem support, integrating ARI into our certificate management system was straightforward. Instead of checking a static 30-day threshold, we now query the ARI endpoint and use the suggested renewal window as the gate for initiating renewals. Those dates are stored alongside the certificate upon its initial provisioning.

The updated Ruby gem provides a method for fetching renewal information:

```ruby
renewal_info = client.renewal_info(certificate: existing_certificate_pem)
```

This method generates an ARI certificate identifier that can be used when making the API call. The client also includes a helper method, `suggested_renewal_time`, which chooses a random time between the returned start and end dates. The certificate identifier can be passed to the `new_order` method via the `replaces` key, which can grant a higher priority or bypass rate limits for renewals occurring during the window, depending on the CA's policies.

Critically, Shopify also regularly polls the ARI endpoint for updated renewal timestamps. This allows our systems to rely on those timestamps as the primary renewal timing logic and removes the need for inflexible hard-coded expiry thresholds. This becomes the mechanism that LetsEncrypt uses to dynamically change the renewal time due to a revocation event.

### Results and rewards

![](/images/blog/2026.03.17.acme-renewal-information-ari-image-1.png)

Since enabling the use of the ARI extension, our certificate management system has become significantly more robust. Shopify now delegates the responsibility of determining renewal timing to Let's Encrypt. The ARI extension has proven to be an impactful infrastructure improvement and the benefits gained are immediate. These benefits, alongside fewer manual interventions, are the operational success story:

- **Future-proofing:** We gained resilience against any future certificate lifetime changes and mass revocation events without needing code updates---ensuring our renewal logic is flexible.

- **Optimized load:** We directly benefit from the CA's coordinated load balancing provided by the suggested renewal window, eliminating local randomness issues and the need for complex global coordination.

- **Revocation readiness:** ARI allows systems to quickly detect and respond to revocation events when an urgent renewal is necessary, well before certificates get close to their due dates.

- **Simple implementation:** The extension is mature ([RFC 9773](https://datatracker.ietf.org/doc/rfc9773/)) and the implementation is straightforward, providing simplified renewal logic and CA-optimized timing.

- **Good citizenship:** Anyone using ARI helps the CA optimize its infrastructure, and contributes to better aggregate behavior across the entire ecosystem.

If you're still relying on static renewal thresholds, give ARI a look---Shopify wholeheartedly encourages all ACME users and client developers to adopt the ARI extension.
