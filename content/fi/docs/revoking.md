---
title: Varmenteiden kumoaminen
slug: revoking
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


Kun varmenne ei ole enää turvallista käyttää, sinun pitäisi kumota se. Näin voi tapahtua muutamasta eri syystä. Saatat esimerkiksi vahingossa jakaa yksityisen avaimen julkisella verkkosivustolla. hakkerit voivat kopioida yksityisen avaimen palvelimiltasi; tai hakkerit voivat ottaa väliaikaisesti hallintaansa palvelimiasi tai DNS-kokoonpanoasi ja käyttää sitä vahvistamaan ja myöntämään varmenteen, jonka yksityinen avain heillä on.

Kun kumoat Let's Encrypt -varmenteen, Let's Encrypt julkaisee kumoamistiedot [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)-protokollan välityksellä ja eräät verkkoselaimet tarkistavat OCSP:ta nähdäkseen, pitäisikö niiden luottaa varmenteeseen. Huomaa, että OCSP [kärsii joistakin perustavanlaatuisista ongelmista](https://www.imperialviolet.org/2011/03/18/revocation.html), joten kaikki verkkoselaimet eivät suorita tätä tarkistusta. Silti, vaarantuneita yksityisiä avaimia vastaavien varmenteiden kumoaminen on tärkeä käytäntö ja Let's Encryptin [tilaajasopimus](/repository) edellyttää sitä.

Kumottaaksesi varmenteen Let's Encryptillä, käytä [ACME-API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), todennäköisimmin ACME-asiakasohjelman välityksellä, kuten [Certbot](https://certbot.eff.org/). Sinun täytyy todistaa Let's Encryptille, että sinulla on valtuudet varmenteen kumoamiseen. Voit tehdä tämän kolmella tavalla: varmenteen myöntäneeltä tililtä, käyttämällä eri valtuutettua tiliä tai käyttämällä varmenteen yksityistä avainta.

# Syykoodin määrittäminen

Kun kumotaan varmenne, Let's Encrypt -tilaajien tulee valita syykoodi seuraavasti:

* Syytä ei ilmoiteta tai `unspecified` (RFC 5280 CRLReason #0)
  - Kun alla olevat syykoodit eivät koske kumotuspyyntöä, tilaaja ei saa ilmoittaa muuta syykoodia kuin "unspecified".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Varmenteen tilaajan on valittava "keyCompromise"-kumoamissyy, kun hänellä on syytä uskoa, että hänen varmenteensa yksityinen avain on vaarantunut, esimerkiksi luvaton henkilö on päässyt käsiksi varmenteensa yksityiseen avaimeen.
  - Jos kumotuspyyntö on allekirjoitettu käyttämällä varmenteen yksityistä avainta tilaajatilin yksityisen avaimen sijaan, Let's Encrypt voi jättää huomioimatta kumoamissyyn pyynnössä ja asettaa syyksi "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - Varmenteen tilaajan tulisi valita kumotussyy "superseded", kun hän pyytää uutta varmennetta korvatakseen olemassa olevan varmenteensa.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Varmenteen tilaajan tulisi valita kumotussyy "cessationOfOperation", kun hän ei enää omista kaikkia varmenteen verkkotunnuksia tai kun hän ei enää käytä varmennetta, koska hän lopettaa verkkosivustonsa.
  - Jos kumotuspyyntö tulee Tilaajatililtä, joka ei ole tilannut kyseistä varmennetta, mutta joka on osoittanut hallintaansa kaikkia varmenteen tunnisteita kohti, Let's Encrypt voi jättää pyynnön kumotussyyn huomioimatta ja asettaa syyksi "cessationOfOperation".

Kumoamispyynnöt, joissa mainitaan jokin muu kuin yllä kuvattu syykoodi, hylätään.

# Varmenteen myöntäneeltä tililtä

Jos olet alun perin myöntänyt varmenteen ja voit edelleen hallita tiliä, jota käytit sen myöntämiseen, voit kumota sen tilisi tunnistetiedoilla. Certbot yrittää tätä oletusarvoisesti. Esimerkki:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Toista valtuutettua tiliä käyttäen

Jos joku on myöntänyt varmenteen vaarantuttuasi isäntäsi tai DNS: si, haluat kumota varmenteen, kun saat hallinnan takaisin. Varmenteen kumoamiseksi Let's Encryptin on varmistettava, että hallitset varmenteen toimialueen nimiä (muuten ihmiset voivat kumota toistensa varmenteet ilman lupaa)!

Tämän hallinnan vahvistamiseksi Let's Encrypt käyttää samoja menetelmiä, joita se käyttää ohjauksen vahvistamiseen myöntämistä varten: voit laittaa [arvon DNS TXT -tietueeseen](https://tools.ietf.org/html/rfc8555#section-8.4) tai laittaa [tiedoston HTTP-palvelimeen](https://tools.ietf.org/html/rfc8555#section-8.3). Yleensä ACME-asiakas tulee käsittelemään näitä sinun puolestasi. Huomaa, että useimmat ACME-asiakkaat yhdistävät validoinnin ja myöntämisen, joten ainoa tapa pyytää vahvistuksia on yrittää myöntämistä. Voit sitten kumota tuloksena olevan varmenteen, jos et halua sitä, tai yksinkertaisesti tuhota yksityisen avaimen.

Jos haluat välttää varmenteen myöntämisen ollenkaan, voit sisällyttää komentorivillesi olemattoman toimialueen nimen, mikä aiheuttaa sen, että myöntäminen epäonnistuu, mutta silti muut olemassa olevat toimialueiden nimet tarkistetaan. Esimerkki:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Ja noudata ohjeita. Jos haluat vahvistaa mieluummin HTTP:n kuin DNS:n välityksellä, korvaa lippu `--preferred-challenges` tuolla `--preferred-challenges=http`.

Kun olet vahvistanut kaikkien kumottavan varmenteen verkkotunnusten hallinnan, voit ladata varmenteen [crt.sh](https://crt.sh/):sta ja jatkaa sitten varmenteen kumottamista aivan kuin olisit myöntänyt sen:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Varmenteen yksityistä avainta käyttäen

Jos et alun perin myöntänyt varmennetta, mutta sinulla on kopio vastaavasta yksityisestä avaimesta, voit kumota sen allekirjoittamalla kumotuspyynnön käyttämällä tätä yksityistä avainta. Jos esimerkiksi huomaat, että yksityinen avain on vahingossa julkistettu, voit käyttää tätä menetelmää yksityistä avainta käyttäneiden varmenteiden kumoamiseen, vaikka et olisikaan henkilö, joka on alun perin myöntänyt kyseiset varmenteet.

Jotta voit käyttää tätä menetelmää, tarvitset ensin kopion yksityisestä avaimesta PEM-muodossa.

Sitten, jos sinulla ei vielä ole sitä, lataa kumotettava varmenne. Let's Encrypt kirjoittaa lokit kaikista varmenteista [Certificate Transparency](https://www.certificate-transparency.org/) -lokeihin, joten voit etsiä ja ladata varmenteita lokivalvonnasta, kuten [crt.sh](https://crt.sh/). Vastaavan `SubjectPublicKeyInfo` (SPKI)-kentän etsiminen hakee kaikki yksityistä avainta käyttävät varmenteet. SPKI-tiivisteen purkaminen yksityisestä avaimesta:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Kun sinulla on yksityinen avain ja varmenne, voit kumota varmenteen kuten näin:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
