---
title: שרשראות אמון
linkTitle: שרשראות אמון (אישורים עליונים ומתווכים)
slug: certificates
lastmod: 2024-06-11
show_lastmod: 1
---

העמוד הזה מתאר את המצב הנוכחי ואת ההיסטוריה המתאימה של רשויות אישורים שמופעלים על ידי Let's Encrypt. נא לשים לב שנהוג לחשוב על רשות אישורים בדרך כלל כעל מפתח ושם: כל רשות אישורים יכולה להיות מיוצגת על ידי _מגוון_ אישורים שכולם מכילים את אותו הנושא ואת אותם פרטי המפתח הציבורי. במקרים כאלה, סיפקנו את פרטי כל האישורים שמייצגים את רשות האישורים.

[![תרשים היררכיית אישורי ISRG, נכון ליוני 2024](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# רשויות אישורים עליונות

חומר מפתח העל שלנו נשמר בצורה מאובטחת ללא חיבור לאינטרנט. אנו מנפיקים אישורי יישויות קצה למנויים מהמתווכים שמתוארים בסעיף הבא. לכל נושאי (Subjects) אישורי העל שדה המדינה (Country) מוגדר בתור `C = US`.

נא לשים לב שלרשויות אישורים עליונות אין תאריכי תפוגה באותו האופן אמו אישורים אחרים. למרות שהאישורים שלהם שנחתמו עצמאית מכילים תאריך `notAfter` (לא אחרי), תוכניות על ומאגרי אמון יכולים להחליט האם הם בוטחים ברשות אישורים מעבר לתאריך הזה או קוטעים את האמון לפני התאריך הזה. מעצם היותם, תאריכי סוף התוקף שסופקו להלן הם משוערכים, בהתאם למדיניות תוכנית אישור העל הנוכחית.

* **ISRG Root X1**
  * נושא: `O = Internet Security Research Group,‏ CN = ISRG Root X1`
  * סוג מפתח: `RSA 4096`
  * אמין עד: 2030-06-04 (נוצר ב־2015-06-04)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=7394),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=7394)
  * פרטי אישורים (נחתמו עצמאית): [crt.sh](https://crt.sh/?id=9314791),‏ [der](/certs/isrgrootx1.der),‏ [pem](/certs/isrgrootx1.pem),‏ [txt](/certs/isrgrootx1.txt)
  * פרטי אישור (נחתם בהצלבה מול DST Root CA X3):‏ [crt.sh](https://crt.sh/?id=3958242236),‏ [der](/certs/isrg-root-x1-cross-signed.der),‏ [pem](/certs/isrg-root-x1-cross-signed.pem),‏ [txt](/certs/isrg-root-x1-cross-signed.txt) (פרש לגמלאות)
  * אתרי בדיקה: [תקף](https://valid-isrgrootx1.letsencrypt.org/), [נשלל](https://revoked-isrgrootx1.letsencrypt.org/), [פג תוקף](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * נושא: `O = Internet Security Research Group,‏ CN = ISRG Root X2`
  * סוג מפתח: `ECDSA P-384`
  * אמין עד: 2035-09-04 (נוצר ב־2020-09-04)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183269),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183269)
  * פרטי אישורים (נחתמו עצמאית): [crt.sh](https://crt.sh/?id=3335562555),‏ [der](/certs/isrg-root-x2.der),‏ [pem](/certs/isrg-root-x2.pem),‏ [txt](/certs/isrg-root-x2.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878),‏ [der](/certs/isrg-root-x2-cross-signed.der),‏ [pem](/certs/isrg-root-x2-cross-signed.pem),‏ [txt](/certs/isrg-root-x2-cross-signed.txt)
  * אתרי בדיקה: [תקף](https://valid-isrgrootx2.letsencrypt.org/), [נשלל](https://revoked-isrgrootx2.letsencrypt.org/), [פג תוקף](https://expired-isrgrootx2.letsencrypt.org/)

לפרטים נוספים על תאימות אישורי העל שלנו מול מגוון מכשירים ומאגרי אמון, יש לפנות אל [תאימות האישורים](/docs/cert-compat).

# רשויות אישורים כפופות (ביניים)

אנחנו כרגע מתחזקים את אישורי הביניים שלנו בסבב פעיל. אישורי מנויים שמכילים אישורי ECDSA יונפקו מאחד מאישורי התווך מסוג ECDSA, בדומה, אישורי מנויים שמכילים מפתח ציבורי מסוג RSA יונפקו מאחד מאישורי התווך מסוג RSA.

לכל נושאי (Subjects) אישורי הביניים שדה המדינה (Country) מוגדר בתור `C = US`.

* **Let's Encrypt E5**
  * נושא: `O = Let's Encrypt,‏ CN = E5`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295810),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295810)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [der](/certs/2024/e5.der),‏ [pem](/certs/2024/e5.pem),‏ [txt](/certs/2024/e5.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/2024/e5-cross.der),‏ [pem](/certs/2024/e5-cross.pem),‏ [txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * נושא: `O = Let's Encrypt,‏ CN = E7`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295819),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295819)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [der](/certs/2024/e6.der),‏ [pem](/certs/2024/e6.pem),‏ [txt](/certs/2024/e6.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/2024/e6-cross.der),‏ [pem](/certs/2024/e6-cross.pem),‏ [txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * נושא: `O = Let's Encrypt,‏ CN = R10`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295814),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295814)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [der](/certs/2024/r10.der),‏ [pem](/certs/2024/r10.pem),‏ [txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * נושא: `O = Let's Encrypt,‏ CN = R11`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295815),‏ [רשות אישורים](https://crt.sh/?Identity=%25&iCAID=295815)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [der](/certs/2024/r11.der),‏ [pem](/certs/2024/r11.pem),‏ [txt](/certs/2024/r11.txt)

לחיצה להלן תציג פרטים על אישורי תווך נוספים שאינם חלק משושלת ההנפקה הפעילה:

<details>
<summary>גיבוי</summary>

לרשויות אישורי הביניים האלה יש אישורים שתקפים כרגע, אך לא מתבצעת מהם הנפקה עוד. אנו עשויים להתחיל להנפיק אישורי מנויים מהם בכל זמן נתון, ללא אזהרה.

* **Let's Encrypt E7**
  * נושא: `O = Let's Encrypt,‏ CN = E7`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295813),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295813)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [der](/certs/2024/e7.der),‏ [pem](/certs/2024/e7.pem),‏ [txt](/certs/2024/e7.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/2024/e7-cross.der),‏ [pem](/certs/2024/e7-cross.pem),‏ [txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * נושא: `O = Let's Encrypt,‏ CN = E8`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295809),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295809)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [der](/certs/2024/e8.der),‏ [pem](/certs/2024/e8.pem),‏ [txt](/certs/2024/e8.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/2024/e8-cross.der),‏ [pem](/certs/2024/e8-cross.pem),‏ [txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * נושא: `O = Let's Encrypt,‏ CN = E9`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295812),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295812)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [der](/certs/2024/e9.der),‏ [pem](/certs/2024/e9.pem),‏ [txt](/certs/2024/e9.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/2024/e9-cross.der),‏ [pem](/certs/2024/e9-cross.pem),‏ [txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * נושא: `O = Let's Encrypt,‏ CN = R12`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295816),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295816)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [der](/certs/2024/r12.der),‏ [pem](/certs/2024/r12.pem),‏ [txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * נושא: `O = Let's Encrypt,‏ CN = R13`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295817),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295817)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [der](/certs/2024/r13.der),‏ [pem](/certs/2024/r13.pem),‏ [txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * נושא: `O = Let's Encrypt,‏ CN = R14`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295818),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295818)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [der](/certs/2024/r14.der),‏ [pem](/certs/2024/r14.pem),‏ [txt](/certs/2024/r14.txt)

