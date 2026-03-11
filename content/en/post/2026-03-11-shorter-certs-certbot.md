---
author: Jacob Hoffman-Andrews
date: 2026-03-11T00:00:00Z
slug: shorter-certs-certbot
title: "Six-Day and IP Address Certificates Available in Certbot"
excerpt: "The most commonly used ACME client now offers shorter-lifetime certificates"
display_support_us_footer: true
display_inline_newsletter_embed: false
---

As we announced earlier this year, Let's Encrypt now [issues IP address and six-day certificates](/2026/01/15/6day-and-ip-general-availability) to the general public. The Certbot team at the [Electronic Frontier Foundation](https://www.eff.org/) has been working on two improvements to support these features: the `--preferred-profile` flag released last year in Certbot 4.0, and the `--ip-address` flag, new in Certbot 5.3. With these improvements together, you can now use [Certbot](https://certbot.eff.org/) to get those IP address certificates!

If you want to try getting an IP address certificate using Certbot, install version 5.4 or higher (for `webroot` support with IP addresses), and run this command:

```bash
sudo certbot certonly --staging \
  --preferred-profile shortlived \
  --webroot \
  --webroot-path <filesystem path to webserver root> \
  --ip-address <your ip address>
```

Two things of note:

- This will request a non-trusted certificate from the Let's Encrypt staging server. Once you've got things working the way you want, run without the `--staging` flag to get a publicly trusted certificate.

- This requests a certificate with Let's Encrypt's "shortlived" profile, which will be good for 6 days. This is a Let's Encrypt requirement for IP address certificates.

As of right now, Certbot only supports getting IP address certificates, not yet installing them in your web server. There's work to come on that front. In the meantime, edit your webserver configuration to load the newly issued certificate from `/etc/letsencrypt/live/<ip address>/fullchain.pem` and `/etc/letsencrypt/live/<ip address>/privkey.pem`.

The command line above uses Certbot's "webroot" mode, which places a challenge response file in a location where your already-running webserver can serve it. This is nice since you don't have to temporarily take down your server.

There are two other plugins that support IP address certificates today: `--manual` and `--standalone`. The `manual` plugin is like `webroot`, except Certbot pauses while you place the challenge response file manually (or [runs a user-provided hook](https://eff-certbot.readthedocs.io/en/stable/using.html#hooks) to place the file). The `standalone` plugin runs a simple web server that serves a challenge response. It has the advantage of being very easy to configure, but has the disadvantage that any running webserver on port 80 has to be temporarily taken down so Certbot can listen on that port. The `nginx` and `apache` plugins don't yet support IP addresses.

You should also be sure that Certbot is set up for automatic renewal. Most installation methods for Certbot set up automatic renewal for you. However, since the webserver-specific installers don't yet support IP address certificates, you'll have to [set a `--deploy-hook`](https://eff-certbot.readthedocs.io/en/stable/using.html#renewing-certificates) that tells your webserver to load the most up-to-date certificates from disk. You can provide this `--deploy-hook` through the `certbot reconfigure` command using the rest of the flags above.

We hope you enjoy using IP address certificates with Let's Encrypt and Certbot, and as always if you get stuck you can ask for help in our [Community Forum](https://community.letsencrypt.org/).
