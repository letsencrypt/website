---
title: 憑證頒發機構授權
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}


憑證頒發機構授權 (Certificate Authority Authorization, CAA) 是一種 DNS 紀錄，它讓網站管理者指定哪些憑證頒發機構，可以頒發包含其網站域名的憑證。CAA 記錄在 2013 年由 [RFC 6844](https://tools.ietf.org/html/rfc6844) 標準化，以"降低網域擁有者對於 CA 意外頒發憑證時的風險"。任何 CA 都可以在驗證域名控制權後，替任何 DNS 下的網域頒發憑證。這表示，如果在 CA 的驗證程序中有錯誤，所有域名都可能受到影響。CAA 紀錄提供了一個方法讓域名擁有者降低這種風險。

# 使用 CAA

如果你不在意 CAA 紀錄，你可以甚麼都不用做，但請注意以下描述的 CAA 紀錄錯誤。如果你想使用 CAA 紀錄，來限制哪些憑證頒發機構能替你的網域頒發憑證，你需要使用支援 CAA 紀錄的 DNS。你可以透過 [SSLMate CAA 支援網頁](https://sslmate.com/caa/support)找到哪些 DNS 業者支援 CAA 紀錄；如果你所使用的 DNS 業者有在列表中，你可以使用 [SSLMate's CAA Record Generator](https://sslmate.com/caa/) 來產生 CAA 紀錄。

Let's Encrypt 的 CAA 網域辨認名稱為 `letsencrypt.org`。紀錄在官方的[憑證實作聲明 (Certification Practice Statemen, CPS) 章節 4.2.1]({{< relref "/repository.md" >}}) 中。

## CAA 紀錄應該設定為哪個網域

你可以將 CAA 紀錄設定為主網域或任何子網域。例如：你想替網域 `www.community.example.com` 設定 CAA 紀錄，你可以以設定全名、`community.example.com` 或 `example.com`。憑證頒發機構會從左到右檢查網域名稱，並在看到 CAA 紀錄後停止。因此 `community.example.com` 上的 CAA 紀錄優先於  `example.com`。大多數人會將 CAA 紀錄設定為註冊網域 (`example.com`)，這樣所有子網域就都能使用其 CAA 紀錄。另外請注意，子網域的 CAA 優先權大於其父網域，無論該紀錄的限制比父網域更寬鬆或嚴格。因此子網域可以使用比父網域更寬鬆的限制。

CAA 如同所有的 DNS 請求一樣，也遵守 CNAME 紀錄。如果 `www.community.example.com`  有一個 CNAME 紀錄指向 `web1.example.net`，憑證頒發機構會先向 `www.community.example.com` 詢問 CAA 紀錄，接著他發現該網域有一個 CNAME 紀錄而不是 CAA 紀錄後，它會向 `web1.example.net` 詢問 CAA 紀錄。請注意，如果網域名稱有 CNAME 紀錄，則根據 DNS 標準中該域名不能有其他的紀錄。

[CAA RFC](https://tools.ietf.org/html/rfc6844) 中描述了另一種 "爬樹" 的方式，要求憑證頒發機構同時檢查父網域的 CNAME 紀錄。後來[勘誤](https://www.rfc-editor.org/errata/eid5065)中移除了這個要求，因此  Let's Encrypt 和其他憑證頒發機構都沒有這個行為。


# CAA 錯誤

Let's Encrypt 在頒發憑證之前會先確認 CAA 紀錄，有時候我們會遇到錯誤即使網遇並沒有設定 CAA 紀錄。當我們遇到錯誤時，我們無法判斷是否能替該網域頒發憑證，因為網域可能因為錯誤而無法顯示禁止我們頒發憑證的 CAA 紀錄。

如果你遇到與 CAA 相關的紀錄，請在我們的[測試環境]({{< relref "/docs/staging-environment.md" >}})中多試幾次，以確認他們是暫時還是持續性的問題。如果是持續性的問題，你需要向 DNS 業者或網路服務業者尋求支援。如果你不確定你的 DNS 業者是誰，請向主機託管業者詢問。

一些對於 CAA 紀錄不熟悉的 DNS 業者可能會回應 "我們不提供 CAA 紀錄"。事實上你的 DNS 業者不需要特別的動作來處理 CAA 紀錄，DNS 只需要對無法識別的查詢（包括 CAA）回應 NOERROR，回應其他種類的操作代碼，包括 NOTIMP，違反了 [RFC 1035](https://tools.ietf.org/html/rfc1035) 標準並需要被修補。

# SERVFAIL

SERVFAIL 是人們最常見的錯誤之一，大多數情況下這表示 DNSSEC 驗證失敗。如果你遇到 SERVFAIL 錯誤，首先你需要使用 DNSSEC debugger，例如 [dnsviz.net](http://dnsviz.net/)。如果還是發生錯誤，很有可能是你的 DNS 在空回應時，會產生錯誤簽名，因為 CAA 回應通常為空回應，像 PowerDNS [在 4.0.3 之前的版本就發生這樣的問題](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha)。

如果你並沒有開啟 DNSSEC 但還是遇到了 SERVFAIL 錯誤，可能的原因是你的授權域名伺服器 (authoritative DNS servers) 了回應 NOTIMP，這種回應方式違反了 RFC 1035 標準；它應該回應空回應與操作代碼 NOERROR。如果你遇到這種情況，請像 DNS 業者尋求支援並回報錯誤。

最後，SERVFAILs 也有可能是你的授權域名伺服器服務中斷所造成的。請檢查 DNS 的 NS 紀錄，並確保每個伺服器都有正常運作。

# 超時

有時候進行 CAA 紀錄查詢會超時。也就是說，即使在重複多次後，授權域名伺服器一直沒有回應。最常見的狀況 DNS 伺服器防火牆設置有誤，拒絕對無法識別的 DNS 紀錄查詢進行回應。你可以向 DNS 業者詢問他們是否有這樣的防火牆設定。
