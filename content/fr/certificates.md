---
title: Chaînes de confiance
linkTitle: Chaînes de confiance (Certificats Racines et Intermédiaires)
slug: certificates
lastmod: 2024-06-11
show_lastmod: 1
---

Cette page décrit toutes les autorités de certification actuelles et historiques gérées par Let's Encrypt. Notez qu'une AC est plus correctement considérée comme une clé et un nom : une AC donnée peut être représentée par _plusieurs_ certificats qui contiennent tous les mêmes informations sur le sujet et la clé publique. Dans ce cas, nous avons fourni les détails de tous les certificats qui représentent l'AC.

[![Diagramme de la hiérarchie des certificats de l'ISRG, à partir de juin 2024](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# AC racine

Notre clé racine est conservé en toute sécurité hors ligne. Nous délivrons des certificats d'entité finale aux abonnés des intermédiaires décrits dans la section suivante. Tous les objets des certificats racine ont un champ Pays de `C = US`.

Notez que les AC racines n'ont pas de date d'expiration comme les autres certificats. Bien que leurs certificats auto-signés contiennent une date `notAfter`, les programmes racines et les magasins de confiance peuvent décider de faire confiance à une autorité de certification racine au-delà de cette date ou de mettre fin à la confiance qu'ils lui accordent avant cette date. Les dates de fin de validité indiquées ci-dessous sont donc approximatives et se fondent sur les politiques actuelles du programme Root.

* **Racine ISRG X1**
  * Objet : `O = Internet Security Research Group, CN = ISRG Root X1`
  * Type de clé : `RSA 4096`
  * Validité : jusqu'en 2030-06-04 (généré en 2015-06-04)
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=7394), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=7394)
  * Détails du certificat (auto-signé) : [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Détails du certificat (signé par l'AC racine DST X3) : [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (retiré)
  * Test de sites web : [valide](https://valid-isrgrootx1.letsencrypt.org/), [révoqué](https://revoked-isrgrootx1.letsencrypt.org/), [expiré](https://expired-isrgrootx1.letsencrypt.org/)
* **Racine ISRG X2**
  * Objet : `O = Internet Security Research Group, CN = ISRG Root X2`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2035-09-04 (généré le 2020-09-04)
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=183269), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=183269)
  * Détails du certificat (auto-signé) : [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Test de sites web : [valide](https://valid-isrgrootx2.letsencrypt.org/), [révoqué](https://revoked-isrgrootx2.letsencrypt.org/), [expiré](https://expired-isrgrootx2.letsencrypt.org/)

Pour de plus amples informations sur la compatibilité de nos certificats racine avec divers appareils et magasins de confiance, voir [Compatibilité des certificats](/docs/cert-compat).

# AC subordonnées (intermédiaires)

Nous avons actuellement quatre intermédiaires en circulation active. Les certificats d'abonné contenant une clé publique ECDSA seront délivrés par l'un des intermédiaires ECDSA ; de même, les certificats d'abonné contenant une clé publique RSA seront délivrés par l'un des intermédiaires RSA.

Tous les objets de certificats intermédiaires ont un champ Pays (Country) de `C = US`.

* **Let's Encrypt E5**
  * Objet : `O = Let's Encrypt, CN = E5`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295810), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295810)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * Objet : `O = Let's Encrypt, CN = E6`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295819), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295819)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * Objet : `O = Let's Encrypt, CN = R10`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295814), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295814)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * Objet : `O = Let's Encrypt, CN = R11`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295815), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295815)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)

Cliquez ci-dessous pour plus de détails sur les intermédiaires supplémentaires qui ne font pas partie de la hiérarchie des émissions actives :

<details>
<summary>Sauvegarde</summary>

Ces autorités de certification intermédiaires disposent de certificats en cours de validité, mais ne sont pas émises par elles. Nous pouvons commencer à émettre des certificats d'abonné à partir de ces derniers à tout moment, sans avertissement.

* **Let's Encrypt E7**
  * Objet : `O = Let's Encrypt, CN = E7`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295813), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295813)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * Objet : `O = Let's Encrypt, CN = E8`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295809), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295809)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * Objet : `O = Let's Encrypt, CN = E9`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295812), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295812)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * Objet : `O = Let's Encrypt, CN = R12`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295816), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295816)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * Objet : `O = Let's Encrypt, CN = R13`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295817), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295817)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * Objet : `O = Let's Encrypt, CN = R14`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2027-03-12
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=295818), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=295818)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)

</details>

<details>
<summary>Retiré</summary>

Ces autorités de certification intermédiaires ne sont plus utilisées pour émettre des certificats pour les souscripteurs. Ceux qui ont encore des certificats valides peuvent produire des réponses OCSP et/ou des CRL.

