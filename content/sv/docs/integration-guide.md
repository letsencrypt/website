---
title: Integrationsguide
linkTitle: Integrationsguide för klient och stor leverantör
slug: integration-guide
lastmod: 2025-06-23
show_lastmod: 1
---

Detta dokument innehåller användbara råd om du är en hosting-leverantör eller stor webbplats som integrerar Let's Encrypt, eller om du skriver klientprogramvara för Let's Encrypt.

# Planera för förändring

Både Let's Encrypt och Web PKI kommer att fortsätta utvecklas över tid.  Du bör säkerställa att du har möjlighet att enkelt uppdatera alla tjänster som använder Let's Encrypt. Om du också distribuerar klienter som är beroende av Let's Encrypt-certifikat, se särskilt till att dessa klienter får regelbundna uppdateringar.

I framtiden är det troligt att dessa saker kommer att förändras:

  * de rot- och mellancertifikat som vi utfärdar från
  * de hash-algoritmer vi använder när vi signerar certifikat
  * de typer av nycklar och kontroller av nyckelstyrka för vilka vi är villiga att signera slutentitetscertifikat
  * och ACME-protokollet

Vi kommer alltid att försöka ge så mycket förhandsbesked som möjligt om sådana ändringar, även om vi om en allvarlig säkerhetsbrist hittas i någon komponent kan behöva göra ändringar på mycket kort sikt eller omedelbart. För särskilt intermediära ändringar bör du inte hårdkoda vilken intermediär som ska användas, utan bör använda [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2)-headern från ACME-protokollet, eftersom intermediärer sannolikt kommer att förändras.

På samma sätt är det sannolikt att vi ändrar URL:en för användarvillkoren (ToS) när vi uppdaterar den. Undvik att hårdkoda ToS-URL:en och förlita dig istället på [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3)-headern för att avgöra vilken ToS-URL som ska användas.

Du vill också ha ett sätt att hålla din TLS-konfiguration uppdaterad när nya attacker upptäcks mot chifferuppsättningar eller protokollversioner.

# Få uppdateringar

För att få lågvolymuppdateringar om viktiga förändringar som de som beskrivs ovan, prenumerera på vår [API-annonseringar](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836)-grupp. Detta är användbart för både klientutvecklare och webbhotell.

För högvolymuppdateringar om underhåll och driftstopp, besök vår [status-sida](https://letsencrypt.status.io/) och klicka på Prenumerera i övre högra hörnet. Detta är mest användbart för webbhotell.

# Vem är prenumeranten

Våra [CP/CPS och avtal för prenumeranter](/repository) anger att prenumeranten är den som innehar den privata nyckeln till ett certifikat. För webbhotell gäller det leverantören, inte leverantörens kund. Om du skriver mjukvara som folk installerar själva, gäller det den som installerar mjukvaran.

Det innebär att du som webbhotellsleverantör inte behöver be kunderna godkänna vårt prenumerantavtal. Du kan helt enkelt utfärda certifikat för de domäner du kontrollerar och börja använda dem.

# Ett konto eller många?

I ACME är det möjligt att skapa ett konto och använda det för alla auktoriseringar och utfärdanden, eller skapa ett konto per kund. Denna flexibilitet kan vara värdefull. Vissa webbhotellsleverantörer kan till exempel vilja använda ett konto per kund och lagra kontonycklarna i olika kontexter, så att en komprometterad kontonyckel inte möjliggör utfärdande för alla deras kunder.

Men för de flesta större webbhotellleverantörer rekommenderar vi att använda ett enda konto och skydda motsvarande kontonyckel väl. Detta gör det lättare att identifiera certifikat som tillhör samma enhet, och enklare att göra justeringar av frekvensbegränsningar vid behov. Vi kommer inte kunna effektivt justera frekvensbegränsningar om många olika konton används.

# Multi-domän (SAN) Certifikat

Vi tillåter upp till 100 namn per certifikat beroende på den valda [certifikatsprofilen](/docs/profiles/). Oavsett om du använder ett separat certifikat för varje värdnamn eller grupperar flera värdnamn på ett litet antal certifikat är upp till dig.

Att använda separata certifikat per värdnamn innebär att färre rörliga delar krävs för att logiskt lägga till och ta bort domäner när de provs och avvecklas. Separata certifikat minimerar också certifikatstorleken, vilket kan påskynda HTTPS-handshakes på nätverk med låg bandbredd. Kolla in våra [gränser för takter](/docs/rate-limits) för att säkerställa att du kan få så många certifikat som du behöver.

Å andra sidan gör användningen av stora certifikat med många värdnamn att du kan hantera färre certifikat totalt sett. Om du behöver stödja äldre klienter som Windows XP som inte stöder TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), behöver du en unik IP-adress för varje certifikat, så att lägga fler namn på varje certifikat minskar antalet IP-adresser du behöver.

