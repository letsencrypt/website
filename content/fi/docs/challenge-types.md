---
title: Haastetyypit
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2020-12-08
show_lastmod: 1
---


Kun hankit varmenteen Let's Encryptiltä, ​​palvelimemme vahvistavat, että hallitset kyseisessä varmenteessa olevia toimialueiden nimiä käyttämällä ACME-standardin määrittelemiä haasteita. Useimmiten ACME-asiakkaasi hoitaa tämän vahvistuksen automaattisesti, mutta jos sinun on tehtävä monimutkaisempia määrityspäätöksiä, on hyödyllistä tietää niistä lisää. Jos olet epävarma, valitse asiakkaasi oletusasetukset tai HTTP-01.

# HTTP-01-haaste

Tämä on yleisin tämänpäiväinen haaste. Let's Encrypt antaa tunnuksen ACME-asiakkaallesi, ja ACME-asiakassi asettaa tiedoston verkkopalvelimellesi `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. Tuo tiedosto sisältää tunnuksen sekä tilisi avaimen peukalonjäljen. Kun ACME-asiakkaasi kertoo Let's Encryptille, että tiedosto on valmis, Let's Encrypt yrittää noutaa sen (mahdollisesti useita kertoja useista näkökulmista). Jos vahvistustarkistuksemme saavat oikeat vastaukset verkkopalvelimeltasi, validointi katsotaan onnistuneeksi ja voit jatkaa varmenteen myöntämistä. Jos vahvistustarkastukset epäonnistuvat, sinun on yritettävä uudelleen uudella varmenteella.

HTTP-01-haasteen toteutuksemme seuraa uudelleenohjauksia, jopa kymmenen uudelleenohjausta. Se hyväksyy vain uudelleenohjaukset "http:": een ja "https:": een, ja vain portteihin 80 ja 443. Se ei hyväksy uudelleenohjauksia IP-osoitteisiin. Kun se ohjataan uudelleen HTTPS-URL: een, se ei vahvista varmenteita (koska tämä haaste on tarkoitettu kelvollisten varmenteiden käynnistämiseen, se saattaa kohdata itse-allekirjoitettuja tai vanhentuneita varmenteita matkan varrella).

HTTP-01-haaste voidaan suorita ainoastaan portissa 80. Asiakkaiden salliminen määrittää mielivaltaisia ​​portteja tekisi haasteesta vähemmän turvallisen, joten ACME-standardi ei salli sitä.

Hyödyt:

 - Se on helppo automatisoida ilman lisätietoa toimialueen kokoonpanosta.
 - Sen avulla isännöintipalveluntarjoajat voivat myöntää niille CNAMEd-toimialueille soveltuvia varmenteita.
 - Se toimii valmiiden verkkopalvelimien kanssa.

Haitat:

 - Se ei toimi, jos Internet-palveluntarjoajasi estää portin 80 (tämä on harvinaista, mutta jotkut kotimaiset Internet-palveluntarjoajat tekevät tämän).
 - Let's Encrypt ei anna sinun käyttää tätä haastetta jokerimerkkivarmenteiden myöntämiseen.
 - Jos sinulla on useita verkkopalvelimia, sinun on varmistettava, että tiedosto on saatavilla näissä kaikissa.

# DNS-01-haaste

Tämä haaste pyytää sinua todistamaan, että hallitset toimialueesi DNS: ää asettamalla tietyn arvon TXT-tietueeseen kyseisen toimialueen nimen alle. Se on vaikeampi määrittää kuin HTTP-01, mutta se voi toimia skenaarioissa, joissa HTTP-01 ei pysty. Sen avulla voit myös myöntää jokerimerkkivarmenteita. Kun Let's Encrypt on antanut ACME-asiakkaallesi tunnuksen, asiakkaasi luo TXT-tietueen, joka on johdettu kyseisestä tunnuksesta ja tiliavaimesta, ja asettaa tietueen `_acme-challenge.<YOUR_DOMAIN>`:een. Sitten Let's Encrypt kysyy DNS-järjestelmältä tätä tietuetta. Jos se löytää osuman, voit jatkaa varmenteen myöntämistä!

Koska myöntämisen ja uusimisen automatisointi on todella tärkeää, DNS-01-haasteiden käyttäminen on järkevää vain, jos DNS-palveluntarjoajallasi on API, jolla voit automatisoida päivitykset. Yhteisömme on aloittanut [luettelon tällaisista DNS-palveluntarjoajista täällä](https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438). DNS-palveluntarjoajasi voi olla sama kuin rekisteröijäsi (yritys, jolta ostit verkkotunnuksesi), tai se voi olla erilainen. Jos haluat vaihtaa DNS-palveluntarjoajaasi, sinun tarvitsee vain tehdä pieniä muutoksia rekisterinpitäjässäsi. Sinun ei tarvitse odottaa verkkotunnuksesi vanhenemista.

Huomaa, että täysin DNS-sovellusliittymän tunnistetietojesi asettaminen verkkopalvelimellesi lisää merkittävästi vaikutusta, jos tämä verkkopalvelin hakkeroidaan. Paras käytäntö on käyttää [kapeampia API-tunnistetietoja](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation) tai suorita DNS-tarkistus erilliseltä palvelimelta ja kopioi varmenteet automaattisesti verkkopalvelimellesi.