* **Let's Encrypt E1**
  * Objet : `O = Let's Encrypt, CN = E1`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2025-09-15
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=183283), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=183283)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * Objet : `O = Let's Encrypt, CN = E2`
  * Type de clé : `ECDSA P-384`
  * Validité : jusqu'au 2025-09-15
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=183284), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=183284)
  * Détails du certificat (signé par l'AC racine ISRG X2) : [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * Objet : `O = Let's Encrypt, CN = R3`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2025-09-15
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=183267), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=183267)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * Objet : `O = Let's Encrypt, CN = R4`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2025-09-15
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=183268), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=183268)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
* **Let's Encrypt Authority X1**
  * Objet : `O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * Type de clé : `RSA 2048`
  * Validité : expiré le 2020-06-04
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=7395), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=7395)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Objet : `O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * Type de clé : `RSA 2048`
  * Validité : expiré le 2020-06-04
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=9745), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=9745)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Objet : `O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * Type de clé : `RSA 2048`
  * Validité : expiré le 2021-10-06
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=16418), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=16418)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Objet : `O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * Type de clé : `RSA 2048`
  * Validité : expiré le 2021-10-06
  * Détails de l'AC : [crt.sh](https://crt.sh/?caid=16429), [certificats délivrés](https://crt.sh/?Identity=%25&iCAID=16429)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Détails du certificat (signé par IdenTrust) : [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>Protocole de Vérification de Certificat en Ligne (Online Certificate Status Protocol : OCSP)</summary>

Cette paire de clés était auparavant utilisée pour signer les réponses OCSP concernant l'état des intermédiaires de Let's Encrypt au nom de la racine de Let's Encrypt, afin que la racine puisse rester hors ligne en toute sécurité. Nous n'émettons plus de réponses OCSP pour nos intermédiaires ; à la place, nous émettons périodiquement des CRL à partir de notre racine pour communiquer l'état de révocation de nos intermédiaires.

* **Racine ISRG OCSP X1**
  * Objet : `O = Internet Security Research Group, CN = ISRG Root OCSP X1`
  * Type de clé : `RSA 2048`
  * Validité : jusqu'au 2025-06-10
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=2929281974), [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)
  * Détails du certificat (signé par l'AC racine ISRG X1) : [crt.sh](https://crt.sh/?id=142051103) (expiré)

</details>
<p><!-- to get the right line spacing after a block element --></p>

# Chaînes

Lorsqu'un client ACME télécharge un certificat nouvellement émis à partir de l'API ACME de Let's Encrypt, ce certificat fait partie d'une « chaîne » qui comprend également un ou plusieurs intermédiaires. En général, cette chaîne se compose uniquement du certificat de l'entité finale et d'un intermédiaire, mais elle peut contenir des intermédiaires supplémentaires. L'idée est qu'en présentant toute cette chaîne de certificats au navigateur du visiteur d'un site web, ce dernier pourra valider les signatures jusqu'à une racine en laquelle il a confiance, sans avoir à télécharger d'intermédiaires supplémentaires.

Il existe parfois plus d'une chaîne valide pour un certificat donné : par exemple, si un certificat intermédiaire a fait l'objet d'une signature croisée, l'un ou l'autre de ces deux certificats peut constituer la deuxième entrée, « remontant » jusqu'à l'une ou l'autre des deux racines différentes. Dans ce cas, différents opérateurs de sites web peuvent vouloir sélectionner différentes chaînes en fonction des propriétés qui leur tiennent le plus à cœur.

Les certificats d'abonné avec des clés publiques RSA sont délivrés par nos intermédiaires RSA, qui sont délivrés uniquement par notre racine RSA ISRG Root X1 (c'est-à-dire qu'ils ne font pas l'objet d'une signature croisée). Par conséquent, tous les certificats d'abonné RSA ne disposent que d'une seule chaîne :

<div style="text-align: center">
RSA Subcriber Cert ← RSA Intermediate (R10 or R11) ← ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

Les certificats d'abonné avec des clés publiques ECDSA sont délivrés par nos intermédiaires ECDSA, qui sont délivrés à la fois par notre racine RSA de l'ISRG X1 et par notre racine ECDSA de l'ISRG X2 (c'est-à-dire qu'ils font l'objet d'une signature croisée). C'est pourquoi nous proposons deux chaînes pour ces certificats :

<div style="text-align: center">
ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X1

ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

La première chaîne, jusqu'à l'ISRG Root X1, offre la plus grande compatibilité, car ce certificat racine est inclus dans la plupart des magasins de confiance. La deuxième chaîne, jusqu'à l'ISRG Root X2, consomme moins d'octets de la bande passante du réseau lors de chaque handshake TLS. Nous fournissons la première chaîne par défaut, afin d'assurer la plus grande compatibilité possible. Les utilisateurs qui souhaitent privilégier la taille plutôt que la compatibilité peuvent consulter la documentation de leur client ACME pour savoir comment demander la chaîne alternative (par exemple, [certbot's `--preferred-chain` flag](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
