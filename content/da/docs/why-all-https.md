---
title: Hvorfor Skal Alle Hjemmesider Bruge HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

Nogle serveroperatører har historisk argumenteret for, at de ikke har noget følsomt på deres hjemmeside, og dermed ikke behov for privatlivets fred. Dette er dog ikke et stærkt argument, og vi mener, at alle hjemmesider bør bruge HTTPS af disse grunde:

## Almindelig HTTP trafik kan ses i transit

Når trafikken ikke er krypteret, kan den ses i transit. Det betyder, at alt indhold, der går i begge retninger på en forbindelse, herunder noget følsomt, kan ses af enhver enhed på netværkets sti. Dette er et indlysende privatlivsfredsproblem, beslægtet med postbreve frem og tilbage uden en kuvert.

Selv hvis en serveroperatør mener, at der ikke er noget følsomt på deres websted, laver folk nogle gange fejl. Måske skulle der _ikke_ overføres følsomme oplysninger, men det betyder ikke, at der ikke vil være. HTTPS hjælper med at sikre, at fejl ikke bliver til krænkelser af privatlivets fred.

Desuden styrer en serveroperatør ikke al trafik til og fra deres hjemmeside: der er intet, de kan gøre for at forhindre besøgende i et uheld _at sende_ følsomme oplysninger som en del af en anmodning, måske via en formular eller en klient software fejlkonfiguration. At forvente, at de aldrig gør det, er en urimeligt høj forventning.

Endelig kan selve handlingen med at besøge en hjemmeside være en følsom oplysning, især for mennesker, der lever under undertrykkende regimer. HTTPS understøtter en udvidelse kaldet [Encrypted Client Hello (ECH)](https://en.wikipedia.org/wiki/Server_Name_Indication#Encrypted_Client_Hello) som kan skjule disse oplysninger, men at ekstra lag af beskyttelse er ikke tilgængeligt på websteder ved hjælp af HTTP.

## Almindelig HTTP-trafik kan ændres under transit

Endnu værre, når trafikken ikke er krypteret den kan ændres i transit. Det betyder, at ingen kan være sikker på, at det, der blev sendt, er det, der blev modtaget, i begge retninger. Forbindelsen mangler ikke bare privatlivets fred, den mangler _integritet_.

Et almindeligt eksempel på dette er indsprøjtning af annoncer og/eller malware i serversvar. Hvis en hjemmeside ikke aktiverer HTTPS, sætter det sine besøgende i fare, uanset det faktiske indhold af hjemmesiden.
