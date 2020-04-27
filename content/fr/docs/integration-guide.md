---
title: Guide d'intégration
linkTitle: Guide d'intégration pour les clients et les fournisseurs d'hébergement web
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2019-10-29
---

{{< lastmod >}}

Ce document contient des conseils utiles si vous êtes un fournisseur d'hébergement ou un grand site Web intégrant Let's Encrypt, ou si vous écrivez un logiciel client pour Let's Encrypt.

# Planifier le changement

Let's Encrypt et Web PKI continueront d'évoluer au fil du temps. Vous devez vous assurer que vous avez la possibilité de mettre à jour facilement tous les services qui utilisent Let's Encrypt. Si vous déployez également des clients qui s'appuient sur des certificats Let's Encrypt, assurez-vous en particulier que ces clients reçoivent des mises à jour régulières.

À l'avenir, ces choses sont susceptibles de changer:

  * les certificats racine et intermédiaire depuis lesquelles nous émettons
  * les algorithmes de hachage que nous utilisons lors de la signature des certificats
  * les types de clés et les contrôles de robustesse des clefs pour lesquels nous sommes disposés à signer des certificats d'entité finale
  * et le protocole ACME

Nous nous efforcerons toujours de donner un préavis aussi long que possible pour de tels changements, bien que si une faille de sécurité grave est détectée dans certains composants, nous devrons peut-être apporter des modifications à très court terme voire même immédiatement. Pour les changements d'intermédiaires en particulier, vous ne devez pas coder en dur l'intermédiaire à utiliser, mais vous devez utiliser l'en-tête [`Lien: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) du protocole ACME, car les intermédiaires sont susceptibles de changer.

De même, nous sommes susceptibles de modifier l'URL des conditions de service (ToS) au fur et à mesure de sa mise à jour. Évitez de coder en dur l'URL ToS et utilisez plutôt l'en-tête [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3) pour déterminer quelle URL ToS utiliser.

Vous aurez également un moyen de maintenir votre configuration TLS à jour, car de nouvelles attaques sont détectées sur les suites de chiffrement ou les versions de protocole.

# Obtenir les mises à jour

Pour recevoir des mises à jour à faible taille sur des changements importants comme ceux décrits ci-dessus, abonnez-vous à notre [Annonces API](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836).
Ceci est utile à la fois pour les développeurs de clients et les hébergeurs.

