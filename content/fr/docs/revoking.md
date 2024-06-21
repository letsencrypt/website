---
title: Révocation des certificats
slug: revoking
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


Lorsqu'un certificat n'est plus fiable, vous devez le révoquer. Cela peut se produire pour plusieurs raisons. Par exemple, vous pourriez accidentellement partager la clé privée sur un site Web public ; des pirates pourraient copier la clé privée de vos serveurs ; ou des pirates pourraient prendre le contrôle temporaire de vos serveurs ou de votre configuration DNS, et l'utiliser pour valider et émettre un certificat pour lequel ils détiennent la clé privée.

Lorsque vous révoquez un certificat Let's Encrypt, Let's Encrypt publie ces informations de révocation via le [ Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol), et certains navigateurs vérifient cet OCSP pour savoir s'ils doivent faire confiance à un certificat. Notez que le site OCSP[ a quelques problèmes fondamentaux](https://www.imperialviolet.org/2011/03/18/revocation.html), de sorte que tous les navigateurs ne feront pas cette vérification. Pourtant, la révocation des certificats qui correspondent à des clés privées compromises est une chose importante, et elle est requise par l'[Accord de l'abonné](/repository) de Let's Encrypt.

Pour révoquer un certificat avec Let's Encrypt, vous utiliserez l'[ACME API](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md), probablement via un client ACME comme [Certbot](https://certbot.eff.org/). Vous devrez prouver à Let's Encrypt que vous êtes autorisé à révoquer le certificat. Il y a trois façons de le faire : à partir du compte qui a émis le certificat, en utilisant un autre compte autorisé, ou en utilisant la clé privée du certificat.

# Spécifier un code de motivation

Lors de la révocation d'un certificat, les abonnés de Let's Encrypt doivent sélectionner un code de motivation comme suit :

* Aucune raison fournie ou `unspecified` (RFC 5280 CRLReason #0)
  - Lorsque les codes de motivation ci-dessous ne s'appliquent pas à la demande de révocation, l'abonné ne doit pas fournir un code de raison autre que "unspecified".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - L'abonné du certificat doit choisir le motif de révocation "keyCompromise" lorsqu'il a des raisons de croire que la clé privée de son certificat a été compromise, par exemple lorsqu'une personne non autorisée a eu accès à la clé privée de son certificat.
  - Si la demande de révocation est signée en utilisant la clé privée du certificat, plutôt qu'une clé privée du compte de l'abonné, Let's Encrypt peut ignorer la raison de la révocation dans la demande et définir la raison comme étant "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - L'abonné au certificat doit choisir le motif de révocation "superseded" lorsqu'il demande un nouveau certificat pour remplacer son certificat existant.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - L'abonné au certificat doit choisir le motif de révocation "cessationOfOperation" lorsqu'il ne détient plus tous les noms de domaine du certificat ou lorsqu'il n'utilisera plus le certificat en raison de la fermeture de son site Web.
  - Si la demande de révocation provient d'un compte d'abonné qui n'a pas effectué la commande du certificat en question, mais qui a démontré qu'il contrôlait tous les identifiants du certificat, Let's Encrypt peut ignorer le motif de révocation de la demande et attribuer à ce motif la valeur "cessationOfOperation".

Les demandes de révocation qui spécifient un code de motivation autre que ceux détaillés ci-dessus seront rejetées.

# À partir du compte qui a émis le certificat

Si vous avez initialement émis le certificat et que vous avez toujours le contrôle du compte utilisé pour l'émettre, vous pouvez le révoquer en utilisant les informations d'identification de votre compte. Certbot tentera de le faire par défaut. Exemple :

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# En utilisant un autre compte autorisé

Si quelqu'un a émis un certificat après avoir compromis votre hôte ou votre DNS, vous voudrez révoquer ce certificat dès que vous aurez repris le contrôle. Afin de révoquer le certificat, Let's Encrypt devra s'assurer que vous contrôlez les noms de domaine dans ce certificat (sinon les gens pourraient révoquer les certificats des autres sans permission) !

Pour valider ce contrôle, Let's Encrypt utilise les mêmes méthodes qu'il utilise pour valider le contrôle pour l'émission : vous pouvez mettre une [valeur dans un enregistrement DNS TXT](https://tools.ietf.org/html/rfc8555#section-8.4) ou mettre un [fichier sur un serveur HTTP](https://tools.ietf.org/html/rfc8555#section-8.3). En général, un client ACME s'en charge pour vous. Notez que la plupart des clients ACME combinent validation et émission, de sorte que la seule façon de demander des validations est de tenter l'émission. Vous pouvez ensuite révoquer le certificat résultant si vous n'en voulez pas, ou simplement détruire la clé privée.

Si vous voulez éviter l'émission d'un certificat, vous pouvez inclure un nom de domaine inexistant dans votre ligne de commande, ce qui fera échouer l'émission tout en validant les autres noms de domaine existants. Exemple :

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Et suivez les instructions. Si vous préférez le valider en utilisant HTTP plutôt que DNS, remplacez l'indicateur `--preferred-challenges` par `--preferred-challenges=http`.

Une fois que vous avez validé le contrôle de tous les noms de domaine du certificat que vous voulez révoquer, vous pouvez télécharger le certificat à partir de [crt.sh](https://crt.sh/), puis procéder à la révocation du certificat comme si vous l'aviez émis :

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# En utilisant la clé privée du certificat

Si vous n'avez pas émis le certificat à l'origine, mais que vous avez une copie de la clé privée correspondante, vous pouvez le révoquer en utilisant cette clé privée pour signer la demande de révocation. Par exemple, si vous constatez qu'une clé privée a été accidentellement rendue publique, vous pouvez utiliser cette méthode pour révoquer les certificats qui utilisaient cette clé privée, même si vous n'êtes pas la personne qui a initialement émis ces certificats.

Pour utiliser cette méthode, vous aurez d'abord besoin d'une copie de la clé privée au format PEM.

Ensuite, si vous ne l'avez pas encore, téléchargez le certificat à révoquer. Let's Encrypt consigne tous les certificats dans les journaux de [Certificate Transparency](https://www.certificate-transparency.org/), de sorte que vous pouvez trouver et télécharger les certificats à partir d'un moniteur de journaux comme [crt.sh](https://crt.sh/). La recherche d'un champ `SubjectPublicKeyInfo` (SPKI) correspondant permet de trouver tous les certificats qui utilisent la clé privée. Pour extraire le hachage SPKI d'une clé privée :
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Une fois que vous avez la clé privée et le certificat, vous pouvez révoquer le certificat comme suit :

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
