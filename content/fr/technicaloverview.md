---
title: Comment ça marche
slug: how-it-works
top_graphic: 3
---

L'objectif de l'Autorité de Certification (AC ou CA pour Certificate Authority en anglais) Let's&nbsp;Encrypt et du [protocole ACME](https://ietf-wg-acme.github.io/acme/) est de permettre la mise en place d'un serveur HTTPS et l'obtention automatique d'un certificat reconnu comme  de confiance par les navigateurs, sans intervention humaine. Ceci est accompli en exécutant un agent de gestion de certificats sur le serveur Web.

Pour comprendre le fonctionnement, étudions le processus de configuration de `https://example.com/` avec un agent de gestion de certificats prenant en charge la fonction de chiffrement Let's&nbsp;Encrypt.

Il y a deux étapes à ce processus. Tout d'abord, l'agent prouve à l'autorité de certification que le serveur Web contrôle un domaine. Ensuite, l'agent peut demander, renouveler et révoquer des certificats pour ce domaine.

## Validation de domaine

Let's&nbsp;Encrypt identifie l'administrateur du serveur par clé publique. La première fois que le logiciel de l'agent interagit avec Let's&nbsp;Encrypt, il génère une nouvelle paire de clés et prouve à Let's&nbsp;Encrypt que le serveur contrôle un ou plusieurs domaines. Ceci est similaire au processus de création d'un compte et d'ajout de domaines à ce compte des autorités de certifications traditionnelles.

Pour lancer le processus, l'agent demande à l'AC Let's Encrypt ce qu'elle doit faire pour prouver qu'elle contrôle `example.com`. L'AC Let's Encrypt examinera le nom de domaine demandé et émettra un ou plusieurs ensembles de défis. Ce sont différentes manières que l'agent peut utiliser pour prouver le contrôle du domaine. Par exemple, l'autorité de certification peut donner à l'agent le choix entre:

* Provisionner un enregistrement DNS sous `example.com`, ou
* Provisionner une ressource HTTP sous l'URI .well-known sur `https://example.com/`

En plus des défis, l'AC de chiffrement de Let fournit également un nonce que l'agent doit signer avec sa paire de clés privée pour prouver qu'il contrôle la paire de clés.

<div class="howitworks-figure">
<img alt="Demander des défis pour valider example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Le logiciel agent complète l'un des défis fournis. Disons qu'il est capable d'accomplir la deuxième tâche ci-dessus: il crée un fichier sur un chemin spécifié sur le site `https://example.com`. L'agent signe également le `nonce` fourni avec sa clé privée. Une fois que l'agent a terminé ces étapes, il informe l'autorité de certification qu'il est prêt à terminer la validation.

Ensuite, le travail de l'AC consiste à vérifier que les défis ont été relevés. L'autorité de certification vérifie la signature sur le `nonce` et tente de télécharger le fichier à partir du serveur Web et de s'assurer qu'il contient le contenu attendu.

<div class="howitworks-figure">
<img alt="Demander l'autorisation d'agir pour example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si la signature sur le `nonce` est valide et que les défis sont validés, l'agent identifié par la clé publique est autorisé à effectuer la gestion des certificats pour `example.com`. Nous appelons la paire de clés que l'agent a utilisé une "paire de clés autorisée" pour `example.com`.

## Délivrance et révocation du certificat

Une fois que l'agent a une paire de clés autorisée, la demande, le renouvellement et la révocation des certificats est simple : il suffit d'envoyer des messages de gestion de certificat et de les signer avec la paire de clés autorisée.

Pour obtenir un certificat pour le domaine, l'agent construit une PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) qui demande à l'AC Let's&nbsp;Encrypt de délivrer un certificat pour `example.com` avec une clé publique spécifiée. Comme d'habitude, le CSR inclut une signature par la clé privée correspondant à la clé publique dans le CSR. L'agent signe également la totalité de la demande de signature de certificat avec la clé autorisée pour `example.com`, de sorte que l'AC Let's&nbsp;Encrypt sait qu'elle est autorisée.

Lorsque l'AC Let's&nbsp;Encrypt reçoit la demande, elle vérifie les deux signatures. Si tout semble correct, il délivre un certificat pour `example.com` avec la clé publique du CSR et le renvoie à l'agent.

<div class="howitworks-figure">
<img alt="Demander un certificat pour example.com"
     src="/images/howitworks_certificate.png"/>
</div>

La révocation fonctionne de la même manière. L'agent signe une demande de révocation avec la paire de clés autorisée pour `example.com`, et l'AC Let's&nbsp;Encrypt vérifie que la demande est autorisée. Si c'est le cas, elle publie les informations de révocation dans les canaux de révocation normaux (OCSP), de sorte que les parties dépendantes, telles que les navigateurs, peuvent savoir qu'ils ne doivent pas accepter le certificat révoqué.

<div class="howitworks-figure">
<img alt="Demander la révocation d'un certificat de example.com"
     src="/images/howitworks_revocation.png"/>
</div>

