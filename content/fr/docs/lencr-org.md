---
title: lencr.org
slug: lencr.org
lastmod: 2025-07-31
show_lastmod: 1
---


# Qu'est-ce que `lencr.org` ?

`lencr.org` est un nom de domaine appartenant à Let's Encrypt. Nous l'utilisons pour héberger les données qui sont référencées dans les certificats que nous émettons.

# Pourquoi mon ordinateur récupère-t-il ces données ? Est-ce malveillant ?

Non, les données sur `lencr.org` ne sont jamais malveillantes. Lorsqu'un appareil se connecte à `lencr.org`, c'est parce qu'un logiciel client sur cet appareil (comme un navigateur web ou une application) s'est connecté à un autre site, a vu un certificat Let's Encrypt et essaie de vérifier qu'il est valide. Il s'agit d'une pratique courante pour de nombreux clients.

Nous ne pouvons pas dire si l'*autre site* auquel on se connecte est malveillant. Si vous investiguez une activité réseau qui semble inhabituelle, vous pouvez vous concentrer sur la connexion qui a démarré juste avant la connexion à `lencr.org`.

Le schéma des connexions des clients à `lencr.org` peut sembler inhabituel ou intermittent. Les clients peuvent ne jamais récupérer ces données, ne récupérer que des sous-ensembles ou "mettre en cache" certaines données par souci d'efficacité, de sorte qu'ils n'y accèdent qu'occasionnellement (la première fois qu'ils en ont besoin et lorsque les données ont expiré).

# À quoi servent exactement ces données ?

Lorsqu'un logiciel client (comme un navigateur web ou une application) se connecte à un site et que ce site présente un certificat, le client doit vérifier que le certificat est authentique et valide. Ces données aident les clients à atteindre cet objectif de plusieurs manières.

* Sous `c.lencr.org`, nous fournissons des listes de révocation de certificats (LRC) répertoriant tous les certificats non expirés que nous avons émis et révoqués par la suite.

* Sous `i.lencr.org`, nous fournissons des copies de nos certificats intermédiaires "émetteurs", qui sont soit signés par l'un de nos certificats racine, soit "contresignés" par une autre autorité de certification (AC). Un client peut utiliser ces données pour valider la "chaîne de confiance" depuis le certificat de l'entité finale qu'il vérifie, en passant par une ou plusieurs étapes intermédiaires, jusqu'au certificat de l'autorité de certification racine qu'il reconnaît et en qui il a confiance.

# Pourquoi "`lencr.org`" ?

Nous avions l'habitude d'utiliser des URL plus longues comme `http://example.int-x3.letsencrypt.org/`. Cependant, lorsque nous avons émis nos [nouveaux certificats racine et intermédiaires][1], nous avons voulu les rendre aussi courtes que possible. Chaque connexion HTTPS sur le Web (des milliards par jour) doit envoyer une copie d'un certificat, donc chaque octet compte. Nous avons choisi `lencr.org` en raison de sa similitude avec notre nom : **L**et **ENCR**ypt. Nous le prononçons un peu comme la région fictive de [Lancre][] dans les romans de Terry Pratchett. _Discworld_ de Terry Pratchett.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
