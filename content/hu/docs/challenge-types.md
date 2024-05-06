---
title: Kihívás típusok
slug: challenge-types
date: 2019-02-25
lastmod: 2020-12-08
show_lastmod: 1
---


Amikor Ön tanúsítványt kap a Let's Encrypt-től, szervereink az ACME szabványban meghatározott "kihívások" segítségével érvényesítik, hogy Ön rendelkezik a tanúsítványban szereplő domain nevekkel. Az esetek többségében ezt az érvényesítést az ACME kliens automatikusan elvégzi, de ha bonyolultabb konfigurációs döntéseket kell hoznia, hasznos, ha többet tud róluk. Ha bizonytalan, használja az kliens alapértelmezett beállításait vagy a HTTP-01-et.

# HTTP-01 kihívás

Ez ma a leggyakoribb kihívástípus. A Let's Encrypt egy tokent ad az ACME kliensnek, és az ACME kliens egy fájlt helyez el a webszerverén a `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>` címen. Ez a fájl tartalmazza a tokent, valamint az Ön fiókkulcsának ujjlenyomatát. Amint az ACME kliens közli a Let's Encrypttel, hogy a fájl készen áll, a Let's Encrypt megpróbálja lekérni azt (esetleg többször is, több pontból). Ha a validációs ellenőrzések megfelelő válaszokat kapnak a webszervertől, a validálás sikeresnek tekinthető, és folytathatja a tanúsítvány kiállítását. Ha az validációs ellenőrzések sikertelenek, akkor egy új tanúsítvánnyal kell újra próbálkoznia.

A HTTP-01 kihívás megvalósítása az átirányításokat követi, akár 10 átirányításig. Csak a "http:" vagy "https:" átirányításokat fogadja el, és csak a 80-as vagy 443-as portokra. Nem fogad el átirányításokat IP-címekre. Amikor HTTPS URL-re irányít át, nem ellenőrzi a tanúsítványokat (mivel a kihívás célja az érvényes tanúsítványok indítása, előfordulhat, hogy útközben önaláírt vagy lejárt tanúsítványokkal találkozik).

A HTTP-01 kihívást csak a 80-as porton lehet végrehajtani. Ha az ügyfelek tetszőleges portokat adhatnának meg, az a kihívást kevésbé biztonságossá tenné, ezért az ACME-szabvány ezt nem engedélyezi.

Előnyök:

 - Könnyen automatizálható a domain konfigurációjának különösebb ismerete nélkül.
 - Lehetővé teszi a tárhelyszolgáltatók számára, hogy tanúsítványokat állítsanak ki a hozzájuk CNAME-elt domainekhez.
 - A szabványos webkiszolgálókkal működik.

Hátrányok:

 - Nem működik, ha az internetszolgáltató blokkolja a 80-as portot (ez ritka, de néhány lakossági internetszolgáltató ezt teszi).
 - A Let's Encrypt nem engedi, hogy ezt a kihívást wildcard tanúsítványok kiadására használja.
 - Ha több webszervere van, meg kell győződnie arról, hogy a fájl mindegyiken elérhető.

# DNS-01 kihívás

Ez a kihívás azt kéri, hogy bizonyítsa be, hogy Ön rendelkezik a domain nevéhez tartozó DNS felett, egy adott értéknek a domain név alatti TXT rekordba való beírásával. It is harder to configure than HTTP-01, but can work in scenarios that HTTP-01 can’t. Lehetővé teszi a wildcard tanúsítványok kiadását is. Miután a Let's Encrypt megadja az ACME kliensnek a tokent, a kliens létrehoz egy TXT rekordot, amely a tokenből és az Ön fiókkulcsából származik, és ezt a rekordot a `_acme-challenge.<YOUR_DOMAIN>` címre helyezi. Ezután a Let's Encrypt lekérdezi a DNS rendszert erre a bejegyzésre. Ha talál egyezést, akkor folytathatja a tanúsítvány kiállítását!

Mivel a kiadás és megújítás automatizálása nagyon fontos, csak akkor van értelme a DNS-01 kihívások használatának, ha a DNS szolgáltatója rendelkezik olyan API-val, amellyel Ön automatizálhatja a frissítéseket. Közösségünk összeállított egy [listát az ilyen DNS-szolgáltatókról, amelyeket itt talál](https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438). A DNS szolgáltatója lehet ugyanaz, mint a regisztrátora (a cég, amelytől a domain nevét vásárolta), de lehet, hogy más. Ha DNS szolgáltatót szeretne váltani, csak néhány apró változtatást kell végrehajtania a regisztrátoránál. Nem kell megvárni, hogy a domainje közel kerüljön a lejárathoz, hogy ezt megtehesse.

