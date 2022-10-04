---
title: 失败验证限制
slug: failed-validation-limit
top_graphic: 1
lastmod: 2022-06-30
show_lastmod: false
---


# 概述
所有颁发请求都受到每个帐户、每个主机名、每小时 5 次失败的*验证失败*限制。 当您超过失败验证限制时，您会从您的ACME客户端收到以下错误消息：

```
too many failed authorizations recently: see https://letsencrypt.org/docs/failed-validation-limit/
```

此错误所指的“授权”是您的 ACME 客户端发送的授权请求的结果，用于在我们颁发或更新证书之前验证对域名的控制。 此错误表示多个验证请求已成功发送，但所有验证尝试均失败。

# 常见原因

订阅者由于环境中的配置错误，常常触及失败的验证限制。

## HTTP-01或TLS-APLN-01

对于通过 HTTP-01 或 TLS-APLN-01 验证方法请求授权的 ACME 客户端，问题通常源于网络或防火墙配置，这使得我们的验证服务器无法访问发送请求的服务器。

## DNS-01

通过 DNS-01 验证方法请求授权的 ACME 客户端通常要求您在主 DNS 区域中创建 CNAME 记录，这允许 ACME 客户端在验证过程中设置所需的 DNS 记录。 DNS-01 验证失败通常是由于在初始设置过程中遗漏了步骤或输入错误。

当排除故障或测试您的应用程序的部署时，我们鼓励您配置您的 ACME 客户端来使用我们的 [测试环境](/docs/staging-environment/)。 我们的测试环境的速率较高 [](/docs/staging-environment/#rate-limits)。

# 请求帮助

如果您不知道如何配置您的 ACME 客户端来使用我们的测试环境，或者您需要一些帮助调试， 我们鼓励您在我们的社区论坛上[请求帮助](https://community.letsencrypt.org/c/help/13)。

# 请求豁免

**无法**对“验证失败”限制进行豁免。