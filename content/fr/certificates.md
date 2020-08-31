---
title: Chaîne de confiance
linkTitle: Chaîne de confiance (Certificats racine et intermédiaire)
slug: certificates
top_graphic: 5
lastmod: 2020-02-07
---

{{< lastmod >}}

# Certificats racine

Nos racines sont conservées en toute sécurité hors ligne. Nous émettons,  pour les souscripteurs, des certificats d'entité finale signés par les intermédiaires de la section suivante.

* Actif
  * [ISRG Root X1 (auto-signé)](/certs/isrgrootx1.pem.txt)

Nous avons mis en place des sites Web pour tester le chaînage des certificats jusqu'à nos racines.

* ISRG Root X1 Certificat valide
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Certificat révoqué
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Certificat expiré
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Certificats Intermédiaires

Dans des circonstances normales, les certificats émis par Let's Encrypt proviendront de «Let's Encrypt Authority X3». L'autre intermédiaire, «Let's Encrypt Authority X4», est réservé à la reprise après sinistre et ne sera utilisé que si nous perdons la possibilité d'émettre avec «Let's Encrypt Authority X3». Nous n'utilisons plus les racines intermédiaires X1 and X2.

IdenTrust a établi une certification croisée (*cross-signed* en anglais) pour permettre une compatibilité complémentaire. 

* Actif
  * [Let's Encrypt Authority X3 (Certification croisée avec IdenTrust)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Secours
  * [Let's Encrypt Authority X4 (Certification croisée avec IdenTrust)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Retiré
  * [Let's Encrypt Authority X2 (Certification croisée avec IdenTrust)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (Certification croisée avec IdenTrust)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Certification Croisée (Cross Signing)

Notre intermédiaire “Let’s Encrypt Authority X3” représente une unique paire de clefs publique/privée. La clef privée de cette paire génère la signature pour tous les certificats d'entité finale (aussi appelés certificats feuille), c'est-à-dire les certificats que nous délivrons pour une utilisation sur votre serveur.

Notre intermédiaire est signé par la racine ISRG X1. La racine ISRG est désormais largement approuvée, mais notre intermédiaire dispose toujours d'une certification croisée avec la racine "DST Root CA X3" d'IdenTrust (maintenant nommée "TrustID X3 Root") pour une plus grande compatibilité cliente. La racine IdenTrust existe depuis plus longtemps et a donc une meilleure compatibilité avec les anciens appareils et systèmes d'exploitation (par exemple Windows XP). [Télécharger "TrustID X3 Root" sur identrust.com](https://www.identrust.com/support/downloads) (ou bien, vous pouvez télécharger une copie ici: [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b)).

Disposer d'une certification croisée signifie qu'il existe deux ensembles de certificats intermédiaires disponibles, qui, tous deux représentent notre intermédiaire. L'un est signé par DST Root CA X3 et l'autre par ISRG Root X1. La façon la plus simple de les distinguer est d'examiner leur champ émetteur (Issuer).

Lors de la configuration d'un serveur web, l'opérateur du serveur configure non seulement le
certificat d'entité finale, mais aussi une liste de certificats intermédiaires pour aider les navigateurs à vérifier que le certificat d'entité finale possède une chaîne de confiance menant à un certificat racine approuvé. Presque tous les opérateurs de serveurs choisiront d'utiliser une chaîne comprenant
le certificat intermédiaire avec le sujet «Let’s Encrypt Authority X3» et émis par «DST Root CA X3». Le logiciel recommandé par Let's Encrypt, [Certbot](https://certbot.org), rendra la configuration transparente.

Le schéma ci-dessous décrit les relations entre nos certificats :

<img src="/certs/isrg-keys.png" alt="Schéma des relations clés de l'ISRG">

# Certificat de signature de l'OCSP

Ce certificat est utilisé pour signer les réponses OCSP pour les intermédiaires de l'autorité Let's Encrypt, de sorte que nous n'avons pas besoin d'avoir la clef racine en ligne afin de signer ces réponses. Une copie de ce certificat est automatiquement incluse dans ces réponses OCSP, les souscripteurs n'ont donc pas besoin de faire quoi que ce soit avec. Il est fournit ici uniquement à titre informatif.

* [ISRG Root OCSP X1 (Signé par ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certificate Transparency

Nous nous engageons à la transparence dans nos opérations et dans les certificats que nous
émettons. Nous soumettons tous les certificats aux [Logs du Certificate Transparency](https://www.certificate-transparency.org/) au fur et à mesure que nous les émettons. Vous pouvez voir tous les certificats émis par Let's Encrypt via ces liens:

* [Émis par Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Émis par Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Plus d'informations

Les clefs privées de l'autorité de certification racine ISRG et des autorités de certification intermédiaires de Let's Encrypt sont stockées sur des modules de sécurité matériels (HSM), qui offrent un degré de protection élevé contre le vol de clefs.

Toutes les clefs de l'ISRG sont actuellement des clefs RSA. Nous [prévoyons de générer des clefs ECDSA](/upcoming-features).
