---
title: Chains of Trust
linkTitle: Tillidskæder (Root og Intermediate Certifikater)
slug: certificates
lastmod: 2026-01-08
show_lastmod: 1
---

Denne side beskriver alle de nuværende og relevante historiske certificeringsmyndigheder, som drives af Let's Encrypt. Bemærk, at en Certifikatmyndighed - CA - mest korrekt opfattes som en nøgle og et navn: enhver given CA kan være repræsenteret af _flere_ certifikater, som alle indeholder den samme Emne og Offentlige nøgle Information. I sådanne tilfælde har vi givet nærmere oplysninger om alle de certifikater, der repræsenterer CA'en. Hvis du leder efter de Trust Anchor ID'er, der er knyttet til disse CA'er, se vores side på [Object Identifiers](/docs/oids).

[![ISRG Certifikat Hierarki Diagram, fra januar 2026](/images/isrg-hierarchy.png)](/images/isrg-hierarchy-full.png)

# Root CAs

Vores root certifikater holdes sikkert offline. Vi udsteder end-entity certifikater til abonnenter fra intermediate certifikater som beskrevet i næste afsnit. Alle root-certifikat Emner har et landefelt på `C = US`.

Bemærk, at Root CAs ikke har udløbsdatoer på helt samme måde som andre certifikater. Selv om deres selvsignerede certifikater indeholder en `notAfter` dato, Root Programs and Trust Stores kan vælge at have tillid til en Root CA efter denne dato, eller afslutte tilliden inden denne dato. Som sådan er de end-of-validity datoer angivet nedenfor omtrentlige, baseret på aktuelle Root Program politikker.

* **ISRG Root X1**
  * Emne: `O = Research Group, Internet Security Group, CN = ISRG Root X1`
  * Nøgletype: `RSA 4096`
  * Gyldigt indtil: 2030-06-04 (genereret 2015-06-04)
  * CA-oplysninger: [crt.sh](https://crt.sh/?caid=7394), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=7394)
  * Certifikatoplysninger (selvsigneret): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Certifikatdetaljer (krydssigneret af DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (pensioneret)
  * CRL værtsnavn: `x1.c.lencr.org`
  * Test websteder: [gyldigt](https://valid-isrgrootx1.letsencrypt.org/), [tilbagekaldt](https://revoked-isrgrootx1.letsencrypt.org/), [udløbet](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * Emne: `O = Research Group, Internet Security Group, CN = ISRG Root X2`
  * Nøgletype: `ECDSA P-384`
  * Gyldigt indtil: 2035-09-04 (genereret 2020-09-04)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183269), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183269)
  * Certifikatoplysninger (selvsigneret): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Certifikatoplysninger (krydsunderskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Certifikat detaljer (andet kryds underskrevne af ISRG Root X1): [crt.sh](https://crt.sh/?id=20878422868), [der](/certs/gen-y/root-x2-by-x1.der),[pem](/certs/gen-y/root-x2-by-x1.pem),[txt](/certs/gen-y/root-x2-by-x1.txt)
  * CRL værtsnavn: `x2.c.lencr.org`
  * Test websteder: [gyldigt](https://valid-isrgrootx2.letsencrypt.org/), [tilbagekaldt](https://revoked-isrgrootx2.letsencrypt.org/), [udløbet](https://expired-isrgrootx2.letsencrypt.org/)

Disse root certifikater er endnu ikke inkluderet i Root Program Trust Stores, men vil snart blive indsendt:

* **ISRG Root YE**
  * Emne: `O = ISRG, CN = Root YE`
  * Nøgletype: `ECDSA P-384`
  * Gyldigt indtil: N/A (genereret 2025-09-03)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=430535), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=430535)
  * Certifikatoplysninger (selvsigneret): [, der](/certs/gen-y/root-ye.der) [pem](/certs/gen-y/root-ye.pem), [txt](/certs/gen-y/root-ye.txt)
  * Certifikatdetaljer (kryds underskrevet af ISRG Root X2): [der](/certs/gen-y/root-ye-by-x2.der), [pem](/certs/gen-y/root-ye-by-x2.pem), [txt](/certs/gen-y/root-ye-by-x2.txt)
  * CRL værtsnavn: `ye.c.lencr.org`
  * Test hjemmesider: Kommende mulighed
* **ISRG Root YR**
  * Emne: `O = ISRG, CN = Root YR`
  * Nøgletype: `RSA 4096`
  * Gyldigt indtil: N/A (genereret 2025-09-03)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=430543),[Udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=430543)
  * Certifikatoplysninger (selvsigneret): [, der](/certs/gen-y/root-yr.der) [pem](/certs/gen-y/root-yr.pem), [txt](/certs/gen-y/root-yr.txt)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/gen-y/root-yr-by-x1.der), [pem](/certs/gen-y/root-yr-by-x1.pem), [txt](/certs/gen-y/root-yr-by-x1.txt)
  * CRL værtsnavn: `yr.c.lencr.org`
  * Test hjemmesider: Kommende mulighed

