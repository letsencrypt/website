---
title: 憑證相容性
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
show_lastmod: 1
---


Let's Encrypt 盡力地在不影響安全性的前提下相容各種軟體。一個平台是否能驗證 Let's Encrypt 的憑證，主要取決於平台的憑證信任倉庫中是否包含 IdenTrust DST Root X3 憑證。另外平台也得支援 [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) 憑證，因為 Let's Encrypt 所有的憑證都使用 SHA-2。

如果你的憑證僅在一部分而不是全部的"相容軟體"運作，那可能表示你的網頁伺服器設定有誤。如果你在較新的系統中遇到問題，常見的原因是網頁伺服器沒有提供正確的憑證鏈。如果你在較舊的系統中遇到問題，例如：Windows XP，常見的原因是該平台不支援加密演算法套件或 TLS 版本，或是平台缺乏伺服器名稱指示 (Server Name Indication, SNI)。你可以使用 [SSL Labs 的測試網站](https://www.ssllabs.com/ssltest/)來測試伺服器的憑證相相容性。如果這樣還是無法找到問題發生的原因，請向我們的[社群論壇](https://community.letsencrypt.org/)尋求幫助。


你可以在[論壇的這篇討論中](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)取得更多有關憑證相容性的資訊。

# 相容軟體

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer on Windows XP SP3 and higher
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 on macOS
* Safari on iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* PS4 game console with firmware >= 5.00

# 不相容的軟體

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP prior to SP3
  * cannot handle SHA-2 signed certificates
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (2012 mail client, not webmail)
  * cannot handle certificates without a CRL
* PS3 game console
* PS4 game console with firmware < 5.00
