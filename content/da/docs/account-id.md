---
title: Find Konto IDer
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Når du rapporterer problemer kan det være nyttigt at angive dit Let's Encrypt konto-id. Det meste af tiden håndteres processen med at oprette en konto automatisk af den ACME-klientsoftware, du bruger til at tale med Let's Encrypt, og du kan have flere konti konfigureret, hvis du kører ACME-klienter på flere servere.

Dit konto-id er en URL på formularen `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Hvis du bruger Certbot, kan du finde dit konto-id ved at se på feltet "uri" i `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Hvis du bruger en anden ACME-klient, vil vejledningen være klientafhængig. Tjek dine logs for webadresser på formularen beskrevet ovenfor. Hvis din ACME-klient ikke registrerer konto-ID, du kan hente det ved at indsende en ny registrering anmodning med samme nøgle. Se [ACME-spec for flere detaljer](https://tools.ietf.org/html/rfc8555#section-7.3). Du kan også finde den numeriske form for dit ID i Boulder-Requester-header i svaret på hver POST din ACME-klient laver.
