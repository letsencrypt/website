---
title: 证书颁发机构授权（CAA）
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---


CAA 是一类 DNS 记录，网站所有者可以通过它规定哪些证书颁发机构（CA）有权为其域名颁发证书。 2013 年，[RFC 6844](https://tools.ietf.org/html/rfc6844) 将 CAA 标准化，旨在协助 CA“降低误颁发证书的风险”。默认情况下，只要核验了域名归属，所有公共 CA 都能为任一公开 DNS 域名颁发证书。 这意味着但凡有一家 CA 的验证流程出现问题，全球所有域名的安全性都将受其影响。 而 CAA 能帮助域名持有者减轻这一风险。

# 使用 CAA 记录

如果您对 CAA 不感兴趣，那么一般无需执行任何操作（不过请参阅下文的“CAA 错误”一节）。 但如果您想借助 CAA 限制哪些 CA 能为您的域名颁发证书，就需要选择一家支持设置 CAA 记录的 DNS 服务商。 具体可查阅 [SSLMate 的 CAA 页面](https://sslmate.com/caa/support)， 如果其中包含您使用的服务商，就可以使用 [SSLMate 的 CAA 记录生成器](https://sslmate.com/caa/)生成一系列 CAA 记录，允许指定 CA 为您的域名颁发证书。

Let's Encrypt 在 CAA 中的标识名为 `letsencrypt.org`， 这一名称已正式载入[我们的证书运作声明第 4.2.1 节](/repository)。

## 放置 CAA 记录的位置

CAA 记录可以在主域名上设置，也可以在任一层级的子域名上设置。 假如您的域名是 `www.community.example.com`，那么 CAA 记录可以对这一整个域名设置，也可以对 `community.example.com` 或 `example.com` 设置。 证书颁发机构会从左到右查询各个域名，直至找到 CAA 记录为止。 也就是说，`community.example.com` 的 CAA 记录优先级要比 `example.com` 更高。 一般 CAA 记录都会直接在实际注册的域名（如 `example.com`）上设置，这样对所有子域名都能生效。 还要注意的是，子域名的 CAA 记录优先级必定高于其上级域名，无论其限制是更为宽松还是更为严格。 因此下级域名可以放宽上级域名所施加的限制。

与其他 DNS 请求一样，CAA 验证过程也会遵循 CNAME 记录。 假设 `www.community.example.com` 的 CNAME 是 `web1.example.net`，证书颁发机构会先查询 `www.community.example.com` 的 CAA 记录，发现只有 CNAME 记录后便会转而查询 `web1.example.net` 的 CAA 记录。 注意，DNS 标准不允许 CNAME 与其他记录在同一域名中共存。

[CAA 的 RFC 标准文档](https://tools.ietf.org/html/rfc6844)中还规定了一种名为“攀树”的流程，要求证书颁发机构解析 CNAME 后还要进一步查询其上层域名。 该流程后来被[一份修正案](https://www.rfc-editor.org/errata/eid5065)废除，因此 Let's Encrypt 与其他 CA 均未予以实现。

# CAA 错误

Let's Encrypt 颁发证书前必须检查 CAA 记录，但即使是从未设置过 CAA 的域名有时也会出现错误， 这种情况下域名可能存在 CAA 记录，但我们无法获取，也就无从得知是否有权为该域名颁发证书。

如果遇到 CAA 相关的错误，可以在我们的[测试环境](/docs/staging-environment)中多试几次，观察错误是否消失。 如果同一错误反复出现，就需要向您的 DNS 提供商或迁移服务提供商寻求帮助。 如果无法确定 DNS 提供商，请向网站托管服务商咨询。

某些不熟悉 CAA 的 DNS 提供商可能会辩称“我们不支持 CAA 记录”，但其实 DNS 提供商不必主动适配 CAA，只需对 CAA 等未知的 DNS 请求类型给予 NOERROR 响应即可。 事实上，对于未知的 QTYPE，其他的响应类型（包括 NOTIMP）都是违背 [RFC 1035](https://tools.ietf.org/html/rfc1035) 标准的，需要予以修复。

# SERVFAIL

SERVFAIL 是最常见的一类错误， 通常由 DNSSEC 验证失败造成。 如果遇到 SERVFAIL 错误，首先应当借助 [dnsviz.net](http://dnsviz.net/) 等 DNSSEC 调试器加以排查。 如果未发现问题，可能是域名服务器只有在响应为空时才会生成错误的数字签名， 而 CAA 响应恰好经常是空的。  PowerDNS 4.0.3 以下版本[就有这一问题](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha)。

如果没有开启 DNSSEC，但还是遇到了 SERVFAIL 错误，另一常见原因便是权威域名服务器的响应为 NOTIMP。正如上文所述，这是违反 RFC 1035 标准的。正确的响应代码应是 NOERROR，且响应内容为空。 如果确实是这一问题，请向 DNS 提供商反馈。

最后，SERVFAIL 也可能是权威域名服务器崩溃导致的。 请检查域名 NS 记录，确认各域名服务器是否正常运转。

# 超时

CAA 查询也有可能超时， 意即多次查询后权威服务器仍未作出任何响应。 其原因往往是域名服务器的防火墙配置不当，将类型未知的 DNS 查询报文一律丢弃。 请咨询 DNS 提供商是否存在此类防火墙。
