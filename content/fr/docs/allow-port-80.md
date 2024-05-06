---
title: Bonne pratique - Garder le port 80 ouvert
slug: 1
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Nous recevons occasionnellement des rapports de personnes qui ont des difficultés à utiliser le défi HTTP-01 car elles ont fermé le port 80 de leur serveur web. Notre recommandation est que tous les serveurs destinés à une utilisation générale du web devraient offrir à la fois HTTP sur le port 80 et HTTPS sur le port 443. Ils devraient également répondre par une redirection pour toutes les requêtes sur le port 80, et éventuellement un en-tête HSTS (sur le port 443).

Autoriser le port 80 n'augmente pas la surface d'attaque sur votre serveur, car les requêtes sur le port 80 sont généralement servies par le même logiciel qui tourne sur le port 443.

La fermeture du port 80 ne réduit pas le risque pour une personne qui visite accidentellement votre site Web via HTTP. Dans des circonstances normales, cette personne recevra une redirection vers HTTPS, et son trafic ultérieur sera protégé. Si cette personne était soumise à un MITM actif, le MITM répondrait sur le port 80, pour que votre site n'ait jamais la possibilité de répondre "connexion refusée."

Enfin, garder le port 80 ouvert afin de servir une redirection aide à amener personnes à la bonne version de votre site (la version HTTPS). Il y a différentes situations qui échappent à votre contrôle et qui pourraient faire atterrir brièvement quelqu'un sur la version HTTP de votre site - par exemple, les liens automatiques dans les e-mails, ou en tapant manuellement un nom de domaine. Il est préférable pour eux d'obtenir une redirection plutôt qu'une erreur.

Malheureusement, vous pourriez ne pas avoir de contrôle sur le fait que le port 80 est bloqué pour votre site. Certains FAI (principalement résidentiels) bloquent le port 80 pour diverses raisons. Si votre FAI fait cela mais que vous aimez toujours obtenir des certificats de Let's Encrypt, vous avez deux options : vous pouvez utiliser les défis DNS-01 ou vous pouvez utiliser [ l'un des clients qui prennent en charge les défis TLS-ALPN-01](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (sur le port 443).
