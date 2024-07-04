---
title: Certificate Authority Authorization (CAA)
slug: caa
date: 2017-07-27
lastmod: 2023-08-16
show_lastmod: 1
---


La CAA est un type d'enregistrement DNS qui permet aux propriétaires de sites de spécifier quelles autorités de certification (CA) sont autorisées à émettre des certificats contenant leurs noms de domaine. Elle a été normalisée pour la première fois en 2013, et la version que nous utilisons aujourd'hui a été normalisée en 2019 par [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659) et [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657). Par défaut, chaque AC publique est autorisée à délivrer des certificats pour n'importe quel nom de domaine dans le DNS public, à condition qu'elle valide le contrôle de ce nom de domaine. Cela signifie que si un bogue survient dans l'un des processus de validation des nombreuses AC publiques, tous les noms de domaine sont potentiellement concernés. La CAA offre aux détenteurs de domaines un moyen de réduire ce risque.

# Utilisation de la CAA

Si vous ne vous préoccupez pas de la CAA, vous n'avez généralement rien à faire (mais voyez les erreurs CAA ci-dessous). Si vous souhaitez utiliser la CAA pour restreindre les autorités de certification autorisées à émettre des certificats pour votre domaine, vous devrez utiliser un fournisseur DNS qui prend en charge la définition d'enregistrements CAA. Consultez la page [CAA de SSLMate](https://sslmate.com/caa/support) pour obtenir une liste de ces fournisseurs. Si votre fournisseur est répertorié, vous pouvez utiliser le [générateur d'enregistrements CAA de SSLMate](https://sslmate.com/caa/) pour générer un ensemble d'enregistrements CAA répertoriant les AC que vous souhaitez autoriser.

## Où ajouter l'entrée

En règle générale, vous souhaitez définir des enregistrements CAA sur votre domaine enregistré (tel que "exemple.org" ou "mysite.co.uk"). De cette façon, ils s'appliquent à la fois à ce domaine et à tous les sous-domaines que vous créez sous celui-ci, comme "community.example.org".

Notez que l'AC respectera toujours l'enregistrement CAA *le plus proche* du nom de domaine pour lequel elle délivre un certificat. Ainsi, si vous demandez un certificat pour "www.community.example.org", l'AC vérifiera "www.community.example.org", puis "community.example.org", puis "example.org", en s'arrêtant au premier enregistrement CAA qu'elle trouvera.

Cela signifie que vous pouvez ignorer la CAA pour les sous-domaines. Supposons par exemple que vous hébergez vous-même "exemple.org", mais que vous avez "api.exemple.org" chez un fournisseur de services en ligne. Vous pouvez utiliser un enregistrement CAA sur "example.org" pour indiquer que seul Let's Encrypt peut délivrer des certificats pour ce domaine et tous ses sous-domaines, mais aussi utiliser un enregistrement CAA sur "api.example.org" pour passer outre et autoriser le fournisseur de cloud à délivrer des certificats pour ce seul sous-domaine.

Notez également que la vérification de la CAA suit les redirections CNAME, comme toutes les autres demandes DNS. Si "community.example.org" est un CNAME vers "example.forum.com", l'AC respectera tous les enregistrements CAA définis sur "example.forum.com". Un nom de domaine avec un enregistrement CNAME ne peut pas avoir d'autres enregistrements. Il ne peut donc pas y avoir de conflits entre les enregistrements CAA sur le nom d'origine et les enregistrements CAA sur la cible de la redirection.

## Ce qu'il faut mettre dans l'enregistrement

Tous les enregistrements de la CAA suivent le même format de base :

```
CAA <flags> <tag> <value>
```

Les **flags** ne sont que des entiers et devraient presque toujours être des entiers `0`, indiquant qu'aucun flag n'a été défini. Si vous le souhaitez, vous pouvez attribuer aux flags la valeur entière `128`, ce qui indique que le "bit critique" a été activé et que les AC doivent immédiatement interrompre leur activité et ne pas délivrer de certificat si elles ne reconnaissent pas le contenu du champ "tag".

Le **tag** est une chaîne de caractères indiquant de quel type d'enregistrement CAA il s'agit : soit `issue`, soit `issuewild` dans la plupart des cas. Plus d'informations à ce sujet ci-dessous.

Enfin, la **valeur** est une chaîne contenant au maximum un identifiant d'AC (tel que "letsencrypt.org") et quelques paramètres facultatifs séparés par des points-virgules, également abordés ci-dessous.

### Les propriétés `issue` et `issuewild`

Les enregistrements comportant la balise `issue` déterminent simplement si une AC peut délivrer des certificats pour ce domaine et ses sous-domaines. En général, c'est le seul enregistrement dont vous avez besoin, car il contrôle à la fois l'émission normale (par exemple "exemple.org") et l'émission de caractères génériques (par exemple "*.exemple.org") en l'absence d'autres enregistrements. Vous contrôlez quelle AC peut émettre pour ce domaine en mettant le nom de domaine d'identification de cette AC dans la partie valeur de l'enregistrement CAA.

Les enregistrements comportant la balise `issuewild` déterminent si une AC peut délivrer des certificats *wildcard* (par exemple, "*.example.org"). Vous ne devez utiliser les enregistrements `issuewild` que si vous souhaitez des autorisations différentes pour la délivrance de caractères génériques et non génériques.

Notez que vous pouvez avoir plusieurs enregistrements avec le même type de propriété et qu'ils sont *additifs* : si l'un de ces enregistrements permet à l'AC de délivrer, alors il est autorisé.

Le nom de domaine d'identification de Let's Encrypt pour la CAA est `letsencrypt.org`. Ceci est officiellement documenté dans la [Section 4.2.1 de notre CP/CPS](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions).

### Le paramètre `validationmethods`

Ce paramètre peut être placé après le nom de domaine d'identification de l'AC pour contrôler les méthodes de validation que l'AC peut utiliser pour confirmer le contrôle du domaine. Ceci peut être utilisé pour restreindre la validation aux méthodes auxquelles vous faites le plus confiance. Par exemple, si vous voulez limiter l'AC à l'utilisation de la méthode TLS-ALPN-01, vous pouvez ajouter `;validationmethods=tls-alpn-01` à la valeur de votre enregistrement CAA.

Let's Encrypt reconnaît les chaînes de méthodes de validation suivantes :

* `http-01`
* `dns-01`
* `tls-alpn-01`

### Le paramètre `accounturi`

Ce paramètre peut être placé après le nom de domaine d'identification de l'AC afin de contrôler quels comptes ACME peuvent demander la délivrance pour le domaine. Cela peut être utilisé pour s'assurer que quelqu'un qui détourne temporairement votre domaine, mais qui n'a pas accès à la clé de votre compte ACME, ne puisse pas émettre de certificats malveillants.

Les URI de compte de Let's Encrypt ressemblent à `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`, où les chiffres à la fin sont votre ID de compte.

### Exemples

Un simple enregistrement CAA permettant à Let's Encrypt d'émettre pour "exemple.org" pourrait ressembler à ceci :

```
example.org         CAA 0 issue "letsencrypt.org"
```

Un jeu d'enregistrement plus complexe de la CAA pourrait ressembler à ce qui suit :

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

Dans cet exemple, MyCA peut émettre pour "exemple.org", mais seulement en utilisant la méthode de validation DNS-01. Il peut également émettre des certificats de type "wildcard", en utilisant n'importe quelle méthode de validation. Enfin, OtherCA peut également délivrer des certificats, mais uniquement si la demande émane du numéro de compte `123456`, et uniquement si OtherCA reconnaît la restriction `accounturi` et sait comment la gérer correctement.


# Erreurs CAA

Puisque Let's Encrypt vérifie les enregistrements CAA avant chaque certificat que nous émettons, il arrive parfois que nous obtenions des erreurs même pour les domaines qui n'ont pas défini d'enregistrements CAA. Lorsque nous obtenons une erreur, il n'y a aucun moyen de savoir si nous sommes autorisés à émettre pour le domaine concerné, car il pourrait y avoir des enregistrements CAA présents qui interdisent la délivrance, mais qui ne sont pas visibles à cause de l'erreur.

Si vous recevez des erreurs liées à la CAA, essayez plusieurs fois avec notre environnement de [préproduction](/docs/staging-environment) pour voir si elles sont temporaires ou permanentes. Si elles sont permanentes, vous devrez déposer une demande d'assistance auprès de votre fournisseur de DNS ou changer de fournisseur. Si vous n'êtes pas sûr de savoir qui est votre fournisseur de DNS, demandez à votre fournisseur d'hébergement.

Certains fournisseurs de DNS qui ne connaissent pas la CAA répondent d'abord aux rapports de problèmes par "Nous ne prenons pas en charge les enregistrements CAA." Votre fournisseur DNS n'a pas besoin de prendre en charge spécifiquement les enregistrements CAA ; il doit seulement répondre avec une réponse NOERROR pour les types de requêtes inconnus (y compris CAA). Renvoyer d'autres opcodes, y compris NOTIMP, pour des qtypes non reconnus est une violation de la [RFC 1035](https://tools.ietf.org/html/rfc1035), et doit être corrigé.

## SERVFAIL

L'une des erreurs les plus courantes que les utilisateurs rencontrent est le SERVFAIL. Le plus souvent, cela indique un échec de la validation DNSSEC. Si vous obtenez une erreur SERVFAIL, votre première étape devrait être d'utiliser un débogueur DNSSEC comme [dnsviz.net](http://dnsviz.net/). Si cela ne fonctionne pas, il est possible que vos serveurs de noms génèrent des signatures incorrectes uniquement lorsque la réponse est vide. Et les réponses de la CAA sont le plus souvent vides.  Par exemple, PowerDNS [avait ce bogue dans les versions 4.0.3 et inférieures](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si vous n'avez pas activé DNSSEC et que vous obtenez un SERVFAIL, la deuxième raison la plus probable est que votre serveur de noms faisant autorité a renvoyé NOTIMP, ce qui, comme décrit ci-dessus, est une violation de la RFC 1035 ; il devrait plutôt renvoyer NOERROR avec une réponse vide. Si tel est le cas, déposez un message d'erreur ou un ticket d'assistance auprès de votre fournisseur de DNS.

Enfin, les SERVFAIL peuvent être causés par des pannes au niveau de vos serveurs de noms faisant autorité. Vérifiez les enregistrements NS de vos serveurs de noms et assurez-vous que chaque serveur est disponible.

## Timeout

Parfois, les requêtes de la CAA sont interrompues. C'est-à-dire que le serveur de noms faisant autorité ne répond jamais, même après plusieurs tentatives. Le plus souvent, cela se produit lorsque votre serveur de noms est protégé par un pare-feu mal configuré qui rejette les requêtes DNS avec des qtypes inconnus. Déposez un ticket d'assistance auprès de votre fournisseur de DNS et demandez-lui si un tel pare-feu est configuré.
