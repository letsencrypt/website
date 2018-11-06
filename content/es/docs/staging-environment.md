---
title: Staging Environment
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2018-03-12
---

{{< lastmod >}}

We highly recommend testing against our staging environment before using our production environment. This will allow you to get things right before issuing trusted certificates and reduce the chance of your running up against rate limits.

The ACME URL for our staging environment is:

`https://acme-staging.api.letsencrypt.org/directory`

If you're using Certbot, you can use our staging environment with the `--staging` flag. For other ACME clients, please read their instructions for information on testing with our staging environment.

The ACME URL for our [ACME v2 staging environment](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) is:

`https://acme-staging-v02.api.letsencrypt.org/directory`

If you're using Certbot, you can use our staging environment with the `--staging` flag. For other ACME clients, please read their instructions for information on testing with our staging environment. Please note the v2 staging environment requires a v2 compatible ACME client.

# Rate Limits

The staging environment uses the same rate limits as [described for the production environment](/docs/rate-limits/) with the following exceptions:

* The **Certificates per Registered Domain** limit is 30,000 per week.
* The **Duplicate Certificate** limit is 30,000 per week.
* The **Failed Validations** limit is 60 per hour.
* The **Accounts per IP Address** limit is 50 accounts per 3 hour period per IP.
* For ACME v2, the **New Orders** limit is 1,500 new orders per 3 hour period per account.

# Root Certificate

The staging environment intermediate certificate (["Fake LE Intermediate X1"](/certs/fakeleintermediatex1.pem)) is issued by a root certificate **not present** in browser/client trust stores. If you wish to modify a test-only client to trust the staging environment for testing purposes you can do so by adding the ["Fake LE Root X1"](/certs/fakelerootx1.pem) certificate to your testing trust store. Important: Do not add the staging root or intermediate to a trust store that you use for ordinary browsing or other activities, since they are not audited or held to the same standards as our production roots, and so are not safe to use for anything other than testing.

# Certificate Transparency

The staging environment submits pre-certificates to the Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test log and includes returned SCTs in the issued certificates.
