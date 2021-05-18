---
title: Révocation des certificats
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2020-02-22
show_lastmod: 1
---


Lorsque la clef privée correspondante d'un certificat n'est plus sûre, vous devez révoquer le certificat. Cela peut se produire pour différentes raisons. Par exemple, vous pouvez avoir accidentellement partagé la clef privée sur un site Web public; les pirates pourraient avoir copié la clef privée de vos serveurs; ou les pirates pourraient prendre le contrôle temporaire de vos serveurs ou de votre configuration DNS, et utiliser la clef pour valider et émettre un certificat dont ils détiennent la clef privée.

Lorsque vous révoquez un certificat Let's Encrypt, Let's Encrypt publiera les informations de cette révocation via le [Protocole de statut de certificat en ligne (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), et certains navigateurs vérifieront l'OCSP pour voir s'ils doivent faire confiance à un certificat. Notez que l'OCSP [a quelques problèmes fondamentaux](https://www.imperialviolet.org/2011/03/18/revocation.html),  tous les navigateurs n'effectueront donc pas cette vérification. Pourtant, la révocation des certificats qui correspondent à des clefs privées compromises est une pratique importante et est exigée par Let's Encrypt's [Contrat du souscripteur](/repository) (en anglais).

Pour révoquer un certificat avec Let's Encrypt, vous utiliserez l'[API ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), très probablement via un client ACME comme [Certbot](https://certbot.eff.org/). Vous devrez prouver à Let's Encrypt que vous êtes autorisé à révoquer le certificat. Il existe trois façons de procéder:

# Depuis le compte qui a émis le certificat

Si vous avez initialement délivré le certificat et que vous avez toujours le contrôle du compte que vous avez utilisé pour le créer, vous pouvez le révoquer à l'aide de votre identifiant de compte. Certbot tentera cela par défaut. Exemple:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Utilisation de la clef privée du certificat

Si vous n'avez pas délivré le certificat à l'origine, mais que vous avez une copie de la clef privée correspondante, vous pouvez révoquer le certificat en utilisant cette clef privée pour signer la demande de révocation. Par exemple, si vous voyez qu'une clef privée a été accidentellement rendue publique, vous pouvez utiliser cette méthode pour révoquer des certificats même si vous n'êtes pas la personne à qui ce certificat a été délivré.

Pour utiliser cette méthode, vous devez d'abord télécharger le certificat à révoquer. Let's Encrypt enregistre tous les certificats dans le [Certificate Transparency](https://www.certificate-transparency.org/), afin que vous puissiez trouver et télécharger des certificats à partir d'un moniteur de journal comme [crt.sh](https://crt.sh/).

Vous aurez également besoin d'une copie de la clef privée au format PEM. Une fois que vous les avez, vous pouvez révoquer le certificat comme suit:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# Utiliser un autre compte autorisé

Si quelqu'un a émis un certificat après avoir compromis votre hôte ou votre DNS, vous
souhaitez révoquer ce certificat après avoir repris le contrôle. Afin de révoquer le
certificat, Let's Encrypt devra s'assurer que vous contrôlez les noms de domaine
de ce certificat (sinon des personnes pourraient révoquer les certificats des autres
sans autorisation)! Pour valider ce contrôle, Let's Encrypt utilise le même
méthode qu'il utilise pour valider le contrôle de l'émission: vous pouvez
mettre une [valeur dans un enregistrement de type TXT du DNS](https://tools.ietf.org/html/rfc8555#section-8.4) ou placer un [fichier sur un serveur HTTP](https://tools.ietf.org/html/rfc8555#section-8.3). Généralement, un client ACME s'en chargera pour vous. Notez que la plupart des clients ACME combinent validation et délivrance, donc la seule façon de demander des validations est de tenter l'émission. Vous pouvez ensuite révoquer le certificat résultant si vous n'en voulez pas, ou simplement détruire la clef privée. Si vous voulez absolument éviter d'émettre un certificat, vous pouvez inclure un nom de domaine inexistant dans votre ligne de commande, ce qui entraînera l'échec de l'émission tandis que les noms de domaines existants seront validés.  Pour ce faire, exécutez:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```
Puis suivez les instructions. Si vous préférez la validation utilisant le port HTTP plutôt que le DNS, remplacez l'option  `--preferred-challenges` par `--preferred-challenges=http`.

Une fois que vous avez validé le contrôle de tous les noms de domaine dans le certificat que vous souhaitez révoquer, vous pouvez télécharger le certificat depuis [crt.sh] (https://crt.sh/), puis révoquez le certificat comme si vous l'aviez délivré:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
