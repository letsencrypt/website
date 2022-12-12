---
title: Kæde af tillid
linkTitle: Kæde af tillid (Root og Intermediate Certifikater)
slug: certificates
top_graphic: 5
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

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

Vores nyere intermedia certifikater har ikke OCSP-URL'er (deres tilbagekaldelsesoplysninger er anvendes i stedet via CRL), så vi har ikke udstedt et OCSP-signeringscertifikat fra ISRG Root X2.

# Certificate Transparency

Vi er dedikeret til gennemsigtighed i vores driftsanliggender og i de certifikater, vi udsteder. Vi sender alle certifikater til [Certifikat Gennemsigtighed Logen](https://www.certificate-transparency.org/) når vi udsteder dem. Du kan se alle udstedte Let's Encrypt certifikater via disse links:

* [Udstedt af Let's Encrypt Autoriteten X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Udstedt af Let's Encrypt Autoriteten X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Udstedt af E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Udstedt af R3](https://crt.sh/?Identity=%25&iCAID=183267)
