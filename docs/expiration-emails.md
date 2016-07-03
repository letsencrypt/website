---
layout: page
title: Expiration Emails
permalink: /docs/expiration-emails/
top_graphic: 1
---

[<- Back to Documentation List](/docs/)

# Subscribing

If you provide an email address to Let's Encrypt when you create your account, we'll send you expiry notices when your certificate is coming up for renewal.

Our intention is to get this into a system whereby you won't receive a notice in most cases - it would be timed to be conditionally sent after your automated system should have renewed, so that it's an exceptional case to receive one of these notices.

Let's Encrypt's "[Expiration Mailer](https://github.com/letsencrypt/boulder/tree/master/cmd/expiration-mailer)" is still a work in progress. Right now it sends you emails even if you already renewed. We decided it was better to be a bit too verbose than it was to risk people missing renewals.

Thanks for understanding as we keep making things smoother!

# Unsubscribing

The email body has a link to unsubscribe from future notices. If you hit that link, you won't get any future expiration notices. The list of "who's unsubscribed" is independent for Staging notices and Production notices, so you can feel free to unsubscribe from Staging.

There's not yet a way for us to efficiently re-subscribe you if you unsubscribe. Our email provider, Mandrill, [has a manual mechanism that we still need to automate](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).
