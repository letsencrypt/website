---
title: Pronalaženje ID -ova računa
slug: account-id
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Kada želite da prijavite problem, može biti od pomoći ukoliko bi ste naveli Vaš Let's Encrypt broj korisničkog naloga. Uobičajeno proces kreiranja naloga je automatski izveden od strane ACME klijenta kojeg koristite za komunikaciju sa Let's Encrypt-om bez obzira da li imate više naloga konfigurisanih ukoliko pokrećete nekoliko ACME klijenata na više servera.

Broj vašeg korisničkog naloga je URL od formulara `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Ukoliko koristite Certbot, Vaš korisnički broj naloga možete pronaći unutar "uri" polja u `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Ukoliko koristite neki drugi ACME klijent, ove instrukcije će najverovatnije zavisiti od samog klijenta kojeg upotrebljavate. Proverite unutar vaših logova za URL-ove od formulara opisanog iznad. Ukoliko Vaš ACME klijent ne zapiše broj Vašeg korisničkog naloga, broj možete dobiti tako što ćete ponovno napraviti zahtev za registraciju sa istim ključem. Pogledajte [ACME specifikaciju za više detalja](https://tools.ietf.org/html/rfc8555#section-7.3). Takođe možete pronaći numeričku formu vašeg broja korisničkog naloga u header-u unutar samog odgovora svakog od POST zahteva koji Vaš ACME klijent pravi.
