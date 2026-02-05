---
title: Vertrauensketten
linkTitle: Vertrauensketten (Root und Zwischenzertifikate)
slug: certificates
lastmod: 2026-01-08
show_lastmod: 1
---

Diese Seite beschreibt alle aktuellen und relevanten historischen Zertifizierungsstellen, die von Let's Encrypt betrieben werden. Beachten Sie, dass eine CA am korrektsten als Schlüssel und Name gedacht ist: jede CA kann durch _Viel_ Zertifikate, die alle die gleichen Betreff und Public Key Information enthalten. In diesen Fällen haben wir die Details aller Zertifikate zur Verfügung gestellt, die die CA repräsentieren. Wenn Sie die Trust Anker-IDs für diese CAs suchen, besuchen Sie unsere Seite auf [Objekt-Identifikatoren](/docs/oids).

[![ISRG-Zertifikatshierarchiediagramm, Stand Januar 2026](/images/isrg-hierarchy.png)](/images/isrg-hierarchy-full.png)

# Wurzelzertifikate (Root-Zertifikate)

Unsere Root Zertifikate werden sicher offline gehalten. Im nächsten Abschnitt stellen wir Endteilnehmerzertifikate aus den Zwischenzertifikaten für Abonnenten aus. Alle Wurzelzertifikate haben ein Länderfeld von `C = US`.

Beachten Sie, dass Root CAs keine Verfallsdaten haben, so wie andere Zertifikate. Obwohl ihre selbst-signierten Zertifikate ein `nicht nach` Datum enthalten Root Programme und Trust Stores können sich entscheiden, einer Root CA über dieses Datum hinaus zu vertrauen oder das Vertrauen in sie vor diesem Datum zu beenden. Daher sind die unten angegebenen Enddaten annähernd und basieren auf den aktuellen Root-Programmrichtlinien.

