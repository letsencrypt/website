---
title: Chains of Trust
linkTitle: Tillidskæder (Root og Intermediate Certifikater)
slug: certificates
lastmod: 2024-05-07
show_lastmod: 1
---

<div style="text-align: center">

_**Bemærk:** Dette afsnit beskriver Let's Encrypt hierarkiet fra 6. juni 2024. For hierarkiet som anvendtes før 6. juni [se nedenfor](#old-content)._

</div>

Denne side beskriver alle de nuværende og relevante historiske certificeringsmyndigheder, som drives af Let's Encrypt. Bemærk, at en Certifikatmyndighed - CA - mest korrekt opfattes som en nøgle og et navn: enhver given CA kan være repræsenteret af _flere_ certifikater, som alle indeholder den samme Emne og Offentlige nøgle Information. I sådanne tilfælde har vi givet nærmere oplysninger om alle de certifikater, der repræsenterer CA'en.

[![ISRG Certifikate Hierarki Diagram, fra juni 2024](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Root CAs

Vores root certifikater holdes sikkert offline. Vi udsteder end-entity certifikater til abonnenter fra intermediate certifikater som beskrevet i næste afsnit. Alle root-certifikat Emner har et landefelt på `C = US`.

Bemærk, at Root CAs ikke har udløbsdatoer på helt samme måde som andre certifikater. Selv om deres selvsignerede certifikater indeholder en `notAfter` dato, Root Programs and Trust Stores kan vælge at have tillid til en Root CA efter denne dato, eller afslutte tilliden inden denne dato. Som sådan er de end-of-validity datoer angivet nedenfor omtrentlige, baseret på aktuelle Root Program politikker.

* **ISRG Root X1**
  * Emne: `O = Research Group, Internet Security Group, CN = ISRG Root X1`
  * Nøgletype: `RSA 4096`
  * Gyldighed: indtil 2030-06-04 (genereret 2015-06-04)
  * CA-oplysninger: [crt.sh](https://crt.sh/?caid=7394), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=7394)
  * Certifikatoplysninger (selvsigneret): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Certifikatdetaljer (krydssigneret af DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (pensioneret)
  * Test websteder: [gyldigt](https://valid-isrgrootx1.letsencrypt.org/), [tilbagekaldt](https://revoked-isrgrootx1.letsencrypt.org/), [udløbet](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * Emne: `O = Research Group, Internet Security Group, CN = ISRG Root X2`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2035-09-04 (genereret 2020-09-04)
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=183269), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183269)
  * Certifikatoplysninger (selvsigneret): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Certifikatoplysninger (krydsunderskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Test websteder: [gyldigt](https://valid-isrgrootx2.letsencrypt.org/), [tilbagekaldt](https://revoked-isrgrootx2.letsencrypt.org/), [udløbet](https://expired-isrgrootx2.letsencrypt.org/)

Se [Certificate Compatibility](/docs/cert-compat) for yderligere information om kompatibiliteten af vores rodcertifikater med forskellige enheder og trust stores.

# Underordnede (CA'er)

Vi vedligeholder i øjeblikket fire mellemled i aktiv rotation. Abonnementscertifikater med en offentlig ECDSA-nøgle vil blive udstedt fra en af ECDSA-underordnet CA. Tilsvarende udstedes Abonnementscertifikater med en offentlig RSA-nøgle fra en af RSA-underordnet CA.

Alle underordnede certifikatemner har et landefelt på `C = US`.

* **Let's Encrypt E5**
  * Emne: `O = Let's Encrypt, CN = E5`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295810), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295810)
  * Certifikatdetaljer (krydsunderskrevet af ISRG Root X2): [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem),[txt](/certs/2024/e5.txt)
  * Certifikatdetaljer (krydsunderskrevet af ISRG Root X1): [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * Emne: `O = Let's Encrypt, CN = E6`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2027-03-12
  * CA-detaljer: [crt.sh](https://crt.sh/?caid=295819), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295819)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Certifikatdetaljer (Krydsunderskrevet af ISRG Root X1): [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * Emne: `O = Let's Encrypt, CN = R10`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295814), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295814)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * Emne: `O = Let's Encrypt, CN = R11`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295815), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295815)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)

Klik nedenfor for oplysninger om yderligere under ordnede Ca'er, som ikke er en del af det aktive udstedelseshierarki:

<details>
<summary>Backup</summary>

Disse underliggende CA'er har gyldige certifikater, men anvendes ikke til udstedelse. Vi kan til enhver tid begynde at udstede abonnentcertifikater fra dem uden varsel.

* **Let's Encrypt E7**
  * Emne: `O = Let's Encrypt, CN = E7`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295813), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295813)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * Emne: `O = Let's Encrypt, CN = E8`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295809), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295809)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * Emne: `O = Let's Encrypt, CN = E9`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295812), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295812)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * Emne: `O = Let's Encrypt, CN = R12`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295816), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295816)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * Emne: `O = Let's Encrypt, CN = R13`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295817), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295817)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * Emne: `O = Let's Encrypt, CN = R14`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2027-03-12
  * CA detaljer: [crt.sh](https://crt.sh/?caid=295818), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=295818)
  * Certifikatdetaljer (underskrevet af ISRG Root X1): [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)

</details>

<details>
<summary>Trukket tilbage</summary>

Disse underordnede CA'er bruges ikke længere til at udstede Abonnentcertifikater. De, der stadig har gyldige certifikater, kan producere OCSP-svar og/eller CRL'er.

* **Let's Encrypt E1**
  * Emne: `O = Let's Encrypt, CN = E1`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2025-09-15
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183283), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183283)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem),[txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * Emne: `O = Let's Encrypt, CN = E2`
  * Nøgletype: `ECDSA P-384`
  * Gyldighed: indtil 2025-09-15
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183284), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183284)
  * Certifikatdetaljer (underskrevet af ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem),[txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * Emne: `O = Let's Encrypt, CN = R3`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2025-09-15
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183267), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183267)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * Emne: `O = Let's Encrypt, CN = R4`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2025-09-15
  * CA detaljer: [crt.sh](https://crt.sh/?caid=183268), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=183268)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X1**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X1`
  * Nøgletype: `RSA 2048`
  * Gyldighed: udløbet 2020-06-04
  * CA detaljer: [crt.sh](https://crt.sh/?caid=7395), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=7395)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X2**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X2`
  * Nøgletype: `RSA 2048`
  * Gyldighed: udløbet 2020-06-04
  * CA detaljer: [crt.sh](https://crt.sh/?caid=9745), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=9745)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X3**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X3`
  * Nøgletype: `RSA 2048`
  * Gyldighed: udløbet 2021-10-06
  * CA detaljer: [crt.sh](https://crt.sh/?caid=16418), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=16418)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt Autoriteten X4**
  * Om: `O = Let's Encrypt, CN = Let's Encrypt Autoriteten X4`
  * Nøgletype: `RSA 2048`
  * Gyldighed: udløbet 2021-10-06
  * CA detaljer: [crt.sh](https://crt.sh/?caid=16429), [udstedte certifikater](https://crt.sh/?Identity=%25&iCAID=16429)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Certifikat detaljer (krydsunderskrevet af IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>Delegerede OCSP-svar</summary>

Dette nøglepar blev tidligere brugt til at signere OCSP-svar vedrørende status for Let's Encrypts underordende certifikater på vegne af Let's Encrypt roden, så roden kan forblive sikker offline. Vi udsteder ikke længere OCSP-svar for vores underordnede certifikater; vi udsteder i stedet regelmæssigt CRL'er fra vores rod for at formidle tilbagekaldelsesstatus for vores underordnede certifikater.

* **ISRG Root OCSP X1**
  * Emne: `O = Internet Security Research Group, CN = ISRG Root OCSP X1`
  * Nøgletype: `RSA 2048`
  * Gyldighed: indtil 2025-06-10
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=2929281974), [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)
  * Certifikat detaljer (underskrevet af ISRG Root X1): [crt.sh](https://crt.sh/?id=142051103) (udløbet)

</details>
<p><!-- to get the right line spacing after a block element --></p>

# Certifikat kæder

Når en ACME-klient henter et nyligt udstedt certifikat fra Let's Encrypt ACME-API, at certifikatet kommer som en del af en "certifikat kæde", der også omfatter en eller flere underordnede CA'er. Som regel består denne kæde af kun den endelige enhed certifikat og et underordnet, men den kan indeholde yderligere mellemled. Tanken er, at ved at præsentere hele denne kæde af certifikater til en hjemmeside besøgende browser, browseren vil være i stand til at validere signaturerne hele vejen op til en rod, browseren stoler på uden at skulle downloade yderligere underordnede certifikater.

Nogle gange er der mere end en gyldig kæde for et givet certifikat: for eksempel, hvis et underordnet certifikat er blevet krydssigneret, så enten et af disse to certifikater kunne være den anden post, "kæde op til" en af to forskellige rod-certifikater. I dette tilfælde kan forskellige webstedsoperatører ønsker at vælge forskellige kæder, afhængigt af de egenskaber, de bekymrer sig mest om.

Abonnentcertifikater med offentlige RSA-nøgler udstedes fra vores RSA-underordnede CA, som kun er udstedt fra vores RSA-rod ISRG Root X1 (i. De er ikke krydsunderskrevet). Derfor har alle RSA-abonnentcertifikater kun en enkelt kæde til rådighed:

<div style="text-align: center">
RSA Abonnementcert ← RSA underordnet (R10 eller R11) ← ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

Abonnentcertifikater med offentlige ECDSA-nøgler udstedes fra vores ECDSA-underordnede CA, som udstedes begge (i.. krydssigneres) fra vores RSA-rod ISRG Root X1 og vores ECDSA-rod ISRG Root X2. Derfor tilbyder vi to kæder til disse certifikater:

<div style="text-align: center">
ECDSA Abonnementcert ← ECDSA Underordnet (E5 eller E6) ← ISRG Root X1

ECDSA Abonnementcert ← ECDSA Underordnet (E5 eller E6) ← ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

Den første kæde, op til ISRG Root X1, giver den største kompatibilitet, fordi dette rodcertifikat er inkluderet i de fleste certifikat samlinger. Den anden kæde, op til ISRG Root X2, bruger færre bytes af netværkets båndbredde i hver TLS-håndtryk. Vi leverer den første kæde som standard, for at sikre den bredeste kompatibilitet. Abonnenter, der ønsker at prioritere størrelse frem for kompatibilitet, kan henvise til deres ACME-klients dokumentation for instruktioner om, hvordan du beder om alternativ kæde (f. eks. [certbot's `--preferred-chain` flag](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).

------

<br><br><br>

------

<div style="text-align: center" id="old-content">

_**Bemærk:** Dette afsnit beskriver Let's Encrypt hierarkiet, som det historisk har været, før ændringerne den 6. juni 2024._

</div>

[![ISRG Certifikate Hierarki Diagram, fra December 2020](/images/isrg-hierarchy-2020.png)](/images/isrg-hierarchy-2020.png)

# Root-certifikater

Vores root certifikater holdes sikkert offline. Vi udsteder end-entity certifikater til abonnenter fra intermediate certifikater som beskrevet i næste afsnit. For at sikre yderligere kompatibilitet når vi sender vores nye Root X2 til forskellige root certifikat samling, har vi også krydsunderskrevet det fra Root X1.

* Aktive
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Selvsigneret](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Krydssigneret af DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Aktive, begrænset tilgængelighed
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Selvsigneret](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Krydssigneret af ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Vi har oprettet hjemmesider til at teste certifikater, der med tillidskæder til vores aktive Root certifikat.

* ISRG Root X1
  * [Gyldigt](https://valid-isrgrootx1.letsencrypt.org/)
  * [Tilbagekaldt](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Udløbet](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Gyldigt](https://valid-isrgrootx2.letsencrypt.org/)
  * [Tilbagekaldt](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Udløbet](https://expired-isrgrootx2.letsencrypt.org/)

# Intermediate Certifikater

Under normale omstændigheder vil certifikater udstedt af Let's Encrypt komme fra "R3", et RSA-mellemled. I øjeblikket er udstedelse fra "E1", en ECDSA-intermediate, kun muligt for ECDSA-abonnentnøgler for [tilladte konti](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). I fremtiden vil udstedelsen fra "E1" være tilgængelig for alle.

Vores øvrige intermediate ("R4" og "E2") er reserveret til katastrofegenopretning og vil kun blive brugt hvis vi mister evnen til at udstede med vores primære intermediate. Vi anvender ikke X1, X2, X3 og X4 intermediates længere.

IdenTrust har krydssigneret vores RSA-mellemprodukter for at sikre yderligere kompatibilitet.

* Aktive
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Signeret af ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [Pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (trukket tilbage)
* Aktive, begrænset tilgængelighed
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Krydssigneret af ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Backup
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Krydssigneret af ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (trukket tilbage)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Krydssigneret af ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Afventende
  * Let's Encrypt E5 (`ECDSA P-384, O = Let's Encrypt, CN = E5`)
    * Underskrevet af ISRG Root X2: [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
    * Krydsunderskrevet af ISRG Root X1: [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
  * Let's Encrypt E6 (`ECDSA P-384, O = Let's Encrypt, CN = E6`)
    * Underskrevet af ISRG Root X2: [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
    * Krydsunderskrevet af ISRG Root X1: [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
  * Let's Encrypt E7 (`ECDSA P-384, O = Let's Encrypt, CN = E7`)
    * Underskrevet af ISRG Root X2: [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
    * Krydsunderskrevet af ISRG Root X1: [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
  * Let's Encrypt E8 (`ECDSA P-384, O = Let's Encrypt, CN = E8`)
    * Underskrevet af ISRG Root X2: [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
    * Krydsunderskrevet af ISRG Root X1: [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
  * Let's Encrypt E9 (`ECDSA P-384, O = Let's Encrypt, CN = E9`)
    * Underskrevet af ISRG Root X2: [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
    * Krydsunderskrevet af ISRG Root X1: [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
  * Let's Encrypt R10 (`RSA 2048, O = Let's Encrypt, CN = R10`)
    * Underskrevet af ISRG Root X1: [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
  * Let's Encrypt R11 (`RSA 2048, O = Let's Encrypt, CN = R11`)
    * Underskrevet af ISRG Root X1: [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)
  * Let's Encrypt R12 (`RSA 2048, O = Let's Encrypt, CN = R12`)
    * Underskrevet af ISRG Root X1: [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
  * Let's Encrypt R13 (`RSA 2048, O = Let's Encrypt, CN = R13`)
    * Underskrevet af ISRG Root X1: [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
  * Let's Encrypt R14 (`RSA 2048, O = Let's Encrypt, CN = R14`)
    * Underskrevet af ISRG Root X1: [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)
* Trukket tilbage
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Krydssigneret af ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Signeret af ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [Pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Krydssigneret af ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Krydssigneret af ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Krydssigneret af IdenTrust ](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Krydssignering

## Intermediate

Hver af vores intermediate certifikater repræsenterer et enkelt offentligt/privat nøglepar. Den private nøgle fra dette par par genererer signaturen for alle slutenhed certifikater (også kendt som leaf certifikater), som for eksempel de certifikater, vi udsteder til brug på din server.

Vores RSA-intermediate certifikater er signeret af ISRG Root X1. ISRG Root X1 er bredt betroet på dette punkt, men vores RSA-intermediate certifikat er stadig krydssigneret af IdenTrust's "[DST Root CA X3](https://crt.sh/?id=8395)" (nu kaldet "TrustID X3 Root") for yderligere klientkompatibilitet. IdenTrust Root certifikatet har eksisteret længere og har derfor bedre kompatibilitet med ældre enheder og operativsystemer (f.eks. Windows XP, Android 7). Du kan [downloade "TrustID X3 Root" fra IdenTrust](https://www.identrust.com/support/downloads) (eller alternativt du kan [downloade en kopi fra os](/certs/trustid-x3-root.pem.txt)).

At have krydssignaturer betyder, at hver af vores RSA-intermediate certifikater har to certifikater, der repræsenterer samme signeringsnøgle. Den ene er signeret af DST Root CA X3 og den anden er signeret af ISRG Root X1. Den nemmeste måde at skelne de to er ved at se på deres Udsteder felt.

Når du konfigurerer en webserver, konfigurerer server administratoren ikke kun end-entity certifikatet men også en liste over intermediate certifikater for at hjælpe browsere med at verificere at slutenheds-certifikatet har en tillidskæde, der fører til et betroet rod certifikat. Næsten alle server administratorer vil vælge at servere en kæde, herunder mellemcertifikatet med Emne "R3" og Udsteder "ISRG Root X1". Det anbefalede Let's Encrypt klientsoftware, [Certbot](https://certbot.org), vil gøre denne konfiguration problemfrit.

## Rødder
I lighed med intermediate certifikater kan rodcertifikaterne krydssigneres, ofte for at øge klientens kompatibilitet. Vores ECDSA-rod, ISRG Root X2 blev genereret i efteråret 2020 og er rod certifikatet til ECDSA-hierarkiet. Det er repræsenteret ved to certifikater: en, der er selvsigneret og en, der er underskrevet af ISRG Root X1.

Alle certifikater signeret af ECDSA intermediate "E1" vil komme med en kæde med et intermediate certifikat, hvis emne er "ISRG Root X2", og hvis udsteder er "ISRG Root X1". Næsten alle server administratorer vil vælge at tjene denne kæde, da det tilbyder den mest komprimerbare indtil ISRG Root X2 er bredt betroet.

# OCSP- Signeringscertifikat

Dette certifikat bruges til at signere OCSP-svar for Let's Encrypt sinatur intermediate certifikater så vi ikke behøver at bringe rodnøglen online for at signere disse svar. En kopi af dette certifikat er inkluderet automatisk i disse OCSP-svar, så Abonnenter behøver ikke at gøre noget med det. Det er kun inkluderet her til orienterende formål.

* ISRG Root OCSP X1 ([Signeret af ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Vores nyere underordnede certifikater har ikke OCSP-URL'er (deres tilbagekaldelsesoplysninger er anvendes i stedet via CRL), så vi har ikke udstedt et OCSP-signeringscertifikat fra ISRG Root X2.

# Certifikatets Gennemsigtighed

Vi er dedikeret til gennemsigtighed i vores driftsanliggender og i de certifikater, vi udsteder. Vi sender alle certifikater til [Certifikat Gennemsigtighed Logen](https://www.certificate-transparency.org/) når vi udsteder dem. Du kan se alle udstedte Let's Encrypt certifikater via disse links:

* [Udstedt af Let's Encrypt Autoriteten X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Udstedt af Let's Encrypt Autoriteten X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Udstedt af E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Udstedt af R3](https://crt.sh/?Identity=%25&iCAID=183267)
