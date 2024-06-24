---
author: Josh Aas
date: 2024-06-24T00:00:00Z
slug: ntpd-rs-deployment
title: "More Memory Safety for Let’s Encrypt: Deploying ntpd-rs"
excerpt: "NTP is critical to how TLS works, and now it’s memory safe at Let’s Encrypt."
---

When we look at the general security posture of Let's Encrypt, one of the things that worries us most is how much of the operating system and network infrastructure is written in unsafe languages like C and C++. The [CA software](https://github.com/letsencrypt/boulder) itself is written in memory safe Golang, but from our server operating systems to our network equipment, lack of memory safety routinely leads to vulnerabilities that need patching.

Partially for the sake of Let's Encrypt, and partially for the sake of the wider Internet, we started a new project called [Prossimo](https://www.memorysafety.org/) in 2020. Prossimo's goal is to make some of the most critical software infrastructure for the Internet memory safe. Since then we've invested in a range of software components including the [Rustls TLS library](https://github.com/rustls/rustls/), [Hickory DNS](https://github.com/hickory-dns/hickory-dns), [River reverse proxy](https://github.com/memorysafety/river), [sudo-rs](https://github.com/memorysafety/sudo-rs), [Rust support for the Linux kernel](https://rust-for-linux.com/), and [ntpd-rs](https://github.com/pendulum-project/ntpd-rs).

Let's Encrypt has now taken a step that was a long time in the making: we've deployed [ntpd-rs](https://github.com/pendulum-project/ntpd-rs), the first piece of memory safe software from Prossimo that has made it into the Let's Encrypt infrastructure.

Most operating systems use the Network Time Protocol (NTP) to accurately determine what time it is. Keeping track of time is a critical task for an operating system, and since it involves interacting with the Internet it's important to make sure NTP implementations are secure.

In April of 2022, Prossimo started work on a memory safe and generally more secure [NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) implementation called [ntpd-rs](https://github.com/pendulum-project/ntpd-rs). Since then, the implementation has matured and is now maintained by [Project Pendulum](https://github.com/pendulum-project). In April of 2024 ntpd-rs was deployed to the Let's Encrypt staging environment, and as of now it's in production.

Over the next few years we plan to continue replacing C or C++ software with memory safe alternatives in the Let's Encrypt infrastructure: OpenSSL and its derivatives with [Rustls](https://www.memorysafety.org/initiative/rustls/), our DNS software with [Hickory](https://www.memorysafety.org/initiative/dns/), Nginx with [River](https://www.memorysafety.org/initiative/reverse-proxy/), and sudo with [sudo-rs](https://www.memorysafety.org/initiative/sudo-su/). Memory safety is just part of the overall security equation, but [it's an important part](https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/press-release-technical-report/) and we're glad to be able to make these improvements.

We depend on contributions from our community of users and supporters in order to provide our services. If your company or organization would like to [sponsor](https://www.abetterinternet.org/sponsor/) Let's Encrypt please email us at <sponsor@letsencrypt.org>. We ask that you make an [individual contribution](https://letsencrypt.org/donate/) if it is within your means.