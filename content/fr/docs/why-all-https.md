---
title: Pourquoi tous les sites web devraient utiliser HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

Certains opérateurs de serveur ont historiquement argumenté qu'ils n'avaient rien de sensible sur leur site web et donc aucun besoin de confidentialité. Cependant, ce n'est pas un argument solide, et nous pensons que tous les sites web devraient utiliser HTTPS pour ces raisons :

## Le trafic HTTP brut peut être consulté en cours de transmission

Lorsque le trafic n'est pas chiffré il est entièrement consultable en cours de transmission. Ceci signifie que tout le contenu allant dans chaque direction d'une connexion, incluant tout ce qui peut être sensible, peut être vu par une entité sur le chemin réseau. C'est un problème de confidentialité évident, semblable à l'envoi de lettres sans enveloppe.

Même si un opérateur de serveur pense qu'il n'y a rien de sensible sur son site, il arrive que des erreurs soient commises. Peut-être qu'il ne _devrait pas_ y avoir d'information sensible transmis, mais cela ne signifie pas qu'il n'y en aura pas. HTTPS aide à s'assurer que les erreurs ne se transforment pas en atteintes à la vie privée.

De plus, un opérateur de serveur ne contrôle pas tout le trafic vers et depuis son site web : il n'y a rien qu'il puisse faire pour empêcher des visiteurs d'accidentellement _envoyer_ des informations sensibles dans une requête, peut-être via une mauvaise configuration de formulaire ou de logiciel client. Il est déraisonnable de s'attendre à ce qu'ils ne le fassent jamais.

Finalement, parfois l'acte même de visiter un site web peut être une information sensible, en particulier pour les personnes vivant sous des régimes oppressifs. HTTPS prend en charge une extension appelée [Client Hello Chiffré (ECH)](https://en.wikipedia.org/wiki/Server_Name_Indication#Encrypted_Client_Hello) qui peut cacher cette information, mais cette couche supplémentaire de protection n'est disponible que sur les sites utilisant HTTPS.

## Le trafic HTTP brut peut être modifié durant la transmission

Pire encore, lorsque le trafic n'est pas chiffré, il est modifiable en transmission. Ceci signifie que personne ne peut être certain que ce qui est envoyé est bien ce qui est reçu, quelle que soit la direction. La connexion ne manque pas seulement de confidentialité, elle manque _d'intégrité_.

Un exemple courant de ceci est l'injection de publicités et/ou de logiciels malveillants dans les réponses de serveur. Si un site web n'active pas HTTPS, il met ses visiteurs en danger, indépendamment du contenu effectif du site web.
