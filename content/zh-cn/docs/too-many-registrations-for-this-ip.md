---
title: 单 IP 注册限制
slug: too-many-registrations-for-this-ip
top_graphic: 1
lastmod: 2022-08-15
show_lastmod: false
---


# 概述

一个 IP 地址每 3 个小时最多可注册 10 个账户。 如果超过*单 IP 注册限制*，您将在 ACME 客户端中收到如下错误信息：

```
too many registrations for this IP: see https://letsencrypt.org/docs/too-many-registrations-for-this-ip/
```

这表明您的 IP 地址调用 Let's Encrypt 账户注册接口过于频繁， 过去 3 小时内您的 IP 地址至少已经创建了 10 个账户。

# 常见原因

超过单 IP 注册限制的原因通常是环境配置不当。

## 重复部署

个人用户超过单 IP 注册限制极为罕见， 原因通常是系统或应用的重复部署，在此过程中 ACME 客户端未能保存并使用已有的账户信息，或者存储账户信息的文件系统本身在容器、虚拟机、云实例部署结束后被销毁。 在测试您的系统或应用部署时，请务必配置 ACME 客户端使用我们的测试环境， 测试环境的速率限制会[宽松很多](/docs/staging-environment/#rate-limits)。

## 账户过多

主机托管服务商和其他大型集成商超过单 IP 注册限制通常是由于为每个客户都注册了一个账户。 我们建议大型集成商采取[多个客户对应一个账户](/docs/integration-guide/#one-account-or-many)的设计。 在测试阶段请务必配置 ACME 客户端使用我们的测试环境， 测试环境的速率限制会[宽松很多](/docs/staging-environment/#rate-limits)。

# 请求帮助

如果您不知道如何配置 ACME 客户端使用我们的测试环境，或者需要协助调试，我们建议您[在社群论坛上寻求帮助](https://community.letsencrypt.org/c/help/13)。

# 请求豁免

单 IP 注册限制**不能**豁免。
