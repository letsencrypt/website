---
title: Compatibilité des certificats
slug: certificate-compatibility
top_graphic: 1
lastmod: 2020-02-07
---

{{< lastmod >}}
 
Let's Encrypt vise à être compatible avec autant de logiciels que possible sans compromettre la sécurité. Le principal facteur déterminant pour savoir si une plate-forme peut accepter les certificats Let's Encrypt est de savoir si cette plate-forme inclut le certificat "ISRG Root X1" d'ISRG ou le certificat "DST Root CA X3" d'IdenTrust dans son magasin de relations de confiance.

Si votre certificat est accepté sur certaines des plates-formes "compatibles connues" mais pas sur d'autres, le problème peut être une mauvaise configuration du serveur Web. Si vous rencontrez un problème avec les plates-formes modernes, la cause la plus courante est l'échec de la fourniture d'une chaîne de certification correcte. Si vous rencontrez un problème avec des plates-formes plus anciennes comme Windows XP, les causes les plus courantes sont un problème de configuration d'un protocole de chiffrement, voire de prise en charge du protocole TLS par le serveur, ou le fait encore d'incompatibilté  avec SNI, l'indication du nom du serveur (Server Name Indication). Testez votre site avec [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Si cela n'identifie pas le problème, demandez de l'aide dans nos [Forums communautaires](https://community.letsencrypt.org/).

Vous pouvez consulter [ce forum communautaire en particulier](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) pour plus d'information concernant la compatibilité.

# Compatible

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer sur Windows XP SP3 et supérieur
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 sur macOS
* Safari sur iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* Bibliothèque NSS >= v3.11.9
* Amazon FireOS (Navigateur Silk)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* Console de jeux PS4 avec un micrologiciel (firmware) >= 5.00

# Incompatible

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP antérieur à SP3
  * Ne supporte pas les certificats signés via SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (client de messagerie 2012, pas la version messagerie web)
  * Ne supporte pas les certificats sans une CRL (Liste de Révocation de Certificats)
* Console de jeux PS3
* Console de jeux PS4 avec un micrologiciel < 5.00
