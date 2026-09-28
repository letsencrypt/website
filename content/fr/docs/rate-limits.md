---
title: Limites d'utilisation
slug: rate-limits
lastmod: 2026-08-05
show_lastmod: true
---

Let's Encrypt inclut des limites d'utilisation pour assurer un usage équitable par le plus de personnes possible. Nous pensons que ces limites sont suffisamment élevées par défaut pour fonctionner pour la plupart des personnes. Nous les avons également conçus de sorte que le renouvellement d'un certificat n'atteint presque jamais une limite d'utilisation, et pour que les grandes organisations puissent progressivement augmenter le nombre de certificats qu'elles peuvent délivrer sans intervention de Let's Encrypt.

Si vous développez ou testez activement un client Let's Encrypt, veuillez utiliser
notre [environnement de préproduction](/docs/staging-environment) au lieu de l'API de production. Si vous travaillez sur l'intégration de Let's Encrypt en tant que fournisseur ou avec un grand site web, veuillez consulter notre [Guide d'intégration](/docs/integration-guide).

# Comment fonctionnent nos limites d'utilisation

Les limites sont calculées, par requête, à l'aide d'un algorithme [token
bucket] (https://en.wikipedia.org/wiki/Token_bucket). Cette approche offre une certaine souplesse dans l'utilisation des demandes qui vous sont attribuées. Vous pouvez
soit faire des demandes en série jusqu'à la limite totale, soit espacer vos demandes pour ne pas risquer d'être limité.

Si vous avez atteint une limite d'utilisation, nous n'avons pas la possibilité de la réinitialiser temporairement. Ne vous
ne vous inquiétez pas, votre quota se remplira progressivement au fil du temps, ce qui vous permettra de faire plus de demandes sans aucune action supplémentaire de votre part. La révocation des certificats ne réinitialise **pas** les limites d'utilisation, car les ressources utilisées pour émettre ces certificats ont déjà été consommées. Pour plus d'informations, voir
[Réessayer après avoir atteint les limites de débit](#retrying-after-hitting-rate-limits).

# Limites d'enregistrement de compte

Les limites suivantes s'appliquent lorsque les abonnés demandent un nouveau compte à l'aide de l'API « nouveau compte ». Le dépassement de ces limites est très rare. Nous recommandons aux grands intégrateurs de préférer une conception qui [utilise un compte pour plusieurs clients](/docs/integration-guide).

<div class="boxed">

## Nouveaux enregistrements par adresse IP

Jusqu'à 10 comptes peuvent être créés à partir d'une seule adresse IP toutes les 3 heures. La possibilité de créer de nouveaux comptes se renouvelle au rythme d'un compte toutes les 18 minutes.

### Dérogations

Nous ne proposons **pas** de dérogation pour cette limite.

</div>
<div class="boxed">

## Nouveaux enregistrements par plage d'IPv6

Jusqu'à 500 comptes peuvent être créés à partir d'un seul sous-réseau /48 IPv6 toutes les 3 heures.
La capacité de créer de nouveaux comptes se renouvelle au rythme de 1 compte toutes les 22 secondes.

### Dérogations

Nous ne proposons **pas** de dérogation pour cette limite.

</div>

# Limites d'émission de certificats

Les limites suivantes s'appliquent lorsque les abonnés demandent un nouveau certificat à l'aide de l'API `new-order`. Le dépassement de ces limites est plus fréquent, en particulier pour les grands hébergeurs ou les organisations émettant des certificats pour de nombreux noms d'hôtes.

<div class="boxed">

## Nouvelles commandes par compte

Chaque fois que vous demandez un certificat à Let's Encrypt, une nouvelle commande est créée.
Un seul certificat peut inclure jusqu'à 100 identifiants (noms DNS ou adresses IP), en fonction du [profil de certificat](/docs/profiles/) sélectionné. Pour des raisons de performance, il est préférable d'utiliser moins d'identifiants par certificat lorsque cela est possible.

### Limite

Jusqu'à 300 nouvelles commandes peuvent être créées par un seul compte toutes les 3 heures. La capacité de créer de nouvelles commandes se renouvelle au rythme d'une commande toutes les 36 secondes.

### Dérogations

Pour dépasser cette limite, vous devez demander une
dérogation pour un
compte spécifique.

</div>
<div class="boxed">

## Nouveaux certificats par domaine enregistré

Un domaine enregistré est, en général, la partie du domaine que vous avez achetée auprès de votre organisme d'enregistrement de noms de domaine. Par exemple, dans `www.example.com`, le domaine enregistré est `example.com`. Dans `new.blog.example.co.uk`, le domaine enregistré est `example.co.uk`. Nous utilisons la [Public Suffix List](https://publicsuffix.org/) pour identifier les domaines enregistrés.

Si vous demandez un certificat pour une adresse IP, nous essayons également de traiter l'allocation la plus courante (ce que vous pourriez obtenir de votre FAI ou fournisseur d’hébergement) comme le "domaine enregistré". Pour les adresses IPv4, nous traitons l'adresse exacte comme le domaine enregistré. Pour les adresses IPv6, nous traitons la plage /64 comme le domaine enregistré.

Vous pouvez obtenir une liste des certificats émis pour votre domaine enregistré en recherchant [crt.sh](https://crt.sh/) ou [Censys](https://search.censys.io/#), qui utilisent les journaux publics Certificate
Transparency.

### Limite

Jusqu'à 50 certificats peuvent être délivrés par domaine enregistré (ou adresse IPv4, ou plage /64 IPv6) chaque 7 jours. Il s'agit d'une limite globale, et toutes les nouvelles demandes, quel que soit le compte qui les soumet, sont prises en compte dans cette limite.
La possibilité de délivrer de nouveaux certificats pour le même domaine enregistré se renouvelle au rythme d'un certificat toutes les 202 minutes.

### Dérogations

Pour dépasser cette limite, vous devez [demander une dérogation](https://isrg.formstack.com/forms/rate_limit_adjustment_request) pour le domaine enregistré spécifique ou un compte.

</div>
<div class="boxed">

## Nouveaux certificats par ensemble exact d'identifiants

Si vous demandez un certificat pour `192.168.1.1`, `example.com` et `login.example.com`, l'"ensemble exact d'identifiants" est `[192.168.1.1, example.com, login.example.com]`. Si vous demandez un certificat pour un seul identifiant, par exemple `example.co.uk`, l'ensemble exact d'identifiants sera `[example.co.uk]`.

### Limite

Jusqu'à 5 certificats peuvent être délivrés tous les 7 jours pour le même ensemble d'identifiants. Il s'agit d'une limite globale, et toutes les nouvelles demandes, quel que soit le compte qui les soumet, sont prises en compte dans cette limite. La possibilité de demander de nouveaux certificats pour le même ensemble exact d'identifiants se renouvelle au rythme d'un certificat toutes les 34 heures.

### Causes fréquentes

Réinstaller plusieurs fois votre client pour résoudre une erreur inconnue ou supprimer les données de configuration de votre client ACME à chaque fois que vous déployez votre application sont des moyens courants d'atteindre cette limite. Nous avons intentionnellement fixé cette limite à un niveau relativement bas afin d'éviter que des systèmes bogués ou des logiciels en cours de développement ne consomment rapidement la capacité des autres limites d'utilisation.

Lorsque vous testez ou dépannez vos applications, nous vous recommandons de configurer votre
client pour qu'il utilise notre [environnement de préproduction](/docs/staging-environment), qui a des limites [nettement plus élevées](/docs/staging-environment/#rate-limits).

### Solution de rechange

Si vous avez atteint cette limite, vous pouvez modifier l'ensemble d'identifiants en ajoutant `blog.example.com`, pour demander des certificats supplémentaires. Attention, ces nouvelles demandes ne seront pas considérées comme des renouvellements. Par conséquent, ils seraient soumis aux limites d'utilisation [Nouvelles demandes par compte](#new-orders-per-account) et [Nouveaux certificats par domaine enregistré](#new-certificates-per-registered-domain).

### Dérogations

Nous ne proposons **pas** de dérogation pour cette limite.

</div>
<div class="boxed">

## Échecs d'autorisation par identifiant et par compte

Une autorisation est générée pour chaque identifiant (nom DNS ou adresse IP) inclus dans une commande. Avant qu'un certificat puisse être délivré, toutes les autorisations de la demande doivent être validées avec succès. L'échec de l'autorisation signifie que, bien que les demandes de validation aient été envoyées avec succès, toutes les tentatives de Let's Encrypt pour valider le contrôle de l'identifiant ont échoué.

### Limite

Un compte peut subir jusqu'à 5 échecs d'autorisation par identifiant toutes les heures. La capacité de subir des échecs d'autorisation se renouvelle au rythme de 1 par identifiant toutes les 12 minutes. Une fois dépassée, cette limite est appliquée en empêchant toute nouvelle demande pour le même identifiant, par le même compte, jusqu'à ce que la limite soit réinitialisée.

### Causes fréquentes

Avant de commencer le dépannage, nous vous recommandons de configurer votre client pour qu'il utilise notre
[environnement de préproduction](/docs/staging-environment). Cet environnement dispose de limites [nettement plus élevées](/docs/staging-environment/#rate-limits), ce qui peut vous aider à identifier les problèmes sans consommer les limites de votre production.

- Les échecs de validation lors de l'utilisation des méthodes `HTTP-01` et `TLS-ALPN-01` sont généralement dus à des configurations de réseau ou de pare-feu qui empêchent les serveurs de validation de Let's Encrypt d'atteindre votre serveur.

- Les échecs de validation lors de l'utilisation de la méthode `DNS-01` résultent souvent d'étapes manquées ou de fautes de frappe au cours du processus d'installation initial. En règle générale, cette méthode de validation nécessite la création d'un enregistrement CNAME dans votre zone DNS principale, ce qui permet à votre client de définir les enregistrements DNS nécessaires au cours du processus de validation.

### Dérogations

Nous ne proposons pas de dérogation pour cette limite.

</div>
<div class="boxed">

## Échecs d'autorisation consécutifs par identifiant et par compte

Similaire à [Échecs d'autorisation par identifiant par compte](#authorization-failures-per-identifier-per-account) mais ne s'applique qu'aux échecs consécutifs. Cette limite a pour but d'empêcher les clients d'être dans une boucle d'échecs de validation.

### Limite

Jusqu'à 1 152 échecs d'autorisation consécutifs par identifiant peuvent être encourus par un compte. Le nombre de tentatives d'autorisation échouées est réinitialisé à raison d'une
par identifiant chaque jour et revient à zéro si une autorisation pour cet
identifiant est validée avec succès. Une fois dépassée, le compte est empêché de demander de nouveaux certificats pour cet identifiant. Chaque fois que l'abonné tente de demander un certificat, il recevra une erreur contenant un lien vers notre portail libre-service où il peut réactiver la délivrance pour l'identifiant en pause et jusqu'à 49 999 identifiants en pause supplémentaires associés avec son compte.

| Échecs par jour | Temps de pause                            |
| --------------- | ----------------------------------------- |
| 1               | ∞ (jamais de pause)    |
| 2               | 1 152 jours (3,16 ans) |
| 5               | 288 jours (9,46 mois)  |
| 10              | 128 jours (4,21 mois)  |
| 15              | 82 jours (2,70 mois)   |
| 20              | 61 jours (1,99 mois)   |
| 30              | 40 jours                                  |
| 40              | 30 jours                                  |
| 120             | 10 jours                                  |

### Causes fréquentes

Avant de commencer le dépannage, nous vous recommandons de configurer votre client pour qu'il utilise notre
[environnement de préproduction](/docs/staging-environment). Cet environnement dispose de limites [nettement plus élevées](/docs/staging-environment/#rate-limits), ce qui peut vous aider à identifier les problèmes sans consommer les limites de votre production.

- Les échecs de validation lors de l'utilisation des méthodes `HTTP-01` et `TLS-ALPN-01` sont généralement dus à des configurations de réseau ou de pare-feu qui empêchent les serveurs de validation de Let's Encrypt d'atteindre votre serveur.

- Les échecs de validation lors de l'utilisation de la méthode `DNS-01` résultent souvent d'étapes manquées ou de fautes de frappe au cours du processus d'installation initial. En règle générale, cette méthode de validation nécessite la création d'un enregistrement CNAME dans votre zone DNS principale, ce qui permet à votre client de définir les enregistrements DNS nécessaires au cours du processus de validation.

### Dérogations

Nous ne proposons **pas** de dérogation pour cette limite.

</div>

# Limites de demandes globales

En plus de nos limites d'[enregistrement de compte](#account-registration-limits) et de [délivrance de certificat](#certificate-issuance-limits), il y a des limites de demandes globales par point de terminaison qui s'appliquent par adresse IP. Elles sont appliquées par nos équilibreurs de charge et sont conçues pour protéger l'API ACME d'être surchargée par des clients qui effectuent trop de demandes en une fois.

| Point de terminaison | Requête par IP (par seconde) | Capacité de pic |
| -------------------- | ----------------------------------------------- | --------------- |
| /acme/new-nonce      | 20                                              | 10              |
| /acme/new-account    | 5                                               | 15              |
| /acme/new-order      | 300                                             | 200             |
| /acme/revoke-cert    | 10                                              | 100             |
| /acme/renewal-info   | 1000                                            | 100             |
| /acme/\*             | 250                                             | 125             |
| /directory           | 40                                              | 40              |

Les abonnés qui dépassent ces limites recevront un code de réponse HTTP `503 Service Unavailable`. La réponse contiendra un en-tête `Retry-After`.

# Limiter les dérogations pour les renouvellements

Let's Encrypt reconnaît une nouvelle demande de certificat comme un « renouvellement » de deux façons : la méthode préférée est celle de l'ACME Renewal Info (ARI), qui est exemptée de toutes les limites d'utilisation, et l'autre méthode repose sur une ancienne logique de détection des renouvellements qui considère les demandes ayant exactement le même ensemble d'identifiants comme des renouvellements, mais qui peuvent toujours être soumises à certaines limites d'utilisation.

## Renouvellement par la méthode ARI

Les renouvellements coordonnés par l'ARI offrent l'avantage unique d'être exemptés de toute limite d'utilisation. Les clients qui prennent en charge l'ARI vérifient périodiquement auprès des serveurs Let's Encrypt si votre certificat existant doit être renouvelé. Lorsque la fenêtre de renouvellement optimale est atteinte, le client sollicite une nouvelle demande en indiquant explicitement le certificat qu'il remplace. Si la nouvelle demande comprend au moins un identifiant correspondant au certificat qu'elle entend remplacer et que le certificat n'a pas été remplacé auparavant par l'ARI, la demande ne sera soumise à aucune limite d'utilisation.

## Renouvellements non-ARI

Si votre client ou votre fournisseur d’hébergement n'a pas encore ajouté la prise en charge de l'ARI, votre demande peut toujours être considérée comme un renouvellement d'un certificat antérieur si elle contient exactement le même ensemble didentifiants, sans tenir compte des majuscules et de l'ordre des noms d'hôtes. Par exemple, si vous avez demandé un certificat pour les identifiants `[192.168.1.1, www.example.com, example.com]`, vous pourriez demander quatre certificats supplémentaires pour `[192.168.1.1, www.example.com, example.com]` avant d'atteindre la limite de [Nouveaux certificats par ensemble exact d'identifiants](#new-certificates-per-exact-set-of-identifiers). Chacune de ces nouvelles demandes serait considérée comme un renouvellement et serait exemptée des limites d'utilisation pour les [Nouvelles demandes par compte](#new-orders-per-account) et les [Nouveaux certificats par domaine enregistré](#new-certificates-per-registered-domain).
Toutefois, contrairement aux renouvellements d'ARI, ces demandes seront toujours soumises aux [Échecs d'autorisation par identifiant et par compte](#authorization-failures-per-identifier-per-account) et aux [Nouveaux certificats par ensemble exact d'identifiant](#new-certificates-per-exact-set-of-identifiers).

# Réessayer après avoir atteint les limites d'utilisation

Tous nos messages d'erreur concernant les limites d'utilisation ont le même format. Par exemple :

```
too many new registrations (10) from this IP address in the last 3h0m0s,
retry after 1970-01-01 00:18:15 UTC.
```

Vous devriez être en mesure d'effectuer la même demande après la date et l'heure indiquées. Si votre demande dépasse la capacité de plusieurs de nos limites, nous vous renverrons toujours le message d'erreur correspondant à la limite qui se réinitialise le plus loin dans le temps.

## En-tête "Retry-After"

Nous incluons un en-tête `Retry-After` dans toutes les réponses d'erreur de limite d'utilisation, indiquant la durée que votre client doit attendre avant de réessayer.

# Demander une dérogation

Si vous êtes un grand fournisseur d’hébergement ou une organisation travaillant sur une intégration de Let's Encrypt nous avons un [formulaire de limite d'utilisation](https://isrg.formstack.com/forms/rate_limit_adjustment_request) qui peut être utilisé pour demander des limites d'utilisation plus élevées. Le traitement des demandes prend quelques semaines. Ce formulaire n'est donc pas adapté si vous devez simplement réinitialiser une limite d'utilisation plus rapidement qu'elle ne le fait elle-même.
