---
title: 证书颁发机构授权 (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA是一种DNS记录，允许站点所有者指定允许哪些证书颁发机构(CAs)颁发包含其域名的证书。2013年，
[RFC 6844](https://tools.ietf.org/html/rfc6844)对其进行了标准化，允许CA“降低意外颁发证书错误的风险”。
默认情况下，每个公共CA都被允许为公共DNS中的任何域名颁发证书，为他们的域名提供有效的控制。这意味着如果在这些公共的
CA的验证过程中有任何一个BUG，每个域名将潜在受影响。CAA为域名持有人提供了一种降低这种风险的方式。

# 使用 CAA

如果你不关心CAA，你不用做任何事情（仅仅看看下面的CAA错误）。如果您想使用CAA来限制允许哪些证书颁发机构
为您的域名颁发证书，你需要使用一个支持设置CAA记录的DNS供应商。从[SSLMate's CAA 页面](https://sslmate.com/caa/support)
可以找到很多这样的供应商。如果你的供应商列在上面，你可以使用[SSLMate's CAA 记录生成器](https://sslmate.com/caa/)
来生成一组CAA记录，列出你允许的CA。

Let's Encrypt在CAA的识别域名为`letsencrypt.org`，这是官方的文档[在我们的认证实践声明(CPS)中, 章节 4.2.1](https://letsencrypt.org/repository/).

## 哪里存放CAA记录

你可以在你的主要域名商设置CAA记录，或者在其他子域名。
例如，如果你有`www.community.example.com`，你应该设置CAA记录为全名，或者简写`community.example.com`，
或者`example.com`。CA将从左至右检测每个版本，一旦他们看到CAA记录将马上停止。比如，`community.example.com`
CAA记录将优先于`example.com`。大多数添加CAA记录的人希望添加他们到他们自己的域名(`example.com`)，所以他们可以在
多级域名使用。还需要注意，子域名的CAA记录优先于父级域名，无论他们更严格还是更宽松。因此子域可以放松父域设置的限制。

像所有其他DNS请求一样，CAA验证遵从CNAME。如果`www.community.example.com`是`web1.example.net`的别名，
然后看到该域名有一个CNAME，而不是CAA记录，将为`web1.example.net`请求CAA记录。注意如果一个域名有CNAME记录，
根据DNS标准，将不允许有其他记录。

[CAA RFC](https://tools.ietf.org/html/rfc6844)指定了一个称为“tree-climbing”的附加行为，
要求CAs也检查CNAME解析结果的父域名。这种附件的行为后来被[an erratum](https://www.rfc-editor.org/errata/eid5065)
移除，所以Let's Encrypt和其他CA不使用它。

# CAA 错误

虽然Let's Encrypt在每个证书发布前都会检查CAA，有时我们也会出现为给域名设置任何CAA记录的错误。当我们遇到问题，
我们无法判断是否允许受影响的域名发行，CAA记录可能禁止发行因为有可能错误不可见。

如果你收到CAA相关错误，在我们的[测试环境](/docs/staging-environment/)多试几遍来确认错误是偶然出现还是一直出现。
如果问题一直出现，你需要找你的DNS供应商提供支持，或者换供应商。如果你不知道谁是你的DNS供应商，问一下你的托管供应商。

一些不熟悉CAA的DNS供应商回复"我们不支持CAA记录。"你的DNS供应商不需要特别支持CAA记录，对于不知道的查询类型（包括CAA），
他们只需要回复NOERROR。对于无法识别的错误，回复其他代码，包括NOTIMP，将会违反[RFC1035](https://tools.ietf.org/html/rfc1035)，
需要修补。

# SERVFAIL

一个最常见的错误是人们遇到SERVFAIL。大多数时候，这表明DNSSEC验证失败。如果你遇到SERVFAIL错误，首先你应该使用像
[dnsviz.net](http://dnsviz.net/)的DNSSEC调试器。如果不管用，则可能是你的命名服务器在回复为空的时候
生成了不正确的签名。CAA回复经常为空。例如，PowerDNS [在4.0.3章节下面有这个漏洞](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

如果你没有DNSSEC并且遇到SERVFAIL，第二种最可能的原因是你的权威命名服务器返回NOTIMP，NOTIMP在上面
RFC 1035冲突中已经描述了，在遇到空的回复的时候本应该返回NOERROR。如果是这种情况，请向DNS提供商提交错误或支持服务单。

最后，SERVFAIL可能由您的权威命名服务器引起的。检查你的命名服务器NS记录，确保每个服务器可用。

# 超时

有时CAA查询超时。这个时候，权威命名服务器不回应任何东西，即使重试多次。最常见的情况是，
当您的名称服务器在其前面具有错误配置的防火墙时，会跑出具有未知qtypes的DNS查询。给DNS提供商一个支持单，
问他们的防火墙有没有这样的配置。
