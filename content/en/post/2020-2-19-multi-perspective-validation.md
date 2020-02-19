---
author: Josh Aas, Daniel McCarney, and Roland Shoemaker
date: 2020-02-19T00:00:00Z
excerpt: "At Let’s Encrypt we’re always looking for ways to improve the security and integrity of the Web PKI. We’re proud to launch multi-perspective domain validation today because we believe it’s an important step forward for the domain validation process."
title: "Multi-Perspective Validation Improves Domain Validation Security"
slug: multi-perspective-validation
---

At Let’s Encrypt we’re always looking for ways to improve the security and integrity of the Web PKI. We’re proud to launch multi-perspective domain validation today because we believe it’s an important step forward for the domain validation process. To our knowledge we are the first CA to announce multi-perspective validation deployment at scale.

Domain validation is a process that all CAs use to ensure that a certificate applicant actually controls the domain they want a certificate for. Typically the domain validation process involves asking the applicant to place a particular file or token at a controlled location for the domain, such as a particular path or a DNS entry. Then the CA will check that the applicant was able to do so. Historically it looks something like this:

![System Architecture Diagram](/images/2020-02-19-single-perspective-validation.png)

A potential issue with this process is that if a network attacker can hijack or redirect network traffic along the validation path (for the challenge request, or associated DNS queries), then the attacker can trick a CA into incorrectly issuing a certificate. This is precisely what a research team from Princeton demonstrated [can be done with an attack on BGP](https://www.princeton.edu/~pmittal/publications/bgp-tls-usenix18.pdf). Such attacks are rare today, but we are concerned that these attacks will become more numerous in the future.

The Border Gateway Protocol (BGP) and most deployments of it are not secure. While there are ongoing efforts to secure BGP, such as RPKI and BGPsec, it may be a long time until BGP hijacking is a thing of the past. We don’t want to wait until we can depend on BGP being secure, so we’ve worked with the research team from Princeton to devise a way to make such attacks more difficult. Instead of validating from one network perspective, we now validate from multiple perspectives as well as from our own data centers:

![System Architecture Diagram](/images/2020-02-19-multiple-perspective-validation.png)

Today we are validating from multiple regions within a single cloud provider. We plan to diversify network perspectives to other cloud providers in the future.

This makes the kind of attack described earlier more difficult because an attacker must successfully compromise three different network paths at the same time (the primary path from our data center, and at least two of the three remote paths). It also increases the likelihood that such an attack will be detected by the Internet topology community.

We’d like to thank the research groups of Prof. Prateek Mittal and Prof. Jennifer Rexford at Princeton University for their partnership in developing this work. We will continue to work with them to refine the effectiveness of our multiple perspective validation design and implementation. We’d also like to thank [Open Technology Fund](https://www.opentech.fund/) for supporting this work.

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