</details>

<details>
<summary>בדימוס</summary>

רשויות אישורי הביניים האלה לא משמשות עוד להנפקת אישורי מנויים. לאלו שעדיין יש להם אישורים תקפים יכולים להפיק תגובות OCSP (פרוטוקול מצב אישורים מקוון) ו/או CRLs (רשימות שלילת אישורים).

* **Let's Encrypt E1**
  * נושא: `O = Let's Encrypt,‏ CN = E1`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2025-09-15
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183283),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183283)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964),‏ [der](/certs/lets-encrypt-e1.der),‏ [pem](/certs/lets-encrypt-e1.pem),‏ [txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * נושא: `O = Let's Encrypt,‏ CN = E2`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2025-09-15
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183284),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183284)
  * פרטי אישורים (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963),‏ [der](/certs/lets-encrypt-e2.der),‏ [pem](/certs/lets-encrypt-e2.pem),‏ [txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * נושא: `O = Let's Encrypt,‏ CN = R3`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2025-09-15
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183267),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183267)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879),‏ [der](/certs/lets-encrypt-r3.der),‏ [pem](/certs/lets-encrypt-r3.pem),‏ [txt](/certs/lets-encrypt-r3.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=3479778542),‏ [der](/certs/lets-encrypt-r3-cross-signed.der),‏ [pem](/certs/lets-encrypt-r3-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * נושא: `O = Let's Encrypt,‏ CN = R4`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2025-09-15
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183268),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183268)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877),‏ [der](/certs/lets-encrypt-r4.der),‏ [pem](/certs/lets-encrypt-r4.pem),‏ [txt](/certs/lets-encrypt-r4.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=3479778543),‏ [der](/certs/lets-encrypt-r4-cross-signed.der),‏ [pem](/certs/lets-encrypt-r4-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r4-cross-signed.txt)
* **רשות Let's Encrypt X1**
  * נושא: `O = Let's Encrypt,‏ CN = Let's Encrypt Authority X1`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2020-06-04 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=7395),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=7395)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792),‏ [der](/certs/letsencryptauthorityx1.der),‏ [pem](/certs/letsencryptauthorityx1.pem),‏ [txt](/certs/letsencryptauthorityx1.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=10235198),‏ [der](/certs/lets-encrypt-x1-cross-signed.der),‏ [pem](/certs/lets-encrypt-x1-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **רשות Let's Encrypt X2**
  * נושא: `O = Let's Encrypt,‏ CN = Let's Encrypt Authority X2`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2020-06-04 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=9745),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=9745)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505),‏ [der](/certs/letsencryptauthorityx2.der),‏ [pem](/certs/letsencryptauthorityx2.pem),‏ [txt](/certs/letsencryptauthorityx2.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=10970235),‏ [der](/certs/lets-encrypt-x2-cross-signed.der),‏ [pem](/certs/lets-encrypt-x2-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **רשות Let's Encrypt X3**
  * נושא: `O = Let's Encrypt,‏ CN = Let's Encrypt Authority X3`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2021-10-06 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=16418),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=16418)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543),‏ [der](/certs/letsencryptauthorityx3.der),‏ [pem](/certs/letsencryptauthorityx3.pem),‏ [txt](/certs/letsencryptauthorityx3.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=15706126),‏ [der](/certs/lets-encrypt-x3-cross-signed.der),‏ [pem](/certs/lets-encrypt-x3-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **רשות Let's Encrypt X4**
  * נושא: `O = Let's Encrypt,‏ CN = Let's Encrypt Authority X4`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2021-10-06 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=16429),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=16429)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546),‏ [der](/certs/letsencryptauthorityx4.der),‏ [pem](/certs/letsencryptauthorityx4.pem),‏ [txt](/certs/letsencryptauthorityx4.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=15710291),‏ [der](/certs/lets-encrypt-x4-cross-signed.der),‏ [pem](/certs/lets-encrypt-x4-cross-signed.pem),‏ [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>מגיב OCSP (פרוטוקול מצב אישורים מקוון) מיופה כוח</summary>

צמד מפתחות זה שימש בעבר לחתום על בקשות OCSP בנוגע למצב אישורי הביניים של Let's Encrypt מטעם אישור העל של Let's Encrypt כך שניתן יהיה לשמור על מפתח העל באופן מאובטח בניתוק מוחלט מהאינטרנט. איננו מנפיקים עוד תגובות OCSP לאישורי הביניים שלנו, במקום אנו מנפיקים רשימות שלילה מאישור העל שלנו כדי למסור את מצב שלילת אישורי הביניים.

* **ISRG Root OCSP X1**
  * נושא: `O = Internet Security Research Group,‏ CN = ISRG Root OCSP X1`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2025-06-10
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=2929281974),‏ [der](/certs/isrg-root-ocsp-x1.der),‏ [pem](/certs/isrg-root-ocsp-x1.pem),‏ [txt](/certs/isrg-root-ocsp-x1.txt)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=142051103) (התוקף פג)

