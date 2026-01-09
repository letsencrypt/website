---
title: Řetězce důvěryhodnosti
linkTitle: Řetězce důvěryhodnosti (Kořenové a zprostředkující certifikáty)
slug: certificates
lastmod: 2026-01-08
show_lastmod: 1
---

Tato stránka popisuje všechny aktuální a relevantní historické certifikační autority, které provozuje Let's Encrypt. Upozorňujeme, že CA lze nejlépe chápat jako klíč a jméno: každá CA může být reprezentována _více_ certifikáty, které všechny obsahují stejný Subjekt a Informaci o veřejném klíči. V takových případech jsme poskytli podrobnosti o všech certifikátech, které zastupují CA. Pokud hledáte identifikátory Trust Anchor spojené s těmito certifikačními autoritami, podívejte se na naši stránku [Identifikátory objektů](/docs/oids).

[![Schéma hierarchie certifikátů ISRG, stav k lednu 2026](/images/isrg-hierarchy.png)](/images/isrg-hierarchy-full.png)

# Kořenové CA

Naše kořenové klíčové materiuály jsou uloženy bezpečně offline. Vydáváme certifikáty koncových entit předplatitelům ze zprostředkovatelů popsaných v následující části. Všechny Subjekty kořenového certifikátu mají jako zemi nastavenou `C = US`.

Upozorňujeme, že kořenové CA nemají datum platnosti ve stejném smyslu jako ostatní certifikáty. Ačkoli jejich vlastní podepsané certifikáty obsahují datum `notAfter`, kořenové programy a úložiště důvěryhodných certifikátů (Trust Stores) se mohou rozhodnout důvěřovat kořenové CA i po tomto datu nebo ukončit důvěru v ni před tímto datem. Proto jsou níže uvedené termíny ukončení platnosti přibližné a vycházejí z aktuálních zásad Kořenových programů.

