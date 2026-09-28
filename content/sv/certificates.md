---
title: Trustkedjor
linkTitle: Betrodda kedjor (rot- och mellancertifikat)
slug: certificates
lastmod: 2026-07-08
show_lastmod: 1
---

Denna sida beskriver alla nuvarande och relevanta historiska certifikatutfärdare som drivs av Let's Encrypt. Observera att en CA mest korrekt betraktas som en nyckel och ett namn: varje viss CA kan representeras av _flera_ certifikat som alla innehåller samma ämne och offentlig nyckelinformation. I sådana fall har vi tillhandahållit detaljerna för alla certifikat som representerar CA. Om du letar efter Trust Anchor-ID:n kopplade till dessa CA:er, se vår sida om [Object Identifiers](/docs/oids).

[![ISRG-certifikat-hierarkidiagram, från och med juli 2026](/images/isrg-hierarchy.png)](/images/isrg-hierarchy-full.png)

# Rot-CA:er

Vårt rotnyckelmaterial förvaras säkert offline. Vi utfärdar certifikat till slutanvändare från de mellanförstådda som beskrivs i nästa avsnitt.

Observera att rot-CA:er inte har utgångsdatum på samma sätt som andra certifikat. Även om deras självsignerade certifikat innehåller ett `notAfter` datum, kan Rotprogram och Trovärdighetsregister besluta att lita på en Rot-CA bortom det datumet, eller avsluta förtroendet innan det datumet. Således är nedan angivna slutdatum för giltighet ungefärliga, baserade på aktuella Rotprogramspolicys.

* **ISRG Root X1**
  * Ämne: `C=US, O=Internet Security Research Group, CN=ISRG Root X1`
  * Nyckeltyp: `RSA 4096`
  * Betrodd till: 2030-06-04 (skapad 2015-06-04)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=7394), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=7394)
  * Certifikatdetaljer (självsignerat): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Certifikatdetaljer (korssignerat av DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (pensionerad)
  * CRL värdnamn: `x1.c.lencr.org`
  * Testwebbplatser: [giltiga](https://valid.x1.test-certs.letsencrypt.org/), [återkallade](https://revoked.x1.test-certs.letsencrypt.org/), [utgångna](https://expired.x1.test-certs.letsencrypt.org/)
* **ISRG Root X2**
  * Ämne: `C=US, O=Internet Security Research Group, CN=ISRG Root X2`
  * Nyckeltyp: `ECDSA P-384`
  * Betrodd till: 2035-09-04 (skapad 2020-09-04)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183269), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=183269)
  * Certifikatdetaljer (självsignerat): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Certifikatdetaljer (korssignerade av ISRG Root X1): [der](/certs/gen-y/root-x2-by-x1.der), [pem](/certs/gen-y/root-x2-by-x1.pem) [txt](/certs/gen-y/root-x2-by-x1.txt)
  * CRL värdnamn: `x2.c.lencr.org`
  * Testwebbplatser: [giltiga](https://valid.x2.test-certs.letsencrypt.org/), [återkallade](https://revoked.x2.test-certs.letsencrypt.org/), [utgångna](https://expired.x2.test-certs.letsencrypt.org/)

Dessa rötter ingår ännu inte i Root Program Trust Stores, men kommer snart att skickas in för inkludering:

* **ISRG Root YE**
  * Ämne: `C=US, O=ISRG, CN=Root YE`
  * Nyckeltyp: `ECDSA P-384`
  * Betrodd till: Ej tillgängligt (genererat 2025-09-03)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=430535), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=430535)
  * Certifikatdetaljer (självsignerade): [der](/certs/gen-y/root-ye.der), [pem](/certs/gen-y/root-ye.pem), [txt](/certs/gen-y/root-ye.txt)
  * Certifikatdetaljer (korssignerade av ISRG Root X2): [der](/certs/gen-y/root-ye-by-x2.der), [pem](/certs/gen-y/root-ye-by-x2.pem), [txt](/certs/gen-y/root-ye-by-x2.txt)
  * CRL värdnamn: `ye.c.lencr.org`
  * Testwebbplatser: [giltiga](https://valid.ye.test-certs.letsencrypt.org/), [återkallade](https://revoked.ye.test-certs.letsencrypt.org/), [utgångna](https://expired.ye.test-certs.letsencrypt.org/)
* **ISRG Root YR**
  * Ämne: `C=US, O=ISRG, CN=Root YR`
  * Nyckeltyp: `RSA 4096`
  * Betrodd till: Ej tillgängligt (genererat 2025-09-03)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=430543), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=430543)
  * Certifikatdetaljer (självsignerade): [der](/certs/gen-y/root-yr.der), [pem](/certs/gen-y/root-yr.pem), [txt](/certs/gen-y/root-yr.txt)
  * Certifikatdetaljer (korssignerade av ISRG Root X1): [der](/certs/gen-y/root-yr-by-x1.der), [pem](/certs/gen-y/root-yr-by-x1.pem) [txt](/certs/gen-y/root-yr-by-x1.txt)
  * CRL värdnamn: `yr.c.lencr.org`
  * Testwebbplatser: [giltiga](https://valid.yr.test-certs.letsencrypt.org/), [återkallade](https://revoked.yr.test-certs.letsencrypt.org/), [utgångna](https://expired.yr.test-certs.letsencrypt.org/)

Mer information om våra rotcertifikats kompatibilitet med olika enheter och betrodda certifikatarkiv finns i [Certifikatkompatibilitet](/docs/cert-compat).

# Subordinerade (Mellanliggande) CA

Vi underhåller för närvarande fyra intermediärer i aktiv rotation. Prenumerantcertifikat som innehåller en ECDSA offentlig nyckel kommer att utfärdas från en av ECDSA mellanliggande; på samma sätt kommer prenumerantcertifikat som innehåller en RSA offentlig nyckel att utfärdas från en av RSA mellanliggande.

* **Let's Encrypt YE1**
  * Ämne: `C=US, O=Let's Encrypt, CN=YE1`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=432952), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=432952)
  * Certifikatdetaljer: [der](/certs/gen-y/int-ye1.der), [pem](/certs/gen-y/int-ye1.pem), [txt](/certs/gen-y/int-ye1.txt)
  * CRL värdnamn: `ye1.c.lencr.org`
  * Kedjor:
    * EE ← YE1 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Standard)
    * EE ← YE1 ← Root YE ← ISRG Root X2
    * EE ← YE1 ← Root YE
