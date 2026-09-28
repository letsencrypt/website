---
title: "Les certificats Let's Encrypt sur l'hébergement GoDaddy"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

Nous recevons beaucoup de questions sur l'utilisation de Let's Encrypt sur GoDaddy. GoDaddy ne prend pas en charge le [protocole ACME](https://tools.ietf.org/html/rfc8555) pour la délivrance et le renouvellement automatique des certificats. GoDaddy propose plutôt un renouvellement automatique avec leurs propres certificats, qui sont une [fonctionnalité à surcoût ](https://www.godaddy.com/web-security/ssl-certificate).

Nous ne recommandons pas actuellement d'utiliser nos certificats avec GoDaddy car c'est difficile et le processus ne peut pas être automatisé. Nous pensons que les renouvellements automatiques sont une part importante de la gestion de certificat. L'utilisation d'un logiciel pour automatiser le renouvellement réduit considérablement la probabilité que votre certificat expire sans être remplacé.

Si vous souhaitez tout de même essayer d'utiliser les certificats Let’s Encrypt avec l'hébergement partagé GoDaddy, vous pouvez consulter l'une des options suivantes :

1. Utilisez un [CertSage](https://certsage.com/) depuis le logiciel Griffin. D'autres utilisateurs Let's Encrypt sur GoDaddy ont eu du succès avec.
2. GoDaddy [fournit des instructions](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Nous ne pouvons garantir leur exactitude ni leur justesse. Gardez à l'esprit que suivre ces instructions prend du temps et que vous êtes supposés le faire régulièrement, avant l'expiration de chaque certificat.
