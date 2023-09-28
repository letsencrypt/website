---
title: Integrationsvejledning
linkTitle: Klient og store udbyders integrationsguide
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2020-12-8
show_lastmod: 1
---


Dette dokument indeholder nyttige råd, hvis du er en hostingudbyder eller et stort websted, der integrerer Let's Encrypt eller du skriver klientsoftware til Let's Encrypt.

# Planlæg for ændringer

Både Let's Encrypt og Web PKI vil fortsætte med at udvikle sig over tid.  Du bør sørge for at du har mulighed for nemt at opdatere alle tjenester, der bruger Let's Encrypt. Hvis du også implementerer klienter, der er afhængige af Let's Encrypt certifikater, skal du især sørge for, at disse klienter modtager regelmæssige opdateringer.

I fremtiden vil disse ting sandsynligvis ændre sig:

  * de rod- og intermediatecertifikater, som vi udsteder fra
  * de hash-algoritmer, vi bruger, når vi underskriver certifikater
  * de typer nøgler og nøglestyrke kontroller, for hvilke vi er villige til at underskrive slutenheds certifikater
  * og ACME-protokollen

Vi vil altid tilstræbe at give så meget forudgående varsel som muligt for sådanne ændringer, bemærk dog at hvis en alvorlig sikkerhedsproblem findes i nogle komponenter, vi kan være nødt til at foretage ændringer på en meget kort tid eller øjeblikkeligt. For intermediate ændringer i særdeleshed, bør du ikke hardcode hvilket intermediate certifikat der bruges, men bør bruge [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) overskriften fra ACME-protokollen, da intermediate certifikater sandsynligvis vil ændre sig.

Tilsvarende vil vi sandsynligvis ændre webadressen på vilkårene for tjenesten (ToS), når vi opdaterer den. Undgå hardcoding af ToS URL og stol i stedet på [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3) header til at afgøre hvilken ToS URL der skal anvendes.

Du vil også have en måde at holde din TLS-konfiguration opdateret, da nye angreb findes på cipher suiter eller protokolversioner.

# Modtag opdateringer

For at modtage lav-volumen opdateringer om vigtige ændringer som dem, der er beskrevet ovenfor, skal du abonnere på vores [API annonceringer](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836) gruppe. Dette er nyttigt for både klientudviklere og hosting-udbydere.

