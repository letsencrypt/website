---
title: Profiler
slug: profiles
lastmod: 2025-07-31
show_lastmod: false
---

En profil er en samling af karakteristika, der beskriver både den valideringsproces, der er nødvendig for at få et certifikat, og det endelige indhold af certifikatet. For langt de fleste af Let' Encrypt abonnenter, bør du aldrig behøver at bekymre dig om dette: Vi vælger automatisk den bedste profil for dig, og sikre, at det opfylder alle de krav og bedste praksis, der gælder for webPKI. Men nogle mennesker kan være interesseret i proaktivt at vælge en bestemt profil, så denne side findes for at give de oplysninger, der er nødvendige for at foretage dette valg.

# Vores Profiler

Nedenfor er beskrivelser af hver profil, herunder hvilke virkninger de har på både valideringsprocessen og indholdet af det udstedte certifikat. Bemærk, at ikke alle profiler er tilgængelige i alle miljøer: nogle kan kun være tilgængelige i Staging eller kun i Produktion, og nogle kan være (midlertidigt) låst bag en tilladt liste, så vi kan rulle dem ud langsomt. Listen over profiler annonceret i ACME Server's `directory` endpoint er den kanoniske liste.

Du kan finde detaljerede definitioner af egenskaberne diskuteret i hver profil nederst på denne side.

<div class="boxed">

## classic

Den klassiske profil er standardprofilen valgt for alle ordrer, som ikke anmoder om en bestemt profil. Valideringsprocessen og det resulterende certifikat er de samme som du er vant til fra de sidste mange år af Let's Encrypt driften. Vi anbefaler at bruge denne profil til abonnenter, der gerne vil lade andre prøve nye ting først.

