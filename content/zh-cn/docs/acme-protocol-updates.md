---
title: ACME 协议更新
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2016-07-27
---

{{< lastmod >}}

作为Let's Encrypt工作的基础。ACME协议目前仍是一个草案，而非最终的RFC标准。随着ACME协议的发展，Let's Encrypt将使用其最新版本。等那个时候，安全性将是我们主要关心的问题，其次是向后兼容性。

# 当前实现的ACME版本

当前，我们有如下两套API. 由于ACME协议仍在不断地进化发展，这两套API都没有完整地实现某个版本的ACME规范草案。如果想了解这些API的实现和当前ACME草案的区别，请查询我们的[ACME差异文档](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md).

## ACME v1

* [生产环境] `https://acme-v01.api.letsencrypt.org/directory`
* [隔离环境] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [生产环境] `https://acme-v02.api.letsencrypt.org/directory`
* [隔离环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# 新的向后兼容ACME特性

Let's Encrypt将不时地为现有的API引入新的向后兼容特性。通常，当我们决定要实现一些此前没有实现的ACME规范时，我们会引入新的向后兼容特性。

当新的特性被引入现存在的API中时，我们总会在一份公共的ACME规范中对该特性做显式的说明，且不会影响运行正常的客户端。

# ACME 安全补丁

如果我们在ACME协议层面（而不仅仅是协议的某个实现）发现严重的安全问题，我们可能被迫对API进行破坏性地修改（会影响兼容性），或者停止维护现有的API并引进一套新的API。

ACME已经通过了多个组织的审查，并在生产过程中成功应用，但是仍然可能存在没有被发现的漏洞。系统管理员应该具有随时更新ACME客户端的能力，以应对这些漏洞。

# 剧变中的ACME

当我们认为有必要去实现某个有重大变更的ACME版本时，我们将引入一套新的API，并同时维护旧的API。在新的API可用之后，我们将把老版本API的弃用计划告知所有用户。

由于负担实在过于沉重，所以即使有足够的时间进行过渡调整，这种破坏兼容性的变更操作也不会经常发生。然而，一旦IETF完成了[标准的ACME规范](https://datatracker.ietf.org/wg/acme/charter/)，我们必然会进行此类变更。目前，我们使用的是“准”IETF标准版的ACME，如果可能的话，我们认为应尽量使用正式的标准。
