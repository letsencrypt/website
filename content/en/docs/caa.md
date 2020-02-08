---
title: Certificate Authority Authorization (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA is a type of DNS record that allows site owners to specify which Certificate
Authorities (CAs) are allowed to issue certificates containing their domain names. It
was standardized in 2013 by [RFC 6844](https://tools.ietf.org/html/rfc6844) to
allow a CA "reduce the risk of unintended certificate mis-issue." By default,
every public CA is allowed to issue certificates for any domain name in the
public DNS, provided they validate control of that domain name. That means that
if there's a bug in any one of the many public CAs' validation processes, every
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

Let's Encrypt's identifying domain name for CAA is `letsencrypt.org`. This is
officially documented [in our Certification Practice Statement
(CPS), section 4.2.1]({{< relref "/repository" >}}).

## Where to put the record

You can set CAA records on your main domain, or at any depth of subdomain.
For instance, if you had `www.community.example.com`, you could set CAA records
for the full name, or for `community.example.com`, or for `example.com`. CAs
will check each version, from left to right, and stop as soon as they see any
CAA record. So for instance, a CAA record at `community.example.com` would take
precedence over one at `example.com`. Most people who add CAA records will want
to add them to their registered domain (`example.com`) so that they apply to all
subdomains. Also note that CAA records for subdomains take precedence over their
parent domains regardless of whether they are more permissive or more
restrictive. So a subdomain can loosen a restriction put in place by a parent
domain.

CAA validation follows CNAMEs, like all other DNS requests. If
`www.community.example.com` is a CNAME to `web1.example.net`, the CA will first
request CAA records for `www.community.example.com`, then seeing that there is a
CNAME for that domain name instead of CAA records, will request CAA records for
`web1.example.net` instead. Note that if a domain name has a CNAME record, it is
not allowed to have any other records according to the DNS standards.

The [CAA RFC](https://tools.ietf.org/html/rfc6844) specifies an additional
behavior called "tree-climbing" that requires CAs to also check the parent
domains of the result of CNAME resolution. This additional behavior was later
removed by [an erratum](https://www.rfc-editor.org/errata/eid5065), so Let's
Encrypt and other CAs do not implement it.

# CAA errors

Since Let's Encrypt checks CAA records before every certificate we issue, sometimes
we get errors even for domains that haven't set any CAA records. When we
get an error, there's no way to tell whether we are allowed to issue for the
affected domain, since there could be CAA records present that forbid issuance,
but are not visible because of the error.

If you receive CAA-related errors, try a few more times against our {{<link "staging environment" "/docs/staging-environment" >}} to see if they
are temporary or permanent. If they are permanent, you will need to file a
support issue with your DNS provider, or switch providers. If you're not sure
who your DNS provider is, ask your hosting provider.

Some DNS providers that are unfamiliar with CAA initially reply to problem
reports with "We do not support CAA records." Your DNS provider does not need
to specifically support CAA records; it only needs to reply with a
NOERROR response for unknown query types (including CAA). Returning other
opcodes, including NOTIMP, for unrecognized qtypes is a violation of [RFC
1035](https://tools.ietf.org/html/rfc1035), and needs to be fixed.

# SERVFAIL

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

# Timeout

Sometimes CAA queries time out. That is, the authoritative name server never
replies with an answer at all, even after multiple retries. Most commonly this
happens when your nameserver has a misconfigured firewall in front of it that
drops DNS queries with unknown qtypes. File a support ticket with your DNS
provider and ask them if they have such a firewall configured.