| Egenskaber                                                           | Værdi                                     |
| -------------------------------------------------------------------- | ----------------------------------------- |
| [Afventende Godkendelseslevetid](#pending-authorization-lifetime)    | 7 dage                                    |
| [Autorisation Genbrug Periode](#authorization-reuse-period)          | 30 dage                                   |
| [Ordre Livstid](#order-lifetime)                                     | 7 dage                                    |
| [Certificate Common Name](#certificate-common-name)                  | <a href="#footnote-1">Ja<sup>\*</sup></a> |
| [Key Encipherment KU](#key-encipherment-key-usage)                   | <a href="#footnote-2">Ja<sup>†</sup></a>  |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | <a href="#footnote-3">Ja<sup>‡</sup></a>  |
| [Emne Nøgle ID](#subject-key-identifier-extension)                   | Ja                                        |
| [Gyldighedsperiode](#validity-period)                                | 90 dage                                   |
| [Revocation Information](#revocation-information)                    | CRL                                       |
| [Max Names](#max-names)                                              | 100                                       |
| [Identifikationstyper](#identifier-types)                            | DNS                                       |

<sup id="footnote-1">\*</sup>: Hvis CSR indsendt ved afslutningen af tiden anmoder om et specifikt fælles navn, der svarer til et dNSName Emne Alternativt Navn, at anmodningen er imødekommet. Hvis CSR ikke anmoder om et specifikt fælles navn, vil det første emnealternativ blive forfremmet til emnefællesnavnet. Hvis enten det ønskede navn eller det to-be-forfremmede navn er for langt til at passe i Common Name feltet (64+ tegn), vil fællesnavnet blive efterladt tomt.

<sup id="footnote-2">†</sup>: Kun inkluderet for certifikater med RSA offentlige nøgler.

<sup id="footnote-3">‡</sup>: Indtil 11. Februar 2026. Se [udfasnings tidslinje oplysninger](/2025/05/14/ending-tls-client-authentication/) for en fuld tidslinje.

</div>
<div class="boxed">

## tlsserver

Tlsserveren profil er en ny profil, som opdaterer flere af disse validerings- og certifikategenskaber for at afspejle de seneste anbefalinger fra CA/Browser Forum Baseline Krav, samt generelle tendenser inden for WebPKI-fællesskabet. Vi anbefaler at vælge denne profil for abonnenter, der ønsker mindre certifikater, og som fuldt ud tager automatisering til sig.

Den afventende tilladelse levetid er blevet reduceret for yderligere at fremme automatisering: fuldt automatiserede systemer kan fuldføre en validering udfordring inden for sekunder, så en levetid på blot en time er mere end nok. Perioden for genanvendelse af tilladelser er blevet reduceret til syv timer. Dette skyldes, at Baseline Krav kræver, at vi genkontrollerer Certifikat Authority Authorization (CAA) efter otte timer, så begrænsning af genbrugsperioden betyder, at vi ikke behøver at udføre rechecks. Ordrens levetid er blevet reduceret til summen af to autorisationens levetid, fordi der ikke er noget formål med at have en ordre, der overlever godkendelserne, afhænger af det.

Det udstedte certifikat indeholder ikke længere nogen af de felter, der er nævnt ovenfor. Det fælles navn er blevet udeladt, da det er overflødigt med emnets alternative navne og er markeret som IKKE ANBEFALET ved baseline-kravene. Nøgle krypteringsnøgle anvendelsen udelades fordi det kun er relevant ved brug af ikke-fremadrettede hemmelige TLS-chiffersuiter, som er blevet fjernet af alle større browsere på grund af betydningen af fremadrettet. Den udvidede TLS-klient Auth nøgleanvendelse udelades for at overholde kommende krav til rodprogrammer, der kræver "single-purpose "(dvs. single EKU) certifikater. Og udvidelsen af Suybject Key ID er udeladt, fordi det ikke tjener noget formål i end-entity certifikater og er IKKE ANBEFALET af Baseline Krav.

| Egenskaber                                                           | Værdi   |
| -------------------------------------------------------------------- | ------- |
| [Afventende Godkendelseslevetid](#pending-authorization-lifetime)    | 1 time  |
| [Autorisation Genbrug Periode](#authorization-reuse-period)          | 7 timer |
| [Ordre Livstid](#order-lifetime)                                     | 8 timer |
| [Certificate Common Name](#certificate-common-name)                  | Nej     |
| [Key Encipherment KU](#key-encipherment-key-usage)                   | Nej     |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | Nej     |
| [Emne Nøgle ID](#subject-key-identifier-extension)                   | Nej     |
| [Gyldighedsperiode](#validity-period)                                | 90 dage |
| [Revocation Information](#revocation-information)                    | CRL     |
| [Max Names](#max-names)                                              | 25      |
| [Identifikationstyper](#identifier-types)                            | DNS     |

</div>
<div class="boxed">

## shortlived

Den kortlivede profil er identisk med tlsserver profil, med en hoved forskel, det resulterende certifikat er kun gyldigt i 6 dage. Dette gør det muligt for disse certifikater at kvalificere sig som "Kortlevende Abonnementscertifikater" i henhold til basiskravene, hvilket betyder, at de ikke behøver at indeholde tilbagekaldelsesoplysninger. Det betyder, at certifikaterne kan være endnu mindre, og fjerner enhver mulighed for, at en klient ved et uheld stoler på et certifikat, efter at det er blevet tilbagekaldt.

Vi anbefaler denne profil for dem, der fuldt ud stoler på deres automatisering til at forny deres certifikater til tiden. Denne profil er ikke for alle. Fordi denne profil resulterer i meget højere udstedelsesvolumen (da certifikater skal fornyes hvert par dage, i stedet for hvert par måneder), er det i øjeblikket låst bag en tilladelse.

| Egenskaber                                                           | Værdi     |
| -------------------------------------------------------------------- | --------- |
| [Afventende Godkendelseslevetid](#pending-authorization-lifetime)    | 1 time    |
| [Autorisation Genbrug Periode](#authorization-reuse-period)          | 7 timer   |
| [Ordre Livstid](#order-lifetime)                                     | 8 timer   |
| [Certificate Common Name](#certificate-common-name)                  | Nej       |
| [Key Encipherment KU](#key-encipherment-key-usage)                   | Nej       |
| [TLS Client Auth EKU](#tls-client-authentication-extended-key-usage) | Nej       |
| [Emne Nøgle ID](#subject-key-identifier-extension)                   | Nej       |
| [Gyldighedsperiode](#validity-period)                                | 160 timer |
| [Revocation Information](#revocation-information)                    | CRL       |
| [Max Names](#max-names)                                              | 25        |
| [Identifikationstyper](#identifier-types)                            | DNS, IP   |

</div>

# Valg af profil

Processen for at vælge en profil er beskrevet i [denne Internet-Draft](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/), som vi planlægger at arbejde sammen med IETF ACME-arbejdsgruppen om at gøre til en fuld RFC. Ikke alle ACME-klienter har implementeret dette udkast, så den klient, du bruger, kan måske endnu ikke vælge en profil.

Generelt, hvis du vil vælge en profil, bør du:

1. Læs din ACME-klients dokumentation for at se, om den understøtter profilvalg, og om den gør, hvordan du fortæller den, hvilken profil du ønsker.
2. Hent Let's Encrypt [production](https://acme-v02.api.letsencrypt.org/directory) eller [staging](https://acme-staging-v02.api.letsencrypt.org/directory) katalog-objektet for at se, hvilke profiler der er tilgængelige.
3. Konfigurer din ønskede profil i din ACME-klient.

# Opslag

## Valideringsegenskaber

Nedenfor er beskrivelser af de valideringsegenskaber, der kan styres af vores profiler.

### Afventende Godkendelses Levetid

Dette er hvor længe en ACME-klient har til at fuldføre en valideringsudfordring for domænekontrol. Uret starter, når ACME Authorization objektet er oprettet (generelt som følge af, at en ny ordre bliver oprettet), og er repræsenteret ved [`expires` tidsstempel](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) i det afventende Authorization objekt. Denne værdi er begrænset til [højst 30 dage](https://github.com/cabforum/servercert/blob/main/docs/BR.md#322419-agreed-upon-change-to-website---acme) af baseline-kravene.

### Genanvendelsesperiode For Godkendelse

Dette er hvor længe en allerede valideret godkendelse kan genbruges af nye ordrer, der indeholder samme identifikator. Uret starter, når en udfordring med succes er opfyldt, og er repræsenteret ved [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) i det gyldige godkendelsesobjekt. Denne værdi er begrænset til [højst 398 dage](https://github.com/cabforum/servercert/blob/main/docs/BR.md#421-performing-identification-and-authentication-functions) af baseline-kravene.

### Ordre Levetid

Det er hvor længe, en ACME-klient har til at gennemføre hele processen med at bestille et nyt certifikat: at placere en ny ordre, opfylder alle udestående godkendelser, og færdiggør denne ordre. Uret starter, når en ny ordre er oprettet, og er repræsenteret ved [`expires` timestamp](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.3) i det ordre objektet.

## Certifikat- Egenskaber

Nedenfor er beskrivelser af certifikatets egenskaber, der kan styres af vores profiler.

### Certifikatets Fælles Navn

TLS-certifikater kan indeholde navne (f.eks. domænenavne eller IP-adresser) to steder: feltet [Emne Fællesnavn](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) og forlængelsen [Emne Alternative Navne](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). Fællesnavnet bruges til at være det mest almindelige sted at sætte et domænenavn, og vises med mange certifikat-læsnings værktøjer. Bemærk at Common Name kan kun indeholde et navn, mens mange certifikater ønsker at indeholde flere navne (såsom `example.com`, `www.example.com`, og `blog.example.com`). I dag er fællesnavnet stort set overflødigt som det navn er indeholdt i det er nødvendigt at _også_ være indeholdt i Emne Alternative Navne udvidelsen. At inkludere dette felt i vores certifikater er nu [IKKE ANBEFALET af baseline krav](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated).

### Nøgle Indkodning Nøglebrug

TLS-certifikater har en ["Nøgleanvendelse"-udvidelse](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3), som bestemmer, hvilke typer af kryptografiske operationer nøglen i certifikatet har lov til at udføre. Alle Let's Encrypt certifikater indeholder Digital Signature KU, som er nødvendig for at udføre TLS-håndtryk. Nøgle Encipherment KU var historisk krævet af gamle versioner af TLS til at udføre visse former for håndtryk med RSA-nøgler. Bemærk disse operationer er nu kendt for at være usikre, og er blevet forældet og fjernet fra browsere i flere år nu. At inkludere dette felt i vores certifikater er nu [IKKE ANBEFALET af baseline krav](https://github.com/cabforum/servercert/blob/main/docs/BR.md#712711-subscriber-certificate-key-usage).

### TLS- Klientgodkendelse Udvidet Nøglebrug

Ud over ovenstående har TLS-certifikater også en ["Udvidet nøglebrug"-udvidelse](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.12), som giver et ekstra lag af opløsning til Key Usage forlængelse beskrevet ovenfor. De to mest almindelige udvidede nøgleanvendelser er TLS Server Auth (som tillader certifikatet at blive præsenteret af en server under en TLS-håndtrykke) og TLS-klient Auth (som tillader certifikatet at blive præsenteret af en _client_ under en TLS-håndtrykke). Understøttelse af [TLS Client Authentication bliver udfaset](/2025/05/14/ending-tls-client-authentication/) i 2026.

### Subject Key Identifier Udvidelsen

TLS certifikater kan have en ["Emne Key Identifier" udvidelse](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2), som giver en kort streng, der entydigt identificerer den offentlige nøgle til stede i certifikatet. Denne udvidelse er meget vigtig for CA-certifikater fordi det giver browsere mulighed for hurtigt at finde det CA-certifikat, der udstedte det endelige enhedscertifikat, der præsenteres af et websted. Udvidelsen tjener imidlertid ikke noget formål i de endelige enhedscertifikater, og inklusive den er nu IKKE ANBEFALET ved Baseline kravene.

### Gyldighedsperiode

Dette regulerer mængden af tid mellem [`notBefore` og `notAfter` tidsstempler](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5) der er indlejret i et TLS-certifikat med andre ord, hvor længe certifikatet vil være betroet før det udløber. Denne værdi er begrænset til [højst 398 dage](https://github.com/cabforum/servercert/blob/main/docs/BR.md#632-certificate-operational-periods-and-key-pair-usage-periods) af baseline-kravene.

### Tilbagekaldelsesoplysninger

TLS klienter har brug for en måde at afgøre, om et certifikat er blevet tilbagekaldt. Generelt er der tre mekanismer til dette i Web PKI: Online Certificate Status Protocol (OCSP), Certifikattilbagekaldelseslister (CRL), og med en gyldighedsperiode så kort, at tilbagekaldelse er unødvendig. Bemærk, at Let's Encrypt ikke understøtter OCSP. Dette felt angiver, om certifikater udstedt under en given profil har en CRL URL eller ej.

### Maks Navne

Dette er det maksimale antal af ["Emne Alternative Navne"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) for hvilket vi vil udstede et certifikat.

### Identifikationstyper

Dette regulerer, hvilke typer af ["Emne Alternative Navne"](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) (`dnsName` eller `iPAddress`) et certifikat kan indeholde.
