---
title: Integrációs útmutató
linkTitle: Kliens és szolgáltató integrációs útmutató
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2020-12-8
show_lastmod: 1
---


Ez a dokumentum hasznos tanácsokat tartalmaz, ha Ön egy Let's Encryptet integráló tárhelyszolgáltató vagy nagy weboldal, vagy ha Ön írja a Let's Encrypt kliensszoftverét.

# Változtatási terv

Mind a Let's Encrypt, mind a Web PKI idővel tovább fog fejlődni.  Meg kell győződnie arról, hogy könnyen frissítheti a Let's Encryptet használó összes szolgáltatást. Ha olyan klienseket is telepít, amelyek Let's Encrypt tanúsítványokra támaszkodnak, különösen ügyeljen arra, hogy ezek a kliensek rendszeres frissítéseket kapjanak.

A jövőben ezek a dolgok valószínűleg megváltoznak:

  * a gyökér- és közbenső tanúsítványok, amelyeket a tanúsítvány kiadáshoz használunk
  * a tanúsítványok aláírásakor használt hash algoritmusok
  * a kulcsok és kulcserősség-ellenőrzések típusai, amelyekhez hajlandóak vagyunk aláírni a végfelhasználói tanúsítványokat
  * és az ACME protokoll

Az ilyen változtatásokról mindig igyekszünk a lehető legtöbb előzetes értesítést adni, bár ha valamelyik komponensben komoly biztonsági hibát találunk, előfordulhat, hogy nagyon rövid időn belül vagy azonnal változtatásokat kell végrehajtanunk. Különösen a közbenső változások esetén nem szabad hard kódolnia a használni kívánt közbensőt, hanem az ACME protokoll [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) fejlécét kell használni, mivel a közbensők valószínűleg változnak.

Hasonlóképpen, valószínűleg a szolgáltatási feltételek (ToS) URL címét is meg fogjuk változtatni, amint frissítjük azt. Kerülje a ToS URL hard kódolását, és helyette a [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3) fejlécre támaszkodva határozza meg, hogy melyik ToS URL-t használja.

Jó, ha a TLS konfigurációját is naprakészen tartja, ha új támadások jelennek meg a titkosító csomagok vagy a protokoll verziók ellen.

# Frissítések beszerzése

Ha a fent leírtakhoz hasonló fontos változásokról kisebb frissítéseket szeretne kapni, iratkozzon fel az [API közlemények](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836) csoportra. Ez mind a kliensfejlesztők, mind a tárhelyszolgáltatók számára hasznos.

A karbantartásokról és üzemszünetekről szóló nagyobb volumenű frissítésekért látogasson el a [státusz oldalunkra](https://letsencrypt.status.io/), és nyomja meg a jobb felső sarokban a Feliratkozás gombot. Ez leginkább a tárhelyszolgáltatók számára hasznos.

Győződjön meg arról is, hogy érvényes e-mail címet használ az ACME-fiókjához. Ezt az e-mailt arra fogjuk használni, hogy értesítést küldjünk Önnek a lejáratról, és értesítsük Önt a fiókjával kapcsolatos bármilyen problémáról.

# Ki az előfizető

A [CPS és az Előfizetői megállapodás](/repository) alapján az Előfizető az, aki a tanúsítvány privát kulcsát birtokolja. A tárhelyszolgáltatók esetében ez a szolgáltató, nem pedig a szolgáltató ügyfele. Ha Ön olyan szoftvert ír, amelyet az emberek maguk telepítenek, akkor az az, aki a szoftvert telepíti.

A fiókok létrehozásakor (azaz a regisztrációkor) megadott kapcsolattartó e-mail címét az Előfizetőnek kell megadni. Erre a címre küldünk e-mailt, hogy figyelmeztessük a lejáró tanúsítványokra, és értesítsük a [Adatvédelmi irányelvek](/privacy) módosításairól.  Ha Ön tárhelyszolgáltató, akkor ezeknek az értesítéseknek inkább Önhöz kell érkezniük, nem pedig az ügyfélnek. Lehetőleg állítson be egy levelezőlistát vagy aliast, hogy több személy is reagálhasson az értesítésekre, arra az esetre, ha Ön szabadságon lenne.

Ennek az az eredménye, hogy ha Ön tárhelyszolgáltató, nem kell elküldenie nekünk ügyfelei e-mail címét, és nem kell rávennie őket, hogy elfogadják az előfizetői megállapodásunkat. Egyszerűen kiállíthat tanúsítványokat az Ön rendelkezése alatt álló domainekhez, és elkezdheti használni őket.

# Egy fiók vagy több?

Az ACME-ben lehetőség van egy fiók létrehozására, amelyet az összes engedélyezéshez és kiadáshoz használhat, vagy létrehozhat fiókot ügyfelenként. Ez a rugalmasság értékes lehet. Egyes tárhelyszolgáltatók például ügyfélenként egy fiókot kívánnak használni, és a fiókkulcsokat különböző kontextusokban tárolják, így egy fiókkulcs kompromittálása nem teszi lehetővé az összes ügyfél számára a kiadást.

A legtöbb nagyobb tárhelyszolgáltató esetében azonban azt javasoljuk, hogy egyetlen fiókot használjon, és őrizze meg jól a fiókkulcsot. Ez megkönnyíti az azonos szervezethez tartozó tanúsítványok azonosítását, megkönnyíti az elérhetőségi adatok naprakészen tartását, és szükség esetén megkönnyíti a limitek beállítását. Ha sok különböző fiókot használnak, nem tudjuk hatékonyan beállítani a limiteket.

# Multi-domain (SAN) tanúsítványok

[Kibocsátási szabályzatunk](/docs/rate-limits) legfeljebb 100 nevet engedélyez tanúsítványonként. Öntől függ, hogy minden hosztnévhez külön tanúsítványt használ-e, vagy több hosztnevet csoportosít egy kis számú tanúsítványhoz.

Az hosztnevenként különálló tanúsítványok használata azt jelenti, hogy kevesebb mozgó részre van szükség a domainek logikai hozzáadásához és eltávolításához, ahogyan azokat rendelkezésre bocsátják és visszavonják. A különálló tanúsítványok minimalizálják a tanúsítványok méretét is, ami felgyorsíthatja a HTTPS kézfogásokat az alacsony sávszélességű hálózatokon.

Másfelől a sok hosztnevet tartalmazó nagy tanúsítványok használata lehetővé teszi, hogy összességében kevesebb tanúsítványt kezeljen. Ha olyan régebbi klienseket kell támogatnia, mint a Windows XP, amelyek nem támogatják a TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)) szolgáltatást, akkor minden tanúsítványhoz egyedi IP-címre lesz szüksége, így több név feltüntetése minden tanúsítványhoz csökkenti a szükséges IP-címek számát.

