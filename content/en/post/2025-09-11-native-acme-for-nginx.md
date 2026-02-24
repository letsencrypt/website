---
author: Josh Aas
date: 2025-09-11T00:00:00Z
slug: native-acme-for-nginx
title: "Native ACME Support Comes to NGINX"
excerpt: "The most-used web server and reverse proxy gives users a new certificate option."
display_support_us_footer: true
display_inline_newsletter_embed: false
---
<div class="pull-quote-right">
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="quote-text-value">NGINX and Let's Encrypt share a common vision of an open and secure web. Now, with built-in support for ACME, the world's most popular web server, reverse proxy and ingress controller for Kubernetes can simplify certificate management for everyone. From the home lab to scaled-out, mission-critical enterprise deployments.</p>
      <footer class="blockquote-footer"><span class="blockquote-mdash">&mdash;</span> <cite title="Source Title">Liam Crilly</cite>, Sr Dir, Product Management, F5 NGINX</footer>
    </div>
  </blockquote>
</div>

Our ideal has always been that server software could get and renew Let's Encrypt certificates automatically, with minimal human intervention.

Over time, more and more web servers and hosting environments have become capable of that, often via native ACME and Let's Encrypt integrations that allow users to manage certificates without third-party tools. On August 12, the popular open source web server NGINX [announced support](https://blog.nginx.org/blog/native-support-for-acme-protocol) for ACME with their official [ngx_http_acme module](https://nginx.org/en/docs/http/ngx_http_acme_module.html) (implemented with memory safe Rust code!).

NGINX is one of the most widely used pieces of software for operating a web server or proxy. In directly supporting ACME, NGINX joins other web servers like [Traefik](https://traefik.io/traefik), [Caddy](https://caddyserver.com/) and [Apache httpd](https://httpd.apache.org/docs/2.4/mod/mod_md.html) that can directly take advantage of certificates from Let's Encrypt and other ACME Certificate Authorities. NGINX's new support for ACME, together with other servers, means a significant majority of sites can now have native ACME support. Many other software environments, hosting plans, and devices also offer built-in official support for ACME.

Users have a wide range of choices to achieve integrations for their particular hosting environments. Native support in web servers is an option [alongside third-party clients](https://letsencrypt.org/docs/client-options/) that can integrate with many of those same web servers. Native support typically provides more seamless integration, and it's less work for operators since they don't have to manage a separate ACME client. Having more tools that take care of certificates automatically helps us achieve our goal of [encrypting more and more of the web](https://letsencrypt.org/stats/), while reducing the amount of time and energy site operators have to spend.

Other project developers interested in integrating ACME more directly can [read about the ACME protocol](https://letsencrypt.org/docs/#client-developer-information), find existing [ACME library implementations](https://letsencrypt.org/docs/client-options/#libraries) and other reusable software components, and join the [Client Dev conversation on our Community Forum](https://community.letsencrypt.org/c/client-dev/14).

We'd like to thank NGINX and their parent company, F5, for their sponsorship of Let's Encrypt. This financial support helps us provide a trusted and reliable service to nearly 700 million websites.