Koska Let's Encrypt noudattaa DNS-standardeja etsiessään TXT-tietueita DNS-01-tarkistusta varten, voit käyttää CNAME-tietueita tai NS-tietueita delegoidaksesi haasteeseen vastaamisen muille DNS-vyöhykkeille. Tätä voidaan käyttää [aliverkkotunnuksen `_acme-challenge` delegoimiseen](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation) vahvistuskohtaiselle palvelimelle tai vyöhykkeelle. Sitä voidaan käyttää myös, jos DNS-palveluntarjoajasi päivittyy hitaasti ja haluat siirtää sen nopeammin päivittyvälle palvelimelle.

Useimmilla DNS-palveluntarjoajilla on "etenemisaika", joka määrää, kuinka kauan DNS-tietueen päivittämisestä kuluu, kunnes se on saatavilla kaikilla heidän palvelimillaan. Tätä voi olla vaikea mitata, koska ne käyttävät usein myös [mitä-tahansa-lähetystä (anycast)](https://en.wikipedia.org/wiki/Anycast), mikä tarkoittaa, että useilla palvelimilla voi olla sama IP-osoite, ja riippuen siitä, missä päin maailmaa olet, saatat puhua eri palvelimen kanssa (ja saa eri vastauksen) kuin Let's Encrypt tekee. Parhaat DNS-sovellusliittymät tarjoavat tavan tarkistaa automaattisesti, onko päivitys on täysin levinnyt. Jos DNS-palveluntarjoajallasi ei ole tätä, sinun on vain määritettävä asiakkaasi odottamaan tarpeeksi kauan (usein jopa tunnin) varmistaaksesi, että päivitys leviää ennen validoinnin käynnistämistä.

Sinulla voi olla useita TXT-tietueita samalle nimelle. Näin voi käydä esimerkiksi, jos vahvistat haastetta jokerimerkille ja ei-jokerimerkille samaan aikaan. Vanhat TXT-tietueet kannattaa kuitenkin puhdistaa, sillä jos vastauskoko kasvaa liian suureksi Let's Encrypt alkaa hylätä sitä.

Hyödyt:

 - Voit käyttää tätä haastetta antaaksesi varmenteita, jotka sisältävät jokerimerkin verkkotunnuksia.
 - Se toimii hyvin, vaikka sinulla on useita verkkopalvelimia.

Haitat:

 - API-tunnusten pitäminen verkkopalvelimellasi on riskialtista.
 - DNS-palveluntarjoajasi ei ehkä tarjoa sovellusrajapintaa.
 - DNS-sovellusliittymäsi ei välttämättä anna tietoja leviämisajoista.

# TLS-SNI-01

Tämä haaste määriteltiin ACME: n luonnosversioissa. Se teki TLS-kättelyn portissa 443 ja lähetti tietyn [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)-otsikon, etsiessään varmennetta, joka sisälsi tunnuksen. Se [poistettiin käytöstä maaliskuussa 2019](https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209), koska se ei ollut tarpeeksi turvallinen.

# TLS-ALPN-01

Tämä haaste kehitettiin sen jälkeen, kun TLS-SNI-01 vanhentui, ja sitä kehitetään [erillisenä standardina](https://tools.ietf.org/html/rfc8737). Kuten TLS-SNI-01, se suoritetaan TLS: n välityksellä portissa 443. Se käyttää kuitenkin mukautettua ALPN-protokollaa varmistaakseen, että vain palvelimet, jotka ovat tietoisia tästä haastetyypistä, vastaavat vahvistuspyyntöihin. Tämä sallii myös tämän haastetyypin vahvistuspyynnöissä käyttää SNI-kenttää, joka vastaa validoitavaa toimialueen nimeä, mikä tekee siitä turvallisemman.

Tämä haaste ei sovi useimmille ihmisille. Se sopii parhaiten TLS: n päättävien käänteisten välityspalvelinten tekijöille, jotka haluavat suorittaa isäntäpohjaisen validoinnin, kuten HTTP-01: n, mutta haluavat tehdä sen kokonaan TLS-tasolla ongelmien erottamiseksi. Tällä hetkellä se tarkoittaa pääasiassa suuria isännöintipalveluntarjoajia, mutta yleiset verkkopalvelimet, kuten Apache ja Nginx, voisivat joskus ottaa tämän käyttöön ([Caddy sitä tekee jo](https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860)).

Hyödyt:

 - Se toimii, jos portti 80 ei ole käytettävissä.
 - Se voidaan suorittaa TLS-kerroksessa.

Haitat:

 - Apache, Nginx tai Certbot eivät tue sitä, eivätkä ne todennäköisesti tue sitä pian.
 - Kuten HTTP-01, jos sinulla on useita palvelimia, niiden kaikkien on vastattava samalla sisällöllä.
 - Tätä menetelmää ei voi käyttää jokerimerkkiverkkotunnusten vahvistamiseen.