</details>
<p><!-- to get the right line spacing after a block element --></p>

# שרשראות

כאשר לקוח ACME מוריד אישור חדש שהונפק מה־ACME API של Let's Encrypt, האישור הזה הופך להיות חלק מה„שרשרת” שכוללת גם אישור תווך אחד או יותר. בדרך כלל השרשרת הזאת מורכבת מאישורי ישות הקצה ואישור ביניים אחד בלבד, אבל היא יכולה להכיל עוד אישורי ביניים. הרעיון הוא שעל ידי הצגת כל שרשרת האישורים האת לדפדפן המבקרים באתר, הדפדפן יוכל לאמת את החתימות כל הדרך עד לשורש שהדפדפן הזה סומך עליו מבלי להוריד אישורי ביניים נוספים.

לפעמים יש יותר משרשרת אחת תקפה לאישור מסוים: למשל, אם אישור תווך נחתם באופן צולב, אז כל אחד משני האישורים האלה יכול להיות הרשומה השנייה, „משתרשר עד” כל אחד משני המקורות השונים. במקרה כזה, מפעילי אתרים שונים יכולים לבחור בשרשראות שונות כתלות במאפיינים שהכי חשובים להם.

אישורי מנויים עם מפתחות RSA ציבוריים מונפקים מאישורי RSA הביניים שלנו, שמונפקים רק מאישור RSA העל שלנו ISRG Root X1 (כלומר הם אינם חתומים באופן צולב). לכן, לכל אישורי המנויים מסוג RSA יש רק שרשרת אחת זמינה:

