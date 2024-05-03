---
title: Guide d'intégration
linkTitle: Guide d'intégration du client et des grands fournisseurs de services
slug: integration-guide
date: 2016-08-08
lastmod: 2020-12-8
show_lastmod: 1
---


Ce document contient des conseils utiles si vous êtes un fournisseur d'hébergement ou un important site web intégrant Let's Encrypt, ou si vous écrivez un logiciel client pour Let's Encrypt.

# Planifier le changement

Let's Encrypt et le Web PKI continueront tous deux à évoluer au fil du temps.  Vous devez vous assurer que vous avez la possibilité de mettre facilement à jour tous les services qui utilisent Let's Encrypt. Si vous déployez également des clients qui dépendent des certificats Let's Encrypt, assurez-vous en particulier que ces clients reçoivent des mises à jour régulières.

À l'avenir, ces choses sont susceptibles de changer :

  * les certificats racine et intermédiaire à partir desquels nous délivrons
  * les algorithmes de hachage que nous utilisons lors de la signature des certificats
  * les types de clés et les contrôles de résistance des clés pour lesquels nous sommes disposés à signer des certificats d'entité finale
  * et le protocole ACME

Nous nous efforcerons toujours de donner un préavis aussi long que possible pour ces changements, mais si une importante faille de sécurité est constatée dans un des composants, il se peut que nous devions apporter des changements à très court terme ou immédiatement. Pour des changements mineurs en particulier, vous ne devez pas coder en dur l'intermédiaire à utiliser, mais vous devez utiliser l'en-tête [`Link : rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) du protocole ACME, car les intermédiaires sont susceptibles de changer.

De même, nous sommes susceptibles de modifier l'URL des conditions de service (ToS) lors de leur mise à jour. Évitez de coder en dur l'URL des conditions d'utilisation (ToS) et fiez-vous plutôt à l'en-tête [`Link : rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3) pour déterminer quel URL des conditions d'utilisation (ToS) à utiliser.

Vous souhaiterez également disposer d'un moyen de maintenir votre configuration TLS à jour quand des nouvelles attaques sont découvertes sur des suites de chiffrement ou des versions de protocole.

# Obtenir des mises à jour

Pour recevoir des mises à jour peu volumineuses sur des changements importants comme ceux décrits ci-dessus, inscrivez-vous à notre groupe [API Announcements](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836). Cela est utile tant pour les clients développeurs que pour les fournisseurs d'hébergement.

