---
title: 幫助Let's Encrypt
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## 社區論壇

您可以幫助我們在[Let's Encrypt社區論壇](https://community.letsencrypt.org/)中回答問題。 詳見 [此部落格文章](/2015/08/13/lets-encrypt-community-support.html)以了解社區支援為何如此重要。

## 代碼

您也可以幫助我們開發軟體。 我們的所有代碼都存儲於[GitHub](https://github.com/letsencrypt/)。

### 用戶端軟體

[Certbot](https://github.com/certbot/certbot)是使用Python編寫的幫助網路伺服器自動獲取憑證並配置HTTPS的實用程式。Certbot是我們建議大多數人使用的用戶端。 還有許多其他[第三方用戶端]({{< ref "/docs/client-options.md" >}})可用。

### 伺服器端CA軟體

Let's Encrypt CA使用[Boulder](https://github.com/letsencrypt/boulder)簽發憑證。 該軟體基於[ACME](https://github.com/ietf-wg-acme/acme)協議並主要使用Go編寫。 [“需要幫助”問題](https://github.com/letsencrypt/boulder/labels/help%20wanted)列表和[貢獻者指南](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)是一個很好的起點。

### letsencrypt.org

您可以在[此處](https://github.com/letsencrypt/website)改進本網站和文件或幫助我們[翻譯](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)網站。

## 簽發協議

Let's Encrypt CA與在網站伺服器上運行的憑證管理軟體進行通信。我們使用的協議叫ACME，用於“自動憑證管理”。 ACME協議草案可在[Github](https://github.com/ietf-wg-acme/acme)上獲得。IETF正在努力工作以將ACME定為真正的開放標準協議。 您可以加入[此IETF郵件列表](https://www.ietf.org/mailman/listinfo/acme)討論ACME協議開發。
