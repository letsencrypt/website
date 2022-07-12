---
title: IPv6 támogatás
slug: ipv6-support
top_graphic: 1
date: 2020-02-07
lastmod: 2020-02-07
show_lastmod: 1
---


A Let's Encrypt támogatja az IPv6-ot mind az ACME API ACME klienssel történő eléréséhez, mind pedig a DNS-keresésekhez és a HTTP-kérésekhez, amelyeket a domainnevek feletti ellenőrzés validálásakor használunk.

## Domain validáció

Amikor domain validációs kéréseket intézünk egy olyan domainhez, amely IPv4 és IPv6 címekkel is rendelkezik (pl. `A` és `AAAA` rekordok), a Let's Encrypt mindig az IPv6 címeket részesíti előnyben a kezdeti kapcsolathoz. Ha az IPv6 kapcsolat hálózati szinten meghiúsul (pl. időkorlát túllépése miatt), és vannak elérhető IPv4 címek, akkor a kérést az egyik IPv4 címmel próbáljuk meg újra.

## Helytelen IPv6 címek

Gyakran előfordul, hogy a domain tulajdonosok nem tudnak a domainjükhöz tartozó `AAAA` rekordról. Ha az `AAAA` rekordban szereplő IPv6 cím helytelen, az befolyásolja a domain validálásának folyamatát.

Az IPv6 cím általában egy másik szerver, mint az IPv4 cím, ahol az ACME kliens fut. Mivel az ACME kliens csak az IPv4 szervert konfigurálja úgy, hogy válaszoljon a kihívásra, a domain validálás sikertelen lesz IPv6 használata esetén.

A legtöbb esetben a helyes megoldás az IPv6 cím frissítése, hogy az arra a szerverre mutasson, amelyen az ACME kliens fut, vagy az `AAAA` rekord eltávolítása, ha a domain nem IPv6-al való használatra készült. Nincs mód arra, hogy a Let's Encrypt az IPv4-et preferálja, ki kell javítani a hibás konfigurációt.

## IPv6-ról IPv4-re történő újrapróbálkozás részletei

Az IPv6-ról IPv4-re történő újrapróbálkozás csak a kapcsolat időkorlát túllépése esetén történik, más típusú hiba esetén nem.

Például a fent leírt "gyakori buktatók" ilyen esetében az újbóli próbálkozás nem történik meg, ha az IPv6 címen van egy webszerver, de az a webszerver nem áll készen arra, hogy válaszoljon az ACME-kihívásra. Ebben az esetben az IPv6 címhez való hozzáférésnél nem lesz kapcsolati időkorlát túllépés, és a kihívás újbóli próbálkozás nélkül sikertelen lesz, mivel helytelen válasz érkezett vissza.

A CA szoftverünk egyszerűségének megőrzése érdekében a "http-01" kihívások validálásánál csak az első kérésnél hajtunk végre IPv6-ról IPv4-re történő újbóli próbálkozást. Ha átirányításokat használ, az átirányítások nem kapnak újrapróbálkozási lehetőséget.

Ha például egy domainnévnek van egy `AAAA` rekordja, amely mindig leáll, és egy `A` rekordja egy webszerverrel, amely HTTP-ről HTTPS-re irányít át, akkor az IPv6-ról IPv4-re történő visszaállítás nem fog megfelelően működni. A domainhez érkező első kérés megfelelően visszaáll az IPv4-re, és átirányítást kap a HTTP-ről HTTPS-re. A következő kérés ismét az IPv6 címet fogja előnyben részesíteni, de az IPv4-re való visszalépés nélkül időtúllépés alá esik. Ezt a helyzetet vagy az IPv6 hibás konfigurációjának kijavításával, vagy az ACME HTTP-01 kihívási útvonalra irányuló kérések HTTP-ről HTTPS-re történő átirányításának eltávolításával lehet megoldani.

## Segítség

Ha segítségre van szüksége egy IPv6-tal kapcsolatos probléma felderítéséhez, kérjük, látogasson el a [közösségi fórumba](https://community.letsencrypt.org).
