---
title: 憑證信任鏈
linkTitle: 憑證信任鏈（根憑證與中間憑證）
slug: certificates
top_graphic: 5
lastmod: 2019-10-18
---

{{< lastmod >}}

# 根憑證

我們簽發根憑證的私鑰以離線方式存儲在安全的地點。我們使用中間憑證向用戶頒發終端憑證，中間憑證將在下一章節介紹。

* 活躍憑證
  * [ISRG Root X1（自簽）](/certs/isrgrootx1.pem.txt)

我們設置了以下網站，用來測試由根憑證所簽發的憑證鏈是否有效。

* ISRG Root X1 有效憑證
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 已註銷憑證
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 已過期憑證
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中間憑證

IdenTrust 和我們交互簽名 (Cross-Sign) 了中間憑證，這樣可以確保我們所發的終端憑證被所有主流瀏覽器信任。

在正常的情況下，由 Let's Encrypt 所頒發的憑證會來自中間憑證 "Let's Encrypt Authority X3"。而另一個中間憑證 "Let's Encrypt Authority X4" 將被保留起來用於災難恢復期，只有在我們失去對 "Let's Encrypt Authority X3" 的掌控時才會使用它。X1 和 X2 是我們的第一代中間憑證，為了更好地相容 Windows XP，我們將他們替換為目前的 X3 和 X4 中間憑證。


* 活耀憑證
  * [Let's Encrypt Authority X3（與 IdenTrust 交互簽名）](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3（由 ISRG Root X1 簽發）](/certs/letsencryptauthorityx3.pem.txt)
* 備用憑證
  * [Let's Encrypt Authority X4（與 IdenTrust 交互簽名）](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4（由 ISRG Root X1 簽發）](/certs/letsencryptauthorityx4.pem.txt)
* 已退役憑證
  * [Let's Encrypt Authority X2（與 IdenTrust 交互簽名）](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2（由 ISRG Root X1 簽發）](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1（與 IdenTrust 交互簽名）](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1（由 ISRG Root X1 簽發）](/certs/letsencryptauthorityx1.pem.txt)

# 交互簽名

我們的中間憑證 "Let's Encrypt Authority X3" 具有一對公鑰和私鑰，
我們使用金鑰中的私鑰替所有終端憑證（也稱為子葉憑證）簽名，這也就是我們頒發給你伺服器的憑證。

我們的中間憑證是由 ISRG Root X1 根憑證所簽發。因為我們還是個非常新的憑證頒發機構，ISRG Root X1 尚未受到大多數的瀏覽器的信任。為了使我們頒發的憑證被廣為信任，我們向一個已受主流瀏覽器信任的根憑證 IdenTrust，交互簽名後產生了我們的中間憑證。精確地說，IdenTrust 使用他們的 "DST Root CA X3"（現在被稱為 "TrustID X3 Root"）與我們交互簽名後產生了我們的中間憑證。[你可以從 identrust.com 網站下載 "TrustID X3 Root"](https://www.identrust.com/support/downloads)（或是你也可以在這裡下載副本：[.pem](/certs/trustid-x3-root.pem.txt) 及 [.p7b](/certs/trustid-x3-root.p7b)）。

這表示我們現在有兩種中間憑證。一種由 DST Root CA X3 根憑證所簽發，而另一種由 ISRG Root X1 根憑證所簽發。區分這兩種憑證最簡單的方法，就是查看憑證的簽發者 (Issuer) 欄位。

當你在設定網頁伺服器時，伺服器管理者不只需要設定終端憑證，也需要設定中間憑證；以幫助瀏覽器透過信任鏈，驗證終端憑證是否被受信任的根憑證所簽發。幾乎所有的伺服器管理者都會選擇使用由 "DST Root CA X3" 根憑證，以及 "Let’s Encrypt Authority X3" 中間憑證所組成的憑證信任鏈。我們建議你使用 Let's Encrypt 所開發的軟體 [Certbot](https://certbot.org)，替你無縫地設定憑證信任鏈。

下圖表示憑證之間的關係：

<img src="/certs/isrg-keys.png" alt="ISRG 憑證關係圖">

# OCSP 憑證

為避免我們將 ISRG 根憑證的私鑰放到線上伺服器中，因此我們使用 OCSP 憑證的私鑰替 Let's Encrypt 中間憑證簽署 OCSP 回應。OCSP 回應中會自動將這張憑證的複本包含在其中，因此使用者不需要需進行任何操作。這裡放上此憑證供你參考。

* [ISRG Root OCSP X1 （由 ISRG Root X1 簽發）](/certs/isrg-root-ocsp-x1.pem.txt)

# 憑證透明度

我們努力使 Let's Encrypt 的運作及憑證頒發過程保持透明。我們在頒發憑證時，會將憑證透過[憑證透明度](https://www.certificate-transparency.org/)系統紀錄下來。你可以通過以下連結查看所有 Let's Encrypt 所頒發過的憑證：

* [由 Let's Encrypt Authority X1 頒發](https://crt.sh/?Identity=%25&iCAID=7395)
* [由 Let's Encrypt Authority X3 頒發](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多訊息

ISRG 根憑證和 Let's Encrypt 中間憑證的私鑰均存儲在硬體安全模組 (HSM) 中；它提供高度安全的保護，以避免私鑰被竊取。

目前所有 ISRG 私鑰均為 RSA 私鑰。我們正在{{<link "計劃使用 ECDSA 私鑰" "/upcoming-features" >}}。
