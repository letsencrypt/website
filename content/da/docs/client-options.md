---
title: ACME Klient Implementeringer
slug: client-options
lastmod: 2022-09-07
---

{{< clientslastmod >}}

Let's Encrypt bruger ACME-protokollen til at bekræfte, at du kontrollerer et givet domænenavn og til at udstede et certifikat. For at få et Let's Encrypt certifikat, skal du vælge et stykke ACME-klientsoftware du vil anvende.

ACME-klienterne nedenfor tilbydes af tredjeparter. Let's Encrypt kontrollerer ikke eller gennemgår ej tredjepartsklienter og kan ikke give nogen garanti for deres sikkerhed eller pålidelighed.

Der findes nogle browser-baserede ACME-klienter, men vi ikke liste dem her, fordi de fordrer til en manuel fornyelse arbejdsgang, der resulterer i en dårlig brugeroplevelse og øger risikoen for manglende fornyelser.

# Anbefalet: Certbot

Vi anbefaler, at de fleste starter med [Certbot](https://certbot.eff.org/) -klienten. Den kan simpelt hjælpe dig til at få et certifikat og/eller også hjælpe dig med at installere det, afhængigt af hvad du foretrækker. Den er nemt at bruge, virker på mange operativsystemer, og har fantastisk dokumentation.

Hvis Certbot ikke opfylder dine behov, eller du vil blot prøve noget andet, der er mange flere kunder at vælge nedenfor, grupperet efter det sprog eller miljø, de kører i.

# Øvrige klient muligheder

Alle de følgende kunder understøtter ACMEv2 API ([RFC 8555](https://tools.ietf.org/html/rfc8555)). I juni 2021 vi [udfasede understøttelse af ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/27). Hvis du allerede anvender en af klienterne nedenfor, skal du sørge for at opgradere til den nyeste version. Hvis den klient, du bruger, ikke er angivet nedenfor, er det muligvis fordi den ikke understøtter ACMEv2, i så fald anbefaler vi at kontakte projektets vedligeholdere eller at skifte til en anden klient.

{{< clients libraries="Libraries" projects="Projects integrating with Let's Encrypt" >}}

Python [acme](https://github.com/certbot/certbot/tree/master/acme) modulet er en del af Certbot, men anvendes også af en række andre kunder og er tilgængelig som en selvstændig pakke via [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) og andre distributioner.

{{< /clients >}}

# Tilføje en klient/et projekt

Hvis du kender til en ACME-klient eller et projekt, der har integreret med Lad os kryptere ACMEv2-API, der ikke er til stede på ovenstående side, bedes du indsende en pull-anmodning til vores [website repository](https://github.com/letsencrypt/website/) på GitHub, med opdatering af `data/clients.json` filen.

Inden du indsender en pull-anmodning, bedes du sikre:

1. Klienten respekterer [Let's Encrypts varemærkepolitik](https://www.abetterinternet.org/trademarks).
1. Klienten er ikke browserbaseret og understøtter automatiske fornyelser.
1. Klienten udfører [rutinemæssige fornyelser på tilfældige tidspunkter](/docs/integration-guide#when-to-renew) eller opfordre til denne opsætning.
1. Dit commit tilføjer din klient til **slutningen** af de relevante sektioner (glem ikke "acme_v2", hvis det er aktuelt!).
1. Dit commit opdaterer `lastmod` dato stempel øverst på `clients.json`.