Pour des mises à jour plus volumineuses sur les maintenances et les pannes, visitez notre [page d'état](https://letsencrypt.status.io/) et appuyez sur SUBSCRIBE en haut à droite. Ceci 
est le plus utile pour les hébergeurs.

Assurez-vous également d'utiliser une adresse e-mail valide pour votre compte ACME. Nous utiliserons cet e-mail pour vous envoyer des avis d'expiration et communiquer sur tout problème
spécifique à votre compte.

# Qui est le Souscripteur

Nos [CPS (Énoncé des Pratiques de Certification) et Contrat du Souscripteur](/repository) spécifient que le Spuscripteur est celui qui détient la clef privée d'un certificat. Pour les hébergeurs, c'est le fournisseur, et non pas le client du fournisseur. Si vous écrivez un logiciel que des personnes  déploieront elles-mêmes, c'est celui qui déploie le logiciel qui est le Souscripteur.

L'adresse e-mail fourni lors de la création de comptes (aka registrations) doit renvoyer vers le Sousripteur. Nous enverrons un courriel à cette adresse pour avertir de l'expiration des certificats et pour informer des modifications de notre [politique de confidentialité](/privacy). Si vous êtes un hébergeur, ces notifications devraient vous parvenir plutôt qu'à un client. Idéalement, configurez une liste de diffusion ou un alias afin que plusieurs personnes puissent répondre aux notifications, au cas où vous seriez en vacances.

La conséquence est que, si vous êtes un fournisseur d'hébergement, vous n'avez pas besoin de nous envoyer les adresses e-mail de vos clients ou de les amener à accepter notre contrat de Sousripteur. Vous pouvez simplement émettre des certificats pour les domaines que vous contrôlez et commencer à les utiliser.

# Un ou plusieurs comptes?

Dans ACME, il est possible de créer un compte et de l'utiliser pour toutes les autorisations et émissions, ou de créer un compte par client. Cette flexibilité peut être précieuse. Par exemple, certains hébergeurs peuvent vouloir utiliser un compte par client et stocker les clés de compte dans différents contextes, de sorte qu'une compromission de la clef d'un compte ne permet pas l'émission pour tous leurs clients.

Cependant, pour la plupart des grands hébergeurs, nous vous recommandons d'utiliser un seul compte et de bien protéger la clé de compte correspondante. Cela permet d'identifier plus facilement les certificats appartenant à la même entité, plus simple de tenir à jour les informations de contact et de fournir des ajustements des limites de taux si nécessaire. Nous ne pourrons pas ajuster efficacement les limites de taux si de nombreux comptes différents sont utilisés.

# Certificats multi-domaines (SAN)

Notre [politique d'émission](/docs/rate-limits) autorise jusqu'à 100 noms par certificat. C'est à vous de décider si vous préférez utilisier un certificat distinct pour chaque nom d'hôte ou que plutôt regrouper de nombreux noms d'hôte sur un petit nombre de certificats.

L'utilisation de certificats distinct par nom d'hôte signifie que moins d'actions seront requises lors de l'ajout ou de la suppression logique de domaines à mesure qu'ils sont provisionnés et retirés. Des certificats séparés minimisent également la taille des certificats, ce qui peut accélérer les négociations HTTPS sur les réseaux à faible bande passante.

D'un autre côté, l'utilisation de certificats volumineux,contenant de nombreux noms d'hôtes, vous permet de gérer globalement moins de certificats. Si vous devez gèrer des clients plus anciens, comme Windows XP qui ne prennent pas en charge l'Indication de Nom de Serveur TLS ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), vous aurez besoin d'une adresse IP unique pour chaque certificat, donc mettre plus de noms sur chaque certificat réduit le nombre d'adresses IP dont vous aurez besoin.

On the other hand, using large certificates with many hostnames allows you to manage fewer certificates overall. If you need to support older clients like Windows XP that do not support TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), you'll need a unique IP address for every certificate, so putting more names on each certificate reduces the number of IP addresses you'll need.

Pour la plupart des déploiements, les deux choix offrent la même sécurité.

# Stockage et réutilisation des certificats et des clefs

Une grande partie de la valeur de Let's Encrypt réside dans l'émission automatique de certificats dans le cadre de la mise en oeuvre d'un nouveau site Web. Cependant, si vous avez une infrastructure qui peut créer à plusieurs reprises de nouveaux frontaux pour le même site Web, ces frontaux doivent d'abord essayer d'utiliser le même certificat et clef privée, à partir d'un stockage durable, et n'émettre un nouveau certificat uniquement si aucun certificat n'est disponible, ou tous les certificats existants sont expiré.

Pour Let's Encrypt, cela nous aide à fournir des services efficacement au plus grand nombre de personnes possible. Pour vous, cela garantit que vous êtes en mesure de déployer votre site Web à tout moment, quel que soit l'état de Let's Encrypt.

Par exemple, de nombreux sites commencent à utiliser Docker pour provisionner de nouvelles instances frontales selon les besoins. Si vous configurez vos conteneurs Docker pour qu'ils émettent un certificat au démarrage et que vous ne stockez pas vos certificats et clefs de manière durable, vous risquez d'atteindre des limites d'utilisation si vous invoquez trop d'instances en même temps. Dans le pire des cas, si vous devez détruire et recréer toutes vos instances à la fois, vous pouvez vous retrouver dans une situation où aucune de vos instances n'est en mesure d'obtenir un certificat et votre site est interrompu pendant plusieurs jours jusqu'à ce que le la limite d'utilisation expire. Ce type de problème n'est cependant pas propre aux limites d'utilisation. Si Let's Encrypt n'est pas disponible pour une raison quelconque lorsque vous devez monter vos frontends, vous auriez le même problème.

Notez que certaines philosophies de déploiement stipulent que les clefs de chiffrement ne doivent jamais quitter la machine physique sur laquelle elles ont été générées. Ce modèle peut fonctionner correctement avec Let's Encrypt, tant que vous vous assurez que les machines et leurs données ont une longue durée de vie et que vous gérez soigneusement les limites d'utilisation.

# Choisir un type de défi