* **ISRG Root X1**
  * Betreff: `O = Internet Security Research Group, CN = ISRG Root X1`
  * Schlüsseltyp: `RSA 4096`
  * Vertrauenswürdig bis: 2030-06-04 (generiert 2015-06-04)
  * CA Details: [crt.sh](https://crt.sh/?caid=7394), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=7394)
  * Zertifikatsdetails (selbstsigniert): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Zertifikatsdetails (Crosssigniert von DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (außer Dienst)
  * CRL Hostname: `x1.c.lencr.org`
  * Webseiten testen: [gültig](https://valid-isrgrootx1.letsencrypt.org/), [widerrufen](https://revoked-isrgrootx1.letsencrypt.org/), [abgelaufen](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * Betreff: `O = Internet Security Research Group, CN = ISRG Root X2`
  * Schlüsseltyp: `ECDSA P-384`
  * Vertrauenswürdig bis: 2035-09-04 (generiert 2020-09-04)
  * CA Details: [crt.sh](https://crt.sh/?caid=183269), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=183269)
  * Zertifikatsdetails (selbstsigniert): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Zertifikatsdetails (Quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Zertifikatsdetails (zweites quersigniertes von ISRG Root X1): [crt.sh](https://crt.sh/?id=20878422868), [der](/certs/gen-y/root-x2-by-x1.der), [pem](/certs/gen-y/root-x2-by-x1.pem), [txt](/certs/gen-y/root-x2-by-x1.txt)
  * CRL Hostname: `x2.c.lencr.org`
  * Webseiten testen: [gültig](https://valid-isrgrootx2.letsencrypt.org/), [widerrufen](https://revoked-isrgrootx2.letsencrypt.org/), [abgelaufen](https://expired-isrgrootx2.letsencrypt.org/)

Diese Root CAs sind noch nicht in Root Programme und Trust Stores enthalten, werden aber bald zur Aufnahme eingereicht:

* **ISRG Root YE**
  * Betreff: `O = ISRG, CN = Root YE`
  * Schlüsseltyp: `ECDSA P-384`
  * Vertrauenswürdig bis: N/A (generiert 2025-09-03)
  * CA Details: [crt.sh](https://crt.sh/?caid=430535), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=430535)
  * Zertifikatsdetails (selbstsigniert): [der](/certs/gen-y/root-ye.der), [pem](/certs/gen-y/root-ye.pem), [txt](/certs/gen-y/root-ye.txt)
  * Zertifikatsdetails (Quersigniert von ISRG Root X2): [der](/certs/gen-y/root-ye-by-x2.der), [pem](/certs/gen-y/root-ye-by-x2.pem), [txt](/certs/gen-y/root-ye-by-x2.txt)
  * CRL Hostname: `ye.c.lencr.org`
  * Test-Webseiten: Bald verfügbar
* **ISRG Root YR**
  * Betreff: `O = ISRG, CN = Root YR`
  * Schlüsseltyp: `RSA 4096`
  * Vertrauenswürdig bis: N/A (generiert 2025-09-03)
  * CA Details: [crt.sh](https://crt.sh/?caid=430543), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=430543)
  * Zertifikatsdetails (selbstsigniert): [der](/certs/gen-y/root-yr.der), [pem](/certs/gen-y/root-yr.pem), [txt](/certs/gen-y/root-yr.txt)
  * Zertifikatsdetails (Quersigniert von ISRG Root X1): [der](/certs/gen-y/root-yr-by-x1.der), [pem](/certs/gen-y/root-yr-by-x1.pem), [txt](/certs/gen-y/root-yr-by-x1.txt)
  * CRL Hostname: `yr.c.lencr.org`
  * Test-Webseiten: Bald verfügbar

Weitere Informationen zur Kompatibilität unserer Root-Zertifikate mit verschiedenen Geräten und TrustStores finden Sie unter [Zertifikatskompatibilität](/docs/cert-compat).

# Zwischenzertifikate (Intermediate-Zertifikate)

Wir halten derzeit acht Zwischenzertifikate im aktiven Rotationsbetrieb. Abonnenten-Zertifikate, die einen öffentlichen ECDSA-Schlüssel enthalten, werden von einem der ECDSA-Zwischenzertifikate ausgestellt; in ähnlicher Weise werden Abonnentenzertifikate mit einem RSA-öffentlichen Schlüssel von einem der RSA-Zwischenzertifikate ausgestellt. Abonnenten-Zertifikate, die unter den "classic" und "tlsclient" [Profilen](/docs/profiles) ausgestellt wurden, werden von einem der ersten vier aufgelisteten Zwischenzertifikaten ausgestellt (E7 bis R13); Umgekehrt werden Abonnenten-Zertifikate, die unter den "tlsserver" und "shortlived" Profilen ausgestellt werden, von einem der letzten vier Zwischenzertifikaten (YE1 bis YR2) ausgestellt.

Alle Zwischenzertifikate haben ein Länderfeld von `C = US`.

* **Let's Encrypt E7**
  * Betreff: `O = Let's Encrypt, CN = E7`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295813), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295813)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132900), [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Zertifikatsdetails (quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132895), [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
  * CRL Hostname: `e7.c.lencr.org`
  * Vertrauensketten:
    * EE ← E7 ← ISRG Root X1 (Standard)
    * EE ← E7 ← ISRG Root X2
* **Let's Encrypt E8**
  * Betreff: `O = Let's Encrypt, CN = E8`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295809), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295809)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132890), [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Zertifikatsdetails (quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132901), [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
  * CRL Hostname: `e8.c.lencr.org`
  * Vertrauensketten:
    * EE ← E8 ← ISRG Root X1 (Standard)
    * EE ← E8 ← ISRG Root X2
* **Let's Encrypt R12**
  * Betreff: `O = Let's Encrypt, CN = R12`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295816), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295816)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132898), [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
  * CRL Hostname: `r12.c.lencr.org`
  * Vertrauensketten:
    * EE ← R12 ← ISRG Root X1 (Standard)
* **Let's Encrypt R13**
  * Betreff: `O = Let's Encrypt, CN = R13`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295817), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295817)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132902), [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
  * CRL Hostname: `r13.c.lencr.org`
  * Vertrauensketten:
    * EE ← R13 ← ISRG Root X1 (Standard)
* **Let's Encrypt YE1**
  * Betrifft: `O = Let's Encrypt, CN = YE1`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=432952), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=432952)
  * Zertifikatsdetails: [der](/certs/gen-y/int-ye1.der), [pem](/certs/gen-y/int-ye1.pem), [txt](/certs/gen-y/int-ye1.txt)
  * CRL Hostname: `ye1.c.lencr.org`
  * Vertrauensketten:
    * EE ← YE1 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Standard)
    * EE ← YE1 ← Root YE ← ISRG Root X2
    * EE ← YE1 ← Root YE
