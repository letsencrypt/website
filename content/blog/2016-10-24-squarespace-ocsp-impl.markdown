---
layout: post
title: "Squarespace OCSP Stapling Implementation"
date: 2016-10-24T00:00
author: Franklin Angulo, Squarespace
excerpt: OCSP stapling is an alternative approach to the Online Certificate Status Protocol (OCSP) for checking the revocation status of certificates.
---

> We’re excited that Squarespace has decided to protect the millions of sites they host with HTTPS! While talking with their
> team we learned they were deploying OCSP Stapling from the get-go, and we were impressed. We asked them to share their
> experience with our readers in our first guest blog post (hopefully more to come).
> 
> \- Josh Aas, Executive Director, ISRG / Let’s Encrypt

[OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) is an alternative approach to the Online Certificate Status Protocol (OCSP) for checking the revocation status of certificates. It allows the presenter of a certificate to bear the resource cost involved in providing OCSP responses by appending (“stapling”) a time-stamped OCSP response signed by the CA to the initial TLS handshake, eliminating the need for clients to contact the CA. The certificate holder queries the OCSP responder at regular intervals and caches the responses.

Traditional OCSP requires the CA to provide responses to each client that requests certificate revocation information. When a certificate is issued for a popular website, a large amount of queries start hitting the CA’s OCSP responder server. This poses a privacy risk because information must pass through a third party and the third party is able to determine who browsed which site at what time. It can also create performance problems, since most browsers will contact the OCSP responder before loading anything on the web page. OCSP stapling is efficient because the user doesn’t have to make a separate connection to the CA, and it’s safe because the OCSP response is digitally signed so it cannot be modified without detection.

## OCSP Stapling @ Squarespace

As we were planning our roll out of SSL for all custom domains on the Squarespace platform, we decided that we wanted to support OCSP stapling at time of launch. A reverse proxy built by our [Edge Infrastructure team](https://www.squarespace.com/about/careers?gh_jid=245517) is responsible for terminating all SSL traffic, it’s written in Java and is powered by [Netty](http://netty.io/). Unfortunately, the Java JDK 8 only has preliminary, client-only, OCSP stapling support. JDK 9 introduces OCSP stapling with [JEP 249](http://openjdk.java.net/jeps/249), but it is not available yet.

Our reverse proxy does not use the JDK’s SSL implementation. Instead, we use OpenSSL via [netty-tcnative](http://netty.io/wiki/forked-tomcat-native.html). At this time, neither the original tcnative nor Netty’s fork have OCSP stapling support. However, the tcnative library exposes the inner workings of OpenSSL, including the address pointers for the SSL context and engine. We were able to use JNI to extend the netty-tcnative library and add OCSP stapling support using the [tlsext_status](https://www.openssl.org/docs/man1.0.2/ssl/SSL_set_tlsext_status_type.html) OpenSSL C functions. Our extension is a standalone library but we could equally well fold it into the netty-tcnative library itself. If there is interest, we can contribute it upstream as part of Netty’s next API-breaking development cycle.

One of the goals of our initial OCSP stapling implementation was to take the biggest edge off of the OCSP responder’s operator, in this case Let’s Encrypt. Due to the nature of the website traffic on our platform, we have a very long tail. At least to start, we don’t pre-fetch and cache all OCSP responses. We decided to fetch OCSP responses asynchronously and we try to do it only if more than one client is going to use it in the foreseeable future. Bloom filters are utilized to identify “one-hit wonders” that are not worthy of being cached.

Squarespace invests in the security of our customers’ websites and their visitors. We will continue to make refinements to our OCSP stapling implementation to eventually have OCSP staples on all requests. For a more in depth discussion about the security challenges of traditional OCSP, we recommend [this blog post](https://www.imperialviolet.org/2014/04/19/revchecking.html).