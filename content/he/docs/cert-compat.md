---
title: תאימות אישורים
slug: certificate-compatibility
top_graphic: 1
lastmod: 2020-02-07
show_lastmod: 1
---


Let's Encrypt מוכוונת לתמוך ולהיתמך בכמה שיותר תכניות שניתן מבלי להתפשר על אבטחה. הגורם העיקרי ליכולת הפלטפורמה לתקף אישורים של Let's Encrypt היא האם לפלטפורמה הזאת יש את האישור „ISRG Root X1” מבית ISRG או את האישור „DST Root CA X3” מבית IdenTrust במאגר האישורים שלה.

אם האישור שלך עובר תיקוף על כמה מהפלטפורמות תחת הרשימה „ידועים כנתמכים” אך לא עובר באחרות, יכול להיות שמדובר בהגדרות שגויות מצד השרת. אם נתקלת בתקלה עם פלטפורמות מודרניות, אחד הגורמים הנפוצים ביותר היא כשל באספקת שרשרת האישורים הנכונה. אם נתקלת בבעיה מול מערכות ישנות יותר כמו Windows XP, אחד הגורמים הנפוצים ביותר היא כשל בהגדרת סדרת הצפנים (ciphersuite) או גרסת ה־TLS שנתמכת על ידי המערכת שלך או שלפלטפורמה שלך חסרה תמיכה בציון שם שרת (SNI - Server Name Indication). ניתן לבדוק את האתר שלך עם [שרת הבדיקה של SSL Labs](https://www.ssllabs.com/ssltest/). אם המערכת לא הצליחה לזהות את התקלה שלך, ניתן לבקש עזרה ב[פורומים הקהילתיים](https://community.letsencrypt.org/) שלנו.

יתכן שיעניין אותך לבקר ב[בדיון המסוים הזה בפורום](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/) למידע נוסף על תאימות.

# ידועים כנתמכים

* Mozilla Firefox >= v2.0
* Google Chrome
* Internet Explorer על גבי Windows XP SP3 ומעלה
* Microsoft Edge
* Android OS >= v2.3.6
* Safari >= v4.0 על גבי macOS
* Safari על גבי iOS >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* קונסולת המשחקים PS4 עם גרסת קושחה >= 5.00

# ידועים כבלתי נתמכים

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP לפני SP3
  * לא הייתה אפשרות לטפל באישורים עם חתימת SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (לקוח דוא״ל מ־2012, לא לקוח דרך הדפדפן)
  * לא הייתה אפשרות לטפל באישורים בלי CRL
* קונסולת המשחקים PS3
* קונסולת המשחקים PS4 עם גרסת קושחה < 5.00
