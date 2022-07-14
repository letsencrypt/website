---
title: Commencer
slug: getting-started
top_graphic: 3
date: 2020-02-11
---

Pour activer HTTPS sur votre site Web, vous devez obtenir un certificat (un fichier particulier) à partir d'une autorité de certification (AC ou CA pour Certificate Authority en anglais). Let's Encrypt est une autorité de certification. Afin d'obtenir un certificat pour le domaine de votre site web par le biais de Let's Encrypt, vous devez prouver que vous contrôlez ce domaine. Avec Let's Encrypt, vous faites cela en utilisant un logiciel exploitant le [protocole ACME](https://tools.ietf.org/html/rfc8555), qui s'exécute généralement chez votre hébergeur.

Pour déterminer quelle méthode fonctionnera le mieux pour vous, vous devrez savoir si vous disposez d'un [accès shell](https://en.wikipedia.org/wiki/Shell_account) (également connu sous le nom d'accès SSH) à votre hébergement. Si vous gérez votre site entièrement via un panneau de contrôle comme [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), ou [WordPress](https://wordpress.org/), il y a de fortes chances que vous n'ayez pas d'accès shell. Vous pouvez poser la question à votre hébergeur pour en être sûr.

# Avec accès Shell

Nous recommandons que la plupart des personnes ayant un accès shell utilisent le client ACME [Certbot]. Il peut automatiser la création et l'installation de certificats sans temps d'arrêt. Il a également des modes experts pour les personnes qui ne veulent pas de configuration automatique. Il est facile à utiliser, fonctionne sur de nombreux systèmes d'exploitation et possède une excellente documentation. [Visitez le Site Certbot][Certbot] pour obtenir des instructions personnalisées pour votre système d'exploitation et votre serveur Web.

Si [Certbot] ne répond pas à vos besoins, ou si vous souhaitez essayer une autre solution, il existe [un large choix de clients ACME](/docs/client-options). Une fois que vous avez choisi le client ACME, consultez la documentation de ce client pour continuer.

Si vous testez différents clients ACME, utilisez notre [environnement de qualification](/docs/staging-environment) pour éviter d'atteindre les [limites d'utilisation](/docs/rate-limits).

[Certbot]: https://certbot.eff.org/  "Certbot"

# Sans accès Shell

La meilleure façon d'utiliser Let's Encrypt sans accès shell est d'utiliser le support intégré de votre fournisseur d'hébergement. Si votre hébergeur propose Let's Encrypt, il peut demander un certificat gratuitement en votre nom, l'installer et le mettre à jour automatiquement. Pour certains hébergeurs, ceci est un paramètre de configuration que vous devez activer. D'autres fournisseurs génèrent et installent  automatiquement les certificats pour tous leurs clients.

[Consultez notre liste d'hébergeurs](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) pour voir si le votre y figure. Si c'est la cas, suivez sa documentation pour configurer votre certificat Let's Encrypt.

Si votre hébergeur ne prend pas en charge Let's Encrypt, vous pouvez le contacter pour en demander l'intégration. Nous faisons de notre mieux pour rendre très facile l'intégration de Let's Encrypt, et les fournisseurs sont souvent heureux d'entendre les suggestions des clients !

Si votre fournisseur d'hébergement ne souhaite pas intégrer Let's Encrypt, mais propose le déploiement de certificats personnalisés, vous pouvez installer Certbot sur votre ordinateur et l'utiliser en [mode manuel](https://certbot.eff.org/docs/using.html#manual). En mode manuel, vous devez prouver que vous contôlrez le site web, vous aurez à y ajouter un fichier spécifique. Certbot récupère ensuite un certificat que vous pouvez installer chez votre fournisseur d'hébergement. Nous ne recommandons pas cette option car elle prend du temps et vous devrez la répéter plusieurs fois par an, peu de temps avant l'expiration de votre certificat. Pour la plupart des personnes, il est préférable de demander la prise en charge de Let's Encrypt par votre fournisseur d'hébergement, voire de changer d'hébergeur s'il ne prévoit pas de l'implémenter.

# Obtenir de l'aide

Si vous avez des questions à propos de la sélection d'un client ACME, ou de l'utilisation d'un client particulier, ou encore de tout autre élément lié à Let's Encrypt, vous pouvez essayer nos [forums communautaires](https://community.letsencrypt.org/).
