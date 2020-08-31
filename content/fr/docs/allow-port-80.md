---
title: Bonnes pratiques - Conserver le port 80 Ouvert
slug: allow-port-80
top_graphic: 1
date: 2019-01-24
lastmod: 2019-01-24
---

{{< lastmod >}}

Nous recevons parfois des rapports de personnes qui ont du mal à utiliser le défi HTTP-01, car ils ont protégé le port 80 de leur serveur web par un pare-feu. Notre recommandation est que tous les serveurs destinés à un usage général du Web devraient, de façon standard, fournir à la fois le protocole HTTP sur le port 80 et HTTPS sur le port 443. Ils devraient également envoyer des requêtes  de redirections pour toutes les demandes à destination du port 80 vers le port 443 , et éventuellement, envoyer un en-tête HSTS (HTTP Strict Transport Security) (celui-ci sur les demandes du port 443).

Autoriser le port port 80 ne signifie pas augmenter la surface d'attaque sur votre serveur, car les requêtes soumises au port 80 sont généralement traitées par le même logiciel au niveau du port 443.

Fermer le port 80 ne réduit pas le risque qu'une personne visite accidentellement le site web via HTTP. Dans des circonstances normales, cette personne devrait recevoir une redirection vers HTTPS, et son traffic serait alors protégé. Si cette personne fait l'objet d'une tentative d'attaque de type MITM (Man In The Middle), l'attaquant répondra sur le port 80, ainsi votre site n'aura jamais l'opportunité de répondre "Connection refusée".

Enfin, conserver le port 80 ouvert pour forcer des redirections aide le visiteur à accèder à la bonne version du site (la version HTTPS). Il y a de nombreuses situations en dehors de votre contrôle qui vont occasionellemnt amener quelqu'un sur la version HTTP de votre site (par exemple, des liens dans un courriel, ou la saisie manuellement du nom de domaine). Il est préférable pour eux d'obtenir une redirection plutôt qu'une erreur.

Malheureusement, vous n'aurez aucun contrôle si le port 80 est bloqué sur votre site web. Certains FAI (principalement résidentiels) bloquent le port 80 pour diverses raisons. Si votre FAI le fait mais que vous souhaitez toujours obtenir des certificats Let's encrypt, vous avez deux options: vous pouvez ustiliser le défi DNS-01 ou vous pouvez utiliser [l'un des clients qui prennent en charge les défis TLS-ALPN-01](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2)
(sur le port 443).
