---
title: Taktbegränsningar
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2023-06-09
show_lastmod: 1
---


Let's Encrypt har taktbegränsningar för att säkerställa rättvis användning av
så många personer som möjligt. Vi tror att dessa gränser är tillräckligt höga
för att räcka som standard för de flesta. Vi har även designat dem så att
förnyelse av certifikat nästan aldrig påverkas av en taktbegränsning och så att
stora organisationer gradvis kan öka antalet certifikat de ger ut utan att
behöva handpåläggning från Let's Encrypt.

Om du aktivt utvecklar eller testar en Let's Encrypt-klient, vänligen använd
vår [testmiljö](/docs/staging-environment) istället för
produktions-API:et. Om du jobbar med att integrera Let's Encrypt som en
leverantör eller med en stor webbplats, vänligen se vår [integrationsguide](/docs/integration-guide).

Huvudgränsen är <a id="certificates-per-registered-domain"></a>**antal
certifikat per registrerad domän** (50 per vecka). Generellt är en registrerad
domän den domän du köpte från din domännamnsregistrator. Till exempel: i
domännamnet `www.example.com` är den registrerade domänen `example.com`. I
`new.blog.example.co.uk` är den registrerade domänen `example.co.uk`. Vi
använder den [publika suffixlistan](https://publicsuffix.org) för att räkna ut
den registrerade domänen.

Om du har många underdomäner kanske du vill kombinera dem i ett certifikat upp
till en gräns på 100 <a id="names-per-certificate"></a>**domännamn per
certifikat**. Tillsammans med ovanstående gräns betyder detta att du kan
utfärda certifikat som gäller för upp till 5000 unika underdomäner per vecka.
Ett certifikat med flera domännamn kallas ofta för SAN-certifikat eller ibland
för UCC-certifikat. Observera att på grund av prestanda- och pålitlighetsskäl
är det bättre att ha så få domännamn per certifikat så långt som möjligt.


Förnyelser hanteras annorlunda: de räknas inte mot din **antal certifikat per
registrerad domän**-gräns men de påverkas av en **certifikatdublett**-gräns på
5 per vecka. Notera att förnyelser påverkades av din antal certifikat per
registrerad domän-gräns till mars 2019 [men det gör de inte
längre](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

Ett certifikat räknas som en förnyelse (eller en dublett) av ett tidigare
certifikat on det innehåller exakt samma lista av domännamn fast där
versaler/gemener samt ordningen på domännamnen ignoreras. Om du exempelvis
begärde ett certifikat för namnen [`www.example.com`, `example.com`] kan du
begära fyra certifikat till för [`www.example.com`, `example.com`] under
veckan. Om du ändrar listan av domännamn genom att lägga till
[`blog.example.com`] får du möjlighet att begära ytterligare certifikat.

Hantering av förnyelser ignorerar vilken publik nyckel och vilka tillägg som
begärs. En certifikatbegäran kan räknas som en förnyelse även om du använder en
ny nyckel.

**Återkallande av certifikat återställer inte några taktbegränsningar**
eftersom resurserna som användes för att utfärda dessa certifikat redan har
utnyttjats.

Det finns en <a id="failed-validations"></a>**antal misslyckade
valideringar**-gräns på 5 misslyckaden per konto per domännamn per timme. Denna
gräns är högre i vår [testmiljö](/docs/staging-environment), så du
kan använda den miljön för att avlusa anslutningsproblem.

Ändpunkterna "new-reg", "new-authz" och "new-cert" på v1-API:et samt new-nonce",
"new-account", "new-order" och "revoke-cert" på v2-API:et har en <a
id="overall-requests"></a>**anropsgräns** på 20 per sekund. Ändpunkterna
"/directory" och "/acme" och deras underkataloger har en anropsgräns på 40 anrop
per sekund.

Det finns ytterligare två gränser som det är väldigt osannolikt att du påverkas av.

Du kan skapa maximalt 10 <a id="accounts-per-ip-address"></a>**konton per
IP-adress** under 3 timmar. Du kan skapa maximalt 500 **konton per IP-nätverk**
inom ett IPv6 /48-nät under 3 timmar. Att uppnå någon av dessa gränser är
väldigt sällsynt och vi rekommenderar att stora integratörer nyttjar en design
som [använder ett konto till flera kunder](/docs/integration-guide).

Du kan maximalt ha 300 <a id="pending-authorizations"></a>**väntande
auktorisationer** på ditt konto. Att nå denna gräns är sällsynt och händer
oftast när ACME-klienter utvecklas. Vanligtvis betyder det att din klient skapar
auktorisationer utan att fullborda dem. Använd vår [testmiljö](/docs/staging-environment) om du utvecklar en ACME-klient.

Användare av API:t ACMEv2 kan skapa maximalt 300 <a id="new-orders"></a>**nya
beställningar** per konto per 3 timmar. En ny beställning skapas varje gång du
begär ett certifikat från Boulder-CA:n, vilket innebär att en ny beställning
skapas i varje certifikatförfrågan.

# <a id="overrides"></a>Åsidosättande

Om du uppnått en gräns erbjuder vi inget sätt att temporärt återställa den. Du
måste vänta tills gränsen löper ut efter en vecka. Vi använder ett glidande
fönster, så om du utfärdar 25 certifikat på måndagen och ytterligare 25 på
fredagen så kommer du kunna utfärda nya certifikat från efterföljande måndag.
Du kan erhålla en lista över certifikat utfärdade för din registrerade domän
genom att [söka på crt.sh](https://crt.sh), vilken använder de publika
[certifikattransparens](https://www.certificate-transparency.org)loggarna.

Om ni är ett stort webbhotell eller en organisation som arbetar på en Let's
Encrypt-integration så har vi ett
[taktbegränsningsformulär](https://isrg.formstack.com/forms/rate_limit_adjustment_request) som kan
användas för att begära en högre gräns. Det tar några veckor att behandla
förfrågningar så formuläret är inte lämpligt att använda om ni bara vill
återställa en gräns snabbare än den återställs på egen hand.

Observera att de flesta webbhotell inte behöver några förhöjda gränser eftersom
det inte finns någon gräns på antalet unika registrerade domäner ni kan utfärda
certifikat för. Så länge de flesta av era kunder har färre än 2000 underdomäner
på en registrerad domän behöver ni troligtvis ingen höjning. Se vår
[integrationsguide](/docs/integration-guide) för fler råd.

# <a id="clearing-pending"></a>Rensa väntande auktorisationer

Om du har ett stort antal väntande auktorisationsobjekt och får ett
taktbegränsningsfel kan du initiera ett valideringsförsök för dessa
auktorisationsobjekt genom att skicka ett JWS-signerat POST-anrop för en av
dess utmaningar enligt beskrivningen i
[ACME-specifikationen](https://tools.ietf.org/html/rfc8555#section-7.5.1). De
väntande auktorisationsobjekten representeras av URL:er på formen
`https://acme-v02.api.letsencrypt.org/acme/authz/XYZ` och bör dyka upp i dina
klientloggar. Notera att det inte spelar någon roll om valideringen lyckas
eller ej. Båda utfallen kommer ta auktorisationen ut ur väntetillståndet. Om du
inte har loggar som innehåller relevanta auktorisations-URL:er så måste du
vänta tills taktbegränsningen löper ut. Som beskrivs ovan så finns det ett
glidande fönster så detta kan ta mindre än en vecka beroende på ditt
utfärdandemönster.

Observera att ett stort antal väntande auktorisationer generellt sett är ett
tecken på en buggig klient. Om du ofta uppnår denna gräns bör du dubbelkolla
din klientkod.
