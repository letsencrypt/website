---
author: Josh Aas, ISRG Executive Director
date: 2018-12-31T00:00:00Z
excerpt: Let’s Encrypt had a great year in 2018. We’re now serving more than 150 million websites while maintaining a stellar security and compliance track record.
title: "Looking Forward to 2019"
slug: looking-forward-to-2019
---

Let’s Encrypt had a great year in 2018. We’re now serving more than 150 million websites while maintaining a stellar security and compliance track record.

Most importantly though, the Web went from 67% encrypted page loads to 77% in 2018, according to statistics from Mozilla. This is an incredible rate of change!

We'd like to thank all of the people and organizations who worked hard to create a more secure and privacy-respecting Web.

This year we created a new website for the legal entity behind Let's Encrypt, [Internet Security Research Group (ISRG)](https://www.abetterinternet.org/), because we believe there will be other instances beyond Let's Encrypt in which ISRG might be able to help to build, or improve access to, a better Internet. 

While we’re proud of what we accomplished in 2018, we spend most of our time looking forward rather than back. As we wrap up our own planning process for 2019, I’d like to share some of our plans with you, including both the things we’re excited about and the challenges we’ll face. We’ll cover service growth, new features, infrastructure, and finances.

## Service Growth

Let’s Encrypt helps to drive HTTPS adoption by offering a free, easy to use, and globally available option for obtaining the certificates required to enable HTTPS. HTTPS adoption on the Web took off at an unprecedented rate from the day Let’s Encrypt launched to the public.

The number of certificates and unique domains we support continues to grow rapidly:

<div class="figure">
  <div id="activeUsage" title="Let's Encrypt Growth" class="statsgraph"></div>
</div>
<script src="/js/stats.js" async></script>
<script src="/js/plotly-min.js" async></script>

We expect strong growth again in 2019, likely up to 120M active certificates and 215M fully qualified domains. You can view our recently revamped [stats page](https://letsencrypt.org/stats/) for more information.

One of the reasons Let’s Encrypt is so easy to use is that our community has done great work making client software that works well for a wide variety of platforms. We’d like to thank everyone involved in the development of more than 85 [client software options](https://letsencrypt.org/docs/client-options/) for Let’s Encrypt. Support for our protocol, ACME, is [built in to Apache](https://letsencrypt.org/2017/10/17/acme-support-in-apache-httpd.html) and we’re hoping 2019 will be the year that it comes to Nginx.

Other organizations and communities are also doing great work to promote HTTPS adoption, and thus stimulate demand for our services. For example, browsers are starting to make their users more aware of the risks associated with unencrypted HTTP (e.g. [Firefox](https://blog.mozilla.org/security/2018/01/15/secure-contexts-everywhere/), [Chrome](https://www.blog.google/products/chrome/milestone-chrome-security-marking-http-not-secure/)). Many hosting providers and CDNs are making it easier than ever for all of their customers to use HTTPS. [Government agencies](https://https.cio.gov/) are waking up to the need for stronger security to protect constituents. The media community is working to [Secure the News](https://securethe.news/).

## New Features

In 2018 we introduced [several new features](https://letsencrypt.org/upcoming-features/), including ACMEv2 support and wildcard certificates. We’ve got some exciting features planned for 2019.

The feature we’re most excited about is multi-perspective validation. Currently, when a subscriber requests a certificate, we validate domain control from a single network perspective. This is standard practice for CAs. If an attacker along the network path for the validation check can interfere with traffic they can potentially cause certificates to be issued that should not be issued. We’re most concerned about this [happening via BGP hijacking](https://www.princeton.edu/~pmittal/publications/bgp-tls-usenix18.pdf), and since BGP is not going to be secured any time soon, we needed to find another mitigation. The solution we intend to deploy in 2019 is multi-perspective validation, in which we will check from multiple network perspectives (distinct Autonomous Systems). This means that potential BGP hijackers would need to hijack multiple routes at the same time in order to pull off a successful attack, which is significantly more difficult than hijacking a single route. We are working with a talented research team at Princeton to design the most effective multi-perspective validation system we can, and have already turned parts of this feature on in our staging environment.

We are also planning to introduce a [Certificate Transparency (CT) log](https://www.certificate-transparency.org/) in 2019. All certificate authorities like Let’s Encrypt are required to submit certificates to CT logs but there are not enough stable logs in the ecosystem. As such, we are moving forward with plans to run a log which all CAs will be able to submit to.

We had planned to add ECDSA root and intermediate certificates in 2018 but other priorities ultimately took precedence. We hope to do this in 2019. ECDSA is generally considered to be the future of digital signature algorithms on the Web due to the fact that it is more efficient than RSA. Let’s Encrypt will currently sign ECDSA keys from subscribers, but we sign with the RSA key from one of our intermediate certificates. Once we have an ECDSA root and intermediates, our subscribers will be able to deploy certificate chains which are entirely ECDSA.

## Infrastructure

Our CA infrastructure is capable of issuing millions of certificates per day with redundancy for stability and a wide variety of security safeguards, both physical and logical. Our infrastructure also generates and signs around 40 million OCSP responses daily, and serves those responses approximately 5.5 billion times per day. We expect these numbers to grow approximately 40% in 2019.

Our physical CA infrastructure currently occupies approximately 55 units of rack space, split between two datacenters, consisting primarily of compute servers, storage, HSMs, switches, and firewalls. When we issue more certificates it puts the most stress on storage for our databases. We regularly invest in more and faster storage for our database servers, and that will continue in 2019.

All of our infrastructure is managed by our Site Reliability Engineering (SRE) team, which is comprised of six people. SRE staff are responsible for building and maintaining all physical and logical CA infrastructure. These staff are largely responsible for our high standards for security and compliance. The team also manages a 24/7/365 on-call schedule and they are primary participants in both security and compliance audits.

## Finances

We pride ourselves on being an efficient organization. In 2019 Let’s Encrypt will secure a massive portion of the Web with a budget of only $3.6M. We believe this represents an incredible value and that contributing to Let’s Encrypt is one of the most effective ways to help create a more secure and privacy-respecting Web.

Our 2019 fundraising efforts are off to a strong start with Platinum sponsorships from Cisco, OVH, Mozilla, Google Chrome, Electronic Frontier Foundation, and Internet Society, as well as [many other Gold and Silver sponsors](https://letsencrypt.org/sponsors/). The Ford Foundation has renewed their grant to Let’s Encrypt as well. We are seeking additional sponsorship and grant assistance to meet our full needs for 2019.

## Support Let’s Encrypt

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://letsencrypt.org/become-a-sponsor/) Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.

We’re grateful for the industry and community support that we receive, and we look forward to continuing to create a more secure and privacy-respecting Web!