For opdateringer med højere volumen om vedligeholdelse og afbrydelser, besøg vores [status side](https://letsencrypt.status.io/) og tryk på Abonner øverst til højre. Dette er mest nyttigt for hosting-udbydere.

Sørg også for at bruge en gyldig e-mail-adresse til din ACME-konto. Vi vil bruge denne e-mail til at sende dig udløbsbeskeder og kommunikere om eventuelle problemer specifikt til din konto.

# Hvem er abonnenten

Vores [CPS og Abonnentaftale](/repository) angiver, at Abonnenten er den, der har den private nøgle til et certifikat. For hosting-udbydere, det er udbyderen, ikke udbyderens kunde. Hvis du skriver software, som folk selv anvender, det er den, der anvender softwaren.

Kontakt-e-mailen, der er angivet, når du opretter konti (aka registreringer), skal gå til Abonnenten. Vi sender e-mail til denne adresse for at advare om udløb af certifikater og giver besked om ændringer i vores [privatlivspolitik](/privacy).  Hvis du er en hosting-udbyder, bør disse meddelelser gå til dig i stedet for en kunde. Ideelt set, oprette en mailingliste eller alias, så flere personer kan reagere på meddelelser, hvis du er på ferie.

Resultatet af dette er, at, hvis du er en hosting udbyder, du behøver ikke at sende os dine kunders e-mailadresser eller få dem til at acceptere vores abonnentaftale. Du kan simpelthen udstede certifikater for de domæner, du styrer og begynde at anvende dem.

# Én konto eller flere?

I ACME, det er muligt at oprette en konto og bruge den til alle autorisationer og udstedelser, eller oprette en konto pr. kunde. Denne fleksibilitet kan være værdifuld. For eksempel, nogle hosting-udbydere måske ønsker at bruge en konto pr. kunde, og gemme kontonøgler i forskellige steder, så en kontonøgle kompromis ikke tillader udstedelse for alle deres kunder.

Men for de fleste større hosting-udbydere anbefaler vi at bruge en enkelt konto og beskytte den tilsvarende konto nøgle godt. Dette gør det lettere at identificere certifikater, der tilhører samme enhed, lettere at holde kontaktoplysninger ajour, og lettere at give kaldsgrænse justeringer, hvis det er nødvendigt. Vi vil ikke være i stand til effektivt at justere kaldsgrænserne, hvis der anvendes mange forskellige konti.

# Multi-domæne (SAN) Certifikater

Vores [udstedelsespolitik](/docs/rate-limits) giver mulighed for op til 100 navne pr. certifikat. Uanset om du bruger en separat certifikat for hver værtsnavn, eller gruppe sammen mange værtsnavne på et lille antal certifikater, er op til dig.

Ved hjælp af separate certifikater per værtsnavn betyder færre bevægelige dele er forpligtet til logisk at tilføje og fjerne domæner, som ikke længere finder anvendelse. Separate certifikater også minimere certifikatets størrelse, som kan fremskynde HTTPS håndtryk på netværk med begrænset båndbredde.

På den anden side, ved hjælp af store certifikater med mange værtsnavne giver dig mulighed for at styre færre certifikater generelt. Hvis du har brug for at understøtte ældre kunder som Windows XP, der ikke understøtter TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), du skal bruge en unik IP-adresse for hvert certifikat, så ved at sætte flere navne på hvert certifikat reducerer antallet af IP-adresser, du har brug for.

For de fleste udrulninger giver begge valg den samme sikkerhed.

# Opbevaring og genbrug af certifikater og nøgler

En stor del af Let's Encrypts værdi er, at det giver mulighed for automatisk udstedelse som en del af opsætning af en ny hjemmeside.  Men hvis du har infrastruktur, der gentagne gange kan skabe nye frontends for samme hjemmeside, disse frontends bør først forsøge at bruge et certifikat og en privat nøgle fra en data-server og kun udstede et nyt certifikat, hvis der ikke foreligger noget certifikat, eller alle eksisterende certifikater er udløbet.

For Let's Encrypt, dette hjælper os med at levere tjenester effektivt til så mange mennesker som muligt. For dig, dette sikrer, at du er i stand til at implementere din hjemmeside, når du har brug for, uanset tilstanden af Let's Encrypt.

Som et eksempel, mange steder er begyndt at bruge Docker til at levere nye frontend tilfælde efter behov. Hvis du konfigurerer dine Docker containere til at udstede, når de starter, og du ikke gemme dine certifikater og nøgler på datadrev, du er tilbøjelige til at ramme satsgrænser, hvis du tilføjer for mange containere på én gang. I værste fald, hvis du er nødt til at ødelægge og genskabe alle dine forekomster på én gang, du kan ende i en situation, hvor ingen af dine tilfælde er i stand til at få et certifikat og dit websted er nede i flere dage, indtil kaldsgrænsen udløber. Denne type problem er ikke unikt for kaldsgrænser alene. Hvis Let's Encrypt er utilgængelig af en eller anden grund, når du har brug for at udrulle dine frontends, vil du opleve samme problem.

Bemærk, at nogle implementering filosofier angiver, at krypto-nøgler aldrig bør forlade den fysiske maskine, hvor de blev genereret. Denne model kan fungere fint med Let's Encrypt, når du blot sørger for, at maskinerne og deres data er langvarige, og du håndterer kaldsgrænser omhyggeligt.

# Vælg en udfordring Type

Hvis du bruger http-01 ACME-udfordring, du bliver nødt til at sørge for challenge response er klar på hver eneste af dine frontender, før du underretter Let's Encrypt, at du er klar til at opfylde udfordringen. Hvis du har et stort antal frontender, kan det være udfordrende. I så fald vil brugen af dns-01 udfordring sandsynligvis være nemmere. Selvfølgelig, hvis du har mange geografisk distribuerede DNS-respondenter, er du nødt til at sørge for, at TXT record er tilgængelig på hver responder.