För de flesta installationer erbjuder båda valen samma säkerhet.

# Lagra och återanvända certifikat och nycklar

En stor del av Let's Encrypts värde är att det möjliggör automatisk utfärdande som en del av provisioneringen av en ny webbplats. Om du däremot har infrastruktur som kan skapa nya front-end-servrar för samma webbplats flera gånger, bör dessa front-end-servrar först försöka använda ett certifikat och en privat nyckel från hållbart lagringsutrymme, och bara utfärda ett nytt om inget certifikat är tillgängligt eller alla befintliga certifikat har gått ut.

För Let's Encrypt hjälper detta oss att leverera tjänster effektivt till så många människor som möjligt. För dig säkerställer detta att du kan distribuera din webbplats när du behöver, oavsett Let's Encrypts tillstånd.

Som exempel börjar många webbplatser använda Docker för att skapa nya front-end-instanser vid behov. Om du konfigurerar dina Docker-containrar att utfärda när de startar och inte lagrar dina certifikat och nycklar på ett hållbart sätt, kommer du sannolikt att träffa gränser för hastighet om du startar för många instanser på en gång. I värsta fall, om du måste förstöra och återskapa alla instanser samtidigt, kan ingen av dem få något certifikat. Då kan webbplatsen ligga nere i flera dagar tills frekvensbegränsningen upphör. Denna typ av problem är dock inte unik för frekvensbegränsningar. Om Let's Encrypt är otillgängligt av någon anledning när du behöver starta dina front-end-servrar skulle du ha samma problem.

Observera att vissa placeringsfilosofier säger att kryptonycklar aldrig bör lämna den fysiska maskin på vilken de genererades. Denna modell kan fungera bra med Let's Encrypt, så länge du ser till att maskinerna och deras data är långlivade, och du hanterar frekvensbegränsningar noggrant.

# Välja en typ av utmaning

Om du använder http-01 ACME-utmaningen måste du tillhandahålla utmaningssvar till varje av dina frontend innan du meddelar Let's Encrypt att du är redo att uppfylla utmaningen. Om du har ett stort antal frontend kan detta vara utmanande. I så fall är det troligtvis enklare att använda dns-01-utmaningen. Självklart, om du har många geografiskt spridda DNS-respondrar måste du se till att TXT-posten är tillgänglig på varje responder.

Dessutom, när du använder dns-01-utmaningen, se till att rensa gamla TXT-poster så att svaret på Let's Encrypts förfrågan inte blir för stort.

Om du ändå vill använda http-01-utmaningen kan du dra nytta av HTTP-omdirigeringar. Du kan konfigurera varje frontend för att omdirigera `/.well-known/acme-challenge/XYZ` till `validation-server.example.com/XYZ` för alla `XYZ`. Detta delegerar ansvaret för utfärdande till `validation-server`, så du bör skydda den servern väl.

# Centrala valideringsservrar

I samband med de två ovanstående punkterna kan det vara vettigt, om du har många frontend, att använda en mindre delmängd av servrar för att hantera utfärdandet. Detta gör det lättare att använda omdirigeringar för http-01-validering och ger en plats att lagra certifikat och nycklar på ett hållbart sätt.

# Brandväggskonfiguration

För att använda Let's Encrypt behöver du tillåta utgående trafik på port 443 från maskinerna som kör din ACME-klient. Vi publicerar inte IP-intervallen för vår ACME-tjänst, och de kommer att ändras utan förvarning.

För "http-01" ACME-utmaningen behöver du tillåta inkommande trafik på port 80. Vi publicerar inte de IP-intervall vi utför validering från, och de ändras utan förvarning.

Observera: Vi rekommenderar att du alltid tillåter enkel HTTP-åtkomst till din webbserver, med en omdirigering till HTTPS. Detta ger en bättre användarupplevelse än en webbserver som vägrar eller tappar port 80-anslutningar, och ger samma säkerhetsnivå.

För alla utmaningar måste du tillåta inkommande port 53-trafik (TCP och UDP) till dina auktoritativa DNS-servrar.

# Stödda nyckelalgoritmer

Let's Encrypt accepterar RSA-nycklar som är 2048, 3072 eller 4096 bitar långa samt P-256 eller P-384 ECDSA-nycklar. Det gäller både kontonycklar och certifikatnycklar. Du kan inte återanvända en kontonyckel som en certifikatnyckel.

Vår rekommendation är att tillhandahålla en konfiguration med dubbla certifikat, erbjuda ett RSA-certifikat som standard och ett (mycket mindre) ECDSA-certifikat till de klienter som anger stöd.

