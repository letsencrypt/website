---
title: Implémentations du client ACME
slug: client-options
top_graphic: 1
lastmod: 2020-12-18
---

{{< clientslastmod >}}

Let's Encrypt utilise le protocole ACME pour vérifier que vous contrôlez un nom de domaine donné et pour vous délivrer un certificat. Pour obtenir un certificat Let's Encrypt, vous devez choisir un logiciel client ACME à utiliser.

Les clients ACME ci-dessous sont proposés par des tiers. Let's Encrypt ne contrôle ni n'examine les clients tiers et ne peut donner aucune garantie quant à leur sécurité ou leur fiabilité.

Certains clients ACME sont disponibles dans le navigateur, mais nous ne les énumérons pas ici car ils encouragent un processus de renouvellement manuel qui se traduit par une piètre expérience pour l'utilisateur et augmente le risque de non renouvellement.

# Recommandé : Certbot

Nous recommandons à la plupart des gens de commencer par le client [Certbot](https://certbot.eff.org/). Il peut simplement vous obtenir un certificat ou aussi vous aider à l'installer, selon votre préférence. Il est facile à utiliser, fonctionne sur de nombreux systèmes d'exploitation et dispose d'une excellente documentation.

Si Certbot ne répond pas à vos besoins, ou si vous souhaitez simplement essayer autre chose, il y a d'autres clients ci-dessous, regroupés par langue ou par environnement.

# Autres options de clients

Tous les clients suivants prennent en charge l'API ACMEv2 ([RFC 8555](https://tools.ietf.org/html/rfc8555)). Nous allons bientôt arrêter de soutenir [ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/). Si vous utilisez déjà l'un des clients ci-dessous, assurez-vous de passer à la dernière version. Si le client que vous utilisez ne figure pas dans la liste ci-dessous, il se peut qu'il ne supporte pas ACMEv2. Dans ce cas, nous vous recommandons de contacter les responsables du projet ou de passer à un autre client.

{{< clients libraries="Libraries" projects="Projects integrating with Let's Encrypt" >}}

Le module Python [acme](https://github.com/certbot/certbot/tree/master/acme) fait partie de Certbot, mais est également utilisé par un certain nombre d'autres clients et est disponible sous forme de paquet autonome via [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme)  et d'autres distributions.

{{< /clients >}}

# Ajout d'un client/projet

Si vous connaissez un client ACME ou un projet qui a intégré l'API ACMEv2 de Let's Encrypt qui n'est pas présent dans la page ci-dessus, veuillez soumettre une demande d'extraction (pull request) à notre [dépôt du site web](https://github.com/letsencrypt/website/) sur GitHub, en mettant à jour le fichier `data/clients.json`.

Avant de soumettre une "pull request", veuillez vous assurer :

1. Le client respecte la politique [Let's Encrypt ](/trademarks) en matière de marques
1. Le client n'est pas basé sur un navigateur et prend en charge les renouvellements automatiques.
1. Votre "commit" ajoute votre client à la **fin** des sections concernées (N'oubliez pas le "acme_v2" le cas échéant !).
1. Votre "commit" met à jour `lastmod` à la bonne date en haut du  `clients.json`.
