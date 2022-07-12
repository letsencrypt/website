---
title: Certificate Authority Authorization (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
show_lastmod: 1
---

A CAA egy olyan típusú DNS-bejegyzés, amely lehetővé teszi a webhelytulajdonosok számára, hogy meghatározzák, mely tanúsító hatóságok (CA-k) állíthatnak ki a domainnevüket tartalmazó tanúsítványokat. Ezt 2013-ban szabványosította az [RFC 6844](https://tools.ietf.org/html/rfc6844), hogy a tanúsító hatóságok "csökkentsék a nem szándékos tanúsítványkiadás kockázatát". Alapesetben minden nyilvános tanúsító hatóság jogosult tanúsítványt kiállítani a nyilvános DNS-ben szereplő bármely tartománynévre, feltéve, hogy igazolja az adott tartománynév felett való rendelkezését. Ez azt jelenti, hogy ha a sok nyilvános tanúsító hatóság validálási folyamatának bármelyikében hiba van, az potenciálisan minden domainnevet érinthet. A CAA lehetőséget biztosít a domain tulajdonosok számára, hogy csökkentsék ezt a kockázatot.

# CAA alkalmazása

Ha nem érdekel a CAA, nem szükséges semmit tenned (de vedd szemügyre a CAA hibákat alább). Ha a CAA használatával szeretné korlátozni, hogy mely tanúsító hatóságok állíthatnak ki tanúsítványokat a domainjéhez, akkor olyan DNS-szolgáltatót kell használnia, amely támogatja a CAA rekordok beállítását. Az ilyen szolgáltatók listáját a [SSLMate CAA oldalán](https://sslmate.com/caa/support) találja. Ha a szolgáltatója szerepel a listán, akkor a [SSLMate CAA Record Generator](https://sslmate.com/caa/) segítségével létrehozhat CAA rekordokat, amely felsorolja azokat a tanúsító hatóságokat, amelyeket engedélyezni szeretne.

A Let's Encrypt azonosító domain neve a CAA számára a `letsencrypt.org`. Ez hivatalosan dokumentálva van [a tanúsítási gyakorlatról szóló nyilatkozatunkban (CPS), a 4.2.1. szakaszban](/repository).

## Hová helyezze el a rekordot

CAA rekordokat beállíthat a fő domainjén, vagy bármilyen mélységű subdomainen. Például, ha van egy `www.community.example.com` domain neve, akkor beállíthat CAA rekordokat a teljes névre, vagy a `community.example.com` névre, vagy az `example.com` névre. A tanúsító hatóságok balról jobbra haladva ellenőrzik az egyes verziókat, és megállnak, amint CAA rekordot találnak. Így például a `community.example.com` néven lévő CAA rekord elsőbbséget élvez a `example.com` néven lévőnél. A legtöbben, akik CAA rekordokat adnak hozzá a regisztrált domainjükhöz (`example.com`), szeretnék ha az az összes subdomainjükre is vonatkozna. Vegye figyelembe azt is, hogy az subdomainek CAA rekordjai elsőbbséget élveznek a szülő domainekkel szemben, függetlenül attól, hogy azok megengedőbbek vagy korlátozóbbak. Tehát egy subdomain lazíthatja a szülődomain által bevezetett korlátozást.

A CAA validáció az összes többi DNS kérelemhez hasonlóan a CNAME-eket követi. Ha `www.community.example.com` egy CNAME a `web1.example.net`-hoz, akkor a tanúsító hatóság először CAA rekordokat kér a `www.community.example.com`-hoz, majd látva, hogy a CAA rekordok helyett CNAME van a domain névhez, CAA rekordokat kér a `web1.example.net` címhez. Vegye figyelembe, hogy ha egy domainnév rendelkezik CNAME rekorddal, akkor a DNS-szabványok szerint nem lehet más rekordja.

A [CAA RFC](https://tools.ietf.org/html/rfc6844) egy további viselkedést, a "fa-mászást" írja elő, amely megköveteli a tanúsító hatóságtól, hogy a CNAME-feloldás eredményének szülő domainjeit is ellenőrizzék. Ezt a további viselkedést később [egy erratum](https://www.rfc-editor.org/errata/eid5065) eltávolította, így a Let's Encrypt és más tanúsító hatóságok nem alkalmazzák.

# CAA hibák

Mivel a Let's Encrypt minden tanúsítvány kiállítása előtt ellenőrzi a CAA rekordokat, néha még olyan domainek esetében is hibákat kapunk, amelyek nem állítottak be CAA rekordokat. Ha hibát kapunk, nem tudjuk megmondani, hogy az érintett domainre kiállíthatunk-e, mivel lehetnek olyan CAA rekordok, amelyek tiltják a kiadást, de a hiba miatt nem láthatóak.

Ha CAA-val kapcsolatos hibákat kap, próbálkozzon még néhányszor a [staging környezetünkön](/docs/staging-environment), hogy kiderüljön, átmeneti vagy állandó hibáról van-e szó. Ha állandóak, akkor hibajegyet kell benyújtania a DNS szolgáltatójának, vagy szolgáltatót kell váltania. Ha nem tudja biztosan, ki a DNS szolgáltatója, kérdezze meg a tárhelyszolgáltatóját.

Néhány DNS szolgáltató, amely nem ismeri a CAA-t, kezdetben a "Nem támogatunk CAA rekordokat" választ adja a problémás jelentésekre. A DNS szolgáltatónak nem kell kifejezetten támogatnia a CAA rekordokat; csak NOERROR választ kell adnia az ismeretlen lekérdezéstípusokra (beleértve a CAA-t is). Más opkódok, köztük a NOTIMP visszaküldése nem ismert qtípusok esetén sérti az [RFC 1035](https://tools.ietf.org/html/rfc1035) szabványt, és javításra szorul.

# SERVFAIL

Az egyik leggyakoribb hiba, amellyel az emberek találkoznak, a SERVFAIL. Ez leggyakrabban a DNSSEC validáció sikertelenségét jelzi. Ha SERVFAIL hibát kap, első lépésként használjon egy DNSSEC hibakereső programot, mint például a [dnsviz.net](http://dnsviz.net/). Ha ez nem működik, lehetséges, hogy a névszerverek csak akkor generálnak hibás aláírásokat, ha a válasz üres. A CAA válaszok pedig leggyakrabban üresek.  Például a PowerDNS [a 4.0.3 és az alatti verziókban](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha) rendelkezett ezzel a hibával.

Ha nincs engedélyezve a DNSSEC, és SERVFAIL-t kap, a második legvalószínűbb ok az, hogy a hiteles névszerver NOTIMP-et küldött vissza, ami a fent leírtak szerint az RFC 1035 megsértése; ehelyett NOERROR-t kellene küldenie egy üres válasszal. Ha ez a helyzet, adjon fel hibajegyet a DNS-szolgáltatójának.

Végül, a SERVFAIL-eket okozhatják a névszerverek leállásai. Ellenőrizze a névszerverei NS rekordjait, és győződjön meg arról, hogy minden szerver elérhető.

# Időkorlát túllépés

Néha a CAA lekérdezések túllépik az időkorlátot. Ez azt jelenti, hogy a hatályos névszerver egyáltalán nem válaszol, még többszöri próbálkozás után sem. Ez leggyakrabban akkor fordul elő, ha a névszerver előtt egy rosszul konfigurált tűzfal áll, amely elutasítja azokat a DNS lekérdezéseket amelyek ismeretlen qtype-al rendelkeznek. Adjon fel egy support ticket-et a DNS-szolgáltatójának, és kérdezze meg, hogy van-e ilyen tűzfal konfigurálva.
