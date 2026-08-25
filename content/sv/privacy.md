---
title: Let’s Encrypt Integritetspolicy
slug: privacy
lastmod: 2026-07-06
english_is_canonical: 1
show_lastmod: 1
---

Let’s Encrypt Integritetspolicy beskriver hur vi samlar in, använder och lämnar ut din information i tre olika sammanhang:

- När du, som en Tillitspart, besöker en webbplats som är skyddad med HTTPS och använder ett certifikat från Let’s Encrypt,
- När du är en Prenumerant, dvs. när du begär och använder certifikat från Let’s Encrypt,
- När du är en Besökare på Let’s Encrypt webbplats, communitydiskussionsforum, andra webbsidor under letsencrypt.org, och tredjeparts sociala medier där Let’s Encrypt har ett konto.

Let’s Encrypt är en tjänst som tillhandahålls av [Internet Security Research Group](https://www.abetterinternet.org/), en ideell offentlig nytta-korporation i Kalifornien (USA).

## Tillitspart

När du använder en HTTPS-webbplats eller annan TLS-tjänst med ett Let’s Encrypt-certifikat kan din webbläsare (eller TLS-klient) fråga Let’s Encrypt för att kontrollera om certifikatet har återkallats. Om din webbläsare gör en sådan förfrågan kan våra servrar automatiskt registrera din IP-adress, webbläsare och operativsystem i temporära serverloggfiler. Vi använder inte denna data för att bygga profiler eller identifiera individer. Tillfälliga serverloggar används endast för operativa ändamål och raderas normalt inom sju dagar. Vi kan behålla en delmängd av serverloggar under längre perioder för att undersöka programvarufel eller missbruk. Om vi gör det kommer vi att radera eventuella lagrade loggar när vi är klara med undersökningen. Vi kan också beräkna, behålla och publicera sammanställd information från serverloggar, såsom vilka certifikat som genererar den största mängden förfrågningar. Vi kommer alltid att sträva efter att säkerställa att sådana dataset inte innehåller information om aktiviteter från identifierbara användare eller enheter.

## Prenumerant

Om du är en Prenumerant, begär du ett betrott certifikat från Let’s Encrypt som är avsett att offentligt intyga att du kontrollerar ett visst domännamn eller namn som är tillgängliga på Internet. Som en del av processen för att bevisa den kontrollen kommer Let’s Encrypt att samla in olika uppgifter relaterade till certifikatverifiering och hantering. Den informationen inkluderar IP-adresserna från vilka du får åtkomst till Let’s Encrypt-tjänsten; alla upplösta IP-adresser för begärda identifierare; serverinformation relaterad till eventuella valideringsförfrågningar; fullständiga loggar över alla inkommande HTTP / ACME-förfrågningar, alla utgående valideringsförfrågningar; och information som skickas av eller härleds från din klientprogramvara. Vi lagrar informationen i minst två år enligt kraven från betrodda rotprogram.

Vi behöver kunna visa för allmänheten, inklusive de som förlitar sig på våra certifikats tillförlitlighet, att våra tjänster fungerar som väntat. Som ett resultat kan vi vara oförmögna att radera information, inklusive IP-adresser. Informationen kan offentliggöras på flera sätt, bland annat via ett offentligt API, offentliga arkiv som Certificate Transparency-loggar (CT-loggar) och offentliga diskussioner.

Du kan ha möjlighet att lämna kontaktinformation, såsom din e-postadress, för kontotjänst och återställningsändamål. Dina kontaktuppgifter kommer inte att offentliggöras och kommer endast att delas enligt "Rättsvårdande och förmildrande omständigheter" nedan. Genom att lämna din e-postadress samtycker du till att ta emot servicerelaterade mejl från oss. Du kan när som helst avprenumerera på tjänsterelaterade mejl genom att klicka på länken "avanmäla" längst ner i våra mejl eller genom att kontakta oss på privacy@abetterinternet.org. Vi kommer inte att använda din kontaktinformation för marknadsförings- eller reklamändamål utan ditt samtycke.

Du kan behöva ladda ner klientprogramvara från ett arkiv som de som drivs av Debian, Ubuntu, Red Hat eller GitHub. Din interaktion med ett sådant programvaruarkiv styrs av det arkivets egen integritetspolicy och/eller användarvillkor.

## Besökare

När du är en besökare som besöker en ISRG-webbplats har du möjlighet att göra en donation. Donationer behandlas av våra pålitliga betalningspartners inklusive DonorBox, The Giving Block, Stripe, Shopify och PayPal, beroende på vald betalningsmetod, och lagras i ISRG:s Salesforce-databas och Sage Intacct vid behov. Vi samlar in ditt namn, din postadress och din e-postadress när du donerar. Beroende på din gåva kan vi också samla in preferenser för varor (som t-shirtstorlek) för att uppfylla förmåner för givare. När du donerar kommer vi att använda din information för vårt berättigade intresse att bearbeta och hantera ditt bidrag, inklusive påminnelser om insamling och förnyelser eller skickande av en tackgåva. Vi kan också använda din postadress för att identifiera och slå samman dubbla givardata för att upprätthålla noggrannheten i vår givardatabas. Dina interaktioner med [DonorBox](https://donorbox.org/privacy), [Stripe](https://stripe.com/privacy/), [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full), [Shopify](https://www.shopify.com/legal/privacy), [The Giving Block](https://thegivingblock.com/about/privacy-policy/), [Salesforce](https://www.salesforce.com/company/privacy/), [Monday Merch](https://www.mondaymerch.com/us/legal/privacy-policy?utm_source=google&utm_medium=cpc&utm_content=617104787162&utm_term=merch+monday&utm_campaign=16492171655&gclid=Cj0KCQjwrs7RBhDuARIsAIVfBD2DPUD-_BNhjV74wtBSJ2fKpvd10ZW6UT_JkqRkL0IRmY3G9_I6ljMaAovwEALw_wcB&gbraid=0AAAAAoJDcr6lwITSXqZ0UkPgmXyJpGp8e), [Formstack](https://www.formstack.com/legal), [BoldSign](https://boldsign.com/privacy-policy/) och [Sage Intacct](https://www.sageintacct.com/privacy_policy_website) styrs av deras respektive sekretesspolicyer. Vi samlar inte in eller behåller några kreditkorts- eller bankuppgifter relaterade till donationer.

Du kan ange din e-postadress för att ta emot kommunikation relaterad till ISRG-projekt genom en anmälan på en ISRG-webbplats och via annat marknadsföringsmaterial. All kommunikation som levereras via Salesforce och dina interaktioner med [Salesforce](https://www.salesforce.com/company/privacy/) regleras av deras integritetspolicys. Med ditt samtycke kan vi ibland använda din e-postadress för att skicka personliga meddelanden relaterade till ISRG och dess projekt. Du kan återkalla detta samtycke genom att välja att inte delta via sidfoten i våra e-postmeddelanden eller genom att e-posta oss på press@abetterinternet.org.

Om du registrerar dig för att använda ett ISRG-communitystödforum styrs den personliga information du lämnar och dina handlingar där av integritetspolicyn från vår värd- och mjukvaruleverantör för forumet, [Civilized Discourse Construction Kit](https://www.discourse.org/privacy). Vi samlar inte in eller behåller personlig information genom vårt erbjudande av detta supportforum.

## Vi säljer inte dina data eller information

Vi säljer inte dina data eller information. Detta inkluderar data och information om bestående parter, prenumeranter och besökare.

## Användning av tredjepartsanalys och e-postmarknadsföringsverktyg

För att förbättra vår förståelse för hur våra besökare interagerar med våra webbplatser och e-postmeddelanden, och för att förbättra våra insamlings- och marknadsföringsstrategier, kan ISRG från tid till annan använda tredjepartsverktyg för webbanalys och e-postanalys, specifikt Google Analytics för våra webbplatser och Salesforce Account Engagement för våra marknadsföringsmejl.

- Google Analytics: Detta verktyg samlar in data om hur besökare interagerar med våra webbplatser, inklusive sidvisningar, tid på sidan och webbplatsbesök, samt navigeringsvägar. Vi använder denna information för att analysera webbplatsens prestanda och användarengagemang. Vi behåller den data som samlas in av Google Analytics så länge det behövs för trafikflödesanalys. Du kan välja att avstå från Google Analytics för displayannonsering och anpassa annonser på Google Display Network via Google Ads-inställningssidan. Dessutom kan du förhindra att din data samlas in av Google Analytics genom att ladda ner och installera [Google Analytics Opt-out Browser Add-on](https://support.google.com/analytics/answer/181881?hl=en). Du kan läsa mer om hur Google använder data när du använder vår webbplats genom att besöka [Hur Google använder information från webbplatser eller appar som använder deras tjänster](https://www.google.com/policies/privacy/partners/).
- Salesforce Account Engagement: För våra marknadsföringsmejl hjälper Salesforce Account Engagement oss att förstå mottagarnas aktiviteter, såsom öppnade e-postmeddelanden och klick. Vi använder denna engagemangsdata för att utvärdera prestandan hos våra e-postkampanjer och förstå vår målgrupps beteende. Vi behåller engagemangsdata så länge vi använder Salesforce Account Engagement. Du kan när som helst avregistrera dig från marknadsföringskommunikation från oss genom att använda avregistreringslänken som finns i våra e-postmeddelanden eller genom att kontakta oss direkt på press@abetterinternet.org.

## Polisens begäran och förmildrande omständigheter

I den mån vi har den kan vi i begränsade fall lämna ut personligt identifierbar information om dig till tredje part. Sådana omständigheter inkluderar när vi har ditt samtycke eller när vi i god tro tror att det krävs enligt lag, till exempel enligt en stämning eller annan rättslig eller administrativ order. Vi kan också lämna ut information om kontoåterställning när vi i god tro tror att det är nödvändigt för att förhindra dödsfall, personskador, egendomsskador eller betydande ekonomisk skada.

Om vi enligt lag är skyldiga att lämna ut informationen som du har lämnat in, kommer vi att försöka ge dig förhandsmeddelande (om vi inte är förbjudna, eller om det skulle vara meningslöst) om att en begäran om din information har gjorts i syfte att ge dig möjlighet att invända mot utlämnandet. Vi kommer att försöka ge detta meddelande på det sätt som rimligen är praktiskt möjligt. Om du inte bestrider begäran om utlämnande kan vi lagligen vara skyldiga att lämna ut din information.

Dessutom förbehåller vi oss rätten, enbart efter eget gottfinnande, att självständigt invända mot vissa begäranden (om tillgång till information om användare av våra produkter och teknologier) som vi anser vara olämpliga.

## Vilka rättigheter har aktörer, prenumeranter och besökare i Europeiska ekonomiska samarbetsområdet under GDPR, och hur kan jag utöva dem?

Vi behandlar personuppgifter som beskrivs i denna policy. Syftet och den lagliga grunden för informationsbehandling är följande:

**Syfte:** Tillhandahållande av certifikatstatusinformation

**Laglig grund:** Legitima intressen

**Ytterligare information:** Vi samlar in och behandlar information från beroende parter för att på ett pålitligt sätt tillhandahålla certifikatstatusinformation.

**Syfte:** Tillhandahålla tjänster för utfärdande och hantering av certifikat

**Laglig grund:** Kontrakt, Legitima intressen

**Ytterligare information:** Vi samlar in och behandlar information från prenumeranter för att tillhandahålla pålitliga och säkra tjänster för utfärdande och hantering av certifikat, samt för att visa för allmänheten att våra tjänster fungerar som förväntat.

**Syfte:** Tillhandahålla information till besökare

**Laglig grund:** Samtycke, Legitima intressen

**Ytterligare information:** Vi samlar in och behandlar information från besökare för att tillhandahålla information via webben och e-post på ett pålitligt och effektivt sätt.

**Syfte:** Hantering av donationer och sponsringsförfrågningar

**Laglig grund:** Legitima intressen

**Ytterligare information:** Vi samlar in och bearbetar information för att hantera och stödja donationer, uppfylla givarförmåner och upprätthålla noggrannheten i våra givarregister.

**Syfte:** Juridiska skyldigheter och förmildrande omständigheter

**Laglig grund:** Juridisk skyldighet, Legitima intressen

**Ytterligare information:** Vi kan samla in och behandla information för att uppfylla juridiska skyldigheter och när vi har en god tro att det är nödvändigt för att förhindra förlust av liv, personskada, egendomsskada eller betydande ekonomisk skada.

Observera att vi kanske inte kan radera information, inklusive IP-adresser, eftersom denna information är nödvändig för andra att förlita sig på för att avgöra våra certifikats pålitlighet. I vissa fall kan vi behandla personuppgifter enligt juridisk skyldighet eller för att skydda dina vitala intressen eller någon annans intressen.

Dina personuppgifter kan samlas in från eller överföras till jurisdiktioner där vi och våra tjänsteleverantörer lagrar eller behandlar data, inklusive USA. Dessa jurisdiktioner kanske inte erbjuder samma nivå av dataskydd som din jurisdiktion, inklusive EES. Vi har vidtagit åtgärder för att säkerställa att våra tjänsteleverantörer tillhandahåller ett tillräckligt skydd för personuppgifter för EES-invånare, bland annat genom att ingå databehandlingsavtal med hjälp av Europeiska kommissionens godkända standardavtalsklausuler eller genom att använda andra skyddsåtgärder godkända av Europeiska kommissionen. Du har rätt att få information om mekanismen genom vilken din personliga information överförs utanför EU genom att mejla oss via kontaktuppgifterna nedan.

Personer som befinner sig inom Europeiska ekonomiska samarbetsområdet (EES) har vissa rättigheter avseende sin personliga information, inklusive rätten att få tillgång till, korrigera eller radera personuppgifter som vi hanterar genom din användning av våra webbplatser och tjänster. Om du är en person som är en bestående part, prenumerant eller besökare baserad i EES, kan du:

- Begär en rapport om personuppgifter genom att mejla oss på privacy@abetterinternet.org. Denna rapport kommer att inkludera de personuppgifter vi har om dig, tillhandahållna i ett strukturerat, vanligt använt och portabelt format. Observera att vi kan begära ytterligare information från dig för att verifiera din identitet innan vi lämnar ut någon information.
- Begär att din information korrigeras eller raderas genom att kontakta oss på privacy@abetterinternet.org.
- Motsätter sig att vi bearbetar din information. Du kan be oss sluta använda din information, även när vi använder din information för att skicka dig servicemejl. Du kan när som helst återkalla ditt samtycke till att ta emot service-e-post genom att klicka på länken "avregistrera" som finns i Let’s Encrypt e-postmeddelanden.
- Klagomål till en tillsynsmyndighet. Om du är baserad inom EES och anser att vi inte har följt dataskyddslagarna, har du rätt att lämna in ett klagomål till din lokala tillsynsmyndighet.

För mer information, eller för att rapportera ett integritetsproblem, vänligen kontakta: privacy@abetterinternet.org.
