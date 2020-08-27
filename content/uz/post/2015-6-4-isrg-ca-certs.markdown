---
author: Josh Aas, ISRG Executive Director
date: 2015-06-04T00:00:00Z
excerpt: The keys and certificates that will underlie Let's Encrypt have been generated.
title: Let's Encrypt Root and Intermediate Certificates
slug: isrg-ca-certs
---

The keys and certificates that will underlie Let's Encrypt have been generated. This was done during a key ceremony at a secure facility today. The following objects were created:

* Key pair and self-signed cert for the ISRG root
* Key pair and certificate for the ISRG root's OCSP
* Key pairs and certificates for two Let’s Encrypt intermediate CAs
* CRL under the ISRG root showing that the Let’s Encrypt intermediates have not been revoked

The certificates over the public keys, of course, can be made public:

* <a href="/certs/isrgrootx1.pem.txt">ISRG Root X1 Certificate</a>
* <a href="/certs/letsencryptauthorityx1.pem.txt">Let's Encrypt Intermediate X1 CA Certificate</a>
* <a href="/certs/letsencryptauthorityx2.pem.txt">Let's Encrypt Intermediate X2 CA Certificate</a>

Let's Encrypt will issue certificates to subscribers from its intermediate CAs, allowing us to keep our root CA safely offline. IdenTrust will cross-sign our intermediates. This will allow our end certificates to be accepted by all major browsers while we propagate our own root.

Under normal circumstances, certificates issued by Let's Encrypt will come from "Let's Encrypt Intermediate X1". The other intermediate, "Let's Encrypt Intermediate X2", is associated with our disaster recovery site and will only be used should we lose the ability to issue with "Let's Encrypt Intermediate X1".

![ISRG Key Diagram](/images/isrg-keys.png "ISRG Key Diagram")

The private keys for the ISRG root CA and the Let’s Encrypt intermediate CAs are stored on hardware security modules (HSMs), which provide a high degree of protection against the keys being stolen.

All ISRG keys are currently RSA keys. We are planning to generate ECDSA keys later this year.

The generation of these keys and certificates is an important step in getting Let's Encrypt ready to issue certificates. In the next few weeks, we'll be saying some more about our plans for going live. In the mean time, we would love for you to [get involved](https://letsencrypt.org/getinvolved/).