A legtöbb telepítés esetében mindkét lehetőség ugyanazt a biztonságot nyújtja.

# Tanúsítványok és kulcsok tárolása és újrafelhasználása

A Let's Encrypt értékének nagy része abban rejlik, hogy lehetővé teszi az automatikus kibocsátást egy új weboldal létrehozásának részeként.  Ha azonban olyan infrastruktúrával rendelkezik, amely ismételten új frontendeket hozhat létre ugyanahhoz a weboldalhoz, ezeknek a frontendeknek először meg kell próbálniuk a tartós tárolóból származó tanúsítványt és magánkulcsot használniuk, és csak akkor kell újat kibocsátaniuk, ha nem áll rendelkezésre tanúsítvány, vagy az összes meglévő tanúsítvány lejárt.

A Let's Encrypt számára; ez segít minket, hogy minél több ember számára nyújtsunk hatékony szolgáltatásokat. Az Ön számára; ez biztosítja, hogy a Let's Encrypt állapotától függetlenül bármikor telepíteni tudja weboldalát.

Például sok weboldal kezdi használni a Dockert, hogy szükség szerint új frontend példányokat biztosítson. Ha úgy állítja be a Docker konténereket, hogy indításkor bocsássanak ki tanúsítványt, és nem tárolja tartósan a tanúsítványokat és a kulcsokat, akkor valószínű, hogy határértéket fog túllépni, ha túl sok példányt hoz létre egyszerre. A legrosszabb esetben, ha egyszerre kell megsemmisítenie és újra létrehoznia az összes példányát, akkor olyan helyzetbe kerülhet, hogy egyik példánya sem tud tanúsítványt szerezni, és a weboldala több napig nem működik, amíg a határérték túllépés le nem jár. Ez a fajta probléma azonban nem csak a határértékekre vonatkozik. Ha a Let's Encrypt valamilyen okból nem érhető el, amikor frontend példányokat kellene kitegyen, akkor ugyanez a probléma áll fenn.

Vegye figyelembe, hogy egyes telepítési filozófiák szerint a kriptokulcsok soha nem hagyhatják el azt a fizikai gépet, amelyen létrehozták őket. Ez a modell jól működhet a Let's Encrypttel, amennyiben gondoskodik arról, hogy a gépek és adataik hosszú élettartamúak legyenek, és gondosan kezeli a határértékeket.

# Kihívástípus kiválasztása

Ha a http-01 ACME kihívást használja, akkor a kihívás válaszát minden egyes frontendjének biztosítania kell, mielőtt értesítené a Let's Encryptet, hogy készen áll a kihívás teljesítésére. Ha sok frontenddel rendelkezik, ez kihívást jelenthet. Ebben az esetben a dns-01 kihívás használata valószínűleg egyszerűbb lesz. Természetesen, ha sok földrajzilag elosztott DNS válaszadója van, meg kell győződnie arról, hogy a TXT rekord minden válaszadón elérhető.

