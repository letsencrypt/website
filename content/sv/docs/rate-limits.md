---
title: Frekvensbegränsningar
slug: rate-limits
lastmod: 2026-08-05
show_lastmod: true
---

Let's Encrypt har taktbegränsningar för att säkerställa rättvis användning av
så många personer som möjligt. Vi tror att dessa gränser är tillräckligt höga
för att räcka som standard för de flesta. Vi har även designat dem så att
förnyelse av certifikat nästan aldrig påverkas av en taktbegränsning och så att
stora organisationer gradvis kan öka antalet certifikat de ger ut utan att
behöva handpåläggning från Let's Encrypt.

Om du aktivt utvecklar eller testar en Let's Encrypt-klient, vänligen använd vår [stagingmiljö](/docs/staging-environment) istället för produktions-API:et. Om du arbetar med att integrera Let's Encrypt som leverantör eller med en stor webbplats, vänligen granska vår [Integrationsguide](/docs/integration-guide).

# Hur våra frekvensbegränsningar fungerar

Gränser beräknas per förfrågan med hjälp av en [token bucket](https://en.wikipedia.org/wiki/Token_bucket)-algoritm. Denna metod ger flexibilitet i hur du använder dina tilldelade förfrågningar. Du kan antingen göra förfrågningar i omgångar—upp till hela gränsen—eller sprida ut dina förfrågningar för att undvika risken att begränsas.

Om du har nått en frekvensbegränsning kan vi inte återställa den tillfälligt. Oroa dig inte, din kapacitet för den begränsningen fylls gradvis över tid, vilket gör att du kan göra fler förfrågningar utan ytterligare åtgärder från din sida. Återkallande av certifikat återställer **inte** frekvensbegränsningar, eftersom resurserna som används för att utfärda dessa certifikat redan har förbrukats. För mer information, se [Försök igen efter att ha nått frekvensbegränsningar](#retrying-after-hitting-rate-limits).

# Gränser för kontoregistrering

Följande gränser gäller när prenumeranter begär ett nytt konto med den nya-konto API-slutpunkten. Att överskrida dessa gränser är mycket ovanligt. Vi rekommenderar att stora integratörer föredrar en design som [använder ett konto för många kunder](/docs/integration-guide).

<div class="boxed">

## Nya registreringar per IP-adress

Upp till 10 konton kan skapas från en enda IP-adress varje 3 timmar. Möjligheten att skapa nya konton fylls på med hastigheten 1 konto var 18:e minut.

### Åsidosättande

Vi erbjuder **inte** undantag för denna gräns.

</div>
<div class="boxed">

## Nya registreringar per IPv6-intervall

Upp till 500 konton kan skapas från ett enda /48 IPv6-subnät var tredje timme.
Möjligheten att skapa nya konton fylls på med en frekvens av 1 konto var 22:a sekund.

### Åsidosättande

Vi erbjuder **inte** undantag för denna gräns.

</div>

# Gränser för certifikatutfärdande

Följande begränsningar gäller när prenumeranter begär ett nytt certifikat med hjälp av `new-order` API:s endpoint. Att överskrida dessa gränser är vanligare, särskilt för stora hostingleverantörer eller organisationer som utfärdar certifikat för många värdnamn.

<div class="boxed">

## Nya beställningar per konto

Varje gång du begär ett certifikat från Let's Encrypt skapas en ny order.
Ett enda certifikat kan innehålla upp till 100 identifierare (DNS-namn eller IP-adresser) beroende på det valda [certifikatsprofilen](/docs/profiles/). Av prestandaskäl är det bättre att använda färre identifierare per certifikat när du kan.

### Gräns

Upp till 300 nya beställningar kan skapas av ett enda konto var tredje timme. Möjligheten att skapa nya beställningar fylls på med en takt av 1 beställning var 36:e sekund.

### Åsidosättande

För att överskrida denna gräns måste du [begära en överskrivning](https://isrg.formstack.com/forms/rate_limit_adjustment_request) för ett specifikt konto.

</div>
<div class="boxed">

## Nya certifikat per registrerad domän

En registrerad domän är, generellt sett, den del av domänen du köpt från din domännamnsregistrator. Till exempel är den registrerade domänen i `www.example.com` `example.com`. I `new.blog.example.co.uk` är den registrerade domänen `example.co.uk`. Vi använder [Public Suffix List](https://publicsuffix.org/) för att identifiera registrerade domäner.

Om du begär ett certifikat för en IP-adress försöker vi också behandla den vanligaste tilldelningen (det du får från din ISP eller hosting-leverantör) som det "registrerade domännamnet." För IPv4-adresser behandlar vi den exakta adressen som det registrerade domännamnet. För IPv6-adresser behandlar vi den inkluderande /64-intervallet som det registrerade domännamnet.

Du kan få en lista över certifikat utfärdade för din registrerade domän genom att söka på [crt.sh](https://crt.sh/) eller [Censys](https://search.censys.io/#), som använder de offentliga [Certificate Transparency](https://www.certificate-transparency.org/)-loggarna.

### Gräns

Upp till 50 certifikat kan utfärdas per registrerat domännamn (eller IPv4-adress, eller IPv6 /64-intervall) var 7:e dag. Detta är en global gräns, och alla nya beställningsförfrågningar, oavsett vilket konto som skickar dem, räknas mot denna gräns.
Möjligheten att utfärda nya certifikat för samma registrerade domän fylls på i en takt av 1 certifikat var 202:e minut.

### Åsidosättande

För att överskrida denna gräns måste du [begära en överskrivning](https://isrg.formstack.com/forms/rate_limit_adjustment_request) för den specifika registrerade domänen eller ett konto.

</div>
<div class="boxed">

## Nya certifikat per exakt uppsättning identifierare

Om du begär ett certifikat för `192.168.1.1`, `example.com` och `login.example.com`, är "den exakta uppsättningen identifierare" `[192.168.1.1,
example.com, login.example.com]`. Om du begär ett certifikat för endast 1 identifierare, såsom `example.co.uk`, skulle den exakta uppsättningen identifierare vara `[example.co.uk]`.

### Gräns

Upp till 5 certifikat kan utfärdas per exakt samma uppsättning identifierare var 7:e dag. Detta är en global gräns, och alla nya beställningsförfrågningar, oavsett vilket konto som skickar dem, räknas mot denna gräns. Möjligheten att begära nya certifikat för samma exakt uppsättning identifierare fylls på i en takt av 1 certifikat var 34:e timme.

### Vanliga orsaker

Att installera om din klient flera gånger för att felsöka ett okänt fel, eller att ta bort din ACME-klients konfigurationsdata varje gång du distribuerar din applikation, är vanliga sätt att nå denna gräns. Vi har medvetet satt denna gräns relativt låg för att förhindra att buggiga system eller mjukvara under utveckling snabbt förbrukar kapaciteten hos andra frekvensbegränsningar.

När du testar eller felsöker dina program rekommenderar vi att du ställer in klienten på att använda vår [testmiljö](/docs/staging-environment), som har [betydligt högre gränser](/docs/staging-environment/#rate-limits).

### Lösningslösning

Om du har nått denna gräns kan du ändra uppsättningen identifierare genom att lägga till `blog.example.com` för att begära ytterligare certifikat. Var medveten om att dessa nya order inte skulle räknas som förnyelser. Därför skulle de omfattas av [Nya order per konto](#new-orders-per-account) och [Nya certifikat per registrerad domän](#new-certificates-per-registered-domain)-hastighetsgränserna.

### Åsidosättande

Vi erbjuder **inte** undantag för denna gräns.

</div>
<div class="boxed">

## Auktoriseringsfel per identifierare per konto

En auktorisering skapas för varje identifierare (DNS-namn eller IP-adress) som ingår i en beställning. Innan ett certifikat kan utfärdas måste alla auktoriseringar i beställningen valideras framgångsrikt. En misslyckad auktorisering betyder att, även om begäran om validering skickades framgångsrikt, har alla Let's Encrypts försök att validera kontrollen över identifieraren misslyckats.

### Gräns

Upp till 5 auktoriseringsfel per identifierare kan uppstå för ett konto varje timme. Möjligheten att orsaka auktoriseringsfel fylls på i en takt av 1 per identifierare var 12:e minut. När den överskrids upprätthålls denna gräns genom att förhindra alla nya beställningar för samma identifierare, av samma konto, tills gränsen återställs.

### Vanliga orsaker

Innan du börjar felsöka rekommenderar vi att du ställer in klienten på att använda vår [testmiljö](/docs/staging-environment). Denna miljö har [betydligt högre](/docs/staging-environment/#rate-limits) gränser, vilket kan hjälpa dig att identifiera och lösa problem utan att förbruka dina produktionsgränser.

- Valideringsfel vid användning av `HTTP-01`- och `TLS-ALPN-01`-metoder uppstår vanligtvis från nätverks- eller brandväggskonfigurationer som hindrar Let's Encrypt valideringsservrar från att nå din server.

- Valideringsfel vid användning av `DNS-01`-metoden beror ofta på missade steg eller stavfel under den initiala installationsprocessen. Vanligtvis kräver denna valideringsmetod att du skapar en CNAME-post i din huvudsakliga DNS-zon, vilket gör att din klient kan ställa in nödvändiga DNS-poster under valideringsprocessen.

### Åsidosättande

Vi erbjuder **inte** undantag för denna gräns.

</div>
<div class="boxed">

## På varandra följande auktoriseringsfel per identifierare per konto

Liknande [Auktorisationsfel per identifierare per konto](#authorization-failures-per-identifier-per-account) men gäller endast för på varandra följande fel. Denna gräns är utformad för att förhindra att klienter fastnar för evigt i en loop av misslyckade valideringar.

### Gräns

Upp till 1 152 följande auktoriseringsfel per identifierare kan inträffa för ett konto. Möjligheten att orsaka auktorisationsfel fylls på med en frekvens av 1 per identifierare varje dag och återställs till noll om en auktorisation för den identifieraren valideras framgångsrikt. När det har överskridits hindras kontot från att begära nya certifikat för den identifieraren. Varje gång prenumeranten försöker begära ett certifikat får de ett felmeddelande som innehåller en länk till vår Self-Service Portal där de kan ångra utfärdandet av den pausade identifieraren och upp till 49 999 ytterligare pausade identifierare kopplade till deras konto.

| Misslyckanden per dag | Dags att pausa                              |
| --------------------- | ------------------------------------------- |
| 1                     | ∞ (pausade aldrig)       |
| 2                     | 1,152 dagar (3,16 år)    |
| 5                     | 288 dagar (9,46 månader) |
| 10                    | 128 dagar (4,21 månader) |
| 15                    | 82 dagar (2,70 månader)  |
| 20                    | 61 dagar (1,99 månader)  |
| 30                    | 40 dagar                                    |
| 40                    | 30 dagar                                    |
| 120                   | 10 dagar                                    |

### Vanliga orsaker

Innan du börjar felsöka rekommenderar vi att du ställer in klienten på att använda vår [testmiljö](/docs/staging-environment). Denna miljö har [betydligt högre](/docs/staging-environment/#rate-limits) gränser, vilket kan hjälpa dig att identifiera och lösa problem utan att förbruka dina produktionsgränser.

- Valideringsfel vid användning av `HTTP-01`- och `TLS-ALPN-01`-metoder uppstår vanligtvis från nätverks- eller brandväggskonfigurationer som hindrar Let's Encrypt valideringsservrar från att nå din server.

- Valideringsfel vid användning av `DNS-01`-metoden beror ofta på missade steg eller stavfel under den initiala installationsprocessen. Vanligtvis kräver denna valideringsmetod att du skapar en CNAME-post i din huvudsakliga DNS-zon, vilket gör att din klient kan ställa in nödvändiga DNS-poster under valideringsprocessen.

### Åsidosättande

Vi erbjuder **inte** undantag för denna gräns.

</div>

# Övergripande begränsning för förfrågningar

Utöver våra [kontoregistrering](#account-registration-limits) och [certifikatutfärdande](#certificate-issuance-limits)-gränser finns det totala gränser per endpoint som gäller per IP-adress. Dessa upprätthålls av våra lastbalanserare och är utformade för att skydda ACME-API:et från att bli överväldigat av klienter som gör för många förfrågningar samtidigt.

| Slutpunkt          | Förfrågningar per IP (per sekund) | Burstkapacitet |
| ------------------ | ---------------------------------------------------- | -------------- |
| /acme/new-nonce    | 20                                                   | 10             |
| /acme/new-account  | 5                                                    | 15             |
| /acme/new-order    | 300                                                  | 200            |
| /acme/revoke-cert  | 10                                                   | 100            |
| /acme/renewal-info | 1000                                                 | 100            |
| /acme/\*           | 250                                                  | 125            |
| /directory         | 40                                                   | 40             |

Prenumeranter som överskrider dessa gränser får en `503 Service Unavailable` HTTP-svarskod. Svaret kommer att innehålla en `Retry-After` rubrik.

# Begränsningsundantag för förnyelser

Let's Encrypt känner igen en ny certifikatorder som en "förnyelse" på två sätt: den föredragna metoden är ACME Renewal Information (ARI), som är undantagen från alla frekvensbegränsningar, och den andra förlitar sig på äldre förnyelsedetekteringslogik som betraktar order med exakt samma uppsättning identifierare som förnyelser men ändå kan omfattas av vissa frekvensbegränsningar.

## ARI-förnyelser

Förnyelser som samordnas av ARI ger den unika fördelen att vara undantagna från alla prisbegränsningar. Klienter som stödjer ARI kontrollerar regelbundet med Let's Encrypt servrar för att avgöra om ditt befintliga certifikat bör förnyas. När det optimala förnyelsefönstret nås begär klienten en ny order som uttryckligen anger vilket certifikat den ersätter. Om den nya ordern innehåller minst en identifierare som matchar det certifikat som avses ersätta och certifikatet inte tidigare har ersatts med ARI, kommer ordern inte att omfattas av några frekvensbegränsningar.

## Icke-ARI-förnyelser

Om din klient eller hostingleverantör ännu inte har lagt till stöd för ARI kan din beställning ändå betraktas som en förnyelse av ett tidigare certifikat om det innehåller exakt samma uppsättning identifierare, utan att ta hänsyn till versaler och ordning på identifierare. Till exempel, om du begärde ett certifikat för identifierarna `[192.168.1.1, www.example.com, example.com]`, kan du begära fyra ytterligare certifikat för `[192.168.1.1, www.example.com, example.com]` innan du når gränsen för [Nya certifikat per exakt uppsättning identifierare](#new-certificates-per-exact-set-of-identifiers). Var och en av dessa nya order skulle betraktas som förnyelser och skulle vara undantagna från [Nya order per konto](#new-orders-per-account) och [Nya certifikat per registrerad domän](#new-certificates-per-registered-domain)-hastighetsgränserna.
Dock, till skillnad från ARI-förnyelser, skulle dessa order fortfarande omfattas av [Auktorisationsfel per identifierare per konto](#authorization-failures-per-identifier-per-account) och [Nya certifikat per exakt uppsättning identifierare](#new-certificates-per-exact-set-of-identifiers).

# Försöker igen efter att ha nått frekvensbegränsningar

Alla våra felmeddelanden om frekvensbegränsning följer samma format. Till exempel:

```
too many new registrations (10) from this IP address in the last 3h0m0s,
retry after 1970-01-01 00:18:15 UTC.
```

Du bör kunna göra samma begäran efter det angivna datumet och tiden. Om din begäran överskrider kapaciteten hos mer än en av våra gränser, kommer vi alltid att returnera felmeddelandet för den gräns som återställs längst in i framtiden.

## Omvändnings-efter-header

Vi inkluderar en `Retry-After` header i alla felsteg i frekvensbegränsningen, som anger hur länge din klient bör vänta innan han försöker igen.

# Begär en överskrivning

Om du är en stor hostingleverantör eller organisation som arbetar med en Let's Encrypt-integration har vi ett [prisbegränsande formulär](https://isrg.formstack.com/forms/rate_limit_adjustment_request) som kan användas för att begära högre prisgränser. Det tar några veckor att behandla
förfrågningar så formuläret är inte lämpligt att använda om ni bara vill
återställa en gräns snabbare än den återställs på egen hand.
