---
title: Glossary
slug: glossary
top_graphic: 1
---

## ACME Client

## Automatic Certificate Management Environment (ACME) {#ACME}

ACME is the protocol implemented by [Let's Encrypt](#LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to asks for a [certificate](#leaf). 

Sources:

- [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16)
- [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)
- [Wikipedia](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment)

## Boudler

Boudler is the software implementing ACME, devlopped and used by [Let's Encrypt](#LE).

Source: https://github.com/letsencrypt/boulder

## Canonical Name record (CNAME) {#CNAME}

A Canonical Name record is a DNS entry which maps one domain name to another, referred to as the Canonical Name.

Source: [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record)

## Certificate Authority (CA) {#CA}

A certificate authority is an organisation that issues [certificate](#leaf).
[Let's Encrypt](#LE) and [IdenTrust](#IdenTrust) are Certificate Authorities.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_authority)

## Certificate Authority Authorization (CAA) {#CAA}

CAA is a DNS record that allows to specify which (CA)[#CA] are allowed to issue certificate for the corresponding domain.
[Let's Encrypt](#LE) does check and respects CAA records.

Sources:

- https://letsencrypt.org/docs/caa/
- [Wikipedia](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization)

## Certificate Revocation List (CRL) {#CRL}

CRLs are one method to check the [Revocation](#Revocation) of a [certificate](#leaf).

Source: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_revocation_list)

## Certificate Signing Request (CSR) {#CSR}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_signing_request)

## Certificate Store {#store}

## Certificate Transparency (CT) {#CT}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency)

## Certificate chain

Source: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate)

## Common name (CN) {#CN}


## Cross Signing {#cross-signing}

Source: [Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification)

## Delegation Name record (DNAME) {#DNAME}

A DNAME record creates an alias for an entire subtree of the domain name tree. In contrast, the [CNAME](#CNAME) record creates an alias for a single name and not its subdomains.

Source: [Wikipedia](https://en.wikipedia.org/wiki/CNAME_record#DNAME_record)

## ECC certificates


## Elliptic Curve Cryptography (ECC) {#ECC}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)

## Elliptic Curve Digital Signature Algorithm  (ECDSA) {#ECDSA}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)

##  Edwards-curve Digital Signature Algorithm (EdDSA) {#EdDSA} 

Source: [Wikipedia](https://en.wikipedia.org/wiki/EdDSA)

## Extended Validation (EV) {#EV}

[Let's Encrypt](#LE) doesn't offer EV certificates, only (DV){#DV} ones.

Sources:

- https://letsencrypt.org/docs/faq/
- [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate)

## IdenTrust

IdenTrust is a (Certificate Authority)[#CA]. IdenTrust has [cross-signed](#cross-signing) [Let's Encrypt](#LE) [intermediates](#intermediate).

Source:

- https://letsencrypt.org/certificates/
- [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust)

## Intermediate certificate {#intermediate}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate)

## Internet Security Research Group (ISRG) {#ISRG}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group)

## Key-pair

Source: [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography)

## Leaf certificate (end-user certificate) {#leaf}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate)

## Let's Encrypt (LE) {#LE}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Let%27s_Encrypt)

## Mixed Content

Source: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content

## Online Certificate Status Protocol (OCSP) {#OCSP}

OCSP is a method to check the [Revocation](#Revocation) of a [certificate](#leaf).

Source: [Wikipedia](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)

## Organization Validation (OV) {#OV}

[Let's Encrypt](#LE) doesn't offer EV certificates, only (DV){#DV} ones.

Sources:

- https://letsencrypt.org/docs/faq/
- [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation)

## Personal Information Exchange Files (.pfx) {#pfx}

Source: https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files

## Public Key Cryptographic Standards (PKCS) {#PKCS}

Source: [Wikipedia](https://fr.wikipedia.org/wiki/Public_Key_Cryptographic_Standards)

## Public Key Infrastructure (PKI) {#PKI}

Source: [Wikipedia](https://fr.wikipedia.org/wiki/Infrastructure_%C3%A0_cl%C3%A9s_publiques)

## Public Suffix List (PSL) {#PSL}

Sources:

- https://letsencrypt.org/docs/rate-limits/
- https://publicsuffix.org/

## Chiffrement RSA {#RSA}

Source: [Wikipedia](https://fr.wikipedia.org/wiki/Chiffrement_RSA)

## Fully qualified domain name (FQDN) {#FQDN}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Fully_qualified_domain_name)

## Revocation

A certificate is valid until it's expiration date, expect if the [CA](#CA) says it's been revoked.
The certificate may be revoked for various reasons such as the compromission of the private key.

Browsers can check if a certificate is revoked using [CRL](#CLR) or [OCSP](#OCSP).
Let's Encrypt only supports the [OCSP](#OCSP) method.

[Let's Encrypt](#LE) allows the users to asks for the revocation if you

- Can prove you control the domain of the certificate
- Can prove you control the account that generated the certificate
- Can prove you have the private key of the certificate

Source: https://letsencrypt.org/docs/revoking/

## Root certificate {#root}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Root_certificate)

## Self-signed Certificate {#self-signed}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate)

## Signed Certificate Timestamp (SCT) {#SCT}

Source: http://www.certificate-transparency.org/how-ct-works

## Staging

Source: https://letsencrypt.org/docs/staging-environment/

## Subject Alternative Name (SAN) {#SAN}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name)

## Top-Level Domain (TLD) {#TLD}

Source: [Wikipedia](https://en.wikipedia.org/wiki/Top-level_domain)

## Unified Communications Certificate (UCC) {#UCC}

See [Subject Alternative Name (SAN)](#SAN)

## Wildcard Certificates {#wildcard}

Wildcard certificates are valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.com` nor `example.com`)

[Let's Encrypt](#LE) does provide Wildcards certificates.

Source: [Wikipedia](https://en.wikipedia.org/wiki/Wildcard_certificate)

## internationalized domain name (IDN) {#IDN}

IDN domains are domains with caracters others than `a` to `z`, `0` to `9` and `-`. They can for example contains Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`.

IDN is supported by [Let's Encrypt](#LE).

## Web Client

## Web Server

Sources:

- https://letsencrypt.org/2016/10/21/introducing-idn-support.html
- [Wikipedia](https://en.wikipedia.org/wiki/Internationalized_domain_name)
