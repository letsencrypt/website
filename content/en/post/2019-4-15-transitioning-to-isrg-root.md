---
author: Josh Aas, ISRG Executive Director
date: 2019-04-15T00:00:00Z
excerpt: "On January 11, 2021, we will change the default intermediate certificate we provide via ACME. Most subscribers don’t need to do anything. Subscribers who support very old TLS/SSL clients may want to manually configure the older intermediate to increase backwards compatibility."
title: "Transitioning to ISRG's Root"
slug: transitioning-to-isrg-root
---

> **Update, September 17, 2020**
> 
> Due to concerns about insufficient ISRG root propagation on Android devices we have [decided to move the date on which we will start serving a chain to our own root](https://community.letsencrypt.org/t/transitioning-to-isrgs-root/94056) to **January 11, 2021**. We had originally delayed this change until September 29, 2020.

On January 11, 2021, we will change the default intermediate certificate we provide via ACME. Most subscribers don’t need to do anything. Subscribers who support [very old TLS/SSL clients](https://letsencrypt.org/docs/certificate-compatibility/#known-incompatible) may want to manually configure the older intermediate to increase backwards compatibility.

Since Let’s Encrypt launched, our certificates have been trusted by browsers via a cross-signature from another Certificate Authority (CA) named [IdenTrust](https://www.identrust.com/). A cross-signature from IdenTrust was necessary because our own root was not yet widely trusted. It takes time for a new CA to demonstrate that it is trustworthy, then it takes more time for trusted status to propagate via software updates.

Now that our own root, [ISRG Root X1](https://letsencrypt.org/certificates/), is [widely trusted by browsers](https://letsencrypt.org/2018/08/06/trusted-by-all-major-root-programs.html) we’d like to transition our subscribers to using our root directly, without a cross-sign.

On <strong>January 11, 2021</strong>, Let’s Encrypt will start serving a certificate chain via the ACME protocol which leads directly to our root, with no cross-signature. Most subscribers don’t need to take any action because their ACME client will handle everything automatically. Subscribers who need to support very old TLS/SSL clients may wish to manually configure their servers to continue using the cross-signature from IdenTrust. You can test whether a given client will work with the newer intermediate by accessing our [test site](https://valid-isrgrootx1.letsencrypt.org/).

Our current cross-signature from IdenTrust expires on March 17, 2021. The IdenTrust root that we are cross-signed from expires on September 30, 2021. Within the next year we will obtain a new cross-signature that is valid until September 29, 2021. This means that our subscribers will have the option to manually configure a certificate chain that uses IdenTrust until <strong>September 29, 2021</strong>.

We’d like to thank IdenTrust for providing a cross-signature while we worked to get our own root trusted. They have been wonderful partners. IdenTrust believed in our mission to encrypt the entire Web when it seemed like a long-term dream. Together, in less than five years, we have helped to raise the percentage of encrypted page loads on the Web from [39% to 78%](https://letsencrypt.org/stats/#percent-pageloads).

Let’s Encrypt is currently providing certificates for more than 160 million websites. We look forward to being able to serve even more websites as efforts like this make deploying HTTPS with Let’s Encrypt even easier. If you’re as excited about the potential for a 100% HTTPS Web as we are, please consider [getting involved](https://letsencrypt.org/getinvolved/), [making a donation](https://letsencrypt.org/donate/), or [sponsoring Let’s Encrypt](https://letsencrypt.org/become-a-sponsor/).
