---
title: Profils
slug: profiles
lastmod: 2026-07-14
show_lastmod: false
---

Un profil est un ensemble de caractéristiques qui décrivent à la fois le processus de validation requis pour obtenir un certificat et le contenu final de ce certificat. Pour la grande majorité des abonnés de Let's Encrypt, vous ne devriez jamais avoir à vous soucier de cela : nous sélectionnons automatiquement le meilleur profil pour vous et nous nous assurons qu'il est conforme à toutes les exigences et aux meilleures pratiques qui régissent l'ICP Web. Mais certaines personnes pourraient être intéressées par la sélection proactive d'un profil spécifique. Cette page existe donc pour fournir les informations nécessaires pour faire ce choix.

# Nos Profils

Vous trouverez ci-dessous les descriptions de chaque profil, y compris leurs effets sur le processus de validation et sur le contenu du certificat délivré. Notez que tous les profils ne sont pas disponibles dans tous les environnements : certains peuvent être disponibles uniquement en pré-production ou seulement en production, et certains peuvent être (temporairement) bloqués derrière une liste d'autorisations afin que nous puissions les déployer lentement. La liste des profils publiés dans le point de terminaison `directory` du serveur ACME est la liste canonique.

Vous pouvez trouver les définitions détaillées des propriétés discutées dans chaque profil en bas de cette page.

<div class="boxed">

## classic

Le profil classique est le profil par défaut sélectionné pour toutes les commandes qui ne demandent pas de profil spécifique. Le processus de validation et le certificat qui en résulte sont les mêmes que ceux auxquels vous êtes habitués depuis plusieurs années de fonctionnement de Let's Encrypt. Nous recommandons l'utilisation de ce profil aux abonnés qui sont prêts à laisser les autres essayer de nouvelles choses en priorité.