* **Let's Encrypt YE2**
  * Betreff: `O = Let's Encrypt, CN = YE2`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=431054), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=431054)
  * Zertifikatsdetails: [der](/certs/gen-y/int-ye2.der), [pem](/certs/gen-y/int-ye2.pem), [txt](/certs/gen-y/int-ye2.txt)
  * CRL Hostname: `ye2.c.lencr.org`
  * Vertrauensketten:
    * EE ← YE2 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Standard)
    * EE ← YE2 ← Root YE ← ISRG Root X2
    * EE ← YE2 ← Root YE
* **Let's Encrypt YR1**
  * Betreff: `O = Let's Encrypt, CN = YR1`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=432476), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=432476)
  * Zertifikatsdetails: [der](/certs/gen-y/int-yr1.der), [pem](/certs/gen-y/int-yr1.pem), [txt](/certs/gen-y/int-yr1.txt)
  * CRL Hostname: `yr1.c.lencr.org`
  * Vertrauensketten:
    * EE ← YR1 ← Root YR ← ISRG Root X1 (Standard)
    * EE ← YR1 ← Root YR
* **Let's Encrypt YR2**
  * Betreff: `O = Let's Encrypt, CN = YR2`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=432477), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=432477)
  * Zertifikatsdetails: [der](/certs/gen-y/int-yr2.der), [pem](/certs/gen-y/int-yr2.pem), [txt](/certs/gen-y/int-yr2.txt)
  * CRL Hostname: `yr2.c.lencr.org`
  * Vertrauensketten:
    * EE ← YR2 ← Root YR ← ISRG Root X1 (Standard)
    * EE ← YR2 ← Root YR

Klicken Sie unten für Details zu weiteren Zwischenzertifikaten, die nicht Teil der aktiven Zertifikatsausstellung sind:

<details>
<summary>Reserviert für Disaster-Recovery</summary>

Diese Zwischenzertifikate besitzen derzeit gültige Zertifikate, werden aber nicht ausgestellt. Wir können jederzeit ohne Vorwarnung mit der Ausgabe von Abonnentenzertifikaten beginnen.

* **Let's Encrypt E9**
  * Betreff: `O = Let's Encrypt, CN = E9`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295812), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295812)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Zertifikatsdetails (quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
  * CRL Hostname: `e9.c.lencr.org`
* **Let's Encrypt R14**
  * Betreff: `O = Let's Encrypt, CN = R14`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295818), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295818)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132903), [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)
  * CRL Hostname: `r14.c.lencr.org`
* **Let's Encrypt YE3**
  * Betreff: `O = Let's Encrypt, CN = YE3`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=432914), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=432914)
  * Zertifikatsdetails: [der](/certs/gen-y/int-ye3.der), [pem](/certs/gen-y/int-ye3.pem), [txt](/certs/gen-y/int-ye3.txt)
  * CRL Hostname: `ye3.c.lencr.org`
* **Let's Encrypt YR3**
  * Betreff: `O = Let's Encrypt, CN = YR3`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2028-09-02
  * CA Details: [crt.sh](https://crt.sh/?caid=432480), [issued certs](https://crt.sh/?Identity=%25&iCAID=432480)
  * Zertifikatsdetails: [der](/certs/gen-y/int-yr3.der), [pem](/certs/gen-y/int-yr3.pem), [txt](/certs/gen-y/int-yr3.txt)
  * CRL Hostname: `yr3.c.lencr.org`

</details>

<details>
<summary>Außer Betrieb</summary>

Diese Zwischenzertifikate werden nicht mehr verwendet, um Abonnentenzertifikate auszustellen. Diejenigen, die noch über gültige Zertifikate verfügen, können CRLs erstellen.

* **Let's Encrypt E1**
  * Betrifft: `O = Let's Encrypt, CN = E1`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2025-09-15 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=183283), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=183283)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
  * CRL Hostname: `e1.c.lencr.org`
* **Let's Encrypt E2**
  * Betrifft: `O = Let's Encrypt, CN = E2`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2025-09-15 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=183284), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=183284)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
  * CRL Hostname: `e2.c.lencr.org`
