---
author: Josh Aas, ISRG Executive Director
date: 2017-12-07T00:00:00Z
excerpt: While we’re proud of what we accomplished in 2017, we are spending most of
  the final quarter of the year looking forward rather than back.
title: Looking Forward to 2018
slug: looking-forward-to-2018
---

Let’s Encrypt had a great year in 2017. We more than doubled the number of active (unexpired) certificates we service to 46 million, we just about tripled the number of unique domains we service to 61 million, and we did it all while maintaining a stellar security and compliance track record. Most importantly though, [the Web went from 46% encrypted page loads to 67%](https://letsencrypt.org/stats/) according to statistics from Mozilla - a gain of 21 percentage points in a single year - incredible. We’re proud to have contributed to that, and we’d like to thank all of the other people and organizations who also worked hard to create a more secure and privacy-respecting Web.

While we’re proud of what we accomplished in 2017, we are spending most of the final quarter of the year looking forward rather than back. As we wrap up our own planning process for 2018, I’d like to share some of our plans with you, including both the things we’re excited about and the challenges we’ll face. We’ll cover service growth, new features, infrastructure, and finances.

# Service Growth

We are planning to double the number of active certificates and unique domains we service in 2018, to 90 million and 120 million, respectively. This anticipated growth is due to continuing high expectations for HTTPS growth in general in 2018.

Let’s Encrypt helps to drive HTTPS adoption by offering a free, easy to use, and globally available option for obtaining the certificates required to enable HTTPS. HTTPS adoption on the Web took off at an unprecedented rate from the day Let’s Encrypt launched to the public.

One of the reasons Let’s Encrypt is so easy to use is that our community has done great work making client software that works well for a wide variety of platforms. We’d like to thank everyone involved in the development of over 60 [client software options for Let’s Encrypt](https://letsencrypt.org/docs/client-options/). We’re particularly excited that support for the ACME protocol and Let’s Encrypt is [being added to the Apache httpd server](https://letsencrypt.org/2017/10/17/acme-support-in-apache-httpd.html).

Other organizations and communities are also doing great work to promote HTTPS adoption, and thus stimulate demand for our services. For example, browsers are starting to make their users more aware of the risks associated with unencrypted HTTP (e.g. [Firefox](https://blog.mozilla.org/security/2017/01/20/communicating-the-dangers-of-non-secure-http/), [Chrome](https://security.googleblog.com/2017/04/next-steps-toward-more-connection.html)). Many hosting providers and CDNs are making it easier than ever for all of their customers to use HTTPS. [Government](https://https.cio.gov/) [agencies](https://www.canada.ca/en/treasury-board-secretariat/services/information-technology/strategic-plan-2017-2021.html#toc8-3-2) are waking up to the need for stronger security to protect constituents. The media community is working to [Secure the News](https://securethe.news/).

# New Features

We’ve got some exciting features planned for 2018.

First, we’re planning to introduce an ACME v2 protocol API endpoint and [support for wildcard certificates](https://letsencrypt.org/2017/07/06/wildcard-certificates-coming-jan-2018.html) along with it. Wildcard certificates will be free and available globally just like our other certificates. We are planning to have a public test API endpoint up by January 4, and we’ve set a date for the full launch: ~~Tuesday, February 27~~ Update: [these features are live!](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579/)

Later in 2018 we plan to introduce ECDSA root and intermediate certificates. ECDSA is generally considered to be the future of digital signature algorithms on the Web due to the fact that it is more efficient than RSA. Let’s Encrypt will currently sign ECDSA keys from subscribers, but we sign with the RSA key from one of our intermediate certificates. Once we have an ECDSA root and intermediates, our subscribers will be able to deploy certificate chains which are entirely ECDSA.

# Infrastructure

Our CA infrastructure is capable of issuing millions of certificates per day with multiple redundancy for stability and a wide variety of security safeguards, both physical and logical. Our infrastructure also generates and signs nearly 20 million OCSP responses daily, and serves those responses nearly 2 billion times per day. We expect issuance and OCSP numbers to double in 2018.

Our physical CA infrastructure currently occupies approximately 70 units of rack space, split between two datacenters, consisting primarily of compute servers, storage, HSMs, switches, and firewalls.

When we issue more certificates it puts the most stress on storage for our databases. We regularly invest in more and faster storage for our database servers, and that will continue in 2018.

We’ll need to add a few additional compute servers in 2018, and we’ll also start aging out hardware in 2018 for the first time since we launched. We’ll age out about ten 2u compute servers and replace them with new 1u servers, which will save space and be more energy efficient while providing better reliability and performance.

We’ll also add another infrastructure operations staff member, bringing that team to a total of six people. This is necessary in order to make sure we can keep up with demand while maintaining a high standard for security and compliance. Infrastructure operations staff are systems administrators responsible for building and maintaining all physical and logical CA infrastructure. The team also manages a 24/7/365 on-call schedule and they are primary participants in both security and compliance audits.

# Finances

We pride ourselves on being an efficient organization. In 2018 Let’s Encrypt will secure a large portion of the Web with a budget of only $3.0M. For an overall increase in our budget of only 13%, we will be able to issue and service twice as many certificates as we did in 2017. We believe this represents an incredible value and that contributing to Let’s Encrypt is one of the most effective ways to help create a more secure and privacy-respecting Web.

Our 2018 fundraising efforts are off to a strong start with Platinum sponsorships from Mozilla, Akamai, OVH, Cisco, Google Chrome and the Electronic Frontier Foundation. The Ford Foundation has renewed their grant to Let’s Encrypt as well. We are seeking additional sponsorship and grant assistance to meet our full needs for 2018.

We had originally budgeted $2.91M for 2017 but we’ll likely come in under budget for the year at around $2.65M. The difference between our 2017 expenses of $2.65M and the 2018 budget of $3.0M consists primarily of the additional infrastructure operations costs previously mentioned.

# Support Let’s Encrypt

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.

We’re grateful for the industry and community support that we receive, and we look forward to continuing to create a more secure and privacy-respecting Web!
