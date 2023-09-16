---
title: Compatibilité du certificat
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-10-31
show_lastmod: 1
---


Le facteur déterminant pour savoir si une plateforme peut valider les certificats Let's Encrypt est de savoir si cette plateforme fait confiance au certificat "ISRG Root X1" de l'ISRG. Avant septembre 2021, certaines plateformes pouvaient valider nos certificats bien que ceux-ci n'incluent pas ISRG Root X1, car elles faisaient confiance au certificat "DST Root CA X3" de IdenTrust. À partir d'octobre 2021, seules les plateformes qui font confiance à ISRG Root X1 valideront les certificats Let's Encrypt ([ à l'exception d'Android ](/2020/12/21/extending-android-compatibility.html)).

Si votre certificat est validé sur certaines des plates-formes "compatibles connues" mais pas sur d'autres, le problème peut provenir d'une mauvaise configuration du serveur web. Si vous avez un problème avec les plateformes modernes, la cause la plus fréquente est l'incapacité à fournir la chaîne de certificats correcte. Testez votre site avec le [serveur de test de SSL Labs](https://www.ssllabs.com/ssltest/). Si cela ne permet pas d'identifier le problème, demandez de l'aide dans nos [forums communautaires](https://community.letsencrypt.org/).

# Plateformes qui font confiance à ISRG Root X1

* Windows >= XP SP3 ([en supposant que la mise à jour automatique du certificat racine n'est pas désactivée manuellement](https://docs.microsoft.com/fr-fr/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/fr-fr/HT207177) ([iOS 9 ne l’inclut pas](https://support.apple.com/fr-fr/HT205205))
* [Les iPhone 5 et plus peuvent être mis à jour vers iOS 10](https://en.wikipedia.org/wiki/IPhone_5) et peuvent donc faire confiance à ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (mais Android >= 2.3.6 fonctionnera par défaut [](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Pangolin Précis / 12.04 (avec application des mises à jour)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (avec mises à jour installées)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Les navigateurs (Chrome, Safari, Edge, Opera) font généralement confiance aux mêmes certificats racine que le système d'exploitation sur lequel ils fonctionnent. Firefox est l'exception : il a son propre magasin racine. Bientôt, les nouvelles versions de Chrome [auront également leur propre magasin racine](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# Plateformes qui font confiance à l'AC Root DST X3 mais pas à l'ISRG Root X1

Ces plateformes ont fonctionné jusqu'en septembre 2021, mais ne valideront plus les certificats Let's Encrypt.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) et < jessie /8
* Java 8 >= 8u101 et < 8u141
* Java 7 >= 7u111 et < 7u151
* NSS >= v3.11.9 et < 3.26
* Amazon FireOS (Silk Browser) (numéro de version inconnue)
* Cyanogen > v10 (version qui a ajouté ISRG Root X1 inconnu)
* Jolla Sailfish OS > v1.1.2.16 (version qui a ajouté ISRG Root X1 inconnu)
* Kindle > v3.4.1 (version qui a ajouté ISRG Root X1 inconnu)
* Blackberry >= 10.3.3 (version qui a ajouté ISRG Root X1 inconnu)
* Console de jeu PS4 avec firmware >= 5.00 (version qui a ajouté ISRG Root X1 inconnu)

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

Nous avons soumis ISRG Root X2 aux programmes root de Microsoft, Apple, Google, Mozilla et Oracle pour inclusion. ISRG Root X2 jouit déjà d'une grande confiance grâce à la signature croisée de notre ISRG Root X1. Pour plus d'informations, consultez notre [message sur le forum de la communauté](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).
