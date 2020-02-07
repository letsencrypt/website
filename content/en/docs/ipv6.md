---
title: IPv6 Support
slug: ipv6-support
top_graphic: 1
date: 2020-02-07
lastmod: 2020-02-07
---

{{< lastmod >}}

Let's Encrypt supports IPv6 both for accessing the ACME API using an ACME
client, and for the DNS lookups and HTTP requests we make when validating your
control of domain names.

## Domain Validation

When making outbound domain validation requests for a domain that has both IPv4
and IPv6 addresses (e.g. both `A` and `AAAA` records) Let's Encrypt will always
prefer the IPv6 addresses for the initial connection. If the IPv6 connection
fails at the network level (e.g. there is a timeout) and there are IPv4
addresses available then we will retry the request with one of the IPv4
addresses.

## Incorrect IPv6 Addresses

Often domain owners will not be aware of an `AAAA` record for their domain. If
the IPv6 address in the `AAAA` record is incorrect it will affect the domain
validation process.

Commonly the IPv6 address will be a different server than the IPv4 address where
the ACME client is being run. Since the ACME client only configures the IPv4
server to respond to the challenge domain validation will fail when the IPv6
server is used.

In most cases the correct fix is to update the IPv6 address to point to the
server the ACME client is running on, or to remove the `AAAA` record if the
domain is not intended to work with IPv6. There is not a way to request Let's
Encrypt prefer IPv4, you must fix the misconfiguration.

## IPv6 to IPv4 Retry Details

The IPv6 to IPv4 retry only occurs on connection timeouts, not on other types of
error.

For example in the "Common Pitfalls" scenario above a retry will not occur if
there is a webserver listening on the IPv6 address, but that webserver is not
ready to answer the ACME challenge. In this case there would be no connection
timeout accessing the IPv6 address and the challenge will fail without a retry
because the incorrect response was returned.

To keep our CA software simple we only perform an IPv6 to IPv4 retry on the
first request when validating "http-01" challenges. If you use redirects, the
redirects will not get retry treatment.

For example if a domain name has an `AAAA` record that always times out and an
`A` record with a webserver that redirects from HTTP to HTTPS then the IPv6 to
IPv4 fallback will not operate correctly. The first request to the domain will
properly fallback to IPv4, receiving a redirect from HTTP to HTTPS. The
subsequent request will again prefer the IPv6 address but will timeout without
falling back to IPv4. You can resolve this situation either by fixing the IPv6
misconfiguration or removing the HTTP to HTTPS redirect for requests to the ACME
HTTP-01 challenge path.

## Getting Help

If you need help diagnosing an IPv6 related problem please visit our [community
forum](https://community.letsencrypt.org).
