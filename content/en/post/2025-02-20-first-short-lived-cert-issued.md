---
author: Josh Aas
date: 2025-02-19T00:00:00Z
slug: first-short-lived-cert-issued
title: "The First Short-Lived Certificates from Let's Encrypt are Live"
excerpt: "Optional six day certificates are here."
display_default_footer: true
display_newsletter_embed: false
---

Earlier this year we [announced](https://letsencrypt.org/2025/01/16/6-day-and-ip-certs/)  our intention to introduce short-lived certificates with lifetimes of six days as an option for our subscribers. Yesterday we issued our first short-lived certificates. You can see them in action [here](https://helloworld.letsencrypt.org). We issued these to ourselves, but this is the first step towards making them available to all subscribers.

The next step is for us to make short-lived certificates available to a small set of our subscribers so we can make sure our systems scale as expected prior to general availability. We expect this next phase to begin during Q2 of this year.

We expect short-lived certificates to be generally available by the end of this year.

## How To Get Six-Day Certificates

Once short-lived certificates are an option for you, you'll need to use an ACME client that supports ACME [certificate profiles](https://letsencrypt.org/docs/profiles/) and select the short-lived certificate profile ("shortlived"). The `lego` client recently [added](https://github.com/go-acme/lego/releases/tag/v4.22.0) this functionality.

In the meantime, the best way to prepare to take advantage of short-lived certificates is to make sure your ACME client is reliably renewing certificates in an automated fashion. If that's working well then there should be no costs to switching to short-lived certificates.

You'll also want to be sure your ACME client is running frequently - both for the sake of renewing short-lived certificates and so as to take advantage of [ACME Renewal Information (ARI)](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/). ARI allows Let's Encrypt to notify your client if it should renew early for some reason. ARI checks should happen at least once per day, and short-lived certificates should be renewed every two to three days, so we recommend having your client run at least once per day.

## Shorter Certificate Lifetimes Are Good for Security

When the private key associated with a certificate is compromised, the recommendation has always been to have the certificate revoked so that people will know not to use it. Unfortunately, certificate revocation doesn't work very well. This means that certificates with compromised keys (or other issues) may continue to be used until they expire. The longer the lifetime of the certificate, the longer the potential for use of a problematic certificate.

The primary advantage of short-lived certificates is that they greatly reduce the potential compromise window because they expire relatively quickly. This reduces the need for certificate revocation, which has historically been unreliable. Our six-day certificates will not include OCSP or CRL URLs. Additionally, short-lived certificates practically require automation, and we believe that automating certificate issuance is important for security.

## Questions

If you have questions or comments about our plans, feel free to let us know on our [community forums](https://community.letsencrypt.org/).

We'd like to thank [Open Technology Fund](https://www.opentech.fund/) for supporting this work.