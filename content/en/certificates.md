---
title: Chain of Trust
slug: certificates
top_graphic: 5
lastmod: 2019-05-01
aliases: [/certs]
---

# Root Certificates

Our roots are kept safely offline. We issue end-entity certificates to subscribers from the intermediates in the next section.

* Active
  * [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

We've set up websites to test certificates chaining to our roots.

* ISRG Root X1 Valid Certificate
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Revoked Certificate
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Expired Certificate
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Intermediate Certificates

IdenTrust has cross-signed our intermediates. This allows our end certificates to be accepted by all major browsers while we propagate our own root.

Under normal circumstances, certificates issued by Let’s Encrypt will come from “Let’s Encrypt Authority X3”. The other intermediate, “Let’s Encrypt Authority X4”, is reserved for disaster recovery and will only be used should we lose the ability to issue with “Let’s Encrypt Authority X3”. The X1 and X2 intermediates were our first generation of intermediates. We've replaced them with new intermediates that are more compatible with Windows XP.

* Active
  * [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Backup
  * [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Retired
  * [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Cross Signing

Our intermediate “Let’s Encrypt Authority X3” represents a single public/private
key pair. The private key of that pair generates the signature for all end-entity
certificates (also known as leaf certificates), i.e. the certificates we issue
for use on your server.

Our intermediate is signed by ISRG Root X1. However, since we are a very new
certificate authority, ISRG Root X1 is not yet trusted in most browsers. In
order to be broadly trusted right away, our intermediate is also cross-signed by
another certificate authority, IdenTrust, whose root is already trusted in all
major browsers. Specifically, IdenTrust has cross-signed our intermediate using their
"DST Root CA X3" (now called "TrustID X3 Root"). [Download "TrustID X3 Root" on identrust.com](https://www.identrust.com/support/downloads) (or, alternatively, you can download a copy here: [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b)).

That means there are two certificates available that both represent our
intermediate. One is signed by DST Root CA X3, and the other is signed by ISRG
Root X1. The easiest way to distinguish the two is by looking at their Issuer field.

When configuring a web server, the server operator configures not only the
end-entity certificate, but also a list of intermediates to help browsers verify
that the end-entity certificate has a trust chain leading to a trusted root
certificate. Almost all server operators will choose to serve a chain including
the intermediate certificate with Subject “Let’s Encrypt Authority X3” and
Issuer “DST Root CA X3.” The recommended Let's Encrypt software,
[Certbot](https://certbot.org), will make this configuration seamlessly.

The following picture explains the relationships between our certificates
visually:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# OCSP Signing Certificate

This certificate is used to sign OCSP responses for the Let's Encrypt Authority
intermediates, so that we don't need to bring the root key online in order to
sign those responses. A copy of this certificate is included automatically in
those OCSP responses, so Subscribers don't need to do anything with it. It is
included here for informational purposes only.

* [ISRG Root OCSP X1 (Signed by ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Certificate Transparency

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all certificates to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view all
issued Let's Encrypt certificates via these links:

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# More Info

The private keys for the ISRG root CA and the Let’s Encrypt intermediate CAs are stored on hardware security modules (HSMs), which provide a high degree of protection against the keys being stolen.

All ISRG keys are currently RSA keys. We are [planning to generate ECDSA keys](/upcoming-features/).