Vegye figyelembe, hogy a teljes DNS API hitelesítő adatok webkiszolgálón való elhelyezése jelentősen megnöveli a webkiszolgáló feltörése esetén annak hatását. A legjobb gyakorlat a [szűkebb hatókörű API hitelesítő adatok](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation) használata, vagy a DNS validáció elvégzése egy különálló szerverről, és a tanúsítványok automatikus másolása az Ön webszerverére.

Mivel a Let's Encrypt a DNS-01 érvényesítéséhez a TXT rekordok keresésekor a DNS szabványokat követi, a CNAME rekordok vagy NS rekordok használatával a kihívás megválaszolását más DNS zónákra delegálhatja. Ez arra használható, hogy az [`_acme-challenge` subdomaint egy validáció-specifikus szerverre vagy zónára delegálja](https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation). Akkor is használható, ha a DNS szolgáltatója lassan frissít, és egy gyorsabban frissítő szerverre szeretné delegálni.

A legtöbb DNS szolgáltatónak van egy "propagációs ideje", amely meghatározza, hogy mennyi idő telik el egy DNS rekord frissítése után, amíg az elérhetővé válik az összes szerverükön. Ezt nehéz mérni, mert gyakran [anycast-ot](https://en.wikipedia.org/wiki/Anycast)-t is használnak, ami azt jelenti, hogy több szerver is rendelkezhet ugyanazzal az IP-címmel, és attól függően, hogy Ön a világ mely pontján tartózkodik, előfordulhat, hogy más szerverrel beszél (és más választ kap), mint a Let's Encrypt. A legjobb DNS API-k lehetővé teszik Önnek, hogy automatikusan ellenőrizze, hogy egy frissítés teljes mértékben propagált-e. Ha a DNS szolgáltatója nem rendelkezik ilyennel, akkor úgy kell beállítania a klienset, hogy elég sokáig (gyakran akár egy órát) várjon, hogy a frissítés propagáljon, mielőtt elindítja a validálást.

Ugyanazon névhez több TXT rekord is tartozhat. Ez például akkor fordulhat elő, ha egyszerre validál egy wildcard és egy nem wildcard tanúsítványhoz tartozó kihívást. Azonban ügyelnie kell arra, hogy a régi TXT rekordokat törölje, mert ha a válasz mérete túl nagy lesz, a Let's Encrypt elkezdi elutasítani azt.

Előnyök:

 - Ezt a kihívást használhatja olyan tanúsítványok kiadására, amelyek wildcard domain neveket tartalmaznak.
 - Akkor is jól működik, ha több webszerverrel rendelkezik.

Hátrányok:

 - Az API hitelesítő adatokat a webszerverén tárolni kockázatos.
 - Előfordulhat, hogy az Ön DNS szolgáltatója nem kínál API-t.
 - Előfordulhat, hogy a DNS API nem ad információt a propagációs időkről.

# TLS-SNI-01

Ezt a kihívást az ACME tervezetében határozták meg. A 443-as porton TLS kézfogást hajtott végre, és elküldött egy speciális [SNI](https://en.wikipedia.org/wiki/Server_Name_Indication) fejlécet, keresve a tokent tartalmazó tanúsítványt. [2019 márciusában letiltották](https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209), mert nem volt elég biztonságos.

# TLS-ALPN-01

Ezt a kihívást a TLS-SNI-01 elavulása után fejlesztették ki, és jelenleg [különálló szabványként](https://tools.ietf.org/html/rfc8737) fejlesztik. A TLS-SNI-01-hez hasonlóan ez is TLS-en keresztül történik a 443-as porton. Egy egyedi ALPN protokollt használ azonban annak biztosítására, hogy csak olyan szerverek válaszoljanak az validálási kérelmekre, amelyek ismerik ezt a kihívástípust. Ez azt is lehetővé teszi, hogy az erre a kihívástípusra vonatkozó validálási kérelmek olyan SNI mezőt használjanak, amely megfelel az validálandó domain névnek, így biztonságosabbá válik.

Ez a kihívás nem alkalmas a legtöbb ember számára. A legmegfelelőbb a TLS felfüggesztést végző fordított proxyk szerzőinek, akik a HTTP-01-hez hasonlóan hoszt alapú validálást akarnak végezni, de ezt teljes egészében a TLS rétegen szeretnék elvégezni a problémák elkülönítése érdekében. Jelenleg ez főként a nagy tárhelyszolgáltatókat jelenti, de az olyan mainstream webszerverek, mint az Apache és az Nginx egy napon megvalósíthatják ezt (és a [Caddy már meg is valósította](https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860)).

Előnyök:

 - Ez akkor is működik, ha a 80-as port nem érhető el.
 - Ez tisztán a TLS rétegen is elvégezhető.

Hátrányok:

 - Az Apache, az Nginx és a Certbot nem támogatja, és valószínűleg nem is fogja egyhamar.
 - A HTTP-01-hez hasonlóan, ha Önnek több szervere van, mindegyiknek ugyanazzal a tartalommal kell válaszolnia.
 - Ez a módszer nem használható wildcard domainek validálására.
