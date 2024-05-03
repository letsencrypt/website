---
title: Tanúsítványok localhosthoz
slug: certificates-for-localhost
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


Előfordul, hogy az emberek tanúsítványt szeretnének szerezni a "localhost" hostnévhez, akár helyi fejlesztéshez, akár olyan natív alkalmazással való terjesztéshez, amelynek kommunikálnia kell egy webes alkalmazással. A Let's Encrypt nem tud tanúsítványokat biztosítani a "localhost"-hoz, mivel senki sem rendelkezik vele egyértelműen, és nem egy olyan felső szintű domainben gyökerezik, mint a ".com" vagy a ".net". Lehetőség van saját domain név beállítására, amely történetesen a `127.0.0.0.1`-re oldódik fel, és a DNS-kihívás segítségével tanúsítványt kaphat hozzá. Ez azonban általában rossz ötlet, és vannak jobb lehetőségek is.

# Helyi fejlesztéshez

Ha webes alkalmazást fejleszt, hasznos, ha egy helyi webszerver, például az Apache vagy az Nginx fut, és böngészőben elérhetővé válik a `http://localhost:8000/` címen. A webböngészők azonban kissé eltérően viselkednek a HTTP és a HTTPS oldalakon. A fő különbség: Egy HTTPS-oldalon a HTTP URL-ről JavaScript betöltésére irányuló kérések blokkolva lesznek. Ha tehát helyben fejleszt HTTP-t használva, előfordulhat, hogy hozzáad egy olyan szkriptcímkét, amely azon a gépen amelyen Ön fejleszt jól működik, de a HTTPS üzemeltetési webhelyre való telepítéskor megszakad. Az ilyen jellegű problémák elhárításához hasznos a HTTPS beállítása a helyi webkiszolgálón. Nem akar azonban állandóan tanúsítvány figyelmeztetéseket látni. Hogyan kapja meg a zöld lakatot lokálisan?

A legjobb megoldás: Hozza létre a saját tanúsítványát, akár saját aláírással, akár egy helyi root által aláírtat, és bízza azt az operációs rendszer bizalmi tárolójára. Ezután használja ezt a tanúsítványt a helyi webszerverén. A részleteket lásd alább.

# Natív alkalmazásokhoz amelyek webes alkalmazásokkal kommunikálnak

Néha a fejlesztők olyan letölthető natív alkalmazást akarnak kínálni, amely a weboldal mellett használható, hogy extra funkciókat kínáljon. A Dropbox és a Spotify asztali alkalmazásai például az egész gépéről keresnek fájlokat, amit egy webes alkalmazás nem tehet meg. Az egyik gyakori megközelítés az, hogy ezek a natív alkalmazások egy webes szolgáltatást kínálnak a localhoston, és a webes alkalmazás XMLHTTPRequest (XHR) vagy WebSockets segítségével kéréseket intéz hozzá. A webes alkalmazás szinte mindig HTTPS-t használ, ami azt jelenti, hogy a böngészők megtiltják, hogy XHR vagy WebSockets kéréseket küldjön nem biztonságos URL címekre. Ezt nevezik vegyes tartalom blokkolásnak (Mixed Content Blocking). A webes alkalmazással való kommunikációhoz a natív alkalmazásnak biztonságos webes szolgáltatást kell nyújtania.

