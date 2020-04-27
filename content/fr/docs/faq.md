---
title: Questions fréquentes (FAQ)
linkTitle: Questions fréquentes (FAQ)
slug: faq
top_graphic: 1
lastmod: 2020-02-20
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Cette rubrique Questions Fréquentes est divisée en sections suivantes:

* [Questions d'ordre général](#general)
* [Questions techniques](#technical)

# <a id="general">Questions d'ordre général</a>

## Quels services offre Let's Encrypt?

Let's Encrypt est une autorité de certification (CA) mondiale. Nous permettons aux personnes et aux organisations du monde entier d'obtenir, de renouveler et de gérer des certificats SSL/TLS. Nos certificats peuvent être utilisés par des sites Web pour permettre des connexions HTTPS sécurisées.

Let's Encrypt propose des certificats de validation de domaine (DV). Nous n'offrons pas de validation d'organisation (OV) ou de validation étendue (EV) principalement parce que nous ne pouvons pas automatiser l'émission de ces types de certificats.

Pour commencer à utiliser Let's Encrypt, veuillez consulter notre page [Mise en route](/getting-started).

## Combien coûte l'utilisation de Let's Encrypt? Est-ce vraiment gratuit?

Nous ne facturons pas de frais pour nos certificats. Let's Encrypt est un organisme à but non lucratif, notre mission est de créer un Web plus sécurisé et respectueux de la vie privée en favorisant l'adoption généralisée de HTTPS. Nos services sont gratuits et faciles à utiliser afin que chaque site web puisse déployer HTTPS.

Nous avons besoin du soutien de généreux sponsors, donateurs et particuliers afin de fournir nos services gratuitement à travers le monde. Si vous souhaitez nous soutenir, n'hésitez pas a [faire un don](/donate) ou [devenir un sponsor](/become-a-sponsor).

Dans certains cas, les intégrateurs (par exemple les hébergeurs) factureront des frais nominaux qui reflètent les coûts administratifs et de gestion qu'ils engagent pour fournir les certificats Let's Encrypt.

## Quel type d'assistance proposez-vous?

Let's Encrypt est géré par une petite équipe et s'appuie sur l'automatisation pour réduire les coûts. Cela étant, nous ne sommes pas en mesure d'offrir une assistance directe à nos souscripteurs. Nous avons cependant d'excellentes options de support:

1. Nous avons une [documentation](/docs) vraiment utile.
2. Nous avons des [forums de support communautaire](https://community.letsencrypt.org/) très actifs. Les membres de notre communauté font un excellent travail en répondant aux questions. Nombre d'entre elles, parmi les plus courantes, ont déjà une réponse.

Voici une [vidéo que nous aimons](https://www.youtube.com/watch?v=Xe1TZaElTAs) concernant le pouvoir d'un important soutien communautaire.

## Un site Web utilisant Let's Encrypt est compromis dans de l' Hameçonnage/Logicel malveillant/Arnaque/... , que devrais-je faire?

Nous vous recommandons de signaler ces sites à Google Safe Browsing et au programme Microsoft Smart Screen, qui sont en mesure de protéger plus efficacement les utilisateurs. Voici l'URL de signalement Google:

[https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)

Si vous souhaitez en savoir plus sur nos politiques et notre justification, vous pouvez le faire ici:

[https://letsencrypt.org/2015/10/29/phishing-and-malware.html](https://letsencrypt.org/2015/10/29/phishing-and-malware.html)

# <a id="technical">Questions techniques</a>

## Les certificats de Let's Encrypt sont-ils approuvés par mon navigateur?

Pour la plupart des navigateurs et des systèmes d'exploitation, oui. Voir la [liste de compatibilité](/docs/cert-compat) pour plus de détails.

## Let's Encrypt émet-il des certificats pour d'autres usages que SSL/TLS pour les sites Web?

Les certificats Let's Encrypt sont des certificats de validation de domaine standard, vous pouvez donc les utiliser pour n'importe quel serveur qui utilise un nom de domaine, comme les serveurs Web, les serveurs de messagerie, les serveurs FTP et bien d'autres.

Le chiffrement des e-mails et la signature de code nécessitent un type de certificat différent que Let's Encrypt ne délivre pas.

## Let's Encrypt génère-t-il ou stocke-t-il les clés privées de mes certificats sur les serveurs de Let's Encrypt?

Non. Jamais.

La clef privée est toujours générée et gérée sur vos propres serveurs, et non par l'autorité de certification Let's Encrypt.

## Quelle est la durée de vie des certificats Let's Encrypt? Pour combien de temps sont-ils valables?

Nos certificats sont valables 90 jours. Vous pouvez lire pourquoi [ici](/2015/11/09/why-90-days.html).

Il n'y a aucun moyen de paramètrer cela, il n'y a pas d'exceptions. Nous vous recommandons de renouveler automatiquement vos certificats tous les 60 jours.

## Let's Encrypt émettra-t-il des certificats de validation d'organisation (OV) ou de validation étendue (EV)?

Nous n'avons pas l'intention d'émettre des certificats OV ou EV.

## Puis-je obtenir un certificat pour plusieurs noms de domaine (certificats SAN ou certificats UCC)?

Oui, le même certificat peut contenir plusieurs noms différents à l'aide du mécanisme du Subject Alternative Name (SAN).

## Let's Encrypt émet-il des certificats génériques (wildcard)?

Oui. L'émission de caractères génériques doit être effectuée via ACMEv2 à l'aide du défi DNS-01. Voir [ce sujet](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) pour plus de détails techniques.

## Existe-t-il un client Let's Encrypt (ACME) pour mon système d'exploitation?

Il existe une grand nombre de [clients ACME](/docs/client-options) disponibles. Il y a de grandes chances que quelque chose fonctionne correctement sur votre système d'exploitation. Nous vous recommendons de débuter avec [Certbot](https://certbot.eff.org/).

## Puis-je utiliser une clé privée ou une demande de signature de certificat (CSR) existante?

Oui, mais tous les clients ne prennent pas en charge cette fonctionnalité. [Certbot](https://certbot.eff.org/) le fait.

## Quelles adresses IP Let's Encrypt utilise-t-il pour valider mon serveur Web?
Nous ne publions pas de liste d'adresses IP que nous utilisons pour les validations, de plus ces adresses IP peuvent changer à tout moment. Notez que notre [validation est maintenant réalisée à partir de plusieurs adresses IP](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html).

## J'ai renouvelé avec succès un certificat, mais cette fois-ci la validation n'a pas eu lieu  - comment est-ce possible?

Une fois que vous avez réussi les défis pour un domaine, l'autorisation résultante est mise en cache pour que votre compte puisse, ultérieurement, l'utiliser de nouveau. Les autorisations mises en cache sont valables 30 jours suivant la validation.
Si le certificat que vous avez demandé a toutes les autorisations nécessaires mises en cache, la validation ne se renouvellera pas avant l'expiration des autorisations mises en cache.
