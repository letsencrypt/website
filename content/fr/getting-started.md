---
title: Pour commencer
slug: getting-started
top_graphic: 3
date: 2020-02-11
---

Pour activer le HTTPS sur votre site web, vous devez obtenir un certificat (un type de fichier) auprès d'une autorité de certification (AC). Let's Encrypt est une AC. Afin d'obtenir un certificat pour le domaine de votre site web auprès de Let's Encrypt, vous devez apporter la preuve que vous avez le contrôle du domaine. Avec Let's Encrypt, vous faites cela en utilisant un logiciel qui utilise le [protocole ACME](https://tools.ietf.org/html/rfc8555) qui fonctionne généralement sur votre hôte web.

Pour déterminer la méthode qui vous conviendra le mieux, vous devez savoir si vous avez un accès [shell access](https://en.wikipedia.org/wiki/Shell_account) (également appelé accès SSH) à votre hôte web. Si vous gérez votre site web entièrement via un panneau de contrôle comme [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), ou [WordPress](https://wordpress.org/), il y a de fortes chances que vous n'ayez pas d'accès shell. Vous pouvez demander à votre fournisseur d'hébergement d'en être sûr.

# Avec Shell Access

Nous recommandons à la plupart des personnes ayant un accès shell d'utiliser le [Certbot](https://certbot.eff.org/ "Certbot") client ACME. Il peut automatiser la délivrance et l'installation des certificats sans aucun temps d'arrêt. Il dispose également de modes experts pour les personnes qui ne veulent pas d'autoconfiguration. Il est facile à utiliser, fonctionne sur de nombreux systèmes d'exploitation et dispose d'une documentation très complète. [Visiter le Site Certbot](https://certbot.eff.org/ "Certbot") pour obtenir des instructions personnalisées pour votre système d'exploitation et votre serveur web.

Si [Certbot](https://certbot.eff.org/ "Certbot") ne répond pas à vos besoins, ou si vous souhaitez essayer autre chose, il y a [un nombre beaucoup plus important de clients ACME à choisir](/docs/client-options).  Une fois que vous avez choisi le client ACME voir la documentation pour que ce client puisse procéder.

Si vous expérimentez différents clients d'ACME, utilisez notre [environnement de test ](/docs/staging-environment) pour éviter de dépasser [ les limites de taux](/docs/rate-limits).

# Sans Shell Access

La meilleure façon d'utiliser Let's Encrypt sans accès au shell est d'utiliser le support intégré de votre fournisseur d'hébergement. Si votre hébergeur offre le support Let's Encrypt, il peut demander un certificat gratuit en votre nom, l'installer et le mettre à jour automatiquement. Pour certains hébergeurs, il s'agit d'un paramètre de configuration que vous devez activer. D'autres fournisseurs demandent et installent automatiquement des certificats pour tous leurs clients.

[Vérifiez notre liste de fournisseurs d'hébergement](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) pour voir si le vôtre y figure. Si c'est le cas, suivez leur documentation pour configurer votre certificat Let's Encrypt.

Si votre fournisseur d'hébergement ne soutient pas Let's Encrypt, vous pouvez le contacter pour demander de l'aide. Nous faisons de notre mieux pour rendre très facile l'ajout de Let's Encrypt et les fournisseurs sont souvent heureux d'entendre les suggestions des clients !

Si votre hébergeur ne veut pas intégrer Let's Encrypt, mais qu'il prend en charge le téléchargement de certificats personnalisés, vous pouvez installer Certbot sur votre propre ordinateur et l'utiliser en [mode manuel](https://certbot.eff.org/docs/using.html#manual). En mode manuel, vous téléchargez un fichier spécifique sur votre site web pour prouver votre contrôle. Certbot récupère alors un certificat que vous pouvez transférer chez votre hébergeur. Nous ne recommandons pas cette option car elle prend beaucoup de temps et vous devrez la répéter plusieurs fois par an à l'expiration de votre certificat. Pour la plupart des gens, il est préférable de demander l'assistance de votre fournisseur d'hébergement pour l'utilisation de Let's Encrypt, ou de changer de fournisseur s'ils ne prévoient pas de la mettre en œuvre.

# Obtenir de l'aide

Si vous avez des questions sur la sélection d'un client ACME, ou sur l'utilisation d'un client particulier, ou sur tout autre sujet lié à Let's Encrypt, veuillez essayer notre [forums communautaires utiles](https://community.letsencrypt.org/).
