---
author: Aaron Gable
date: 2022-09-07T00:00:00Z
slug: new-life-for-CRLs
title: "A New Life for Certificate Revocation Lists"
excerpt: "Let's Encrypt has developed new infrastructure to make CRLs a practical tool for our 200M active certs."
---

This month, Let's Encrypt is turning on new infrastructure to support revoking certificates via Certificate Revocation Lists. Despite having been largely supplanted by the Online Certificate Status Protocol for over a decade now, CRLs are gaining new life with recent browser updates. By collecting and summarizing CRLs for their users, browsers are making reliable revocation of certificates a reality, improving both security and privacy on the web. Let's talk about exactly what this new infrastructure does, and why it's important.

# A Brief History of Revocation

When a certificate becomes untrustworthy (for instance because its private key was compromised), that certificate must be revoked and that information publicized so that no one relies upon it in the future. However, it's a well-worn adage in the world of the Web Public Key Infrastructure (the Web PKI) that [revocation is broken](https://scotthelme.co.uk/revocation-is-broken/). Over the history of the Web PKI, there have been two primary mechanisms for declaring that a TLS/SSL certificate should no longer be trusted: Certificate Revocation Lists (CRLs) and the Online Certificate Status Protocol (OCSP). Unfortunately, both have major drawbacks.

CRLs are basically just lists of all of the certificates that a given Certificate Authority (CA) has issued which have been revoked. This means that they're often very large -- easily the size of a whole movie. It's inefficient for your browser to download a giant list of revoked certificates just to check if the single certificate for the site you're visiting right now is revoked. These slow downloads and checks made web page loads slow, so OCSP was developed as an alternative.

