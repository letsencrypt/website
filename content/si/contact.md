---
title: සබඳතාව
slug: contact
description: අප අමතන්නේ කෙසේද?
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**අපි වි-තැපෑල මගින් සහාය නොදක්වන්නෙමු. ඔබට සහාය ගැනීමේ ප්‍රශ්නයක් ඇතනම් අපගේ [ප්‍රජා සංසදය](https://community.letsencrypt.org) භාවිතා කරන්න. පහත වි-තැපැල් ලිපින විස්තර කර ඇති විශේෂිත මාතෘකා සඳහා පමණි.**

## පුවත්පත් විමසීම්

වි-තැපෑල: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## අනුග්‍රහකත්වය

වි-තැපෑල: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## අපගේ පුවත් පත්‍රිකාවට දායක වන්න

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

## පෞද්ගලිකත්‍වය

වි-තැපෑල: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## ආරක්‍ෂාව

**ඔබගේ පණිවිඩය ලෙට්'ස් එන්ක්‍රිප්ට් ආරක්‍ෂණ ගැටළුවකට අදාළ වන්නේ නම් මිස මෙම ලිපිනයට ලියන්න එපා.**

<span id="email">වි-තැපෑල: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
