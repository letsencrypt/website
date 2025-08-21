---
title: Grænser For kald
slug: rate-limits
lastmod: 2025-06-12
show_lastmod: true
---

Let's Encrypt giver kaldsgrænser for at sikre rimelig brug af så
mange mennesker som muligt. Vi mener, at disse kald grænser er høje nok til at arbejde med
for de fleste mennesker som standard. Vi har også designet dem, så fornyelse af et
certifikat næsten aldrig rammer en kalds grænse, og således at store
organisationer gradvist kan øge antallet af certifikater, de kan udstede
uden at kræve intervention fra Let's Encrypt.

Hvis du aktivt udvikler eller tester en Let's Encrypt klient, så benyt venligst
vores [staging miljø](/docs/staging-environment) i stedet for produktions API. Hvis du arbejder på at integrere Let's Encrypt som udbyder eller med et stort
websted, bedes du gennemgå vores [Integrations Guide](/docs/integration-guide).

# Hvordan vores kald begrænsninger virker

Grænser beregnes, per kald, ved hjælp af en utæt
spand algoritme. Denne
tilgang giver fleksibilitet i, hvordan du bruger dine tildelte kald. Du kan
enten fremsætte anmodninger i fuld fart – op til den fulde grænse – eller udjævne dine anmodninger
for at undgå risikoen for at blive begrænset.

