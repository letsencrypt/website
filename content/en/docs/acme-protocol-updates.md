---
title: ACME Protocol Updates
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
---

{{< lastmod >}}

The [IETF-standardized](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME protocol, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), is the cornerstone of how Let's Encrypt works.

# API Endpoints

We currently have the following API endpoints. Please see [our divergences documentation](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) to compare their implementation to the ACME specification.

## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (Deprecated)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# New Backwards-Compatible ACME Features

From time to time Let's Encrypt may implement new backwards-compatible features for existing API endpoints. Typically new backwards-compatible features are introduced because we've decided to implement a part of the ACME spec that we hadn't implemented before.

When new features are introduced to existing API endpoints, the features will always be clearly specified in a public ACME specification and will not break properly implemented clients.

# New Versions of ACME with Breaking Changes

We do not plan to make breaking changes to our ACME support, but if we feel it's important to do so we'll work to allow for a smooth transition over sufficient time and communicate as far in advance as possible. Systems administrators should maintain the ability to deploy timely updates to their ACME clients in the event that a breaking change is necessary.
