---
title: Upcoming Features
slug: upcoming-features
lastmod: 2025-07-31
show_lastmod: 1
---

For announcements of upcoming changes, please [subscribe to the Technical Updates mailing list](https://letsencrypt.org/opt-in/) or see the [API Announcements category](https://community.letsencrypt.org/c/api-announcements/18) on the Let's Encrypt community forum.

# Upcoming Features

## Short-lived Certificates

Around the end of 2025, we intend to allow any client which supports ACME Profiles (see below) to [request a "shortlived" certificate](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/). These certificates are valid for such a short time that they do not need to have revocation information (such as OCSP, see below) embedded in them at all. 

## IP Address Certificates

Around the end of 2025, we intend to allow any client which requests a shortlived certificate (see above) to also request that the certificate [contain IP Addresses](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) in its Subject Alternative Names. These addresses will be [validated in much the same way as DNS Names](https://www.rfc-editor.org/rfc/rfc8738.html) are today.

## Removal of TLS Client Authentication EKU

On Feb 11, 2026, we intend to [remove the "TLS Client Authentication" Extended Key Usage (EKU)](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) from our default certificate profile. Prior to that date, we will offer an alternative profile which will still contain that EKU, but note that this will be a temporary stop-gap for clients that need more time to migrate away from needing it: that alternate profile will go away on May 13, 2026.

# Completed Features

## Shutdown of Expiration Notification Emails

On June 4, 2025, we [turned off our expiration email notification service](https://letsencrypt.org/2025/01/22/ending-expiration-emails/), and delete all email addresses associated with ACME accounts from our production database.

## Removal of OCSP URLs

Enabled: [May 7, 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Our certificates no longer contain an Authority Information Access (AIA) Online Certificate Status Protocol (OCSP) URL. Instead, they contain a Certificate Revocation List (CRL) Distribution Point (CRLDP) URL. Relying parties can retrieve revocation status information via CRLs, and ACME clients can obtain renewal hints via ARI (see below).

## ACME Profiles

Enabled: [January 9, 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Clients which support the [draft ACME Profiles extension](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html) can now request that their certificate conform to [one of our supported profiles](https://letsencrypt.org/docs/profiles/).

## Static CT Logs

Enabled: [March 14, 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

We now operate Certificate Transparency (CT) logs which conform to the new [Static CT API Spec](https://c2sp.org/static-ct-api), running the [Sunlight](https://github.com/FiloSottile/sunlight) software. Now that various CT log programs have updated their policies to accept this new kind of log, we intend to submit our logs for inclusion in those programs soon.

## ACME Renewal Information (ARI)

Enabled: [March 23, 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

We now provide suggested renewal windows for all issued certificates, which clients can query using the [ACME ARI extension](https://www.ietf.org/archive/id/draft-ietf-acme-ari-08.html).