Pour des mises à jour plus volumineuses sur les maintenances et les pannes, visitez notre [page d'état](https://letsencrypt.status.io/) et cliquez sur Subscribe en haut à droite. Cela est particulièrement utile pour les fournisseurs d'hébergement.

Assurez-vous également que vous utilisez une adresse électronique valide pour votre compte ACME. Nous utiliserons ce courriel pour vous envoyer des avis d'expiration et communiquer sur tout problème spécifique de votre compte.

# Qui est le souscripteur

Notre [CPS and Subscriber Agreement](/repository) indiquent que le souscripteur est celui qui détient la clé privée d'un certificat. Pour les fournisseurs d'hébergement, c'est le fournisseur et non le client du fournisseur. Si vous écrivez un logiciel que les gens déploient eux-mêmes, c'est celui qui déploie le logiciel.

L'e-mail de contact fourni lors de la création des comptes (alias enregistrements) doit être envoyé à l'abonné. Nous enverrons un courrier électronique à cette adresse pour avertir de l'expiration des certificats et signaler les changements apportés à notre [politique de confidentialité](/privacy).  Si vous êtes un fournisseur d'hébergement, ces notifications doivent vous être adressées plutôt qu'à un client. Idéalement, créez une liste de diffusion ou un alias afin que plusieurs personnes puissent répondre aux notifications, au cas où vous seriez en vacances.

La conséquence est que, si vous êtes un fournisseur d'hébergement, vous n'avez pas besoin de nous envoyer les adresses électroniques de vos clients ou de leur faire accepter notre contrat d'abonnement. Vous pouvez simplement délivrer des certificats pour les domaines que vous contrôlez et commencer à les utiliser.

# Un ou plusieurs comptes ?

Dans ACME, il est possible de créer un compte et de l'utiliser pour toutes les autorisations et émissions, ou de créer un compte par client. Cette flexibilité peut être appréciable. Par exemple, certains fournisseurs d'hébergement peuvent vouloir utiliser un compte par client et stocker les clés de compte dans des environnements différents, de sorte qu'un compromis sur les clés de compte ne permet pas de les délivrer pour tous leurs clients.

Toutefois, pour la plupart des grands hébergeurs, nous recommandons d'utiliser un seul compte et de bien garder la clé du compte correspondant. Il est ainsi plus facile d'identifier les certificats appartenant à une même entité, de tenir à jour les informations de contact et il est plus facile de procéder à des ajustements des limites de taux si nécessaire. Nous ne serons pas en mesure d'ajuster efficacement les limites de taux si de trop nombreux comptes distincts sont utilisés.

# Certificats multi-domaines (SAN)

Notre [politique d'émission](/docs/rate-limits) autorise jusqu'à 100 noms par certificat. Il vous appartient d'utiliser un certificat distinct pour chaque nom d'hôte ou de regrouper plusieurs noms d'hôtes sur un petit nombre de certificats.

L'utilisation de certificats distincts par nom d'hôte signifie qu'il faut moins de démarches pour ajouter et retirer des domaines, lorsqu'ils sont attribués et retirés. Des certificats séparés réduisent également la taille des certificats, ce qui peut accélérer les échanges HTTPS sur les réseaux à faible débit.

D'autre part, l'utilisation de gros certificats avec de nombreux noms d'hôtes vous permet de gérer globalement moins de certificats. Si vous devez prendre en charge des clients plus anciens comme Windows XP qui ne prennent pas en charge l'indication de nom de serveur TLS ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), vous aurez besoin d'une adresse IP unique pour chaque certificat, de ce fait, mettre plus de noms sur chaque certificat réduit le nombre d'adresses IP dont vous aurez besoin.

Pour la plupart des déploiements, les deux choix offrent la même sécurité.

# Stockage et réutilisation des certificats et des clés

Une grande partie de la valeur de Let's Encrypt est qu'il permet une émission automatique dans le cadre de la fourniture d'un nouveau site web.  Toutefois, si votre infrastructure est susceptible de créer à plusieurs reprises de nouvelles interfaces pour le même site web, ces interfaces doivent d'abord essayer d'utiliser un certificat et une clé privée provenant d'un stockage durable, et n'en délivrer une nouvelle que si aucun certificat n'est disponible, ou si tous les certificats existants ont expiré.

Pour Let's Encrypt, cela nous aide à fournir efficacement des services au plus grand nombre de personnes possible. Pour vous, cela garantit que vous êtes en mesure de déployer votre site web chaque fois que vous en avez besoin, quel que soit l'état de Let's Encrypt.

À titre d'exemple, de nombreux sites commencent à utiliser Docker pour fournir de nouvelles interfaces selon les besoins. Si vous configurez vos conteneurs Docker pour qu'ils les émettent au démarrage et que vous ne conservez pas vos certificats et vos clés de manière durable, vous risquez d'atteindre les limites de taux si vous faites apparaître trop de demandes en même temps. Dans le pire des cas, si vous devez détruire et recréer toutes vos instances en une seule fois, vous risquez de vous retrouver dans une situation où aucune de vos instances ne pourra obtenir de certificat, et votre site sera interrompu pendant plusieurs jours jusqu'à l'expiration de la limite de taux. Ce type de problème n'est cependant pas propre aux limites tarifaires. Si Let's Encrypt n'est pas disponible pour quelque raison que ce soit lorsque vous avez besoin de faire apparaître vos frontends, vous aurez le même problème.

Notez que certaines philosophies de déploiement stipulent que les clés cryptographiques ne doivent jamais quitter la machine physique sur laquelle elles ont été générées. Ce modèle peut fonctionner correctement avec Let's Encrypt, à condition que vous vous assuriez que les machines et leurs données ont une longue durée de vie et que vous gériez soigneusement les limites des tarifs.

# Choisir un type de challenge

Si vous utilisez le challenge ACME http-01, vous devrez fournir la réponse au challenge à chacun de vos frontends avant de notifier à Let's Encrypt que vous êtes prêt à relever le challenge. Si vous avez un grand nombre de frontends, cela peut être difficile. Dans ce cas, l'utilisation du challenge dns-01 sera probablement plus facile. Bien entendu, si vous avez de nombreux répondants DNS répartis géographiquement, vous devez vous assurer que l'enregistrement TXT est disponible sur chaque répondant.

De plus, lorsque vous utilisez le challenge dns-01, veillez à nettoyer les anciens enregistrements TXT afin que la réponse à la requête de Let's Encrypt ne soit pas trop volumineuse.

Si vous souhaitez utiliser le challenge http-01 de toute façon, vous pouvez tirer profit des redirections HTTP. Vous pouvez configurer chacun de vos frontends pour rediriger /.well-known/acme-validation/XYZ vers validation-server.example.com/XYZ pour tous les XYZ. Cela délègue la responsabilité de la délivrance au serveur de validation, vous devez donc bien protéger ce serveur.

# Serveurs centraux de validation

En rapport avec les deux points ci-dessus, il peut être judicieux, si vous avez beaucoup de frontends, d'utiliser un sous-ensemble de serveurs plus petits pour gérer l'émission. Cela facilite l'utilisation des redirections pour la validation http-01, et fournit un endroit pour stocker durablement les certificats et les clés.

# Mettre en service l'agrafage OCSP

De nombreux navigateurs vont extraire OCSP de Let's Encrypt lorsqu'ils chargent votre site. Il s'agit d'un [problème de performance et de respect de la vie privée](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/).  Idéalement, les connexions à votre site ne devraient pas attendre une connexion secondaire à Let's Encrypt. De plus, les demandes de l'OCSP indiquent à Let's Encrypt quels sites les gens visitent. Nous avons une bonne politique de confidentialité et n'enregistrons pas les détails d'identification individuelle des demandes de l'OCSP, nous préférons même ne pas recevoir les données en premier lieu. En outre, nous prévoyons que les coûts de la bande passante pour desservir l'OCSP chaque fois qu'un navigateur visite un site Let's Encrypt pour la première fois représenteront une grande partie de nos dépenses d'infrastructure.

En activant l'agrafage OCSP, vous pouvez améliorer les performances de votre site web, offrir une meilleure protection de la vie privée à vos utilisateurs et aider Let's Encrypt à servir efficacement le plus grand nombre de personnes possible.

# Configuration du pare-feu

Pour utiliser Let's Encrypt, vous devez autoriser le trafic sortant du port 443 depuis les machines qui exécutent votre client ACME. Nous ne publions pas les plages d'IP pour notre service ACME, et elles seront modifiées sans préavis.

Pour le "http-01" ACME challenge, vous devez autoriser le trafic entrant du port 80. Nous ne publions pas les plages d'IP à partir desquelles nous effectuons la validation, et elles seront modifiées sans préavis.

Note : Nous recommandons de toujours autoriser un accès HTTP simple à votre serveur web, avec une redirection vers HTTPS. Cela offre une meilleure expérience à l'utilisateur qu'un serveur web qui refuse ou supprime les connexions du port 80, et offre le même niveau de sécurité.

Pour tous les challenges, vous devez autoriser le trafic du port 53 entrant (TCP et UDP) à vos serveurs DNS faisant autorité.

# Algorithmes de clés supportés

Let's Encrypt accepte les clés RSA d'une longueur de 2048, 3072 ou 4096 bits et les clés ECDSA P-256 ou P-384. C'est vrai pour les clés de compte et les clés de certificat. Vous ne pouvez pas réutiliser une clé de compte comme clé de certificat.

Notre recommandation est de recourir à une configuration dual-cert, offrant un certificat RSA par défaut et un certificat ECDSA (beaucoup plus petit) aux clients qui manifestent leur soutien.

# HTTPS par défaut

Pour les fournisseurs d'hébergement, nous recommandons de délivrer automatiquement des certificats et de configurer HTTPS pour tous les noms d'hôtes que vous contrôlez, et de proposer un paramètre configurable par l'utilisateur pour rediriger ou non les URL HTTP vers leurs équivalents HTTPS. Nous recommandons que pour les comptes existants, le paramètre soit désactivé par défaut, mais que pour les nouveaux comptes, le paramètre soit activé par défaut.

Raisonnement : Les sites web existants sont susceptibles d'inclure certaines sous-ressources HTTP (scripts, CSS et images). Si ces sites sont automatiquement redirigés vers leurs versions HTTPS, les navigateurs bloqueront certaines de ces sous-ressources en raison du blocage des contenus mixtes. Cela peut interrompre la fonctionnalité du site. Cependant, une personne qui crée un nouveau site et qui découvre qu'il redirige vers le HTTPS n'inclura très probablement que des sous-ressources HTTPS, car si elle essaie d'inclure une sous-ressource HTTP, elle remarquera immédiatement que cela ne fonctionne pas.

Nous recommandons de permettre aux clients de définir un en-tête HTTP Strict-Transport-Security (HSTS) avec une durée maximale par défaut de soixante jours. Toutefois, ce paramètre doit être accompagné d'un avertissement indiquant que si le client doit passer à un fournisseur d'hébergement qui n'offre pas le HTTPS, le paramètre HSTS mis en cache dans les navigateurs rendra son site indisponible. En outre, le client et le fournisseur d'hébergement doivent savoir que l'en-tête HSTS transformera les erreurs de certificat en défaillances matérielles. Par exemple, alors que les gens peuvent généralement cliquer sur un avertissement du navigateur concernant une non-concordance de nom ou un certificat expiré, les navigateurs ne permettent pas un tel clic pour les noms d'hôtes avec un en-tête HSTS actif.

# Quand renouveler

Nous recommandons de renouveler automatiquement les certificats lorsqu'il leur reste un tiers de leur durée de vie totale. For Let's Encrypt's current 90-day certificates, that means renewing 30 days before expiration.

Si vous émettez pour plus de 10 000 noms d'hôtes, nous recommandons également un renouvellement automatisé en petites séries, plutôt que de regrouper les renouvellements en gros lots. Cela réduit les risques : Si Let's Encrypt connaît une panne au moment où vous devez renouveler votre certificat, ou s'il y a une défaillance temporaire de vos systèmes de renouvellement, cela ne touchera que quelques-uns de vos certificats, plutôt que la totalité d'entre eux. Cela facilite également la planification de nos ressources.

Vous pouvez émettre des certificats en bloc pour tous vos domaines afin de commencer rapidement, ce qui n'est pas un problème. Vous pouvez ensuite étaler les délais de renouvellement en effectuant un processus unique de renouvellement de certains certificats un jour avant le moment où vous devriez normalement les renouveler, certains deux jours avant, etc.

Si vous proposez un logiciel client qui configure automatiquement un travail périodique par lots, veillez à ce qu'il fonctionne à une seconde aléatoire dans la journée, plutôt que de toujours fonctionner à un moment précis. Cela permet d'éviter que Let's Encrypt ne reçoive des pics de trafic arbitraires à l'heure ou à la minute précise. Comme Let's Encrypt doit fournir la capacité nécessaire pour répondre aux pics de trafic, la réduction des pics de trafic peut contribuer à maintenir nos coûts à un niveau bas.

# Répéter les échecs

L'échec du renouvellement ne doit pas être considéré comme une erreur fatale. Vous devez mettre en œuvre une logique de relance gracieuse dans vos services d'émission en utilisant un modèle de retour exponentiel, avec un maximum d'une fois par jour par certificat. Par exemple, un calendrier d'exécution raisonnable serait : 1er essai après une minute, 2e essai après dix minutes, 3e essai après 100 minutes, 4e essai et essais suivants après un jour. Vous devez bien sûr disposer d'un moyen pour les administrateurs de demander des essais anticipés par domaine ou au niveau mondial.

Les retours sur essai signifient que votre logiciel d'émission doit garder une trace des échecs ainsi que des succès, et vérifier s'il y a eu un échec récent avant de tenter une nouvelle émission. Il est inutile de tenter d'émettre des centaines de fois par heure, car les échecs répétés sont susceptibles d'être persistants.

Toutes les erreurs doivent être envoyées à l'administrateur concerné, afin de voir si des problèmes spécifiques doivent être corrigés.
