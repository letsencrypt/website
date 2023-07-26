---
author: Josh Aas
date: 2023-03-23T00:00:00Z
slug: improving-resliiency-and-reliability-with-ARI
title: "Improving Resiliency and Reliability for Let’s Encrypt with ARI"
excerpt: "The ACME Renewal Information (ARI) protocol extension enables certificate revocation and renewal at scale. "
---

The Let's Encrypt team is excited to announce that [ACME Renewal Information (ARI)](https://datatracker.ietf.org/doc/draft-ietf-acme-ari/) is live in production! ARI makes it possible for our subscribers to handle certificate revocation and renewal as easily and automatically as the process of getting a certificate in the first place.

With ARI, Let's Encrypt can signal to ACME clients when they should renew certificates. In the normal case of a certificate with a 90 day lifetime, ARI might signal for renewal at 60 days. If Let's Encrypt needs to revoke a certificate for some reason, ARI can signal that renewal needs to happen prior to the revocation. This means that even in extenuating circumstances, renewal can happen in an entirely automated way without disrupting subscriber services.

Without ARI, an unexpected revocation event might mean that Let's Encrypt would have to send emails to affected subscribers, maybe those emails are read in time to avoid a service disruption, maybe they aren't, and engineers have to manually take action to trigger early renewals, possibly in the middle of the night. We can't wait for ARI to make this scenario a thing of the past.

ARI has a couple of additional benefits for Let's Encrypt and our subscribers. First, we can use ARI to help modulate renewals as needed to avoid load spikes on the Let's Encrypt infrastructure (of course subscribers can still renew whenever they want or need, as ARI is merely a signal or suggestion). Second, ARI can be used to set subscribers up for success in terms of ideal renewal times in the event that Let's Encrypt offers even shorter-lived certificates in the future.

ARI has been [standardized](https://datatracker.ietf.org/doc/draft-ietf-acme-ari/) in the IETF, a process that started with an [email](https://mailarchive.ietf.org/arch/msg/acme/b-RddSX8TdGYvO3f9c7Lzg6I2I4/) from Let's Encrypt engineer Roland Shoemaker in March of 2020. In September of 2021 Let's Encrypt engineer Aaron Gable submitted the first draft to the IETF's ACME working group, and now ARI is in production. The next step is for ACME clients to start supporting ARI, a process we plan to help with as best we can in the coming months.

ARI is a huge step forward for agility and resiliency in the TLS certificate ecosystem and we're excited to see it gain widespread adoption!

Supporting Let's Encrypt
------------------------

As a project of the [Internet Security Research Group](https://abetterinternet.org/) (ISRG), 100% of our funding comes from contributions from our community of users and supporters. We depend on their support in order to provide our public benefit services. If your company or organization would like to sponsor Let's Encrypt please email us at sponsor@letsencrypt.org. If you can support us with a [donation](/donate/), we ask that you make an individual contribution.
