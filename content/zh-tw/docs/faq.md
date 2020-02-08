---
title: 常見問題
linkTitle: 常見問題 (FAQ)
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

常見問題分為以下兩個部分:

* [一般問題](#general)
* [技術問題](#technical)

# <a name="general">一般問題</a>

## Let's Encrypt 提供哪些服務？

Let's Encrypt 是一家全球性的憑證頒發機構 (Certificate Authority, CA)。我們讓全世界的人們和機構獲得、更新和管理 SSL/TLS 憑證。網站可以透過我們的憑證啟用安全的 HTTPS 連線。

Let's Encrypt 提供域名驗證型憑證 (Domain Validation, DV)。我們不提供組織驗證型憑證 (Organization Validation, OV) 或擴展驗證型憑證 (Extended Validation, EV)，主要原因是因為我們無法自動化地頒發那種類型的憑證。 

如果你想開始使用 Let's Encrypt，請閱讀我們的{{<link "快速入門" "/getting-started" >}}頁面。

## 使用 Let's Encrypt 的服務需要多少費用？真的免費嗎？
我們不會在憑證上收取任何費用。Let’s Encrypt 是一家非營利的機構，我們的任務是透過推廣使用 HTTPS 來創造一個更加安全；更尊重隱私的網際網路。我們的服務免費且操作簡單，因此每個網站都可以藉由它部屬 HTTPS 網站。

為了提供全世界免費的服務，我們需要慷慨的贊助商以及個人的幫助。如果你對於贊助我們有興趣，請參考{{<link "贊助" "/donate" >}}頁面或{{<link "成為贊助者" "/become-a-sponsor" >}}頁面。

在某些情況下，服務整合者（例如：服務業者或主機託管業者）會收取一些費用，這筆費用屬於他們提供 Let’s Encrypt 證書所需要的管理和維護成本。

## 你們提供哪些支援協助？

Let’s Encrypt 是一個小型團隊，並且透過自動化降低營運成本。這表示我們無法對使用者提供直接協助。不過我們一些很棒的支援：

1. 我們有個非常實用的{{<link "文檔" "/docs" >}}
2. 我們有個非常活耀並樂於提供協助的[社群論壇](https://community.letsencrypt.org/)。我們的社群成員都非常會回答問題，並且許多常見問題都已經得到了解答。

我們很喜歡這部[影片](https://www.youtube.com/watch?v=Xe1TZaElTAs)，在談論一個好的社群所具有的力量時所具有的觀點。

## 我發現有個網站使用 Let's Encrypt 來進行釣魚、惡意軟體、詐騙等等的行為，我該怎麼辦？

我們建議你將這類型網站回報給 Google Safe Browsing 和 Microsoft Smart Screen 計畫，它們能更有效的保護使用者。以下是回報 Google 的網址：

https://www.google.com/safebrowsing/report_badware/

如果你想閱讀更多關於政策與想法，請參考此連結：

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a name="technical">技術問題</a>

## Let’s Encrypt 所頒發的證書是否被瀏覽器所信任？

是的，對於大部分的瀏覽器和作業系統而言。請參考{{<link "相容性列表" "/docs/cert-compat" >}}取得更多細節。

## Let's Encrypt 所頒發的憑證除了用於網頁外，還能用於其他採用 SSL/TLS 協定的服務嗎？

Let’s Encrypt 憑證是一個標準的域名驗證型憑證，因此你可以將憑證用在任何使用域名的服務上，例如網頁伺服器、郵件伺服器和 FTP 伺服器等等。

郵件加密和程式碼簽章需要另一種憑證，而 Let's Encrypt 不會頒發這種類型的憑證。

## Let's Encrypt 是否會在你們的伺服器上替我的憑證產生或儲存私鑰？

不，絕對不會。

私鑰的產生與管理，永遠都是由你的伺服器；而不是由 Let's Encrypt 憑證頒發機構所掌控。

## Let's Encrypt 所產生的憑證有效期限是多久？

我們的憑證有效期限為 90 天。你可以閱讀[這篇](/2015/11/09/why-90-days.html)文章，來了解為甚麼我們這麼做。

你無法透過設定調整這個限制，這項限制也沒有例外；因此我們建議你每 60 天自動更新憑證。

## Let’s Encrypt 可以頒發組織驗證型憑證 (OV) 或擴展驗證型憑證 (EV) 嗎？

我們沒有計畫頒發 OV 或 EV 憑證。

## 我可以取得針對多個網域名稱的憑證嗎 (SAN 憑證或 UCC 憑證)？

可以，透過主體別名 (SAN) 機制，使一張憑證內包含多個不同的網域名稱。

## Let’s Encrypt 可以頒發萬用憑證嗎？

可以，萬用憑證的頒發必須透過 ACMEv2 協定並使用 DNS-01 驗證方式。更多技術資訊，請參考[這篇文章](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)。

## Let's Encrypt (ACME) 客戶端支援我的作業系統嗎？

有非常大量的{{<link "ACME 客戶端" "/docs/client-options" >}}可以使用。然而某些客戶端有可能只能在特定作業系統上運行，我們建議你參考[Certbot](https://certbot.eff.org/)


## 我可以使用現有的私鑰或證書簽發請求 (Certificate Signing Request, CSR) 嗎？

可以，不過並不是所有的客戶端都支援這項功能，而 [Certbot](https://certbot.eff.org/) 支援此功能。

## Let's Encrypt 使用哪些 IP 位置來驗證我的網頁伺服器？

我們不會公布我們用來驗證網頁伺服器的 IP 位置，因為它們可能隨時更換。將來我們可能同時使用多個 IP 位置進行驗證。

## 我成功的更新了一張憑證，然而這次並沒有進行驗證，為甚麼會這樣？

當你成功完成網域的驗證後，生成的授權將會被暫存以便後續使用，暫存的授權有 30 天的有效期限。如果你所請求的憑證有將所有必要的授權都暫存，則在暫存的有效期限到期之前，不會再次進行驗證。
