---
title: Emails d'expiration
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2021-09-25
show_lastmod: 1
---


# S'abonner

Si vous fournissez une adresse e-mail à Let's Encrypt lorsque vous créez votre compte, nous ferons de notre mieux pour vous envoyer automatiquement des avis d'expiration lorsque votre certificat doit être renouvelé. Nous essayons d'envoyer le premier avis 20 jours avant l'expiration de votre certificat, puis d'autres avis 10 jours et 1 jour avant son expiration. Nous vous recommandons de vous fier à votre client ACME pour renouveler automatiquement vos certificats, et d'utiliser ces avis d'expiration comme un rappel pour vérifier votre automatisation.

# Quand vous recevez un courriel d'expiration

Si votre certificat est déjà renouvelé, nous n'enverrons pas d'avis d'expiration. Nous considérons qu'un certificat est renouvelé s'il existe un certificat plus récent avec exactement le même ensemble de noms, quel que soit le compte qui l'a créé. Si vous avez émis un nouveau certificat qui ajoute ou supprime un nom par rapport à votre ancien certificat, vous recevrez un courriel d'expiration concernant votre ancien certificat. Si vous vérifiez le certificat en cours d'exécution sur votre site web et qu'il indique la date correcte, aucune autre action n'est nécessaire.

# Désabonnement

Le corps du courriel comporte un lien permettant de se désabonner des futurs avis. Si vous cliquez sur ce lien, vous ne recevrez aucun avis d'expiration pour l'année suivante. La liste des "personnes désinscrites" est indépendante pour les avis de pré-production et les avis de production, vous pouvez donc vous désinscrire de pré-production sans affecter votre statut production.

Notez que votre désabonnement n'est valable que pour un an, vous devrez donc le renouveler chaque année.

Il n'y a pas encore de moyen pour nous de vous réabonner de manière efficace si vous vous désabonnez. Notre fournisseur de courrier électronique, Mandrill, [dispose d'un mécanisme manuel que nous devons encore automatiser](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Cependant, vous pouvez changer l'adresse électronique de votre compte, ce qui vous réabonne effectivement. De nombreux services de courrier électronique courants traitent `votre nom+1@example.com` de la même manière que `yourname@example.com`. Ainsi, si vous mettez à jour votre adresse électronique en `votre nom+1@example.com`, vous pouvez recommencer à recevoir le courrier d'expiration. Avec Certbot, utilisez :

`certbot update_account --email yourname+1@example.com`
