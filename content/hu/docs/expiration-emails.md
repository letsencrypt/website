---
title: Lejáratról szóló e-mailek
slug: expiration-emails
date: 2016-07-02
lastmod: 2020-10-28
show_lastmod: 1
---


# Feliratkozás

Ha a fiók létrehozásakor megad egy e-mail címet a Let's Encryptnek, automatikusan küldünk Önnek értesítést a lejáratról, amikor a tanúsítványa megújítása közeledik. Az első értesítést 20 nappal a tanúsítvány lejárta előtt küldjük, további értesítéseket pedig 10 nappal és 1 nappal a lejárat előtt.

# Amikor lejáratról szóló e-mailt kap

Ha a tanúsítványa már megújult, nem küldünk értesítést a lejáratról. Egy tanúsítványt megújítottnak tekintünk, ha létezik egy újabb tanúsítvány pontosan ugyanazzal a névkészlettel, függetlenül attól, hogy melyik fiók hozta létre. Ha olyan új tanúsítványt állított ki, amely hozzáad vagy eltávolít egy nevet a régi tanúsítványhoz képest, akkor lejárati e-mailt kap a régi tanúsítványról. Ha ellenőrzi a webhelyén jelenleg futó tanúsítványt, és az a helyes dátumot mutatja, nincs szükség további lépésekre.

# Leiratkozás

Az e-mailben található egy link, amellyel leiratkozhat a jövőbeni értesítésekről. Ha erre a linkre kattint, a következő évben nem kap semmilyen lejárati értesítést. A "leiratkozottak" listája független a Staging értesítéseknél és a Production értesítéseknél, így nyugodtan leiratkozhat a Stagingről anélkül, hogy ez befolyásolná a Production értesítéseket.

Ne feledje, hogy a leiratkozás csak egy évig érvényes, így azt minden évben meg kell újítania.

Még nem áll módunkban hatékonyan újra feliratkoztatni Önt, ha leiratkozik. Az e-mail szolgáltatónk, a Mandrill [egy manuális mechanizmussal rendelkezik, amelyet még automatizálnunk kell](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Megváltoztathatja azonban a fiókjában megadott e-mail címet, amivel gyakorlatilag újra feliratkozik. Sok elterjedt e-mail szolgáltató ugyanúgy kezeli a `yourname+1@example.com` címet, mint a `yourname@example.com` címet. Tehát ha frissíti az e-mail címét `yourname+1@example.com`-ra, akkor újra elkezdheti kapni a lejárati e-mail értesítéseket. Certbot használatával:

`certbot update_account --email yourname+1@example.com`