* **Let's Encrypt YE2**
  * Ämne: `C=US, O=Let's Encrypt, CN=YE2`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=431054), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=431054)
  * Certifikatdetaljer: [der](/certs/gen-y/int-ye2.der), [pem](/certs/gen-y/int-ye2.pem), [txt](/certs/gen-y/int-ye2.txt)
  * CRL värdnamn: `ye2.c.lencr.org`
  * Kedjor:
    * EE ← YE2 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Standard)
    * EE ← YE2 ← Root YE ← ISRG Root X2
    * EE ← YE2 ← Root YE
* **Let's Encrypt YR1**
  * Ämne: `C=US, O=Let's Encrypt, CN=YR1`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=432476), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=432476)
  * Certifikatdetaljer: [der](/certs/gen-y/int-yr1.der), [pem](/certs/gen-y/int-yr1.pem), [txt](/certs/gen-y/int-yr1.txt)
  * CRL värdnamn: `yr1.c.lencr.org`
  * Kedjor:
    * EE ← YR1 ← Root YR ← ISRG Root X1 (Standard)
    * EE ← YR1 ← Root YR
* **Let's Encrypt YR2**
  * Ämne: `C=US, O=Let's Encrypt, CN=YR2`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=432477), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=432477)
  * Certifikatdetaljer: [der](/certs/gen-y/int-yr2.der), [pem](/certs/gen-y/int-yr2.pem), [txt](/certs/gen-y/int-yr2.txt)
  * CRL värdnamn: `yr2.c.lencr.org`
  * Kedjor:
    * EE ← YR2 ← Root YR ← ISRG Root X1 (Standard)
    * EE ← YR2 ← Root YR

Klicka nedan för detaljer om ytterligare mellanliggande som inte är en del av den aktiva utfärdandehierarkin:

<details>
<summary>Reserver</summary>

