---
author: Josh Aas
date: 2024-07-23T00:00:00Z
title: "Moving to a more privacy-respecting and efficient method of checking certificate revocation"
excerpt: "Intent to end OCSP service."
display_default_footer: false
slug: replacing-OCSP-with-CRLs
---

Today we are announcing our intent to end [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) support in favor of [Certificate Revocation Lists (CRLs)](https://letsencrypt.org/2022/09/07/new-life-for-crls) as soon as possible. OCSP and CRLs are both mechanisms by which CAs can communicate certificate revocation information, but CRLs have significant advantages over OCSP. Let's Encrypt has been providing an OCSP responder since our launch nearly ten years ago. We added support for CRLs in 2022.

Websites and people who visit them will not be affected by this change, but some non-browser software might be.

We plan to end support for OCSP primarily because it represents a considerable risk to privacy on the Internet. When someone visits a website using a browser or other software that checks for certificate revocation via OCSP, the Certificate Authority (CA) operating the OCSP responder immediately becomes aware of which website is being visited from that visitor's particular IP address. Even when a CA intentionally does not retain this information, as is the case with Let's Encrypt, CAs could be legally compelled to collect it. CRLs do not have this issue.

We are also taking this step because keeping our CA infrastructure as simple as possible is critical for the continuity of compliance, reliability, and efficiency at Let's Encrypt. For every year that we have existed, operating OCSP services has taken up considerable resources that can soon be better spent on other aspects of our operations. Now that we support CRLs, our OCSP service has become unnecessary.

In August of 2023 the [CA/Browser Forum](https://cabforum.org/) passed [a ballot](https://lists.cabforum.org/pipermail/servercert-wg/2023-September/003998.html) to make providing OCSP services optional for publicly trusted CAs like Let's Encrypt. With one exception, Microsoft, the root programs themselves no longer require OCSP. As soon as the [Microsoft Root Program](https://learn.microsoft.com/en-us/security/trusted-root/program-requirements) also makes OCSP optional, which we are optimistic will happen within the next six to twelve months, Let's Encrypt intends to announce a specific and rapid timeline for shutting down our OCSP services. We hope to serve our last OCSP response between three and six months after that announcement. The best way to stay apprised of updates on these plans is to [subscribe to our API Announcements](https://community.letsencrypt.org/c/api-announcements/18) category on Discourse.

We recommend that anyone relying on OCSP services today start the process of ending that reliance as soon as possible. If you use Let's Encrypt certificates to secure non-browser communications such as a VPN, you should ensure that your software operates correctly if certificates contain no OCSP URL. Fortunately, most OCSP implementations "fail open" which means that an inability to fetch an OCSP response will not break the system.

_[Internet Security Research Group (ISRG)](https://abetterinternet.org/) is the parent organization of [Let's Encrypt](http://letsencrypt.org/), [Prossimo](http://memorysafety.org/), and [Divvi Up](http://divviup.org/). ISRG is a 501(c)(3) nonprofit. If you'd like to support our work, please consider [getting involved](https://www.abetterinternet.org/getinvolved/), [donating](https://www.abetterinternet.org/donate/), or encouraging your company to [become a sponsor](https://www.abetterinternet.org/sponsor/)._
