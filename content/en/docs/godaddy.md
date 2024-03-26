---
title: "GoDaddy Economy Shared Hosting and Let's Encrypt Certificates"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2022-10-15
show_lastmod: 1
---

GoDaddy does not currently offer [AutoSSL in cPanel][1] with their economy shared hosting plan,
which would provide free acquisition, installation, and automatic renewal of certificates.
[GoDaddy currently offers one free SSL certificate with the initial purchase of their economy
shared hosting plan that renews for a cost each year after the first year.][2]
To help alleviate this situation, one of our community members has created [a simple solution
that allows free acquisition and installation of Let's Encrypt certificates][3], but this
solution does not currently offer automatic renewal, which we strongly believe to be a critical
aspect of the [ACME protocol][4]. Since Let's Encrypt certificates expire after 90 days and
should be renewed every 60 days, the use of a solution that does not support automatic renewal
comes with the inherent risk of forgetting to manually renew a certificate before expiration,
which will result in any site or service utilizing the expired certificate ceasing to function
as intended until the expired certificate is renewed. If you choose to use a solution that does
not support automatic renewal, you will be responsible for remembering to manually renew your
certificates every 60 days.

[1]: https://www.godaddy.com/help/what-is-autossl-40020
[2]: https://www.godaddy.com/hosting/web-hosting
[3]: https://community.letsencrypt.org/t/certsage-acme-client-version-1-3-0-easy-webpage-interface-optimized-for-cpanel-no-commands-to-type-root-not-required/186125
[4]: https://tools.ietf.org/html/rfc8555
