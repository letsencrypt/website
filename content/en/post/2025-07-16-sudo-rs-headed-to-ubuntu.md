---
author: Josh Aas
date: 2025-07-16T00:00:00Z
slug: sudo-rs-headed-to-ubuntu
title: "sudo-rs Headed to Ubuntu"
excerpt: "A security tool incubated by Prossimo takes on a big role."
display_default_footer: true
display_inline_newsletter_embed: false
---

Every day, system administrators all over the world ask their computers to perform security-sensitive tasks across privilege boundaries, such as a standard user executing a command as root. The software most commonly used to navigate privilege boundaries is [sudo](https://en.wikipedia.org/wiki/Sudo) (pronounced like "soo" and "do"), a 1980s evolution of the classic su ("substitute user") system administration tool.

Where su lets a user fully log in as another user with the other user's credentials, sudo carries out individual commands in the context of another user with more fine-grained security policies regarding what can be run and what credentials are required.

The sudo application is complex and highly configurable. It exists at the heart of Unix security policy enforcement, but, like almost all classic Unix software, it was originally written in C. The C language allows for many kinds of mistakes that can lead to vulnerabilities ([memory safety vulnerabilities](https://www.memorysafety.org/docs/memory-safety/) in particular), and as such, implementation errors in sudo have repeatedly led to exploitable security vulnerabilities -- sometimes allowing any user or software on a system to completely take over that system.

This is exactly the sort of critical system software that the Prossimo project aims to make safer through reimplementation with modern software development tools and practices. So, [in 2022, we hired two consultancies to reimplement sudo and su](https://www.memorysafety.org/initiative/sudo-su/) in Rust. We call the new implementation [sudo-rs](https://github.com/trifectatechfoundation/sudo-rs).

Less than a year from the project's start, sudo-rs was ready for users to try out. The tech infrastructure maintenance nonprofit [Trifecta Tech Foundation](https://trifectatech.org/) then took over [long-term development and support of the project](https://trifectatech.org/initiatives/privilege-boundary/) in 2024.

Now sudo-rs has reached a new milestone: the developers of Ubuntu, one of the world's most popular Linux distributions, [have replaced the traditional C versions of sudo and su with sudo-rs](https://discourse.ubuntu.com/t/adopting-sudo-rs-by-default-in-ubuntu-25-10/60583) in the upcoming Ubuntu 25.10 release due out in October. (See also [Trifecta Tech's announcement](https://trifectatech.org/blog/memory-safe-sudo-to-become-the-default-in-ubuntu/).)

The 25.10 release is not a long term support Ubuntu release, it is supported only through July 2026. It's aimed at users who are interested in trying very recent software releases and don't mind having to upgrade their operating system more frequently. However, following Ubuntu development practice, the software choices of Ubuntu 25.10 are a trial run for the 26.04 LTS release in April 2026, which will be recommended to all Ubuntu users and supported until 2031. We anticipate that sudo-rs will also be the default in that version, which is likely to be installed by tens of millions of people.

This is a great demonstration that essential system software can be made memory-safe, and we and our colleagues look forward to continuing that process with other applications. Check out [memorysafety.org](https://memorysafety.org) to see what else we're up to on this front. We send our congratulations to our friends at [Tweede Golf](https://tweedegolf.nl/en), [Ferrous Systems](https://ferrous-systems.com/), [Trifecta Tech Foundation](https://trifectatech.org/), and [Canonical](https://canonical.com/), the developer of Ubuntu.

Users on earlier Ubuntu versions, or other popular Linux distributions, can [opt in to try sudo-rs](https://github.com/trifectatechfoundation/sudo-rs?tab=readme-ov-file#installing-sudo-rs).

In addition to rewriting the tools in Rust, a safer language, some little-used features of sudo were not implemented in order to reduce vulnerability surface area. This turned out to be meaningful in July of 2025 when two vulnerabilities ([CVE-2025-32462](https://www.sudo.ws/security/advisories/host_any/) and [CVE-2025-32463](https://www.sudo.ws/security/advisories/chroot_bug/)) were discovered in sudo features not implemented in sudo-rs. In response to one of those, sudo has deprecated and will remove the feature hosting the vulnerability.