---
title: Återkallande av certifikat
slug: revoking
date: 2017-06-08
lastmod: 2021-08-03
show_lastmod: 1
---


När ett certifikats privata nyckel inte längre är i säkert förvar ska du återkalla certifikatet. Detta kan hända av olika anledningar. Exempelvis kan du råka dela den privata nyckeln på en publik webbplats, attackerare kan ha kopierat den privata nyckeln från dina servrar eller så kan attackerare ha tagit temporär kontroll över dina servrar eller din DNS-konfiguration och använt detta för att utfärda ett certifikat för vilket de innehar den privata nyckeln.

När du återkallar ett Let's Encrypt-certifikat kommer Let's Encrypt att publicera information om återkallelsen genom [Online Certificate Status Protocol (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) och vissa webbläsare kommer genom OCSP att kontrollera om de ska lita på certifikatet. Notera att OCSP [har några grundläggande problem (engelska)](https://www.imperialviolet.org/2011/03/18/revocation.html), så alla webbläsare kommer inte att utföra denna kontroll. Det är dock fortfarande en viktig rutin att återkalla certifikat vars privata nycklar har läckt och det krävs av Let's Encrypts [användaravtal](/repository).

För att återkalla ett certifikat med Let's Encrypt använder du [ACME-API:et](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md), mest troligt genom en ACME-klient som [Certbot](https://certbot.eff.org/). Du behöver bevisa för Let's Encrypt att du är auktoriserad att återkalla certifikatet. Det finns tre sätt att göra det:

# Från kontot som utfärdade certifikatet

Om det var du som utfärdade certifikatet och du fortfarande har kontroll över kontot som användes för att göra det, kan du återkalla certifikatet med hjälp av dina inloggningsuppgifter. Certbot försöker detta som standard. Exempel:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem --reason keycompromise
```

# Med hjälp av certifikatets privata nyckel

Om det inte var du som ursprungligen utfärdade certifikatet men du har en kopia av dess privata nyckel kan du återkalla det med hjälp av att signera en återkallelsebegäran med den nyckeln. Om du exempelvis ser att en privat nyckel av misstag blivit publik kan du använda denna metod för att återkalla certifikat som använder den privata nyckeln även om det inte var du som ursprungligen utfärdade dessa certifikat.

För att använda denna metod behöver du först ladda ner certifikatet som ska återkallas. Let's Encrypt publicerar alla certifikat till [certifikattransparens](https://www.certificate-transparency.org/)-loggar, så du kan hitta och ladda ner certifikat från en loggövervakare såsom [crt.sh](https://crt.sh/).

Du behöver också en kopia av den privata nyckeln i PEM-format. När du väl har dessa saker kan du återkalla certifikatet så här:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem --reason keycompromise
```

# Från ett annat behörigt konto

Om någon utfärdade ett certifikat efter att ha komprometterat din server eller din DNS så vill du återkalla certifikatet när du väl återtagit kontrollen. För att återkalla certifikatet behöver Let's Encrypt säkerställa att du kontrollerar domännamnen i certifikatet (annars hade folk kunnat återkalla varandras certifikat utan tillåtelse)! För att validera denna kontroll använder Let's Encrypt samma metoder som används för att verifiera ägarskap vid utfärdande: du kan placera ett [värde i en TXT-DNS-post](https://tools.ietf.org/html/rfc8555#section-8.4) eller placera en [fil på en HTTP-server](https://tools.ietf.org/html/rfc8555#section-8.3). Generellt sett kommer en ACME-klient att hantera detta åt dig. Notera att de flesta ACME-klienter kombinerar validering och utfärdande så det enda sättet att begära validering är genom att försöka utfärda ett certifikat. Du kan sen återkalla det resulterande certifikatet om du inte vill ha det, eller helt enkelt förstöra den privata nyckeln. Om du vill undvika att utfärda ett certifikat över huvud taget så kan du inkludera ett icke-existerande domännamn på din kommandorad, vilket kommer resultera i att utfärdandet misslyckas men domännamnen som finns valideras ändå. För att göra detta, kör:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

och följ instruktionerna. Om du föredrar att validera med hjälp av HTTP istället för DNS så ersätt `--preferred-challenges=dns` med `--preferred-challenges=http`.

När du väl har validerat kontrollen över domännamnen i certifikatet du vill återkalla kan du ladda ner certifikatet från [crt.sh](https://crt.sh/) och sen fortsätta återkallelsen som om du själv hade utfärdat det:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem --reason keycompromise
```
