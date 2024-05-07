---
title: Hitta konto-ID
slug: account-id
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


När du rapporterar problem kan det vara användbart att ange ditt Let's Encrypt-konto-ID. För det mesta hanteras processen att skapa ett konto automatiskt av den ACME-klientprogramvara du använder för att prata med Let's Encrypt, och du kanske har flera konton konfigurerade om du kör ACME-klienter på flera servrar.

Ditt konto-ID är i ett URL format `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Om du använder Certbot kan du hitta ditt konto-ID genom att titta på fältet "uri" i `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Om du använder en annan ACME-klient kommer instruktionerna att vara klientberoende. Kontrollera dina loggar efter webbadresser i formatet som beskrivs ovan. Om din ACME-klient inte registrerar ett konto-ID, kan du hämta det genom att skicka in en ny registrerings begäran med samma nyckel. Se [ACME specs för mer detaljer](https://tools.ietf.org/html/rfc8555#section-7.3). Du kan också hitta den numeriska formen av ditt ID i Boulder-Requester headern i svaret på varje POST din ACME klient gör.
