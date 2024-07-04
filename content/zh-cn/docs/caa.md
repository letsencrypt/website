---
title: 证书颁发机构授权（CAA）
slug: caa
date: 2017-07-27
lastmod: 2023-08-16
show_lastmod: 1
---


CAA 是一类 DNS 记录，网站所有者可以通过它规定哪些证书颁发机构（CA）有权为其域名颁发证书。 2013 年 CAA 首次实现标准化，我们现在使用的则是 2019 年由 [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659) 和 [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657) 修订的版本。 默认情况下，只要核验了域名归属，所有公共 CA 都能为任一公开 DNS 域名颁发证书。 这意味着但凡有一家 CA 的验证流程出现问题，全球所有域名的安全性都将受其影响。 而 CAA 能帮助域名持有者减轻这一风险。

# 使用 CAA 记录

如果您对 CAA 不感兴趣，那么一般无需执行任何操作（不过请参阅下文的“CAA 错误”一节）。 但如果您想借助 CAA 限制哪些 CA 能为您的域名颁发证书，就需要选择一家支持设置 CAA 记录的 DNS 服务商。 具体可查阅 [SSLMate 的 CAA 页面](https://sslmate.com/caa/support)， 如果其中包含您使用的服务商，就可以使用 [SSLMate 的 CAA 记录生成器](https://sslmate.com/caa/)生成一系列 CAA 记录，允许指定 CA 为您的域名颁发证书。

## 放置 CAA 记录的位置

CAA 记录一般应在您注册的域名层级（如 example.org 或 mysite.co.uk）上设置， 这样对该域名和所有子域名（如 community.example.org）都能生效。

需要注意的是，CA 只会遵循*最接近*待签发证书的域名的 CAA 记录。 也就是说，如果您为 www.community.example.org 域名申请证书，CA 会依次查询 www.community.example.org、community.example.org、example.org，直至找到 CAA 记录为止。

这也意味着您可以为子域名单独设置不同的 CAA。 例如，假设 example.org 网站由您自己架设，但 api.example.org 由云服务提供， 您就可以先在 example.org 上设置 CAA 记录，只允许 Let's Encrypt 为该域名及其所有子域名颁发证书；再在 api.example.org 上设置 CAA 记录，允许云服务厂商为该域名单独颁发证书。

还要注意的是，CAA 查询与其他 DNS 查询一样会遵循 CNAME 记录。 假设 community.example.org 的 CNAME 指向 example.forum.com，CA 就会完全遵循 example.forum.com 的所有 CAA 记录。 域名设置 CNAME 后就不能再有其他任何记录，所以原域名与 CNAME 域名之间不会产生 CAA 的冲突。

## 记录中应该包含什么

CAA 记录都应当遵循同样的基本格式：

```
CAA <flags> <tag> <value>
```

其中 **flags** 就是一个整数，并且通常都是 `0`，表示没有设置任何标志位。 如果您愿意的话，也可以将 flags 设为 `128`，对应“关键位”，表示 CA 如果不理解 tag 字段的内容就必须立即拒绝颁发证书。

而 **tag** 则是一段字符串，表示该 CAA 记录的类型，内容通常是 `issue` 或 `issuewild`。 下文再详细介绍。

最后的 **value** 也是一段字符串，其中最多可以有一个 CA 的标识名（如 letsencrypt.org），以及若干由分号分隔的参数，如下文所述。

### `issue` 和 `issuewild`

将 tag 设为 `issue` 即可控制哪些 CA 能为此域名及其子域名颁发证书。 这种记录对普通证书（如 example.org）和通配符证书（如 *.example.org）都有效，因此足以满足大部分需求。 只要将标识 CA 的域名置于 CAA 记录的 value 字段中就能允许该 CA 颁发证书。

带有 `issuewild` tag 的记录则用于控制哪些 CA 能颁发*通配符*证书（如 *.example.org）。 只有在需要为通配符和非通配符证书设置不同的权限时才需要使用 `issuewild` 记录。

注意，多项记录可以具有相同的 tag，其效果将会*累加*，只要任意一项记录允许该 CA 颁发证书即可。

Let's Encrypt 在 CAA 中的标识名为 `letsencrypt.org`， 这一名称已正式载入我们的[证书颁发制度暨运作声明第 4.2.1 节](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions)。

### `validationmethods` 参数

此参数可以置于标识 CA 的域名后，用以控制 CA 可采取的域名控制权验证措施。 您可以借此要求 CA 使用您认为更可靠的验证方式。 例如，您可以在 CAA 记录的 value 字段末尾加上 `;validationmethods=tls-alpn-01`，强制 CA 通过 TLS-ALPN-01 的方式完成验证。

Let's Encrypt 接受以下验证方式：

* `http-01`
* `dns-01`
* `tls-alpn-01`

### `accounturi` 参数

此参数可以置于标识 CA 的域名后，用以控制哪些 ACME 账户能申请为该域名颁发证书。 这可以确保即使有人暂时劫持了您的域名，没有您的 ACME 账户密钥也无法恶意申请证书。

Let's Encrypt 账户的 `accounturi` 形如 `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`，末尾的数字是您的账户 ID。

### 示例

允许 Let's Encrypt 为 example.org 颁发证书的 CAA 记录可以简单设置如下：

```
example.org         CAA 0 issue "letsencrypt.org"
```

更为复杂的 CAA 记录例如：

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

此例中 MyCA 可以为 example.org 颁发证书，但只能使用 DNS-01 验证方式。 该 CA 也可以使用任何验证方式颁发通配符证书。 另外，OtherCA 也能颁发证书，但申请者账户编号必须是 `123456`，且 OtherCA 必须能够识别并正确处理 `accounturi` 参数。


# CAA 错误

Let's Encrypt 颁发证书前都会检查 CAA 记录，但即使是未设置 CAA 的域名有时也会出现 DNS 查询错误， 这种情况下域名可能存在 CAA 记录，但我们无法获取，也就无从得知是否有权为该域名颁发证书。

如果遇到 CAA 相关的错误，可以在我们的[测试环境](/docs/staging-environment)中多试几次，观察错误是否消失。 如果同一错误反复出现，就需要向您的 DNS 提供商或迁移服务提供商寻求帮助。 如果无法确定 DNS 提供商，请向网站托管服务商咨询。

某些不熟悉 CAA 的 DNS 提供商可能会辩称“我们不支持 CAA 记录”， 其实他们不必主动适配 CAA，只需对 CAA 等未知的 DNS 请求类型给予 NOERROR 响应即可。 事实上，对于未知的 QTYPE，其他的响应类型（包括 NOTIMP）都是违背 [RFC 1035](https://tools.ietf.org/html/rfc1035) 标准的，需要予以修复。

## SERVFAIL

SERVFAIL 是最常见的一类错误， 通常由 DNSSEC 验证失败造成。 如果遇到 SERVFAIL 错误，首先应当借助 [dnsviz.net](http://dnsviz.net/) 等 DNSSEC 调试器加以排查。 如果未发现问题，可能是域名服务器只有在响应为空时才会生成错误的数字签名， 而 CAA 响应恰好经常是空的。  PowerDNS 4.0.3 以下版本[就有这一问题](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha)。

如果没有开启 DNSSEC，但还是遇到了 SERVFAIL 错误，另一常见原因便是权威域名服务器的响应为 NOTIMP。正如上文所述，这是违反 RFC 1035 标准的。正确的响应代码应是 NOERROR，且响应内容为空。 如果确实是这一问题，请向 DNS 提供商反馈。

最后，SERVFAIL 也可能是权威域名服务器崩溃导致的。 请检查域名 NS 记录，确认各域名服务器是否正常运转。

## 超时

CAA 查询也有可能超时， 意即多次查询后权威服务器仍未作出任何响应。 其原因往往是域名服务器的防火墙配置不当，将类型未知的 DNS 查询报文一律丢弃。 请咨询 DNS 提供商是否存在此类防火墙。
