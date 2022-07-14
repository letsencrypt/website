---
title: תאימות אישורים
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


הגורם מכריע ביכולת של פלטפורמה לתקף את האישורים של Let's Encrypt היא האם הפלטפורמה נותנת אמון באישור „ISRG Root X1” מבית ISRG. חלק מהפלטפורמות יכולות לתקף את האישורים שלנו אפילו אם אינן כוללות את ISRG Root X1 כיוון שהן נותנות אמון באישור „DST Root CA X3” מבית IdenTrust. לאחר ספטמבר 2021, רק הפלטפורמות האלו שיכולות לתת אמון ב־ISRG Root X1 תמשכנה לתקף את אישורי Let's Encrypt ([למעט Android](/2020/12/21/extending-android-compatibility.html)).

אם האישור שלך עובר תיקוף על כמה מהפלטפורמות תחת הרשימה „ידועים כנתמכים” אך לא עובר באחרות, יכול להיות שמדובר בהגדרות שגויות מצד השרת. אם נתקלת בתקלה עם פלטפורמות מודרניות, אחד הגורמים הנפוצים ביותר היא כשל באספקת שרשרת האישורים הנכונה. ניתן לבדוק את האתר שלך עם [שרת הבדיקה של SSL Labs](https://www.ssllabs.com/ssltest/). אם המערכת לא הצליחה לזהות את התקלה שלך, ניתן לבקש עזרה ב[פורומים הקהילתיים](https://community.letsencrypt.org/) שלנו.

# פלטפורמות שנותנות אמון ב־ISRG Root X1

* Windows >= XP SP3 ([בהנחה שעדכוני אישורי על אוטומטית אינם מושבתים ידנית](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 לא כולל אותו](https://support.apple.com/en-us/HT205205))
* [מכשירי iPhone 5 ומעלה יכולים לשדרג ל־iOS 10](https://en.wikipedia.org/wiki/IPhone_5) ובכך לתת אמון ב־ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (אבל Android >= 2.3.6 יעבוד כבררת מחדל [עקב החתימה הצולבת המיוחדת שלנו](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [אובונטו >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (עם עדכונים מתאימים)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (עם עדכונים מתאימים)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

דפדפנים (Chrome,‏ Safari,‏ Edge,‏ Opera) בדרך כלל נותנים אמון באותם אישורי העל כמו מערכת ההפעלה עליהם הם פועלים. Firefox חורג מהדרך הזאת: יש לו מאגר אישורי על משלו. בקרוב, גם בגרסאות חדשות של Chrome [יהיה מאגר אישורי על עצמאי](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# פלטפורמות שנותנות אמון ב־DST Root CA X3

* Windows >= XP SP3
* macOS (רוב הגרסאות)
* iOS (רוב הגרסאות)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* אובונטו >= precise / 12.04
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= 11.9
* Amazon FireOS (דפדפן Silk)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Blackberry >= 10.3.3
* קונסולת המשחקים PS4 עם גרסת קושחה >= 5.00

יתכן שיעניין אותך לבקר ב[בדיון המסוים הזה בפורום](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) למידע נוסף על תאימות.

# ידועים כבלתי נתמכים

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP לפני SP3
  * אין אפשרות לטפל באישורים עם חתימת SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (לקוח דוא״ל מ־2012, לא דרך הדפדפן)
  * אין אפשרות לטפל באישורים בלי CRL
* קונסולת המשחקים PS3
* קונסולת המשחקים PS4 עם גרסת קושחה < 5.00

# ISRG Root X2 (אישור עליון חדש מסוג ECDSA) - בקרוב
הגשנו את ISRG Root X2 לתכניות אישורי העל של Microsoft,‏ Apple,‏ Google,‏ Mozilla ו־Oracle כדי שיכללו אותו. ISRG Root X2 כבר נחשב למהימן בקרב חוגים רבים עקב חתימה צולבת מול האישור ISRG Root X1. למידע נוסף, ניתן לעיין ב[רשומה בפורום הקהילתי שלנו](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


