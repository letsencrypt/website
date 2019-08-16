---
title: 速率限制（颁发限制）
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-06-04
---

{{< lastmod >}}

Let's Encrypt使用颁发限制以确保尽可能多的人能合理使用我们的服务。我们相信这些颁发限制在大多数情况下足以满足用户的需求。我们还让续期证书不受到颁发限制的影响，所以大型组织可以逐步增加他们可以发布的证书数量，而无需Let's Encrypt的干预。

如果您正在积极开发或测试XXX客户端，请使用我们的[测试环境]({{< ref "/docs/staging-environment.md" >}})而不是生产API。如果您正在将Let's Encrypt作为提供商或大型网站进行整合，请[查看我们的集成指南]({{< ref "/docs/integration-guide.md" >}})。

我们的主要限制是<a name="certificates-per-registered-domain"></a>**每个注册域名证书**（每周50个）。 一般而言，注册域名是您从域名注册商处购买的域名的一部分。 例如，在名称`www.example.com`中，注册域名为`example.com`。 在`new.blog.example.co.uk`中，注册域名为`example.co.uk`。 我们使用[公共后缀列表](https://publicsuffix.org)来计算注册域名。

如果您有许多子域，您可能希望将它们合并为一个证书，最多可以限制为每张证书100个域名<a name="names-per-certificate"></a>**证书名称限制**。结合上述限制，这意味着您可以每周颁发包含最多5,000个唯一子域的证书。具有多个名称的证书通常称为SAN证书，有时也称为UCC证书。 注意：出于性能和可靠性的原因，每个证书最好包括最少可能的域名。

续费证书遵守特殊规则： 它们不计入您的**每个注册域名证书数量**限制，但它们受到每周5张的**重复证书数量**限制。请注意： 续费证书在2019年3月前曾经计入您的**每个注册域名证书数量**限制，[但现在已获得豁免](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

如果一张证书包括（并只包括）了所有以前某张证书的域名（host），不论大小写及域名顺序，则会被视为早期证书的续费证书（或重复证书）。例如，如果您申请了包括[`www.example.com`，`example.com`]的证书，您可以在申请该证书后一周内再申请四张[`www.example.com`，`example.com`]证书。如果您通过添加[`blog.example.com`]更改了证书包括域名（host），则可以申请其他证书（不是上述证书的复制证书）。

续费证书处理忽略所请求的公钥和扩展。 即使您使用新密钥，颁发包含完全一样域名(hostname)的证书也可视为续订。

**吊销证书不会重置速率限制**，因为用于颁发这些证书的资源已被使用。

每个账户每小时每域名（host）有5次<a name="failed-validations"></a>**验证失败**限制。该限制在我们的[测试环境]({{< ref "/docs/staging-environment.md" >}})中更高，因此您可以使用该环境来调试连接问题。

"new-reg"，"new-authz"和"new-cert"端点的<a name="overall-requests"></a>**总体请求**限制为每秒20次。 "/directory" 端点和"/acme"目录及子目录的总体请求限制为每秒40个请求。

我们还有两个你不太可能遇到的限制。

<a name="accounts-per-ip-address"></a>**每个IP地址每三小时可以最高创建10个账户**。**每个IPV6 /48 IP段**每3小时可以创建最高500个账户。达到这两个账户限制是十分罕见的，我们建议我们建议大型服务提供商[为许多客户使用一个帐户]({{< ref "/docs/integration-guide.md" >}})。

您的帐户最多可以有300个<a name="pending-authorizations"></a>**待批准授权**。 达到此速率限制很少见，并且在开发ACME客户端时最常发生。 这通常意味着您的客户正在创建授权而不是验证授权。 如果您正在开发ACME客户端，请使用我们的[测试环境]({{< ref "/docs/staging-environment.md" >}})。

对于ACME v2 API的用户，每3小时最多可为每个帐户创建300个<a name="new-orders"></a>**新订单**。

# <a name="overrides"></a>覆盖限制

如果您达到了速率限制，我们无法暂时重置它。 您需要等到一周后费率限制到期才可再次颁发证书。 我们使用滑动窗口，因此如果您在星期一发出25个证书，在星期五发出25个证书，您将能够从星期一开始再次颁发。您可以通过[搜索crt.sh](https://crt.sh)获取已注册域名的证书列表，该列表使用公共[证书透明度](https://www.certificate-transparency.org)日志。

如果您是需要集成Let's Encrypt的大型托管服务提供商或组织，我们有[速率限制表单](https://goo.gl/forms/plqRgFVnZbdGhE9n1)可用于请求更高的速率限制。处理请求需要几周时间，因此如果您只需要比自行重置速度更快地重置速率限制，请不要使用该表单。

请注意，大多数托管服务提供商不需要增加速率限制，因为我们没有限制您可以颁发证书的不同注册域的数量。 只要您的大多数客户在注册域名中没有超过2000个子域名，您很可能不需要申请速率提高。有关更多建议，请参考我们的[集成指南]({{< ref "/docs/integration-guide.md" >}})。

# <a name="clearing-pending"></a>清除待批准的授权

如果您有大量待处理的授权对象并且得到速率限制错误，则可以通过向其中一个挑战提交JWS签名的POST来触发对这些授权对象的验证尝试，如[ACME规范](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#responding-to-challenges)中所述。
待处理的授权对象由https://acme-v01.api.letsencrypt.org/acme/authz/XYZ格式的URL表示，并应显示在客户端日志中。 请注意，验证是成功还是失败并不重要，因为均会将授权从“待处理”状态取消。 如果您没有包含相关授权URL的日志，则需要等待速率限制结束。如上所述，速率限制为滑动窗口，因此根据您的颁发模式，这可能需要不到一周的时间。
请注意，拥有大量待处理授权通常是客户端代码有误的结果。 如果您经常达到此速率限制，则应仔细检查您的客户端代码。
