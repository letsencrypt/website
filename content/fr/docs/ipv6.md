---
title: Support IPv6
slug: ipv6-support
top_graphic: 1
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt supporte IPv6 à la fois pour l'accès à l'API ACME en utilisant un client ACME, et pour les consultations DNS et les requêtes HTTP que nous effectuons lors de la validation de votre contrôle des noms de domaine.

## Validation du domaine

Lors de requêtes de validation de domaine, pour un domaine qui possède à la fois des adresses IPv4 et IPv6 (par exemple les deux enregistrements `A` et `AAAA`) Let's Encrypt préfèrera toujours les adresses IPv6 pour la connexion initiale. Si la connexion IPv6 échoue au niveau du réseau (par exemple, s'il y a un dépassement de délai) et que des adresses IPv4 sont disponibles, nous retenterons la demande avec une des adresses IPv4.

## Adresses IPv6 incorrectes

Souvent, les propriétaires de domaines ne sont pas conscients de l'existence d'un `AAAA` pour leur domaine. Si l'adresse IPv6 dans l'enregistrement `AAAA` est incorrecte, cela affectera le processus de validation du domaine.

Commonly the IPv6 address will be a different server than the IPv4 address where the ACME client is being run. Comme le client ACME ne configure le serveur IPv4 que pour répondre au test de validation du domaine, la validation échouera lorsque le serveur IPv6 sera utilisé.

Dans la plupart des cas, la correction consiste à mettre à jour l'adresse IPv6 pour qu'elle pointe vers le serveur sur lequel tourne le client ACME, ou à supprimer l'enregistrement `AAAA` si le domaine n'est pas destiné à fonctionner avec IPv6. Il n'y a pas moyen de demander à Let's Encrypt de préférer IPv4, vous devez corriger la mauvaise configuration.

## Détails de la relance IPv6 à IPv4

La tentative d'IPv6 à IPv4 n'a lieu que lorsque les délais de connexion sont dépassés, et non pour d'autres types d'erreurs.

Par exemple, dans le scénario "Pièges communs" ("Common Pitfalls") ci-dessus, une nouvelle tentative ne se produira pas si un serveur web écoute l'adresse IPv6, mais que ce serveur n'est pas prêt à relever le challenge ACME. Dans ce cas, il n'y aurait pas de délai de connexion pour accéder à l'adresse IPv6 et le challenge échouera sans nouvelle tentative parce qu'une réponse incorrecte a été renvoyée.

Pour que notre logiciel d'AC reste simple, nous n'effectuons qu'une nouvelle tentative IPv6 à IPv4 à la première demande lors de la validation des challenges "http-01". Si vous utilisez des redirections, les redirections n'obtiendront pas de nouveau traitement.

Par exemple, si un nom de domaine a un enregistrement `AAAA` qui s'arrête toujours et un enregistrement `A` avec un serveur web qui redirige de HTTP à HTTPS, alors le repli IPv6 à IPv4 ne fonctionnera pas correctement. La première requête au domaine se rabattra correctement sur IPv4, recevant une redirection de HTTP vers HTTPS. La demande suivante préférera à nouveau l'adresse IPv6, mais s'arrêtera sans revenir à l'IPv4. Vous pouvez résoudre cette situation soit en corrigeant la mauvaise configuration d'IPv6, soit en supprimant la redirection HTTP vers HTTPS pour les requêtes vers le chemin du challenge ACME HTTP-01.

## Obtenir de l'aide

Si vous avez besoin d'aide pour diagnostiquer un problème lié à l'IPv6, veuillez consulter notre [forum communautaire](https://community.letsencrypt.org).
