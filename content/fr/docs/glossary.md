---
title: Glossaire
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

{{< lastmod >}}

{{% def id="ACME-client" name="Client ACME" %}} a software capable to communicate with an ACME server to ask for a [certificate](#def-leaf). {{% /def %}}


{{% def id="ACME-server" name="Serveur ACME" %}} an ACME-compatble server capable to generate [certificates](#def-leaf). Let's Encrypt software, [Boudler](boudler), is ACME-compatible. [Boulder divergences from ACME](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" %}} the protocol implemented by [Let's Encrypt](#def-LE). Softwares compatibles with that protocol can use it to communicate with Let's Encrypt to asks for a [certificate](#def-leaf). [ACME draft 16](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [Wikipedia](https://fr.wikipedia.org/wiki/ACME_(protocole)) {{% /def %}}

{{% def id="boudler" name="Boudler" %}} the software implementing ACME, devlopped and used by [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="CNAME" name="Enregistrement de nom canonique" english="Canonical Name record" abbr="CNAME" %}} a DNS entry which maps one domain name to another, referred to as the Canonical Name. [Wikipedia](https://fr.wikipedia.org/wiki/Enregistrement_de_nom_canonique) {{% /def %}}

{{% def id="CA" name="Autorité de Certification" english="Certificate Authority" abbr="CA" %}} is an organisation that issues [certificate](#def-leaf). [Let's Encrypt](#def-LE) and [IdenTrust](#def-IdenTrust) are Certificate Authorities. [Wikipedia](https://fr.wikipedia.org/wiki/Autorit%C3%A9_de_certification) {{% /def %}}

{{% def id="CAA" english="Certificate Authority Authorization" abbr="CAA" %}} a DNS record that allows to specify which [CA](#def-CA) are allowed to issue certificate for the corresponding domain. [Let's Encrypt](#def-LE) does check and respects CAA records. https://letsencrypt.org/docs/caa/ - [Wikipedia](https://fr.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CAB" name="CA/Browser Forum " %}} [Wikipedia](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="CRL" name="Liste de révocation de certificats" english="Certificate Revocation List" abbr="CRL" %}} a method to inform about the [Revocation](#def-Revocation) of a [certificate](#def-leaf). [Wikipedia](https://fr.wikipedia.org/wiki/Liste_de_r%C3%A9vocation_de_certificats) {{% /def %}}

{{% def id="CSR" name="Demande de signature de certificat" english="Certificate Signing Request" abbr="CSR" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Demande_de_signature_de_certificat) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} {{% /def %}}

{{% def id="CT" name="Transparence des certificats" english="Certificate Transparency" abbr="CT" %}} [Wikipedia](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="Certificate chain" name="Certificate chain" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Certificat_%C3%A9lectronique#Cha%C3%AEne_de_confiance){{% /def %}}

{{% def id="CN" name="Common name" abbr="CN" %}}{{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}}:[Wikipedia](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification){{% /def %}}

{{% def id="DNAME" name="Delegation Name record" abbr="DNAME" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Enregistrement_de_nom_canonique#DNAME_record){{% /def %}}

{{% def id="DANE" english="DNS - based Authentication of Named Entities" abbr="DANE" %}} [Wikipedia](https://fr.wikipedia.org/wiki/DNS_-_based_Authentication_of_Named_Entities){{% /def %}}

{{% def id="DNSSEC" english="Domain Name System Security Extensions" abbr="DNSSEC" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Domain_Name_System_Security_Extensions){{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Domain-validated_certificate){{% /def %}}

{{% def id="ECC certificates" name="ECC certificates" %}}{{% /def %}}

{{% def id="ECC" name="Cryptographie sur les courbes elliptiques" english="Elliptic Curve Cryptography" abbr="ECC" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Cryptographie_sur_les_courbes_elliptiques){{% /def %}}

{{% def id="DSA" name="Digital Signature Algorithm" abbr="DSA" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Digital_Signature_Algorithm){{% /def %}}

{{% def id="ECDSA" english="Elliptic Curve Digital Signature Algorithm " abbr="ECDSA" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Elliptic_curve_digital_signature_algorithm){{% /def %}}

{{% def id="EdDSA" name="algorithme de signature numérique Courbe d'Edwards" english="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" %}} : [Wikipedia](https://fr.wikipedia.org/wiki/EdDSA){{% /def %}}

{{% def id="EV" name="Certificats à validation étendue" english="Extended Validation" abbr="EV" %}} [Let's Encrypt](#def-LE) doesn't offer EV certificates, only [DV](#def-DV) ones:[FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Extended_Validation_Certificate){{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} a [Certificate Authority](#def-CA). IdenTrust has [cross-signed](#def-cross-signing) [Let's Encrypt](#def-LE) [intermediates](#def-intermediate): https://letsencrypt.org/certificates/ . [Wikipedia](https://en.wikipedia.org/wiki/IdenTrust){{% /def %}}

{{% def id="intermediate" name="Certificat intermédiaire" english="Intermediate certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate){{% /def %}}

{{% def id="ISRG" english="Internet Security Research Group" abbr="ISRG" %}} [Wikipedia](https://en.wikipedia.org/wiki/Internet_Security_Research_Group){{% /def %}}

{{% def id="Key-pair" name="Key-pair" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public-key_cryptography){{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-user certificate)" %}} [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate){{% /def %}}

{{% def id="LE" english="Let's Encrypt" abbr="LE" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Let%27s_Encrypt){{% /def %}}

{{% def id="Mixed Content" name="Mixed Content" %}} https://developer.mozilla.org/fr/docs/S%C3%A9curit%C3%A9/MixedContent{{% /def %}}

{{% def id="OCSP" english="Online Certificate Status Protocol" abbr="OCSP" %}} a method to check the [Revocation](#def-Revocation) of a [certificate](#def-leaf). [Wikipedia](https://fr.wikipedia.org/wiki/Online_Certificate_Status_Protocol){{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} [Let's Encrypt](#def-LE) doesn't offer EV certificates, only (DV){#DV} ones: [FAQ](https://letsencrypt.org/docs/faq/). [Wikipedia](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation){{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files{{% /def %}}

{{% def id="PKCS" name="standards de cryptographie à clé publique" english="Public Key Cryptographic Standards" abbr="PKCS" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Public_Key_Cryptographic_Standards){{% /def %}}

{{% def id="PKI" name="Public Key Infrastructure" abbr="PKI" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Infrastructure_%C3%A0_cl%C3%A9s_publiques){{% /def %}}

{{% def id="PKP" name="Public Key Pinning" abbr="PKP" %}} [Wikipedia](https://fr.wikipedia.org/wiki/HTTP_Public_Key_Pinning){{% /def %}}

{{% def id="precertificate" name="Precertificate" %}}{{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} https://letsencrypt.org/docs/rate-limits/ https://publicsuffix.org/{{% /def %}}

{{% def id="RSA" name="Chiffrement RSA" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Chiffrement_RSA){{% /def %}}

{{% def id="FQDN" english="Fully qualified domain name" abbr="FQDN" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Fully_qualified_domain_name){{% /def %}}

{{% def id="Revocation" name="Révocation" %}} https://letsencrypt.org/docs/revoking/ {{% /def %}}

{{% def id="root" mname="Certificat racine" english="Root certificate" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Certificat_racine) {{% /def %}}

{{% def id="self-signed" name="Self-signed Certificate" %}} [Wikipedia](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} http://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SNI" english="Server Name Indication" abbr="SNI" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="Staging" name="Staging" %}} https://letsencrypt.org/docs/staging-environment/ {{% /def %}}

{{% def id="SAN" english="Subject Alternative Name" abbr="SAN" %}} [Wikipedia](https://en.wikipedia.org/wiki/Subject_Alternative_Name) {{% /def %}}

{{% def id="TLD" name="Domaine de premier niveau" english="Top-Level Domain" abbr="TLD" %}} [Wikipedia](https://fr.wikipedia.org/wiki/Domaine_de_premier_niveau) {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} See [Subject Alternative Name (SAN)](#def-SAN) {{% /def %}}

{{% def id="wildcard" name="Certificats omnidomaines" english="Wildcard Certificates" %}} certificates valid for any subdomains (but for only one level): a certificate for `*.example.com` is valid for `anything.example.com` (but **not** for `something.anything.com` nor `example.com`). [Let's Encrypt](#def-LE) does provide Wildcards certificates. [Wikipedia](https://fr.wikipedia.org/wiki/Certificat_%C3%A9lectronique#Certificats_X.509_omnidomaines) {{% /def %}}

{{% def id="IDN" name="Nom de domaine internationalisé" english="internationalized domain name" abbr="IDN" %}} domains with caracters others than `a` to `z`, `0` to `9` and `-`. They can for example contains Arabic, Chinese, Cyrillic, Tamil, Hebrew or the Latin alphabet-based characters with diacritics or ligatures. The encoded representation of an IDN domains starts with `xn--`. IDN is supported by [Let's Encrypt](#def-LE): https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [Wikipedia](https://fr.wikipedia.org/wiki/Nom_de_domaine_internationalis%C3%A9) {{% /def %}}

{{% def id="Web Client" name="Client web" %}} a software capable to communicate with a [Web server](#def-web-server).Example: a web Browser or [cURL](https://fr.wikipedia.org/wiki/CURL). [Wikipedia](https://fr.wikipedia.org/wiki/Navigateur_web) {{% /def %}}

{{% def id="web-server" name="Serveur web" %}} a software serving web pages. [Wikipedia](https://fr.wikipedia.org/wiki/Serveur_web) {{% /def %}}

{{% def id="X.509" abbr="X.509" %}}[Wikipedia](https://fr.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