Dessa mellanliggande certifikatutfärdare har för närvarande giltiga certifikat, men används inte för utfärdande. Vi kan börja utfärda prenumerantcertifikat från dem när som helst, utan varning.

* **Let's Encrypt YE3**
  * Ämne: `C=US, O=Let's Encrypt, CN=YE3`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=432914), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=432914)
  * Certifikatdetaljer: [der](/certs/gen-y/int-ye3.der), [pem](/certs/gen-y/int-ye3.pem), [txt](/certs/gen-y/int-ye3.txt)
  * CRL:s värdnamn: `ye3.c.lencr.org`
* **Let's Encrypt YR3**
  * Ämne: `C=US, O=Let's Encrypt, CN=YR3`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2028-09-02
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=432480), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=432480)
  * Certifikatdetaljer: [der](/certs/gen-y/int-yr3.der), [pem](/certs/gen-y/int-yr3.pem), [txt](/certs/gen-y/int-yr3.txt)
  * CRL:s värdnamn: `yr3.c.lencr.org`

</details>

<details>
<summary>Pensionerade</summary>

Dessa mellanliggande CA används inte längre för att utfärda prenumerantcertifikat. De som utfärdade några certifikat kommer att fortsätta producera CRL:er tills de går ut.

* **Let's Encrypt E5**
  * Ämne: `C=US, O=Let's Encrypt, CN=E5`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295810), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295810)
  * Certifikatdetaljer (signerade av ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132891), [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Certifikatdetaljer (korssignerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132892), [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
  * CRL:s värdnamn: `e5.c.lencr.org`
* **Let's Encrypt E6**
  * Ämne: `C=US, O=Let's Encrypt, CN=E6`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295819), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295819)
  * Certifikatdetaljer (signerade av ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132905), [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Certifikatdetaljer (korssignerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132904), [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
  * CRL:s värdnamn: `e6.c.lencr.org`
* **Let's Encrypt E7**
  * Ämne: `C=US, O=Let's Encrypt, CN=E7`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295813), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295813)
  * Certifikatdetaljer (signerat av ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132900), [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Certifikatdetaljer (korssignerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132895), [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
  * CRL värdnamn: `e7.c.lencr.org`
* **Let's Encrypt E8**
  * Ämne: `C=US, O=Let's Encrypt, CN=E8`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295809), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295809)
  * Certifikatdetaljer (signerat av ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132890), [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Certifikatdetaljer (korssignerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132901), [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
  * CRL värdnamn: `e8.c.lencr.org`
* **Let's Encrypt E9**
  * Ämne: `C=US, O=Let's Encrypt, CN=E9`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295812), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295812)
  * Certifikatdetaljer (signerat av ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132899), [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Certifikatdetaljer (korssignerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
  * CRL värdnamn: `e9.c.lencr.org`
* **Let's Encrypt R10**
  * Ämne: `C=US, O=Let's Encrypt, CN=R10`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295814), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295814)
  * Certifikatdetaljer (signerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132896), [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
  * CRL:s värdnamn: `r10.c.lencr.org`
* **Let's Encrypt R11**
  * Ämne: `C=US, O=Let's Encrypt, CN=R11`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295815), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295815)
  * Certifikatdetaljer (signerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132897), [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)
  * CRL:s värdnamn: `r11.c.lencr.org`
* **Let's Encrypt R12**
  * Ämne: `C=US, O=Let's Encrypt, CN=R12`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295816), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295816)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132898), [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
  * CRL värdnamn: `r12.c.lencr.org`
* **Let's Encrypt R13**
  * Ämne: `C=US, O=Let's Encrypt, CN=R13`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295817), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295817)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132902), [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
  * CRL värdnamn: `r13.c.lencr.org`
* **Let's Encrypt R14**
  * Ämne: `C=US, O=Let's Encrypt, CN=R14`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295818), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=295818)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132903), [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)
  * CRL:s värdnamn: `r14.c.lencr.org`

</details>

<details>
<summary>Utgånget</summary>

Dessa intermediära CA:er kan inte utfärda abonnentcertifikat.

