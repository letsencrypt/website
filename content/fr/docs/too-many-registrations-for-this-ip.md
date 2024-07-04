---
title: Limite d'enregistrements par IP
slug: too-many-registrations-for-this-ip
lastmod: 2022-08-15
show_lastmod: false
---


# Description

Les abonnés peuvent enregistrer jusqu'à 10 comptes par adresse IP toutes les 3 heures. Vous devriez recevoir le message d'erreur suivant de votre client ACME lorsque vous avez dépassé la limite des *enregistrements par IP* :

```
too many registrations for this IP: see https://letsencrypt.org/docs/too-many-registrations-for-this-ip/
```

Les "enregistrements" auxquels cette erreur fait référence sont des demandes, envoyées à partir de votre adresse IP, d'enregistrement d'un nouveau compte avec l'API de Let's Encrypt. Cette erreur indique qu'au moins 10 comptes ont déjà été enregistrés à partir de cette adresse IP au cours des 3 dernières heures.

# Causes fréquentes

Les abonnés qui atteignent la limite d'enregistrements par IP le font souvent en raison d'une mauvaise configuration de leur environnement.

## Déploiements répétitifs

Il est extrêmement rare qu'un abonné individuel soit confronté à la limite d'enregistrements par IP. Cela se produit le plus souvent lors de déploiements répétés de votre système ou de votre application ; soit votre client ACME ne parvient pas à stocker et à réutiliser les informations d'identification de votre compte, soit le système de fichiers où les informations d'identification devraient être stockées est détruit entre les déploiements (conteneurs, machines virtuelles, instances en cloud). Lorsque vous testez le déploiement de votre système ou de votre application, assurez-vous d'avoir configuré votre client ACME pour qu'il utilise notre environnement d'essai. Les limites de débit pour notre environnement de test sont [significativement plus élevées](/docs/staging-environment/#rate-limits).

## Trop de comptes

Les hébergeurs et autres grands intégrateurs atteignent généralement la limite des enregistrements par IP en essayant de demander un compte par client. Nous recommandons aux grands intégrateurs de préférer une conception utilisant [un compte pour plusieurs clients](/docs/integration-guide/#one-account-or-many). Lors des tests, assurez-vous d'avoir configuré votre implémentation d'ACME pour utiliser notre environnement de test. Les limites de débit pour notre environnement de test sont [significativement plus élevées](/docs/staging-environment/#rate-limits).

# Demander de l'aide

Si vous n'êtes pas sûr de savoir comment configurer votre client ACME pour utiliser notre environnement de test ou si vous avez besoin d'aide pour déboguer, nous vous encourageons à [demander de l'aide sur notre forum communautaire](https://community.letsencrypt.org/c/help/13).

# Demander une dérogation

Les dérogations ne sont **pas** disponibles pour la limite d'enregistrements par IP.
