---
title: Compatibilité du certificat
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


Le facteur déterminant pour savoir si une plateforme peut valider les certificats Let's Encrypt est de savoir si cette plateforme fait confiance au certificat "ISRG Root X1" de l'ISRG. Certaines plateformes peuvent valider nos certificats même si elles n'incluent pas l'ISRG Root X1, car elles font confiance au certificat "DST Root CA X3" d'IdenTrust. Après septembre 2021, seules les plateformes qui font confiance à ISRG Root X1 continueront à valider les certificats Let's Encrypt ([à l'exception d'Android](/2020/12/21/extending-android-compatibility.html)).

Si votre certificat est validé sur certaines des plates-formes "compatibles connues" mais pas sur d'autres, le problème peut provenir d'une mauvaise configuration du serveur web. Si vous avez un problème avec les plateformes modernes, la cause la plus fréquente est l'incapacité à fournir la chaîne de certificats correcte. Testez votre site avec le [serveur de test de SSL Labs](https://www.ssllabs.com/ssltest/). Si cela ne permet pas d'identifier le problème, demandez de l'aide dans nos [forums communautaires](https://community.letsencrypt.org/).

# Plateformes qui font confiance à ISRG Root X1

* Windows >= XP SP3 ([en supposant que la mise à jour automatique du certificat racine n'est pas désactivée manuellement](https://docs.microsoft.com/fr-fr/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/fr-fr/HT207177) ([iOS 9 ne l’inclut pas](https://support.apple.com/fr-fr/HT205205))
* [Les iPhone 5 et plus peuvent être mis à jour vers iOS 10](https://en.wikipedia.org/wiki/IPhone_5) et peuvent donc faire confiance à ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (mais Android >= 2.3.6 fonctionnera par défaut [](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (avec mises à jour installées)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (avec mises à jour installées)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Les navigateurs (Chrome, Safari, Edge, Opera) font généralement confiance aux mêmes certificats racine que le système d'exploitation sur lequel ils fonctionnent. Firefox est l'exception : il a son propre magasin racine. Bientôt, les nouvelles versions de Chrome [auront également leur propre magasin racine](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Plateformes qui font confiance à DST Root CA X3

* Windows >= XP SP3
* macOS (la plupart des versions)
* iOS (la plupart des versions)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= precise / 12.04
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (navigateur Silk)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* BlackBerry >= 10.3.3
* Console de jeu PS4 avec firmware >= 5.00

Vous pouvez consulter [cette discussion du forum de la communauté 2015-2017](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) pour plus d'informations sur la compatibilité.

# Incompatibilité connue

* Blackberry < v10.3.3
* Android OS < v2.3.6
* Nintendo 3DS
* Windows XP antérieur au SP3
  * ne peut pas gérer les certificats SHA-2 signés
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (client de messagerie 2012, pas webmail)
  * ne peut pas gérer les certificats sans une LRC
* Console de jeu PS3
* Console de jeu PS4 avec firmware < 5.00

# ISRG Root X2 (nouvelle racine ECDSA) - bientôt disponible
Nous avons soumis ISRG Root X2 aux programmes root de Microsoft, Apple, Google, Mozilla et Oracle pour inclusion. ISRG Root X2 jouit déjà d'une grande confiance grâce à la signature croisée de notre ISRG Root X1. Pour plus d'informations, consultez notre [message sur le forum de la communauté](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


