---
title: Certifikat Autoritetsgodkendelse (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---


CAA er en type DNS-post, der giver ejere af webstedet mulighed for at angive, hvilket certifikat myndigheder (CAs) har lov til at udstede certifikater, der indeholder deres domænenavne. Det blev standardiseret i 2013 af [RFC 6844](https://tools.ietf.org/html/rfc6844) for at tillade en CA at "reducere risikoen for utilsigtet certifikat udstedelses-problem". Som standard er alle offentlige CA tilladt at udstede certifikater for ethvert domænenavn i den offentlige DNS forudsat at de validerer kontrollen med dette domænenavn. Det betyder, at, hvis der er en fejl i en af de mange offentlige CA'ers valideringsprocesser, er hvert domænenavn potentielt påvirket. CAA giver mulighed for, at indehavere af domæner kan reducere denne risiko.

# Brug Af CAA

Hvis du ikke bekymrer dig om CAA, behøver du generelt ikke at gøre noget (men se CAA fejl nedenfor). Hvis du ønsker at bruge CAA til at begrænse, hvilke certifikat- myndigheder der må udstede certifikater for dit domæne, du bliver nødt til at bruge en DNS-udbyder, der understøtter opsætning af CAA-poster. Tjek [SSLMate's CAA side](https://sslmate.com/caa/support) for en liste over sådanne udbydere. Hvis din udbyder er listet, du kan bruge [SSLMate's CAA Record Generator](https://sslmate.com/caa/) til at generere et sæt CAA poster med de CAA elementer, som du ønsker at tillade.

Let's Encrypt domænenavnet for CAA er `letsencrypt.org`. Dette er officielt dokumenteret [i vores erklæring om certificeringspraksis (CPS), afsnit 4.2.1](/repository).

## Hvor skal posten placeres

Du kan indsætte CAA poster på dit hoveddomæne eller på enhvert niveau af underdomæner. For eksempel, hvis du havde `www.community.example.com`, kan du indstille CAA records for det fulde navn, eller for `community.example.com` eller for `example.com`. CAer vil kontrollere hver version, fra venstre mod højre, og stoppe, så snart de ser en CAA post. Så for eksempel, en CAA post på `community.example.com` ville have forrang frem for en på `example.com`. De fleste personer, der tilføjer CAA-poster, vil føje dem til deres registrerede domæne (`eksempel. om`), så de gælder for alle underdomæner. Bemærk også, at CAA optegnelser for subdomæner har forrang frem for deres overordnede domæner, uanset om de er mere eftergivende eller mere restriktive. Så et subdomæne kan løsne en begrænsning sat på plads af et overordnet domæne.

CAA validering følger CNAMEs, ligesom alle andre DNS anmodninger. Hvis `www.community.example.com` er et CNAME til `web1.example.com`, CA vil først anmode CAA poster for `www.community.example om`, så se, at der er en CNAME for dette domænenavn i stedet for CAA poster, vil anmode om CAA posteringer for `web1.example.net` i stedet. Bemærk, at hvis et domænenavn har en CNAME-post, er det ikke tilladt at have andre posteringer i henhold til DNS-standarderne.

Den [CAA RFC](https://tools.ietf.org/html/rfc6844) specificerer en ekstra adfærd kaldet "træ-klatring", der kræver CAA til også at kontrollere de overordnede domæner for resultatet af CNAME opløsning. Denne yderligere adfærd blev senere fjernet af [et erratum](https://www.rfc-editor.org/errata/eid5065), så Let's Encrypt og andre CA'er ikke implementerer det.

# CAA fejl

Da lad os kryptere kontrollerer CAA poster før hvert certifikat, vi udsteder, nogle gange får vi fejl selv for domæner, der ikke har angivet CAA poster. Når vi får en fejl, er der ingen måde at fortælle om vi har lov til at udstede for det berørte domæne da der kan være CAA optegnelser til stede, at forbyde udstedelse,, men ikke er synlige på grund af fejlen.

Hvis du modtager CAA-relaterede fejl, så prøv et par gange mere mod vores [iscenesættelsesmiljø](/docs/staging-environment) for at se, om de er midlertidige eller permanente. Hvis de er permanente, skal du indsende et supportproblem med din DNS-udbyder, eller skifte udbydere. Hvis du ikke er sikker på, hvem din DNS-udbyder er, så spørg din hosting-udbyder.

Nogle DNS-udbydere, der ikke er bekendt med CAA i første omgang besvare problem rapporter med "Vi understøtter ikke CAA poster. Din DNS-udbyder behøver ikke for specifikt at understøtte CAA-poster; det behøver kun at svare med et NOERROR-svar for ukendte forespørgselstyper (herunder CAA). Returnering af andre opkoder, herunder NOTIMP, for ukendte qtypes er en overtrædelse af [RFC 1035](https://tools.ietf.org/html/rfc1035)og skal rettes.

# SERVFAIL

En af de mest almindelige fejl, som folk støder på, er SERVFAIL. Oftest indikerer dette en fejl i DNSSEC-valideringen. Hvis du får en SERVFAIL fejl, bør dit første skridt være at bruge en DNSSEC debugger som [dnsviz.net](http://dnsviz.net/). Hvis det ikke virker, er det muligt, at dine navneservere kun genererer forkerte signaturer, når svaret er tomt. Og CAA svar er mest almindeligt tomme.  For eksempel, PowerDNS [havde denne fejl i version 4.0.3 og under](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Hvis du ikke har DNSSEC aktiveret og få en SERVFAIL, den anden mest sandsynlige grund er, at din autoritative navneserver returnerede NOTIMP, som beskrevet ovenfor er en overtrædelse af RFC 1035 den skal i stedet returnere NOERROR med et tomt svar. Hvis dette er tilfældet, skal du indsende en fejl eller en supportsag med din DNS-udbyder.

Endelig kan SERVFAILs være forårsaget af udfald hos dine autoritative navneservere. Kontroller NS-poster for dine navneservere og sikre, at hver server er tilgængelig.

# Timeout

Sommetider giver CAA forespørgsler timeout. Det vil sige, den autoritative navneserver aldrig svarer med et svar overhovedet, selv efter flere forsøg. Mest almindeligt dette sker, når din navneserver har en forkert konfigureret firewall foran det, at falder DNS-forespørgsler med ukendte qtyper. Opret en supportsag hos din DNS udbyder og spørg dem, hvis de har sådan en firewall konfigureret.
