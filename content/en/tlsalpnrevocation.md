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

We have sent notification emails to affected subscribers who have registered a valid email address; if you received an email, you have at least one affected certificate. You may have not received an email if you did not provide an email address when registering your ACME account, if you unsubscribed from Let's Encrypt email notifications previously, or if the email was caught by a spam filter.

If you are unsure whether your hostname is affected, we are also providing a list of all affected certificate serial numbers, along with their associated account ID numbers and all DNS Names which appear on the certificate.

The file [tls-alpn-01-incident-affected-certificates.txt](...) contains rows in the following format:
```
123456 2022-01-25T18:25:29Z 03e1ce2c0324f9ca93417fc8886f87f34857 letsencrypt.org www.letsencrypt.org status.letsencrypt.org
```
The first element in each row is the [ID number](https://letsencrypt.org/docs/account-id/) of the account which requested issuance of the certificate. The file is sorted by account ID, so all certs issued by a single account are grouped together. The second element is the time at which the certificate was issued. The third element is the unique hexadecimal serial number of the certificate. The remaining elements are all identifiers (DNS hostnames) that the certificate was issued for.

You can download this file and look up your account id(s) (if you received an email, your account ids were in that email). For each certificate
associated you will need to renew and replace it, unless you have renewed it
more recently than the date listed. For instance, if you know your ACME client
always renews certificates when they are 30 days from expiration, you can safely
ignore any entries with a date earlier than 2020-01-02.
