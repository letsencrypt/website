---
title: Förtroendekedja
linkTitle: Förtroendekedja (rot- och mellancertifikat)
slug: certificates
top_graphic: 5
lastmod: 2019-10-18
---

{{< lastmod >}}

# Rotcertifikat

Våra rotcertifikat sparas under säkra former offline. Vi utfärdar
servercertifikat (lövcertifikat) till våra prenumeranter från våra
mellancertifikat i nästa sektion.

* Aktiva
  * [ISRG Root X1 (självsignerat)](/certs/isrgrootx1.pem.txt)

Vi har skapat webbsidor för att testa certifikatkedjning till våra
rotcertifikat.

* Giltigt ISRG Root X1-signerat certifikat
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* Återkallat ISRG Root X1-signerat certifikat
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* Utgånget ISRG Root X1-signerat certifikat
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Mellancertifikat

IdenTrust har korssignerat våra mellancertifikat. Detta gör att våra
servercertifikat accepteras av alla stora webbläsare under tiden vi sprider vårt
eget rotcertifikat.

Under normala förhållanden kommer certifikat utfärdade av Let's Encrypt från
“Let’s Encrypt Authority X3”.  Det andra mellancertifikatet, “Let’s Encrypt
Authority X4”, är reserverat för nödlägen och kommer bara användas om vi
förlorar möjligheten att använda “Let’s Encrypt Authority X3”.
Mellancertifikaten X1 och X2 var vår första generation mellancertifikat. Vi har
ersatt dem med nya mellancertifikat som är mer kompatibla med Windows XP.

* Aktiva
  * [Let's Encrypt Authority X3 (korssignerat av IdenTrust)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (signerat av ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Reserver
  * [Let's Encrypt Authority X4 (korssignerat av IdenTrust)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (signerat av ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Pensionerade
  * [Let's Encrypt Authority X2 (korssignerat av IdenTrust)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (signerat av ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (korssignerat av IdenTrust)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (signerat av ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Korssignering

Vårt mellancertifikat “Let’s Encrypt Authority X3” representerar ett enda
assymetriskt nyckelpar. Den privata nyckeln i det nyckelparet genererar
signaturerna för alla servercertifikat (slutanvändarcertifikat eller
lövcertifikat), det vill säga certifikaten vi utfärdar för användning av din
webbserver.

Vårt mellancertifikat är signerat av ISRG Root X1 men eftersom vi är en väldigt
ny certifikatauktoritet så litar de flesta webbläsare inte på ISRG Root X1 än.
För att bli brett betrodd direkt så är vårt mellancertifikat också korssignerat
av en annan certifikatauktoritet, IdenTrust, vars rotcertifikat redan är betrott
i alla stora webbläsare. Mer specifikt så har IdenTrust korssignerat vårt
mellancertifikat med deras "DST Root CA X3" som nu kallas "TrustID X3 Root".
[Ladda ner "TrustID X3 Root" från
identrust.com](https://www.identrust.com/support/downloads) (eller ladda ner en
kopia här: [.pem](/certs/trustid-x3-root.pem.txt),
[.p7b](/certs/trustid-x3-root.p7b)).

Det betyder att det finns två certifikat tillgängliga som båda representerar
vårt mellancertifikat. Ett är signerat av DST Root CA X3 och det andra är
signerat av ISRG Root X1. Det enklaste sättet att skilja dessa åt är genom att
titta på deras Issuer-fält (utfärdare).

När en systemadministratör konfigurerar en webbserver så konfigureras inte bara
servercertifikatet utan också en lista av mellancertifikat för att hjälpa
webbläsare verifiera att servercertifikatet har en förtroendekedja som leder
till ett betrott rotcertifikat. Nästan alla systemadministratörer kommer välja
att servera mellancertifikatet med Subject satt till “Let’s Encrypt Authority
X3” och Issuer (utfärdare) till “DST Root CA X3”. Den rekommenderade Let's
Encrypt-mjukvaran [Certbot](https://certbot.org) utför denna konfiguration
sömlöst.

Följande bild förklarar visuellt förhållandena mellan våra certifikat:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# Certifikat för OCSP-signering

Detta certifikat används för att signera OCSP-svar av Let's Encrypts
mellancertifikat så vi inte behöver ta rotnyckeln online för att signera dessa
svar. En kopia av detta certifikat inkluderas automatiskt i OCSP-svaren så
prenumeranter behöver inte göra något med det. Det finns med här bara som
upplysning.

* [ISRG Root OCSP X1 (signerat av ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certifikattransparens

Vi ägnar oss åt öppenhet i vår verksamhet och i certifikaten vi utfärdar. Vi
skickar in alla certifikat till
[certifikattransparensloggar](https://www.certificate-transparency.org/) i takt
med att vi utfärdar dem. Du kan se alla utfärdade Let's Encrypt-certifikat via
dessa länkar:

* [Utfärdade av Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Utfärdade av Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Mer info

De privata nycklarna för ISRG:s rotcertifikatauktoritet (rot-CA) och Let's
Encrypts mellan-CA:er är lagrade på hårdvarusäkerhetsenheter (HSM:er) vilket
utgör en hög grad av skydd mot nyckelstöld.

Alla ISRG-nycklar är för närvarande RSA-nycklar. Vi [planerar att generera
ECDSA-nycklar]({{< relref "/upcoming-features.md" >}}).
