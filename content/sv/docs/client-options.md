---
title: Klientimplementationer av ACME
slug: client-options
top_graphic: 1
lastmod: 2019-11-15
---

{{< clientslastmod >}}

Let's Encrypt använder ACME-protokollet för att verifiera att du kontrollerar
ett givet domännamn och för att utfärda ett certifikat till dig. För att erhålla
ett Let's Encrypt-certifikat behöver du välja en ACME-klientmjukvara att
använda.

ACME-klienterna nedan erbjuds av tredje part. Let's Encrypt kontrollerar eller
granskar inte tredjepartsklienter och kan inte garantera deras säkerhet eller
tillförlitlighet.

Det finns en del webbläsartillägg som innehåller en ACME-klient men vi listar
dem inte här eftersom de uppmanar till manuell certifikatförnyelse vilket ger en
dålig användarupplevelse och ökar risken för bortglömda förnyelser.

# Rekommenderad: Certbot

Vi rekommenderar att de flesta börjar med
[Certbot](https://certbot.eff.org/)-klienten. Den kan helt enkelt få tag i ett
certifikat åt dig och även hjälpa till att installera det om du vill. Den är
enkel att använda, fungerar på många operativsystem och har förträfflig
dokumentation.

Om Certbot inte uppfyller dina krav eller om du bara vill testa någon annan så
finns det många fler klienter att välja bland nedan, grupperade efter språk
eller miljö.

# ACMEv1 och ACMEv2

Let's Encrypt stöder API:et ACMEv2 som är kompatibelt med den [slutgiltiga
ACME-standarden](https://tools.ietf.org/html/rfc8555). Vi [fasar ut det äldre
API:et
ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/)
2020 och 2021. Alla klienter på denna lista stöder ACMEv2. Om du redan använder
någon klient på denna lista, se till att uppgradera till den senaste versionen.
Om klienten du använder inte finns listad nedan, kontakta de projektansvariga
eller byt till en annan klient.

Eventuella beskrivningar av klienterna och projekten nedan erbjuds endast på
engelska.

{{< clients libraries="Bibliotek" projects="Projekt som integrarar med Let's Encrypt" >}}

Python-modulen [acme](https://github.com/certbot/certbot/tree/master/acme) är en
del av Certbot, men används även av ett antal andra klienter och tillhandahålls
som ett separat paket via [PyPI](https://pypi.python.org/pypi/acme),
[Debian](https://packages.debian.org/search?keywords=python-acme),
[Ubuntu](https://launchpad.net/ubuntu/+source/python-acme),
[Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) och
andra distributioner.

{{< /clients >}}

# Lägg till din klient eller ditt projekt

Om du känner till någon ACME-klient eller ett projekt som integrerar Let's
Encrypts API ACMEv2 och som inte finns med på listan ovan, vänligen skicka in en
pull request till vårt [webbplatsrepo](https://github.com/letsencrypt/website/)
på GitHub där du uppdaterar filen `data/clients.json`.

Innan du skickar in en pull request, vänligen säkerställ att:

1. din klient respekterar {{<link "Let's Encrypts varumärkespolicy" "/trademarks" >}}
1. din klient inte är webbläsarbaserad och att den stöder automatisk förnyelse
1. din commit lägger till din klient **sist** i relevant sektion (glöm inte
   `acme_v2` om det är lämpligt!)
1. din commit uppdaterar datumfältet `lastmod` i toppen av `clients.json`
