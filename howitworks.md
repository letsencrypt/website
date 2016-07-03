---
layout: page
title: Getting Started
permalink: /getting-started/
top_graphic: 3
redirect_from: "/howitworks"
---

Anyone who has gone through the trouble of setting up a secure website knows what a hassle getting and maintaining a certificate can be. Let's Encrypt automates away the pain and lets site operators turn on and manage HTTPS with simple commands. Using Let's Encrypt is free, so there is no need to arrange payment.

If you'd like to know more about how Let's Encrypt works behind the scenes, check out our [how it works](/how-it-works/) page.

# Choose a Let's Encrypt Client

We recommend that most people start with the <a href="https://certbot.eff.org/"><code>certbot</code></a> client. It can simply get a cert for you or also help you install, depending on what you prefer. It's easy to use, works on many operating systems, and has great documentation. Simply click the word <a href="https://certbot.eff.org/"><code>certbot</code></a> to get started.

If <a href="https://certbot.eff.org/"><code>certbot</code></a> does not meet your needs, or you'd simply like to try something else, there are [many more clients to choose from](/docs/client-options/).

Once you've chosen Let's Encrypt client software, see the documentation for that client to proceed.

# Limits on usage

Let's Encrypt limits the number of certificates that can be issued to any particular domain each week. This is done in order to prevent abuse. [See this thread](/docs/rate-limits/) for more information about rate limits.

We highly recommend testing against our [staging environment](/docs/staging-environment/) before using our production environment. This will allow you to get things right before issuing trusted certificates and reduce the chance of your running up against rate limits.

# Getting Help

If you have questions about selecting a client, or about using a particular client, or anything else related to Let's Encrypt, please try our [helpful community forums](https://community.letsencrypt.org/).
