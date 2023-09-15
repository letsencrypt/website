---
title: Certificate Authority Authorization (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---


La CAA est un type d'enregistrement DNS qui permet aux propriétaires de sites de spécifier quelles autorités de certification (CA) sont autorisées à délivrer des certificats contenant leurs noms de domaine. Elle a été normalisée en 2013 par le [RFC 6844](https://tools.ietf.org/html/rfc6844) pour permettre à une autorité de certification de "réduire le risque de mauvaise émission involontaire de certificat." Par défaut, chaque AC publique est autorisée à émettre des certificats pour tout nom de domaine dans le DNS public, à condition de valider le contrôle de ce nom de domaine. Cela signifie que si un bogue survient dans l'un des nombreux processus de validation des autorités de certification publiques, chaque nom de domaine est potentiellement affecté. La CAA offre aux détenteurs de domaines un moyen de réduire ce risque.

# Utilisation de la CAA

Si vous ne vous préoccupez pas de la CAA, vous n'avez généralement rien à faire (mais voyez les erreurs CAA ci-dessous). Si vous souhaitez utiliser la CAA pour restreindre les autorités de certification autorisées à émettre des certificats pour votre domaine, vous devrez utiliser un fournisseur DNS qui prend en charge la définition d'enregistrements CAA. Consultez la page [CAA de SSLMate](https://sslmate.com/caa/support) pour obtenir une liste de ces fournisseurs. Si votre fournisseur est répertorié, vous pouvez utiliser le [générateur d'enregistrements CAA de SSLMate](https://sslmate.com/caa/) pour générer un ensemble d'enregistrements CAA répertoriant les AC que vous souhaitez autoriser.

Le nom de domaine d'identification de Let's Encrypt pour la CAA est `letsencrypt.org`. Ceci est officiellement documenté dans notre [Déclaration des pratiques de certification (CPS), section 4.2.1](/repository).

## Où ajouter l'entrée

Vous pouvez définir des enregistrements CAA sur votre domaine principal, ou à n'importe quel niveau de sous-domaine. Par exemple, si vous possédez `www.community.example.com`, vous pouvez définir des enregistrements CAA pour le nom complet, ou pour `community.example.com`, ou pour `example.com`. Les AC vérifieront chaque version, de gauche à droite, et s'arrêteront dès qu'ils verront un quelconque enregistrement CAA. Ainsi, par exemple, un enregistrement CAA à `community.example.com` aura la priorité sur un enregistrement à `example.com`. La plupart des personnes qui ajoutent des enregistrements CAA voudront les ajouter à leur domaine enregistré (`example.com`) afin qu'ils s'appliquent à tous les sous-domaines. Notez également que les enregistrements CAA pour les sous-domaines ont la priorité sur leurs domaines parents, qu'ils soient plus permissifs ou plus restrictifs. Ainsi, un sous-domaine peut lever une restriction mise en place par un domaine parent.

La validation CAA suit les CNAME, comme toutes les autres demandes DNS. Si `www.community.example.com` est un CNAME vers `web1.example.net`, l'AC demandera d'abord des enregistrements CAA pour `www.community.example.com`, puis, voyant qu'il existe un CNAME pour ce nom de domaine au lieu d'enregistrements CAA, demandera des enregistrements CAA pour `web1.example.net`. Notez que si un nom de domaine a un enregistrement CNAME, il n'est pas autorisé à avoir d'autres enregistrements selon les normes DNS.

Le [CAA RFC](https://tools.ietf.org/html/rfc6844) spécifie un comportement supplémentaire appelé "tree-climbing" qui exige que les CA vérifient également les domaines parents du résultat de la résolution CNAME. Ce comportement a ensuite été supprimé par [un erratum](https://www.rfc-editor.org/errata/eid5065), de sorte que Let's Encrypt et d'autres AC ne le mettent pas en œuvre.

# Erreurs CAA

Puisque Let's Encrypt vérifie les enregistrements CAA avant chaque certificat que nous émettons, il arrive parfois que nous obtenions des erreurs même pour les domaines qui n'ont pas défini d'enregistrements CAA. Lorsque nous obtenons une erreur, il n'y a aucun moyen de savoir si nous sommes autorisés à émettre pour le domaine concerné, car il pourrait y avoir des enregistrements CAA présents qui interdisent la délivrance, mais qui ne sont pas visibles à cause de l'erreur.

Si vous recevez des erreurs liées à la CAA, essayez plusieurs fois avec notre environnement de [préproduction](/docs/staging-environment) pour voir si elles sont temporaires ou permanentes. Si elles sont permanentes, vous devrez déposer une demande d'assistance auprès de votre fournisseur de DNS ou changer de fournisseur. Si vous n'êtes pas sûr de savoir qui est votre fournisseur de DNS, demandez à votre fournisseur d'hébergement.

Certains fournisseurs de DNS qui ne sont pas familiers avec le CAA répondent initialement aux rapports de problèmes par "Nous ne prenons pas en charge les enregistrements CAA". Votre fournisseur DNS n'a pas besoin de de prendre spécifiquement en charge les enregistrements CAA ; il doit seulement répondre par une réponse NOERROR pour les types de requêtes inconnus (y compris le CAA). Renvoyer d'autres opcodes, y compris NOTIMP, pour des qtypes non reconnus est une violation de la [RFC 1035](https://tools.ietf.org/html/rfc1035), et doit être corrigé.

# SERVFAIL

L'une des erreurs les plus courantes que les utilisateurs rencontrent est le SERVFAIL. Le plus souvent, cela indique un échec de la validation DNSSEC. Si vous obtenez une erreur SERVFAIL, votre première étape devrait être d'utiliser un débogueur DNSSEC comme [dnsviz.net](http://dnsviz.net/). Si cela ne fonctionne pas, il est possible que vos serveurs de noms génèrent des signatures incorrectes uniquement lorsque la réponse est vide. Et les réponses de la CAA sont le plus souvent vides.  Par exemple, PowerDNS [avait ce bogue dans les versions 4.0.3 et inférieures](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Si vous n'avez pas activé DNSSEC et que vous obtenez un SERVFAIL, la deuxième raison la plus probable est que votre serveur de noms faisant autorité a renvoyé NOTIMP, ce qui, comme décrit ci-dessus, est une violation de la RFC 1035 ; il devrait plutôt renvoyer NOERROR avec une réponse vide. Si tel est le cas, déposez un message d'erreur ou un ticket d'assistance auprès de votre fournisseur de DNS.

Enfin, les SERVFAIL peuvent être causés par des pannes au niveau de vos serveurs de noms faisant autorité. Vérifiez les enregistrements NS de vos serveurs de noms et assurez-vous que chaque serveur est disponible.

# Timeout

Parfois, les requêtes de la CAA sont interrompues. C'est-à-dire que le serveur de noms faisant autorité ne répond jamais, même après plusieurs tentatives. Le plus souvent, cela se produit lorsque votre serveur de noms est protégé par un pare-feu mal configuré qui rejette les requêtes DNS avec des qtypes inconnus. Déposez un ticket d'assistance auprès de votre fournisseur de DNS et demandez-lui si un tel pare-feu est configuré.
