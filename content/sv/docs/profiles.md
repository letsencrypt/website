---
title: Profiler
slug: profiles
lastmod: 2026-07-14
show_lastmod: false
---

En profil är en samling egenskaper som beskriver både valideringsprocessen som krävs för att få ett certifikat och det slutliga innehållet i det certifikatet. För den absoluta majoriteten av Let's Encrypt prenumeranter behöver du aldrig oroa dig för detta: vi väljer automatiskt den bästa profilen åt dig och säkerställer att den uppfyller alla krav och bästa praxis som styr Web PKI. Men vissa personer kan vara intresserade av att proaktivt välja en specifik profil, så denna sida finns för att tillhandahålla den information som behövs för att göra det valet.

# Våra profiler

Nedan finns beskrivningar av varje profil, inklusive vilka effekter de har på både valideringsprocessen och innehållet i det utfärdade certifikatet. Observera att alla profiler inte är tillgängliga i alla miljöer: vissa kan bara vara tillgängliga i Staging eller endast i Produktion, och vissa kan vara (tillfälligt) låsta bakom en tillåtelselista så att vi kan införa dem långsamt. Listan över profiler som annonseras i ACME-serverns `directory`-endpoint är den kanoniska listan.

Du kan hitta detaljerade definitioner av de egenskaper som diskuteras i varje profil längst ner på denna sida.

<div class="boxed">

## classic

Den klassiska profilen är standardprofilen som väljs för alla beställningar som inte begär en specifik profil. Valideringsprocessen och det resulterande certifikatet är detsamma som du är van vid från de senaste flera åren av Let's Encrypt-verksamhet. Vi rekommenderar att använda denna profil för prenumeranter som är nöjda med att låta andra prova nya saker först.