* **ISRG Root X1**
  * Předmět: `O = Internet Security Research Group, CN = ISRG Root X1`
  * Typ klíče: ` RSA 4096`
  * Důvěryhodné do: 2030-06-04 (vygenerováno 2015-06-04)
  * Podrobnosti CA: [ crt.sh](https://crt.sh/?caid=7394), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=7394)
  * Podrobnosti certifikátu (podepsaný sám sebou): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Podrobnosti certifikátu (křížově podepsaný DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (ukončeno)
  * CRL hostname: `x1.c.lencr.org`
  * Testovací webstránky: [platný](https://valid-isrgrootx1.letsencrypt.org/), [odvolaný](https://revoked-isrgrootx1.letsencrypt.org/), [expirovaný](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * Předmět: `O = Internet Security Research Group, CN = ISRG Root X2`
  * Typ klíče: `ECDSA P-384`
  * Důvěryhodné do: 2035-09-04 (vygenerováno 2020-09-04)
  * Podrobnosti CA: [ crt.sh](https://crt.sh/?caid=183269), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=183269)
  * Podrobnosti certifikátu (podepsaný sám sebou): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=20878422868), [der](/certs/gen-y/root-x2-by-x1.der), [pem](/certs/gen-y/root-x2-by-x1.pem), [txt](/certs/gen-y/root-x2-by-x1.txt)
  * CRL hostname: `x2.c.lencr.org`
  * Testovací webstránky: [platný](https://valid-isrgrootx2.letsencrypt.org/), [odvolaný](https://revoked-isrgrootx2.letsencrypt.org/), [expirovaný](https://expired-isrgrootx2.letsencrypt.org/)

Tyto kořeny zatím nejsou zahrnuty v úložištích důvěryhodných kořenových programů (Trust Stores), ale brzy budou předloženy k zařazení:

* **ISRG Root YE**
  * Předmět: `O = ISRG, CN = Root YE`
  * Typ klíče: `ECDSA P-384`
  * Důvěryhodné do: N/A (vygenerováno 2025-09-03)
  * Podrobnosti CA: [ crt.sh](https://crt.sh/?caid=430535), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=430535)
  * Podrobnosti certifikátu (podepsaný sám sebou): [der](/certs/gen-y/root-ye.der), [pem](/certs/gen-y/root-ye.pem), [txt](/certs/gen-y/root-ye.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X2): [der](/certs/gen-y/root-ye-by-x2.der), [pem](/certs/gen-y/root-ye-by-x2.pem), [txt](/certs/gen-y/root-ye-by-x2.txt)
  * CRL hostname: `ye.c.lencr.org`
  * Testovací webstránky: Připravuje se
* **ISRG Root YR**
  * Předmět: `O = ISRG, CN = Root YR`
  * Typ klíče: ` RSA 4096`
  * Důvěryhodné do: N/A (vygenerováno 2025-09-03)
  * Podrobnosti CA: [ crt.sh](https://crt.sh/?caid=430543), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=430543)
  * Podrobnosti certifikátu (podepsaný sám sebou): [der](/certs/gen-y/root-yr.der), [pem](/certs/gen-y/root-yr.pem), [txt](/certs/gen-y/root-yr.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [der](/certs/gen-y/root-yr-by-x1.der), [pem](/certs/gen-y/root-yr-by-x1.pem), [txt](/certs/gen-y/root-yr-by-x1.txt)
  * CRL hostname: `yr.c.lencr.org`
  * Testovací webstránky: Připravuje se

Další informace o kompatibilitě našich kořenových certifikátů s různými zařízeními a úložišti důvěryhodných certifikátů naleznete v části [Kompatibilita certifikátů](/docs/cert-compat).

# Podřízené (zprostředkující) certifikační autority

V současné době udržujeme osm zprostředkujících certifikátů, které aktivně rotují. Certifikáty odběratelů obsahující veřejný klíč ECDSA budou vydávány jedním ze zprostředkovatelů ECDSA; podobně certifikáty odběratelů obsahující veřejný klíč RSA budou vydávány jedním ze zprostředkovatelů RSA. Certifikáty odběratelů vydané v rámci „classic“ a „tlsclient“ [profilů](/docs/profiles) budou vydávány od jednoho z prvních čtyř uvedených zprostředkovatelů (E7 až R13); naopak certifikáty předplatitelů vydané v rámci profilů „tlsserver“ a „shortlived“ budou vydávány od jednoho ze čtyř posledních zprostředkovatelů (YE1 až YR2).

Všechny Subjekty zprostředujících certifikátů mají jako Zemi nastavenou `C = US`.

* **Let's Encrypt E7**
  * Předmět: `O = Let's Encrypt, CN = E7`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295813), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295813)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132900), [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132895), [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
  * CRL hostname: `e7.c.lencr.org`
  * Řetězce:
    * EE ← E7 ← ISRG Root X1 (Defaultní)
    * EE ← E7 ← ISRG Root X2
* **Let's Encrypt E8**
  * Předmět: `O = Let's Encrypt, CN = E8`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295809), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295809)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132890), [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132901), [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
  * CRL hostname: `e8.c.lencr.org`
  * Řetězce:
    * EE ← E8 ← ISRG Root X1 (Defaultní)
    * EE ← E8 ← ISRG Root X2
* **Let's Encrypt R12**
  * Předmět: `O = Let's Encrypt, CN = R12`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295816), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295816)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132898), [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
  * CRL hostname: `r12.c.lencr.org`
  * Řetězce:
    * EE ← R12 ← ISRG Root X1 (Defaultní)
* **Let's Encrypt R13**
  * Předmět: `O = Let's Encrypt, CN = R13`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295817), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295817)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132902), [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
  * CRL hostname: `r13.c.lencr.org`
  * Řetězce:
    * EE ← R13 ← ISRG Root X1 (Defaultní)
* **Let's Encrypt YE1**
  * Předmět: `O = Let's Encrypt, CN = YE1`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=432952), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=432952)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-ye1.der), [pem](/certs/gen-y/int-ye1.pem), [txt](/certs/gen-y/int-ye1.txt)
  * CRL hostname: `ye1.c.lencr.org`
  * Řetězce:
    * EE ← YE1 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Defaultní)
    * EE ← YE1 ← Root YE ← ISRG Root X2
    * EE ← YE1 ← Root YE