* **Let's Encrypt E5**
  * Betreff: `O = Let's Encrypt, CN = E5`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295810), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295810)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132891), [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Zertifikatsdetails (quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132892), [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
  * CRL Hostname: `e5.c.lencr.org`
* **Let's Encrypt E6**
  * Betreff: `O = Let's Encrypt, CN = E6`
  * Schlüsseltyp: `ECDSA P-384`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295819), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295819)
  * Zertifikatsdetails (signiert von ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132905), [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Zertifikatsdetails (quersigniert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132904), [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
  * CRL Hostname: `e6.c.lencr.org`
* **Let's Encrypt R3**
  * Betreff: `O = Let's Encrypt, CN = R3`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2025-09-15 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=183267), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=183267)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Zertifikatsdetails (Cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * CRL Hostname: `r3.c.lencr.org`
* **Let's Encrypt R4**
  * Betreff: `O = Let's Encrypt, CN = R4`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2025-09-15 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=183268), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=183268)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Zertifikatsdetails (Cross-signed von IdenTrust): [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
  * CRL Hostname: `r4.c.lencr.org`
* **Let's Encrypt R10**
  * Betreff: `O = Let's Encrypt, CN = R10`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295814), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295814)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132896), [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
  * CRL Hostname: `r10.c.lencr.org`
* **Let's Encrypt R11**
  * Betreff: `O = Let's Encrypt, CN = R11`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2027-03-12
  * CA Details: [crt.sh](https://crt.sh/?caid=295815), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=295815)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132897), [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)
  * CRL Hostname: `r11.c.lencr.org`
* **Let's Encrypt Authority X1**
  * Betreff: `O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2020-06-04 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=7395), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=7395)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Zertifikatsdetails (Cross-signed vonIdenTrust): [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Betrifft: `O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2020-06-04 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=9745), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=9745)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Zertifikatsdetails (gegenseitig signiert von IdenTrust): [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Betreff: `O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2021-10-06 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=16418), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=16418)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Zertifikatsdetails (gegenseitig signiert von IdenTrust): [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Betreff: `O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * Schlüsseltyp: `RSA 2048`
  * Gültig bis: 2021-10-06 (abgelaufen)
  * CA Details: [crt.sh](https://crt.sh/?caid=16429), [ausgestellte Zertifikate](https://crt.sh/?Identity=%25&iCAID=16429)
  * Zertifikatsdetails (signiert von ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Zertifikatsdetails (gegenseitig signiert von IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<p><!-- to get the right line spacing after a block element --></p>

# Vertrauensketten

Wenn ein ACME-Client ein neu ausgestelltes Zertifikat von der ACME-API von Let's Encrypt herunterlädt, ist dieses Zertifikat Teil einer „Kette“, die auch ein oder mehrere Zwischenzertifikate enthält. Normalerweise besteht diese Kette nur aus dem Endentitätszertifikat und einem Zwischenzertifikat, aber sie könnte auch zusätzliche Zwischenzertifikate enthalten. Die Idee dahinter ist, dass der Browser eines Website-Besuchers durch die Vorlage dieser gesamten Zertifikatskette in der Lage ist, die Signaturen bis hin zu einer vom Browser als vertrauenswürdig eingestuften Stammzertifizierungsstelle zu validieren, ohne zusätzliche Zwischenzertifikate herunterladen zu müssen.

Manchmal gibt es mehr als eine gültige Kette für ein bestimmtes Zertifikat: Wenn beispielsweise ein Zwischenzertifikat gegenseitig signiert wurde, könnte jedes dieser beiden Zertifikate der zweite Eintrag sein, der zu einer der beiden unterschiedlichen Stammzertifikate führt. In diesem Fall können verschiedene Webseitenbetreiber verschiedene Ketten je nach den Eigenschaften wählen, die ihnen am meisten am Herzen liegen.

Bei jedem der oben aufgeführten aktiven Zwischenzertifikaten wird dokumentiert, welche Kette standardmäßig angeboten wird und welche (gegebenenfalls) zusätzlichen Ketten von ACME-Clients angefordert werden können. Im Allgemeinen weisen Ketten, die bei ISRG Root X1 enden, die größte Größe auf, bieten aber auch die größte Kompatibilität mit älteren Clients. Vertrauensketten, die bei ISRG Root X2 enden (werden nur für ECDSA-Zertifikate angeboten), sind kleiner, funktionieren aber nur mit Clients, die nach etwa 2022 ein Update ihres Truststores erhalten haben. Vertrauensketten, die bei Root YE oder Root YR enden, werden voraussichtlich nicht mit den großen Trust-Stores zusammenarbeiten, da diese Root-Zertifikate noch nicht integriert wurden.

Abonnenten, die eine der alternativen Vertrauenskette nutzen möchten, können in der Dokumentation ihres ACME-Clients nachlesen, wie sie die alternative Vertrauenskette anfordern können (z. B. mit dem Flag [certbot `--preferred-chain`](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
