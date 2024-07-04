---
title: תאימות אישורים
slug: certificate-compatibility
lastmod: 2023-08-02
show_lastmod: 1
---


הגורם מכריע ביכולת של פלטפורמה לתקף את האישורים של Let's Encrypt היא האם הפלטפורמה נותנת אמון באישור „ISRG Root X1” מבית ISRG. לפני ספטמבר 2021, חלק מהפלטפורמות יכלו לתקף את האישורים שלנו אפילו אם אינן כוללות את ISRG Root X1 כיוון שהן נותנות אמון באישור „DST Root CA X3” מבית IdenTrust. מאוקטובר 2021 ואילך, רק הפלטפורמות האלו שיכולות לתת אמון ב־ISRG Root X1 תתקפנה את אישורי Let's Encrypt ([למעט Android][android-compat]).

אם האישור שלך עובר תיקוף על כמה מהפלטפורמות תחת הרשימה „ידועים כנתמכים” אך לא עובר באחרות, יכול להיות שמדובר בהגדרות שגויות מצד השרת. אם נתקלת בתקלה עם פלטפורמות מודרניות, אחד הגורמים הנפוצים ביותר היא כשל באספקת שרשרת האישורים הנכונה. ניתן לבדוק את האתר שלך עם [שרת הבדיקה של SSL Labs](https://www.ssllabs.com/ssltest/). אם המערכת לא הצליחה לזהות את התקלה שלך, ניתן לבקש עזרה ב[פורומים הקהילתיים](https://community.letsencrypt.org/) שלנו.

# פלטפורמות שנותנות אמון ב־ISRG Root X1

* Windows >= XP SP3 ([בהנחה שעדכוני אישורי על אוטומטית אינם מושבתים ידנית](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 לא כולל אותו](https://support.apple.com/en-us/HT205205))
* [מכשירי iPhone 5 ומעלה יכולים לשדרג ל־iOS 10](https://en.wikipedia.org/wiki/IPhone_5) ובכך לתת אמון ב־ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (אבל Android >= 2.3.6 יעבוד כבררת מחדל [עקב החתימה הצולבת המיוחדת שלנו](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin / 12.04 (עם עדכונים)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (עם עדכונים מתאימים)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

דפדפנים (Chrome,‏ Safari,‏ Edge,‏ Opera) בדרך כלל נותנים אמון באותם אישורי העל כמו מערכת ההפעלה עליהם הם פועלים. Firefox חורג מהדרך הזאת: יש לו מאגר אישורי על משלו. בקרוב, גם בגרסאות חדשות של Chrome [יהיה מאגר אישורי על עצמאי][chrome-root-store].

# פלטפורמות שנותנות אמון ב־DST Root CA X3 אך לא ב־ISRG Root X1

הפלטפורמות האלו עבדו עד ספטמבר 2021 אך לא תתקפנה עוד אישורים של Let's Encrypt.

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680) וגם < jessie /8
* Java 8 >= 8u101 וגם < 8u141
* Java 7 >= 7u111 וגם < 7u151
* NSS >= v3.11.9 וגם < 3.26
* Amazon FireOS (Silk Browser) (טווח הגרסאות אינו ידוע)
* Cyanogen > v10 (הגרסה שהוסיפה את ISRG Root X1 אינה ידועה)
* Jolla Sailfish OS > v1.1.2.16 (הגרסה שהוסיפה את ISRG Root X1 אינה ידועה)
* Kindle > v3.4.1 (הגרסה שהוסיפה את ISRG Root X1 אינה ידועה)
* Blackberry >= 10.3.3 (הגרסה שהוסיפה את ISRG Root X1 אינה ידועה)
* מערכת המשחקים PS4 עם קושחה >= 5.00 (הגרסה שהוסיפה את ISRG Root X1 אינה ידועה)

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

הגשנו את ISRG Root X2 לתכניות אישורי העל של Microsoft,‏ Apple,‏ Google,‏ Mozilla ו־Oracle כדי שיכללו אותו.

ISRG Root X2 כבר נחשב למהימן בקרב חוגים רבים עקב חתימה צולבת מול האישור ISRG Root X1. בנוסף, מגוון תוכניות כבר הוסיפו את ISRG Root X2 כעוגן מהימן.

למידע נוסף על מצב הכללה, ניתן לעיין ב[רשומה בפורום הקהילתי שלנו](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385).

בזמן שאנו ממתינים ש־ISRG Root X2 יהפוך למהימן בצורה נרחבת, אפשר להירשם להשתמש ב־ISRG Root X2 לאישורי ה־ECDSA שלך. למידע נוסף, ניתן לעיין ב[רשומה בפורום הקהילתי שלנו](https://community.letsencrypt.org/t/root-x2-alternate-chain-for-ecdsa-opt-in-accounts/202884).

[android-compat]: /2020/12/21/extending-android-compatibility.html

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy
