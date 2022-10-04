---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# 什么是 `lencr.org`?

`lencr.org` 是由 Let's Encrypt 拥有的一个域名。 我们使用它来托管我们颁发的证书中引用的数据。

我们曾经使用较长的 URL，例如 `http://ocsp.int-x3.letsensencrypt.org/`。 然而， 当我们在发布 [新的根证书和中间证书][1]时，我们想要 使它们尽可能小一些。 Web 上的每个HTTPS连接 (每天数十亿) 必须发送证书副本，因此每个字节都很重要。 我们选择 `lencr.org` 因为它与我们的名称相似： **L**et's **ENCR**ypt。 它的发音很像 Terry Pratchett 的 _Discworld_ 小说中名为 [Lancle][] 的虚构区域。

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancle]: https://wiki.lspace.org/Lancre
