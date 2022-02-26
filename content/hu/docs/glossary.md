---
title: Fogalomtár
slug: glossary
top_graphic: 1
date: 2018-12-30
show_lastmod: 1
---


<!--
Note for translators:
 
- Usage of the "def" macro (in other languages than English):
{% def 
    id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`" 
    name="The term to define (optional if english or abbr is provided)"
    abbr="an accronym (optional)"
    english="the english term (optional - if present the abbr is in english too)" %}}
        the definition
{% /def %}
    
- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} [Tanúsítványbővítmény](#def-extension), amely arra szolgál, hogy a [user agentek](#def-user-agent) számára jelezze, hogyan szerezzenek információt a [tanúsítvány](#def-certificate)kiállítójáról. Általában az [OCSP](#def-OCSP) URI-t és a [kibocsátó URI-t](#def-CAI) adja meg. {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} A [Let's Encrypt](#def-LE) által alkalmazott protokoll. Az ezzel a protokollal kompatibilis szoftverek használhatják a Let's Encrypttel való kommunikációra, hogy [tanúsítványt](#def-leaf) kérjenek. [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Egy olyan program, amely képes kommunikálni egy ACME szerverrel, hogy [tanúsítványt](#def-leaf) kérjen. {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} Egy ACME-kompatibilis szerver, amely képes [tanúsítványokat](#def-leaf) generálni. A Let's Encrypt szoftvere, a [Boulder](#def-boulder) ACME-kompatibilis, [némi eltéréssel](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Az ACME-t alkalmazó szoftver, amelyet a [Let's Encrypt](#def-LE) fejlesztett ki és használ. [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} A hitelesítésszolgáltatókra vonatkozó technikai és eljárásmódbeli követelmények. Mivel minden fontosabb [root-program](#def-root-program) tartalmazza az alapkövetelményeket (Baseline Requirements), a tanúsító hatóságoknak követniük kell ezeket a követelményeket ahhoz, hogy a legtöbb böngésző megbízzon bennük. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} Egy DNS rekord, amely meghatározza, hogy mely [CA-k](#def-CA) jogosultak tanúsítványt kiállítani a megfelelő domain névhez. A CAA rekordokat a tanúsító hatóságok ellenőrzik, nem a böngészők. A [Let's Encrypt](#def-LE) [tiszteletben tartja a CAA rekordokat](/docs/caa) [az alapkövetelményeknek (Baseline Requirement) megfelelően](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} Egy DNS bejegyzés, amely egy domainnevet képez le egy másik domainnévre, amelyet kanonikus névnek nevezünk. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} Egy szervezet, amely [tanúsítványokat](#def-leaf) állít ki. A [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, és DigiCert mind tanúsító hatóságok (Certificate Authorities). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Az [AIA](#def-AIA) mező azon része, amely a [tanúsítvány](#def-leaf) kiállítójára vonatkozó információkat tartalmazza. Hasznos lehet, ha a [webszerver](#def-web-server) nem biztosít megbízható [tanúsítványláncot](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certificate" %}} Egy [meghatározott formátumú](#def-X509) fájl, amely tartalmaz egy nyilvános kulcsot és egyéb adatokat, amelyek leírják, hogy mikor kell használni a nyilvános kulcsot. A leggyakoribb tanúsítványtípus a [végfelhasználói tanúsítvány](#def-leaf). Vannak [köztes](#def-intermediate) és [gyökér](#def-root) tanúsítványok is. {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} A tanúsítványokban a legtöbb mezőt kiterjesztések határozzák meg. Például a [Subject Alternative Names](#def-SAN) és az [AIA](#def-AIA) kiterjesztések. A kiterjesztési mechanizmus lehetővé teszi olyan új mezők létrehozását, amelyek nem voltak részei az eredeti [X.509](#def-X509) szabványnak. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} A tanúsító hatóságok, az internetes böngészőszoftverek, az operációs rendszerek és más PKI-kompatibilis alkalmazások szállítóinak önkéntes csoportja. A CA/Browser Forum közzéteszi a [alapkövetelményeket (Baseline Requirements)](#def-BRs). [A Let's Encrypt](#def-LE) a CA/Browser Forum tagja. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} Olyan [köztes tanúsítványok](#def-intermediate) listája, amelyek segítenek egy [user agentnek](#def-user-agent) meghatározni, hogy megbízhat-e egy végfelhasználói vagy [leaf tanúsítvány](#def-leaf) megbízhatóságában, azáltal, hogy összekapcsolja azt a [tanúsítvány tárjában](#def-store) lévő [gyökértanúsítvánnyal](#def-root). Megjegyzés: a lánc nem mindig egyedi, és ha egy weboldal egy tanúsítványláncot mutat be, amely egy gyökérhez vezet, a user agent dönthet úgy, hogy egy másik láncot használ a tanúsítvány validálásához. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Szabályrendszer, amely jelzi egy tanúsítvány alkalmazhatóságát egy adott közösségre és/vagy a közös biztonsági követelményeket támasztó alkalmazások osztályára. A kibocsátás konkrét részleteit a [CPS](#def-CPS) tartalmazza. [ISRG Certificate Policy](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} A tanúsító hatóság által a tanúsítványok kiállítása, kezelése, visszavonása, megújítása vagy újrakulcsozása során alkalmazott gyakorlatok ismertetése. [ISRG Certification Practice Statement](/repository#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} A tanúsítvány tartalmazhat [kiterjesztéseket](#def-extension), amelyek "kritikusnak" vannak jelölve. Ez azt jelenti, hogy a szoftvereknek el kell utasítaniuk a tanúsítványt, kivéve, ha a szoftver érti, hogyan kell feldolgozni az adott kiterjesztést. Ez lehetővé teszi a biztonság szempontjából fontos új kiterjesztések bevezetését anélkül, hogy a régebbi szoftvereket veszélyeztetné. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} Módszer a [user agentek](#def-user-agent) tájékoztatására egy [tanúsítvány](#def-leaf) [visszavonásának](#def-revocation) állapotáról. Ez egy adott hitelesítésszolgáltatótól származó, az adott hitelesítésszolgáltató által aláírt összes visszavont tanúsítvány sorszámainak listája. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} Aláírt fájl, amely tartalmazza a [CA](#def-CA) által a tanúsítvány létrehozásához szükséges információkat. A [Let's Encrypt](#def-LE) esetében a [Common Name](#def-CN), [Subject Alternative Names](#def-SAN) és a Subject Public Key Info lényeges információk. Általában a [kliens alkalmazások](#def-ACME-client) automatikusan generálják a CSR-t a felhasználó számára, bár a webtárhely-szolgáltató vagy az eszköz is generálhat CSR-t. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} A tanúsítványtár a megbízható [gyökerek](#def-root) listáját tartalmazza. Az operációs rendszerek (mint a Windows, az Android vagy a Debian) és a [webböngészők](#def-web-browser) (például a Firefox) fenntartanak egy tanúsítványtárat. A tanúsítványtár nélküli böngészők az operációs rendszer tanúsítványtárára támaszkodnak. A [Let's Encrypt](#def-LE) által biztosított [tanúsítványokban](#def-leaf) a legtöbb [tanúsítványtár megbízik](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} A tanúsítvány "Subject" mezője jelzi, hogy miről szól a tanúsítvány. Ez általában olyan mezőket tartalmaz, mint [Common Name](#def-CN), Country és Organization. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} A biztonság növelése érdekében a tanúsítványokat (vagy [előtanúsítványokat](#def-precertificate)) közzé kell tenni a tanúsítványok átláthatósági naplóiban: https://www.certificate-transparency.org/. A [Let's Encrypt](#def-LE) létrehozza és közzéteszi az [előtanúsítványokat](#def-precertificate), és a későbbi [tanúsítvány](#def-leaf) tartalmazza az előtanúsítványhoz tartozó [SCT-k](#def-SCT) listáját. Néhány [böngésző](#def-web-browser), például a Google Chrome, megköveteli ennek az ellenőrizhető ígéretnek a jelenlétét a tanúsítvány érvényesítéséhez. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} A [tanúsítványok átláthatóságának (Certificate Transparency)](#def-CT) egy olyan összetevője, amely elfogadja a tanúsítványok és [előzetes tanúsítványok benyújtását](#def-precertificate), és beépíti azokat egy állandó, ellenőrizhető, nyilvánosan hozzáférhető listába. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} A tanúsítvány [Subject](#def-subject) része, amely leírja, hogy miről szól a tanúsítvány. A [gyökér](#def-root) és [közbenső](#def-intermediate) tanúsítványok esetében ez a [tanúsító hatóság](#def-CA) ember által olvasható neve. A [végfelhasználói tanúsítványok](#def-leaf) esetében ez a tanúsítványban szereplő domain nevek egyike. Megjegyzés: A "Common Name" legfeljebb 63 karakter lehet. Ez egy elavult módszer annak a domain névnek a megjelölésére, amelyre a tanúsítvány vonatkozik, mivel a jelenlegi internetes szabványok elvárják, hogy a szoftverek csak a [Subject Alternative Names](#def-SAN) paramétert ellenőrizzék a tanúsítvány alkalmazhatóságának megállapításához. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Egy kiállítandó tanúsítványt több [gyökér](#def-root) is aláírhat. Például a [Let's Encrypt](#def-LE) [közbensők](#def-intermediate) keresztaláírása a [IdenTrust](#def-IdenTrust) által történik, mivel a Let's Encrypt gyökerében az induláskor még nem bíztak meg a [tanúsítványtárak](#def-store). Technikailag ez két kiállító tanúsítványt jelent, amelyek ugyanazt a [Subject](#def-subject) és ugyanazt a [Key-pair](#def-key-pair) paramétereket használják, az egyiket egy Let's Encrypt root, a másikat pedig egy IdenTrust root privát kulcsa írja alá: [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} DNS-t használó mechanizmus a bemutatott [tanúsítvány](#def-leaf) vagy titkosítási kulcs hitelességének ellenőrzésére.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} A DNS válaszok kriptográfiai hitelesítésére szolgáló mechanizmus. A DNSSEC-nek a TLD-k, a domainnév-tulajdonosok és a rekurzív resolverek általi telepítésre van szüksége ahhoz, hogy érvénybe lépjen. Elterjedtsége jelenleg elég alacsony. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} Egy [tanúsítvány](#def-leaf), ahol a kérelmező csak a domainnév feletti ellenőrzését bizonyította (és nem a kérelmező szervezet személyazonosságát). [Let's Encrypt](#def-LE) kizárólag DV tanúsítványokat kínál ([OV](#def-OV) vagy [EV](#def-EV) tanúsítványokat nem): [GYIK](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} A digitális aláírási algoritmus (DSA) egy változata, amely elliptikus görbén alapuló kriptográfiát használ.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). A [Let's Encrypt](#def-LE) támogatja az ECDSA-t a [végfelhasználói tanúsítványok esetében](#def-leaf), de a [teljes lánc esetében még nem](#def-chain): [/upcoming-features](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Az [EdDSA](#def-EdDSA) egy speciális típusa, az Ed448-al együtt. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}  Egy modern, elliptikus görbéken alapuló nyilvános kulcsú aláírási rendszer, amely az elliptikus görbéken alapuló kriptográfiával kapcsolatos számos gyakori [megvalósítási probléma](https://ed25519.cr.yp.to/) megoldására szolgál. Az olyan hitelesítésszolgáltatók, mint a [Let's Encrypt](#def-LE), még nem tudnak EdDSA tanúsítványokat biztosítani. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Az elliptikus görbéken alapuló nyilvános kulcsú kriptográfia egy típusa. Az ECC a nem EC-kriptográfiához képest kisebb kulcsokat használ, ugyanakkor azonos biztonságot nyújt. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} A tanúsítvány validálásának olyan típusa, amelynél a [CA](#def-CA) ellenőrizte a weboldalt irányító jogi személyt. Az adott entitással kapcsolatos információkat tartalmaznak. A [CA](#def-CA) tanúsítványok ellenőrzése szigorúbb, mint az [OV](#def-OV) tanúsítványoké. [A Let's Encrypt](#def-LE) nem kínál EV tanúsítványokat. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} A weboldal teljes domainneve. Például a `www.example.com` egy *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} Egy [tanúsító hatóság](#def-CA). Az IdenTrust rendelkezik [keresztaláírt](#def-cross-signing) [Let's Encrypt](#def-LE) [köztes tanúsítványokkal](#def-intermediate): [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Egy [gyökér](#def-root) vagy egy másik köztes fél által aláírt tanúsítvány, amely képes más tanúsítványok aláírására. Ezeket a végfelhasználói tanúsítványok aláírására használják, miközben a gyökértanúsítvány magánkulcsa offline állapotban marad. A köztes tanúsítványok szerepelnek a [tanúsítványláncokban](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Lásd [nemzetközivé tett tartománynév](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Domainnév a `a`-tól `z`-ig, `0`-tól `9`-ig és a kötőjelen (`-`) kívüli karakterekkel. Tartalmazhatnak például arab, kínai, cirill, tamil, héber vagy latin ábécé alapú karaktereket diakritikus vagy ligatúrákkal. Az IDN domainek kódolt megjelenítése `xn--`-el kezdődnek. Az IDN-eket a [Let's Encrypt](#def-LE) támogatja: https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} A [Let's Encrypt](#def-LE) mögött álló szervezet: [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} A tanúsítvány "kibocsátó" mezője azt írja le, hogy melyik tanúsítvány írta alá a tanúsítványt. Például egy Let's Encrypt végfelhasználói tanúsítvány kibocsátó mezője a következő lehet: "Kibocsátó: C = US, O = Let's Encrypt, CN = Let's Encrypt hatóság X3". Általában olyan mezőket tartalmaz, mint [Common Name](#def-CN), Country és Organization. A kibocsátó mező minden esetben megegyezik bizonyos tanúsítványok [Subject](#def-subject) mezőjével. A [önaláírt](#def-self-signed) tanúsítványok esetében, mint például a [gyökerek](#def-root), a kibocsátó megegyezik a Subject-el. A "kibocsátó" kifejezés használható olyan tanúsítványra is, amely más tanúsítványokat ad ki ([köztes](#def-intermediate) vagy gyökér), vagy olyan szervezetre, amely tanúsítványokat ad ki.{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} A magánkulcs és a nyilvános kulcs kombinációja, amelyet aláírásra vagy titkosításra használnak. A nyilvános kulcsot általában egy tanúsítványba ágyazzák, míg a magánkulcsot önállóan tárolják, és titokban kell tartani. A kulcspár az alkalmazástól függően használható titkosításra és visszafejtésre, adatok aláírására és ellenőrzésére, vagy másodlagos kulcsok egyeztetésére. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Leggyakrabban egy [közvetítő](#def-intermediate) által aláírt tanúsítvány, amely egy adott domain készletre érvényes, és nem képes más tanúsítványok aláírására. Ez az a tanúsítványtípus, amelyet a [ACME kliensek](#def-ACME-client) igényelnek, és amelyet a [web szerverek](#def-web-server) használnak. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} A [ISRG](#def-ISRG) által működtetett [tanúsító hatóság](#def-CA). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Amikor egy HTTPS weboldal HTTP-n keresztül tölt be alforrásokat (Javascript, CSS vagy képek). [A böngészők](#def-web-browser) blokkolhatják a vegyes tartalmakat, vagy kevésbé biztonságosnak jelölhetik az oldalt, ha vegyes tartalom van jelen: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. A vegyes tartalmak problémájának megoldásához a webfejlesztőnek meg kell változtatnia az oldalait, hogy minden erőforrás HTTPS URL-címet használjon. A böngészőkbe épített [fejlesztői eszközök](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) segítségével kideríthető, hogy mely erőforrások okoznak vegyes tartalom problémákat. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} Egy módszer a [tanúsítvány](#def-leaf) [visszavonási](#def-revocation) státuszának ellenőrzésére. Más szóval, egy mód annak ellenőrzésére, hogy a [tanúsító hatóság](#def-CA) jelzi-e, hogy a tanúsítványt már nem kell érvényesnek tekinteni, annak ellenére, hogy a lejárati ideje még nem járt le. Ez a kérés adatvédelmi problémákat okozhat, mivel lehetővé teszi a tanúsító hatóság és az internetszolgáltatók számára, hogy közvetlenül megfigyeljék, hogy ki milyen webhelyeket látogat. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Egy [tanúsítvány](#def-leaf) kiterjesztés, amely tájékoztatja a [böngészőt](#def-web-browser) arról, hogy a [webszervernek](#def-web-server) az adott tanúsítvánnyal [OCSP tűzést](#def-OCSP-stapling) kell használnia. Arra szolgál, hogy megkövetelje, hogy a [tanúsítvány](#def-leaf) naprakész [visszavonás](#def-revocation) státuszát a webkiszolgáló minden kapcsolatnál megerősítse, így a visszavonás megbízhatóbbá válik. A [Let's Encrypt](#def-LE) kérésre az OCSP Must-Staple [bővítéssel](#def-extension) ellátott tanúsítványokat is kiállíthat. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Mód arra, hogy egy [webszerver](#def-web-server) egy [böngésző](#def-web-browser) számára egy [OCSP](#def-OCSP) választ küldjön, amelyet a [tanúsító hatóság](#def-CA) írt alá, így a böngészőnek magának nem kell másodlagos OCSP kérést intéznie a tanúsító hatósághoz, javítva ezzel a sebességet és az adatvédelmet. Más néven TLS Certificate Status Request kiterjesztés. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} Az OID-k a Nemzetközi Távközlési Unió (ITU) és az ISO/IEC által szabványosított egyedi numerikus azonosítók. Az OID-ket tanúsítványokon belül kiterjesztések, mezők vagy eljárásrend meghatározására használják. Az internetes szabványok, a [Certificate Policy](#def-CP) és [Certification Practice Statement](#def-CPS) dokumentumok határozzák meg az OID használatát. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Tanúsítványok, amelyek esetében a [CA](#def-CA) ellenőrizte az [Subscriber](#def-subscriber) jogi személyét. Az adott entitással kapcsolatos információkat tartalmaznak. [A Let's Encrypt](#def-LE) nem kínál OV tanúsítványokat. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}} A kriptográfiai információk formátuma (eredetileg a biztonságos e-mailre vonatkozó Privacy Enhanced Mail internetes szabványok részeként került meghatározásra). A PEM dokumentum olyan információkat reprezentál, mint például egy magánkulcs, egy nyilvános kulcs vagy egy digitális tanúsítvány. Ezek a fájlok a következőképpen kezdődnek: "-\-\-\-\--BEGIN ", majd egy adattípus. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} Egy fájl, amely tartalmazhat egy [végfelhasználói tanúsítványt](#def-leaf), annak [láncát](#def-chain) a gyökérig és a végfelhasználói tanúsítvány magánkulcsát. Lásd még: https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Az előzetes tanúsítványok a [tanúsítványok átláthatóságának](#def-CT) részét képezik. Az előzetes tanúsítvány annak a [tanúsítványnak](#def-leaf) a másolata, amelyet a hitelesítésszolgáltató ki akar állítani, egy [kritikus](#def-critical) méregkiterjesztéssel kiegészítve, amely megakadályozza, hogy az előzetes tanúsítványt a hálózaton lévő szoftverek elfogadják. A tanúsító hatóság az [SCT-kért](#def-SCT) cserébe előtanúsítványt nyújt be a [CT-naplókhoz](#def-CT-log). Mivel az előzetes tanúsítvány nem azonos a hozzá tartozó tanúsítvánnyal, a Certificate Transparency naplók végül mindkettőt tartalmazhatják. [RFC 6962 Section 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Olyan biztonsági mechanizmus, amely arra kéri a böngészőt, hogy egy webhely [tanúsítványlánca](#def-chain) a jövőbeni betöltések során bizonyos nyilvános kulcsokat használjon. A Chrome bevezette ezt a mechanizmust a hitelesítésszolgáltatói kompromittálódások elleni védelem érdekében, de ez webhelykieséseket okozott, ami arra késztette a Chrome-ot, hogy [elavulttá minősítse és eltávolítsa](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8) ezt a mechanizmust. [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} A Mozilla által karbantartott *Public Suffixes* lista, amely jelzi, hogy mely internetes domainek állnak rendelkezésre több különálló szervezet számára aldomainek regisztrálására. A lista például azt mutatja, hogy a `com` és a `co.uk` is Public Suffix, annak ellenére, hogy a `co.uk` nem TLD. A webböngészők többek között arra használják a listát, hogy megakadályozzák, hogy a valószínűleg különböző szervezetek által üzemeltetett webhelyek megosszák egymással a webes sütiket. [A Let's Encrypt](#def-LE) a listát a határérték számításokhoz is használja: [/rate-limits](/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} Az a személy, aki a tanúsítványban szereplő információkra támaszkodik. Például, aki egy HTTPS weboldalt látogat meg, az egy Relying Party. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} A tanúsítvány a lejárati dátumáig érvényes, kivéve, ha a [CA](#def-CA) visszavontnak nyilvánítja. A tanúsítványt különböző okokból, például a magánkulcs kompromittálódása miatt visszavonhatják. A böngészők a [CRL](#def-CRL), [OCSP](#def-OCSP), vagy az újabb módszerek, mint a [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) és [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets) segítségével ellenőrizhetik, hogy egy tanúsítványt visszavontak-e már. Vegye figyelembe, hogy sok helyzetben a [visszavonás nem működik](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} Egy [önaláírt](#def-self-signed) tanúsítvány, amelyet egy [tanúsító hatóság](#def-CA) ellenőriz, és amelyet [köztes](#def-intermediate) tanúsítványainak aláírására használnak, és amely szerepel a [tanúsítványtárakban](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Az az eljárásrend, amely alapján egy szervezet eldönti, hogy mely tanúsítványok kerüljenek a [tanúsítványtárába](#def-store), és amelyek alapján meghatározza, hogy mely tanúsító hatóságokban bízik meg a szoftvere. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Titkosításra és tanúsítványok digitális aláírására használt nyilvános kulcsú algoritmus. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Saját magánkulccsal aláírt tanúsítvány, amelynek [Subject](#def-subject) mezője megegyezik az [Issuer](#def-issuer) mezőjével. Az önaláírt tanúsítványok csak a fizikai világban kötött előzetes megállapodások, például a [megbízható gyökerek listáján](#def-store) való szereplés miatt megbízhatóak. [A gyökértanúsítványok](#def-root) önaláírtak. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Egy mező, amelyet egy [user agent](#def-user-agent) küld egy [szervernek](#def-web-server) a [TLS](#def-TLS) kézfogás során, megadva a domain nevet, amelyhez csatlakozni kíván. Ez lehetővé teszi a szerver számára, hogy a megfelelő [tanúsítvánnyal](#def-leaf) válaszoljon, ha ugyanazon IP cím mögött több domain is található. A webszerver más tanúsítványt küldhet, és más tartalmat jeleníthet meg, attól függően, hogy az ügyfél milyen nevet igényelt az SNI által. Az SNI nem titkosított, de egy kísérleti helyettesítője, az ESNI igen. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Egy aláírt, ellenőrizhető ígéret egy tanúsítvány közzétételére egy [Tanúsítvány átláthatósági naplóból](#def-CT-log). A [CT](#def-CT)-t érvényesítő böngészők ellenőrzik az SCT-k jelenlétét egy webhely tanúsítványában vagy a [TLS](#def-TLS) kézfogásban, és megtagadják a csatlakozást olyan webhelyekhez, amelyek nem felelnek meg a naplózási követelményeknek. Ez növeli annak valószínűségét, hogy a hamis vagy pontatlan tanúsítványok felderítésre kerülnek. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} A [TLS](#def-TLS) régebbi, még mindig használatos neve. {{% /def %}}

{{% def id="staging" name="Staging" %}} A [Let's Encrypt](#def-LE) egy staging API-t biztosít a tanúsítványkérelmek teszteléséhez a határértékek befolyásolása nélkül. Az staging környezet által generált tanúsítványok *nem* nyilvánosan megbízhatóak. A staging környezet tesztelésre, hibakeresésre és az ACME kliens fejlesztésére használható. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} A [tanúsítvány](#def-leaf) egy mezője, amely jelzi, hogy a tanúsítvány mely domain(ek)re érvényes. Ez helyettesíti a [Common Name](#def-CN) használatát, amely most már csak kompatibilitási okokból van megadva. Egyetlen tanúsítvány több SAN-t is tartalmazhat, és több különböző domain névre is érvényes lehet. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} A tanúsítványt igénylő személy vagy szervezet. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} A hierarchikus tartománynévrendszer legmagasabb szintje, mint például az országkódos felső szintű domainek (ccTLD-k), mint `.de` (Németország), `.cn` (Kína) és az általános felső szintű domainek (gTLD-k), mint `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} A HTTPS által a weboldal látogatások titkosítására és hitelesítésére használt protokoll. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} A [DANE](#def-DANE) azon része, amely kifejezetten a [TLS](#def-TLS) kapcsolatok validálására vonatkozik. {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Egy tanúsítvány leírása, amely több [Subject Alternative Names (SAN)](#def-SAN)-t tartalmaz. {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} Egy [user agent](#def-user-agent), amelyet weboldalak megjelenítésére használnak. Példák: *Mozilla Firefox*, *Google Chrome* vagy *Internet Explorer*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Szoftver, amely képes kommunikálni egy [webszerverrel](#def-web-server). Például: [webböngésző](#def-web-browser) vagy [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} A weboldalakat kiszolgáló szoftver (vagy tágabb értelemben a hardveres szerver, amely a weboldalakat kiszolgálja). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Egy szint mélységű aldomainekre érvényes tanúsítványok. Például egy [SAN](#def-SAN)-t tartalmazó tanúsítvány a `*.example.example.com` címre érvényes a `blog.example.com` és a `www.example.com` címre, de **nem** a `bork.bork.example.com` vagy a `example.com` címre. A wildcard-ot egy csillag (*) jelzi az aldomain helyett. [Let's Encrypt](#def-LE) [ 2018 márciusától biztosít Wildcard tanúsítványokat](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} A nyilvános kulcsú tanúsítványok formátumát meghatározó szabvány. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css" />
<script src="/js/glossary.js" async></script>

