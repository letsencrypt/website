---
title: Paras käytäntö - Pidä portti 80 auki
slug: allow-port-80
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Saamme ajoittain raportteja ihmisiltä, joilla on vaikeuksia HTTP-01-haastetyypin käytössä, koska he ovat poistaneet verkkopalvelimensa portin 80 palomuurista. Suosittelemme, että kaikki yleiseen verkkokäyttöön tarkoitetut palvelimet tarjoavat sekä HTTP: tä portissa 80 että HTTPS: tä portissa 443. Niiden tulisi myös lähettää uudelleenohjaukset kaikille portilla 80 pyynnöille ja mahdollisesti HSTS-otsikko (portilla 443 pyynnöille).

Portin 80 salliminen ei tuota suurempaa hyökkäyspintaa palvelimellesi, koska portilla 80 pyyntöjä palvelee yleensä sama ohjelmisto, joka toimii portilla 443.

Portin 80 sulkeminen ei vähennä riskiä henkilölle, joka vierailee verkkosivustollasi vahingossa HTTP: n kautta. Tavanomaisissa olosuhteissa kyseinen henkilö saisi uudelleenohjauksen HTTPS: ään ja sen jälkeinen liikenne suojattaisiin. Jos kyseiseen henkilöön kohdistuisi aktiivinen MITM, MITM vastaisi portilla 80, joten sivustollasi ei koskaan olisi mahdollisuutta vastata "yhteys hylätty"

Lopuksi, portin 80 auki pitäminen uudelleenohjauksen palvelemiseksi auttaa saamaan ihmiset sivustosi oikeaan protokollan versioon eli HTTPS. On olemassa useita tilanteita, jotka eivät ole sinun hallinnassasi, ja joissa joku saattaa hetkellisesti päätyä sivustosi HTTP-versioon – esimerkiksi automaattinen linkitys sähköposteissa tai toimialueen nimen kirjoittaminen manuaalisesti. Heille on parempi saada uudelleenohjaus kuin virheilmoitus.

Valitettavasti et ehkä voi hallita sitä, onko portti 80 estetty sivustollasi. Jotkut (enimmäkseen asuinpaikat) Internet-palveluntarjoajat estävät portin 80 eri syistä. Jos Internet-palveluntarjoajasi tekee näin, mutta haluat silti saada varmenteita Let's Encryptistä, sinulla on kaksi vaihtoehtoa: Voit käyttää DNS-01-haasteita tai [yksi asiakkaista, joka tukee TLS-ALPN-01-haasteita](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) (portissa 443).
