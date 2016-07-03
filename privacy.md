---
layout: page
title: Privacy Policy
permalink: /privacy/
top_graphic: 4
---

# Let's Encrypt Privacy Policy

<em>Updated September 9, 2015<em>

The Let's Encrypt Privacy Policy describes how we collect, use, and and disclose your information in three different contexts:

* When, as a Public User, you visit a web site secured with HTTPS that uses a certificate from Let's Encrypt,
* When you are a Subscriber, i.e., when you request and use certificates from Let's Encrypt,
* When you are a Visitor to the Let's Encrypt web site, community discussion forum and other web pages under letsencrypt.org.

## Public User

When you use an HTTPS web site or other TLS service with a Let's Encrypt certificate, your browser (or TLS client) may make an OCSP request to Let's Encrypt. This OCSP request is used to check whether the certificate has been revoked. OCSP requests convey your IP address and the User Agent string for your browser, which may be unique. We do not use data from OCSP requests to build profiles or identify individuals. Logs are temporarily collected by our CDN provider for operational purposes but are normally deleted in less than seven days. We may retain a subset of OCSP request logs for longer periods in order to investigate software failures or abuse. If we do so, we will delete any stored logs when we are done investigating. We may also compute, retain and publish aggregate information from OCSP request logs, such as which certificates generate the largest volume of requests. We will always strive to ensure that such datasets do not contain information about the activities of identifiable users or devices.

## Subscriber

If you are a Subscriber, your rights and obligations are governed by the [applicable CPS](/repository/). In the event of a conflict between the CPS and this Privacy Policy, the CPS governs your rights and obligations. If you are a Subscriber, you are requesting a trusted certificate from Let's Encrypt intended to publicly vouch that you control a certain domain name or names that are reachable on the Internet. As part of the process of proving that control, Let's Encrypt will collect various information and store it indefinitely. That information includes, but isn't limited to: the IP address from which you access the Let's Encrypt service; all resolved IP addresses for any domain names requested; server information related to any validation requests; full logs of all inbound HTTPS / ACME requests, and all outbound validation requests; information sent by or inferrable from your client software; and any contact information you provide. Let's Encrypt may make public any of this information except the information you provide for account recovery purposes: for instance, your recovery email address or phone number. We will share account recovery information only in accordance with "What We Share," below. Additionally, as a Subscriber, you may need to download client software from a repository such as those run by Debian, Ubuntu, Red Hat, or Github. Your interaction with such a software repository is governed by that repository's own privacy policy and/or Terms of Use.

## Visitor

When you are a Visitor browsing the Let's Encrypt web site, we collect personally identifying information only if you use the donate button or sign up to use the Let's Encrypt community support forum. If you use the Donate button, your interactions with PayPal are governed by the [PayPal privacy policy](https://www.paypal.com/us/webapps/mpp/ua/privacy-full). We will receive personally identifiable information from PayPal regarding your donation and retain it indefinitely as part of our record keeping. If you use the Let's Encrypt community support forum, your actions there are governed by the privacy policy of our hosting and software provider for the forum, [Civilized Discourse Construction Kit](http://www.discourse.org/privacy-policy/). Data you provide when signing up for the forum, including email address and IP address, is retained indefinitely and we may share it as described below in "What We Share."

Additionally, we may use third-party analytics services like Google Analytics to gauge traffic and popular pages on our web site. Third party analytics services will set and receive first-party cookies. These cookies do not contain personal information, but uniquely identify your browser software over time on our site. We respect the [Do Not Track header](http://donottrack.us/) by strictly limiting the information our analytics services can collect and share for all Visitors.

## What We Share

To the extent we possess it, we may disclose personally identifiable information about you to third parties in limited circumstances. Such circumstances include when we have your consent or when we have a good faith belief it is required by law, such as pursuant to a subpoena or other judicial or administrative order. We may also disclose account recovery information when we have a good faith belief it is necessary to prevent loss of life, personal injury, damage to property, or significant financial harm.

If we are required by law to disclose the information that you have submitted, we will attempt to provide you with prior notice (unless we are prohibited or it would be futile) that a request for your information has been made in order to give you an opportunity to object to the disclosure. We will attempt to provide this notice by whatever means is reasonably practical. If you do not challenge the disclosure request, we may be legally required to turn over your information.

In addition, we reserve the right, solely at our discretion, to independently object to certain requests (for access to information about users of our products and technologies) that we believe to be improper.

For more information, or to report a privacy issue, please contact: [security@letsencrypt.org](mailto:security@letsencrypt.org)
