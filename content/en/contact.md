---
title: Contact
slug: contact
description: How to contact us
lastmod: 2025-11-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

## Help and Support

**We do not provide support via email.**

If you need help or have a support question please use our [community forums](https://community.letsencrypt.org). 

The below email addresses are only for the specific topics described.

## Press Inquiries

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorship

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Subscribe to our Newsletter

{{< newsletter-inline >}}

## Privacy

Email: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Security

**Please do not write to this address unless your message concerns a security issue with Let's Encrypt.**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
