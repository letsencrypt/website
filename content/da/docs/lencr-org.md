---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Hvad er lencr.org?

`lencr.org` er et domæne ejet af Let's Encrypt. Vi bruger det til at være vært for OCSP, CRL'er, og udstedercertifikater: alle de webadresser, der vises i certifikater.

Vi plejede at bruge længere URL'er som `http://ocsp.int-x3.letsencrypt.org/`. Men da vi udstedte vores [nye rod- og intermediate certifikater][1], ønskede vi at gøre dem så korte som muligt. Hver HTTPS-forbindelse på nettet (milliarder pr. dag) skal sende en kopi af et certifikat, så hver byte betyder noget. Vi valgte `lencr.org` på grund af dens lighed med vores navn: **L**et's **ENCR**ypt. Vi udtaler det meget ligesom den fiktive region [Lancre][] i Terry Pratchett's _Discworld_ romaner.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
