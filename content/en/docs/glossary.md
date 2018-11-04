---
title: Glossary
slug: glossary
top_graphic: 1
date: 2018-11-01
lastmod: 2018-11-01
---
<style>
@keyframes fadeIt {
  0%   { background-color: #FFCE00; }
  100% { background-color: #FFFFFF; }
}

dfn:target{
  animation: fadeIt 2s ease-out; 
}
dfn {
    font-weight: bold;
}
</style>
<!--
document.querySelectorAll('.definition>a[href^="#"]').forEach(function(a){
	var id = a.href.substring(a.href.indexOf('#')+1);
	if ( ! id ) return;
	var el = document.getElementById(id);
	if ( el ) {
		a.title = el.parentNode.textContent;
	}
});
-->

{{< lastmod >}}

{{% def id="ACME-client" name="ACME Client" %}} A software capable to communicate with an ACME server to ask for a [certificate](#leaf). {{% /def %}}


{{% def id="ACME-server" name="ACME Server" %}} An ACME-compatble server capable to generate [certificates](#leaf). Let's Encrypt software, [Boudler](boudler), is ACME-compatible. [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" %}} The protocol implemented by [Let's Encrypt](#LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to asks for a [certificate](#leaf). [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="boudler" name="Boudler" %}} The software implementing ACME, devlopped and used by [Let's Encrypt](#LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} A DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} An organisation that issues [certificate](#leaf). [Let's Encrypt](#LE) and [IdenTrust](#IdenTrust) are Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" %}} A DNS record that allows to specify which [CA](#CA) are allowed to issue certificate for the corresponding domain. [Let's Encrypt](#LE) does check and respects CAA records. https://letsencrypt.org/docs/caa/ - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CAB" name="Certification Authority Browser Forum" %}} Also known as CA/Browser Forum, is a voluntary consortium of certification authorities, vendors of Internet browser software, operating systems, and other PKI-enabled applications . [Let's Encrypt](#LE) is a member of the CA/Browser Forum. [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}


{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} A method to inform about the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} A signed file containing the needed informations required by the [CA](#CA) to generated a certificate. Relevant information for [Let's Encrypt](#LE) are the [Common Name](#CN) and [Subject Alternative Names](#SAN). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} A certificate store containes the list of trusted [roots](#root). Operating systems (such as Windows, Android or Debian) and web browsers (such as FireFox) maintains a certificate store. Browsers without one relies on the one of the operation system. [Certificates](#leaf) provided by [Let's Encrypt](#LE) are trusted by thoses certificates stores: https://letsencrypt.org/certificates/. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} To improve security, to be valid certificates (or [precertificates](#precertificate)) must be published in Certificate Transparency Logs: https://www.certificate-transparency.org/. [Let's Encrypt](#LE) generate and publish a [precertificates](#precertificate) and include in the definitive [certificates](#leaf) the proof of publication. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency){{% /def %}}

{{% def id="Certificate chain" name="Certificate chain" %}} To determine if a system trust a [certificates](#leaf), it must have a chain of trust ending on a [root](#root) present on it's [certificate store](#store). The chain is the list of intermedate leading to that root: the [lead certificate](#leaf) is always signed by a [intermediate](#intermediate) (which can be signed by another [intermediate](#intermediate) and so on) with is sign by a root. Note: the path it not always unique, and when a website present a certificate chain leadind to one root, the web client may decide to use another chain, ending in another root, to validate the certificate (This is especially important for [Public Key Pinning](#PKP)). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate){{% /def %}}

{{% def id="CN" name="Common name" abbr="CN" %}} An attribute of a certificate. For [roots](#root) and [intermediates](#intermediate) it's the name of the certificate. For [leaf certificate](#leaf) it's one of the [Subject Alternative Name](#SAN) of the certificate. Note: The common name is limited to 63 charaters.{{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} An intermediate certificate may be signed by more than one [root](#root). For example, [Let's Encrypt](#le) [intermediates](intermediate) are cross signed by [IdenTrust](#IdenTrust), initially because the Let's Encrypt root was not yet trusted by [certificate stores](#store). Technicly, it's two intermediates, using the same [Common Name](#CN) and the same [Key-pair](#Key-pair), one signed by the private key of a Let's Encrypt root and the other signed by the private key of the IdenTrust's root: https://letsencrypt.org/certificates/. [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification){{% /def %}}

{{% def id="DNAME" name="Delegation Name record" abbr="DNAME" %}} A DNS record that creates an alias for an entire subtree of the domain name tree. In contrast, the [CNAME](#CNAME) record creates an alias for a single name and not its subdomains. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record#DNAME_record){{% /def %}}

{{% def id="ECC certificates" name="ECC certificates" %}} Certificates using an [Elliptic Curve](#ECC) [Key-pair](#Key-pair).{{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} An approach to public-key cryptography based on elliptic curves. ECC requires smaller keys compared to non-EC cryptography to provide equivalent security. [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography){{% /def %}}

{{% def id="DSA" name="Digital Signature Algorithm" abbr="DSA" %}} The algorythm used to sign certificates. [Wikipedia](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm){{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm " abbr="ECDSA" %}} A variant of the Digital Signature Algorithm (DSA) which uses elliptic curve cryptography.  [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" %}} A digital signature scheme using a variant of Schnorr signature based on Twisted Edwards curves. It is designed to be faster than existing digital signature schemes without sacrificing security. [Wikipedia](https://en.wikipedia.org/wiki/EdDSA){{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} Certificates for which the [CA](#CA) has verified the legal entity controlling the website. They contains information about that entity. [Let's Encrypt](#LE) doesn't offer EV certificates, only [DV](#DV) ones:[FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate){{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} A [Certificate Authority](#CA). IdenTrust has [cross-signed](#cross-signing) [Let's Encrypt](#LE) [intermediates](#intermediate): https://letsencrypt.org/certificates/ . [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust){{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} A certificate, signed by the private key of a [root](#root) or another intermediate. It's private key is used to sign intermediates or [leaf](#leaf) certificates. They are used to allow the signature of leaf certificates while keeping the private key of root certificate to be kept offline. They allow [cross signing](#cross-signing) too. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate){{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} The organisation behind [Let's Encrypt](#LE): https://www.abetterinternet.org/about/. [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group){{% /def %}}

{{% def id="Key-pair" name="Key-pair" %}} The couple private-key / public-key used to sign or encrypt. The public key is used to encrypt or verify the signature. The private key is used to decrypt data (encrypt by the public key) or signed data. [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography){{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-user certificate)" %}} A certificate signed by a trusted [intermediate](#intermediate), valid for a set of domains. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate){{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} The [Certificate Authority](#CA) controlled by [ISRG](#ISRG). [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt){{% /def %}}

{{% def id="Mixed Content" name="Mixed Content" %}} When a webpage using https loads subressources (such as Javascript, CSS or images) using http, browsers may remove the secure indication, or display an insecure logo: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content{{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" %}} A method to check the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol){{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} Certificates for which the [CA](#CA) has verified the legal entity controlling the website. They contains information about that entity. [Let's Encrypt](#LE) doesn't offer EV certificates, only [DV](#DV) ones: [FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation){{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} A file that may contain a [leaf certificate](#leaf), it's [chain](#chain) up to the root and the private key of the leaf. See also https://en.wikipedia.org/wiki/PKCS_12. https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files{{% /def %}}

{{% def id="precertificate" name="Precertificate" %}}Precertificates are certificates identifical to the final [certificate](#leaf) with an additionnal critical poison extension. They are used for [certificate transparency](#CT). https://tools.ietf.org/html/rfc6962#section-3.1{{% /def %}}

{{% def id="PKCS" name="Public Key Cryptographic Standards" abbr="PKCS" %}} A a group of public-key cryptography standards devised and published by RSA Security. [Wikipedia](https://en.wikipedia.org/wiki/PKCS){{% /def %}}

{{% def id="PKI" name="Public Key Infrastructure" abbr="PKI" %}} A set of roles, policies, and procedures needed to create, manage, distribute, use, store, and revoke digital certificates and manage public-key encryption. [Wikipedia](https://en.wikipedia.org/wiki/Public_key_infrastructure){{% /def %}}

{{% def id="PKP" name="Public Key Pinning" abbr="PKP" %}} A security mecanism consisting to *pin* the private key (or certificate). The *pinned* one can be the [leaf](#leaf), an [intermediate](#intermediate) of the [chain](#chain) or the [root](#root). That mecanism must be handeled very carefully because it may prevent even the owner of the website to use a valid certificate. [Wikipedia](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning){{% /def %}}


{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} A list of *Public Suffix* maintained by Mozilla. [Let's Encrypt](#LE) use that list for rate-limits: https://letsencrypt.org/docs/rate-limits/ https://publicsuffix.org/{{% /def %}}

{{% def id="RSA" abbr="RSA" %}} A public-key algorytm used especially to signed certificates. [Wikipedia](https://en.wikipedia.org/wiki/RSA_(cryptosystem)){{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} The complete domain name of a website. For example, `www.example.org` is a `FQDN`, `.org` is it's [TLD](#TLD) and `example.com` the [public suffix](#PSL) [Wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name){{% /def %}}

{{% def id="Revocation" name="Revocation" %}} A certificate is valid until it's expiration date, expect if the [CA](#CA) says it's been revoked. The certificate may be revoked for various reasons such as the compromission of the private key. Browsers can check if a certificate is revoked using [CRL](#CLR) or [OCSP](#OCSP) but Let's Encrypt only supports the [OCSP](#OCSP) method. https://letsencrypt.org/docs/revoking/ {{% /def %}}

{{% def id="root" name="Root certificate" %}} A [self-signed](#self-signed) certificate, controlled by a [certificate authority](#CA), used to signed it's [intermediates](#intermediate) certificates and included in [certificates stores](#store). [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="self-signed" name="Self-signed Certificate" %}} A certificate signed by it's own private key. [Root certificate](#root) are self-signed. [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} A proof of publication of a certificate, signed by a [Certificate Transparency log](#CT). The proof of the publication of a [precertificate](#precertificate) may be included in the corresponding final [certificate](#leaf). [Let's Encrypt](#le) certificates do include the required SCTs. http://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} When connecting to a [web server](#web-server), a client may specify during the TLS handshake which domain it wants to connect to, in order for the server to answer with the appropriate [certificate](#leaf) when multiple domains are hosted behind the same IP. SNI is *not* encrypted, but it's successor, ESNI, is. [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="Staging" name="Staging" %}} [Let's Encrypt](#LE) provide a staging API to test the certificate request wihout inpacting rates-limits. Certificates generated by the staging environment are *not* publicly trusted. https://letsencrypt.org/docs/staging-environment/ {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} The Subject Alternative Name field of a [certificate](#leaf) is used to indicate for which domain(s) that certificate is valid. It replace the usage of the [Common Name](#CN), only now provided for compatibility reasons. [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} Highest level in the hierarchical Domain Name System, such as country-code top-level domains (ccTLD) for example `.de` (Germany), `.cn` (China) and generic top-level domains (gTLD) for example `.com`, `.org`. [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} See [Subject Alternative Name (SAN)](#SAN) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificates" %}} Certificates valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.example.com` nor `example.com`). [Let's Encrypt](#LE) does provide Wildcards certificates. [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="IDN" name="internationalized domain name" abbr="IDN" %}} Domains with caracters others than `a` to `z`, `0` to `9` and `-`. They can for example contains Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDN is supported by [Let's Encrypt](#LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) {{% /def %}}

{{% def id="Web Client" name="Web Client" %}} A software capable to communicate with a [Web server](#web-server).Example: a web Browser or [cURL](https://en.wikipedia.org/wiki/CURL). [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="web-server" name="Web Server" %}} A software serving web pages. [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="X.509" abbr="X.509" %}} The standard defining the format of public key certificates. (Wikipedia)](https://en.wikipedia.org/wiki/X.509) {{% /def %}}
