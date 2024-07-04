---
title: Let's Encrypt 的運作原理
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


Let's Encrypt 和 [ACME 協定](https://tools.ietf.org/html/rfc8555)的目標是：在沒有人為介入的情況下，讓網頁伺服器可以自動取得瀏覽器可信任的憑證。這項工作是透過運行在網頁伺服器上的憑證管理軟體來達成的。

為了瞭解該技術的運作原理，讓我們先了解在網頁伺服器上；支援 Let's Encrypt 的憑證管理軟體，是如何設定 `https://example.com` 的流程。

流程分為兩個步驟：首先，管理軟體會先向 CA 證明伺服器擁有網域的所有權。接著管理系統就可以替該網域申請、更新或註銷憑證。

## 證明網域的所有權

Let's Encrypt 透過公鑰辨識伺服器。當憑證管理軟體首次向 Let's Encrypt 溝通時，它會產生一組公私金鑰對，並向 Let's Encrypt CA 證明伺服器管理一個或多個網域。這個過程與傳統憑證頒發流程相似：透過建立帳號，接著向該帳號添加網域。

流程一開始，憑證管理軟體會向 Let's Encrypt CA 詢問，它需要做甚麼才能證明自己擁有 `example.com`。Let's Encrypt CA 會對該網域提出一個或多個考驗。憑證管理軟體可以透過不同方式來證明對網域的控制權，例如，CA 會讓憑證管理軟體指定：

* 在 `example.com` 下設定 DNS 紀錄，或是
* 在 `http://example.com` 特定路徑下提供 HTTP 文件

此外，在驗證考驗中，Let's Encrypt 還提供了一個隨機數 (nonce)，要求憑證管理軟體必須用它所產生的私鑰，對隨機數進行簽名，以證明憑證管理軟體擁有這組金鑰對。

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

讓我們假設，憑證管理軟體想要完成上文所提到的第二個任務。憑證管理軟體會建立一個文件並放在 `http://example.com` 網站上指定的位置，並使用私鑰對隨機數進行簽名。動作完成後，它會告知 CA 它已經準備好以進行驗證了。

接著 CA 要驗證伺服器是否通過這個考驗。CA 會檢查隨機數上的簽名，並且下載在放網頁伺服器上的文件，以確認文件內容。

<div class="howitworks-figure">
<img alt="替 example.com 請求授權所需要的工作"
     src="/images/howitworks_authorization.png"/>
</div>

如果對隨機數的簽名驗證通過，則這個考驗就算完成。這表示以公鑰作為識別的憑證管理軟體，有權管理 `example.com`。通常我們稱這個，由憑證管理軟體所使用，用來進行驗證的公私金鑰對為“授權金鑰對”。


## 憑證的頒發和註銷

一旦憑證管理軟體有授權金鑰對，進行請求、更新和註銷憑證就變得非常簡單了 — 只需要發送憑證管理請求，並用授權金鑰對簽名。

為了取得憑證，憑證管理軟體將建立一個 PKCS#10 [憑證簽署請求 (Certificate Signing Request, CSR)](https://tools.ietf.org/html/rfc2986)，要求 Let's Encrypt CA 頒發一張憑證給 `example.com`。通常 CSR 中會包含，經過另一組私鑰簽名的資料，以及其對應的公鑰。此外，憑證管理軟體還會使用 `example.com` 授權金鑰對替 CSR 簽名，以便讓 Let's Encrypt CA 知道它已經獲得授權。

當 Let's Encrypt 接收到請求後，它會驗證這兩個簽名。如果驗證成功，CA 會使用 CSR 中的公鑰替 `example.com` 的憑證簽名，再將文件回傳給憑證管理軟體。

<div class="howitworks-figure">
<img alt="替 example.com 申請憑證"
     src="/images/howitworks_certificate.png"/>
</div>

註銷憑證的流程與申請流程類似。憑證管理軟體使用 `example.com` 的授權金鑰對替註銷請求簽名，接著 Let's Encrypt 會驗證該請求，如果請求通過驗證，它會將註銷訊息發佈到 OCSP (Online Certificate Status Protocol) 伺服器，以便讓瀏覽器等有關程式知道，他們不該信任已被註銷的憑證。

<div class="howitworks-figure">
<img alt="註銷 example.com 憑證的流程"
     src="/images/howitworks_revocation.png"/>
</div>
