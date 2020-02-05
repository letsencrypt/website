---
title: 入門
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

{{< lastmod >}}

為了在你的網站上設定 HTTPS，你需要從憑證頒發機構 (Certificate Authority, CA) 獲取憑證，而 Let's Encrypt 就是一個憑證頒發機構。要從 Let's Encrypt 上獲得屬於你網站的憑證，你必須證明你對域名的控制權。你可以在你的主機上運行使用 [ACME 協議](https://ietf-wg-acme.github.io/acme/)的軟體，來獲取 Let's Encrypt 的憑證

為了找出最適合你的方式來獲取憑證，你需要知道你是否擁有伺服器的[遠端帳號權限](https://en.wikipedia.org/wiki/Shell_account)（shell access 或稱 SSH access）。如果你完全使用圖形化介面管理你的帳戶，例如 [cPanel](https://cpanel.com/)、 [Plesk](https://www.plesk.com/) 或 [WordPress](https://wordpress.org/)，你很有可能不具有遠端帳號的權限，建議你先向服務提供業者做確認。

# 擁有遠端帳號權限

我們建議大多數具有遠端帳號權限的使用者，採用 [Certbot] 這個 ACME 客戶端。它可以自動執行憑證的頒發、安裝，甚至不需要停止你的伺服器；Certbot 也提供專家模式，給不想要自動設定的使用者。Certbot 操作簡單，適用於許多系統；並且具有完善的文檔。[參考 Certbot 官網][Certbot]，以獲取對於不同系統和網頁伺服器的操作說明。

如果 [Certbot] 不能滿足你的需求，或是你想嘗試別的客戶端，還有{{<link "很多 ACME 用戶端" "/docs/client-options" >}}可供選擇。在你選定 ACME 客戶端軟體後，請參閱該客戶端的文檔。

如果你正在嘗試使用不同的 ACME 用戶端，請使用我們的{{<link "測試環境" "/docs/staging-environment" >}}以免超過{{<link "憑證頒發與更新的速率限制" "/docs/rate-limits" >}}。

[Certbot]: https://certbot.eff.org/  "Certbot"

# 沒有遠端帳號權限

在沒有遠端帳號權限的情況下，最好的辦法是使用服務業者所提供的現有支援。如果你的業者支援 Let's Encrypt，那麼他們就能幫助你申請免費憑證；安裝並設定自動更新。某些業者會需要你在控制介面或聯繫客服以開啟 Let's Encrypt 服務。也有些業者會為所有客戶自動設定並安裝憑證。

查看[支援 Let's Encrypt 的業者列表](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)，確認你提供商的是否有出現在列表上。如果有的話，請按照他們的文檔設定 Let's Encrypt 憑證。

如果你的服務商不支援 Let's Encrypt，你可以與他們聯絡尋求幫助。我們會盡力使添加 Let's Encrypt 變得非常簡單，業者通常很樂意聽取客戶的建議！

如果你的服務商不想整合 Let's Encrypt，但支援上傳自訂的憑證，你可以在你的電腦中安裝 Certbot 並使用[手動模式 (Manual Mode)](https://certbot.eff.org/docs/using.html#manual)。在手動模式下，你需要將特定文件上傳到你的網頁伺服器上以證明你的控制權。確認網頁伺服器上的文件相符後，Certbot 將會取得憑證，讓你可以上傳給他們。我們不建議使用這個模式，因為它非常耗時，並且你需要在憑證過期時重複此步驟（註：憑證有效期限為三個月，因此每年至少要重複 4 次）。對於大多數人來說，最好向業者尋求 Let's Encrypt 支援；如果他們不打算整合，建議你更換一家。


# 取得幫助

如果你對選擇 ACME 客戶端、使用客戶端或 Let's Encrypt 有疑問，請前往我們的[社群論壇](https://community.letsencrypt.org/)以取得協助。
