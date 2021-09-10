---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
untranslated: 1
show_lastmod: 1
---


# lencr.org 是什么?

`lencr.org` 是 `Let's Encrypt` 拥有的域名。 我们使用它来托管 OCSP、CRL 和颁发者证书：证书中显示的所有网址。 
我们过去都在使用长的域名，像这样 `http://ocsp.int-x3.letsencrypt.org/` 。
但是，当我们颁发新的根证书和中间证书时，我们希望它们尽可能短小。
网络上的每个 HTTPS 连接（每天数十亿次）都必须发送一份证书副本，因此每个字节都很重要。
我们之所以选择它，是因为它与我们的名字相似：**L**et's **ENCR**ypt。 我们的发音很像 Terry Pratchett 的 _Discworld_ 小说中虚构的 [Lancre] 地区。

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
