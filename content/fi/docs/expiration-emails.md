---
title: Vanhentumissähköpostit
slug: expiration-emails
date: 2016-07-02
lastmod: 2021-09-25
show_lastmod: 1
---


# Tilaaminen

Jos ilmoitat Let's Encryptille sähköpostiosoitteen, kun luot tiliäsi, teemme parhaamme lähettääksemme sinulle automaattisesti vanhenemisilmoitukset, kun varmennetta on tulossa uusittavaksi. Pyrimme lähettämään ensimmäisen ilmoituksen 20 päivää ennen varmenteen voimassaolon päättymistä ja lisää ilmoituksia kymmenen päivää ja yksi päivä ennen sen vanhenemista. Suosittelemme, että luotat siihen, että ACME-asiakasohjelmasi uusii varmenteet automaattisesti, ja käytät näitä vanhenemisilmoituksia vain varoituksena automaation tarkistamiseen.

# Kun saat vanhentumissähköpostin

Jos varmenne on jo uusittu, emme lähetä voimassaolon päättymisilmoitusta. Katsomme varmenteen uusituksi, jos olemassa on uudempi varmenne, jolla on täsmälleen sama nimi, riippumatta siitä, millä tilillä se on luotu. Jos olet myöntänyt uuden varmenteen, joka lisää tai poistaa vanhaan varmenteeseesi liittyvän nimen, saat vanhentumissähköpostin vanhaa varmennetta kosken. Jos tarkistat verkkosivustollasi parhaillaan käynnissä olevan varmenteen ja se näyttää oikean päivämäärän, ei lisää toimia tarvita.

# Tilauksen peruutus

Sähköpostin ruudulla on linkki tulevien ilmoitusten tilauksen peruuttamiseen. Jos osut linkkiä, et saa mitään vanhentumisilmoituksia ensi vuonna. "Ketkä on peruuttanut tilauksen"-luettelo on riippumaton Staging-ilmoituksista ja tuotantoilmoituksista, joten voit vapaasti lopettaa Staging-tilauksen vaikuttamatta tuotantotilaasi.

Huomaa, että tilauksesi peruutus on voimassa vain vuoden, joten sinun on uusittava se joka vuosi.

Emme voi vielä aseta sinua tehokkaasti uudelleen tilaajaksi kun peruutat tilauksen. Sähköpostin tarjoajamme, Mandrill, [on manuaalinen mekanismi, joka meidän täytyy vielä automatisoida](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Voit kuitenkin muuttaa tililläsi olevaa sähköpostiosoitetta, joka tehokkaasti aseta sinut tilaajaksi. Monet yleiset sähköpostipalvelut käsittelevät `nimesi+1@esimerkki.com`-osoitetta samalla tavalla kuin `nimesi@esimerkki.com`. Joten jos päivität sähköpostiosoitteesi muotoon `nimesi+1@esimerkki.com`, voit alkaa saada uudelleen vanhentuneita viestejä. Certbotilla käytä:

`certbot update_account --email yourname+1@example.com`
