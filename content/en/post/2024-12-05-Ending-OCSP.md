---
author: Josh Aas
date: 2024-12-05T00:00:00Z
excerpt: "Certificate revocation information will be provided exclusively through CRLs."
title: "Ending OCSP Support in 2025"
display_default_footer: false
slug: Ending-OCSP
---


Earlier this year we [announced](https://letsencrypt.org/2024/07/23/replacing-ocsp-with-crls/) our intent to provide certificate revocation information exclusively via [Certificate Revocation Lists (CRLs)](https://letsencrypt.org/2022/09/07/new-life-for-crls), ending support for providing certificate revocation information via the [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol). Today we are providing a timeline for ending OCSP services:

- January 30, 2025
  - OCSP Must-Staple requests will fail, unless the requesting account has previously issued a certificate containing the OCSP Must Staple extension
- May 7, 2025
  - Prior to this date we will have added CRL URLs to certificates
  - On this date we will drop OCSP URLs from certificates
  - On this date all requests including the OCSP Must Staple extension will fail
- August 6, 2025
  - On this date we will turn off our OCSP responders

Additionally, a very small percentage of our subscribers request certificates with the OCSP Must Staple Extension. If you have manually configured your ACME client to request that extension, action is required before May 7. See "Must Staple" below for details.

OCSP and CRLs are both mechanisms by which CAs can communicate certificate revocation information, but CRLs have significant advantages over OCSP. Let's Encrypt has been providing an OCSP responder since our launch nearly ten years ago. We added support for CRLs in 2022.

Websites and people who visit them will not be affected by this change, but some non-browser software might be.

We plan to end support for OCSP primarily because it represents a considerable risk to privacy on the Internet. When someone visits a website using a browser or other software that checks for certificate revocation via OCSP, the Certificate Authority (CA) operating the OCSP responder immediately becomes aware of which website is being visited from that visitor's particular IP address. Even when a CA intentionally does not retain this information, as is the case with Let's Encrypt, CAs could be legally compelled to collect it. CRLs do not have this issue.

We are also taking this step because keeping our CA infrastructure as simple as possible is critical for the continuity of compliance, reliability, and efficiency at Let's Encrypt. For every year that we have existed, operating OCSP services has taken up considerable resources that can soon be better spent on other aspects of our operations. Now that we support CRLs, our OCSP service has become unnecessary.

We recommend that anyone relying on OCSP services today start the process of ending that reliance as soon as possible. If you use Let's Encrypt certificates to secure non-browser communications such as a VPN, you should ensure that your software operates correctly if certificates contain no OCSP URL.

## Must Staple

Because of the privacy issues with OCSP, browsers and servers implement a feature called "OCSP Stapling", where the web server sends a copy of the appropriate OCSP response during the TLS handshake, and the browser skips making a request to the CA, thus better preserving privacy.

In addition to OCSP Stapling (a TLS feature negotiated at handshake time), there's an extension that can be added to certificates at issuance time, colloquially called "OCSP Must Staple." This tells browsers that, if they see that extension in a certificate, they should never contact the CA about it and should instead expect to see a stapled copy in the handshake. Failing that, browsers should refuse to connect. This was designed to solve some security problems with revocation.

Let's Encrypt has supported OCSP Must Staple for a long time, because of the potential to improve both privacy and security. However, Must Staple has failed to get wide browser support after many years. And popular web servers still implement OCSP Stapling in ways that create serious risks of downtime.

As part of removing OCSP, we'll also be removing support for OCSP Must Staple. CRLs have wide browser support and can provide privacy benefits to all sites, without requiring special web server configuration. Thanks to all our subscribers who have helped with the OCSP Must Staple experiment.

If you are not certain whether you are using OCSP Must Staple, you can check [this list of hostnames and certificate serials (11.1 MB, .zip)](/downloads/must-staple-certificates-2024-09-05-to-2024-12-05.csv.zip).

As of January 30, 2025, issuance requests that include the OCSP Must Staple extension will fail, unless the requesting account has previously issued a certificate containing the OCSP Must Staple extension.

As of May 7, all issuance requests that include the OCSP Must Staple extension will fail, including renewals. Please change your ACME client configuration to not request the extension.