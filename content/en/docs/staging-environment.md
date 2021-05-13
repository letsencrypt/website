---
title: Staging Environment
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2021-05-13
---

{{< lastmod >}}

We highly recommend testing against our staging environment before using our production environment. This will allow you to get things right before issuing trusted certificates and reduce the chance of your running up against rate limits.

The ACME URL for our [ACME v2 staging environment](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) is:

`https://acme-staging-v02.api.letsencrypt.org/directory`

If you're using Certbot, you can use our staging environment with the `--dry-run` flag. For other ACME clients, please read their instructions for information on testing with our staging environment. Please note the v2 staging environment requires a v2 compatible ACME client.

# Rate Limits

The staging environment uses the same rate limits as [described for the production environment](/docs/rate-limits) with the following exceptions:

* The **Certificates per Registered Domain** limit is 30,000 per week.
* The **Duplicate Certificate** limit is 30,000 per week.
* The **Failed Validations** limit is 60 per hour.
* The **Accounts per IP Address** limit is 50 accounts per 3 hour period per IP.
* For ACME v2, the **New Orders** limit is 1,500 new orders per 3 hour period per account.

# Staging Certificate Hierarchy

The staging environment has a certificate hierarchy that [mimics production](/certificates).

## Intermediate Certificates

The staging environment has two active intermediate certificates: an RSA intermedite ["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) and an ECDSA intermediate ["(STAGING) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

ECDSA issuance was [enabled in Staging](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) on 24 March 2021 and all requests for Staging certificates with ECDSA keys are signed by "(STAGING) Ersatz Edamame E1" and utilize the ECDSA hierarchy. Similarly all requests for Staging certificates with RSA keys are signed by "(STAGING) Artificial Apricot R3" and use the RSA hierarchy. There is no way to get an RSA-signed certificate for an ECDSA key, nor vice versa; the way to control which issuer you get is to control what kind of key you generate locally.

## Root Certificates

The staging environment has two active root certificates which are **not present** in browser/client trust stores: "(STAGING) Pretend Pear X1" and "(STAGING) Bogus Brocoli X2". If you wish to modify a test-only client to trust the staging environment for testing purposes you can do so by adding the ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) and/or ["(STAGING) Bogus Brocoli X2"](/certs/staging/letsencrypt-stg-root-x1.pem) certificate to your testing trust store. You can find all of our staging certificates ["here"] (https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Important: Do not add the staging root or intermediate to a trust store that you use for ordinary browsing or other activities, since they are not audited or held to the same standards as our production roots, and so are not safe to use for anything other than testing.

# Certificate Transparency

The staging environment submits pre-certificates to the Let's Encrypt [Testflume](/docs/ct-logs) and Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test logs and includes returned SCTs in the issued certificates.

# Continuous Integration / Development Testing

The staging environment has generous rate limits to enable testing but it is not a great fit for integration with development environments or continuous integration (CI). Making network requests to external servers can introduce instability and the staging environment offers no way to "fake" DNS or challenge validation success which makes for more complicated test setups.

In addition to the staging environment Let's Encrypt offers a small ACME server purpose built for CI and development environments called [Pebble](https://github.com/letsencrypt/pebble). Running Pebble on your development machine or in a CI environment is [quick and easy](https://github.com/letsencrypt/pebble#docker).
