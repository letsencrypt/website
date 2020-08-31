---
title: עדכוני פרוטוקול ACME
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
---

{{< lastmod >}}

פרוטוקול ACME לפי [תקינת IETF (כוח המשימה ההנדסי של האינטרנט)](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html), [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), הוא אבן היסוד לתצורת העבודה של Let's Encrypt.

# נקודות גישה ל־API

נכון לעכשיו אנחנו מציעים את נקודות הגישה הבאות ל־API. ניתן לעיין ב[מסמך סקירת השינויים שלנו](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) כדי להשוות בין המימושים שלהם למפרט של ACME.

## גרסה 2 של ACME ‏(RFC 8555)

* [פעילות מלאה - Production] `https://acme-v02.api.letsencrypt.org/directory`
* [הכנה להקמה - Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`

## גרסה 1 של ACME (נזנחה)

* [פעילות מלאה - Production] `https://acme-v01.api.letsencrypt.org/directory`
* [הכנה להקמה - Staging] `https://acme-staging.api.letsencrypt.org/directory`

# תכונות חדשות ב־ACME עם תמיכה לאחור

מדי פעם ייתכן שיוטמעו תכונות חדשות שנתמכות לאחור על ידי Let's Encrypt בנקודות גישה קיימות ל־API. בדרך כלל תכונות חדשות שנתמכות לאחור מושקות כיוון שהחלטנו לממש חלק ממפרט ACME שטרם הטמענו בעבר.

כאשר תכונות חדשות מופיעות בנקודות גישה קיימות ל־API, התכונות תמיד יצוינו באופן ברור במפרט הציבורי של ACME ולא תשבורנה אף לקוחות שמומשו כראוי.

# גרסאות חדשות של ACME עם שינויים שאינם תואמים לגרסאות קודמות

אנחנו לא מתכננים שינויים שפוגמים בתמיכה בגרסאות קודמות של ACME אך אם יהיה צורך בכך נפעל כדי לאפשר מעבר חלק ולאורך זמן מספיק תוך שיתוף התהליך עם לקוחות הקצה מוקדם ככל הניתן. מנהלי מערכות אמורים לתחזק את היכולת להטמיע עדכונים תקופתיים ללקוחות ה־ACME שלהם במקרה שיוצגו שינויים שפוגמים בתמיכה בגרסאות הקודמות.
