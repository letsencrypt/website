---
author: Josh Aas
date: 2025-01-22T00:00:00Z
slug: ending-expiration-emails
title: "Ending Support for Expiration Notification Emails"
excerpt: "We will no longer send email reminders about upcoming certificate expirations."
display_default_footer: true
display_inline_newsletter_embed: true
---

Since its inception, Let's Encrypt has been sending expiration notification emails to subscribers that have provided an email address to us. We will be ending this service on June 4, 2025. The decision to end this service is the result of the following factors:

1. Over the past 10 years more and more of our subscribers have been able to put reliable automation into place for certificate renewal.

2. Providing expiration notification emails means that we have to retain millions of email addresses connected to issuance records. As an organization that values privacy, removing this requirement is important to us.

3. Providing expiration notifications costs Let's Encrypt tens of thousands of dollars per year, money that we believe can be better spent on other aspects of our infrastructure.

4. Providing expiration notifications adds complexity to our infrastructure, which takes time and attention to manage and increases the likelihood of mistakes being made. Over the long term, particularly as we add support for new service components, we need to manage overall complexity by phasing out system components that can no longer be justified.

For those who would like to continue receiving expiration notifications, we recommend using a third party service such as [Red Sift Certificates Lite](https://redsift.com/pulse-platform/certificates-lite) (formerly Hardenize). Red Sift's monitoring service providing expiration emails is free of charge for up to 250 certificates. More monitoring options can be found [here](/docs/monitoring-options).

While we will be minimizing the email addresses we retain connected to issuance data, you can opt in to receive other emails. We’ll keep you informed about technical updates, and other news about Let’s Encrypt and our parent nonprofit, [ISRG](http://abetterinternet.org), based on the preferences you choose.  You can sign up for our email lists below: