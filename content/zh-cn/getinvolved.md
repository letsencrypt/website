---
title: 帮助Let's Encrypt
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## 社区论坛

您可以帮助我们在[Let's Encrypt社区论坛](https://community.letsencrypt.org/)中回答问题。 详见 [此博客文章](/2015/08/13/lets-encrypt-community-support.html)以了解社区支持为何如此重要。

## 代码

您也可以帮助我们开发软件。 我们的所有代码都存储于[GitHub](https://github.com/letsencrypt/)。

### 客户端软件

[Certbot](https://github.com/certbot/certbot)是使用Python编写的帮助网络服务器自动获取证书并配置HTTPS的实用程序。Certbot是我们建议大多数人使用的客户端。 还有许多其他[第三方客户端]({{< ref "/docs/client-options.md" >}})可用。

### 服务器端CA软件

Let's Encrypt CA使用[Boulder](https://github.com/letsencrypt/boulder)签发证书。 该软件基于[ACME](https://github.com/ietf-wg-acme/acme)协议并主要使用Go编写。 [“需要帮助”问题](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted)列表和[贡献者指南](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)是一个很好的起点。

### letsencrypt.org

您可以在[此处](https://github.com/letsencrypt/website)改进本网站和文档或帮助我们[翻译](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)网站。

## 签发协议

Let's Encrypt CA与在网站服务器上运行的证书管理软件进行通信。我们使用的协议叫ACME，用于“自动证书管理”。 ACME协议草案可在[Github](https://github.com/ietf-wg-acme/acme)上获得。IETF正在努力工作以将ACME定为真正的开放标准协议。 您可以加入[此IETF邮件列表](https://www.ietf.org/mailman/listinfo/acme)讨论ACME协议开发。
