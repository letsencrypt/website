---
title: ACME Protocol Updates
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2016-07-27
---

{{< lastmod >}}

The ACME protocol is the cornerstone of how Let's Encrypt works. It is currently a draft standard and not yet a finalized RFC. As the protocol specification evolves over time Let's Encrypt will implement updated versions of ACME. When doing so, security will be our primary concern, followed closely by backwards compatibility.

# Currently Implemented ACME Version

We currently have the following API endpoints. They do not implement any one fixed draft of the ACME specification as they evolved alongside the draft protocol document. Please see [our divergences documentation](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) to compare their implementation to the current ACME draft.

## ACME v1

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# New Backwards-Compatible ACME Features

From time to time Let's Encrypt may implement new backwards-compatible features for existing API endpoints. Typically new backwards-compatible features are introduced because we've decided to implement a part of the ACME spec that we hadn't implemented before.

When new features are introduced to existing API endpoints, the features will always be clearly specified in a public ACME specification and will not break properly implemented clients.

# ACME Security Fixes

If we become aware of a serious security issue with the ACME protocol (rather than simply our implementation of it) we may be forced to make compatibility-breaking changes to our API endpoints, or to cease operation of existing endpoints and introduce new ones.

ACME has been reviewed by many parties and used successfully in production, but there is always the possibility of undiscovered vulnerabilities. Systems administrators should maintain the ability to deploy timely updates to their ACME clients in response to such vulnerabilities.

# New Versions of ACME with Breaking Changes

When we feel it's important to implement new versions of ACME containing breaking changes we'll do so by introducing new API endpoints and maintaining them in parallel with the endpoints for older versions. After making the new version available, we will communicate a deprecation timeline to all users well in advance.

This is not going to happen very often since breaking compatibility is so burdensome even if there is plenty of time to transition. We will, however, be doing this once the IETF finishes [standardizing ACME](https://datatracker.ietf.org/wg/acme/charter/). We currently implement a pre-IETF-standardization version of ACME and we feel it's important to be using a formalized standard if possible.
