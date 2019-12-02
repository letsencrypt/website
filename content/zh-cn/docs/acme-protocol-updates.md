---
title: ACME 协议更新日志
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2019-10-07
---

{{< lastmod >}}

[IETF标准化的](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html)ACME协议[RFC 8555](https://datatracker.ietf.org/doc/rfc8555/)是 Let's Encrypt 工作原理的基石。它目前是一份标准草案，尚未最终标准化为 RFC。随着协议规范的不断发展，Let's Encrypt 将使用 ACME 的更新版本。我们这样做是因为安全性是我们的主要关注点，而紧接着几乎同样重要的时向后兼容性。

# 目前使用的 API 端点

我们目前有以下 API 端点。请参阅[我们的分歧文档](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，以比较其实现与当前的 ACME 标准。

## ACME v2 (RFC 8555)

* [生产环境] `https://acme-v02.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (已弃用)

* [生产环境] `https://acme-v01.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging.api.letsencrypt.org/directory`

# 向后兼容的 ACME 新功能

Let's Encrypt 可能会不时地为现有 API 端点实现向后兼容的新功能。通常我们引入向后兼容的新功能是因为我们决定实现之前未实现的部分 ACME 规范。

当现有 API 端点引入新功能时，这些功能一定已经在公开的 ACME 规范中写明，并且不会影响正确实现规范的客户端。

# ACME 的新版本与不兼容的变更

我们不打算对ACME功能进行重大更改，但是如果我们认为这样做很重要，我们将努力在足够的时间内平稳过渡，并尽可能提前进行沟通。 如果需要进行重大更改，系统管理员应保持将及时更新部署到其ACME客户端的能力。
