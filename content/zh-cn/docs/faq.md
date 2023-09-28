---
title: 常见问题
linkTitle: 常见问题（FAQ）
slug: faq
top_graphic: 1
lastmod: 2022-06-15
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

此常见问题列表分为以下几个部分：

- [常规问题](#general)
- [技术问题](#technical)

# <a id="general">常规问题</a>

## Let's Encrypt 提供哪些服务？

Let's Encrypt 是一家全球性的证书颁发机构（CA）， 为世界各地的个人和团体提供获取、续期、管理 SSL/TLS 证书的服务。 网站可以使用我们的证书来启用安全的 HTTPS 连接。

Let's Encrypt 提供域名验证型（DV）证书。 我们不提供组织验证（OV）或扩展验证（EV），这主要是因为我们无法自动化地颁发这些类型的证书。

前往我们的[快速入门](/getting-started)页面即可开始使用 Let's Encrypt。

## 使用 Let's Encrypt 的费用是多少？ 真的免费吗？

我们颁发证书不收取任何费用。 Let's Encrypt 属于非营利组织，旨在推广 HTTPS 技术的应用，从而构建更加安全且尊重隐私的互联网环境。 我们致力于提供免费便捷的服务，以此帮助所有网站部署 HTTPS。

同时，我们也需要个人与赞助商的慷慨援助，才能持续向全球提供免费的服务。 如果您有兴趣支持我们，请考虑[捐款](/donate)或[成为赞助商](https://www.abetterinternet.org/sponsor)。

部分服务商（如网站托管服务）可能会收取小额费用，以弥补其提供 Let's Encrypt 证书所产生的管理费用。

## 你们能提供怎样的客户服务？

Let's Encrypt 的运营团队规模较小，依靠自动化来降低成本， 因此无法直接为用户提供客服支持。 不过我们确实有一些很棒的支持服务：

1. 我们有非常实用的[文档](/docs)。
2. 我们有非常积极且乐于提供帮助的[社区支持论坛](https://community.letsencrypt.org/)。 我们社区的成员在回答问题方面做得很好，许多最常见的问题已经得到了解答。

[这段影片](https://www.youtube.com/watch?v=Xe1TZaElTAs)充分展现了社群支持的力量，与我们的观念不谋而合。

## 使用 Let's Encrypt 的网站从事网络钓鱼/恶意软件/诈骗/……， 我该怎么办？

我们建议向 Google Safe Browsing 与 Microsoft SmartScreen 项目举报此类网站，以便更为有效地保护用户。 举报网址如下：

- [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
- [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

如果您想深入了解我们的相关政策及其背后的原因，可以阅读此文：

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">技术问题</a>

## 我的浏览器是否信任 Let's Encrypt 的证书？

对于大多数浏览器和操作系统，是的。 详见[兼容性列表](/docs/cert-compat)。

## 除网站 SSL/TLS 证书外，Let's Encrypt 能否颁发其他证书？

Let's Encrypt 颁发的是标准的域名验证型证书，凡是有域名的服务器都能使用，包括网页服务器、邮件服务器、FTP 服务器等等。

电子邮件加密与代码签名采用的是另一种证书，Let's Encrypt 不能颁发。

## Let's Encrypt 是否会在其服务器上生成或存储我的证书私钥？

不会。 永远不会。

私钥的生成和管理始终由您自己的服务器而不是 Let's Encrypt 证书颁发机构进行。

## Let's Encrypt 证书的有效期有多长？ 能够使用多久？

我们的证书有效期为 90 天。 其背后的原因可以从[这里](/2015/11/09/why-90-days.html)了解。

这一期限不能调整，也没有例外。 我们建议您每 60 天自动续期一次证书。

## Let's Encrypt 能颁发组织验证（OV）或扩展验证（EV）型证书吗？

我们没有计划颁发 OV 或 EV 证书。

## 我可以获得针对多个域名的证书（SAN 证书或 UCC 证书）吗？

是的，可以使用主体备用名称（SAN）机制使同一份证书包含多个不同的名称。

## Let's Encrypt 颁发通配符证书吗？

是的。 通配符证书必须通过 ACMEv2 采用 [DNS-01 质询](/docs/challenge-types/#dns-01-challenge)签发。 有关更多技术信息，请参阅[该网页](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)。

## 是否有 Let's Encrypt（ACME）客户端支持我的操作系统？

您有大量的 [ACME 客户端](/docs/client-options)可以选择。 其中很可能就有支持您操作系统的客户端。 我们建议您在入门时使用 [Certbot](https://certbot.eff.org/)。

## 我可以使用现有的私钥或证书签名请求（CSR）吗？

是的，但并非所有客户端都支持此功能。 [Certbot](https://certbot.eff.org/) 是支持的。

## Let's Encrypt 使用什么 IP 地址来验证我的网站服务器？

我们不会发布用于验证的 IP 地址列表，因为它们随时都可能改变。 请注意，我们目前有[多个用于验证的 IP 地址](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)。

## 我的证书成功续期，但这次却不需要验证，为什么？

域名验证通过后，结果会保留一段时间， 30 天内有效。 如果您申请证书时所有验证结果都还未过期，就无需重复验证。

## 在哪里可以深入了解 TLS/SSL 与 PKI 的相关知识？

资深网络安全学者 Ivan Ristić 曾发表过一篇配置指南，列举了<a href="https://www.feistyduck.com/library/bulletproof-tls-guide/online/" target="_blank" rel="noopener noreferer">设置 TLS 应注意的事项</a>，参考价值很高。

如果要更广泛、更深入地学习相关背景知识，推荐 Ristić 的另一部著作 <a href="https://www.feistyduck.com/books/bulletproof-tls-and-pki/" target="_blank" rel="noopener noreferer">Bulletproof TLS and PKI</a>。
