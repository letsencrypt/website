---
title: סביבת הכנה להקמה
slug: staging-environment
date: 2018-01-05
lastmod: 2025-05-12
show_lastmod: 1
---


אנו ממליצים בחום לבדוק מול סביבת ההכנה להקמה (Staging) שלנו בטרם שימוש בסביבת פעילות מלאה (Production). מצב זה יאפשר לך לסדר את הדברים כמו שצריך בטרם הנפקת אישורים מהימנים ויפחית את הסיכוי להיתקל במגבלת מיכסה.

כתובת ה־ACME של [סביבת ההכנה להקמה מסוג ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605) שלנו היא:

`https://acme-staging-v02.api.letsencrypt.org/directory`

אם בחרת להשתמש ב־[Certbot](https://certbot.eff.org/), אפשר להשתמש בסביבת ההכנה להקמה שלנו עם הדגלונים `--‎test-cert` או `‎--dry-run`. ללקוחות ACME אחרים, נא לקרוא את ההנחיות שלהם לקבלת מידע על בדיקת מול סביבת ההכנה להקמה שלנו.

נא לשים לב שחשבונות ACME מתוחמים לכל אחת מהסביבות, ולכן צריך חשבון נפרד לסביבת ההכנה להקמה. Certbot מטפל בזה עבורך.

# מגבלות מיכסה

סביבת ההכנה להקמה משתמשת באותן מגבלות המיכסה כפי [שמתואר עבור סביבת הפעילות המלאה](/docs/rate-limits) אבל עם ערכים שונים:

* מגבלת ה**[הרשמות החדשות לפי כתובת IP](/docs/rate-limits/#new-registrations-per-ip-address)** היא 50 כל 3 שעות.
* מגבלת ה**[הרשמות החדשות לפי טווח IPv6](/docs/rate-limits/#new-registrations-per-ipv6-range)** היא 500 כל 3 שעות (כמו המבצעית).
* מגבלת ה**[הזמנות החדשות לפי כתובת](/docs/rate-limits/#new-orders-per-account)** היא 1500 כל 3 שעות.
* מגבלת **[אישורים חדשים לכל שם תחום רשום](/docs/rate-limits/#new-certificates-per-registered-domain)** היא 30,000 לשנייה.
* מגבלת ה**[אישורים החדשים לפי סדרה מסוימת של שמות מארחים](/docs/rate-limits/#new-certificates-per-exact-set-of-hostnames)** היא 30,000 בשבוע.
* מגבלת **[כשלי האימות לשם מארח לחשבון](/docs/rate-limits/#authorization-failures-per-hostname-per-account)** היא 200 לשעה.
* מגבלת **[כשלי אימות ברצף לשם מארח לפי חשבון](/docs/rate-limits/#consecutive-authorization-failures-per-hostname-per-account)** היא 3600 לכל 6 שעות.

[מגבלות הבקשות הכוללות](/docs/rate-limits/#overall-requests-limit) הן:

| נקודת קצה          | בקשות ל־IP (לשנייה) | קיבולת התפרצות |
| ------------------ | ------------------- | -------------- |
| /acme/new-nonce    | 20                  | 10             |
| /acme/new-account  | 5                   | 15             |
| /acme/new-order    | 20                  | 40             |
| /acme/revoke-cert  | 10                  | 100            |
| /acme/renewal-info | 1000                | 100            |
| /acme/*            | 20                  | 20             |
| /directory         | 40                  | 40             |

# היררכיית האישורים להכנה להקמה

לסביבת ההכנה להקמה יש היררכיית אישורים ש[מחקה את סביבת הפעילות המלאה](/certificates). השמות השתנו ונוספה לפניהם הקידומת (STAGING) (הכנה להקמה) ושם ייחודי כדי שאפשר יהיה להבחין ביניהם לבין המקבילות שלהם בסביבה המבצעית.

## רשויות אישורים עליונות

לסביבת ההכנה להקמה יש שני אישורי על פעילים ש**אינם נמצאים** במאגר המהימנות של הדפדפן/לקוח: „(STAGING) Pretend Pear X1” ו־„(STAGING) Bogus Broccoli X2”.

כדי לשנות לקוח לבדיקות בלבד כך שיסמוך על סביבת ההכנה להקמה למטרות בדיקה, ניתן לעשות זאת על ידי הוספת האישורים שלהם למאגר המהימנים שלך למטרות בדיקה. **חשוב:** אין להוסיף את האישור העליון או המתווך של סביבת ההכנה להקמה למאגר המהימנות שמשמש אותך לגלישה רגילה באינטרנט או לפעילויות אחרות מאחר שאין עליהן פיקוח או עומדות באותם תקנים מחמירים כמו האישורים העליונים של סביבת הפעילות המלאה שלנו ולכן אינם בטוחים לשימוש לאף מטרה למעט בדיקות.

* **Pretend Pear X1**
  * נושא: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * סוג מפתח: `RSA 4096`
  * פרטי האישור: [der](/certs/staging/letsencrypt-stg-root-x1.der),‏ [pem](/certs/staging/letsencrypt-stg-root-x1.pem),‏ [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
* **Bogus Broccoli X2**
  * נושא: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * סוג מפתח: `ECDSA P-384`
  * פרטי אישור (חתימה עצמית): [der](/certs/staging/letsencrypt-stg-root-x2.der),‏ [pem](/certs/staging/letsencrypt-stg-root-x2.pem),‏ [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * פרטי אישור (חתימה צולבת על ידי Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der),‏ [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem),‏ [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)

## רשויות אישורים כפופות (ביניים)

לסביבת ההכנה להקמה יש אישורי ביניים שמחקים את הסביבה המבצעית, הונפקו מאישורי העל הלא אמינים שמפורטים להלן. כמו בסביבה המבצעית, לא כולם בשימוש כל הזמן. רשימת אישורי הביניים העדכניים המלאה היא:

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14

אישורי הביניים האלה נתונים לשינוי בכל רגע נתון ושום מערכת לא אמורה להצמיד או לתת בהם אמון. באופן כללי, אפשר לצפות מאישורי הביניים להיות מקבילים לאישורי הביניים התואמים (אמינים) בסביבה המבצעית. במקרה הצורך, אפשר לקבל [כאן](https://github.com/letsencrypt/website/blob/main/static/certs/staging) את פרטי האישור המלאים.

# שקיפות אישורים

סביבת ההכנה להקמה משתמשת במגוון יומני שקיפות אישורים לבדיקה. חותמות זמן של חתימת אישורים (SCTs) מהיומנים האלה נכללים באישורים בהכנה להקמה. למרות זאת, כסביבת הכנה להקמה בלבד, אי אפשר להשתמש בשקיפות אישורים (CT) כדי להבחין באישורים שהופקו לסביבת ההכנה להקמה בצורה אמינה.

היומנים האלה כוללים את [יומני הבדיקות](/docs/ct-logs#testing) של Let's Encrypt, לרבות יומני בדיקות מפעילי יומני שקיפות אישורים נוספים.

בנוסף, אפשר להשתמש בכמה יומני [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv), שהם אינם יומנים בפועל ואינם מאחסנים אישורים שהונפקו.

# שילוב רציף / בדיקת פיתוח

לסביבת ההכנה להקמה יש מגבלות מיכסה נדיבות כדי לאפשר בדיקה אבל כנראה שהיא פחות מתאימה לשילוב עם סביבות פיתוח או שילוב רציף (CI). הגשת בקשות רשת לשרתים חיצוניים יכולה להוביל לחוסר יציבות וסביבת ההכנה להקמה אינה מציעה אף דרך „לזייף” DNS או הצלחה בתיקוף אתגר מה שהופך את הקמת מערכת הבדיקות למסובכת יותר.

בנוסף לסביבת ההכנה להקמה מציעה Let's Encrypt שרת ACME קטן שפותח לסביבות שילוב רציף ופיתוח שנקרא [Pebble](https://github.com/letsencrypt/pebble). הרצת Pebble במכונת הפיתוח או בסביבת הידור הקוד שלך היא [מהירה ופשוטה](https://github.com/letsencrypt/pebble#docker).
