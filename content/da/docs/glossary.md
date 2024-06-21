---
title: Opslag
slug: glossary
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} Et certifikat [udvidelse](#def-extension), der bruges til at angive til [brugeragenter](#def-user-agent) hvordan man kan indhente oplysninger om udstederen af [-certifikatet](#def-certificate). Den specificerer typisk [OCSP](#def-OCSP) -URI og [udsteders URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatisk Certifikat Kontrol Miljø" abbr="ACME" abbr_first="1" %}} Protokol implementeret af [Let's Encrypt](#def-LE). Software, som er kompatibel med denne protokol, kan kommunikere med Let's Encrypt og bede om et [certifikat](#def-leaf). [ACKM RFC (da)](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://da.wikipedia.org/wiki/Automatisk_ Certifikat_Kontrol_Miljø) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Et program, der kan kommunikere med en ACME-server, for at bede om et [certifikat](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} En ACME-kompatibel server, der kan generere [certifikater](#def-leaf). Let's Encrypt software, [Boulder](#def-boulder), er ACME-kompatibel, [med nogle afvigelser](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Den software, der implementerer ACME, udviklet og anvendt af [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} Et sæt tekniske og politiske krav til CA'er. Da alle større [root-programmer](#def-root-program) inkorporerer Baseline Krav, skal CAs følge disse krav for at være betroet af de fleste browsere. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} En DNS-post, der angiver, hvilke [CA'er](#def-CA) har lov til at udstede certifikat for det tilsvarende domænenavn. CAA registreringer kontrolleres af CA'er, ikke af browsere. [Let's Encrypt](#def-LE) [respekterer CAA poster](/docs/caa) som krævet af [Baseline Krav](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} En DNS-post som peger et domænenavn til et andet, der kaldes det kanoniske navn. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} En organisation, der udsteder [certifikater](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo og DigiCert er Certifikatmyndigheder. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Del af feltet [AIA](#def-AIA) med oplysninger om udstederen af [-certifikatet](#def-leaf). Det kan være nyttigt, når [webserveren](#def-web-server) ikke leverer en betroet [certifikatkæde](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certificate" %}} En fil i et [bestemt format](#def-X509), der indeholder en offentlig nøgle og andre data, der beskriver, hvornår den offentlige nøgle skal bruges. Den mest almindelige form for certifikat er et [leaf certifikat](#def-leaf). Der er også [intermediate](#def-intermediate) og [root](#def-root) certifikater. {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} I certifikater defineres de fleste felter af udvidelser. For eksempel er [Subject Alternative Names](#def-SAN) og [AIA](#def-AIA) udvidelser. Udvidelsesmekanismen giver mulighed for at oprette nye felter, var ikke var en del af den oprindelige [X.509](#def-X509) standard. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} En frivillig gruppe af certificeringsmyndigheder, leverandører af internetbrowsersoftware, operativsystemer og andre PKI-anvendende applikationer. CA/Browser Forum offentliggør [Baseline Requirements](#def-BRs). [Let's Encrypt](#def-LE) er medlem af CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} En liste over [intermediate certifikater](#def-intermediate), der hjælper et [brugerprogram](#def-user-agent) til at bestemmer, om den kan stole på en slutenhed eller [leaf-certifikat](#def-leaf), ved at forbinde det til et [root-certifikat](#def-root) i dets [certifikatsamling](#def-store). Bemærk: kæden er ikke altid unik, og når en hjemmeside præsenterer en certifikatkæde, der fører til én rod, brugerprogrammet kan beslutte at anvende en anden kæde til at validere certifikatet. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Et navngivet regelsæt, der angiver anvendeligheden af et certifikat for et bestemt fællesskab og/eller en gruppe af applikationer med fælles sikkerhedskrav. Specifikke detaljer vedrørende udstedelsen er beskrevet i en [CPS](#def-CPS). [ISRG Certificate Policy](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} En erklæring om den praksis, som en certificeringsmyndighed anvender ved udstedelse, ledelse, tilbagekaldelse og fornyelse eller genregistrering af certifikater. [ISRG Certificate Policy](/repository#isrg-certification-practice-statement) - [RFC 3647](https://tools.ietf.org/html/rfc3647#section-3.4) - [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} Et certifikat kan indeholde [udvidelser](#def-extension) markeret "kritisk." Det betyder, at softwaren skal afvise dette certifikat, medmindre softwaren forstår, hvordan denne udvidelse skal behandles. Det gør det muligt at indføre nye udvidelser, der er vigtige for sikkerheden uden at skabe risici for ældre software. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} En metode til at informere [bruger programmer](#def-user-agent) om [tilbagekaldelse](#def-revocation) status af et [certifikat](#def-leaf). Dette er en liste over løbenumrene for alle tilbagekaldte certifikater fra en given CA, underskrevet af den pågældende CA. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} En underskrevet fil med de nødvendige oplysninger, der kræves af [CA](#def-CA) for at generere et certifikat. Relevante oplysninger for [Let's Encrypt](#def-LE) er [Common Name](#def-CN), [Subject Alternative Names](#def-SAN)og Subject Public Key Info. Normalt genererer [klientprogrammer](#def-ACME-client) automatisk CSR for brugeren, men en webhosting-udbyder eller enhed også kan generere en CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} En certifikatsamling som indeholder med betroede [Rod certifikater](#def-root). Styresystemer (såsom Windows, Android eller Debian) og [webbrowsere](#def-web-browser) (såsom Firefox) vedligeholder en certifikatsamling. Browsere uden egen certifikatsamling anvender operativsystemernes certifikatsamling. [Certifikater](#def-leaf) leveret af [Let's Encrypt](#def-LE) er [betroede af de fleste certifikatsamlinger](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} Feltet "Subject" i et certifikatfelt angiver, hvad certifikatet omhandler. Dette indeholder ofte felter som [Common Name](#def-CN), Country og Organization. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} For at forbedre sikkerheden, skal certifikater (eller [præ-certfikater](#def-precertificate)) offentliggøres i Certifikat Gennemsigtighed Logs: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) genererer og publicerer [precertificates](#def-precertificate), og indeholder i det efterfølgende [certifikat](#def-leaf) en liste over [SCT](#def-SCT) for præ-certifikatet. Nogle [browsere](#def-web-browser), såsom Google Chrome, kræver tilstedeværelsen af dette verificerbare løfte for at validere certifikatet. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} En komponent i [Certifikatgennemsigtighed](#def-CT) som accepterer indsendelse af certifikater og [præ-certifikater](#def-precertificate) og gemmer dem i en permanent, verificerbar, offentligt tilgængelig liste. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Del af et certifikat [Emne](#def-subject) som beskriver hvad certifikatet handler om. For [root](#def-root) og [intermediate](#def-intermediate) er det det menneskeligt læsbare navn på [certifikatmyndighed](#def-CA). For [leaf certifikater](#def-leaf) er det et af domænenavne på certifikatet. Bemærk: Det almindelige navn er begrænset til 63 tegn. Det er en forældet metode til angivelse af et domænenavn, som certifikatet finder anvendelse på da de nuværende internetstandarder forventer, at software kun kontrollerer [Subject Alternative Names](#def-SAN) for at bestemme anvendeligheden af et certifikat. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Et udstedende certifikat kan underskrives af mere end én [root](#def-root). For eksempel, [Let's Encrypt](#def-LE) [intermediate](#def-intermediate) er krydssigneret af [IdenTrust](#def-IdenTrust), fordi vi ved starten af Let's Encrypt root-ceterifaktet blev det endnu ikke stolt på af [certifikatsamlinger](#def-store). Teknisk opnåes det ved at to udstedende certifikater, ved hjælp af den samme [Emne](#def-subject) og den samme [Key-pair](#def-key-pair), den ene signeret af den private nøgle til en Kryptér rod og den anden signeret af den private nøgle til en IdenTrust's root: [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} En mekanisme ved hjælp af DNS til at angive, hvordan man verificerer ægtheden af [certifikatet](#def-leaf) eller krypteringsnøglen præsenteret.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} En mekanisme til kryptografisk autorisering af DNS-svar. DNSSEC kræver implementering af TLD'er, domænenavnsejere, og recursive resolvers for at træde i kraft. Anvendelsen er i øjeblikket noget lav. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} Et [certifikat](#def-leaf), hvor ansøgeren kun har bevist sin kontrol med domænenavnet (og ikke den anmodende organisations identitet). [Let's Encrypt](#def-LE) tilbyder kun DV-certifikater (ikke [OV](#def-OV) eller [EV](#def-EV)): [FAQ](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} En variant af den digitale signaturalgoritme (DSA), der bruger elliptisk kurve kryptografi.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) understøtter ECDSA for [end-entity eller leaf certificates](#def-leaf), men endnu ikke for hele [-kæden](#def-chain): [/upcoming-features](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} En bestemt type [EdDSA](#def-EdDSA) sammen med Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} Et moderne offentlig-nøgle signatursystem baseret på elliptiske kurver, designet til at løse flere fælles [implementeringsproblemer](https://ed25519.cr.yp.to/) med elliptisk kurve kryptografi. Certifikatmyndigheder som [Let's Encrypt](#def-LE) kan endnu ikke levere EdDSA-certifikater. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} En type public key kryptografi baseret på elliptiske kurver. ECC bruger mindre nøgler i forhold til ikke-EF-kryptografi samtidig med tilsvarende sikkerhed. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} En type certifikatvalidering, for hvilken [CA](#def-CA) har verificeret den juridiske enhed, der styrer hjemmesiden. De indeholder oplysninger om den pågældende enhed. Kontroller fra [CA](#def-CA) er mere strenge end for [OV](#def-OV) certifikater. [Let's Encrypt](#def-LE) tilbyder ikke EV certifikater. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} Det fuldstændige domænenavn på et websted. For eksempel er `www.example.com` en *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} En [Certifikatmyndighed](#def-CA). IdenTrust har [krydssigneret](#def-cross-signing) [Let's Encrypt](#def-LE) [intermediatecertifikater](#def-intermediate): [/certificater](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Et certifikat signeret med en [root](#def-root) eller en anden intermediate, og i stand til at signere andre certifikater. De bruges til at signere leaf-certifikater og samtidig holde den private nøgle til root-certifikat offline. Intermediate-certifikater er inkluderet i [certifikatkæder](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Se [internationaliseret domænenavn](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Domænenavne med andre tegn end `a` to `z`, `0` til `9` og bindestregen (`-`). De kan for eksempel indeholde arabiske, kinesiske, kyrilliske, tamilske, hebraiske eller latinske alfabet-baserede tegn med diakritiske eller ligaturer. Den kodede repræsentation af et IDN-domæner starter med `xn--`. IDN'er understøttes af [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} Organisationen bag [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} Feltet "Udsteder" for et certifikat beskriver hvilket certifikat der er underskrevet det. Eksempelvis kan udstederfeltet i et Let's Encrypt slutenheds-certifikat være "Udsteder: C = USA, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Det indeholder almindeligvis felter som [Common Name](#def-CN), Country, og Organization. Udstederfeltet matcher altid nogle certifikaters [Emne](#def-subject) felt. For [selvsignerede](#def-self-signed) certifikater som [rødder](#def-root)er udstederen den samme som emnet. Udtrykket "udsteder" kan også bruges til at angive et certifikat, der udsteder andre certifikater (en [intermediate](#def-intermediate) eller root) eller en organisation, som udsteder certifikater. {{% / def %}}

{{% def id="key-pair" name="Key-pair" %}} En kombination af en privat nøgle og en offentlig nøgle, der bruges til at signere eller kryptere. Den offentlige nøgle er almindeligvis indlejret i et certifikat, mens den private nøgle lagres på egen hånd og bør holdes hemmelig. Et nøglepar kan bruges til at kryptere og dekryptere, til at underskrive og verificere data, eller til at forhandle sekundære nøgler, afhængigt af anvendelsen. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Mest almindelige, et certifikat signeret af et [intermediate](#def-intermediate), gyldig for et sæt domæner og ikke i stand til at signere andre certifikater. Dette er denne type certifikat, som [ACME-klienter](#def-ACME-client) anmoder om, og som [webservere](#def-web-server) anvender. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [Certifikat Myndigheden](#def-CA) der drives af [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt){{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Når en HTTPS webside indlæser underressourcer (Javascript, CSS eller billeder) via HTTP. [Browsere](#def-web-browser) kan blokere blandet indhold, eller markere siden som mindre sikker, når blandet indhold er til stede: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. For at løse et problem med blandet indhold, skal en webudvikler ændre deres sider, så alle ressourcer bruger HTTPS-URL'er. [Udviklerværktøjer](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) indbygget i browsere kan bruges til at finde ud af, hvilke ressourcer der forårsager problemer med blandet indhold. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} En metode til at kontrollere [tilbagekaldelsen](#def-revocation) status for et [certifikat](#def-leaf). Med andre ord en måde at kontrollere, om en [Certifikatmyndighed](#def-CA) angiver, at certifikatet ikke længere skal betragtes som gyldigt, selv om udløbsdatoen endnu ikke er nået. Denne anmodning kan skabe privatlivs problemer, fordi det giver certifikatmyndigheden og internetudbyderne mulighed for direkte at observere, hvem der besøger hvilke websteder. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} En [certifikat](#def-leaf) udvidelse, som informerer [-browseren](#def-web-browser) om, at [-webserveren](#def-web-server) med dette certifikat skal anvende [OCSP-hæftning](#def-OCSP-stapling). Det bruges til at kræve, at en opdateret [tilbagekaldelse](#def-revocation) status for [certifikatet](#def-leaf) bekræftes af webserveren ved hver forbindelse, gøre tilbagekaldelse mere pålidelig. [Let's Encrypt](#def-LE) kan udstede certifikater med OCSP Must-Staple [udvidelsen](#def-extension) efter anmodning. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} En måde for en [webserver](#def-web-server) at sende en [browser](#def-web-browser) et [OCSP](#def-OCSP) svar signeret af [Certificate Authority](#def-CA), så browseren selv behøver ikke at foretage en sekundær OCSP-anmodning til CA, forbedre hastighed og privatliv. Også kendt som TLS Certificate Status Request forlængelse. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} OID'er er unikke numeriske identifikatorer standardiseret af Den Internationale Telekommunikationsunion (ITU) og ISO/IEC. OID'er bruges i certifikater til at definere udvidelser, felter eller politiske påstande. Internetstandarder og [Certificate Policy](#def-CP) og [Certification Practice Statement](#def-CPS) dokumenter definerer OID brug. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certifikater for hvilke [CA](#def-CA) har verificeret den juridiske enhed for [Abonnenten](#def-subscriber). De indeholder oplysninger om den pågældende enhed. [Let's Encrypt](#def-LE) tilbyder ikke OV certifikater. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}} Et format til kryptografisk information (oprindeligt angivet som en del af Privacy Enhanced Mail Internet standarder for sikker e-mail). Et PEM-dokument kan repræsentere oplysninger såsom en privat nøgle, en offentlig nøgle eller et digitalt certifikat. Disse filer starter med "-\-\-\-BEGIN " og derefter en datatype. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} En fil, der kan indeholde et [leaf certifikat](#def-leaf), dens [kæde](#def-chain) op til roden og den private nøgle af leaf certifikatet. Se også https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Præ-certificater er en del af [Certifikatgennemsigtighed](#def-CT). Et præcertifikat er en kopi af det [certifikat](#def-leaf), som et CA har til hensigt at udstede med en [kritisk](#def-critical)-gift udvidelse tilføjet for at forhindre præcertifikatet i at blive accepteret af software på nettet. En CA indgiver en præcertifikat til [CT-logfiler](#def-CT-log) til gengæld for [SCT'er](#def-SCT). Da en præcertifikat ikke er identisk med det tilsvarende certifikat, kan logfiler om gennemsigtighed ende med at indeholde begge dele. [RFC 6962 Afsnit 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} En sikkerhedsmekanisme, der beder en browser om at kræve, at et websteds [certifikatkæde](#def-chain) bruger visse offentlige nøgler på fremtidige anvendelser. Chrome introducerede denne mekanisme for at beskytte mod CA-kompromiser, men den forårsagede udfald af webstedet, hvilket førte til [udfasning og fjernelse af denne](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} En liste over *Offentlige suffikser* vedligeholdt af Mozilla, angiver, hvilke internetdomæner der er tilgængelige for mange separate enheder til registrering af underdomæner. For eksempel indikerer listen, at både `com` og `co.uk` er offentlige suffikser, selvom `co.uk` ikke er en TLD. Webbrowsere bruger blandt andet listen, til at forhindre websteder, der sandsynligvis drives af forskellige enheder fra at dele webcookies med hinanden. [Let's Encrypt](#def-LE) bruger også listen til beregning af hastighedsgrænser: [/rate-limits](/rate-limits). https://publicsuffix.org {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} Den person, der stoler på oplysninger i et certifikat. For eksempel, en person, der besøger en HTTPS hjemmeside er en Relying Party. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} Et certifikat er gyldigt indtil udløbsdatoen, medmindre [CA](#def-CA) siger, at det er blevet tilbagekaldt. Certifikatet kan tilbagekaldes af forskellige grunde såsom kompromittering af den private nøgle. Browsere kan kontrollere, om et certifikat tilbagekaldes ved hjælp af [CRL](#def-CRL), [OCSP](#def-OCSP), eller nyere metoder som [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) og [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Bemærk at i mange situationer virker [tilbagekaldelse ikke](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} Et [selvsigneret](#def-self-signed) certifikat kontrolleret af en [certifikatmyndighed](#def-CA), bruges til at underskrive sine [intermediate](#def-intermediate) certifikater og inkluderet i [certifikater](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Politikkerne en organisation bruger til at afgøre, hvilke certifikater der skal inkluderes i sin [certifikatbutik](#def-store), og derfra, som CA'er er betroede af deres software. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} En offentlig nøglealgoritme, der bruges til kryptering og til at signere certifikater digitalt. [Wikipedia](https://da.wikipedia.org/wiki/RSA) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Et certifikat underskrevet af sin egen private nøgle, med sit [Emne](#def-subject) identisk med sin [Udsteder](#def-issuer). Selvsignerede certifikater er kun betroede på grund af tidligere arrangementer i den fysiske verden, såsom optagelse på en [betroet rodliste](#def-store). [Rod-certifikater](#def-root) er selvsignerede. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Et felt som en [brugeragent](#def-user-agent) sender til en [server](#def-web-server) under et [TLS](#def-TLS) håndtryk, angive domænenavnet der skal oprettes forbindelse til. Dette gør det muligt for serveren at svare med det relevante [certifikat](#def-leaf), når flere domæner er hostet bag den samme IP. Webserveren kan sende et andet certifikat, og vise forskelligt indhold, afhængigt af navnet, at klienten anmodet af SNI. SNI er ikke krypteret, men en eksperimentel udskiftning, ESNI, er. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Et signeret, verificerbart løfte om at offentliggøre et certifikat, fra en [Certifikat Gennemsigtighed log](#def-CT-log). Browsere, der håndhæver [CT](#def-CT) tjekker for tilstedeværelsen af SCT'er i et websteds certifikat eller i håndtrykket [TLS](#def-TLS), og nægte at oprette forbindelse til websteder, der ikke opfylder deres logningskrav. Dette øger sandsynligheden for, at falske eller unøjagtige certifikater vil blive opdaget. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Et ældre navn til [TLS](#def-TLS), stadig til almindelig brug. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) giver et staging API til at teste certifikatforespørgsel uden at påvirke kaldsgrænser. Certifikater genereret af staging miljøet er *ikke* offentligt betroet. Stagingsmiljøet bør anvendes til testning, fejlfinding og ACME-klientudvikling. [/docs/staging-miljø](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} Et felt i et [certifikat](#def-leaf), der angiver, for hvilket domæne(r) certifikatet er gyldigt. Det erstatter brugen af [Common Name](#def-CN), som nu kun findes af hensyn til kompatibilitet. Et enkelt certifikat kan indeholde mange SANs og være gyldigt for mange forskellige domænenavne. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} Personen eller organisationen anmoder om et certifikat. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Øverste niveau i det hierarkiske domænenavnssystem, såsom landekode top-level domæner (ccTLDs) som `. e` (Tyskland), `.cn` (Kina) og generiske top-niveau domæner (gTLDs) som `. com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} Protokollen som bruges af HTTPS til at kryptere og autorisere besøg på websider. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} Den del af [DANE](#def-DANE) som specifikt er relateret til validering af [TLS](#def-TLS) forbindelser. {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} En beskrivelse af et certifikat som indeholder flere [Subject Alternative Names (SAN)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} Et [brugerprogram](#def-user-agent) bruges til at vise websider. Eksempler: *Mozilla Firefox*, *Google Chrome* eller *Internet Explorer*. [Wikipedia](https://da.wikipedia.org/wiki/Webbrowser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Software der er i stand til at kommunikere med en [webserver](#def-web-server). Eksempel: en [webbrowser](#def-web-browser) eller [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Software der serverer websider (eller i forlængelse heraf hardwareserveren, der er vært for denne). [Wikipedia](https://da.wikipedia.org/wiki/Webserver) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Certifikater er gyldige for underdomæner et niveau ned. For eksempel, et certifikat, der indeholder en [SAN](#def-SAN) for `*.example.com` er gyldig for `blog.eksempel. om` og `www.example.com`, men **ikke** for `bork. ork.example.com` eller `example.com`). Et wildcard er angivet med et asterisktegn (*) i stedet for et subdomæne. [Let's Encrypt ](#def-LE) [leverer Wildcard certifikater begyndende fra marts 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Standarden, der definerer formatet for offentlige nøglecertifikater. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
