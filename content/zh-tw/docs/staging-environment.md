---
title: 測試環境
slug: staging-environment
date: 2018-01-05
lastmod: 2019-09-16
show_lastmod: 1
---


在使用我們的正式環境前，我們強烈建議你先使用我們的測試環境進行布署。這樣能確保你在申請頒發憑證前一切正常，以避免受到憑證的速率限制。

我們的 [ACME v2 測試環境](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)為：

`https://acme-staging-v02.api.letsencrypt.org/directory`

如果你使用 Certbot，你可以透過 `--dry-run` 標記以使用測試環境。如果你使用其他 ACME 客戶端，請閱讀他們有關測試環境的說明。請注意，只有相容於 ACME v2 的客戶端才能使用 v2 的測試環境。

# 速率限制

測試環境具有的速率限制種類與[上線環境](/docs/rate-limits)相同，但是有更高的額度：

* **每個註冊域名的憑證頒發數量**限制為每個星期 30000 張
* **重複憑證**限制為每隔星期 30000 張
* **驗證失敗**限制為每小時 60 次
* **註冊帳號**限制為每個 IP 3 小時內能註冊 50 個帳號
* 使用 ACME v2，**新請求**限制為每個帳號 3 小時內 1500 個


# 根憑證

測試環境中的中間憑證 (["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem))，是使用**不在**瀏覽器或客戶端信任憑證倉庫中的根憑證所頒發的。如果你希望測試用客戶端能信任測試環境所頒發的憑證，你可以手動安裝 ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) 到測試用客戶端的信任憑證倉庫中。請注意：不要將測試用的根憑證或中間憑證安裝到日常使用的客戶端信任倉庫中，因為它們沒有達到上線環境的標準，將他們用於測試環境外的客戶端會造成安全性問題。

# 憑證透明度

測試環境會將預憑證交給 Let's Encrypt [Testflume](/docs/ct-logs) 和 Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) 測試用的憑證透明度紀錄，並在頒發的憑證中添加 SCT。
