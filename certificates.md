---
layout: page
title: Certificates
permalink: /certificates/
top_graphic: 5
---

# Root Certificates

* ISRG Root X1 \[[txt](/certs/isrgrootx1.pem.txt)\] \[[pem](/certs/isrgrootx1.pem)\] \[[der](/certs/isrgrootx1.der)\]

# Intermediate Certificates

* Let's Encrypt Authority X3 (IdenTrust cross-signed): \[[txt](/certs/lets-encrypt-x3-cross-signed.pem.txt)\] \[[pem](/certs/lets-encrypt-x3-cross-signed.pem)\] \[[der](/certs/lets-encrypt-x3-cross-signed.der)\]
* Let's Encrypt Authority X4 (IdenTrust cross-signed): \[[txt](/certs/lets-encrypt-x4-cross-signed.pem.txt)\] \[[pem](/certs/lets-encrypt-x4-cross-signed.pem)\] \[[der](/certs/lets-encrypt-x4-cross-signed.der)\]

* Let's Encrypt Authority X1 (IdenTrust cross-signed): \[[txt](/certs/lets-encrypt-x1-cross-signed.pem.txt)\] \[[pem](/certs/lets-encrypt-x1-cross-signed.pem)\] \[[der](/certs/lets-encrypt-x1-cross-signed.der)\]
  * Signed by ISRG Root X1: \[[txt](/certs/letsencryptauthorityx1.pem.txt)\] \[[pem](/certs/letsencryptauthorityx1.pem)\] \[[der](/certs/letsencryptauthorityx1.der)\]
* Let's Encrypt Authority X2 (IdenTrust cross-signed): \[[txt](/certs/lets-encrypt-x2-cross-signed.pem.txt)\] \[[pem](/certs/lets-encrypt-x2-cross-signed.pem)\] \[[der](/certs/lets-encrypt-x2-cross-signed.der)\]
  * Signed by ISRG Root X1: \[[txt](/certs/letsencryptauthorityx2.pem.txt)\] \[[pem](/certs/letsencryptauthorityx2.pem)\] \[[der](/certs/letsencryptauthorityx2.der)\]

Let’s Encrypt will issue certificates to subscribers from its intermediate CAs, allowing us to keep our root CA safely offline. IdenTrust has cross-signed our intermediates. This allows our end certificates to be accepted by all major browsers while we propagate our own root.

Under normal circumstances, certificates issued by Let’s Encrypt will come from “Let’s Encrypt Authority X3”. The other intermediate, “Let’s Encrypt Authority X4”, is reserved for disaster recovery and will only be used should we lose the ability to issue with “Let’s Encrypt Authority X3”. The X1 and X2 intermediates were our first generation of intermediates. We've replaced them with new intermediates that are more compatible with Windows XP.

# Cross Signing

Our intermediate “Let’s Encrypt Authority X1” represents a single public/private
key pair. The private key of that pair generates the signature for all end-entity
certificates (also known as leaf certificates), i.e. the certificates we issue
for use on your server.

Our intermediate is signed by ISRG Root X1. However, since we are a very new
certificate authority, ISRG Root X1 is not yet trusted in most browsers. In
order to be broadly trusted right away, our intermediate is also cross-signed by
another certificate authority, IdenTrust, whose root is already trusted in all
major browsers. Specifically, IdenTrust has cross-signed our intermediate using their
[DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html).

That means there are two certificates available that both represent our
intermediate. One is signed by DST Root CA X3, and the other is signed by ISRG
Root X1. The easiest way to distinguish the two is by looking at their Issuer field.

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers verify
that the end-entity certificate has a trust chain leading to a trusted root
certificate. Almost all server operators will choose to serve a chain including
the intermediate certificate with Subject “Let’s Encrypt Authority X3” and
Issuer “DST Root CA X3.” The official Let's Encrypt software will make this
configuration seamlessly.

The following picture explains the relationships between our certificates
visually:

<img src="/certs/isrg-keys.png">

# Certificate Transparency

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all certificates to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view [all
issued Let's Encrypt certificates at crt.sh](https://crt.sh/?Identity=%25&iCAID=7395).

# More Info

The private keys for the ISRG root CA and the Let’s Encrypt intermediate CAs are stored on hardware security modules (HSMs), which provide a high degree of protection against the keys being stolen.

All ISRG keys are currently RSA keys. We are planning to generate ECDSA keys in
early 2016.
