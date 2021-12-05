---
author: Jacob Hoffman-Andrews
date: 2019-10-09T00:00:00Z
title: "Onboarding Your Customers with Let's Encrypt and ACME"
slug: onboarding-your-customers-with-lets-encrypt-and-acme
---

If you work at a hosting provider or CDN, ACME’s DNS-01 validation
method can make it a lot easier to onboard new customers who have an
existing HTTPS website at another provider. Before your new customer
points their domain name at your servers, you need to have a certificate
already installed for them. Otherwise visitors to the customer’s site
will see an outage for a few minutes while you issue and install a
certificate. To fix this, you and your new customer should use the
DNS-01 validation method to issue a certificate before the customer
switches over DNS for their site.

# How the DNS Validation Method Works

The DNS-01 validation method [works like
this](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge): to prove that you control
`www.example.com`, you create a TXT record at
`_acme-challenge.www.example.com` with a “digest value” as specified by
ACME (your ACME client should take care of creating this digest value
for you). When the TXT record is ready, your ACME client informs the ACME server (for
instance, Let’s Encrypt) that the domain is ready for validation. The
ACME server looks up the TXT record, compares it to the expected digest
value, and if the result is correct, considers your account authorized
to issue for `www.example.com`. Your new customer can set up this TXT
record (or a CNAME) without interfering with normal website operations.

# The Advantages of a CNAME

There’s an additional trick that I recommend for hosting providers and
CDNs: Instead of giving the digest value to your new customer and
telling them to make a TXT record with it, tell your customer to
configure a CNAME from `_acme-challenge.www.example.com` to a domain
name that you control and that is unique to the domain being validated.
For instance, you might use `www.example.com.validationserver.example.net`.
Then, once your
software has verified that this CNAME is set up (accounting for
propagation delay and anycast), your ACME client should
begin the validation process for `www.example.com`, provisioning a TXT
record at `www.example.com.validationserver.example.net`. Because the
ACME server’s TXT lookup follows CNAMEs (as do all DNS lookups), it will
see the value you provisioned, and consider your account authorized.

This approach is preferable to handing your customers a raw digest value
for a few reasons. First, it gives your customers all the time they need to set
up the CNAME. If you create a pending authorization up front and give
your customer a digest value to deploy themselves, it has a fixed
lifetime before it expires (for Let’s Encrypt this lifetime is 7 days).
If your customer doesn't complete the process in that time,
you’ll have to create a new pending authorization and give
your customer a new digest value. That's annoying and time consuming for
both you and your customer. The CNAME method means even if it
takes your new customer a month to make the needed changes to their DNS,
you can get things up and running as soon as they do.

Another reason to prefer the CNAME method over having new customers
directly provision their TXT records is to support the best practice of
periodically rotating your ACME account key. Because the digest value
used for DNS-01 validation is computed based on your current ACME
account key, it will change whenever you rotate your account key. If you
asked customers to provision their TXT record manually , that means
notifying potential new customers that the value you asked them to put
in DNS isn't valid anymore, and they need to use a different one. That’s pretty
inconvenient! If you use the CNAME method instead, there’s only one
ACME-related value you’ll ever need to have your new customers put in
DNS, and it won’t change as you change your account key.

# Cleaning Up Unused CNAMES

One last note: This is a good way to onboard customers, but you also
need to detect when customers offboard themselves. They may simply
change their A records to point at a different CDN, without telling you
that their plans have changed. You should monitor for this situation and
stop attempting to issue certificates. If the customer has left behind a
CNAMEd `_acme-challenge` subdomain that points at you, you should
contact that and remind them to delete it. The CNAMEd subdomain
represents a delegated authorization to issue certificates, and cleaning
up that delegation improves both the customer’s security posture and
your own. Similarly, if a customer sets up the CNAME and you issue a
certificate on their behalf, but they never point their A records at
your servers, you should not reissue new certificates indefinitely
without further intervention from the customer.
