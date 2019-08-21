---
title: ACME協議更新日誌
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2018-04-27
---

{{< lastmod >}}

ACME協議是Let's Encrypt工作原理的基石。 它目前是標準草案，尚未最終確定RFC。 隨著協議規範的不斷發展，Let's Encrypt將使用ACME的更新版本。 這樣做是因為安全性是我們的主要關注點，緊接著是向後相容性。

# 目前使用的ACME版本

我們目前有以下API端點。 他們沒有實施ACME規範的任何一個固定草案，因為它們在與協議草案文件一起發展。 請參閱[我們的分歧文件](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，將其實施與當前的ACME草案進行比較。

## ACME v1

* [生產環境] `https://acme-v01.api.letsencrypt.org/directory`
* [測試環境] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [生產環境] `https://acme-v02.api.letsencrypt.org/directory`
* [測試環境] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# 新的向後相容ACME功能

Let's Encrypt可能會不時地為現有API端點實現新的向後相容功能。我們通常引入新的向後相容功能是因為我們已決定實施之前未實現的部分ACME規範。

當新功能在現有API端點安裝時，這些功能將始終在公共ACME規範中明確寫明，並且不會影響當前已經正常工作的用戶端。

# ACME安全修補

如果我們意識到ACME協議存在嚴重的安全問題（而不僅僅是我們的部署），我們可能會被迫對我們的API端點進行無法向後相容的更改，或者停止現有端點的運行並引入新端點。

ACME已經過許多方面的審核並成功用於生產，但總有可能存在未發現的漏洞。 系統管理員應保持及時更新ACME用戶端以保持響應此類漏洞的能力。

# ACME的新版本與突破性變化

當我們認為必須使用包含重大更改的新版ACME協議時，我們將透過設置新的API端點並將其與舊版本的端點並行維護。 在提供新版本後，我們會提前向所有用戶傳達棄用時間表。

這種情況不會經常發生，因為即使有足夠的時間過渡，破壞向前相容性也是很可怕的一件事。 但是，一旦IETF完成[ACME協議標準化](https://datatracker.ietf.org/wg/acme/charter/)，我們就會進行此操作。我們目前正在實施ACET的IETF預標準化版本，但是在可行的情況下我們一定會使用正式協議。
