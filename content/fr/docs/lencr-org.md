---
title: lencr.org
slug: lencr.org
top_graphic: 1
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# Qu'est-ce que lencr.org ?

`lencr.org` est un domaine appartenant à Let's Encrypt. Nous l'utilisons pour héberger OCSP, CRLs, et les certificats de l'émetteur : toutes les URLs qui apparaissent dans les certificats.

Nous avions l'habitude d'utiliser des URL plus longues comme `http://ocsp.int-x3.letsencrypt.org/`. Cependant, lorsque nous avons émis nos [nouveaux certificats racine et intermédiaires][1], nous avons voulu les rendre aussi courtes que possible. Chaque connexion HTTPS sur le Web (des milliards par jour) doit envoyer une copie d'un certificat, donc chaque octet compte. Nous avons choisi `lencr.org` en raison de sa similitude avec notre nom : **L**et **ENCR**ypt. Nous le prononçons un peu comme la région fictive de [Lancre][] dans les romans de Terry Pratchett. _Discworld_ de Terry Pratchett.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
