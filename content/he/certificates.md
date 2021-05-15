---
title: שרשרת אמון
linkTitle: שרשרת אמון (אישורים עליונים ומתווכים)
slug: certificates
top_graphic: 5
lastmod: 2020-02-07
show_lastmod: 1
---


# אישורים עליונים

האישורים העליונים שלנו נשמרים באופן מאובטח ללא חיבור לאינטרנט. אנו מנפיקים אישורי יישויות קצה למנויים מהמתווכים בסעיף הבא.

* פעיל
  * [ISRG Root X1 (בחתימה עצמית)](/certs/isrgrootx1.pem.txt)

הקמנו אתרים כדי לבדוק את שרשור האישורים לעליונים שלנו.

* אישור ISRG Root X1 תקף
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* אישור ISRG Root X1 שנשלל
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* אישור ISRG Root X1 שתוקפו פג
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# אישורים מתווכים

במצב רגיל, אישורים שהונפקו על ידי Let’s Encrypt יגיעו מ־„Let’s Encrypt Authority X3”. המתווך השני, „Let’s Encrypt Authority X4”, שמור להתאוששות ממקרי אסון ויעשה בו שימוש במקרה שתיבצר מאתנו האפשרות להנפיק בעזרת „Let’s Encrypt Authority X3”. איננו משתמשים במתווכים X1 ו־X2 עוד.

IdenTrust חתמו באופן צולב את אישורי התווך שלנו לשיפור התאימות.

* פעיל
  * [Let's Encrypt Authority X3 (חתימה צולבת של IdenTrust)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (חתום על ידי ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* גיבוי
  * [Let's Encrypt Authority X4 (חתימה צולבת של IdenTrust)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (חתום על ידי ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* בדימוס
  * [Let's Encrypt Authority X2 (חתימה צולבת של IdenTrust)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (חתום על ידי ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (חתימה צולבת של IdenTrust)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (חתום על ידי ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# חתימה צולבת

המתווך שלנו „Let’s Encrypt Authority X3” מייצג צמד מפתחות ציבורי/פרטי בודד. המפתח הפרטי של הצמד הזה מייצר חתימה לכל אישורי יישויות הקצה (מוכר גם בתור אישורי עלה), כמו למשל האישורים שאני מנפיקים לשימוש בשרת שלך.

אישור התווך שלנו חתום על ידי ISRG Root X1. העליון של ISRG נחשב מהימן באופן גורף בשלב זה, אך המתווך שלנו נחתם באופן צולב על ידי „DST Root CA X3” מבית IdenTrust (כעת שמו „TrustID X3 Root”) לתאימות לקוח משופרת. העליון של IdenTrust נמצא אתנו זמן רב יותר ולכן נתמך טוב יותר במכשירים ובמערכות הפעלה ישנים (למשל: Windows XP). [ניתן להוריד את „TrustID X3 Root” מ־identrust.com](https://www.identrust.com/support/downloads) (או, לחלופין, ניתן להוריד עותק מכאן: [‎.pem](/certs/trustid-x3-root.pem.txt),‏ [‎.p7b](/certs/trustid-x3-root.p7b)).

משמעות החתימה הצולבת היא שיש שתי סדרות של אישורים מתווכים זמינים, שתיהן מייצגות את המתווך שלנו. האחת חתומה על ידי DST Root CA X3, והשנייה חתומה על ידי ISRG Root X1. הדרך הקלה ביותר להבדיל בין השתיים היא על ידי התבוננות בשדה המנפיק שלהן.

בעת הגדרת שרת אינטרנט, מפעיל השרת מגדיל לא רק את אישור יישות הקצה, אלא גם את רשימת אישורי התווך כדי לסייע לדפדפנים לאמת שלאישור יישות הקצה יש שרשרת מהימנות שמובילה לאישור עליון מהימן. כמעט כל מפעילי השרתים יבחרו להגיש שרשרת שכוללת את אישור התווך עם הנושא „Let’s Encrypt Authority X3” ועם המנפיק „DST Root CA X3”. רכיב התכנה המומלץ של Let's Encrypt,‏ [Certbot](https://certbot.org), יהפוך את ההגדרה הזאת לבלתי מורגשת.

התמונה הבאה מסבירה את הקשרים בין האישורים שלנו בצורה חזותית:

<img src="/certs/isrg-keys.png" alt="תרשים יחסים בין מפתחות ISRG" />

# אישור חתימה OCSP

אישור זה משמש לחתימת תגובות OCSP עבור המתווכים של הרשות Let's Encrypt, כדי שלא יהיה עלינו להעלות את המפתח העליון לרשת כדי לחתום על התגובות האלו. עותק של האישור הזה נכלל אוטומטית בתגובות OCSP אלו, לכן מנויים לא צריכים לעשות אתו דבר. הוא כלול כאן לצורכי הבנה בלבד.

* [ISRG Root OCSP X1 (נחתם על ידי ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# שקיפות אישורים

אנחנו מחויבים לשקיפות בפעילותנו ובאישורים שאנו מנפיקים. אנו מגישים את כל האישורים ל[יומני שקיפות האישורים](https://www.certificate-transparency.org/) בעת הנפקתם. ניתן לצפות בכל האישורים שהונפקו על ידי Let's Encrypt דרך הקישורים שלהלן:

* [הונפק על ידי Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [הונפק על ידי Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# מידע נוסף

המפתחות הפרטיים עבור רשות האישורים העליונה של ISRG ורשויות האישורים המתווכות של Let’s Encrypt מאוחסות על מודולי אבטחה חומרתיים (HSMs), שמספקים דרגה גבוהה של הגנה נגד גניבת המפתחות.

כל מפתחות ה־ISRG הם מפתחות RSA נכון לעכשיו. אנחנו [מתכננים לייצר מפתחות ECDSA](/upcoming-features).
