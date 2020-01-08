---
title: Testmiljö
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2019-09-16
---

{{< lastmod >}}

Vi rekommenderar verkligen att du testar mot vår testmiljö innan du använder
produktionsmiljön. På så sätt kan du få saker att funka innan riktiga
certifikat utfärdas och minska risken att du närmar dig taktbegränsningar.

ACME-URL:en för vår
[ACMEv2-testmiljö](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)
är:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Om du använder Certbot så kan du använda testmiljön genom växeln `--dry-run`.
För andra klienter, läs deras instruktioner för information om testning mot
testmiljön. Observera att v2-testmiljön kräver en v2-kompatibel ACME-klient.

# Taktbegränsningar

Testmiljön använder samma regler som [produktionsmiljön]({{< relref
"/docs/rate-limits.md" >}}) fast med följande undantag:

* **Antal certifikat per registrerad domän**-gränsen är 30000 per vecka
* **Certifikatdublett**-gränsen är 30000 per vecka
* **Antal misslyckade valideringar**-gränsen är 60 per timme
* **Konton per IP-adress**-gränsen är 50 konton per IP-adress under 3 timmar
* För ACMEv2 är **nya beställningar**-gränsen 1500 beställningar under 3 timmar
  per konto

# Rotcertifikat

Testmiljöns mellancertifikat (["Fake LE Intermediate
X1"](/certs/fakeleintermediatex1.pem)) är utfärdat av ett rotcertifikat som
**inte** är betrott av webbläsare och klienter. Om du vill modifiera en
testklient att lita på testmiljön i testsyfte så kan du göra det genom att
lägga till ["Fake LE Root X1"](/certs/fakelerootx1.pem)-certifikatet till din
lista över betrodda certifikat.  Viktigt: Lägg inte till testrot- eller
mellancertifikat till en lista över betrodda certifikat som du använder för
vanlig surf eller andra aktiviteter eftersom de inte är granskade eller håller
samma standard som våra produktionsrotcertifikat och därför inte är säkra att
använda för annat än testning.

# Certifikattransparens

Testmiljön skickar förcertifikat till Let's Encrypts [Testflume]({{< relref
"/docs/ct-logs.html" >}}) och Googles
[testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs)
CT-testloggar och inkluderar de returnerade SCT:erna (signerade
certifikattidsangivelser) i de utfärdade certifikaten.
