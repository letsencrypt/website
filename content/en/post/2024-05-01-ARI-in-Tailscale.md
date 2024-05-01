---
author: Sarah McClure (Let’s Encrypt) & Andrew Lytvynov (Tailscale)
date: 2024-05-01T00:00:00Z
slug: ARI-in-Tailscale
title: "Takeaways from Tailscale’s Adoption of ARI"
excerpt: "ACME Renewal Info (ARI) enables easy and automated cert revocation and replacement."
---

Since March 2023, Let's Encrypt has been [improving our resiliency and reliability](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari) via ACME Renewal Information ([ARI](https://datatracker.ietf.org/doc/draft-ietf-acme-ari/)). ARI makes it possible for our Subscribers to handle certificate revocation and renewal easily and automatically. A primary benefit of ARI is that it sets Subscribers up for success in terms of ideal renewal times in the event that Let's Encrypt offers certificates with even shorter lifetimes than 90 days. We recently published a [guide for engineers on how to integrate ARI into existing ACME Clients](https://letsencrypt.org/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients).

In this blog post, we'll explore Let's Encrypt Subscriber [Tailscale's experience adopting ARI](https://github.com/tailscale/tailscale/issues/8204).

In total, it took just two Tailscale engineers less than two days to implement ARI. Prior to ARI, the Tailscale team had made other iterations of cert renewal logic, including hardcoding renewal 14 days before expiry and hardcoding 1/3rd of remaining time until expiry. An issue with these approaches was that assumptions were made about the validity period of certificates issued by Let's Encrypt, which will change in the future. In contrast, ARI allows Tailscale to offload the renewal decision to Let's Encrypt without making any assumptions.

Tailscale noted that ARI was especially useful to add before certificates' validity period starts shortening, as their client software in charge of requesting and renewing certificates is running on user machines. This makes it so they cannot easily update the whole fleet overnight if any issues come up. Thanks to ARI, they've reduced the risk of not rotating certificates for client machines in time, or causing excessive load on Let's Encrypt's infrastructure with overly-eager rotation logic.

One consideration the Tailscale team factored in deciding to adopt ARI was wanting to avoid adding a hard dependency on the Let's Encrypt infrastructure for renewal. To remedy this, Tailscale certificate renewal logic falls back to local time-based check if the ARI endpoint cannot be reached for any reason.

Tailscale's roadmap for getting ARI in production:

-   [Updated their fork](https://github.com/tailscale/golang-x-crypto/pull/10) of golang.org/x/crypto to support ARI

-   [Updated the renewal code](https://github.com/tailscale/tailscale/pull/8599) in the Tailscale client

-   Tested it locally by requesting certificates for a dev domain

-   Tested renewal by stubbing out ARI response with hardcoded data

-   Tested fallback by blocking ARI requests

-   Shipped it!

The team reported running into one snag during the process. Because the RFC is not finalized, the upstream Go package for ACME [doesn't support ARI yet](https://github.com/golang/go/issues/60958). As a solution, they added support in their fork of that Go package. Tailscale's main piece of advice for Subscribers adopting ARI: don't forget to put a timeout on your ARI request!

We're grateful to the Tailscale team for taking the time to share with us their experience adopting ARI and advice for fellow Subscribers. In addition to being an ARI adopter, Tailscale is a Let's Encrypt Sponsor! We appreciate their support of our work to build a more secure Web.

We're also grateful to be partnering with Princeton University on our ACME Renewal Information work, thanks to generous support from the [Open Technology Fund](https://www.opentech.fund/).

[Internet Security Research Group (ISRG)](https://abetterinternet.org/) is the parent organization of [Let's Encrypt](http://letsencrypt.org/), [Prossimo](http://memorysafety.org/), and [Divvi Up](http://divviup.org/). ISRG is a 501(c)(3) nonprofit. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).