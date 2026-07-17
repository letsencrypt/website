---
title: Staging prostředí
slug: staging-environment
lastmod: 2026-04-10
show_lastmod: 1
---


Před použitím produkčního prostředí důrazně doporučujeme vše nejprve vyzkoušet v našem staging prostředí. Můžete tak vše správně nastavit ještě před vydáním důvěryhodných certifikátů a snížit riziko překročení limitů četnosti požadavků.

Adresa URL našeho [staging prostředí ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) je:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Používáte-li [Certbot](https://certbot.eff.org/), můžete staging prostředí zvolit přepínačem `--test-cert` nebo `--dry-run`. U ostatních klientů ACME najdete postup pro testování v našem staging prostředí v jejich dokumentaci.

Účty ACME jsou vázané na konkrétní prostředí, proto staging prostředí vyžaduje samostatný účet. Certbot se o to postará automaticky.

# Limity četnosti požadavků

Staging prostředí používá stejné typy limitů jako [produkční prostředí](/docs/rate-limits), ale s jinými hodnotami:

* Limit **[nových registrací na IP adresu](/docs/rate-limits/#new-registrations-per-ip-address)** je 50 za 3 hodiny.
* Limit **[nových registrací na rozsah IPv6](/docs/rate-limits/#new-registrations-per-ipv6-range)** je 500 za 3 hodiny (stejně jako v produkčním prostředí).
* Limit **[nových objednávek na účet](/docs/rate-limits/#new-orders-per-account)** je 1500 za 3 hodiny.
* Limit **[nových certifikátů na registrovanou doménu](/docs/rate-limits/#new-certificates-per-registered-domain)** je 30000 za sekundu.
* Limit **[nových certifikátů pro přesnou sadu identifikátorů](/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers)** je 30000 za týden.
* Limit **[neúspěšných autorizací na identifikátor a účet](/docs/rate-limits/#authorization-failures-per-identifier-per-account)** je 200 za hodinu.
* Limit **[po sobě jdoucích neúspěšných autorizací na identifikátor a účet](/docs/rate-limits/#consecutive-authorization-failures-per-identifier-per-account)** je 3600 za 6 hodin.

[Celkové limity požadavků](/docs/rate-limits/#overall-requests-limit) jsou:

| Endpoint           | Počet požadavků na IP adresu (za sekundu) | Nárazová kapacita |
| ------------------ | ----------------------------------------- | ----------------- |
| /acme/new-nonce    | 20                                        | 10                |
| /acme/new-account  | 5                                         | 15                |
| /acme/new-order    | 20                                        | 40                |
| /acme/revoke-cert  | 10                                        | 100               |
| /acme/renewal-info | 1000                                      | 100               |
| /acme/*            | 20                                        | 20                |
| /directory         | 40                                        | 40                |

# Hierarchie testovacích certifikátů

Staging prostředí používá hierarchii certifikátů, která [napodobuje produkční prostředí](/certificates). Každý název dostal prefix (STAGING) a jedinečné označení, aby jej bylo možné snadno odlišit od produkčního protějšku.

## Kořenové CA

Staging prostředí používá čtyři aktivní kořenové certifikáty, které **nejsou uloženy** v úložištích důvěryhodných certifikátů prohlížečů ani klientů: „(STAGING) Pretend Pear X1“, „(STAGING) Bogus Broccoli X2“, „(STAGING) Yearning Yucca Root YE“ a „(STAGING) Yonder Yam Root YR“.

Chcete-li, aby klient určený výhradně k testování důvěřoval testovacímu prostředí, přidejte tyto certifikáty do jeho testovacího úložiště důvěryhodných certifikátů. **Důležité:** Kořenové ani zprostředkující certifikáty staging prostředí nepřidávejte do úložiště důvěryhodných certifikátů, které používáte k běžnému prohlížení webu nebo jiným činnostem. Tyto certifikáty neprocházejí auditem a nemusí splňovat stejné standardy jako naše produkční kořenové certifikáty, proto je nelze bezpečně používat k jinému účelu než k testování.

* **Pretend Pear X1**
  * Předmět: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Typ klíče: ` RSA 4096`
  * Podrobnosti o certifikátu: [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
  * Testovací weby: [platný](https://valid.x1.staging-test-certs.letsencrypt.org/), [odvolaný](https://revoked.x1.staging-test-certs.letsencrypt.org/), [expirovaný](https://expired.x1.staging-test-certs.letsencrypt.org/)
* **Bogus Broccoli X2**
  * Předmět: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Typ klíče: `ECDSA P-384`
  * Podrobnosti o certifikátu (samopodepsaný): [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Podrobnosti o certifikátu (křížově podepsaný certifikátem Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)
  * Testovací weby: [platný](https://valid.x2.staging-test-certs.letsencrypt.org/), [odvolaný](https://revoked.x2.staging-test-certs.letsencrypt.org/), [expirovaný](https://expired.x2.staging-test-certs.letsencrypt.org/)
* **Yearning Yucca Root YE**
  * Předmět: `O = ISRG, CN = (STAGING) Yearning Yucca Root YE`
  * Typ klíče: `ECDSA P-384`
  * Podrobnosti o certifikátu (samopodepsaný): [der](/certs/staging/gen-y/root-ye.der), [pem](/certs/staging/gen-y/root-ye.pem), [txt](/certs/staging/gen-y/root-ye.txt)
  * Podrobnosti o certifikátu (křížově podepsaný certifikátem Bogus Broccoli X2): [der](/certs/staging/gen-y/root-ye-by-x2.der), [pem](/certs/staging/gen-y/root-ye-by-x2.pem), [txt](/certs/staging/gen-y/root-ye-by-x2.txt)
  * Testovací weby: [platný](https://valid.ye.staging-test-certs.letsencrypt.org/), [odvolaný](https://revoked.ye.staging-test-certs.letsencrypt.org/), [expirovaný](https://expired.ye.staging-test-certs.letsencrypt.org/)
* **Yonder Yam Root YR**
  * Předmět: `O = ISRG, CN = (STAGING) Yonder Yam Root YR`
  * Typ klíče: ` RSA 4096`
  * Podrobnosti o certifikátu (samopodepsaný): [der](/certs/staging/gen-y/root-yr.der), [pem](/certs/staging/gen-y/root-yr.pem), [txt](/certs/staging/gen-y/root-yr.txt)
  * Podrobnosti o certifikátu (křížově podepsaný certifikátem Pretend Pear X1): [der](/certs/staging/gen-y/root-yr-by-x1.der), [pem](/certs/staging/gen-y/root-yr-by-x1.pem), [txt](/certs/staging/gen-y/root-yr-by-x1.txt)
  * Testovací weby: [platný](https://valid.yr.staging-test-certs.letsencrypt.org/), [odvolaný](https://revoked.yr.staging-test-certs.letsencrypt.org/), [expirovaný](https://expired.yr.staging-test-certs.letsencrypt.org/)

## Podřízené (zprostředkující) certifikační autority

Staging prostředí používá zprostředkující certifikáty, které napodobují produkční hierarchii a jsou vydány výše uvedenými nedůvěryhodnými kořenovými certifikáty. Stejně jako v produkčním prostředí nejsou vždy používány všechny. Úplný seznam aktuálních zprostředkujících certifikátů:

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

Tyto zprostředkující certifikáty se mohou kdykoli změnit. Žádný systém by je proto neměl pinovat ani jim důvěřovat. Obecně lze očekávat, že zprostředkující certifikáty staging prostředí budou odpovídat příslušným produkčním (důvěryhodným) certifikátům. Pokud je to nezbytně nutné, úplné podrobnosti o certifikátech najdete [zde](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Transparentnost certifikátů

Staging prostředí používá několik testovacích logů CT. Certifikáty vydané ve staging prostředí obsahují SCT z těchto logů. Protože jde pouze o staging prostředí, nelze pomocí CT spolehlivě sledovat certifikáty, které v něm byly vydány.

Patří mezi ně [testovací logy](/docs/ct-logs#testing) Let's Encrypt i testovací logy dalších provozovatelů logů transparentnosti certifikátů.

Mohou se používat také některé logy [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv). Nejde o skutečné logy a vydané certifikáty se do nich neukládají.

# Průběžná integrace a testování při vývoji

Staging prostředí má vysoké limity četnosti požadavků, aby umožnilo testování, ale pro integraci s vývojovými prostředími ani pro průběžnou integraci (CI) se příliš nehodí. Síťové požadavky na externí servery mohou do testů vnášet nestabilitu. Staging prostředí navíc neumožňuje simulovat úspěšné ověření DNS ani splnění výzvy, takže nastavení testů je složitější.

Kromě staging prostředí nabízí Let's Encrypt také malý server ACME nazvaný [Pebble](https://github.com/letsencrypt/pebble), který je určen přímo pro CI a vývojová prostředí. Spuštění Pebble na vývojovém počítači nebo v prostředí CI je [rychlé a snadné](https://github.com/letsencrypt/pebble#docker).
