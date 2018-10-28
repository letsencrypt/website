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

:target{
  animation: fadeIt 2s ease-out; 
}
</style>

<b id="ACME-client">ACME Client</b>: a software capable to communicate with an ACME server to ask for a [certificate](#leaf).

<b id="ACME-server">ACME Server</b>: an ACME-compatble server capable to generate [certificates](#leaf). Let's Encrypt software, [Boudler](boudler), is ACME-compatible. [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)

<b id="ACME">Automatic Certificate Management Environment (ACME)</b>: the protocol implemented by [Let's Encrypt](#LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to asks for a [certificate](#leaf). [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment)

<b id="boudler">Boudler</b>: the software implementing ACME, devlopped and used by [Let's Encrypt](#LE). [GitHub](https://github.com/letsencrypt/boulder)

<b id="CNAME">Canonical Name record (CNAME)</b>: a DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record)

<b id="CA">Certificate Authority (CA)</b>: is an organisation that issues [certificate](#leaf). [Let's Encrypt](#LE) and [IdenTrust](#IdenTrust) are Certificate Authorities. [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority)

<b id="CAA">Certificate Authority Authorization (CAA)</b>: a DNS record that allows to specify which (CA)[#CA] are allowed to issue certificate for the corresponding domain. [Let's Encrypt](#LE) does check and respects CAA records. https://letsencrypt.org/docs/caa/ - [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization)

<b id="CRL">Certificate Revocation List (CRL)</b>: a method to inform about the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list)

<b id="CSR">Certificate Signing Request (CSR)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request)

<b id="store">Certificate Store</b>

<b id="CT">Certificate Transparency (CT)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency)

<b id="Certificate chain">Certificate chain</b>: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate)

<b id="CN">Common name (CN)</b>

<b id="cross-signing">Cross Signing</b>:[Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification)

<b id="DNAME">Delegation Name record (DNAME)</b>: A DNS record that creates an alias for an entire subtree of the domain name tree. In contrast, the [CNAME](#CNAME) record creates an alias for a single name and not its subdomains. [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record#DNAME_record)

<b id="ECC certificates">ECC certificates</b>

<b id="ECC">Elliptic Curve Cryptography (ECC)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)

<b id="ECDSA">Elliptic Curve Digital Signature Algorithm  (ECDSA)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)

<b id="EdDSA"> Edwards-curve Digital Signature Algorithm (EdDSA)</b> : [Wikipedia](https://en.wikipedia.org/wiki/EdDSA)

<b id="EV">Extended Validation (EV)</b> [Let's Encrypt](#LE) doesn't offer EV certificates, only (DV){#DV} ones:[FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate)

<b id="IdenTrust">IdenTrust</b>: a (Certificate Authority)[#CA]. IdenTrust has [cross-signed](#cross-signing) [Let's Encrypt](#LE) [intermediates](#intermediate):https://letsencrypt.org/certificates/ . [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust)

<b id="intermediate">Intermediate certificate</b>: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate)

<b id="ISRG">Internet Security Research Group (ISRG)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group)

<b id="Key-pair">Key-pair</b>: [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography)

<b id="leaf">Leaf certificate (end-user certificate)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate)

<b id="LE">Let's Encrypt (LE)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt)

<b id="Mixed Content">Mixed Content</b>: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content

<b id="OCSP">Online Certificate Status Protocol (OCSP)</b>: a method to check the [Revocation](#Revocation) of a [certificate](#leaf). [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)

<b id="OV">Organization Validation (OV)</b>: [Let's Encrypt](#LE) doesn't offer EV certificates, only (DV){#DV} ones: [FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation)

<b id="pfx">Personal Information Exchange Files (.pfx)</b>: https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files

<b id="PKCS">Public Key Cryptographic Standards (PKCS)</b>: [Wikipedia](https://fr.wikipedia.org/wiki/Public_Key_Cryptographic_Standards)

<b id="PKI">Public Key Infrastructure (PKI)</b>: [Wikipedia](https://fr.wikipedia.org/wiki/Infrastructure_%C3%A0_cl%C3%A9s_publiques)

<b id="PSL">Public Suffix List (PSL)</b> https://letsencrypt.org/docs/rate-limits/ https://publicsuffix.org/

<b id="RSA">Chiffrement RSA</b>: [Wikipedia](https://fr.wikipedia.org/wiki/Chiffrement_RSA)

<b id="FQDN">Fully qualified domain name (FQDN)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)

<b id="Revocation">Revocation</b>: A certificate is valid until it's expiration date, expect if the [CA](#CA) says it's been revoked.
The certificate may be revoked for various reasons such as the compromission of the private key.

Browsers can check if a certificate is revoked using [CRL](#CLR) or [OCSP](#OCSP).
Let's Encrypt only supports the [OCSP](#OCSP) method.

[Let's Encrypt](#LE) allows the users to asks for the revocation if you

- Can prove you control the domain of the certificate
- Can prove you control the account that generated the certificate
- Can prove you have the private key of the certificate

Source: https://letsencrypt.org/docs/revoking/

<b id="root">Root certificate</b>: [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate)

<b id="self-signed">Self-signed Certificate</b>: [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate)

<b id="SCT">Signed Certificate Timestamp (SCT)</b>: http://www.certificate-transparency.org/how-ct-works

<b id="SNI">Server Name Indication (SNI)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Server_Name_Indication)

<b id="Staging">Staging</b>: https://letsencrypt.org/docs/staging-environment/

<b id="SAN">Subject Alternative Name (SAN)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name)

<b id="TLD">Top-Level Domain (TLD)</b>: [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain)

<b id="UCC">Unified Communications Certificate (UCC)</b>: See [Subject Alternative Name (SAN)](#SAN)

<b id="wildcard">Wildcard Certificates</b>: certificates valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.com` nor `example.com`). [Let's Encrypt](#LE) does provide Wildcards certificates. [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate)

<b id="IDN">internationalized domain name (IDN)</b>: domains with caracters others than `a` to `z`, `0` to `9` and `-`. They can for example contains Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDN is supported by [Let's Encrypt](#LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name)

<b id="Web Client">Web Client</b>: a software capable to communicate with a [Web server](#web-server).Example: a web Browser
[Wikipedia](https://en.wikipedia.org/wiki/Web_browser)
<b id="web-server">Web Server</b>: a software serving web pages. [Wikipedia](https://en.wikipedia.org/wiki/Web_server)