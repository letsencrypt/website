---
title: 註銷憑證
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
show_lastmod: 1
---


當憑證相對應的私鑰不再安全時，你應該註銷憑證。這個情況可能由很多原因造成，例如：你不小心將私鑰公開在網路上；駭客可能進入了你的伺服器並複製私鑰；駭客可能暫時控制了你的伺服器或 DNS 設定，並頒發且驗證了他們擁有私鑰的憑證。

當你註銷 Let's Encrypt 憑證，Let's Encrypt 透過  [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) 發布註銷憑證的訊息，有些瀏覽器會檢查 OCSP 來確定是否該信任這張憑證。請注意，OCSP 有一些[根本上的問題](https://www.imperialviolet.org/2011/03/18/revocation.html)，因此不是所有瀏覽器都會檢查它。將洩漏私鑰的憑證註銷非常重要，並且在 Let's Encrypt 的[使用者協議](/repository)中要求使用者執行。

你需要使用 [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) 來註銷憑證，通常使用者會使用 ACME 客戶端，例如： [Certbot](https://certbot.eff.org/)。你必須向 Let's Encrypt 證明你有權限註銷憑證，我們有三種方法讓你註銷憑證：

# 使用申請頒發憑證的帳號註銷憑證

如果你擁有當初申請頒發憑證帳號的控制權，你可以透過你帳號的認證資訊，Certbot 預設使用這種方式註銷憑證，註銷指令為：

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 使用憑證私鑰註銷憑證

如果你當初不是由你申請頒發憑證，但是你有憑證相對應的私鑰，你可以使用私鑰對註銷請求簽名。例如：你發現私鑰不小心被公開在網路上，你就可以使用這個方法，來註銷使用那把私鑰的憑證，即使你不是當初請憑證的人。

如果你想使用這個方法註銷憑證，你需要先下載你想註銷的憑證，Let's Encrypt 將所有的憑證透過[憑證透明度](https://www.certificate-transparency.org/)紀錄下來，因此你可以從監控網站；例如：[crt.sh](https://crt.sh/) 中找到憑證並下載它。

此外，你還需要 PEM 格式的私鑰。當你有了這些文件後，你可以 Certbot 指令來註銷憑證：

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# 使用其他帳號註銷憑證

如果有人入侵你的主機或 DNS，並頒發了憑證，當你取回控制權後，你想要註銷它所頒發的憑證憑證。Let's Encrypt 必須驗證你擁有憑證中網域的控制權（不然人們可以在未經許可的狀況下註銷別人的憑證）！Let's Encrypt 使用和頒發憑證時相同的方法來驗證網域控制權：你可以[加入一個 DNS TXT 紀錄](https://tools.ietf.org/html/rfc8555#section-8.4)、[放一個檔案在 HTTP 伺服器上](https://tools.ietf.org/html/rfc8555#section-8.3)或提供一個[特殊的 TLS 憑證](https://tools.ietf.org/html/rfc8737#section-3)。通常 ACME 客戶端會幫你完成這些工作。需要注意的是，大多數 ACME 客戶端會同時完成驗證和頒發憑證，因此你僅能透過頒發新憑證來完成驗證。如果你不想要一張新的憑證，你可以在頒發後註銷它，或是直接將私鑰刪除。如果你想要完全避免頒發一張新的憑證，你可以在申請頒發時加入一個不存在的網域名稱，這會導致憑證頒發失敗，但是還是能驗證其他存在網域名稱的控制權。如果你想要這麼做，你可以透過 Certbot 指令：

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

如果你想用 HTTP 而不是 DNS 驗證網域名稱，請將 `--preferred-challenges=dns` 替換成 `--preferred-challenges=http`。

一旦你驗證了你想註銷的憑證中所有網域名稱的控制權，你就可以從 [crt.sh](https://crt.sh/) 上下載並執行註銷憑證的動作；就像你成功頒發了憑證後想註銷憑證的流程一樣：

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
