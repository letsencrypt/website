---
author: Josh Aas
date: 2025-06-26T00:00:00Z
slug: expiration-notification-service-has-ended
title: "Expiration Notification Service Has Ended"
excerpt: "Let's Encrypt ended its certificate-expiration notification emails on June 4, 2025."
display_default_footer: true
display_inline_newsletter_embed: true
---

Since its inception, Let’s Encrypt has been sending expiration notification emails to subscribers that have provided an email address to us via the ACME API. This service ended on June 4, 2025. The decision to end the service is the result of the following factors:

1. Over the past 10 years more and more of our subscribers have been able to put reliable automation into place for certificate renewal.
2. Providing expiration notification emails means that we have to retain millions of email addresses connected to issuance records. As an organization that values privacy, removing this requirement is important to us.
3. Providing expiration notifications costs Let's Encrypt tens of thousands of dollars per year, money that we believe can be better spent on other aspects of our infrastructure.
4. Providing expiration notifications adds complexity to our infrastructure, which takes time and attention to manage and increases the likelihood of mistakes being made. Over the long term, particularly as we add support for new service components, we need to manage overall complexity by phasing out system components that can no longer be justified.

For those who would like to continue receiving expiration notifications, we recommend using a third party service such as Red Sift Certificates Lite (formerly Hardenize). Red Sift’s monitoring service providing expiration emails is free of charge for up to 250 certificates. More monitoring options can be found here.

We have deleted the email addresses provided to Let’s Encrypt via the ACME API that were stored in our CA database in association with issuance data. This doesn't affect addresses signed up to mailing lists and other systems. They are managed in a separate ISRG system unassociated with issuance data.

Going forward, if an email address is provided to Let’s Encrypt via the ACME API, Let’s Encrypt will not store the address but will instead forward it to the general ISRG mailing list system unassociated with any account data. If the email address has not been seen before, that system may send an onboarding email with information about how to subscribe to various sources of updates.

If you’d like to stay informed about technical updates and other news about Let’s Encrypt and our parent nonprofit, ISRG, based on the preferences you choose, you can sign up for our email lists below:
