---
title: Glossaire
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} Une [extension](#def-extension) de certificat utilisée pour indiquer aux [agents utilisateurs](#def-user-agent) comment obtenir des informations sur l'émetteur du [certificat](#def-certificate). Il précise généralement l'URI de l'[OCSP](#def-OCSP) et l'[URI de l'émetteur](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} Le protocole mis en œuvre par [Let's Encrypt](#def-LE). Les logiciels compatibles avec ce protocole peuvent l'utiliser pour communiquer avec Let's Encrypt pour demander un [certificat](#def-leaf). [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Un programme capable de communiquer avec un serveur ACME pour demander un [certificat](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} Un serveur compatible ACME qui peut générer des [certificats](#def-leaf). Le logiciel de Let's Encrypt, [Boulder](#def-boulder), est compatible ACME, [ avec quelques divergences](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Le logiciel mettant en œuvre ACME, développé et utilisé par [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} Un ensemble d'exigences techniques et administratives pour les AC. Étant donné que tous les principaux [programmes racines](#def-root-program) intègrent les exigences de base, les AC doivent respecter ces exigences pour que la plupart des navigateurs leur fassent confiance. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} Un enregistrement DNS qui spécifie quelles [Autorité de Certification](#def-CA) sont autorisés à émettre un certificat pour le nom de domaine correspondant. Les enregistrements de la CAA sont vérifiés par les AC, et non par les navigateurs. [Let's Encrypt](#def-LE) [accepte les enregistrements de la CAA ](/docs/caa) comme le prévoient les [Conditions de Base](#def-BRs) (Baseline Requirements). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} Une entrée DNS qui fait correspondre un nom de domaine à un autre, appelée "nom canonique". [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} Une organisation qui délivre des [certificats](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, et DigiCert sont des Autorités de Certification. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Partie du champ [AIA](#def-AIA) contenant des informations sur l'émetteur du [certificat](#def-leaf). Elle peut être utile lorsque le [serveur web](#def-web-server) n'a pas fourni une [chaîne de certificats](#def-chain) de confiance. {{% /def %}}

{{% def id="certificate" name="Certificate" %}} Un fichier au format [particulier](#def-X509) qui contient une clé publique et d'autres données décrivant quand utiliser cette clé publique. Le type de certificat le plus courant est un certificat [leaf](#def-leaf). Il existe également des certificats ["intermédiaire" (intermediate)](#def-intermediate) et ["racine" (root)](#def-root). {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} Dans les certificats, la plupart des champs sont définis par des extensions. Par exemple, [Subject Alternative Names](#def-SAN) et [AIA](#def-AIA) sont des extensions. Le mécanisme d'extension permet de créer de nouveaux champs qui ne faisaient pas partie de la norme originale [X.509](#def-X509). {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Un groupe volontaire d'autorités de certification, de vendeurs de logiciels de navigation Internet, de systèmes d'exploitation et d'autres applications compatibles PKI. Le CA/Browser Forum publie les [Exigences de Base (Baseline Requirements](#def-BRs). [Let's Encrypt](#def-LE) est membre du CA/Browser Forum. [cabforum.org](https://cabforum.org/) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} Une liste de [certificats intermédiaires](#def-intermediate) qui aide un [agent utilisateur](#def-user-agent) à déterminer qu'il peut faire confiance à un certificat d'entité finale ou ["leaf certificate"](#def-leaf), en le connectant à un [certificat racine](#def-root) dans son [magasin de certificats](#def-store). Remarque : la chaîne n'est pas toujours unique, et lorsqu'un site web présente une chaîne de certificats menant à une racine, l'agent utilisateur peut décider d'utiliser une autre chaîne pour valider le certificat. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Ensemble nommé de règles qui indique l'applicabilité d'un certificat à une communauté particulière et/ou à une catégorie d'applications ayant des exigences de sécurité communes. Les détails spécifiques de l'émission sont décrits dans un [CPS](#def-CPS). [ISRG Certificate Policy](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} Une déclaration des pratiques qu'une autorité de certification emploie pour délivrer, gérer, révoquer et renouveler ou re-coder les certificats. [ISRG Certification Practice Statement](/repository#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} Un certificat peut contenir des [extensions](#def-extension) marquées "critiques" Cela signifie que le logiciel doit rejeter ce certificat, à moins qu'il ne comprenne comment traiter cette extension. Cela permet d'introduire de nouvelles extensions qui sont importantes pour la sécurité sans créer de risques pour les anciens logiciels. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} Une méthode pour informer les [agents utilisateurs](#def-user-agent) sur le statut de [revocation](#def-révocation) d'un [certificat](#def-leaf). Il s'agit d'une liste des numéros de série de tous les certificats révoqués d'une AC donnée, signée par cette AC. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} Un fichier signé contenant les informations nécessaires requises par le [AC](#def-CA) pour générer un certificat. Les informations pertinentes pour [Let's Encrypt](#def-LE) sont [Common Name](#def-CN), [Subject Alternative Names](#def-SAN), et Subject Public Key Info. Habituellement, les [applications clientes](#def-ACME-client) génèrent automatiquement la CSR pour l'utilisateur, bien qu'un fournisseur d'hébergement web ou un appareil puisse également générer une CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} Un magasin de certificats contient une liste de certificats de confiance ["racines" (roots)](#def-root). Les systèmes d'exploitation (tels que Windows, Android ou Debian) et [les navigateurs web](#def-web-browser) (tels que Firefox) gèrent un magasin de certificats. Les navigateurs qui n'en ont pas utilisent le magasin de certificats des systèmes d'exploitation. Les [certificats](#def-leaf) fournis par [Let's Encrypt](#def-LE) sont [reconnus par la plupart des magasins de certificats](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} Le champ "Subject" d'un certificat indique de quoi il s'agit. Il contient généralement des champs comme [Common Name](#def-CN), Country et Organization. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} Pour améliorer la sécurité, les certificats (ou [pré-certificats](#def-precertificate)) doivent être publiés dans Certificate Transparency Logs: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) génère et publie des [pré-certificat](#def-precertificate), et inclut dans le [certificat suivant](#def-leaf) une liste de [SCT](#def-SCT) pour le pré-certificat. Certains [navigateurs](#def-web-browser), tels que Google Chrome, exigent la présence de cette garantie vérifiable afin de valider le certificat. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} Une composante de [Certificate Transparency](#def-CT) qui accepte les soumissions de certificats et de [pré-certificats](#def-precertificate) et les intègre dans une liste permanente, vérifiable et accessible au public. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Partie d'un certificat [Subject](#def-subject) décrivant l'objet du certificat. Pour les ["roots"](#def-root) et les ["intermediates"](#def-intermediate), c'est le nom de l'[Autorité de Certification](#def-CA). Pour les [certificats "leaf"](#def-leaf) il s'agit d'un des noms de domaine figurant sur le certificat. Note : Le nom commun est limité à 63 caractères. Il s'agit d'une méthode obsolète pour indiquer un nom de domaine auquel le certificat s'applique, puisque les normes Internet actuelles attendent des logiciels qu'ils ne vérifient que les [Subject Alternative Names](#def-SAN) afin de déterminer l'applicabilité d'un certificat. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Un certificat émis peut être signé par plusieurs [racines](#def-root). Par exemple, les [certificats intermédiaires](#def-intermediate) de [Let's Encrypt](#def-LE)sont signés par [IdenTrust](#def-IdenTrust), car au lancement, la racine de Let's Encrypt n'était pas encore reconnue par les [magasins de certificats](#def-store). Techniquement, cela se fait avec deux certificats émetteurs, utilisant le même [Subject](#def-subject) et la même [paire de clés](#def-key-pair), l'un signé par la clé privée d'une racine Let's Encrypt et l'autre signé par la clé privée d'une racine IdenTrust : [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} Un mécanisme utilisant le DNS pour indiquer comment vérifier l'authenticité du [certificat](#def-leaf) ou de la clé de cryptage présenté.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} Un mécanisme utilisant le DNS pour indiquer comment vérifier l'authenticité du certificat ou de la clé de cryptage présenté. Pour prendre effet, la DNSSEC doit être déployée par les TLD, les propriétaires de noms de domaine et les résolveurs récursifs. L'adoption est actuellement assez faible. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} Un [certificat](#def-leaf) où le demandeur n'a fait que prouver son contrôle sur le nom de domaine (et non l'identité de l'organisme demandeur). [Let's Encrypt](#def-LE) ne propose que des certificats DV (pas [OV](#def-OV) ou [EV](#def-EV)) : [FAQ](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} Une variante de l'algorithme de signature numérique (DSA) qui utilise la cryptographie à courbe elliptique.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) prend en charge l'ECDSA pour les [certificats d'entité finale ou "leaf certificates"](#def-leaf), mais pas encore pour l'ensemble de la [chain](#def-chain): [/prochaines fonctionnalités](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Un type spécifique d'[EdDSA](#def-EdDSA), ainsi que l'Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}  Un système moderne de signature à clé publique basé sur des courbes elliptiques, conçu pour résoudre plusieurs problèmes courants de [mise en œuvre](https://ed25519.cr.yp.to/) de la cryptographie à courbes elliptiques. Les autorités de certification comme [Let's Encrypt](#def-LE) ne peuvent pas encore fournir de certificats EdDSA. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Un type de cryptographie à clé publique basé sur des courbes elliptiques. L'ECC utilise des clés plus petites que la cryptographie non CE tout en offrant une sécurité équivalente. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Un type de validation de certificat pour lequel l' [AC](#def-CA) a vérifié l'entité légale contrôlant le site web. Ils contiennent des informations sur cette entité. Les contrôles de l'[AC](#def-CA) sont plus stricts que pour les certificats [OV](#def-OV). [Let's Encrypt](#def-LE) ne propose pas de certificats EV. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} Le nom de domaine complet d'un site web. Par exemple, `www.example.com` est un *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} Une [Autorité de Certification ](#def-CA). IdenTrust a apposé sa [signature croisée](#def-cross-signing) sur les [certificats intermédiaires](#def-intermediate) de [Let's Encrypt](#def-LE) : [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Un certificat signé par un ["root"](#def-root) ou autre "intermediate", et capable de signer d'autres certificats. Ils sont utilisés pour signer des certificats "leaf" tout en gardant la clé privée du certificat "root" hors ligne. Les "intermediates" sont inclus dans les [chaînes de certificats](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} See [nom de domaine internationalisé](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Nom de domaine avec des caractères autres que `a` à `z`, `0` à `9` et le trait d'union (`-`). Ils peuvent par exemple contenir des caractères basés sur l'alphabet arabe, chinois, cyrillique, tamoul, hébreu ou latin avec des diacritiques ou des ligatures. La représentation codée d'un domaine IDN commence par `xn--`. Les IDNs sont supportés par [Let's Encrypt](#def-LE) : https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} L'organisation derrière [Let's Encrypt](#def-LE) : [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} Le champ "Émetteur" d'un certificat décrit le certificat qui l'a signé. Par exemple, le champ Issuer d'un certificat d'entité finale Let's Encrypt pourrait être "Issuer : C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Il contient généralement des champs comme [Common Name](#def-CN), Country et Organization. Le champ "Émetteur" correspond toujours au champ [Subject](#def-subject) de certains certificats. Pour les certificats [auto-signés](#def-self-signed) comme les ["roots"](#def-root), l'émetteur est le même que le "Subject". Le terme "émetteur" peut également être utilisé pour indiquer un certificat qui émet d'autres certificats (un ["intermediate"](#def-intermediate) ou "root"), ou une organisation qui émet des certificats.{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} Combinaison d'une clé privée et d'une clé publique utilisée pour signer ou crypter. La clé publique est généralement intégrée dans un certificat, tandis que la clé privée est stockée seule et doit être gardée secrète. Une paire de clés peut être utilisée pour crypter et décrypter, pour signer et vérifier des données, ou pour négocier des clés secondaires, selon l'application. [Wikipedia](https://fr.wikipedia.org/wiki/Cryptographie_asym%C3%A9trique) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Le plus souvent, il s'agit d'un certificat signé par un [intermédiaire](#def-intermediate), valable pour un ensemble de domaines et ne pouvant pas signer d'autres certificats. C'est le type de certificat que les [clients ACME](#def-ACME-client) demandent, et que les [serveurs web](#def-web-server) utilisent. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} L'[Autorité de Certification](#def-CA) gérée par l'[ISRG](#def-ISRG). [Wikipedia](https://fr.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Lorsqu'une page web HTTPS charge des sous-ressources (Javascript, CSS ou images) via HTTP. Les [navigateurs](#def-web-browser) peuvent bloquer les contenus mixtes, ou marquer la page comme étant moins sûre en présence de contenus mixtes : https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. Pour résoudre un problème de contenu mixte, un développeur web doit modifier ses pages afin que toutes les ressources utilisent des URL HTTPS. [Les outils de développement](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) intégrés aux navigateurs peuvent être utilisés pour déterminer quelles ressources sont à l'origine de problèmes de contenu mixte. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} Une méthode pour vérifier le statut de [révocation](#def-revocation) d'un [certificat](#def-leaf). En d'autres termes, un moyen de vérifier si une [Autorité de Certification](#def-CA) indique que le certificat ne doit plus être considéré comme valable, même si sa date d'expiration n'est pas encore atteinte. Cette requête peut créer des problèmes de confidentialité car elle permet à l'Autorité de Certification, et aux fournisseurs de services Internet, d'observer directement qui visite quels sites. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Une extension de [certificat](#def-leaf), informant le [navigateur](#def-web-browser) que le [serveur web](#def-web-server) avec ce certificat doit utiliserl'[OCSP stapling](#def-OCSP-stapling). Il est utilisé pour exiger qu'un statut de [révocation](#def-revocation) du [certificat](#def-leaf) soit confirmé par le serveur web à chaque connexion, ce qui rend la révocation plus fiable. [Let's Encrypt](#def-LE) peut délivrer des certificats avec l'[extension](#def-extension) OCSP Must-Staple sur demande. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Un moyen pour un [serveur web](#def-web-server) d'envoyer à un [navigateur](#def-web-browser) une réponse [OCSP](#def-OCSP)  ignée par l'[Autorité de Certification](#def-CA), de sorte que le navigateur lui-même n'a pas besoin de faire une demande OCSP secondaire à l'AC, ce qui améliore la vitesse et la confidentialité. Également connu sous le nom de TLS Certificate Status Request extension. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} Les OID sont des identificateurs numériques uniques normalisés par l'Union Internationale des Télécommunications (ITU) et l'ISO/CEI. Les OID sont utilisés dans les certificats pour définir des extensions, des champs ou des "policy assertions". Les normes Internet et les documents "[Politique de Certification](#def-CP)" et "[Déclaration sur les pratiques de certification](#def-CPS)" définissent l'utilisation de l'OID. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certificats pour lesquels l'[AC](#def-CA) a vérifié l'entité juridique du [Souscripteur](#def-subscriber). Ils contiennent des informations sur cette entité. [Let's Encrypt](#def-LE) ne propose pas de certificats OV. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}}  Un format pour les informations cryptographiques (spécifié à l'origine dans le cadre des normes internet Privacy Enhanced Mail pour le courrier électronique sécurisé). Un document PEM peut représenter des informations telles qu'une clé privée, une clé publique ou un certificat numérique. Ces fichiers commencent par "-\-\-\--BEGIN " et ensuite un type de données. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} Un fichier qui peut contenir un [certificat "leaf"](#def-leaf), sa [chaîne](#def-chain) jusqu'à la racine et la clé privée du certificat "leaf". Voir aussi https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Les pré-certificats font partie de "[Certificate Transparency](#def-CT)". Un pré-certificat est une copie du [certificat](#def-leaf) qu'une AC a l'intention de délivrer, avec une extension ["critical"](#def-critical) ajoutée pour empêcher que le pré-certificat ne soit accepté par les logiciels. Une AC soumet un pré-certificat aux [journaux de "Certificate Transparency"](#def-CT-log) en échange des [SCT](#def-SCT). Étant donné qu'un pré-certificat n'est pas identique à son certificat correspondant, les journaux de "Certificate Transparency" peuvent finir par contenir les deux. [RFC 6962 Section 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Un mécanisme de sécurité qui demande à un navigateur d'exiger que la [chaîne de certificats d'un site](#def-chain) utilise certaines clés publiques lors de chargements futurs. Chrome a introduit ce mécanisme pour se protéger contre les Autorités de Certification compromises, mais il a causé des pannes de site, ce qui a conduit Chrome à [ le déprécier et à le supprimer](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} Une liste de *suffixes publics* maintenue par Mozilla, indiquant quels domaines Internet sont disponibles pour de nombreuses entités distinctes afin d'enregistrer des sous-domaines. Par exemple, la liste indique que `com` et `co.uk` sont tous deux des suffixes publics même si `co.uk` n'est pas un Top-Level Domain (TLD). Les navigateurs web utilisent cette liste, entre autres, pour empêcher les sites qui sont probablement exploités par différentes entités de partager des cookies web entre eux. [Let's Encrypt](#def-LE) utilise également la liste pour le respect des limites d'utilisation : [/rate-limits](/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} La personne qui s'appuie sur les informations contenues dans un certificat. Par exemple, une personne qui visite un site web HTTPS est "Relying Party". {{% /def %}}

{{% def id="revocation" name="Revocation" %}} Un certificat est valable jusqu'à sa date d'expiration, sauf si le [AC](#def-CA) indique qu'il a été révoqué. Le certificat peut être révoqué pour diverses raisons telles que la compromission de la clé privée. Les navigateurs peuvent vérifier si un certificat est révoqué en utilisant [CRL](#def-CRL), [OCSP](#def-OCSP), ou des méthodes plus récentes comme [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) and [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Notez que dans de nombreuses situations, la [révocation ne fonctionne pas](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} Un certificat [auto-signé](#def-self-signed) contrôlé par une [Autorité de Certification](#def-CA), utilisé pour signer ses certificats [intermédiaires](#def-intermediate) et inclus dans les [magasins de certificats](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Les règles qu'une organisation utilise pour décider des certificats à inclure dans son [magasin de certificats](#def-store), et donc des AC auxquelles leur logiciel fait confiance. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Un algorithme à clé publique utilisé pour le cryptage et pour signer numériquement des certificats. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Un certificat signé par sa propre clé privée, avec son [sujet](#def-subject) égal à son [émetteur](#def-issuer). Les certificats auto-signés ne sont fiables qu'en raison de dispositions préalables prises dans le monde physique, telles que l'inclusion dans une [liste root de confiance](#def-store). [Les certificats racine](#def-root) sont auto-signés. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Un champ qu'un [user agent](#def-user-agent) envoie à un [serveur](#def-web-server) lors d'un [TLS](#def-TLS) handshake, en spécifiant le nom de domaine auquel se connecter. Cela permet au serveur de répondre avec le [certificat](#def-leaf) approprié lorsque plusieurs domaines sont hébergés derrière la même IP. Le serveur web peut envoyer un certificat différent et afficher un contenu différent, en fonction du nom que le client a demandé à la SNI. Le SNI n'est pas crypté, mais un autre système expérimental, l'ESNI, l'est. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Une promesse signée et vérifiable de publier un certificat, à partir du ["Certificate Transparency log"](#def-CT-log). Les navigateurs qui appliquent le [CT](#def-CT) vérifient la présence de SCT dans le certificat d'un site, ou dans le [TLS](#def-TLS) handshake, et refusent de se connecter aux sites qui ne répondent pas à leurs exigences en matière de journalisation. Cela augmente la probabilité que des certificats frauduleux ou inexacts soient détectés. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Un ancien nom pour [TLS](#def-TLS), toujours utilisé couramment. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) fournit une API de pré-production pour tester la demande de certificat sans impacter les limites d'utilisation. Les certificats générés par l'environnement de pré-production n'ont *pas de confiance publique* . L'environnement de pré-production doit être utilisé à des fins de test, de débogage et de développement du client ACME. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} Le champ d'un [certificat](#def-leaf) qui indique pour quel(s) domaine(s) le certificat est valable. Il remplace l'utilisation du [Common Name](#def-CN), qui est désormais fourni uniquement pour des raisons de compatibilité. Un seul certificat peut contenir plusieurs Noms Alternatifs du Serveur (SAN) et être valable pour de nombreux noms de domaine différents. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} La personne ou l'organisation qui demande un certificat. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Le niveau le plus élevé dans le système hiérarchique des noms de domaine, comme les domaines de premier niveau de code pays (ccTLD) tels que `.de` (Germany), `.cn` (China) et les domaines génériques de premier niveau (gTLDs) comme `.com`, `.org`. [Wikipedia](https://fr.wikipedia.org/wiki/Domaine_de_premier_niveau) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} Le protocole utilisé par HTTPS pour crypter et authentifier les visites de pages web. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} La partie de [DANE](#def-DANE) spécifiquement liée à la validation des connexions [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Une description d'un certificat contenant plusieurs [Subject Alternative Names (SANs)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} Un [agent](#def-user-agent) utilisé pour afficher des pages web. Exemples : *Mozilla Firefox*, *Google Chrome* ou *Safari*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Logiciel capable de communiquer avec un [serveur web](#def-web-server). Exemple: [Navigateur web](#def-web-browser) ou [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Logiciel servant les pages web (ou, par extension, le serveur matériel qui l'héberge). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Certificats valables pour les sous-domaines d'un degré de profondeur. Par exemple, un certificat contenant un [SAN](#def-SAN) pour `*.example.com` est valable pour `blog.example.com` et `www.example.com` mais **pas** pour `bork.bork.example.com` ou `example.com`). Un caractère générique est indiqué par un astérisque (*) à la place d'un sous-domaine. [Let's Encrypt](#def-LE) [fournit des certificats Wildcard à partir de mars 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} La norme définissant le format des certificats de clé publique. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
