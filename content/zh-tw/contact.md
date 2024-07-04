---
title: 聯繫我們
slug: contact
description: 1
lastmod: 2021-08-31
menu:
  main:
    weight: 90
    parent: about
---

**我們不通過電子郵件提供支持。 如果您在使用 Let's Encrypt 過程中有任何疑問，請向[社群論壇](https://community.letsencrypt.org)提問，我們不提供電子郵件協助。 以下的電子郵件僅用來討論特定主題**

## 新聞諮詢

發送郵件至 [press@letsencrypt.org](mailto:press@letsencrypt.org)

## 贊助

發送郵件至 [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## 郵件列表

有關各種技術郵件列表的訊息，請訪問我們的[參與](/getinvolved)頁面。

## 安全問題

**除非您的消息涉及 Let's Encrypt 的安全問題，否則請勿向此地址發送郵件。**

<span id="email">發送郵件至 </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
