---
title: ACME kliens implementációk
slug: client-options
lastmod: 2020-12-18
---

{{< clientslastmod >}}

A Let's Encrypt az ACME protokollt használja, annak ellenőrzésére, hogy Ön rendelkezik-e egy adott domain név felett, és hogy tanúsítványt állítson ki Önnek. A Let's Encrypt tanúsítvány megszerzéséhez ki kell választania egy ACME kliensszoftvert.

Az alábbi ACME klienseket harmadik féltől származnak. A Let's Encrypt nem ellenőrzi vagy vizsgálja a harmadik féltől származó klienseket, és nem tud garanciát vállalni azok biztonságára vagy megbízhatóságára.

Elérhető néhány böngészőbe épített ACME kliens, de ezeket itt nem soroljuk fel, mert a megújítás kézi munkafolyamatát ösztönzik, ami rossz felhasználói élményt eredményez, és növeli a kihagyott megújítások kockázatát.

# Ajánlott: Certbot

Azt javasoljuk, hogy a legtöbben a [Certbot](https://certbot.eff.org/) klienssel kezdjék. Egyszerűen megszerezheti Önnek a tanúsítványt, vagy segíthet a telepítésben, attól függően, hogy Ön mit szeretne. Könnyen használható, számos operációs rendszeren működik, és nagyszerű dokumentációval rendelkezik.

Ha a Certbot nem felel meg az Ön igényeinek, vagy egyszerűen csak szeretne valami mást kipróbálni, az alábbiakban további kliensek közül választhat, nyelv vagy környezet szerint csoportosítva.

# Egyéb kliens lehetőségek

Az alábbi kliensek mindegyike támogatja az ACMEv2 API-t ([RFC 8555](https://tools.ietf.org/html/rfc8555)). Hamarosan teljesen [megszüntetjük az ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/) támogatását. Ha már használja az alábbi kliensek valamelyikét, mindenképpen frissítsen a legújabb verzióra. Ha az Ön által használt kliens nem szerepel az alábbi listában, lehet, hogy nem támogatja az ACMEv2-t. Ebben az esetben javasoljuk, hogy lépjen kapcsolatba a projekt karbantartóival, vagy váltson másik kliensre.

{{< clients libraries="Libraries" projects="Projects integrating with Let's Encrypt" >}}

A Python [acme](https://github.com/certbot/certbot/tree/master/acme) modul a Certbot része, de számos más kliens is használja, és önálló csomagként is elérhető [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) és más disztribúciókban.

{{< /clients >}}

# Kliens/projekt hozzáadása

Ha tud egy olyan ACME kliensről vagy projektről, amely integrálódott a Let's Encrypt ACMEv2 API-jával, amely nem szerepel a fenti oldalon, kérjük, küldjön egy pull requestet a [weboldalunk repository-jába](https://github.com/letsencrypt/website/) GitHubon, a `data/clients.json` fájlt frissítve.

A pull request benyújtása előtt kérjük, győződjön meg a következőkről:

1. A kliens tiszteletben tartja a [Let's Encrypt védjegypolitikáját](/trademarks).
1. A kliens nem böngészőalapú, és támogatja az automatikus megújításokat.
1. A commitja hozzáadja a kliensét a megfelelő szakaszok **végéhez ** (ne felejtse el az "acme_v2"-t, amennyiben szükséges!).
1. A commitja frissíti a `lastmod` dátumbélyeget a `clients.json` tetején.
