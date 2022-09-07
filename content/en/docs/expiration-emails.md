---
title: Expiration Emails
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2022-09-06
show_lastmod: 1
---


# Subscribing

If you provide an email address to Let's Encrypt when you create your
account, we'll do our best to automatically send you expiry notices
when your certificate is coming up for renewal. We try to send the first
notice at 20 days before your certificate expires, and the second and final notice
at 10 days before it expires. We recommend that you rely on
your ACME client to automatically renew your certificates, and only use
these expiry notices as a warning to check on your automation.

# When You Get an Expiration Email

If your certificate is already renewed, we won't send an expiry notice. We
consider a certificate to be renewed if there is a newer certificate
with the exact same set of names, regardless of which account created it.
If you've issued a new certificate that adds or removes a name relative to your
old certificate, you will get expiration email about your old certificate.
If you check the certificate currently running on your website, and it
shows the correct date, no further action is needed.
To see a history of issued certificates for your domain, you could search for
your domain on certificate transparency log monitors such as
[crt.sh](https://crt.sh/).

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
automate](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

However, you can change the email address on your account, which effectively
re-subscribes you. Many common email services treat `yourname+1@example.com` the
same as `yourname@example.com`. So if you update your email address to
`yourname+1@example.com`, you can start getting expiry mail again. With Certbot,
use:

`certbot update_account --email yourname+1@example.com`
