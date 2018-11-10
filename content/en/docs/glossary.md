---
title: Glossary
slug: glossary
top_graphic: 1
date: 2018-11-01
lastmod: 2018-11-01
---

{{< lastmod >}}

{{% def id="ACME-client" name="ACME Client" %}} A software capable to communicate with an ACME server to ask for a [certificate](#def-leaf). {{% /def %}}


{{% def id="ACME-server" name="ACME Server" %}} An ACME-compatible server capable to generate [certificates](#def-leaf). Let's Encrypt software, [Boudler](boudler), is ACME-compatible. [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" %}} The protocol implemented by [Let's Encrypt](#def-LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to ask for a [certificate](#def-leaf). [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="boudler" name="Boudler" %}} The software implementing ACME, developed and used by [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} A DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} An organization that issues [certificates](#def-leaf). [Let's Encrypt](#def-LE) and [IdenTrust](#def-IdenTrust) are Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" %}} A DNS record that allows specifying which [CAs](#def-CA) are allowed to issue certificate for the corresponding domain. [Let's Encrypt](#def-LE) does check and respects CAA records. https://letsencrypt.org/docs/caa/ - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CAB" name="Certification Authority Browser Forum" %}} Also known as CA/Browser Forum, is a voluntary consortium of certification authorities, vendors of Internet browser software, operating systems, and other PKI-enabled applications. [Let's Encrypt](#def-LE) is a member of the CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}


{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} A method to inform about the [Revocation](#def-Revocation) of a [certificate](#def-leaf). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} A signed file containing the needed information required by the [CA](#def-CA) to generated a certificate. Relevant information for [Let's Encrypt](#def-LE) are the [Common Name](#def-CN) and [Subject Alternative Names](#def-SAN). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} A certificate store contains the list of trusted [roots](#def-root). Operating systems (such as Windows, Android or Debian) and web browsers (such as Firefox) maintains a certificate store. Browsers without one rely on the one of the operation system. [Certificates](#def-leaf) provided by [Let's Encrypt](#def-LE) are trusted by those certificates stores: https://letsencrypt.org/certificates/. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} To improve security, to be valid certificates (or [precertificates](#def-precertificate)) must be published in Certificate Transparency Logs: https://www.certificate-transparency.org/. [Let's Encrypt](#def-LE) generate and publish a [precertificates](#def-precertificate) and include in the definitive [certificates](#def-leaf) the proof of publication. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency){{% /def %}}

{{% def id="chain" name="Certificate chain" %}} To determine if a system trust a [certificates](#def-leaf), it must have a chain of trust ending on a [root](#def-root) present on it's [certificate store](#def-store). The chain is the list of intermediate leading to that root: the [lead certificate](#def-leaf) is always signed by a [intermediate](#def-intermediate) (which can be signed by another [intermediate](#def-intermediate) and so on) with is sign by a root. Note: the path it not always unique, and when a website present a certificate chain leading to one root, the web client may decide to use another chain, ending in another root, to validate the certificate (This is especially important for [Public Key Pinning](#def-PKP)). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate){{% /def %}}

{{% def id="CN" name="Common name" abbr="CN" %}} An attribute of a certificate. For [roots](#def-root) and [intermediates](#def-intermediate) it's the name of the certificate. For [leaf certificate](#def-leaf) it's one of the [Subject Alternative Name](#def-SAN) of the certificate. Note: The common name is limited to 63 characters.{{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} An intermediate certificate may be signed by more than one [root](#def-root). For example, [Let's Encrypt](#def-LE) [intermediates](intermediate) are cross signed by [IdenTrust](#def-IdenTrust), initially because the Let's Encrypt root was not yet trusted by [certificate stores](#def-store). Technically, it's two intermediates, using the same [Common Name](#def-CN) and the same [Key-pair](#def-Key-pair), one signed by the private key of a Let's Encrypt root and the other signed by the private key of the IdenTrust's root: https://letsencrypt.org/certificates/. [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification){{% /def %}}

{{% def id="DNAME" name="Delegation Name record" abbr="DNAME" %}} A DNS record that creates an alias for an entire subtree of the domain name tree. In contrast, the [CNAME](#def-CNAME) record creates an alias for a single name and not its subdomains. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record#DNAME_record){{% /def %}}

{{% def id="DANE" name="DNS - based Authentication of Named Entities" abbr="DANE" %}} [Wikipedia](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities){{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} [Certificates](#def-leaf) where the applicant have only proven the control over the domain (and not it's identity, unlike [OV](#def-OV) and [EV](#def-EV) certificates ). [Let's Encrypt](#def-LE) offers only DV certificates (not [OV](#def-OV) nor [EV](#def-EV) ): [FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate){{% /def %}}

{{% def id="ECC certificates" name="ECC certificates" %}} Certificates using an [Elliptic Curve](#def-ECC) [Key-pair](#def-Key-pair).{{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} An approach to public-key cryptography based on elliptic curves. ECC requires smaller keys compared to non-EC cryptography to provide equivalent security. [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography){{% /def %}}

{{% def id="DSA" name="Digital Signature Algorithm" abbr="DSA" %}} The algorithm used to sign certificates. [Wikipedia](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm){{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm " abbr="ECDSA" %}} A variant of the Digital Signature Algorithm (DSA) which uses elliptic curve cryptography.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" %}} A digital signature scheme using a variant of Schnorr signature based on Twisted Edwards curves. It is designed to be faster than existing digital signature schemes without sacrificing security. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA){{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Certificates for which the [CA](#def-CA) has verified the legal entity controlling the website. They contains information about that entity. Controls from the [CA](#def-CA) are more stricts than for [OV](#def-OV) certificates. [Let's Encrypt](#def-LE) doesn't offer EV certificates. [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate){{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} A [Certificate Authority](#def-CA). IdenTrust has [cross-signed](#def-cross-signing) [Let's Encrypt](#def-LE) [intermediates](#def-intermediate): https://letsencrypt.org/certificates/ . [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust){{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} A certificate, signed by the private key of a [root](#def-root) or another intermediate. It's private key is used to sign intermediates or [leaf](#def-leaf) certificates. They are used to allow the signature of leaf certificates while keeping the private key of root certificate to be kept offline. They allow [cross signing](#def-cross-signing) too. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate){{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} The organization behind [Let's Encrypt](#def-LE): https://www.abetterinternet.org/about/. [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group){{% /def %}}

{{% def id="Key-pair" name="Key-pair" %}} The couple private-key / public-key used to sign or encrypt. The public key is used to encrypt or verify the signature. The private key is used to decrypt data (encrypt by the public key) or signed data. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography){{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-user certificate)" %}} A certificate signed by a trusted [intermediate](#def-intermediate), valid for a set of domains. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate){{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} The [Certificate Authority](#def-CA) controlled by [ISRG](#def-ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt){{% /def %}}

{{% def id="Mixed Content" name="Mixed Content" %}} When a webpage using https loads sub-resources  (such as Javascript, CSS or images) using http, browsers may remove the secure indication, or display an insecure logo: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content{{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" %}} A method to check the [Revocation](#def-Revocation) of a [certificate](#def-leaf). [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol){{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certificates for which the [CA](#def-CA) has verified the legal entity controlling the website. They contain information about that entity. [Let's Encrypt](#def-LE) doesn't offer OV certificates. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation){{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} A file that may contain a [leaf certificate](#def-leaf), its [chain](#def-chain) up to the root and the private key of the leaf. See also https://en.wikipedia.org/wiki/PKCS_12. https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files{{% /def %}}

{{% def id="precertificate" name="Precertificate" %}}Precertificates are certificates identical to the final [certificate](#def-leaf) with an additional critical poison extension. They are used for [certificate transparency](#def-CT). https://tools.ietf.org/html/rfc6962#section-3.1{{% /def %}}

{{% def id="PKCS" name="Public Key Cryptographic Standards" abbr="PKCS" %}} A a group of public-key cryptography standards devised and published by RSA Security. [Wikipedia](https://en.wikipedia.org/wiki/PKCS){{% /def %}}

{{% def id="PKI" name="Public Key Infrastructure" abbr="PKI" %}} A set of roles, policies, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_infrastructure){{% /def %}}

{{% def id="PKP" name="Public Key Pinning" abbr="PKP" %}} A security mechanism consisting to *pin* the private key (or certificate). The *pinned* one can be the [leaf](#def-leaf), an [intermediate](#def-intermediate) of the [chain](#def-chain) or the [root](#def-root). That mechanism must be handled very carefully because it may prevent even the owner of the website to use a valid certificate. [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning){{% /def %}}


{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} A list of *Public Suffix* maintained by Mozilla. [Let's Encrypt](#def-LE) use that list for rate-limits: https://letsencrypt.org/docs/rate-limits/ https://publicsuffix.org/{{% /def %}}

{{% def id="RSA" abbr="RSA" %}} A public-key algorithm used especially to signed certificates. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} The complete domain name of a website. For example, `www.example.org` is a `FQDN`, `.org` is its [TLD](#def-TLD) and `example.com` the [public suffix](#def-PSL) [Wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name){{% /def %}}

{{% def id="Revocation" name="Revocation" %}} A certificate is valid until its expiration date, expect if the [CA](#def-CA) says it's been revoked. The certificate may be revoked for various reasons such as the compromising of the private key. Browsers can check if a certificate is revoked using [CRL](#def-CRL) or [OCSP](#def-OCSP) but Let's Encrypt only supports the [OCSP](#def-OCSP) method. https://letsencrypt.org/docs/revoking/ {{% /def %}}

{{% def id="root" name="Root certificate" %}} A [self-signed](#def-self-signed) certificate, controlled by a [certificate authority](#def-CA), used to signed its [intermediates](#def-intermediate) certificates and included in [certificates stores](#def-store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="self-signed" name="Self-signed Certificate" %}} A certificate signed by its own private key. [Root certificate](#def-root) are self-signed. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} A proof of publication of a certificate, signed by a [Certificate Transparency log](#def-CT). The proof of the publication of a [precertificate](#def-precertificate) may be included in the corresponding final [certificate](#def-leaf). [Let's Encrypt](#def-LE) certificates do include the required SCTs. http://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} When connecting to a [web server](#def-web-server), a client may specify during the TLS handshake which domain it wants to connect to, in order for the server to answer with the appropriate [certificate](#def-leaf) when multiple domains are hosted behind the same IP. SNI is *not* encrypted, but it's successor, ESNI, is. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="Staging" name="Staging" %}} [Let's Encrypt](#def-LE) provide a staging API to test the certificate request without impacting rates-limits. Certificates generated by the staging environment are *not* publicly trusted. https://letsencrypt.org/docs/staging-environment/ {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} The Subject Alternative Name field of a [certificate](#def-leaf) is used to indicate for which domain(s) that certificate is valid. It replaces the usage of the [Common Name](#def-CN), only now provided for compatibility reasons. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Highest level in the hierarchical Domain Name System, such as country-code top-level domains (ccTLD) for example `.de` (Germany), `.cn` (China) and generic top-level domains (gTLD) for example `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} See [Subject Alternative Name (SAN)](#def-SAN) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificates" %}} Certificates valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.example.com` nor `example.com`). [Let's Encrypt](#def-LE) does provide Wildcards certificates. [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="IDN" name="internationalized domain name" abbr="IDN" %}} Domains with characters others than `a` to `z`, `0` to `9` and `-`. They can for example contain Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDN is supported by [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) {{% /def %}}

{{% def id="Web Client" name="Web Client" %}} A software capable to communicate with a [Web server](#def-web-server). Example: a web Browser or [cURL](https://en.wikipedia.org/wiki/CURL). [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="web-server" name="Web Server" %}} A software serving web pages (By extension, the hardware server hosting it). [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="X.509" abbr="X.509" %}} The standard defining the format of public key certificates. [Wikipedia](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
