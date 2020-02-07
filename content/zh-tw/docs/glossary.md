---
title: 術語表
slug: glossary
top_graphic: 1
date: 2018-12-30
---

{{< lastmod >}}

<!--
Note for translators:
 
- Usage of the "def" macro (in other languages than English):
{% def 
	id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`" 
	name="The term to define (optional if english or abbr is provided)"
	abbr="an accronym (optional)"
	english="the english term (optional - if present the abbr is in english too)" %}}
		the definition
{% /def %}
	
- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} 授權資訊存取。一個[憑證擴展](#def-extension)中的欄位，用來告訴[使用者代理](#def-user-agent)軟體有關[憑證](#def-certificate)頒發者的資訊，包括 [OCSP](#def-OCSP) URI 和[憑證頒發者的 URI](#def-CAI)。 {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} 自動憑證管理環境。由 [Let's Encrypt](#def-LE) 所實作的協議，與它相容的軟體可以透過此協議與 Let's Encrypt 溝通以獲得[憑證](#def-leaf)。[ACME 協議草案](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [維基百科](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} ACME 客戶端。能 ACME 伺服器溝通，以請求[憑證](#def-leaf)的軟體。{{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} ACME 伺服器。相容 ACME 協定的伺服器。Let's Encrypt 的軟體 [Boulder](#def-boulder) 相容 ACME 協定，但是還[是有一些差異](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)。 {{% /def %}}


{{% def id="boulder" name="Boulder" %}} 由 [Let's Encrypt](#def-LE) 開發和使用，以實作 ACME 協議的軟體。[GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} 底線要求。客戶端對於憑證頒發機構技術和政策上的要求，憑證頒發機構需要遵守客戶端的[根憑證政策](#def-root-program)，以取得數瀏覽器的信任。{{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} 憑證頒發授權。指定哪些[憑證頒發機構](#def-CA)是可以替對應的網域名稱頒發憑證的 DNS 紀錄。憑證頒發機構會檢查 CAA 紀錄，而瀏覽器不會檢查它。依據憑證頒發機構的[底線要求](#def-BRs)，[Let's Encrypt](#def-LE) 會{{<link "尊重 CAA 紀錄" "/docs/caa" >}}。 - [維基百科](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} 將一個網域名稱對應到另一個網域名稱的 DNS 紀錄。[維基百科](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} 憑證頒發機構。[Let's Encrypt](#def-LE)、[IdenTrust](#def-IdenTrust)、Sectigo 和 DigiCert 都是憑證頒發機構。[維基百科](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} CA 頒發者。[AIA](#def-AIA) 欄位中的一部分，內容包含[憑證](#def-leaf)頒發者的資訊。用於當[網頁伺服器](#def-web-server)沒有提供可信任的[憑證鏈](#def-chain)時。{{% /def %}}

{{% def id="certificate" name="Certificate" %}} 憑證。一個使用 [X.509 格式](#def-X509)的文件，內容包含公鑰和如何使用這把公鑰的資訊。最常見的憑證種類是[終端憑證](#def-leaf)；同時，憑證種類也有[中間憑證](#def-intermediate)和[根憑證](#def-root)。 {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} 憑證擴展。在憑證中，大部分的欄位都是憑證擴展所定義，例如：[SAN](#def-SAN) 和 [AIA](#def-AIA)，這兩個欄位都屬於憑證擴展。憑證擴展的機制讓你可以建立不屬於 [X.509](#def-X509) 標準中的欄位。 {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} CA/瀏覽器論壇。由憑證頒發機構、瀏覽器、作業系統，以及其他使用 PKI 應用程式開發商，所組成的公益性組織。CA/瀏覽器論壇頒布了[底線要求](#def-BRs)。[Let's Encrypt](#def-LE) 是 CA/瀏覽器論壇的成員之一。[維基百科](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} 憑證鏈。透過中間憑證列表，連結到儲存在憑證信任倉庫中的根憑證，來幫助[使用者代理](#def-user-agent)軟體判斷是否能信任一張[終端憑證](#def-leaf)。請注意，憑證鏈的選擇不是唯一的，網站提供了一個憑證鏈，然而使用者代理軟體可能會選擇另一條憑證鏈來驗證這張憑證。[維基百科](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} 憑證政策。一系列的共同安全要求，描述對於使用者社群和應用程式的憑證用性。[ISRG Certificate Policy](https://letsencrypt.org/repository/#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [維基百科](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} 憑證實作聲明。一份憑證頒發機構的聲明文件，內容包括對於憑證頒發、管理、註銷、更新或更換金鑰的實作方法。[ISRG Certification Practice Statement](https://letsencrypt.org/repository/#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [維基百科](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} 關鍵擴展。憑證中被標示為"關鍵"的擴展欄位。憑證相關軟體如果不知道如何處理關鍵擴展欄位，它就必須拒絕該憑證。區分關鍵與非關鍵擴展，使得未來為了安全性而新增的擴展欄位，不會對舊軟體造成影響。{{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} 憑證註銷列表。告知[使用者代理](#def-user-agent)軟體關於[憑證](#def-leaf)[註銷](#def-revocation)狀態的方法。憑證註銷列表由 CA 對憑證簽名的序號所組成。[維基百科](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} 憑證簽發請求。一份經由簽名的文件，內容包含申請憑證所需要的資訊。[Let's Encrypt](#def-LE) 需要的資訊為：[通用名稱](#def-CN)、[主體別名](#def-SAN)和主體公鑰資訊。通常 [ACME 客戶端](#def-ACME-client)，或網頁服務業者會自動替使用者產生此簽發請求。[維基百科](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} 憑證儲存倉庫。憑證儲存倉庫中包含一個可信任的[根憑證](#def-root)列表。作業系統（例如：Windows、Android 或 Debian）和瀏覽器（例如：Firefox）都維護著自己的憑證儲存倉庫；沒有憑證儲存倉庫的瀏覽器，會使用作業系統本身的憑證儲存倉庫。由 [Let's Encrypt](#def-LE) 提供的憑證{{<link "已經被大多數的憑證儲存倉庫所信任" "/certificates" >}}。 {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} 憑證主體。憑證中的主體欄位，指名這張憑證是頒發給誰的。憑證主體通常包含[通用名稱](#def-CN)、所屬國家、機構名稱。{{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} 憑證透明度。為了增加安全性，憑證或[預憑證](#def-precertificate)必須被公開在憑證透明度紀錄中：https://www.certificate-transparency.org/ 。[Let's Encrypt](#def-LE) 頒發憑證的過程會先產生預憑證，再將 [SCT](#def-SCT) 列表加入到預憑證中。有些[瀏覽器](#def-web-browser)，例如：Google Chrome 就會需要 SCT 來驗證憑證。[維基百科](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} 憑證透明度紀錄。[憑證透明度](#def-CT)架構中的一部份，憑證透明度紀錄接受憑證和預憑證的提交，並加他們添加到一個永久、可驗證、公開的列表中。{{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} 通用名稱。憑證主體欄位中的一部分，通用名稱描述該憑證是頒發給哪個網域的。[根憑證](#def-root)和[中間憑證](#def-intermediate)的通用名稱是[憑證頒發機構](#def-CA)的名稱；而[終端憑證](#def-leaf)的通用名稱是擁有該憑證的網域之一。請注意，通用名稱有長度的限制，最多為 63 個字元，因為在過去我們使用通用名稱來判斷哪個網遇能使用該憑證；而現在網路標準使用[主體別名](#def-SAN)來判斷。{{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} 交互簽名。一張憑證由多個憑證頒發機構的[根憑證](#def-root)所簽發。例如：[Let's Encrypt](#def-LE) 的[中間憑證](#def-intermediate)是與[IdenTrust](#def-IdenTrust) 交互簽名所產生的，因為在剛開始 Let's Encrypt 的根憑證並沒有被客戶端的[憑證儲存倉庫](#def-store)所信任。技術上來說，要進行交互簽名需要兩張使用相同[主體](#def-subject)，和[金鑰對](#def-key-pair)的憑證，一張由 Let's Encrypt 根憑證的私鑰簽名，另一張由 IdenTrust 根憑證的私鑰簽名：[{{< relref "/certificates" >}}]({{< relref "/certificates" >}})。 [維基百科](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} 基於 DNS 的域名實體認證。一個網路安全協定，使用 DNS 來告訴客戶端該如何驗證憑證真偽，以及是否有提供加密公鑰。[維基百科](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} 網域名稱系統安全擴展。使用密碼學認證 DNS 回應的機制。要使用 DNSSEC 需要頂級域名、網域名稱擁有者和 DNS recursive resolvers 的配合。DNSSEC 安全擴展的使用率目前偏低。[維基百科](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} 域名驗證型憑證。證明你有該網域名稱控制權的[憑證](#def-leaf)。[Let's Encrypt](#def-LE) 僅提供 DV 憑證，而不提供 [OV](#def-OV) 或 [EV](#def-EV) 憑證：{{<link "FAQ" "/docs/faq" >}} - [維基百科](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} 橢圓曲線數位簽名演算法。使用橢圓曲線密碼學的數位簽名演算法。[維基百科](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) 支援頒發使用 ECDSA 的[終端憑證](#def-leaf)，但是整個[憑證鏈](#def-chain)還沒有完全使用 ECDSA：[{{< relref "/upcoming-features" >}}]({{< relref "/upcoming-features" >}}) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} 一種特殊類型的 EdDSA，類似還的還有 Ed448。{{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} 現代基於橢圓曲線的公鑰簽名演算法，它是為了解決一些橢圓曲線加密的[常見問題](https://ed25519.cr.yp.to/)。[Let's Encrypt](#def-LE) 等憑證頒發機構還沒有辦法頒發使用 EdDsa 的憑證。[維基百科](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} 橢圓曲線密碼學。一種基於橢圓曲線的公鑰密碼學。ECC 得以在提供相同安全性的前提下，使用較小的金鑰。[Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [維基百科](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} 擴展驗證。一種憑證驗證方式，[CA](#def-CA) 會驗證法律實體是否有網站的控制權。擴展驗證憑證中會包含法律實體的資訊。[CA](#def-CA) 對 EV 憑證的控制比 [OV](#def-OV) 憑證還要嚴格。[Let's Encrypt](#def-LE) 不提供頒發擴展驗證憑證。[維基百科](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} 完整網域名稱。例如： `www.example.com` 就是一個 *FQDN* 。 {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} IdenTrust 是一個[憑證頒發機構](#def-CA)。 IdenTrust 和 [Let's Encrypt](#def-LE) 使用彼此的私鑰[交互簽名](#def-cross-signing)產生了[中間憑證](#def-intermediate)：[{{< relref "/certificates" >}}]({{< relref "/certificates" >}})。 [維基百科](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} 中間憑證。由[根憑證](#def-root)或其他中間憑證所頒發的憑證，它可以頒發其他憑證。通常我們會將根憑證的私鑰以離線方式儲存，並用中間憑證憑證的私鑰替終端憑證簽名。中間憑證被包含在[憑證鏈](#def-chain)中。[維基百科](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} 應用程式中的國際化域名。請參考[國際化域名](#def-IDN)。 {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} 國際化域名。含有不屬於 `a` 到 `z`和 `0` 到 `9` 以及連字號 `-` 的網域名稱。這些網域名稱可能含有阿拉伯文、中文、西里爾文、泰米爾文、希伯來文，或其他拉丁字母的變音符號或合體字。編碼後的 IDN 域名會以 `xn--` 為開頭。[Let's Encrypt](#def-LE) 支援頒發 IDN 域名的憑證：https://letsencrypt.org/2016/10/21/introducing-idn-support.html 。[維基百科](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} 在 [Let's Encrypt](#def-LE) 的上級組織：[https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/)。 [維基百科](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} 憑證頒發者。憑證中的頒發者欄位。例如：Let's Encrypt 終端憑證的頒發者欄位可能是：C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3"。它同常包含[通用名稱](#def-CN)、國家和組織。憑證的頒發者，必須對應到另一張憑證的[主體](#def-subject)。對於像[根憑證](#def-root)的[自簽憑證](#def-self-signed)，頒發者和主體兩者會相同。頒發者這個詞可能也用來，表示一張頒發了其他憑證的憑證（例如：[中間憑證](#def-intermediate) 或根憑證），或表示頒發了憑證的組織。{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} 金鑰對，或稱公私鑰對。由一組私鑰與公鑰所組成，公鑰通常被包含在憑證資訊內，而私鑰則獨立保存。金鑰對通常依據不同的用途，被用來加密、解密、簽名、驗證資料。[維基百科](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} 終端憑證，或稱子葉憑證。終端憑證大部份是由[中間憑證](#def-intermediate)所頒發，僅對於一組網域有效，並且無法用來頒發憑證。終端憑證透過 [ACME 客戶端](#def-ACME-client)請求，並由[網頁伺服器](#def-web-server)所使用。[維基百科](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}


{{% def id="mixed-content" name="Mixed content" %}} 混合內容。在 HTTPS 網頁中以 HTTP 方式載入子資源（Javascript、CSS 或圖片）的網頁稱為混合內容。[瀏覽器](#def-web-browser) 可能會禁止混合內容網頁，或標示為安全性較低的網頁：https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content 。為了解決混合內容問題，網頁開發者必須全數使用 HTTPS 載入資源。在瀏覽器內建的[開發者工具](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)可以幫助你找出哪些資源可能造成混合內容問題。{{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} 線上憑證狀態協定。一種檢查憑證[註銷](#def-revocation)狀態的方法。檢查[憑證頒發機構](#def-CA)是否認為該憑證雖然在有效期限內，但依然不再有效力。這個協定衍伸出隱私問題，因為憑證頒發機構和網路提供業者，可以藉由此協定的請求過程知道哪些人正在拜訪哪些網站。[維基百科](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} 一個[憑證擴展](#def-extension)欄位，它告訴[瀏覽器](#def-web-browser)必須使用 [OCSP 裝訂](#def-OCSP-staping)的證書。它用來確保瀏覽器在每次訪問網頁伺服器時，取得最新的憑證[註銷](#def-revocation)狀態，使得憑證註銷系統更加可靠。[Let's Encrypt](#def-LE) 可以頒發具有 OCSP Must-Staple 擴展欄位的憑證。[Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} OSCP 裝訂，也被稱為 TLS 憑證狀態請求擴展 (TLS Certificate Status Request extension)。[網頁伺服器](#def-web-server)透過回傳給[瀏覽器](#def-web-browser)一個經由[憑證頒發機構](#def-CA)簽名的 [OCSP](#def-OCSP) 請求回應，以節省瀏覽器向憑證頒發機構二次 OCSP 請求的時間。OCSP 裝訂是為了增加效率與保護隱私而增加的。[維基百科](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} 物件識別碼。UID 是由國際電信聯盟 (ITU) 和 ISO/IEC 標準化，具有唯一性的一組數字。在憑證中，OID 用來定義憑證擴展、欄位或政策聲明。網路標準、[憑證政策](#def-CP)和[憑證實作聲明](#def-CPS)文件內都定義了 OID 的使用方法。[維基百科](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} 組織驗證。一種憑證驗證方式，[CA](#def-CA) 會驗證[使用者](#def-subscriber)的法律實體。組織驗證憑證中會有法律實體的資訊。[Let's Encrypt](#def-LE) 不提供頒發組織驗證憑證。 [維基百科](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}} PEM 格式。一種密碼學格式，原本用於"隱私增強型電子郵件"標準。PEM 格式的文件可用來表示私鑰、公鑰或數位憑證，文件以 "-\-\-\--BEGIN " 作為資料的開頭。[維基百科](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} PFX 個人資訊交換格式。一種包含[終端憑證](#def-leaf)、連結根憑證的憑證鏈，和私鑰的檔案。請參考：https://en.wikipedia.org/wiki/PKCS_12 。[Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} 預憑證。預憑證是憑證透明度架構的其中一部份。預憑證內包含一個破壞性的[關鍵擴展](#def-critical)，以避免預憑證被客戶端軟體接受。CA 會將預憑證提交給[憑證透明度紀錄](#def-CT-log)，以取得 [SCT](#def-SCT)。預憑證與它對應的憑證不會相同，因此憑證透明度紀錄可能會將兩者都記錄下來。[RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} HTTP 公鑰固定。要求瀏覽器在載入網頁時，使用特定公鑰來驗證網站[憑證鏈](#def-chain)的安全機制。Chrome 引入這個機制來應對 CA 被入侵時的狀況，但它會導致網站無法被訪問，因此後來 Chrome [移除了這項機制](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8)。[維基百科](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}


{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} 公共後綴列表。由 Mozilla 所維護的列表，列表中記錄可供註冊的網域名稱。例如：`com` 和 `co.uk` 都屬於公共後綴網域名稱，雖然 `co.uk` 不屬於[頂級域名](#def-TLD)。網頁瀏覽器使用這個列表和其他的方法，以避免不同的網站共享 cookies。[Let's Encrypt](#def-LE) 也使用了這個列表來計算是否達到速率限制：[{{< relref "/rate-limits" >}}]({{< relref "/rate-limits" >}})。 https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} 信任方。依賴憑證資訊的人。例如：訪問 HTTPS 網站的人就是信任方。{{% /def %}}

{{% def id="revocation" name="Revocation" %}} 註銷。對於一張憑證，除非 [CA](#def-CA) 註銷它，不然在憑證過期之前一直有效。憑證可能因為不同原因而被註銷，例如：憑證的私鑰洩漏。瀏覽器會使用 [CRL](#def-CRL)來檢查憑證是否被註銷、[OCSP](#def-OCSP) 或其他新方法像是 [OnceCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/)。請注意，[有些狀況下註銷憑證對瀏覽器沒有影響](https://www.imperialviolet.org/2011/03/18/revocation.html)。 [{{< relref "/docs/revoking" >}}]({{< relref "/docs/revoking" >}}) {{% /def %}}

{{% def id="root" name="Root certificate" %}} 根憑證。由[憑證頒發機構](#def-CA)所控制的[自簽](#def-self-signed)憑證，它用來頒發[中間憑證](#def-intermediate)，以及儲存在客戶端或作業系統中的[憑證儲存倉庫](#def-store)中。[維基百科](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} 根憑證政策。客戶端軟體開發機構的政策，用來決定哪些根憑證可以被放入[憑證儲存倉庫](#def-store)，被包含憑證儲存倉庫的憑證，其憑證頒發機構就會被該軟體所信任。{{% /def %}}

{{% def id="RSA" abbr="RSA" %}} 一個公開金鑰的演算法，用來加密和替數位憑證簽名。[維基百科](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} 自簽憑證。一張由自己私鑰簽名的憑證，這張憑證的[主體](#def-subject)和[頒發者](#def-issuer)是相同的。自簽憑證僅會受到現實世界中的約定而受信任，例如：被加入到[憑證儲存倉庫](#def-store)中。[根憑證](#def-root) 就是一個自簽憑證。[維基百科](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} 伺服器名稱指示。[TLS](#def-TLS) 協定下的一個欄位。在 TLS 交握過程中，[使用者代理](#def-user-agent)透過 SNI 告訴伺服器要連接的網域名稱。這使得在同一個 IP 下有許多網域名稱的伺服器，可以回應相對應的[憑證](#def-leaf)。網頁伺服器可以依據客戶端指名的 SNI 回應不同憑證和網頁內容。SNI 並沒有被加密，因此產生了目前正在實驗階段的 ESNI。[維基百科](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} 憑證簽名時間戳記。由[憑證透明度紀錄](#def-CT-log)提供，以驗證憑證頒發紀錄的簽名。瀏覽器會在網頁提供憑證，或 [TLS](#def-TLS) 交握時，執行 [CT](#def-CT) 檢查是否有 SCTs，並拒絕連結到不符合憑證透明度紀錄的網站。憑證透明度使得欺騙性或錯誤頒發的憑證更容易被檢驗出來。https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} [TLS](#def-TLS) 協定的前身，SSL 目前依然被廣泛地使用。{{% /def %}}

{{% def id="staging" name="Staging" %}} 開發環境。[Let's Encrypt](#def-LE) 提供一個開發環境的 API 讓你測試憑證請求，以避免達到速率限制。由測試環境所申請的憑證 *不會* 被大眾信任。開發環境僅用於測試、除錯以及 ACME 客戶端軟體的開發。[{{< relref "/docs/staging-environment" >}}]({{< relref "/docs/staging-environment" >}}) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} 主體別名。一個憑證擴展中的欄位，用來指名哪些網域可以使用這張憑證。它取代了[通用名稱](#def-CN)欄位，目前通用名稱僅因相容性而添加。一個憑證中可以包含許多的主體別名，讓不同網域名稱使用它。[維基百科](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} 訂閱者或使用者。請求憑證的人或機構。{{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} 頂級域名。在網域名稱分級中最上層的域名。例如國家級頂級域名：`.de`（德國）和 `.cn`（中國）；以及通用頂級預名：`.com` 和 `.org`。[維基百科](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} 傳輸層安全協定。TLS 協定使用 HTTPS 來加密及驗證你與網頁之間的連線。{{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} [DANE](#def-DANE) 協定中的一部分，通常用來驗證 [TLS](#def-TLS) 協定的連線。{{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} 整合通訊憑證。表示一張含有[主體別名](#def-SAN)欄位的憑證。 {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} 網頁瀏覽器。一種用來顯示網頁的[使用者代理](#def-user-agent)軟體。例如：*Mozilla Firefox* 、 *Google Chrome* 或 *Internet Explorer* 。[維基百科](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} 使用者代理。通稱有能力與[網頁伺服器](#def-web-server)溝通的軟體。例如：[網頁瀏覽器](#def-web-browser)或 [cURL](https://en.wikipedia.org/wiki/CURL)。{{% /def %}}

{{% def id="web-server" name="Web server" %}} 網頁伺服器。提供網頁服務的軟體，廣義上也可以指運行該軟體的硬體本身。[維基百科](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} 萬用字元憑證。可用於一級子域名下的憑證。例如：在憑證中的 [SAN](#def-SAN) 欄位中填入 `*.example.com`，表示該憑證可用於 `blog.example.com` 和 `www.example.com`，但是不可用於 `bork.bork.example.com` 或 `example.com`。在子域名中使用星星符號 (*) 來表示萬用字元。[Let's Encrypt](#def-LE) [自從 2018 年 3 月支援萬用字元憑證的申請](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579)。[維基百科](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} 定義了公開金鑰憑證格式的標準。[維基百科](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
