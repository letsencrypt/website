---
title: Révoquer les certificats
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


Quand la clé privée correspondante d'un certificat n'est plus sûre, vous devriez révoquer le certificat. Cela peut se produire pour différentes raisons. Par exemple, vous pourriez accidentellement partager la clé privée sur un site public ; des pirates peuvent copier la clé privée hors de vos serveurs ; ou des pirates peuvent prendre le contrôle temporaire sur vos serveurs ou votre configuration DNS, et l'utiliser pour valider et émettre un certificat pour lequel ils détiennent la clé privée.

Lorsque vous révoquez un certificat Let's Encrypt, Let's Encrypt publiera cette information de révocation via le [protocole d'état du certificat en ligne (OCSP)](https://fr.wikipedia.org/wiki/Online_Certificate_Status_Protocol), et certains navigateurs utiliseront l'OCSP pour savoir s'ils doivent faire confiance à un certificat. Notez que l'OCSP [a quelques problèmes fondamentaux ](https://www.imperialviolet.org/2011/03/18/revocation.html), donc tous les navigateurs ne feront pas cette vérification. Néanmoins, révoquer les certificats qui correspondent à des clés privées compromises est important, et est requis par le [Contrat d'abonné](/repository) de Let's Encrypt.

Pour révoquer un certificat avec Let's Encrypt, vous utiliserez l'API [ACME ](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), probablement par l'intermédiaire d'un client ACME comme [Certbot](https://certbot.eff.org/). Vous devrez prouver à Let's Encrypt que vous êtes autorisé à révoquer le certificat. Il y a deux manières de procéder :

# A partir du compte qui a émis le certificat

Si vous avez initialement délivré le certificat et que vous avez toujours le contrôle du compte que vous avez utilisé pour l'émettre, vous pouvez le révoquer en utilisant les identifiants de ce compte. Certbot tentera de le faire par défaut. Exemple :

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# En utilisant la clé privée du certificat

Si vous n'avez pas émis le certificat à l'origine, mais que vous avez une copie de la clé privée correspondante, vous pouvez le révoquer en utilisant cette clé privée pour signer la requête de révocation. Par exemple, si vous voyez qu'une clé privée a accidentellement été rendue publique vous pouvez utiliser cette méthode pour révoquer les certificats qui ont utilisé cette clé privée, même si vous n'êtes pas la personne qui a délivré ces certificats.

Pour utiliser cette méthode, vous devez d'abord télécharger le certificat à révoquer. Let's Encrypt logs tous les certificats vers les logs de [Transparence de Certificat ](https://www.certificate-transparency.org/) , pour que vous puissiez les trouver et télécharger à partir d'un moniteur de log comme [crt.sh](https://crt.sh/).

Vous aurez également besoin d'une copie de la clé privée au format PEM. Une fois que vous les avez, vous pouvez révoquer le certificat ainsi :

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# En utilisant un autre compte autorisé

Si quelqu'un a émis un certificat après avoir compromis votre hôte ou votre DNS, vous voudrez révoquer ce certificat une fois que vous en aurez repris le contrôle. Afin de révoquer le certificat, Let's Encrypt devra s'assurer que vous contrôlez les noms de domaine dans ce certificat (sinon les gens pourraient révoquer les certificats des autres sans autorisation) ! Pour valider ce contrôle, Let's Encrypt utilise les mêmes méthodes que celles utilisées pour valider le contrôle de la délivrance du certificat : vous pouvez mettre une [donnée dans un enregistrement DNS TXT ](https://tools.ietf.org/html/rfc8555#section-8.4) ou placer un [fichier sur un serveur HTTP](https://tools.ietf.org/html/rfc8555#section-8.3). En général, un client ACME s'en occupe pour vous. Notez que la plupart des clients ACME combinent la validation et la délivrance, de sorte que la seule façon de demander des validations est de tenter la délivrance. Vous pouvez alors révoquer le certificat obtenu si vous n'en voulez pas, ou simplement détruire la clé privée. Si vous voulez éviter d'émettre un certificat, vous pouvez inclure un nom de domaine inexistant dans votre ligne de commande, ce qui fera échouer l'émission tout en validant les autres noms de domaine existants. Pour ce faire, exécutez :

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Et suivez les instructions. Si vous préférez le valider en utilisant HTTP plutôt que DNS, remplacez le `--preferd-challenges` flag par `--preferred-challenges=http`.

Une fois que vous avez validé le contrôle de tous les noms de domaine du certificat que vous souhaitez révoquer, vous pouvez télécharger le certificat à partir de [crt.sh](https://crt.sh/), puis procéder à la révocation du certificat comme si vous l'aviez émis :

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```
