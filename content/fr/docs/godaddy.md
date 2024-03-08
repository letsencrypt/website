---
title: "Les certificats Let's Encrypt sur l'hébergement GoDaddy"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Nous recevons beaucoup de questions sur l'utilisation de Let's Encrypt sur GoDaddy. Si vous utilisez l'hébergement web partagé GoDaddy, il est actuellement très difficile d'installer un certificat Let's Encrypt, c'est pourquoi nous ne recommandons pas pour le moment d'utiliser nos certificats avec GoDaddy. C'est parce que GoDaddy ne prend pas en charge le [protocole ACME][1] pour la délivrance et le renouvellement automatique des certificats. GoDaddy propose plutôt un renouvellement automatique avec leurs propres certificats, qui sont une [fonctionnalité à surcoût ][2].

Nous ne recommandons pas l'utilisation de certificats Let's Encrypt chez les fournisseurs d'hébergement qui n'appliquent pas directement le protocole ACME, car cela signifie que vous ne pouvez pas automatiser entièrement les renouvellements. Nous pensons que les renouvellements automatisés sont une fonctionnalité très importante pour l'utilisation des certificats. L'utilisation d'un logiciel pour automatiser le renouvellement réduit considérablement la probabilité que votre certificat expire sans être remplacé. Si votre certificat expire, c'est très frustrant pour vos utilisateurs car ils ne peuvent pas accéder à votre site.

Parce que nous croyons résolument au renouvellement automatisé, nous concevons nos certificats de manière à ce qu'ils puissent être utilisés avec le protocole ACME. Un certificat Let's Encrypt est censé être renouvelé automatiquement après 60 jours, et cessera de fonctionner après 90 jours s'il n'est pas renouvelé.

Si, après avoir consulté les problèmes ci-dessus, vous avez décidé d'essayer de maintenir un certificat Let's Encrypt sur l'hébergement partagé GoDaddy, GoDaddy[ vous fournit des instructions][3]. N'oubliez pas que suivre ces instructions prend du temps et que vous êtes censé le faire tous les 60 jours (et non tous les 90 jours comme décrit sur la page liée).

[1]: https://tools.ietf.org/html/rfc8555
[2]: https://www.godaddy.com/web-security/ssl-certificate
[3]: https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023
