---
title: Comment ça marche
linkTitle: Comment fonctionne Let's Encrypt
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


L'objectif de Let's&nbsp;Encrypt et du [protocole ACME](https://tools.ietf.org/html/rfc8555) est de permettre la mise en place d'un serveur HTTPS et de lui faire obtenir automatiquement un certificat de confiance pour le navigateur, sans aucune intervention humaine.  Pour ce faire, un agent de gestion des certificats est exécuté sur le serveur web.

Pour en comprendre le fonctionnement, passons en revue le processus de mise en place de `https://example.com/` avec un agent de gestion des certificats qui prend en charge Let's&nbsp;Encrypt.

Ce processus comporte deux étapes.  Tout d'abord, l'agent prouve à l'AC que le serveur web contrôle un domaine.  Ensuite, l'agent peut demander, renouveler et révoquer les certificats pour ce domaine.

## Validation du domaine

Let's&nbsp;Encrypt identifie l'administrateur du serveur par une clé publique.  La première fois que le logiciel agent interagit avec Let's&nbsp;Encrypt, il génère une nouvelle paire de clés et prouve à l'AC de Let's&nbsp;Encrypt que le serveur contrôle un ou plusieurs domaines.  Cette procédure est similaire à la procédure traditionnelle de création d'un compte et d'ajout de domaines à ce compte.

Pour lancer le processus, l'agent demande à l'AC "Let's Encrypt" ce qu'elle doit faire pour prouver qu'elle contrôle `example.com`.  L'AC "Let's Encrypt" examinera le nom de domaine demandé et émettra une ou plusieurs séries de challenges.   Il existe différentes façons pour l'agent de prouver le contrôle du domaine.  Par exemple, l'AC peut donner à l'agent le choix entre les deux :

* Fournir un enregistrement DNS sous `example.com`, ou
* Mettre à disposition une ressource HTTP sous un URI bien connu sur `http://example.com/`

En plus des challenges, l'AC "Let's Encrypt" fournit également un nonce que l'agent doit signer avec sa paire de clés privées pour prouver qu'il contrôle la paire de clés.

<div class="howitworks-figure">
<img alt="Demander des challenges pour valider example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Le logiciel d'agent complète l'un des challenges fournis.   Supposons qu'il soit capable d'accomplir la deuxième tâche ci-dessus : il crée un fichier sur un chemin spécifié sur le site `http://example.com`.  L'agent signe également le nonce fourni avec sa clé privée.  Une fois que l'agent a terminé ces étapes, il notifie à l'AC qu'il est prêt à terminer la validation.

Ensuite, c'est le travail de l'AC de vérifier que les challenges ont été satisfaits.  L'AC vérifie la signature sur le nonce, et elle tente de télécharger le fichier du serveur web et de s'assurer qu'il a le contenu attendu.

<div class="howitworks-figure">
<img alt="Demander l'autorisation pour example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si la signature sur le nonce est valide, et que les challenges sont vérifiés, alors l'agent identifié par la clé publique est autorisé à faire la gestion des certificats pour `exemple.com`.  Nous appelons la paire de clés que l'agent a utilisée une "paire de clés autorisée" pour `exemple.com`.


## Délivrance et révocation des certificats

Une fois que l'agent dispose d'une paire de clés autorisée, la demande, le renouvellement et la révocation de certificats sont simples : il suffit d'envoyer des messages de gestion de certificats et de les signer avec la paire de clés autorisée.

Pour obtenir un certificat pour le domaine, l'agent fait une [demande de signature de certificat (CSR) au format PKCS#10 ](https://tools.ietf.org/html/rfc2986) qui demande à l'AC Let's&nbsp;Encrypt de délivrer un certificat pour `exemple.com` avec une clé publique spécifique.  Comme d'habitude, la demande de signature de certificat (CSR) comprend une signature par la clé privée correspondant à la clé publique dans la CSR.  L'agent signe également l'ensemble de la demande de signature de certificat (CSR) avec la clé autorisée pour `exemple.com` afin que l'AC Let's&nbsp;Encrypt sache qu'il est autorisé.

Lorsque l'AC "Let's&nbsp;Encrypt" reçoit la demande, elle vérifie les deux signatures.  Si tout semble bon, il délivre un certificat pour `exemple.com` avec la clé publique du CSR et le renvoie à l'agent.

<div class="howitworks-figure">
<img alt="Demander un certificat par exemple.com"
     src="/images/howitworks_certificate.png"/>
</div>

La révocation fonctionne de manière similaire.  L'agent signe une demande de révocation avec la paire de clés autorisée pour `exemple.com`, et l'AC Let's&nbsp;Encrypt vérifie que la demande est autorisée.  Si c'est le cas, il publie les informations de révocation dans les canaux de révocation normaux (c.-à-d. OCSP), afin que les parties qui se fient au certificat, telles que les navigateurs, sachent qu'elles ne doivent pas accepter le certificat révoqué.

<div class="howitworks-figure">
<img alt="Demander la révocation d'un certificat pour example.com"
     src="/images/howitworks_revocation.png"/>
</div>

