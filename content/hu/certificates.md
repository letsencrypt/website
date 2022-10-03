---
title: Bizalmi lánc
linkTitle: Bizalmi lánc (Gyökér és közbenső tanúsítványok)
slug: certificates
top_graphic: 5
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Gyökértanúsítványok

Gyökértanúsítvánainkat biztonságos módon offline tároljuk. Végfelhasználói tanúsítványokat állítunk ki előfizetőknek köztes tanúsító hatóságtól a következő szakaszban. A további kompatibilitás érdekében, mivel az új Root X2-t különböző root programokhoz nyújtjuk be, a Root X1-el szintén kereszttanúsítottuk.

* Aktív
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Önaláírt](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [DST Root CA X3 által kereszttanúsítva](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Aktív, korlátozott elérhetőség
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Önaláírt](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [ISRG Root X1 által kereszttanúsítva](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Weboldalakat hoztunk létre, hogy teszteljük az aktív root-okhoz láncolt tanúsítványokat.

* ISRG Root X1
  * [Érvényes](https://valid-isrgrootx1.letsencrypt.org/)
  * [Visszavont](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Lejárt](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Érvényes](https://valid-isrgrootx2.letsencrypt.org/)
  * [Visszavont](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Lejárt](https://expired-isrgrootx2.letsencrypt.org/)

# Köztes tanúsítványok

Normál körülmények között a Let's Encrypt által kiadott tanúsítványok az "R3"-tól, egy RSA közvetítőtől származnak. Jelenleg az "E1"-ről, egy ECDSA közbenső kulcsról történő kiadás csak az [engedélyezett fiókok](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) ECDSA előfizetői kulcsaihoz lehetséges. A jövőben az "E1" kibocsátása mindenki számára elérhető lesz.

Más közvetítőinket ("R4" és "E2") katasztrófa utáni helyreállításra tartjuk fenn, és csak akkor használjuk őket, ha elveszítjük az elsődleges közvetítőink kibocsátási képességét. Már nem használjuk az X1, X2, X3 és X4 közvetítőket.

Az IdenTrust a további kompatibilitás érdekében kereszttanusította a közbenső RSA-t.

* Aktív
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (visszavonult)
* Aktív, korlátozott elérhetőség
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [ISRG Root X2 által aláírt](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Backup
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (visszavonult)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [ISRG Root X2 által aláírt](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Visszavonult
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [ISRG Root X1 által aláírt](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [IdenTrust által kereszttanúsítva](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Kereszttanúsítás

## Köztes tanúsítványok

Minden egyes köztes tanúsítvány egyetlen publikus/privát kulcs párként van reprezentálva. Ennek a párnak a magánkulcsa generálja az aláírást az összes végponti tanúsítványhoz (más néven levéltanúsítványokhoz), azaz a szerveren való használatra kiállított tanúsítványokhoz.

RSA közvetítőinket az ISRG Root X1 írja alá. Az ISRG Root X1 jelenleg széles körben megbízható, de az RSA közvetítőinket továbbra is az IdenTrust "[DST Root CA X3](https://crt.sh/?id=8395)" keresztaláírással látja el (mostantól "TrustID X3 Root") a további ügyfél-kompatibilitás érdekében. Az IdenTrust gyökér régebb óta létezik, ezért jobb kompatibilitással rendelkezik a régebbi eszközökkel és operációs rendszerekkel (pl. Windows XP, Android 7). A ["TrustID X3 Root" letölthető](https://www.identrust.com/support/downloads) az IdenTrusttól (vagy [letölthet egy példányt tőlünk](/certs/trustid-x3-root.pem.txt)).

A kereszttanúsítások azt jelentik, hogy minden egyes RSA közvetítőnknek két tanúsítványa van, amelyek ugyanazt az aláíró kulcsot képviselik. Az egyiket a DST Root CA X3, a másikat pedig az ISRG Root X1 írta alá. A legegyszerűbben a kibocsátó mező alapján lehet megkülönböztetni a kettőt.

A webszerver konfigurálásakor a szerver üzemeltetője nemcsak a végponti tanúsítványt konfigurálja, hanem a közvetítők listáját is, hogy a böngészők ellenőrizhessék, hogy a végponti tanúsítvány rendelkezik-e egy megbízható gyökértanúsítványhoz vezető bizalmi lánccal. Szinte minden szerverüzemeltető úgy dönt, hogy egy olyan láncot szolgáltat ki, amely tartalmazza az "R3" alanyú és "ISRG Root X1" kiállítójú közbenső tanúsítványt. Az ajánlott Let's Encrypt kliensszoftver, a [Certbot](https://certbot.org), zökkenőmentesen elvégzi ezt a konfigurációt.

## Gyökértanúsítványok
A köztes tanúsítványokhoz hasonlóan a gyökértanúsítványok is lehetnek kereszttanúsítottak, gyakran a kliens-kompatibilitás növelése érdekében. A mi ECDSA root-unk, az ISRG Root X2 2020 őszén készült, és ez az ECDSA-hierarchia gyökértanúsítványa. Két tanúsítvány képviseli: egy saját aláírású és egy az ISRG Root X1 által aláírt tanúsítvány.

Az "E1" ECDSA közbenső tanúsítvány által aláírt összes tanúsítvány egy olyan láncot tartalmaz, amely tartalmaz egy közbenső tanúsítványt, amelynek tárgya "ISRG Root X2" és kiállítója "ISRG Root X1". Szinte minden szerverüzemeltető ezt a láncot fogja választani, mivel ez kínálja a legnagyobb kompatibilitást, amíg az ISRG Root X2-ben széles körben megbíznak.

# OCSP aláírási tanúsítvány

Ez a tanúsítvány a Let's Encrypt hatóság közvetítőinek OCSP válaszainak aláírására szolgál, így a válaszok aláírásához nem kell a gyökérkulcsot online állapotba hozni. Az OCSP válaszok automatikusan tartalmazzák ennek a tanúsítványnak a másolatát, így az előfizetőknek nem kell vele semmit sem kezdeniük. Csak tájékoztató jelleggel szerepel itt.

* ISRG Root OCSP X1 ([ISRG Root X1 által aláírt](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Az újabb köztes tanúsítóink nem rendelkeznek OCSP URL címekkel (a visszavonási információikat ehelyett CRL-en keresztül szolgáltatják), ezért nem állítottunk ki OCSP aláírási tanúsítványt az ISRG Root X2-től.

# Certificate Transparency

Elkötelezettek vagyunk az átláthatóság iránt a működésünk és az általunk kibocsátott tanúsítványok tekintetében is. Minden tanúsítvány bekerül a [tanúsítványok átláthatósági naplójába (Certificate Transparency logs)](https://www.certificate-transparency.org/), amint kiállítjuk őket. Az összes kiadott Let's Encrypt tanúsítványt ezeken a linkeken keresztül tekintheti meg:

* [Let's Encrypt Authority X1 által kiadott](https://crt.sh/?Identity=%25&iCAID=7395)
* [Let's Encrypt Authority X3 által kiadott](https://crt.sh/?Identity=%25&iCAID=16418)
* [E1 által kiadott](https://crt.sh/?Identity=%25&iCAID=183283)
* [R3 által kiadott](https://crt.sh/?Identity=%25&iCAID=183267)
