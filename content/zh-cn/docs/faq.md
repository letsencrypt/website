---
title: 常见问题
linkTitle: Frequently Asked Questions (FAQ)
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

此常见问题分为以下几个部分：

* [常规问题](#general)
* [技术问题](#technical)

# <a name="general">常规问题</a>

## Let's Encrypt提供哪些服务？

Let's Encrypt是证书颁发机构（CA）。 我们让世界各地的人们和组织获取，更新和管理SSL/TLS证书。 网站可以使用我们的证书来启用安全的HTTPS连接。
Let's Encrypt提供域验证（DV）证书。 我们不提供组织验证（OV）或扩展验证（EV），主要是因为我们无法自动颁发这些类型的证书。
要开始使用Let's Encrypt，请访问我们的[入门]({{< ref "/getting-started.md" >}}) 页面。

## 使用Let's Encrypt的费用是多少？ 真的免费吗？

我们不会对我们的证书收取费用。 Let's Encrypt是一个非营利组织，我们的任务是通过促进HTTPS的广泛采用来创建一个更加安全和尊重隐私的Web。 我们的服务免费且易于使用，因此每个网站都可以部署HTTPS。
我们需要慷慨的赞助商，资助者和个人的支持，以便在全球范围内免费提供我们的服务。 如果您有兴趣支持我们，请考虑[捐赠]({{< ref "/donate.html" >}})或[成为赞助商]({{< ref "/become-a-sponsor.html" >}})。

在某些情况下，集成商（例如托管服务提供商）将收取象征性费用，这笔费用反映了他们提供Let's Encrypt证书所需的管理和管理成本。

## 你提供什么样的支持？

Let's Encrypt由一个小团队运营，依靠自动化来降低成本。 既然如此，我们无法为订户提供直接支持。 我们确实有一些很棒的支持选择：

1. 我们有实用的[文档]({{< ref "/docs" >}}).
2. 我们有非常积极和有帮助的[社区支持论坛](https://community.letsencrypt.org/)。 我们社区的成员在回答问题方面做得很好，许多最常见的问题已经得到了解答。

这是我们喜欢的描述社区支持力量的[视频](https://www.youtube.com/watch?v=Xe1TZaElTAs)。

## 使用Let's Encrypt的网站从事网络钓鱼/恶意软件/诈骗/ ...，我该怎么办？

我们建议将此类网站报告给Google安全浏览和Microsoft智能屏幕计划，以便更有效地保护用户。 以下是Google报告网址：

https://www.google.com/safebrowsing/report_badware/

如果您想了解更多有关我们的政策和理由，请点击此处：

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">技术问题</a>

## 我的浏览器是否信任Let's Encrypt的证书？

对于大多数浏览器和操作系统，是的。 有关更多详细信息，请参阅[兼容性列表]({{< ref "/docs/cert-compat.md" >}})。

##Let's Encrypt是否为网站的SSL/TLS以外的任何内容颁发证书？

Let’s Encrypt证书是标准的域验证证书，因此您可以将它们用于任何使用域名的服务器，如Web服务器，邮件服务器，FTP服务器等等。

电子邮件加密和代码签名需要使用Let's Encrypt不会颁发的不同类型的证书。

## Let's Encrypt是否会在Let's Encrypt的服务器上为我的证书生成或存储私钥？

永远不会。

私钥始终在您自己的服务器上生成和管理，而不是由Let's Encrypt证书颁发机构生成和管理。

## Let's Encrypt证书的生命周期是多少？ 它们有效期有多长？

我们的证书有效期为90天。 你可以在[这里](/2015/11/09/why-90-days.html)阅读我们的原因。

没有办法调整这个，没有例外。 我们建议您每60天自动续订一次证书。

## Let's Encrypt会发布组织验证（OV）或扩展验证（EV）证书吗？

我们没有计划颁发OV或EV证书。

## 我可以获得多个域名（SAN证书或UCC证书）的证书吗？

是的，相同的证书可以使用主题备用名称（SAN）机制包含多个不同的名称。

## Let’s Encrypt颁发通配符证书吗？

我们支持签发通配符证书。 您必须使用ACME v2节点并通过DNS验证来获取通配符证书。有关更多技术信息，请参阅[该网页](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)。

## 我的操作系统是否有Let's Encrypt（ACME）客户端？

有大量[ACME客户端]({{< ref "/docs/client-options.md" >}})可用。 有很大可能某个软件可以在您的系统内良好运行。我们建议从[Certbot](https://certbot.eff.org/)开始。

## 我可以使用现有的私钥或证书签名请求（CSR）吗？

是的，但并非所有客户都支持此功能。  [Certbot](https://certbot.eff.org/)支持此功能.

## Let's Encrypt使用什么IP地址来验证我的网站服务器？

我们不会发布用于验证的IP地址列表，因为它们可能随时更改。 将来，我们可以同时从多个IP地址进行验证。

## 我成功续签了证书，但这次没有要求我验证 - 为什么会这样？

在您成功完成域的验证后，系统会缓存生成的授权，以便您以后再次使用。 缓存授权从验证开始30天内有效。
如果您请求的证书具有缓存的所有必要授权，则在相关缓存授权到期之前不会再次进行验证。
