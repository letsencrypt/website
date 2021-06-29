---
title: Chain of Trust
linkTitle: Chain of Trust (Root and Intermediate Certificates)
slug: certificates
top_graphic: 5
lastmod: 2021-06-28
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Root Certificates

Our roots are kept safely offline. We issue end-entity (or leaf) certificates to our subscribers from our intermediates covered in the next section.
For additional compatibility, IdenTrust has cross-signed our ISRG Root X1 root with their [DST Root CA X3](https://crt.sh/?id=8395) root
(also known as TrustID X3 Root), which can be downloaded [from IdenTrust](https://www.identrust.com/support/downloads) or [from us](/certs/trustid-x3-root.pem.txt).
We have cross-signed our ISRG Root X2 root with our ISRG Root X1 root for additional compatibility as we submit ISRG Root X2 to various root programs.

* Active (RSA issuance)
  * ISRG Root X1 (RSA 4096-bit modulus, O = Internet Security Research Group)
    * [Self-signed](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Active (ECDSA issuance)
  * ISRG Root X2 (ECDSA P-384, O = Internet Security Research Group)
    * [Self-signed](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Cross-signed by ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

We've set up websites to test chaining to our active roots.

* ISRG Root X1
  * [Valid](https://valid-isrgrootx1.letsencrypt.org/)
  * [Revoked](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Expired](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Valid](https://valid-isrgrootx2.letsencrypt.org/)
  * [Revoked](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Expired](https://expired-isrgrootx2.letsencrypt.org/)

# Intermediate Certificates

Under normal circumstances, we issue RSA leaf certificates from our R3 intermediate and ECDSA leaf certificates from our E1 intermediate.
At present, an ACME account must be allow-listed in order to be issued ECDSA certificates.
Additional information about how we sign ECDSA certificates and how to get your ACME account allow-listed for ECDSA certificates can be found in
[our community forums](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679).
For additional compatibility, IdenTrust has cross-signed our R3 and R4 intermediates with their [DST Root CA X3](https://crt.sh/?id=8395) root
(also known as TrustID X3 Root), which can be downloaded [from IdenTrust](https://www.identrust.com/support/downloads) or [from us](/certs/trustid-x3-root.pem.txt).
Our R4 and E2 intermediates are reserved for disaster recovery in the event that we are unable to issue from our R3 or E1 intermediates, respectively.
We no longer issue certificates from our Let's Encrypt Authority X1, Let's Encrypt Authority X2, Let's Encrypt Authority X3, or Let's Encrypt Authority X4 intermediates.

* Active (RSA issuance)
  * R3 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* Backup (RSA issuance)
  * R4 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
* Active (ECDSA issuance)
  * E1 (ECDSA P-384, O = Let's Encrypt)
    * [Signed by ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Backup (ECDSA issuance)
  * E2 (ECDSA P-384, O = Let's Encrypt)
    * [Signed by ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Retired
  * Let's Encrypt Authority X1 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (RSA 2048-bit modulus, O = Let's Encrypt)
    * [Signed by ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Cross-signed by DST Root CA X3](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Cross Signing

Every certificate represents a single public/private key pair. When we say that
certificate B was "issued from" or "signed by" certificate A, what we are saying
cryptographically is that the private key of certificate A was used to generate
the signature of certificate B. We can use the public key of certificate A to
verify the signature of certificate B. In this way, a signature/verification
chain can be constructed from root to intermediate(s) to leaf. When configuring
a system to serve a leaf certificate, it is usually necessary for the system to
also serve all of the other certificates in the verification chain except for
the root, which is assumed to already be present on the receiving end.

Since all of our roots and intermediates with the same common name
(e.g. ISRG Root X1 or R3) represent the same public/private key pair, any of
our roots or intermediates can be used to verify the signatures generated by any
of our other roots or intermediates with the same common name. In several cases,
we have elected to generate secondary or "cross-signed" roots and intermediates
with the same common names as our primary roots and intermediates, but signed by
certificates that are not part of our usual chains. These "cross-signed" roots
and intermediates allow for the construction of alternate chains that are more
compatible for verification in certain scenarios than our usual chains due to
certain roots not being available for verification in those scenarios. The
easiest way to distinguish our primary roots and intermediates from their
cross-signed counterparts is by inspecting the Issuer fields.

# Certificate Transparency

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all of the certificates we issue to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view
all of the certificates issued by Let's Encrypt via these links:

* [Issued by R3](https://crt.sh/?Identity=%25&iCAID=183267)
* [Issued by E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
