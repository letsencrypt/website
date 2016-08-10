---
layout: page
title: Rate Limits
permalink: /docs/rate-limits/
top_graphic: 1
date: 2016-07-07T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

Let’s Encrypt has rate limits for certificate issuance. These limits are in place primarily to protect our services from both accidental and intentional abuse. We realize that rate limits can be frustrating, but they are an important part of how we make sure our services remain reliable and available for everyone.

# Current Rate Limits

There is no limit to the number of certificates that can be issued to different registered domains. A registered domain is an effective TLD plus one label. For instance, in `www.example.com`, the registered domain is `example.com`.

Let’s Encrypt has the following rate limits in place:

* **Names/Certificate** is the limit on how many domain names you can include in a single certificate. This is currently limited to 100 names, or websites, per certificate issued. 

* **Certificates/Domain** limits how many certificates can be issued that contain a single registered domain.
This is limited to 20 certificates per domain per week. Exception: When you request a certificate with the same exact set of FQDNs as previously-issued certificate, this rate limit does not apply, but the one below does.

* **Certificates/FQDNset** limits how many certificates can be issued containing the exact same set of Fully Qualified Domain Names. This is limited to 5 certificates per FQDN set per week. For instance, if you requested a certificate for the names [www.example.com, example.com], you could request four more certificates for [www.example.com, example.com] during the week. If you changed the set of names, for instance, by adding [blog.example.com], you would be able to request additional certificates up to the limit set by Certificates/Domain.

* **Registrations/IP address** limits the number of registrations you can make in a given time period; currently 500 per 3 hours. This limit should only affect the largest users of Let's Encrypt. Please utilize our [staging environment](/docs/staging-environment/) if you’re developing an ACME client.

* **Pending Authorizations/Account** limits how many times an ACME client can request a domain name be authorized without actually fulfilling on the request itself. This is most commonly encountered when developing ACME clients, and this limit is set to 300 per account per week. Please utilize our [staging environment](/docs/staging-environment/) if you’re developing an ACME client.
