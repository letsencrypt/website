---
title: Why All Websites Should Use HTTPS
slug: why-all-https
lastmod: 2025-08-03
show_lastmod: 1
---

We believe that all websites should use HTTPS if possible for these reasons:

## Plain HTTP traffic can be viewed in transit

When traffic is not encrypted it is viewable in transit. This means that all content going in either direction on a connection, including anything sensitive, can be seen by any entity on the network path. This is an obvious privacy issue, akin to mailing letters back and forth without an envelope.

Some server operators might argue that they have nothing sensitive on their website, and thus no need for privacy. This is not a strong argument for two reasons.

The first reason is that people make mistakes - maybe there *shouldn't* be any sensitive information transmitted, but that doesn't mean there won't be. HTTPS helps to make sure that mistakes don't turn into privacy violations. Even if the server operator never makes a mistake, it's possible that visitors might accidentally *send* sensitive information as part of a request, perhaps via a form or a client software misconfiguration. Expecting them to never do that is an unreasonably high expectation.

The second reason is that plain HTTP is not just visible in transit, it's *modifiable* in transmit.

## Plain HTTP traffic can be modified in transit

When traffic is not encrypted it is modifiable in transit. This means that nobody can be sure that what was sent is what was received, in either direction. The connection doesn't just lack privacy, it lacks *integrity*.

A common example of this is the injection of ads and/or malware into server responses. If a website doesn't enable HTTPS they are putting their visitors at risk of this, regardless of the actual content of the website.

This issue is why a website's content is irrelevant to the question of whether it should use HTTPS.
