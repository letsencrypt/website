---
title: FAQ
linkTitle: 常问问题 (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

常问问题被分为下面几个部分:

* [一般问题](#general)
* [技术问题](#technical)

# <a name="general">一般问题</a>

## Let's Encrypt提供什么服务?

Let's Encrypt是一个全球的证书颁发机构(CA)。我们让世界各地的个人或组织获取、更新和管理SSL/TLS证书。我们的证书
能用在网站上来保证安全的HTTPS连接。

Let’s Encrypt提供域名验证(DV)证书。我们不提供组织验证(OV)或扩展验证(EV)，因为我们不能自动签发这些类型的证书。

开始使用Let's Encrypt前，请访问[开始](https://letsencrypt.org/getting-started/) 页面。

## 使用Let's Encrypt需要花费什么？真的免费吗？

我们的证书不收任何费用。Let’s Encrypt是一个非盈利组织，我们的使命是通过促进HTTPS的广泛使用，创建一个更安全的、更尊重隐私的网络。
我们的服务是免费并且容易使用的，所以每个网站可以使用HTTPS.

我们需要慷慨的赞助商，资助者和个人的支持，以便在全球范围内免费提供我们的服务。
如果你想支持我们，考虑[捐赠](/cn/donate/)或者[称为一个赞助商](/cn/become-a-sponsor/)。

在某些情况下，集成商（例如托管服务提供商）将收取象征性费用，以反映他们提供的管理和管理成本以提供Let’s Encrypt证书。

## 你们提供什么类型的服务?

Let’s Encrypt由一个小团队运营，依靠自动化来降低成本。既然这样，我们无法为订阅用户提供直接支持。
我们确实有一些很棒的支持选择：
1. 我们有非常有用的[文档](/cn/docs/).
2. 我们有非常活跃有用的[社区支持论坛](https://community.letsencrypt.org/). 我们社区的成员在回答问题方面做得很好，
许多最常见的问题已经得到了解答

这里是一个我们喜欢的关于组织支持的力量的[视频](https://www.youtube.com/watch?v=Xe1TZaElTAs)。

## 使用Let's Encrypt的网站从事网络钓鱼/恶意软件/诈骗/...，我该怎么办？

我们推荐报告这类网站给谷歌安全浏览和微软智能屏幕计划，它能更有效的保护用户。这里是谷歌安全浏览地址：

https://www.google.com/safebrowsing/report_badware/

如果您想了解更多有关我们的政策和理由，可以在此处查看：

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">技术问题</a>

## 我的浏览器会信任Let’s Encrypt的证书吗?

对于大部分浏览器和操作系统，可以信任。查看[兼容性列表](/cn/docs/certificate-compatibility/)查看更多详情.

## 除了为网站提供SSL/TLS证书，Let's Encrypt是否提供其他证书？

Let’s Encrypt证书是标准的域名验证证书，你可以在任何使用域名的服务器上使用他们，例如网站服务器，邮件服务器，FTP服务器，
或者更多。

邮件加密和代码签名需要不同的证书类型，Let’s Encrypt不提供。

## Let’s Encrypt是否在Let’s Encrypt服务器上生成或者存储我证书的私钥？

不，从不。

私钥在你自己的服务器上生成和管理，不是在Let's Encrypt证书颁发机构生成和管理。

## Let's Encrypt的生命周期是怎样的？他们的有效期是多长时间？

我们的证书90天有效。你可以在[这里](https://letsencrypt.org/2015/11/09/why-90-days.html)查看原因。

没有其他方法调整这个，也没有例外。我们推荐每60天自动更新你的证书，

## Let’s Encrypt是否颁发组织验证（OV）或者扩展验证（EV）证书？

我们没有颁发OV或者Ev证书计划。

## 我可以为多个域名获取一个证书吗(SAN证书或者UCC证书)?

可以，相同的证书可以包含不同的名字，通过使用Subject Alternative Name (SAN)机制。

## Let’s Encrypt是否颁发通配符证书？

是，必须使用DNS-01挑战通过ACMEv2进行通配符发布。查看[这里](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)获取更多技术信息。

## Let's Encrypt是否为我的操作系统提供一个ACME客户端？

这里有许多[ACME客户端](/cn/docs/client-options/)可以使用。选择在你操作系统运行良好的，我们推荐[Certbot](https://certbot.eff.org/)。

## 我能使用一个已经存在的私钥或者证书签名请求(CSR)吗？

可以，但是并不是所有的客户端支持这个功能。[Certbot](https://certbot.eff.org/) 支持.

## Let's Encrypt使用哪个IP地址来验证我得网站服务器？

我们不会发布用于验证的IP地址列表，因为它们可能随时更改。 将来，我们可以同时从多个IP地址进行验证。

## 我成功的更新了一个证书，但是验证这个时候没有发生，可能是什么原因？

一旦你成功完成域名的验证，系统会缓存生成的授权，以便您以后再次使用。缓存授权从验证开始持续30天。
如果您请求的证书具有缓存的所有必要授权，则在相关缓存授权到期之前不会再次进行验证。