Továbbá, ha a dns-01 kihívást használja, győződjön meg róla, hogy kitörölte a régi TXT rekordokat, hogy a Let's Encrypt lekérdezésére adott válasz ne legyen túl nagy.

Ha mindenképpen használni szeretné a http-01 kihívást, akkor érdemes kihasználni a HTTP átirányítás előnyeit. Beállíthatja, hogy minden frontendje átirányítsa a /.well-known/acme-validation/XYZ fájlt a validation-server.example.com/XYZ címre minden XYZ esetében. Ez a kiadási felelősséget a validációs szerverre delegálja, ezért ezt a szervert alaposan kell védenie.

# Központi validációs szerverek

A fenti két ponthoz kapcsolódóan, ha sok frontenddel rendelkezik, érdemes lehet a szerverek egy kisebb részhalmazát használni a kiadás kezelésére. Ez megkönnyíti az átirányítások használatát a http-01 validáláshoz, és helyet biztosít a tanúsítványok és kulcsok tartós tárolására.

# OCSP Stapling implementálása

Sok böngésző lekérdezi az OCSP-t a Let's Encrypt-től, amikor betöltik az Ön weboldalát. Ez egy [teljesítmény és adatvédelmi probléma](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/).  Ideális esetben a weboldalához való kapcsolódások nem várhatnak a Let's Encrypthez való másodlagos kapcsolódásra. Az OCSP kérelmek azt is elárulják a Let's Encryptnek, hogy mely oldalakat látogatják az emberek. Egy jó adatvédelmi politikával rendelkezünk, és nem rögzítünk személyazonosító adatokat az OCSP kérésekből, inkább nem is kapjuk meg az adatokat. Ezen túlmenően, az OCSP kiszolgálásával kapcsolatos sávszélességi költségek minden alkalommal, amikor egy böngésző először látogat el egy Let's Encrypt oldalra, várhatóan az infrastrukturális költségeink nagy részét teszik majd ki.

Az OCSP Stapling bekapcsolásával javíthatja weboldala teljesítményét, jobb adatvédelmet biztosíthat a felhasználók számára, és segíthet a Let's Encryptnek, hogy minél több embert szolgáljon ki hatékonyan.

# Tűzfal konfiguráció

A Let's Encrypt használatához engedélyeznie kell a 443-as port kimenő forgalmát az ACME klienst futtató gépekről. Az ACME szolgáltatásunk IP tartományait nem tesszük közzé, és azok előzetes értesítés nélkül változhatnak.

A "http-01" ACME kihívás esetén engedélyeznie kell a 80-as port bejövő forgalmát. Nem tesszük közzé azokat az IP tartományokat, amelyekből a validálást végezzük, és ezek előzetes értesítés nélkül változhatnak.

Megjegyzés: Javasoljuk, hogy mindig engedélyezze a webszerverhez való egyszerű HTTP hozzáférést, HTTPS-re történő átirányítással. Ez jobb felhasználói élményt nyújt, mint egy olyan webszerver, amely elutasítja a 80-as portú kapcsolatokat, és ugyanolyan szintű biztonságot nyújt.

Minden kihívás esetén engedélyeznie kell az 53-as porton bejövő forgalmat (TCP és UDP) a hiteles DNS kiszolgálói felé.

# Támogatott kulcs algoritmusok

A Let's Encrypt 2048, 3072 vagy 4096 bit hosszúságú RSA kulcsokat és P-256 vagy P-384 ECDSA kulcsokat fogad el. Ez mind a fiók kulcsokra, mind a tanúsítvány kulcsokra igaz. A fiók kulcsot nem használhatja újra tanúsítvány kulcsként.

Javasoljuk a kettős tanúsítvány konfigurációt, amely alapértelmezés szerint egy RSA tanúsítványt kínál, és egy (sokkal kisebb) ECDSA tanúsítványt azoknak az ügyfeleknek, amelyek jelzik, hogy támogatják.

# HTTPS alapértelmezett

A tárhelyszolgáltatóknak azt javasoljuk, hogy automatikusan állítsanak ki tanúsítványokat és konfigurálják a HTTPS-t az összes általuk ellenőrzött hosztnévhez, és a felhasználó által konfigurálható beállítással adják meg, hogy a HTTP URL-címeket átirányítsák-e a HTTPS megfelelőjükre. Javasoljuk, hogy a meglévő fiókok esetében a beállítás alapértelmezetten tiltva legyen, de az új fiókok esetében a beállítás alapértelmezetten engedélyezve legyen.

