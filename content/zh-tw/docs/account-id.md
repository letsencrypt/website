---
title: 查找帳戶ID
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
---

{{< lastmod >}}

當您向Let's Encrypt報告問題時，提供您的Let's Encrypt帳戶ID會對解決問題很有幫助。
在大多數情況下，您使用的ACME用戶端軟體在連接到Let's Encrypt伺服器的過程中將自動創建帳戶。 若您在多個伺服器上運行ACME用戶端，您可能有多個帳戶。

您的帳戶ID是`https://acme-v02.api.letsencrypt.org/acme/acct/12345678`格式的網址。

如果您使用的是Certbot，可以通過查看`/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.中的“uri”欄位找到您的帳戶ID

如果您正在使用其他ACME用戶端，該說明將取決於用戶端配置。
檢查日誌中是否有上述表單的URL。如果您的ACME用戶端未記錄帳戶ID，您可以透過使用相同密鑰提交新的註冊請求來檢索它。 詳見[了解更多ACME規範詳情](https://tools.ietf.org/html/rfc8555#section-7.3).
您還可以在ACME用戶端對API伺服器發出的每個POST的響應中的Boulder-Requester標頭中找到您的數位格式帳戶ID。
