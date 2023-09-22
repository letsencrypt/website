---
title: 联系我们
slug: contact
description: 如何联系我们
top_graphic: 1
lastmod: 2023-08-23
menu:
  main:
    weight: 90
    parent: about
---

**我们不通过电子邮件提供支持服务。 如果您遇到问题需要帮助，请前往我们的[社群论坛](https://community.letsencrypt.org)。 以下邮箱仅用于描述中注明的特定用途。**

## 新闻咨询

邮箱：[press@letsencrypt.org](mailto:press@letsencrypt.org)

## 赞助

邮箱：[sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## 订阅我们的新闻资讯 <iframe src="https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51" height="200" style="width: 100%; border: 0"></iframe>

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

### 通讯加密

请使用 GPG 公钥与我们的安全团队加密沟通。 我们的 GPG 公钥包含多个子密钥，并由一个离线主密钥对所有子密钥予以数字签名， 较新版本的 GnuPG 都支持这种混合密钥。 目前的密钥结构为：

```
pub   rsa4096 2015-11-24 [CE] [有效至：2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ 绝对 ] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [有效至：2023-09-25]
sub   rsa4096 2015-11-24 [A] [有效至：2023-09-25]
sub   rsa4096 2015-11-24 [S] [有效至：2023-09-25]
```

您可以在此处下载 [GPG 公钥](/security_letsencrypt.org-publickey.asc)。

请确保公钥指纹与 `0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B` 一致。
