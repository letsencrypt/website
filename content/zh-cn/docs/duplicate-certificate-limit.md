---
title: 重复证书限制
slug: duplicate-certificate-limit
top_graphic: 1
date: 2022-06-16
lastmod: 2022-06-16
show_lastmod: 1
---


# 概述
所有签发请求均受每周 5 个*重复证书*的限制。 当您超出重复证书限制时，您应该会从 ACME 客户端收到如下错误消息：
```
too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit
```
此错误所指的“确切集”是为此证书请求的主机名集：在此示例中，`example.com` 和 `login.example.com`。 如果您的证书仅针对 1 个名称（例如 example.com）颁发，那么您的证书的主机名“确切集”将是 `[example.com]`。 当订阅者在一周内为相同的“确切集”主机名请求证书超过 5 次时，就会超出此速率限制。

# 常见原因

订阅者在试图阻止应用程序或服务的部署时，常常达到重复证书的限制。 一些例子如下：

如果您在您的 ACME 客户端遇到一个错误，您无法识别并且尝试在处理错误故障排除过程中多次移除和重新安装您的 ACME 客户端， 您可以超过重复证书的限制。

如果您在每次失败后删除您的 ACME 客户端的配置数据尝试安装证书， 您将在五次尝试失败后达到这个速率限制。 在删除之前最好复制配置数据。 如果您需要，您可以访问先前发布的证书和私钥。

在对应用程序的部署进行故障排除或测试时，我们建议您将 ACME 客户端配置为使用我们的[测试环境](/docs/staging-environment/)。 我们的测试环境的速率限制要[高得多](/docs/staging-environment/#rate-limits)。

# 请求帮助

如果您不知道如何配置您的 ACME 客户端来使用我们的测试环境，或者您需要一些帮助调试， 我们鼓励您在我们的社区论坛上 [请求帮助](https://community.letsencrypt.org/c/help/13)。

# 请求覆盖

在验证失败的限制下 **不能使用** 覆盖。

# 解决方法

撤销先前发布的证书将不会重置重复证书限制。 然而，仍然存在着这种情况。 如果您发现您已经超过了上限并且您仍然需要另一个证书来获取相同的主机名，您总是可以要求一个不同的主机名“确切集”的证书。 例如，如果您超出了 `[example.com]` 的重复证书限制，那么为 `[example.com, login.example.com]` 请求证书将会成功。 同样，如果您超出了 `[example.com, login.example.com]`的重复证书限制，那么为 `[example.com]` 申请一个单独的证书，为 `[login.example.com]` 申请另一个证书将会成功。

# 监测速率限制

我们目前不提供监测使用者速率限制的方法。
