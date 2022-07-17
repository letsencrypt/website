---
title: FAQ
linkTitle: Foire aux questions (FAQ)
slug: faq
top_graphic: 1
lastmod: 2020-04-23
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


Cette FAQ est divisée en deux sections:

* [Questions générales](#general)
* [Questions techniques](#technical)

# <a id="general">Questions générales</a>

## Quels sont les services proposés par Let's Encrypt ?

Let's Encrypt est une autorité de certification globale (CA). Nous laissons les personnes et les organisations du monde entier obtenir, renouveler et gérer les certificats SSL/TLS. Nos certificats peuvent être utilisés par les sites Web pour permettre des connexions HTTPS sécurisées.

Let's Encrypt propose des certificats de validation de domaine (DV). Nous n'offrons pas de validation d'organisation (OV) ni de validation étendue (EV) principalement parce que nous ne pouvons pas automatiser l'émission de ces types de certificats.

Pour commencer à utiliser Let's Encrypt, veuillez visiter notre page [Commencer à utiliser](/getting-started).

## Quel est le coût d’utilisation de Let’s Encrypt ? Est-ce vraiment gratuit ?

Nous ne facturons pas de frais pour nos certificats. Let's Encrypt est un organisme à but non lucratif, notre mission est de créer un Web plus sécurisé et respectueux de la vie privée en promouvant l'adoption généralisée de HTTPS. Nos services sont gratuits et faciles à utiliser afin que chaque site web puisse déployer HTTPS.

Nous avons besoin du soutien de mécènes, de subventions d'organismes et particuliers généreux afin de fournir nos services gratuitement dans le monde entier. Si vous êtes intéressé à nous soutenir, pensez à [faire un don](/donate) ou à [devenir sponsor](https://www.abetterinternet.org/sponsor/).

Dans certains cas, les intégrateurs (par exemple, les hébergeurs) factureront des frais nominaux qui reflètent les coûts administratifs et de gestion qu'ils encourent pour fournir des certificats Let's Encrypt.

## Quel type de support fournissez-vous ?

Let's Encrypt est géré par une petite équipe et s'appuie sur l'automatisation pour réduire les coûts. Cela étant, nous ne sommes pas en mesure d'offrir un soutien direct à nos abonnés. Nous avons toutefois de grandes options de soutien :

1. Nous avons une [documentation très utile](/docs).
2. Nous avons des [forums de soutien de la communauté très actifs et très utiles](https://community.letsencrypt.org/). Les membres de notre communauté font un excellent travail de réponse aux questions et bon nombre des questions les plus courantes ont déjà reçu des réponses.

Voici une [vidéo que nous aimons](https://www.youtube.com/watch?v=Xe1TZaElTAs) à propos de la puissance du grand support de la communauté.

## Un site web utilisant Let's Encrypt est impliqué dans du hameçonnage, des logiciels malveillants, des arnaques...  Que devrais-je faire ?

Nous recommandons de signaler ces sites à Google Safe Browsing et au programme Microsoft Smart Screen, qui sont en mesure de protéger plus efficacement les utilisateurs. Voici les URL de rapport :

* [https://safebrowsing.google.com/safebrowsing/report_badware/?hl=fr](https://safebrowsing.google.com/safebrowsing/report_badware/)
* [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

Si vous souhaitez en savoir plus sur nos politiques et nos raisons, vous pouvez le faire ici :

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Questions techniques</a>

## Est-ce que mon navigateur fait confiance aux certificats Let’s Encrypt ?

Pour la plupart des navigateurs et systèmes d’exploitation, oui. Vous pouvez consulter la [liste de comptabilité](/docs/cert-compat) pour plus de détails.

## Est-ce que Let's Encrypt délivre des certificats pour autre chose que SSL/TLS pour les sites Web ?

Les certificats Let's Encrypt sont des certificats standard de validation de domaine, vous pouvez donc les utiliser pour tout serveur qui utilise un nom de domaine, comme les serveurs Web, les serveurs de messagerie, les serveurs FTP et bien d'autres.

Le chiffrement de courriel et la signature de code nécessitent un autre type de certificat que Let's Encrypt ne propose pas.

## Est-ce que Let’s Encrypt génère ou enregistre les clés privées de mes certificats sur les serveurs de Let’s Encrypt ?

Non. Jamais.

La clé privée est toujours générée et gérée par vos propres serveurs, et non pas par l’autorité de certification Let’s Encrypt.

## Quelle est la durée de vie des certificats Let’s Encrypt ? Pour combien de temps sont-ils valides ?

Nos certificats sont valides pendant 90 jours. [Cet article](/2015/11/09/why-90-days.html) explique pourquoi.

Il n'est pas possible d'ajuster cela, et il n'y a aucune exception. Nous recommandons de renouveler automatiquement vos certificats tous les 60 jours.

## Est-ce que Let’s Encrypt va un jour générer des certificats Organization Validation (OV) ou Extended Validation (EV) ?

Nous n'avons pas prévu d'émettre de certificats OV ou EV.

## Est-ce que je peux obtenir un certificat pour plusieurs noms de domaines (certificats SAN ou UCC) ?

Oui, le même certificat peut contenir plusieurs noms différents en utilisant le mécanisme « Subject Alternative Name (SAN) ».

## Est-ce que Let's Encrypt émet des certificats génériques ?

Oui. L'émission de certificats génériques doit être effectuée via ACMEv2 en utilisant le défi DNS-01. Consultez [ce message](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) pour plus d'informations techniques.

## Y a-t-il un client Let's Encrypt (ACME) pour mon système d'exploitation ?

Il y a un grand nombre de [clients ACME](/docs/client-options) disponibles. Il y a de fortes chances que cela fonctionne sans problème sur votre système. Nous vous recommandons de commencer par [Certbot](https://certbot.eff.org/).

## Puis-je utiliser une clé privée existante ou une requête de signature de certificat (CSR) ?

Oui, mais tous les clients ne supportent pas cette fonction. [Certbot](https://certbot.eff.org/) le fait.

## Quelles sont les adresses IP utilisées par Let's Encrypt pour valider mon serveur web ?

Nous ne publions pas de liste d'adresses IP que nous utilisons pour valider, et ces adresses IP peuvent changer à tout moment. Veuillez noter que maintenant, nous [validons à partir de plusieurs adresses IP](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## J'ai renouvelé avec succès un certificat mais la validation n'a pas eu lieu cette fois-ci - comment cela est-il possible ?

Dès que vous avez terminé avec succès les challenges pour un domaine, l'autorisation résultante est mise en cache pour que votre compte puisse être réutilisé plus tard. Les autorisations mises en cache ont une durée de 30 jours à compter de la validation. Si le certificat que vous avez demandé comporte toutes les autorisations nécessaires mises en cache, la validation ne se fera plus jusqu'à l'expiration des autorisations mises en cache correspondantes.
