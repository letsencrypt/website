---
title: DST Root CA X3 lejárat (2021. szeptember)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-05-07
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


2021. szeptember 30-án egy kisebb változás lesz abban, hogy a régebbi böngészők és eszközök hogyan bíznak a Let's Encrypt tanúsítványokban. Ha egy átlagos weboldalt üzemeltet, nem fog különbséget észrevenni - a látogatók túlnyomó többsége továbbra is elfogadja a Let's Encrypt tanúsítványt. Ha API-t biztosít vagy IoT-eszközöket kell támogatnia, akkor lehet, hogy egy kicsit több odafigyelést igényel a változás.

A Let's Encrypt rendelkezik egy [ISRG Root X1][] nevű "[gyökértanúsítvánnyal][]". A modern böngészők és eszközök megbíznak az Ön weboldalára telepített Let's Encrypt tanúsítványban, mivel az ISRG Root X1 szerepel a gyökértanúsítványok listáján. Annak érdekében, hogy az általunk kiállított tanúsítványok megbízhatóak legyenek a régebbi eszközökön, egy "keresztaláírással" is rendelkezünk, mely egy korábbi gyökértanúsítványból származik: DST Root CA X3.

Amikor elkezdtük, ez a régebbi gyökértanúsítvány (DST Root CA X3) segített nekünk abban, hogy elinduljunk, és szinte minden eszköz azonnal megbízhatónak ítéljen minket. Az újabb gyökértanúsítvány (ISRG Root X1) ma már széles körben megbízható - de néhány régebbi eszköz soha nem fog megbízni benne, mert nem kap szoftverfrissítéseket (például egy iPhone 4 vagy egy HTC Dream). [Kattintson ide, hogy megtekintse a listát arról, mely platformok bíznak az ISRG Root X1-ben][compatibility].

A DST Root CA X3 2021. szeptember 30-án lejár. Ez azt jelenti, hogy azok a régebbi eszközök, amelyek nem bíznak az ISRG Root X1-ben, tanúsítványra vonatkozó figyelmeztetéseket kapnak, amikor Let's Encrypt tanúsítványokat használó weboldalakat látogatnak meg. Egy fontos kivétellel: a régebbi Android-eszközök, amelyek nem bíznak az ISRG Root X1-ben, továbbra is működni fognak a Let's Encrypt-tel, [a DST Root CA X3][cross-sign] speciális keresztaláírásának köszönhetően, amely a root lejárta után is érvényes. Ez a kivétel csak Androidra vonatkozik.

Mit kell tennie? A legtöbb ember számára egyáltalán semmit! A tanúsítványok kiállítását úgy állítottuk be, hogy weboldala a legtöbb esetben helyesen járjon el, és a széleskörű kompatibilitást részesítse előnyben. Ha API-t biztosít vagy IoT-eszközöket kell támogatnia, két dologra kell ügyelnie: (1) az API minden ügyfelének meg kell bíznia az ISRG Root X1-ben (nem csak a DST Root CA X3-ban), és (2) ha az API kliensei OpenSSL-t használnak, [akkor az 1.1.0 vagy annál újabb verziót kell használniuk][openssl]. Az OpenSSL 1.0.x-ben a tanúsítványok ellenőrzésének egy furcsasága miatt még az ISRG Root X1-ben megbízó ügyfelek is kudarcot vallanak, amikor az általunk alapértelmezés szerint ajánlott Android-kompatibilis tanúsítványláncot kapják.

Ha további információt szeretne kapni a folyamatban lévő termelési láncváltozásokról, [akkor kövesse ezt a témát a közösségi oldalunkon][production].

Ha bármilyen kérdése van a közelgő lejárattal kapcsolatban, [kérjük írjon erre a témára a fórumunkon.][forum]

[gyökértanúsítvánnyal]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
