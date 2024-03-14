---
author: Matthew McPherrin & Filippo Valsorda
date: 2024-03-14T00:00:00Z
slug: introducing-sunlight
title: "Introducing Sunlight, a CT implementation built for scalability, ease of operation, and reduced cost"
excerpt: "New software, specification, and logs for Certificate Transparency."
---

<div class="card border-0 pic-quote-right">
    <img alt="Logo for Sunlight" class="mx-auto img-fluid" src="/images/blog/sunlight_logo_main.png" />
</div>

Let's Encrypt is proud to introduce Sunlight, a new implementation of a Certificate Transparency log that we built from the ground up with modern Web PKI opportunities and constraints in mind. In partnership with [Filippo Valsorda](https://filippo.io/), who led the design and implementation, we incorporated feedback from the broader transparency logging community, including the Chrome and TrustFabric teams at Google, the Sigsum project, and other CT log and monitor operators. Their insights have been instrumental in shaping the project's direction.

CT plays an important role in the Web PKI, enhancing the ability to monitor and research certificate issuance. The operation of a CT log, however, faces growing challenges with the increasing volume of certificates. For instance, Let's Encrypt issues over four million certificates daily, each of which must be logged in two separate CT logs. Our well-established "Oak" log currently holds over 700 million entries, reflecting the significant scale of these challenges.

In this post, we'll explore the motivation behind Sunlight and how its design aims to improve the robustness and diversity of the CT ecosystem, while also improving the reliability and performance of Let's Encrypt's logs.

Bottlenecks from the Database
-----------------------------

Let's Encrypt has been [running public CT logs](https://letsencrypt.org/docs/ct-logs/) since 2019, and we've gotten a lot of operational experience with running them, but it hasn't been trouble-free. The biggest challenge in the architecture we've deployed for our "Oak" log is that the data is stored in a relational database. We've [scaled that up](https://letsencrypt.org/2022/05/19/nurturing-ct-log-growth) by splitting each year's worth of data into a "shard" with its own database, and then later shrinking the shards to cover six months instead of a full year.

The approach of splitting into more and more databases is not something we want to continue doing forever, as the operational burden and costs increase. The current storage size of a CT log shard is between 5 and 10 terabytes. That's big enough to be concerning for a single database: We previously had a test log fail when we ran into a [16TiB limit](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.KnownIssuesAndLimitations.html#MySQL.Concepts.Limits.FileSize) in MySQL.

Scaling read capacity up requires large database instances with fast disks and lots of RAM, which are not cheap. We've had numerous instances of CT logs becoming overloaded by clients attempting to read all the data in the log, overloading the database in the process. When rate limits are imposed to prevent overloading, clients are forced to slowly crawl the API, diminishing CT's efficiency as a fast mechanism for detecting mis-issued certificates.

Serving Tiles
-------------

Initially, Let's Encrypt only planned on building a new CT log implementation. However, our discussions with Filippo made us realize that other transparency systems had improved on the original Certificate Transparency design, and we could make our logs even more robust and scalable by changing the read path APIs. In particular, the [Go Checksum Database](https://golang.org/design/25530-sumdb) is inspired by Certificate Transparency, but uses a more efficient format for publishing its data as a series of easily stored and cached tiles.

Certificate Transparency logs are a binary tree, with every node containing a hash of its two children. The "leaf" level contains the actual entries of the log: the certificates, appended to the right side of the tree. The top of the tree is digitally signed. This forms a cryptographically verifiable structure called a Merkle Tree, which can be used to check if a certificate is in the tree, and that the tree is append-only.

