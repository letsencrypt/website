---
author: Matthew McPherrin
date: 2025-06-11T00:00:00Z
slug: reflections-on-a-year-of-sunlight
title: "Reflections on a Year of Sunlight"
excerpt: "Our experiment with a new Certificate Transparency architecture has been a success."
display_support_us_footer: true
---

The Certificate Transparency ecosystem has been improving transparency for the web PKI since 2013. It helps make clear exactly what certificates each certificate authority has issued and makes sure errors or compromises of certificate authorities are detectable.

Let's Encrypt participates in CT both as a certificate issuer and [as a log operator](https://letsencrypt.org/2019/05/15/introducing-oak-ct-log/). For the past year, [we've also been running an experiment](https://letsencrypt.org/2024/03/14/introducing-sunlight/) to help validate a next-generation design for Certificate Transparency logs. That experiment is now nearing a successful conclusion. We've demonstrated that the new architecture (called the "[Static CT API](https://github.com/C2SP/C2SP/blob/main/static-ct-api.md)") works well, providing greater efficiency and making it easier to run huge and reliable CT log services with comparatively modest resources. The Static CT API also makes it easier to download and share data from CT logs.

The [Sunlight log implementation](https://sunlight.dev/), alongside other Static CT API log implementations, is now on a path to production use. Browsers are now officially accepting Static CT API logs into their log programs as a means to help guarantee that the contents of CA-issued certificates are all publicly disclosed and publicly accessible (see [Safari's](https://groups.google.com/a/chromium.org/g/ct-policy/c/YJh40MRU950) and [Chrome's](https://groups.google.com/a/chromium.org/g/ct-policy/c/HBFZHG0TCsY/m/HAaVRK6MAAAJ) recent announcements), although the browsers also require the continued use of a traditional [RFC 6962](https://datatracker.ietf.org/doc/html/rfc6962) log alongside the new type.

All of this is good news for everyone who runs, submits certificates to, or monitors a CT log: as the new architecture gets adopted, we can expect to see more organizations running more logs, at lower cost, and with greater overall capacity to keep up with the large volume of publicly-trusted certificates.

## Certificate Transparency

[Certificate Transparency](https://certificate.transparency.dev/) (CT) was introduced in 2013 in response to concerns about how Internet users could detect misbehavior and compromise of certificate authorities. Prior to CT, it was possible for a CA to issue an inaccurate or malicious certificate that could be used to attack a relatively small number of users, and that might never come to wider attention. A team led by Google responded to this by creating a transparency log mechanism, where certificate authorities (like Let's Encrypt) must disclose all of the certificates that we issue by submitting them to public log services. Web browsers now generally reject certificates unless the certificates include cryptographic proof ("Signed Certificate Timestamps", or SCTs) demonstrating that they were submitted to and accepted by such logs.

The CT logs themselves use a cryptographic append-only ledger to prove that they haven't deleted or modified their records. There are currently over a dozen CT log services, most of them also run by certificate authorities, including [Let's Encrypt's own Oak log](https://letsencrypt.org/docs/ct-logs/).

## The Static CT API

The original 2013 CT log design has been used with relatively few technical changes since it was first introduced, but several other transparency logging systems have been created in other areas, such as [sumdb](https://go.dev/ref/mod#checksum-database) for Golang, which helps ensure that the contents of Golang package updates are publicly recorded. While they were originally inspired by CT, more-recently invented transparency logs have improved on its design.

The current major evolution of CT was led by [Filippo Valsorda](https://filippo.io/), a cryptographer with an interest in transparency log mechanisms, with help from others in the CT ecosystem. Portions of the new design are directly based on sumdb. In addition to designing the new architecture, Valsorda also wrote the implementation that we've been using, called [Sunlight](https://sunlight.dev/), with support from Let's Encrypt. We're excited to see that there are now at least three other compatible implementations: Google's [trillian-tessera](https://github.com/transparency-dev/trillian-tessera), Cloudflare's [Azul](https://blog.cloudflare.com/azul-certificate-transparency-log/), and an independent project called [Itko](https://blog.transparency.dev/i-built-a-new-certificate-transparency-log-in-2024-heres-what-i-learned).

The biggest change for the Static CT API is that logs are now represented, and downloaded by verifiers, as simple collections of flat files (called "tiles," so some implementers have also been referring to these as "tiled logs" or "tlogs"). Anyone who wants to download log data can do so just by downloading these files. This is great for log operators because these simple file downloads can be distributed in various ways, including caching by a CDN, which was less practical and efficient for the classic CT API.

The new design is also simpler and more efficient from the log operator's perspective, making it cheaper to run logs. As we said last year, this may enable us and other operators to increase reliability and availability by running several separate logs, likely with lower overall resource requirements than a single traditional log.

## Our Sunlight experiment

<figure class="card border-0 pic-quote-right">
<img src="/images/blog/sunlight_logo_main.png" class="mx-auto img-fluid" alt="Sunlight">
<figcaption class="image-caption">Filippo Valsorda's Sunlight logo (CC BY-ND 4.0), &ldquo;based on a <a href="https://www.tuscolo.org/il-parco/">real place</a> in the vicinity of Rome&rdquo;</figcaption>
</figure>

For the past year, we've run three Sunlight logs, called Twig, Willow, and Sycamore. We've been logging all of our own issued certificates, which represent a majority of the total volume of all publicly-trusted certificates, into our Sunlight logs. Sunlight logged these certificates quickly and correctly on relatively modest server hardware. Notably, each log's write side was handled comfortably by just a single server. We also achieved high availability for these log services throughout the course of this experiment. (Because our Sunlight logs are not yet trusted by web browsers, we didn't include the SCT proofs that they returned to us in the actual certificates we gave out to our subscribers; those proofs wouldn't have been of use to our subscribers yet and would just have taken up space.)

A potential failure mode of traditional CT logs is that they could be unacceptably slow in incorporating newly-submitted certificates (known as missing the maximum merge delay), which can result in a log becoming distrusted. This isn't a possibility for our new Sunlight-based logs: they always completely incorporate newly-submitted certificates before returning an SCT to the submitter, so the effective merge delay is zero! Of course, any log can suffer outages for a variety of reasons, but this feature of Sunlight makes it less likely that any outages will be fatal to a log's continued operation.

We've demonstrated that Sunlight and the Static CT API work in practice, and this demonstration has helped to confirm the browser developers' hope that Static CT API logs can become an officially-supported part of CT. As a result, the major browsers that enforce CT have now permitted Static CT API logs to apply for inclusion in browsers as publicly-trusted logs, and we're preparing to apply for this status for our Willow and Sycamore logs with the Chrome and Safari CT log programs.

Let's Encrypt will run at least these two logs, and possibly others over time, for the foreseeable future. Once they're trusted by browsers, we'll encourage other CAs to submit to them as well, and we'll begin including SCTs from these logs in our own certificates (alongside SCTs from traditional CT logs).

## How to participate

The new Static CT API and the rollout of tile-based logs will bring various changes and opportunities for community members.

### New Certificate Transparency log operators

Companies and non-profit organizations could help support the web PKI by running a CT log and applying for it to be publicly trusted. Implementations like Sunlight will have substantially lower resource requirements than first-generation CT logs, particularly when cached behind a CDN. The biggest resource demands for a log operator will be storage and upstream bandwidth. A publicly-trusted log is also expected to maintain relatively high availability, because CAs need logs to be available in order to continue issuing certificates.

We don't have statistics to share about the exact resource requirements for such a log yet, but after we have practical experience running a fully publicly-trusted Sunlight log, we should be able to make this more concrete. As noted above, the compute side of the log can be handled by a single server. Sunlight author Filippo Valsorda has recently started running a Sunlight log---also on just a single server---and offered [more detailed cost breakdowns](https://groups.google.com/a/chromium.org/g/ct-policy/c/KCzYEIIZSxg/m/zD26fYw4AgAJ?pli=1) for that log's setup, with an estimated total cost around $10,000 per year. The costs for our production Static CT API logs may be higher than those for Filippo's log, but still far less than the costs for our traditional RFC 6962 logs.

As with trust decisions about CAs, browser developers are the authorities about which CT logs become publicly trusted. Although any person or organization can run a log, browser developers will generally prefer to trust logs whose continued availability they're confident of---typically those run by stable organizations with experience running some form of public Internet services. Unlike becoming a certificate authority, running a log does not require a formal audit, as the validation of the log's availability and correctness can be performed purely by observation.

### Certificate authorities

Once the Willow and Sycamore logs are trusted by browsers, our fellow certificate authorities can choose to start logging certificates to them as part of their issuance processes. (Initially, you should still include at least one SCT from a traditional CT log in each certificate.) The details, including the log API endpoints and keys, are available at [our CT log page](https://letsencrypt.org/docs/ct-logs/). You can start submitting to these logs right away if you prefer; just bear in mind that the SCTs they return aren't useful to subscribers yet, and won't be useful until browsers are updated to trust the new logs.

### CT data users

You can monitor CT in order to watch for certificate issuances for your own domain names, or as part of monitoring or security products or services, or for Internet security research purposes. Many of our colleagues have been doing this for some time as a part of various tools they maintain. The Static CT API should make this easier, because you'll be able to download and share log tiles as sets of ordinary files.

If you already run such monitoring tools, please note that *you'll need to update your data pipeline* in order to access Static CT API logs; since the read API is not backwards-compatible, CT API clients will need to be modified to support the new API. Without updated tools, your view of the CT system will become partial!

Also note that getting a complete view of all of CT will still require downloading data from traditional logs, which will probably continue to be true for several years.

### Software developers

As logs based on the new API enter production use, it will be important to have tools to interact with and search these logs. We can all benefit from more software that understands how to do this. Since file downloads are such a familiar piece of software functionality, it will probably be easier for developers to develop against the new API compared to the original one.

We've also continued to see greater integration of transparency logging tools into other kinds of services, such as software updates. There's a growing transparency log ecosystem that's always in need of more tools and integrations. As we mentioned above, transparency logs are increasingly learning from one another, and there are also mechanisms for more direct integration between different kinds of transparency logs (known as "witnessing"). Software developers can help improve different aspects of Internet security by contributing to this active and growing area.

## Conclusion

The Certificate Transparency community and larger transparency logging community have experienced a virtuous cycle of innovation, sharing ideas and implementation code between different systems and demonstrating the feasibility of new mechanisms and functionality. With the advent of tile-based logging in CT, the state of the art has moved forward in a way that helps log operators run our logs much more efficiently without compromising security.

We're proud to have participated in this experiment and the engineering conversation around the evolution of logging architectures. Now that we've shown how well the new API really works at scale, we look forward to having publicly-trusted Sunlight logs later this year!