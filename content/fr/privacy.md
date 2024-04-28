---
title: Politique de confidentialité
slug: privacy
top_graphic: 4
lastmod: 2023-08-23
english_is_canonical: 1
show_lastmod: 1
---

La politique de confidentialité de Let's Encrypt décrit la manière dont nous recueillons, utilisons et divulguons vos informations dans trois contextes différents :

- Lorsque, en tant que partie utilisatrice, vous visitez un site web sécurisé par HTTPS qui utilise un certificat de Let's Encrypt,
- Lorsque vous êtes un abonné, c'est-à-dire lorsque vous demandez et utilisez des certificats de Let's Encrypt,
- Lorsque vous êtes un visiteur du site web Let's Encrypt, du forum de discussion communautaire, d'autres pages web sous letsencrypt.org et de sites de médias sociaux tiers sur lesquels Let's Encrypt gère un compte.

Let's Encrypt est un service fourni par [Internet Security Research Group](https://www.abetterinternet.org/), une société d'utilité publique à but non lucratif de Californie (États-Unis).

## Partie utilisatrice

Lorsque vous utilisez un site web HTTPS ou un autre service TLS avec un certificat Let's Encrypt, votre navigateur (ou client TLS) peut interroger Let's Encrypt pour vérifier si le certificat a été révoqué ("requête OCSP" : Protocole de vérification de certificat en ligne). Si votre navigateur effectue une demande OCSP, nos serveurs enregistreront automatiquement votre adresse IP, votre navigateur et votre système d'exploitation dans des fichiers journaux temporaires du serveur. Nous n'utilisons pas les données des demandes OCSP pour établir des profils ou identifier des personnes. Les journaux temporaires du serveur sont utilisés à des fins opérationnelles uniquement et sont normalement supprimés en moins de sept jours. Nous pouvons conserver un sous-ensemble de journaux de serveurs pendant des périodes plus longues afin d'enquêter sur les défaillances ou les abus de logiciels. Si nous le faisons, nous supprimerons tous les journaux stockés lorsque nous aurons terminé notre enquête. Nous pouvons également calculer, conserver et publier des informations globales à partir des journaux de serveur, comme les certificats qui génèrent le plus grand volume de demandes. Nous nous efforcerons toujours de faire en sorte que ces ensembles de données ne contiennent pas d'informations sur les activités d'utilisateurs ou de systèmes identifiables.

## Abonné

Si vous êtes un abonné, vous demandez à Let's Encrypt un certificat de confiance destiné à attester publiquement que vous contrôlez un ou plusieurs noms de domaine accessibles sur Internet. Dans le cadre du processus visant à prouver ce contrôle, Let's Encrypt recueillera diverses informations relatives à l'authentification et à la gestion des certificats. Ces informations comprennent les adresses IP à partir desquelles vous accédez au service Let's Encrypt ; toutes les adresses IP résolues pour tous les noms de domaine demandés ; les informations du serveur liées à toutes les demandes de validation ; les journaux complets de toutes les demandes HTTP / ACME (Environnement de Gestion Automatique de Certificat) entrantes, toutes les demandes de validation sortantes ; et les informations envoyées par ou déduites de votre logiciel client. Nous conserverons ces informations pendant un minimum de sept ans, conformément aux exigences du programme "Trusted Root". Ces informations seront conservées pendant un maximum de dix ans.

Nous devons être en mesure de démontrer au public, y compris ceux qui comptent sur la fiabilité de nos certificats, que nos services fonctionnent comme prévu. Par conséquent, nous pouvons être dans l'incapacité de supprimer des informations, y compris les adresses IP. Ces informations peuvent être rendues publiques de plusieurs façons, notamment par le biais d'API publiques, de référentiels publics et/ou de discussions publiques.

Vous pouvez avoir la possibilité de fournir des informations de contact, telles que votre adresse électronique, à des fins de service et de récupération du compte. Vos coordonnées ne seront pas rendues publiques et ne seront partagées qu'en vertu de la section "Application de la loi et circonstances atténuantes" ci-dessous. En fournissant votre adresse électronique, vous acceptez de recevoir de notre part des courriers électroniques relatifs à nos services. Vous pouvez à tout moment vous désabonner des courriels liés au service en cliquant sur le lien "unsubscribe" au bas de nos courriels ou en nous contactant à l'adresse privacy@abetterinternet.org. Nous n'utiliserons pas vos coordonnées à des fins de marketing ou de promotion.

