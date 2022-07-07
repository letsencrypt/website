---
title: Revocation Reason Codes
slug: revocation-reason-codes
top_graphic: 1
date: 2022-06-23
lastmod: 2022-07-06
show_lastmod: 1
---

When revoking a certificate, Let's Encrypt subscribers should select a reason code as follows:

* No reason provided or `unspecified` (RFC 5280 CRLReason #0)
  - When the reason codes below do not apply to the revocation request, the subscriber must not provide a reason code other than "unspecified".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - The certificate subscriber must choose the "keyCompromise" revocation reason when they have reason to believe that the private key of their certificate has been compromised, e.g. an unauthorized person has had access to the private key of their certificate.
  - If the revocation request is signed using the Certificate private key, rather than a Subscriber account private key, Let's Encrypt may ignore the revocation reason in the request and set the reason to "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - The certificate subscriber should choose the "superseded" revocation reason when they request a new certificate to replace their existing certificate. 
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - The certificate subscriber should choose the "cessationOfOperation" revocation reason when they no longer own all of the domain names in the certificate or when they will no longer be using the certificate because they are discontinuing their website.
  - If the revocation request is from a Subscriber account which did not order the certificate in question, but has demonstrated control over all identifiers in the certificate, Let's Encrypt may ignore the revocation reason in the request and set the reason to "cessationOfOperation".

Revocation requests that specify any reason code other than those detailed above will be rejected.
