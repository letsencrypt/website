---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Was ist lencr.org?

`lencr.org` ist eine Domain, die Let's Encrypt gehört. Wir verwenden sie zum Hosten von OCSP, CRLs und Aussteller-Zertifikaten: alle URLs, die in Zertifikaten angezeigt werden.

Wir haben längere URLs wie `http://ocsp.int-x3.letsencrypt.org/` verwendet. Aber als wir unsere [neuen Root- und Zwischenzertifikate][1] ausstellten, wollten wir sie so klein wie möglich machen. Jede HTTPS-Verbindung im Internet (Milliarden pro Tag) muss eine Kopie eines Zertifikats senden, daher ist jedes Byte wichtig. Wir haben `lencr.org` wegen der Ähnlichkeit mit unserem Namen gewählt: **L**et's **ENCR**ypt. Wir sprechen es ähnlich wie die fiktive Region von [Lancre][] in Terry Pratchetts _Discworld_-Romanen aus.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
