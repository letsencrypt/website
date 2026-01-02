---
title: İletişim
slug: contact
description: Bizimle nasıl iletişime geçilir
lastmod: 2025-11-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

## Yardım ve Destek

**Eposta yoluyla destek sunmuyoruz.**

Yardıma ihtiyacınız varsa veya destekle ilgili bir sorunuz varsa, lütfen [topluluk forumlarımızı](https://community.letsencrypt.org) kullanın.

Aşağıdaki eposta adresleri yalnızca belirtilen konular içindir.

## Basın Soruları

Eposta: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## Sponsorluk

Eposta: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## Haber bültenimize abone olun

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

## Gizlilik

Eposta: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## Güvenlik

**Eğer mesajınız Let's Encrypt ile ilgili bir güvenlik sorunuyla alakalı değilse lütfen bu adrese yazmayınız.**

<span id="email">Eposta: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
