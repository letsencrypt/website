---
title: Duplikat Certifikat Grænse
slug: duplicate-certificate-limit
top_graphic: 1
date: 2022-06-16
lastmod: 2022-06-16
show_lastmod: 1
---


# Beskrivelse
Alle anmodninger om udstedelse er underlagt et *Duplikat Certifikat* loft på 5 pr. uge. Du bør modtage en fejlmeddelelse som det følgende fra din ACME klient, når du har overskredet Duplikat certifikatgrænsen:
```
too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit
```
Det "eksakte sæt", som denne fejl henviser til, er det sæt værtsnavne, der anmodes om for dette certifikat: i dette eksempel, `eksempel. om` og `login.example.com`. Hvis dit certifikat kun er udstedt for 1 navn, såsom eksempel. Om så ville det "eksakte sæt" af værtsnavne for dit certifikat være `[example.com]`. Denne sats grænse overskrides, når en abonnent anmoder om et certifikat for det samme "eksakt sæt" af værtsnavne mere end 5 gange i en enkelt uge.

# Almindelige Årsager

Abonnenter, der ramte grænsen for Duplikeret certifikat, gør det ofte, mens de forsøger at foretage fejlfinding i implementeringen af en applikation eller tjeneste. Nogle eksempler:

Hvis du støder på en fejl fra din ACME-klient, som du ikke genkender, og forsøge at fjerne og geninstallere din ACME-klient flere gange i processen med fejlfinding af fejlen, du kan overskride grænsen for duplikat certifikater.

Hvis du sletter konfigurationsdataene for din ACME-klient efter hvert mislykkede forsøg på at installere et certifikat, du vil ramme denne rate grænse efter fem mislykkede forsøg. Det er bedst at lave en kopi af konfigurationsdata, før du sletter den, så du kan tilgå tidligere udstedte certifikater og private nøgler, hvis du har brug for det.

Ved fejlfinding eller test af implementeringen af dine applikationer opfordrer vi dig til at konfigurere din ACME-klient til at bruge vores [staging miljø](/docs/staging-environment/). Begrænsninger for vores staging miljø er[ signifikant højere](/docs/staging-environment/#rate-limits).

# Anmod Om Hjælp

Hvis du ikke er sikker på, hvordan du konfigurerer din ACME-klient til at bruge vores staging miljø, eller du har brug for hjælp debugging, vi opfordrer dig til at [anmode om hjælp på vores community forum](https://community.letsencrypt.org/c/help/13).

# Anmodning om overskridning

Overskridninger er **ikke** tilgængelige for duplikat certifikatgrænsen.

# Omgåelse

Tilbagekaldelse af tidligere udstedte certifikater vil ikke nulstille grænsen for dublerede certifikater. Imidlertid hvis du opdager, at du har overskredet grænsen, og du stadig kræver et andet certifikat for de samme værtsnavne kan du altid anmode om et certifikat for et andet “eksakt sæt” værtsnavne. For eksempel hvis du har overskredet dubletcertifikatgrænsen for `[example.com]` og derefter anmoder om et certifikat for `[eksempel.com, login.example.com]` vil lykkes. Tilsvarende hvis du har overskredet duplikat certifikatgrænsen for `[eksempel.com,
login.eksempel. om]` derefter anmode om et separat certifikat for `[example.com]` og en anden for `[login.example.com]` vil det lykkes.

# Overvågning af kaldsgrænser

Vi tilbyder ikke en måde at overvåge kaldsgrænser på nuværende tidspunkt.