Sunlight tiles are files containing 256 elements each, either hashes at a certain tree "height" or certificates (or pre-certificates) at the leaf level. Russ Cox has a great explanation [of how tiles work on his blog](https://research.swtch.com/tlog#tiling_a_log), or you can read [the relevant section of the Sunlight specification](https://c2sp.org/sunlight#merkle-tree). Even Trillian, the current implementation of CT we run, [uses a subtree system](https://github.com/google/trillian/blob/master/docs/storage/storage.md) similar to these tiles as its internal storage.

Unlike the dynamic endpoints in previous CT APIs, serving a tree as tiles doesn't require any dynamic computation or request processing, so we can eliminate the need for API servers. Because the tiles are static, they're efficiently cached, in contrast with CT APIs like get-proof-by-hash which have a different response for every certificate, so there's no shared cache. The leaf tiles can also be stored compressed, saving even more storage!

The idea of exposing the log as a series of static tiles is motivated by our desire to scale out the read path horizontally and relatively inexpensively. We can directly expose tiles in cloud object storage like S3, use a caching CDN, or use a webserver and a filesystem.

Object or file storage is readily available, can scale up easily, and costs significantly less than databases from cloud providers. It seemed like the obvious path forward. In fact, we already have an S3-backed cache in front of our existing CT logs, which means we are currently storing our data twice.

Running More Logs
-----------------

The tiles API improves the read path, but we also wanted to simplify our architecture on the write path. With Trillian, we run a collection of nodes along with etcd for leader election to choose which will handle writing. This is somewhat complex, and we believe the CT ecosystem allows a different tradeoff.

The key realization is that Certificate Transparency is already a distributed system, with clients submitting certificates to multiple logs, and gracefully failing over from any unavailable ones to the others. Each individual log's write path doesn't require a highly available leader election system. A simple single-node writer can meet the 99% Service Level Objective of a CT log.

The single-node Sunlight architecture lets us run multiple independent logs with the same amount of computing power. This increases the system's overall robustness, even if each individual log has lower potential uptime. No more leader election needed. We use a simple compare-and-swap mechanism to store checkpoints and prevent accidentally running two instances at once, which could result in a forked tree, but that has much less overhead than leader election.

No More Merge Delay
-------------------

One of the goals of CT was to have limited latency for submission to the logs. A design feature called Merge Delay was added to support that. When submitting a certificate to a log, the log can return a Signed Certificate Timestamp (SCT) immediately, with a promise to include it in the log within the log's Maximum Merge Delay, conventionally 24 hours. While this seems like a good tradeoff to not slow down issuance, there have been multiple incidents and near-misses where a log stops operating with unmerged certificates, missing its maximum merge delay, and breaking that promise.

Sunlight takes a different approach, holding submissions while it batches and integrates certificates in the log, eliminating the merge delay. While this leads to a small latency increase, we think it's worthwhile to avoid one of the more common CT log failure cases.

It also lets us embed the final leaf index in an extension of our SCTs, bringing CT a step closer to direct client verification of Merkle tree proofs. The extension also makes it possible for clients to fetch the proof of log inclusion from the new static tile-based APIs, without requiring server-side lookup tables or databases.

A Sunny Future
--------------

Today's announcement of Sunlight is just the beginning. We've released [software](https://github.com/FiloSottile/sunlight) and a [specification](https://c2sp.org/sunlight) for Sunlight, and have Sunlight CT logs running. Head to [sunlight.dev](https://sunlight.dev) to find resources to get started. We encourage CAs to start test submitting to [Let's Encrypt's new Sunlight CT logs](https://letsencrypt.org/docs/ct-logs/#Sunlight), for CT Monitors and Auditors to add support for consuming Sunlight logs, and for the CT programs to consider trusting logs running on this new architecture. We hope Sunlight logs will be made usable for SCTs by the CT programs run by the browsers in the future, allowing CAs to rely on them to meet the browser CT logging requirements.

We've gotten positive feedback so far, with comments such as "Google's TrustFabric team, maintainers of Trillian, are supportive of this direction and the Sunlight spec. We have been working towards the same goal of cacheable tile-based logs for other ecosystems with [serverless tooling](https://github.com/transparency-dev/serverless-log), and will be folding this into Trillian and ctfe, along with adding support for the Sunlight API."

If you have feedback on the design, please join in the conversation on the [ct-policy mailing list](https://groups.google.com/a/chromium.org/g/ct-policy), or in the [#sunlight](https://transparency-dev.slack.com/archives/C06PCS2P75Y) channel on the transparency-dev Slack ([invitation](https://join.slack.com/t/transparency-dev/shared_invite/zt-27pkqo21d-okUFhur7YZ0rFoJVIOPznQ) to join).

We'd like to thank Chrome for supporting the development of Sunlight, and Amazon Web Services for their ongoing support for our CT log operation. If your organization monitors or values CT, please consider a financial gift of support. Learn more at <https://www.abetterinternet.org/sponsor/> or contact us at: sponsor@abetterinternet.org.