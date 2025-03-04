---
title: 联系我们
slug: contact
description: 如何联系我们
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**我们不通过电子邮件提供支持服务。 如果您遇到问题需要帮助，请前往我们的[社群论坛](https://community.letsencrypt.org)。 以下邮箱仅用于描述中注明的特定用途。**

## 新闻咨询

邮箱：[press@letsencrypt.org](mailto:press@letsencrypt.org)

## 赞助

邮箱：[sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## 订阅我们的新闻资讯

<iframe id="newsletter-iframe-inline" src="https://outreach.abetterinternet.org/l/1011011/2025-01-14/31v6r" style="width: 100%; border: 0; overflow: hidden;"></iframe>
<script>
let hasResized = false;
window.addEventListener('message', function(e) {
    if (hasResized) return; // Only allow one resize
    if (e.origin !== 'https://outreach.abetterinternet.org') return;
    if (e.data && typeof e.data === 'object' && e.data.type === 'resize' && e.data.height) {
        hasResized = true;
        document.getElementById('newsletter-iframe-inline').style.height = (e.data.height + 20) + 'px';
    }
});
</script>

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
