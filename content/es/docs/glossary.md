---
title: Glosario
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} Una [extensión](#def-extension) del certificado utilizado para indicar a los [agentes de usuario](#def-user-agent) cómo obtener información sobre el emisor del [certificado](#def-certificate). Por lo general, especifica el URI [OCSP](#def-OCSP) y el [URI del emisor](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} Protocolo implementado por [Let's Encrypt](#def-LE). Software compatible con este protocolo que puede usar para comunicarse con Let's Encrypt a la hora de solicitar un [certificate](#def-leaf). [ACME drafts](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} Un programa capaz de comunicarse con un servidor ACME para solicitar un [certificate](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} Un servidor compatible con ACME que puede generar [certificates](#def-leaf). El software , [Boulder](#def-boulder), es compatible con ACME, [con algunas diferencias](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} El software que implementa ACME, desarrollado y utilizado por [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} Un conjunto de requisitos técnicos y de políticas para las AC. Dado que todos los principales [programas raíz](#def-root-program) incorporan los Requisitos de línea de base, la mayoría de los navegadores deben cumplir con estos requisitos. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} Un registro DNS que especifica qué [CA](#def-CA) pueden emitir un certificado para el nombre de dominio correspondiente. Los registros de CAA son verificados por las CA, no por los navegadores. [Let's Encrypt](#def-LE) [honors CAA records](/docs/caa) según lo requerido por los [Baseline Requirements](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} Una entrada DNS que asigna un nombre de dominio a otro, conocido como el Nombre canónico. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} Una organización que emite [certificados](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, and DigiCert son autoridades de certificación. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Parte del campo [AIA](#def-AIA) que contiene información sobre el emisor del [certificado](#def-leaf). Puede ser útil cuando el [servidor web](#def-web-server) no proporciona una [cadena de certificados](#def-chain) confiable. {{% /def %}}

{{% def id="certificate" name="Certificate" %}} Un archivo en un [formato particular](#def-X509) que contiene una clave pública y otros datos que describen cuándo usar esa clave pública. El tipo de certificado más común es un [certificado de hoja](#def-leaf). También hay certificados [intermedios](#def-intermediate) y [raíz](#def-root). {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} En los certificados, la mayoría de los campos están definidos por extensiones. Por ejemplo, [Nombres alternativos de sujeto](#def-SAN) y [AIA](#def-AIA) son extensiones. El mecanismo de extensión permite crear nuevos campos que no formaban parte del estándar original [X.509](#def-X509). {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} Un grupo voluntario de autoridades de certificación, proveedores de software de navegador de Internet, sistemas operativos y otras aplicaciones habilitadas para PKI. El CA/Browser Forum publica los [Requisitos de línea de base](#def-BRs). [Let's Encrypt](#def-LE) es miembro del Foro de CA/Browser. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} Una lista de [certificados intermedios](#def-intermediate) que ayudan a un [agente de usuario](#def-user-agent) a determinar que puede confiar en una entidad final o [certificado de hoja](#def-leaf), conectándolo a un [certificado raíz](#def-root) en su [almacén de certificados](#def-store). Nota: la cadena no siempre es única y cuando un sitio web presenta una cadena de certificados que conduce a una raíz, el agente de usuario puede decidir usar otra cadena para validar el certificado. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} Un conjunto de reglas que indica la aplicabilidad de un certificado a una comunidad o clase de aplicaciones en particular con requisitos de seguridad comunes. Los detalles específicos de la emisión se resumen en un [CPS](#def-CPS). [ISRG Certificate Policy](/repository#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} La declaración de las prácticas que una autoridad de certificación emplea en la emisión, gestión, revocación y renovación o re-codificación de certificados. [ISRG Certification Practice Statement](/repository#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} Un certificado puede contener [extensiones](#def-extension) marcadas como "críticas". Esto significa que el software debe rechazar ese certificado a menos que el software comprenda cómo procesar esa extensión. Esto permite introducir nuevas extensiones que son importantes para la seguridad sin crear riesgos para el software anterior. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} Un método para informar a [agentes de usuario](#def-user-agent) sobre el estado de [revocación](#def-revocation) de un [certificado](#def-leaf). Esta es una lista de los números de serie de todos los certificados revocados de una CA determinada, firmada por esa CA. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} Un archivo firmado que contiene la información necesaria requerida por [CA](#def-CA) para generar un certificado. La información relevante para [Let's Encrypt](#def-LE) son [Nombre común](#def-CN), [Nombres alternativos de sujeto](#def-SAN) e Información de clave pública del sujeto. Por lo general, [aplicaciones de cliente](#def-ACME-client) generan automáticamente la CSR para el usuario, aunque un proveedor o dispositivo de alojamiento web también puede generar un CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} Un almacén de certificados contiene una lista de [certificados raíz de confianza](#def-root). Los sistemas operativos (como Windows, Android o Debian) y [navegadores web](#def-web-browser) (como Firefox) mantienen un almacén de certificados. Los navegadores sin uno dependen del almacén de certificados de los sistemas operativos. Los [Certificados](#def-leaf) proporcionados por [Let's Encrypt](#def-LE) son [confiables por la mayoría de las tiendas de certificados](/certificates). {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} El campo "Asunto" de certificado indica de qué trata un certificado. Esto comúnmente contiene campos como [Nombre común](#def-CN), País y Organización. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} Para mejorar la seguridad, los certificados (o [precertificados](#def-precertificate)) deben publicarse en los registros de transparencia de certificados: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) genera y publica [precertificados](#def-precertificate) e incluye en el [certificado](#def-leaf) posterior una lista de [SCT](#def-SCT) para el precertificado. Algunos [navegadores](#def-web-browser), como Google Chrome, requieren la presencia de esta premisa verificable para validar el certificado. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} Un componente de [Transparencia de certificado](#def-CT) que acepta envíos de certificados y [precertificados](#def-precertificate) y los incorpora a una lista permanente, verificable y de acceso público. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Parte del [Asunto](#def-subject) de un certificado que describe de qué trata el certificado. Para [raíces](#def-root) e [intermedios](#def-intermediate) es el nombre legible por humanos de la [autoridad de certificación](#def-CA). Para [certificados](#def-leaf) es uno de los nombres de dominio en el certificado. Nota: El nombre común está limitado a 63 caracteres. Es un método obsoleto para indicar un nombre de dominio al que se aplica el certificado, ya que los estándares actuales de Internet esperan que el software verifique solo los [Nombres alternativos del sujeto](#def-SAN) para determinar la aplicabilidad de un certificado. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} Un certificado de emisión puede ser firmado por más de una [raíz](#def-root). Por ejemplo, [Let's Encrypt](#def-LE) [intermedios](#def-intermediate) están firmados de forma cruzada por [IdenTrust](#def-IdenTrust), porque en el lanzamiento la raíz Let's Encrypt aún no era confiable para [los almacenes de certificados](#def-store). Técnicamente, se logra con dos certificados de emisión, utilizando el mismo [Asunto](#def-subject) y el mismo [Key-pair](#def-key-pair), uno firmado por la clave privada de una raíz Let's Encrypt y el otro firmado por la clave privada de la raíz de IdenTrust: [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} Un mecanismo que utiliza DNS para indicar cómo verificar la autenticidad del [certificado](#def-leaf) o la clave de cifrado presentada.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} Un mecanismo para autenticar criptográficamente las respuestas DNS. DNSSEC requiere la implementación por parte del registrador del dominio y solucionadores recursivos para que surta efecto. La adopción es actualmente algo baja. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} Un [certificado](#def-leaf) donde el solicitante solo ha demostrado su control sobre el nombre de dominio (y no la identidad de la organización solicitante). [Let's Encrypt](#def-LE) ofrece solo certificados DV (no [OV](#def-OV) o [EV](#def-EV)): [FAQ](/docs/faq) - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} Una variante del algoritmo de firma digital (DSA) que utiliza una curva elíptica criptografía . [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) admite ECDSA para [certificados de entidad final](#def-leaf), pero aún no para toda la [cadena](#def-chain): [/upcoming-features](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Un tipo específico de [EdDSA](#def-EdDSA), junto con Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}  Un moderno sistema de firma de clave pública basado en curvas elípticas, diseñado para resolver varios [problemas de implementación](https://ed25519.cr.yp.to/)  comunes con criptografía de curva elíptica. Las autoridades de certificación como [Let's Encrypt](#def-LE) aún no pueden proporcionar certificados EdDSA. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} Un tipo de criptografía de clave pública basada en curvas elípticas. ECC usa claves más pequeñas en comparación con la criptografía que no es de EC mientras proporciona seguridad equivalente. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Un tipo de validación de certificado para el cual [CA](#def-CA) ha verificado la entidad legal que controla el sitio web. Contienen información sobre esa entidad. Los controles desde [CA](#def-CA) son más estrictos que para los certificados [OV](#def-OV). [Let's Encrypt](#def-LE) no ofrece certificados EV. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} El nombre de dominio completo de un sitio web. Por ejemplo, `www.example.com` es un *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} A [Certificate Authority](#def-CA). IdenTrust tiene [firma cruzada](#def-cross-signing) [Let's Encrypt](#def-LE) [intermediate certificates](#def-intermediate): [/certificates](/certificates). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} Un certificado firmado por una [raíz](#def-root) u otro intermediario y capaz de firmar otros certificados. Se utilizan para firmar certificados manteniendo la clave privada del certificado raíz fuera de línea. Los intermedios se incluyen en [cadenas de certificados](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} Vea [internationalized domain name](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Nombre de dominio con caracteres distintos de `a` a `z`, `0` a `9` y el guión (`-`). Por ejemplo, pueden contener caracteres basados en el alfabeto árabe, chino, cirílico, tamil, hebreo o latino con signos diacríticos o ligaduras. La representación codificada de un dominio IDN comienza con `xn -`. Los IDN son compatibles con [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} Es la organización que hay trás [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} El campo "Emisor" de un certificado describe qué emisor lo firmó. Por ejemplo, el campo Emisor de un certificado de entidad final Let's Encrypt podría ser "Emisor: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". Comúnmente contiene campos como [Nombre común](#def-CN), País y Organización. El campo Emisor siempre coincide con el campo [Asunto](#def-subject) de algún certificado. Para los certificados [autofirmados](#def-self-signed) como [root](#def-root), el Emisor es el mismo que el Asunto. El término "emisor" también puede usarse para indicar un certificado que emite otros certificados (un [intermedio](#def-intermediate) o raíz), o una organización que emite certificados.{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} Una combinación de una clave privada y una clave pública utilizada para firmar o cifrar. La clave pública se incrusta comúnmente en un certificado, mientras que la clave privada se almacena por sí sola y debe mantenerse en secreto. Se puede usar un par de claves para cifrar y descifrar, para firmar y verificar datos, o para negociar claves secundarias, según la aplicación. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Generalmente un certificado firmado por un [intermedio](#def-intermediate), válido para un conjunto de dominios y no puede firmar otros certificados. Este es el tipo de certificado que solicitan [clientes ACME](#def-ACME-client) y que usan [servidores web](#def-web-server).[Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} The [Certificate Authority](#def-CA) operado por [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} Cuando una página web HTTPS carga recursos secundarios (Javascript, CSS o imágenes) a través de HTTP. Algunos [Navegadores](#def-web-browser) pueden bloquear contenido o marcar la página como menos segura cuando hay contenido mixto: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content . Para solucionar un problema de contenido mixto, un desarrollador web debe cambiar sus páginas para que todos los recursos usen URL HTTPS. Existen [Herramientas para desarrolladores](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) integrados en los navegadores se pueden usar para descubrir qué recursos están causando problemas de contenido mixto. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} Un método para verificar el estado de [revocación](#def-revocation) de un [certificado](#def-leaf). En otras palabras, una forma de verificar si una [Autoridad de certificación](#def-CA) indica que el certificado ya no debe considerarse válido, a pesar de que aún no se ha alcanzado su fecha de vencimiento. Esta solicitud puede crear problemas de privacidad porque permite que la autoridad de certificación y los proveedores de servicios de Internet observen directamente quién visita qué sitios. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} Una extensión del [certificado](#def-leaf) que informa al [navegador](#def-web-browser) que el [servidor web](#def-web-server) con ese certificado debe usar [grapado OCSP](#def-OCSP-stapling). Se utiliza para exigir que el servidor web confirme un estado actualizado de [revocación](#def-revocation) del [certificado](#def-leaf) en cada conexión, haciendo que la revocación sea más confiable. [Let's Encrypt](#def-LE) puede emitir certificados con la [extensión](#def-extension) OCSP Must-Staple a petición. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} Método por el cuál un [servidor web](#def-web-server) envíe un a un [navegador](#def-web-browser) una respuesta [OCSP](#def-OCSP) firmada por la [Autoridad de certificación](#def-CA), por lo que el navegador en sí no necesita realizar una solicitud OCSP secundaria a la CA, lo que mejora la velocidad y la privacidad. También conocida como extensión de solicitud de estado de certificado TLS. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} Los OID son identificadores numéricos únicos estandarizados por la Unión Internacional de Telecomunicaciones (UIT) e ISO / IEC. Los OID se utilizan dentro de los certificados para definir extensiones, campos o afirmaciones de políticas. Los estándares de Internet y los documentos de [Política de certificados](#def-CP) y [Declaración de práctica de certificación](#def-CPS) definen el uso de OID. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certificados para los cuales [CA](#def-CA) ha verificado la entidad jurídica del [Suscriptor](#def-subscriber). Contienen información sobre esa entidad. [Let's Encrypt](#def-LE) no ofrece certificados OV. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}}  Un formato para la información criptográfica (originalmente especificado como parte de los estándares de Internet de privacidad mejorada para correo electrónico seguro). Un documento PEM puede representar información como una clave privada, una clave pública o un certificado digital. Estos archivos comienzan con "-\-\-\- BEGIN" y luego con un tipo de datos. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} Un archivo que puede contener un [certificado](#def-leaf), su [cadena](#def-chain) hasta la raíz y la clave privada. Ver también https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Los precertificados son parte de la [Transparencia de certificado](#def-CT). Un precertificado es una copia del [certificado](#def-leaf) que una CA tiene la intención de emitir, con una extensión de veneno [crítica](#def-critical) agregada para evitar que el precertificado sea aceptado por el software en la naturaleza. Una CA envía un precertificado a [registros de CT](#def-CT-log) a cambio de [SCTs](#def-SCT). Dado que un precertificado no es idéntico a su certificado correspondiente, los registros de Transparencia de certificados pueden terminar conteniendo ambos. [RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} Un mecanismo de seguridad que le pide a un navegador que requiera que la [cadena de certificados](#def-chain) de un sitio use ciertas claves públicas en futuras cargas. Chrome introdujo este mecanismo para proteger contra compromisos de CA, pero causó interrupciones en el sitio, lo que llevó a Chrome a [desaprobarlo y eliminarlo](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} Una lista de *Sufijos públicos* mantenida por Mozilla, que indica qué dominios de Internet están disponibles para diferentes entidades para registrar subdominios. Por ejemplo, la lista indica que tanto `com` como `co.uk` son sufijos públicos a pesar de que `co.uk` no es un TLD. Los navegadores web utilizan la lista, entre otras cosas, para evitar que los sitios que probablemente sean operados por diferentes entidades compartan cookies web entre sí. [Let's Encrypt](#def-LE) también usa la lista para los cálculos de límite de solicitudes: [/rate-limits](/rate-limits). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} La persona que depende de la información en un certificado. Por ejemplo, alguien que visita un sitio web HTTPS es una parte confiable. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} Un certificado es válido hasta su fecha de vencimiento, a menos que la [CA](#def-CA) indique que ha sido revocado. El certificado puede ser revocado por varias razones, como el compromiso de la clave privada. Los navegadores pueden verificar si un certificado ha sido revocado utilizando [CRL](#def-CRL), [OCSP](#def-OCSP) o métodos más nuevos como [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) and [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Nota: algunas situaciones, [la revocación no funciona](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" name="Root certificate" %}} A [self-signed](#def-self-signed) certificado controlado por una [autoridad de certificación](#def-CA), utilizado para firmar sus certificados [intermedio](#def-intermediate) e incluido en [almacenes de certificados](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} Las políticas que utiliza una organización para decidir qué certificados incluir en su [almacén de certificados](#def-store) y establecer qué CA confían su software. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} Un algoritmo de clave pública utilizado para el cifrado y para firmar digitalmente certificados. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} Un certificado firmado por su propia clave privada, con su [Asunto](#def-subject) igual a su [Emisor](#def-issuer). Los certificados autofirmados solo son confiables debido a arreglos previos realizados en el mundo físico, como la inclusión en una [lista raíz confiable](#def-store). Los [certificados raíz](#def-root) están autofirmados. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} Un campo que un [agente de usuario](#def-user-agent) envía a un [servidor](#def-web-server) durante un protocolo de enlace [TLS](#def-TLS), especificando el nombre de dominio para conectarse . Esto permite que el servidor responda con el [certificado](#def-leaf) apropiado cuando varios dominios están alojados detrás de la misma IP. El servidor web podría enviar un certificado diferente y mostrar contenido diferente, dependiendo del nombre que el cliente solicitó por SNI. SNI no está encriptado, pero sí un reemplazo experimental, ESNI [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} Una promesa firmada y verificable de publicar un certificado, desde un [Registro de transparencia del certificado](#def-CT-log). Los navegadores que aplican [CT](#def-CT) verifican la presencia de SCT en el certificado de un sitio o en el protocolo de enlace [TLS](#def-TLS), y se niegan a conectarse a sitios que no cumplen con su registro requisitos Esto aumenta la probabilidad de que se detecten certificados fraudulentos o inexactos. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} Un nombre anterior para [TLS](#def-TLS), todavía de uso común. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) proporciona una API provisional para probar la solicitud de certificado sin afectar los límites de solicitudes. Los certificados generados por el entorno de ensayo *no* son de confianza pública. El entorno de ensayo debe usarse para fines de prueba, depuración y desarrollo de clientes ACME. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} Un campo de un [certificado](#def-leaf) que indica para qué dominio(s) es válido el certificado. Reemplaza el uso del [Nombre común](#def-CN), que ahora se proporciona solo por razones de compatibilidad. Un solo certificado puede contener muchas SAN y ser válido para muchos nombres de dominio diferentes. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} La persona u organización que solicita un certificado. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Nivel más alto en el Sistema de nombres de dominio jerárquico como dominios de nivel superior de código de país (ccTLD) ejemplo: `.de` (Alemania), `.cn` (China) y dominios genéricos de nivel superior (gTLD) como `.com `, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} El protocolo utilizado por HTTPS para cifrar y autenticar las visitas a la página web. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} La parte de [DANE](#def-DANE) específicamente relacionada con la validación de conexiones [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} Una descripción de un certificado que contiene múltiples [Nombres alternativos de sujeto (SAN)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} Un [agente de usuario](#def-user-agent) utilizado para mostrar páginas web. Ejemplos: *Mozilla Firefox*, *Google Chrome* o *Internet Explorer*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Software capaz de comunicarse con un [servidor web](#def-web-server). Ejemplo: un [navegador web](#def-web-browser) o [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Software que sirve páginas web (o, por extensión, el servidor de hardware que lo aloja). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Certificados válidos para subdominios de un nivel de profundidad. Por ejemplo, un certificado que contiene un [SAN](#def-SAN) para `*.example.com` es válido para `blog.example.com` y `www.example.com` pero **no** para `bork.bork.example.com` o `example.com`). Un comodín se indica con un asterisco * en lugar de un subdominio. [Let's Encrypt](#def-LE)  [proporciona certificados comodín a partir de marzo de 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} El estándar que define el formato de los certificados de clave pública. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
