---
title: 常见问题
linkTitle: 常见问题（FAQ）
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2020-02-20
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

此常见问题列表分为以下几个部分：

* [常规问题](#general)
* [技术问题](#technical)

# <a id="general">常规问题</a>

## Let's Encrypt 提供哪些服务？

Let's Encrypt 是一家全球性的证书颁发机构（CA）。我们让世界各地的人们和组织获取、续期和管理 SSL/TLS 证书。网站可以使用我们的证书来启用安全的 HTTPS 连接。

Let's Encrypt 提供域名验证型（DV）证书。我们不提供组织验证（OV）或扩展验证（EV），这主要是因为我们无法自动化地颁发这些类型的证书。

要开始使用 Let's Encrypt，请访问我们的[快速入门](/getting-started)页面。

## 使用 Let's Encrypt 的费用是多少？真的免费吗？

我们不会对我们的证书收取费用。Let's Encrypt 是一个非营利性组织，我们的任务是通过促进 HTTPS 的广泛采用来创建一个更加安全和尊重隐私的 Web 环境。我们的服务免费且易于使用，因此每个网站都可以使用它来部署 HTTPS。

我们需要慷慨的赞助商、资助者和个人的支持，以便在全球范围内免费提供我们的服务。如果您有兴趣支持我们，请考虑[捐赠](/donate)或[成为赞助商](/become-a-sponsor)。

在某些情况下，集成商（例如托管服务提供商）将收取象征性费用，这笔费用反映了他们提供 Let's Encrypt 证书所需的管理和管理成本。

## 你提供什么样的支持服务？

Let's Encrypt 由一个小团队运营，依靠自动化来降低成本。因此，我们无法为用户提供直接支持。不过我们确实有一些很棒的支持服务：

1. 我们有非常实用的[文档](/docs)。
2. 我们有非常积极且乐于提供帮助的[社区支持论坛](https://community.letsencrypt.org/)。我们社区的成员在回答问题方面做得很好，许多最常见的问题已经得到了解答。

这是一个我们喜欢的描述社区支持力量的[视频](https://www.youtube.com/watch?v=Xe1TZaElTAs)。

## 使用 Let's Encrypt 的网站从事网络钓鱼/恶意软件/诈骗/……，我该怎么办？

我们建议将此类网站报告给 Google 安全浏览和 Microsoft 智能屏幕计划，以便更有效地保护用户。 以下是 Google 的报告网址：

[https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)

如果您想更多地了解我们的政策和想法，请点击此处：

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">技术问题</a>

## 我的浏览器是否信任 Let's Encrypt 的证书？

对于大多数浏览器和操作系统，是的。详见[兼容性列表](/docs/cert-compat)。

## Let's Encrypt 是否为用于网站的 SSL/TLS 以外的情况颁发证书？

Let’s Encrypt 证书是标准的域名验证性证书，因此您可以将它们用于任何使用域名的服务器，如 Web 服务器、邮件服务器、FTP 服务器等等。

电子邮件加密和代码签名需要使用不同类型的证书，Let's Encrypt 不会颁发这些类型的证书。

## Let's Encrypt 是否会在 Let's Encrypt 的服务器上为我的证书生成或存储私钥？

永远不会。

私钥的生成和管理始终由您自己的服务器而不是 Let's Encrypt 证书颁发机构进行。

## Let's Encrypt 证书的有效期有多长？

我们的证书有效期为 90 天。你可以在[这里](/2015/11/09/why-90-days.html)了解我们这么做的原因。

您不能调整这个限制，没有例外。我们建议您每 60 天自动续期一次证书。

## Let's Encrypt会颁发组织验证（OV）或扩展验证（EV）证书吗？

我们没有计划颁发 OV 或 EV 证书。

## 我可以获得针对多个域名的证书（SAN 证书或 UCC 证书）吗？

是的，可以使用主体备用名称（SAN）机制使同一份证书包含多个不同的名称。

## Let's Encrypt 颁发通配符证书吗？

是的。您必须使用 ACMEv2 协议并通过 DNS-01 验证方式来获取通配符证书。有关更多技术信息，请参阅[该网页](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)。

## 是否有 Let's Encrypt（ACME）客户端支持我的操作系统？

您有大量的 [ACME 客户端](/docs/client-options)可以选择。很有可能其中的某些客户端能在您的系统上正常工作。我们建议您在入门时使用 [Certbot](https://certbot.eff.org/)。

## 我可以使用现有的私钥或证书签名请求（CSR）吗？

是的，但并非所有客户端都支持此功能。[Certbot](https://certbot.eff.org/) 支持此功能。

## Let's Encrypt 使用什么 IP 地址来验证我的网站服务器？

我们不会发布用于验证的 IP 地址列表，因为它们随时都可能改变。请注意，我们当前[从多个IP地址进行验证](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)。

## 我成功续期了证书，但这次没有要求我验证。为什么会这样？

在您成功完成域名的验证后，生成的授权将会被以便后续使用。被缓存的授权在验证完成后的 30 天内有效。如果您请求的证书的所有必要的授权都有混缓存，则在相关被缓存的授权到期之前不会再次进行验证。
