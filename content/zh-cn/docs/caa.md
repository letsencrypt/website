---
title: 证书颁发机构授权（CAA）
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA是一种DNS记录，允许站点所有者指定允许哪些证书颁发机构（CA）颁发包含其域名的证书。 该记录在2013年被[RFC 6844](https://tools.ietf.org/html/rfc6844)正式采纳，以允许CA“降低意外证书错误发布的风险”。通常来说，每个公共CA在验证申请者的域名控制权后都被允许为任何域名颁发证书。这意味着如果某个CA的验证流程出现错误，所有公开注册的域名都将受到影响。CAA记录为域名持有者提供了降低风险的方法。

# 使用CAA记录

如果您不关心CAA，通常不需要执行任何操作（但请参阅下面的CAA错误）。如果您希望使用CAA限制允许哪些证书颁发机构为您的域颁发证书，则需要使用支持设置CAA记录的DNS提供程序。 查看[SSLMate的CAA页面](https://sslmate.com/caa/support)以获取此类提供商的列表。 如果列出了您的DNS提供商，您可以使用[SSLMate的CAA记录生成器](https://sslmate.com/caa/)生成一组列出您允许颁发证书的CA的CAA记录。

Let's Encrypt为CAA确定的域名是`letsencrypt.org`。 这已在[我们的认证实践声明（CPS），第4.2.1节]({{< ref "/repository.md" >}})中正式记录。

## 放置CAA记录的位置

您可以在主域或任何子域深度上设置CAA记录。例如，如果你有`www.community.example.com`，你可以在该域或`community.example.com`或`example.com`设置CAA记录。CA将从左到右检查每个版本，并在看到任何CAA记录后立即停止。因此，`community.example.com`上的CAA记录优先于`example.com`上的记录。大多数添加CAA记录的人都希望将它们添加到注册域（`example.com`），以便它们在所有子域均适用。另请注意，子域的CAA记录优先于其父域，无论该记录相比于主域更宽松或更具限制性。 因此，子域可以放松父域所施加的限制。

与所有其他DNS请求一样，CAA验证遵循CNAME记录。如果`www.community.example.com`是`web1.example.net`的CNAME，CA将首先请求`www.community.example.com`的CAA记录，然后看到该域有一个CNAME 名称而不是CAA记录，将请求`web1.example.net`的CAA记录。 请注意，如果域名具有CNAME记录，则根据DNS标准不允许拥有任何其他记录。

[CAA RFC](https://tools.ietf.org/html/rfc6844)最初指定了一种称为“爬树”的附加行为，要求CA还检查CNAME解析结果的父域。后来[erratum](https://www.rfc-editor.org/errata/eid5065)删除了这个额外的行为，因此XXX和其他CA没有配置该行为。

# CAA错误

由于Let's Encrypt在颁发证书之前检查CAA记录，因此有时即使对于未设置任何CAA记录的域名，我们也会收到错误。 当我们收到错误时，我们无法判断是否允许对该域名颁发证书，因为域名可能存在因为错误无法显示的“禁止颁发”CAA记录。

如果您收到与CAA相关的错误，请在我们的[测试环境]({{< ref "/docs/staging-environment.md" >}})中再试几次，看看它们是暂时的还是永久性的。 如果它们是永久性的，则需要向DNS提供商或交换机提供商提出支持工单。 如果您不确定您的DNS提供商是谁，请询问您的托管服务提供商。

一些不熟悉CAA的DNS提供商最初使用“我们不支持CAA记录”回复客户的问题报告。您的DNS提供商不需要专门支持CAA记录; 它只需要对未知查询类型（包括CAA）的NOERROR响应进行回复。 对于无法识别的qtypes，返回其他操作码（包括NOTIMP）违反了[RFC 1035](https://tools.ietf.org/html/rfc1035)并需要修复。

# SERVFAIL

人们遇到的最常见错误之一是SERVFAIL。 大多数情况下，这表明DNSSEC验证失败。 如果您收到SERVFAIL错误，您的第一步应该是使用如[dnsviz.net](http://dnsviz.net/)之类的DNSSEC调试器检查错误。如果这不起作用，则只有在响应为空时，您的名称服务器才可能生成错误的签名。 CAA响应通常是空的。 例如，PowerDNS [在4.0.3及更低版本中有此错误](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha)。

如果您没有启用DNSSEC并得到SERVFAIL回复，第二个最可能的原因是您的权威名称服务器返回NOTIMP，如上所述，这是违反RFC 1035的; 它应该以空响应返回NOERROR。 如果是这种情况，请向DNS提供商提交错误或支持服务工单。

最后，SERVFAIL可能是由您的权威名称服务器服务中断引起的。 检查DNS服务器的NS记录，并确保每个服务器都可以访问。

# 连接超时

有时CAA会查询超时。 也就是说，即使在多次重试之后，权威名称服务器也从不回复答案。 最常见的情况是，当您的DNS服务器防火墙有配置错误时，会丢弃具有未知qtypes的DNS查询。您可以向DNS提供商提交支持工单，询问他们是否配置了这样的防火墙。