Se [Certificate Compatibility](/docs/cert-compat) for yderligere information om kompatibiliteten af vores rodcertifikater med forskellige enheder og trust stores.

# Underordnede (CA'er)

Vi vedligeholder i øjeblikket otte mellemled i aktiv rotation. Abonnementscertifikater med en offentlig ECDSA-nøgle vil blive udstedt fra en af ECDSA-underordnet CA. Tilsvarende udstedes Abonnementscertifikater med en offentlig RSA-nøgle fra en af RSA-underordnet CA. Abonnentcertifikater udstedt under "classic" og "tlsclient" [profiler](/docs/profiles) vil blive udstedt fra en af de fire første mellemled, der er opført på listen (E7 til R13). Omvendt vil abonnentcertifikater udstedt under "tlsserveren" og "shortlived" profiler blive udstedt fra en af de sidste fire mellemled (YE1 gennem YR2).

Alle underordnede certifikatemner har et landefelt på `C = US`.

* **Let's Encrypt E7**
  * Emne: `O = Let's Encrypt, CN = E7`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295813), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295813)
  * Certifikat detaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132900), [der](/certs/2024/e7.der),[pem](/certs/2024/e7.pem),[txt](/certs/2024/e7.txt)
  * Certifikat detaljer (kryds underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132895), [der](/certs/2024/e7-cross.der),[pem](/certs/2024/e7-cross.pem),[txt](/certs/2024/e7-cross.txt)
  * CRL værtsnavn: `e7.c.lencr.org`
  * Certifikat kæder:
    * EE ← E7 ← ISRG Root X1 (Default)
    * EE ← E7 ← ISRG Root X2
* **Let's Encrypt E8**
  * Emne: `O = Let's Encrypt, CN = E8`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295809), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295809)
  * Certifikat detaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132890), [der](/certs/2024/e8.der),[pem](/certs/2024/e8.pem),[txt](/certs/2024/e8.txt)
  * Certifikat detaljer (kryds underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132901), [der](/certs/2024/e8-cross.der),[pem](/certs/2024/e8-cross.pem),[txt](/certs/2024/e8-cross.txt)
  * CRL værtsnavn: `e8.c.lencr.org`
  * Certifikat kæder:
    * EE ← E8 ← ISRG Root X1 (Default)
    * EE ← E8 ← ISRG Root X2
* **Let's Encrypt R12**
  * Emne: `O = Let's Encrypt, CN = R12`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295816), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295816)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132898), [der](/certs/2024/r12.der),[pem](/certs/2024/r12.pem),[txt](/certs/2024/r12.txt)
  * CRL værtsnavn: `r12.c.lencr.org`
  * Certifikat kæder:
    * EE ← R12 ← ISRG Root X1 (Default)
* **Let's Encrypt R13**
  * Emne: `O = Let's Encrypt, CN = R13`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295817), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295817)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132902), [der](/certs/2024/r13.der),[pem](/certs/2024/r13.pem),[txt](/certs/2024/r13.txt)
  * CRL værtsnavn: `r13.c.lencr.org`
  * Certifikat kæder:
    * EE ← R13 ← ISRG Root X1 (Default)
* **Let's Encrypt YE1**
  * Emne: `O = Let's Encrypt, CN = YE1`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=432952),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=432952)
  * Certifikat detaljer: [der](/certs/gen-y/int-ye1.der), [pem](/certs/gen-y/int-ye1.pem), [txt](/certs/gen-y/int-ye1.txt)
  * CRL værtsnavn: `ye1.c.lencr.org`
  * Certifikat kæder:
    * EE ← YE1 ← Rod YE ← ISRG Rod X2 ← ISRG Rod X1 (Default)
    * EE ← YE1 ← Root YE ← ISRG Root X2
    * EE ← YE1 ← Root YE
