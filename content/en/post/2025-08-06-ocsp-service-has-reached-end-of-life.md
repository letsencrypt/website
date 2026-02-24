---
author: Josh Aas
date: 2025-08-06T00:00:00Z
slug: ocsp-service-has-reached-end-of-life
title: "OCSP Service Has Reached End of Life"
excerpt: "Today we turned off our Online Certificate Status Protocol (OCSP) service."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

Today we turned off our Online Certificate Status Protocol (OCSP) service, as [announced](https://letsencrypt.org/2024/12/05/ending-ocsp/) in December of last year. We stopped including OCSP URLs in our certificates more than 90 days ago, so all Let's Encrypt certificates that contained OCSP URLs have now expired. Going forward, we will publish revocation information exclusively via Certificate Revocation Lists (CRLs).

We ended support for OCSP primarily because it represents a considerable risk to privacy on the Internet. When someone visits a website using a browser or other software that checks for certificate revocation via OCSP, the Certificate Authority (CA) operating the OCSP responder immediately becomes aware of which website is being visited from that visitor's particular IP address. Even when a CA intentionally does not retain this information, as is the case with Let's Encrypt, it could accidentally be retained or CAs could be legally compelled to collect it. CRLs do not have this issue.

We are also taking this step because keeping our CA infrastructure as simple as possible is critical for the continuity of compliance, reliability, and efficiency at Let's Encrypt. For every year that we have existed, operating OCSP services has taken up considerable resources that can soon be better spent on other aspects of our operations. [Now that we support CRLs](https://letsencrypt.org/2022/09/07/new-life-for-crls/), our OCSP service has become unnecessary.

At the height of our OCSP service's traffic earlier this year, we handled approximately 340 billion OCSP requests per month. That's more than 140,000 requests per second handled by our CDN, with 15,000 requests per second handled by our origin. We'd like to thank [Akamai](https://www.akamai.com/) for generously donating CDN services for OCSP to Let's Encrypt for the past ten years.