Desuden, når du bruger dns-01 udfordring, skal du sørge for at rydde op gamle TXT poster, så svaret på Let's Encrypt forespørgslen ikke bliver for stor.

Hvis du ønsker at bruge http-01 challenge alligevel, kan du ønske at drage fordel af HTTP redirects. Du kan konfigurere hver af dine frontends til at omdirigere /.well-known/acme-validation/XYZ til validation-server.example.com/XYZ for alle XYZ. Dette uddelegerer ansvaret for udstedelse til validerings-server, så du bør beskytte denne server godt.

# Centrale Valideringsservere

I forhold til ovenstående to punkter, kan det give mening, hvis du har en masse frontends, at bruge en mindre delmængde af servere til at håndtere certifikat udstedelse. Dette gør det lettere at bruge omdirigeringer til http-01 validering, og giver et sted at gemme certifikater og nøgler robust.

# Implementere OCSP-hæftning

Mange browsere vil hente OCSP'en fra Let's Encrypt når de indlæser dit websted. Dette er et [performance- og privatlivsproblem](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/).  Ideelt set bør forbindelser til dit websted ikke vente på en sekundær forbindelse til Let's Encrypt. OCSP anmodninger fortælle også Let's Encrypt hvilke websteder folk besøger. Vi har en god fortrolighedspolitik og registrerer ikke individuelt identificerende oplysninger fra OCSP anmodninger, men vi vil fortrække ikke engang modtage data i første omgang. Derudover forenter vi at vores båndbreddeomkostninger til at betjene OCSP, hver gang en browser besøger et Let's Encrypt websted for første gang vil være en stor del af vores infrastruktur udgifter.

Ved at aktivere OCSP-hæftning kan du forbedre ydeevnen på din hjemmeside, yde bedre beskyttelse af personlige oplysninger for dine brugere, og hjælpe Let's Encrypt effektivt tjene så mange mennesker som muligt.

# Firewall Konfiguration

For at bruge Let's Encrypt, skal du tillade udgående port 443 trafik fra maskiner, der kører din ACME-klient. Vi offentliggør ikke IP-intervallerne for vores ACME-tjeneste, og de vil ændre sig uden varsel.

For ACME-udfordringen "http-01" skal du tillade indgående port 80-trafik. Vi offentliggør ikke IP-intervallerne, hvorfra vi udfører validering, og de vil ændre sig uden varsel.

Bemærk: Vi anbefaler altid at tillade almindelig HTTP adgang til din webserver, med en omdirigering til HTTPS. Dette giver en bedre bruger oplevelse end en webserver, der nægter eller slipper port 80 forbindelser, og giver det samme sikkerhedsniveau.

For alle udfordringer, skal du tillade indgående port 53 trafik (TCP og UDP) til dine autoritative DNS-servere.

# Understøttede Nøglealgoritmer

Let's Encrypt accepterer RSA-nøgler, der er 2048, 3072 eller 4096 bit i længde og P-256 eller P-384 ECDSA-nøgler. Det gælder både for kontonøgler og certifikatnøgler. Du kan ikke genbruge en kontonøgle som en certifikatnøgle.

Vores anbefaling er at tjene en dual-cert config, der tilbyder et RSA-certifikat som standard, og et (meget mindre) ECDSA-certifikat til de kunder, der angiver support.

# HTTPS som standard

For hosting udbydere, vores anbefaling er at automatisk udstede certifikater og konfigurere HTTPS for alle værtsnavne du kontrollerer, og for at tilbyde en brugerkonfigurerbar indstilling for om HTTP URL'er skal omdirigeres til deres HTTPS ækvivalenter. Vi anbefaler, at for eksisterende konti, indstillingen er deaktiveret som standard, men for nye konti, indstillingen er aktiveret som standard.

