---
title: 入門
slug: getting-started
top_graphic: 3
date: 2018-04-12
---

為了在您的網站上啟用HTTPS，您需要從憑證頒發機構（CA）獲取憑證（一種文件）。 Let's Encrypt是一個憑證頒發機構（CA）。 要從Let's Encrypt獲取您網站域名的憑證，您必須證明您對域名的實際控制權。您可以在您的網路主機上運行使用[ACME協議](https://ietf-wg-acme.github.io/acme/)的軟體來獲取Let's Encrypt憑證。

為了找出最適合您獲取憑證的方法，您需要知道您是否擁有伺服器的[命令行帳戶"Shell Account"（註：連結為英文）](https://en.wikipedia.org/wiki/Shell_account) (通常被稱為命令行權限 "Shell Access")。 如果您完全使用控制面板管理您的帳戶，例如[cPanel](https://cpanel.com/)， [Plesk](https://www.plesk.com/), or
[WordPress](https://wordpress.org/), 你很有可能沒有命令行訪問權限。您需要聯繫您的託管服務提供商（伺服器/主機提供商）確認。

# 擁有命令行權限（Shell Access）

我們建議大多數具有命令行訪問權限的人使用[Certbot] ACME用戶端。它可以自動執行憑證頒發和安裝，無需停止您的伺服器。對於不需要自動配置的用戶, Certbot還提供專家模式。 它易於使用，適用於許多操作系統，並且具有出色的（註：英文）文件。 [訪問Certbot官網][Certbot] 以獲取針對於操作系統和網站伺服器的自訂文件。

如果[Certbot]不能滿足您的需求，或者您想嘗試別的用戶端，還有[更多ACME用戶端]({{< ref "/docs/client-options.md" >}})可供選擇。 選定ACME用戶端軟體後，請參閱該用戶端的文件以繼續。

如果您正在嘗試不同的ACME用戶端，請使用我們的[臨時環境]({{< ref "/docs/staging-environment.md" >}})以避免遭到[速率限制]({{< ref "/docs/rate-limits.md" >}})。


[Certbot]: https://certbot.eff.org/  "Certbot"

# 沒有命令行權限

在沒有命令行權限的情況下，最好的辦法是使用您託管服務/網站/主機提供商提供的內建軟體。 如果您的託管服務/網站/主機提供商提供Let's Encrypt支援， 幫助您申請免費憑證，安裝並配置自動續期。對於某些提供商，這是您需要在控制面板/聯繫客服打開的設置。 其他提供商會自動為其所有客戶請求和安裝憑證。

[查看我們列舉的託管服務提供商](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
看看你的是否在上面。如果是的話，請按照他們的文件設置Let's Encrypt憑證。

如果您的託管服務提供商不支援Let's Encrypt，您可以與他們聯繫請求支援。 我們盡力使添加Let's Encrypt支援變得非常容易，提供商（註：非中國國內提供商）通常很樂意聽取客戶的建議！

如果您的託管服務提供商不想集成Let's Encrypt，但支援上傳自訂憑證，您可以在自己的計算機上安裝Certbot並在[手動模式（Manual Mode）](https://certbot.eff.org/docs/using.html#manual)下運行。在手動模式下，您需要將特定文件上傳到您的網站以證明您的控制權。 然後，Certbot將獲取您可以上傳到提供商的憑證。 我們不建議使用此選項，因為它非常耗時，並且您需要在憑證過期時重複此步驟（註：每年最少4次）。 對於大多數人來說，最好從提供商處請求Let's Encrypt支援。若您的提供商不打算相容，建議您更換提供商。


# 獲取幫助

如果您對選擇ACME用戶端，使用特定用戶端或與Let's Encrypt相關的任何其他內容有疑問，請前往我們的[社區論壇](https://community.letsencrypt.org/)獲取幫助。
