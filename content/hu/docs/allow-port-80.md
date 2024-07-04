---
title: Best Practice - Tartsa nyitva a 80-as portot
slug: allow-port-80
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Időnként kapunk jelentéseket olyan emberektől, akiknek gondot okoz a HTTP-01 kihívástípus használata, mivel a 80-as portot tűzfallal zárták le a webszerverükről. Azt ajánljuk, hogy minden általános webes használatra szánt szerver mind a 80-as porton HTTP-t, mind a 443-as porton HTTPS-t engedélyezzen. Továbbá átirányítást kell küldeniük minden 80-as porton érkező kérésre, és esetleg egy HSTS fejlécet (a 443-as porton érkező kérésekre).

A 80-as port engedélyezése nem jelent nagyobb támadási felületet a szerveren, mivel a 80-as porton érkező kéréseket általában ugyanaz a szoftver szolgálja ki, amely a 443-as porton fut.

A 80-as port lezárása nem csökkenti a kockázatot annak, aki véletlenül HTTP-n keresztül látogatja meg a webhelyét. Normál körülmények között ez a személy átirányítást kapna HTTPS-re, és a későbbi forgalma védve lenne. Ha ez a személy aktív MITM-nek lenne kitéve, a MITM a 80-as porton válaszolna, így az Ön webhelyének soha nem lenne esélye a "kapcsolat megtagadva" válaszra.

Végül, a 80-as port nyitva tartása az átirányításhoz, segít az embereket a webhely megfelelő verziójára (a HTTPS verzióra) irányítani. Számos, Ön által nem befolyásolható helyzet van, amely miatt valaki rövid időre az Ön webhelyének HTTP-verziójára kerülhet - például az automatikus linkelés az e-mailekben, vagy a domainnév kézzel történő beírása. Jobb, ha átirányítást kapnak, mint hibát.

Sajnos előfordulhat, hogy nem tudja befolyásolni, hogy a 80-as port engedélyezve van-e a weboldalán. Egyes (főleg lakossági) internetszolgáltatók különböző okokból blokkolják a 80-as portot. Ha az internetszolgáltatója ezt teszi, de mégis szeretne tanúsítványokat kapni a Let's Encrypt-től, két lehetősége van: Használhatja a DNS-01 kihívásokat, vagy [az egyik olyan klienst, amely támogatja a TLS-ALPN-01 kihívásokat](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (a 443-as porton).
