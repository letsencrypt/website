---
title: Staging Environment
slug: staging-environment
date: 2018-01-05
lastmod: 2024-06-11
show_lastmod: 1
---


We highly recommend testing against our staging environment before using our production environment. This will allow you to get things right before issuing trusted certificates and reduce the chance of your running up against rate limits.

The ACME URL for our [ACME v2 staging environment](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) is:

`https://acme-staging-v02.api.letsencrypt.org/directory`

If you're using Certbot, you can use our staging environment with the `--test-cert` or `--dry-run` flag. For other ACME clients, please read their instructions for information on testing with our staging environment.

# Rate Limits

The staging environment uses the same rate limits as [described for the production environment](/docs/rate-limits) with the following exceptions:

* The **Certificates per Registered Domain** limit is 30,000 per week.
* The **Duplicate Certificate** limit is 30,000 per week.
* The **Failed Validations** limit is 60 per hour.
* The **Accounts per IP Address** limit is 50 accounts per 3 hour period per IP.
* For ACME v2, the **New Orders** limit is 1,500 new orders per 3 hour period per account.

# Staging Certificate Hierarchy

The staging environment has a certificate hierarchy that [mimics production](/certificates). The names have been modified with a prefix of (STAGING) and unique name to make them clearly distinct from their production counterparts.

## Root CAs

The staging environment has two active root certificates which are **not present** in browser/client trust stores: "(STAGING) Pretend Pear X1" and "(STAGING) Bogus Broccoli X2".

If you wish to modify a test-only client to trust the staging environment for testing purposes you can do so by adding their certificates to your testing trust store. **Important note:** Do not add the staging root or intermediate to a trust store that you use for ordinary browsing or other activities, since they are not audited or held to the same standards as our production roots, and so are not safe to use for anything other than testing.

* **Pretend Pear X1**
  * Subject: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Key type: `RSA 4096`
  * Certificate details: [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
* **Bogus Broccoli X2**
  * Subject: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Key type: `ECDSA P-384`
  * Certificate details (self-signed): [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Certificate details (cross-signed by Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)

## Subordinate (Intermediate) CAs

The staging environment has intermediate certificates that mimic production, issued from the untrusted roots detailed above. Like in production, not all are in use at any time. The full list of current intermediates is:

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14

These intermediates are subject to change at any time, and should not be pinned or trusted by any system. In general, you can expect the staging intermediates to parallel the corresponding production (trusted) intermediates. If strictly necessary, you can get full certificate details [here](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Certificate Transparency

The staging environment submits pre-certificates to the Let's Encrypt [Sapling](/docs/ct-logs) and Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT test logs and includes returned SCTs in the issued certificates.

# Continuous Integration / Development Testing

The staging environment has generous rate limits to enable testing but it is not a great fit for integration with development environments or continuous integration (CI). Making network requests to external servers can introduce instability and the staging environment offers no way to "fake" DNS or challenge validation success which makes for more complicated test setups.

In addition to the staging environment Let's Encrypt offers a small ACME server purpose built for CI and development environments called [Pebble](https://github.com/letsencrypt/pebble). Running Pebble on your development machine or in a CI environment is [quick and easy](https://github.com/letsencrypt/pebble#docker).
