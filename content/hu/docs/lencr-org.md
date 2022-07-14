---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Mi a lencr.org?

`lencr.org` a Let's Encrypt tulajdonában lévő domain. OCSP, CRL-ek és kibocsátói tanúsítványok (az összes URL, amely a tanúsítványokban megjelenik) tárolására használjuk.

Régebben hosszabb URL-címeket használtunk, például `http://ocsp.int-x3.letsencrypt.org/`. Azonban, amikor kiállítottuk az [új root és intermediate tanúsítványainkat][1], azt akartuk, hogy azok a lehető legkisebbek legyenek. Minden HTTPS-kapcsolatnak a weben (milliárdok naponta) el kell küldenie a tanúsítvány egy másolatát, így minden byte számít. Azért választottuk a `lencr.org` címet, mert hasonlít a nevünkhöz: **L**et's **ENCR**ypt. Úgy ejtjük ki, mint [Lancre][] fiktív régióját Terry Pratchett _Discworld_ regényében.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
