---
title: Kom godt i gang
slug: getting-started
top_graphic: 3
date: 2020-02-11
lastmod: 2023-12-20
---

<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
  <div>Let's Encrypt ACME Ordbogens URL er:</div>
  <div><a href="https://acme-v02.api.letsencrypt.org"><code>https://acme-v02.api.letsencrypt.org/directory</code></a></div>
</div>

For at aktivere HTTPS på din hjemmeside, skal du have et certifikat (en type fil) fra en certifikatmyndighed (CA). Let's Encrypt er en CA. For at få et certifikat til dit websteds domæne fra Let's Encrypt skal du demonstrere kontrol over domænet. Med Let's Encrypt gør du dette ved hjælp af software, der bruger den [ACME-protokol](https://tools.ietf.org/html/rfc8555), som typisk kører på din webhost.

For at finde ud af, hvilken metode der vil fungere bedst for dig, skal du vide, om du har [shell adgang](https://en.wikipedia.org/wiki/Shell_account) (også kendt som SSH adgang) til din webhost. Hvis du håndterer din hjemmeside udelukkende gennem et kontrolpanel som [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), eller [WordPress](https://wordpress.org/), der er en god chance for at du ikke har shell adgang. Du kan spørge din hostingudbyder for at være sikker.

# Med Shell-Adgang

Vi anbefaler, at de fleste personer med shell adgang bruger [Certbot][] ACME-klienten. Det kan automatisere udstedelse af certifikater og installation uden nedetid. Det har også ekspert tilstand for mennesker, der ikke ønsker autokonfiguration. Det er nemt at bruge, virker på mange operativsystemer, og har god dokumentation. [Besøg Certbot-webstedet][Certbot] for at få instruktioner, der er tilpasset, til dit operativsystem og din webserver.

Hvis [Certbot][] ikke opfylder dine behov, eller du gerne vil prøve noget andet der er [mange flere ACME-klienter at vælge imellem](/docs/client-options).  Når du har valgt ACME-klient software, se dokumentationen for den pågældende klient for at fortsætte.

Hvis du eksperimenterer med forskellige ACME-klienter, skal du bruge vores [staging-miljø](/docs/staging-environment) for at undgå at ramme [kaldsgrænser](/docs/rate-limits).

# Uden Shell Adgang

Den bedste måde at bruge Lad os Kryptere uden shell adgang er ved hjælp af indbygget support fra din hosting-udbyder. Hvis din hostingudbyder tilbyder støtte til Let's Encrypt kan de anmode om et gratis certifikat på dine vegne, installere det og holde det opdateret automatisk. For nogle hosting-udbydere er dette en konfigurationsindstilling, du skal slå til. Andre udbydere anmoder automatisk om og installerer certifikater for alle deres kunder.

[Tjek vores liste over hostingudbydere](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) for at se om din er på den. Hvis dette er tilfældet, følg deres dokumentation for at oprette dit Let's Encrypt certifikat.

Hvis din hostingudbyder ikke understøtter Let's Encrypt, kan du kontakte dem for at bede om hjælp. Vi gør vores bedste for at gøre det meget nemt at tilføje Let's Encrypt understøttelse, og udbydere er ofte glade for at modtage forslag fra deres kunder!

Hvis din hostingudbyder ikke ønsker at integrere Let's Encrypt, men understøtter upload af brugergenerede certifikater, kan du installere Certbot på din egen computer og bruge den i [manuel tilstand](https://certbot.eff.org/docs/using.html#manual). I manuel tilstand uploader du en bestemt fil til din hjemmeside for at bevise din kontrol. Certbot vil derefter hente et certifikat, som du kan uploade til din hosting-udbyder. Vi anbefaler ikke denne indstilling, fordi det er tidskrævende og du bliver nødt til at gentage det flere gange om året, inden dit certifikat udløber. For de fleste mennesker er det bedre at anmode om Let's Encrypt support fra din hosting udbyder, eller skifte udbydere, hvis de ikke planlægger at gennemføre det.

# Få hjælp

Hvis du har spørgsmål om at vælge en ACME-klient, eller om at bruge en bestemt klient, eller noget andet relateret til Lad os Kryptere, prøv venligst vores [nyttige fora](https://community.letsencrypt.org/).

[Certbot]: https://certbot.eff.org/ "Certbot"

[Certbot]: https://certbot.eff.org/ "Certbot"
