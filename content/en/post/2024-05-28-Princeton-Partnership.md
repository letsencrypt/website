---
author: Sarah McClure
date: 2024-05-30T00:00:00Z
slug: Princeton-Partnership
title: "Let’s Encrypt Continues Partnership with Princeton to Bolster Internet Security"
excerpt: "Increasing defense against BGP attacks thanks to support from the Open Technology Fund."
---

Let's Encrypt is proud to have been partnering with the [Center for Information Technology Policy](https://citp.princeton.edu/) team at Princeton University [since 2018](https://www.princeton.edu/news/2020/02/21/internet-security-borne-out-collaboration-between-princeton-and-lets-encrypt) to bolster defenses against Border Gateway Protocol (BGP) attacks. We're thrilled to continue this partnership thanks to renewed funding from the [Open Technology Fund](https://www.opentech.fund/).

*&ldquo;Let's Encrypt has played a pivotal role in driving our research around protecting against BGP attacks and preventing the disruption such attacks can cause. We're grateful for the partnership with Let's Encrypt, as the largest Certificate Authority, in this critical work.&rdquo; -- Jennifer Rexford, Provost, Princeton University*

To date, [our work with Princeton](https://www.cs.princeton.edu/~jrex/papers/multiva20.pdf) has focused on defending against BGP attacks on domain control validation via [Multi-Perspective Issuance Corroboration (MPIC)](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html). This year, Let's Encrypt is adding [two new remote perspectives](https://community.letsencrypt.org/t/lets-encrypt-is-adding-two-new-remote-perspectives-for-domain-validation/214123) for domain validation. This means we will make five total validation requests, one from the primary datacenter and four from remote perspectives (previously two). Increased perspectives provide more domain validation security, thus improving visibility and protection against BGP attacks.

<figure class="blog-post-image" style="margin-bottom: 20px; display: flex; flex-direction: column; align-items: center; text-align: center">
<img src="/images/2024.05.28.le-new-config.png">
<figcaption>Additional global vantage points increase resilience of Let’s Encrypt issuance. Source: Princeton Center for Information Technology Policy</figcaption>
</figure>

Additionally, we will be facilitating the adoption of [ACME Renewal Information (ARI)](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari) in order to enable certificate authorities (CAs) to maintain continuity of service in a mass revocation/replacement event. If a BGP attack does occur, ARI will allow CAs to quickly and automatically revoke and replace certificates associated with the victim domain. Learn more about how to [integrate ARI into an existing ACME client](https://letsencrypt.org/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients).

Our team will be working with the research groups of Professor Prateek Mittal to provide secure data related to increased perspectives and ARI, and contributing to research analysis and discoveries.

We'd like to thank Princeton University for their partnership on this important work, and Open Technology Fund for making it possible.

[Internet Security Research Group (ISRG)](https://abetterinternet.org/) is the parent organization of [Let's Encrypt](http://letsencrypt.org/), [Prossimo](http://memorysafety.org/), and [Divvi Up](http://divviup.org/). ISRG is a 501(c)(3) nonprofit. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/).