Szerencsére a modern böngészők [a ](https://bugs.chromium.org/p/chromium/issues/detail?id=607878)`http://127.0.0.1:8000/`címet ["potenciálisan megbízható"](https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy) URL-nek tekintik, mivel egy loopback címre utal. A `127.0.0.0.1` címre küldött forgalom garantáltan nem hagyja el a gépét, így automatikusan biztonságosnak tekinthető a hálózati lehallgatással szemben. Ez azt jelenti, hogy ha a webes alkalmazása HTTPS, és egy natív alkalmazás webes szolgáltatását a `127.0.0.0.1` címen kínálja, a kettő boldogan kommunikálhat XHR-en keresztül. Sajnos a [localhost még nem részesül ugyanebben a bánásmódban](https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02). A WebSocket-ek sem részesülnek ebben a bánásmódban egyik név esetében sem.

Kísértésbe eshet, hogy ezeket a korlátozásokat úgy kerülje meg, hogy beállít egy olyan tartománynevet a globális DNS-ben, amely a `127.0.0.1` címre oldódik fel (például `localhost.example.com`), szerez egy tanúsítványt ehhez a tartománynévhez, elküldi a tanúsítványt és a megfelelő privát kulcsot a natív alkalmazással, és megmondja a webes alkalmazásnak, hogy a `https://localhost.example.com:8000/` címen kommunikáljon a `http://127.0.0.1:8000/` helyett. *Ne tegye ezt.* Ezzel veszélybe sodorja a felhasználókat, és a tanúsítványát visszavonhatják.

Azzal, hogy IP-cím helyett egy domain nevet vezet be, lehetővé teszi a támadó számára, hogy közbeékelődéses támadást (Man in the Middle = MitM) kövessen el a DNS keresés közben, és olyan választ adjon, amely egy másik IP-címre mutat. A támadó ezután a helyi alkalmazásnak adhatja ki magát, és hamis válaszokat küldhet vissza a webes alkalmazásnak, ami a webes alkalmazás oldalán veszélyeztetheti a fiókját, attól függően, hogy hogyan tervezték meg.

A sikeres MitM ebben a helyzetben azért lehetséges, mert ahhoz, hogy működjön, a natív alkalmazással együtt kellett elküldeni a tanúsítványhoz tartozó privát kulcsot. Ez azt jelenti, hogy bárki, aki letölti a natív alkalmazását, megkapja a privát kulcs másolatát, beleértve a támadót is. Ez az Ön privát kulcsának kompromittálásának minősül, és a tanúsító hatóságának (CA) vissza kell vonnia a tanúsítványát, ha erről tudomást szerez. [Számos natív](https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ) alkalmazás [tanúsítványát](https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ) visszavonták a [magánkulcsuk továbbküldése miatt](https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ).

Sajnos ez a natív alkalmazásokat sok jó és biztonságos lehetőség nélkül hagyja az érintett weboldalukkal való kommunikációra. A helyzet a jövőben még bonyolultabbá válhat, ha a böngészők tovább [szigorítják a localhost elérését a webről](https://bugs.chromium.org/p/chromium/issues/detail?id=378566).

Vegye figyelembe azt is, hogy a kiváltságos natív API-kat kínáló webszolgáltatás exportálása természeténél fogva kockázatos, mivel olyan weboldalak is hozzáférhetnek ezekhez, amelyeket nem engedélyezett. Ha ezt az utat választja, mindenképpen olvasson utána a [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) témakörnek, használja az Access-Control-Allow-Origin funkciót, és mindenképpen használjon memóriabiztos HTTP parsert, mert még a hozzáférést nem engedélyező eredetűek is küldhetnek preflight kéréseket, amelyek kihasználhatják az parserban lévő hibákat.

# Saját tanúsítványok készítése és megbízhatósága

Bárki elkészítheti saját tanúsítványait tanúsító hatóság segítsége nélkül. Az egyetlen különbség az, hogy a saját maga által készített tanúsítványokban senki más nem fog megbízni. A helyi fejlesztések esetében ez rendben van.

A legegyszerűbben ezzel az openssl paranccsal generálhatunk privát kulcsot és saját aláírású tanúsítványt a localhost számára:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

Ezután konfigurálhatja a helyi webszervert a localhost.crt és a localhost.key fájlokkal, és telepítheti a localhost.crt fájlt a helyileg megbízható root-ok listájára.

Ha egy kicsit realisztikusabb fejlesztési tanúsítványokat szeretne, akkor a [minica](https://github.com/jsha/minica) segítségével létrehozhatja saját helyi gyökértanúsítványát, és kiállíthatja az általa aláírt végpont tanúsítványokat (más néven leaf tanúsítványokat). Ekkor inkább a gyökértanúsítványt importálja, mint egy önaláírt végpont tanúsítványt.

Választhat olyan domaint is, amelyben pontok vannak, például `www.localhost`, ha hozzáadja az /etc/hosts állományhoz a `127.0.0.0.1` aliasaként. Ez kissé megváltoztatja a böngészők cookie tárolási módját.
