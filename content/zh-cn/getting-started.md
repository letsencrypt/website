---
title: 入门指南
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt 通过 [ACME 协议](https://zh.wikipedia.org/zh-cn/%E8%87%AA%E5%8B%95%E6%86%91%E8%AD%89%E6%9B%B4%E6%96%B0%E7%92%B0%E5%A2%83)接口自动签发数字证书。

调用 Let's Encrypt 接口获取证书需要使用一种名为“ACME 客户端”的软件， 而本网站仅提供相关信息，获取证书的过程中没有任何一个环节需要在网页上操作。

使用 Let's Encrypt 前首先要考虑的问题是：网站托管服务商能否代为获取并管理证书？还是需要您自行部署 ACME 客户端？

# 通过托管服务商获取证书

不少网站托管服务商都能替用户完成 Let's Encrypt 证书的获取与管理， 这种情况下 ACME 客户端由托管服务商运作，您不必关心如何获取及使用该软件。

如果您的服务商支持代为获取并管理证书，该功能可能会自动开启，也可能需要您手动配置。 请查阅服务商的文档和配置选项。

# 自行挑选并运行 ACME 客户端

如果托管服务商不能为您获取并管理证书，但您能够在服务器上以足够的权限执行命令，那么您可以自行选取一款 ACME 客户端在服务器上运行，从而通过 Let's Encrypt 获取证书。

对于大多数用户，我们推荐使用的 ACME 客户端是 [Certbot](https://certbot.eff.org/)， 其网站提供了优质的文档和操作说明。

如果 Certbot 由于某些原因无法满足您的需求，还有[很多 ACME 客户端](/docs/client-options/)可以选择。

如果您的客户端需要配置 Let's Encrypt 的 ACME 接口地址，请填写：

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

正式使用前建议先通过我们的[测试环境接口](/docs/staging-environment/)进行测试。

# 获取帮助

如果您想询问如何选择 ACME 客户端、如何使用某一款客户端等任何与 Let's Encrypt 相关的问题，请前往我们的[社群论坛](https://community.letsencrypt.org/)。

我们的网站上也有[详尽的文档](/docs/)供您参考。
