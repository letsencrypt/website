---
author: Jacob Hoffman-Andrews
date: 2026-02-24T00:00:00Z
slug: rate-limits-45-day-certs
title: "Shorter Certificate Lifetimes and Rate Limits"
excerpt: "Rate limits will be unaffected because renewals do not count toward limits."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

As [previously announced](/2025/12/02/from-90-to-45), over the next two years we will be switching the default certificate lifetime from 90 days to 64 days, and then 45 days. This will ultimately double the number of certificate renewal requests each day: today we expect renewal around day 60 (of a 90-day certificate), while in the future we expect renewal around day 30 (of a 45-day certificate). If you use an ACME client that [supports ARI](/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients), this will happen automatically.

The good news for subscribers is that you don't need any changes to your rate limits, whether you are [using our default limits](/docs/rate-limits/) or have requested an override. Our rate limits affect issuance for new domain names (or groups of domain names), but [renewals are exempt](/docs/rate-limits/#limit-exemptions-for-renewals). So, for instance, if you are managing a set of 15,000 certificates that you continually renew, and create 250 new certificates (with new domain names) each day, you will be well within our limits both before and after the transition. The 250 new certificates daily will still be well under our [New Orders per Account limit](/docs/rate-limits/#new-orders-per-account) of 300 per day. And the 15,000 existing certificates will continue to be unaffected by rate limits, whether your ACME client is renewing them every sixty days or every thirty.