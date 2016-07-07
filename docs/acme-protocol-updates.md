---
layout: page
title: ACME Protocol Updates
permalink: /docs/acme-protocol-updates/
top_graphic: 1
---

[<- Back to Documentation List](/docs/)

The ACME protocol is the cornerstone of how Let's Encrypt works. As the protocol specification evolves over time Let's Encrypt will implement updated versions of ACME. When doing so, security will be our primary concern, followed closely by backwards compatibility.

# New Backwards-Compatible ACME Features

From time to time Let's Encrypt may implement new backwards-compatible features for existing API endpoints. Typically new backwards-compatible features are introduced because we've decided to implement a part of the ACME spec that we hadn't implemented before.

When new features are introduced to existing API endpoints, the features will always be clearly specified in a public ACME specification and will not break properly implemented clients.

# ACME Security Fixes

If we become aware of a serious security issue with the ACME protocol (rather than simply our implementation of it) we may be forced to make compatibility-breaking changes to our API endpoints, or to cease operation of existing endpoints and introduce new ones. Hopefully this never happens, but this possibility highlights why it's important that ACME clients be able to receive timely updates.

# New Versions of ACME with Breaking Changes

When we feel it's important to implement new versions of ACME containing breaking changes we'll do so by introducing new API endpoints and maintaining them in parallel with the endpoints for older versions. We'll maintain the older versions until usage is low enough that we feel comfortable turning them off.

This is not going to happen very often since breaking compatibility is so burdensome even if there is plenty of time to transition. We will, however, be doing this once the IETF finishes [standardizing ACME](https://datatracker.ietf.org/wg/acme/charter/). We currently implement a pre-IETF-standardization version of ACME and we feel it's important to be using a formalized standard if possible.
