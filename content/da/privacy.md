---
title: Politik om beskyttelse af personlige oplysninger
slug: privacy
top_graphic: 4
lastmod: 2022-03-11
english_is_canonical: 1
show_lastmod: 1
---

Let's Encrypts privatlivspolitik beskriver, hvordan vi indsamler, bruger og videregiver dine oplysninger i tre forskellige sammenhænge:

- Når du som afhængig part besøger et websted, der er sikret med HTTPS, der bruger et certifikat fra Let's Encrypt,
- Når du er abonnent, dvs. når du anmoder om og bruger certifikater fra Let's Encypt
- Når du er besøgende på Let's Encrypt webside, community discussion forum, andre websider under letsencrypt.org, og tredjepart sociale medier websteder, hvor Let's Encrypt driver en konto.

Let's Encrypt er en tjeneste, der leveres af [Internet Security Research Group](https://www.abetterinternet.org/), en California (Usa) Nonprofit Public Benefit Corporation.

## Deltagende part

Når du bruger et HTTPS-websted eller en anden TLS-tjeneste med et Lad os kryptere certifikat, din browser (eller TLS-klient) kan forespørge Let's Encrypt for at kontrollere, om certifikatet er blevet tilbagekaldt ("OCSP-anmodning"). Hvis din browser fremsætter en OCSP-anmodning, vil vores servere automatisk optage din IP-adresse, browser og operativsystem i midlertidige serverlogfiler. Vi bruger ikke data fra OCSP-anmodninger til at opbygge profiler eller identificere enkeltpersoner. Midlertidige serverlogfiler anvendes kun til operationelle formål og slettes normalt på mindre end syv dage. Vi kan opbevare en del af serverlogs i længere perioder for at undersøge software fejl eller misbrug. Hvis vi gør det, sletter vi eventuelle gemte logs, når vi er færdige med at undersøge. Vi kan også beregne, opbevare og offentliggøre samlede oplysninger fra serverlogs, såsom hvilke certifikater genererer den største mængde af anmodninger. Vi vil altid bestræbe os på at sikre, at sådanne datasæt ikke indeholder oplysninger om aktiviteterne af identificerbare brugere eller enheder.

## Abonnent

Hvis du er abonnent, anmoder du om et betroet certifikat fra Let's Encrypt som har til formål offentligt at bekræfte, at du kontrollerer et bestemt domænenavn eller navne, der kan nås på internettet. Som en del af processen med at bevise denne kontrol, vil Let's Encrypt indsamle forskellige oplysninger vedrørende certifikatgodkendelse og administration. Disse oplysninger omfatter de IP-adresser, hvorfra du får adgang til Lad os Kryptere tjenesten; alle tilknyttede IP-adresser for ethvert domænenavn, der ønskes serveroplysninger vedrørende eventuelle valideringsanmodninger; fuldstændige logninger af alle indgående HTTP / ACME-anmodninger, alle udgående valideringsanmodninger; og oplysninger sendt af eller udledt af din klient software. Vi vil gemme disse oplysninger i et minimum på syv år per betroede rodprogram krav. Disse oplysninger vil blive opbevaret i højst ti år.

Vi skal kunne demonstrere over for offentligheden herunder dem, der er afhængige af vores certifikaters troværdighed, at vores tjenester fungerer som forventet. Som følge heraf kan vi ikke slette oplysninger, herunder IP-adresser. Disse oplysninger kan offentliggøres på en række måder, herunder via offentlige API, offentlige registre og/eller offentlige diskussioner.

Du kan have mulighed for at give kontaktoplysninger, såsom din e-mail-adresse, til kontoservice og genoprettelsesformål. Dine kontaktoplysninger vil ikke blive offentliggjort, og det vil kun blive delt pr. "Lov Håndhævelse og Udvidelse Omstændigheder", nedenfor. Ved at angive din e-mailadresse, er du indforstået med at modtage service-relaterede e-mails fra os. Du kan til enhver tid afmelde dig service-relaterede e-mails ved at klikke på linket "Afmeld" nederst på vores e-mails eller ved at kontakte os på security@letsencrypt.org. Vi vil ikke bruge dine kontaktoplysninger til markedsføring eller salgsfremmende formål.

Det kan være nødvendigt at downloade klientsoftware fra et depot såsom Debian, Ubuntu, Red Hat eller Github. Din interaktion med et sådant software-repository er underlagt dette repositorys egen privatlivspolitik og/eller Vilkår for anvendelse.

