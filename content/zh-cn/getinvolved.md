---
title: 参与进来
slug: getinvolved
top_graphic: 5
menu:
  main:
    weight: 60
    parent: donate
---

## 社区

通常情况下，我们总是可以使用帮助回答问题，这些帮助可以在[Let's Encrypt Community Support](https://community.letsencrypt.org/)中找到。参考[这篇文章](https://letsencrypt.org/2015/08/13/lets-encrypt-community-support.html) 来了解为何社区贡献的支持是那么重要。

## 代码

我们还可以使用软件开发方面的帮助。我们所有的代码在[GitHub](https://github.com/letsencrypt/)上可以找到。

### 客户端软件

[Certbot](https://github.com/certbot/certbot) 是一个基于 Python 语言的工具包，这个工具包与你的网路服务器一起，自动获取一份证书，并将网站转换为 HTTPS。我们推荐大部分人可以从 Certbot 开始使用。许多其他[第三方客户端](https://letsencrypt.org/docs/client-options/)也是可用的。

### 服务端 CA 软件

[Boulder](https://github.com/letsencrypt/boulder) 是 Let's Encrypt CA 部分的实现。它基于[ACME](https://github.com/ietf-wg-acme/acme)协议，主要使用 Go 语言编写。可以从 ['help wanted' issues](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted) 列表 和 [贡献者指南](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md) 这两个地方开始了解。

### letsencrypt.org

你可以提升本网站以及文档[这里](https://github.com/letsencrypt/website)，或者帮助我们进行[翻译](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)。

## 协议

The Let's Encrypt CA talks to certificate management software running on web servers.  The protocol for this is called ACME, for "Automated Certificate Management Environment." The draft ACME spec is [available on Github](https://github.com/ietf-wg-acme/acme). Work is underway within the IETF to finalize ACME as a truly open standard. You can join the ACME protocol development discussion on [this IETF mailing list](https://www.ietf.org/mailman/listinfo/acme).
