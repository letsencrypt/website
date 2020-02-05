---
title: 证书颁发机构授权（CAA）
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA是一种 DNS 记录，它允许站点所有者指定允许哪些证书颁发机构（CA）颁发包含其域名的证书。该记录在 2013 年由 [RFC 6844](https://tools.ietf.org/html/rfc6844) 标准化，以允许 CA “降低意外颁发证书的风险”。默认情况下，每个公共 CA 在验证申请者的域名控制权后可以为任何在公共 DNS 中的域名颁发证书。这意味着如果某个 CA 的验证流程出现错误，所有域名都有可能受到影响。CAA 记录为域名持有者提供了降低这类风险的方法。

# 使用 CAA 记录

如果您不关心CAA，通常您不需要执行任何操作（但请参阅下面的“CAA 错误”）。如果您希望使用 CAA 限制允许哪些证书颁发机构为您的域名颁发证书，则您需要使用支持设置 CAA 记录的 DNS 提供商。您可以查看 [SSLMate 的 CAA 页面](https://sslmate.com/caa/support)以获取此类提供商的列表。如果那上面列出了您的 DNS 提供商，您可以使用 [SSLMate 的 CAA 记录生成器](https://sslmate.com/caa/)生成一组列出您允许颁发证书的 CA 的 CAA 记录。

Let's Encrypt 用于 CAA的标识域名 `letsencrypt.org`。这已在{{<link "我们的证书实践声明（CPS）4.2.1 节" "/repository" >}}中正式记录。

## 放置 CAA 记录的位置

您可以在主域名或任何深度的子域名上设置 CAA 记录。例如，如果您有 `www.community.example.com` 这个域名，您可以在该域名、`community.example.com` 或 `example.com` 上设置 CAA 记录。CA 将从左到右检查每个版本，并在看到任何 CAA 记录后立即停止。因此， `community.example.com` 上的 CAA 记录优先于 `example.com` 上的记录。大多数添加 CAA 记录的人都希望将它们添加到注册域名（`example.com`），这样它们对所有子域名均有效。此外请注意，子域名的 CAA 记录优先于其父域名，无论该记录相比于主域更宽松或更具限制性。因此，子域名可以放松父域名所施加的限制。

与所有其他 DNS 请求一样，CAA 验证遵循 CNAME 记录。如果 `www.community.example.com` 被设置为 `web1.example.net` 的 CNAME，CA 将首先请求 `www.community.example.com` 的CAA记录，然后发现该域名有一个CNAME 而不是 CAA 记录后，将请求 `web1.example.net` 的 CAA 记录。请注意，如果域名具有 CNAME 记录，则根据 DNS 标准它不能拥有任何其他记录。

[CAA 的 RFC](https://tools.ietf.org/html/rfc6844)指定了一种称为“爬树”的附加行为，它要求 CA 同时检查 CNAME 解析结果的父域名。后来[一份勘误](https://www.rfc-editor.org/errata/eid5065)删除了这个额外的行为，因此 Let's Encrypt 和其他 CA 没有实施该行为。

# CAA 错误

由于 Let's Encrypt 在颁发证书之前检查 CAA 记录，有时即使对于未设置任何 CAA 记录的域名，我们也会遇到错误。当我们遇到错误时，我们无法判断是否可以对该域名颁发证书，因为域名可能存在因为错误而无法显示的禁止我们颁发证书的 CAA 记录。

如果您遇到与 CAA 相关的错误，请在我们的{{<link "测试环境" "/docs/staging-environment" >}}中再试几次，看看它们是暂时性的还是永久性的。如果这些错误是永久性的，则您需要向 DNS 提供商或交换机提供商提交支持工单。 如果您不确定您的 DNS 提供商是谁，请询问您的托管服务提供商。

一些不熟悉 CAA 的 DNS 提供商最初会对客户的问题报告回复说“我们不支持 CAA 记录”。您的 DNS 提供商不需要专门支持 CAA 记录；它只需要对未知查询类型（包括 CAA）回复以 NOERROR 响应。对不识别的查询类型返回其他操作码（包括 NOTIMP）违反了 [RFC 1035](https://tools.ietf.org/html/rfc1035) 并需要修复。

# SERVFAIL

SERVFAIL 是人们最常遇到的错误之一。大多数情况下，这表明 DNSSEC 验证失败。如果您遇到 SERVFAIL 错误，您首先应该使用如 [dnsviz.net](http://dnsviz.net/) 之类的 DNSSEC 调试器检查错误。如果您没有发现错误，您的名称服务器可能在响应为空时才生成错误的签名。而 CAA 响应通常是空的。例如，PowerDNS [在 4.0.3 及更低版本中有此问题](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha)。

如果您没有启用 DNSSEC 却收到了 SERVFAIL 回复，那么第二可能的原因是您的权威名称服务器返回了 NOTIMP 响应。如上所述，这是违反 RFC 1035 的；它应该返回响应代码为 NOERROR 的空响应。如果是这种情况，请向 DNS 提供商提交错误报告或支持服务工单。

最后，SERVFAIL 可能是由您的权威名称服务器服务中断引起的。请检查 DNS 服务器的 NS 记录，并确保每个服务器都可以访问。

# 超时

有时 CAA 查询会超时。也就是说，即使在我们多次重试之后，权威名称服务器也没有返回任何答复。最常见的情况是，当您的 DNS 服务器的防火墙配置错误，会丢弃具有未知查询类型的 DNS 查询。您可以向 DNS 提供商提交支持工单，询问他们是否配置了这样的防火墙。
