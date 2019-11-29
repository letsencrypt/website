---
title: ACME 协议更新日志
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2018-04-27
---

{{< lastmod >}}

ACME 协议是 Let's Encrypt 工作原理的基石。它目前是一份标准草案，尚未最终标准化为 RFC。随着协议规范的不断发展，Let's Encrypt 将使用 ACME 的更新版本。我们这样做是因为安全性是我们的主要关注点，而紧接着几乎同样重要的时向后兼容性。

# 目前使用的 ACME 版本

我们目前有以下 API 端点。他们没有使用 ACME 规范的任何一个固定草案，因为它们在与协议草案文件一起发展。请参阅[我们的分歧文档](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，以比较其实现与当前的 ACME 草案。

## ACME v1

* [生产环境] `https://acme-v01.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [生产环境] `https://acme-v02.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# 向后兼容的 ACME 新功能

Let's Encrypt 可能会不时地为现有 API 端点实现向后兼容的新功能。通常我们引入向后兼容的新功能是因为我们决定实现之前未实现的部分 ACME 规范。

当现有 API 端点引入新功能时，这些功能一定已经在公开的 ACME 规范中写明，并且不会影响正确实现规范的客户端。

# ACME 安全性修补

如果我们意识到 ACME 协议（而不仅仅是我们的实现）存在严重的安全问题，我们可能会被迫对我们的 API 端点进行无法向后兼容的更改，或者停用现有端点并引入新端点。

ACME 已经过许多方面的审核并成功用于生产环境，但总有可能存在未发现的漏洞。系统管理员应确保能够及时更新 ACME 客户端以应对此类漏洞。

# ACME 的新版本与不兼容的变更

当我们认为必须使用包含不兼容的更改的新版 ACME 协议时，我们将设置新的 API 端点并将其与旧版本的端点并行维护。在提供新版本后，我们会提前向所有用户传达弃用时间表。

这种情况不会经常发生，因为即使有足够的时间过渡，破坏兼容性也是很可怕的一件事。但是，一旦 IETF 完成 [ACME 协议的标准化](https://datatracker.ietf.org/wg/acme/charter/)，我们就会进行此操作。我们目前正在使用未被 IETF 标准化的 ACME 版本，而我们认为在可行的情况下使用正式标准非常重要。
