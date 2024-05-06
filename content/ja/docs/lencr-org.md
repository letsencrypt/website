---
title: lencr.org
slug: lencr.org
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# lencr.org とは何ですか？

`lencr.org` は Let's Encrypt が所有するドメインです。 Let's Encrypt では、 OCSP、CRL、発行者証明書 (issuer certificates)、つまり、証明書に現れるすべての URL をホストするためにこのドメインを使用しています。

以前は `http://ocsp.int-x3.letsencrypt.org/` のような長いURLを使用していました。 しかし、[新しいルート証明書と中間証明書][1]を発行したとき、できるだけ短いものにしたいと考えました。 ウェブ上のすべての HTTPS 接続 (1日あたり数10億) は、必ず証明書のコピーを送信する必要があるので、1バイトにも重みがあります。 Let's Encrypt という名前との似ていることから、`lencr.org` このドメインを選びました。**L**et's **ENCR**ypt です。 私たちは、Terry Pratchett の _Discworld_ 小説の架空の地域である [Lancre][] のように発音しています。

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
