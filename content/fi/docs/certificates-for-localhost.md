---
title: Varmenteet paikalliselle palvelimelle
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


Joskus ihmiset haluavat saada varmenteen isäntänimelle "localhost", joko käytettäväksi paikallisessa kehittämisessä tai jakelua varten alkuperäisen sovelluksen kanssa, jonka on kommunikoitava verkkosovelluksen kanssa. Let's Encrypt ei voi tarjota varmenteita "localhost":lle, koska kukaan ei yksilöllisesti omista sitä, eikä se ole juurtunut ylätason toimialueeseen, kuten ".com" tai ".net". On mahdollista määrittää oma toimialue, joka sattuu ratkaisemaan `127.0.0.1`, ja hankkia sille varmenne DNS-haasteen avulla. Tämä on kuitenkin yleensä huono idea ja parempiakin vaihtoehtoja on olemassa.

# Paikallista kehittämistä varten

Jos olet kehittämässä verkkosovellusta, on hyödyllistä käyttää paikallista verkkopalvelinta, kuten Apachea tai Nginxiä, ja käyttää sitä verkkoselaimesi `http://localhost:8000/`:n kautta. Verkkoselaimet käyttäytyvät kuitenkin hienovaraisesti eri tavoin HTTP- ja HTTPS-sivuilla. Suurin ero: HTTPS-sivulla kaikki pyynnöt ladata JavaScriptin HTTP-URL: lta estetään. Joten jos kehität paikallisesti käyttäen HTTP: ta, voit lisätä komentosarjatunnisteen, joka toimii hyvin kehityskoneessasi, mutta katkeaa,, kun käytät HTTPS-tuotantosivustoosi. Tällaisen ongelman ratkaisemiseksi on hyödyllistä määrittää HTTPS-protokolla paikalliselle verkkopalvelimelle. Et kuitenkaan halua nähdä varmennevaroituksia jatkuvasti. Kuinka vihreä lukko saadaan paikallisesti?

Paras vaihtoehto: luo oma varmenne, joko itse tai paikallisen juuren allekirjoittama, ja luota siihen käyttöjärjestelmäsi luottamussäilöön. Käytä sitten kyseistä varmennetta paikallisessa verkkopalvelimessasi. Katso alta lisätietoja.

# Natiivisovelluksille, jotka puhuvat verkkosovellusten kanssa

Joskus kehittäjät haluavat tarjota ladattavan natiivisovelluksen, jota voidaan käyttää verkkosivuston rinnalla lisäominaisuuksien tarjoamiseen. Esimerkiksi Dropbox- ja Spotify-työpöytäsovellukset etsivät tiedostoja koneeltasi, mitä verkkosovellus ei ilman suostumuksellasi saisi tehdä. Yksi yleinen lähestymistapa on, että nämä natiivisovellukset tarjoavat verkkopalvelun paikallisessa isännässä localhost: na ja pyytävät verkkosovellusta tekemään pyyntöjä sille XMLHTTPRequestin (XHR) tai WebSocketsin kautta. Verkkosovellus käyttää lähes aina HTTPS: ää, mikä tarkoittaa, että selaimet kieltävät sitä tekemästä XHR- tai WebSockets-pyyntöjä suojaamattomiin URL-osoitteisiin. Tätä kutsutaan sekasisällön estämiseksi (eng. Mixed Content Blocking). Kommunikoidakseen verkkosovelluksen kanssa natiivisovelluksen on tarjottava suojattu verkkopalvelu.

