---
layout: page
title: Staging Environment
permalink: /docs/staging-environment/
top_graphic: 1
date: 2016-07-02T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

We highly recommend testing against our staging environment before using our production environment. This will allow you to get things right before issuing trusted certificates and reduce the chance of your running up against rate limits.

The ACME URL for our staging environment is:

`https://acme-staging.api.letsencrypt.org/directory`

Please see your client's instructions for information on testing with our staging environment.

# Rate Limits

The staging environment uses the same rate limits as [described for the production environment](/docs/rate-limits/) with the following exceptions:

* The **Certificates per Registered Domain** limit is 30,000 per week.
* The **Duplicate Certificate** limit is 30,000 per week.
