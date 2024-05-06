---
title: lencr.org
slug: lencr.org
date: 2021-11-30
lastmod: 2022-09-30
show_lastmod: 1
---


# Hvad er `lencr.org`?

`lencr.org` er et domæne ejet af Let's Encrypt. Vi bruger den til at være vært for data, der refereres til inde i de certifikater, vi udsteder.

# Hvorfor henter min computer disse oplysninger? Er det skadeligt?

Nej, oplysningerne på `lencr.org` er aldrig skadelige. Når en enhed forbinder til `lencr. rg`, det er fordi klientsoftware på denne enhed (som en webbrowser eller en app) forbundet til et andet websted, så at det var et Let's Encrypt certifikat, og forsøger at bekræfte, at det er gyldigt. Dette sker rutinemæssigt i mange klienter.

Vi kan ikke tale med, om *det andet site* er forbundet er skadeligt. Hvis du undersøger netværksaktivitet, der synes usædvanligt, så vil du måske gerne fokusere på den forbindelse, der startede lige før forbindelsen til `lencr. rg`.

Mønstret for kundernes forbindelser til `lencr.org` kan se usædvanligt ud eller intermitterende. Klienter henter muligvis aldrig disse data; henter kun delsæt af det eller "cache" nogle data for effektivitet, så de kun får adgang til det nogle gange (første gang de har brug for det, og når oplysningerne kan være udløbet).

# Hvad skal disse data præcist bruges til?

Når klientsoftware (som en webbrowser eller en app) forbinder til et websted, og dette websted præsenterer et certifikat, bør klienten kontrollere, at certifikatet er autentisk og gyldigt. Disse data hjælper klienterne med at gøre det på flere måder.

* På `o.lencr.org`leverer vi data om Online Certificate Status Protocol (OCSP). En klient kan bruge disse data til at bekræfte, om et individuelt certifikat, som vi har udstedt, stadig er gyldigt eller er blevet tilbagekaldt. (Dette er kun for "end-entity" eller "leaf" certifikater, som vi har udstedt til abonnenter fra en af vores mellemliggende certifikater.)

* Under `c.lencr.org`leverer vi certifikattilbagekaldelseslister (CRL) med lister af alle de ikke udløbne certifikater, som vi udstedte og senere har tilbagekaldt.

* Under `i.lencr.org`, vi leverer kopier af vores mellemliggende "udsteder" certifikater, som enten er underskrevet af et af vores rodcertifikater eller "krydssigneret" af en anden certifikatautoritet (CA). En klient kan bruge disse data til at bekræfte "tillidskæden" fra slutenheds-certifikatet, som det er verificeret via et eller flere mellemliggende trin til et root-CA-certifikat, som det genkender og stoler på.

# Hvorfor er forbindelser til `o.lencr.org` over usikker HTTP?

OCSP-svar serveres altid over HTTP. Hvis de blev serveret over HTTPS, ville der være et "uendeligt løkke" problem: for at verificere OCSP-serverens certifikat, kunden skal bruge OCSP.

OCSP-svaret selv er tidsstemplet og kryptografisk underskrevet, så anti-manipulation egenskaber af TLS er ikke nødvendige i dette tilfælde.

# Hvad er `lencr.org`"?

Vi plejede at bruge længere URL'er som `http://ocsp.int-x3.letsencrypt.org/`. Men da vi udstedte vores [nye rod- og intermediate certifikater][1], ønskede vi at gøre dem så korte som muligt. Hver HTTPS-forbindelse på nettet (milliarder pr. dag) skal sende en kopi af et certifikat, så hver byte betyder noget. Vi valgte `lencr.org` på grund af dens lighed med vores navn: **L**et's **ENCR**ypt. Vi udtaler det meget ligesom den fiktive region [Lancre][] i Terry Pratchett's _Discworld_ romaner.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
