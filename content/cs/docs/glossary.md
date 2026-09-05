---
title: Slovník pojmů
slug: glossary
lastmod: 2026-07-04
show_lastmod: 1
description: "Slovník pojmů souvisejících s certifikáty SSL/TLS, protokolem HTTPS a zabezpečením webu, které používá Let's Encrypt."
---


<!--
Note for translators:

- Usage of the "def" macro (in other languages than English):
{% def
    id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`"
    name="The term to define (optional if english or abbr is provided)"
    abbr="an acronym (optional)"
    english="the english term (optional - if present the abbr is in english too)" %}}
        the definition
{% /def %}

- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" name="Přístup k informacím o autoritě" abbr="AIA" %}} [Rozšíření](#def-extension) certifikátu, které [uživatelským agentům](#def-user-agent) sděluje, jak získat informace o vydavateli [certifikátu](#def-certificate). Obvykle uvádí [URI vydavatele](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatizované prostředí pro správu certifikátů" abbr="ACME" abbr_first="1" %}} Protokol implementovaný [Let's Encrypt](#def-LE). Software kompatibilní s tímto protokolem může jeho prostřednictvím komunikovat s Let's Encrypt a požádat o [certifikát](#def-leaf). [RFC protokolu ACME](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="Klient ACME" %}} Program, který dokáže komunikovat se serverem ACME a požádat o [certifikát](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="Server ACME" %}} Server kompatibilní s protokolem ACME, který může generovat [certifikáty](#def-leaf). Software od Let's Encrypt, [Boulder](#def-boulder), je kompatibilní s protokolem ACME, [až na několik odchylek](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Software implementující protokol ACME, který vyvíjí a používá [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Základní požadavky" abbr="BRs" %}} Soubor technických a zásadových požadavků na certifikační autority. Protože všechny hlavní [kořenové programy](#def-root-program) zahrnují Základní požadavky, musí je certifikační autority dodržovat, aby jim většina prohlížečů důvěřovala. {{% /def %}}

{{% def id="CAA" name="Autorizace certifikační autority" abbr="CAA" abbr_first="1" %}} Záznam DNS, který určuje, které [certifikační autority](#def-CA) smějí vydávat certifikáty pro příslušný název domény. Záznamy CAA kontrolují certifikační autority, nikoli prohlížeče. [Let's Encrypt](#def-LE) [respektuje záznamy CAA](/docs/caa), jak vyžadují [Základní požadavky](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Záznam kanonického názvu" abbr="CNAME" %}} Záznam DNS, který mapuje jeden název domény na jiný, označovaný jako kanonický název. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certifikační autorita" abbr="CA" %}} Organizace, která vydává [certifikáty](#def-leaf). [Let's Encrypt](#def-LE) je certifikační autorita. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="Vydavatelé certifikační autority" %}} Část pole [AIA](#def-AIA) obsahující informace o vydavateli [certifikátu](#def-leaf). Může být užitečná, pokud [webový server](#def-web-server) neposkytl důvěryhodný [řetězec certifikátů](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certifikát" %}} Soubor v [určitém formátu](#def-X509), který obsahuje veřejný klíč a další údaje popisující, kdy se má tento veřejný klíč použít. Nejběžnějším druhem certifikátu je [koncový certifikát](#def-leaf). Existují také [zprostředkující](#def-intermediate) a [kořenové](#def-root) certifikáty. {{% /def %}}

{{% def id="extension" name="Rozšíření certifikátu" %}} Většina polí certifikátu je definována pomocí rozšíření. Rozšířeními jsou například [alternativní názvy subjektu](#def-SAN) a [AIA](#def-AIA). Mechanismus rozšíření umožňuje vytvářet nová pole, která nebyla součástí původního standardu [X.509](#def-X509). {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Dobrovolné sdružení certifikačních autorit, dodavatelů internetových prohlížečů, operačních systémů a dalších aplikací využívajících PKI. CA/Browser Forum vydává [Základní požadavky](#def-BRs). [Let's Encrypt](#def-LE) je členem CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Řetězec certifikátů" %}} Seznam [zprostředkujících certifikátů](#def-intermediate), který [uživatelskému agentovi](#def-user-agent) pomáhá určit, že může důvěřovat certifikátu koncové entity neboli [koncovému certifikátu](#def-leaf), protože jej propojuje s [kořenovým certifikátem](#def-root) v jeho [úložišti certifikátů](#def-store). Poznámka: řetězec není vždy jedinečný. Když web předloží řetězec certifikátů vedoucí k jednomu kořenu, může uživatelský agent k ověření certifikátu zvolit jiný řetězec. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Zásady certifikátů" abbr="CP" %}} Pojmenovaný soubor pravidel, který určuje použitelnost certifikátu pro určitou komunitu nebo třídu aplikací se společnými bezpečnostními požadavky. Konkrétní podrobnosti vydávání popisuje dokument [CPS](#def-CPS). Dokumenty CP a CPS lze sloučit do jednoho dokumentu. [Kombinovaný dokument CP/CPS organizace ISRG](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Prohlášení o postupech certifikační autority" abbr="CPS" %}} Prohlášení o postupech, které certifikační autorita používá při vydávání, správě, odvolávání a obnovování certifikátů nebo změně jejich klíčů. CPS musí být v souladu s příslušnými [Zásadami certifikátů](#def-CP). Dokumenty CP a CPS lze sloučit do jednoho dokumentu. [Kombinovaný dokument CP/CPS organizace ISRG](/repository#isrg-certificate-policy) - [RFC 3647, oddíl 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) - [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Kritické rozšíření" %}} Certifikát může obsahovat [rozšíření](#def-extension) označená jako „kritická“. To znamená, že software musí certifikát odmítnout, pokud nedokáže dané rozšíření zpracovat. Díky tomu lze zavádět nová rozšíření důležitá pro zabezpečení, aniž by vznikala rizika pro starší software. {{% /def %}}

{{% def id="CRL" name="Seznam odvolaných certifikátů" abbr="CRL" %}} Metoda, která [uživatelské agenty](#def-user-agent) informuje o stavu [odvolání](#def-revocation) [certifikátu](#def-leaf). Jde o seznam sériových čísel všech certifikátů odvolaných danou certifikační autoritou, který tato autorita podepsala. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Žádost o podepsání certifikátu" abbr="CSR" %}} Podepsaný soubor obsahující informace, které [certifikační autorita](#def-CA) potřebuje k vygenerování certifikátu. Pro [Let's Encrypt](#def-LE) jsou podstatné údaje [Common Name](#def-CN), [alternativní názvy subjektu](#def-SAN) a informace o veřejném klíči subjektu. [Klientské aplikace](#def-ACME-client) obvykle generují CSR pro uživatele automaticky, ale CSR může vygenerovat také poskytovatel webhostingu nebo zařízení. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Úložiště certifikátů" %}} Úložiště certifikátů obsahuje seznam důvěryhodných [kořenů](#def-root). Úložiště certifikátů spravují operační systémy (například Windows, Android nebo Debian) a [webové prohlížeče](#def-web-browser) (například Firefox). Prohlížeče bez vlastního úložiště používají úložiště certifikátů operačního systému. [Certifikátům](#def-leaf) vydaným [Let's Encrypt](#def-LE) [důvěřuje většina úložišť certifikátů](/certificates). {{% /def %}}

{{% def id="subject" name="Subjekt certifikátu" %}} Pole „Subject“ certifikátu označuje, čeho se certifikát týká. Obvykle obsahuje pole jako [Common Name](#def-CN), země a organizace. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} Kvůli zvýšení bezpečnosti musí být certifikáty (nebo [předběžné certifikáty](#def-precertificate)) zveřejňovány v protokolech Certificate Transparency: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) generuje a zveřejňuje [předběžné certifikáty](#def-precertificate) a do následného [certifikátu](#def-leaf) zahrnuje seznam [SCT](#def-SCT) pro předběžný certifikát. Některé [prohlížeče](#def-web-browser), například Google Chrome, přítomnost tohoto ověřitelného příslibu vyžadují, aby mohly certifikát ověřit. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Protokol Certificate Transparency" %}} Součást systému [Certificate Transparency](#def-CT), která přijímá certifikáty a [předběžné certifikáty](#def-precertificate) a zařazuje je do trvalého, ověřitelného a veřejně přístupného seznamu. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Část [subjektu](#def-subject) certifikátu, která popisuje, čeho se certifikát týká. U [kořenových](#def-root) a [zprostředkujících](#def-intermediate) certifikátů jde o název [certifikační autority](#def-CA) srozumitelný pro člověka. U [koncových certifikátů](#def-leaf) jde o jeden z názvů domén uvedených v certifikátu. Poznámka: Common Name může mít nejvýše 63 znaků. Jde o zastaralý způsob uvedení názvu domény, pro kterou certifikát platí. Současné internetové standardy totiž očekávají, že software bude při určování platnosti certifikátu kontrolovat pouze [alternativní názvy subjektu](#def-SAN). {{% /def %}}

{{% def id="cross-signing" name="Křížové podepisování" %}} Vydávající certifikát může být podepsán více než jedním [kořenovým certifikátem](#def-root), případně od různých certifikačních autorit. Když jedna certifikační autorita podepíše certifikát jiné certifikační autority, označuje se to jako křížové podepisování. {{% /def %}}

{{% def id="DANE" name="Ověřování pojmenovaných entit pomocí DNS" abbr="DANE" %}} Mechanismus využívající DNS k určení způsobu ověření pravosti předloženého [certifikátu](#def-leaf) nebo šifrovacího klíče.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Bezpečnostní rozšíření systému doménových jmen" abbr="DNSSEC" %}} Mechanismus pro kryptografické ověřování odpovědí DNS. Aby DNSSEC fungovalo, musí je nasadit provozovatelé TLD, vlastníci názvů domén i rekurzivní resolvery. V současnosti je jeho rozšíření poměrně nízké. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Certifikát s ověřením domény" %}} [Certifikát](#def-leaf), u kterého žadatel prokázal pouze kontrolu nad názvem domény, nikoli totožnost žádající organizace. [Let's Encrypt](#def-LE) nabízí pouze certifikáty DV (nikoli [OV](#def-OV) nebo [EV](#def-EV)): [Časté dotazy](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Algoritmus digitálního podpisu s eliptickými křivkami" abbr="ECDSA" abbr_first="1" %}} Podpisový algoritmus využívající [kryptografii nad eliptickými křivkami](#def-ECC). [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) podporuje ECDSA. {{% /def %}}

{{% def id="ECC" name="Kryptografie nad eliptickými křivkami" abbr="ECC" %}} Typ kryptografie s veřejným klíčem založený na eliptických křivkách. ECC používá menší klíče než kryptografie, která eliptické křivky nevyužívá, a přitom poskytuje srovnatelnou úroveň zabezpečení. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Rozšířené ověření" abbr="EV" %}} Typ ověření certifikátu, při kterém [certifikační autorita](#def-CA) ověřila právnickou osobu provozující web. Tyto certifikáty obsahují informace o daném subjektu. Kontroly [certifikační autority](#def-CA) jsou přísnější než u certifikátů [OV](#def-OV). [Let's Encrypt](#def-LE) certifikáty EV nenabízí. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Plně kvalifikovaný název domény" abbr="FQDN" %}} Úplný název domény webu. Například `www.example.com` je *FQDN*. {{% /def %}}

{{% def id="intermediate" name="Zprostředkující certifikát" %}} Certifikát podepsaný [kořenovým](#def-root) nebo jiným zprostředkujícím certifikátem, který může podepisovat další certifikáty. Používá se k podepisování koncových certifikátů, zatímco soukromý klíč kořenového certifikátu zůstává offline. Zprostředkující certifikáty jsou součástí [řetězců certifikátů](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Mezinárodní názvy domén v aplikacích" abbr="IDNA" %}} Viz [mezinárodní název domény](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Mezinárodní název domény" abbr="IDN" %}} Název domény obsahující jiné znaky než `a` až `z`, `0` až `9` a spojovník (`-`). Může například obsahovat znaky arabského, čínského, cyrilského, tamilského, hebrejského nebo latinkového písma s diakritikou či ligaturami. Kódovaná podoba domény IDN začíná řetězcem `xn--`. [Let's Encrypt](#def-LE) domény IDN podporuje: https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} Organizace stojící za [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Vydavatel certifikátu" %}} Pole „Issuer“ certifikátu popisuje, který certifikát jej podepsal. Pole Issuer koncového certifikátu Let's Encrypt může například obsahovat „Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3“. Obvykle obsahuje pole jako [Common Name](#def-CN), země a organizace. Pole Issuer se vždy shoduje s polem [Subject](#def-subject) některého certifikátu. U [certifikátů podepsaných svým držitelem](#def-self-signed), například [kořenových certifikátů](#def-root), jsou pole Issuer a Subject totožná. Pojem „vydavatel“ může označovat také certifikát, který vydává jiné certifikáty ([zprostředkující](#def-intermediate) nebo kořenový certifikát), případně organizaci vydávající certifikáty.{{% /def %}}

{{% def id="key-pair" name="Pár klíčů" %}} Kombinace soukromého a veřejného klíče používaná k podepisování nebo šifrování. Veřejný klíč bývá vložen do certifikátu, zatímco soukromý klíč se ukládá samostatně a musí zůstat utajený. Podle použití lze pár klíčů využít k šifrování a dešifrování, k podepisování a ověřování dat nebo k vyjednání odvozených klíčů. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Koncový certifikát (certifikát koncové entity)" %}} Nejčastěji jde o certifikát podepsaný [zprostředkujícím certifikátem](#def-intermediate), platný pro určitou sadu domén, který nemůže podepisovat jiné certifikáty. O tento typ certifikátu žádají [klienti ACME](#def-ACME-client) a používají jej [webové servery](#def-web-server). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [Certifikační autorita](#def-CA) provozovaná organizací [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Smíšený obsah" %}} Situace, kdy webová stránka používající HTTPS načítá dílčí prostředky (JavaScript, CSS nebo obrázky) přes HTTP. [Prohlížeče](#def-web-browser) mohou smíšený obsah blokovat nebo stránku označit jako méně bezpečnou: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. Chce-li vývojář webu problém se smíšeným obsahem vyřešit, musí stránky upravit tak, aby všechny prostředky používaly URL s HTTPS. K určení prostředků, které způsobují problémy se smíšeným obsahem, lze použít [vývojářské nástroje](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) integrované v prohlížečích. {{% /def %}}

{{% def id="OCSP" name="Protokol pro ověřování stavu certifikátů online" abbr="OCSP" abbr_first="1" %}} Metoda kontroly stavu [odvolání](#def-revocation) [certifikátu](#def-leaf). Jinými slovy jde o způsob, jak zjistit, zda [certifikační autorita](#def-CA) oznámila, že certifikát již nemá být považován za platný, přestože ještě nevypršela jeho platnost. Tento požadavek může narušovat soukromí, protože certifikační autoritě a poskytovatelům internetového připojení umožňuje přímo sledovat, kdo navštěvuje které weby. [Let's Encrypt](#def-LE) již službu OCSP neposkytuje. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Rozšíření [certifikátu](#def-leaf), které [prohlížeči](#def-web-browser) sděluje, že [webový server](#def-web-server) s tímto certifikátem musí používat [OCSP stapling](#def-OCSP-stapling). Vyžaduje, aby webový server při každém připojení potvrdil aktuální stav [odvolání](#def-revocation) [certifikátu](#def-leaf), čímž zvyšuje spolehlivost odvolávání. [Let's Encrypt](#def-LE) tuto funkci již nepodporuje. [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Způsob, jakým může [webový server](#def-web-server) odeslat [prohlížeči](#def-web-browser) odpověď [OCSP](#def-OCSP) podepsanou [certifikační autoritou](#def-CA). Prohlížeč pak nemusí certifikační autoritě posílat další požadavek OCSP, což zvyšuje rychlost a chrání soukromí. Označuje se také jako rozšíření TLS Certificate Status Request. Upozorňujeme, že [Let's Encrypt](#def-LE) protokol OCSP nepodporuje. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Identifikátor objektu" abbr="OID" %}} OID jsou jedinečné číselné identifikátory standardizované Mezinárodní telekomunikační unií (ITU) a organizacemi ISO/IEC. OID se v certifikátech používají k definování rozšíření, polí nebo tvrzení zásad. Použití OID definují internetové standardy a dokumenty [Zásady certifikátů](#def-CP) a [Prohlášení o postupech certifikační autority](#def-CPS). [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Ověření organizace" abbr="OV" %}} Certifikáty, u kterých [certifikační autorita](#def-CA) ověřila právnickou osobu [odběratele](#def-subscriber). Tyto certifikáty obsahují informace o daném subjektu. [Let's Encrypt](#def-LE) certifikáty OV nenabízí. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="Soubor PEM (.pem)" %}} Formát kryptografických informací, který byl původně specifikován v internetových standardech Privacy Enhanced Mail pro bezpečný e-mail. Dokument PEM může obsahovat například soukromý klíč, veřejný klíč nebo digitální certifikát. Tyto soubory začínají řetězcem „-\-\-\--BEGIN “ následovaným typem dat. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Soubory Personal Information Exchange (.pfx)" %}} Soubor, který může obsahovat [koncový certifikát](#def-leaf), jeho [řetězec](#def-chain) až ke kořenovému certifikátu a soukromý klíč koncového certifikátu. Viz také https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Předběžný certifikát" %}} Předběžné certifikáty jsou součástí systému [Certificate Transparency](#def-CT). Předběžný certifikát je kopie [certifikátu](#def-leaf), který certifikační autorita zamýšlí vydat. Obsahuje [kritické](#def-critical) rozšíření poison, jež brání tomu, aby jej běžně používaný software přijal jako platný certifikát. Certifikační autorita odešle předběžný certifikát do [protokolů CT](#def-CT-log) a získá za něj [SCT](#def-SCT). Protože předběžný certifikát není totožný s odpovídajícím certifikátem, mohou protokoly Certificate Transparency nakonec obsahovat oba. [RFC 6962, oddíl 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="profile" name="Profil" %}} Profil je soubor vlastností, které ovlivňují ověření certifikátu i jeho konečný obsah. Popis jednotlivých profilů, jejich vlivu a způsobu výběru najdete v [dokumentaci profilů](/docs/profiles). {{% /def %}}

{{% def id="HPKP" name="Připnutí veřejného klíče HTTP" abbr="HPKP" %}} Bezpečnostní mechanismus, který prohlížeči ukládá, aby při budoucím načítání webu vyžadoval použití určitých veřejných klíčů v [řetězci certifikátů](#def-chain) webu. Chrome tento mechanismus zavedl jako ochranu před kompromitací certifikačních autorit, způsoboval však výpadky webů, a proto jej Chrome [označil za zastaralý a odstranil](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Seznam veřejných přípon" abbr="PSL" %}} Seznam *veřejných přípon* spravovaný organizací Mozilla, který určuje, ve kterých internetových doménách si může mnoho různých subjektů registrovat subdomény. Seznam například uvádí, že `com` i `co.uk` jsou veřejné přípony, přestože `co.uk` není TLD. Webové prohlížeče seznam mimo jiné používají k tomu, aby webům, které pravděpodobně provozují různé subjekty, zabránily ve vzájemném sdílení souborů cookie. [Let's Encrypt](#def-LE) seznam používá také k výpočtu limitů požadavků: [/docs/rate-limits](/docs/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Spoléhající se strana" %}} Osoba, která se spoléhá na informace v certifikátu. Spoléhající se stranou je například návštěvník webu používajícího HTTPS. {{% /def %}}

{{% def id="revocation" name="Odvolání" %}} Certifikát je platný do data konce platnosti, pokud [certifikační autorita](#def-CA) neoznámí, že byl odvolán. Certifikát může být odvolán z různých důvodů, například kvůli kompromitaci soukromého klíče. Prohlížeče mohou stav odvolání certifikátu kontrolovat pomocí [CRL](#def-CRL) nebo novějších metod, například [CRLite](https://github.com/mozilla/crlite/) a [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Upozorňujeme, že v mnoha situacích [odvolávání nefunguje](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Kořenový certifikát" %}} [Certifikát podepsaný sám sebou](#def-self-signed), který spravuje [certifikační autorita](#def-CA), používá jej k podepisování svých [zprostředkujících certifikátů](#def-intermediate) a je součástí [úložišť certifikátů](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Kořenový program" %}} Zásady, podle kterých organizace rozhoduje, které certifikáty zahrne do svého [úložiště certifikátů](#def-store), a tedy kterým certifikačním autoritám bude její software důvěřovat. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Algoritmus s veřejným klíčem používaný k šifrování a digitálnímu podepisování certifikátů. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Certifikát podepsaný sám sebou" %}} Certifikát podepsaný vlastním soukromým klíčem, jehož pole [Subject](#def-subject) je totožné s polem [Issuer](#def-issuer). Důvěra v certifikáty podepsané samy sebou vychází pouze z předchozích opatření provedených mimo digitální prostředí, například z jejich zařazení na [seznam důvěryhodných kořenů](#def-store). [Kořenové certifikáty](#def-root) jsou podepsané samy sebou. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Indikace názvu serveru" abbr="SNI" %}} Pole, které [uživatelský agent](#def-user-agent) odesílá [serveru](#def-web-server) během navazování spojení [TLS](#def-TLS) a uvádí v něm název domény, ke které se chce připojit. Díky tomu může server odpovědět vhodným [certifikátem](#def-leaf), když je za stejnou IP adresou hostováno více domén. Webový server může podle názvu, který klient požadoval prostřednictvím SNI, odeslat jiný certifikát a zobrazit jiný obsah. SNI není šifrované, jeho experimentální náhrada ESNI však ano. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Podepsané časové razítko certifikátu" abbr="SCT" %}} Podepsaný a ověřitelný příslib protokolu [Certificate Transparency](#def-CT-log), že certifikát zveřejní. Prohlížeče, které vynucují [CT](#def-CT), kontrolují přítomnost SCT v certifikátu webu nebo při navazování spojení [TLS](#def-TLS) a odmítnou se připojit k webům, které nesplňují jejich požadavky na protokolování. Tím se zvyšuje pravděpodobnost odhalení podvodných nebo nesprávných certifikátů. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Starší, dosud běžně používaný název pro [TLS](#def-TLS). {{% /def %}}

{{% def id="staging" name="Staging prostředí" %}} [Let's Encrypt](#def-LE) poskytuje staging API pro testování požadavků na certifikáty bez ovlivnění limitů požadavků. Certifikáty vygenerované ve staging prostředí *nejsou* veřejně důvěryhodné. Staging prostředí slouží k testování, ladění a vývoji klientů ACME. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Alternativní název subjektu" abbr="SAN" %}} Pole [certifikátu](#def-leaf), které uvádí domény, pro něž je certifikát platný. Nahrazuje použití [Common Name](#def-CN), které se nyní uvádí pouze z důvodu kompatibility. Jeden certifikát může obsahovat mnoho SAN a platit pro mnoho různých názvů domén. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) [/docs/profiles/#max-names](https://letsencrypt.org/docs/profiles/#max-names) {{% /def %}}

{{% def id="subscriber" name="Odběratel" %}} Osoba nebo organizace žádající o certifikát. {{% /def %}}

{{% def id="TLD" name="Doména nejvyšší úrovně" abbr="TLD" %}} Nejvyšší úroveň hierarchického systému doménových jmen, například národní domény nejvyšší úrovně (ccTLD), jako jsou `.de` (Německo) a `.cn` (Čína), a generické domény nejvyšší úrovně (gTLD), jako jsou `.com` a `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport Layer Security" abbr="TLS" abbr_first="1" %}} Protokol, který HTTPS používá k šifrování a ověřování návštěv webových stránek. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} Část systému [DANE](#def-DANE), která se konkrétně týká ověřování připojení [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" name="Certifikát sjednocené komunikace" abbr="UCC" %}} Označení certifikátu obsahujícího více [alternativních názvů subjektu (SAN)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Webový prohlížeč" %}} [Uživatelský agent](#def-user-agent) používaný k zobrazování webových stránek. Příklady: *Mozilla Firefox*, *Google Chrome* nebo *Safari*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="Uživatelský agent" %}} Software schopný komunikovat s [webovým serverem](#def-web-server). Příklad: [webový prohlížeč](#def-web-browser) nebo [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Webový server" %}} Software poskytující webové stránky (nebo přeneseně hardwarový server, který jej hostuje). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Zástupný certifikát" %}} Certifikát platný pro subdomény o jednu úroveň níže. Například certifikát obsahující [SAN](#def-SAN) pro `*.example.com` platí pro `blog.example.com` a `www.example.com`, ale **nikoli** pro `bork.bork.example.com` nebo `example.com`. Zástupný název se označuje hvězdičkou (*) namísto subdomény. [Let's Encrypt](#def-LE) [poskytuje zástupné certifikáty od března 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Standard definující formát certifikátů s veřejným klíčem. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
