---
title: 幫助 Let's Encrypt
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## 社區論壇

您可以幫助我們在 [Let's Encrypt 社區論壇](https://community.letsencrypt.org/)中回答問題。 詳見[此部落格文章](/2015/08/13/lets-encrypt-community-support.html)以了解社區支援為何如此重要。

## 程式

您也可以幫助我們開發軟體。我們所有的程式都存儲於 [GitHub](https://github.com/letsencrypt/)。

### 客戶端軟體

[Certbot](https://github.com/certbot/certbot) 是使用 Python 語言撰寫的工具，它幫助您的網頁伺服器自動取得憑證；替網站設置 HTTPS。我們建議大多數使用者使用 Certbot，當然還有許多其他[第三方客戶端]({{< ref "/docs/client-options.md" >}})可以使用。

### 伺服器端 CA 軟體

Let's Encrypt CA 使用 [Boulder](https://github.com/letsencrypt/boulder) 簽發憑證。 該軟體基於 [ACME](https://github.com/ietf-wg-acme/acme) 協定並主要使用 Go 撰寫。查看[“需要幫助”問題](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted)列表，和閱讀[貢獻者指南](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)是一個很好的開始。

### letsencrypt.org

您可以在[此處](https://github.com/letsencrypt/website)改進本網站和文件或幫助我們[翻譯](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)網站。

## 簽發協定

Let's Encrypt CA 與在網站伺服器上運行的憑證管理軟體進行通信。我們使用的協定稱為 ACME，用於“自動憑證管理”。ACME 協定草案可在 [Github](https://github.com/ietf-wg-acme/acme) 上獲得。IETF 正在努力工作，將 ACME 定為真正的開放標準協定。您可以加入 [IETF 郵件列表](https://www.ietf.org/mailman/listinfo/acme)討論 ACME 協定開發。
