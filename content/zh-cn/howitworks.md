---
title: 入门
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

为了在您的网站上启用HTTPS，您需要从证书颁发机构（CA）获取证书（一种文件）。 Let's Encrypt是一个证书颁发机构（CA）。 要从Let's Encrypt获取您网站域名的证书，您必须证明您对域名的实际控制权。您可以在您的网络主机上运行使用[ACME协议](https://ietf-wg-acme.github.io/acme/)的软件来获取Let's Encrypt证书。

为了找出最适合您获取证书的方法，您需要知道您是否拥有服务器的[命令行账户"Shell Account"（注：链接为英文）](https://en.wikipedia.org/wiki/Shell_account) (通常被称为命令行权限 "Shell Access")。 如果您完全使用控制面板管理您的账户，例如[cPanel](https://cpanel.com/)， [Plesk](https://www.plesk.com/), or
[WordPress](https://wordpress.org/), 你很有可能没有命令行访问权限。您需要联系您的托管服务提供商（服务器/主机提供商）确认。

# 拥有命令行权限（Shell Access）

我们建议大多数具有命令行访问权限的人使用[Certbot] ACME客户端。它可以自动执行证书颁发和安装，无需停止您的服务器。对于不需要自动配置的用户, Certbot还提供专家模式。 它易于使用，适用于许多操作系统，并且具有出色的（注：英文）文档。 [访问Certbot官网][Certbot] 以获取针对于操作系统和网站服务器的自定义文档。

如果[Certbot]不能满足您的需求，或者您想尝试别的客户端，还有[更多ACME客户端](/docs/client-options/)可供选择。 选定ACME客户端软件后，请参阅该客户端的文档以继续。

如果您正在尝试不同的ACME客户端，请使用我们的[临时环境](/docs/staging-environment/)以避免遭到[速率限制](/docs/rate-limits/)。


[Certbot]: https://certbot.eff.org/  "Certbot"

# 没有命令行权限

在没有命令行权限的情况下，最好的办法是使用您托管服务/网站/主机提供商提供的内置软件。 如果您的托管服务/网站/主机提供商提供Let's Encrypt支持， 帮助您申请免费证书，安装并配置自动续期。对于某些提供商，这是您需要在控制面板/联系客服打开的设置。 其他提供商会自动为其所有客户请求和安装证书。

[查看我们列举的托管服务提供商](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
看看你的是否在上面。如果是的话，请按照他们的文档设置Let's Encrypt证书。

如果您的托管服务提供商不支持Let's Encrypt，您可以与他们联系请求支持。 我们尽力使添加Let's Encrypt支持变得非常容易，提供商（注：非中国国内提供商）通常很乐意听取客户的建议！

如果您的托管服务提供商不想集成Let's Encrypt，但支持上传自定义证书，您可以在自己的计算机上安装Certbot并在[手动模式（Manual Mode）](https://certbot.eff.org/docs/using.html#manual)下运行。在手动模式下，您需要将特定文件上传到您的网站以证明您的控制权。 然后，Certbot将获取您可以上传到提供商的证书。 我们不建议使用此选项，因为它非常耗时，并且您需要在证书过期时重复此步骤（注：每年最少4次）。 对于大多数人来说，最好从提供商处请求Let's Encrypt支持。若您的提供商不打算兼容，建议您更换提供商。


# 获取帮助

如果您对选择ACME客户端，使用特定客户端或与Let's Encrypt相关的任何其他内容有疑问，请前往我们的[社区论坛](https://community.letsencrypt.org/)获取帮助。
