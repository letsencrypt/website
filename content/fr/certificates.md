---
title: La chaîne de confiance
linkTitle: Chaîne de confiance (certificats racine et intermédiaire)
slug: certificates
top_graphic: 5
lastmod: 2021-09-24
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Certificats racine

Nos certificats racine sont maintenus hors ligne en toute sécurité. Nous délivrons des certificats d'entité finale aux souscripteurs des certificats intermédiaires dans la section suivante. Pour une compatibilité supplémentaire lorsque nous soumettons notre nouveau Root X2 à divers programmes racine, nous l'avons également signé de manière croisée à partir de Root X1.

* Actif
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Auto-signé](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Signé par DST Racine CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Disponibilité active et limitée
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Auto-signé](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Signé par DST Racine CA X3](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Nous avons mis en place des sites web pour tester les certificats qui enchaînent vers nos racines actives.

* Racine ISRG X1
  * [Valide](https://valid-isrgrootx1.letsencrypt.org/)
  * [Révoqué](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Expiré](https://expired-isrgrootx1.letsencrypt.org/)
* Racine ISRG X2
  * [Valide](https://valid-isrgrootx2.letsencrypt.org/)
  * [Révoqué](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Expiré](https://expired-isrgrootx2.letsencrypt.org/)

# Certificats intermédiaires

Dans des circonstances normales, les certificats émis par Let's Encrypt proviendront de "R3", un intermédiaire RSA. À l'heure actuelle, l'émission depuis "E1", un intermédiaire ECDSA, est possible uniquement pour les clés d'abonnés ECDSA pour les [comptes autorisés](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). À l'avenir, l'émission depuis "E1" sera disponible pour tout le monde.

Nos autres intermédiaires ("R4" et "E2") sont réservés à la reprise en cas de catastrophe et ne seront utilisés que si nous perdons notre capacité à émettre des problèmes avec nos principaux intermédiaires. Nous n'utilisons plus les intermédiaires X1, X2, X3 et X4.

IdenTrust a signé la signature croisée de nos intermédiaires RSA pour une compatibilité supplémentaire.

* Actif
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=3334561879) : [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=3479778542) : [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (retiré)
* Disponibilité active et limitée
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Signé par ISRG Root X2](https://crt.sh/?id=3334671964) : [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Sauvegarde
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=3334561877) : [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=3479778543) : [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (retiré)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Signé par ISRG Root X2](https://crt.sh/?id=3334671963) : [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Retiré
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=9314792) : [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=10235198) : [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=12721505) : [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=10970235) : [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=47997543) : [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=15706126) : [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Signé par ISRG Root X1](https://crt.sh/?id=47997546) : [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Contre-signé par IdenTrust](https://crt.sh/?id=15710291) : [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Signature croisée

## Intermédiaire

Chacun de nos intermédiaires représente une seule paire de clés publique/privée. La clé privée de cette paire génère la signature de tous les certificats d'entité finale (également appelés certificats leaf), c'est-à-dire les certificats que nous émettons pour utilisation sur votre serveur.

Nos intermédiaires RSA sont signés par ISRG Root X1. ISRG Root X1 est largement fiable à ce point, mais nos intermédiaires RSA sont encore croisés signés par IdenTrust[DST Root CA X3](https://crt.sh/?id=8395)" (maintenant appelé "TrustID X3 Root") pour une compatibilité client supplémentaire. L'IdenTrust root existe depuis plus longtemps et a donc une meilleure compatibilité avec les appareils plus anciens et les systèmes d'exploitation (par exemple Windows XP, Android 7). Vous pouvez [télécharger "TrustID X3 Root" depuis IdenTrust](https://www.identrust.com/support/downloads) (ou, alternativement, vous pouvez [télécharger une copie de notre site](/certs/trustid-x3-root.pem.txt)).

Avoir des signatures croisées signifie que chacun de nos intermédiaires RSA ont deux certificats représentant la même clé de signature. L'un est signé par DST Root CA X3 et l'autre est signé par ISRG Root X1. La façon la plus simple de distinguer les deux est d'examiner leur champ émetteur.

Lors de la configuration d'un serveur web, l'opérateur du serveur configure non seulement le certificat de l'entité finale, mais aussi une liste d'intermédiaires pour aider les navigateurs à vérifier que le certificat de l'entité finale possède une chaîne de confiance menant à un certificat racine de confiance. Pratiquement tous les opérateurs de serveurs choisiront de servir une chaîne incluant le certificat intermédiaire avec l’Objet "R3" et l’émetteur "ISRG Root X1". Le logiciel client recommandé par Let's Encrypt, [Certbot](https://certbot.org), fera cette configuration de manière transparente.

## Racines
Similaire aux intermédiaires, les certificats racine peuvent être signés croisés, souvent pour augmenter la compatibilité du client. Notre racine ECDSA, ISRG Root X2 a été généré à l'automne 2020 et est le certificat racine pour la hiérarchie ECDSA. Il est représenté par deux certificats : un qui est auto-signé et un qui est signé par ISRG Root X1.

Tous les certificats signés par l'ECDSA intermédiaire "E1" viendront avec une chaîne incluant un certificat intermédiaire dont le sujet est "ISRG Root X2" et dont l'émetteur est "ISRG Root X1". Presque tous les opérateurs de serveurs choisiront de servir cette chaîne car elle offre la plus compatabilité jusqu'à ce que ISRG Root X2 soit largement fiable.

# Certificat de signature pour OCSP

Ce certificat est utilisé pour signer les réponses OCSP pour les intermédiaires de l'autorité de cryptage Let's Encrypt Authority, de sorte que nous n'avons pas besoin de mettre la clé racine en ligne pour signer ces réponses. Une copie de ce certificat est automatiquement incluse dans ces réponses OCSP, de sorte que les abonnés n'ont rien à faire. Il est inclus ici à titre d'information uniquement.

* ISRG Root OCSP X1 ([Signé par ISRG Root X1](https://crt.sh/?id=2929281974)) : [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Nos nouveaux intermédiaires n'ont pas d'URL OCSP (leurs informations de révocation sont à la place servies via CRL), donc nous n'avons pas émis un certificat de signature OCSP de ISRG Root X2.

# Transparence des certificats

Nous sommes attachés à la transparence dans nos opérations et dans les certificats que nous délivrons. Nous soumettons tous les certificats à [Certificate Transparency logs](https://www.certificate-transparency.org/) au fur et à mesure que nous les délivrons. Vous pouvez consulter tous les certificats Let's Encrypt émis via ces liens :

* [Publiés par Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Publiés par Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Délivré par E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Délivré par R3](https://crt.sh/?Identity=%25&iCAID=183267)
