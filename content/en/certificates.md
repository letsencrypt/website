---
title: Chains of Trust
linkTitle: Chains of Trust (Root and Intermediate Certificates)
slug: certificates
lastmod: 2024-06-11
show_lastmod: 1
---

This page describes all of the current and relevant historical Certification Authorities operated by Let's Encrypt. Note that a CA is most correctly thought of as a key and a name: any given CA may be represented by _multiple_ certificates which all contain the same Subject and Public Key Information. In such cases, we have provided the details of all certificates which represent the CA.

[![ISRG Certificate Hierarchy Diagram, as of June 2024](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Root CAs

Our root key material is kept safely offline. We issue end-entity certificates to subscribers from the intermediates described in the next section. All root certificate Subjects have a Country field of `C = US`.

Note that Root CAs don't have expiration dates in quite the same way that other certificates do. Although their self-signed certificates do contain a `notAfter` date, Root Programs and Trust Stores may decide to trust a Root CA beyond that date, or terminate trust in it before that date. As such, the end-of-validity dates given below are approximate, based on current Root Program policies.

* **ISRG Root X1**
  * Subject: `O = Internet Security Research Group, CN = ISRG Root X1`
  * Key type: `RSA 4096`
  * Validity: until 2030-06-04 (generated 2015-06-04)
  * CA details: [crt.sh](https://crt.sh/?caid=7394), [issued certs](https://crt.sh/?Identity=%25&iCAID=7394)
  * Certificate details (self-signed): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Certificate details (cross-signed by DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (retired)
  * Test websites: [valid](https://valid-isrgrootx1.letsencrypt.org/), [revoked](https://revoked-isrgrootx1.letsencrypt.org/), [expired](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * Subject: `O = Internet Security Research Group, CN = ISRG Root X2`
  * Key type: `ECDSA P-384`
  * Validity: until 2035-09-04 (generated 2020-09-04)
  * CA details: [crt.sh](https://crt.sh/?caid=183269), [issued certs](https://crt.sh/?Identity=%25&iCAID=183269)
  * Certificate details (self-signed): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Certificate details (cross-signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Test websites: [valid](https://valid-isrgrootx2.letsencrypt.org/), [revoked](https://revoked-isrgrootx2.letsencrypt.org/), [expired](https://expired-isrgrootx2.letsencrypt.org/)

For additional information on the compatibility of our root certificates with various devices and trust stores, see [Certificate Compatibility](/docs/cert-compat).

# Subordinate (Intermediate) CAs

We currently maintain four intermediates in active rotation. Subscriber certificates containing an ECDSA public key will be issued from one of the ECDSA intermediates; similarly, Subscriber certificates containing an RSA public key will be issued from one of the RSA intermediates.

All intermediate certificate Subjects have a Country field of `C = US`.

* **Let's Encrypt E5**
  * Subject: `O = Let's Encrypt, CN = E5`
  * Key type: `ECDSA P-384`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295810), [issued certs](https://crt.sh/?Identity=%25&iCAID=295810)
  * Certificate details (signed by ISRG Root X2): [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Certificate details (cross-signed by ISRG Root X1): [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * Subject: `O = Let's Encrypt, CN = E6`
  * Key type: `ECDSA P-384`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295819), [issued certs](https://crt.sh/?Identity=%25&iCAID=295819)
  * Certificate details (signed by ISRG Root X2): [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Certificate details (cross-signed by ISRG Root X1): [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * Subject: `O = Let's Encrypt, CN = R10`
  * Key type: `RSA 2048`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295814), [issued certs](https://crt.sh/?Identity=%25&iCAID=295814)
  * Certificate details (signed by ISRG Root X1): [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * Subject: `O = Let's Encrypt, CN = R11`
  * Key type: `RSA 2048`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295815), [issued certs](https://crt.sh/?Identity=%25&iCAID=295815)
  * Certificate details (signed by ISRG Root X1): [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)

Click below for details on additional intermediates which are not part of the active issuance hierarchy:

<details>
<summary>Backup</summary>

These intermediate CAs have currently-valid certificates, but are not being issued from. We may begin issuing Subscriber certificates from them at any time, without warning.

* **Let's Encrypt E7**
  * Subject: `O = Let's Encrypt, CN = E7`
  * Key type: `ECDSA P-384`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295813), [issued certs](https://crt.sh/?Identity=%25&iCAID=295813)
  * Certificate details (signed by ISRG Root X2): [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Certificate details (cross-signed by ISRG Root X1): [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * Subject: `O = Let's Encrypt, CN = E8`
  * Key type: `ECDSA P-384`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295809), [issued certs](https://crt.sh/?Identity=%25&iCAID=295809)
  * Certificate details (signed by ISRG Root X2): [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Certificate details (cross-signed by ISRG Root X1): [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * Subject: `O = Let's Encrypt, CN = E9`
  * Key type: `ECDSA P-384`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295812), [issued certs](https://crt.sh/?Identity=%25&iCAID=295812)
  * Certificate details (signed by ISRG Root X2): [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Certificate details (cross-signed by ISRG Root X1): [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * Subject: `O = Let's Encrypt, CN = R12`
  * Key type: `RSA 2048`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295816), [issued certs](https://crt.sh/?Identity=%25&iCAID=295816)
  * Certificate details (signed by ISRG Root X1): [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * Subject: `O = Let's Encrypt, CN = R13`
  * Key type: `RSA 2048`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295817), [issued certs](https://crt.sh/?Identity=%25&iCAID=295817)
  * Certificate details (signed by ISRG Root X1): [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * Subject: `O = Let's Encrypt, CN = R14`
  * Key type: `RSA 2048`
  * Validity: until 2027-03-12
  * CA details: [crt.sh](https://crt.sh/?caid=295818), [issued certs](https://crt.sh/?Identity=%25&iCAID=295818)
  * Certificate details (signed by ISRG Root X1): [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)

</details>

<details>
<summary>Retired</summary>

These intermediate CAs are no longer being used to issue Subscriber certificates. Those which still have valid certificates may be producing OCSP responses and/or CRLs.

* **Let's Encrypt E1**
  * Subject: `O = Let's Encrypt, CN = E1`
  * Key type: `ECDSA P-384`
  * Validity: until 2025-09-15
  * CA details: [crt.sh](https://crt.sh/?caid=183283), [issued certs](https://crt.sh/?Identity=%25&iCAID=183283)
  * Certificate details (signed by ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * Subject: `O = Let's Encrypt, CN = E2`
  * Key type: `ECDSA P-384`
  * Validity: until 2025-09-15
  * CA details: [crt.sh](https://crt.sh/?caid=183284), [issued certs](https://crt.sh/?Identity=%25&iCAID=183284)
  * Certificate details (signed by ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * Subject: `O = Let's Encrypt, CN = R3`
  * Key type: `RSA 2048`
  * Validity: until 2025-09-15
  * CA details: [crt.sh](https://crt.sh/?caid=183267), [issued certs](https://crt.sh/?Identity=%25&iCAID=183267)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * Subject: `O = Let's Encrypt, CN = R4`
  * Key type: `RSA 2048`
  * Validity: until 2025-09-15
  * CA details: [crt.sh](https://crt.sh/?caid=183268), [issued certs](https://crt.sh/?Identity=%25&iCAID=183268)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
* **Let's Encrypt Authority X1**
  * Subject: `O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * Key type: `RSA 2048`
  * Validity: expired 2020-06-04
  * CA details: [crt.sh](https://crt.sh/?caid=7395), [issued certs](https://crt.sh/?Identity=%25&iCAID=7395)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Subject: `O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * Key type: `RSA 2048`
  * Validity: expired 2020-06-04
  * CA details: [crt.sh](https://crt.sh/?caid=9745), [issued certs](https://crt.sh/?Identity=%25&iCAID=9745)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Subject: `O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * Key type: `RSA 2048`
  * Validity: expired 2021-10-06
  * CA details: [crt.sh](https://crt.sh/?caid=16418), [issued certs](https://crt.sh/?Identity=%25&iCAID=16418)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Subject: `O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * Key type: `RSA 2048`
  * Validity: expired 2021-10-06
  * CA details: [crt.sh](https://crt.sh/?caid=16429), [issued certs](https://crt.sh/?Identity=%25&iCAID=16429)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Certificate details (cross-signed by IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>Delegated OCSP Responder</summary>

This keypair was previously used to sign OCSP responses regarding the status of Let's Encrypt's intermediates on behalf of Let's Encrypt's root, so that the root could remain safely offline. We no longer issue OCSP responses for our intermediates; we instead periodically issue CRLs from our root to convey the revocation status of our intermediates.

* **ISRG Root OCSP X1**
  * Subject: `O = Internet Security Research Group, CN = ISRG Root OCSP X1`
  * Key type: `RSA 2048`
  * Validity: until 2025-06-10
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=2929281974), [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)
  * Certificate details (signed by ISRG Root X1): [crt.sh](https://crt.sh/?id=142051103) (expired)

</details>
<p><!-- to get the right line spacing after a block element --></p>

# Chains

When an ACME client downloads a newly-issued certificate from Let's Encrypt's ACME API, that certificate comes as part of a "chain" that also includes one or more intermediates. Usually this chain consists of just the end-entity certificate and one intermediate, but it could contain additional intermediates. The idea is that, by presenting this whole chain of certificates to a website visitor's browser, the browser will be able to validate the signatures all the way up to a root that browser trusts without having to download any additional intermediates.

Sometimes there's more than one valid chain for a given certificate: for example, if an intermediate has been cross-signed, then either one of those two certificates could be the second entry, "chaining up to" either of two different roots. In this case, different website operators may want to select different chains depending on the properties that they care about the most.

Subscriber certificates with RSA public keys are issued from our RSA intermediates, which are issued only from our RSA root ISRG Root X1 (i.e. they are not cross-signed). Therefore, all RSA subscriber certificates have only a single chain available:

<div style="text-align: center">
RSA Subcriber Cert ← RSA Intermediate (R10 or R11) ← ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

Subscriber certificates with ECDSA public keys are issued from our ECDSA intermediates, which are issued both (i.e. are cross-signed) from our RSA root ISRG Root X1 and our ECDSA root ISRG Root X2. Therefore we offer two chains for these certificates:

<div style="text-align: center">
ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X1

ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

The first chain, up to ISRG Root X1, provides the greatest compatibility because that root certificate is included in the most trust stores. The second chain, up to ISRG Root X2, consumes fewer bytes of network bandwidth in each TLS handshake. We provide the first chain by default, to ensure the widest compatibility. Subscribers who wish to prioritize size over compatibility can reference their ACME client's documentation for instructions on how to request the alternate chain (for example, [certbot's `--preferred-chain` flag](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
