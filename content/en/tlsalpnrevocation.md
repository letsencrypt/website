---
title: Download affected certificate serials for 2022.01.25 TLS-ALPN-01 Incident
slug: tlsalpnrevocation
top_graphic: 4
date: 2022-01-26
lastmod: 2022-01-26
english_is_canonical: 1
show_lastmod: 1
---

This page hosts the list of certificates affected by the TLS-ALPN-01 Incident. You can find details about this incident [in the community forum](https://community.letsencrypt.org/t/2022-01-25-issue-with-tls-alpn-01-validation-method/170450) and [on bugzilla](https://bugzilla.mozilla.org/show_bug.cgi?id=1751984).

We have sent notification emails to affected subscribers who have registered a valid email address; if you received an email, you have at least one affected certificate. You may not have received an email if you did not provide an email address when registering your ACME account, if you unsubscribed from Let's Encrypt [email notifications](https://letsencrypt.org/docs/expiration-emails/) previously, or if the email was caught by a spam filter.

If you are unsure whether your hostname is affected, we are also providing a list of all affected certificate serial numbers, along with their associated account ID numbers and all DNS Names which appear on the certificate.

The file [tls-alpn-01-incident-affected-certs-by-regID.csv.gz](https://tls-alpn-01-data.letsencrypt.org/tls-alpn-01-affected-certs-by-regID.csv.gz) is a gzipped CSV containing rows in the following format:

```csv
123456,"03e1ce2c0324f9ca93417fc8886f87f34857","2022-01-25T18:25:29Z","letsencrypt.org","www.letsencrypt.org","status.letsencrypt.org"
```

The first column is the [ID number](https://letsencrypt.org/docs/account-id/) of the account which requested issuance of the certificate. The file is sorted by account ID, so all certs issued by a single account are grouped together. The second column is the unique hexadecimal serial number of the certificate. The third column is the time at which the certificate was issued (in RFC3339 format, i.e. YYYY-MM-DDTHH:MM:SSZ, all times UTC). The remaining columns are all identifiers (DNS hostnames) that the certificate was issued for.

You can download this file, unzip it with `gunzip` or the equivalent utility on your computer, and look up your account id(s). You need to renew and replace each certificate listed, unless you have already done so more recently than Jan 26, 2022, 00:48 UTC.
