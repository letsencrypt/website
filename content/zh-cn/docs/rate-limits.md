---
title: 速率限制
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2021-10-05
show_lastmod: 1
---


为保证尽可能多的人可以公平使用我们的服务，Let's Encrypt 采取了速率限制措施。 我们相信这一限制足以满足大多数人的正常需求。 此外，我们的设计使得证书续期几乎不可能触发速率限制，大型机构也可以逐步增加证书数量，无需 Let's Encrypt 干预。

如果您正在积极开发或测试一款 Let's Encrypt 客户端，请使用我们的[测试环境](/docs/staging-environment)，不要使用生产环境 API。 如果您正在将 Let's Encrypt 作为提供商或与大型网站进行整合，请[查看我们的集成指南](/docs/integration-guide)。

我们最主要的限制是<a id="certificates-per-registered-domain"></a>**每个注册域名可签发的证书数量**（每周 50 份）。 一般而言，注册域名是您从域名注册商处购买的那一部分域名。 例如，`www.example.com` 对应的注册域名为 `example.com`， 而 `new.blog.example.co.uk` 对应的注册域名为 `example.co.uk`。 我们会借助[公共后缀列表](https://publicsuffix.org)确定注册域名。 如果超出每个注册域名可签发证书数量的限制，就会得到 `too many certificates already issued` 的报错信息，同时可能附有详细的错误说明。

每个账户三小时内最多可创建 300 份<a
id="new-orders"></a>**订单**。 每次向 Boulder CA 申请证书都会创建一份新订单，也就是说每次证书请求都会生成一份新订单。 如果超出订单数量限制，就会得到 `too many new orders recently` 的报错信息。

您可以在一份证书中置入多个域名，<a id="names-per-certificate"></a>**每份证书的域名数量**最多为 100 个。 出于性能和可靠性角度的考虑，建议您在每张证书中包含尽可能少的域名。  含有多个域名的证书常称为 SAN 证书或 UCC 证书。

续期证书遵守特殊规则：它们不计入您的**每个注册域名的证书数量**的限制，但它们受到每周最多 5 张[**重复证书**](/docs/duplicate-certificate-limit) 的限制。 一旦超过重复证书数量的限制，将会得到`too many certificates already issued for exact set of domains` 的报错信息。

忽略大小写和顺序，当一张证书与既有证书包含了完全一样的域名列表时，它会被视为既有证书的续签（或副本）。  例如，如果您已经为[`www.example.com`, `example.com`]申请签发一张证书，那么本周您将可以再为 [`www.example.com`, `example.com`] 申请签发四张证书。 如果您添加 [`blog.example.com`] 改变了域名列表，您就可以申请额外的证书。

续签处理将会忽略公钥和需求的 X509 扩展。 即使您使用了新的公钥，一次证书签发申请也依然可以被视作续签。

**请求吊销证书不会重设速率限制**，因为申请证书所使用的资源已经被消耗了。

There is a!!crwdBlockTags_34_sgaTkcolBdwrc!![**Failed Validation**](/docs/failed-validation-limit) limit of 5 failures per account, per hostname, per hour. 这个限制在我们的[测试环境](/docs/staging-environment)中更高，因此您可以使用它来调试连接性问题。 超出验证失败限制将会得到 `too many failed authorizations recently` 的报错信息。

API 的"new-nonce"、"new-account"、"new-order"和"revoke-cert"接口<a
id="overall-requests"></a>**总请求数**限制为每秒 20 次。 "/directory"端点和"/acme"目录及其子目录的总请求数限制为每秒 40 次。

此外还有两个您不太可能遇到的限制。

您在3小时之内每个IP地址最多可以创建10个<a id="accounts-per-ip-address"></a>**账户**。 **每个 IPv6 /48 地址段**每 3 小时最多可以创建 500 个账户。 达到这两个账户限制是十分罕见的，我们建议我们建议大型集成商[使用一个帐户为多个客户提供服务](/docs/integration-guide)。 超过这些限制的请求，将会得到 `too many registrations for this IP` 或者 `too many registrations for this IP range`的报错信息。

您的帐户最多可以有 300 个<a id="pending-authorizations"></a>**待验证授权**。 达到此速率限制很少见，并且通常在开发 ACME 客户端时发生。 到达此限制通常意味着您的客户正在创建授权但没有验证授权。 如果您正在开发 ACME 客户端，请使用我们的[测试环境](/docs/staging-environment)。 超出待验证授权数量限制的请求，将会得到 `too many currently pending authorizations`的报错信息。

# <a id="overrides"></a>重置限制

如果您达到了速率限制，我们没有办法帮助您暂时重置它。 您需要等待一周，直到这些速率限制过期。 我们使用了滑动窗口的方式，因此如果你在周一申请签发了25张证书，并且在周五又申请签发了25张证书，那么下周一起你将可以再次申请签发证书。 你可以在利用公开[证书透明度](https://www.certificate-transparency.org)记录的 [ crt.sh ](https://crt.sh) 网站上搜索获取你已经申请签发的证书列表。

如果您是需要集成 Let's Encrypt 的大型托管服务提供商或组织，您可以使用[速率限制表单](https://goo.gl/forms/plqRgFVnZbdGhE9n1)请求更高的速率限制。 处理请求需要几周时间。因此，如果您只是不想等待一周，想要提前进行速率限制重置，请不要使用该表单。

# <a id="clearing-pending"></a>清除待验证的授权

如果您有大量待处理的授权对象并且受到了速率限制，您可以通过向其中一个验证请求提交 JWS 签名的 POST 请求来触发对这些授权对象的验证尝试（如[ACME 规范](https://tools.ietf.org/html/rfc8555#section-7.5.1)中所述）。 待处理的授权对象由`https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`格式的 URL 表示，并应显示在客户端日志中。 请注意，验证成功还是失败并不重要， 因为无论结果如何待授权对象均会转出“待验证”状态。 如果您没有记录包含相关授权 URL 的日志，则需要等待速率限制结束。 如上所述，速率限制基于滑动窗口，因此根据您颁发方式的不同，需要的时间可能不到一周。

请注意，拥有大量待验证授权通常是客户端代码有误的结果。 如果您经常遇到此速率限制，则应仔细检查您的客户端代码。
