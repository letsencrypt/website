---
title: ACME-asiakkaan toteutukset
slug: client-options
lastmod: 2020-12-18
---

{{< clientslastmod >}}

Let's Encrypt käyttää ACME-protokollaa varmistaakseen, että hallitset tiettyä toimialueen nimeä, ja myöntääkseen sinulle varmenteen. Saadaksesi Let's Encrypt -varmenteen sinun on valittava käytettävä ACME-asiakasohjelmisto.

Alla olevat ACME-asiakkaat ovat kolmansien osapuolien tarjoamia. Let's Encrypt ei valvo tai arvioi kolmannen osapuolen asiakkaita eikä voi taata niiden turvallisuuttaan tai luotettavuuttaan.

Joitakin selaimen sisäisiä ACME-asiakkaita on saatavilla, mutta emme luettele niitä tässä, koska ne kannustavat manuaaliseen uusimiseen, mikä johtaa huonoon käyttökokemukseen ja lisää uusimisten epäonnistumisen riskiä.

# Suositeltu: Certbot

Suosittelemme, että useimmat ihmiset aloittavat kokemuksensa [Certbot](https://certbot.eff.org/)-asiakassovelluksella. Se voi yksinkertaisesti hankkia sinulle varmenteen tai myös auttaa sinua asentamaan, riippuen siitä, mitä haluat. Se on helppokäyttöinen, toimii monissa käyttöjärjestelmissä ja siinä on hyvä dokumentaatio.

Jos Certbot ei täytä tarpeitasi tai haluat vain kokeilla jotain muuta, alla on monia muita asiakkaita, joista valita, ne on ryhmitelty kielen tai niitä tukevan ympäristön mukaan.

# Muut asiakasvaihtoehdot

Kaikki seuraavat asiakkaat tukevat ACMEv2 API:ta ([RFC 8555](https://tools.ietf.org/html/rfc8555)). Lopetamme pian kokonaan [ACMEv1:n tuen](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/). Jos käytät jo jotakin alla olevista asiakasohjelmista, muista päivittää uusimpaan versioon. Jos käyttämääsi asiakasohjelmaa ei ole listattu alla, se ei välttämättä tue ACMEv2: ta, jolloin suosittelemme ottamaan yhteyttä projektin ylläpitäjiin tai vaihtamaan toiseen asiakasohjelmaan.

{{< clients libraries="Kirjastot" projects="Let's Encryptiin integroitavat projektit" >}}

Pythonin [acme](https://github.com/certbot/certbot/tree/master/acme)-moduuli on osa Certbotia, mutta sitä käyttävät myös monet muut asiakkaat ja se on saatavilla erillisenä pakettina [PyPI](https://pypi.python.org/pypi/acme):n, [Debian](https://packages.debian.org/search?keywords= python-acme):n, [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme):n, [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme):n ja muiden jakelujen kautta.

{{< /clients >}}

# Asiakkaan/projektin lisääminen

Jos tiedät ACME-asiakkaasta tai projektista, joka on integroitu Let's Encryptin ACMEv2 API:een ja jota ei ole yllä olevalla sivulla, lähetä vetopyyntö [verkkosivuston tietovarastoomme](https://github.com/letsencrypt/website/) GitHubissa päivittämällä `data/clients.json`-tiedoston.

Ennen vetopyynnön lähettämistä ole hyvä ja varmista:

1. Asiakas kunnioittaa [Let's Encrypt tavaramerkkikäytäntöä](/trademarks).
1. Asiakas ei ole verkkoselainpohjainen ja tukee automaattista uusimista.
1. Sitoumuksesi lisää asiakkaasi asianmukaisten osioiden **loppuun** (älä unohda "acme_v2" tarvittaessa.).
1. Sitoumuksesi päivittää päivämääräleiman `lastmod` `clients.json`:n yläosassa.+
