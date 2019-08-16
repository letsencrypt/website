---
title: 查找帐户ID
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
---

{{< lastmod >}}

当您向Let's Encrypt报告问题时，提供您的Let's Encrypt账户ID会对解决问题很有帮助。
在大多数情况下，您使用的ACME客户端软件在连接到Let's Encrypt服务器的过程中将自动创建账户。 若您在多个服务器上运行ACME客户端，您可能有多个账户。

您的帐户ID是`https://acme-v02.api.letsencrypt.org/acme/acct/12345678`或者`https://acme-v01.api.letsencrypt.org/acme/reg/12345678`格式的网址。

如果您使用的是Certbot，可以通过查看`/etc/letsencrypt/accounts/acme-v01.api.letsencrypt.org/directory/*/regr.json`.中的“uri”字段找到您的帐户ID

如果您正在使用其他ACME客户端，该说明将取决于客户端配置。
检查日志中是否有上述表单的URL。如果您的ACME客户端未记录帐户ID，您可以通过使用相同密钥提交新的注册请求来检索它。 详见[了解更多ACME规范详情](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#registration).
您还可以在ACME客户端对API服务器发出的每个POST的响应中的Boulder-Requester标头中找到您的数字格式账户ID。
