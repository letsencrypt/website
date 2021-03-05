---
title: Glossaire
slug: glossary
top_graphic: 1
date: 2018-12-30
---

{{< lastmod >}}

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

{{% def id="AIA" name="Accès aux Informations de l'Autorité" abbr="AIA" english="Authority Information Access"%}} Une [extension](#def-extension) de certificat  utilisée pour indiquer à  [l'agent utilisateur](#def-user-agent) comment obtenir des informations à propos de l'émetteur du [certificat](#def-certificate). Typiquement il indique l'URI de [l'OCSP](#def-OCSP) et [l'URI de l'émetteur](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Environnement de gestion automatique de certificat" abbr="ACME" abbr_first="1" english="Automatic Certificate Management Environment"%}} Protocole conçu par [Let's Encrypt](#def-LE). Les logiciels compatbles avec ce protocole peuvent l'utiliser pour communiquer avec Let's Encrypt dans le but de demander un [certificat](#def-leaf). [RFC de l'ACME](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="Client ACME" english="ACME Client" %}} Un programme capable de communiquer avec un serveur pour demander un [certificat](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="Serveur ACME" english="ACME Server" %}} Un serveur compatible avec le protocole ACME qui peut générer des [certificats](#def-leaf). Le logiciel [Boulder](#def-boulder) de Let's Encrypt, est compatible avec ACME, [à quelques divergences près](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} Le logiciel implémentant le protocole ACME, développé et utilisé par [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Exigences de bases" abbr="BRs" english="Baseline Requirements" %}} Un ensemble d'exigences techniques et stratégiques pour les Autorités de Certification. Étant donné que tous les principaux [Programmes Racine](#def-root-program) intègrent les exigences de base, les autorités de certification doivent respecter ces exigences pour être approuvées par la plupart des navigateurs. {{% /def %}}

{{% def id="CAA" name="Autorisation d'autorité de certification" abbr="CAA" abbr_first="1" english="Certificate Authority Authorization"%}} Un enregistrement DNS qui spécifie les  [Autorités de Certification (AC)](#def-CA) qui sont autorisée à émettre un certificat pour le nom de domaine correspondant. Les enregistrments de type CAA sont vérifiés par les AC et non par les navigateurs. [Let's Encrypt](#def-LE) [respecte les enregistrements CAA](/docs/caa) conformément aux [Exigences de base](#def-BRs). - [Wikipédia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Enregistrement de nom canonique" abbr="CNAME" english="Canonical Name record"%}} Une entrée DNS qui mappe un nom de domaine à un autre est appelée Nom Canonique. [Wikipédia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Autorité de Certification" abbr="CA" english="Certificate Authority"%}} Une organisation qui émet des [certificats](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo et DigiCert sont des autorités de certification. [Wikipédia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="Emetteurs de l'AC" english="CA Issuers" %}} Partie du champ [AIA](#def-AIA) contenant des informations sur l'émetteur du certificat. Cela peut être utile lorsque le [serveur Web](#def-web-server) n'a pas fourni de [chaîne de certificats](#def-chain) de confiance. {{% /def %}}

{{% def id="certificate" name="Certificat" english="Certificate" %}} Un fichier dans un [format particulier](#def-X509) qui contient une clef publique et d'autres données décrivant quand utiliser cette clef publique. Le type de certificat le plus courant est un [certificat feuille](#def-leaf). Il existe également des certificats [intermédiaires](#def-intermediate) et [racine](#def-root). {{% /def %}}

{{% def id="extension" name="Extension de certificat" english="Certificate extension" %}} Dans les certificats, la plupart des champs sont définis par des extensions. Par exemple, [Nom Alternatif de Sujet](#def-SAN) et [AIA](#def-AIA) sont des extensions. Le mécanisme d'extension permet de créer de nouveaux champs ne faisaient pas partie de la norme [X.509](#def-X509) d'origine. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Association composée d'autorités de certification, de fournisseurs de logiciels de navigation Internet, de systèmes d'exploitation et autres applications PKI-compatibles. Le "CA/Browser Forum" publie les [exigences de base](#def-BRs). [Let's Encrypt](#def-LE) est membre du "CA/Browser Forum". [Wikipédia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Chaîne de certificats" english="Certificate chain" %}} Liste de [certificats intermédiaires](#def-intermediate) qui aident un [agent utilisateur](#def-user-agent) à déterminer si il peut approuver un certificat d'entité finale ou un [certificat feuille](#def-leaf), en le connectant à un [certificat racine](#def-root) dans son [magasin de certificats](#def-store). Remarque: la chaîne n'est pas toujours unique et lorsqu'un site Web présente une chaîne de certificats menant à une racine, l'agent utilisateur peut décider d'utiliser une autre chaîne pour valider le certificat.  [Wikipédia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Politique de certifcation (PC)" abbr="CP" english="Certificate Policy" %}} Un ensemble nommé de règles qui indiquent l'applicabilité d'un certificat à une communauté particulière et/ou à une classe d'applications ayant des exigences de sécurité communes. Les détails spécifiques de l'émission sont décrits dans un [EPC (Anglais :CPS)](#def-CPS). [Politique de certifcation de l'ISRG](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipédia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Énoncé des Pratiques de Certification (EPC)" abbr="CPS" english="Certification Practice Statement" %}} Un énoncé des pratiques qu'une autorité de certification emploie pour émettre, gérer, révoquer et renouveler les certificats ou re-générer une nouvelle paire de clefs. [Énoncé des Pratiques de Certification de l'ISRG](/repository#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipédia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Extension critique" english="Critical extension" %}} Un certificat peut contenir des [extensions](#def-extension) marquées «critique». Cela signifie que le logiciel doit rejeter ce certificat à moins qu'il ne comprenne comment traiter cette extension. Cela permet d'introduire de nouvelles extensions importantes pour la sécurité sans créer de risques pour les logiciels plus anciens. {{% /def %}}

{{% def id="CRL" name="Liste de révocations de certificats (LRC)" abbr="CRL" english="Certificate Revocation List" %}} Une méthode pour informer les [agents utilisateurs](#def-user-agent) du statut de [révocation](#def-revocation) d'un [certificat](#def-leaf). Il s'agit d'une liste des numéros de série de tous les certificats révoqués d'une autorité de certification donnée, signée par cette autorité de certification. [Wikipédia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Requête de signature de certificat" abbr="CSR" english="Certificate Signing Request" %}} Un fichier signé contenant les informations nécessaires et requises par [l'autorité de certification](#def-CA) pour générer un certificat. Les informations pertinentes pour [Let's Encrypt](#def-LE) sont le [Nom Commun](#def-CN) (anglais: Common Name), les [Noms Alternatifs de Sujet (SAN)](#def-SAN) et les "Subject Public Key Info". Habituellement, les [applications clientes](#def-ACME-client) génèrent automatiquement la CSR pour l'utilisateur, bien qu'un fournisseur d'hébergement Web ou un appareil puisse également générer une CSR. [Wikipédia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Magasin de certificats" english="Certificate Store" %}} Un magasin de certificats contient une liste de [racines](#def-root) approuvées. Les systèmes d'exploitation (tels que Windows, Android ou Debian) et les [navigateurs Web](#def-web-browser) (tels que Firefox) gèrent un magasin de certificats. Les navigateurs sans magasin dépendent du magasin de certificats des systèmes d'exploitation. Les [Certificats](#def-leaf) fournis par [Let's Encrypt](#def-LE) sont [approuvés par la plupart des magasins de certificats](/certificates).{{% /def %}}

{{% def id="subject" name="Sujet du certificat" english="Certificate subject" %}} Le champ «Objet/Sujet» d'un de certificat indique de quoi parle un certificat. Il contient généralement des champs tels que [Nom commun](#def-CN) (anglais: Common Name), Pays et Organisation. {{% /def %}}

{{% def id="CT" name="Transparence des certificats" english="Certificate Transparency" abbr="CT" %}} Pour améliorer la sécurité, les certificats (ou [précertificats](#def-precertificate)) doivent être publiés dans les journaux de transparence des certificats: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) génère et publie des [précertificats](#def-precertificate), et inclut dans le certificat en résultant une liste de [SCT](#def-SCT) du précertificat. Certains [navigateurs](#def-web-browser), comme Google Chrome, contrôlent la présence des SCT pour valider le certificat (le SCT est une promesse d'ajouter le précertificat dans les logs d'ici un laps de temps maximum). [Wikipédia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Journaux de transparence des certificats" english="Certificate Transparency Log" %}} Un composant de la [transparence des certificats](#def-CT) qui accepte les soumissions de certificats et de [précertificats](#def-precertificate) et les intègre dans une liste permanente, vérifiable et accessible au public. {{% /def %}}

{{% def id="CN" name="Nom commun"abbr="CN" english="Common Name" %}} Partie du [sujet](#def-subject) d'un certificat décrivant l'objectif du certificat. Pour les [racines](#def-root) et les [intermédiaires](#def-intermediate), c'est le nom lisible par l'homme de [l'autorité de certification](#def-CA). Pour les [certificats feuilles](#def-leaf), c'est l'un des noms de domaine sur le certificat. Remarque: Le nom commun est limité à 63 caractères. Il s'agit d'une méthode obsolète pour indiquer un nom de domaine auquel le certificat s'applique, car les normes Internet actuelles s'attendent à ce que le logiciel vérifie uniquement les [Noms alternatifs de sujet](#def-SAN) afin de déterminer l'applicabilité d'un certificat. {{% /def %}}

{{% def id="cross-signing" name="Certification croisée" english="Cross Signing" %}} Un certificat d'émission peut être signé par plusieurs [racines](#def-root). Par exemple, les [intermédiaires](#def-intermediate) de [Let’s Encrypt](#def-LE)  sont signés par [IdenTrust](#def-IdenTrust), car au lancement, la racine de Let’s Encrypt n'était pas encore approuvée par les [magasins de certificats](#def-store). Techniquement, cela se fait avec deux certificats émetteurs, utilisant le même [sujet](#def-subject) et la même [paire de clefs](#def-key-pair), l'un signé par la clef privée d'une racine Let’s Encrypt et l'autre signé par la clef privée d'une racine IdenTrust: [/certificats](/certificates). [Wikipédia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} Un mécanisme utilisant DNS pour indiquer comment vérifier l'authenticité du [certificat](#def-leaf) ou de la clef de chiffrement présentée. [Wikipédia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} Un mécanisme d'authentification cryptographique des réponses DNS. DNSSEC nécessite un déploiement par les TLD (Top Level Domain), les propriétaires de noms de domaine et les résolveurs récursifs pour prendre effet. L'adoption est actuellement quelque peu faible. [Wikipédia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Certificat à validation de domaine" abbr="DV" english="Extended Validation" %}} Un [certificat](#def-leaf) où le demandeur a seulement prouvé son contrôle sur le nom de domaine (et non sur l'identité de l'organisation requérante). [Let's Encrypt](#def-LE) ne propose que des certificats DV (pas de [OV](#def-OV) ou [EV](#def-EV)): [FAQ](/docs/faq) - [Wikipédia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} Une variante de l'algorithme de signature numérique (DSA) qui utilise la cryptographie à courbe elliptique. [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) prend en charge ECDSA pour les [certificats d'entité finale ou de feuille](#def-leaf), mais pas encore pour toute la [chaîne](#def-chain):  [/fonctionnalités à venir](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Un type spécifique d'[EdDSA](#def-EdDSA), tout comme Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} Un système de signature à clef publique moderne basé sur des courbes elliptiques, conçu pour résoudre plusieurs [problèmes d'implémentation](https://ed25519.cr.yp.to/) courants avec la cryptographie à courbe elliptique. Les autorités de certification comme [Let's Encrypt](#def-LE) ne peuvent pas encore fournir de certificats EdDSA. [Wikipédia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Un type de cryptographie à clef publique basé sur des courbes elliptiques. ECC utilise des clés plus petites par rapport à la cryptographie non-EC tout en offrant une sécurité équivalente.  [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipédia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Certificat à validation étendue" abbr="EV" english="Extended Validation" %}} Type de validation de certificat pour lequel [l'AC](#def-CA) a vérifié l'entité juridique contrôlant le site Web. Ils contiennent des informations sur cette entité. Les contrôles de [l'AC](#def-CA) sont plus stricts que pour les certificats [OV](#def-OV). [Let's Encrypt](#def-LE) ne propose pas de certificats EV. [Wikipédia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Nom de domaine pleinement qualifié"  abbr="FQDN" english="Fully qualified domain name" %}} Le nom de domaine complet d'un site Web. Par exemple, `www.example.com` est un *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} Une [Autorité de Certification](#def-CA). IdenTrust a réalisé une [certification croisée](#def-cross-signing) avec le [certificat intermédiaire](#def-intermediate) de [Let's Encrypt](#def-LE): [/certificats](/certificates) . [Wikipédia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Certificat intermédiaire" english="Intermediate certificate" %}} Un certificat signé par une [racine](#def-root) ou un autre intermédiaire, et capable de signer d'autres certificats. Ils sont utilisés pour signer les certificats feuilles tout en gardant la clef privée du certificat racine hors ligne. Les intermédiaires sont inclus dans les [chaînes de certificats](#def-chain).  [Wikipédia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Voir [Nom de domaine internationalisé (IDN)](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Nom de domaine internationalisé" abbr="IDN" english="Internationalized Domain Name" %}} Nom de domaine avec des caractères autres que  `a` à `z`, `0` à `9` et le tiret (`-`). Ils peuvent par exemple contenir des caractères arabes, chinois, cyrilliques, tamouls, hébreux ou latins avec des signes diacritiques ou des ligatures. La représentation codée d'un domaine IDN commence par `xn--`. Les IDN sont pris en charge par [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipédia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} L'organisation derrière [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipédia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} Le champ «Émetteur» d'un certificat décrit le certificat qui l'a signé. Par exemple, le champ Émetteur d'un certificat d'entité finale de Let’s Encrypt peut être «Émetteur: C = US, O = Let’s Encrypt, CN = Let’s Encrypt Authority X3». Il contient généralement des champs tels que [Nom commun](#def-CN), Pays et Organisation. Le champ Émetteur correspond toujours au champ [Objet](#def-subject) d'un certificat. Pour les certificats [auto-signés](#def-self-signed) comme la [racine](#def-root), l'émetteur est le même que le sujet. Le terme «émetteur» peut également être utilisé pour indiquer un certificat qui émet d'autres certificats ([intermédiaire](#def-intermediate)  ou racine), ou une organisation qui émet des certificats.{{% /def %}}

{{% def id="key-pair" name="Paire de clefs" english="Key-pair" %}} Combinaison d'une clef privée et d'une clef publique utilisée pour signer ou chiffrer. La clé publique est généralement intégrée dans un certificat, tandis que la clé privée est stockée seule et doit être gardée secrète. Une paire de clefs peut être utilisée pour chiffrer et déchiffrer, pour signer et vérifier des données, ou pour négocier des clés secondaires, selon l'application. [Wikipédia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Certificat feuille (certificat d'entité finale)" english="Leaf certificate (end-entity certificate)" %}} Le plus souvent, un certificat signé par un [intermédiaire](#def-intermediate), valide pour un ensemble de domaines et incapable de signer d'autres certificats. Il s'agit du type de certificat que les [clients ACME](#def-ACME-client) demandent et que les [serveurs Web](#def-web-server) utilisent.  [Wikipédia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [L'Autorité de Certification](#def-CA) opérée  par [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Contenu mixte" exchange="Mixed content" %}} Lorsqu'une page Web HTTPS charge des sous-ressources (Javascript, CSS ou images) via HTTP. Les [navigateurs](#def-web-browser) peuvent bloquer le contenu mixte ou marquer la page comme moins sécurisée lorsqu'un contenu mixte est présent: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. Pour résoudre un problème de contenu mixte, un développeur Web doit modifier ses pages afin que toutes les ressources utilisent des URL HTTPS. Les [outils de développement](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) intégrés aux navigateurs peuvent être utilisés pour déterminer quelles ressources sont à l'origine de problèmes de contenu mixtes. {{% /def %}}

{{% def id="OCSP" name="Protocole de vérification de certificat en ligne" abbr="OCSP" abbr_first="1" english="Online Certificate Status Protocol" %}} Une méthode pour vérifier l'état de [révocation](#def-revocation) d'un [certificat](#def-leaf). En d'autres termes, un moyen de vérifier si une [autorité de certification](#def-CA) indique que le certificat ne doit plus être considéré comme valide, même si sa date d'expiration n'a pas encore été atteinte. Cette demande peut créer des problèmes de confidentialité car elle permet à l'autorité de certification et aux fournisseurs de services Internet d'observer directement qui visite quels sites. [Wikipédia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Une extension de [certificat](#def-leaf), informant le [navigateur](#def-web-browser) que le [serveur Web](#def-web-server) avec ce certificat doit utiliser [l'agrafage OCSP](#def-OCSP-stapling). Il est utilisé pour exiger qu'un état de [révocation](#def-revocation), à jour, du [certificat](#def-leaf) soit confirmé par le serveur Web à chaque connexion, ce qui rend la révocation plus fiable. [Let's Encrypt](#def-LE) peut émettre des certificats avec l'extension OCSP Must-Staple sur demande. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="Agrafage OCSP" english="OCSP stapling" %}} Un moyen pour un [serveur Web](#def-web-server) d'envoyer à un [navigateur](#def-web-browser) une réponse [OCSP](#def-OCSP) signée par [l'autorité de certification](#def-CA), afin que le navigateur lui-même n'ait pas besoin de faire une nouvelle demande auprès de l'OCSP de l'autorité de certification, améliorant ainsi la vitesse et la confidentialité. Également connu sous le nom d'Extension de requête d'état de certificat TLS (anglais: TLS Certificate Status Request Extension). [Wikipédia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Identificateurs d'objet" abbr="OID" english="Object identifier" %}} Les OID sont des identificateurs numériques uniques normalisés par l'Union internationale des télécommunications (UIT) et ISO/IEC. Les OID sont utilisés dans les certificats pour définir des extensions, des champs ou des assertions de stratégie. Les normes Internet, les [politiques de certification](#def-CP) et les [déclarations de pratiques de certification](#def-CPS) définissent l'utilisation de l'OID. [Wikipédia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Certificat à validation d'organisation" abbr="OV" english="Organization Validation" %}} Certificat pour lequel [l'AC](#def-CA) a vérifié l'entité juridique du [Souscripteur](#def-subscriber). Il contient des informations sur cette entité. [Let's Encrypt](#def-LE) n'offre pas de certificats OV [Wikipédia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="Fichier de type PEM (.pem)" english="PEM file (.pem)" %}} Un format pour les informations cryptographiques (initialement spécifié dans le cadre des normes Internet Privacy Enhanced Mail pour le courrier électronique sécurisé). Un document PEM peut représenter des informations telles qu'une clef privée, une clef publique ou un certificat numérique. Ces fichiers commencent par "-\-\-\--BEGIN " puis un type de données. [Wikipédia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}} 

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}}Un fichier qui peut contenir un [certificat feuille](#def-leaf), sa [chaîne](#def-chain) jusqu'à la racine et la clef privée de la feuille. Voir également https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Précertificat" english="Precertificate" %}} Les précertificats font partie de la [transparence des certificats (CT)](#def-CT). Un précertificat est une copie du [certificat](#def-leaf) qu'une autorité de certification a l'intention de délivrer, avec une "extension critique enpoisonnée" (anglais: Critical poison extension) qui y est ajoutée pour empêcher le précertificat d'être accepté par un logiciel. Une autorité de certification soumet un précertificat aux [journaux de CT](#def-CT-log) en échange de [SCT (Signed Certificate Timestamp)](#def-SCT). Puisqu'un précertificat n'est pas identique à son certificat correspondant, les journaux de transparence des certificats peuvent finir par contenir les deux. [RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Mécanisme de sécurité qui demande à un navigateur d'exiger que la [chaîne de certificats](#def-chain) d'un site utilise certaines clefs publiques lors de futurs chargements. Chrome a introduit ce mécanisme pour se protéger contre les autorités de certification compromises, mais il a provoqué des indisponiblitées de sites, ce qui a conduit Chrome à le [déprécier et à le supprimer](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipédia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Liste des suffixes publics" english="Public Suffix List" abbr="PSL" %}} Une liste de *suffixes publics* maintenue par Mozilla, indiquant quels domaines Internet sont disponibles pour de nombreuses entités distinctes afin d'y enregistrer les sous-domaines. Par exemple, la liste indique que `com`  et `co.uk` sont des suffixes publics même si `co.uk` n'est pas un TLD. Les navigateurs Web utilisent la liste, entre autres, pour empêcher les sites qui sont probablement exploités par différentes entités de partager des cookies Web entre eux. [Let's Encrypt](#def-LE) utilise également la liste pour les calculs de limite d'utilisation: [/rate-limits](/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} La personne qui fait confiance à des informations contenues dans un certificat. Par exemple, une personne qui visite un site Web HTTPS est une "relying party" (partie utilisatrice / partie se fiant). {{% /def %}}

{{% def id="revocation" name="Révocation" english="Revocation" %}} Un certificat est valide jusqu'à sa date d'expiration, sauf si l'[autorité de certification](#def-CA) indique qu'il a été révoqué. Le certificat peut être révoqué pour diverses raisons telles que la compromission de la clef privée. Les navigateurs peuvent vérifier si un certificat est révoqué à l'aide de la [CRL](#def-CRL), de [l'OCSP](#def-OCSP) ou de méthodes plus récentes telles que [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) et [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Notez que dans de nombreuses situations, [la révocation ne fonctionne pas](https://www.imperialviolet.org/2011/03/18/revocation.html). [/fr/docs/revoking](/docs/revoking). {{% /def %}}

{{% def id="root" name="Certificat racine" english="Root certificate" english="Root certificate"%}} Un certificat [auto-signé](#def-self-signed) controllé par une [autorité de certification](#def-CA), utilisé pour signer ces certificats  [intermédiaires](#def-intermediate) et inclus dans les [magasins de certificats](#def-store). [Wikipédia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Programmes Racine" english="Root Program"%}} Les stratégies qu'une organisation utilise pour décider quels certificats inclure dans son [magasin de certificats](#def-store), et donc quelles autorités de certification sont approuvées par leur logiciel. {{% /def %}}

{{% def id="RSA" name="RSA - Rivest, Shamir, Adleman" abbr="RSA" %}} Un algorithme à clef publique utilisé pour le chiffrement et pour signer numériquement les certificats. [Wikipédia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Certificat auto-signé" english="Self-signed certificate" %}} Un certificat signé par sa propre clef privée, avec son [sujet](#def-subject) égal à son [émetteur](#def-issuer). Les certificats auto-signés sont approuvés uniquement en raison d'arrangements antérieurs pris dans le monde physique, tels que l'inclusion dans une [liste de racines approuvées](#def-store) (de confiance). Les [certificats racine](#def-root) sont auto-signés.  [Wikipédia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Indication du nom du server" english="Server Name Indication" abbr="SNI" %}} Champ qu'un [agent utilisateur](#def-web-server) envoie à un [serveur](#def-web-server) lors d'une négociation [TLS](#def-TLS), spécifiant le nom de domaine auquel se connecter. Cela permet au serveur de répondre avec le [certificat](#def-leaf) approprié lorsque plusieurs domaines sont hébergés derrière la même adresse IP. Le serveur Web peut envoyer un certificat différent et afficher un contenu différent, selon le nom que le client a demandé par SNI. Le SNI n'est pas chiffré, mais un remplacement expérimental, ESNI, l'est. [Wikipédia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Une promesse signée et vérifiable de publier un certificat, à partir d'un [journal de transparence de certificat (anglais: CT Log)](#def-CT-log). Les navigateurs qui appliquent le contrôle du [Certificate Transparency (CT)](#def-CT) vérifient la présence de SCT dans le certificat d'un site ou dans la négociation [TLS](#def-TLS) et refusent de se connecter à des sites qui ne répondent pas aux exigences de journalisation. Cela augmente la probabilité de détection de certificats frauduleux ou inexacts. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Un nom plus ancien pour [TLS](#def-TLS), toujours utilisé couramment. {{% /def %}}

{{% def id="staging" name="Qualification" english="Staging" %}} [Let's Encrypt](#def-LE) fournit une API de qualification afin de tester les demandes de certificat sans  impacter les limites d'utilisation. Les certificats générés par l'environnement de qualification *ne sont pas* reconnus comme fiables publiquement. L'environnement de qualification être réservé à des tests, de la correction d'erreurs, et du développement de clients ACME. [/fr/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Nom Alternatif de Sujet" abbr="SAN" english="Subject Alternative Name"%}} Le champ d'un [certificat](#def-leaf) qui indique pour quel(s) domaine(s) le certificat est valide. Il remplace l'utilisation du [Nom Commun (CN)](# def-CN), qui est désormais fourni uniquement pour des raisons de compatibilité. Un même certificat peut contenir de nombreux SAN et être valide pour de nombreux noms de domaine différents. [Wikipédia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) [/fr/docs/rate-limits/#names-per-certificate](/docs/rate-limits/#names-per-certificate) {{% /def %}}

{{% def id="subscriber" name="Souscripteur" english="Subscriber"%}} La personne ou l'organisation demandant un certtificat. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Niveau le plus élevé du système de noms de domaine hiérarchique, tel que les domaines de premier niveau nationaux (ccTLD) comme `.de` (Allemagne), `.cn` (Chine) et les domaines génériques de premier niveau (gTLD) comme `.com`, `.org`. [Wikipédia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} Protocole utilisé par HTTPS pour chiffrer et authentifier les consultations de pages Web. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} La fonction du mécanisme [DANE](#def-DANE) spécifiquement liée à la validation des connexions [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Description d'un certificat contenant plusieurs [noms alternatifs de sujet (SAN)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Navigateur internet" english="Web Browser" %}} Un [agent utilisateur](#def-user-agent) utilisé pour afficher des pages web. Exemples: *Mozilla Firefox*, *Google Chrome* ou *Internet Explorer*. [Wikipédia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="Agent utilisateur" english="User Agent" %}} Logiciel capable de communiquer avec un [serveur web](#def-web-server). Exemple: un [navigateur web](#def-web-browser) ou [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Serveur web" english="Web server" %}} Logiciel fournissant des pages web (ou, par extension, le serveur matériel qui l'héberge).  [Wikipédia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Certificat générique ou omni-domaine" english="Wildcard Certificate" %}} Certificats valides pour les sous-domaines d'une profondeur de un niveau. Par exemple, un certificat contenant un [SAN](#def-SAN) pour `*.example.com` est valide pour `blog.example.com` et `www.example.com` mais **pas** pour `bork.bork.example.com` ou `example.com`). Un certificat "générique" est indiqué par le caractère asterisque (*) à la place d'un sous-domaine. [Let's Encrypt](#def-LE) [fournit des certificats Wildcard à partir de mars 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipédia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} Le standard définissant le format des certificats à clef publique. [Wikipédia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
