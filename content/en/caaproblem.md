---
title: Download affected certificate serials for 2020.02.29 CAA Rechecking Incident
slug: caaproblem
top_graphic: 4
date: 2020-03-02
lastmod: 2020-03-03
english_is_canonical: 1
---

{{< lastmod >}}

This page hosts the list of affected serial numbers and a domain checking utility for the incident reported at
https://community.letsencrypt.org/t/2020-02-29-caa-rechecking-bug/114591.

We have sent notification emails to affected subscribers who have registered an email address. You may need to check your spam folder if you do not see an email.
Please note that the absence of an email does not mean you aren't affected by this problem. The best thing to do if you are unsure is use the checking tools below.
The emails have the following subject line:
```
ACTION REQUIRED: Renew these Let's Encrypt certificates by March 4"
```

The file <a href="https://d4twhgtvn0ff5.cloudfront.net/caa-rechecking-incident-affected-serials.txt.gz">caa-rechecking-incident-affected-serials.txt.gz</a> contains a list of all
affected certs, sorted by account ID. Each entry has the following syntax:

```
serial 0362...8fdb 131 b8dc...ed3f names: [....] missing CAA checking results for <name> at 2019-12-03 21:08:34.826011675 +0000 UTC
```

The first chunk is the serial (03..), next is the account id (131), next is a
hash of the names on the cert (you can disregard), then the list of names on
the cert. The date is when the affected cert was issued.

You can download this file and look up your account id(s) (if you received an
email, your account ids were in that email). For each certificate
associated you will need to renew and replace it, unless you have renewed it
more recently than the date listed. For instance, if you know your ACME client
always renews certificates when they are 30 days from expiration, you can safely
ignore any entries with a date earlier than 2020-01-02.

If you want to double check whether a given hostname still
needs its certificate replaced, you can use the tool at
https://checkhost.unboundtest.com/

```
$ curl -XPOST -d 'fqdn=letsencrypt.org' https://checkhost.unboundtest.com/checkhost
The certificate currently available on letsencrypt.org is OK. It is not one of the certificates affected by the Let's Encrypt CAA rechecking problem. Its serial number is 03a1c95bdaa36a8268327f2253cbd3ba243
```

If you have a large list of domains you need to check, <a href="https://github.com/hannob/lecaa">this tool</a> will be more effective.
