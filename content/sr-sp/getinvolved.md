---
title: Priključite se
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## Zajednica

Uvek nam koristi pomoć pri odgovaranju na pitanja u [Let's Encrypt Zajednici](https://community.letsencrypt.org/). Pročitajte [ovaj blog post](/2015/08/13/lets-encrypt-community-support.html) o tome zašto su doprinosi zajednice tako važni.

## Kod

Takođe,često volimo da koristimo i pomoć oko razvoja softvera.Ceo naš izvorni kod je na [GitHub-u](https://github.com/letsencrypt/).

### Klijentski softver

[Certbot](https://github.com/certbot/certbot) je uslužni program koji se temelji na Pythonu i koji zajedno sa vašim web serverom automatski potražuje sertifikat i pretvara web lokaciju u HTTPS osiguranu. Certbot je klijentski softver koji preporučujemo većini ljudi. Mnoge druge [klijentske opcije trećih strana]({{< ref "/docs/client-options.md">}}) su takođe dostupne.

### Server-side CA softver

[Boulder](https://github.com/letsencrypt/boulder) je implementacija Let's Encrypt CA. Temelji se na protokolu [ACME](https://github.com/ietf-wg-acme/acme), a prvenstveno je napisan u programskom jeziku Go. Sjajno mesto za početak je popis [pitanja od ljudi koji traže pomoć) (https://github.com/letsencrypt/boulder/isissue?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted) i [vodič za doprinose](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md).

### letsencrypt.org

Možete učestvovati i unaprediti ovaj web sajt i dokumentaciju [ovde](https://github.com/letsencrypt/website) ili nam pomoći sa [prevodom na druge jezike](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md).

## Protokol

Let’s Encrypt CA razgovara sa softverom za upravljanje sertifikatima koji radi na web serverima. Protokol za to se zove ACME, za "Automatizovano okruženje za upravljanje sertifikatima". Nacrt specifikacije ACME je [dostupan na Github-u](https://github.com/ietf-wg-acme/acme). Unutar IETF-a je u toku rad na finalizaciji ACME-a kao zaista otvorenog standarda. Možete se pridružiti raspravi o razvoju protokola ACME na [ovoj IETF listi za slanje](https://www.ietf.org/mailman/listinfo/acme).