| Propriété                                                               | Valeur                                     |
| ----------------------------------------------------------------------- | ------------------------------------------ |
| [Durée d'Autorisation En attente](#pending-authorization-lifetime)      | 7 jours                                    |
| [Période de réutilisation d'autorisation](#authorization-reuse-period)  | 30 jours                                   |
| [Durée de validité de la commande](#order-lifetime)                     | 7 jours                                    |
| [Nom commun du certificat](#certificate-common-name)                    | <a href="#footnote-1">Oui<sup>\*</sup></a> |
| [Chiffrement de clé et Utilisation de clé](#key-encipherment-key-usage) | <a href="#footnote-2">Oui<sup>†</sup></a>  |
| [ID de la clé du sujet](#subject-key-identifier-extension)              | Oui                                        |
| [Période de validité](#validity-period)                                 | 90 jours                                   |
| [Informations de révocation](#revocation-information)                   | CRL                                        |
| [Noms max](#max-names)                                                  | 100                                        |
| [Types d'identifiants](#identifier-types)                               | DNS                                        |

<sup id="footnote-1">\*</sup> : Si le CSR soumis lors de la finalisation demande un nom commun spécifique correspondant à un nom alternatif du sujet de type dNSName, cette demande est satisfaite. Si le CSR ne demande pas un nom commun spécifique, le premier nom alternatif du sujet de type dNSName demandé sera promu dans le nom commun du sujet. Si le nom demandé ou le nom à promouvoir est trop long pour tenir dans le champ Nom Commun (64 caractères ou plus), le Nom Commun restera vide.

<sup id="footnote-2">†</sup>: Uniquement inclus pour les certificats avec des clés publiques RSA.

</div>
<div class="boxed">

## tlsserver

Le profil tlsserver est un nouveau profil qui met à jour plusieurs de ces propriétés de validation et de certificat afin de refléter les dernières recommandations du CA/Browser Forum Baseline Requirements, ainsi que les tendances générales au sein de la communauté WebPKI. Nous recommandons de choisir ce profil pour les abonnés qui souhaitent des certificats plus petits et qui adoptent pleinement l'automatisation.

La durée d'autorisation en attente a été réduite pour encourager davantage l'automatisation : les systèmes entièrement automatisés peuvent compléter un défi de validation en quelques secondes, ainsi, une durée de vie d'une seule heure est plus que suffisante. La période de réutilisation d'autorisation a été réduite à sept heures. Cela est dû au fait que les exigences de base requièrent que nous revérifions l'Autorisation de l'Autorité de Certification (CAA) après huit heures, ainsi, limiter la période de réutilisation signifie que nous n'avons pas à effectuer de revérification. La durée de validité de la commande a été réduite à la somme de deux durées de vie d'autorisation, car il y a peu d'intérêt à avoir une commande qui survit aux autorisations dont elle dépend.

Le certificat émit omet le nom commun, puisqu'il est redondant avec les noms alternatifs du sujet et est marqué comme NON RECOMMANDÉ par les exigences de base. L'utilisation de clé de chiffrement de clé est omis car elle n'est pertinente que lors de l'utilisation de suites de chiffrement TLS ne garantissant pas le secret prospectif, lesquelles ont été supprimées par tous les principaux navigateurs en raison de l'importance du secret prospectif. L'extension de l'ID de la clé du sujet est omise car elle ne sert aucun intérêt dans les certificats d'entités finales et n'est PAS RECOMMANDÉE par les exigences de base. Enfin, le certificat qui en résulte est valide pour seulement 45 jours, en préparation des restrictions à venir qui limiteront tous les certificats à maximum 47 jours.

| Propriété                                                               | Valeur   |
| ----------------------------------------------------------------------- | -------- |
| [Durée d'Autorisation En attente](#pending-authorization-lifetime)      | 1 heure  |
| [Période de réutilisation d'autorisation](#authorization-reuse-period)  | 7 heures |
| [Durée de validité de la commande](#order-lifetime)                     | 8 heures |
| [Nom commun du certificat](#certificate-common-name)                    | Non      |
| [Chiffrement de clé et Utilisation de clé](#key-encipherment-key-usage) | Non      |
| [ID de la clé du sujet](#subject-key-identifier-extension)              | Non      |
| [Période de validité](#validity-period)                                 | 45 jours |
| [Informations de révocation](#revocation-information)                   | CRL      |
| [Noms max](#max-names)                                                  | 25       |
| [Types d'identifiants](#identifier-types)                               | DNS      |

</div>
<div class="boxed">

## shortlived

Le profil à courte durée de vie est identique au profil tlsserver, avec une distinction clé : le certificat qui en résulte est valide pour environ 6 jours. Ceci permet à ces certificats de se qualifier comme "Certificats d'Abonnés à Courte Durée de Vie" selon les exigences de base, ce qui signifie qu'ils n'ont pas besoin de contenir des informations de révocation. Ceci signifie que les certificats peuvent être encore plus petits et supprime la possibilité d'un client faisant accidentellement confiance à un certificat après sa révocation. Aujourd'hui, ces certificats contiennent toujours un URL CRL, comme montré dans le tableau ci-dessous, mais cela [pourrait changer dans le futur](https://github.com/letsencrypt/boulder/issues/7673).

Nous recommandons ce profil pour ce qui ont entièrement confiance dans leur automatisation de renouvellement de certificats. Ce profil n'est pas pour tout le monde.

| Propriété                                                               | Valeur     |
| ----------------------------------------------------------------------- | ---------- |
| [Durée d'Autorisation En attente](#pending-authorization-lifetime)      | 1 heure    |
| [Période de réutilisation d'autorisation](#authorization-reuse-period)  | 7 heures   |
| [Durée de validité de la commande](#order-lifetime)                     | 8 heures   |
| [Nom commun du certificat](#certificate-common-name)                    | Non        |
| [Chiffrement de clé et Utilisation de clé](#key-encipherment-key-usage) | Non        |
| [ID de la clé du sujet](#subject-key-identifier-extension)              | Non        |
| [Période de validité](#validity-period)                                 | 160 heures |
| [Informations de révocation](#revocation-information)                   | CRL        |
| [Noms max](#max-names)                                                  | 25         |
| [Types d'identifiants](#identifier-types)                               | DNS, IP    |

</div>
<div class="boxed">

## tlsclient

Depuis le 8 juillet 2026, ce profil n'est plus disponible.

Les certificats émis avec le profil tlsclient contenaient le TLS Client Auth EKU.
Il était par ailleurs identique au profil classique.

</div>

# Sélectionner un profil

Le processus de sélection d'un profil est décrit dans [cette ébauche internet](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/), que nous prévoyons de travailler avec le groupe de travail IETF ACME afin de devenir entièrement RFC. Tous les clients ACME n'ont pas implémenté cette ébauche, ainsi, le client que vous utilisez pourrait ne pas encore être capable de sélectionner un profil.

En général, si vous voulez sélectionner un profil, vous devez :

1. Lire la documentation de votre client ACME pour voir s'il prend en charge la sélection de profil, et s'il le fait, comment lui dire quel profil vous voulez.
2. Récupérer l'objet de dossier Let's Encrypt de [production](https://acme-v02.api.letsencrypt.org/directory) ou de [test](https://acme-staging-v02.api.letsencrypt.org/directory) pour voir quels profils sont disponibles.
3. Configurer votre profil souhaité dans votre client ACME.

# Glossaire

## Propriétés de validation

Ci-dessous se trouvent les descriptions des propriétés de validation qui peuvent être contrôlées par nos profils.

### Durée de l'autorisation en attente

De combien de temps un client ACME dispose pour compléter le défi de validation de contrôle de domaine. L'horloge commence lorsque l'objet d'Autorisation ACME est créé (généralement à la suite de la création d'une nouvelle commande), et est représentée par l'[horodatage `expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) dans l'objet d'Autorisation en attente. Cette valeur est restreinte à [au plus 30 jours](https://github.com/cabforum/servercert/blob/main/docs/BR.md#322419-agreed-upon-change-to-website---acme) par les exigences de base.

### Période de réutilisation d'autorisation

Combien de temps une Autorisation déjà validée peut être réutilisée par de nouvelles commandes contenant le même identifiant. L'horloge commence lorsqu'un défi est complété avec succès, et est représentée par l'[horodatage `expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) dans l'objet d'Autorisation valide. Les [exigences de base](https://github.com/cabforum/servercert/blob/main/docs/BR.md#421-performing-identification-and-authentication-functions) requièrent que cette période n'excède pas 200 jours ; la limite tombe à 100 jours pour les certificats émis depuis le 15 mars 2027 et à 10 jours depuis le 15 mars 2029.

### Durée de validité de la commande

Ceci représente le temps dont un client ACME dispose pour effectuer le processus complet de commande d'un nouveau certificat : passer une nouvelle commande, compléter toutes les autorisations en attente et finaliser la commande. L'horloge commence lorsque la nouvelle commande est créée et est représentée par l'[horodatage `expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.3) dans l'objet Commande.

## Propriétés du certificat

Ci-dessous se trouvent les descriptions des propriétés de certificat qui peuvent être contrôlées par nos profils.

### Nom commun du certificat

Les certificats TLS peuvent contenir des noms (ex. noms de domaine ou adresses IP) en deux endroits : le [champ Nom commun du sujet](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) et l'[extension noms alternatifs du sujet](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). Le Nom commun était l'emplacement le plus courant pour mettre un nom de domaine, il est affiché par beaucoup d'outils d'analyse syntaxique de certificats. Cependant, le Nom commun ne peut contenir qu'un seul nom, alors qu'un grand nombre de certificats doivent contenir plusieurs noms (comme `example.com`, `www.example.com` et `blog.example.com`). Aujourd'hui, le Nom commun est en grande partie redondant, puisque quel que soit le nom qu'il contient il doit _aussi_ être contenu dans l'extension de noms alternatifs du sujet. Inclure ce champ dans nos certificats n'est maintenant [PAS RECOMMANDÉ par les exigences de base](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated).

### Utilisation de clé de chiffrement de clé

Les certificats TLS ont une [extension "Utilisation de clé"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3), qui détermine le type d'opérations cryptographiques que la clé contenue dans le certificat est autorisée à effectuer. Tous les certificats Let's Encrypt contiennent la Signature digitale KU, qui est nécessaire pour effectuer des poignées de main TLS. L'utilisation de clé de chiffrement de clé était historiquement requise par les anciennes versions de TLS pour effectuer certains types de poignées de main avec des clés RSA. Cependant, ces opérations sont connues pour ne pas être sécurisées et ont été dépréciées et supprimées des navigateurs depuis plusieurs années maintenant. Inclure l'utilisation de clé de chiffrement de clé n'est maintenant [PAS RECOMMANDÉ  par les exigences de base](https://github.com/cabforum/servercert/blob/main/docs/BR.md#712711-subscriber-certificate-key-usage).

### Extension d'identifiant de clé du sujet

Les certificats TLS peuvent avoir une [extension d'identifiant de clé du sujet](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2), qui fournit une courte chaîne de caractères qui identifie de manière unique la clé publique présente dans le certificat. Cette extension est très importante pour les certificats d'AC, car elle permet aux navigateurs de rapidement trouver le certificat d'AC qui a émis le certificat d'entité finale présenté par un site web. Cependant, l'extension n'a aucune utilité dans les certificats d'entité finale et l'inclure n'est maintenant PAS RECOMMANDÉ par les exigences de base.

### Durée de validité

Ceci régit la quantité de temps entre les [horodatages `notBefore` et `notAfter`](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5) qui sont intégrés dans un certificat TLS, en d'autres termes, combien de temps le certificat sera fiable avant d'expirer. Les [exigences de base](https://github.com/cabforum/servercert/blob/main/docs/BR.md#632-certificate-operational-periods-and-key-pair-usage-periods) requièrent que cette durée ne dépasse pas 200 jours ; la limite tombe à 100 jours pour les certificats émis depuis le 15 mars 2027 et à 47 jours depuis le 15 mars 2029.

### Informations de révocation

Les clients TLS ont besoin d'une manière de déterminer si un certificat a été révoqué. Généralement, il y a trois mécanismes pour ce faire dans le Web PKI : le Protocole de vérification de certificat en ligne (OCSP), les Listes de révocation de certificat (CRLs), et avoir une période de validité suffisamment courte pour qu'une révocation ne soit pas nécessaire. Let's Encrypt ne prend pas en charge l'OCSP. Ce champ indique si les certificats délivrés dans un profil donné ont un URL CRL ou non.

### Noms max

Ceci est le nombre maximum de ["Noms alternatifs du sujet"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) pour lesquels nous délivrerons un certificat.

### Types d'identifiant

Ceci régit quels types de ["Noms alternatifs du sujet"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) (`dnsName` ou `iPAddress`) un certificat peut contenir.
