---
title: Limite de duplication des certificats
slug: duplicate-certificate-limit
top_graphic: 1
date: 2022-06-16
lastmod: 2022-06-16
show_lastmod: 1
---


# Description
Toutes les demandes de délivrance sont soumises à une limite de *duplicata de certificats* de 5 par semaine. Vous devriez recevoir un message d'erreur comme le suivant de votre client ACME lorsque vous avez dépassé la limite de duplicata de certificats :
```
too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit
```
Le " exact set " auquel cette erreur fait référence est le set de noms d'hôtes demandé pour ce certificat : dans cet exemple, `example.com` et `login.example.com`. Si votre certificat est émis pour un seul nom, tel que exemple.com, le " exact set " de noms d'hôtes pour votre certificat sera le suivant `[example.com]`. Cette limite de taux est dépassée lorsqu'un abonné demande un certificat pour le même " exact set " de noms d'hôtes plus de 5 fois en une seule semaine.

# Causes fréquentes

Les abonnés qui atteignent la limite de certificats dupliqués le font souvent en essayant de résoudre le problème du déploiement d'une application ou d'un service. Quelques exemples :

Si vous rencontrez une erreur de votre client ACME que vous ne reconnaissez pas et que vous essayez de supprimer et de réinstaller votre client ACME plusieurs fois dans le processus pour résoudre l'erreur, vous risquez de dépasser la limite de certificats dupliqués.

Si vous supprimez les données de configuration de votre client ACME après chaque tentative ratée d'installation d'un certificat, vous atteindrez cette limite de taux après cinq tentatives ratées. Il est préférable de faire une copie des données de configuration avant de les supprimer, afin de pouvoir accéder aux certificats et aux clés privées précédemment émis si nécessaire.

Lors du dépannage ou du test du déploiement de vos applications, nous vous encourageons à configurer votre client ACME pour utiliser notre [environnement de pré-production](/docs/staging-environment/). Les limites de taux pour notre environnement de pré-production sont [nettement plus élevées](/docs/staging-environment/#rate-limits).

# Demander de l'aide

Si vous ne savez pas comment configurer votre client ACME pour utiliser notre environnement ou si vous avez besoin d'aide pour déboguer, nous vous encourageons à [demander de l'aide sur notre forum communautaire](https://community.letsencrypt.org/c/help/13).

# Demander une dérogation

Les dérogations ne sont **pas ** possibles pour la limite de duplication des certificats.

# Solution de rechange

La révocation des certificats précédemment émis ne réinitialisera pas la limite de certificats dupliqués. Toutefois, si vous constatez que vous avez dépassé la limite et que vous avez toujours besoin d'un autre certificat pour les mêmes noms d'hôtes, vous pouvez toujours demander un certificat pour un autre " exact set " de noms d'hôtes. Par exemple, si vous avez dépassé la limite de certificats dupliqués pour `[example.com]`, la demande d'un certificat pour `[example.com, login.example.com]`, aboutira. De même, si vous avez dépassé la limite de certificats dupliqués pour `[example.com,
login.example.com]` alors la demande d'un certificat séparé pour `[example.com]` et un autre pour `[login.example.com]` aboutira.

# Surveillance des limites de taux

Pour l'instant, nous ne proposons pas de moyen de contrôler les limites de débit des abonnés.
