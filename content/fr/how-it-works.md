---
title: Comment ça marche
linkTitle: Comment fonctionne Let's Encrypt
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

L'objectif de Let's Encrypt et du [protocole ACME](https://tools.ietf.org/html/rfc8555) est de permettre la mise en place d'un serveur HTTPS et de lui faire obtenir automatiquement un certificat de confiance pour le navigateur, sans aucune intervention humaine. Ceci est réalisé en exécution un client ACME sur un serveur web.

Pour en comprendre le fonctionnement, passons en revue le processus de mise en place de `https://example.com/` avec un client ACME.

Ce processus comporte deux étapes. Premièrement, le client ACME prouve à l'[Autorité de Certification](https://wikipedia.org/wiki/Certificate_authority) (AC) que le serveur web contrôle un domaine. Après cela, le client peut demander ou révoquer des certificats pour ce domaine.

## Validation du domaine

Let's Encrypt identifie le logiciel client ACME par [clé publique](https://wikipedia.org/wiki/Public-key_cryptography). La première fois que le client ACME interagi avec Let's Encrypt, il génère une nouvelle paire de clé du compte et prouve à la AC de Let's Encrypt que l'opérateur contrôle un ou plusieurs domaines. Cette procédure est similaire à la procédure traditionnelle de création d'un compte et d'ajout de domaines à ce compte.

Pour lancer le processus, le client demande à l'AC Let's Encrypt ce qu'elle doit faire pour prouver qu'elle contrôle `example.com`. L'AC "Let's Encrypt" examinera le nom de domaine demandé et émettra une ou plusieurs séries de challenges. Il y a différentes manières que le client peut utiliser pour prouver le contrôle du domaine. Par exemple, l'AC peut donner au client le choix entre les deux :

* Fournir un enregistrement DNS sous `example.com`, ou
* Mettre à disposition une ressource HTTP sous un URI bien connu sur `http://example.com/`

<div class="howitworks-figure">
<img alt="Demander des challenges pour valider example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Le logiciel client complète l'un des défis fournis. Supposons qu'il soit capable d'accomplir la deuxième tâche ci-dessus : il crée un fichier sur un chemin spécifié sur le site `http://example.com`. Une fois que le client a terminé ces étapes, il informe l'AC qu'il est prêt à terminer la validation.

Il incombe ensuite à l'AC de vérifier que les challenges ont été relevés du point de vue de [multiples réseaux](/2020/02/19/multi-perspective-validation).

<div class="howitworks-figure">
<img alt="Demander l'autorisation pour example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Si les défis sont validés, le client identifié par la clé publique est autorisé à effectuer la gestion des certificats pour `example.com`.

Notez que ce processus ne peut pas utiliser HTTPS, ce qui le rend vulnérable à certaines attaques. Afin d'atténuer le problème, Let's Encrypt effectue plusieurs validations en parallèle à partir de différentes perspectives réseau. Cela rend considérablement plus difficile pour un attaquant de subvertir le processus de validation.

## Délivrance et révocation des certificats

Une fois que le client est autorisé, la demande, le renouvellement et la révocation de certificats sont simples : il suffit d'envoyer des messages de gestion de certificats et de les signer avec la paire de clés du compte autorisée.

### Émission

Pour obtenir un certificat pour le domaine, le client fait une [demande de signature de certificat](https://tools.ietf.org/html/rfc2986) (CSR) au format PKCS#10 qui demande à l'AC Let's Encrypt de délivrer un certificat pour `example.com` avec une clé publique spécifique. Comme d'habitude, la demande de signature de certificat (CSR) comprend une signature par la clé privée correspondant à la clé publique dans la CSR. Le client signe également l'ensemble de la CSR avec la clé autorisée pour `example.com` afin que l'AC Let's Encrypt sache qu'il est autorisé.

Lorsque l'AC Let's Encrypt reçoit la demande, elle vérifie les deux signatures. Si tout semble bon, il délivre un certificat pour `example.com` avec la clé publique du CSR et le renvoie au client. L'AC soumettra également le certificat à de nombreux journaux publics de transparence des certificats (CT). Voir [ici](https://certificate.transparency.dev/howctworks/#pki) pour plus de détails.

<div class="howitworks-figure">
<img alt="Demander un certificat par exemple.com"
     src="/images/howitworks_certificate.png"/>
</div>

Renouveler un certificat a un moment ultérieur signifie répéter le processus d'émission à nouveau - effectuer la validation du domaine et ensuite demande un nouveau certificat.

### Révocation

La révocation fonctionne de manière similaire. Le client signe une demande de révocation avec la paire de clés autorisée pour `example.com`, et l'AC Let's Encrypt vérifie que la demande est autorisée. Si c'est le cas, elle publie les informations de révocation dans les [Listes de Révocation de Certificat](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), afin que les parties utilisatrices, comme les navigateurs, puissent savoir qu'elles ne doivent pas accepter le certificat révoqué.

<div class="howitworks-figure">
<img alt="Demander la révocation d'un certificat pour example.com"
     src="/images/howitworks_revocation.png"/>
</div>
