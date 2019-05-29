---
title: Реализации ACME-клиента
slug: client-options
top_graphic: 1
lastmod: 2019-05-09
---

{{< clientslastmod >}}

Let's Encrypt использует ACME-протокол для подтверждения ваших прав на данное доменное имя, а также для выпуска сертификата для него. Чтобы получить сертификат Let's Encrypt, вам необходимо использовать ACME-клиент.

Представленные ниже ACME-клиенты разрабатываются сторонними организациями. Let's Encrypt не управляет их разработкой, не проверяет их код и не предоставляет гарантий их безопасности и надёжности.

Существуют ACME-клиенты в виде браузерных расширений, но мы не приводим их здесь по причине необходимости ручного обновления сертификатов. Это затрудняет использование ACME-клиента, и, потенциально, может привести к пропуску момента обновления.

# Recommended: Certbot

We recommend that most people start with the [Certbot](https://certbot.eff.org/) client. It can simply get a cert for you or also help you install, depending on what you prefer. It’s easy to use, works on many operating systems, and has great documentation.

If certbot does not meet your needs, or you’d simply like to try something else, there are many more clients to choose from below, grouped by the language or environment they run in.

{{< clients acme_v2="ACME v2 Compatible Clients" libraries="Libraries" projects="Projects integrating with Let’s Encrypt" >}}

the Python [acme](https://github.com/certbot/certbot/tree/master/acme) module is part of the Certbot tree, but is also used by a number of other clients and is available as a standalone package via [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) and other distributions.

{{< /clients >}}

# Adding your client/project

If you know of an ACME client or a project that has integrated with Let's Encrypt that is not present in the above page please submit a pull request to our [website repository](https://github.com/letsencrypt/website/) on Github, updating the `data/clients.json` file.

Before submitting a pull request please make sure:

1. Your client respects the [Let's Encrypt trademark policy](https://letsencrypt.org/trademarks/).
1. Your client is not browser-based and supports automatic renewals.
1. Your commit adds your client to the **end** of the relevant sections (Don't forget the "acme_v2" if appropriate!).
1. Your commit updates the `lastmod` date stamp at the top of `clients.json`.