Si vous utilisez le défi ACME http-01, vous devrez fournir la réponse du défi à chacun de vos frontends avant d'aviser Let's Encrypt que vous êtes prêt à relever le défi. Si vous avez un grand nombre de frontaux, cela peut être difficile. Dans ce cas, l'utilisation du défi dns-01 sera probablement plus facile. Bien sûr, si vous avez de nombreux répondeurs DNS répartis géographiquement, vous devez vous assurer que l'enregistrement TXT est disponible sur chaque répondeur.

De plus, lorsque vous utilisez le défi dns-01, assurez-vous de nettoyer les anciens enregistrements TXT afin que la réponse à la requête de Let's Encrypt ne devienne pas trop grande.

Si vous souhaitez quand même utiliser le défi http-01, vous souhaiterez peut-être tirer profiter des redirections HTTP. Vous pouvez configurer chacun de vos frontends de manière à rediriger /.well-known/acme-validation/XYZ vers validation-server.example.com/XYZ pour tout XYZ. Cela délègue la responsabilité de l'émission au serveur de validation, vous devez donc bien protéger ce serveur.

# Serveurs de validation centralisés

En ce qui concerne les deux points ci-dessus, il peut être judicieux, si vous avez beaucoup de frontaux, d'utiliser un plus petit sous-ensemble de serveurs pour gérer l'émission. Cela facilite l'utilisation des redirections pour la validation http-01 et fournit un emplacement pour stocker durablement les certificats et les clés.

# Implémenter l'Agrafage OCSP

De nombreux navigateurs récupèrent l'OCSP depuis Let's Encrypt lorsqu'ils chargent votre site. c'est un [problème de performances et de confidentialité](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/). Idéalement, les connexions à votre site ne devraient pas attendre une connexion secondaire à Let's Encrypt. De plus, les demandes OCSP indiquent à Let's Encrypt quels sites les visiteurs visitent. Nous avons une bonne politique de confidentialité et n'enregistrons pas les détails d'identification individuels des demandes OCSP, idéalement, nous préférons même ne pas recevoir de données du tout. De plus, nous prévoyons que nos coûts de bande passante pour servir l'OCSP chaque fois qu'un navigateur visitera un site Let's Encrypt pour la première fois représentera une grande partie de nos dépenses d'infrastructure.

En activant l'agrafage OCSP, vous pouvez améliorer les performances de votre site Web, fournir de meilleures protections de confidentialité à vos utilisateurs et aider Let's Encrypt à délivrer un service efficace pour le plus de personnes possible.

# Configuration du pare-feu

Pour utiliser Let's Encrypt, vous devez autoriser, sur les machines exécutant votre client ACME, un trafic sortant depuis le port 443. Nous ne publions pas les plages IP de notre service ACME, et elles changeront sans préavis.

Pour le défi ACME "http-01", vous devez autoriser un trafic entrant via le port 80.
Nous ne publions pas les plages IP à partir desquelles nous effectuons la validation, et ces plages IP changeront sans préavis.

Remarque: Nous vous recommandons de toujours autoriser un accès HTTP simple à votre serveur Web, avec une redirection vers HTTPS. Cela fournit une meilleure expérience utilisateur qu'un serveur Web qui refuse ou rejette les connexions au port 80, tout en offrant le même niveau de sécurité.

Pour tous les défis, vous devez autoriser le trafic entrant à destination du port 53 (TCP et UDP) de vos serveurs DNS faisant autorité.

# Algorithmes de clefs pris en charge

Let's Encrypt accepte les clefs RSA d'une longeueur de 2048 à 4096 bits et les clefs ECDSA P-256 et P-384. Cela est vrai pour les clefs de compte et les clefs de certificat. Vous ne pouvez pas réutiliser une clef de compte comme clef de certificat.

Notre recommandation est de fournir une configuration à double certificat, offrant un certificat RSA par défaut, et un certificat ECDSA (beaucoup plus petit) aux clients qui indiquent le supporter.

# HTTPS par défaut

Pour les hébergeurs, notre recommandation est d'émettre automatiquement les certificats et de configurer HTTPS pour tous les noms d’hôtes que vous contrôlez, ainsi que fournir un paramètrage configurable par l'utilisateur pour rediriger les URL HTTP vers leur équivalents HTTPS. Nous recommandons que pour les comptes existants, le paramètre soit désactivé par
par défaut, mais pour les nouveaux comptes, le paramètre est activé par défaut.

