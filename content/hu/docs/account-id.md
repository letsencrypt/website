---
title: Fiók azonosítók keresése
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


A problémák bejelentésekor hasznos lehet megadni a Let's Encrypt fiókjának azonosítóját. A legtöbbször a fiók létrehozásának folyamatát automatikusan kezeli az ACME kliensszoftver, amelyet a Let's Encrypt-tel való kommunikációhoz használ, és több fiókot is beállíthat, ha az ACME klienseket több szerveren futtatja.

A fiókazonosítója egy `https://acme-v02.api.letsencrypt.org/acme/acct/12345678` URL formájában jelenik meg.

Ha Certbotot használ, a fiókazonosítóját a `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json` "uri" mezőjében találja meg.

Ha egy másik ACME klienst használ, akkor az adott kliens instrukciói az irányadók. Keresse logjaiban a fent leírt formátumú URL-eket. Ha az ACME kliense nem rögzíti a fiók azonosítóját, akkor azt egy új regisztrációs kérelem benyújtásával szerezheti be ugyanazzal a kulccsal. További részletekért lásd az [ACME specifikációt](https://tools.ietf.org/html/rfc8555#section-7.3). Az Ön azonosítójának numerikus formáját a Boulder-Requester fejlécben is megtalálhatja az ACME kliens minden egyes POST-jára adott válaszban.
