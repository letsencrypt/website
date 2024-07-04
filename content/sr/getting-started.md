---
title: Prvi koraci
slug: getting-started
date: 2020-02-11
---

Da biste omogućili HTTPS na svojoj web lokaciji, morate dobiti sertifikat (vrsta datoteke) od sertifikacionog tela (CA). Let's Encrypt je sertifikaciono telo (CA). Da biste dobili sertifikat za domen vaše web lokacije od Let's Encrypt, morate prethodno dokazati kontrolu nad tim istim domenom. Sa Let's Encrypt-om, to dokazujete pomoću softvera koji koristi [ACME protokol](https://tools.ietf.org/html/rfc8555), koji se obično pokreće na vašem web serveru.

Da biste saznali koja je metoda najbolja za vas, morate znati da li imate [shell pristup](https://en.wikipedia.org/wiki/Shell_account) (takođe poznat kao SSH pristup) vašem web serveru. Ako svojom web stranicom u potpunosti upravljate putem panela poput [cPanel-a](https://cpanel.net/), [Plesk-a](https://www.plesk.com/) ili [WordPress-a](https://wordpress.org/), postoji velika šansa da nemate shell pristup. To možete uvek proveriti sa Vašim hosting provajderom kako bi ste bili sigurni.

# Posedujete Shell pristup

Preporučujemo da većina ljudi sa shell pristupom koristi [Certbot](https://certbot.eff.org/ "Certbot") ACME klijent. Ovaj klijent može automatizovati izdavanje i instalaciju sertifikata bez prestanka rada Vašeg web sajta. Takođe pruža i "expert" modove za ljude koji ne žele automatsku konfiguraciju. Jednostavan je za upotrebu, radi na mnogim operativnim sistemima, a poseduje i sjajnu dokumentaciju. [Posetite Certbot stranicu](https://certbot.eff.org/ "Certbot") da biste dobili prilagođena uputstva za vaš operativni sistem i web server.

Ukoliko [Certbot](https://certbot.eff.org/ "Certbot") ne zadovoljava vaše potrebe ili želite isprobati nešto drugo, postoji [mnogo više ACME klijenata](/docs/client-options).  Jednom kada odaberete ACME klijenta, pogledajte dokumentaciju za konkretno tog klijenta kako bi ste nastavili sa daljim koracima.

Ako eksperimentišete sa različitim ACME klijentima, koristite naše [staging okruženje](/docs/staging-environment) da biste izbegli dostizanje [servisnih prekoračenja i limita](/docs/rate-limits).

# Bez Shell pristupa

Najbolji način korišćenja Let's Encrypt-a bez Shell pristupa je pomoću built-in podrške od vašeg hosting provajdera. Ako vaš hosting provajder podržava Let's Encrypt, on može zatražiti besplatan sertifikat u vaše ime, instalirati ga i automatski ga ažurirati kada to bude bilo potrebno.  Za neke hosting provajdere ovo je konfiguracija koja se treba eksplicitno zatražiti/uključiti.  Ostali provajderi automatski zahtevaju i instaliraju sertifikate za sve svoje klijente.

[Proverite našu listu hosting provajdera](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) i proverite da li se Vaš provajder nalazi na listi. Ukoliko je to slučaj, molimo Vas da pratite njihovu dokumentaciju da bi ste instalirali svoj Let's Encrypt sertifikat.

Ako vaš hosting provajder ne podržava Let's Encrypt, možete im se obratiti i zatražite podršku. Trudimo se da olakšamo dodavanje Let's Encrypt podrške, a hosting provajderi se često raduju da čuju predloge kupaca!

Ako vaš hosting provajder ne želi integrisati Let's Encrypt, ali podržava upload sertifikata, u tom slučaju možete sami instalirati Certbot na Vašem računaru i koristite ga u [ručnom režimu](https://certbot.eff.org/docs/using.html#manual). U ručnom režimu učitavate određenu datoteku na svoj web server kako biste dokazali vlasništvo nad domenom. Certbot će tada preuzeti sertifikat koji možete upload-ovati kod svog hosting provajdera. Ne preporučujemo ovu opciju jer oduzima dosta vremena i zahteva da se ceo proces ponavlja nekoliko puta tokom godine kada sertifikat bude isticao. Za većinu ljudi je bolje zatražiti podršku za Let's Encrypt od svog hosting provajdera ili jednostavno promeniti provajdera ukoliko ga Vaš trenutni provajder ne planira podržati.

# Pomoć

Ako imate pitanja o odabiru ACME klijenta ili o korišćenju određenog klijenta ili bilo što drugo vezano za Let's Encrypt, pokušajte postaviti pitanje u [našoj zajednici i korisnim forumima](https://community.letsencrypt.org/).
