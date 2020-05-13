---
title: Comment fonctionne Let's Encrypt
linkTitle: Comment fonctionne Let's Encrypt
slug: how-it-works
top_graphic: 3
lastmod: 2019-10-18
---

{{< lastmod >}}

L'objectif de Let's&nbsp;Encrypt et du [protocole ACME](https://tools.ietf.org/html/rfc8555) est de permettre la mise en place d'un serveur HTTPS et l'obtention automatique d'un certificat de confiance, reconnu nativement par les navigateurs, sans intervention humaine. Ceci est accompli en exécutant un agent de gestion de certificat sur le serveur Web.

Pour en comprendre le fonctionnement, étudions le processus de configuration de `https://example.com/` avec un agent de gestion de certificat prenant en charge Let's&nbsp;Encrypt.

C'est un processus à deux étapes. Tout d'abord, l'agent prouve à l'autorité de certification (CA - ou AC en français -) que le serveur Web contrôle un domaine. Ensuite, l'agent peut demander, renouveler et révoquer des certificats pour ce domaine.

## Validation de domaine

Let's&nbsp;Encrypt identifie l'administrateur du serveur via une clef publique. La première fois que le logiciel de l'agent interagit avec Let's&nbsp;Encrypt, il génère une nouvelle paire de clés et prouve à l'AC Let's&nbsp;Encrypt que le serveur contrôle un ou plusieurs domaines. Ceci est similaire au processus de création d'un compte et d'ajout de domaines à ce compte pour des autorités de certifications traditionnelles.

Pour lancer le processus, l'agent demande à l'AC Let's Encrypt ce qu'il doit faire pour prouver qu'il contrôle `example.com`. L'AC Let's Encrypt examinera le nom de domaine cité et émettra un ou plusieurs ensembles de défis. Ce sont différentes manières permettant à l'agent de prouver son contrôle du domaine. Par exemple, l'autorité de certification peut donner à l'agent le choix entre:

* Provisionner un enregistrement DNS sous `example.com`, ou
* Provisionner une ressource HTTP accessible via une URI imposée sur `http://example.com/`

En plus des défis, l'AC Let's Encrypt fournit également un nonce ("Number used ONCE ") que l'agent doit signer avec sa clef privée pour prouver qu'il contrôle la paire de clef.

<div class="howitworks-figure">
<img alt="Demander des défis pour valider example.com"
     src="/images/howitworks_challenge.png"/>
</div>

L'agent logiciel réussi l'un des défis fournis. Disons qu'il est capable d'accomplir la seconde tâche ci-dessus: Il crée un fichier à un emplacemet spécifié du site  `http://example.com`. L'agent signe également le nonce fourni avec sa clef privée. Une fois que l'agent à terminé ces étapes, il informe l'autorité de certification (AC) qu'il est prêt à poursuivre la validation. 

Ensuite, le travail de l'AC consiste à vérifier que les défis ont été relevés. L'autorité de certification vérifie la signature sur le nonce et tente de télécharger le fichier sur le serveur Web et contrôler qu'il contient le contenu attendu.

<div class="howitworks-figure">
<img alt="Demander l'autorisation d'agir pour example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si la signature sur le nonce est valide et que les défis sont validés, l'agent identifié par la clé publique est autorisé à effectuer la gestion des certificats pour `example.com`. Nous appelons la paire de clefs que l'agent a utilisé une "paire de clés autorisée" pour `example.com`.

## Délivrance et révocation du certificat

Une fois que l'agent a une paire de clefs autorisée, la demande, le renouvellement et la révocation des certificats est simple : il suffit d'envoyer des messages de gestion de certificat et de les signer avec la paire de clefs autorisée.

Pour obtenir un certificat pour le domaine, l'agent construit une PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) qui demande à l'AC Let's&nbsp;Encrypt de délivrer un certificat pour `example.com` avec une clef publique spécifiée. Comme c'est la norme, le CSR contient une signature, réalisée par la clef privée associée à la clef publique qui elle est incluse dans le CSR. L'agent signe également la totalité de la demande de signature de certificat avec la clef autorisée pour `example.com`, de sorte que l'AC Let's&nbsp;Encrypt à la preuve de la légitimité de la demande.

Lorsque l'AC Let's&nbsp;Encrypt reçoit la demande, elle vérifie les deux signatures. Si tout semble correct, elle délivre un certificat pour `example.com` avec la clef publique du CSR et le renvoie à l'agent.

<div class="howitworks-figure">
<img alt="Demander un certificat pour example.com"
     src="/images/howitworks_certificate.png"/>
</div>

La révocation fonctionne de la même manière. L'agent signe une demande de révocation avec la paire de clefs autorisée pour `example.com`, et l'AC Let's&nbsp;Encrypt vérifie que la demande est autorisée. Si c'est le cas, elle publie les informations de révocation dans les canaux de révocation normaux (c'est-à-dire l'OCSP), de sorte que les parties dépendantes, telles que les navigateurs, puissent savoir qu'ils ne doivent pas accepter le certificat révoqué.

<div class="howitworks-figure">
<img alt="Demander la révocation d'un certificat de example.com"
     src="/images/howitworks_revocation.png"/>
</div>
