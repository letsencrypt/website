---
author: Josh Aas, ISRG Executive Director
date: 2019-05-15T00:00:00Z
excerpt: "Today we are announcing a new Certificate Transparency log called Oak."
title: "Introducing Oak, a Free and Open Certificate Transparency Log"
slug: introducing-oak-ct-log
---

> **Update: Feb. 5 2020**
>
> The Let’s Encrypt CT logs are now included in approved log lists and are usable by all publicly-trusted certificate authorities.

Today we are announcing a new [Certificate Transparency log called Oak](https://letsencrypt.org/docs/ct-logs). The Oak log will be operated by Let’s Encrypt and all publicly trusted certificate authorities will be welcome to submit certificates.

[Sectigo](https://sectigo.com/) generously provided funding to cover a significant portion of our costs to run our CT log. “Sectigo is proud to sponsor the Let’s Encrypt CT Log.  We believe this initiative will provide much-needed reinforcement of the CT ecosystem,” said Ed Giaquinto, Sectigo’s CIO. We thank them for their collaboration to improve Internet security.


[Certificate Transparency (CT)](https://www.certificate-transparency.org/what-is-ct) is a system for logging and monitoring certificate issuance. It greatly enhances everyone’s ability to monitor and study certificate issuance, and these capabilities have led to numerous improvements to the CA ecosystem and Web security. As a result, it is rapidly becoming critical Internet infrastructure. Let’s Encrypt accelerated the adoption of CT by logging every certificate since we started issuing in 2015 - approximately half a billion certificates at this point.

We decided to create and operate a CT log for a few reasons. First, operating a log is consistent with our mission to create a more secure and privacy-respecting Web. We believe transparency increases security and empowers people to make well-informed decisions. Second, operating a log helps us take control of our destiny. Google Chrome requires all new certificates to be submitted to two separate logs, so multiple log options are imperative to our operation. Finally, Let’s Encrypt often issues [more than 1M certificates each day](https://letsencrypt.org/stats/), so we wanted to design a CT log that is optimized for high volume. We’ve designed our log to be able to handle submissions from all other publicly trusted Certificate Authorities so they can use Oak to fulfill their logging requirements as well.

Our log uses Google’s [Trillian software](https://github.com/google/trillian/) running on AWS infrastructure. We use Kubernetes for container orchestration and job scheduling and AWS RDS for database management.

We are submitting our log for inclusion in the approved log lists for [Google Chrome](https://cs.chromium.org/chromium/src/components/certificate_transparency/data/log_list.json) and [Apple Safari](https://valid.apple.com/ct/log_list/current_log_list.json). Following 90 days of successful monitoring, we anticipate our log will be added to these trusted lists and that change will propagate to people’s browsers with subsequent browser version releases.

Continuing the forest theme, we are also announcing the launch of our open source CT monitoring tool, [CT Woodpecker](https://github.com/letsencrypt/ct-woodpecker). We use it to monitor and ensure compliance for our log and we’ve made it open source so others in the CT ecosystem can use it as well.

We’d like to thank Google, Sectigo, Cloudflare, and DigiCert for also running open logs, and we look forward to contributing to better transparency in Web security!

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
