---
title: 联系我们
slug: contact
description: 如何联系我们
lastmod: 2025-11-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

## 帮助与支持

**我们不通过电子邮件提供支持服务。**

如果您在使用过程中遇到问题或需要帮助，请前往我们的[社群论坛](https://community.letsencrypt.org)。

以下各邮箱仅用于所述的特定用途。

## 新闻咨询

邮箱：[press@letsencrypt.org](mailto:press@letsencrypt.org)

## 赞助

邮箱：[sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## 订阅我们的新闻资讯

{{< newsletter-inline >}}

## 隐私问题

邮箱：[privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## 安全问题

**除非您的消息涉及 Let's Encrypt 的安全问题，否则请勿向此地址发送邮件。**

<span id="email">邮箱： </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
