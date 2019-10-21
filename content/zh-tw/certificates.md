---
title: 憑證信任鏈
linkTitle: 憑證信任鏈 (根和中間憑證)
slug: certificates
top_graphic: 5
lastmod: 2019-10-18
---



# 根憑證

我們的根憑證離線存儲在安全的地點。 我們使用中級（中間）憑證（在下節介紹）向訂戶（用戶）發放終端憑證。

* 活躍憑證
  * [ISRG Root X1 (自簽)](/certs/isrgrootx1.pem.txt)

我們設置了如下網站來測試根憑證簽發的終端憑證可用性。

* ISRG Root X1有效憑證
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1已吊銷憑證
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1過期憑證
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中級（中間）憑證

IdenTrust和我們交叉簽名（Cross-Sign）了我們的中級憑證。這允許我們在將我們自己的根憑證添加到瀏覽器中的過程中，確保我們的終端實體憑證被所有主流瀏覽器信任。

在正常情況下，Let's Encrypt頒發的憑證將來自“Let's Encrypt Authority X3”。另外的活躍中級憑證“Let's Encrypt Authority X4”將被用於災難恢復時期，只有在我們失去對“Let's Encrypt Authority X3”的掌控權時才會被使用。X1和X2是我們的第一代中級憑證，已經被能更好相容Windows XP的新中級憑證（X3/X4）替換。


* 活躍憑證
  * [Let's Encrypt Authority X3 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx3.pem.txt)
* 備用憑證
  * [Let's Encrypt Authority X4 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx4.pem.txt)
* 已退役憑證
  * [Let's Encrypt Authority X2 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx1.pem.txt)

# 交叉簽名

我們的中級憑證“Let's Encrypt Authority X3”代表了一對公鑰/私鑰組合。這對密鑰中的私鑰為所有終端實體簽名
生成憑證（也稱為葉憑證），即我們頒發給您用於伺服器使用的憑證。

我們的中級憑證由ISRG Root X1簽署。 由於我們還是比較新的憑證頒發機構，ISRG Root X1在大多數瀏覽器中尚未受到信任。為了使我們頒發的憑證被大多數瀏覽器信任， 我們請求IdenTrust，一個根憑證已經受到全部主流瀏覽器信任的憑證頒發機構，和我們交叉簽名了我們的中級憑證。具體來說， IdenTrust使用他們的"DST Root CA X3"（現在稱為“TrustID X3 Root”）交叉簽名了我們的中級憑證。 [從identrust.com下載"TrustID X3 Root"憑證](https://www.identrust.com/support/downloads) (或者，您也可以在此處下載副本： [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b)).

這意味著現在有兩張憑證都可以代表我們的中級憑證。 一張由DST Root CA X3簽發，另外一張由ISRG Root X1簽發。區分這兩張憑證的最簡單方法是查看其簽發人（Issuer）欄位。

在配置網路伺服器時，配置人員不僅需要配置終端憑證，也需要配置中級憑證以幫助瀏覽器通過信任鏈（Trust Chain）驗證終端憑證由被瀏覽器信任的根憑證籤發。幾乎所有的伺服器配置人員都會選擇使用由“DST Root CA X3”簽發的”Let’s Encrypt Authority X3“組成憑證信任鏈。我們推薦的憑證頒發軟體[Certbot](https://certbot.org)將無縫化配置憑證信任鏈。

下圖用視覺方式詮釋了憑證之間的關係：

<img src="/certs/isrg-keys.png" alt="ISRG憑證關係圖">

# OCSP簽名憑證

為避免我們將ISRG根憑證上線以簽署Let's Encrypt Authority的中級憑證OCSP回復，我們建立了這張憑證用於簽發OCSP回復。OCSP回覆中自動包括了該憑證的副本，所以訂戶無需進行任何操作。此憑證僅供參考。
* [ISRG Root OCSP X1 (由ISRG Root X1簽署)](/certs/isrg-root-ocsp-x1.pem.txt)

# 憑證透明度

我們努力對我們的運營及憑證頒發過程保持透明。 我們在頒發憑證時會將該憑證發送到[憑證透明度日誌](https://www.certificate-transparency.org/)。 您可以通過以下連結查看所有Let's Encrypt頒發的憑證：

* [由Let's Encrypt Authority X1發布](https://crt.sh/?Identity=%25&iCAID=7395)
* [由Let's Encrypt Authority X3發布](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多訊息

ISRG根憑證及Let's Encrypt中級憑證的私鑰均存儲在硬體安全模組（HSM）上以提供高度保護，防止私鑰被盜取。

當前所有ISRG私鑰均為RSA私鑰。 我們正在[計劃生成ECDSA私鑰]({{< relref "/upcoming-features.md" >}})。
