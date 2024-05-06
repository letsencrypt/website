---
title: Certificate Authority Authorization (CAA)
slug: caa
date: 2017-07-27
lastmod: 2023-08-16
show_lastmod: 1
---


CAA is a type of DNS record that allows site owners to specify which Certificate
Authorities (CAs) are allowed to issue certificates containing their domain
names. It was first standardized in 2013, and the version we use today was
standardized in 2019 by [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659)
and [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657). By default, every
public CA is allowed to issue certificates for any domain name in the public
DNS, provided they validate control of that domain name. That means that if
there's a bug in any one of the many public CAs' validation processes, every
domain name is potentially affected. CAA provides a way for domain holders to
reduce that risk.

# Using CAA

If you don't care about CAA, you generally don't have to do anything (but see
CAA errors below). If you would like to use CAA to restrict which Certificate
Authorities are allowed to issue certificates for your domain, you will need to
use a DNS provider that supports setting CAA records. Check [SSLMate's CAA
page](https://sslmate.com/caa/support) for a list of such providers. If your
provider is listed, you can use
[SSLMate's CAA Record Generator](https://sslmate.com/caa/) to generate a
set of CAA records listing the CAs that you would like to allow.

## Where to put the record

Generally, you want to set CAA records on your registered domain (such as "example.org" or "mysite.co.uk"). This way they apply to both that domain and any subdomains you create under it, such as "community.example.org".

Note that the CA will always respect the CAA record *closest* to the domain name it is issuing a certificate for. So if you're requesting a cert for "www.community.example.org", the CA will check "www.community.example.org", then "community.example.org", then "example.org", stopping at the first CAA record it finds.

This means that you can override CAA for subdomains. For example, suppose that you host "example.org" yourself, but have "api.example.org" on a cloud provider. You could use a CAA record on "example.org" to say that only Let's Encrypt can issue for that domain and all of its subdomains, but also use a CAA record on "api.example.org" to override that and allow the cloud provider to issue certificates for that one subdomain.

Note also that CAA checking follows CNAME redirects, just like all other DNS requests. If "community.example.org" is a CNAME to "example.forum.com", the CA will respect any CAA records that are set on "example.forum.com". It is not allowed for a domain name with a CNAME record to have any other records, so there cannot be conflicts between CAA records on the original name and CAA records on the target of the redirect.

## What to put in the record

All CAA records follow the same basic format:

```
CAA <flags> <tag> <value>
```

The **flags** are just an integer, and should almost always just be the integer `0`, indicating that no flags have been set. If you like, you can set the flags to the integer `128`, indicating that the "critical bit" has been set, and that CAs should immediately halt and not issue a certificate if they don't recognize the contents of the tag field.

The **tag** is a string indicating which kind of CAA record this is: either `issue` or `issuewild` in most cases. More on these below.

Finally, the **value** is a string containing at most one CA identifier (such as "letsencrypt.org") and some optional semicolon-separated parameters, also discussed below.

### The `issue` and `issuewild` properties

Records with the `issue` tag simply control whether a CA can issue certificates for this domain and its subdomains. Generally this is the only record you need, as it controls both normal (e.g. "example.org") and wildcard (e.g. "*.example.org") issuance in the absence of any other records. You control which CA can issue for this domain by putting that CA's identifying domain name in the value portion of the CAA record.

Records with the `issuewild` tag control whether a CA can issue *wildcard* certificates (e.g. "*.example.org"). You only need to use `issuewild` records if you want different permissions for wildcard and non-wildcard issuance.

Note that you can have multiple records with the same property type and they are *additive*: if any one of those records allows the CA to issue, then it is allowed.

Let's Encrypt's identifying domain name for CAA is `letsencrypt.org`. This is
officially documented in [Section 4.2.1 of our CP/CPS](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions).

### The `validationmethods` parameter

This parameter can be placed after the CA's identifying domain name to control which validation methods that CA can use to confirm control over the domain. This can be used to restrict validation to methods that you trust more. For example, if you want to restrict the CA to only using the TLS-ALPN-01 method, you could append `;validationmethods=tls-alpn-01` to your CAA record value.

Let's Encrypt recognizes the following validation method strings:

* `http-01`
* `dns-01`
* `tls-alpn-01`

### The `accounturi` parameter

This parameter can be placed after the CA's identifying domain name to control which ACME Accounts can request issuance for the domain. This can be used to ensure that someone who temporarily hijacks your domain, but doesn't have access to your ACME Account key, can't issue malicious certificates.

Let's Encrypt's account URIs look like `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`, where the numbers at the end are your Account ID.

### Examples

A simple CAA record which allows Let's Encrypt to issue for "example.org" might look like this:

```
example.org         CAA 0 issue "letsencrypt.org"
```

A more complex CAA record set might look like this:

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

In this example, MyCA can issue for "example.org", but only using the DNS-01 validation method. It can also issue wildcard certificates, using any validation method. Finally, OtherCA can also issue certificates, but only if the request comes from account number `123456`, and only if OtherCA recognizes and knows how to correctly handle the `accounturi` restriction.


# CAA errors

Since Let's Encrypt checks CAA records before every certificate we issue, sometimes
we get errors even for domains that haven't set any CAA records. When we
get an error, there's no way to tell whether we are allowed to issue for the
affected domain, since there could be CAA records present that forbid issuance,
but are not visible because of the error.

If you receive CAA-related errors, try a few more times against our [staging environment](/docs/staging-environment) to see if they
are temporary or permanent. If they are permanent, you will need to file a
support issue with your DNS provider, or switch providers. If you're not sure
who your DNS provider is, ask your hosting provider.

Some DNS providers that are unfamiliar with CAA initially reply to problem
reports with "We do not support CAA records." Your DNS provider does not need
to specifically support CAA records; it only needs to reply with a
NOERROR response for unknown query types (including CAA). Returning other
opcodes, including NOTIMP, for unrecognized qtypes is a violation of [RFC
1035](https://tools.ietf.org/html/rfc1035), and needs to be fixed.

## SERVFAIL

One of the most common errors that people encounter is SERVFAIL. Most often this
indicates a failure of DNSSEC validation. If you get a SERVFAIL error, your
first step should be to use a DNSSEC debugger like
[dnsviz.net](http://dnsviz.net/). If that doesn't work, it's possible that your
nameservers generate incorrect signatures only when the response is empty. And
CAA responses are most commonly empty.  For instance, PowerDNS [had this bug in
version 4.0.3 and below](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

If you don't have DNSSEC enabled and get a SERVFAIL, the second most likely
reason is that your authoritative nameserver returned NOTIMP, which as described
above is an RFC 1035 violation; it should instead return NOERROR with an empty
response. If this is the case, file a bug or a support ticket with your DNS provider.

Lastly, SERVFAILs may be caused by outages at your authoritative nameservers.
Check the NS records for your nameservers and ensure that each server is
available.

## Timeout

Sometimes CAA queries time out. That is, the authoritative name server never
replies with an answer at all, even after multiple retries. Most commonly this
happens when your nameserver has a misconfigured firewall in front of it that
drops DNS queries with unknown qtypes. File a support ticket with your DNS
provider and ask them if they have such a firewall configured.
