---
title: 連絡先
slug: contact
description: 1
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**私たちは電子メールによるサポートを提供しません。 もしサポートが必要な質問がある場合には、ぜひ私たちの [コミュニティ・フォーラム](https://community.letsencrypt.org)を活用してください。 以下のメールアドレスは、記載された特定のトピックのためにだけ利用できます (対応言語は英語のみです)。**

## 取材の問い合わせ

Email: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## スポンサー

Email: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## ニュースレターを購読

<iframe id="newsletter-iframe" src="https://outreach.abetterinternet.org/l/1011011/2025-01-14/31v6r" style="width: 100%; border: 0; overflow: hidden;"></iframe>
<script>
let hasResized = false;
window.addEventListener('message', function(e) {
    if (hasResized) return; // Only allow one resize
    if (e.origin !== 'https://outreach.abetterinternet.org') return;
    if (e.data && typeof e.data === 'object' && e.data.type === 'resize' && e.data.height) {
        hasResized = true;
        document.getElementById('newsletter-iframe').style.height = (e.data.height + 20) + 'px';
    }
});
</script>

## プライバシー

Email: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## セキュリティ

**下記のアドレスには、Let's Encrypt に関係するセキュリティ上の問題に関係しないメッセージは決して送信しないでください。**

<span id="email">Email: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
