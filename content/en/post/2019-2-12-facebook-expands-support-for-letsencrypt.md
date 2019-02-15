---
author: Jon Millican, Software Engineer, Facebook
date: 2019-02-12T00:00:00Z
excerpt: "We’re excited that Facebook is supporting our work through a three-year Platinum sponsorship! We asked them to share their thoughts on HTTPS adoption here. Please join us in thanking Facebook for their support of Let’s Encrypt and our mission to encrypt the Web!"
title: "Facebook Expands Support for Let’s Encrypt"
slug: facebook-expands-support-for-letsencrypt
---

> We’re excited that Facebook is supporting our work through a three-year Platinum sponsorship! We asked them to share their thoughts on HTTPS adoption here. Please join us in thanking Facebook for their support of Let’s Encrypt and our mission to encrypt the Web!
> - Josh Aas, Executive Director, ISRG / Let’s Encrypt

If the web is more secure, everybody wins. A key technology for making this happen is HTTPS, which enables encrypted connections between people and the websites that they visit. Among its many benefits, HTTPS helps to prevent sensitive data from leaking over the network, and from connections being censored or otherwise maliciously manipulated. The more widely it is deployed, the more secure and private the web becomes for everyone.

We have long worked to protect Facebook users from [spammy or malicious content](https://www.facebook.com/notes/facebook-security/link-shim-protecting-the-people-who-use-facebook-from-malicious-urls/10150492832835766/) when navigating away from our platform, and last year we extended this protection to [upgrading outbound HTTP links to HTTPS](https://www.facebook.com/notes/facebook-security/upgrades-to-facebooks-link-security/10155158540455766/) where possible. In this way we can help improve people's security and privacy as they leave our platform. While we take these steps to improve the security and safety of Facebook users, ultimately we hope to see more websites allowing HTTPS connections.

Enabling HTTPS was historically a non-trivial task for any site. It required investment in buying and installing a TLS certificate, which verifies control over the website so that HTTPS can work. The technical difficulty and cost used to serve as barriers to expanding the use of HTTPS across the web. However, things have recently started to change, largely thanks to Let’s Encrypt, a non-profit certificate authority, launched in 2015. 

Let’s Encrypt provides free TLS certificates, which are often installed using a tool maintained by the Electronic Frontier Foundation, to massively simplify enabling HTTPS. With that, Let’s Encrypt is effectively upgrading the security and privacy of the web, at no cost to [over 150 million websites](https://letsencrypt.org/stats/), including those frequented by Facebook users.

We're excited to see the continuous increase in HTTPS adoption across the internet. More websites are choosing to enable secure connections which provide the security and privacy benefits and enable a better browsing experience. For example, navigating from Facebook to another site can be faster over encrypted connections than HTTP, and an increasing number of browser features will only work when sites use HTTPS.

We have sponsored Let's Encrypt from the start, and are proud to share that we are increasing that support as a platinum sponsor. We believe that Let's Encrypt has played a significant and important role in bringing encryption into the mainstream and raising the number of secure sites across the internet. 

As we automatically [crawl](https://developers.facebook.com/docs/sharing/webmasters/crawler/) web content on Facebook (for example, to generate link previews), about 38% of HTTPS domains we observe use Let's Encrypt, making it the top certificate authority. Over 19% of outbound clicks from Facebook to HTTPS-enabled websites go to sites that use certificates from Let's Encrypt. Overall, more than 72% of outbound clicks from Facebook are now destined for HTTPS-enabled websites, including the links that we [upgrade](https://www.facebook.com/notes/protect-the-graph/upgrades-to-facebooks-link-security/2015650322008442/) to HTTPS in real time.

We're proud to continue to collaborate with Let's Encrypt on helping to improve web security. To any website owners who haven't yet enabled encryption, we strongly encourage you to use Let's Encrypt to protect your users and allow HTTPS connections.