Hvis du har ramt en kaldsgrænse, har vi ikke en måde at nulstille den midlertidigt. Ingen grund til bekymring - din kapacitet for denne grænse vil gradvist genopfyldt over tid, at tillade
dig at fremsætte flere anmodninger uden du behøver at gøre noget. Tilbagekaldelse af certifikater nulstiller **ikke** kaldsgrænser, fordi ressourcerne til
udstedelse af disse certifikater allerede er blevet forbrugt. For mere information, se venligst
[Prøv igen efter overskridelse af kalds grænser](#retrying-after-hitting-rate-limits).

# Grænser For Kontoregistrering

Følgende grænser gælder, når abonnenter anmoder om en ny konto ved hjælp af
new-account API'et. Overskridelse af disse grænser er meget sjældent. Vi anbefaler, at
store integratorer anvender et design, som bruger en konto til mange
kunder.

<div class="boxed">

## Nye registreringer pr. IP-adresse

Op til 10 konti kan oprettes fra en enkelt IP-adresse for hver 3 timer. Muligheden for at oprette nye konti genfylder med en sats på 1 konto hvert 18. minut.

### Overstyringer

Vi tilbyder **ikke** overskridelser af denne grænse.

</div>
<div class="boxed">

## Nye registreringer pr. IPv6-interval

Op til 500 konti kan oprettes fra en enkelt /48 IPv6 subnet hver 3. time.
Evnen til at oprette nye konti genfylder med en sats på 1 konto hver 22
sekunder.

### Overstyringer

Vi tilbyder **ikke** overskridelser af denne grænse.

</div>

# Begrænsninger For Certifikatudstedelse

Følgende grænser gælder, når abonnenter anmoder om et nyt certifikat ved hjælp af
`new-order` API'et. Overskridelse af disse grænser er mere almindeligt, især for
store hosting-udbydere eller organisationer, der udsteder certifikater for mange
værtsnavne.

<div class="boxed">

## Nye ordrer pr konto

Nye ordrer pr. konto
Hver gang du anmoder om et certifikat fra Let's Encrypt, oprettes en ny ordre.
Et enkelt certifikat kan indeholde op til 100 identifikatorer (DNS-navne eller IP
adresser). Af hensyn til ydeevne og pålidelighed er det bedre at bruge færre navne pr certifikat, når det er muligt.

### Grænse

Op til 300 nye ordrer kan oprettes af en enkelt konto hver 3. time. Evnen til at oprette nye ordrer genfylder med en sats på 1 ordre hver 36
sekunder.

### Overstyringer

Overskridelser
For at overskride denne grænse, skal du anmode om en
overskridelse for en specifik konto.

</div>
<div class="boxed">

## Nye certifikater pr registreret domæne

Et registreret domæne er generelt den del af domænet, du har købt
hos din domænenavnsregistrant. For eksempel på `www.example.com`, er det
registrerede domæne `example.com`. I `new.blog.example.co.uk`, er det registrerede
domæne `eksempel.co.uk`. Vi bruger Public Suffix
List til at identificere registrerede domæner.

Hvis du anmoder om et certifikat til en IP-adresse, vi forsøger også at behandle
mest almindelige allokering (hvad du ville få fra din internetudbyder eller hosting-udbyder) som
"registreret domæne." For IPv4-adresser behandler vi den nøjagtige adresse som det
registrerede domæne. For IPv6-adresser, behandler vi det indeholdende /64 område som
registrerede domæne.

### Grænse

Op til 50 certifikater kan udstedes pr. registreret domæne (eller IPv4 adresse, eller
IPv6 /64 område) hver 7. dag. Dette er
en global grænse, og alle nye ordreanmodninger, uanset hvilken konto der indsender
dem, tæller med i denne grænse.
Evnen til at udstede nye certifikater for
samme registrerede domæne genfyldes med en sats på 1 certifikat hvert 202 minutter.

### Overstyringer

For at overskride denne grænse, skal du anmode om en
tilsidesættelse for det specifikke registrerede domæne eller en konto.

</div>
<div class="boxed">

## Nye certifikater pr. nøjagtige sæt af identifikatorer

Hvis du anmoder om et certifikat for `192.168.1.1`, `example.com` og
`login.example.com`, er "exact set of identifiers" `[192.168.1.1,
example.com, login.example.com]`. Hvis du anmoder om et
certifikat for kun 1 værtsnavn, såsom `eksempel.co.uk`, så ville det nøjagtige sæt af
værtsnavne være `[example.co.uk]`.

### Grænse

Op til 5 certifikater kan udstedes pr. nøjagtig samme sæt af værtsnavne hver 7 dage. Dette er
en global grænse, og alle nye ordreanmodninger, uanset hvilken konto der indsender
dem, tæller med i denne grænse. Evnen til at udstede nye certifikater for
samme sæt af værtsnavne genfyldes med en sats på 1 certifikat hvert 34 timer.

### Almindelige Årsager

Almindelige årsagerReinstallation af din klient flere gange for at fejlfinde en ukendt fejl, eller
sletning af din ACME-klients konfigurationsdata, hver gang du opdaterer din applikation, er almindelige måder at ramme denne grænse. Vi har bevidst sat denne
grænse relativt lav for at forhindre fejlfyldte systemer eller software under udvikling hurtigt forbruger kapacitet af andre kapacitetsgrænser.

Ved test eller fejlfinding af dine applikationer, anbefaler vi at konfigurere din
klient til at bruge vores [staging miljø](/docs/staging-environment), som har [væsentligt højere](/docs/staging-environment/#rate-limits) grænser.

### Omgåelse

Hvis du har ramt denne grænse, kan du ændre sættet af værtsnavne ved at tilføje
`blog.example.com`, for at anmode om yderligere certifikater. Vær opmærksom på, at disse nye
ordrer ikke ville blive betragtet som fornyelser. De vil derfor være underlagt satsgrænserne for
[Nye Ordrer pr. konto](#new-orders-per-account) og Nye Certifikater pr.
Registreret domæne.

### Overstyringer

Vi tilbyder **ikke** tilsidesættelser af denne grænse.

</div>
<div class="boxed">

## Godkendelsesfejl pr. værtsnavn pr. konto

Der genereres en tilladelse for hver identifikator (DNS-navn eller IP-adresse)
inkluderet i en ordre. Før et
certifikat kan udstedes, skal alle godkendelser i ordren valideres med succes. En mislykket godkendelse betyder, at selv om anmodninger om
validering blev sendt med succes, alle forsøg med Let's Encrypt for at valideringskontrollen af værtsnavnet mislykkedes.

### Grænse

Op til 5 godkendelsesfejl pr. værtsnavn kan påføres af en konto hver
time. Evnen til at pådrage sig godkendelsesfejl genfylder med en hastighed på 1 per værtsnavn hver 12 minutter. Når den er overskredet, håndhæves denne grænse ved at forhindre
nye ordrer på samme værtsnavn, af den samme konto indtil grænsen
nulstilles.

### Almindelige Årsager

Før du begynder fejlfinding, anbefaler vi, at du sætter din klient til at bruge vores
[iscenesættelse miljø](/docs/staging-environment). Dette miljø har
[væsentligt højere](/docs/staging-environment/#rate-limits) grænser, som kan
hjælpe dig med at identificere og løse problemer uden at forbruge dine produktionsgrænser.

- Valideringsfejl ved brug af metoderne `HTTP-01` og `TLS-ALPN-01` stammer normalt
  fra netværks- eller firewall-konfigurationer, der forhindrer Let's Encrypt
  -valideringsservere i at nå frem til din server.

- Valideringsfejl ved brug af 'DNS-01'-metoden skyldes ofte manglende
  trin eller stavefejl under den indledende opsætningsproces. Typisk kræver denne validering
  metode, at du opretter en CNAME-post i din primære DNS-zone, aktivere
  din klient til at indstille de nødvendige DNS-poster under valideringsprocessen.

### Overstyringer

Vi tilbyder **ikke** overskridelser af denne grænse.

</div>
<div class="boxed">

## Fortløbende autorisationsfejl pr. værtsnavn pr. konto

I lighed med Authorization Failures per Identifier per
Account, men gælder kun for
på hinanden følgende fejl. Denne grænse er tilføjet med henblik på at forhindre kunder i at få
fast for evigt i en løkke af fejlede valideringer.

### Grænse

Op til 1.152 på hinanden følgende godkendelsesfejl per identifikator kan afholdes af
én konto. Evnen til at pådrage sig autorisationsfejl genfylder med en hastighed på 1
pr. værtsnavn hver dag og nulstiller til nul, hvis en autorisation til at værtsnavn
er valideret med succes. Når den er overskredet, er kontoen forhindret i at
anmoder om nye certifikater for det værtsnavn. Hver gang abonnenten forsøger
at anmode om et certifikat, vil de modtage en fejl med et link til vores
Selvbetjenings Portal hvor de kan genoptage udstedelsen for den pausede værtsnavn og
op til 49.999 yderligere pausede værtsnavne tilknyttet deres konto.

| Fejl pr. dag | Pause tid                                               |
| ---------------------------- | ------------------------------------------------------- |
| 1                            | ∞ (aldrig sat på pause)              |
| 2                            | 1.152 dage (3,16 år) |
| 5                            | 288 dage (9,46 måneder)              |
| 10                           | 128 dage (4,21 måneder)              |
| 15                           | 82 dage (2,70 måneder)               |
| 20                           | 61 dage (1,99 måneder)               |
| 30                           | 40 dage                                                 |
| 40                           | 30 dage                                                 |
| 120                          | 10 dage                                                 |

### Almindelige Årsager

Før du begynder fejlfinding, anbefaler vi, at du sætter din klient til at bruge vores
[iscenesættelse miljø](/docs/staging-environment). Dette miljø har
[væsentligt højere](/docs/staging-environment/#rate-limits) grænser, som kan
hjælpe dig med at identificere og løse problemer uden at forbruge dine produktionsgrænser.

- Valideringsfejl ved brug af metoderne `HTTP-01` og `TLS-ALPN-01` stammer normalt
  fra netværks- eller firewall-konfigurationer, der forhindrer Let's Encrypt
  -valideringsservere i at nå frem til din server.

- Valideringsfejl ved brug af 'DNS-01'-metoden skyldes ofte manglende
  trin eller stavefejl under den indledende opsætningsproces. Typisk kræver denne validering
  metode, at du opretter en CNAME-post i din primære DNS-zone, aktivere
  din klient til at indstille de nødvendige DNS-poster under valideringsprocessen.

### Overstyringer

Vi tilbyder **ikke** overskridelser af denne grænse.

</div>

# Generelle grænser for kald

Udover vores [kontoregistrering](#account-registration-limits) og
[udstedelse af certifikat](#certificate-issuance-limits) grænser, er der
per API kald overordnede forespørgselsgrænser, der gælder per-IP-adresse. Disse
håndhæves af vores load balancers og er designet til at beskytte ACME API mod
bliver overvældet af klienter, der foretager for mange anmodninger på én gang.

| Endpoint           | Anmodninger pr. IP (pr. sekund) | Maksimal kaldskapacitet |
| ------------------ | ---------------------------------------------------------------------------------- | ----------------------- |
| /acme/new-nonce    | 20                                                                                 | 10                      |
| /acme/new-account  | 5                                                                                  | 15                      |
| /acme/new-order    | 300                                                                                | 200                     |
| /acme/revoke-cert  | 10                                                                                 | 100                     |
| /acme/renewal-info | 1000                                                                               | 100                     |
| /acme/\*           | 250                                                                                | 125                     |
| /directory         | 40                                                                                 | 40                      |

Abonnenter, der overskrider disse grænser, vil modtage en '503 tjeneste utilgængelig'
HTTP svarkode. Svaret vil indeholde en `Retry-After` header.

# Begrænsnings undtagelser for fornyelser

Let's Encrypt genkender en ny certifikatordre som en "fornyelse" på to måder: den
foretrukne metode er via ACME Renewal Info (ARI), som er undtaget fra alle
-satsgrænser, og den anden bygger på ældre detektionslogik, som
betragter ordrer med nøjagtig samme sæt værtsnavne som fornyelser, men kan stadig
være underlagt visse kapacitetsgrænser.

## ARI Fornyelser

Fornyelser koordineret af ARI tilbyder den unikke fordel ved at blive fritaget for alle
kapacitetsgrænser. Klienter, der understøtter ARI med jævne mellemrum tjekker med Let's Encrypt's servere for at afgøre, om dit eksisterende certifikat bør fornyes. Når det optimale
fornyelsesvindue er nået, anmoder klienten udtrykkeligt om en ny ordre, der angiver det certifikat, den erstatter. Hvis den nye ordre indeholder mindst et
værtsnavn, der matcher det certifikat, den agter at erstatte, og certifikatet er
ikke tidligere blevet erstattet med ARI, ordren vil ikke være underlagt nogen
satsgrænser.

## Ikke-ARI-fornyelser

Hvis din klient eller hostingudbyder endnu ikke har tilføjet support til ARI, din ordre
kan stadig betragtes som en fornyelse af et tidligere certifikat, hvis det indeholder
nøjagtig samme sæt værtsnavne, ignorerer kapitalisering og rækkefølgen af værtsnavne. Hvis du f.eks. har anmodet om et certifikat for identifikatorerne
`[192.168.1.1, www.example.com, example.com]`, kan du anmode om fire
-certifikater til `[192. 68.1.1, www.example.com, example.com]` før du trykker på
satsgrænsen for Nye Certifikater pr. eksakt sæt af
Identifikatorer. Hver af
disse nye ordrer vil blive betragtet som fornyelser og ville være fritaget fra Nye
Ordrer per konto og Nye Certifikater per
Registreret Domæne satsgrænser.
I modsætning til ARI fornyelser vil disse ordrer ville stadig være underlagt
Authorization Failures per Hostname per
Account og New Certificates
per Exact Set of Hostnames.

# Genforsøg efter at have ramt kapacitetsgrænser

Alle vores kapacitetsbegrænsning fejlmeddelelser følger det samme format. For eksempel:

```
too many new registrations (10) from this IP address in the last 3h0m0s,
retry after 1970-01-01 00:18:15 UTC.
```

Du bør være i stand til at foretage den samme anmodning efter den angivne dato
og tidspunkt. Hvis din anmodning overstiger kapaciteten af mere end en af vores grænser,
vil vi altid returnere fejlmeddelelsen for den grænse, der nulstiller længst i
fremtiden.

## Forsøg Efter Header

Vi inkluderer en `Retry-After` header i alle rate limit fejlsvar, der angiver
varigheden af din klient bør vente, før den forsøger igen.

Du kan få en liste over certifikater udstedt for dit registrerede domæne ved at
søge [crt.sh](https://crt.sh/) eller [Censys](https://search. ensys.io/#),, der bruger den offentlige Certificate
Transparency logs.

# Anmodning om overskridning

Hvis du er en stor hosting udbyder eller organisation, der arbejder på en Let's Encrypt
integration, vi har en hastighedsbegrænsende
-form der kan
bruges til at anmode om højere hastighedsgrænser. Det tager et par uger at behandle
anmodninger, så denne formular er ikke egnet, hvis du blot skal nulstille en hastighedsgrænse
hurtigere end den nulstiller på egen hånd.
