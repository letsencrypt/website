---
title: 速率限制
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2020-02-24
---

{{< lastmod >}}

Let's Encrypt 对证书颁发进行速率限制以确保尽可能多的人能合理使用我们的服务。我们相信这些速率限制在大多数情况下足以满足用户的需求。同时续期证书几乎不受速率限制的影响，所以大型组织可以逐步增加他们可以发布的证书数量，而无需Let's Encrypt的干预。

如果您正在积极开发或测试 Let's Encrypt 的客户端，请使用我们的[测试环境](/docs/staging-environment)而不是生产环境的 API。如果您正在将 Let's Encrypt 作为提供商或大型网站进行整合，请[查看我们的集成指南](/docs/integration-guide)。

我们主要限制的是<a id="certificates-per-registered-domain"></a>**每个注册域名的证书数量**（每周 50 张）。一般而言，注册域名是您从域名注册商处购买的那一部分域名。例如，在域名 `www.example.com` 中，注册域名为 `example.com`；在 `new.blog.example.co.uk` 中，注册域名为 `example.co.uk`。我们使用[公共后缀列表](https://publicsuffix.org)来确定注册域名。

如果您有许多子域名，您可能希望将它们合并为一张证书。您最多可以<a id="names-per-certificate"></a>**在一张证书中包含 100 个域名**。结合上述限制，这意味着您每周最多可以获得 5000 个不同子域名的证书。包含多个域名的证书通常称为 SAN 证书，有时也称为 UCC 证书。注意：出于性能和可靠性的原因，每张证书最好包含尽可能少的域名。

续期证书遵守特殊规则：它们不计入您的**每个注册域名的证书数量**的限制，但它们受到每周最多 5 张**重复证书**的限制。请注意：在 2019 年 3 月前，续期证书曾计入您的**每个注册域名的证书数量**的限制，[但现在我们不再这么做了](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189)。

如果一张证书包含的域名与以前某张证书的完全相同（不论大小写及域名顺序），那么它会被视为对之前证书的续期证书（或重复证书）。例如，如果您申请了仅包含 [`www.example.com`，`example.com`] 的证书，那么您在之后的一周内最多可以再申请 4 张仅包含 [`www.example.com`，`example.com`] 的证书。如果您在域名列表中添加了 [`blog.example.com`]，那么您就不会受到重复证书的限制，可以申请更多证书。

对续期证书的处理不考虑使用的公钥和请求的扩展。即使您使用新密钥，颁发包含完全一样域名的证书也将被视为续期。

**吊销证书不会重置速率限制**，因为您已经消耗了用于颁发这些证书的资源。

每个账户每小时每域名有最多<a id="failed-validations"></a>**验证失败** 5 次的限制。该限制次数在我们的[测试环境](/docs/staging-environment)中更高，因此您可以使用该环境来调试连接问题。

V1 API的"new-reg"、"new-authz"和"new-cert"端点和V2 API的"new-nonce"、"new-account"、"new-order"和"revoke-cert"端点的<a id="overall-requests"></a>**总请求数**限制为每秒 20 次。"/directory"端点和"/acme"目录及其子目录的总请求数限制为每秒 40 次。

此外还有两个你不太可能遇到的限制。

<a id="accounts-per-ip-address"></a>**每个 IP 地址每 3 小时最多可以创建 10 个账户**。**每个 IPv6 /48 地址段**每 3 小时最多可以创建 500 个账户。达到这两个账户限制是十分罕见的，我们建议我们建议大型集成商[使用一个帐户为多个客户提供服务](/docs/integration-guide)。

您的帐户最多可以有 300 个<a id="pending-authorizations"></a>**待验证授权**。达到此速率限制很少见，并且通常在开发 ACME 客户端时发生。到达此限制通常意味着您的客户正在创建授权但没有验证授权。如果您正在开发 ACME 客户端，请使用我们的[测试环境](/docs/staging-environment)。

对于 ACME v2 API 的用户，每 3 小时最多可为每个帐户创建 300 个<a id="new-orders"></a>**新订单**。 每次您从Boulder CA请求证书时，都会创建一个新订单，这意味着每个证书请求中都会产生一个新订单。

# <a id="overrides"></a>覆盖限制

如果您达到了速率限制，我们无法暂时重置它。您需要等到一周后速率限制结束才可再次颁发证书。我们使用滑动窗口来计算限制，因此如果您在星期一发出 25 张证书，在星期五发出 25 张证书，您将能够从星期一开始再次颁发证书。您可以通过[搜索 crt.sh](https://crt.sh) 获取您的注册域名的证书列表，该列表使用公共的[证书透明度](https://www.certificate-transparency.org)日志。

如果您是需要集成 Let's Encrypt 的大型托管服务提供商或组织，您可以使用[速率限制表单](https://goo.gl/forms/plqRgFVnZbdGhE9n1)请求更高的速率限制。处理请求需要几周时间，因此如果您只是想要在限制自行重置前更快地进行重置，请不要使用该表单。

请注意，大多数托管服务提供商不需要增加速率限制，因为我们没有限制您为不同注册域名颁发证书的数量。只要您的大多数客户在注册域名下的子域名数量没有超过 2000 个，您很可能不需要申请速率提高。有关更多建议，请参考我们的[集成指南](/docs/integration-guide)。

# <a id="clearing-pending"></a>清除待验证的授权

如果您有大量待处理的授权对象并且受到了速率限制，您可以通过向其中一个验证请求提交 JWS 签名的 POST 请求来触发对这些授权对象的验证尝试（如 [ACME 规范](https://tools.ietf.org/html/rfc8555#section-7.5.1)中所述）。待处理的授权对象由 `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ` 格式的 URL 表示，并应显示在客户端日志中。请注意，验证成功还是失败并不重要，因为无论结果如何授权对象均会转出“待验证”状态。如果您没有包含相关授权 URL 的日志，则需要等待速率限制结束。如上所述，速率限制基于滑动窗口，因此根据您颁发方式的不同，需要的时间可能不到一周。

请注意，拥有大量待验证授权通常是客户端代码有误的结果。如果您经常遇到此速率限制，则应仔细检查您的客户端代码。