Raisonnement: les sites Web existants sont susceptibles d'inclure certaines sous-ressources HTTP (scripts, CSS et images). Si ces sites sont automatiquement redirigés vers leurs versions HTTPS, les navigateurs bloqueront certaines de ces sous-ressources en raison du blocage de contenu mixte. Cela peut bloquer des fonctionnalités du site. Cependant, quelqu'un qui crée un nouveau site et constate une redirection vers HTTPS n'inclura probablement que des sous-ressources HTTPS, car si il tente d'ajouter une sous-ressource HTTP, il remarquera immédiatement que cela ne fonctionne pas.

Nous vous recommandons de permettre aux clients de définir un en-tête HTTP Strict-Transport-Security (HSTS) avec un âge maximum par défaut de soixante jours (60 jours). Cependant, ce paramètre doit être accompagné d'un avertissement indiquant que, si le client a besoin de déplacer son site web chez un hébergeur qui n'offre pas HTTPS, le paramètre HSTS mis en cache dans les navigateurs rendra leur site indisponible. De même, le client et l'hébergeur doivent savoir que l'en-tête HSTS provoquera des erreurs de certificat en cas de Hard Failure. Par exemple, alors que les gens peuvent généralement passer outre l'avertissement d'un navigateur en cas d'"incompatibilité de nom" (name mismatch) ou de "certificat expiré" (expired certificate), les navigateurs ne permettent pas rien de tel  pour les noms d'hôtes avec un en-tête HSTS actif.

# Quand renouveler

Nous recommandons de renouveler automatiquement les certificats lorsqu'ils leur reste un tiers de leur durée de vie totale restante. Pour les certificats actuels de 90 jours de Let's Encrypt, cela signifie un renouvellement 30 jours avant l'expiration.

Si vous émettez pour plus de 10 000 noms d'hôte, nous vous recommandons également de renouveller en petits lots, plutôt que de regrouper les renouvellements en grosses séries.
Cela réduit le risque: si Let's Encrypt subit une panne au moment où vous devez renouveler ou s'il y a une défaillance temporaire de vos systèmes de renouvellement, cela n'affectera certains de vos certificats, plutôt que tous. Cela nous simplifie également notre planification de notre capacité informatique.

Vous souhaiterez peut-être émettre en bloc des certificats pour tous vos domaines pour commencer
rapidement, ce qui est bien. Vous pouvez ensuite répartir la planification des renouvellements de sorte à anticiper ces processus de 1 jour pour certains certificats, 2 jours pour d'autres et ainsi de suite... Lissant donc la charge dans le temps.

Si vous proposez un logiciel client qui configure automatiquement un processus périodique de renouvellement, veuillez vous assurer d'y intègrer un aléat de quelques secondes dans la définition de l'heure de déclenchement, au lieu d'un déclenchement à une heure pile. Cela garantit que Let's Encrypt ne subira pas de pics de trafic arbitraires à une heure pile ou minute pile. Let's Encrypt devant provisionner de la capacité machine pour répondre aux pics de charge, la réduction de ces pics de trafic peut nous à réduire nos coûts.

# Nouvelle tentative d'échecs  (Retrying failures)

L'échec du renouvellement ne doit pas être traité comme une erreur définitive. Vous devez implémenter une logique de nouvelle tentative gracieuse dans vos services d'émission à l'aide d'un modèle de pauses  exponentielles, qui expire au maximum une fois par jour et par certificat. Un exemple de de planification raisonable des pauses serait le suivant: 1er essai après 1 minute, 2éme essai après 10 minutes, 3éme troisième tentative après 100 minutes, 4éme tentative et les  suivantes après 1 journée. Vous devez bien sûr avoir un moyen, pour les administrateurs, de demander des tentatives anticipées par domaine ou globalement.

Les pauses entre de nouvelles tentatives signifient que votre logiciel d'émission doit conserver la liste aussi bien des échecs que des succès, et vérifier s'il y a eu un échec récent avant de tenter une nouvelle émission. Il est inutile de tenter des centaines de fois par heure, car les échecs répétés sont susceptibles de persister.

Toutes les erreurs doivent être envoyées à l'administrateur responsable, afin de vérifier si
des problèmes spécifiques doivent être résolus.