| Egenskap                                                          | Värde                                     |
| ----------------------------------------------------------------- | ----------------------------------------- |
| [Pending Authorization Lifetime](#pending-authorization-lifetime) | 7 dagar                                   |
| [Authorization Reuse Period](#authorization-reuse-period)         | 30 dagar                                  |
| [Order Lifetime](#order-lifetime)                                 | 7 dagar                                   |
| [Certificate Common Name](#certificate-common-name)               | <a href="#footnote-1">Ja<sup>\*</sup></a> |
| [Key Encipherment KU](#key-encipherment-key-usage)                | <a href="#footnote-2">Ja<sup>†</sup></a>  |
| [Subject Key ID](#subject-key-identifier-extension)               | Ja                                        |
| [Validity Period](#validity-period)                               | 90 dagar                                  |
| [Revocation Information](#revocation-information)                 | CRL                                       |
| [Max Names](#max-names)                                           | 100                                       |
| [Identifier Types](#identifier-types)                             | DNS                                       |

<sup id="footnote-1"> \* </sup>: Om CSR som skickas vid slutförandet efterfrågar ett specifikt Common Name som motsvarar ett dNSName Subject Alternative Name, beaktas den begäran. Om CSR inte begär ett specifikt Common Name kommer det första dNSName Subject Alternative Name som begärs att flyttas upp till Subject Common Name. Om antingen det begärda namnet eller det namn som ska flyttas upp är för långt för att passa i Common Name-fältet (64+ tecken) kommer Common Name att lämnas tomt.

<sup id="footnote-2"> † </sup>: Endast inkluderat för certifikat med RSA-offentliga nycklar.

</div>
<div class="boxed">

## tlsserver

tlsserver-profilen är en ny profil som uppdaterar flera av dessa validerings- och certifikategenskaper för att återspegla de senaste rekommendationerna i CA/Browser Forums grundkrav och allmänna trender i WebPKI-communityn. Vi rekommenderar att välja denna profil för prenumeranter som vill ha mindre certifikat och som helt omfamnar automation.

Giltighetstiden för väntande auktoriseringar har kortats för att ytterligare främja automatisering. Helautomatiska system kan slutföra en valideringsutmaning på några sekunder, så en giltighetstid på en timme är mer än tillräcklig. Återanvändningsperioden för behörighet har reducerats till sju timmar. Detta beror på att grundkraven kräver att vi kontrollerar auktoriseringen av certifikatutfärdare (CAA) på nytt efter åtta timmar. Genom att begränsa återanvändningsperioden slipper vi därför göra om kontrollerna. Orderns livstid har minskats till summan av två auktorisationslivstider, eftersom det finns lite syfte med att ha en order som lever längre än de auktorisationer den är beroende av.

Det utfärdade certifikatet saknar Common Name, eftersom det är redundant med Subject Alternative Name-fälten och enligt grundkraven INTE REKOMMENDERAS. Nyckelanvändningen Key Encipherment utelämnas eftersom den endast är relevant vid användning av icke-framåt-sekretess TLS-chifferuppsättningar, som har tagits bort av alla större webbläsare på grund av vikten av framåt-sekretess. Subject Key ID-tillägget utelämnas eftersom det inte fyller någon funktion i slutentitetscertifikat och enligt grundkraven INTE REKOMMENDERAS. Och slutligen är det resulterande certifikatet endast giltigt i 45 dagar, i förberedelse för kommande begränsningar som kommer att begränsa alla certifikat till högst 47 dagar.

| Egenskap                                                                    | Värde    |
| --------------------------------------------------------------------------- | -------- |
| [Giltighetstid för väntande auktorisering](#pending-authorization-lifetime) | 1 timme  |
| [Återanvändningsperiod för auktorisering](#authorization-reuse-period)      | 7 timmar |
| [Beställningens giltighetstid](#order-lifetime)                             | 8 timmar |
| [Certifikatets Common Name](#certificate-common-name)                       | Nej      |
| [Key Encipherment KU](#key-encipherment-key-usage)                          | Nej      |
| [Subjektets nyckel-ID](#subject-key-identifier-extension)                   | Nej      |
| [Validity Period](#validity-period)                                         | 45 dagar |
| [Revocation Information](#revocation-information)                           | CRL      |
| [Max Names](#max-names)                                                     | 25       |
| [Identifierartyper](#identifier-types)                                      | DNS      |

</div>
<div class="boxed">

## shortlived

Den kortlivade profilen är identisk med tlsserver-profilen, med en viktig skillnad: det resulterande certifikatet är endast giltigt i cirka 6 dagar. Detta gör att certifikaten kan klassificeras som ”kortlivade prenumerantcertifikat” enligt grundkraven, vilket innebär att de inte behöver innehålla någon återkallelseinformation. Detta betyder att certifikaten kan vara ännu mindre och eliminerar möjligheten att en klient av misstag litar på ett certifikat efter att det har återkallats. Idag inkluderar dessa certifikat fortfarande en CRL-URL, som visas i tabellen nedan, men [det kan ändras i framtiden](https://github.com/letsencrypt/boulder/issues/7673).

Vi rekommenderar denna profil för dem som fullt ut litar på sin automatisering för att förnya sina certifikat i tid. Denna profil är inte för alla.

| Egenskap                                                                    | Värde      |
| --------------------------------------------------------------------------- | ---------- |
| [Giltighetstid för väntande auktorisering](#pending-authorization-lifetime) | 1 timme    |
| [Återanvändningsperiod för auktorisering](#authorization-reuse-period)      | 7 timmar   |
| [Beställningens giltighetstid](#order-lifetime)                             | 8 timmar   |
| [Certifikatets Common Name](#certificate-common-name)                       | Nej        |
| [Key Encipherment KU](#key-encipherment-key-usage)                          | Nej        |
| [Subject Key ID](#subject-key-identifier-extension)                         | Nej        |
| [Validity Period](#validity-period)                                         | 160 timmar |
| [Återkallelseinformation](#revocation-information)                          | CRL        |
| [Högsta antal namn](#max-names)                                             | 25         |
| [Identifierartyper](#identifier-types)                                      | DNS, IP    |

</div>
<div class="boxed">

## tlsclient

Från och med den 8 juli 2026 är denna profil inte längre tillgänglig.

Certifikat som utfärdats med tlsclient-profilen innehöll TLS Client Auth EKU.
Det var annars identiskt med den klassiska profilen.

</div>

# Välja en profil

Processen för att välja en profil beskrivs i [denna Internet-Draft](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/), som vi planerar att arbeta med IETF ACME Working Group för att omvandla till en fullständig RFC. Inte alla ACME-klienter har implementerat detta utkast, så klienten du använder kanske ännu inte kan välja en profil.

Generellt, om du vill välja en profil, bör du:

1. Läsa dokumentationen för din ACME-klient för att se om den stöder profilsval, och om den gör det, hur du anger vilken profil du vill ha.
2. Hämta Let's Encrypt [produktions](https://acme-v02.api.letsencrypt.org/directory) eller [staging](https://acme-staging-v02.api.letsencrypt.org/directory) katalogobjekt för att se vilka profiler som finns tillgängliga.
3. Konfigurera din önskade profil inom din ACME-klient.

# Ordlista

## Valideringsegenskaper

Nedan följer beskrivningar av de valideringsegenskaper som kan styras av våra profiler.

### Livstid för väntande auktorisation

Detta är hur länge en ACME-klient har på sig att slutföra en domänkontrollvalideringsutmaning. Klockan startar när ACME Authorization-objektet skapas (generellt som ett resultat av att en ny Order skapas) och representeras av [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) i det väntande auktorisationsobjektet. Grundkraven begränsar värdet till [högst 30 dagar](https://github.com/cabforum/servercert/blob/main/docs/BR.md#322419-agreed-upon-change-to-website---acme).

### Auktorisationsåteranvändningsperiod

Så här länge kan en redan validerad auktorisation återanvändas av nya beställningar som innehåller samma identifierare. Klockan börjar när en utmaning framgångsrikt uppfylls och representeras av [`expires`-tidsstämpeln](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) i det giltiga auktorisationsobjektet. [Baslinjekrav](https://github.com/cabforum/servercert/blob/main/docs/BR.md#421-performing-identification-and-authentication-functions) kräver att denna period inte överstiger 200 dagar; gränsen sänks till 100 dagar för certifikat utfärdade från 15 mars 2027, och till 10 dagar från 15 mars 2029.

### Beställningens livslängd

Så här länge har en ACME-klient på sig att slutföra hela processen med att beställa ett nytt certifikat: lägga en ny beställning, uppfylla eventuella väntande auktorisationer och slutföra den beställningen. Klockan börjar när det nya beställningsobjektet skapas och representeras av [`expires`-tidsstämpeln](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.3) i beställningsobjektet.

## Certifikategenskaper

Nedan följer beskrivningar av de certifikategenskaper som kan kontrolleras via våra profiler.

### Certifikatets vanliga namn

TLS-certifikat kan innehålla namn (till exempel domännamn eller IP-adresser) på två ställen: i [Subject Common Name-fältet](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) och i [Subject Alternative Name-tillägget](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). Det vanliga namnet var tidigare det vanligaste stället att sätta ett domännamn på och visas av många certifikattolkande verktyg. Dock kan det vanliga namnet endast innehålla ett namn, medan många certifikat vill innehålla flera namn (såsom `example.com`, `www.example.com` och `blog.example.com`). I dag är Common Name till stor del överflödigt, eftersom namnet även måste finnas i Subject Alternative Name-tillägget. Enligt grundkraven är det nu [INTE REKOMMENDERAT](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated) att inkludera fältet i våra certifikat.

### Nyckelinkrypteringens nyckelanvändning

TLS-certifikat har ett [Key Usage-tillägg](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3) som anger vilka kryptografiska operationer certifikatets nyckel får utföra. Alla Let's Encrypt-certifikat innehåller Digital Signature KU, vilket är nödvändigt för att utföra TLS-handshakes. Key Encipherment KU var historiskt sett krävd av äldre versioner av TLS för att utföra vissa typer av handshakes med RSA-nycklar. Dock är dessa operationer numera kända för att vara osäkra och har deprecierats och tagits bort från webbläsare i flera år. Enligt grundkraven är det nu [INTE REKOMMENDERAT](https://github.com/cabforum/servercert/blob/main/docs/BR.md#712711-subscriber-certificate-key-usage) att inkludera nyckelanvändningen Key Encipherment.

### Subject Key Identifier-tillägg

TLS-certifikat kan ha ett [Subject Key Identifier-tillägg](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2) med en kort sträng som entydigt identifierar certifikatets publika nyckel. Tillägget är mycket viktigt för CA-certifikat, eftersom webbläsare då snabbt kan hitta det CA-certifikat som utfärdade slutentitetscertifikatet som webbplatsen presenterar. I slutentitetscertifikat fyller tillägget dock ingen funktion, och enligt grundkraven rekommenderas det nu INTE att inkludera tillägget.

### Giltighetsperiod

Detta styr tiden mellan [`notBefore` och `notAfter`-tidsstämplarna](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5) som är inbäddade i ett TLS-certifikat, med andra ord hur lång tid certifikatet kommer att vara betrott innan det går ut. [Baslinjekrav](https://github.com/cabforum/servercert/blob/main/docs/BR.md#632-certificate-operational-periods-and-key-pair-usage-periods) kräver att denna period inte överstiger 200 dagar; gränsen sänks till 100 dagar för certifikat utfärdade från 15 mars 2027, och till 47 dagar från 15 mars 2029.

### Information om återkallande

TLS-klienter behöver ett sätt att avgöra om ett certifikat har återkallats. Generellt finns det tre mekanismer för detta i Web PKI: Online Certificate Status Protocol (OCSP), Certificate Revocation Lists (CRLs), och att ha en giltighetsperiod som är så kort att återkallande är onödigt. Let's Encrypt stöder inte OCSP. Detta fält anger om certifikat som utfärdas under en given profil har en CRL-URL eller inte.

### Maximalt antal namn

Detta är det maximala antalet ["Subject Alternative Names"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) för vilket vi kommer att utfärda ett certifikat.

### Identifieringstyper

Detta styr vilka typer av ["Subject Alternative Names"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) (`dnsName` eller `iPAddress`) ett certifikat kan innehålla.
