---
author: Matthew McPherrin
date: 2025-05-14T00:00:00Z
slug: ending-tls-client-authentication
title: "Ending TLS Client Authentication Certificate Support in 2026"
excerpt: "Let's Encrypt will no longer include the \"TLS Client Authentication\" Extended Key Usage (EKU) in our certificates beginning in 2026. Most users who use Let's Encrypt to secure websites won't be affected and won't need to take any action."
display_default_footer: true
display_inline_newsletter_embed: false
---

Let's Encrypt will no longer include the "TLS Client Authentication" Extended Key Usage (EKU) in our certificates beginning in 2026. Most users who use Let's Encrypt to secure websites won't be affected and won't need to take any action. However, if you use Let's Encrypt certificates as client certificates to authenticate to a server, this change may impact you.

To minimize disruption, Let's Encrypt will roll this change out in multiple stages, using [ACME Profiles](https://letsencrypt.org/docs/profiles/):

- **Today**: Let's Encrypt already excludes the Client Authentication EKU on our [`tlsserver`](https://letsencrypt.org/docs/profiles/#tlsserver) ACME profile. You can verify compatibility by issuing certificates with this profile now.
- **October 1, 2025**: Let's Encrypt will launch a new `tlsclient` ACME profile which will retain the TLS Client Authentication EKU. Users who need additional time to migrate can opt-in to this profile.
- **February 11, 2026**: the default [`classic`](https://letsencrypt.org/docs/profiles/#classic) ACME profile will no longer contain the Client Authentication EKU.
- **May 13, 2026**: the `tlsclient` ACME profile will no longer be available and no further certificates with the Client Authentication EKU will be issued.

Once this is completed, Let's Encrypt will switch to issuing with new intermediate Certificate Authorities which also do not contain the TLS Client Authentication EKU.

For some background information, all certificates include a list of intended uses, known as Extended Key Usages (EKU). Let's Encrypt certificates have included two EKUs: TLS Server Authentication and TLS Client Authentication.

- TLS Server Authentication is used to authenticate connections to TLS Servers, like websites.
- TLS Client Authentication is used by clients to authenticate themselves to a server. This feature is not typically used on the web, and is not required on the certificates used on a website.

After this change is complete, only TLS Server Authentication will be available from Let's Encrypt.

This change is prompted by changes to Google Chrome's root program requirements, which impose a June 2026 deadline to split TLS Client and Server Authentication into separate PKIs. Many uses of client authentication are better served by a private certificate authority, and so Let's Encrypt is discontinuing support for TLS Client Authentication ahead of this deadline.