---
title: 尋找帳號 ID
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


當你向 Let's Encrypt 回報問題時，如果你提供 Let's Encrypt 帳號 ID，這會對我們非常有幫助。 在大多數的情況下，ACME 客戶端會在與 Let's Encrypt 伺服器溝通的過程中，自動建立帳號。如果你在多個伺服器上運行 ACME 客戶端，你可能會有多個帳號。

你的帳戶ID是 `https://acme-v02.api.letsencrypt.org/acme/acct/12345678` 格式的網址。

如果你使用 Certbot，可以通過查看 `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json` 中的 "uri" 欄位找到你的帳戶 ID。

如果你使用其他的 ACME 客戶端，請參考客戶端軟體的設定說明， 並在記錄檔中檢查上述提到的網址。 如果你的 ACME 客戶端沒有紀錄帳號 ID，你可以使用相同金鑰傳送一個申請帳號的請求，以取得你的帳號。 細節請參考[ACME 協定中申請帳號的部分](https://tools.ietf.org/html/rfc8555#section-7.3)。 你也可以在每個 ACME 客戶端向伺服器發出 POST 請求，伺服器回應 header 中 Boulder-Requester 的欄位找到數字格式的帳號 ID。
