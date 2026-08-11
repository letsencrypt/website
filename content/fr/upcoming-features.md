---
title: Fonctionnalités à venir
slug: upcoming-features
lastmod: 2026-07-22
show_lastmod: 1
---

Pour les annonces de changements à venir, veuillez [vous abonner à la liste de diffusion des Mises à jour Techniques](https://letsencrypt.org/opt-in/) ou consulter la [catégorie API d'Annonces](https://community.letsencrypt.org/c/api-announcements/18) sur le forum communautaire Let's Encrypt.

# Fonctionnalités à venir

## Diminution de la durée de validité des certificats à 45 jours

Pour se conformer aux changements des Exigences de bases des AC/Forum de Navigateurs, nous allons [diminuer la durée de validité des certificats à 45 jours](https://letsencrypt.org/2025/12/02/from-90-to-45). Nous allons d'abord la diminuer à 64 jours le 10 février 2027, puis à 45 jours le 16 février 2028. Nous allons également réduire la période d'autorisation de réutilisation à 10 jours, puis 7 heures.

# Fonctionnalités achevées

## Suppression de l'EKU de l'Authentification des Clients TLS

Le 11 février 2026, nous avons [supprimé l'utilisation de la clé étendue (EKU) de l'"Authentification des Clients TLS"](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/) de notre profil de certificat par défaut. Le 8 juillet 2026, nous avons retiré le profil temporaire [tlsclient](https://letsencrypt.org/docs/profiles/#tlsclient), complétant ainsi la suppression. Nous ne délivrons plus de certificats contenant l'EKU de l'Authentification de Client TLS.

## Arrêt des Emails de Notification d'Expiration

Le 4 juin 2025, nous avons [arrêté le service d'emails de notification d'expiration](https://letsencrypt.org/2025/01/22/ending-expiration-emails/), et supprimé toutes les adresses email associées aux comptes ACME de notre base de données de production.

## Suppression des URL d'OCSP

Activé : [7 mai 2025](https://letsencrypt.org/2024/12/05/ending-ocsp/).

Nos certificats ne contiennent plus d'URL d'Accès aux Informations de l'Autorité (AIA) de Protocole de vérification de certificat en ligne (OCSP). À la place, ils contiennent un URL de Point de Distribution (CRLDP) de Liste de Révocation de Certificat (CRL). Les parties utilisatrices peuvent récupérer les informations de statut de révocation via les CRLs, et les clients ACME peuvent obtenir les indices de renouvellement via ARI (voir ci-dessous).

## Profils ACME

Activé : [9 janvier 2025](https://letsencrypt.org/2025/01/09/acme-profiles/).

Les clients qui prennent en charge l'[ébauche d'extension de Profils ACME](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html) peuvent maintenant demander que leur certificat se conforme à [l'un de nos profils pris en charge](https://letsencrypt.org/docs/profiles/).

## Journaux TC statiques

Activé : [14 mars 2024](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

Nous gérons maintenant des journaux de Transparence des Certificats (TC) qui se conforment aux nouvelles [Spécifications d'API de TC statiques](https://c2sp.org/static-ct-api), exécutant le logiciel [Sunlight](https://github.com/FiloSottile/sunlight). Ces journaux sont désormais utilisables pour répondre aux exigences de TC des navigateurs. La [Documentation des Journaux TC](https://letsencrypt.org/docs/ct-logs/) a une liste de nos journaux actuels.

## Informations de renouvellement de l'ACME (ARI)

Activé : [23 mars 2023](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

Nous fournissons maintenant des fenêtres de suggestion de renouvellement pour tous les certificats délivrés, que les clients peuvent demander en utilisant l'[extension ARI ACME](https://www.rfc-editor.org/rfc/rfc9773.html).

## Certification à courte durée de vie

Les clients peuvent [demander un certificat "à courte durée de vie"](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) en utilisant les Profils ACME. Ces certificats sont valides pour si peu de temps qu'ils n'ont pas besoin d'avoir d'informations de révocation intégrées.

## Certificats d'Adresse IP

Les certificats à courte durée de vie (voir ci-dessus) peuvent demander que le certificat [contienne une adresse IP](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/) dans ses noms alternatifs du sujet. Ces adresses seront [validées de la même manière que les Noms DNS](https://www.rfc-editor.org/rfc/rfc8738.html) le sont aujourd'hui.
