---
title: Határértékek
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2023-06-09
show_lastmod: 1
---


A Let's Encrypt határértékeket állít be annak érdekében, hogy méltányos használatot biztosítson a lehető legtöbb ember számára. Úgy véljük, hogy ezek a határértékek elég magasak ahhoz, hogy a legtöbb ember számára megfeleljen. Valamint úgy terveztük őket, hogy a tanúsítvány megújítása szinte soha nem éri el a határértéket, és így a nagyobb szervezetek fokozatosan növelhetik a kiállítható tanúsítványok számát anélkül, hogy a Let's Encrypt beavatkozását kérnék.

Ha Ön aktívan fejleszt vagy tesztel egy Let's Encrypt klienst, kérjük, használja a [staging környezetünket](/docs/staging-environment) a production API helyett. Ha a Let's Encrypt integrálásán dolgozik szolgáltatóként vagy egy nagyobb méretű weboldallal, kérjük, [nézze át az integrációs útmutatót](/docs/integration-guide).

A fő határérték a <a id="certificates-per-registered-domain"></a>**bejegyzett domainenkénti tanúsítványok** száma (hetente maximum 50). A bejegyzett domain általában a domain azon része, amelyet Ön vásárolt meg a domain név regisztrátorától. Például az `www.example.com` címben, a bejegyzett domain az `example.com`. A `new.blog.example.co.uk` címben, a bejegyzett domain `example.co.uk`. A [Public Suffix List](https://publicsuffix.org) segítségével kalkuláljuk a bejegyzett domaineket. A regisztrált domainonkénti tanúsítványok határértékét túllépve a `too many certificates already issued` hibaüzenet jelzi, további részletekkel kiegészítve.

Ha sok subdomainnel rendelkezik, akkor érdemes egyetlen tanúsítványba összevonni őket, maximum 100 <a id="names-per-certificate"></a>**tanúsítványonkénti subdomain névig**. A fenti határértékkel együtt ez azt jelenti, hogy hetente legfeljebb 5000 egyedi subdomaint tartalmazó tanúsítványt állíthat ki. A több nevet tartalmazó tanúsítványt gyakran SAN tanúsítványnak nevezik, vagy néha UCC tanúsítványnak is hívják. Megjegyzés: Teljesítmény- és megbízhatósági okokból jobb, ha tanúsítványonként minél kevesebb subdomain nevet használ, amikor csak lehet.

A tanúsítvány megújítások más módon vannak kezelve: nem számítanak bele a **bejegyzett domainenkénti tanúsítványok** határértékébe, viszont a heti maximum 5 kiállított **duplikált tanúsítvány** korlátozása alá esnek. Megjegyzés: a megújítások 2019 márciusáig beleszámítottak a bejegyzett domainenkénti tanúsítványok határértékébe, [de többé már nem számítanak bele](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189). A duplikált tanúsítványok határértékének túllépését a `too many certificates already issued for exact set of domains` hibaüzenet jelzi.

Egy tanúsítvány akkor tekinthető egy korábbi tanúsítvány megújításának (vagy duplikátumának), ha pontosan ugyanazt a hostnév készletet tartalmazza, figyelmen kívül hagyva a nagybetűket és a hostnevek sorrendjét.  Ha például a [`www.example.com`, `example.com`] nevekre igényelt tanúsítványt, a hét további részében még négy tanúsítványt kérhet a [`www.example.com`, `example.com`] nevekre. Ha a [`blog.example.com`] hozzáadásával módosítaná a hostnév készletet, további tanúsítványokat kérhetne.

A megújítás kezelése figyelmen kívül hagyja a publikus kulcsot és a kért kiterjesztéseket. A tanúsítvány kiállítása akkor is megújításnak tekinthető, ha új kulcsot használ.

**A tanúsítványok visszavonása nem állítja vissza az eredeti határértékeket**, mivel a tanúsítványok kiállításához szükséges erőforrások már fel lettek használva.

A <a id="failed-validations"></a>**sikertelen validáció** fiókonként, hostnevenként és óránként maximum 5 lehet. Ez a határérték magasabb a [staging környezetünkön](/docs/staging-environment), így ezt a környezetet használhatja a kapcsolódási problémák elhárításához. A sikertelen validáció határértékének túllépése a `too many failed authorizations recently` hibaüzenettel jelenik meg.

Az API "new-nonce", "new-account", "new-order" és "revoke-cert" endpointjaira érkező <a
id="overall-requests"></a>**kérések összevont határértéke** 20 kérés másodpercenként. A "/directory" endpoint és a "/acme" mappának & almappáknak az összevont határértéke 40 kérés másodpercenként.

Van két másik határértékünk is, amibe nagy valószínűséggel nem fog beleütközni.

3 óránként legfeljebb 10 <a id="accounts-per-ip-address"></a>**fiókot hozhat létre IP címenként**. Egy IPv6 /48-on belül 3 óránként legfeljebb 500 **fiókot hozhat létre IP-tartományonként**. Mindkét határérték elérése nagyon ritka, és azt javasoljuk, hogy nagyobb üzemeltetők inkább olyan konstrukciót válasszanak, amely [egy fiókot használ sok ügyfél számára](/docs/integration-guide). Ezeknek a határértékeknek a túllépését a `too many registrations for this IP` vagy a `too many registrations for this IP range` hibaüzenettel jelzi a rendszer.

Legfeljebb 300 <a id="pending-authorizations"></a>**függőben lévő engedély** tartozhat a fiókjához. Ennek a limitnek az elérése ritka, és leggyakrabban az ACME kliensek fejlesztése során fordul elő. Ez általában azt jelenti, hogy a kliense jogosultságokat hoz létre, de nem teljesíti azokat. Kérjük, használja [staging környezetünket](/docs/staging-environment), ha ACME klienst fejleszt. A függőben lévő engedélyek határértékének túllépése a `too many currently pending authorizations` hibaüzenettel jelenik meg.

Fiókonként 3 óránként legfeljebb 300 <a
id="new-orders"></a>**új megbízást** hozhat létre. Minden alkalommal új megbízás jön létre, amikor tanúsítványt igényel a Boulder CA-tól, ami azt jelenti, hogy minden egyes tanúsítvány kérelemmel egy új megbízás jön létre. Az új megbízások határértékének túllépését a `too many new orders recently` hibaüzenet jelzi.

# <a id="overrides"></a>Felülírhatóság

Ha elért egy határértéket, nem áll módunkban, hogy ideiglenesen visszaállítsuk azt az eredeti értékre. Meg kell várnia, amíg a határérték érvényessége egy hét múlva lejár. Mozgó időszakot veszünk figyelembe, így ha hétfőn 25 tanúsítványt állított ki, pénteken pedig további 25 tanúsítványt, akkor hétfőtől újra kiállíthat. A regisztrált domainhez kiállított tanúsítványok listáját a [crt.sh-n való kereséssel](https://crt.sh) kaphatja meg, amely a nyilvános [Certificate Transparency](https://www.certificate-transparency.org) naplót használja.

Ha Ön egy nagy tárhelyszolgáltató vagy szervezet, amely Let's Encrypt integráción dolgozik, akkor van egy [határérték űrlapunk](https://isrg.formstack.com/forms/rate_limit_adjustment_request), amely kitöltésével magasabb határértékeket igényelhet. A kérelmek feldolgozása néhány hetet vesz igénybe, ezért az űrlap kitöltése arra nem alkalmas, ha gyorsan szeretné visszaállítani a határértéket, mint ahogy az magától visszaáll az eredeti értékre.

Ne feledje, hogy a legtöbb tárhelyszolgáltatónak nincs szüksége határérték növelésre, mivel nincs korlátozva a különböző regisztrált domainek száma, amelyekhez kiadhat tanúsítványt. So long as most of your customers don't have more than 2,000 subdomains on a registered domain, you most likely do not need an increase. További tanácsokért lásd [integrációs útmutatót](/docs/integration-guide).

# <a id="clearing-pending"></a>Függőben lévő engedélyek kezelése

Ha nagyszámú függőben lévő engedélyekkel rendelkezik, és a függőben lévő engedélyek számának túllépése miatt hiba jelenik meg, akkor az engedélyezések validációs kísérletét kiválthatja egy JWS által aláírt POST küldésével az egyik kihíváshoz, ahogyan az az [ACME specifikációban](https://tools.ietf.org/html/rfc8555#section-7.5.1) olvasható. A függőben lévő engedélyezések `https://acme-v02.api.letsencrypt.org/acme/authz/XYZ` URL formában jelennek meg, melyek a kliens logokban megtekinthetőek. Vegye figyelembe, hogy nem számít, hogy a validáció sikeres vagy sikertelen. Mindkettő kiveszi az engedélyt a függőben lévő állapotból. Ha nem rendelkezik a megfelelő engedélyezési URL-eket tartalmazó logokkal, akkor meg kell várnia, amíg a határértékek miatti korlátozás elévül. A fentiek szerint, mozgó időszakot veszünk figyelembe, ezért ez az Ön kibocsátási szokásaitól függően kevesebb mint egy hétig is eltarthat.

Vegye figyelembe, hogy a nagyszámú függőben lévő engedélyek oka általában egy hibás kliens. Ha gyakran éri el ezt a határértéket, akkor ellenőrizze kliens kódját.
