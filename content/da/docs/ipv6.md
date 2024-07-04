---
title: IPv6-understøttelse
slug: ipv6-support
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt understøtter IPv6 både til ACME API ved hjælp af en ACME klient, og til de DNS-opslag og HTTP-anmodninger, vi foretager, når du validerer din kontrol med domænenavne.

## Domæne Validering

Når der foretages udgående anmodninger om validering af domæner, der både har IPv4 og IPv6-adresser (f.eks. både `A` og `AAAA` poster) Let's Encrypt vil altid foretrække IPv6-adresserne til den indledende forbindelse. Hvis IPv6-forbindelsen mislykkes på netværksniveau (f.eks. der er en timeout) og der er IPv4 adresser tilgængelige, så vi vil prøve anmodningen igen med en af IPv4 adresserne.

## Forkerte IPv6-adresser

Ofte vil ejere af domæner ikke være opmærksomme på en `AAAA` post for deres domæne. Hvis IPv6 adressen i `AAAA`-posten er forkert vil det påvirke domæne valideringsprocessen.

Ofte vil IPv6-adressen være en anden server end IPv4-adressen, hvor ACME-klienten køres. Da ACME-klienten kun konfigurerer IPv4 serveren til at med henblik på at håndtere challenge domænevalideringen vil den mislykkes, når IPv6 serveren bruges.

I de fleste tilfælde er den korrekte rettelse at opdatere IPv6-adressen for at pege på serveren ACME-klienten kører på, eller for at fjerne `AAAA` posten, hvis domænet ikke er beregnet til at arbejde med IPv6. Der er ikke en måde at anmode Let's Encrypt om at foretrække IPv4, du skal rette fejlkonfigurationen.

## IPv6 til IPv4 Forsøg igen Detaljer

Ipv6 til IPv4 gentagelse sker kun ved forbindelsestimeouts, ikke på andre typer af fejl.

For eksempel i "Common Pitfalls" scenariet ovenfor vil det ikke ske, hvis der er en webserver, der lytter på IPv6-adressen, men denne webserver er ikke klar til at besvare ACME-udfordringen. I dette tilfælde ville der ikke være nogen timeout i forbindelsen til IPv6-adressen, og udfordringen vil mislykkes uden at prøve igen, fordi det forkerte svar blev returneret.

For at holde vores CA-software enkel, udfører vi kun en IPv6 til IPv4 genkald på den første anmodning, når du validerer "http-01" udfordringer. Hvis du bruger redirects, vil disse ikke blive forsøgt igen.

For eksempel, hvis et domænenavn har en `AAAA` post, der altid laver timeout, og en `A` post med en webserver, der omdirigerer fra HTTP til HTTPS, så vil IPv6 til IPv4 fallback ikke fungere korrekt. Det første kald til domænet vil korrekt foretage skift til IPv4, der modtager en omdirigering fra HTTP til HTTPS. Det efterfølgende kald vil igen foretrække IPv6-adressen, men vil timeout'e uden at falde tilbage til IPv4. Du kan løse denne situation enten ved at rette IPv6 fejlkonfigurationen eller fjerne HTTP til HTTPS omdirigere for anmodninger til ACME HTTP-01 challenge stien.

## Få hjælp

Hvis du har brug for hjælp til at diagnosticere et IPv6-relateret problem, så besøg vores [community forum](https://community.letsencrypt.org).
