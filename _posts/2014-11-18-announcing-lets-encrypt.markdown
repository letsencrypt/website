---
layout: post
title:  "Let’s Encrypt: Delivering SSL/TLS Everywhere"
date:   2014-11-18T07:00
author: Josh Aas, ISRG Executive Director
excerpt: Vital personal and business information flows over the Internet more frequently than ever, and we don't always know when it's happening. It's clear at this point that encrypting is something all of us should be doing. Then why don’t we use <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">TLS (the successor to SSL)</a> everywhere? Every browser in every device supports it. Every server in every data center supports it. Why don’t we just flip the switch?
---

Vital personal and business information flows over the Internet more frequently than ever, and we don't always know when it's happening. It's clear at this point that encrypting is something all of us should be doing. Then why don’t we use <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security">TLS (the successor to SSL)</a> everywhere? Every browser in every device supports it. Every server in every data center supports it. Why don’t we just flip the switch?

The challenge is server certificates. The anchor for any TLS-protected communication is a public-key certificate which demonstrates that the server you’re actually talking to is the server you intended to talk to. For many server operators, getting even a basic server certificate is just too much of a hassle. The application process can be confusing. It usually costs money. It’s tricky to install correctly. It’s a pain to update.

Let’s Encrypt is a new free certificate authority, built on a foundation of cooperation and openness, that lets everyone be up and running with basic server certificates for their domains through a simple one-click process. 

Mozilla Corporation, Cisco Systems, Inc., Akamai Technologies, Electronic Frontier Foundation, IdenTrust, Inc., and researchers at the University of Michigan are working through the Internet Security Research Group (“ISRG”), a California public benefit corporation, to deliver this much-needed infrastructure in Q2 2015. The ISRG welcomes other organizations dedicated to the same ideal of ubiquitous, open Internet security.

The key principles behind Let’s Encrypt are:

* **Free:** Anyone who owns a domain can get a certificate validated for that domain at zero cost.
* **Automatic:** The entire enrollment process for certificates occurs painlessly during the server’s native installation or configuration process, while renewal occurs automatically in the background.
* **Secure:** Let’s Encrypt will serve as a platform for implementing modern security techniques and best practices.
* **Transparent:** All records of certificate issuance and revocation will be available to anyone who wishes to inspect them.
* **Open:** The automated issuance and renewal protocol will be an open standard and as much of the software as possible will be open source. 
* **Cooperative:** Much like the underlying Internet protocols themselves, Let’s Encrypt is a joint effort to benefit the entire community, beyond the control of any one organization.

If you want to help these organizations in making TLS Everywhere a reality, here’s how you can get involved:

* [Sponsor ISRG](/sponsors/)
* [Help Us Build Let's Encrypt](/getinvolved/)

To learn more about the ISRG and our partners, check out our [About](/about/) page.
