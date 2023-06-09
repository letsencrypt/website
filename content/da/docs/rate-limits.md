---
title: Grænser For kald
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2023-06-09
show_lastmod: 1
---


Let's Encrypt giver kaldsgrænser for at sikre rimelig brug af så mange mennesker som muligt. Vi mener, at disse kald grænser er høje nok til at arbejde med for de fleste mennesker som standard. Vi har også designet dem, så fornyelse af et certifikat næsten aldrig rammer en kalds grænse, og således at store organisationer gradvist kan øge antallet af certifikater, de kan udstede uden at kræve intervention fra Let's Encrypt.

Hvis du aktivt udvikler eller tester en Let's Encrypt klient, så benyt venligst vores [staging miljø](/docs/staging-environment) i stedet for produktions API. Hvis du arbejder på at integrere Let's Encrypt som udbyder eller med et stort websted, bedes du [gennemgå vores Integration Guide](/docs/integration-guide).

Hovedbegrænsningen er <a id="certificates-per-registered-domain"></a>**Certifikater pr. registreret domæne** (50 om ugen). Et registreret domæne er generelt den del af domænet, du har købt hos din domænenavnsregistrant. For eksempel i navnet `www.example.com` er det registrerede domæne `example.com`. I `new.blog.example.co.uk` er det registrerede domæne `eksempel.co.uk`. Vi bruger [Public Suffix List](https://publicsuffix.org) til at udlede det registrerede domæne. Overskridelse af Certifikater pr. registreret domæne rapporteres med fejlmeddelelsen `for mange certifikater allerede udstedt`, muligvis med yderligere detaljer.

Du kan maksimalt oprette 300 <a
id="new-orders"></a>**Nye Ordrer** pr. konto pr. 3 timer. En ny ordre oprettes hver gang du anmoder om et certifikat fra Boulder CA, hvilket betyder, at en ny ordre er produceret i hver anmodning om certifikat. Overskridelse af grænsen for nye ordrer udløser fejlmeddelelsen `too many new orders recently`.

Du kan kombinere flere værtsnavne i et enkelt certifikat, op til en grænse på 100 <a id="names-per-certificate"></a>**Navn pr. certifikat**. Af hensyn til ydeevne og pålidelighed er det bedre at bruge færre navne pr certifikat, når du kan.  Et certifikat med flere navne kaldes ofte et SAN certifikat, eller nogle gange et UCC certifikat.

Fornyelser behandles specielt: de tæller ikke med i dit **Certifikater pr. Registreret domæne** grænse, men de er underlagt en **Duplikat Certifikat **( /docs/duplicate-certificate-limit) begrænsning på 5 om ugen. Overskridelse af duplikatcertifikatgrænsen rapporteurs med fejlmeddelelsen `too many certificates already issued for exact 
set of domains`.

Et certifikat betragtes som en fornyelse (eller et duplikat) af et tidligere certifikat, hvis det indeholder det nøjagtige samme sæt værtsnavne, ignorerer kapitalisering og bestilling af værtsnavne.  For eksempel, hvis du har anmodet om et certifikat for navnene [`www.example.com`, `eksempel. om`], du kan anmode om fire yderligere certifikater for [`www.example.com`, `example.com`] i løbet af ugen. Hvis du har ændret sættet af værtsnavne ved at tilføje [`blog.example.com`], vil du være i stand til at anmode om yderligere certifikater.

Fornyelse af håndtering ignorerer den offentlige nøgle og de udvidelser, der er anmodet om. En certifikatudstedelse kan betragtes som en fornyelse, selvom du bruger en ny nøgle.

**Tilbagekaldelse af certifikater nulstiller ikke kaldsgrænser**, fordi ressourcerne til udstedelse af disse certifikater allerede er blevet forbrugt.

There is a!!crwdBlockTags_34_sgaTkcolBdwrc!![**Failed Validation**](/docs/failed-validation-limit) limit of 5 failures per account, per hostname, per hour. Denne grænse er højere på vores [staging miljø](/docs/staging-environment), så du kan bruge dette miljø til at løse forbindelsesproblemer. Overskridelse af grænsen for mislykkede Valideringer er rapporteres med fejlmeddelelsen `too many failed
authorizations recently`.

Særligt for API-kaldene "new-nonce", "new-account", "new-order" og "revoke-cert" gælder en <a
id="overall-requests"></a>**Samlet Kaldsgrænse** på 20 per sekund. Api-kaldet "/directory" og mappen "/acme" & undermapper har en grænse på 40 anmodninger pr. sekund.

Vi har to andre grænser, som du højst sandsynligt ikke vil løbe ind i.

Du kan maksimalt oprette 10 <a id="accounts-per-ip-address"></a>**Konti pr. IP-adresse** pr. 3 timer. Du kan oprette et maksimum på 500 **konti pr. IP-interval** inden for en IPv6 /48 pr. 3 timer. At ramme begge konto kalds grænse er meget sjældent, og vi anbefaler, at store integratører anvender et design [som benytter én konto til mange kunder](/docs/integration-guide). Overskridelse af disse grænser rapporteres med fejlmeddelelsen `too many registrations for this IP` eller `too many registrations for this IP range`.

Du kan maksimalt have 300 <a id="pending-authorizations"></a>**Afventende godkendelser** på din konto. At ramme denne kalds grænse er sjældent, og sker oftest hvis du udvikler ACME-klienter. Det normalt betyder, at din klient skaber autorisationer og ikke opfylder dem. Benyt venligst vores [staging miljø](/docs/staging-environment), hvis du udvikler en ACME-klient. Overskridelse af grænsen for Afventende Autorisationer er rapporteret med fejlmeddelelsen `too many currently pending authorizations`.

# <a id="overrides"></a>Overstyringer

Hvis du har ramt en kaldsgrænse, har vi ikke en måde at nulstille den midlertidigt. Du skal vente indtil kaldsgrænsen udløber efter en uge. Vi bruger et glidende vindue,, så hvis du har udstedt 25 certifikater mandag og 25 flere certifikater fredag, du vil kunne udstede igen fra mandag. Du kan få en liste over certifikater udstedt for dit registrerede domæne ved [at søge på crt.sh](https://crt.sh), som bruger det offentlige [Certificate Transparency](https://www.certificate-transparency.org) logs.

Hvis du er en stor hosting udbyder eller organisation, der arbejder på en Let's Encrypt integration, vi har en [kalds begrænsnings ansøgnings formular](https://isrg.formstack.com/forms/rate_limit_adjustment_request), der kan bruges til at anmode om en højere kalds grænser. Det tager et par uger at behandle anmodninger, så denne formular er ikke egnet, hvis du blot skal nulstille en hastighedsgrænse hurtigere end den nulstiller på egen hånd.

# <a id="clearing-pending"></a>Ryd Afventende Autorisationer

Hvis du har et stort antal afventende godkendelsesobjekter og får en Afventende Autorisations kaldsbegrænsende fejl, du kan udløse et valideringsforsøg for disse godkendelsesobjekter ved at indsende et JWS-signeret POST til en af dets udfordringer, som beskrevet i [ACME spec](https://tools.ietf.org/html/rfc8555#section-7.5.1). De afventende godkendelsesobjekter er repræsenteret af URL'er på formularen `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ`, og bør vises i dine klientlogs. Bemærk, at det er underordnet om valideringen lykkes eller mislykkes. Begge dele vil tage tilladelsen ud af 'ventende' tilstand. Hvis du ikke har logs, der indeholder de relevante autorisations-URL'er, må du vente på, at kaldsgrænsen udløber. Som beskrevet ovenfor, er der et glidende vindue, så dette kan tage mindre end en uge afhængigt af dit mønster af udstedelser.

Bemærk, at hvis et stort antal ventende godkendelser er generelt resultatet af en fejlbehæftet klient. Hvis du rammer denne sats grænse ofte, bør du dobbelttjekke din klient kode.