<div style="text-align: center">
אישור מנוי RSA → RSA ביניים (R10 או R11) → ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

אישורי מנויים עם מפתחות ECDSA ציבוריים מונפקים מאישורי ה־ECDSA שלנו, שמונפקים שניהם (כלומר נחתמים באופן צולב) מ־ISRG Root X1 העל ב־RSA ומ־ISRG Root X2 העל ב־ECDSA שלנו. לכן אנחנו מציעים שתי שרשראות לאישורים האלה:

<div style="text-align: center">
אישור מנוי ECDSA → ECDSA ביניים (E5 או E6) → ISRG Root X1

אישור מנוי ECDSA → ECDSA ביניים (E5 או E6) → ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

השרשרת הראשונה, עד ISRG Root X1 מספקת את התאימות הטובה ביותר כיוון שהאישור העליון כלול ברוב אחסוני האמון. השרשרת השנייה, עד ISRG Root X2, צורכת פחות בתים בתעבורת רשת לכל לחיצת יד של TLS. אנו מספקים את השרשרת הראשונה כברירת מחדל, כדי להבטיח את התאימות המרבית. מנויים שרוצים לתעדף גודל על פני תאימות יכולים לפנות לתיעוד של לקוח ה־ACME שלהם לקבלת הנחיות איך לבקש את השרשרת החלופית (למשל, [דגלון ‎`--preferred-chain` של certbot](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
