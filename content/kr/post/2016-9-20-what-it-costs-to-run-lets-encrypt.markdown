---
author: Josh Aas, ISRG Executive Director
date: 2016-09-20T00:00:00Z
excerpt: Today we’d like to explain what it costs to run Let’s Encrypt. We’re doing
  this because we strive to be a transparent organization, we want people to have
  some context for their contributions to the project, and because it’s interesting.
title: What It Costs to Run Let's Encrypt
slug: what-it-costs-to-run-lets-encrypt
---

Today we’d like to explain what it costs to run Let’s Encrypt. We’re doing this because we strive to be a transparent organization, we want people to have some context for their contributions to the project, and because it’s interesting.

Let’s Encrypt will require about $2.9M USD to operate in 2017. We believe this is an incredible value for a secure and reliable service that is capable of issuing certificates globally, to every server on the Web free of charge.

We’re currently working to raise the money we need to operate through the next year. Please consider [donating](https://letsencrypt.org/donate/) or [becoming a sponsor](https://letsencrypt.org/become-a-sponsor/) if you’re able to do so! In the event that we end up being able to raise more money than we need to just keep Let’s Encrypt running we can look into adding other services to improve access to a more secure and privacy-respecting Web.

Here’s how our 2017 budget breaks down:

<p>
<table style="border: 1px solid gray; width: 90%; margin: auto">
  <tr style="background-color: #99CCFF;">
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">Expense</th>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">Cost</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">Staffing</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">$2.06M USD</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">Hardware/Software</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">$0.20M USD</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">Hosting/Auditing</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">$0.30M USD</th>
  </tr>
  <tr>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">Legal/Administrative</th>
    <th style="font-weight: normal; text-align: left; padding: 5px; border: 1px solid gray;">$0.35M USD</th>
  </tr>
  <tr>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">Total</th>
    <th style="font-weight: bold; text-align: left; padding: 5px; border: 1px solid gray;">$2.91M USD</th>
  </tr>  
</table>
</p>

Staffing is our dominant cost. We currently have eight full time employees, plus two full time staff that are employed by other entities (Mozilla and EFF). This includes five operations/sysadmin staff, three software developers, one communications and fundraising person, and an executive director. Our 2017 budget covers salary and benefits for ten employees.

Our systems administration staff are at the heart of our day to day operations. They are responsible for building and improving our server, networking, and deployed software infrastructure, as well as monitoring the systems every hour of every day. It’s the critical 24/7 nature of the work that makes this our biggest team. Any issues need to be dealt with immediately, ideally with multiple people on hand.

Our software developers work primarily on *[boulder](https://github.com/letsencrypt/boulder)*, our open source CA software.  We needed to write our own software in order to create a secure, reliable, and fully-automated CA that is capable of issuing and managing enough certificates to serve the entire Web. Our software development staff also allow us to support new features much more quickly than we could if we relied on third party software for implementation.

The majority of our administrative support (e.g. HR, payroll, accounting) is provided by the [Linux Foundation](https://www.linuxfoundation.org/), so we don’t hire for those roles and related expenses come in under the “Legal/Administrative” category.

Hardware expenses include compute, storage, networking, and HSM hardware, as well as the associated support contracts. There is quite a bit of duplication for redundancy. Software expenses are low since the majority of the software we use is freely available open source software.

Hosting costs include space in two different highly secure geographically separated rooms inside secure data centers, as well as internet connections and power. The hardware and physical infrastructure we have in place is capable of issuing hundreds of millions of certificates - enough for every server on the Web. We need to maintain strong physical control over all hardware and infrastructure related to certificate issuance and management for security and auditing reasons.

Auditing costs include the required annual WebTrust audits as well as third party expert security review and testing. The third party security audits include code review, infrastructure review, penetration testing, and ACME protocol analysis. We are not required to do third party auditing beyond the WebTrust audits, but it would be irresponsible of us not to.

Legal costs go towards attorney time, primarily in the areas of corporate governance, contract development and review, and trademarks. Administrative costs include HR, payroll and benefits management, accounting and tax services, as well as travel and other miscellaneous operating costs.

Our 2016 budget is very similar to our 2017 budget, the major difference being that we will only spend approximately $2.0M USD due to a number of our staff starting after the beginning of the year. We will pay full staffing costs next year because all of the staff that joined us in 2016 will be on our payroll for the entirety of 2017.

Currently, the majority of our funding comes from [corporate sponsorships](https://letsencrypt.org/sponsors/). If your company or organization would like to sponsor Let’s Encrypt please email us at [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org). We’re working to make grants and [individual contributions](https://letsencrypt.org/donate/) more significant sources of income over the next year.

We’re grateful for the industry and community support that we receive, and we look forward to continuing to create a more secure and privacy-respecting Web!