* **Let's Encrypt Authority X1**
  * Ämne: `C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X1`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2020-06-04 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=7395), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=7395)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Certifikatdetaljer (cross-signerat av IdenTrust): [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Ämne: `C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X2`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2020-06-04 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=9745), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=9745)
  * Certifikatdetaljer (signerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Certifikatdetaljer (korssignerade av IdenTrust): [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Ämne: `C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X3`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2021-10-06 (utgången)
  * CA-uppgifter: [crt.sh](https://crt.sh/?caid=16418), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=16418)
  * Certifikatdetaljer (signerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Certifikatdetaljer (korssignerade av IdenTrust): [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Ämne: `C=US, O=Let's Encrypt, CN=Let's Encrypt Authority X4`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2021-10-06 (utgången)
  * CA-uppgifter: [crt.sh](https://crt.sh/?caid=16429), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=16429)
  * Certifikatdetaljer (signerade av ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Certifikatdetaljer (korssignerade av IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)
* **Let's Encrypt E1**
  * Ämne: `C=US, O=Let's Encrypt, CN=E1`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2025-09-15 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183283), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=183283)
  * Certifikatdetaljer (signerat av ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
  * CRL:s värdnamn: `e1.c.lencr.org`
* **Let's Encrypt E2**
  * Ämne: `C=US, O=Let's Encrypt, CN=E2`
  * Nyckeltyp: `ECDSA P-384`
  * Giltig till: 2025-09-15 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183284), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=183284)
  * Certifikatdetaljer (signerat av ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
  * CRL:s värdnamn: `e2.c.lencr.org`
* **Let's Encrypt R3**
  * Ämne: `C=US, O=Let's Encrypt, CN=R3`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2025-09-15 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183267), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=183267)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Certifikatdetaljer (korssignerat av IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * CRL:s värdnamn: `r3.c.lencr.org`
* **Let's Encrypt R4**
  * Ämne: `C=US, O=Let's Encrypt, CN=R4`
  * Nyckeltyp: `RSA 2048`
  * Giltig till: 2025-09-15 (utgången)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183268), [utfärdade certifikat](https://crt.sh/?Identity=%25&iCAID=183268)
  * Certifikatdetaljer (signerat av ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikatdetaljer (korssignerat av IdenTrust): [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
  * CRL:s värdnamn: `r4.c.lencr.org`

</details>

<p><!-- to get the right line spacing after a block element --></p>

# Kedjor

När en ACME-klient hämtar ett nyutfärdat certifikat från Let's Encrypts ACME-API ingår certifikatet i en kedja som även innehåller ett eller flera mellancertifikat. Vanligtvis består denna kedja endast av slutentitetscertifikatet och ett mellanliggande, men den kan innehålla ytterligare mellanliggande. Idén är att genom att presentera hela denna kedja av certifikat för en webbplatsbesökares webbläsare, kommer webbläsaren att kunna validera signaturerna hela vägen upp till en rot som webbläsaren litar på utan att behöva ladda ner några ytterligare mellanliggande.

Ibland finns det mer än en giltig kedja för ett givet certifikat: till exempel, om ett mellanliggande har korssignerats, kan antingen ett av dessa två certifikat vara det andra elementet, "kedjar upp till" någon av två olika rötter. I detta fall kan olika webbplatsoperatörer vilja välja olika kedjor beroende på vilka egenskaper de bryr sig mest om.

Var och en av de aktiva mellanmediärerna ovan dokumenterar vilken kedja som erbjuds som standard, och vilka (om några) ytterligare kedjor som ACME-klienter kan begära. Generellt har kedjor som slutar vid ISRG Root X1 störst storlek men också störst kompatibilitet med äldre klienter. Kedjor som slutar vid ISRG Root X2 (erbjuds endast för ECDSA-certifikat) är mindre, men fungerar bara med klienter som har fått en uppdatering till sin certifikatarkiv efter cirka 2022. Kedjor som slutar vid Root YE eller Root YR förväntas inte samarbeta med någon av de stora certifikatarkiverna, eftersom dessa rötter ännu inte har införlivats.

Prenumeranter som vill använda en av de alternativa kedjorna kan hänvisa till sin ACME-klients dokumentation för instruktioner om hur man begär den alternativa kedjan (till exempel [certbots `--preferred-chain`-flagga](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
