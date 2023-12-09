---
title: 入门指南
slug: getting-started
top_graphic: 3
date: 2020-02-11
---

为了在您的网站上启用 HTTPS，您需要从证书颁发机构（CA）获取证书（一种文件）。 Let's Encrypt 正是其中一家证书颁发机构。 要从 Let's Encrypt 获取您网站域名的证书，您必须证明您对域名的实际控制权。 这一过程通常由 Web 主机上运行的 [ACME 协议](https://tools.ietf.org/html/rfc8555)客户端完成。

申请证书的最佳方式取决于您是否具备服务器的[命令行访问权限](https://en.wikipedia.org/wiki/Shell_account)（也称为 SSH 权限）。 如果您仅使用控制面板（例如 [cPanel](https://cpanel.net/)、[Plesk](https://www.plesk.com/) 或 [WordPress](https://wordpress.org/)）管理您的网站，您很有可能没有命令行访问权限。 您可以联系您的托管服务提供商确认。

# 拥有命令行访问权限

我们建议大多数具有命令行访问权限的人使用 [Certbot][] ACME 客户端。 它可以在不下线您的服务器的前提下自动执行证书颁发和安装。 对于不需要自动配置的用户，Certbot 还提供专家模式。 它易于使用，适用于许多操作系统，并且具有出色的（注：英文）文档。 前往 [Certbot 官网][Certbot]即可获取针对各类操作系统与服务器软件的使用说明。

如果 [Certbot][] 不能满足您的需求，或者您想尝试别的客户端，还有[更多 ACME 客户端](/docs/client-options)可供选择。  选定 ACME 客户端软件后，请参阅该客户端的文档。

如果您正在尝试不同的 ACME 客户端，请使用我们的[临时环境](/docs/staging-environment)以避免遭到[速率限制](/docs/rate-limits)。

# 没有命令行访问权限

在没有命令行访问权限的情况下，最好的办法是使用您托管服务提供商提供的内置功能。 支持 Let's Encrypt 的服务商能替您自动完成免费证书的申请、安装、续期步骤。 某些服务商可能需要您在控制面板中开启相关选项， 也有一些服务商会自动为所有客户申请并安装证书。

如果您的服务商存在于[我们的服务商列表](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)中， 参照其文档设置 Let's Encrypt 证书即可。

如果您的托管服务提供商不支持 Let's Encrypt，您可以与他们联系请求支持。 我们尽力使添加 Let's Encrypt 支持变得非常容易，提供商（注：非中国国内提供商）通常很乐意听取客户的建议！

如果您的托管服务提供商不想集成 Let's Encrypt，但支持上传自定义证书，您可以在自己的计算机上安装 Certbot 并使用[手动模式（Manual Mode）](https://certbot.eff.org/docs/using.html#manual)。 在手动模式下，您需要将指定文件上传到您的网站以证明您的控制权。 然后，Certbot 将获取您可以上传到提供商的证书。 我们不建议使用此选项，因为它非常耗时，并且您需要在证书过期时重复此步骤。 对于大多数人来说，最好从提供商处请求 Let's Encrypt 支持。若您的提供商不打算兼容，建议您更换提供商。

# 获取帮助

如果您对选择 ACME 客户端，使用特定客户端或与 Let's Encrypt 相关的任何其他内容有疑问，请前往我们的[社区论坛](https://community.letsencrypt.org/)获取帮助。

[Certbot]: https://certbot.eff.org/ "Certbot"

[Certbot]: https://certbot.eff.org/ "Certbot"
