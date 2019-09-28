---
title: 帮助 Let's Encrypt
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## 社区论坛

您可以帮助我们在 [Let's Encrypt 社区论坛](https://community.letsencrypt.org/)中回答问题。参见[此博客文章](/2015/08/13/lets-encrypt-community-support.html)以了解社区支持为何如此重要。

## 代码

您也可以帮助我们开发软件。我们的所有代码都存储在 [GitHub](https://github.com/letsencrypt/) 上。

### 客户端软件

[Certbot](https://github.com/certbot/certbot) 是使用 Python 编写的帮助 Web 服务器自动获取证书并配置 HTTPS 的实用程序。Certbot 是我们建议大多数人使用的客户端。此外还有许多其他[第三方客户端]({{< ref "/docs/client-options.md" >}})可用。

### 服务器端 CA 软件

Let's Encrypt CA 使用 [Boulder](https://github.com/letsencrypt/boulder) 签发证书。该软件基于 [ACME](https://github.com/ietf-wg-acme/acme) 协议并主要使用 Go 语言编写。[标注为“help wanted”的 issue 列表](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted)和[贡献者指南](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)都是一个很好的起点。

### letsencrypt.org

您可以在[此处](https://github.com/letsencrypt/website)改进本网站和文档或帮助我们[翻译](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)网站。

## 协议

Let's Encrypt CA 与在网站服务器上运行的证书管理软件进行通信。通信时使用的协议称为 ACME（自动证书管理环境）。ACME 协议草案可在 [Github](https://github.com/ietf-wg-acme/acme) 上获得。IETF 正在努力工作以将 ACME 定为真正的开放标准。您可以加入[此 IETF 邮件列表](https://www.ietf.org/mailman/listinfo/acme)讨论 ACME 协议的开发。
