---
title: Certificate Lifetime Rationale and Plans
slug: cert-lifetimes
lastmod: 2026-07-22
show_lastmod: 1
---

## Current Lifetimes

Since our initial launch in 2015, Let's Encrypt has offered certificates with 90-day lifetimes. This remains the default lifetime, and the vast majority of the certificates we issue have 90-day lifetimes.

Short-lived certificates with 6-day lifetimes are optionally available to all of our subscribers.

See our [certificate profiles documentation](/docs/profiles/) for more information.

## Future Plans

[Industry rules](https://cabforum.org/working-groups/server/baseline-requirements/documents/) will limit certificate lifetimes to a maximum of 47 days starting on March 15, 2029. As such, we will be [reducing the maximum lifetime of our certificates to 45 days by February 2028](/2025/12/02/from-90-to-45).

## Why shorter lifetimes?

We're sometimes asked why we only offer certificates with 90-day lifetimes, or why we're introducing even shorter lifetimes.

There are two primary advantages to shorter certificate lifetimes:

* They limit damage from mis-issuance and key compromise. Mis-issued certificates, and certificates with keys compromised either before or after issuance, are valid for a shorter period of time.
* They encourage automation, which is absolutely essential for ease-of-use and reliability. Once certificate management is automated, shorter lifetimes aren't any less convenient than longer ones.

We chose 90-day lifetimes for our initial offering because ninety days was short enough to strongly encourage automation, but long enough to make it possible to do things manually. While we wanted to encourage automation, that goal was subordinate to making it possible for everyone to enable HTTPS. At the time, automation wasn't as common as it is today, in part because the ecosystem of tools to enable it (e.g. ACME clients) was young. Today things are very different - automation is far more common and the ecosystem of tools to enable it is much more mature. As such, we are more comfortable with offerings shorter than ninety days now than we were then.
