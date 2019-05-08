---
title: Chaîne de confiance
slug: certificates
top_graphic: 5
---

# Certificats racine

Nos racines sont conservées en toute sécurité hors ligne. Nous émettons des certificats finaux signés par les intermédiaires de la section suivante.

* Actif
  * [ISRG Root X1 (auto-signé)](/certs/isrgrootx1.pem.txt)

Nous avons mis en place des sites Web pour tester les certificats liés à nos racines.

* ISRG Root X1 Certificat valide
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Certificat Révoqué
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Certificat Expiré
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Certificats Intermédiaires

IdenTrust a aussi signé (signature croisée, *cross signed* en anglais) nos intermédiaires. Cela permet à nos certificats finaux d'être acceptés par tous les principaux navigateurs pendant que nous propageons notre propre racine.

Dans des circonstances normales, les certificats émis par Let's Encrypt proviendront de «Let's Encrypt Authority X3». L'autre intermédiaire, «Let's Encrypt Authority X4», est réservé à la reprise après sinistre et ne sera utilisé que si nous perdons la possibilité d'utiliser «Let's Encrypt Authority X3». Les intermédiaires X1 et X2 étaient notre première génération d'intermédiaires. Nous les avons remplacés par de nouveaux intermédiaires plus compatibles avec Windows XP.

* Actif
  * [Let's Encrypt Authority X3 (Signé par IdenTrust)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Secours
  * [Let's Encrypt Authority X4 (Signé par IdenTrust)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Retirés
  * [Let's Encrypt Authority X2 (Signé par IdenTrust)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (Signé par IdenTrust)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signé par ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Signature croisée

Notre intermédiaire "Let's Encrypt Authority X3" représente une seule paire de clés public/privée.
La clé privée de cette paire génère la signature pour tous les certificats finaux, c'est-à-dire les certificats que nous délivrons pour une utilisation sur votre serveur.

Notre intermédiaire est signé par la racine ISRG X1. Cependant, puisque nous sommes une toute nouvelle
autorité de certification, ISRG Root X1 n'est pas encore approuvé dans la plupart des navigateurs.
Afin d'être reconnu immédiatement, notre intermédiaire est également signé par
une autre autorité de certification, IdenTrust, dont la racine est déjà approuvée par 
les principaux navigateurs. Plus précisément, IdenTrust a signé notre intermédiaire en utilisant leur certificat racine
"DST Root CA X3" (maintenant appelé "TrustID X3 Root"). [Télécharger "TrustID X3 Root" sur identrust.com](https://www.identrust.com/support/downloads) (ou, de façon alternative, vous pouvez télécharger une copie ici : [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b)).

Cela signifie qu'il y a deux certificats disponibles qui représentent tous deux notre
intermédiaire. L'un est signé par DST Root CA X3, et l'autre est signé par ISRG
Racine X1. La façon la plus simple de les distinguer est de regarder leur champ "émetteur".

Lors de la configuration d'un serveur Web, l'opérateur du serveur configure non seulement le
certificat final, mais aussi une liste d'intermédiaires pour aider les navigateurs à vérifier
que le certificat d'entité finale possède une chaîne de confiance menant à une racine approuvée
certificat. Presque tous les opérateurs de serveurs choisiront de servir une chaîne contenant
le certificat intermédiaire avec le sujet "Let's Encrypt Authority X3" et
ayant pour émetteur "DST Root CA X3." Le logiciel recommandé par Let's Encrypt, [Certbot](https://certbot.org), rendra
la configuration transparente.


L'image suivante explique visuellement les relations entre nos certificats :

<img src="/certs/isrg-keys.png" alt="Schéma des relations clés de l'ISRG">

# Certificat de signature de l'OCSP

Ce certificat est utilisé pour signer les réponses OCSP pour les intermédiaires de l'autorité Let's Encrypt, de sorte que nous n'avons pas besoin d'avoir la clé racine en ligne afin de
signer ces réponses. Une copie de ce certificat est automatiquement incluse dans
ces réponses OCSP, donc les abonnés n'ont pas besoin de faire quoi que ce soit avec.
Ceci est inclus uniquement à titre informatif.

* [ISRG Root OCSP X1 (Signé par ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certificate Transparency

Nous nous engageons à la transparence dans nos opérations et dans les certificats que nous
émettons. Nous soumettons tous les certificats aux [Logs de Certificate Transparency](https://www.certificate-transparency.org/) au fur et à mesure que nous les émettons. Vous pouvez voir tous
émis Let's Encrypt certificats via ces liens:

* [Émis par Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Émis par Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Plus d'informations

Les clés privées de l'autorité de certification racine ISRG et des autorités de certification intermédiaires de Let's Encrypt sont stockées sur des modules de sécurité matériels (HSM), qui offrent un degré de protection élevé contre le vol de clés.

Toutes les clés de l'ISRG sont actuellement des clés RSA. Nous [prévoyons de générer des clés ECDSA](/fr/upcoming-features/).
