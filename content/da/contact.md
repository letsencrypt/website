---
title: Kontakt
slug: contact
description: How to contact us
top_graphic: 1
lastmod: 2023-08-23
menu:
  main:
    weight: 90
    parent: about
---

**Vi yder ikke support via e-mail. Hvis du har et spørgsmål om support, så brug venligst vores [community fora](https://community.letsencrypt.org). Nedenstående e-mail-adresser er kun for de specifikke emner, der er angivet.**

## Pressehenvendelser

E-mail: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorering

E-mail: [press@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Abonner på vores nyhedsbrev <iframe src="https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51" height="200" style="width: 100%; border: 0"></iframe>

## Privatlivspolitik

Email: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Sikkerhed

**Skriv venligst ikke til denne adresse, medmindre din meddelelse vedrører et sikkerhedsproblem med Let's Encypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Krypteret Kommunikation

Brug venligst vores GPG-nøgle for at kommunikere sikkert med Sikkerhedsteamet. Den består af flere undernøgler signeret af en offline master nøgle. Enhver nyere version af GnuPG vil støtte denne form for hybrid nøgle. Den aktuelle nøglestruktur er:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Du kan downloade [GPG Public Key](/security_letsencrypt.org-publickey.asc) her.

Nøglefingeraftrykket skal matche `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.
