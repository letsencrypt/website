---
title: ACME协议更新日志
slug: acme-protocol-updates
top_graphic: 1
date: 2016-07-27
lastmod: 2018-04-27
---

{{< lastmod >}}

ACME协议是Let's Encrypt工作原理的基石。 它目前是标准草案，尚未最终确定RFC。 随着协议规范的不断发展，Let's Encrypt将使用ACME的更新版本。 这样做是因为安全性是我们的主要关注点，紧接着是向后兼容性。

# 目前使用的ACME版本

我们目前有以下API端点。 他们没有实施ACME规范的任何一个固定草案，因为它们在与协议草案文件一起发展。 请参阅[我们的分歧文档](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)，将其实施与当前的ACME草案进行比较。

## ACME v1

* [生产环境] `https://acme-v01.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging.api.letsencrypt.org/directory`

## ACME v2

* [生产环境] `https://acme-v02.api.letsencrypt.org/directory`
* [测试环境] `https://acme-staging-v02.api.letsencrypt.org/directory`

https://letsencrypt.org/2017/06/14/acme-v2-api.html

# 新的向后兼容ACME功能

Let's Encrypt可能会不时地为现有API端点实现新的向后兼容功能。我们通常引入新的向后兼容功能是因为我们已决定实施之前未实现的部分ACME规范。

当新功能在现有API端点安装时，这些功能将始终在公共ACME规范中明确写明，并且不会影响当前已经正常工作的客户端。

# ACME安全修补

如果我们意识到ACME协议存在严重的安全问题（而不仅仅是我们的部署），我们可能会被迫对我们的API端点进行无法向后兼容的更改，或者停止现有端点的运行并引入新端点。

ACME已经过许多方面的审核并成功用于生产，但总有可能存在未发现的漏洞。 系统管理员应保持及时更新ACME客户端以保持响应此类漏洞的能力。

# ACME的新版本与突破性变化

当我们认为必须使用包含重大更改的新版ACME协议时，我们将通过设置新的API端点并将其与旧版本的端点并行维护。 在提供新版本后，我们会提前向所有用户传达弃用时间表。

这种情况不会经常发生，因为即使有足够的时间过渡，破坏向前兼容性也是很可怕的一件事。 但是，一旦IETF完成[ACME协议标准化](https://datatracker.ietf.org/wg/acme/charter/)，我们就会进行此操作。我们目前正在实施ACET的IETF预标准化版本，但是在可行的情况下我们一定会使用正式协议。
