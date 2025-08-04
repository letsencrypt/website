---
title: Why All Websites Should Use HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

Some server operators have historically argued that they have nothing sensitive on their website, and thus no need for privacy. However, this is not a strong argument, and we believe that all websites should use HTTPS for these reasons:

## Plain HTTP traffic can be viewed in transit

When traffic is not encrypted it is viewable in transit. This means that all content going in either direction on a connection, including anything sensitive, can be seen by any entity on the network path. This is an obvious privacy issue, akin to mailing letters back and forth without an envelope.

Even if the server operator believes that there is nothing sensitive on their site, sometimes people make mistakes. Maybe there *shouldn't* be any sensitive information transmitted, but that doesn't mean there won't be. HTTPS helps to make sure that mistakes don't turn into privacy violations.

And the server operator doesn't control all of the traffic to and from their website: there's nothing they can do to prevent visitors from accidentally *sending* sensitive information as part of a request, perhaps via a form or a client software misconfiguration. Expecting them to never do that is an unreasonably high expectation.

Finally, sometimes the very act of visiting a website can be sensitive information, especially for people living under oppressive regimes. HTTPS supports an extension called [Encrypted Client Hello (ECH)](https://en.wikipedia.org/wiki/Server_Name_Indication#Encrypted_Client_Hello) which can hide that information, but that extra layer of protection is unavailable on sites using HTTP.

## Plain HTTP traffic can be modified in transit

Even worse, when traffic is not encrypted it is modifiable in transit. This means that nobody can be sure that what was sent is what was received, in either direction. The connection doesn't just lack privacy, it lacks *integrity*.

A common example of this is the injection of ads and/or malware into server responses. If a website doesn't enable HTTPS they are putting their visitors at risk of this, regardless of the actual content of the website.
