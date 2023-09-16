---
title: ACME-protokollapäivitykset
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---


[IETF-standardoitu](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME-protokolla, [RFC 8555](https:// datatracker.ietf.org/doc/rfc8555/) on Let's Encryptin toiminnan kulmakivi.

# Sovelluksen rajapinnan päätepisteet

Tällä hetkellä meillä on seuraavat API-päätepisteet. Katso [poikkeavuuksia koskeva dokumentaatiomme](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), jotta voit verrata niiden toteutusta ACME-spesifikaatioihin.

## ACME versio 2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME versio 1 (poistettu käytöstä)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`

# Uudet taaksepäin yhteensopivat ACME-ominaisuudet

Ajoittain Let's Encrypt voi ottaa käyttöön uusia taaksepäin yhteensopivia ominaisuuksia olemassa oleviin API päätepisteisiin. Tyypillisesti uusia taaksepäin yhteensopivia ominaisuuksia otetaan käyttöön, koska olemme päättäneet ottaa käyttöön osan ACME-spesifikaatiosta, jota emme olleet aiemmin ottaneet käyttöön.

Kun uusia ominaisuuksia tuodaan olemassa oleviin API-päätepisteisiin, ominaisuudet määritellään aina selkeästi julkisessa ACME-spesifikaatiossa, eivätkä ne riko oikein toteutettuja asiakkaita.

# ACME: n uudet versiot rikkoutuvilla muutoksilla

Emme aio tehdä murtavia muutoksia ACME-tukeen, mutta jos koemme sen tarpeelliseksi, pyrimme varmistamaan sujuvan siirtymisen riittävän ajan kuluessa ja kommunikoimaan mahdollisimman paljon etukäteen. Järjestelmänvalvojien tulee säilyttää kyky ottaa käyttöön oikea-aikaisia ​​päivityksiä ACME-asiakkailleen, jos murtava muutos on tarpeen.
