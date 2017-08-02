---
layout: page
title: Expiration Emails
permalink: /docs/expiration-emails/
top_graphic: 1
date: 2016-07-02T00:00
---

Last updated: {{ page.date | date: "%B %d, %Y" }} \| [See all Documentation](/docs/)

# Subscribing

If you provide an email address to Let's Encrypt when you create your
account, we'll automatically send you expiry notices when your certificate
is coming up for renewal. We send the first notice at 20 days before
your certificate expires, and more notices at 10 days and 1 day before
it expires.

# When You Get an Expiration Email

If your certificate is already renewed, we won't send an expiry notice. We
consider a certificate to be renewed if there is a newer certificate
with the exact same set of names, regardless of which account created it.
If you've issued a new certificate that adds or removes a name relative to your
old certificate, you will get expiration email about your old certificate.
If you check the certificate currently running on your website, and it
shows the correct date, no further action is needed.

# Unsubscribing

The email body has a link to unsubscribe from future notices. If you
hit that link, you won't get any expiration notices for the next year.
The list of "who's unsubscribed" is independent for Staging notices and
Production notices, so you can feel free to unsubscribe from Staging without
affecting your Production status.

Note that your unsubscribe is only valid for one year, so you will have to
renew it every year.

There's not yet a way for us to efficiently re-subscribe
you if you unsubscribe. Our email provider, Mandrill,
[has a manual mechanism that we still need to
automate](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).

However, you can change the email address on your account, which effectively
re-subscribes you. Many common email services treat `yourname+1@example.com` the
same as `yourname@example.com`. So if you update your email address to
`yourname+1@example.com`, you can start getting expiry mail again. With Certbot,
use:

` ~/certbot/venv/bin/certbot  register --update-registration --email yourname+1@example.com`
