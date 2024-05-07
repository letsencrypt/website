---
title: lencr.org
slug: lencr.org
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Cos'è lencr.org?

`lencr.org` è un dominio posseduto da Let's Encrypt. Lo usiamo per ospitare OCSP, CRL e i certificati d'emissione: tutti gli URL appaiono nei certificati.

Lo utilizziamo per URL più lunghi come `http://ocsp.int-x3.letsencrypt.org/`. Tuttavia, quando abbiamo rilasciato i nostri [nuovi certificati root e intermedi][1], abbiamo voluto renderli il più piccoli possibile. Ogni connessione HTTPS sul web (miliardi per giorno) deve inviare una copia di un certificato, quindi ogni byte è importante. Abbiamo scelto `lencr.org` per la sua somiglianza con il nostro nome: **L**et's **ENCR**ypt. Noi lo pronunciamo come la regione immaginaria di [Lancre][] nei romanzi _Discworld_ di Terry Pratchett's.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