* **Let's Encrypt YE2**
  * Předmět: `O = Let's Encrypt, CN = YE2`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=431054), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=431054)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-ye2.der), [pem](/certs/gen-y/int-ye2.pem), [txt](/certs/gen-y/int-ye2.txt)
  * CRL hostname: `ye2.c.lencr.org`
  * Řetězce:
    * EE ← YE2 ← Root YE ← ISRG Root X2 ← ISRG Root X1 (Defaultní)
    * EE ← YE2 ← Root YE ← ISRG Root X2
    * EE ← YE2 ← Root YE
* **Let's Encrypt YR1**
  * Předmět: `O = Let's Encrypt, CN = YR1`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=432476), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=432476)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-yr1.der), [pem](/certs/gen-y/int-yr1.pem), [txt](/certs/gen-y/int-yr1.txt)
  * CRL hostname: `yr1.c.lencr.org`
  * Řetězce:
    * EE ← YR1 ← Root YR ← ISRG Root X1 (Defaultní)
    * EE ← YR1 ← Root YR
* **Let's Encrypt YR2**
  * Předmět: `O = Let's Encrypt, CN = YR2`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=432477), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=432477)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-yr2.der), [pem](/certs/gen-y/int-yr2.pem), [txt](/certs/gen-y/int-yr2.txt)
  * CRL hostname: `yr2.c.lencr.org`
  * Řetězce:
    * EE ← YR2 ← Root YR ← ISRG Root X1 (Defaultní)
    * EE ← YR2 ← Root YR

Klikněte níže pro podrobnosti o dalších zprostředkovatelích, které nejsou součástí aktivní hierarchie vydávání:

<details>
<summary>Záloha</summary>

Tyto zprostředkující CA mají v současné době platné certifikáty, ale nejsou vydávány. Můžeme kdykoli bez varování začít vydávat certifikáty odběratelů.

* **Let's Encrypt E9**
  * Předmět: `O = Let's Encrypt, CN = E9`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295812), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295812)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132894), [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
  * CRL hostname: `e9.c.lencr.org`
* **Let's Encrypt R14**
  * Předmět: `O = Let's Encrypt, CN = R14`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295818), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295818)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132903), [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)
  * CRL hostname: `r14.c.lencr.org`
* **Let's Encrypt YE3**
  * Předmět: `O = Let's Encrypt, CN = YE3`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=432914), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=432914)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-ye3.der), [pem](/certs/gen-y/int-ye3.pem), [txt](/certs/gen-y/int-ye3.txt)
  * CRL hostname: `ye3.c.lencr.org`
* **Let's Encrypt YR3**
  * Předmět: `O = Let's Encrypt, CN = YR3`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2028-09-02
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=432480), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=432480)
  * Podrobnosti certifikátu: [der](/certs/gen-y/int-yr3.der), [pem](/certs/gen-y/int-yr3.pem), [txt](/certs/gen-y/int-yr3.txt)
  * CRL hostname: `yr3.c.lencr.org`

</details>

<details>
<summary>Ukončené</summary>

Tyto zprostředující certifikační autority již nejsou používány k vydávání certifikátů předplatitelů. Ty, které mají stále platné certifikáty, mohou vytvářet seznamy CRL.

* **Let's Encrypt E1**
  * Předmět: `O = Let's Encrypt, CN = E1`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2025-09-15 (expirovaný)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=183283), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=183283)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
  * CRL hostname: `e1.c.lencr.org`
* **Let's Encrypt E2**
  * Předmět: `O = Let's Encrypt, CN = E2`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2025-09-15 (expirovaný)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=183284), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=183284)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
  * CRL hostname: `e2.c.lencr.org`
