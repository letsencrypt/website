---
layout: post
title: "Let's Encrypt Launch Schedule"
date: 2015-6-16T07:00
author: Josh Aas, ISRG Executive Director
excerpt: Let's Encrypt has reached a point where we're ready to announce our launch schedule.
---

Let's Encrypt has reached a point where we're ready to announce our launch schedule.

* First certificate: Week of July 27, 2015
* General availability: Week of September 14, 2015

We will issue the first end entity certificates under our root under tightly controlled circumstances. No cross-signature will be in place yet, so the certificates will not validate unless <a href="https://letsencrypt.org/certificates/">our root</a> is installed in client software. As we approach general availability we will issue more and more certificates, but only for a pre-approved set of domains. This limited issuance period will give us time to further ensure that our systems are secure, compliant, and scalable.

When it's time for general availability, we will open up our systems to certificate requests for any domain. A cross-signature from <a href="https://identrust.com/">IdenTrust</a> will be in place for general availability, so that our certificates will validate automatically for the vast majority of consumers.

Engineering and policy development for Let's Encrypt began in earnest in mid-October of 2014. If we stay true to the schedule outlined above we will have built an innovative CA, capable of operating at Internet scale and without cutting corners, in just eleven months. That's quite a feat, given all that's involved, and a testament to the skill and dedication of our staff, partners, sponsors, and contributors.
