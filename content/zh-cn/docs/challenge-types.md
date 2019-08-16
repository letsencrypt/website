---
title: 验证类型
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

当您从Let's Encrypt获得证书时，我们的服务器会验证您是否使用ACME标准定义的“挑战”来控制该证书中的域名。 大多数情况下，此验证由ACME客户端自动处理，但如果您需要做出一些更复杂的配置决策，那么了解更多有关它们的信息会很有用。 如果您不确定，请使用您的客户端默认设置或使用HTTP-01。

# HTTP-01验证（挑战）

这是当今最常见的挑战类型。Let’s Encrypt向您的ACME客户端提供一个令牌，您的ACME客户端将在`http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`放置指定文件。 该文件包含令牌以及帐户密钥的指纹。 一旦您的ACME客户端告诉Let's Encrypt文件已准备就绪，Let's Encrypt会尝试检索它（可能多次从多个地点进行尝试）。如果我们的验证机制在您的服务器上找到了放置于正确地点的正确文件，该验证被视为成功，您可以申请颁发该证书。如果验证检查失败，您将不得不再次使用新证书重新申请。

我们对HTTP-01挑战的使用遵循最多10个重定向深度并只接受重定向到“http:”或“https:”，并且只接受端口80或443。我们不接受重定向到IP地址。重定向到HTTPS链接时，不会验证证书是否有效（因为此挑战旨在申请有效证书，所以它可能会遇到自签名或过期的证书）。

HTTP-01挑战只能开始于80端口。因为允许客户端指定任意端口会降低安全性，所以ACME标准已禁止此行为。

优点：

   - 在没有关于域名配置的额外知识的情况下，可以轻松实现自动化。
   - 它允许托管服务提供商向其发布域CNAMEd的证书。
   - 它适用于现成的网页服务器。

缺点：

   - 如果您的ISP阻止端口80，该验证将失效（这种情况很少见，但一些住宅ISP会阻止该端口）。
   - Let’s Encrypt不允许您使用此挑战来颁发通配符证书。
   - 如果您有多个网页服务器，则必须确保该文件在所有这些服务器上都可用。

# DNS-01验证（挑战）

此挑战要求您在该域名下的TXT记录中放置特定值来证明您控制域名的DNS系统。该配置比HTTP-01略难，但可以在某些HTTP-01不可用的情况下工作。 它还允许您颁发通配符证书。 在Let’s Encrypt为您的ACME客户端提供令牌后，您的客户端将创建从该令牌和您的帐户密钥派生的TXT记录，并将该记录放在`_acme-challenge.<YOUR_DOMAIN>`。 然后Let’s Encrypt将向DNS系统查询该记录。 如果找到匹配项，您可以继续颁发证书！

由于颁发和续期的自动化非常重要，因此如果您的DNS提供商拥有可用于自动更新的API，则使用DNS-01挑战才有意义。我们的社区已经开始[此处提供此类DNS提供商列表][dns-api-providers]。您的DNS提供商可能与您的域名注册商（您从中购买域名的公司）相同，或者可能不同。如果您想更改DNS提供商，只需在注册商处进行一些小的更改即可。您无需等待域名即将到期以更换域名DNS服务商。

请注意，将完整的DNS API凭据放在网络服务器上会显着增加该网络服务器被黑客攻击的影响。最佳做法是使用[限制权限的API凭据][securing-dns-credentials]，或从单独的服务器执行DNS验证并自动将证书复制到网络服务器。

由于Let’s Encrypt在查找用于DNS-01验证的TXT记录时遵循DNS标准，因此您可以使用CNAME记录或NS记录将应答挑战委派给其他DNS区域。这可以用于[将`_acme-challenge`子域][securing-dns-credentials]委派给特定于验证的服务器或区域。如果您的DNS提供程序更新速度很慢，并且您希望委派给更快速更新的服务器，也可以使用该方法。

大多数DNS提供商都有一个“更新时间”，用于管理从更新DNS记录到在所有服务器上都可用的时间。这可能很难衡量，因为它们通常也使用[任播][anycast]，这意味着多个服务器可以拥有相同的IP地址，并且根据您在世界上的位置，您和Let’s Encrypt可能会与不同的服务器通信（并获得不同的答案）。最好的DNS API为您提供了一种自动检查是否完全更新的方法。如果您的DNS提供商没有这个，您只需将客户端配置为等待足够长的时间（通常多达一个小时），以确保在触发验证之前更新已经完全完成。

您可以为同一名称提供多个TXT记录。例如，如果您同时验证通配符和非通配符证书的质询，则可能会发生这种情况。但是，您应该确保清理旧的TXT记录，因为如果响应大小太大，Let's Encrypt将拒绝该记录。

优点：

   - 您可以使用此挑战来颁发包含通配符域名的证书。
   - 即使您有多个Web服务器，它也能正常运行。

缺点：

   - 在Web服务器上保留API凭据存在风险。
   - 您的DNS提供商可能不提供API。
   - 您的DNS API可能无法提供有关更新时间的信息。

# TLS-SNI-01

ACME的草案版本中定义了这一挑战。 它在端口443上进行了TLS握手，并发送了一个特定的[SNI]标头，查找包含该标记的证书。 由于安全性原因，该验证[已于2019年3月禁用][tls-sni-disablement]。

# TLS-ALPN-01

这一挑战是在TLS-SNI-01被弃用后开发的，并且正在开发为[单独的标准][tls-alpn]。 与TLS-SNI-01一样，它通过端口443上的TLS执行。但是，它使用自定义ALPN协议来确保只有知道此挑战类型的服务器才会响应验证请求。 这还允许对此质询类型的验证请求使用与要验证的域名匹配的SNI字段，从而使其更安全。

这一挑战并不适合大多数人。 它最适合希望执行基于主机的验证（如HTTP-01）的TLS反向代理的用户，但希望完全在TLS层完成，以便减缓服务器负担。 现在主要使用者为大型托管服务提供商，但Apache和Nginx等主流网络服务器有朝一日可以实现这一点（[Caddy已经实现该部署][caddy-tls-alpn]）。

优点：

   - 如果80端口不可用，该验证在443端口可以使用。
   - 它可以只在TLS层执行。

缺点：

   - 它不支持Apache，Nginx或Certbot，并且不会很快兼容这些软件。
   - 与HTTP-01一样，如果您有多台服务器，则需要使用相同的内容进行回答。

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
