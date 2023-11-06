---
title: Grænse For Mislykket Validering
slug: failed-validation-limit
top_graphic: 1
lastmod: 2022-06-30
show_lastmod: false
---


# Beskrivelse
Alle forespørgsler om udstedelse er underlagt en *Mislykket Validering* grænse på 5 fejl pr. konto, pr. værtsnavn, pr. time. Du bør modtage følgende fejlmeddelelse fra din ACME-klient, når du har overskredet grænsen for fejlvalidering:

```
for mange mislykkede godkendelser for nylig: se https://letsencrypt.org/docs/failed-validation-limit/
```

De »tilladelser«, som denne fejl henviser til, er resultatet af anmodninger om tilladelse sendt af din ACME-klient, for at validere kontrollen over et domænenavn, før vi kan udstede eller forny et certifikat. Denne fejl indikerer, at flere anmodninger om validering blev sendt med succes, men alle forsøg på validering er mislykkedes.

# Almindelige Årsager

Abonnenter, der rammer grænsen for fejlvalidering, gør det ofte på grund af en fejlkonfiguration i deres miljø.

## HTTP-01 eller TLS-APLN-01

For ACME-klienter, der anmoder om tilladelse via HTTP-01 eller TLS-APLN-01 valideringsmetoderne problemet stammer normalt fra et netværk eller en firewall konfiguration, som gør det umuligt for vores valideringsservere at nå frem til den server, som anmodningen blev sendt fra.

## DNS-01

ACME-klienter der anmoder om tilladelse via DNS-01 valideringsmetoden kræver, at du opretter en CNAME-rekord i din primære DNS-zone, som gør det muligt for ACME-klienten at indstille de påkrævede DNS-poster under valideringsprocessen. Mislykkede DNS-01 valideringer er normalt resultatet af manglende trin eller stavefejl under denne indledende opsætningsproces.

Ved fejlfinding eller test af idriftsættelsen af dine applikationer opfordrer vi dig til at konfigurere din ACME-klient til at bruge vores [staging miljø](/docs/staging-environment/). Begrænsninger for vores staging miljø er[ signifikant højere](/docs/staging-environment/#rate-limits).

# Anmod Om Hjælp

Hvis du ikke er sikker på, hvordan du konfigurerer din ACME-klient til at bruge vores staging miljø, eller du har brug for hjælp debugging, vi opfordrer dig til at [anmode om hjælp på vores community forum](https://community.letsencrypt.org/c/help/13).

# Anmodning om overskridning

Overskridninger er **ikke** tilgængelige for fejlede valideringer.