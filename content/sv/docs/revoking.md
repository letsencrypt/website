---
title: Återkalla certifikat
slug: revoking
lastmod: 2025-07-31
show_lastmod: 1
---


När ett certifikat inte längre är säkert att använda bör du återkalla det. Detta kan hända av några olika orsaker. Till exempel kan du av misstag dela den privata nyckeln på en offentlig webbplats; hackare kan kopiera den privata nyckeln från dina servrar; eller hackare kan tillfälligt ta kontroll över dina servrar eller din DNS-konfiguration, och använda det för att validera och utfärda ett certifikat för vilket de har den privata nyckeln.

När du återkallar ett Let's Encrypt-certifikat kan Let's Encrypt publicera återkallningsinformation i [Certifikatåterkallningslistor (CRL:er)](https://en.wikipedia.org/wiki/Certificate_revocation_list), och vissa webbläsare kommer att kontrollera CRL:er för att se om de ska lita på ett certifikat. Att återkalla certifikat som hör till komprometterade privata nycklar är viktig praxis och ett krav i Let's Encrypts [prenumerantavtal](/repository).

För att återkalla ett certifikat med Let's Encrypt, kommer du att använda [ACME API](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md), mest troligt genom en ACME-klient som [Certbot](https://certbot.eff.org/). Du behöver bevisa för Let’s Encrypt att du är auktoriserad att återkalla certifikatet. Det finns tre sätt att göra detta på: från det konto som utfärdade certifikatet, med ett annat auktoriserat konto, eller med certifikatets privata nyckel.

# Specificera en orsakskod

När man återkallar ett certifikat bör Let's Encrypt-prenumeranter välja en orsakskod enligt följande:

* Ingen anledning angiven eller `unspecified` (RFC 5280 CRLReason #0)
  - När nedanstående orsakskoder inte gäller för återkallelsen, får prenumeranten inte ange någon annan orsakskod än "unspecified".
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Certifikatabonnenten måste välja "keyCompromise" som återkallelseorsak när de har anledning att tro att certifikatets privata nyckel har komprometterats, t.ex. att en obehörig person har haft tillgång till certifikatets privata nyckel.
  - Om återkallelsebegäran är signerad med certifikatets privata nyckel, snarare än med abonnentkontots privata nyckel, kan Let's Encrypt ignorera återkallelseorsaken i begäran och sätta orsaken till "keyCompromise".
* `superseded` (RFC 5280 CRLReason #4)
  - Certifikatabonnenten bör välja "superseded" som återkallelseorsak när de begär ett nytt certifikat för att ersätta sitt befintliga certifikat.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Certifikatabonnenten bör välja "cessationOfOperation" som återkallelseorsak när de inte längre äger alla domännamn i certifikatet eller när de inte längre kommer att använda certifikatet eftersom de avslutar sin webbplats.
  - Om återkallelsebegäran kommer från ett abonnentkonto som inte beställde det aktuella certifikatet, men som har visat kontroll över alla identifierare i certifikatet, kan Let's Encrypt ignorera återkallelseorsaken i begäran och sätta orsaken till "cessationOfOperation".

Återkallelsebegäranden som anger någon annan orsakskod än de som beskrivs ovan kommer att avvisas.

# Från kontot som utfärdade certifikatet

Om du ursprungligen utfärdade certifikatet och fortfarande har kontroll över det konto du använde för att utfärda det, kan du återkalla det med dina kontouppgifter. Certbot försöker detta som standard. Exempel:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Från ett annat behörigt konto

Om någon utfärdade ett certifikat efter att ha komprometterat din host eller ditt DNS, vill du återkalla det certifikatet när du har återfått kontroll. För att återkalla certifikatet måste Let's Encrypt säkerställa att du kontrollerar domännamnen i det certifikatet (annars kan folk återkalla varandras certifikat utan tillstånd)!

För att validera denna kontroll använder Let's Encrypt samma metoder som den använder för att validera kontroll vid utfärdande: du kan sätta ett [-värde i en DNS TXT-post](https://tools.ietf.org/html/rfc8555#section-8.4) eller placera en [-fil på en HTTP-server](https://tools.ietf.org/html/rfc8555#section-8.3). Generellt hanterar en ACME-klient detta åt dig. Observera att de flesta ACME-klienter kombinerar validering och utfärdande, så det enda sättet att begära valideringar är att försöka utfärda. Du kan sedan återkalla det resulterande certifikatet om du inte vill ha det, eller helt enkelt förstöra den privata nyckeln.

Om du vill undvika att utfärda ett certifikat alls kan du inkludera ett icke-existerande domännamn i din kommandorad, vilket kommer att få utfärdandet att misslyckas medan de andra, existerande domännamnen fortfarande valideras. Exempel:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Och följ instruktionerna, och hoppa över valideringssteget för `nonexistent.${YOUR_DOMAIN}`. Om du föredrar att validera med HTTP snarare än DNS, ersätt `--preferred-challenges`-flaggan med `--preferred-challenges=http`. Observera att i många fall fungerar inte DNS-versionen av dessa steg om du ersätter `--manual` med ett certbot-plugin för att automatiskt uppfylla DNS-01-utmaningar, eftersom certbot gärna placerar en TXT-post på `_acme-challenge.nonexistent.${YOUR_DOMAIN}` om det har möjlighet att göra det.

När du har validerat kontrollen över alla domännamn i certifikatet du vill återkalla, kan du ladda ner certifikatet från [crt.sh](https://crt.sh/), och sedan fortsätta med att återkalla certifikatet som om du hade utfärdat det:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Med hjälp av certifikatets privata nyckel

Om du inte ursprungligen utfärdade certifikatet, men har en kopia av motsvarande privata nyckel, kan du återkalla genom att använda den privata nyckeln för att signera återkallelsebegäran. Till exempel, om du ser att en privat nyckel av misstag har gjorts offentlig, kan du använda denna metod för att återkalla certifikat som använde den privata nyckeln, även om du inte är personen som ursprungligen utfärdade dessa certifikat.

För att använda denna metod behöver du först en kopia av den privata nyckeln i PEM-format.

Sedan, om du inte redan har det, ladda ner certifikatet som ska återkallas. Let's Encrypt loggar alla certifikat till [Certificate Transparency](https://www.certificate-transparency.org/)-loggar, så du kan hitta och ladda ner certifikat från en loggmonitor som [crt.sh](https://crt.sh/). Att söka efter ett matchande `SubjectPublicKeyInfo` (SPKI)-fält kommer att hitta alla certifikat som använder den privata nyckeln. För att extrahera SPKI-hashen från en privat nyckel:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

När du har den privata nyckeln och certifikatet kan du återkalla certifikatet så här:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
