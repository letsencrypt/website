---
title: Implémentations du client ACME
slug: client-options
top_graphic: 1
lastmod: 2020-02-25
---

{{< clientslastmod >}}

Let's Encrypt utilise le protocole ACME pour vérifier que vous contrôlez un nom de domaine donné et vous délivrer un certificat. Pour obtenir un certificat Let's Encrypt, vous aurez besoin de choisir quel logiciel client ACME vous allez utiliser.

Les clients ACME ci-dessous sont proposés par des tiers. Let's Encrypt ne contrôle ni n'examine les clients tiers et ne peut donner aucune garantie quant à leur sécurité ou leur fiabilité.

Certains clients ACME sont disponibles en tant qu'extensions du navigateur, mais nous ne les répertorions pas ici car ils encouragent un renouvellement manuel se traduisant par une mauvaise expérience utilisateur et augmente le risque de renouvellements manqués.

# Recommandé: Certbot

Nous recommandons à la plupart des utilisateurs de commencer par le client [Certbot](https://certbot.eff.org/). Il vous permet d'obtenir simplement un certificat ou également vous aider à l'installer, selon ce que vous préférez. Il est facile à utiliser, fonctionne sur de nombreux systèmes d'exploitation et dispose d'une excellente documentation.

Si Certbot ne répond pas à vos besoins, ou si vous souhaitez simplement essayer autre chose, il y a un bon nombre de clients à choisir ci-dessous, regroupés par langue ou environnement dans lequel ils s'exécutent.

# Autres options de clients

Tous les clients suivants prennent en charge l'API ACMEv2 ([RFC 8555](https://tools.ietf.org/html/rfc8555)). Nous allons bientôt [supprimer progressivement la prise en charge d'ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/). Si vous utilisez déjà l'un des clients ci-dessous, assurez-vous de le mettre à jour pour utiliser la version la plus récente. Si le client que vous utilisez n'est pas répertorié ci-dessous, il peut ne pas prendre en charge ACMEv2, auquel cas nous vous recommandons de contacter les responsables du projet ou de passer à un autre client.

{{< clients libraries="Libraries" projects="Projects integrating with Let's Encrypt" >}}

Le module Python [acme](https://github.com/certbot/certbot/tree/master/acme) fait partie de Certbot, mais est également utilisé par un certain nombre d'autres clients et est disponible en tant que package autonome via
 [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) et d'autres distributions.

{{< /clients >}}

# Ajout d'un client/projet

Si vous connaissez un client ACME ou un projet intégré à l'API ACMEv2 de Let's Encrypt qui n'est pas présent dans la page ci-dessus, veuillez soumettre un Pull Request dans notre [Website Repository](https://github.com/letsencrypt/website/) sur GitHub, pour mise à jour du fichier `data/clients.json`.

Avant de soumettre un Pull Request, veuillez vous assurer:

1. Le client respecte la [politique de la marque Let's Encrypt](https://www.abetterinternet.org/trademarks).
1. Le client n'est pas basé sur un navigateur et prend en charge les renouvellements automatiques.
1. Vous ajoutez votre client à la **fin** des sections pertinentes (N'oubliez pas le "acme_v2" si approprié!).
1. En enregistrant mettez à jour l'horodatage dans la variable `lastmod` située au début du fichier `clients.json`.
