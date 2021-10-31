---
title: Support IPv6
slug: ipv6-support
top_graphic: 1
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt prend en charge IPv6 pour accéder à l'API ACME à l'aide d'un client ACME, et pour les recherches DNS et les requêtes HTTP que nous faisons lors de la validation de votre contrôle des noms de domaine.

## Validation de domaine

Lors d'une demande de validation de domaine pour un domaine qui possède à la fois des adresses IPv4 et IPv6 (par exemple, des enregistrements "A" et "AAAA"), Let's Encrypt préférera toujours les adresses IPv6 pour la connexion initiale. Si la connexion IPv6 échoue au niveau du réseau (par exemple, il y a un délai d'attente (anglais:timeout)) et qu'il y a des adresses IPv4 disponibles, nous retenterons la demande avec l'un des adresses IPv4.

## Adresses IPv6 incorrectes

Souvent, les propriétaires de domaine ne seront pas au courant de l'existance d'un enregistrement «AAAA» pour leur domaine. Si l'adresse IPv6 dans l'enregistrement `AAAA` est incorrecte, cela affectera le processus de validation du domaine.

Généralement, l'adresse IPv6 pointera sur un serveur différent de celui pointé par l'adresse IPv4 sur lequel le client ACME est en cours d'exécution. Étant donné que le client ACME configure uniquement le serveur IPv4 pour répondre au défi, la validation du domaine échouera lorsque l'IPv6 du serveur sera utilisée.

Dans la plupart des cas, le correctif adéquat consiste à mettre à jour l'adresse IPv6 pour pointer vers le serveur sur lequel le client ACME est exécuté, ou de supprimer l'enregistrement «AAAA» si le Le domaine n'est pas destiné à fonctionner avec IPv6. Il n'y a aucun moyen de demander à Let's Encrypt de préférer IPv4, vous devez rectifier la configuration.

## Détails du nouvel essai IPv6 vers IPv4

La nouvelle tentative d'IPv6 à IPv4 se produit uniquement au terme de l'expiration de la connexion (anglais: connection timouts), pas sur d'autres types d'erreur.

Par exemple, dans le scénario des "Pièges courants" ci-dessus, une nouvelle tentative ne se produira pas si il y a un serveur Web écoutant l’adresse IPv6, mais ce serveur Web n’est pas prêt à relever le défi ACME. Dans ce cas, il n'y aura pas d'expiration de la connexion sur l'adresse IPv6 et le défi échouera sans nouvelle tentative car une réponse incorrecte a été renvoyée.

Pour garder notre logiciel d'AC (autorité de certification) simple, nous effectuons uniquement une nouvelle tentative d'IPv6 à IPv4 lors de la première demande de validation des défis "http-01". Si vous utilisez des redirections, ces redirections ne bénéficieront pas de nouvel essai.

Par exemple, un nom de domaine dispose d'un enregistrement «AAAA» qui expire (anglais: timeout) toujours et d'un enregistrement `A` avec un serveur Web qui redirige d'HTTP vers HTTPS puis de l'IPv6 vers l'IPv4 de secours, ne fonctionnera pas correctement. La première demande au domaine basculera correctement sur l'IPv4, recevant une redirection d'HTTP vers HTTPS. La demande suivante préférera de nouveau l'adresse IPv6 mais expirera sans basculer sur l'IPv4. Vous pouvez résoudre cette situation en corrigeant la configuration IPv6 ou supprimant la redirection HTTP vers HTTPS pour les demandes de validation de l'ACME via des défis HTTP-01.

## Getting Help

Si vous avez besoin d'aide pour diagnostiquer un problème lié à IPv6, veuillez visiter notre [forum communautaire](https://community.letsencrypt.org).
