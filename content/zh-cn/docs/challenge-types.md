---
title: 挑战类型
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

当你从Let’s Encrypt获取一个证书，我们的服务器验证您使用ACME标准定义的“挑战”来控制该证书中的域名。
大多数情况下，此验证由ACME客户端自动处理，但如果您需要做出一些更复杂的配置决策，那么了解更多有关它们的信息会很有用。 
如果您不确定，请使用您客户的默认设置或HTTP-01。

# HTTP-01 挑战

这是现在最常用的挑战类型。Let’s Encrypt为您的ACME客户端提供一个令牌，
您的ACME客户端将一个文件放在您的Web服务器上的 `http：// <YOUR_DOMAIN> /.well-known/acme-challenge/ <TOKEN>`。
该文件包含令牌以及帐户密钥的指纹。一旦你的ACME客户端告诉Let’s Encrypt文件准备好了，Let’s Encrypt试图
取回它（从多个有利位置可能多次）。如果我们的验证检查从您的Web服务器获得正确的响应，则认为验证成功，您可以继续颁发证书。
如果验证检查失败，您必须重试来获取新证书将不得不再次使用新证书。重定向到HTTPS URL时，
它不会验证证书（因为此挑战旨在引导有效证书，它可能会遇到自签名或过期的证书）。

HTTP-01挑战是能在80端口进行。允许客户端指定任意端口会降低安全性，因此ACME标准不允许这样做。

优点：

 - 没有关于域配置的额外知识，它很容易自动化。
 - 它允许托管服务提供商向域CNAMEd颁发证书。It allows hosting providers to issue certificates for domains CNAMEd to them.
 - 它适用于现成的Web服务器。

缺点:

 - 如果你的网络供应商关闭了80端口，它将不工作。(这很少，但是一些住宅供应商确实这么做).
 - Let’s Encrypt不会让你使用这个挑战来发布通配符证书。
 - 如果你有多个网络服务器，你必须确保每个服务器上的这个文件可以访问。

# DNS-01 挑战

此挑战要求您通过在该域名下的TXT记录中放置特定值来证明您控制域名的DNS。这个配置比HTTP-01更难，
但可以在HTTP-01不能的情况下工作。它允许你发布通配符证书。在Let's Encrypt为您的ACME客户端提供令牌后，
您的客户端将创建从该令牌和您的帐户密钥派生的TXT记录，并将该记录放在`_acme-challenge。<YOUR_DOMAIN>`中。
然后让我们的加密将查询DNS系统中的该记录。 如果找到匹配项，您可以继续颁发证书！

由于发布和续订的自动化非常重要，因此如果您的DNS提供商拥有可用于自动更新的API，则仅使用DNS-01挑战才有意义。
我们的社区开始了[此处列出此类DNS供应商][dns-api-providers] 。您的DNS提供商可能与您的注册商（您购买域名的公司）相同，
或者可能不同。如果您想更改DNS提供商，只需在注册商处进行一些小的更改即可。您无需等待域名即将到期时再做这事。

注意将完整的DNS API凭据放在Web服务器上会显着增加该Web服务器被黑客攻击的影响。最好的方法是使用
[更窄范围的API凭据][securing-dns-credentials]，或从单独的服务器执行DNS验证，
并自动将证书复制到您的Web服务器。

由于在查找用于DNS-01验证的TXT记录时，Let’s Encrypt遵循DNS标准，
因此您可以使用CNAME记录或NS记录将应答挑战委派给其他DNS区域。这可以用来[委托`_acme-challenge` 子域名][securing-dns-credentials]
到特定于验证的服务器或区域。如果您的DNS提供程序更新速度很慢，并且您希望委派给更快速更新的服务器，也可以使用它。

大多数DNS提供商都有一个“传播时间”，用于管理从更新DNS记录到在所有服务器上都可用的时间。
相比Let’s Encrypt，这可能很难衡量，因为它们通常也使用[anycast]，这意味着多个服务器可以拥有相同的IP地址，并且根据您在世界上的位置，
您可能会与不同的服务器通信（并获得不同的答案）。最好的DNS API为您提供了一种自动检查和更新是否完全传播的方法。
如果您的DNS提供商没有这个，您只需要将客户端配置为等待足够长的时间（通常多达一个小时），以确保在触发验证之前传播更新。

您可以为同一名称提供多个TXT记录。 例如，如果您同时验证通配符和非通配符证书的质询，则可能会发生这种情况。
但是，您应该确保清理旧的TXT记录，因为如果响应内容太大，Let's Encrypt将开始拒绝它。

优点:

 - 您可以使用此挑战来颁发包含通配符域名的证书。
 - 即使您有多个Web服务器，它也能正常运行。

缺点:

 - 在Web服务器上保存API凭据存在风险。
 - 你的DNS提供商可能不提供API。
 - 您的DNS API可能无法提供有关传播时间的信息。

# TLS-SNI-01

ACME的草案版本中定义了这一挑战。它在端口443上进行了TLS握手，并发送了一个特定的[SNI]标头，
用来查找包含该标记的证书。 它[将于2019年3月禁用] [tls-sni-disablement]因为它不够安全。

# TLS-ALPN-01

这一挑战是在TLS-SNI-01被弃用之后制定的，并且正在作为[单独的标准][tls-alpn]开发。
跟TLS-SNI-01一样，它通过端口443上的TLS执行。但是，它使用自定义ALPN协议来确保只有知道此挑战类型的服务器才会响应验证请求。
这还允许对此挑战类型的验证请求使用与要验证的域名匹配的SNI字段，从而使其更安全。

这一挑战并不适合大多数人。 它最适合希望执行基于主机的验证（如HTTP-01）的TLS终止反向代理的作者，
但希望完全在TLS层完成，以便分离关注点。现在这主要意味着大型托管服务提供商，但像Apache和Nginx这样的主流网络服务器有朝一日可以实现这一点
（[Caddy已经做到] [caddy-tls-alpn]）

优点:

 - 如果端口80不可用，它可以工作。
 - 它可以纯粹在TLS层执行。

缺点:

 - Apache，Nginx或Certbot不支持它，可能短期内不支持。
 - 像HTTP-01一样，如果您有多台服务器，则需要使用相同的内容回答所有服务器。

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
