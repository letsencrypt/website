---
title: Certifikatauktorisering (CAA)
slug: caa
lastmod: 2023-08-16
show_lastmod: 1
---


CAA är en typ av DNS-post som låter webbplatsägare specificera vilka certifikatsutfärdare (CAs) som får utfärda certifikat innehållande deras domännamn. Det standardiserades först 2013, och versionen vi använder idag standardiserades 2019 av [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659) och [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657). Som standard får varje offentlig CA utfärda certifikat för alla domännamn i den offentliga DNS, förutsatt att de validerar kontroll över det domännamnet. Det innebär att ett fel i valideringsprocessen hos någon av de många offentliga certifikatutfärdarna kan påverka alla domännamn. CAA är ett sätt för domäninnehavare att minska den risken.

# Användning av CAA

Om du inte bryr dig om CAA behöver du i allmänhet inte göra något (men se CAA fel nedan). Om du vill använda CAA för att begränsa vilka certifikatsutfärdare som får utfärda certifikat för din domän, måste du använda en DNS-leverantör som stöder inställning av CAA-poster. Kolla [SSLMates CAA-sida](https://sslmate.com/caa/support) för en lista över sådana leverantörer. Om din leverantör finns med i listan kan du använda [SSLMates CAA-postgenerator](https://sslmate.com/caa/) för att skapa CAA-poster som anger vilka certifikatutfärdare du vill tillåta.

## Var man ska placera posten

Generellt vill du sätta CAA-poster på din registrerade domän (såsom "example.org" eller "mysite.co.uk"). På detta sätt gäller de både för den domänen och alla underdomäner du skapar under den, såsom "community.example.org".

Observera att CA alltid kommer att respektera den CAA-post *närmast* det domännamn det utfärdar ett certifikat för. Så om du begär ett certifikat för "www.community.example.org", kommer CA:n att kontrollera "www.community.example.org", sedan "community.example.org", sedan "example.org", och stoppa vid den första CAA-posten som hittas.

Detta betyder att du kan åsidosätta CAA för underdomäner. Anta till exempel att du själv är värd för ”example.org”, men har ”api.example.org” hos en molnleverantör. Du kan använda en CAA-post på "example.org" för att säga att endast Let's Encrypt kan utfärda för den domänen och alla dess underdomäner, men också använda en CAA-post på "api.example.org" för att åsidosätta det och tillåta molnleverantören att utfärda certifikat för just den underdomänen.

Observera också att CAA-kontroller följer CNAME-omdirigeringar, precis som alla andra DNS-förfrågningar. Om "community.example.org" är ett CNAME till "example.forum.com", kommer CA:n att respektera eventuella CAA-poster som är inställda på "example.forum.com". Det är inte tillåtet för ett domännamn med en CNAME-post att ha några andra poster, så det kan inte uppstå konflikter mellan CAA-poster på det ursprungliga namnet och CAA-poster på målet för omdirigeringen.

## Vad man ska sätta i posten

Alla CAA-poster följer samma grundläggande format:

```
CAA <flags> <tag> <value>
```

FLAGGAN **** är bara ett heltal och bör nästan alltid bara vara heltalet `0`, vilket indikerar att inga flaggor har satts. Om du vill kan du sätta flaggorna till heltalet `128`, vilket indikerar att "kritisk bit" har satts, och att CA:er omedelbart bör stoppa och inte utfärda ett certifikat om de inte känner igen innehållet i taggfältet.

TAGGEN **** är en sträng som anger vilken typ av CAA-post detta är: antingen `issue` eller `issuewild` i de flesta fall. Mer om dessa nedan.

Slutligen är VÄRDET **** en sträng som innehåller högst en CA-identifierare (till exempel "letsencrypt.org") och några valfria semikolonseparerade parametrar, även diskuterade nedan.

### EGENSKAPERNA `issue` och `issuewild`

Poster med taggen `issue` styr helt enkelt om en CA kan utfärda certifikat för denna domän och dess underdomäner. Generellt är detta den enda posten du behöver, eftersom den styr både normal (t.ex. "example.org") och wildcard (t.ex. "*.example.org") utfärdande i avsaknad av andra poster. Du styr vilken CA som kan utfärda för denna domän genom att sätta den CA:ns identifierande domännamn i värdedelen av CAA-posten.

Poster med `issuewild`-taggen styr om en CA kan utfärda *wildcard*-certifikat (t.ex. "*.example.org"). Du behöver bara använda `issuewild`-poster om du vill ha olika behörigheter för utfärdande av wildcard- och icke-wildcard-certifikat.

Notera att du kan ha flera poster med samma egenskapstyp och de är *adderande*: om någon av dessa poster tillåter CA att utfärda, så är det tillåtet.

Let's Encrypts identifierande domännamn för CAA är `letsencrypt.org`. Detta är officiellt dokumenterat i [avsnitt 4.2.1 i vår CP/CPS](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions).

### `validationmethods`-parametern

Denna parameter kan placeras efter CA:s identifierande domännamn för att styra vilka valideringsmetoder den CA kan använda för att bekräfta kontroll över domänen. Detta kan användas för att begränsa validering till metoder som du litar mer på. Till exempel, om du vill begränsa CA till endast att använda TLS-ALPN-01-metoden, kan du lägga till `;validationmethods=tls-alpn-01` i värdet för din CAA-post.

Let's Encrypt känner igen följande valideringsmetodsträngar:

* `http-01`
* `dns-01`
* `tls-alpn-01`

### `accounturi`-parametern

Denna parameter kan placeras efter CA:s identifierande domännamn för att styra vilka ACME-konton som kan begära utfärdande för domänen. Detta kan användas för att säkerställa att någon som tillfälligt kapar din domän, men inte har tillgång till ditt ACME-kontonyckel, inte kan utfärda skadliga certifikat.

Let's Encrypts konto-URI:er ser ut som `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`, där siffrorna i slutet är ditt kontonummer.

### Exempel

En enkel CAA-post som tillåter Let's Encrypt att utfärda för "example.org" kan se ut så här:

```
example.org         CAA 0 issue "letsencrypt.org"
```

Ett mer komplext CAA-postset kan se ut så här:

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

I detta exempel kan MyCA utfärda för "example.org", men endast med DNS-01-valideringsmetoden. Det kan också utfärda wildcard-certifikat, med vilken valideringsmetod som helst. Slutligen kan OtherCA också utfärda certifikat, men endast om begäran kommer från kontonummer `123456`, och endast om OtherCA känner till och vet hur man korrekt hanterar `accounturi`-begränsningen.


# CAA-fel

Eftersom Let's Encrypt kontrollerar CAA-poster innan varje certifikat vi utfärdar, får vi ibland fel även för domäner som inte har ställt några CAA-poster. När vi får ett fel finns det inget sätt att avgöra om vi får utfärda för den påverkade domänen, eftersom det kan finnas CAA-poster som förbjuder utfärdande, men som inte är synliga på grund av felet.

Om du får CAA-relaterade fel kan du försöka några gånger till mot vår [testmiljö](/docs/staging-environment) för att avgöra om felen är tillfälliga eller permanenta. Om de är permanenta behöver du skicka in ett supportärende till din DNS-leverantör, eller byta leverantör. Om du inte är säker på vem din DNS-leverantör är, fråga din hosting-leverantör.

Vissa DNS-leverantörer som är obekanta med CAA svarar initialt på problemrapporter med "Vi stödjer inte CAA-poster." Din DNS-leverantör behöver inte specifikt stödja CAA-poster; den behöver bara svara med ett NOERROR-svar för okända frågetyper (inklusive CAA). Att returnera andra opkoder, inklusive NOTIMP, för oigenkända qtypes är ett brott mot [RFC 1035](https://tools.ietf.org/html/rfc1035) och måste åtgärdas.

## SERVFAIL

Ett av de vanligaste felen som folk stöter på är SERVFAIL. Vanligast indikerar detta att DNSSEC-validering har misslyckats. Om du får ett SERVFAIL-fel bör ditt första steg vara att använda en DNSSEC-debugger som [dnsviz.net](http://dnsviz.net/). Om det inte fungerar är det möjligt att dina namnservrar genererar felaktiga signaturer endast när svaret är tomt. Och CAA-svar är oftast tomma.  Till exempel hade PowerDNS [denna bugg i version 4.0.3 och lägre](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Om du inte har DNSSEC aktiverat och får ett SERVFAIL är den näst mest troliga orsaken att din auktoritativa namnserver returnerade NOTIMP, vilket som beskrivits ovan är ett RFC 1035-brott; den bör istället returnera NOERROR med ett tomt svar. Om detta är fallet, skicka in en bugg eller ett supportärende till din DNS-leverantör.

Slutligen kan SERVFAIL orsakas av driftstopp på dina auktoritativa namnservrar. Kontrollera NS-posterna för dina namnservrar och se till att varje server är tillgänglig.

## Tidsgräns

Ibland tar CAA-frågor slut på tid. Det vill säga, den auktoritativa namnservern svarar aldrig med något svar alls, även efter flera försök. Vanligast händer detta när din namnserver har en felkonfigurerad brandvägg framför sig som släpper DNS-frågor med okända qtypes. Skicka in ett supportärende till din DNS-leverantör och fråga dem om de har en sådan brandvägg konfigurerad.