* **Let's Encrypt E5**
  * Předmět: `O = Let's Encrypt, CN = E5`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295810), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295810)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132891), [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132892), [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
  * CRL hostname: `e5.c.lencr.org`
* **Let's Encrypt E6**
  * Předmět: `O = Let's Encrypt, CN = E6`
  * Typ klíče: `ECDSA P-384`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295819), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295819)
  * Podrobnosti certifikátu (podepsaný ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132905), [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Podrobnosti certifikátu (křížově podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132904), [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
  * CRL hostname: `e6.c.lencr.org`
* **Let's Encrypt R3**
  * Předmět: `O = Let's Encrypt, CN = R3`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2025-09-15 (expirovaný)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=183267), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=183267)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * CRL hostname: `r3.c.lencr.org`
* **Let's Encrypt R4**
  * Předmět: `O = Let's Encrypt, CN = R4`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2025-09-15 (expirovaný)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=183268), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=183268)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
  * CRL hostname: `r4.c.lencr.org`
* **Let's Encrypt R10**
  * Předmět: `O = Let's Encrypt, CN = R10`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295814), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295814)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132896), [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
  * CRL hostname: `r10.c.lencr.org`
* **Let's Encrypt R11**
  * Předmět: `O = Let's Encrypt, CN = R11`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2027-03-12
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=295815), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=295815)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132897), [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)
  * CRL hostname: `r11.c.lencr.org`
* **Let's Encrypt Authority X1**
  * Předmět: `O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2020-06-04 (vypršelo)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=7395), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=7395)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Předmět: `O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2020-06-04 (vypršelo)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=9745), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=9745)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Předmět: `O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2021-10-06 (vypršelo)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=16418), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=16418)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Předmět: `O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * Typ klíče: ` RSA 2048`
  * Platný do: 2021-10-06 (vypršelo)
  * Podrobnosti CA: [crt.sh](https://crt.sh/?caid=16429), [vydané certifikáty](https://crt.sh/?Identity=%25&iCAID=16429)
  * Podrobnosti certifikátu (podepsaný ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Podrobnosti certifikátu (křížově podepsaný IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<p><!-- to get the right line spacing after a block element --></p>

# Řetězce

Když klient ACME stáhne nově vydaný certifikát z ACME API Let's Encrypt, tento certifikát je součástí „řetězce“, který zahrnuje také jeden nebo více zprostředkovatelů. Obvykle se tento řetězec spočívá pouze z certifikátu koncové entity a jednoho zprostředkovatele, ale může obsahovat i další zprostředkovatele. Myšlenka spočívá v tom, že po předložení celého řetězce certifikátů prohlížeči návštěvníka webové stránky bude prohlížeč schopen ověřit podpisy až po kořenový certifikát, kterému prohlížeč důvěřuje, aniž by bylo nutné stahovat jakékoli další zprostředkovatele.

Někdy existuje více než jeden platný řetězec pro daný certifikát: například pokud byl zprostředkující certifikát křížově podepsán, pak by jeden z těchto dvou certifikátů mohl být druhým záznamem, „zřetězeným až k“ jednomu ze dvou různých kořenů. V tomto případě mohou různí provozovatelé webových stránek chtít vybrat různé řetězce v závislosti na vlastnostech, které jsou pro ně nejdůležitější.

Každý z výše uvedených aktivních zprostředkovatelů dokumentuje, který řetězec je nabízen jako výchozí a které další řetězce (pokud existují) mohou být požadovány klienty ACME. Obecně platí, že řetězce, které končí u ISRG Root X1, mají největší velikost, ale také největší kompatibilitu se staršími klienty. Řetězce, které končí u ISRG Root X2 (nabízené pouze pro certifikáty ECDSA), jsou menší, ale budou fungovat pouze s klienty, kteří obdrželi aktualizaci svého úložiště důvěryhodných certifikátů po roce 2022. Řetězce, které končí u Root YE nebo Root YR, pravděpodobně nebudou fungovat s žádným z hlavních úložišť důvěryhodných certifikátů, protože tyto kořenové certifikáty ještě nebyly začleněny.

Předplatitelé, kteří chtějí použít jeden z alternativních řetězců, mohou najít pokyny k žádosti o alternativní řetězec v dokumentaci svého klienta ACME (například [ `--preferred-chain` flag certbotu](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
