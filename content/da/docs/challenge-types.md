---
title: Udfordringstyper
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2023-02-13
show_lastmod: 1
---


Når du får et certifikat fra Let's Encrypt, bekræfter vores servere, at du kontrollerer domænenavne i certifikatet ved hjælp af “challenges” (udfordringer), som defineret i ACME-standarden. Det meste af tiden, denne validering håndteres automatisk af din ACME-klient, men hvis du har brug for at gøre mere komplekse konfigurationsbeslutninger, er det nyttigt at vide mere om dem. Hvis du er usikker, så følg din klients standardindstillinger eller anvend HTTP-01.

# HTTP-01 challenge

Det er den mest almindelige challenge type i dag. Let's Encrypt giver en token til din ACME-klient, og din ACME-klient placerer en fil på din web -server på `http://<YOUR_DOMAIN>/. ell-known/acme-challenge/<TOKEN>`. At filen indeholder token, plus et fingeraftryk af din kontonøgle. Når din ACME-klient fortæller Let's Encrypt, at filen er klar, forsøger Let's Encrypt at hente det (potentielt flere gange fra flere kaldspunkter). Hvis vores valideringstjek får det rigtige svar fra din webserver, valideringen betragtes som vellykket, og du kan gå videre og udstede dit certifikat. Hvis valideringskontrollen mislykkes, skal du prøve igen med et nyt certifikat.

Vores implementering af HTTP-01 udfordring følger omdirigeringer, op til 10 redirects dyb. Den accepterer kun omdirigeringer til “http:” eller “https:”, og kun til port 80 eller 443. Det accepterer ikke redirects til IP-adresser. Når redirectet sker til en HTTPS-URL, validerer den ikke certifikater (da denne challenge er beregnet til at starte gyldige certifikater, det kan støde på selvsignerede eller udløbne certifikater undervejs).

HTTP-01 udfordring kan kun gøres på port 80. At tillade kunder at angive vilkårlige havne vil gøre udfordringen mindre sikker, og derfor er det ikke tilladt af ACME-standarden.

Fordele:

 - Det er nemt at automatisere uden ekstra viden om et domæne opsætningen.
 - Det gør det muligt for hosting-udbydere at udstede certifikater for domæner CNAMEde til dem.
 - Det fungerer med alle standard webservere.

Ulemper:

 - Det virker ikke, hvis din ISP blokke port 80 (dette er sjældent, men nogle få internetudbydere gør dette).
 - Let's Encrypt lader dig ikke bruge denne udfordring til at udstede wildcard certifikater.
 - Hvis du har flere webservere, skal du sørge for, at filen er tilgængelig på dem alle.

# DNS-01 challenge

Denne udfordring beder dig om at bevise, at du styrer DNS for det domænenavn ved at sætte en specifik værdi i en TXT-post under dette domænenavn. Det er sværere at konfigurere end HTTP-01, men kan fungere i scenarier, hvor HTTP-01 ikke kan. Det giver dig også mulighed for at udstede wildcard certifikater. Efter Let's Encrypt giver din ACME-klient et token, vil din klient oprette en TXT-post, der baseret på denne token og din kontonøgle, og lægge den record på `_acme-challenge.<YOUR_DOMAIN>`. Så vil Let's Encrypt forespørge DNS-systemet for denne post. Hvis den finder et match, kan du fortsætte med at udstede et certifikat!

Da automatisering af udstedelse og fornyelser er meget vigtigt, giver det kun giver mening at bruge DNS-01 udfordringer, hvis din DNS-udbyder har et API, du kan bruge til at automatisere opdateringer. Vores community har startet en [liste over sådanne DNS- udbydere her][dns-api-providers]. Din DNS-udbyder kan være den samme som din registrator (den virksomhed, hvor du købte dit domænenavn fra), eller den kan være en anden. Hvis du ønsker at ændre din DNS-udbyder, skal du blot foretage nogle små ændringer hos din registrator. Du behøver ikke at vente på, at dit domæne er tæt på udløb for at gøre det.

