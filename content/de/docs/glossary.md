---
title: Glossar
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} Eine Zertifikat-[Erweiterung](#def-extension) um [User Agents](#def-user-agent) anzuzeigen, wie sie Informationen über den Aussteller des [Zertifikat](#def-certificate) erhalten. Typischerweise spezifiziert sie die [OCSP](#def-OCSP) URI und die [Aussteller-URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} Das Protokoll, welches [Let's Encrypt](#def-LE) implementiert verwendet. Software, die kompatibel zu diesem Protokoll ist, kann zur Kommunikation mit Let's Encrypt benutzt werden, um nach einem [Zertifikat](#def-leaf) zu fragen. [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Ein Programmm, das fähig ist, mit einem ACME-Server zu kommunizieren, und nach einem [Zertifikat](#def-leaf) zu fragen. {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} Ein ACME-kompatibler Server, der [Zertifikate](#def-leaf) generieren kann. [Boulder](#def-boulder), eine Software von Let's Encrypt, ist ACME-kompatibel [aber nicht identisch zu ACME](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Die Software, die ACME implementiert, entwickelt und benutzt von [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} Ein Liste von technischen Anforderungen und Regeln für CAs. Seitdem alle großen [Root-Programme](#def-root-program) die Baseline Requirements erfüllen, müssen CAs diesen Anforderungen folgen, um von den meisten Browsern vertraut zu werden. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} Ein DNS-Eintrag, der spezifiziert, welche [CAs](#def-CA) erlaubt sind, Zertifikate für korrespendierende Domainnamen auszustellen. CAA-Einträge werden von CAs überprüft, nicht von Browsern. [Let's Encrypt](#def-LE) beachtet [CAA records](/docs/caa), wie von den [Baseline Requirements](#def-BRs) gefordert. - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} Ein DNS-Eintrag, der einen Eintrag von einer Domain auf eine andere überträgt, genannt "Canonical Name". [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} Eine Organisation, die [Zertifikate](#def-leaf) ausstellt. [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo und DigiCert sind Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Teil vom [AIA](#def-AIA)-Feld, welches Informationen über den Aussteller des [Zertifikats](#def-leaf) enthält. Kann sinnvoll sein, wenn [Webserver](#def-web-server) keine sichere [Zertifikatkette](#def-chain) bereitstellen. {{% /def %}}

{{% def id="certificate" name="Certificate" %}} Eine Datei in einem [bestimmten Format](#def-X509), die den öffentlichen Schlüssel enthält und andere Daten, die beschreiben, wann der öffentliche Schlüssel zu nutzen ist. Die meisten Arten von Zertifikaten sind [Leaf-Zertifikate](#def-leaf). Es gibt auch [Zwischenzertifikate (intermediate certificates)](#def-intermediate) und [Root-Zertifikate](#def-root). {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} In Zertifikaten sind die meisten Felder als Erweiterung definiert. Erweiterungen sind, zum Beispiel, die [Subject Alternative Names](#def-SAN) und [AIA](#def-AIA). Der Erweiterungsmechanismus erlaubt das Erstellen neuer Felder, die nicht Teil des originalen [X.509](#def-X509) Standard sind. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Eine Freiwilligengruppe von Zertifikatverwaltungen, Anbietern von Internetbrowsern, Betriebssystemen und andere PKI-aktivierten Anwendungen. Das CA/Browser Forum veröffentlicht die [Baseline Requirements](#def-BRs). [Let's Encrypt](#def-LE) ist ein Mitglied des CA/Browser Forums. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} Eine Liste von [Zwischenzertifikaten](#def-intermediate), die einem [User Agent](#def-user-agent), durch Verbindung zu einem [Root Zertifikat](#def-root) in seinem [Zertifikatspeicher](#def-store), helfen zu unterscheiden, ob sie einem End-Zertifikat oder [Leaf-Zertifikat](#def-leaf) vertrauen. Zu beachten: Die Kette ist nicht immer dieselbe und wenn eine Website eine Zertifikatkette zu einem Root präsentiert, kann der User Agent entscheiden, trotzdem eine andere Kette zur Validierung des Zertifikats zu benutzen. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Ein Satz von Regeln, die die Anwendbarkeit von Zertifikaten zu einer bestimmten Gemeinschaft und/oder Klasse von Applikationen mit gemeingültigen Sicherheitsanforderungen vereint. Spezifische Details sind beschrieben in [CPS](#def-CPS). [ISRG Certificate Policy](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} Eine Aussage über die Vorgänge, die eine Zertifizierungsstelle beim Ausstellen, Verwalten, Sperren und Erneuern von Zertifikaten ausübt. [ISRG Certification Practice Statement](/repository#isrg-certification-practice-statement) - [RFC 3647, Abschnitt 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}}} Ein Zertifikat kann [Erweiterungen](#def-extension) enthalten, die als "kritisch" gekennzeichnet sind Das bedeutet, dass die Software dieses Zertifikat ablehnen muss, es sei denn, die Software weiß, wie sie diese Erweiterung verarbeiten kann. Das macht es möglich, neue Erweiterungen zu entwickeln, die wichtig für die Sicherheit sind, ohne ein Risiko für alte Software zu schaffen. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} Eine Methode, um [User Agents](#def-user-agent) über das [Sperren](#def-revocation) von [Zertifikaten](#def-leaf) zu informieren. Dies ist eine Liste von Seriennummern von allen gesperrten Zertifikaten, ausgestellt von der angegebenen CA und von dieser CA signiert. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} Eine signierte Datei mit den notwendigen Informationen für eine [CA](#def-CA) zur Generierung eines Zertifikats. Relevante Information für [Let's Encrypt](#def-LE) sind die [Common Name](#def-CN), [Subject Alternative Names](#def-SAN) und Subject Public Key Info. Typischerweise generieren [Client-Anwendungen](#def-ACME-client) automatisch den CSR für den Nutzer, auch ein Web-Hosting Provider oder ein Gerät generieren auch ein CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} Ein Zertifikatspeicher enthält eine Liste von [Roots](#def-root), denen vertraut wird. Betriebssysteme (wie Windows, Android oder Debian) und [Web Browser](#def-web-browser) (wie Firefox) verwalten einen Zertifikatspeicher. Browser ohne Zertifikatspeicher halten sich an den des Betriebssystems. Durch [Let's Encrypt](#def-LE) bereitgestellte [Zertifikate](#def-leaf) werden von [den meisten Zertifikatspeichern vertraut](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} Das Betreff-Feld ("Subject") eines Zertifikats zeigt an, wofür ein Zertifikat ist. Es enthät typischerweise Felder wie [Common Name](#def-CN), Land und Organisation. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} Um die Sicherheit zu verbessern müssen Zertifikate (oder [Vorzertifikate](#def-precertificate)) in Certificate Transparency Logs: https://www.certificate-transparency.org/ veröffentlicht werden. [Let's Encrypt](#def-LE) generiert und veröffentlicht [Vorzertifikate](#def-precertificate) und speichert sie anschliessend zusammen mit dem [Zertifikat](#def-leaf) in einer Liste von [SCTs](#def-SCT). Einige [Browser](#def-web-browser), wie Google Chrome, erfordern das Vorhandensein eines solchen "verifizierbaren Versprechen" um ein Zertifikat zu validieren. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} Eine Komponente von [Certificate Transparency](#def-CT) die Einreichungen von Zertifikaten und [Vorzertifikaten](#def-precertificate) akzeptiert und sie in eine permanente, verifizierbare und öffentlich-erreichbare Liste aufnimmt. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Teil des Zertifikats [Subject](#def-subject) beschreibt, was das Zertfikat ist. Für [roots](#def-root) und [intermediates](#def-intermediate) ist es ein menschen-lesbarer Name der [Zertifizierungsstelle](#def-CA). Für [Blatt-Zertifikate](#def-leaf) ist es eine des Domainnamens des Zertifikats. Beachten Sie: Der Common Name ist limitiert auf 63 Zeichen. Es ist eine überholte Methode der Identifikation des Domainnamens des Zertifikatantrags, weil der derzeitige Internet-Standard Software erwartet, die nur den [Subject Alternative Names](#def-SAN) überprüft, um die Gültigkeit eines Zertifikats zu bestimmen. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Ein ausgestelltes Zertifikat ist möglicherweise signiert durch mehrere [Root](#def-root). Zum Beispiel, [Let's Encrypt](#def-LE) [Zwischenzertifikate](#def-intermediate) sind quersigniert von [IdenTrust](#def-IdenTrust), weil beim Start von Let's Encrypt Root es nicht vertraut genug war im [Zertifikatspeicher](#def-store). Technisch wird es erreicht durch die Ausstellung zweier Zertifikate, benutzt vom selben [Subject](#def-subject) und dem selben [Schlüsselpaar](#def-key-pair), einer signiert vom privaten Schlüssel von Let's Encrypt Root und der andere signiert vom privaten Schlüssel von IdenTrust's Root: [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} Ein Mechanismus, benutzt DNS zur Identifizierung, wie die Authentizität des [Zertifikats](#def-leaf) zu verifizieren ist oder Verschlüsselungsschlüssel präsentiert.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} Ein Mechanismus zum kryptographischen Authentifizieren einer DNS Antwort. DNSSEC benötigt eine Bereitstellung von TLDs, Domainname Eigentümer und rekursive Resolver, um effektiv zu arbeiten. Die Verbreitung ist derzeit sehr gering. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} Ein [Zertifikat](#def-leaf), bei dem der Antragsteller nur die Kontrolle über den Domainnamen (und nicht die Identität der anfragenden Organisation) nachgewiesen hat. [Let's Encrypt](#def-LE) bietet nur DV Zertifikate (keine [OV](#def-OV) oder [EV](#def-EV)): [FAQ](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} Eine Variante des Digital Signature Algorithm (DSA), welcher Kryptographie mit elliptischen Kurven benutzt.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) unterstützt ECDSA für [End- oder Blatt-Zertfikate](#def-leaf), aber nicht für die ganze [Kette](#def-chain): [/upcoming-features](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} A specific type of [EdDSA](#def-EdDSA), along with Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}  Ein modernes System öffentlicher Schlüssel basierend auf Kryptographie mit elliptischen Kurven, designt zur Lösung verschiedener [Implementierungsprobleme](https://ed25519.cr.yp.to/) mit Kryptographie mit elliptischen Kurven. Zertifizierungsstellen wie [Let's Encrypt](#def-LE) können momentan keine EdDSA Zertifikate zur Verfügung stellen. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Ein Typ öffentlicher Schlüssel basierend auf Kryptographie mit elliptischen Kurven. ECC benutzt kleinere Schlüssel im Vergleich zu nicht-EC Kryptographie bei vergleichsweise gleicher Sicherheit. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Ein Typ der Zertifikatvalidierung, für die die [CA](#def-CA) die rechtliche Identität der Webseite kontrolliert. Diese enthalten Information über die Entität. Die Kontrollen der [CA](#def-CA) sind mehr striktiv als bei [OV](#def-OV) Zertifikaten. [Let's Encrypt](#def-LE) bietet keine EV Zertifikate an. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} Der komplette Domainname einer Webseite. Zum Beispiel `www.example.com` ist ein *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} Eine [Zertifizierungsstelle](#def-CA). IdenTrust hat [Let's Encrypt](#def-LE) [Zwischenzertifikate](#def-intermediate) [quersigniert](#def-cross-signing): [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Ein Zertifikat, signiert von [Root](#def-root) oder einem anderen Zwischenzertifikat, ist in der Lage andere Zertifikate zu signieren. Sie werden benutzt zum Signieren von Blatt-Zertifikaten, um den privaten Schlüssel des Root-Zertifikats offline zu halten. Zwischenzertifikate sind in [Zertifikatketten](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Schauen Sie bei [internationalisierte Domain-Namen](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Domain-Name mit anderen Zeichen als `a` bis `z`, `0` bis `9` und Bindestrich (`-`). Sie können zum Beispiel arabische, chinesische, kyrillische, tamilische, hebräische oder lateinische Zeichen enthalten mit Diakritiker oder Ligaturen. Die enkodierte Variante einer IDN Domain beginnt mit `xn--`. IDNs werden von [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html unterstützt. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} Die Organisation hinter [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} Das "Issuer" Feld eines Zertifikats beschreibt, womit das Zertifikat signiert ist. Zum Beispiel, das Issuer Feld von einem Let's Encrypt End-Zertifikat hat ein "Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Es enthät üblicherweise Felder wie [Common Name](#def-CN), Land und Organisation. Das Issuer Feld stimmt immer überein mit manchen Zertifikats [Subject](#def-subject) Feld. Für [selbstsignierte](#def-self-signed) Zertifikate wie [Roots](#def-root) ist der Issuer dasselbe wie das Subject. Der Ausdruck "issuer" wird auch benutzt zum Identifizieren eines Zertifikats, dass durch andere Zertifikate ausgestellt ist (ein [Zwischenzertifikat](#def-intermediate) oder Root), oder einer Organisation, die Zertifikate ausstellt.{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} Eine Kombination von privaten und öffentlichen Schlüsseln, benutzt zum Signieren und Verschlüsseln. Der öffentliche Schlüssel ist meist in einem Zertifikat eingebunden, wobei der private Schlüssel extra gespeichert und sicher aufbewahrt wird. Ein Schlüsselpaar kann verwendet werden zum Verschlüsseln und Entschlüsseln, zum Signieren und Verifizieren von Daten oder Umkehren des zweiten Schlüsseln, abhängig von der Applikation. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Üblicherweise ist ein Zertifikat signiert von einem [Zwischenzertifikat](#def-intermediate), gültig für einen Satz an Domains und nicht in der Lage, andere Zertifikate zu signieren. Das ist der Typ von Zertifikaten, die [ACME Clients](#def-ACME-client) anfragen und die [Web Server](#def-web-server) benutzen. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} Die [Zertifizierungssstelle](#def-CA) betrieben von [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Wenn eine HTTPS Webseite Unterresourcen (Javascript, CSS oder Bilder) über HTTP lädt. [Browser](#def-web-browser) blockieren möglicherweise gemischten Inhalt oder markieren die Seite als weniger sicher, wenn gemischter Inhalt vorhanden ist: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. Um das Problem zu lösen, muss ein Webentwickler die Seite so ändern, dass alle Ressourcen HTTPS URLs benutzen. [Entwicklerwerkzeuge](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools), eingebaut in Browser, können benutzt werden, um herauszufinden, welche Resourcen Probleme mit gemischten Inhalten verursachen. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} Eine Methode zur Überprüfung des [Sperrstatus](#def-revocation) eines [Zertifikats](#def-leaf). In anderen Worte, ein Weg zu überprüfen, ob eine [Certificate Authority](#def-CA) anzeigt, dass das Zertifikat nicht länger gültig sein sollte, auch wenn das Ablaufdatum noch nicht erreicht ist. Diese Anfragen können Probleme mit der Privatsphäre verursachen, denn es erlaubt der Zertifizierungsstelle und Internet Service Providern direkte Beobachtung, wer welche Seiten besucht hat. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Eine [Zertifikat](#def-leaf) Erweiterung, die den [Browser](#def-web-browser) informiert, dass der [Web Server](#def-web-server) mit dem Zertifikat [OCSP Stapling](#def-OCSP-stapling) benutzen muss. Es wird benutzt, um einen aktuellen [Sperrstatus](#def-revocation) des [Zertifikats](#def-leaf) vom Webserver bei jeder Verbindung bestätigt zu bekommen, was Sperrungen mehr sinnvoll macht. [Let's Encrypt](#def-LE) kann Zertifikate mit OCSP Must-Staple [Erweiterung](#def-extension) ausstellen. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Ein Weg für [Web Server](#def-web-server), um zum [Browser](#def-web-browser) eine [OCSP](#def-OCSP) Antwort signiert von der [Zertifizierungsstelle](#def-CA) zu senden, sodass der Browser nicht selbst eine zweite OCSP Anfrage zur CA senden muss, verbessert Geschwindigkeit und Privatsphäre. Auch bekannt als TLS Certificate Status Request extension. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} OIDs sind einzigartige numerische Bezeichner, standardisiert von der International Telecommunications Union (ITU) und ISO/IEC. OIDs werden mit Zertifikaten zur Definition von Erweiterungen, Feldern und Anforderungen. Internet Standards und [Certificate Policy](#def-CP) und [Certification Practice Statement](#def-CPS) dokumentieren die Nutzung von OID. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Zertifikate, für die die [CA](#def-CA) die juristische Person des [Subscriber](#def-subscriber) verifiziert hat. Diese enthalten Information über die Entität. [Let's Encrypt](#def-LE) bietet keine OV Zertifikate an. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}}  Ein Format für kryptographische Information (original spezifiziert als Teil des Privacy Enhanced Mail Internet Standards für sichere E-Mail). Ein PEM Dokument kann Informationen wie einen privaten Schlüssel, einen öffentlichen Schlüssel oder ein digitales Zertifikat repräsentieren. Diese Dateien beginnen mit "-\-\-\--BEGIN " und dann den Datentyp. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} Eine Datei die möglicherweise ein [Blatt-Zertifikat](#def-leaf) enthält, es ist eine [Kette](#def-chain) hoch bis zum Root und den privaten Schlüssel des Blatt-Zertifikats. Schauen Sie auch https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Vorzertifikate sind Teil der [Certificate Transparency](#def-CT). Ein Vorzertifikat ist eine Kopie des [Zertifikat](#def-leaf), dass eine CA beabsichtigt auszustellen mit einer  [kritischen](#def-critical) Erweiterung ausgestattet, um zu verhindern, dass das Vorzertifikat von Software in der Welt akzeptiert wird. Eine CA sendet ein Vorzertifikat zum [CT logs](#def-CT-log) in Austausch für [SCTs](#def-SCT). Da ein Vorzertifikat nicht identisch ist mit seinem korrespondierenden Zertifikat, loggt Certificate Transparency am Ende beide. [RFC 6962 Section 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Ein Sicherheitsmechanismus, der Browser fragt, ob die [Zertifikatkette](#def-chain) eines Webservers für zukünfigte Anfragen benutzt werden soll. Chrome stellte dieses Mechanismus zum Schutz gegen CA Komprimitierungen vor, aber Ausfälle von Seiten verleiteten Chrome dazu, diesen zu [missbilligen und zu löschen](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} Eine Liste von *Public Suffixes* verwaltet von Mozilla, zeigt an, welche Internet-Domains verfügbar sind für viele separate Entitäten zum Registrieren von Sub-Domains. Zum Beispiel, die Liste zeigt an, dass beide `com` und `co.uk` sind Public Suffixes, wobei  `co.uk` keine TLD ist. Web Browser benutzen die Liste für einige andere Dinge, um zu verhindern, dass Webseiten, die wahrscheinlich von verschiedenen Entitäten betrieben werden, Web-Cookies miteinander teilen. [Let's Encrypt](#def-LE) benutzt die Liste auch zum Berechnen der Rate Limits: [/docs/rate-limits](/docs/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} Die Person, die sich auf Information in einem Zertifikat verlässt. Zum Beispiel, jemand, der eine HTTPS Webseite besucht, ist ein Relying Party. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} Ein Zertifikat ist gültig bis es abläuft, es sei denn, die [CA](#def-CA) sagt, dass es gesperrt ist. Das Zertifikat kann aus verschiedenen Gründen gesperrt sein wie etwa Komprimierung des privaten Schlüssels. Browser können überprüfen, ob ein Zertifikat gesperrt ist durch Benutzung [CRL](#def-CRL), [OCSP](#def-OCSP) oder neueren Methoden wie [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) und [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Beachten Sie, dass [Sperrungen in vielen Situationen nicht funktionieren](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} Ein [selbstsigniertes](#def-self-signed) Zertifikat, kontrolliert von einer [Zertifizierungsstelle](#def-CA), benutzt zur Signierung des [Zwischenzertifikats](#def-intermediate) und liegt im [Zertifikatspeicher](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Die Regeln, die eine Organisation benutzt zu entscheiden, welche Zertifikate in den [Zertifikatspeicher](#def-store) gehören und demzufolge welchen CAs in ihrer Software vertraut werden. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Ein öffentlicher Schlüssel Algorithmus, benutzt zur Verschlüsselung und digitalem Signieren von Zertifikaten. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Ein Zertifikat, signiert von seinem eigenen privaten Schlüssel mit dem [Subject](#def-subject) gleich dem [Issuer](#def-issuer). Selbstsignierte Zertifikate sind vertrauenswürdig nur aufgrund vorheriger Vorkehrungen in der physischen Welt, z. B. Aufnahme in eine [vertrauenswürdige Stammliste](#def-store). [Root Zertifikate](#def-root) sind selbstsigniert. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Ein Feld, dass ein [User Agent](#def-user-agent) während einer [TLS](#def-TLS) Verbindung zu seinem [Server](#def-web-server) sendet, spezifiziert den Domainnamen zu der verbunden werden soll. Das erlaubt dem Server, mit dem angemessenen [Zertifikat](#def-leaf) zu antworten, wenn mehrere Domains hinter derselben IP gehostet sind. Der Server sendet möglicheweise unterschiedliche Zertifikate und zeigt am Ende unterschiedlichen Inhalt, abhängig vom Namen, den der Client angefragt hat durch SNI. SNI ist nicht verschlüsselt, aber als experimentelle Ersatz gilt ESNI. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Eine signierte, nachprüfbare Zusage zur Veröffentlichung eines Zertifikats vom [Certificate Transparency Log](#def-CT-log). Browser, die [CT](#def-CT) erzwingen, überprüfen das Vorhandensein von SCTs im Zertifikat einer Seite oder in der [TLS](#def-TLS) Verbindung und weisen die Verbindung zur Seite ab, die nicht den geloggten Anforderungen entspricht. Dies erhöht die Wahrscheinlichkeit, dass betrügerische oder ungenaue Zertifikate entdeckt werden. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Ein alter Name für [TLS](#def-TLS), immer noch in Verwendung. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) stellt eine Staging API zum Testen von Zertifikatsanfragen ohne Einfluss auf Rate Limits zur Verfügung. Zertifikate, die von der Staging Umgebung ausgestellt sind, werden öffentlich *nicht* vertraut. Die Staging Umgebung sollte nur zum Testen, Fehlersuche und ACME Client Entwicklungsprozess verwendet werden. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} Ein Feld eines [Zertifikats](#def-leaf) das anzeigt, für welche Domain(s) ein Zertifikat gültig ist. Es ersetzt die Benutzung des [Common Name](#def-CN), welcher jetzt aus Kompatibilitätsgründen noch vorhanden ist. Ein einfaches Zertifikat enthält möglicherweise viele SANs und kann für viele unterschiedliche Domains gültig sein. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name)https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} Die Person oder Organisation, die einen Antrag für ein Zertifikat stellt. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Höchstes Level in der Hierarchie des Domain Name System, wie ein Länderschlüssel als Top-Level-Domain (ccTLDs) wie `.de` (Germany), `.cn` (China) und generische Top-Level-Domains (gTLDs) wie `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} Das Protokoll, benutzt von HTTPS zum Verschlüsseln und Authentifizieren von Webseitenbesuchern. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} Der Teil von [DANE](#def-DANE) speziell zum Validieren von [TLS](#def-TLS) Verbindungen. {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Eine Beschreibung von einem Zertifikat, was mehrere [Subject Alternative Names (SANs)](#def-SAN) enthält. {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} Ein [User Agent](#def-user-agent) zum Anzeigen von Webseiten. Beispiele: *Mozilla Firefox*, *Google Chrome* oder *Safari*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Software, fähig zur Kommunikation mit einem [Web Server](#def-web-server). Beispiel: ein [Web Browser](#def-web-browser) oder [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Software zum Ausliefern von Webseiten (oder, als Erweiterung, die Hardware des Server-Hostings selber). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Zertifikate, die gültig sind für Sub-Domains in einem Level Tiefe. Zum Beispiel enthält ein [SAN](#def-SAN) für `*.example.com`, was gültig ist für `blog.example.com` und `www.example.com` aber **nicht** für `bork.bork.example.com` oder `example.com`). Ein wildcard identifiziert sich mit einem Stern-Zeichen (*) im Platz der Sub-Domain. [Let's Encrypt](#def-LE) [stellt Wildcard Zertifikate sein März 2018 zur Verfügung](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Die Standarddefinition des Formats von Öffentliche-Schlüssel-Zertifikate. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
