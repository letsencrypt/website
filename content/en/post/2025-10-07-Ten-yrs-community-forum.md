---
author: Seth Schoen
date: 2025-10-07T00:00:00Z
slug: Ten-yrs-community-forum
title: "Ten Years of Community Support"
excerpt: "In its first decade, the Let's Encrypt Community Forum has helped tens of thousands of users, kept Let's Encrypt staff in touch with the community, and spurred new tools and projects."
display_support_us_footer: true
display_inline_newsletter_embed: false
---

<div class="pull-quote-right">
  <blockquote class="blockquote">
    <span class="quote"></span>
    <div class="quote-text">
      <p class="quote-text-value">Seth Schoen was an early contributor to Let's Encrypt through his work at the Electronic Frontier Foundation. He's also one of the longest standing participants in the Let's Encrypt community support forum, so we asked him to offer his thoughts on the role and impact of the forum as a resource for our users. Thank you for your many years of expertise and participation, Seth!</p>
      <footer class="blockquote-footer"><span class="blockquote-mdash">&mdash;</span> <cite title="Source Title">Josh Aas</cite>, Head of Let's Encrypt</footer>
    </div>
  </blockquote>
</div>

Along with the tenth anniversary of Let's Encrypt's first certificate, we're also celebrating ten years of the [Let's Encrypt Community Forum](https://community.letsencrypt.org/), which has played a vital role in the Let's Encrypt community.

It's been the [first stop for end users with technical questions](https://community.letsencrypt.org/c/help/13). It's been the main way that [client developers got help with ACME](https://community.letsencrypt.org/c/client-dev/14) and debugged compatibility issues. It's been the place where Let's Encrypt staff [made technical announcements](https://community.letsencrypt.org/c/api-announcements/18) and got immediate feedback from affected parties.

It's happened in many different languages (including official French, Spanish, and Portuguese categories, use of numerous volunteers' native languages, as well as many successful conversations via machine translation). For example, people have gotten help in Dutch, Russian, German, and Chinese.

Thousands of volunteers have provided help and successfully helped tens of thousands of users get their certificates. Occasionally, they've also reported bugs in client software, documentation, or even the Let's Encrypt service itself. Many times a responsible developer was there to interact directly with the bug reporter.

Here are the monthly pageviews from the creation of the Community Forum until the present day:

<figure>

![Monthly pageviews chart showing growth from 2015 to 2025](/images/blog/2025.10.02.Ten-yrs-community-forum-image-1.png)

<figcaption>Other reports from the forum software show that much of the most recent pageview growth is due to robots, probably from AI training. But that may ultimately be helpful to users too, as AI systems learn about Let's Encrypt from the forum posts and become more able to answer users' questions correctly.</figcaption>
</figure>

### Seeing the results of one's efforts

The most common kind of interaction on the forum is one in which a Let's Encrypt end user shows up with some kind of problem, usually an inability to get or renew a certificate. In most cases, if the user is willing to answer some questions, the community is ultimately able to resolve the problem.

I've often compared the satisfaction of helping users on the Let's Encrypt forum to what I felt while installing bike lights at a local cycling organization's bike light giveaway event. In both cases, one could engage for a few minutes with someone, maybe deal with some unanticipated oddities (extra-thick handlebars? an unusual seat post or cargo rack? a strange DNS setup? an unusual Apache configuration?). Usually, this would lead to a concrete practical improvement in safety afterward (the blinking red tail light freshly installed on someone's bike, or the lovely https:// prefix or padlock icon newly visible in the browser bar when browsing to a visitor's website). It's common in the Internet security world not to be able to see or appreciate how what we do helps people, so "we just helped make connections to your specific web site more secure" is especially satisfying.

Tangible safety upgrades!

<figure>

![Bicycle with red rear safety light attached to seat post](/images/blog/2025.10.02.Ten-yrs-community-forum-image-2.png)

<figcaption>Photo by Richard Masoner / Cyclelicious, CC-BY-SA 2.0. Not a bike light I personally installed.</figcaption>
</figure>

<figure>

![HTTPS padlock icon shown in browser address bar for Wikimedia website](/images/blog/2025.10.02.Ten-yrs-community-forum-image-3.png)

<figcaption>I think Wikimedia Foundation figured out their Let's Encrypt certificates without support from the forum. But we're there if they ever need us!</figcaption>
</figure>

### A channel between Let's Encrypt staff and the community

Let's Encrypt describes itself as "free, automated, and open"; part of that openness consists of its use of open standards (ACME) and open source CA software (Boulder). Part of it is also about how much of the CA's thinking happens in public! One example (of dozens) is that the [September 2025 Let's Encrypt root ceremony](https://community.letsencrypt.org/t/new-y-root-and-intermediate-hierarchy/241065) was [discussed ahead of time on the forum](https://community.letsencrypt.org/t/preview-of-our-upcoming-root-ceremony/239494), starting back in July, with the plans and details all open for discussion and review. Let's Encrypt staff have even asked the community for feedback on how production and testing certificates ought to be named!

In other cases, like when there was [new functionality announced](https://community.letsencrypt.org/t/questions-regarding-announcing-six-day-and-ip-address-certificate-options-in-2025/232043), or [substantive technical changes affecting certificate issuance](https://community.letsencrypt.org/t/questions-regarding-shortening-the-lets-encrypt-chain-of-trust/201581), or [proposed rate limit changes](https://community.letsencrypt.org/t/feedback-needed-for-our-new-account-pausing-feature-and-self-service-unpause-portal/222804), or [problems requiring mass revocation](https://community.letsencrypt.org/t/revoking-certain-certificates-on-march-4/114864), or [expiring root certificates](https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190), Let's Encrypt staff were available talking about all the details and directly answering end users' questions. Again, there are lots of other examples, where changes large or small got announced, proposed, or discussed on the forum, with Let's Encrypt's own experts engaging with the community.

### Final thoughts and thanks

The forum runs on [Discourse](https://www.discourse.org/), which has continued to be an effective choice of forum software for the community. Discourse has nice technical and user interface features, but it's also pleasantly unobtrusive. The Discourse company has also generously been donating pro bono hosting for the forum for many years, and, of course, it uses a Let's Encrypt certificate.

The volunteers on the Let's Encrypt forum have made a huge contribution to Let's Encrypt's success. It's easy to imagine that many users might have given up on Let's Encrypt in frustration were it not for the efforts of dedicated volunteers to draw out the necessary details, notice the relevant issues, and patiently explain concepts that were confusing people. There are also volunteer moderators who've worked hard to keep the forum on track, stop spam, and defuse distracting conflicts. Thanks to all of you.

Several software projects have been informed by discussions and issues on the forum, as developers there found opportunities to help large numbers of users. I would particularly highlight Alex Zorin's [Let's Debug](https://letsdebug.net/) and Jonathan Griffin's [CertSage](https://certsage.com/) as examples in this category. Let's Debug runs a series of practical live tests on a specified site to help users figure out why certificate issuance is failing, giving useful explanations of many of the most common failure reasons. CertSage is a client meant for users who have hosting plans without native support for Let's Encrypt, and without administrative access---but where they can run PHP scripts. These projects grew out of Alex's and Jonathan's experiences helping users on the forum and seeing the kinds of issues that came up repeatedly there. Joona Hoikkala's helpful [acme-dns](https://github.com/joohoi/acme-dns), which helps subscribers complete the ACME DNS challenge with a dedicated service instead of using an existing DNS server, also helped respond to a common issue that brought many people to the forum.

I would also like to thank Jacob Hoffman-Andrews for his early efforts to set a positive and welcoming tone on the forum. Jacob and other forum administrators always reminded the community to be patient and welcoming to each visitor, emphasizing that the forum was many users' first interaction with Let's Encrypt, and that users ought to be welcomed regardless of their expertise or background (and regardless of whether their questions had been asked before by others).