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

# Рекомендованный клиент: Certbot

Для большинства пользователей мы рекомендуем начать с ACME-клиента [Certbot](https://certbot.eff.org/). С ним очень просто получить сертификат, или установить имеющийся, в зависимости от ваших задач. Он прост в использовании, работает на большинстве операционных систем, и отлично документирован.

Если вас не устраивает [Certbot](https://certbot.eff.org/), или вы хотите опробовать альтернативные клиенты - мы подготовили для вас список ACME-клиентов, сгруппированных по платформе разработки и окружению, в котором они запускаются.

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
