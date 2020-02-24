---
title: ACME 驗證方式
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

你從 Let’s Encrypt 取得憑證時，我們的伺服器會使用 ACME 標準下所制定的"考驗"，來驗證你是否擁有你所申請的網域。大多情況下，驗證過程都是由 ACME 客戶端自動完成的，不過如果你想要一些更複雜的設定，我們建議你了解更多有關驗證的機制。如果你不確定該使用哪個驗證方式，請使用你 ACME 客戶端的預設選項，或使用 HTTP-01 考驗。

# HTTP-01 考驗

這是現今最常見的一種驗證方式。Let’s Encrypt 給予 ACME 客戶端一個 token，請 ACME 客戶端將包含 token 和帳號金鑰指紋的檔案，放到網頁伺服器中 `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>` 的位置。當 ACME 客戶端通知 Let’s Encrypt 這個檔案已經放置完成，Let’s Encrypt 就會試著取得它（可能會從多個主機嘗試取得數次）。如果我們能從你的網頁伺服器取得檔案並驗證其內容，你就通過了這個考驗，你可以接著向我們申請憑證頒發。如果我們的驗證失敗，你就必須重來一次。

我們驗證 HTTP-01 時，接受最多 10 次重新導向，並且只接受從 "http:" 導向到 "https:" 與通訊埠 80 導向到通訊埠 443，不接受 IP 位址的重新導向。當我們被重新導向到 HTTPS 後，我們不會驗證憑證是否有效（因為驗證的目的是申請有效憑證，所以可能會遇到自簽憑證或是過期憑證）。

HTTP-01 只能只能透過通訊埠 80 來完成；讓 ACME 客戶端使用任意通訊埠進行驗證，可能會導致安全性問題，所以 ACME 標準中不允許這樣的驗證行為。


優點：

 - 在不需要了解設定網域的額外知識下，輕鬆的完成自動驗證
 - 允許主機或服務提供業者透過 CNAME 紀錄申請憑證
 - 適用於多數現成的網頁伺服器

缺點：

 - 如果你的網路服務業者 (ISP) 阻擋通訊埠 80（這種情況很少見，但有些住宅區的 ISP 會這麼做）那麼你就無法使用這個方式驗證
 - Let’s Encrypt 不允許你使用這種驗證方式頒發萬用憑證
 - 如果你有很多個網頁伺服器，你必須確保驗證檔案在各個伺服器上

# DNS-01 考驗

這個考驗會請你在網域的 TXT 紀錄中，放一段特定的文字，來證明你擁有此網域的 DNS 控制權。DNS-01 的設定步驟會比 HTTP-01 困難，但是它可以在 HTTP-01 無法使用的情況下完成驗證。它也允許你申請萬用憑證。

在 Let’s Encrypt 給予 ACME 客戶端 token 後，客戶端會拿 token 與帳號金鑰進行運算，並產生一段文字，請將這段文字利用 TXT 紀錄放在 DNS 的主機名稱 `_acme-challenge.<YOUR_DOMAIN>` 底下。

我們認為自動化申請和更新憑證非常重要，只有當你的 DNS 業者有提供 API 讓你自動更新憑證時，使用 DNS-01 才有意義。我們的社群整理了一份[有提供 API 的 DNS 業者清單][dns-api-providers]。你的 DNS 業者可能與你註冊網域業者（你購買網域的公司）是同一家，但也有可能不一樣。如果你想要更換你的 DNS 業者，你只需要在網域註冊商的 DNS 紀錄中做一點變更，而不需要等待你的網域名稱到期。

請注意，將開啟所有權限的 API 金鑰放在網頁伺服器上，如果伺服器被駭客攻擊，可能會造成嚴重的後果。最好的做法是，使用[限制權限的 API 金鑰][securing-dns-credentials]，或是在不同的伺服器上執行 DNS 驗證後，再將憑證複製到你的網頁伺服器。

因為 Let’s Encrypt 在搜尋用於 DNS-01 的 TXT 紀錄時遵循 DNS 標準，你可以使用 CNAME 紀錄或是 NS 紀錄，藉由[指派  `_acme-challenge` 子域名][securing-dns-credentials]給其他專門用來回應驗證的 DNS。如果你的 DNS 服務商更新紀錄的速度很慢，那麼你也可以使用這個方法，把驗證工作指派給其他速度較快的 DNS。

大部分的 DNS 業者會有"更新時間"，這個時間的長短會決定你的 DNS 紀錄要花多久才會被所有伺服器更新。這個時間很難估算，因為他們通常使用[任播 (anycast)][anycast] 的方式，這表示很多伺服器擁有同一個 IP 位置。根據你在世界上不同的位置，你可能會和不同的 Let’s Encrypt 伺服器溝通（並得到不同回應）。最好的情況是 DNS API 為你提供了自動檢測更新是否完成。如果你的 DNS 業者沒有提供這種 API，你只需要將 ACME 客戶端 等待一段的時間（通常超過一小時）來確保在觸發驗證前 DNS 紀錄已經完全更新。

你可以在 DNS 紀錄上為網域名稱提供多個 TXT 紀錄。例如：你想同時驗證萬用憑證和非萬用憑證。需要注意的是，要確保舊的 TXT 紀錄已經被清除，如果回應資料太多，Let’s Encrypt 將會拒絕驗證。

優點：

 - 你可以申請頒發萬用憑證
 - 能替你驗證多個網頁伺服器


缺點：

 - 把 API 金鑰在你的網頁伺服器上會有安全疑慮
 - 你的 DNS 業者可能沒有提供 API
 - 你的 DNS 業者的 API 可能沒有提供 DNS 更新時間的資訊

# TLS-SNI-01 

在 ACME 草案版本中曾定義了這個驗證方式。它會透過通訊埠 443 進行 TLS 協定交握，並且傳送一個特定的 [SNI] header 以取得含有 token 的憑證。因為安全問題，[我們已經在 2019 年 3 月禁止使用此驗證方式][tls-sni-disablement]

# TLS-ALPN-01

這個驗證方式是在 TLS-SNI-01 棄用後所開發的，並且被開發成[獨立的標準][tls-alpn]。和 TLS-SNI-01 一樣，它透過 TLS 在通訊埠 443 上運作。然而它使用了自己定義的 ALPN 協定，以確保只有知道這項驗證方法的伺服器才能回應驗證請求。同時，驗證也需要 SNI 欄位與網域名稱相同才能完成，使驗證更加安全。

大多數人並不適合使用這項驗證方式。這項驗證方式比較適合 TLS-terminating 反向代理伺服器的開發者，因為他們需要像 HTTP-01 一樣以主機為主體的驗證方式，但是又想完全在 TLS 層上以保持程式的關注點分離。這個驗證方式目前主要的使用者是服務業者，然而一些主流的網頁伺服器像 Apache 和 Nginx 之後可能會支援這個驗證方法。（[Caddy 已經支援這個驗證方法了][caddy-tls-alpn]）。

優點:

 - 不使用通訊埠 80 
 - 完全運作於 TLS 層

缺點：

 - Apache、Nginx 或 Certbot 短期內都不支援這種驗證方式
 - 和 HTTP-01 一樣，如果你有多台伺服器，你必須確保回應驗證的內容都一樣

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
