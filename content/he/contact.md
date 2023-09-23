---
title: יצירת קשר
slug: contact
description: איך ליצור אתנו קשר
top_graphic: 1
lastmod: 2023-08-23
menu:
  main:
    weight: 90
    parent: about
---

**אנחנו לא מספקים תמיכה בדוא״ל. אם יש לך שאלה בענייני תמיכה עדיף לפנות אל [הפורומים הקהילתיים](https://community.letsencrypt.org) שלנו. כתובת הדוא״ל שלהלן מיועדות אך ורק לנושאים המסוימים שצוינו.**

## פניות עתונאיות

דוא״ל: [press@letsencrypt.org](mailto:press@letsencrypt.org)

## חסות

דוא״ל: [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)

## הרשמה לרשימת הדיוור שלנו <iframe src="https://outreach.abetterinternet.org/l/1011011/2023-02-16/6l51" height="200" style="width: 100%; border: 0"></iframe>

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

### תקשורת מוצפנת

כדי לתקשר בבטחה מול צוות האבטחה שלנו, נא להשתמש במפתח ה־GPG שלנו. הוא מורכב ממספר תת־מפתחות שנחתמו על ידי מפתח על בלתי מקוון. כל גרסה עדכנית של GnuPG תתמוך בסוג כזה של מפתח משולב. מבנה המפתח הנוכחי הוא:

```
pub   rsa4096 2015-11-24 [CE] [expires: 2025-09-25]
      0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B
uid           [ultimate] ISRG Security Team (letsencrypt.org) <security@letsencrypt.org>
sub   rsa4096 2015-11-24 [E] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [A] [expires: 2023-09-25]
sub   rsa4096 2015-11-24 [S] [expires: 2023-09-25]
```

אפשר להוריד את [מפתח ה־GPG הציבורי](/security_letsencrypt.org-publickey.asc) מכאן.

טביעת האצבע של המפתח חייבת להיות תואמת ל־`0148 3B31 D8F9 DBA2 5D41  4DAA 718E 9F6D 10EC 230B`.
