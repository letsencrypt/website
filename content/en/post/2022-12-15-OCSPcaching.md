---
author: Kiel Christofferson
date: 2022-12-15T00:00:00Z
slug: OCSPcaching
title: "Let’s Encrypt improves how we manage OCSP responses"
excerpt: "By deploying Redis, Let’s Encrypt has improved our OCSP responses and increased reliability."
---

Let's Encrypt has improved how we manage Online Certificate Status Protocol (OCSP) responses by deploying Redis and generating responses on-demand rather than pre-generating them, making us more reliable than ever.

## About OCSP Responses

OCSP is used to communicate the revocation status of TLS certificates. When an ACME agent signs a request to revoke a certificate, our Let's Encrypt Certificate Authority (CA) verifies whether or not the request is authorized and if it is, we begin publishing a 'revoked' OCSP response for that certificate. Each time a relying party, such as a browser, visits a domain with a Let's Encrypt certificate, they can request information about whether the certificate has been revoked and we serve a reply containing 'good' or 'revoked', signed by our CA, which we call an OCSP response.

## An Enormous OCSP Response Load: 100,000 Every Second

Let's Encrypt currently serves over [300 million domains](https://letsencrypt.org/stats/), which means we receive an enormous number of certificate revocation status requests --- fielding around 100,000 OCSP responses *every second!*

Normally 98-99% of our OCSP responses are handled by our Content Delivery Network (CDN). But there are times when our CDN has an issue resulting in Let's Encrypt being required to directly accept a larger number of requests. Historically, we could effectively respond to a maximum of 6% of our OCSP response traffic on our own. Should the need arise for us to accept much higher than that, some of our systems might begin to take too long to return results, return significant numbers of errors, or even stop accepting new requests. Not an ideal situation for us, or the Internet.

Our inability to serve OCSP responses during an issue with one of our CDNs could result in a slowdown in users' browsing speed or not being able to connect to a website --- or worse, Internet users unintentionally visiting domains for which a certificate has been revoked. Browsers react differently to unresponsive OCSP, but one thing was clear, our systems needed to handle these occasions much better.

## Increasing our Reliability

After working on this throughout most of 2022, our engineers have dramatically improved our ability to independently serve OCSP responses. We did that by deploying Redis as an in-memory caching layer that helps protect our database by absorbing traffic spikes, whether due to CDN issues or our own actions, such as CDN cache clearing.

## Pivot in Design

Our team developed a system architecture design to organize/change all of the various interconnected systems needed to make Redis trusted to serve our OCSP responses. Amidst the fervor of developing this design, our engineers identified a resource we could depend upon more heavily to simplify the overall architecture and still realize incredible reliability gains. Rather than pre-signing OCSP status responses at regular intervals, storing the results in a relational database, and asking Redis to keep copies---we could keep simple but authoritative certificate status information in our database. We could then leverage fast, concurrent signing power from our HSMs to Just-in-Time sign a fresh OCSP response, cache it in Redis, and return it to the requester. Thanks to this, the demands on the relational database became much lighter (especially total table-writes and write-contention), the speed was impressive, and Redis wasn't holding anything that couldn't be (very very quickly) regenerated.

## Testing our Systems

The first test was to directly accept 1/16 of the requests by dropping a segment of our CDN cache. In that initial test we handled ~12,500 requests per second. Successive tests ratcheted up to 1/8th CDN cache drop, then 1/4th, then 1/2, then a 100% cache drop. With each ratcheting up of the test load we were able to monitor and glean insights as to how our deployment could handle the traffic. In the final test of 100% of requests, our systems remained responsive. This means that if we experience a spike in the number of OCSP responses we need to accept moving forward, we are equipped to handle them, dramatically reducing the risks to Internet users.

## Supporting Let's Encrypt

As a project of the [Internet Security Research Group](https://abetterinternet.org/) (ISRG), 100% of our funding comes from contributions from our community of users and supporters. We depend on their support in order to provide our public benefit services. If your company or organization would like to sponsor Let's Encrypt please email us at sponsor@letsencrypt.org. If you can support us with a [donation](https://letsencrypt.org/donate/), we ask that you make an individual contribution.