---
title: Varmenteiden kumoaminen
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


Kun varmenteen vastaava yksityinen avain ei ole enää turvassa, sinun pitäisi kumota varmenne. Tämä voi tapahtua muutamasta eri syystä. Saatat esimerkiksi vahingossa jakaa yksityisen avaimen julkisella verkkosivustolla. Hakkerit voivat kopioida yksityisen avaimen palvelimiltasi; tai hakkerit voivat ottaa väliaikaisesti hallintaansa palvelimiasi tai DNS-kokoonpanoasi ja käyttää sitä vahvistamaan ja myöntämään varmenteen, jonka yksityinen avain heillä on.

Kun kumoat Let's Encrypt -varmenteen, Let's Encrypt julkaisee kumotustiedot [Online Certificate Status Protocol (OCSP)-protokollan](https://en.wikipedia.orgwiki/Online_Certificate_Status_Protocol) kautta, ja jotkin selaimet tarkistavat OCSP:n nähdäkseen, pitäisikö niiden luottaa varmenteeseen. Huomaa, että OCSP:llä [ on perustavanlaatuisia ongelmia](https://www.imperialviolet.org/2011/03/18/revocation.html), joten kaikki verkkoselaimet eivät suorita tätä tarkistusta. Silti, vaarantuneita yksityisiä avaimia vastaavien varmenteiden kumoaminen on tärkeä käytäntö ja Let's Encryptin [tilaajasopimus](/repository) edellyttää sitä.

Kumottaaksesi varmenteen Let's Encryptillä, käytä [ACME-sovellusliittymää](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), todennäköisimmin ACME-asiakasohjelman kautta, kuten [Certbot](https://certbot.eff.org/). Sinun on todistettava Let's Encryptille, että sinulla on oikeus varmenteen kumoamiseen. On olemassa kolme tapaa tehdä tämä:

# Varmenteen myöntäneeltä tililtä

Jos olet alun perin myöntänyt varmenteen ja voit edelleen hallita tiliä, jota käytit sen myöntämiseen, voit kumottaa sen tilisi tunnistetiedoilla. Certbot yrittää tätä oletusarvoisesti. Esimerkki:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# Varmenteen yksityistä avainta käyttäen

Jos et alun perin myöntänyt varmennetta, mutta sinulla on kopio vastaavasta yksityisestä avaimesta, voit kumota käyttämällä tätä yksityistä avainta allekirjoittaaksesi kumotuspyynnön. Jos esimerkiksi huomaat, että yksityinen avain on vahingossa tehty julkiseksi, voit tällä menetelmällä kumottaa varmenteita, jotka käyttivät kyseistä yksityistä avainta, vaikka et olisikaan henkilö, joka on alun perin myöntänyt kyseiset varmenteet.

Käyttääksesi tätä menetelmää, sinun täytyy ensin ladata varmenne kumottavaksi. Let's Encrypt kirjaa kaikki varmenteet [Certificate Transparency](https://www.certificate-transparency.org/) -lokeihin, jotta voit etsiä ja ladata varmenteita lokiseurannasta, kuten [crt.sh](https://crt.sh/).

Tarvitset myös kopion yksityisestä avaimesta PEM-formaatissa. Kun sinulla on nämä, voit kumottaa varmenteen seuraavasti:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# Käyttämällä toista valtuutettua tiliä

Jos joku on myöntänyt varmenteen vaarantuttuasi isäntäsi tai DNS:si, sinun kannattaa peruuttaa varmenne, kun saat hallinnan takaisin. Varmenteen kumoamiseksi Let's Encryptin on varmistettava, että hallitset varmenteen toimialueen nimiä muuten ihmiset voivat kumottaa toistensa varmenteet ilman lupaa. Let's Encrypt vahvistaa tämän hallinnan käyttämällä samoja menetelmiä, joita se käyttää hallinnan myöntämiseen: voit lisätä [arvon DNS TXT -tietueeseen](https://tools.ietf.org/html/rfc8555#section-8.4) tai aseta [tiedosto HTTP-palvelimelle](https://tools.ietf.org/html/rfc8555#section-8.3). Yleensä ACME-asiakas tulee käsittelemään näitä puolestasi. Huomaa, että useimmat ACME-asiakkaat yhdistävät vahvistuksen ja myöntämisen, joten ainoa tapa pyytää vahvistusta on yrittää myöntämistä. Voit sitten kumottaa tuloksena olevan varmenteen, jos et halua sitä, tai yksinkertaisesti tuhota yksityisen avaimen. Jos haluat välttää varmenteen myöntämisen ollenkaan, voit sisällyttää komentorivillesi olemattoman toimialueen nimen, mikä aiheuttaa sen, että myöntäminen epäonnistuu, mutta silti muut olemassa olevat toimialueen nimet tarkistetaan. Tehdäksesi tämän, suorita:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Ja noudata ohjeita. Jos haluat vahvistaa mieluummin HTTP:n kuin DNS:n avulla, korvaa `--preferred-challenges`-lippu `--preferred-challenges=http`:llä.

Kun olet vahvistanut kaikkien kumottavan varmenteen toimialueiden nimien hallinnan, voit ladata varmenteen osoitteesta [crt.sh](https://crt.sh/) ja jatkaa sitten kumottaaksesi varmenteen ikään kuin olisit sen myöntänyt:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```