OCSP is sort of like "what if there were a separate CRL for every single certificate": when you want to check whether a given certificate has been revoked, your browser can check the status for just that one certificate by contacting the CA's OCSP service. But because OCSP infrastructure has to be running constantly and can suffer downtime just like any other web service, most browsers treat getting no response at all as equivalent to getting a "not revoked" response. This means that attackers can prevent you from discovering that a certificate has been revoked simply by blocking all of your requests for OCSP information. To help reduce load on a CA's OCSP services, OCSP responses are valid and can be cached for about a week. But this means that clients don't retrieve updates very frequently, and often continue to trust certificates for a week after they're revoked. And perhaps worst of all: because your browser makes an OCSP request for every website you visit, a malicious (or legally compelled) CA could [track your browsing behavior](https://groups.google.com/a/mozilla.org/g/dev-security-policy/c/S6A14e_X-T0/m/T4WxWgajAAAJ) by keeping track of what sites you request OCSP for.

So both of the existing solutions don't really work: CRLs are so inefficient that most browsers don't check them, and OCSP is so unreliable that most browsers don't check it. We need something better.

# Browser-Summarized CRLs

One possible solution that has been making headway recently is the idea of proprietary, browser-specific CRLs. Although different browsers are implementing this differently (e.g. Mozilla calls theirs [CRLite](https://blog.mozilla.org/security/2020/01/09/crlite-part-1-all-web-pki-revocations-compressed/), and Chrome's are [CRLSets](https://www.imperialviolet.org/2012/02/05/crlsets.html)), the basic idea is the same.

Rather than having each user's browser download large CRLs when they want to check revocation, the browser *vendor* downloads the CRLs centrally. They process the CRLs into a smaller format such as a [Bloom filter](https://en.wikipedia.org/wiki/Bloom_filter), then push the new compressed object to all of the installed browser instances using pre-existing rapid update mechanisms. Firefox, for example, is pushing updates as quickly as every 6 hours.

This means that browsers can download revocation lists ahead of time, keeping page loads fast and mitigating the worst problems of vanilla CRLs. It keeps revocation checks local, and the pushed updates can take immediate effect without waiting for a potentially days-long OCSP cache to expire, preventing all of the worst problems with OCSP.

Thanks to the promise of these browser-summarized CRLs, both the [Apple](https://www.apple.com/certificateauthority/ca_program.html) and [Mozilla](https://www.mozilla.org/en-US/about/governance/policies/security-group/certs/policy/#41-additional-requirements) root programs are requiring that all CAs begin issuing CRLs before October 1st, 2022. Specifically, they are requiring that CAs begin issuing one or more CRLs which together cover all certificates issued by that CA, and that the list of URLs pointing to those CRLs be disclosed in the Common CA Database (CCADB). This will allow Safari and Firefox to switch to using browser-summarized CRL checking for revocation.

# Our New Infrastructure

When Let's Encrypt was founded, we made an explicit decision to only support OCSP and not produce CRLs at all. This was because the root program requirements at the time only mandated OCSP, and maintaining both revocation mechanisms would have increased the number of places where a bug could lead to a compliance incident.

When we set out to develop CRL infrastructure, we knew we needed to build for scale, and do so in a way that reflects our emphasis on efficiency and simplicity. Over the last few months we have [developed](https://github.com/letsencrypt/boulder/tree/release-2022-08-29/crl) a few new pieces of infrastructure to enable us to publish CRLs in compliance with the upcoming requirements. Each component is lightweight, dedicated to doing a single task and doing it well, and will be able to scale well past our current needs.

Let's Encrypt currently has [over 200 million](https://letsencrypt.org/stats/) active certificates on any given day. If we had an incident where we needed to revoke every single one of those certificates at the same time, the resulting CRL would be over 8 gigabytes. In order to make things less unwieldy, we will be dividing our CRLs into 128 shards, each topping out at a worst-case maximum of 70 megabytes. We use some carefully constructed math to ensure that -- as long as the number of shards doesn't change -- all certificates will remain within their same shards when the CRLs are re-issued, so that each shard can be treated as a mini-CRL with a consistent scope.

In line with the same best practices that we follow for our certificate issuance, all of our CRLs will be checked for compliance with [RFC 5280](https://www.rfc-editor.org/rfc/rfc5280#section-5) and the [Baseline Requirements](https://github.com/cabforum/servercert/blob/bbca71465ed8a8a76383086039f52c750009286a/docs/BR.md#72-crl-profile) before they are signed by our issuing intermediates. Although the popular linting library [zlint](https://github.com/zmap/zlint) does not yet support linting CRLs, we have written our own [collection of checks](https://github.com/letsencrypt/boulder/blob/release-2022-08-29/linter/lints/crl/lints.go) and hope to upstream them to zlint in the future. These checks will help prevent compliance incidents and ensure a seamless issuance and renewal cycle.

As part of developing these new capabilities, we have also made [several](https://go-review.googlesource.com/c/go/+/414877) [improvements](https://go-review.googlesource.com/c/go/+/416354) to the Go standard library's implementation of CRL generation and parsing. We look forward to contributing more improvements as we and the rest of the Go community work with CRLs more frequently in the future.

Although we will be producing CRLs which cover all certificates that we issue, we will not be including those URLs in the CRL Distribution Point extension of our certificates. For now, as required by the Baseline Requirements, our certificates will continue to include an OCSP URL which can be used by anyone to obtain revocation information for each certificate. Our new CRL URLs will be disclosed only in CCADB, so that the Apple and Mozilla root programs can consume them without exposing them to potentially large download traffic from the rest of the internet at large.

# The Future of Revocation

There's still a long way to go before revocation in the Web PKI is truly fixed. The privacy concerns around OCSP will only be mitigated once all clients have stopped relying on it, and we still need to develop good ways for non-browser clients to reliably check revocation information.

We look forward to continuing to work with the rest of the Web PKI community to make revocation checking private, reliable, and efficient for everyone.

If you're excited about our work developing more robust and private revocation mechanisms, you can support us with a [donation](https://letsencrypt.org/donate/), or encourage your company or organization to [sponsor](https://www.abetterinternet.org/sponsor/) our work. As a nonprofit project, 100% of our funding comes from contributions from our community and supporters, and we depend on your support.