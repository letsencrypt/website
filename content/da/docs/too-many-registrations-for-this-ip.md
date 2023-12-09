---
title: Registreringer Pr. Ip Grænse
slug: too-many-registrations-for-this-ip
top_graphic: 1
lastmod: 2022-08-15
show_lastmod: false
---


# Beskrivelse

Abonnenter kan registrere op til 10 konti pr. IP-adresse hver 3. time. Du bør modtage følgende fejlmeddelelse fra din ACME-klient, når du har overskrevet *Registreringer Per IP* begrænsningen:

```
too many registrations for this IP: see https://letsencrypt.org/docs/too-many-registrations-for-this-ip/
```

De »registreringer«, denne fejl henviser til, er anmodninger, der sendes fra din IP-adresse, for at registrere en ny konto hos Let's Encrypt API. Denne fejl indikerer, at mindst 10 konti allerede er registreret fra denne IP-adresse inden for de sidste 3 timer.

# Almindelige Årsager

Abonnenter, der rammer grænsen for fejlvalidering, gør det ofte på grund af en fejlkonfiguration i deres miljø.

## Gentagne Udrulninger

Oplevelsen af registreringer pr. IP-grænse som en individuel abonnent er overordentlig sjælden. Dette er mest sandsynligt, at det forekommer under gentagne implementeringer af dit system eller program; enten din ACME-klient ikke gemmer og genbruger dine kontooplysninger eller det filsystem, hvor legitimationsoplysningerne skal gemmes, destrueres mellem implementeringer (containere, virtuelle maskiner, cloud-instanser). Når du tester implementeringen af dit system eller program, skal du sikre dig, at du har konfigureret din ACME-klient til at bruge vores iscenesættelsesmiljø. Begrænsninger for vores staging miljø er[ væsenligt højere](/docs/staging-environment/#rate-limits).

## For Mange Konti

Hosting udbydere og andre store integratorer rammer typisk registreringer pr. IP grænsen ved at forsøge at anmode om en konto pr. kunde. Vi anbefaler, at store integratorer foretrækker et design ved hjælp af [én konto for mange kunder](/docs/integration-guide/#one-account-or-many). Når du tester bør du sikre, at du har konfigureret din ACME-implementering til at bruge vores iscenesættelsesmiljø. Begrænsninger for vores staging miljø er[ væsenligt højere](/docs/staging-environment/#rate-limits).

# Anmod Om Hjælp

Hvis du ikke er sikker på, hvordan du konfigurerer din ACME-klient til at bruge vores iscenesættelsesmiljø miljø, eller du har brug for hjælp til fejlfinding, vi opfordrer dig til at [anmode om hjælp på vores community forum](https://community.letsencrypt.org/c/help/13).

# Anmodning om overskridning

Overstyringer er **ikke** tilgængelige for Registrations Per IP limit.
