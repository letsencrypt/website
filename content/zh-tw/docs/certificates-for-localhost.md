---
title: localhost 憑證
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

有時候，使用者會想要申請網域名稱為 "localhost" 的憑證；不管是用在本地開發上，或是用在與網頁溝通的原生應用程式上。Let's Encrypt 沒有辦法提供 "localhost" 憑證，它不像 ".com" 或 ".net" 一樣在頂級域名底下，因此沒有任何人應該擁有它。你可以設定網域名稱指向 `127.0.0.1`，並使用 DNS 驗證方式取得憑證。然而這事實上是個糟糕的主意，你有其他更好的選擇。

# 用於本地開發

如果你正在開發網頁，通常會使用本地端的網頁伺服器，例如 Apache 或 Nginx 並在瀏覽器中透過 `http://localhost:8000/` 訪問它。然而瀏覽器在 HTTP 與 HTTPS 網頁上的行為有一點不同。最主要的差異是：在 HTTPS 網頁中，任何由 HTTP 連結所傳送的 JavaScript 請求都會被禁止。如果你在本地端使用 HTTP 開發，你的 script 標籤可能一切正常，但是當你部屬到 HTTPS 網站時卻會出現問題。為了解決這類問題，你應該在本地端的網頁伺服器中使用 HTTPS。然而你不想要每次打開網頁都看到憑證警告，到底要怎麼樣讓本地瀏覽器顯示綠色小鎖呢？

最好的選擇是：產生自己的憑證，不管是自己簽署，或是由本地根憑證簽屬，並且讓作業系統的憑證信任倉庫信任它。接著在本地網頁伺服器上使用這個憑證。請參閱下方說明以了解詳細過程。

# 用於與網頁溝通的原生應用程式

有時候開發者希望一個可下載的原生應用程式，可以與網頁溝通以提供額外的功能。例如：Dropbox 和 Spotify 桌面板應用程式可以掃描你主機上的文件，這個功能單純的網頁無法做到。一種常見的解決方法是，在本機的原生應用程式上提供一個網頁伺服器，接著讓網頁透過 XMLHTTPRequest (XHR) 或 WebSockets 的方式與本機伺服器溝通。大部分的網頁伺服器都使用 HTTPS，這表示瀏覽器會禁止你透過 XHR 或 WebSockets 向不安全的連結發送請求；這稱為 Mixed Content Blocking。原生伺服器必須提供安全的網頁服務，才能讓網頁與它溝通。

幸運的是，現今的瀏覽器[認為][mcb-localhost] `http://127.0.0.1:8000/` 是一個[可能可以信任][secure-contexts]的連結，因為它指向 loopback 位置。送到 `127.0.0.1` 的流量保證不會離開你的主機，因此瀏覽器認為，相較於網路環境可能受擷取，這個連結相對安全。並且如果你的原生應用程式在 `127.0.0.1` 上提供網頁服務，則兩者就能透過 XHR 互相溝通。而不幸的是，[localhost 這個域名並沒有受到瀏覽器的特殊規則影響][let-localhost]，並且 WebSockets 在兩個域名上都沒有這項特殊規則。

你可能想透過以下方式繞過這些限制：在全域的 DNS 中添加一個網域名稱（例如 `localhost.example.com`）並指向 `127.0.0.1`，取得該網域的憑證後，將該憑證和對應的私鑰放入原生應用程式中，並且告訴網頁與 `https://localhost.example.com:8000/` 而不是 `http://127.0.0.1:8000/` 溝通。**請不要這麼做**，這樣會導致你的使用者暴露在危險之中，而你的憑證也可能被註銷。

如果你使用網域名稱而不是 IP 位置，攻擊者可以透過對 DNS 查詢進行中間人攻擊 (MitM)，將網域名稱指向另一個 IP 位置。攻擊者可以偽裝成本地端的應用程式，接著傳送一個假的回應給網頁，這可能會造成網頁的帳號遭入侵。

你可能會為了讓你的原生應用程式可以運作，而將私鑰和憑證放入原生應用程式中，這直接造成了中間人攻擊的可能性。因為任何人包括攻擊者，都可以下載並複製你在原生應用程式中的私鑰。如果發現了洩漏私鑰的情況，你的憑證管理機構必須註銷你的憑證。[不少原生應用程式][mdsp1]他們的[憑證][mdsp2]都因為[洩漏私鑰][mdsp3]而被註銷。


不幸的是，原生應用程式缺乏缺少安全的方式與對應的網頁溝通。在未來瀏覽器可能會[限制 localhost 瀏覽器對 localhost 的存取][tighten-access]，使得互相溝通變得更加困難。

此外也請注意，在原生應用程式中提供包含特殊權限的 API 本身就存在風險，因為沒有你授權的網站也可以訪問它。如果你還是想要這麼做，請務必閱讀[跨來源資源共用][cors]頁面，使用 Access-Control-Allow-Origin，並確保使用記憶體安全的 HTTP 語法分析器，因為即使你限制訪問的網站來源，攻擊者也可能透過分析器的漏洞，向你的 API 傳送特殊權限的請求。

# 產生並信任你自己的憑證

每個人都可以產生自己的憑證，不需要憑證頒發機構。唯一的差別是你製作的憑證不會被其他人所信任。不過對於本地開發環境的需求，這樣就足夠了。

產生私鑰與自簽憑證最簡單的方式就是使用以下 openssl 指令：

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

你可以透過使用 localhost.crt 和 localhost.key 設定本地網頁伺服器，並在將 localhost.crt 安裝到受信任的本地根憑證中。

如果你想要更真實的本地端憑證，你可以使用 [minica][minica] 產生你的本地根憑證，並利用它頒發終端憑證（子葉憑證）。你就可以引入根憑證而不是引入自簽的終端憑證。

你也可以透過 /etc/hosts 將 `www.localhost` 設定為 `127.0.0.1` 的別名。這會讓瀏覽器儲存 cookie 的方式有一點改變。


[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
