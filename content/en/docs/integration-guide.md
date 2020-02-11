---
title: Integration Guide
linkTitle: Client and Large Provider Integration Guide
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2019-10-29
---

{{< lastmod >}}

This document contains helpful advice if you are a hosting provider or large website integrating Let's Encrypt, or you are writing client software for Let's Encrypt.

# Plan for Change

Both Let's Encrypt and the Web PKI will continue to evolve over time.  You should make sure you have the ability to easily update all services that use Let's Encrypt. If you're also deploying clients that rely on Let's Encrypt certificates, make especially sure that those clients receive regular updates.

In the future, these things are likely to change:

  * the root and intermediate certificates from which we issue
  * the hash algorithms we use when signing certificates
  * the types of keys and key strength checks for which we are willing to sign end-entity certificates
  * and the ACME protocol

We will always aim to give as much advance notice as possible for such changes, though if a serious security flaw is found in some component we may need to make changes on a very short term or immediately. For intermediate changes in particular, you should not hardcode the intermediate to use, but should use the [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) header from the ACME protocol, since intermediates are likely to change.

Similarly, we're likely to change the URL of the terms of service (ToS) as we update it. Avoid hardcoding the ToS URL and instead rely on the [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3) header to determine which ToS URL to use.

You will also want a way to keep your TLS configuration up-to-date as new attacks are found on cipher suites or protocol versions.

# Get Updates

To receive low-volume updates about important changes like the ones described
above, subscribe to our
[API Announcements](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836) group.
This is useful for both client developers and hosting providers.

For higher-volume updates about maintenances and outages, visit our [status
page](https://letsencrypt.status.io/) and hit Subscribe in the upper right. This
is most useful for hosting providers.

Also, make sure you use a valid email address for your ACME account. We will use
that email to send you expiration notices and communicate about any issues
specific to your account.

# Who is the Subscriber

Our {{<link "CPS and Subscriber Agreement" "/repository" >}} indicate that the Subscriber is whoever holds the private key for a certificate. For hosting providers, that's the provider, not the provider's customer. If you're writing software that people deploy themselves, that's whoever is deploying the software.

The contact email provided when creating accounts (aka registrations) should go to the Subscriber. We'll send email to that address to warn of expiring certs, and notify about changes to our {{<link "privacy policy" "/privacy" >}}.  If you're a hosting provider, those notifications should go to you rather than a customer. Ideally, set up a mailing list or alias so that multiple people can respond to notifications, in case you are on vacation.

The upshot of this is that, if you are a hosting provider, you do not need to send us your customers' email addresses or get them to agree to our Subscriber Agreement. You can simply issue certificates for the domains you control and start using them.

# One Account or Many?

In ACME, it's possible to create one account and use it for all authorizations and issuances, or create one account per customer. This flexibility may be valuable. For instance, some hosting providers may want to use one account per customer, and store the account keys in different contexts, so that an account key compromise doesn't allow issuance for all of their customers.

However, for most larger hosting providers we recommend using a single account and guarding the corresponding account key well. This makes it easier to identify certificates belonging to the same entity, easier to keep contact information up-to-date, and easier to provide rate limits adjustments if needed. We will be unable to effectively adjust rate limits if many different accounts are used.

# Multi-domain (SAN) Certificates

Our {{<link "issuance policy" "/docs/rate-limits" >}} allows for up to 100 names per certificate. Whether you use a separate certificate for every hostname, or group together many hostnames on a small number of certificates, is up to you.

Using separate certificates per hostname means fewer moving parts are required to logically add and remove domains as they are provisioned and retired. Separate certificates also minimize certificate size, which can speed up HTTPS handshakes on low-bandwidth networks.

On the other hand, using large certificates with many hostnames allows you to manage fewer certificates overall. If you need to support older clients like Windows XP that do not support TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), you'll need a unique IP address for every certificate, so putting more names on each certificate reduces the number of IP addresses you'll need.

For most deployments both choices offer the same security.

# Storing and Reusing Certificates and Keys

A big part of Let's Encrypt's value is that it enables automatic issuance as part of provisioning a new website.  However, if you have infrastructure that may repeatedly create new frontends for the same website, those frontends should first try to use a certificate and private key from durable storage, and only issue a new one if no certificate is available, or all existing certificates are expired.

For Let's Encrypt, this helps us provide services efficiently to as many people as possible. For you, this ensures that you are able to deploy your website whenever you need to, regardless of the state of Let's Encrypt.

As an example, many sites are starting to use Docker to provision new frontend instances as needed. If you set up your Docker containers to issue when they start up, and you don't store your certificates and keys durably, you are likely to hit rate limits if you bring up too many instances at once. In the worst case, if you have to destroy and re-create all of your instances at once, you may wind up in a situation where none of your instances is able to get a certificate, and your site is broken for several days until the rate limit expires. This type of problem isn't unique to rate limits, though. If Let's Encrypt is unavailable for any reason when you need to bring up your frontends, you would have the same problem.

Note that some deployment philosophies state that crypto keys should never leave the physical machine on which they were generated. This model can work fine with Let's Encrypt, so long as you make sure that the machines and their data are long-lived, and you manage rate limits carefully.

# Picking a Challenge Type

If you're using the http-01 ACME challenge, you will need to provision the challenge response to each of your frontends before notifying Let's Encrypt that you're ready to fulfill the challenge. If you have a large number of frontends, this may be challenging. In that case, using the dns-01 challenge is likely to be easier. Of course, if you have many geographically distributed DNS responders, you have to make sure the TXT record is available on each responder.