Bemærk, at sætte din fulde DNS API legitimationsoplysninger på din webserver væsentligt øger indvirkningen, hvis denne webserver er hacket. Beste praksis er at bruge [mere snævert afgrænset API legitimationsoplysninger][securing-dns-credentials], eller udføre DNS -validering fra en separat server og automatisk kopiere certifikater til din webserver.

Da Let's encrypt følger DNS standarder, til at søge TXT poster for DNS-01 validering, du kan bruge CNAME-posteringer eller NS-posteringer til at uddelegere udfordringen til andre DNS-zoner. Dette kan bruges til at [uddelegere `_acme-challenge` subdomæne][securing-dns-credentials] til en valideringsspecifik server eller zone. Det kan også bruges, hvis din DNS udbyder er langsom til at opdatere, og du ønsker at delegere til en hurtigere opdaterende server.

De fleste DNS-udbydere har en “udsprednings tid”, der regulerer, hvor lang tid det tager fra den tid, du opdaterer en DNS-post, indtil det er tilgængeligt på alle af deres servere. Det kan være svært at måle dette, fordi de ofte også bruge [anycast][], hvilket betyder, at flere servere kan have den samme IP-adresse, og afhængigt af hvor du befinder dig i verden, kan du tale med en anden server (og få et andet svar) end Let's Encrypt gør. De bedste DNS API'er giver dig en måde at automatisk kontrollere, om en opdatering er fuldt udrullet. Hvis din DNS-udbyder ikke har dette, du skal blot konfigurere din klient til at vente længe nok (ofte så meget som en time) for at sikre, at opdateringen bliver udrullet, før validering udføres.

Du kan have flere TXT poster på plads for samme navn. For eksempel, kan dette ske, hvis du validerer en udfordring for et wildcard og et ikke-wildcard certifikat på samme tid. Du bør dog sørge for at rydde op i gamle TXT-poster, fordi hvis svarstørrelsen bliver for stor vil Let's encrypt begynde at afvise det.

Fordele:

 - Du kan bruge denne udfordring til at udstede certifikater indeholdende wildcard domænenavne.
 - Det fungerer godt, selvom du har flere webservere.

Ulemper:

 - At holde API-legitimationsoplysninger på din webserver er risikabelt.
 - Din DNS-udbyder tilbyder muligvis ikke en API.
 - Din DNS API giver muligvis ikke oplysninger om udrulningstider.

# TLS-SNI-01

Denne udfordring blev defineret i udkast til versioner af ACME. Det gjorde en TLS håndtryk på port 443 og sendte en specifik [SNI][] header, på udkig efter certifikat, der indeholdt token. Den [blev deaktiveret i marts 2019][tls-sni-disablement], fordi den ikke var sikker nok.

# TLS-ALPN-01

Denne udfordring blev udviklet efter at TLS-SNI-01 blev udfaset, og er ved at blive udviklet som [en separat standard][tls-alpn]. I lighed med TLS-SNI-01 udføres det via TLS på port 443. Imidlertid det bruger en brugerdefineret ALPN-protokol til at sikre, at kun servere, der er klar over denne challengetype, vil reagere på valideringsanmodninger. Dette gør det også muligt for valideringsanmodninger for denne challenge type at bruge et SNI felt, der matcher domænenavnet valideret at gøre det mere sikkert.

Denne udfordring er ikke egnet til de fleste mennesker. Det er bedst egnet til forfattere af TLS-terminating reverse proxies, der ønsker at udføre værtbaseret validering som HTTP-01, men ønsker at gøre det helt på TLS lag for at separere bekymringer. Lige nu betyder det hovedsageligt store hosting udbydere men almindelige webservere som Apache og Nginx kunne en dag implementere dette (og [Caddy allerede gør][caddy-tls-alpn]).

Fordele:

 - Det virker, hvis port 80 ikke er tilgængelig for dig.
 - Det kan udføres udelukkende på TLS-laget.

Ulemper:

 - Det er ikke understøttet af Apache, Nginx eller Certbot, og bliver det sandsynligvis ikke snart.
 - Ligesom HTTP-01, hvis du har flere servere, de har brug for til alle svar med det samme indhold.
 - Denne metode kan ikke bruges til at validere wildcard domæner.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/rfc8737
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
