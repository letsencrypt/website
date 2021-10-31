---
author: Dan Fernelius
date: 2021-09-14T00:00:00Z
excerpt: "What does it take to manage TLS certificates at a leading e-commerce company?"
title: "Speed at scale: Let’s Encrypt serving Shopify’s 4.5 million domains"
slug: speed-at-scale-shopify
---

What does it take to manage TLS certificates at a leading e-commerce company? Before Let’s Encrypt, it took the security team at Shopify weeks to manually obtain certificates for their websites. Doing this once is unpleasant enough, but if an incident were to happen that necessitated renewing all of their certificates, Shopify estimated it would take them 100+ days without automated issuance and management.

Today, Let’s Encrypt provides TLS for 4.5 million Shopify domains. We sat down with Charles Barbier, Development Manager at Shopify, to hear why Let’s Encrypt is their choice for reliable, free, and automated TLS at scale. 

“In 2016, the TLS team started transitioning all of our merchants' stores to HTTPS through Let’s Encrypt,” Charles said. “And when we started exploring the concept a few years earlier, it was a daunting task.”  Implementing TLS for 680,000+ domains wasn’t just daunting, Charles and the team needed automated management, something that simply didn’t exist. “We didn’t want to have TLS be the merchant’s responsibility,” Charles said. 

Back in 2016, although Let’s Encrypt had been making noise, it wasn’t Shopify’s first choice for a CA. “We ended up going with a different option that turned out to be problematic because the API was so slow,” Charles said. “We did some napkin math and realized it was going to take us around 100 days to provision all of our certs for our merchants. If this solution had been just for regular issuance, it would have been fine, but an emergency  would be very problematic.”

That realization led Charles and the team to give Let’s Encrypt a try, making them one of the first single Let’s Encrypt subscribers to request and provision certs at a X00,000 scale. “We were able to roll out all of our domains in a couple of hours,” Charles said. “And to be frank, I think it was our ordering process that caused issuance to take even that long. It was very encouraging.” 

The speed of Let’s Encrypt helped Shopify realize their goal of provisioning certs for all of their domains and automating management. Since Let’s Encrypt uses the [IETF-standardized ACME protocol](https://datatracker.ietf.org/doc/html/rfc8555), Shopify felt confident that if they needed to, they could roll over to a different ACME CA. “We knew in the future, if things went well with the ACME standard, we’d be able to add a different ACME provider with the exact same implementation,” Charles said. 

Of course, “things going well” doesn’t just mean technically. It means ensuring the nonprofit behind Let’s Encrypt is sound as well—which is why Shopify has financially supported Let’s Encrypt since they began using it in 2016. This year, they increased their support. “For us, using Let’s Encrypt has been a great experience,” Charles said. 

Today, Let’s Encrypt certificates cover 4.5 million domains for Shopify. That means a more secure and privacy-respecting Web for all of Shopify’s merchants who, in 2020, created $307 billion in economic impact around the world. And it means a more secure Web for everyone visiting and engaging with a Shopify merchant. 

We’re proud to serve Shopify with a reliable, speedy, and free service, and grateful for their longtime support of our work by being a sponsor. Together, we’re helping bolster a Web that’s free, open and more secure for everyone, everywhere.

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
