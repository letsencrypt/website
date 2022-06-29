---
title: 查找帐户 ID
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


当您向 Let's Encrypt 报告问题时，提供您的 Let's Encrypt 账户 ID 会对解决问题很有帮助。
在大多数情况下，您使用的 ACME 客户端软件连接到 Let's Encrypt 服务器时将自动创建账户。若您在多个服务器上运行 ACME 客户端，您可能有多个账户。

您的帐户 ID 是类似 `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`格式的网址。

如果您使用的是 Certbot，您可以在 `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json` 的“uri”字段中找到您的帐户 ID。

如果您正在使用其他 ACME 客户端，具体方法将取决于您使用的客户端。
您可以检查日志中是否有上述形式的 URL。如果您的 ACME 客户端未记录帐户 ID，您可以通过使用相同私钥提交新的注册请求来获取它。详见[了解更多 ACME 规范详情](https://tools.ietf.org/html/rfc8555#section-7.3)。您还可以在 ACME 客户端对 API 服务器发出的每个 POST 的响应中的 Boulder-Requester 标头中找到您的数字格式账户 ID。
