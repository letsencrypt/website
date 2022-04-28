---
author: Sarah Gran
date: 2022-04-28T00:00:00Z
slug: database-to-app-TLS
title: "TLS Beyond the Web: How MongoDB Uses Let’s Encrypt for Database-to-Application Security"
excerpt: "MongoDB uses millions of Let’s Encrypt certs for critical workloads."
---

Most of the time, people think about using Let's Encrypt certificates to encrypt the communication between a website and server. But connections that need TLS are everywhere! In order for us to have an Internet that is 100% encrypted, we need to think beyond the website.

MongoDB's managed multicloud database service, called Atlas, uses Let's Encrypt certificates to secure the connection between customers' applications and MongoDB databases, and between service points inside the platform. We spoke with Kenn White, Security Principal at MongoDB, about how his team uses Let's Encrypt certificates for over two million databases, across 200 datacenters and three cloud providers.

&quot;Let's Encrypt has become a core part of our infrastructure stack,&quot; said Kenn. Interestingly, our relationship didn't start out that way. MongoDB became a financial sponsor of Let's Encrypt years earlier simply to support our mission to pursue security and privacy. MongoDB Atlas began to take off and it became clear that TLS would continue to be a priority as they brought on customers like currency exchanges, treasury platforms and retail payment networks. &quot;The whole notion of high automation and no human touch all really appealed to us,&quot; said Kenn of MongoDB's decision to use Let's Encrypt.

MongoDB's diverse customer roster means they support a wide variety of languages, libraries, and operating systems. Subsequently, their monitoring is quite robust. Over the years, MongoDB has become a helpful resource for Let's Encrypt engineers to identify edge case implementation bugs. Their ability to accurately identify issues early helps us respond efficiently; this is a benefit that ripples out across our diverse subscribers all over the Web.

The open sharing of information is a core part of how Let's Encrypt operates. In fact, &quot;transparency&quot; is one of our [key operating principles](/about/). The ability to see and understand how Let's Encrypt is changing helped MongoDB gain trust and confidence in our operations. &quot;I don't think you can really put a price on the experience we've had working with the Let's Encrypt engineering team,&quot; said Kenn. &quot;One thing that I appreciate about Let's Encrypt is that you've always been extremely transparent on your priorities and your roadmap vision. In terms of the technology and your telemetry, this is an evolution; where you are today is far better than where you were two years ago. And two years ago you were already head and shoulders above almost every peer in the industry.&quot;

Check out other blog posts in this series about how other large subscribers use Let's Encrypt certificates.

[TLS Simply and Automatically for Europe's Largest Cloud Customers](/2021/10/28/tls-simply-and-automatically.html)

[Speed at scale: Let's Encrypt serving Shopify's 4.5 million domains](/2021/09/14/speed-at-scale-shopify.html)

## Supporting Let’s Encrypt

As a nonprofit project, 100% of our funding comes from contributions from our community of users and supporters. We depend on their support in order to provide our services for the public benefit. If your
company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). If you can support us with a [donation](/donate/), we ask that you make an individual contribution.
