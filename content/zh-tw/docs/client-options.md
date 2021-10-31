---
title: ACME 客戶端
slug: client-options
top_graphic: 1
lastmod: 2019-05-24
---

{{< clientslastmod >}}

Let's Encrypt 使用 ACME 協定，來驗證你所申請憑證中的網域控制權。為了取得 Let's Encrypt 憑證，你需要選擇一個 ACME 客戶端軟體。

下列的 ACME 客戶端由第三方提供，Let's Encrypt 沒有權控制或審核他們，因此我們沒有辦法保證他們安全與可靠性。

你也可以選擇網頁版的 ACME 客戶端，但是我們沒有在這裡列出來，因為使用手動更新的工作流程，可能會造成不好的使用者經驗，並且增加憑證過期的風險。

# 推薦使用：Certbot

我們推薦你大多數人所使用的客戶端 [Certbot](https://certbot.eff.org/)。它可以替你取得並安裝憑證；它的操作簡單、適用於多個作業系統，並且有完整的文檔。

如果 certbot 不符合你的需求，或是你想嘗試使用其它的客戶端，那麼你可以選擇下方所列出的客戶端，我們按照程式語言或使用環境分類。

{{< clients acme_v2="相容 ACME v2 的客戶端" libraries="Libraries" projects="整合了 Let’s Encrypt 的專案" >}}

Python 模組 [acme](https://github.com/certbot/certbot/tree/master/acme) 是 Certbot 的一部分，但它也被其他許多客戶端所使用，請且在 [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) 和其他的 Linux 版本中作為獨立軟體提供。

{{< /clients >}}

# 加入你所開發的客戶端或專案

如果你發現 ACME 客戶端或專案整合了 Let's Encrypt，但是沒有出現在列表中，請在本[網站的 Github](https://github.com/letsencrypt/website/) 中，更新 `data/clients.json` 檔案，並透過提出 pull request 告知我們。


在你提出 pull request 之前，請先確認：

1. 你的客戶端尊重 [Let's Encrypt 商標](https://www.abetterinternet.org/trademarks)
1. 你的客戶端不是使用網頁版，並且支援自動更新憑證
1. 請將你的客戶端名稱透過添加到該分類的**最後面**（如果該軟體支援 ACMEv2 協定，別忘了添加 "acme_v2"）
1. 請將 `clients.json` 文件上方中的 `lastmod` 日期更新
