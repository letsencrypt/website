---
title: Glossary
slug: glossary
top_graphic: 1
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

{{% def id="ACME-client" name="ACME Client" %}} a software capable to communicate with an ACME server to ask for a [certificate](#leaf). {{% /def %}}


{{% def id="ACME-server" name="ACME Server" %}} an ACME-compatble server capable to generate [certificates](#leaf). Let's Encrypt software, [Boudler](boudler), is ACME-compatible. [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" %}} the protocol implemented by [Let's Encrypt](#LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to asks for a [certificate](#leaf). [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="boudler" name="Boudler" %}} the software implementing ACME, devlopped and used by [Let's Encrypt](#LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} a DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} is an organisation that issues [certificate](#leaf). [Let's Encrypt](#LE) and [IdenTrust](#IdenTrust) are Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" %}} a DNS record that allows to specify which [CA](#CA) are allowed to issue certificate for the corresponding domain. [Let's Encrypt](#LE) does check and respects CAA records. https://letsencrypt.org/docs/caa/ - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} a method to inform about the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="Certificate chain" name="Certificate chain" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate){{% /def %}}

{{% def id="CN" name="Common name" abbr="CN" %}}{{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}}:[Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification){{% /def %}}

{{% def id="DNAME" name="Delegation Name record" abbr="DNAME" %}} A DNS record that creates an alias for an entire subtree of the domain name tree. In contrast, the [CNAME](#CNAME) record creates an alias for a single name and not its subdomains. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record#DNAME_record){{% /def %}}

{{% def id="ECC certificates" name="ECC certificates" %}}{{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography){{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm " abbr="ECDSA" %}} [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm){{% /def %}}

{{% def id="EdDSA" name=" Edwards-curve Digital Signature Algorithm" abbr="EdDSA" %}} : [Wikipedia](https://en.wikipedia.org/wiki/EdDSA){{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} [Let's Encrypt](#LE) doesn't offer EV certificates, only [DV](#DV) ones:[FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate){{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} a [Certificate Authority](#CA). IdenTrust has [cross-signed](#cross-signing) [Let's Encrypt](#LE) [intermediates](#intermediate): https://letsencrypt.org/certificates/ . [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust){{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate){{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group){{% /def %}}

{{% def id="Key-pair" name="Key-pair" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography){{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-user certificate)" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate){{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt){{% /def %}}

{{% def id="Mixed Content" name="Mixed Content" %}} https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content{{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" %}} a method to check the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol){{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} [Let's Encrypt](#LE) doesn't offer EV certificates, only (DV){#DV} ones: [FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation){{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files{{% /def %}}

{{% def id="PKCS" name="Public Key Cryptographic Standards" abbr="PKCS" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Public_Key_Cryptographic_Standards){{% /def %}}

{{% def id="PKI" name="Public Key Infrastructure" abbr="PKI" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Infrastructure_%C3%A0_cl%C3%A9s_publiques){{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} https://letsencrypt.org/docs/rate-limits/ https://publicsuffix.org/{{% /def %}}

{{% def id="RSA" name="Chiffrement RSA" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Chiffrement_RSA){{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} [Wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name){{% /def %}}

{{% def id="Revocation" name="Revocation" %}} A certificate is valid until it's expiration date, expect if the [CA](#CA) says it's been revoked. The certificate may be revoked for various reasons such as the compromission of the private key. Browsers can check if a certificate is revoked using [CRL](#CLR) or [OCSP](#OCSP) but Let's Encrypt only supports the [OCSP](#OCSP) method. https://letsencrypt.org/docs/revoking/ {{% /def %}}

{{% def id="root" name="Root certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="self-signed" name="Self-signed Certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} http://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="Staging" name="Staging" %}} https://letsencrypt.org/docs/staging-environment/ {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} See [Subject Alternative Name (SAN)](#SAN) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificates" %}} certificates valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.com` nor `example.com`). [Let's Encrypt](#LE) does provide Wildcards certificates. [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="IDN" name="internationalized domain name" abbr="IDN" %}} domains with caracters others than `a` to `z`, `0` to `9` and `-`. They can for example contains Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDN is supported by [Let's Encrypt](#LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name) {{% /def %}}

{{% def id="Web Client" name="Web Client" %}} a software capable to communicate with a [Web server](#web-server).Example: a web Browser or [cURL](https://en.wikipedia.org/wiki/CURL). [Wikipedia](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="web-server" name="Web Server" %}} a software serving web pages. [Wikipedia](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}
