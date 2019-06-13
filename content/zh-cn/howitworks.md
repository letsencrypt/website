---
title: 从这里开始了解
slug: getting-started
top_graphic: 3
aliases : [/howitworks]
---

为了在你的网站上启用 HTTPS，你需要从一个证书颁发机构(Certificate Authority, CA)中获取到证书(一种文件)。
Let's Encrypt 是一个证书颁发机构。为了从Let's Encrypt中获取与你的网站域名绑定的证书，你需要展现你有此域名的控制权。
你可以在你的网站主机上使用支持[ACME protocol](https://ietf-wg-acme.github.io/acme/)的软件来展现域名的控制权。

为了找出最适合你的方式，你需要了解你是否在网站主机上有[shell access](https://en.wikipedia.org/wiki/Shell_account)(也称为SSH access)能力。
如果你通过一些控制面板，类似[cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/), 或者
[WordPress](https://wordpress.org/)，那么有很大可能你没有shell access能力。你可以向你的主机服务商咨询并确认。

# 使用Shell Access

我们推荐大部分使用 Shell Access 方式的人使用[Certbot]ACME 客户端。 [Certbot] 可以自动颁布证书并安装，无需停机。同时针对不需要自动配置的人，提供专家模式。
[Certbot] 使用简单，可以在多种操作系统上工作，并拥有非常棒的文档。[访问Certbot][Certbot] 来获取针对你的操作系统与网络服务器的个性化设置。


如果[Certbot]无法满足你的需要，或者你想要尝试其他方式，这里有[其他更多的选项](/docs/client-options/)。
当你选择 ACME 客户端软件后，可查看更多文档继续。


如果你正在试验不同的 ACME 客户端，使用我们的[staging环境](/docs/staging-environment/) 来避免触发到[访问频率限制](/docs/rate-limits/)。

[Certbot]: https://certbot.eff.org/  "Certbot"

# 无法使用 Shell Access

在这种情况下，使用主机提供商内置的支持，是最好的方式。如果你的主机提供商支持 Let's Encrypt，他们可以代表你申请一个免费的证书，
并可以自动安装并保持证书更新。对于一些主机提供商，这个配置需要你主动开启。其他提供商为会所有客户自动申请并安装证书。

[检查主机列表](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)，确认你的主机提供商是否在列表中。
如果在的话，使用它们的文档指引进行 Let's Encrypt 证书设置。

如果你的主机提供商不支持 Let's Encrypt，你可以联系它们并申请支持。我们会尽最大努力去添加支持，主机提供商通常会非常愿意倾听客户的建议！。

如果你的主机提供商不希望集成 Let's Encrypt, 但是支持上传自定义证书，
那么你可以在你的电脑上安装 Certbot 并采用[手动模式](https://certbot.eff.org/docs/using.html#manual)。
在手动模式中，你上传一个特定的文件到你的网站上来证明你拥有网站的控制权。Certbot 会取回一个证书，这个证书你可以上传到你的主机提供商。
我们不推荐这种方式，是因为这个过程是耗时的，并且你每年都会因为证书过期而重复这个过程几次。
对大部分人，更好的方式是通过主机提供商获取 Let's Encrypt 的支持，或者在主机提供商没有计划提供支持的情况下考虑选择其他主机提供商。

# 获取帮助

如果你有选择 ACME 客户端，或者关于如何使用特定的客户端，或者任何关于Let's Encrypt的问题，请联系我们[社区论坛](https://community.letsencrypt.org/)获取帮助。
