---
title: Certifikat Autoritetsgodkendelse (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2023-08-16
show_lastmod: 1
---


CAA er en type DNS-post, der giver ejere af webstedet mulighed for at angive, hvilket certifikat myndigheder (CAs) har lov til at udstede certifikater, der indeholder deres domænenavne. Den blev først standardiseret i 2013, og den version, vi bruger i dag, blev standardiseret i 2019 af [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659) og [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657). Som standard må alle offentlige CA udstede certifikater for ethvert domænenavn i den offentlige DNS forudsat at de validerer kontrollen med det pågældende domænenavn. That means that if there's a bug in any one of the many public CAs' validation processes, every domain name is potentially affected. CAA giver mulighed for, at indehavere af domæner kan reducere denne risiko.

# Brug Af CAA

Hvis du ikke bekymrer dig om CAA, behøver du generelt ikke at gøre noget (men se CAA fejl nedenfor). Hvis du ønsker at bruge CAA til at begrænse, hvilke certifikat- myndigheder der må udstede certifikater for dit domæne, du bliver nødt til at bruge en DNS-udbyder, der understøtter opsætning af CAA-poster. Tjek [SSLMate's CAA side](https://sslmate.com/caa/support) for en liste over sådanne udbydere. Hvis din udbyder er listet, du kan bruge [SSLMate's CAA Record Generator](https://sslmate.com/caa/) til at generere et sæt CAA poster med de CAA elementer, som du ønsker at tillade.

## Hvor skal posten placeres

Generelt ønsker du at indstille CAA poster på dit registrerede domæne (såsom "example.org" eller "mysite.co.uk"). På denne måde gælder de for både dette domæne og eventuelle subdomæner, du opretter under det, såsom "community.example.org".

Bemærk at CA vil alt tid følge den CAA post, som er *mest specifikt* i forhold til det domæne navn, som certifikatet ønskes udstedt for. Så hvis du anmoder om et cert til "www.community.example.org", vil CA'en tjekke "www.community.example.org", så "community.example.org", så "example.org", stopper ved den første CAA post, den finder.

Det betyder, at du kan overskrive CAA for subdomæner. For eksempel, formode, at du hoster "example.org" selv, men har "api.example.org" på en cloud udbyder. Du kan bruge en CAA post på "example.org" at sige, at kun Let's Encrypt kan udstede for dette domæne og alle dets underdomæner, men også bruge en CAA post på "api.example.org" at tilsidesætte det og tillade cloud udbyder at udstede certifikater for det ene subdomæne.

Bemærk også, at CAA kontrol følger CNAME omdirigerer, ligesom alle andre DNS anmodninger. Hvis "community.example.org" er en CNAME til "example.forum.com", vil CA respektere enhver CAA poster, der er indstillet på "example.forum.com". Det er ikke tilladt for et domænenavn med en CNAME-post at have andre poster, så der ikke kan være konflikter mellem CAA-optegnelser på det oprindelige navn og CAA-optegnelser om målet for omdirigeringen.

## Hvad skal man sætte i posten

Alle CAA poster følger det samme grundlæggende format:

```
CAA <flags> <tag> <value>
```

De **flag** er blot et heltal, og bør næsten altid bare være heltal `0`, hvilket indikerer at ingen flag er blevet sat. Hvis du ønsker det, kan du indstille flagene til heltals `128`, hvilket indikerer at den "kritiske bit" er indstillet, og at CA'er bør straks standse og ikke udstede et certifikat, hvis de ikke genkender indholdet af tag-feltet.

**tag** er en streng, der angiver, hvilken type CAA post dette er: enten `issue` eller `issuewild` i de fleste tilfælde. Mere om disse nedenfor.

Endeligt er **værdien ** en streng, der indeholder højst en CA-identifikator (såsom "letsencrypt.org") og nogle valgfrie semikolonseparerede parametre, som også er beskrevet nedenfor.

### Egenskaberne `issue` og `issuewild`

Poster med `issue` tag kontrollerer blot, om en CA kan udstede certifikater for dette domæne og dets underdomæner. Generelt er dette den eneste post, du har brug for, da det styrer både normal (fx "example.org") og jokertegn (f.eks. "*.example.org") udstedelse i mangel af andre poster. Du styrer hvilken CA kan udstede for dette domæne ved at sætte det pågældende CA's identifikationsdomænenavn i værdidelen af CAA-posten.

Poster med `issuewild` tagget kontrollerer, om en CA kan udstede *wildcard* certifikater (f.eks. "*.example.org"). Du behøver kun at bruge `issuewild` -poster, hvis du ønsker forskellige tilladelser til jokertegn og ikke-jokertegn.

Bemærk, at du kan have flere posteringer med den samme ejendomstype, og de er *additive*: hvis en af disse posteringer tillader CA at udstede, så er det tilladt.

Let's Encrypt domænenavnet for CAA er `letsencrypt.org`. Dette er officielt dokumenteret i [Afsnit 4.2.1 i vores CP/CPS](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions).

### Parameteren `validationmethods`

Denne parameter kan placeres efter CA's identificerende domænenavn for at styre, hvilke valideringsmetoder, som CA kan bruge til at bekræfte kontrollen over domænet. Dette kan bruges til at begrænse validering til metoder, som du har tillid til yderligere. For eksempel, hvis du ønsker at begrænse CA til kun at bruge TLS-ALPN-01 metoden, kan du tilføje `;validationmethods=tls-alpn-01` til din CAA posts værdi.

Let's Encrypt genkender følgende valideringsmetodestrenge:

* `http-01`
* `dns-01`
* `tls-alpn-01`

### Parameteren `accounturi`

Denne parameter kan placeres efter CA's identificerende domænenavn for at styre, hvilke valideringsmetoder, som CA kan bruge til at bekræfte kontrollen over domænet. Dette kan bruges til at sikre, at en person, der midlertidigt kaprer dit domæne, men har ikke adgang til din ACME-kontonøgle, kan ikke udstede ondsindede certifikater.

Let's Encrypt's konto URI'er ligne `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`, hvor numrene i slutningen er dit konto-id.

### Eksempler

En simpel CAA post, som gør det muligt for Let's Encrypt at udstede for "example.org" kan se sådan ud:

```
example.org         CAA 0 issue "letsencrypt.org"
```

En mere kompleks CAA post sæt kan se sådan ud:

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

I dette eksempel kan MyCA udstede for "example.org", men kun ved hjælp af DNS-01 valideringsmetoden. Det kan også udstede wildcard certifikater, ved hjælp af enhver valideringsmetode. Endelig kan OtherCA også udstede certifikater, men kun hvis anmodningen kommer fra kontonummer `123456`, og kun hvis OtherCA genkender og ved, hvordan man korrekt håndterer `accounturi` begrænsningen.


# CAA fejl

Da lad os kryptere kontrollerer CAA poster før hvert certifikat, vi udsteder, nogle gange får vi fejl selv for domæner, der ikke har angivet CAA poster. Når vi får en fejl, er der ingen måde at fortælle om vi har lov til at udstede for det berørte domæne da der kan være CAA optegnelser til stede, at forbyde udstedelse,, men ikke er synlige på grund af fejlen.

Hvis du modtager CAA-relaterede fejl, så prøv et par gange mere mod vores [iscenesættelsesmiljø](/docs/staging-environment) for at se, om de er midlertidige eller permanente. Hvis de er permanente, skal du indsende et supportproblem med din DNS-udbyder, eller skifte udbydere. Hvis du ikke er sikker på, hvem din DNS-udbyder er, så spørg din hosting-udbyder.

Nogle DNS-udbydere, der ikke er bekendt med CAA i første omgang besvare problem rapporter med "Vi understøtter ikke CAA poster." Din DNS-udbyder behøver ikke at specifikt at understøtte CAA-optegnelser; det behøver kun at svare med et NOERROR svar for ukendte forespørgselstyper (herunder CAA). Returnering af andre opkoder, herunder NOTIMP, for ukendte qtypes er en overtrædelse af [RFC 1035](https://tools.ietf.org/html/rfc1035)og skal rettes.

## SERVFAIL

En af de mest almindelige fejl, som folk støder på, er SERVFAIL. Oftest indikerer dette en fejl i DNSSEC-valideringen. Hvis du får en SERVFAIL fejl, bør dit første skridt være at bruge en DNSSEC debugger som [dnsviz.net](http://dnsviz.net/). Hvis det ikke virker, er det muligt, at dine navneservere kun genererer forkerte signaturer, når svaret er tomt. Og CAA svar er mest almindeligt tomme.  For eksempel, PowerDNS [havde denne fejl i version 4.0.3 og under](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Hvis du ikke har DNSSEC aktiveret og få en SERVFAIL, den anden mest sandsynlige grund er, at din autoritative navneserver returnerede NOTIMP, som beskrevet ovenfor er en overtrædelse af RFC 1035 den skal i stedet returnere NOERROR med et tomt svar. Hvis dette er tilfældet, skal du indsende en fejl eller en supportsag med din DNS-udbyder.

Endelig kan SERVFAILs være forårsaget af udfald hos dine autoritative navneservere. Kontroller NS-poster for dine navneservere og sikre, at hver server er tilgængelig.

## Timeout

Sommetider giver CAA forespørgsler timeout. Det vil sige, den autoritative navneserver aldrig svarer med et svar overhovedet, selv efter flere forsøg. Mest almindeligt dette sker, når din navneserver har en forkert konfigureret firewall foran det, at falder DNS-forespørgsler med ukendte qtyper. Opret en supportsag hos din DNS udbyder og spørg dem, hvis de har sådan en firewall konfigureret.