## Besøgende

Når du er en besøgende gennemser Let's Encrypts hjemmeside, har du mulighed for at gøre en donation. Donationer behandles af vores betroede betalingspartnere, herunder DonorBox, Stripe, Shopify, PayPal, Den Giving Block, og Gemini afhængigt af den valgte betalingsmetode og gemt i ISRG's Salesforce database. Vi indsamler dit navn og din e-mailadresse, når du donerer. Vi vil ikke bruge din e-mailadresse til at kontakte dig uden dit samtykke, medmindre vi mener, at det er nødvendigt at løse et problem i forbindelse med en bestemt donation. Dine interaktioner med [DonorBox](https://donorbox.org/privacy), [Stribe](https://stripe.com/privacy/), [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full), [Shopify](https://www.shopify.com/legal/privacy), [Den Givende blok](https://thegivingblock.com/about/privacy-policy/), Gemini, [SHIPHERO](https://shiphero.com/privacy-data-policy/), [Salesforce](https://www.salesforce.com/company/privacy/), og [Sage Intacct](https://www.sageintacct.com/privacy_policy_website) er underlagt deres respektive privatlivspolitikker. Vi indsamler eller opbevarer ikke kreditkort eller bankoplysninger relateret til donationer. Vores leveringspartnere er Shopify og SHIPHERO.

Du kan have mulighed for at give din e-mail-adresse til at modtage meddelelser i forbindelse med ISRG-projekter gennem en tilmelding på en ISRG hjemmeside og via andre markedsføringsmaterialer. Enhver kommunikation leveret via MailChimp eller Salesforce og dine interaktioner med [MailChimp](https://www.intuit.com/privacy/statement/) og [Salesforce](https://www.salesforce.com/company/privacy/) er underlagt deres privatlivspolitikker. Vi kan lejlighedsvis bruge din e-mailadresse til at sende personlig kommunikation relateret til Let's Encrypt. Du kan anmode om at få din e-mailadresse fjernet fra vores liste ved at afmelde via MailChimp eller emaile os på press@letsencrypt.org.

Hvis du registrerer dig for at bruge Let's Encrypt community support forum, er de personlige oplysninger, du giver, og dine handlinger der er underlagt fortrolighedspolitikken af vores hosting og softwareudbyder for forummet, [Civilized Discourse Construction Kit](https://www.discourse.org/privacy). Vi indsamler eller vedligeholder ikke personlige oplysninger via vores tilbud om dette supportforum.

## Vi sælger ikke dine data eller information

Vi sælger ikke dine data og oplysninger. Dette omfatter Afhængig Part (hjemmeside besøg), Abonnent, og Besøgende data og oplysninger.

## Lov håndhævelse anmodninger og udvide omstændigheder

I det omfang vi besidder det, kan vi videregive personligt identificerbare oplysninger om dig til tredjeparter under begrænsede omstændigheder. Sådanne omstændigheder omfatter, når vi har dit samtykke, eller når vi har en god tro opfattelse af at det er påkrævet ved lov, som f. eks. i henhold til en stævning eller anden retslig eller administrativ bekendtgørelse. Vi kan også videregive oplysninger om kontogendannelse, når vi har en god tro opfattelse af, at det er nødvendigt at forhindre tab af liv, personskade, skade på ejendom eller betydelig økonomisk skade.

Hvis vi i henhold til loven skal videregive de oplysninger, du har indsendt, vi vil forsøge at give dig forudgående meddelelse (medmindre vi er forbudt, eller det ville være formålsløst), at der er fremsat en anmodning om dine oplysninger for at give dig mulighed for at gøre indsigelse mod offentliggørelsen. Vi vil forsøge at give denne meddelelse på alle måder, der er rimeligt praktiske. Hvis du ikke anfægter anmodningen om videregivelse, kan vi være juridisk forpligtet til at aflevere dine oplysninger.

Desuden forbeholder vi os retten efter eget skøn selvstændigt at gøre indsigelse mod visse anmodninger (for adgang til oplysninger om brugere af vores produkter og teknologier), som vi mener er forkerte.

## Hvilke rettigheder har Det Europæiske Økonomiske Samarbejdsområde, abonnenter og besøgende under GDPR, og hvordan kan jeg udøve dem?

Vi behandler personoplysninger som beskrevet i denne politik. Formålet med og retsgrundlaget for behandling af oplysninger er følgende:

**Formål:** Giver Certifikatstatus (OCSP) Information

**Lov grundlag:** Legitime interesser

**Yderligere oplysninger:** Vi indsamler og behandler oplysninger fra deltagende parter med henblik på pålideligt at give certifikatstatusoplysninger.

**Formål:** Udbydelse af certifikatudstedelse og forvaltningstjenester

**Lov grundlag:** Aftalegrundlag, legitime interesser

**Yderligere oplysninger:** Vi indsamler og behandler oplysninger fra Abonnenter med henblik på at levere pålidelige og sikre certifikatudstedelses- og forvaltningstjenester og at demonstrere over for offentligheden, at vores tjenester udfører som forventet.

**Formål:** Give oplysninger til besøgende

**Lov grundlag:** Aftalegrundlag, legitime interesser

**Yderligere oplysninger:** Vi indsamler og behandler oplysninger fra Besøgende for at give oplysninger via internettet og e-mail på en pålidelig og effektiv måde.

**Formål:** Behandling af donationer og sponsorater

**Lov grundlag:** Legitime interesser

**Yderligere oplysninger:** Vi indsamler og behandler oplysninger for at behandle og understøtte donationer.

**Formål:** Juridiske forpligtelser og formildende omstændigheder

**Lov grundlag:** Aftalegrundlag, legitime interesser

**Yderligere oplysnigner**: Vi kan også videregive oplysninger om kontogendannelse, når vi har en god tro opfattelse af, at det er nødvendigt at forhindre tab af liv, personskade, skade på ejendom eller betydelig økonomisk skade.

Bemærk venligst, at vi muligvis ikke kan slette oplysninger, herunder IP-adresser da disse oplysninger er nødvendige for andre at stole på i at fastslå pålideligheden af vores certifikater. I nogle tilfælde kan vi behandle personoplysninger i henhold til lovpligtig forpligtelse eller beskytte dine vitale interesser eller en anden persons interesser.

Dine personoplysninger kan blive indsamlet fra eller overført til jurisdiktioner, hvor vi og vores tjenesteudbydere opbevarer eller behandler data, herunder Usa. Disse jurisdiktioner giver muligvis ikke det samme databeskyttelsesniveau som din jurisdiktion, herunder EØS. Vi har taget skridt til at sikre, at vores tjenesteudbydere yder et tilstrækkeligt beskyttelsesniveau for personoplysninger om bopæl i EØS. herunder ved at indgå databehandlingsaftaler ved anvendelse af Europa-Kommissionens godkendte standardkontraktbestemmelser eller ved anvendelse af andre garantier, der er godkendt af Europa-Kommissionen. Du har ret til at få oplysninger om den mekanisme, hvorunder dine personlige oplysninger overføres uden for EU ved at sende os en e-mail til nedenstående kontaktoplysninger.

Enkeltpersoner i Det Europæiske Økonomiske Samarbejdsområde (EØS) har visse rettigheder med hensyn til deres personlige oplysninger, herunder retten til at få adgang til, rette eller slette personoplysninger, som vi behandler gennem din brug af vores websteder og tjenester. Hvis du er en person, der er en deltagende part, abonnent eller besøgende baseret på EØS, kan du:

- Anmod om en persondatarapport ved at sende en e-mail til os på security@letsencrypt.org. Denne rapport vil indeholde de personoplysninger, vi har om dig, givet dig i et struktureret, almindeligt anvendt og overførbart format. Bemærk venligst, at vi kan anmode dig om yderligere oplysninger for at bekræfte din identitet, før vi videregiver oplysninger.

- Anmod om, at dine oplysninger bliver rettet eller slettet ved at kontakte os på security@letsencrypt.org.

- Protester mod brugen af oplysninger om dig. Du kan bede os om at holde op med at bruge dine oplysninger, herunder når vi bruger dine oplysninger til at sende dig e-mails. Du kan til enhver tid tilbagekalde dit samtykke til at modtage service emails ved at klikke på linket "Afmeld" fundet i Let's Encrypt e-mails.

- Klag til en myndighed. Hvis du er baseret i EØS og tror, at vi ikke har overholdt databeskyttelseslovene. De har ret til at indgive en klage til din lokale tilsynsmyndighed.

For mere information, eller for at rapportere et privatlivsproblem, kontakt venligst: security@letsencrypt.org.
