---
title: Notifications par e-mail
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2019-04-18
show_lastmod: 1
---


# Souscription

Si vous fournissez une adresse e-mail à Let's Encrypt lorsque vous crééz un compte, nous vous enverrons automatiquement des notifications d'expiration lorsque votre certificat approchera de sa date de renouvellement. Nous envoyons la première notification 20 jours avant que votre certificat n'expire, puis un rappel à 10 jours et un dernier 1 jour avant expiration. 


# Lorsque vous recevez un courriel d'expiration

Si votre certificat est déjà renouvelé, nous n'enverrons pas d'avis d'expiration. Nous
considérons  un certificat comme renouvelé lorsqu'il existe un certificat plus récent
avec exactement le même ensemble de noms, quel que soit le compte qui l'a créé.
Si vous avez émis un nouveau certificat qui ajoute ou supprime un nom relatif (SAN) à votre
ancien certificat, vous recevrez un e-mail d'expiration concernant votre ancien certificat.
Si vous vérifiez le certificat en cours d'exploitation sur votre site Web et qu'il affiche la date correcte, aucune autre action n'est nécessaire.

# Désinscription

Le corps du message contient un lien pour se désinscrire des notifications futures. Si vous
cliquez sur ce lien, vous ne recevrez aucun avis d'expiration pour l'année prochaine.
La liste des "Qui est désinscrit" (who's unsubscribed) est indépendante pour les avis émis par le système de Qualification et celui de Production.
Vous pouvez donc vous désinscrire des notifications du système de Qualification sans affecter les notifications du système de Production.

Notez que votre désinscription n'est valable que pour un an, vous devrez donc la renouveler chaque année. 

Il n'y a pas encore de moyen pour nous de vous réinscrire efficacement si vous vous désabonnez. Notre fournisseur de messagerie, Mandrill, [a un mécanisme manuel que nous devons encore
automatiser](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).


Cependant, vous pouvez modifier l'adresse e-mail de votre compte, ce qui vous réabonne. De nombreux services de messagerie courants traitent `yourname+1@example.com` identique à `yourname@example.com`. Donc, si vous mettez à jour votre adresse e-mail pour `yourname+1@example.com`, vous pouvez recommencer à recevoir des messages d'expiration. Avec Certbot, utilisez:

`certbot update_account --email yourname+1@example.com`
