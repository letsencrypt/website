---
title: Testmiljö
slug: staging-environment
lastmod: 2026-04-10
show_lastmod: 1
---


Vi rekommenderar verkligen att du testar mot vår testmiljö innan du använder produktionsmiljön. På så sätt kan du få saker att funka innan riktiga certifikat utfärdas och minska risken att du närmar dig taktbegränsningar.

ACME-URL:en för vår [ACMEv2-testmiljö](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) är:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Om du använder [Certbot](https://certbot.eff.org/) kan du använda vår testmiljö med flaggan `--test-cert` eller `--dry-run`. För andra klienter, läs deras instruktioner för information om testning mot testmiljön.

Observera att ACME-konton är begränsade till varje miljö, och därför krävs ett separat konto för testmiljön. Certbot tar hand om detta åt dig.

# Taktbegränsningar

Testmiljön använder samma frekvensbegränsningar som [produktionsmiljön](/docs/rate-limits), men med andra värden:

* **[Nya registreringar per IP-adress](/docs/rate-limits/#new-registrations-per-ip-address)** gränsen är 50 per 3 timmar.
* **[Nya registreringar per IPv6-intervall](/docs/rate-limits/#new-registrations-per-ipv6-range)** gränsen är 500 per 3 timmar (samma som produktion).
* **[Nya beställningar per konto](/docs/rate-limits/#new-orders-per-account)** gränsen är 1500 per 3 timmar.
* **[Nya certifikat per registrerad domän](/docs/rate-limits/#new-certificates-per-registered-domain)** gränsen är 30000 per sekund.
* Den **[nya certifikat per exakt uppsättning identifierare](/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers)** gräns är 30 000 per vecka.
* Gränsen för **[auktorisationsfel per identifierare per konto](/docs/rate-limits/#authorization-failures-per-identifier-per-account)** är 200 per timme.
* Den **[gränsen för konditiva auktorisationsfel per identifierare per konto](/docs/rate-limits/#consecutive-authorization-failures-per-identifier-per-account)** är 3600 per 6 timmar.

[Övergripande begärandegränser](/docs/rate-limits/#overall-requests-limit) är:

| Ändpunkt           | Förfrågningar per IP (per sekund) | Burstkapacitet |
| ------------------ | --------------------------------- | -------------- |
| /acme/new-nonce    | 20                                | 10             |
| /acme/new-account  | 5                                 | 15             |
| /acme/new-order    | 20                                | 40             |
| /acme/revoke-cert  | 10                                | 100            |
| /acme/renewal-info | 1000                              | 100            |
| /acme/*            | 20                                | 20             |
| /directory         | 40                                | 40             |

# Certifikathierarki i testmiljön

Testmiljön har en certifikathierarki som [efterliknar produktionsmiljön](/certificates). Namnen har modifierats med ett prefix av (STAGING) och unikt namn för att göra dem tydligt åtskilda från deras produktionsmotsvarigheter.

## Rot-CA

Staging miljön har fyra aktiva rotcertifikat som **inte finns** i webbläsar-/klienttrust-lagringar: "(STAGING) Pretend Pear X1", "(STAGING) Bogus Broccoli X2", "(STAGING) Yearning Yucca Root YE" och "(STAGING) Yonder Yam Root YR".

Om du vill att en klient som endast används för testning ska lita på testmiljön kan du lägga till testmiljöns certifikat i klientens certifikatarkiv för testning. **Viktigt:** Lägg inte till testmiljöns rot- eller mellancertifikat i ett certifikatarkiv som du använder för vanlig surfning eller andra aktiviteter. De granskas inte och omfattas inte av samma krav som våra produktionsrotcertifikat och är därför endast säkra att använda för testning.

* **Pretend Pear X1**
  * Ämne: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Nyckeltyp: `RSA 4096`
  * Certifikatuppgifter: [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
  * Testwebbplatser: [giltiga](https://valid.x1.staging-test-certs.letsencrypt.org/), [återkallade](https://revoked.x1.staging-test-certs.letsencrypt.org/), [utgångna](https://expired.x1.staging-test-certs.letsencrypt.org/)
* **Bogus Broccoli X2**
  * Ämne: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Nyckeltyp: `ECDSA P-384`
  * Certifikatuppgifter (självsignerat): [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Certifikatuppgifter (cross-signerat av Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)
  * Testwebbplatser: [giltiga](https://valid.x2.staging-test-certs.letsencrypt.org/), [återkallade](https://revoked.x2.staging-test-certs.letsencrypt.org/), [utgångna](https://expired.x2.staging-test-certs.letsencrypt.org/)
* **Yearning Yucca Root YE**
  * Ämne: `O = ISRG, CN = (STAGING) Yearning Yucca Root YE`
  * Nyckeltyp: `ECDSA P-384`
  * Certifikatdetaljer (självsignerade): [der](/certs/staging/gen-y/root-ye.der), [pem](/certs/staging/gen-y/root-ye.pem), [txt](/certs/staging/gen-y/root-ye.txt)
  * Certifikatdetaljer (korssignerade av Bogus Broccoli X2): [der](/certs/staging/gen-y/root-ye-by-x2.der), [pem](/certs/staging/gen-y/root-ye-by-x2.pem), [txt](/certs/staging/gen-y/root-ye-by-x2.txt)
  * Testwebbplatser: [giltiga](https://valid.ye.staging-test-certs.letsencrypt.org/), [återkallade](https://revoked.ye.staging-test-certs.letsencrypt.org/), [utgångna](https://expired.ye.staging-test-certs.letsencrypt.org/)
* **Yonder Yam Root YR**
  * Ämne: `O = ISRG, CN = (STAGING) Yonder Yam Root YR`
  * Nyckeltyp: `RSA 4096`
  * Certifikatdetaljer (självsignerade): [der](/certs/staging/gen-y/root-yr.der), [pem](/certs/staging/gen-y/root-yr.pem), [txt](/certs/staging/gen-y/root-yr.txt)
  * Certifikatdetaljer (korssignerade av Pretend Pear X1): [der](/certs/staging/gen-y/root-yr-by-x1.der), [pem](/certs/staging/gen-y/root-yr-by-x1.pem) [txt](/certs/staging/gen-y/root-yr-by-x1.txt)
  * Testwebbplatser: [giltiga](https://valid.yr.staging-test-certs.letsencrypt.org/), [återkallade](https://revoked.yr.staging-test-certs.letsencrypt.org/), [utgångna](https://expired.yr.staging-test-certs.letsencrypt.org/)

## Underordnade (intermediära) CA

Testmiljön har mellancertifikat som motsvarar produktionsmiljön och utfärdas från de icke betrodda rotcertifikat som beskrivs ovan. Som i produktionen används inte alla vid någon given tidpunkt. Den fullständiga listan över aktuella intermediärer är:

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14
* (STAGING) Artificial Amaranth YE1
* (STAGING) Baloney Bulgur YE2
* (STAGING) Cad Corn YE3
* (STAGING) Dastardly Durum YR1
* (STAGING) Ersatz Emmer YR2
* (STAGING) Fake Farro YR3

Dessa intermediärer kan ändras när som helst och bör inte fastställas eller litas på av något system. I allmänhet kan du förvänta dig att staging-intermediärer motsvarar de motsvarande produktions-(betrodda) intermediärerna. Om det är strikt nödvändigt kan du få fullständiga certifikatuppgifter [här](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Certifikattransparens

Testmiljön använder flera test-CT-loggar. SCT:er från dessa loggar ingår i testcertifikat. Men eftersom testmiljön endast är en testmiljö, kan CT inte användas för att pålitligt observera certifikat som utfärdats i testmiljön.

Dessa loggar inkluderar Let's Encrypt [Testing Logs](/docs/ct-logs#testing), samt testloggar från andra Certificate Transparency-loggoperatörer.

Dessutom kan vissa [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv)-loggar användas, som inte är verkliga loggar och inte lagrar utfärdade certifikat.

# Kontinuerlig integration / utvecklingstestning

Testmiljön har generösa taktbegränsningar för att möjliggöra testning men det passar inte så bra för integration med utvecklingsmiljöer eller kontinuerlig integration (CI). Att göra nätverksanrop till externa servrar can introducera instabilitet och testmiljön tillhandahåller inte något sätt att "fejka" DNS eller lyckad utmaningsvalidering vilket bidrar till mer komplicerade testbäddar.

Förutom testmiljön så erbjuder Let's Encrypt en liten ACME-server specialbyggd för CI och utvecklingsmiljöer kallad [Pebble](https://github.com/letsencrypt/pebble). Att köra Pebble på din utvecklingsmaskin eller i en CI-miljö är [snabbt och enkelt](https://github.com/letsencrypt/pebble#docker).
