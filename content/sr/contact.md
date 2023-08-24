---
title: Kontakt
slug: contact
description: Kako nas kontaktirati
top_graphic: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**Ne pružamo podršku putem elektronske pošte. Ukoliko želite da postavite pitanje molimo Vas da koristite naš [forum](https://community.letsencrypt.org). Elektronske adrese ispod služe samo za specifične teme opisane ispod.**

## Odnosi sa javnošću

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponzorstvo

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Bilten

Za informaciju oko raznoraznih tehničkih biltena, molimo vas da posetite [Priključite se](/getinvolved).

## Bezbednost

**Molimo Vas da ne šaljete upite na ovu e-adresu, osim u slučajevima ako imate nedoumica oko bezbednostnih problema vezanih za Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>

### Zaštićena komunikacija

Da bi ste bezbedno komunicirali sa našim timom za bezbednost, molimo Vas da koristite naš GPG ključ. Sastoji se od nekoliko potključeva potpisanih mrežnim glavnim ključem. Bilo koja nedavna verzija GnuPG-a podržava ovu vrstu hibridnog ključa. Trenutna struktura ključa je:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

Možete preuzeti [GPG Public Key](/security_letsencrypt.org-publickey.asc) ovde, ili da koristite Vaš omiljeni server.

"Fingerprint" od ključa mora da se podudara sa `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.
