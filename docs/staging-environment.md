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

If you're using Certbot, you can use our staging environment with the `--staging` flag. For other ACME clients, please read their instructions for information on testing with our staging environment.

# Rate Limits

The staging environment uses the same rate limits as [described for the production environment](/docs/rate-limits/) with the following exceptions:

* The **Certificates per Registered Domain** limit is 30,000 per week.
* The **Duplicate Certificate** limit is 30,000 per week.

# Root Certificate

The staging environment intermediate certificate (["Fake LE Intermediate X1"](/certs/fakeleintermediate.pem)) is issued by a root certificate **not present** in browser/client trust stores. If you wish to modify a test-only client to trust the staging environment for testing purposes you can do so by adding the ["Fake LE Root X1"](/certs/fakelerootx1.pem) certificate from the [certificates](/certificates/) page to your testing trust store. Important: Do not add the staging root or intermediate to a trust store that you use for ordinary browsing or other activites, since they are not audited or held to the same standards as our production roots, and so are not safe to use for anything other than testing.
