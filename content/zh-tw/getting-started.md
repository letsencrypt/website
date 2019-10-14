---
title: 入門
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

為了在你的網站上設定 HTTPS，你需要從憑證頒發機構 (CA) 獲取憑證（一種文件），而 Let's Encrypt 就是一個憑證頒發機構 (CA)。要從 Let's Encrypt 獲得屬於你網站的憑證，你必須證明你對域名的控制權。你可以在你的主機上運行使用 [ACME 協議](https://ietf-wg-acme.github.io/acme/)的軟體，來獲取 Let's Encrypt 憑證；而為了找出最適合你的方式來獲取憑證，你需要知道你是否擁有伺服器的[遠端帳號權限](https://en.wikipedia.org/wiki/Shell_account)（shell access 或稱 SSH access）。如果你完全使用圖形化介面管理你的帳戶，例如 [cPanel](https://cpanel.com/)、 [Plesk](https://www.plesk.com/) 或 [WordPress](https://wordpress.org/)，你很有可能不具有遠端帳號的權限，建議你先向服務提供商做確認。

# 擁有遠端帳號權限

我們建議大多數具有遠端帳號權限的使用者，採用 [Certbot] ACME 客戶端。它可以自動地執行憑證的頒發、安裝，甚至不需要停止你的伺服器；Certbot 也提供專家模式，給不想要自動設定的使用者。Certbot 操作簡單，適用於許多系統；並且具有完善的文檔。[參考 Certbot 官網][Certbot]，以獲取對於不同系統和網頁伺服器的操作說明。

如果 [Certbot] 不能滿足你的需求，或者你想嘗試別的客戶端，還有[很多 ACME 用戶端]({{< ref "/docs/client-options.md" >}})可供選擇。在你選定 ACME 客戶端軟體後，請參閱該客戶端的文檔。

如果你正在嘗試使用不同的 ACME 用戶端，請使用我們的[預備環境]({{< ref "/docs/staging-environment.md" >}})以免超過[頒發速率限制]({{< ref "/docs/rate-limits.md" >}})。


[Certbot]: https://certbot.eff.org/  "Certbot"

# 沒有遠端帳號權限

在沒有遠端帳號權限的情況下，最好的辦法就是使用服務提供商所提供的內建軟體。如果你的提供商提供 Let's Encrypt 支援，那麼他們就能幫助你申請免費憑證，安裝並設定自動更新。對於某些提供商，這是你需要在控制介面或聯繫客服開啟的設定。也有些提供商會自動為其所有客戶設定和安裝憑證。

[查看服務提供商列表](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
查看你提供商的是否有出現在列表上。如果有的話，請按照他們的文檔設定 Let's Encrypt 憑證。

如果你的服務提供商不支援 Let's Encrypt，你可以與他們聯絡尋求幫助。我們會盡力使添加 Let's Encrypt 變得非常簡單，服務提供商通常很樂意聽取客戶的建議！

如果你的服務提供商不想整合 Let's Encrypt，但支援上傳自訂的憑證，你可以在你的電腦中安裝 Certbot 並使用[手動模式 (Manual Mode)](https://certbot.eff.org/docs/using.html#manual)。在手動模式下，你需要將特定文件上傳到你的網頁伺服器上以證明你的控制權。確認網頁伺服器上的文件相符後，Certbot 將會取得憑證，讓你可以上傳給服務提供商。我們不建議使用這個模式，因為它非常耗時，並且你需要在憑證過期時重複此步驟（註：憑證有效期限為三個月，因此每年至少要重複 4 次）。對於大多數人來說，最好向服務提供商尋求 Let's Encrypt 支援。如果你的提供商不打算整合，建議你更換服務提供商。


# 取得幫助

如果你對選擇 ACME 客戶端，使用特定客戶端，或與 Let's Encrypt 相關的任何內容有疑問，請前往我們的[論壇](https://community.letsencrypt.org/)以取得協助。
