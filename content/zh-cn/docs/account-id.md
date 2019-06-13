---
title: 找到账户ID
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2016-08-10
---

{{< lastmod >}}

当发布问题时，提供您的Let's Encrypt会很有用。大多数时间，创建账户是由你使用的Let's Encrypt上的ACME客户端软件
自动创建的，如果你在多台服务器上运行ACME客户端，你可能有多个账户。

你的账户ID是表单的一个URL`https://acme-v01.api.letsencrypt.org/acme/reg/12345678`，你也可以只在URL的末尾
提供数字作为简写。

如果你使用Certbot，你可以在`/etc/letsencrypt/accounts/acme-v01.api.letsencrypt.org/directory/*/regr.json`
查找"uri"字段找到你的账户ID。

如果你使用其他ACME客户端，不同的客户端指令不一样。在日志中找到上面描述表单中的URL。如果你的ACME客户端没有记录账户ID，你可以通过提交一个新的带有相同Key的注册请求来获取账户ID。更多细节请[参考ACME规范](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#registration)。
除此之外，ACME客户端发起的POST请求中，首部“Boulder-Requester”的值，即为数字形式的账号ID。

