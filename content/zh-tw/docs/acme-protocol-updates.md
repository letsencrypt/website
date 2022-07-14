---
title: ACME 協定更新紀錄
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---


[IETF 標準](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html)下的 ACME 協定，[RFC 8555](https://datatracker.ietf.org/doc/rfc8555/)，是 Let's Encrypt 運作的基石。

# API Endpoints

目前我們有以下的 API endpoint。請參閱我們的[文檔](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，以比較實作與當前標準的差異。

## ACME v2 (RFC 8555)

* [上線環境] `https://acme-v02.api.letsencrypt.org/directory`
* [測試環境] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (標準已棄用)

* [上線環境] `https://acme-v01.api.letsencrypt.org/directory`
* [測試環境] `https://acme-staging.api.letsencrypt.org/directory`

# 向後相容的 ACME 新功能

Let's Encrypt 經常替現有的 API 添加向後相容的新功能，因為我們想添加在 ACME 規範中提及但尚未實作的功能。

當現有 API 加入新功能時，這些功能一定已經在 ACME 公開標準中提到，並且不會影響正確實作標準的客戶端。


# 具有重大變更的 ACME 新版本

我們目前沒有 ACME 重大變更的計畫，不過如果有必要進行重大變更，我們會盡可能的提前告知，並且讓你有足夠的時間反應。當必要的重大變更發生時，系統管理者必須有能力及時更新 ACME 客戶端。