---
title: 速率限制
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2021-07-12
show_lastmod: 1
---


为保证尽可能多的人可以公平使用服务，Let's Encrypt 提供了速率限制措施。 我们相信这些速率限制已经高到足以让大多数人在默认情况下使用 。 Let's Encrypt 对证书颁发进行速率限制以确保尽可能多的人能合理使用我们的服务。我们相信这些速率限制在大多数情况下足以满足用户的需求。同时续期证书几乎不受速率限制的影响，所以大型组织可以逐步增加他们可以发布的证书数量，而无需Let's Encrypt的干预。

如果你正活跃于开发或测试一款 Let's Encrypt 客户端，请使用我们的[测试环境](/docs/staging-environment)而不是生产环境 API. 如果您正在将 Let's Encrypt 作为提供商或与大型网站进行整合，请[查看我们的集成指南](/docs/integration-guide)。

我们的主要限制为<a id="certificates-per-registered-domain"></a>**每个注册域名可签发证书数量**（每周50张）。 一般而言，注册域名是您从域名注册商处购买的那一部分域名。 例如，在 `www.example.com` 中，注册域名为 `example.com`. 在 `new.blog.example.co.uk` 中，注册域名为 `example.co.uk`. 我们将使用[公共后缀列表](https://publicsuffix.org)来计算注册域名。 超出每个注册域名可签发证书数量限制的请求，将会得到 `too many certificates already issued` 的报错信息，同时可能提其他信息。

如果你拥有很多子域名，你可能会希望将它们整合到一张证书中，限制为<a id="names-per-certificate"></a>**每份证书最多100个域名**。 联系到上文中的限制，这意味着你每周可以为5000个不同的子域名申请签发证书。 含有多个域名的证书常被称为主题备用名称 (SAN) 证书，有时或被称作统一通讯证书 (UCC). 注意：出于性能和可靠性角度的考虑，建议在每张证书中包含尽可能少的域名。

证书续期遵守特殊规则：它们不计入您的**每个注册域名的证书数量**的限制，但它们受到每周**最多 5 张重复证书**的限制。 请注意：在 2019 年 3 月前，续期证书曾计入您的每个注册域名的证书数量的限制，[但现在我们不再这么做了](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189) 一旦超过重复证书数量的限制，将会以错误消息 `too many certificates already issued for exact set of domains` 报告。

忽略大小写和顺序，当一张证书与既有证书包含了完全一样的域名列表时，它会被视为既有证书的续签（或副本）。  例如，如果你已经为 [`www.example.com`, `example.com`] 申请签发了证书，那么本周你将可以为 [`www.example.com`, `example.com`] 申请签发更多证书。 如果你添加 [`blog.example.com`] 到证书中去，改变了域名列表，这将会被计入额外的证书签发中。

续签处理将会忽略公钥和所请求的 X.509 扩展。 即使你使用了新的公钥，一次证书签发申请也依然可以被视作续签。

**请求吊销证书不会重设速率限制**，因为申请证书所使用的资源已经被消耗了。

我们也有<a id="failed-validations"></a>**验证失败**限制，为每账号、每主机名、每小时5次。 这个限制在我们的[测试环境](/docs/staging-environment)中更高，因此你可以使用它来调试连接性问题。 超出验证失败限制将会得到 `too many failed authorizations recently` 的报错信息。

API 的"new-nonce"、"new-account"、"new-order"和"revoke-cert"接口<a id="overall-requests"></a>**总请求数**限制为每秒 20 次。 "/directory"目录和"/acme"目录及其子目录的总请求数限制为每秒 40 次。

此外还有两个你不太可能遇到的限制。

<a id="accounts-per-ip-address"></a>**每个 IP 地址在 3 小时之内最多可以创建 10 个账户**。 **每个 IPv6 /48 地址段**每 3 小时最多可以创建 500 个账户。 达到这两个速率限制是不常见的，我们建议大型集成商[使用一个帐户为多个客户提供服务](/docs/integration-guide)。 超过这些限制的请求，将会响应错误消息 `too many registrations for this IP` 或者 `too many registrations for this IP range`。

您的帐户上最多可以有 300 个<a id="pending-authorizations"></a>**待验证授权**。 达到此速率限制很少见，并且通常在开发 ACME 客户端时发生。 到达此限制通常意味着您的客户端正在创建授权但没有验证它们。 如果您正在开发 ACME 客户端，请使用我们的[测试环境](/docs/staging-environment)。 超出待验证授权数量限制的请求，将会得到 `too many currently pending authorizations`的报错信息。

您在3小时之内最多可以创建300个 <a
id="new-orders"></a>**新订单**。 每次您从 Boulder CA 请求证书时，都会创建一个新订单，这意味着每个证书请求中都会产生一个新订单。 超出新订单数量限制的请求，将会得到 `too many currently pending authorizations`的报错信息。

# <a id="overrides"></a>覆盖限制

如果您达到了速率限制，我们没有办法帮助您暂时重置它。 您需要等待一周，直到这些速率限制过期。 我们使用了滑动窗口的方式，因此如果你在周一申请签发了25张证书，并且在周五又申请签发了25张证书，那么下周一起你将可以再次申请签发证书。 你可以在利用公开[证书透明度](https://www.certificate-transparency.org)记录的 [ crt.sh ](https://crt.sh) 网站上搜索获取你已经申请签发的证书列表。

如果您是需要集成 Let's Encrypt 的大型托管服务提供商或组织，您可以使用[速率限制表单](https://goo.gl/forms/plqRgFVnZbdGhE9n1)请求更高的速率限制。 处理请求需要几周时间。因此，如果您只是不想等待一周，想要提前进行速率限制重置，请不要使用该表单。

请注意，大多数托管服务提供商不需要增加速率限制，因为我们没有限制您为不同注册域名颁发证书的数量。 只要您的大多数客户在注册域名下的子域名数量没有超过 2000 个，您很可能不需要申请提高速率限制。 有关更多建议，请参考我们的[集成指南](/docs/integration-guide)。

# <a id="clearing-pending"></a>清除待验证的授权

如果您有大量待处理的授权对象并且受到了速率限制，您可以通过向其中一个验证请求提交 JWS 签名的 POST 请求来触发对这些授权对象的验证尝试（如[ACME 规范](https://tools.ietf.org/html/rfc8555#section-7.5.1)中所述）。 待处理的授权对象由`https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`格式的 URL 表示，并应显示在客户端日志中。 请注意，验证成功还是失败并不重要， 因为无论结果如何待授权对象均会转出“待验证”状态。 如果您没有包含相关授权 URL 的日志，则需要等待速率限制结束。 如上所述，速率限制基于滑动窗口，因此根据您颁发方式的不同，需要的时间可能不到一周。

请注意，拥有大量待验证授权通常是客户端代码有误的结果。 如果您经常遇到此速率限制，则应仔细检查您的客户端代码。
