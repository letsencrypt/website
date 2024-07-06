---
title: FAQ
linkTitle: Ofte stillede spørgsmål (FAQ)
slug: faq
lastmod: 2024-06-26
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

Denne FAQ er opdelt i følgende afsnit:

- [Generelle spørgsmål](#general)
- [Tekniske Spørgsmål](#technical)

# <a id="general">Generelle spørgsmål</a>

## Hvilke tjenester tilbyder Let's Encrypt?

Let's Encrypt er en global certifikatautoritet (CA). Vi lader folk og organisationer i hele verden anskaffe, forny og administrere SSL/TLS-certifikater. Vores certifikater kan bruges af websites til at aktivere sikre HTTPS-forbindelser.

Let's Encrypt tilbyder domæne validerede (DV) certifikater. Vi tilbyder ikke Organization Validation (OV) eller Extended Validation (EV) primært fordi vi ikke kan automatisere udstedelsen af disse typer af certifikater.

For at komme i gang med at bruge Let's Encrypt, besøg venligst vores [Getting Started](/getting-started) side.

## Hvad koster det at bruge Let's Encrypt? Er det virkelig gratis?

Vi opkræver ikke noget gebyr for vores certifikater. Let's Encrypt er en non-profit, vores mission er at skabe en mere sikker og respekt for privatlivets fred Web ved at fremme den udbredte vedtagelse af HTTPS. Vores tjenester er gratis og nem at bruge, så alle hjemmesider kan implementere HTTPS.

Vi har brug for støtte fra generøse sponsorer, tilskudsgivere, og enkeltpersoner for at kunne levere vores tjenester gratis over hele kloden. Hvis du er interesseret i at støtte os, bedes du overveje at [donere](/donate) eller [blive en sponsor](https://www.abetterinternet.org/sponsor).

I nogle tilfælde integratorer (f.eks. hosting-udbydere) vil opkræve et nominelt gebyr, der afspejler de administrations- og administrationsomkostninger, de pådrager sig for at levere Let's Encrypt certifikater.

## Hvilken form for hjælp og støtte tilbyder I?

Let's Encrypt køres af et lille hold og er afhængig af automatisering for at holde omkostningerne nede. Vi kan derfor ikke tilbyde direkte støtte til vores brugere. Vi har dog nogle gode støttemuligheder:

1. Vi har virkelig nyttige [dokumentation](/docs).
2. Vi har meget aktive og nyttige [community support forums](https://community.letsencrypt.org/). Medlemmerne af vores fællesskab gør et stort stykke arbejde med at besvare spørgsmål, og mange af de mest almindelige spørgsmål er allerede blevet besvaret.

Her er en [video, vi kan lide](https://www.youtube.com/watch?v=Xe1TZaElTAs) om styrken i stor støtte fra fællesskabet.

## En hjemmeside der anvender Let's Encrypt er involveret i Phishing/Malware /?

Vi anbefaler, at sådanne websteder rapporteres til Google Safe Browsing og Microsoft Smart Screen program, som er i stand til mere effektivt at beskytte brugerne. Her er de rapporterings webadresserne:

- [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
- [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

Hvis du gerne vil læse mere om vores politikker og rationale, kan du gøre det her:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Tekniske Spørgsmål</a>

## Er certifikater fraLet's Encrypt betroet af min browser?

For de fleste browsere og operativsystemer, ja. Se [kompatibilitetsliste](/docs/cert-compat) for flere detaljer.

## Kan Let's Encrypt udstede certifikater for andet end SSL/TLS til hjemmesider?

Lad os kryptere certifikater er standard domæne valideringscertifikater, så du kan bruge dem til enhver server, der bruger et domænenavn, som webservere, mailservere, FTP-servere og mange flere.

E-mail-kryptering og kode-signering kræver en anden type certifikat, som Let's Encrypt ikke udsteder.

## Genererer eller gemmer lad os kryptere de private nøgler til mine certifikater på Let's Encrypt servere?

Nej. Aldrig.

Den private nøgle er altid genereret og administreres på dine egne servere, ikke af Let's Encrypt certifikatmyndigheden.

## Hvad er levetiden for Let's Encrypt certifikater? Hvor længe er de gyldige?

Vores certifikater er gyldige i 90 dage. Du kan læse om hvorfor [her](/2015/11/09/why-90-days.html).

Der er ingen måde at justere dette på, der er ingen undtagelser. Vi anbefaler at du automatisk fornyer dine certifikater hver 60 dage.

## Vil Let's Encrypt udstede Organisationsvalidering (OV) eller udvidet validering (EV) certifikater?

Vi har ingen planer om at udstede OV eller EV certifikater.

## Kan jeg få et certifikat til flere domænenavne (SAN certifikater eller UCC certifikater)?

Ja, det samme certifikat kan indeholde flere forskellige navne ved hjælp af Subject Alternative Name (SAN) mekanismen.

## Udsteder Let's Encrypt wildcard certifikater?

Ja. Wildcard udstedelse skal ske via ACMEv2 ved hjælp af [DNS-01 challenge](/docs/challenge-types/#dns-01-challenge). Se [dette indlæg](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) for mere teknisk information.

## Er der en Let's Encrypt (ACME) klient til mit operativsystem?

Der er et stort antal [ACME-klienter](/docs/client-options) tilgængelige. Chancerne er noget fungerer godt på dit operativsystem. Vi anbefaler at starte med [Certbot](https://certbot.eff.org/).

## Kan jeg bruge en eksisterende privat nøgle eller certifikatsigneringsanmodning (CSR)?

Ja, men ikke alle klienter understøtter denne funktion. [Certbot](https://certbot.eff.org/) gør.

## Jeg anmodede om et certifikat, og nu modtager mit domæne en masse trafik! Hvorfor sker dette?

Det er normalt og forventet. Under [-certifikatudstedelsesprocessen](/how-it-works)vil Let's Encrypt validere dit domæne fra [flere netværksperspektiver](/2020/02/19/multi-perspective-validation). Efter en vellykket validering vil dit certifikat blive indsendt til talrige [Certificate Transparency (CT) logs](/docs/ct-logs). Se [her](https://certificate.transparency.dev/howctworks/#pki) for flere detaljer om, hvorfor dette er nødvendigt. Kort efter certifikatet er indsendt til CT, vil automatiserede CT crawling bots være i stand til at opdage dit domæne, forsøge at få adgang til det, og generere yderligere trafik i dine webserver logs.

## Hvilke IP-adresser bruger Let's Encrypt til at validere min webserver?

Vi offentliggør ikke en liste over IP-adresser, som vi bruger til at validere, og disse IP-adresser kan ændre sig til enhver tid. Bemærk, at vi nu [validerer fra flere IP-adresser](/2020/02/19/multi-perspective-validation.html).

## Jeg har succesfuldt fornyet et certifikat, men validering skete ikke denne gang - hvordan er det muligt?

Når du har fuldført udfordringerne for et domæne, bliver den resulterende godkendelse cachet for din konto til at bruge igen senere. Cachelagrede godkendelser varer i 30 dage fra valideringstidspunktet. Hvis det certifikat, du har anmodet om, har alle de nødvendige godkendelser cachet, vil valideringen ikke ske igen, før de relevante cachede tilladelser udløber.

## Hvorfor skal min Let's Encrypt (ACME) klient køre på et tilfældigt tidspunkt?

Vi beder om, at [ACME-klienter udfører rutinemæssige fornyelser på tilfældige tidspunkter](https://letsencrypt.org/docs/integration-guide/#when-to-renew) for at undgå stigninger i trafikken på bestemte tidspunkter af dagen, såsom præcis midnat UTC, eller det første sekund i hver time eller minut. Når tjenesten er for optaget, vil klienter blive bedt om at [prøve igen senere](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503), så ved at vælge tilfældig fornyelsestidspunkt kan hjælpe med at undgå unødvendige kald til os.

## Hvor kan jeg lære mere om TLS/SSL og PKI generelt?

Mangeårige sikkerhedsekspert og praktiker, Ivan Risticţ, offentliggjorde en konfigurationsguide, der giver nyttige oplysninger om, hvad du bør overveje, mens du <a href="https://www.feistyduck.com/library/bulletproof-tls-guide/online/" target="_blank" rel="noopener noreferer">opsætter din TLS-konfiguration</a>.

For mere omfattende baggrund og flere detaljer, anbefaler vi <a href="https://www.feistyduck.com/books/bulletproof-tls-and-pki/" target="_blank" rel="noopener noreferer">Bulletproof TLS og PKI</a>, også skrevet af Risticţ.
