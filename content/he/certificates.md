---
title: שרשרת אמון
linkTitle: שרשרת אמון (אישורים עליונים ומתווכים)
slug: certificates
top_graphic: 5
lastmod: 2021-09-24
show_lastmod: 1
---


[![תרשים היררכיה של אישור ISRG, נכון לדצמבר 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# אישורים עליונים

האישורים העליונים שלנו נשמרים באופן מאובטח ללא חיבור לאינטרנט. אנו מנפיקים אישורי יישויות קצה למנויים מהמתווכים בסעיף הבא. לתאימות מרבית כשאנחנו מגישים את האישור העליון X2 שלנו למגוון תכניות אישורי על, אנחנו גם חותמים עליהן עם אישור עליון X1.

* פעיל
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [חתימה עצמית](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der),‏ [pem](/certs/isrgrootx1.pem),‏ [txt](/certs/isrgrootx1.txt)
    * [חתימה צולבת מצד DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der),‏ [pem](/certs/isrg-root-x1-cross-signed.pem),‏ [txt](/certs/isrg-root-x1-cross-signed.txt)
* פעיל, זמינות מוגבלת
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [חתימה עצמית](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der),‏ [pem](/certs/isrg-root-x2.pem),‏ [txt](/certs/isrg-root-x2.txt)
    * [חתימה צולבת מצד ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der),‏ [pem](/certs/isrg-root-x2-cross-signed.pem),‏ [txt](/certs/isrg-root-x2-cross-signed.txt)

הקמנו אתרים כדי לבדוק את השרשור לאישורים העליונים הפעילים שלנו.

* ISRG Root X1
  * [בתוקף](https://valid-isrgrootx1.letsencrypt.org/)
  * [נשלל](https://revoked-isrgrootx1.letsencrypt.org/)
  * [פג תוקפו](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [בתוקף](https://valid-isrgrootx2.letsencrypt.org/)
  * [נשלל](https://revoked-isrgrootx2.letsencrypt.org/)
  * [פג תוקפו](https://expired-isrgrootx2.letsencrypt.org/)

# אישורים מתווכים

במצב רגיל, אישורים שהונפקו על ידי Let’s Encrypt יגיעו מ־„R3”, אישור תווך מסוג RSA. נכון להיום, הנפקה מ־„E1”, אישור תווך מסוג ECDSA, אפשרית רק עבור מפתחות מנויי ECDSA עבור [חשבונות שהורשו במיוחד](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). בעתיד, ההנפקה מ־„E1” תהיה זמינה לכולם.

אישורי התווך הנוספים שלנו („R4” ו־„E2”) שמורים לשיקום מתקלות חמורות והשימוש בהם ייעשה רק אם נאבד את היכולת להנפיק עם אישורי התווך העיקריים שלנו. איננו משתמשים עוד באישורי תווך X1,‏ X2,‏ X3 ו־X4.

IdenTrust חתמו באופן צולב את אישורי התווך שלנו מסוג RSA לשיפור התאימות.

* פעיל
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=3334561879)‏: [der](/certs/lets-encrypt-r3.der),‏ [pem](/certs/lets-encrypt-r3.pem),‏ [txt](/certs/lets-encrypt-r3.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=3479778542)‏: [der](/certs/lets-encrypt-r3-cross-signed.der),‏ [pem](/certs/lets-encrypt-r3-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r3-cross-signed.txt) (לא תקף עוד)
* פעיל, זמינות מוגבלת
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [חתימה מצד ISRG Root X2](https://crt.sh/?id=3334671964)‏: [der](/certs/lets-encrypt-e1.der),‏ [pem](/certs/lets-encrypt-e1.pem),‏ [txt](/certs/lets-encrypt-e1.txt)
* גיבוי
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=3334561877)‏: [der](/certs/lets-encrypt-r4.der),‏ [pem](/certs/lets-encrypt-r4.pem),‏ [txt](/certs/lets-encrypt-r4.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=3479778543)‏: [der](/certs/lets-encrypt-r4-cross-signed.der),‏ [pem](/certs/lets-encrypt-r4-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r4-cross-signed.txt) (לא תקף עוד)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [חתימה מצד ISRG Root X2](https://crt.sh/?id=3334671963)‏: [der](/certs/lets-encrypt-e2.der),‏ [pem](/certs/lets-encrypt-e2.pem),‏ [txt](/certs/lets-encrypt-e2.txt)
* בדימוס
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=9314792)‏: [der](/certs/letsencryptauthorityx1.der),‏ [pem](/certs/letsencryptauthorityx1.pem),‏ [txt](/certs/letsencryptauthorityx1.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=10235198)‏: [der](/certs/lets-encrypt-x1-cross-signed.der),‏ [pem](/certs/lets-encrypt-x1-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=12721505)‏: [der](/certs/letsencryptauthorityx2.der),‏ [pem](/certs/letsencryptauthorityx2.pem),‏ [txt](/certs/letsencryptauthorityx2.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=10970235)‏: [der](/certs/lets-encrypt-x2-cross-signed.der),‏ [pem](/certs/lets-encrypt-x2-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=47997543)‏: [der](/certs/letsencryptauthorityx3.der),‏ [pem](/certs/letsencryptauthorityx3.pem),‏ [txt](/certs/letsencryptauthorityx3.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=15706126)‏: [der](/certs/lets-encrypt-x3-cross-signed.der),‏ [pem](/certs/lets-encrypt-x3-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [חתימה מצד ISRG Root X1](https://crt.sh/?id=47997546)‏: [der](/certs/letsencryptauthorityx4.der),‏ [pem](/certs/letsencryptauthorityx4.pem),‏ [txt](/certs/letsencryptauthorityx4.txt)
    * [חתימה צולבת מצד IdenTrust](https://crt.sh/?id=15710291)‏: [der](/certs/lets-encrypt-x4-cross-signed.der),‏ [pem](/certs/lets-encrypt-x4-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# חתימה צולבת

## אישורי תווך

כל אחד מאישורי התווך שלנו מייצר צמד מפתחות ציבורי/פרטי בודד. המפתח הפרטי של הצמד הזה מייצר חתימה לכל אישורי יישויות הקצה (מוכר גם בתור אישורי עלה), כמו למשל האישורים שאני מנפיקים לשימוש בשרת שלך.

אישורי התווך שלנו מסוג RSA חתומים על ידי ISRG Root X1. ISRG Root X1 נחשב למהימן מאוד בנקודה הזאת, אך אישורי התווך מסוג RSA שלנו עדיין חתומים באופן צולב על ידי „[DST Root CA X3](https://crt.sh/?id=8395)” מבית IdenTrust (כיום נקרא „TrustID X3 Root”) לשיפור התאימות מול הלקוחות. העליון של IdenTrust נמצא אתנו זמן רב יותר ולכן נתמך טוב יותר במכשירים ובמערכות הפעלה ישנים (למשל: Windows XP, Android 7). ניתן [להוריד את „TrustID X3 Root” מ־IdenTrust](https://www.identrust.com/support/downloads) (או לחלופין ניתן [להוריד עותק מאתנו](/certs/trustid-x3-root.pem.txt)).

העובדה שיש חתימות צולבת משמעה שלכל אחד מאישור התווך שלנו מסוג RSA יש שני אישורים שמייצגים את אותו מפתח החתימה. האחת חתומה על ידי DST Root CA X3, והשנייה חתומה על ידי ISRG Root X1. הדרך הקלה ביותר להבדיל בין השתיים היא על ידי התבוננות בשדה המנפיק שלהן.

בעת הגדרת שרת אינטרנט, מפעיל השרת מגדיל לא רק את אישור יישות הקצה, אלא גם את רשימת אישורי התווך כדי לסייע לדפדפנים לאמת שלאישור יישות הקצה יש שרשרת מהימנות שמובילה לאישור עליון מהימן. כמעט כל מפעילי השרתים יבחרו להגיש שרשרת שכוללת את אישור התווך עם הנושא „R3” והמנפיק „ISRG Root X1”. תכנית הלקוח המומלצת של Let's Encrypt בשם [Certbot](https://certbot.org), תהפוך את ההגדרות האלו לשקופות מבחינתך.

## אישורים עליונים
בדומה לאישורי תווך, אפשר לחתום באופן צולב גם אישורים עליונים, בדרך כלל כדי לשפר תאימות מול הלקוחות. ה־ECDSA העליון שלנו, ISRG Root X2 נוצר בחורף 2020 והוא האישור העליון להיררכיית ה־ECDSA. הוא מיוצג על ידי שני אישורים: אחד שנחתם עצמאית ואחד שנחתם על ידי ISRG Root X1.

כל האישורים שחתומים על ידי אישור התווך מסוג ECDSA בשם „E1” יסופקו עם שרשרת שכוללת אישור תווך שהנושא שלו הוא „ISRG Root X2” והמנפיק שלו הוא „ISRG Root X1”. כמעט כל מפעילי השרתים יבחרו להגיש את השרשרת הזאת כיוון שהיא מספקת את התאימות הטובה ביותר עד לביסוס המהימנות של ISRG Root X2.

# אישור חתימה OCSP

אישור זה משמש לחתימת תגובות OCSP עבור המתווכים של הרשות Let's Encrypt, כדי שלא יהיה עלינו להעלות את המפתח העליון לרשת כדי לחתום על התגובות האלו. עותק של האישור הזה נכלל אוטומטית בתגובות OCSP אלו, לכן מנויים לא צריכים לעשות אתו דבר. הוא כלול כאן לצורכי הבנה בלבד.

* ISRG Root OCSP X1 ([נחתם על ידי ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der),‏ [pem](/certs/isrg-root-ocsp-x1.pem),‏ [txt](/certs/isrg-root-ocsp-x1.txt)

לאישורי התווך החדשים שלנו אין כתובות OCSP (פרטי השלילה שלהם מוגשים דרך CRL במקום), לכן לא הנפקנו אישור חתימת OCSP מ־ISRG Root X2.

# שקיפות אישורים

אנחנו מחויבים לשקיפות בפעילותנו ובאישורים שאנו מנפיקים. אנו מגישים את כל האישורים ל[יומני שקיפות האישורים](https://www.certificate-transparency.org/) בעת הנפקתם. ניתן לצפות בכל האישורים שהונפקו על ידי Let's Encrypt דרך הקישורים שלהלן:

* [הונפק על ידי Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [הונפק על ידי Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [הונפק ע״י E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [הונפק ע״י R3](https://crt.sh/?Identity=%25&iCAID=183267)