Additionally, when using the dns-01 challenge, make sure to clean up old TXT records so the response to Let's Encrypt's query doesn't get too big.

If you want to use the http-01 challenge anyhow, you may want to take advantage of HTTP redirects. You can set up each of your frontends to redirect /.well-known/acme-validation/XYZ to validation-server.example.com/XYZ for all XYZ. This delegates responsibility for issuance to validation-server, so you should protect that server well.

# Central Validation Servers

Related to the above two points, it may make sense, if you have a lot of frontends, to use a smaller subset of servers to manage issuance. This makes it easier to use redirects for http-01 validation, and provides a place to store certificates and keys durably.

# Implement OCSP Stapling

Many browsers will fetch OCSP from Let's Encrypt when they load your site. This is a [performance and privacy problem](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/).  Ideally, connections to your site should not wait for a secondary connection to Let's Encrypt. Also, OCSP requests tell Let's Encrypt which sites people are visiting. We have a good privacy policy and do not record individually identifying details from OCSP requests, we'd rather not even receive the data in the first place. Additionally, we anticipate our bandwidth costs for serving OCSP every time a browser visits a Let's Encrypt site for the first time will be a big part of our infrastructure expense.

By turning on OCSP Stapling, you can improve the performance of your website, provide better privacy protections for your users, and help Let's Encrypt efficiently serve as many people as possible.

# Firewall Configuration

To use Let's Encrypt, you need to allow outbound port 443 traffic from the
machines running your ACME client. We don't publish the IP ranges for our
ACME service, and they will change without notice.

For the "http-01" ACME challenge, you need to allow inbound port 80 traffic.
We don't publish the IP ranges from which we perform validation, and they
will change without notice.

Note: We recommend always allowing plain HTTP access to your
web server, with a redirect to HTTPS. This provides a better user
experience than a web server that refuses or drops port 80 connections,
and provides the same level of security.

For all challenges, you need to allow inbound port 53 traffic
(TCP and UDP) to your authoritative DNS servers.

# Supported Key Algorithms

Let's Encrypt accepts RSA keys from 2048 to 4096 bits in length, and P-256 and P-384 ECDSA keys. That's true for both account keys and certificate keys. You can't reuse an account key as a certificate key.

Our recommendation is to serve a dual-cert config, offering an RSA certificate by default, and a (much smaller) ECDSA certificate to those clients that indicate support.

# HTTPS by default

For hosting providers, our recommendation is to automatically issue
certificates and configure HTTPS for all hostnames you control, and to offer a
user-configurable setting for whether to redirect HTTP URLs to their HTTPS
equivalents. We recommend that for existing accounts, the setting be disabled by
default, but for new accounts, the setting be enabled by default.

Reasoning: Existing websites are likely to include some HTTP subresources
(scripts, CSS, and images). If those sites are automatically redirected to
their HTTPS versions, browsers will block some of those subresources due to
Mixed Content Blocking. This can break functionality on the site. However,
someone who creates a new site and finds that it redirects to HTTPS will
most likely include only HTTPS subresources, because if they try to include
an HTTP subresource they will notice immediately that it doesn't work.

We recommend allowing customers to set an HTTP Strict-Transport-Security
(HSTS) header with a default max-age of sixty days. However, this setting
should be accompanied by a warning that if the customer needs to move to
a hosting provider that doesn't offer HTTPS, the cached HSTS setting in
browsers will make their site unavailable. Also, both customer and hosting
provider should be aware that the HSTS header will make certificate errors into
hard failures. For instance, while people can usually click through a browser
warning about a name mismatch or expired certificate, browsers do not allow such
a click through for hostnames with an active HSTS header.

# When to Renew

We recommend renewing certificates automatically when they have a third of their
total lifetime left. For Let's Encrypt's current 90-day certificates, that means
renewing 30 days before expiration.

If you are issuing for more than 10,000 hostnames, we also recommend automated
renewal in small runs, rather than batching up renewals into large chunks.
This reduces risk: If Let's Encrypt has an outage at the time you need to
renew, or there is a temporary failure in your renewal systems, it will only
affect a few of your certificates, rather than all of them. It also makes our
capacity planning easier.

You may want to bulk-issue certificates for all of your domains to get started
quickly, which is fine. You can then spread out renewal times by doing a
one-time process of renewing some certificates 1 day ahead of when you would
normally renew, some of them 2 days ahead, and so on.

If you offer client software that automatically configures a periodic batch
job, please make sure to run at a randomized second during the day, rather than
always running at a specific time. This ensures that Let's Encrypt doesn't
receive arbitrary spikes of traffic at the top of the hour or minute. Since
Let's Encrypt needs to provision capacity to meet peak load, reducing traffic
spikes can help keep our costs down.

# Retrying failures

Renewal failure should not be treated as a fatal error. You should implement
graceful retry logic in your issuing services using an exponential backoff
pattern, maxing out at once per day per certificate. For instance, a reasonable
backoff schedule would be: 1st retry after one minute, 2nd retry after ten
minutes, third retry after 100 minutes, 4th and subsequent retries after one
day. You should of course have a way for administrators to
request early retries on a per-domain or global basis.

Backoffs on retry means that your issuance software should keep track of
failures as well as successes, and check if there was a recent failure before
attempting a fresh issuance. There's no point in attempting issuance hundreds
of times per hour, since repeated failures are likely to be persistent.

All errors should be sent to the administrator in charge, in order to see if
specific problems need fixing.