* **Let's Encrypt YE2**
  * Emne: `O = Let's Encrypt, CN = YE2`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=431054),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=431054)
  * Certifikat detaljer: [der](/certs/gen-y/int-ye2.der), [pem](/certs/gen-y/int-ye2.pem), [txt](/certs/gen-y/int-ye2.txt)
  * CRL værtsnavn: `ye2.c.lencr.org`
  * Certifikat kæder:
    * EE ← YE2 ← Rod YE ← ISRG Rod X2 ← ISRG Rod X1 (Default)
    * EE ← YE2 ← Root YE ← ISRG Root X2
    * EE ← YE2 ← Root YE
* **Let's Encrypt YR1**
  * Emne: `O = Let's Encrypt, CN = YR1`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=432476),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=432476)
  * Certifikat detaljer: [der](/certs/gen-y/int-yr1.der), [pem](/certs/gen-y/int-yr1.pem), [txt](/certs/gen-y/int-yr1.txt)
  * CRL værtsnavn: `yr1.c.lencr.org`
  * Certifikat kæder:
    * EE ← YR1 ← Root YR ← ISRG Root X1 (Default)
    * EE ← YR1 ← Root YR
* **Let's Encrypt YR2**
  * Emne: `O = Let's Encrypt, CN = YR2`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=432477),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=432477)
  * Certifikat detaljer: [der](/certs/gen-y/int-yr2.der), [pem](/certs/gen-y/int-yr2.pem), [txt](/certs/gen-y/int-yr2.txt)
  * CRL værtsnavn: `yr2.c.lencr.org`
  * Certifikat kæder:
    * EE ← YR2 ← Root YR ← ISRG Root X1 (Default)
    * EE ← YR2 ← Root YR

Klik nedenfor for oplysninger om yderligere under ordnede Ca'er, som ikke er en del af det aktive udstedelseshierarki:

<details>
<summary>Backup</summary>

Disse underliggende CA'er har gyldige certifikater, men anvendes ikke til udstedelse. Vi kan til enhver tid begynde at udstede abonnentcertifikater fra dem uden varsel.

* **Let's Encrypt E9**
  * Emne: `O = Let's Encrypt, CN = E9`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295812), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295812)
  * Certifikat detaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9.der),[pem](/certs/2024/e9.pem),[txt](/certs/2024/e9.txt)
  * Certifikat detaljer (kryds underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9-cross.der),[pem](/certs/2024/e9-cross.pem),[txt](/certs/2024/e9-cross.txt)
  * CRL værtsnavn: `e9.c.lencr.org`
* **Let's Encrypt R14**
  * Emne: `O = Let's Encrypt, CN = R14`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295818), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295818)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132903), [der](/certs/2024/r14.der),[pem](/certs/2024/r14.pem),[txt](/certs/2024/r14.txt)
  * CRL værtsnavn: `r14.c.lencr.org`
* **Let's Encrypt YE3**
  * Emne: `O = Let's Encrypt, CN = YE3`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=432914),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=432914)
  * Certifikat detaljer: [der](/certs/gen-y/int-ye3.der), [pem](/certs/gen-y/int-ye3.pem), [txt](/certs/gen-y/int-ye3.txt)
  * CRL værtsnavn: `ye3.c.lencr.org`
* **Let's Encrypt YR3**
  * Emne: `O = Let's Encrypt, CN = YR3`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2028-09-02
  * CA detaljer: [crt.sh](https://crt.sh/?caid=432480),[udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=432480)
  * Certifikat detaljer: [der](/certs/gen-y/int-yr3.der), [pem](/certs/gen-y/int-yr3.pem), [txt](/certs/gen-y/int-yr3.txt)
  * CRL værtsnavn: `yr3.c.lencr.org`

</details>

<details>
<summary>Trukket tilbage</summary>

Disse underordnede CA'er bruges ikke længere til at udstede Abonnentcertifikater. De, der stadig har gyldige certifikater, kan producere CRL'er.

* **Let's Encrypt E1**
  * Emne: `O = Let's Encrypt, CN = E1`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2025-09-15 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183283), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183283)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem),[txt](/certs/lets-encrypt-e1.txt)
  * CRL værtsnavn: `e1.c.lencr.org`
* **Let's Encrypt E2**
  * Emne: `O = Let's Encrypt, CN = E2`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2025-09-15 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183284), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183284)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem),[txt](/certs/lets-encrypt-e2.txt)
  * CRL værtsnavn: `e2.c.lencr.org`