# HTTPS som standard

För hostingleverantörer rekommenderar vi att automatiskt utfärda certifikat och konfigurera HTTPS för alla värdnamn du kontrollerar, samt att erbjuda en användarkonfigurerbar inställning för om HTTP-URL:er ska omdirigeras till deras HTTPS-motsvarigheter. Vi rekommenderar att inställningen inaktiveras som standard för befintliga konton, men för nya konton aktiveras den som standard.

Resonemang: Befintliga webbplatser inkluderar sannolikt vissa HTTP-delresurser (skript, CSS och bilder). Om dessa sajter automatiskt omdirigeras till sina HTTPS-versioner kommer webbläsare att blockera några av dessa delresurser på grund av Mixed Content Blocking. Detta kan bryta funktionaliteten på webbplatsen. Men någon som skapar en ny sida och upptäcker att den omdirigerar till HTTPS kommer troligen bara att inkludera HTTPS-delresurser, eftersom om de försöker inkludera en HTTP-delresurs kommer de omedelbart att märka att det inte fungerar.

Vi rekommenderar att kunderna får ange en HTTP Strict-Transport-Security-rubrik (HSTS) med en förvald max-age på 60 dagar. Denna inställning bör dock åtföljas av en varning om att om kunden behöver byta till en hostingleverantör som inte erbjuder HTTPS, kommer den cachade HSTS-inställningen i webbläsare att göra deras webbplats otillgänglig. Dessutom bör både kund och hostingleverantör vara medvetna om att HSTS-headern kommer att göra certifikatfel till hårda fel. Till exempel, medan folk vanligtvis kan klicka sig igenom en webbläsarvarning om namnmismatchning eller utgånget certifikat, tillåter webbläsare inte sådan klickning för värdnamn med en aktiv HSTS-header.

# När förnya

Vi rekommenderar [att du kontrollerar ACME Renewal Information](https://letsencrypt.org/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients/) för varje certifikat minst två gånger om dagen. ARI-endpointen kommer att rekommendera när man ska förnya.

Som en säkerhetsåtgärd för ARI rekommenderar vi att certifikat förnyas automatiskt när de har en tredjedel av sin totala livstid kvar. För certifikat med en giltighetsperiod på mindre än 10 dagar rekommenderar vi att de förnyas halvvägs genom deras totala livslängd. För Let's Encrypts nuvarande 90-dagars certifikat betyder det att förnya 30 dagar före utgången.

Om du utfärdar för mer än 10 000 värdnamn rekommenderar vi också automatisk förnyelse i små omgångar, istället för att samla förnyelser i stora block. Detta minskar risken: Om Let's Encrypt har ett avbrott när du behöver förnya, eller om det finns ett tillfälligt fel i dina förnyelsesystem, påverkar det bara några av dina certifikat, istället för alla. Det gör också vår kapacitetsplanering enklare.

Du kanske vill utfärda certifikat i bulk för alla dina domäner för att komma igång snabbt, vilket är okej. Du kan sedan sprida ut förnyelsetiderna genom att göra en engångsprocess där vissa certifikat förnyas 1 dag före den normala förnyelsedagen, andra 2 dagar före, och så vidare.

Om du erbjuder klientprogramvara som automatiskt konfigurerar en periodisk batchjobb, se till att det körs vid en slumpmässig sekund under dagen, istället för alltid vid en specifik tid. Detta säkerställer att Let's Encrypt inte tar emot godtyckliga trafikspikar vid början av timmen eller minuten. Eftersom Let's Encrypt behöver tillhandahålla kapacitet för att möta maximal belastning kan minskade trafikspikar bidra till att hålla våra kostnader nere.

# Försök igen vid fel

Fel vid förnyelse bör inte behandlas som ett kritiskt fel. Du bör implementera en smidig återförsökslogik i dina utfärdande tjänster med ett exponentiellt backoff-mönster, som maximeras till en gång per dag per certifikat. Till exempel, ett rimligt backoff-schema skulle vara: 1:a försöket efter en minut, 2:a försöket efter tio minuter, 3:e försöket efter 100 minuter, 4:e och efterföljande försök efter en dag. Du bör förstås ha ett sätt för administratörer att begära tidiga återförsök på per-domän eller global basis.

Backoffs vid återförsök innebär att din utfärdningsprogramvara ska hålla reda på både fel och framgångar, och kontrollera om det nyligen skett ett fel innan ett nytt försök görs. Det är meningslöst att försöka utfärda hundratals gånger per timme, eftersom återkommande fel sannolikt är bestående.

Alla fel ska skickas till den ansvarige administratören, för att se om specifika problem behöver åtgärdas.
