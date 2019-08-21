---
title: Let's Encrypt運作方式
slug: how-it-works
top_graphic: 3
lastmod: 2018-06-24
---

Let's Encrypt和[ACME協議](https://ietf-wg-acme.github.io/acme/)的目標是使自動獲取受信任的HTTPS證書，配置網路伺服器成為可能。這是透過在網站伺服器上運行證書管理軟體（Agent）來達成的。

為了理解該技術的工作原理，讓我們來看一下使用支持Let's Encrypt的證書管理軟體（Agent）來設置`https://example.com/`的流程。

該流程分為兩步。 首先，管理軟體向證書頒發機構證明該伺服器擁有域名的所有權（HTML/HTTP方面）。之後，該管理軟體就可以申請/續期/吊銷該域名下的證書。

## 域名認證

Let's Encrypt通過公鑰識別伺服器管理員。 證書管理軟體（Agent）首次與Let's Encrypt交互時，會生成新的密鑰對，並向Let's Encrypt CA證明伺服器控制一個或多個域。 這類似於創建帳戶和向該帳戶添加域名的傳統證書頒發流程。

為了啟動該過程，證書管理軟體（Agent）向Let's Encrypt CA詢問它需要做什麼才能證明它控制`example.com`。 Let's Encrypt CA將查看所請求的域名並發出一組或多組挑戰。 這些是管理軟體（Agent）可以證明對域名的控制的不同方式。例如，CA可能會讓證書管理軟體（Agent）選擇： 
* 在`example.com`下配置DNS記錄，或者
* 在`https://example.com/`的已知URI下放置HTTP資源（通常為文件）

除了驗證之外，Let's Encrypt CA還提供了一個nonce（特殊密鑰）要求證書管理軟體（Agent）使用自身掌控的帳戶私鑰簽名，以證明對密鑰對的控制權。

<div class="howitworks-figure">
<img alt="請求挑戰以驗證example.com所有權"
     src="/images/howitworks_challenge.png"/>
</div>

證書管理軟體（Agent）需要完成所提供的一組挑戰。假設它能夠完成上面的第二個任務：它在`https：// example.com`站點上的指定路徑上創建一個文件。證書管理軟體（Agent）還使用其私鑰對提供的nonce（特殊密鑰）進行簽名。完成這些步驟後，證書管理軟體（Agent）會通知CA它已準備好完成驗證。

然後，CA的工作就是檢查挑戰是否已經被完成。 CA會驗證nonce（特殊密鑰）上的簽名，並嘗試從網站伺服器下載該文件，並確保其具有CA需要的內容。

<div class="howitworks-figure">
<img alt="請求代表example.com完成授權"
     src="/images/howitworks_authorization.png"/>
</div>

如果nonce上的簽名有效，並且挑戰也成功完成，那麼由公鑰代表的證書管理軟體（Agent）將被授權對`example.com`進行證書管理。 我們將證書管理軟體（Agent）使用的密鑰對稱為`example.com`的“授權密鑰對”。


## 證書頒發和吊銷

一旦代理具有授權密鑰對，請求，更新和撤銷證書很簡單 - 只需發送證書管理消息並使用授權密鑰對對其進行簽名。

為了獲得能在該域名使用的證書，證書管理軟體（Agent）將創建一個PKCS#10[證書籤名請求（CSR）](https://tools.ietf.org/html/rfc2986) 要求Let's Encrypt CA為`example.com`指定的公鑰頒發證書。通常，CSR中包括與CSR中的公鑰對應的私鑰的簽名。證書管理軟體（Agent）還使用`example.com`的授權密鑰簽署整個CSR，以便Let's Encrypt CA知道它已獲得授權。

當Let's Encrypt CA收到請求時，它會驗證這兩個簽名。如果一切正確，CA將用CSR中的公鑰為`example.com`頒發證書，並將文件發送回證書管理軟體(Agent)。

<div class="howitworks-figure">
<img alt="為example.com申請證書"
     src="/images/howitworks_certificate.png"/>
</div>

申請吊銷證書的流程類似。 證書管理軟體（Agent）使用`example.com`的授權密鑰對簽署一個吊銷請求，Let's Encrypt CA將驗證該請求是否是合法請求（是否被允許）。如果該請求合法，則將吊銷訊息發布到正常的吊銷通道（即OCSP）中，以便瀏覽器等依賴方知道他們不應該接受已被吊銷的證書。

<div class="howitworks-figure">
<img alt="申請吊銷example.com的證書流程"
     src="/images/howitworks_revocation.png"/>
</div>
