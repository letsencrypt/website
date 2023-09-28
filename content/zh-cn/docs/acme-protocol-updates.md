---
title: ACME 协议更新日志
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---


作为一项 [IETF 标准](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html)，[RFC 8555](https://datatracker.ietf.org/doc/rfc8555/) 定义的 ACME 协议是 Let's Encrypt 的运作基石。

# 目前使用的 API 端点

我们目前运营的 API 网址如下。 另请查阅[我们的实现差异文档](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，了解这些接口与 ACME 标准规范之间存在的不同。

## ACME v2 (RFC 8555)

* [生产环境] `https://acme-v02.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (已弃用)

* [生产环境] `https://acme-v01.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging.api.letsencrypt.org/directory`

# 向后兼容的 ACME 新功能

Let's Encrypt 会不定期在现有接口中实现向后兼容的新功能， 目的通常是改善对 ACME 规范的支持。

所有新功能都会在 ACME 的公开文档中明确记载，并且不会对实现得当的客户端造成任何不良影响。

# ACME 的新版本与不兼容的变更

我们力图避免破坏 ACME 协议的兼容性，但如果经过考量确有必要，我们会尽可能提前告知，并确保在足够长的时间内平缓完成过渡。 为应对此类不兼容的变更，各位系统管理员应当具备及时更新 ACME 客户端的能力。