Onneksi nykyiset verkkoselaimet [pitävät](https://bugs.chromium.org/p/chromium/issues/detail?id=607878) `http://127.0.0.1:8000/`:ta [potentiaalisesti luotettavana](https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy) URL:nä, koska se viittaa takaisinkytkentäosoitteeseen. `127.0.0.1`: een lähetetty liikenne ei taatusti poistu laitteeltasi, joten sitä pidetään automaattisesti suojattuna verkon sieppausta vastaan. Tämä tarkoittaa, että jos verkkosovellustasi toimitetaan HTTPS: lla ja tarjoat natiivisovelluksen verkkopalvelun `127.0.0.1`: llä, molemmat voivat kommunikoida mielellään XHR: n kautta. Valitettavasti [paikallinen isäntä "localhost" ei vielä saa samaa kohtelua](https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02). WebSockets ei myöskään saa tätä käsittelyä kummallekaan nimelle.

Saattaa olla houkutteleva kiertämään nämä rajoitukset määrittämällä laajamittaiseen DNS:ään toimialueen nimen, joka sattuu ratkaisemaan `127.0.0.1` (eli `localhost.esimerkki.com`), hankkimalla varmenteen kyseiselle toimialueelle, toimittamaan varmenteen ja vastaavan yksityisen avaimen natiivisovelluksesi kanssa ja käskemään verkkosovelluksesi kommunikoimaan `https://localhost.esimerkki.com:8000/`:n kanssa `http://127.0.0.1:8000/`:n sijaan. *Älä tee tätä.* Se vaarantaa käyttäjäsi ja varmenteesi voidaan mitätöidä.

Ottamalla käyttöön toimialueen nimen IP-osoitteen sijasta, annat hyökkääjälle mahdollisuuden suorittaa MitM-toiminta, joka kohdistaa DNS-haun ja syöttää siihen vastauksen, joka osoittaa eri IP-osoitteeseen. Hyökkääjä voi sitten esiintyä paikallisena sovelluksena ja lähettää väärennettyjä vastauksia takaisin verkkosovellukseen, mikä voi vaarantaa tilisi verkkosovelluksen puolella sen suunnittelusta riippuen.

Onnistunut MitM-toiminnan suoritus tässä tilanteessa on mahdollista, koska saadaksesi sen toimimaan sinun oli lähetettävä varmenteen yksityinen avain natiivisovelluksellasi. Tämä tarkoittaa, että jokainen, joka lataa natiivisovelluksesi, saa kopion yksityisestä avaimesta, mukaan lukien hyökkääjä. Tätä seikkaa pidetään yksityisen avaimesi vaarantumisena, ja varmenteen myöntäjän on velvollinen mitätöimään varmenteen, sen tietoonsa saamisen varalta. [Monien natiivisovellusten](https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ) [varmenteet](https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ) on mitätöity yksityisen avaimen [lähettämisen vuoksi](https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ).

Valitettavasti tämä jättää alkuperäisille sovelluksille ilman monia hyviä, turvallisia vaihtoehtoja kommunikoida vastaavien verkkosivustojen kanssa. Tilanne voi muuttua hankalammaksi tulevaisuudessa, jos verkkoselaimet [tiukentavat paikallispalvelun pääsyä verkosta](https://bugs.chromium.org/p/chromium/issues/detail?id=378566).

Huomaa myös, että etuoikeutettujen natiivisovellusliittymien tarjoavan verkkopalvelun vieminen on riskialtista, koska verkkosivustot, joita et aikonut valtuuttaa, voivat käyttää niitä. Jos jatkat tätä reittiä, muista lukea [Alkuperäislähteiden välisen resurssien jakaminen](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)., käytä Access-Control-Allow-Origin-toimintoa ja muista käyttää muistiturvallista HTTP-jäsennintä, koska jopa alkuperäislähteet, joihin et salli pääsyä, voivat lähettää esitarkastuspyyntöjä, jotka saattavat pystyä hyödyntämään jäsentimesi virheitä.

# Omien varmenteiden luominen ja luottaminen

Kuka tahansa voi tehdä omia varmenteita ilman varmentajan osallistumista. Ainoa ero on, että kukaan muu ei luota itse luomiisi varmenteihin. Paikallisen kehittämisen kannalta se sopii hyvin.

Yksinkertaisin tapa luoda yksityinen avain ja itse-allekirjoitettu varmenne paikalliselle isännälle on tämän komennon myötä':

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Tämän jälkeen voit määrittää paikallisen verkkopalvelimen kanssa paikallinen.crt ja paikallinen.key ja asentaa paikallinen.crt:n paikallisesti luotettujen juurien luetteloon.

Jos kaipaat hieman realistisempaa kehitysvarmenetta, voit käyttää [minica](https://github.com/jsha/minica) luodaksesi oman paikallisen juurivarmenteen ja loppuvarmenteet (myös lehtinä tunnettu) sillä allekirjoitettuina. Tuot sitten juurivarmenteen itse-allekirjoitetun loppuvarmenteen sijaan.

Voit myös käyttää toimialuetta, jossa on pisteitä, kuten `www.localhost`, lisäämällä sen /etc/hosts:een aliaksena `127.0.0.1`:een. Tämä muuttaa hienovaraisesti sitä, miten verkkoselaimet käsittelevät evästeiden tallennusta.