Årsag: Eksisterende websteder vil sandsynligvis omfatte nogle HTTP delressourcer (scripts, CSS og billeder). Hvis disse websteder automatisk omdirigeres til deres HTTPS-versioner, vil browsere blokere nogle af disse subressourcer på grund af Mixed Content Blocking. Dette kan ødelægge funktionaliteten på webstedet. Men for nogen, der opretter et nyt websted og finder, at det at omdirigere til HTTPS vil højst sandsynligt kun indeholde HTTPS-underressourcer, og hvis de forsøger at inkludere en HTTP underressource vil de bemærke med det samme, at det ikke virker.

Vi anbefaler at tillade kunder at indstille en HTTP Strict-Transport-Security (HSTS) header med en standard max-alder på 60 dage. Imidlertid skal denne indstilling være ledsaget af en advarsel om, at hvis kunden skal flytte til en hostingudbyder, der ikke tilbyder HTTPS, vil den cachede HSTS indstilling i browsere vil gøre deres websted utilgængeligt. Både kunde og hosting udbyder bør også være opmærksomme på, at HSTS header vil lave certifikatfejl til hårde fejl og sitet kan ikke anvendes. For eksempel, mens folk normalt kan klikke gennem en browser advarsel om et navn uoverensstemmelse eller udløbet certifikat, browsere tillader ikke sådan et klik igennem for værtsnavne med en aktiv HSTS-header.

# Hvornår skal der fornyes

Vi anbefaler automatisk fornyelse af certifikater, når de har en tredjedel af deres samlede levetid tilbage. For Let's Encrypts aktuelle 90-dages certifikater, betyder det, at man bør forny 30 dage før udløb.

Hvis du udsteder for mere end 10.000 værtsnavne, anbefaler vi også automatiseret fornyelse i små bidder, i stedet for at samle fornyelser i store runder. Dette reducerer risikoen: Hvis Let's Encrypt har et udfald på det tidspunkt, du skal forny eller der er en midlertidig fejl i dine fornyelsessystemer, det vil kun påvirke nogle få af dine certifikater i stedet for dem alle. Det gør også vores kapacitetsplanlægning lettere.

Du kan ønske at masse udstede certifikater for alle dine domæner for at komme i gang hurtigt, hvilket er fint. Du kan derefter sprede fornyelsestider ved at gøre en engangs-proces med at forny nogle certifikater 1 dag forud for, hvornår du normalt forny, nogle af dem 2 dage forude, og så videre.

Hvis du tilbyder klientsoftware, der automatisk konfigurerer en periodisk batch job, sørg for at køre på et tilfældigt sekund i løbet af dagen, i stedet for altid kører på et bestemt tidspunkt. Dette sikrer, at Let's Encrypt ikke modtage vilkårlige stigninger af trafik i toppen af time eller minut. Eftersom Let's Encrypt skal levere kapacitet til at opfylde spidsbelastning, kan reduktion af trafik spikes hjælpe med at holde vores omkostninger nede.

# Prøv igen fejl

Fornyelses fejl bør ikke behandles som en fatal fejl. Du bør implementere yndefuld gentagelse logik i dine udstedende tjenester ved hjælp af en eksponentiel backoff mønster, maks ud på én gang om dagen pr. certifikat. For eksempel, en rimelig backoff tidsplan ville være: 1. prøve efter et minut, 2. prøve igen efter ti minutter, tredje prøve efter 100 minutter, 4. og efterfølgende forsøg efter en dag. Du bør naturligvis have en måde for administratorer at anmode om tidlige forsøg på en per-domain eller global basis.

Backoffs på genforsøg betyder, at din udstedelse software skal holde styr på fejl samt succeser, og tjek om der opstod en fejl for nylig før forsøg på en ny udstedelse. Der er ingen mening i at forsøge udstedelse hundredvis af gange i timen, da gentagne fejl sandsynligvis vil være vedvarende.

Alle fejl skal sendes til den ansvarlige administrator, for at se om specifikke problemer skal løses.
