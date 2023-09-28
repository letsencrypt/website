---
title: Miten se toimii
linkTitle: Miten Let's Encrypt toimii
slug: how-it-works
top_graphic: 3
lastmod: 2019-10-18
show_lastmod: 1
---


Let's&nbsp;Encrypt ja [ACME-protokollan](https://tools.ietf.org/html/rfc8555) tavoitteena on mahdollistaa HTTPS-palvelimen perustaminen ja saada automaattisesti selainluotettava varmenne, ilman ihmisen toimia.  Tämä saavutetaan suorittamalla varmennehallinta-agentti verkkopalvelimessa.

Ymmärtääksesi tekniikan toiminnan, käydään läpi prosessi, jossa määritetään `https:// esimerkki.com/` varmenteiden hallinta-agentilla, joka tukee Let's&nbsp;Encryptia.

Tähän prosessiin on kaksi vaihetta.  Ensinnäkin agentti todistaa CA:lle, että verkkopalvelin hallitsee toimialuetta.  Sitten agentti voi pyytää, uusia ja kumottaa kyseisen toimialueen varmenteita.

## Toimialueen vahvistus

Let's&nbsp;Encrypt tunnistaa palvelimen ylläpitäjän julkisella avaimella.  Ensimmäistä kertaa agenttiohjelmisto on vuorovaikutuksessa Let's&nbsp;Encryptin kanssa, se luo uuden avainparin ja todistaa  varmentajalle Let's&nbsp;Encrypt, että palvelin ohjaa yhtä tai useampaa toimialueita.  Tämä on samanlainen kuin perinteinen varmentajan prosessi, jossa luodaan tili ja siihen lisätään toimialueita.

Prosessin käynnistämiseksi agentti kysyy varmentajalta Let's Encrypt, mitä sen on tehtävä osoittaakseen, että se hallitsee `esimerkki.com`:ta.  Varmentaja Let's Encrypt tarkastelee pyydettyä toimialuetta ja luo yhden tai useamman sarjan haasteita.   Nämä ovat eri tapoja, joilla agentti voi todistaa toimialueen hallinnan.  Varmentaja voi esimerkiksi antaa agentille valita jommankumman seuraavista:

* DNS-tietueen varustaminen `esimerkki.com`:n alla tai
* HTTP-resurssin varustaminen hyvin tunnetun URI:n alla `esimerkki.com`:ssa

Haasteiden ohella varmentaja Let's Encrypt tarjoaa myös nonce:n, joka agentin on allekirjoitettava yksityisellä avainparillaan todistaakseen, että se hallitsee avainparia.

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Agenttiohjelmisto toteuttaa yhden tarjotuista sarjoista haasteita.   Oletetaan, että se pystyy suorittamaan toisen yllä olevan tehtävän: se luo tiedoston määritettyyn polkuun `http://esimerkki.com`:lle.  Agentti allekirjoittaa myös toimitetun nonce:n yksityisellä avaimellaan.  Kun agentti on suorittanut nämä vaiheet, se ilmoittaa varmentajalle, että on valmis suorittamaan vahvistuksen.

Sitten on varmentajan tehtävä tarkistaa, että haasteet on täytetty.  Varmentaja tarkistaa allekirjoituksen nonce:ssa ja yrittää ladata tiedoston verkkopalvelimelta ja varmistaa, että siinä on odotettu sisältö.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Jos allekirjoitus nonce:n välityksellä on kelvollinen ja haasteet kuitataan, sitten julkisella avaimella tunnistettu agentti on valtuutettu hallitsemaan `esimerkki.com`:n varmenteita.  Kutsumme agentiin käyttämää avainparia "valtuutetuksi avainpariksi" `esimerkki.com`:een.


## Varmenteen myöntäminen ja kumoaminen

Kun agentilla on valtuutettu avainpari, varmenteiden pyytäminen, uusiminen ja kumoaminen on helppoa – on vain lähetettävä varmenteenhallintaviestit ja allekirjoita ne valtuutetulla avainparilla.

Saadakseen varmenteen toimialueelle agentti muodostaa PKCS#10 [sertifikaatin allekirjoituspyynnön](https://tools.ietf.org/html/rfc2986), joka pyytää varmentajalta Let's&nbsp;Encrypt myöntämään varmenteen `esimerkki.com`:lle tietyllä julkisella avaimella.  Kuten tavallista, CSR sisältää allekirjoituksen yksityisellä avaimella, joka vastaa CSR:n julkista avainta.  Agentti allekirjoittaa myös koko CSR:n valtuutetulla avaimella `esimerkki.com`:lle, jotta varmentaja Let's&nbsp;Encrypt tietää, että se on valtuutettu.

Kun Let's&nbsp;Encrypt CA vastaanottaa pyynnön, se vahvistaa molemmat allekirjoitukset.  Jos kaikki näyttää hyvältä, se luo varmenteen `esimerkiksi.com`:lle CSR:n julkisella avaimella ja palauttaa sen agentille.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Kumoaminen toimii samalla tavalla.  Agentti allekirjoittaa peruutuspyynnön avainparilla, joka on valtuutettu toimialueelle `esimerkki.com`, ja varmentaja Let's&nbsp;Encrypt varmistaa, että pyyntö on valtuutettu.  Jos näin on, se julkaisee kumotustiedot normaaleihin kumotuskanaviin (eli OCSP:hen), jotta siihen luottavat osapuolet, kuten verkkoselaimet, voivat tietää, että niiden ei pitäisi hyväksyä kumottua varmennetta.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>



