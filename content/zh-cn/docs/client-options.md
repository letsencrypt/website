---
title: ACME 客户端
slug: client-options
top_graphic: 1
lastmod: 2019-11-15
---

{{< clientslastmod >}}

Let's Encrypt 使用 ACME 协议来验证您对给定域名的控制权并向您颁发证书。要获得 Let's Encrypt 证书，您需要选择一个要使用的 ACME 客户端软件。

下列 ACME 客户端由第三方提供。Let's Encrypt 不控制或审查第三方客户端，也不能保证其安全性或可靠性。

您也可以使用某些浏览器（网页版）ACME 客户端，但我们不会在此列出这些客户端，因为它们会鼓励您手动进行续期，从而导致用户体验不佳并增加错过续期的风险。

# 推荐客户端：Certbot

我们建议大多数人从 [Certbot](https://certbot.eff.org/) 客户端开始。 它既可以仅为您获取证书，也可以帮助您安装证书（如果您需要的话）。它易于使用，适用于许多操作系统，并且具有出色的文档。

如果 certbot 不能满足您的需求，或者您只是想尝试其他软件，那么下面有更多的客户端可供选择，这些客户端按照编写所用的语言或是使用环境排序。

# ACMEv1 和 ACMEv2 协议

Let's Encrypt使用和[ACME最终标准](https://tools.ietf.org/html/rfc8555)符合的ACMEv2 API。 我们将在2020和2021年[淘汰较旧的ACMEv1 API](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/)。 此列表上的所有客户端都支持ACMEv2。如果您使用的客户端在该列表中，请确保您将其升级到最新版本。 如果下面没有列出您正在使用的客户端，请与项目维护者联系或更换其他客户端。

{{< clients acme_v2="兼容 ACMEv2 的客户端" libraries="库" projects="集成了 Let’s Encrypt 的项目" >}}

Python 模块 [acme](https://github.com/certbot/certbot/tree/master/acme) 是 Certbot 的一部分，但它也被许多其他客户端使用，并在 [PyPI](https://pypi.python.org/pypi/acme)、[Debian](https://packages.debian.org/search?keywords=python-acme)、[Ubuntu](https://launchpad.net/ubuntu/+source/python-acme)、[Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) 和其他一些发行版中作为独立软件包提供。

{{< /clients >}}

# 添加您的客户端/项目

如果您知道在以上列表中没有列出的 ACME 客户端或集成了 Let's Encrypt 的项目，您可以在我们网站的 GitHub [代码仓库](https://github.com/letsencrypt/website/)中更新 `data/clients.json` 文件并提交拉取请求（Pull Request）。

在提交拉取请求之前，请确保：

1. 您的客户端尊重 [Let's Encrypt 商标政策]({{< relref "/trademarks.md" >}})。
1. 您的客户端不是基于浏览器使用的，并且支持自动续期。
1. 您的提交把您的软件加至相关列表的**末尾**（如果该软件支持 ACMEv2 协议，请不要忘记添加“acme_v2”）。
1. 您的提交更新了 `clients.json` 顶部的 `lastmod` 日期戳。
