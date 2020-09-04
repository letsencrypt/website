---
title: Chain of Trust
linkTitle: Chain of Trust (Root and Intermediate Certificates)
slug: certificates
top_graphic: 5
lastmod: 2020-08-04
---

{{< lastmod >}}

# Root Certificates

Our roots are kept safely offline. We issue end-entity certificates to subscribers from the intermediates in the next section.
For additional compatibility as we submit our new Root X2 to various root programs, we have also cross-signed it from Root X1.

* Active
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * Self-signed: [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
* Upcoming
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * Self-signed: [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

We've set up websites to test certificates chaining to our active roots.

* ISRG Root X1
  * [Valid](https://valid-isrgrootx1.letsencrypt.org/)
  * [Revoked](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Expired](https://expired-isrgrootx1.letsencrypt.org/)

# Intermediate Certificates

Under normal circumstances, certificates issued by Let's Encrypt will come from "Let's Encrypt Authority X3" or "R3", both RSA intermediates.
We have also issued a new ECDSA intermediate ("E1"), which we will begin issuing from soon. This page will be updated when that bringup is complete.

Our other intermediates ("Let's Encrypt Authority X4", "E2", and "R4") are reserved for disaster recovery and will only be used should we lose the ability to issue with our primary intermediates.
We do not use the X1 and X2 intermediates anymore.

IdenTrust has cross-signed our RSA intermediates for additional compatibility.

* Active
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * Signed by ISRG Root X1: [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * Cross-signed by IdenTrust: [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * Signed by ISRG Root X1: [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * Cross-signed by IdenTrust: coming soon
* Upcoming
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * Signed by ISRG Root X2: [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Backup
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * Signed by ISRG Root X1: [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * Cross-signed by IdenTrust: [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * Signed by ISRG Root X1: [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * Cross-signed by IdenTrust: coming soon
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * Signed by ISRG Root X2: [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Retired
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * Signed by ISRG Root X1: [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * Cross-signed by IdenTrust: [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * Signed by ISRG Root X1: [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * Cross-signed by IdenTrust: [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)

# Cross Signing

Each of our intermediates represents a single public/private
key pair. The private key of that pair generates the signature for all end-entity
certificates (also known as leaf certificates), i.e. the certificates we issue
for use on your server.

Our RSA intermediates are signed by ISRG Root X1. ISRG's root is widely trusted at this
point, but our intermediates are still cross-signed by IdenTrust's "DST Root CA X3"
(now called "TrustID X3 Root") for additional client compatibility. The IdenTrust
root has been around longer and thus has better compatibility with older devices
and operating systems (e.g. Windows XP, Android 7). You can [download "TrustID X3 Root" from
IdenTrust](https://www.identrust.com/support/downloads) (or, alternatively,
you can [download a copy from us](/certs/trustid-x3-root.pem.txt)).

Having cross-signatures means that each of our RSA intermediates has two
certificates representing the same signing key. One is signed by DST Root
CA X3, and the other is signed by ISRG Root X1. The easiest way to distinguish
the two is by looking at their Issuer field.

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers verify
that the end-entity certificate has a trust chain leading to a trusted root
certificate. Almost all server operators will choose to serve a chain including
the intermediate certificate with Subject "Let's Encrypt Authority X3" and
Issuer "DST Root CA X3." The recommended Let's Encrypt software,
[Certbot](https://certbot.org), will make this configuration seamlessly.

The following picture explains the relationships between our certificates
visually:

[![ISRG Certificate Hierarchy Diagram, as of September 2020](/certs/isrg-hierarchy-2020.png)](/certs/isrg-hierarchy-2020.png)

# OCSP Signing Certificate

This certificate is used to sign OCSP responses for the Let's Encrypt Authority
intermediates, so that we don't need to bring the root key online in order to
sign those responses. A copy of this certificate is included automatically in
those OCSP responses, so Subscribers don't need to do anything with it. It is
included here for informational purposes only.

* ISRG Root OCSP X1 (Signed by ISRG Root X1): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Our newer intermediates do not have OCSP URLs (their revocation information is 
instead served via CRL), so we have not issued an OCSP Signing Cert from ISRG Root X2.

# Certificate Transparency

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all certificates to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view all
issued Let's Encrypt certificates via these links:

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Issued by E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Issued by R3](https://crt.sh/?Identity=%25&iCAID=183267)

# More Info

The private keys for the ISRG root CA and the Let's Encrypt intermediate CAs are stored on hardware security modules (HSMs), which provide a high degree of protection against the keys being stolen.
