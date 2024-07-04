---
title: 重复证书限制
slug: duplicate-certificate-limit
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
其中指出了所申请证书对应的一组域名：`example.com` 和 `login.example.com`。 您的证书也可能只包含一个域名，例如 `example.com`。 一周内为完全相同的一组域名（不考虑顺序）申请证书超过 5 次就会触发此速率限制。

# 常见原因

超过重复证书限制通常是在应用或服务的部署调试过程中发生的。 例如：

如果您在 ACME 客户端中遇到了未知的错误，并尝试反复重装 ACME 客户端来排查问题，就有可能超过重复证书限制。

如果您每次安装证书失败后就删除 ACME 客户端的配置文件，失败五次就会超过速率限制。 删除配置前最好备份数据，以便在有需要时找回私钥和已签发的证书。

在排查或测试应用部署时，建议您配置 ACME 客户端使用我们的[测试环境](/docs/staging-environment/)。 测试环境的速率限制会[宽松很多](/docs/staging-environment/#rate-limits)。

# 请求帮助

如果您不知道如何配置 ACME 客户端使用我们的测试环境，或者需要协助调试，我们建议您[在社群论坛上寻求帮助](https://community.letsencrypt.org/c/help/13)。

# 请求豁免

重复证书限制**不能**豁免。

# 解决方法

即使将已签发的证书吊销，重复证书限制也不会解除。 但如果您在超过限制后仍需继续申请证书，可以使用一组不完全相同的域名。 例如，超过 `[example.com]` 的重复证书限制后，您仍然可以申请 `[example.com, login.example.com]` 的证书。 类似地，超过 `[example.com, login.example.com]` 的重复证书限制后，也可以为 `[example.com]` 和 `[login.example.com]` 各申请一份独立的证书。

# 监测速率限制

我们目前不提供监测使用者速率限制的方法。
