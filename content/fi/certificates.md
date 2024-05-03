---
title: Luottamuksen ketju
linkTitle: Luottamusketju (juuri- ja välivarmenteet)
slug: certificates
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Juuri-varmenteet

Meidän juuret pidetään turvallisesti pois verkosta. Myönnämme loppukäyttäjän varmenteita välimiehiltä seuraavasta osiosta tilaajille. Yhteensopivuuden lisäämiseksi lähettäessämme uuden Root X2:n useisiin juuriohjelmiin, olemme myös ristiinallekirjoittaneet sen Root X1:stä.

* Aktiivisia
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Itseallekirjoitettu](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [DST Root CA X3:n ristiinallekirjoitus](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed. der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1- cross-signed.txt)
* Aktiivisia, rajoitetulla saatavuudella
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Itseallekirjoitettu](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [ISRG Root X1:n ristiinallekirjoitus](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross -signed.txt)

Olemme asettaneet verkkosivustot testaamaan varmenteiden ketjutusta aktiivisiin juurimme saakka.

* ISRG Root X1
  * [Kelvollinen](https://valid-isrgrootx1.letsencrypt.org/)
  * [Kumottu](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Vanhentunut](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Kelvollinen](https://valid-isrgrootx2.letsencrypt.org/)
  * [Kumottu](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Vanhentunut](https://expired-isrgrootx2.letsencrypt.org/)

# Välilliset varmenteet

Tavanomaisissa olosuhteissa Let's Encryptin myöntämät varmenteet ovat peräisin "R3":sta, RSA-välilliseltä. Tällä hetkellä, myöntäminen ’E1’:ltä, eräs ECDSA-välillinen, on mahdollista ainoastaan [sallittujen tilien](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) ECDSA-tilaajaavaimille. Tulevaisuudessa myöntäminen 'E1':ltä on kaikkien saatavilla.

Muut välillisemme ("R4" ja "E2") on varattu katastrofipalautukseen, ja niitä käytetään vain, jos menetämme myöntämiskyvyn ensisijaisilla välillisillämme. Emme enää käytä X1, X2, X3 ja X4 välituotteita.

IdenTrust on allekirjoittanut RSA-välillisemme yhteensopivuuden lisäämiseksi.

* Aktiivisia
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Ristiinallekirjoittanut IdenTrust ](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (eläkkeellä)
* Aktiivisia, rajoitetulla saatavuudella
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Allekirjoittanut ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Varmuuskopiointi
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Ristiinallekirjoittanut IdenTrust ](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (eläkkeellä)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Allekirjoittanut ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Eläkkeellä
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Ristiinallekirjoittanut IdenTrust](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Ristiinallekirjoittanut IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Ristiinallekirjoittanut IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Allekirjoittanut ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Ristiinallekirjoittanut IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Ristiinallekirjoitus

## Välilliset

Jokainen välillisemme edustaa yhtä julkista/yksityistä avainparia. Tämän parin yksityinen avain luo allekirjoituksen kaikille loppuyksikön varmenteille (tunnetaan myös lehtivarmenteina), eli varmenteille, jotka myönnämme käytettäväksi palvelimellasi.

Meidän RSA-välillisiä ovat allekirjoittaneet ISRG Root X1. ISRG Root X1:een luotetaan tässä vaiheessa laajalti, mutta RSA-välillisemme on edelleen allekirjoittanut IdenTrustin "[DST Root CA X3](https://crt.sh/?id=8395) -sovelluksella. (tällä hetkellä nimeltään "TrustID X3 Root") asiakasyhteensopivuuden lisäämiseksi. IdenTrust-juuri on ollut olemassa pidempään ja sillä on siten parempi yhteensopivuus vanhempien laitteiden ja käyttöjärjestelmien kanssa (esim. Windows XP, Android 7). Voit [ladata "TrustID X3 Root" IdenTrustista](https://www.identrust.com/support/downloads) (tai vaihtoehtoisesti [lataa kopio meiltä](/certs/trustid -x3-root.pem.txt)).

Ristiinallekirjoituksen olemassa olo tarkoittaa, että jokaisella RSA-välillisellämme on kaksi samaa allekirjoitusavainta edustavaa varmennetta. Yksi on allekirjoittanut DST Root CA X3 ja toinen on allekirjoittanut ISRG Root X1. Helpoin tapa erottaa nämä kaksi on katsoa niiden myöntäjän kenttää.

Kun määrität verkkopalvelinta, palvelimen operaattori konfiguroi loppuyksikön varmenteen lisäksi luettelon välillisistä, jotka auttavat verkkoselaimia varmistamaan, että loppuyksikön varmenteella on luotettuun juurivarmenteeseen johtava luottamusketju. Melkein kaikki palvelinoperaattorit valitsevat ketjun, joka sisältää välivarmenteen, jonka aihe on "R3" ja myöntäjä "ISRG Root X1". Suositeltu Let's Encrypt asiakasohjelmisto, [Certbot](https://certbot.org), tekee tästä kokoonpanosta saumattomasti.

## Juuret
Kuten välilliset, juurivarmenteita voidaan ristiinallekirjoittaa, usein asiakkaiden yhteensopivuuden lisäämiseksi. ECDSA-juuremme, ISRG Root X2, luotiin syksyllä 2020 ja on ECDSA-hierarkian juurivarmenne. Sitä edustaa kaksi varmennetta: toinen on itseallekirjoitettu ja toinen ISRG Root X1:n allekirjoittama.

Kaikki ECDSA-välillisen "E1" allekirjoittamat varmenteet toimitetaan ketjulla, joka sisältää välivarmenne, jonka aihe on "ISRG Root X2" ja jonka myöntäjä on "ISRG Root X1". Melkein kaikki palvelinoperaattorit valitsevat tämän ketjun palvelemisen, koska se tarjoaa parhaan yhteensopivuuden, kunnes ISRG Root X2:een luotetaan laajalti.

# OCSP-allekirjoitusvarmenne

Tätä varmennetta käytetään OCSP-vastausten allekirjoittamiseen Let's Encrypt Authority -välillisille, jotta meidän ei tarvitse tuoda juuriavainta verkkoon näiden vastausten allekirjoittamista varten. Kopio tästä varmenteesta sisältyy automaattisesti näihin OCSP-vastauksiin, joten tilaajien ei tarvitse tehdä mitään sen kanssa. Se sisältyy tässä vain tiedoksi.

* ISRG Root OCSP X1 ([Allekirjoittanut ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Uudemmilla välillisillämme ei ole OCSP-URL:a (niiden kumotustiedot toimitetaan sen sijaan CRL:n kautta), joten emme ole myöntäneet OCSP-allekirjoitusvarmennetta ISRG Root X2:lta.

# Certificate Transparency

Olemme sitoutuneet toiminnassamme ja myöntämiemme varmenteiden läpinäkyvyyteen. Lähetämme kaikki varmenteet [varmenteiden läpinäkyvyyslokeihin](https://www.certificate-transparency.org/) sitä mukaa, kun niitä myönnämme. Voit nähdä kaikkia myönnettyjä varmenteita näiden linkkien kautta:

* [Myöntänyt Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Myöntänyt Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Myöntänyt E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Myöntänyt R3](https://crt.sh/?Identity=%25&iCAID=183267)
