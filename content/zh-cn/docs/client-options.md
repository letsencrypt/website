---
title: ACME客户端
slug: client-options
top_graphic: 1
lastmod: 2019-05-24
---

{{< clientslastmod >}}

Let's Encrypt使用ACME协议来验证您是否控制了给定的域名并向您颁发证书。 要获得Let's Encrypt证书，您需要选择一个要使用的ACME客户端软件。

以下ACME客户由第三方提供。 Let's Encrypt不控制或审查第三方客户端，也不能保证其安全性或可靠性。

您也可以使用某些浏览器（网页版）ACME客户端，但我们不会在此列出，因为它们会鼓励手动续订工作流程，从而导致用户体验不佳并增加错过续订的风险。

# 推荐：Certbot

我们建议大多数人从[Certbot](https://certbot.eff.org/)客户端开始。 它可以简单地为您获取证书，也可以帮助您安装。 它易于使用，适用于许多操作系统，并且具有出色的文档。

如果certbot不能满足您的需求，或者您只是想尝试其他软件，那么下面有更多的客户端可供选择，按照他们运行的语言或环境进行分组。

{{< clients acme_v2="兼容ACME v2的客户端" libraries="语言库" projects="与Let’s Encrypt集成的项目" >}}

Python [acme](https://github.com/certbot/certbot/tree/master/acme)模组是Certbot的一部分，但也被许多其他客户端使用，并作为独立包提供于[PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) 和其他发行版。

{{< /clients >}}

# 添加您的客户端/项目

如果您知道一个ACME客户端或者项目已经兼容Let's Encrypt但是没有出现在以上列表中，您可以在我们的GitHub[网站存储库](https://github.com/letsencrypt/website/)上提交一个请求(Pull Request），更新`data/clients.json`文件。

在提交请求（PR）之前，请确保：

1. 您的客户端尊重[Let's Encrypt商标权政策]({{< ref "/trademarks.md" >}})。
1. 您的客户端不是基于浏览器使用的，并且支持自动续订。
1. 您的提交把您的软件加至相关列表的**末尾**(如果您的软件支持ACME v2，请不要忘记添加"acme_v2")。
1. 您的提交需要更新`clients.json`顶部的`lastmod`日期戳。
