---
layout: post
title: "New Name, New Home for the Let's Encrypt Client Software"
date: 2016-3-9T05:00
author: Josh Aas, ISRG Executive Director
excerpt: Over the next few months the Let’s Encrypt client software (not the service) will transition to a new name, soon to be announced, and a new home at the Electronic Frontier Foundation (EFF).
---

*Update: Added clarification that only the Let's Encrypt client software is changing its name and host. The Let's Encrypt certificate authority and associated services are not changing names or relocating.*

Over the next few months the Let’s Encrypt client software will transition to a new name, soon to be announced, and a new home at the [Electronic Frontier Foundation (EFF)](https://www.eff.org/).

This change does not affect the Let's Encrypt certificate authority (CA) or associated services, which will retain the Let's Encrypt name and continue to be hosted by the [Internet Security Research Group](https://letsencrypt.org/isrg/).

The goal of Let’s Encrypt is to make turning on HTTPS as easy as possible. To accomplish that, it’s not enough to fully automate certificate issuance on the certificate authority (CA) side - we have to fully automate on the client side as well. The Let’s Encrypt client is now being used by hundreds of thousands of websites and we expect it to continue to be a popular choice for sites that are run from a single server or VPS.

That said, the web server ecosystem is complex, and it would be impossible for any particular client to serve everyone well. As a result, the Let’s Encrypt community has created dozens of clients to meet many diverse needs. Moving forward, we feel it would be best for Let’s Encrypt to focus on promoting a generally healthy client and protocol ecosystem and for our client to move to the EFF. This will also allow us to focus our engineering efforts on running a reliable and rapidly growing CA server infrastructure.

The Let’s Encrypt client goes further than most other clients in terms of end-to-end automation and extensibility, both getting certificates and in many cases installing them. This is an important strategy since major servers don’t yet have built-in support, and we want to make sure it’s given a proper chance to thrive. The EFF has led development of the Let’s Encrypt client from the beginning, and they are well-qualified to continue pursuing this strategy.

The rename is happening for reasons that go beyond the move to the EFF. One additional reason for the rename is that we want the client to be distributable and customisable without having to create a complex process for deciding whether customized variants are appropriate for use with Let’s Encrypt trademarks. Another reason is that we want it to be clear that the client can work with any ACME-enabled CA in the future, not just Let’s Encrypt.

We expect the client to do well at the EFF and continue to be used by many people to get certificates from Let’s Encrypt.
