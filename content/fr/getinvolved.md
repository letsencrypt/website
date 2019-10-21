---
title: S'impliquer
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## Communauté

Nous pouvons toujours utiliser votre aide pour répondre aux questions sur [Let's Encrypt Community Support](https://community.letsencrypt.org/). Voir [ce billet de blog](/2015/08/13/lets-encrypt-community-support.html) expliquant pourquoi ces contributions sont si importantes.

## Code

Nous pouvons également utiliser votre aide pour le développement de logiciels. Tout notre code est sur [GitHub](https://github.com/letsencrypt/).

### Logiciel client

[Certbot](https://github.com/certbot/certbot) est un utilitaire écrit en Python qui fonctionne avec votre serveur Web pour obtenir automatiquement un certificat et convertir un site Web au HTTPS. Certbot est le client que nous recommandons à la plupart des gens. Beaucoup d'autres [options de client tiers]({{< ref "/docs/client-options.md" >}}) sont disponibles.

### Logiciel AC côté serveur

[Boulder](https://github.com/letsencrypt/boulder) est l'implémentation de l'algorithme de chiffrement Let's Encrypt. Il est basé sur le protocole [ACME](https://github.com/ietf-wg-acme/acme) et écrit principalement dans Go. Un bon point de départ est la liste des problèmes ['help wanted'](https://github.com/letsencrypt/boulder/labels/help%20wanted) et le [guide des contributeurs](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### letsencrypt.org

Vous pouvez aussi contribuer à améliorer ce site internet et la documentation [ici](https://github.com/letsencrypt/website) ou participer à sa [traduction](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md).

## Protocole

L'AC Let's Encrypt parle à un logiciel de gestion de certificat fonctionnant sur des serveurs Web. Le protocole utilisé pour cela s'appelle ACME, pour "Automated Certificate Management Environment". Le projet de spécifications ACME est [disponible sur GitHub](https://github.com/ietf-wg-acme/acme). Des travaux sont en cours au sein de l'IETF pour finaliser ACME en tant que norme véritablement ouverte. Vous pouvez vous joindre à la discussion sur le développement du protocole ACME sur [cette liste de diffusion de l'IETF](https://www.ietf.org/mailman/listinfo/acme).
