---
title: 證書信任鏈
slug: certificates
top_graphic: 5
lastmod: 2019-05-01
---



# 根證書

我們的根證書離線存儲在安全的地點。 我們使用中級（中間）證書（在下節介紹）向訂戶（用戶）發放終端證書。

* 活躍證書
  * [ISRG Root X1 (自簽)](/certs/isrgrootx1.pem.txt)

我們設置了如下網站來測試根證書簽發的終端證書可用性。

* ISRG Root X1有效證書
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1已吊銷證書
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1過期證書
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中級（中間）證書

IdenTrust和我們交叉簽名（Cross-Sign）了我們的中級證書。這允許我們在將我們的根證書添加至根證書信任項目的過程中向訂戶頒發被瀏覽器信任的證書。

在正常情況下，Let's Encrypt頒發的證書將來自“Let's Encrypt Authority X3”。另外的活躍中級證書“Let's Encrypt Authority X4”將被用於災難恢復時期，只有在我們失去對“Let's Encrypt Authority X3”的掌控權時才會被使用。X1和X2是我們的第一代中級證書，已經被能更好相容Windows XP的新中級證書（X3/X4）替換。


* 活躍證書
  * [Let's Encrypt Authority X3 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx3.pem.txt)
* 備用證書
  * [Let's Encrypt Authority X4 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx4.pem.txt)
* 已退役證書
  * [Let's Encrypt Authority X2 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (和IdenTrust交叉簽名)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (由ISRG Root X1簽發)](/certs/letsencryptauthorityx1.pem.txt)

# 交叉簽名

我們的中級證書“Let's Encrypt Authority X3”代表了一對公鑰/私鑰組合。這對密鑰中的私鑰為所有終端實體簽名
生成證書（也稱為葉證書），即我們頒發給您用於伺服器使用的證書。

我們的中級證書由ISRG Root X1簽署。 由於我們還是比較新的證書頒發機構，ISRG Root X1在大多數瀏覽器中尚未受到信任。為了使我們頒發的證書被大多數瀏覽器信任， 我們請求IdenTrust，一個根證書已經受到全部主流瀏覽器信任的證書頒發機構，和我們交叉簽名了我們的中級證書。具體來說， IdenTrust使用他們的"DST Root CA X3"（現在稱為“TrustID X3 Root”）交叉簽名了我們的中級證書。 [從identrust.com下載"TrustID X3 Root"證書](https://www.identrust.com/support/downloads) (或者，您也可以在此處下載副本： [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b)).

這意味著現在有兩張證書都可以代表我們的中級證書。 一張由DST Root CA X3簽發，另外一張由ISRG Root X1簽發。區分這兩張證書的最簡單方法是查看其簽發人（Issuer）欄位。

在配置網路伺服器時，配置人員不僅需要配置終端證書，也需要配置中級證書以幫助瀏覽器通過信任鏈（Trust Chain）驗證終端證書由被瀏覽器信任的根證書籤發。幾乎所有的伺服器配置人員都會選擇使用由“DST Root CA X3”簽發的”Let’s Encrypt Authority X3“組成證書信任鏈。我們推薦的證書頒發軟體[Certbot](https://certbot.org)將無縫化配置證書信任鏈。

下圖用視覺方式詮釋了證書之間的關係：

<img src="/certs/isrg-keys.png" alt="ISRG證書關係圖">

# OCSP簽名證書

為避免我們將ISRG根證書上線以簽署Let's Encrypt Authority的中級證書OCSP回復，我們建立了這張證書用於簽發OCSP回復。OCSP回覆中自動包括了該證書的副本，所以訂戶無需進行任何操作。此證書僅供參考。
* [ISRG Root OCSP X1 (由ISRG Root X1簽署)](/certs/isrg-root-ocsp-x1.pem.txt)

# 證書透明度

我們努力對我們的運營及證書頒發過程保持透明。 我們在頒發證書時會將該證書發送到[證書透明度日誌](https://www.certificate-transparency.org/)。 您可以通過以下連結查看所有Let's Encrypt頒發的證書：

* [由Let's Encrypt Authority X1發布](https://crt.sh/?Identity=%25&iCAID=7395)
* [由Let's Encrypt Authority X3發布](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多訊息

ISRG根證書及Let's Encrypt中級證書的私鑰均存儲在硬體安全模組（HSM）上以提供高度保護，防止私鑰被盜取。

當前所有ISRG私鑰均為RSA私鑰。 我們正在[計劃生成ECDSA私鑰]({{< ref "/upcoming-features.md" >}})。