Vous devrez peut-être télécharger le logiciel client à partir d'un dépôt tel que ceux gérés par Debian, Ubuntu, Red Hat ou Github. Votre interaction avec un tel dépôt de logiciels est régie par la politique de confidentialité et/ou les conditions d'utilisation de ce dépôt.

## Visiteur

Lorsque vous êtes un visiteur qui parcourt un site web de l'ISRG, vous avez la possibilité de faire un don. Les dons sont traités par nos partenaires de paiement de confiance, notamment DonorBox, Stripe, Shopify et PayPal, en fonction de la méthode de paiement choisie, et stockés dans la base de données Salesforce de l'ISRG et Sage Intacct si nécessaire. Nous recueillons votre nom et votre adresse électronique et, si vous la fournissez, votre adresse postale lorsque vous faites un don. Une fois que vous avez fait un don, nous utiliserons vos informations dans notre intérêt légitime pour traiter et gérer votre contribution, y compris les rappels de collecte de fonds et les renouvellements. Vos interactions avec [DonorBox](https://donorbox.org/privacy), [Stripe](https://stripe.com/privacy/), [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full), [Shopify](https://www.shopify.com/legal/privacy), [The Giving Block](https://thegivingblock.com/about/privacy-policy/), Gemini, [SHIPHERO](https://shiphero.com/privacy-data-policy/), [Salesforce](https://www.salesforce.com/company/privacy/), et [Sage Intacct](https://www.sageintacct.com/privacy_policy_website) sont régies par leurs politiques de confidentialité respectives. Nous ne recueillons ni ne conservons aucune information sur les cartes de crédit ou les informations bancaires liées aux dons.

Vous pouvez fournir votre adresse électronique pour recevoir des communications relatives aux projets de l'ISRG par le biais d'une inscription sur un site web de l'ISRG et par le biais d'autres matériels de marketing. Toute communication transmise via Salesforce et vos interactions avec [Salesforce](https://www.salesforce.com/company/privacy/) sont régies par leurs politiques de confidentialité. Nous pouvons occasionnellement utiliser votre adresse électronique pour vous envoyer des communications personnalisées relatives à l'ISRG et à ses projets. Vous pouvez demander à ce que votre adresse électronique soit supprimée en vous désinscrivant via le pied de page de nos courriers électroniques ou en nous envoyant un courrier électronique à l'adresse suivante : press@abetterinternet.org

Si vous vous inscrivez pour utiliser un forum de soutien communautaire de l'ISRG, les informations personnelles que vous fournissez et vos actions sont régies par la politique de confidentialité de notre fournisseur d'hébergement et de logiciels pour le forum, [Civilized Discourse Construction Kit](https://www.discourse.org/privacy). Nous ne recueillons ni ne conservons d'informations personnelles dans le cadre de notre offre de ce forum d'assistance.

## Nous ne vendons pas vos données ou informations

Nous ne vendons pas vos données ou informations. Cela comprend les données et les informations de la partie utilisatrice, de l'abonné et du visiteur.

## Demandes des forces de l'ordre et Circonstances atténuantes

Dans la mesure où nous en disposons, nous pouvons divulguer des informations personnelles identifiables vous concernant à des tiers dans des circonstances limitées. Ces circonstances comprennent les cas où nous avons votre consentement ou lorsque nous croyons de bonne foi que la loi l'exige, par exemple en vertu d'une citation à comparaître ou d'une autre ordonnance judiciaire ou administrative. Nous pouvons également divulguer des informations relatives au recouvrement des comptes lorsque nous pensons de bonne foi que cela est nécessaire pour éviter une atteinte à la vie, un préjudice corporel, un dommage matériel ou un préjudice financier important.

Si la loi nous oblige à divulguer les informations que vous avez fournies, nous essaierons de vous avertir au préalable (sauf si cela nous est interdit ou si cela serait futile) qu'une demande d'accès à vos informations a été faite afin de vous donner la possibilité de vous opposer à la divulgation. Nous nous efforcerons de fournir cet avis par tout moyen raisonnablement possible. Si vous ne contestez pas la demande de divulgation, nous pouvons être légalement tenus de communiquer vos informations.

En outre, nous nous réservons le droit, à notre seule discrétion, de nous opposer de manière indépendante à certaines demandes (d'accès à des informations sur les utilisateurs de nos produits et technologies) que nous jugeons abusives.

## Quels sont les droits des parties prenantes, des abonnés et des visiteurs de l'Espace économique européen en vertu de la RGPD, et comment puis-je les exercer ?

Nous traitons les données personnelles comme décrit dans cette politique de confidentialité. La finalité et la base légale du traitement des informations sont les suivantes :

**Objectif :** Fournir des informations sur l'état des certificats (OCSP : Protocole de vérification de certificat en ligne)

**Base légale :** Intérêts légitimes

**Informations supplémentaires :** Nous recueillons et traitons les informations des parties utilisatrices afin de fournir de manière fiable des informations sur l'état des certificats.

**Objectif :** Fournir des services de délivrance et de gestion de certificats

**Base légale :** Contrat, Intérêts légitimes

**Informations supplémentaires :** Nous recueillons et traitons les informations des Abonnés afin de fournir des services fiables et sécurisés d'émission et de gestion de certificats, et de démontrer au public que nos services fonctionnent comme prévu.

**Objectif :** Fournir des informations aux visiteurs

**Base légale :** Consentement, Intérêts légitimes

**Informations supplémentaires :** Nous recueillons et traitons les informations des Visiteurs afin de fournir des informations via le Web et le courrier électronique de manière fiable et efficace.

**Objectif : **Traitement des dons et des demandes de parrainage

**Base légale :** Intérêts légitimes

**Informations supplémentaires :** Nous recueillons et traitons des informations afin de traiter et de faciliter les dons.

**Objectif :** Obligations légales et circonstances atténuantes

**Base légale :** Obligation légale, intérêts légitimes

**Informations supplémentaires :** Nous pouvons collecter et traiter des informations afin de nous conformer à des obligations légales et lorsque nous pensons de bonne foi qu'il est nécessaire de prévenir toute atteinte à la vie, tout préjudice personnel, tout dommage matériel ou tout préjudice financier important.

Veuillez noter qu'il se peut que nous ne soyons pas en mesure de supprimer des informations, y compris les adresses IP, car ces informations sont nécessaires pour que d'autres puissent déterminer la fiabilité de nos certificats. Dans certains cas, nous pouvons traiter des données personnelles en raison d'une obligation légale ou pour protéger vos intérêts vitaux ou ceux d'une autre personne.

Vos données personnelles peuvent être collectées depuis ou transférées vers des juridictions où nous et nos prestataires de services stockons ou traitons des données, y compris les États-Unis. Ces juridictions peuvent ne pas offrir le même niveau de protection des données que votre juridiction, y compris l'EEE. Nous avons pris des mesures pour nous assurer que nos prestataires de services offrent un niveau de protection adéquat des données personnelles des résidents de l'EEE, notamment en concluant des accords de traitement des données utilisant les Clauses contractuelles types approuvées par la Commission européenne, ou en utilisant d'autres garanties approuvées par la Commission européenne. Vous avez le droit d'obtenir des détails sur le mécanisme de transfert de vos informations personnelles en dehors de l'UE en nous envoyant un courriel aux coordonnées ci-dessous.

Les personnes situées dans l'Espace économique européen (EEE) ont certains droits concernant leurs informations personnelles, notamment le droit d'accéder, de corriger ou de supprimer les données personnelles que nous traitons par le biais de votre utilisation de nos sites et services. Si vous êtes un individu qui est une partie adverse, un abonné ou un visiteur basé dans l'EEE, vous pouvez :

- Demandez un rapport sur vos données personnelles en nous envoyant un courriel à privacy@abetterinternet.org. Ce rapport comprendra les données personnelles dont nous disposons à votre sujet, fournies dans un format structuré, couramment utilisé et portable. Veuillez noter que nous pouvons vous demander des informations supplémentaires pour vérifier votre identité avant de divulguer toute information.

- Demandez que vos informations soient corrigées ou supprimées en nous contactant à l'adresse privacy@abetterinternet.org.

- S'opposer à ce que nous traitions vos informations. Vous pouvez nous demander de cesser d'utiliser vos informations, y compris lorsque nous les utilisons pour vous envoyer des courriels de service. Vous pouvez retirer votre consentement à recevoir des courriels de service à tout moment en cliquant sur le lien "unsubscribe" qui se trouve dans les courriels de Let's Encrypt.

- Se plaindre auprès d'un autorité de réglementation. Si vous êtes basé dans l'EEE et que vous pensez que nous n'avons pas respecté les lois sur la protection des données, vous avez le droit de déposer une plainte auprès de votre autorité de surveillance locale.

Pour plus d'informations ou pour signaler un problème de protection de la vie privée, veuillez contacter : privacy@abetterinternet.org.
