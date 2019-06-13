---
title: 速率限制
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2018-08-01
---

{{< lastmod >}}

Let's Encrypt 提供速率限制,以确保尽可能多的人合理使用。我们认为速率限制的默认值够高，可以满足大多数人使用。我们设计这个功能确保更新证书几乎不会达到限制的速率，因此大型组织可以不依赖于Let's Encrypt来逐步增加颁发证书的数量。

如果你正在开发或者测试Let's Encrypt客户端, 请使用[测试环境](/docs/staging-environment/)而不是生产环境API。
如果您正在将Let's Encrypt作为提供商或大型网站进行集成，请查看我们的[集成指南](/docs/integration-guide)。

主要限制是**每个注册域名证书**（每周50个）。 一般而言，注册域名是您从域名注册商处购买的域名的一部分。例如，`www.example.com`的注册域名是`example.com`。`new.blog.example.co.uk`的注册域名是`example.co.uk`。我们使用[Public Suffix List](https://publicsuffix.org)来计算注册域名。

如果你有很多子域名，你也许会想把他们合并为一个整数,**每个证书最多可以包含100个域名**。综上所述，这意味着您可以每周颁发包含最多5,000个唯一子域的证书。具有多个名称的证书通常称为SAN证书，有时也称为UCC证书。
我们每周还有5份重复证书的限制。如果证书包含完全相同的主机名集合，忽略大写和主机名的排序，则该证书被视为早期证书的副本。例如，你申请了一个名称像[`www.example.com`, `example.com`]的证书,你还可以本周再申请4个这样的证书。如果你把名称变为[`blog.example.com`]，你可以申请其他的证书。

为确保你可以在需要时随时续订证书，我们对每个注册域名的证书进行**Renewal Exemption**。即使您已达到本周的限制，你仍然可以颁发新的证书来续订域名。如果发布请求包含与先前颁发的证书完全相同的主机名，则该发布请求将视为为续订。这与上述重复证书限制使用的定义相同，续订仍受重复证书的规则限制。

重复证书限制和**the Renewal Exemption**忽略请求的公钥和扩展。即使您使用新密钥，证书颁发也可视为续订。

续订规则意味着你能逐步的增加你的子域名的数量。只要不干续订证书，你甚至可以一周颁发50份证书。

撤销证书不会重置频率限制，因为颁发证书的资源已经被使用了。

每个账号下一个域名每小时能有5次失败校验的机会。你可以在我们的临时环境(<a href="/docs/staging-environment/">staging environment</a>)做debug测试。
"new-reg", "new-authz" 和 "new-cert"这些终点(endpoints)有一个限制(<a
name="overall-requests"></a>**Overall
Requests**)，每秒20次。"/directory"和"/acme" 目录和字目录有每秒40次的限制。

我们还有两个你不太可能遇到的限制。

每个IP账号限制(<a name="accounts-per-ip-address"></a>**Accounts per IP Address** )----每个三个小时一个IP最多创建10个账号。在IPv6/48下每三个小时最多可以创建500个**Accounts per IP Range**。达到帐户费率限制是非常罕见的，我们建议大型集成商更喜欢设计[using one account for many customers](/docs/integration-guide)

在你的账号是你最多可以有300个<a name="pending-authorizations"></a>**Pending Authorizations**。很少有达到这个限制的情况，一般主要出现在ACME。这以为这你的客户端一般不会触发这些限制。请使用我们的临时环境[staging environment](/docs/staging-environment/) 来做ACME客户端的开发。

在v2版本的ACMEAPI中，你可以每三个小时创建300个新的订单（<a
name="new-orders"></a>**New Orders**）。


# <a name="overrides"></a>概述

如果你重发了频率限制，我们暂时没有办法重置它。你需要等到下周才可以。我们使用滑动窗口模式，如果你周一发布25个证书然后周五发布超过25个证书，你可以在下周一的时候再发布一次。你可以去[searching on crt.sh](https://crt.sh)查看你注册的域名列表。这里使用了[Certificate Transparency](https://www.certificate-transparency.org)日志。

如果你是一个大的hosting provider或者一个在Let's Encrypt上面运行的组织，我们为你准备了[rate limiting form](https://goo.gl/forms/plqRgFVnZbdGhE9n1)能够有更高的频率限制。这个会话几周的时间,所以这个表单不适合快速重置频率限制的场景。

请注意，大多数托管服务提供商不需要增加速率限制，因为你可以发布的不同注册域的数量没有限制。

只要您的大多数客户在注册域中没有超过2,000个子域，您很可能不需要增加。
See our [Integration Guide](/docs/integration-guide/) for more advice.


# <a name="clearing-pending"></a>清理挂起的授权
如果您有大量待处理的授权对象并且正在获得速率限制错误，则可以通过向其中一个挑战提交JWS签名的POST来触发对这些授权对象的验证尝试，如ACME规范中所述[ACME spec](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#responding-to-challenges)。请注意，验证是成功还是失败并不重要。

挂起的授权对象由https://acme-v01.api.letsencrypt.org/acme/authz/XYZ格式的URL表示，并应显示在客户端日志中。要么将授权从“待定”状态中取出。 如果你没有包含相关授权URL的日志，则需要等待速率限制到期。 如上所述，有一个滑动窗口，因此根据你的发行模式，这可能需要不到一周的时间。

请注意，拥有大量待处理授权通常是错误客户端的结果。 如果你经常达到此速率限制，则应仔细检查你的客户端代码。
