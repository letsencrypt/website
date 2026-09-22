---
title: Ordlista
slug: glossary
lastmod: 2026-07-04
show_lastmod: 1
description: "En ordlista med termer relaterade till SSL/TLS-certifikat, HTTPS och webbsäkerhet som används av Let's Encrypt."
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

{{% def id="AIA" name="Åtkomst till utfärdarinformation" abbr="AIA" %}} Ett [certifikattillägg](#def-extension) som anger för [användaragenter](#def-user-agent) hur de hämtar information om [certifikatets](#def-certificate) utfärdare. Den anger vanligtvis [utfärdar-URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatisk certifikathanteringsmiljö" abbr="ACME" abbr_first="1" %}} Protokollet implementerat av [Let's Encrypt](#def-LE). Programvara kompatibel med det protokollet kan använda det för att kommunicera med Let's Encrypt för att be om ett [certifikat](#def-leaf). [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME-klient" %}} Ett program som kan kommunicera med en ACME-server för att be om ett [certifikat](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME-server" %}} En ACME-kompatibel server som kan generera [certifikat](#def-leaf). Let's Encrypt's mjukvara, [Boulder](#def-boulder), är ACME-kompatibel, [med vissa avvikelser](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Programvaran som implementerar ACME, utvecklad och använd av [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Grundkrav" abbr="BRs" %}} Ett set av tekniska och policykrav för certifikatutfärdare (CAs). Eftersom alla större [rotprogram](#def-root-program) tillämpar grundkraven måste certifikatutfärdare följa dem för att vara betrodda av de flesta webbläsare. {{% /def %}}

{{% def id="CAA" name="Auktorisering av certifikatutfärdare" abbr="CAA" abbr_first="1" %}} En DNS-post som specificerar vilka [CAs](#def-CA) som får utfärda certifikat för motsvarande domännamn. CAA-poster kontrolleras av CAs, inte av webbläsare. [Let's Encrypt](#def-LE) [följer CAA-poster](/docs/caa) i enlighet med [grundkraven](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="CNAME-post" abbr="CNAME" %}} En DNS-post som kopplar ett domännamn till ett annat, det så kallade kanoniska namnet. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certifikatutfärdare" abbr="CA" %}} En organisation som utfärdar [certifikat](#def-leaf). [Let's Encrypt](#def-LE) är en certifikatutfärdare. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA-utfärdare" %}} En del av [AIA](#def-AIA)-fältet som innehåller information om [certifikatets](#def-leaf) utfärdare. Det kan vara användbart när [webbserver](#def-web-server) inte tillhandahöll en betrodd [certifikatkedja](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certifikat" %}} En fil i ett [visst format](#def-X509) som innehåller en publik nyckel och annan data som beskriver när den publika nyckeln ska användas. Den vanligaste typen av certifikat är ett [leaf certifikat](#def-leaf). Det finns också [mellanliggande](#def-intermediate) och [root](#def-root) certifikat. {{% /def %}}

{{% def id="extension" name="Certifikattillägg" %}} I certifikat definieras de flesta fält av extensions. Till exempel, [Subject Alternative Names](#def-SAN) och [AIA](#def-AIA) är extensions. Extensionsmekanismen tillåter skapandet av nya fält som inte var en del av den ursprungliga [X.509](#def-X509)-standarden. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} En frivillig grupp av certifikatutfärdare, leverantörer av webbläsarprogramvara, operativsystem och andra PKI-aktiverade applikationer. CA/Browser Forum publicerar [grundkraven](#def-BRs). [Let's Encrypt](#def-LE) är medlem i CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certifikatkedja" %}} En lista över [mellancertifikat](#def-intermediate) som hjälper en [användaragent](#def-user-agent) att avgöra att den kan lita på ett slutentitets- eller [lövcertifikat](#def-leaf) genom att koppla det till ett [rotcertifikat](#def-root) i sitt [certifikatarkiv](#def-store). Obs: kedjan är inte alltid unik, och när en webbplats presenterar en certifikatkedja som leder till en root, kan användaragenter bestämma att använda en annan kedja för att validera certifikatet. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certifikatpolicy" abbr="CP" %}} En namngiven uppsättning regler som anger tillämpligheten av ett certifikat för en viss community och/eller klass av applikationer med gemensamma säkerhetskrav. Specifika detaljer för utfärdande beskrivs i en [CPS](#def-CPS). CP- och CPS-dokument kan kombineras till ett enda dokument. [ISRG Combined CP/CPS](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Redogörelse för utfärdandepraxis" abbr="CPS" %}} Ett uttalande om de praxis som en certifieringsinstans använder vid utfärdande, hantering, återkallande och förnyelse eller omnyckling av certifikat. En CPS måste vara i överensstämmelse med dess tillhörande [-certifikatpolicy](#def-CP). CP- och CPS-dokument kan kombineras till ett enda dokument. [ISRG Combined CP/CPS](/repository#isrg-certificate-policy) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Kritiskt tillägg" %}} Ett certifikat kan innehålla [tillägg](#def-extension) märkta "kritiska." Detta innebär att mjukvara måste avvisa det certifikatet om inte mjukvaran förstår hur man behandlar det tillägget. Detta gör det möjligt att införa nya tillägg som är viktiga för säkerhet utan att skapa risker för äldre mjukvara. {{% /def %}}

{{% def id="CRL" name="Lista över återkallade certifikat" abbr="CRL" %}} En metod för att informera [användaragenter](#def-user-agent) om [återkallningsstatus](#def-revocation) för ett [certifikat](#def-leaf). Detta är en lista över serienummer för alla återkallade certifikat från en viss CA, signerad av den CA. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Begäran om certifikatsignering" abbr="CSR" %}} En signerad fil som innehåller den information som krävs av [CA](#def-CA) för att generera ett certifikat. Relevant information för [Let's Encrypt](#def-LE) är [Common Name](#def-CN), [Subject Alternative Names](#def-SAN) och Subject Public Key Info. Vanligtvis genererar [klientapplikationer](#def-ACME-client) automatiskt CSR för användaren, även om en webbhotellleverantör eller enhet också kan generera en CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certifikatarkiv" %}} Ett certifikatarkiv innehåller en lista över betrodda [rotcertifikat](#def-root). Operativsystem (t.ex. Windows, Android eller Debian) och [webbläsare](#def-web-browser) (t.ex. Firefox) underhåller ett certifikatlager. Webbläsare utan ett sådant förlitar sig på operativsystemets certifikatlager. [Certifikat](#def-leaf) tillhandahållna av [Let's Encrypt](#def-LE) är [betrodda av de flesta certifikatlager](/certificates). {{% /def %}}

{{% def id="subject" name="Certifikatets subjekt" %}} Fältet "Ämne" i ett certifikat anger vad ett certifikat handlar om. Detta innehåller vanligtvis fält som [Common Name](#def-CN), Land och Organisation. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} För att förbättra säkerheten måste certifikat (eller [precertifikat](#def-precertificate)) publiceras i Certificate Transparency-loggar: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) genererar och publicerar [förcertifikat](#def-precertificate), och inkluderar i det efterföljande [-certifikatet](#def-leaf) en lista över [SCT:er](#def-SCT) för förcertifikatet. Vissa [webbläsare](#def-web-browser), såsom Google Chrome, kräver närvaron av detta verifierbara löfte för att kunna validera certifikatet. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency-logg" %}} En komponent av [Certificate Transparency](#def-CT) som accepterar inlämning av certifikat och [förcertifikat](#def-precertificate) och införlivar dem i en permanent, verifierbar, offentligt tillgänglig lista. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Del av ett certifikats [Subject](#def-subject) som beskriver vad certifikatet handlar om. För [rötter](#def-root) och [mellanliggande](#def-intermediate) är det det människoläsbara namnet på [certifikatutfärdaren](#def-CA). För [lövcertifikat](#def-leaf) är det ett av domännamnen på certifikatet. Observera: det vanliga namnet är begränsat till 63 tecken. Det är en föråldrad metod för att ange ett domännamn som certifikatet gäller för, eftersom nuvarande internetstandarder förväntar sig att programvara endast kontrollerar [Subject Alternative Names](#def-SAN) för att avgöra certifikatets giltighet. {{% /def %}}

{{% def id="cross-signing" name="Korssignering" %}} Ett utfärdande certifikat kan undertecknas av mer än en [root-](#def-root), möjligen från olika CA:er. När en CA undertecknar en annan CA:s certifikat kallas det korssignering. {{% /def %}}

{{% def id="DANE" name="DNS-baserad autentisering av namngivna enheter" abbr="DANE" %}} En mekanism som använder DNS för att ange hur man verifierar äktheten av [certifikatet](#def-leaf) eller den presenterade krypteringsnyckeln.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="DNS-säkerhetstillägg" abbr="DNSSEC" %}} En mekanism för att kryptografiskt autentisera DNS-svar. DNSSEC kräver implementering av TLD:er, domännamnsägare och rekursiva resolver för att träda i kraft. Adoptionen är för närvarande något låg. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domänvaliderat certifikat" %}} Ett [certifikat](#def-leaf) där sökanden endast har bevisat sin kontroll över domännamnet (och inte identiteten på den begärande organisationen). [Let's Encrypt](#def-LE) erbjuder endast DV-certifikat (inte [OV](#def-OV) eller [EV](#def-EV) ): [FAQ](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Digital signaturalgoritm med elliptiska kurvor" abbr="ECDSA" abbr_first="1" %}} En signaturalgoritm som använder [elliptisk kurvakryptografi](#def-ECC). [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) stöder ECDSA. {{% /def %}}

{{% def id="ECC" name="Kryptografi med elliptiska kurvor" abbr="ECC" %}} En typ av offentlig nyckelkryptografi baserad på elliptiska kurvor. ECC använder mindre nycklar jämfört med icke-EC-kryptografi samtidigt som det ger motsvarande säkerhet. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Utökad validering" abbr="EV" %}} En typ av certifikatvalidering där [CA](#def-CA) har verifierat den juridiska enhet som kontrollerar webbplatsen. De innehåller information om den enheten. Kontroller från [CA](#def-CA) är striktare än för [OV](#def-OV)-certifikat. [Let's Encrypt](#def-LE) erbjuder inte EV-certifikat. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fullständigt kvalificerat domännamn" abbr="FQDN" %}} Det fullständiga domännamnet för en webbplats. Till exempel är `www.example.com` ett *FQDN*. {{% /def %}}

{{% def id="intermediate" name="Mellancertifikat" %}} Ett certifikat som signerats av ett [rotcertifikat](#def-root) eller ett annat mellancertifikat och som kan signera andra certifikat. De används för att signera lövcertifikat medan rotcertifikatets privata nyckel hålls offline. Intermediärer inkluderas i [certifikatkedjor](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationaliserade domännamn för program" abbr="IDNA" %}} Se [internationalized domain name](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationaliserat domännamn" abbr="IDN" %}} Domännamn med andra tecken än `a` till `z`, `0` till `9` och bindestreck (`-`). De kan till exempel innehålla arabiska, kinesiska, kyrilliska, tamil, hebreiska eller latinska alfabetbaserade tecken med diakritiska tecken eller ligaturer. Den kodade representationen av en IDN-domän börjar med `xn--`. IDN stöds av [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} Organisationen bakom [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certifikatutfärdare" %}} Fältet "Issuer" i ett certifikat beskriver vilket certifikat som signerat det. Till exempel kan Issuer-fältet i ett Let's Encrypt slutentitetscertifikat vara "Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Det innehåller vanligtvis fält som [Common Name](#def-CN), Land och Organisation. Issuer-fältet matchar alltid ett certifikats [Subject](#def-subject)-fält. För [självsignerade](#def-self-signed)-certifikat som [roots](#def-root) är Issuer samma som Subject. Termen "utfärdare" kan också användas för att indikera ett certifikat som utfärdar andra certifikat (en [mellanliggande](#def-intermediate) eller root), eller en organisation som utfärdar certifikat.{{% /def %}}

{{% def id="key-pair" name="Nyckelpar" %}} En kombination av en privat nyckel och offentlig nyckel som används för att signera eller kryptera. Den offentliga nyckeln är vanligen inbäddad i ett certifikat, medan den privata nyckeln lagras separat och ska hållas hemlig. Ett nyckelpar kan användas för att kryptera och dekryptera, signera och verifiera data, eller förhandla sekundära nycklar, beroende på applikationen. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Lövcertifikat (slutentitetscertifikat)" %}} Vanligen ett certifikat som signerats av ett [mellancertifikat](#def-intermediate), gäller för en uppsättning domäner och inte kan signera andra certifikat. Detta är typen av certifikat som [ACME-klienter](#def-ACME-client) begär, och som [webbservrar](#def-web-server) använder. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} Den [certifikatutfärdande myndigheten](#def-CA) som drivs av [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Blandat innehåll" %}} När en HTTPS-webbsida laddar underresurser (JavaScript, CSS eller bilder) över HTTP. [Webbläsare](#def-web-browser) kan blockera blandat innehåll, eller markera sidan som mindre säker när blandat innehåll är närvarande: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. För att åtgärda ett problem med blandat innehåll måste en webbutvecklare ändra sina sidor så att alla resurser använder HTTPS-URL:er. [Utvecklarverktyg](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) inbyggda i webbläsare kan användas för att ta reda på vilka resurser som orsakar blandade innehållsproblem. {{% /def %}}

{{% def id="OCSP" name="Protokoll för certifikatstatus online" abbr="OCSP" abbr_first="1" %}} En metod för att kontrollera [återkallelse](#def-revocation) status för ett [certifikat](#def-leaf). Med andra ord, ett sätt att kontrollera om en [certifikatutfärdare](#def-CA) anger att certifikatet inte längre bör betraktas som giltigt, även om dess utgångsdatum ännu inte har uppnåtts. Denna begäran kan skapa integritetsproblem eftersom den tillåter certifikatutfärdaren och Internetleverantörer att direkt observera vem som besöker vilka sajter. [Let's Encrypt](#def-LE) erbjuder inte längre en OCSP-tjänst. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Ett [certifikattillägg](#def-leaf) som informerar [webbläsaren](#def-web-browser) om att [webbservern](#def-web-server) med certifikatet måste använda [OCSP-häftning](#def-OCSP-stapling). Det används för att kräva att ett uppdaterat [återkallande](#def-revocation) status för [-certifikatet](#def-leaf) bekräftas av webbservern vid varje anslutning, vilket gör återkallandet mer pålitligt. [Let's Encrypt](#def-LE) stöder inte längre detta. [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP-häftning" %}} Ett sätt för en [webbserver](#def-web-server) att skicka en [webbläsare](#def-web-browser) ett [OCSP](#def-OCSP)-svar signerat av [-certifikatutfärdaren](#def-CA), så att webbläsaren själv inte behöver göra en sekundär OCSP-förfrågan till CA, vilket förbättrar hastighet och integritet. Även känt som tillägget TLS Certificate Status Request. Observera att [Let's Encrypt](#def-LE) inte stöder OCSP. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Objektidentifierare" abbr="OID" %}} OID:er är unika numeriska identifierare som standardiserats av Internationella teleunionen (ITU) och ISO/IEC. OIDs används inom certifikat för att definiera tillägg, fält eller policypåståenden. Dokument om internetstandarder, [certifikatpolicyer](#def-CP) och [utfärdandepraxis](#def-CPS) definierar hur OID:er används. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organisationsvalidering" abbr="OV" %}} Certifikat för vilka [CA](#def-CA) har verifierat den juridiska personen för [Prenumeranten](#def-subscriber). De innehåller information om den enheten. [Let's Encrypt](#def-LE) erbjuder inte OV-certifikat. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM-fil (.pem)" %}} Ett format för kryptografisk information (ursprungligen specificerat som en del av Privacy Enhanced Mail Internet-standarderna för säker e-post). Ett PEM-dokument kan representera information såsom en privat nyckel, en publik nyckel eller ett digitalt certifikat. Dessa filer börjar med "-\-\-\--BEGIN " och sedan en datatyp. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange-fil (.pfx)" %}} En fil som kan innehålla ett [lövcertifikat](#def-leaf), dess [kedja](#def-chain) upp till roten och den privata nyckeln för lövet. Se även https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Förcertifikat" %}} Förcertifikat är en del av [Certifikattransparens](#def-CT). Ett förcertifikat är en kopia av [-certifikatet](#def-leaf) som en CA avser att utfärda, med en [kritisk](#def-critical) poison-tillägg tillagd för att förhindra att förcertifikatet accepteras av programvara i fält. En CA lämnar in ett förcertifikat till [CT-loggar](#def-CT-log) i utbyte mot [SCT:er](#def-SCT). Eftersom ett förcertifikat inte är identiskt med sitt motsvarande certifikat kan Certificate Transparency-loggar sluta innehålla båda. [RFC 6962 Sektion 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="profile" name="Profil" %}} En profil är en samling egenskaper som påverkar både valideringen av och det slutliga innehållet i ett certifikat. Se [profilernas dokumentation](/docs/profiles) för beskrivningar av varje profil, vad de påverkar, och hur man väljer dem. {{% /def %}}

{{% def id="HPKP" name="HTTP-nyckelfästning" abbr="HPKP" %}} En säkerhetsmekanism som ber en webbläsare att kräva att en webbplats [-certifikatkedja](#def-chain) använder vissa publika nycklar vid framtida laddningar. Chrome införde denna mekanism för att skydda mot kompromisser av CA, men det orsakade driftstopp för webbplatser, vilket ledde till att Chrome [avskrev och tog bort det](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Lista över offentliga suffix" abbr="PSL" %}} En lista över *Public Suffixes* som underhålls av Mozilla, och som visar vilka internetdomäner som är tillgängliga för många separata enheter att registrera underdomäner. Till exempel visar listan att både `com` och `co.uk` är Public Suffixes även om `co.uk` inte är en TLD. Webbläsare använder listan bland annat för att förhindra att webbplatser som sannolikt drivs av olika enheter delar webb-kakor med varandra. [Let's Encrypt](#def-LE) använder också listan vid beräkning av frekvensbegränsningar: [/docs/rate-limits](/docs/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Förlitande part" %}} Den person som förlitar sig på information i ett certifikat. Till exempel är någon som besöker en HTTPS-webbplats en Relying Party. {{% /def %}}

{{% def id="revocation" name="Återkallelse" %}} Ett certifikat är giltigt tills det går ut, såvida inte [CA](#def-CA) säger att det har återkallats. Certifikatet kan återkallas av olika skäl, såsom kompromettering av den privata nyckeln. Webbläsare kan kontrollera om ett certifikat är återkallat med en [CRL](#def-CRL) eller nyare metoder som [CRLite](https://github.com/mozilla/crlite/) och [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Observera att i många situationer fungerar [återkallande inte](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Rotcertifikat" %}} Ett [självsignerat](#def-self-signed) certifikat som kontrolleras av en [certifikatutfärdare](#def-CA), och används för att signera dess [mellanliggande](#def-intermediate) certifikat och inkluderas i [certifikatlager](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Rotprogram" %}} De policyer som en organisation använder för att avgöra vilka certifikat som ska ingå i dess [certifikatarkiv](#def-store) och därmed vilka certifikatutfärdare som organisationens programvara litar på. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} En algoritm med publik nyckel som används för kryptering och för att digitalt signera certifikat. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Självsignerat certifikat" %}} Ett certifikat som är signerat med sin egen privata nyckel, med dess [Subject](#def-subject) lika med dess [Issuer](#def-issuer). Självsignerade certifikat litas endast på på grund av tidigare arrangemang som gjorts i den fysiska världen, såsom inklusion på en [betrodd rotlista](#def-store). [Rotcertifikat](#def-root) är självsignerade. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Ett fält som en [användaragents](#def-user-agent) skickar till en [server](#def-web-server) under en [TLS](#def-TLS)-handshake, som specificerar domännamnet att ansluta till. Detta gör det möjligt för servern att svara med det lämpliga [certifikatet](#def-leaf) när flera domäner är hostade bakom samma IP. Webbservern kan skicka ett annat certifikat och visa annat innehåll beroende på namnet som klienten begärde via SNI. SNI är inte krypterat, men en experimentell ersättning, ESNI, är det. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signerad certifikattidsstämpel" abbr="SCT" %}} Ett signerat och verifierbart löfte från en [Certificate Transparency-logg](#def-CT-log) om att publicera ett certifikat. Webbläsare som upprätthåller [CT](#def-CT) kontrollerar om SCT:er finns i en webbplats certifikat eller i [TLS](#def-TLS)-handshaken och vägrar att ansluta till webbplatser som inte uppfyller deras loggningskrav. Detta ökar sannolikheten att bedrägliga eller felaktiga certifikat upptäcks. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Ett äldre namn för [TLS](#def-TLS), fortfarande i vanlig användning. {{% /def %}}

{{% def id="staging" name="Testmiljö" %}} [Let's Encrypt](#def-LE) tillhandahåller ett staging-API för att testa certifikatförfrågningar utan att påverka frekvensbegränsningar. Certifikat som genereras av testmiljön är *inte* offentligt betrodda. Testmiljön bör användas för testning, felsökning och utveckling av ACME-klienter. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Alternativt subjektnamn" abbr="SAN" %}} Ett fält i ett [certifikat](#def-leaf) som anger för vilka domän(er) certifikatet är giltigt. Det ersätter användningen av [Common Name](#def-CN), som nu endast tillhandahålls av kompatibilitetsskäl. Ett enskilt certifikat kan innehålla många SAN:er och vara giltigt för många olika domännamn. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) [/docs/profiles/#max-names](https://letsencrypt.org/docs/profiles/#max-names) {{% /def %}}

{{% def id="subscriber" name="Prenumerant" %}} Personen eller organisationen som begär ett certifikat. {{% /def %}}

{{% def id="TLD" name="Toppdomän" abbr="TLD" %}} Högsta nivån i det hierarkiska Domain Name System, såsom landskodstoppdomäner (ccTLDs) som `.de` (Tyskland), `.cn` (Kina) och generiska toppdomäner (gTLDs) som `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transportlagersäkerhet" abbr="TLS" abbr_first="1" %}} Protokollet som används av HTTPS för att kryptera och autentisera webbplatsbesök. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} Den del av [DANE](#def-DANE) som specifikt rör validering av [TLS](#def-TLS)-anslutningar. {{% /def %}}

{{% def id="UCC" name="Unified Communications-certifikat" abbr="UCC" %}} En beskrivning av ett certifikat som innehåller flera [Subject Alternative Names (SANs)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Webbläsare" %}} En [användaragengent](#def-user-agent) som används för att visa webbsidor. Exempel: *Mozilla Firefox*, *Google Chrome* eller *Safari*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="Användaragent" %}} Programvara som kan kommunicera med en [webbserver](#def-web-server). Exempel: en [webbläsare](#def-web-browser) eller [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Webbserver" %}} Programvara som tillhandahåller webbsidor (eller i förlängningen den fysiska server som är värd för programvaran). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Jokerteckencertifikat" %}} Certifikat som är giltiga för subdomäner ett nivå ner. Till exempel, ett certifikat som innehåller en [SAN](#def-SAN) för `*.example.com` är giltigt för `blog.example.com` och `www.example.com` men **inte** för `bork.bork.example.com` eller `example.com`. En wildcard indikeras med en asterisk (*) i stället för en subdomän. [Let's Encrypt](#def-LE) [erbjuder Wildcard-certifikat från och med mars 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Standarden som definierar formatet för publika nyckelcertifikat. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