Indoklás: A meglévő weboldalak valószínűleg tartalmaznak néhány HTTP alforrást (szkripteket, CSS-t és képeket). Ha ezeket a webhelyeket automatikusan átirányítják a HTTPS verziójukra, a böngészők a vegyes tartalom blokkolása (Mixed Content Blocking) miatt blokkolni fogják az alforrások egy részét. Ez megszakíthatja a weboldal működését. Azonban valaki, aki új webhelyet hoz létre, és úgy találja, hogy az átirányít HTTPS-re, valószínűleg csak HTTPS alforrásokat fog felvenni, mert ha megpróbál HTTP alforrást felvenni, azonnal észreveszi, hogy az nem működik.

Javasoljuk, hogy az ügyfelek beállíthassanak egy HTTP Strict-Transport-Security (HSTS) fejlécet, amelynek alapértelmezett maximális élettartama hatvan nap. Ezt a beállítást azonban figyelmeztetésnek kell kísérnie, hogy ha az ügyfélnek olyan tárhelyszolgáltatóhoz kell átmennie, amely nem kínál HTTPS-t, a böngészőkben a gyorsítótárazott HSTS-beállítás elérhetetlenné teszi a weboldalát. Az ügyfélnek és a tárhelyszolgáltatónak is tisztában kell lennie azzal, hogy a HSTS fejléc a tanúsítvány hibákat súlyos meghibásodássá változtatja. Például, míg az emberek általában át tudnak kattintani egy néveltérésre vagy lejárt tanúsítványra vonatkozó figyelmeztetésen, a böngészők nem engedélyezik az ilyen kattintást az aktív HSTS fejléccel rendelkező hosztnevek esetében.

# Mikor kell megújítani

Javasoljuk, hogy a tanúsítványokat automatikusan újítsa meg, amikor a teljes élettartamuk kétharmada lejár. A Let's Encrypt jelenlegi 90 napos tanúsítványai esetében ez azt jelenti, hogy 30 nappal a lejárat előtt meg kell újítani.

Ha több mint 10 000 hosztnévre ad ki tanúsítványt, akkor azt is javasoljuk, hogy a megújításokat ne nagy tételekben, hanem kis sorozatban, automatizáltan újítsa meg. Ez csökkenti a kockázatot: Ha a Let's Encryptnél a megújítás idején kiesik a szolgáltatás, vagy a megújítási rendszerekben átmeneti hiba lép fel, az nem az összes tanúsítványt, hanem csak néhányat érint. Ez megkönnyíti a kapacitástervezést is.

Előfordulhat, hogy a gyors induláshoz az összes domainhez tömegesen szeretne tanúsítványokat kiállítani, ami rendben is van. Ezután szétoszthatja a megújítási időket úgy, hogy egyszeri alkalommal megújít néhány tanúsítványt 1 nappal a szokásos megújítási időpont előtt, néhányat 2 nappal előtte, és így tovább.

Ha olyan kliensszoftvert kínál, amely automatikusan beállít egy időszakos kötegelt feladatot, kérjük, ügyeljen arra, hogy a nap folyamán véletlenszerűen kiválasztott másodpercben fusson, és ne mindig egy adott időpontban. Ez biztosítja, hogy a Let's Encrypt nem szembesül önkényes forgalmi csúccsal az adott óra vagy a perc kezdetén. Mivel a Let's Encryptnek kapacitást kell biztosítania a csúcsterheléshez, a forgalmi csúcsok csökkentése segíthet a költségeink alacsonyan tartásában.

# Hibákból adódó újrapróbálkozások

A megújítás sikertelenségét nem szabad súlyos hibaként kezelni. Kíméletes újrakezdési logikát kell implementálnia a kibocsátó szolgáltatásaiban, exponenciális visszalépési mintát használva, amely tanúsítványonként naponta legfeljebb egyszer fordulhat elő. Egy ésszerű visszalépési ütemterv például a következő lenne: első újrapróbálkozás 1 perc elteltével, második újrapróbálkozás tíz perc elteltével, harmadik újrapróbálkozás 100 perc elteltével, negyedik és további újrapróbálkozások egy nap elteltével. Természetesen az adminisztrátoroknak lehetőséget kell biztosítani arra, hogy domainenként vagy globálisan kérhessenek korai újrapróbálkozást.

Újbóli próbálkozáskor történő visszalépés azt jelenti, hogy a kibocsátó szoftvernek nyomon kell követnie a sikertelenségeket és a sikereket is, és az újbóli kibocsátási kísérlet előtt ellenőriznie kell, hogy volt-e nemrégiben sikertelen próbálkozás. Nincs értelme óránként több százszor megkísérelni a kibocsátást, mivel az ismétlődő hibák valószínűleg tartósak lesznek.

Minden hibát el kell küldeni a felelős adminisztrátornak, hogy lássa, szükség van-e bizonyos problémák javítására.
