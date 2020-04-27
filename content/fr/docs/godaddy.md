---
title: "Certificats Let's Encrypt sur un hebergement GoDaddy"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
---

{{< lastmod >}}


Nous recevons beaucoup de questions sur la façon d'utiliser Let’s Encrypt sur GoDaddy. Si vous utilisez une formule d'hébergement Web partagé chez GoDaddy, il est actuellement très difficile d'installer un certificat Let’s Encrypt, nous ne recommandons donc pas, actuellement, d'utiliser nos certificats avec GoDaddy. En effet, GoDaddy ne prend pas en charge le [protocole ACME][1] pour automatiser  la délivrance et le renouvellement des certificats. Au lieu de cela, GoDaddy propose un renouvellement automatisé avec leurs propres certificats, ce qui est [un service optionnel payant][2].

Nous vous déconseillons d’utiliser des certificats Let’s Encrypt chez les fournisseurs d’hébergement qui n'implémentent pas directement le protocole ACME, car cela signifie que vous ne pouvez pas automatiser les renouvellements. 

Nous pensons que les renouvellements automatisés sont un élément très importante dans l'ustilisation des certificats. L'utilisation de logiciels pour automatiser le renouvellement rend beaucoup moins probable l'expiration de votre certificat sans qu'il n'ai été  remplacé. L'expiration de votre certificat est très frustrant pour vos utilisateurs car ils ne peuvent pas accéder à votre
site.

Parce que nous croyons tellement au renouvellement automatisé, nous concevons nos certificats pour qu'ils soient utilisés en tirant parti des processus d'automatisation d'ACME. Un certificat Let’s Encrypt est censé être renouvelé automatiquement après 60 jours et cessera de fonctionner après 90 jours s'il n'est pas renouvelé.

Si, après avoir examiné les problèmes ci-dessus, vous avez décidé d’essayer de réaliser la maintienance d'un certificat Let's Encrypt sur un hébergement partagé GoDaddy, les [instructions sont fournies par GoDaddy] [3]. N'oubliez pas que suivre ces instructions prend du temps, et vous devez le faire tous les 60 jours (pas tous les 90 jours
comme décrit sur la page données en lien).

[1]: https://tools.ietf.org/html/rfc8555
[2]: https://www.godaddy.com/web-security/ssl-certificate
[3]: https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023
