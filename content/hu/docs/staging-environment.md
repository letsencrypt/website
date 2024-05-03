---
title: Staging környezet
slug: staging-environment
date: 2018-01-05
lastmod: 2021-05-13
show_lastmod: 1
---


Azt ajánljuk, hogy a staging környezetünket használja teszteléshez, mielőtt a production környezetünket használná. Ez lehetővé teszi, hogy a tanúsítványok kiállítása előtt minden a megfelelő módon legyen beállítva, és csökkenti annak az esélyét, hogy korlátozásokba ütközzön.

Az [ACME v2 staging környezetünk](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) ACME URL címe a következő:

`https://acme-staging-v02.api.letsencrypt.org/directory`

Amennyiben Certbotot használ, a staging környezetünket a `--dry-run` flaggel tudja használni. Más ACME kliensek esetében, kérjük, olvassa el utasításaikat a staging környezetünkben való teszteléssel kapcsolatban. Felhívjuk figyelmét, hogy a v2 staging környezethez v2 kompatibilis ACME kliensre van szükség.

# Korlátozások

A staging környezet esetében ugyanazok a korlátozások élnek, mint [a production környezet esetében](/docs/rate-limits), a következő kivételekkel:

* A **regisztrált domainenként kiállított tanúsítványok** száma maximum 30.000 lehet hetente.
* A **duplikált tanúsítványok** száma maximum 30.000 lehet hetente.
* A **sikertelen validációk** száma maximum 60 lehet óránként.
* Az **IP-címenkénti fiókok** száma maximum 50 fiók lehet 3 órás időszakonként és IP-címenként.
* Az ACME v2 esetében az **új megbízások** száma maximum 1500 új megbízás 3 órás időszakonként és fiókonként.

# A staging tanúsítvány hierarchiája

A staging környezet olyan tanúsítvány-hierarchiával rendelkezik, amely [a production környezetet imitálja](/certificates).

## Közbenső (Intermediate) tanúsítványok

A staging környezet két aktív intermediate (közbenső) tanúsítványt tartalmaz: egy RSA közbenső ["(STAGING) Artificial Apricot R3"](/certs/staging/letsencrypt-stg-int-r3.pem) és egy ECDSA közbenső ["(STAGING) Ersatz Edamame E1"](/certs/staging/letsencrypt-stg-int-e1.pem).

Az ECDSA-kibocsátás [engedélyezve lett Stagingben](https://community.letsencrypt.org/t/ecdsa-issuance-available-in-staging-march-24/147839) 2021. március 24-én, és az ECDSA-kulcsokat tartalmazó Staging tanúsítványok minden kérését a "(STAGING) Ersatz Edamame E1" írja alá, és az ECDSA-hierarchiát használja. Hasonlóképpen az RSA kulcsokkal rendelkező Staging tanúsítványok iránti összes kérelmet "(STAGING) Artificial Apricot R3" írja alá, és az RSA hierarchiát használja. Nincs mód arra, hogy egy ECDSA kulcshoz RSA aláírt tanúsítványt kapjon, és fordítva sem; csak azáltal van beleszólása, hogy melyik kibocsátót kapja, hogy milyen kulcsot generált lokálisan.

## Root (gyökér) tanúsítványok

A staging környezet két aktív root (gyökér) tanúsítványt tartalmaz, amelyek **nem szerepelnek** a böngésző/kliens trust store-jaiban: "(STAGING) Pretend Pear X1" és "(STAGING) Bogus Broccoli X2". Ha egy csak tesztelésre használt klienst úgy kíván módosítani, hogy tesztelések során megbízzon a staging környezetben, akkor ezt a ["(STAGING) Pretend Pear X1"](/certs/staging/letsencrypt-stg-root-x1.pem) és/vagy ["(STAGING) Bogus Broccoli X2"](/certs/staging/letsencrypt-stg-root-x2.pem) tanúsítvány teszteléshez tartozó trust store-okhoz való hozzáadásával teheti meg. Az összes staging tanúsítványunkat megtalálja [itt](https://github.com/letsencrypt/website/tree/master/static/certs/staging).  Fontos: Ne adja hozzá a staging root-ot vagy intermediate-et olyan trust store-hoz, amelyet hétköznapi böngészésre vagy más tevékenységekre használ, mivel ezeket nem auditálják, és nem tartják ugyanazokat a szabványokat, mint a production root-ok, így tesztelésen kívül másra nem használhatóak biztonságosan.

# Tanúsítvány átláthatóság

A staging környezet előzetes tanúsítványokat nyújt be a Let's Encrypt [Testflume](/docs/ct-logs) és a Google [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT tesztnaplókba, és a visszaküldött SCT-ket a kiadott tanúsítványokba foglalja.

# Continuous Integration / Development Testing

A staging környezet nagyvonalú limit beállításokkal rendelkezik, hogy lehetővé tegye a tesztelést, de nem alkalmas a fejlesztői környezetekkel vagy a continuous integration-el (CI) való együttműködésre. A külső szerverekhez intézett hálózati kérések instabilitást okozhatnak, és a staging környezet nem kínál lehetőséget a DNS "hamisítására" vagy a validáció sikerének megkérdőjelezésére, ami bonyolultabb tesztelési beállításokat tenne szükségessé.

A Let's Encrypt a staging környezeten kívül egy kis ACME szervert is kínál, amelyet kifejezetten CI és fejlesztői környezetekhez építettek [Pebble](https://github.com/letsencrypt/pebble) néven. A Pebble futtatása [gyors és egyszerű](https://github.com/letsencrypt/pebble#docker) egy fejlesztői vagy CI környezetben.
