---
title: יצירת קשר
slug: contact
description: איך ליצור אתנו קשר
lastmod: 2023-09-26
menu:
  main:
    weight: 90
    parent: about
should_hide_footer_newsletter: true
---

**אנחנו לא מספקים תמיכה בדוא״ל. אם יש לך שאלה בענייני תמיכה עדיף לפנות אל [הפורומים הקהילתיים](https://community.letsencrypt.org) שלנו. כתובת הדוא״ל שלהלן מיועדות אך ורק לנושאים המסוימים שצוינו.**

## פניות עתונאיות

דוא״ל: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## חסות

דוא״ל: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## הרשמה לרשימת הדיוור שלנו

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

## פרטיות

דוא״ל: [privacy@abetterinternet.org](mailto:privacy@abetterinternet.org)

## אבטחה

**נא לא לכתוב אל הכתובת הזו אלא אם כן ההודעה שלך נוגעת לבעיית אבטחה ב־Let's Encrypt.**

<span id="email">דוא״ל: </span>

<script>
  var parts = ["security", '@', "letsencrypt", ".", "org"];
  var anchor = document.createElement("a");
  anchor.href = "mailto:" + parts.join("");
  anchor.text = parts.join("");
  document.getElementById("email").appendChild(anchor)
</script>