* **Let's Encrypt E5**
  * Emne: `O = Let's Encrypt, CN = E5`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295810), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295810)
  * Certifikat detaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132891), [der](/certs/2024/e5.der),[pem](/certs/2024/e5.pem),[txt](/certs/2024/e5.txt)
  * Certifikat detaljer (kryds underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132892), [der](/certs/2024/e5-cross.der),[pem](/certs/2024/e5-cross.pem),[txt](/certs/2024/e5-cross.txt)
  * CRL værtsnavn: `e5.c.lencr.org`
* **Let's Encrypt E6**
  * Emne: `O = Let's Encrypt, CN = E6`
  * Nøgletype: `ECDSA P-384`
  * Gyldig indtil: 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295819), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295819)
  * Certifikat detaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132905), [der](/certs/2024/e6.der),[pem](/certs/2024/e6.pem),[txt](/certs/2024/e6.txt)
  * Certifikat detaljer (kryds underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132904), [der](/certs/2024/e6-cross.der),[pem](/certs/2024/e6-cross.pem),[txt](/certs/2024/e6-cross.txt)
  * CRL værtsnavn: `e6.c.lencr.org`
* **Let's Encrypt R3**
  * Emne: `O = Let's Encrypt, CN = R3`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2025-09-15 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183267), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183267)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * CRL værtsnavn: `r3.c.lencr.org`
* **Let's Encrypt R4**
  * Emne: `O = Let's Encrypt, CN = R4`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2025-09-15 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183268), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183268)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * CRL værtsnavn: `r4.c.lencr.org`
* **Let's Encrypt R10**
  * Emne: `O = Let's Encrypt, CN = R10`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295814), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295814)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132896), [der](/certs/2024/r10.der),[pem](/certs/2024/r10.pem),[txt](/certs/2024/r10.txt)
  * CRL værtsnavn: `r10.c.lencr.org`
* **Let's Encrypt R11**
  * Emne: `O = Let's Encrypt, CN = R11`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295815), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295815)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132897), [der](/certs/2024/r11.der),[pem](/certs/2024/r11.pem),[txt](/certs/2024/r11.txt)
  * CRL værtsnavn: `r11.c.lencr.org`
* **Let's Encrypt Autoriteten X1**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X1`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2020-06-04 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=7395), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=7395)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X2**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X2`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2020-06-04 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=9745), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=9745)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X3**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X3`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2021-10-06 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=16418), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=16418)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X4**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X4`
  * Nøgletype: `RSA 2048`
  * Gyldig indtil: 2021-10-06 (udløbet)
  * CA detaljer: [crt.sh](https://crt.sh/?caid=16429), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=16429)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<p><!-- to get the right line spacing after a block element --></p>

# Certifikat kæder

Når en ACME-klient henter et nyligt udstedt certifikat fra Let's Encrypt ACME-API, at certifikatet kommer som en del af en "certifikat kæde", der også omfatter en eller flere underordnede CA'er. Som regel består denne kæde af kun den endelige enhed certifikat og et underordnet, men den kan indeholde yderligere mellemled. Tanken er, at ved at præsentere hele denne kæde af certifikater til en hjemmeside besøgende browser, browseren vil være i stand til at validere signaturerne hele vejen op til en rod, browseren stoler på uden at skulle downloade yderligere underordnede certifikater.

Nogle gange er der mere end en gyldig kæde for et givet certifikat: for eksempel, hvis et underordnet certifikat er blevet krydssigneret, så enten et af disse to certifikater kunne være den anden post, "kæde op til" en af to forskellige rod-certifikater. I dette tilfælde kan forskellige webstedsoperatører ønsker at vælge forskellige kæder, afhængigt af de egenskaber, de bekymrer sig mest om.

Hver af de aktive mellemled ovenfor dokumenter, som kæden tilbydes som standard, og som (hvis nogen) eventuelle yderligere kæder kan kræves af ACME-klienter. Generelt har kæder, der slutter på ISRG Root X1 den største størrelse, men også den største kompatibilitet med ældre klienter. Kæder, der slutter ved ISRG Root X2 (tilbydes kun til ECDSA-certifikater), er mindre, men vil kun arbejde med klienter, der har modtaget en opdatering til deres truststore efter 2022 eller deromkring. Kæder, der slutter ved Root YE eller Root YR forventes ikke at virke med nogen af de store trust stores, da disse rødder endnu ikke er medtaget endnu.

Abonnenter, der ønsker at prioritere størrelse frem for kompatibilitet, kan henvise til deres ACME-klients dokumentation for instruktioner om, hvordan du beder om alternativ kæde (f. eks. [certbot's `--preferred-chain` flag](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
