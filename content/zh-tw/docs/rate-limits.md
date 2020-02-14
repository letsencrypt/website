---
title: 速率限制
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-06-04
---

{{< lastmod >}}

為了確保大多數使用者的公平性，Let's Encrypt 具有憑證操作上的速率限制，我們相信這些的限制能滿足大多數用戶的需求。大型機構可以逐步增加他們憑證數量，而不需要受到 Let's Encrypt 的干預。

如果你正著手開發或測試 Let's Encrypt 客戶端，請使用我們的{{<link "測試環境" "/docs/staging-environment" >}}，請不要使用上線環境的 API。如果你正為服務提供業者或大型網站整合 Let's Encrypt，請閱讀我們的{{<link "整合指南" "/docs/integration-guide" >}}。

我們最主要的限制是<a id="certificates-per-registered-domain"></a>**每個註冊網域 (Registered Domain) 的憑證頒發數量**，限制為每周 50 張。註冊網域，是指你向網域註冊商所購買的名稱，例如：網域名稱 `www.example.com` 的註冊網域就是 `example.com`；而網域名稱 `new.blog.example.co.uk` 的註冊網域是 `example.co.uk`。我們使用[公共後綴列表 (Public Suffix List)](https://publicsuffix.org) 來辨認一個網域名稱的註冊網域。

如果你擁有非常多的子網域，你可能會想將它們整合成一張憑證。你最多能在<a id="names-per-certificate"></a>**一張憑證中包含 100 個網域名稱**。綜合上述兩個限制，你每個星期最多能替 5000 個網域名稱申請憑證。在一張憑證中包含多個網域名稱的憑證，我們稱為主體別名 (Subject Alternative Name, SAN) 憑證，或有時稱為整合通訊憑證 (Unified Communications Certificates, UCC) 憑證。注意：出於效率和可靠性考量，一張憑證最好不要包含太多網域名稱。

更新憑證僅有一項特別規定：更新憑證受到**重複憑證**限制，一個星期內僅能頒發 5 張重複的憑證。更新憑證與**每個註冊網域的憑證頒發數量**互相獨立。請注意：2019 年 3 月前，更新憑證曾經受到每個註冊網域的憑證頒發數量影響，但是[現在已經互相獨立了](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189)。

如果一張憑證與先前的某張憑證擁有相同的網域，無論網域的大小寫或順序，它就會被視為重複憑證。例如，你過去已經申請了一張憑證，網域包括 [`www.example.com`, `example.com`]，則這禮拜你僅能再替 [`www.example.com`, `example.com`] 這組網域申請 4 次憑證。如果你在網域中添加了 [`blog.example.com`]，你就不會受到重複憑證的限制。

重複憑證的計算，不會因為你變更了的憑證公鑰和憑證擴展而受影響。

**註銷憑證不會使頒發速率限制重設**，因為你已經消耗了這些用來頒發憑證的資源。

我們還有<a id="failed-validations"></a>**網域驗證失敗**限制，對於每個帳號每域名每小時 5 次的限制。在{{<link "測試環境" "/docs/staging-environment" >}}中並沒有那麼嚴格的限制，因此你可以使用測試環境來針對連線問題除錯。

"new-reg"、"new-authz" 和 "new-cert" 端點的<a
id="overall-requests"></a>**速率限制總和**為每秒 20 次請求。"/directory" 端點和 "/acme" 路徑以及其子路徑的速率請求總和為每秒 40 次請求。

此外我們還有兩個你可能比較不會遇到的限制。

<a id="accounts-per-ip-address"></a>**每個 IP 位置**每 3 個小時最多能建立 10 個帳號。**每個 IPv6 /48** 每 3 個小時最多能建立 500 個帳號。要達到這種帳號限制是很難的，我們建議服務提供業者{{<link "使用一個帳號為多個客戶提供服務" "/docs/integration-guide" >}}。

你的帳號最多能有 300 個**待驗證授權**。這種速率限制很難達到，通常是在 ACME 客戶端開發時才會遇到。會達到這個速率限制，通常表示你的客戶端正在建立授權，但是沒有驗證授權。如果你正在開發 ACME 客戶端，請使用我們的{{<link "測試環境" "/docs/staging-environment" >}}。

對於使用 ACME v2 API 的使用者，每 3 個小時最多可以建立 300 個<a id="new-orders"></a>**新請求**。

# <a id="overrides"></a>超過限制

如果你達到速率限制，我們無法暫時重設它。你只能等待一個星期直到速率限制結束。我們使用滑動窗口來計算限制時間，如果你在這星期一申請了 25 張憑證，星期五申請了另外 25 張憑證，你可以在下星期一再次申請憑證頒發。你可以透過[查詢 crt.sh](https://crt.sh)，取得你的註冊網域所申請過的憑證列表，它使用公開的[憑證透明化 (Certificate Transparency)](https://www.certificate-transparency.org) 紀錄。

如果你是個想整合 Let's Encrypt 的服務提供業者或組織，你可以透過填寫[增加速率表單](https://goo.gl/forms/plqRgFVnZbdGhE9n1)以取得更高的速率。處理表單需要幾周的時間，因此如果你只是想要在限制結束前更快的重設限制，請不要填寫這個表單。

大多數的業者不需要增加速率，因為對於不同的註冊網域並沒有頒發速率限制。如果你的你的客戶在一個註冊網域上擁有超過 2000 個子網域，你才需要考慮增加速率。請參考我們的{{<link "整合指南" "/docs/integration-guide" >}}，以取得更多資訊。

# <a id="clearing-pending"></a>清除待驗證授權

如果你有大量的待驗證授權並且受到了速率限制，你可以透過向其中一個提出考驗的伺服器，發出 JWS 簽名的 POST 請求，來觸發未驗證授權的驗證請求，詳細流程請參考 [ACME 規範](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#responding-to-challenges)。待驗證授權的格式由 https://acme-v01.api.letsencrypt.org/acme/authz/XYZ 中所表示，並且會出現在你的客戶端記錄檔中。請注意，記錄檔中不管驗證成功或失敗都會先顯示待驗證。如果你的記錄檔中沒有對應授權的 URL，你需要等待速率限制結束。如上文所說描述的，我們使用滑動窗口來計算時間，根據你頒發憑證的間隔時間不同，等待的時間可能不需要一周。

通常有大量未驗證授權的原因是客戶端軟體有錯誤。如果你達到這個速率限制，你應該再檢查一下你的客戶端程式碼。