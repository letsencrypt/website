---
title: Getting Started
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt issues certificates through an automated API based on the [ACME protocol](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).

In order to interact with the Let's Encrypt API and get a certificate, a piece of software called an "ACME client" is required. No part of the process for getting a certificate happens on this website, which is merely informational.

The first question to answer for people who want to get started with Let's Encrypt is: will my hosting provider get and manage certificates from Let's Encrypt for me, or do I need to run an ACME client myself?

# Getting certificates through your hosting provider

For many people, their hosting provider will get and manage certificates from Let's Encrypt for them. If this is your situation, your provider is operating an ACME client and you don't need to think about getting or operating ACME client software yourself.

If your provider gets and manages certificates for you, it will either happen automatically or there will be a configuration option that you will need to enable. Check your provider's documentation and configuration options.

# Selecting and operating an ACME client yourself

If your hosting provider does not handle getting and managing certificates for you, and if you have the ability to run commands on your server with sufficient privileges, you can select an ACME client and run it yourself to get certificates from Let's Encrypt.

For most people we recommend the [Certbot ACME client](https://certbot.eff.org/). The Certbot website has excellent documentation and instructions for operating Certbot.

There are [many more options for ACME client software](https://letsencrypt.org/docs/client-options/) if for some reason Certbot does not meet your needs.

# Getting Help

If you have questions about selecting an ACME client, or about using a particular client, or anything else related to Let's Encrypt, please try our [helpful community forums](https://community.letsencrypt.org/).

Our website also has [extensive documentation](https://letsencrypt.org/docs/) if you need more details.
