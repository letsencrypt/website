---
title: Chain of Trust
linkTitle: Chain of Trust (Root and Intermediate Certificates)
slug: certificates
top_graphic: 5
lastmod: 2024-03-15
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Root Certificates

Our roots are kept safely offline. We issue end-entity certificates to subscribers from the intermediates in the next section.
For additional compatibility as we submit our new Root X2 to various root programs, we have also cross-signed it from Root X1.

* Active
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Self-signed](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Active, limited availability
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Self-signed](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Cross-signed by ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

We've set up websites to test certificates chaining to our active roots.

* ISRG Root X1
  * [Valid](https://valid-isrgrootx1.letsencrypt.org/)
  * [Revoked](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Expired](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Valid](https://valid-isrgrootx2.letsencrypt.org/)
  * [Revoked](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Expired](https://expired-isrgrootx2.letsencrypt.org/)

# Intermediate Certificates

Under normal circumstances, certificates issued by Let's Encrypt will come from "R3", an RSA intermediate.
Currently, issuance from "E1", an ECDSA intermediate, is possible only for ECDSA subscriber keys for [allowlisted accounts](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). In the future, issuance from "E1" will be available for everyone.

Our other intermediates ("R4" and "E2") are reserved for disaster recovery and will only be used should we lose the ability to issue with our primary intermediates.
We do not use the X1, X2, X3, and X4 intermediates anymore.

IdenTrust has cross-signed our RSA intermediates for additional compatibility.

* Active
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (Retired)
* Active, limited availability
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Signed by ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Backup
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (Retired)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Signed by ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Pending
  * Let's Encrypt E5 (`ECDSA P-384, O = Let's Encrypt, CN = E5`)
    * Signed by ISRG Root X2: [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
  * Let's Encrypt E6 (`ECDSA P-384, O = Let's Encrypt, CN = e6`)
    * Signed by ISRG Root X2: [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
  * Let's Encrypt E7 (`ECDSA P-384, O = Let's Encrypt, CN = e7`)
    * Signed by ISRG Root X2: [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
  * Let's Encrypt E8 (`ECDSA P-384, O = Let's Encrypt, CN = e8`)
    * Signed by ISRG Root X2: [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
  * Let's Encrypt E9 (`ECDSA P-384, O = Let's Encrypt, CN = e9`)
    * Signed by ISRG Root X2: [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
    * Cross-signed by ISRG Root X1: [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
  * Let's Encrypt R10 (`RSA 2048, O = Let's Encrypt, CN = R10`)
    * Signed by ISRG Root X1: [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
  * Let's Encrypt R11 (`RSA 2048, O = Let's Encrypt, CN = R11`)
    * Signed by ISRG Root X1: [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)
  * Let's Encrypt R12 (`RSA 2048, O = Let's Encrypt, CN = R12`)
    * Signed by ISRG Root X1: [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
  * Let's Encrypt R13 (`RSA 2048, O = Let's Encrypt, CN = R13`)
    * Signed by ISRG Root X1: [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
  * Let's Encrypt R14 (`RSA 2048, O = Let's Encrypt, CN = R14`)
    * Signed by ISRG Root X1: [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)
* Retired
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Signed by ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Cross-signed by IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Cross Signing

## Intermediates

Each of our intermediates represents a single public/private
key pair. The private key of that pair generates the signature for all end-entity
certificates (also known as leaf certificates), i.e. the certificates we issue
for use on your server.

Our RSA intermediates are signed by ISRG Root X1. ISRG Root X1 is widely trusted at this
point, but our RSA intermediates are still cross-signed by IdenTrust's "[DST Root CA X3](https://crt.sh/?id=8395)"
(now called "TrustID X3 Root") for additional client compatibility. The IdenTrust
root has been around longer and thus has better compatibility with older devices
and operating systems (e.g. Windows XP, Android 7). You can [download "TrustID X3 Root" from
IdenTrust](https://www.identrust.com/support/downloads) (or, alternatively,
you can [download a copy from us](/certs/trustid-x3-root.pem.txt)).

Having cross-signatures means that each of our RSA intermediates has two
certificates representing the same signing key. One is signed by DST Root
CA X3 and the other is signed by ISRG Root X1. The easiest way to distinguish
the two is by looking at their Issuer field.

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers verify
that the end-entity certificate has a trust chain leading to a trusted root
certificate. Almost all server operators will choose to serve a chain including
the intermediate certificate with Subject "R3" and
Issuer "ISRG Root X1". The recommended Let's Encrypt client software,
[Certbot](https://certbot.org), will make this configuration seamlessly.

## Roots
Similar to intermediates, root certificates can be cross-signed, often to increase client
compatibility. Our ECDSA root, ISRG Root X2 was generated in fall 2020 and is the root
certificate for the ECDSA hierarchy. It is represented by two certificates: one that is
self-signed and one that is signed by ISRG Root X1.

All certificates signed by the ECDSA intermediate "E1" will come with a chain including an intermediate
certificate whose Subject is "ISRG Root X2" and whose Issuer is "ISRG Root X1". Almost all server operators
will choose to serve this chain as it offers the most compatibility until ISRG Root X2
is widely trusted.

# OCSP Signing Certificate

This certificate is used to sign OCSP responses for the Let's Encrypt Authority
intermediates, so that we don't need to bring the root key online in order to
sign those responses. A copy of this certificate is included automatically in
those OCSP responses, so Subscribers don't need to do anything with it. It is
included here for informational purposes only.

* ISRG Root OCSP X1 ([Signed by ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

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
