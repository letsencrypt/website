---
title: Best Practice - Keep Port 80 Open
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
---

{{< lastmod >}}

We occasionally get reports from people who have trouble using the
HTTP-01 challenge type because they've firewalled off port 80 to their
web server. Our recommendation is that all servers meant for general web
use should offer both HTTP on port 80 and HTTPS on port 443. They should
also send redirects for all port 80 requests, and possibly an HSTS header
(on port 443 requests).

Allowing port 80 doesn't introduce a larger attack surface on your server,
because requests on port 80 are generally served by the same software that
runs on port 443.

Closing port 80 doesn't reduce the risk to a person who accidentally
visits your website via HTTP. In normal circumstances, that person
would receive a redirect to HTTPS, and their subsequent traffic will be
protected. If that person was subject to an active MITM, the MITM would
answer on port 80, so your site would never have a chance to answer
"connection refused."

Lastly, keeping port 80 open in order to serve a redirect helps get
people to the right version of your site (the HTTPS version). There are
various situations beyond your control that might briefly land someone
on the HTTP version of your site - for instance, automatic linkification
in emails, or manually typing a domain name. It's better for them to get
a redirect than an error.

Unfortunately, you might not have control over whether port 80
is blocked for your site. Some (mostly residential) ISPs block
port 80 for various reasons. If your ISP does this but you’d
still like to get certificates from Let's Encrypt, you have
two options: You can use DNS-01 challenges or you can use [one of
the clients that supports TLS-ALPN-01 challenges](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2)
(on port 443).
