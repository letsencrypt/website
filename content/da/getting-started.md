---
title: Kom godt i gang
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt udstedelsescertifikater via et automatisk API baseret på [ACME-protokollen](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).

For at kunne interagere med Let's Encrypts API og få et certifikat, er et stykke software kaldet en "ACME-klient" nødvendig. Ingen del af processen for at få et certifikat sker på denne hjemmeside, som er blot informativ.

Det første spørgsmål, der skal besvares for folk, der ønsker at komme i gang med Let's Encrypt, er: vil min værtsudbyder få og administrere certifikater fra Let's Encrypt for mig, eller skal jeg selv køre en ACME-klient?

# At få certifikater via din værtsudbyder

[For mange mennesker, deres hosting udbyder vil få og administrere certifikater fra Let's Encrypt for dem](https://certbot.eff.org/hosting_providers). Hvis dette er din situation, vil din udbyder håndtere en ACME-klient, og du behøver ikke selv at tænke på at få eller håndtere ACME-klientsoftware.

Hvis din udbyder får og administrerer certifikater for dig, det vil enten ske automatisk, eller der vil være en konfigurationsmulighed, som du bliver nødt til at aktivere. Tjek din udbyders dokumentation og konfigurationsmuligheder.

# Valg og drift af en ACME-klient selv

Hvis din værtsudbyder ikke håndterer at få og administrere certifikater til dig, og hvis du har mulighed for at køre kommandoer på din server med tilstrækkelige privilegier, du kan vælge en ACME-klient og køre det selv for at få certifikater fra Let's Encrypt.

For de fleste mennesker anbefaler vi [Certbot ACME-klient](https://certbot.eff.org/). Certbots hjemmeside har fremragende dokumentation og instruktioner til driften af Certbot.

Der er [mange flere muligheder for ACME-klientsoftware](/docs/client-options/), hvis Certbot af en eller anden grund ikke opfylder dine behov.

Hvis din klient skal konfigureres med Let's Encrypt ACME-API-endepunktet, er det:

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

Vi anbefaler at køre tests mod vores [staging API](/docs/staging-environment/) først.

# Få hjælp

Hvis du har spørgsmål om at vælge en ACME-klient, eller om at bruge en bestemt klient, eller noget andet relateret til Lad os Kryptere, prøv venligst vores [nyttige fora](https://community.letsencrypt.org/).

Vores hjemmeside har også [omfattende dokumentation](/docs/), hvis du har brug for flere detaljer.
