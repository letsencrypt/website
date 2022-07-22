---
title: Limite de validation dépassée
slug: failed-validation-limit
top_graphic: 1
lastmod: 2022-06-30
show_lastmod: false
---


# Description
Toutes les demandes d'émission sont soumises à une *limite de validation dépassée* de 5 échecs par compte, par nom d'hôte et par heure. Vous devriez recevoir le message d'erreur suivant suivant de votre client ACME (Environnement de Gestion Automatique de Certificat) lorsque vous avez dépassé la limite de validation :

```
too many failed authorizations recently: see https://letsencrypt.org/docs/failed-validation-limit/
```

Les "autorisations" auxquelles cette erreur fait référence sont le résultat de demandes d'autorisation, envoyées par votre client ACME, pour valider le contrôle d'un nom de domaine avant que nous puissions émettre ou renouveler un certificat. Cette erreur indique que les multiples demandes de validation ont été envoyées avec succès mais que toutes les tentatives de validation ont échoué.

# Causes fréquentes

Les abonnés qui dépassent la limite de validation le font souvent en raison d'une mauvaise configuration de leur environnement.

## HTTP-01 ou TLS-APLN-01

Pour les clients ACME qui demandent une autorisation via les méthodes de validation HTTP-01 ou TLS-APLN-01, le problème provient généralement d'une configuration de réseau ou de pare-feu qui empêche nos serveurs de validation d'atteindre le serveur d'où provient la demande.

## DNS-01

Les clients ACME qui demandent une autorisation via la méthode de validation DNS-01 exigent généralement que vous créiez un enregistrement CNAME dans votre zone DNS principale, ce qui permet au client ACME de définir les enregistrements DNS requis pendant le processus de validation. Les échecs de validation du DNS-01 sont généralement dus à des étapes manquées ou à des fautes de frappe au cours de ce processus de configuration initial.

Lors du dépannage ou du test du déploiement de vos applications, nous vous encourageons à configurer votre client ACME pour utiliser notre [environnement de pré-production](/docs/staging-environment/). Les limites de débit pour notre environnement de pré-production sont [significativement plus élevées](/docs/staging-environment/#rate-limits).

# Demander de l'aide

Si vous n'êtes pas sûr de savoir comment configurer votre client ACME pour utiliser notre environnement de pré-production ou si vous avez besoin d'aide pour le débogage, nous vous encourageons à [demander de l'aide sur notre forum communautaire](https://community.letsencrypt.org/c/help/13).

# Demande de dérogation

Les dérogations sont **non** applicables pour des dépassements de la limite de validation.