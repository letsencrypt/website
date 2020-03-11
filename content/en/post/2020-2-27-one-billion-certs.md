---
author: Josh Aas and Sarah Gran
date: 2020-02-27T00:00:00Z
excerpt: "We issued our billionth certificate on February 27, 2020. We’re going to use this big round number as an opportunity to reflect on what has changed for us, and for the Internet, leading up to this event."
title: "Let's Encrypt Has Issued a Billion Certificates"
slug: one-billion-certs
---

We issued our billionth certificate on February 27, 2020. We’re going to use this big round number as an opportunity to reflect on what has changed for us, and for the Internet, leading up to this event. In particular, we want to talk about what has happened since the last time we talked about a big round number of certificates - [one hundred million](https://letsencrypt.org/2017/06/28/hundred-million-certs.html).

One thing that’s different now is that the Web is much more encrypted than it was. In June of 2017 approximately 58% of page loads used HTTPS globally, 64% in the United States. Today 81% of page loads use HTTPS globally, and we’re at 91% in the United States! This is an incredible achievement. That’s a lot more privacy and security for everybody.

Another thing that’s different is that our organization has grown a bit, but not by much! In June of 2017 we were serving approximately 46M websites, and we did so with 11 full time staff and an annual budget of $2.61M. Today we serve nearly 192M websites with 13 full time staff and an annual budget of approximately $3.35M. This means we’re serving more than 4x the websites with only two additional staff and a 28% increase in budget. The additional staff and budget did more than just improve our ability to scale though - we’ve made improvements across the board to provide even more secure and reliable service.

Nothing drives adoption like ease of use, and the foundation for ease of use in the certificate space is our ACME protocol. ACME allows for extensive automation, which means computers can do most of the work. It was also [standardized as RFC 8555 in 2019](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html), which allows the Web community to confidently build an [even richer ecosystem of software](https://letsencrypt.org/docs/client-options/) around it. Today, thanks to our incredible community, there is an ACME client for just about every deployment environment. Certbot is one of our favorites, and they’ve been working hard to make it [even easier for people to use](https://www.eff.org/deeplinks/2019/10/certbot-usability-case-study-making-it-easier-get-https-certificates).

When you combine ease of use with incentives, that’s when adoption really takes off. Since 2017 browsers have started requiring HTTPS for more features, and they’ve greatly improved the ways in which they [communicate](https://www.blog.google/products/chrome/milestone-chrome-security-marking-http-not-secure/) [to their users](https://blog.mozilla.org/security/2019/10/15/improved-security-and-privacy-indicators-in-firefox-70/) [about the risks](https://support.apple.com/en-us/HT209084#122) of not using HTTPS. When websites put their users at risk by not using HTTPS, major browsers now show stronger warnings. Many sites have responded by deploying HTTPS.

Thanks for taking the time to reflect on this milestone with us. As a community we’ve done incredible things to protect people on the Web. Having issued one billion certificates is affirmation of all the progress we’ve made as a community, and we’re excited to keep working with you to create an even more secure and privacy-respecting Web for everyone.

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.
