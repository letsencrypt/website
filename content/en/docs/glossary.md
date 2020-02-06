---
title: Glossary
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} A certificate [extension](#def-extension) used to indicate to [user agents](#def-user-agent) how to obtain information about the issuer of the [certificate](#def-certificate). It typically specifies the [OCSP](#def-OCSP) URI and the [issuer URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} The protocol implemented by [Let's Encrypt](#def-LE). Software compatible with that protocol can use it to communicate with Let's Encrypt to ask for a [certificate](#def-leaf). [ACME RFC](https://tools.ietf.org/html/rfc8555) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} A program capable of communicating with an ACME server to ask for a [certificate](#def-leaf). {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} An ACME-compatible server that can generate [certificates](#def-leaf). Let's Encrypt's software, [Boulder](#def-boulder), is ACME-compatible, [with some divergences](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} The software implementing ACME, developed and used by [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} A set of technical and policy requirements for CAs. Since all major [root programs](#def-root-program) incorporate the Baseline Requirements, CAs must follow these requirements to be trusted by most browsers. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} A DNS record that specifies which [CAs](#def-CA) are allowed to issue certificate for the corresponding domain name. CAA records are checked by CAs, not by browsers. [Let's Encrypt](#def-LE) {{<link "honors CAA records" "/docs/caa" >}} as required by the [Baseline Requirements](#def-BRs). - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} A DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} An organization that issues [certificates](#def-leaf). [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, and DigiCert are Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} Part of the [AIA](#def-AIA) field containing information about the issuer of the [certificate](#def-leaf). It may be useful when the [web server](#def-web-server) didn't provide a trusted [certificate chain](#def-chain). {{% /def %}}

{{% def id="certificate" name="Certificate" %}} A file in a [particular format](#def-X509) that contains a public key and other data describing when to use that public key. The most common kind of certificate is a [leaf certificate](#def-leaf). There are also [intermediate](#def-intermediate) and [root](#def-root) certificates. {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} In certificates, most fields are defined by extensions. For instance, [Subject Alternative Names](#def-SAN) and [AIA](#def-AIA) are extensions. The extension mechanism allows creating new fields that were not part of the original [X.509](#def-X509) standard. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} A voluntary group of certification authorities, vendors of Internet browser software, operating systems, and other PKI-enabled applications. The CA/Browser Forum publishes the [Baseline Requirements](#def-BRs). [Let's Encrypt](#def-LE) is a member of the CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} A list of [intermediate certificates](#def-intermediate) that help a [user agent](#def-user-agent) determine that it can trust an end-entity or [leaf certificate](#def-leaf), by connecting it to a [root certificate](#def-root) in its [certificate store](#def-store). Note: the chain is not always unique, and when a website presents a certificate chain leading to one root, the user agent may decide to use another chain to validate the certificate. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} A named set of rules that indicates the applicability of a certificate to a particular community and/or class of applications with common security requirements. Specific details of issuance are outlined in a [CPS](#def-CPS). {{<link "ISRG Certificate Policy" "/repository.md#isrg-certificate-policy" >}} - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [Wikipedia](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} A statement of the practices that a certification authority employs in issuing, managing, revoking, and renewing or re-keying certificates. {{<link "ISRG Certification Practice Statement" "/repository.md#isrg-certification-practice-statement" >}} - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [Wikipedia](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} A certificate may contain [extensions](#def-extension) marked "critical." This means that software must reject that certificate unless the software understands how to process that extension. This makes it possible to introduce new extensions that are important for security without creating risks for older software. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} A method to inform [user agents](#def-user-agent) about the [revocation](#def-revocation) status of a [certificate](#def-leaf). This is a list of the serial numbers of all revoked certificates from a given CA, signed by that CA. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} A signed file containing the needed information required by the [CA](#def-CA) to generated a certificate. Relevant information for [Let's Encrypt](#def-LE) are the [Common Name](#def-CN), [Subject Alternative Names](#def-SAN), and Subject Public Key Info. Usually, [client applications](#def-ACME-client) automatically generate the CSR for the user, although a web hosting provider or device might also generate a CSR. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} A certificate store contains a list of trusted [roots](#def-root). Operating systems (such as Windows, Android or Debian) and [web browsers](#def-web-browser) (such as Firefox) maintain a certificate store. Browsers without one rely on the operating systems' certificate store. [Certificates](#def-leaf) provided by [Let's Encrypt](#def-LE) are {{<link "trusted by most certificates stores" "/certificates" >}}. {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} The "Subject" field of a certificate field indicates what a certificate is about. This commonly contains fields like [Common Name](#def-CN), Country, and Organization. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} To improve security, certificates (or [precertificates](#def-precertificate)) must be published in Certificate Transparency Logs: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) generates and publishes [precertificates](#def-precertificate), and includes in the subsequent [certificate](#def-leaf) a list of [SCTs](#def-SCT) for the precertificate. Some [browsers](#def-web-browser), such as Google Chrome, require the presence of this verifiable promise in order to validate the certificate. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} A component of [Certificate Transparency](#def-CT) that accepts submissions of certificates and [precertificates](#def-precertificate) and incorporates them into a permanent, verifiable, publicly-accessible list. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} Part of a certificate's [Subject](#def-subject) describing what the certificate is about. For [roots](#def-root) and [intermediates](#def-intermediate) it's the human-readable name of the [certificate authority](#def-CA). For [leaf certificates](#def-leaf) it's one of the domain names on the certificate. Note: The common name is limited to 63 characters. It is an obsolete method of indicating a domain name to which the certificate applies, since current Internet standards expect software to check only the [Subject Alternative Names](#def-SAN) in order to determine the applicability of a certificate. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} An issuing certificate may be signed by more than one [root](#def-root). For example, [Let's Encrypt](#def-LE) [intermediates](#def-intermediate) are cross signed by [IdenTrust](#def-IdenTrust), because at launch the Let's Encrypt root was not yet trusted by [certificate stores](#def-store). Technically, it's achieved with two issuing certificates, using the same [Subject](#def-subject) and the same [Key-pair](#def-key-pair), one signed by the private key of a Let's Encrypt root and the other signed by the private key of an IdenTrust's root: [{{< relref "/certificates" >}}]({{< relref "/certificates" >}}). [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} A mechanism using DNS to indicate how to verify the authenticity of the [certificate](#def-leaf) or encryption key presented.  [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} A mechanism to cryptographically authenticate DNS responses. DNSSEC requires deployment by TLDs, domain name owners, and recursive resolvers in order to take effect. Adoption is currently somewhat low. [Wikipedia](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} A [certificate](#def-leaf) where the applicant has only proven its control over the domain name (and not the identity of the requesting organization). [Let's Encrypt](#def-LE) offers only DV certificates (not [OV](#def-OV) or [EV](#def-EV)): {{<link "FAQ" "/docs/faq" >}} - [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} A variant of the Digital Signature Algorithm (DSA) which uses elliptic curve cryptography.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) supports ECDSA for [end-entity or leaf certificates](#def-leaf), but not yet for the entire [chain](#def-chain): [{{< relref "/upcoming-features" >}}]({{< relref "/upcoming-features" >}}) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} A specific type of [EdDSA](#def-EdDSA), along with Ed448. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}}  A modern public-key signature system based on elliptic curves, designed to solve several common [implementation issues](https://ed25519.cr.yp.to/) with elliptic curve cryptography. Certificate Authorities like [Let's Encrypt](#def-LE) can't provide EdDSA certificates yet. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} An type of public-key cryptography based on elliptic curves. ECC uses smaller keys compared to non-EC cryptography while providing equivalent security. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} A type of certificate validation for which the [CA](#def-CA) has verified the legal entity controlling the website. They contain information about that entity. Controls from the [CA](#def-CA) are more strict than for [OV](#def-OV) certificates. [Let's Encrypt](#def-LE) doesn't offer EV certificates. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} The complete domain name of a website. For example, `www.example.com` is an *FQDN*. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} A [Certificate Authority](#def-CA). IdenTrust has [cross-signed](#def-cross-signing) [Let's Encrypt](#def-LE) [intermediate certificates](#def-intermediate): [{{< relref "/certificates" >}}]({{< relref "/certificates" >}}). [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} A certificate signed by a [root](#def-root) or another intermediate, and capable of signing other certificates. They are used to sign leaf certificates while keeping the private key of root certificate offline. Intermediates are included in [certificate chains](#def-chain). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} See [internationalized domain name](#def-IDN). {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} Domain name with characters others than `a` to `z`, `0` to `9` and the hyphen (`-`). They can for example contain Arabic, Chinese, Cyrillic, Tamil, Hebrew or Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDNs are supported by [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} The organization behind [Let's Encrypt](#def-LE): [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} The "Issuer" field of a certificate describes which certificate signed it. For instance, the Issuer field of a Let's Encrypt end-entity certificate might be "Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3". It commonly contains fields like [Common Name](#def-CN), Country, and Organization. The Issuer field always matches some certificate's [Subject](#def-subject) field. For [self-signed](#def-self-signed) certificates like [roots](#def-root), the Issuer is the same as the Subject. The term "issuer" may also be used to indicate a certificate that issues other certificates (an [intermediate](#def-intermediate) or root), or an organization that issues certificates.{{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} A combination of a private key and public key used to sign or encrypt. The public key is commonly embedded in a certificate, while the private key is stored on its own and should be kept secret. A key pair can be used to encrypt and decrypt, to sign and verify data, or to negotiate secondary keys, depending on the application. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} Most commonly, a certificate signed by an [intermediate](#def-intermediate), valid for a set of domains and not able to sign other certificates. This is the type of certificate that [ACME clients](#def-ACME-client) request, and that [web servers](#def-web-server) use. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} The [Certificate Authority](#def-CA) operated by [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} When an HTTPS webpage loads sub-resources (Javascript, CSS or images) over HTTP. [Browsers](#def-web-browser) may block mixed content, or mark the page as less secure when mixed content is present: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. To fix a mixed content problem, a web developer must change their pages so all resources use HTTPS URLs. [Developer tools](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) built into browsers can be used to find out which resources are causing mixed content problems. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} A method to check the [revocation](#def-revocation) status of a [certificate](#def-leaf). In other words, a way to check whether a [Certificate Authority](#def-CA) indicates that the certificate should no longer be considered valid, even though its expiration date has not yet been reached. This request can create privacy problems because it allows the certificate authority, and Internet service providers, to directly observe who is visiting which sites. [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} A [certificate](#def-leaf) extension, informing the [browser](#def-web-browser) that the [web server](#def-web-server) with that certificate must use [OCSP stapling](#def-OCSP-staping). It's used to require that an up-to-date [revocation](#def-revocation) status of the [certificate](#def-leaf) is confirmed by the web server on every connection, making revocation more reliable. [Let's Encrypt](#def-LE) can issue certificates with the OCSP Must-Staple [extension](#def-extension) upon request. [Mozilla Security Blog](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} A way for a [web server](#def-web-server) to send a [browser](#def-web-browser) an [OCSP](#def-OCSP) response signed by the [Certificate Authority](#def-CA), so the browser itself doesn’t need to make a secondary OCSP request to the CA, improving speed and privacy. Also known as TLS Certificate Status Request extension. [Wikipedia](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} OIDs are unique numeric identifiers standardized by the International Telecommunications Union (ITU) and ISO/IEC. OIDs are used within certificates to define extensions, fields, or policy assertions. Internet standards and [Certificate Policy](#def-CP) and [Certification Practice Statement](#def-CPS) documents define OID usage. [Wikipedia](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certificates for which the [CA](#def-CA) has verified the legal entity of the [Subscriber](#def-subscriber). They contain information about that entity. [Let's Encrypt](#def-LE) doesn't offer OV certificates. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}}  A format for cryptographic information (originally specified as part of the Privacy Enhanced Mail Internet standards for secure email). A PEM document can represent information such as a private key, a public key, or a digital certificate. These files start with "-\-\-\--BEGIN " and then a data type. [Wikipedia](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} A file that may contain a [leaf certificate](#def-leaf), its [chain](#def-chain) up to the root and the private key of the leaf. See also https://en.wikipedia.org/wiki/PKCS_12. [Microsoft Hardware Dev Center](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} Precertificates are a part of [Certificate Transparency](#def-CT). A precertificate is a copy of the [certificate](#def-leaf) that a CA intends to issue, with a [critical](#def-critical) poison extension added to prevent the precertificate from being accepted by software in the wild. A CA submits a precertificate to [CT logs](#def-CT-log) in exchange for [SCTs](#def-SCT). Since a precertificate is not identical to its corresponding certificate, Certificate Transparency logs may end up containing both. [RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} A security mechanism that asks a browser to require that a site's [certificate chain](#def-chain) use certain public keys on future loads. Chrome introduced this mechanism to protect against CA compromises, but it caused site outages, leading Chrome to [deprecate and remove it](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} A list of *Public Suffixes* maintained by Mozilla, indicating which Internet domains are available for many separate entities to register subdomains. For instance, the list indicates that both `com` and `co.uk` are Public Suffixes even though `co.uk` is not a TLD. Web browsers use the list, among other things, for preventing sites that are likely operated by different entities from sharing web cookies with one another. [Let's Encrypt](#def-LE) also uses the list for rate-limit calculations: [{{< relref "/rate-limits" >}}]({{< relref "/rate-limits" >}}). https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} The person relying on information in a certificate. For instance, someone who visits an HTTPS web site is a Relying Party. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} A certificate is valid until its expiration date, unless the [CA](#def-CA) says it's been revoked. The certificate may be revoked for various reasons such as the compromise of the private key. Browsers may check if a certificate is revoked using [CRL](#def-CRL), [OCSP](#def-OCSP), or newer methods like [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) and [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). Note that in many situations, [revocation doesn't work](https://www.imperialviolet.org/2011/03/18/revocation.html). [{{< relref "/docs/revoking" >}}]({{< relref "/docs/revoking" >}}) {{% /def %}}

{{% def id="root" name="Root certificate" %}} A [self-signed](#def-self-signed) certificate controlled by a [certificate authority](#def-CA), used to sign its [intermediate](#def-intermediate) certificates and included in [certificate stores](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} The policies an organization uses to decide which certificates to include in its [certificate store](#def-store), and thereforce which CAs are trusted by their software. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} A public-key algorithm used for encryption and to digitally sign certificates. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} A certificate signed by its own private key, with its [Subject](#def-subject) equal to its [Issuer](#def-issuer). Self-signed certificates are trusted only due to prior arrangements made in the physical world, such as inclusion on a [trusted root list](#def-store). [Root certificates](#def-root) are self-signed. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} A field that a [user agent](#def-user-agent) sends to a [server](#def-web-server) during a [TLS](#def-TLS) handshake, specifying the domain name to connect to. This allows the server to answer with the appropriate [certificate](#def-leaf) when multiple domains are hosted behind the same IP. The web server might send a different certificate, and show different content, depending on the name that the client requested by SNI. SNI is not encrypted, but an experimental replacement, ESNI, is. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} A signed, verifiable promise to publish a certificate, from a [Certificate Transparency log](#def-CT-log). Browsers that enforce [CT](#def-CT) check for the presence of SCTs in a site's certificate, or in the [TLS](#def-TLS) handshake, and refuse to connect to sites that don't meet their logging requirements. This increases the likelihood that fraudulent or inaccurate certificates will be detected. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} An older name for [TLS](#def-TLS), still in common use. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE) provides a staging API to test certificate request without impacting rate limits. Certificates generated by the staging environment are *not* publicly trusted. The staging environment should be used for testing, debugging, and ACME client development purposes. [{{< relref "/docs/staging-environment" >}}]({{< relref "/docs/staging-environment" >}}) {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} A field of a [certificate](#def-leaf) that indicates for which domain(s) the certificate is valid. It replaces the usage of the [Common Name](#def-CN), which is now provided for compatibility reasons only. A single certificate may contain many SANs and be valid for many different domain names. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} The person or organization requesting a certificate. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Highest level in the hierarchical Domain Name System, such as country-code top-level domains (ccTLDs) like `.de` (Germany), `.cn` (China) and generic top-level domains (gTLDs) like `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} The protocol used by HTTPS to encrypt and authenticate web page visits. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} The part of [DANE](#def-DANE) specifically related to validating [TLS](#def-TLS) connections. {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} A description of a certificate containing multiple [Subject Alternative Names (SANs)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} A [user agent](#def-user-agent) used to display web pages. Examples: *Mozilla Firefox*, *Google Chrome* or *Internet Explorer*. [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} Software capable of communicating with a [web server](#def-web-server). Example: a [web browser](#def-web-browser) or [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="Web server" %}} Software serving web pages (or, by extension, the hardware server hosting it). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} Certificates valid for subdomains one level deep. For instance, a certificate containing a [SAN](#def-SAN) for `*.example.com` is valid for `blog.example.com` and `www.example.com` but **not** for `bork.bork.example.com` or `example.com`). A wildcard is indicated by an asterisk character (*) in place of a subdomain. [Let's Encrypt](#def-LE) [provides Wildcard certificates as of March 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} The standard defining the format of public key certificates. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
