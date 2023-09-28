---
author: Sarah Gran
date: 2021-10-28T00:00:00Z
excerpt: "How OVHcloud uses Let's Encrypt certificates for millions of European customers"
title: "TLS Simply and Automatically for Europe’s Largest Cloud Customers"
slug: tls-simply-and-automatically
---
OVHcloud, the largest hosting provider in Europe, has used Let’s Encrypt for TLS certificates since 2016. Since then, they’ve provisioned tens of millions of certificates for their shared hosting customers. We often get asked about how large integrations work and their best practices so this will be the first in a series of blog posts we’ll publish on the topic.

[OVHcloud](https://ovhcloud.com/) first started looking into using Let’s Encrypt certificates because the team saw a need for the protection provided by TLS for every customer (remember, way back five years ago, when that wasn’t just a thing everybody did?). “Our goal was to deliver TLS simply. We didn’t want to have to write a tutorial for our customers to upload a cert, but instead just click and it works,” said Guillaume Marchand, OVHcloud’s Technical Team Lead.

They considered building their own CA but determined the cost and complexity of doing so would be impractical. Instead, they build an ACME client to prepare for using Let’s Encrypt. It took about six months, “we simply followed the RFC and did a bit of reverse engineering of Certbot,” said Guillaume. In addition to a custom client, OVHcloud automated their Certificate Signing Request (CSR) process and certificate installation process.

<p class="text-center"><img src="/images/2021.10.28-OVHcloud-schematic.png" alt="Schematic of how OVHcloud automatically and simply gets Let's Encrypt certificates"></p>

Getting a TLS certificate is on the critical path to onboarding a shared hosting client, so monitoring is a big part of OVHcloud’s success with Let’s Encrypt. They set up monitoring at every step in the delivery process: requesting the certificate, asking for challenges, waiting for validation, and requesting certificate creation. They also keep an eye on how long it takes to get a certificate (“it’s really fast”). OVHcloud also monitors our [status page](https://letsencrypt.status.io/) to stay apprised of our operational status.

Over 10,000 certificates are issued from Let’s Encrypt to OVHcloud every day. As the company continues to expand into North America, they predict that number will grow. The initial and ongoing work done by the OVHcloud team ensures that TLS will be a simple and reliable aspect of their service.

OVHcloud is a longtime sponsor of ISRG so we’d like to close by thanking them for not just being great technical collaborators, but also financial supporters.

Check out our blog post about [how Shopify uses Let’s Encrypt certificates](https://letsencrypt.org/2021/09/14/speed-at-scale-shopify.html) for another example of how our certificates are used in the enterprise.

## Supporting Let’s Encrypt
As a nonprofit project, 100% of our funding comes from contributions from our community of users and supporters. We depend on their support in order to provide our services for the public benefit. If your company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). If you can support us with a [donation](https://letsencrypt.org/donate/), we ask that you make an individual contribution.
