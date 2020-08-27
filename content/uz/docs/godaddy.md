---
title: "Let's Encrypt Certificates on GoDaddy Hosting"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
---

{{< lastmod >}}

We get a lot of questions about how to use Let’s Encrypt on GoDaddy. If you use
GoDaddy shared web hosting, it’s currently very difficult to install a Let’s
Encrypt certificate, so we don’t currently recommend using our certificates with
GoDaddy. That’s because GoDaddy doesn’t support the [ACME protocol][1] for automated
certificate issuance and renewal. Instead, GoDaddy offers automated renewal with
their own certificates, which are an [added-cost feature][2].

We don’t recommend using Let’s Encrypt certificates on hosting providers that
don’t directly implement the ACME protocol, because it means you can’t fully
automate renewals. We think automated renewals are a very important part of
using certificates. Using software to automate renewal makes it much less likely
that your certificate will expire without being replaced. If your certificate
expires, it’s very frustrating for your users because they can’t access your
site.

Because we believe so strongly in automated renewal, we design our certificates
to be used with ACME automation. A Let’s Encrypt certificate is meant to be
renewed automatically after 60 days, and will stop working after 90 days if it
isn’t renewed.

If, after reviewing the above problems, you decided that you’d like to try
maintaining a Let’s Encrypt certificate on GoDaddy shared hosting, GoDaddy
[provides instructions][3]. Keep in mind, following these instructions is
time-consuming, and you are expected to do it every 60 days (not every 90 days
as described on the linked page).

[1]: https://tools.ietf.org/html/rfc8555
[2]: https://www.godaddy.com/web-security/ssl-certificate
[3]: https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023
