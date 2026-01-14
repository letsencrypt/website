---
title: שרשראות אמון
linkTitle: שרשראות אמון (אישורים עליונים ומתווכים)
slug: certificates
lastmod: 2026-01-08
show_lastmod: 1
---

העמוד הזה מתאר את המצב הנוכחי ואת ההיסטוריה המתאימה של רשויות אישורים שמופעלים על ידי Let's Encrypt. נא לשים לב שנהוג לחשוב על רשות אישורים בדרך כלל כעל מפתח ושם: כל רשות אישורים יכולה להיות מיוצגת על ידי _מגוון_ אישורים שכולם מכילים את אותו הנושא ואת אותם פרטי המפתח הציבורי. במקרים כאלה, סיפקנו את פרטי כל האישורים שמייצגים את רשות האישורים. אם חיפשת את מזהי עוגן האמון (Trust Anchor IDs) עם רשויות האישורים האלה, כדאי לעיין בעמוד שלנו על [מזהי עצמים](/docs/oids).

[![תרשים היררכיית האישורים של ה־ISRG, נכון לינואר 2026](/images/isrg-hierarchy.png)](/images/isrg-hierarchy-full.png)

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
  * שם מארח לרשימת שלילת אישורים (CRL): `x1.c.lencr.org`
  * אתרי בדיקה: [תקף](https://valid-isrgrootx1.letsencrypt.org/), [נשלל](https://revoked-isrgrootx1.letsencrypt.org/), [פג תוקף](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * נושא: `O = Internet Security Research Group,‏ CN = ISRG Root X2`
  * סוג מפתח: `ECDSA P-384`
  * אמין עד: 2035-09-04 (נוצר ב־2020-09-04)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183269),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183269)
  * פרטי אישורים (נחתמו עצמאית): [crt.sh](https://crt.sh/?id=3335562555),‏ [der](/certs/isrg-root-x2.der),‏ [pem](/certs/isrg-root-x2.pem),‏ [txt](/certs/isrg-root-x2.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878),‏ [der](/certs/isrg-root-x2-cross-signed.der),‏ [pem](/certs/isrg-root-x2-cross-signed.pem),‏ [txt](/certs/isrg-root-x2-cross-signed.txt)
  * פרטי אישור (חתימה צולבת שנייה על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=20878422868),‏ [der](/certs/gen-y/root-x2-by-x1.der),‏ [pem](/certs/gen-y/root-x2-by-x1.pem),‏ [txt](/certs/gen-y/root-x2-by-x1.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `x2.c.lencr.org`
  * אתרי בדיקה: [תקף](https://valid-isrgrootx2.letsencrypt.org/), [נשלל](https://revoked-isrgrootx2.letsencrypt.org/), [פג תוקף](https://expired-isrgrootx2.letsencrypt.org/)

אישורי העל האלה לא נכללים במאגרי האמון של תוכנית אישורי העל, אך תוגש להוספה בקרוב:

* **ISRG Root YE**
  * נושא: `O = ISRG, CN = Root YE`
  * סוג מפתח: `ECDSA P-384`
  * אמין עד: לא ידוע (נוצר ב־2025-09-03)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=430535),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=430535)
  * פרטי אישור (חתימה עצמית): [der](/certs/gen-y/root-ye.der),‏ [pem](/certs/gen-y/root-ye.pem),‏ [txt](/certs/gen-y/root-ye.txt)
  * פרטי האישור (חתימה צולבת על ידי ISRG Root X2): [der](/certs/gen-y/root-ye-by-x2.der),‏ [pem](/certs/gen-y/root-ye-by-x2.pem),‏ [txt](/certs/gen-y/root-ye-by-x2.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `ye.c.lencr.org`
  * אתרי בדיקה: יתווספו בהמשך
* **ISRG Root YR**
  * נושא: `O = ISRG, CN = Root YR`
  * סוג מפתח: `RSA 4096`
  * אמין עד: לא ידוע (נוצר ב־2025-09-03)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=430543),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=430543)
  * פרטי אישור (חתימה עצמית): [der](/certs/gen-y/root-yr.der),‏ [pem](/certs/gen-y/root-yr.pem),‏ [txt](/certs/gen-y/root-yr.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [der](/certs/gen-y/root-yr-by-x1.der),‏ [pem](/certs/gen-y/root-yr-by-x1.pem),‏ [txt](/certs/gen-y/root-yr-by-x1.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `yr.c.lencr.org`
  * אתרי בדיקה: יתווספו בהמשך

לפרטים נוספים על תאימות אישורי העל שלנו מול מגוון מכשירים ומאגרי אמון, יש לפנות אל [תאימות האישורים](/docs/cert-compat).

# רשויות אישורים כפופות (ביניים)

אנחנו כרגע מתחזקים את שמונת אישורי הביניים שלנו בסבב פעיל. אישורי מנויים שמכילים אישורי ECDSA יונפקו מאחד מאישורי התווך מסוג ECDSA, בדומה, אישורי מנויים שמכילים מפתח ציבורי מסוג RSA יונפקו מאחד מאישורי התווך מסוג RSA. אישורי מנויים שהונפקו תחת ה[פרופילים](/docs/profiles) „classic” ו־„tlsclient” יונפקו מאחד מארבעת אישורי הביניים הראשונים שמופיעים (E7 עד R13), לחלופין, אישורי מנויים שהונפקו תחת הפרופילים „tlsserver” ו־„shortlived” יונפקו מאחד מארבעת אישורי הביניים האחרונים (YE1 עד YR2).

לכל נושאי (Subjects) אישורי הביניים שדה המדינה (Country) מוגדר בתור `C = US`.

* **Let's Encrypt E7**
  * נושא: `O = Let's Encrypt,‏ CN = E7`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295813),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295813)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132900),‏ [der](/certs/2024/e7.der),‏ [pem](/certs/2024/e7.pem),‏ [txt](/certs/2024/e7.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132895),‏ [der](/certs/2024/e7-cross.der),‏ [pem](/certs/2024/e7-cross.pem),‏ [txt](/certs/2024/e7-cross.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e7.c.lencr.org`
  * שרשראות:
    * EE‏ → E7‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← E7 ← ISRG Root X2
* **Let's Encrypt E8**
  * נושא: `O = Let's Encrypt,‏ CN = E8`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295809),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295809)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132890),‏ [der](/certs/2024/e8.der),‏ [pem](/certs/2024/e8.pem),‏ [txt](/certs/2024/e8.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132901),‏ [der](/certs/2024/e8-cross.der),‏ [pem](/certs/2024/e8-cross.pem),‏ [txt](/certs/2024/e8-cross.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e8.c.lencr.org`
  * שרשראות:
    * EE‏ → E8‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← E8 ← ISRG Root X2
* **Let's Encrypt R12**
  * נושא: `O = Let's Encrypt,‏ CN = R12`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295816),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295816)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132898),‏ [der](/certs/2024/r12.der),‏ [pem](/certs/2024/r12.pem),‏ [txt](/certs/2024/r12.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r12.c.lencr.org`
  * שרשראות:
    * EE‏ → R12‏ → ISRG Root X1 (ברירת מחדל)
* **Let's Encrypt R13**
  * נושא: `O = Let's Encrypt,‏ CN = R13`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295817),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295817)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132902),‏ [der](/certs/2024/r13.der),‏ [pem](/certs/2024/r13.pem),‏ [txt](/certs/2024/r13.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r13.c.lencr.org`
  * שרשראות:
    * EE →‏ R13‏ → ISRG Root X1 (ברירת מחדל)
* **Let's Encrypt YE1**
  * נושא: `O = Let's Encrypt,‏ CN = YE1`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=432952),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=432952)
  * פרטי האישור: [der](/certs/gen-y/int-ye1.der),‏ [pem](/certs/gen-y/int-ye1.pem),‏ [txt](/certs/gen-y/int-ye1.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `ye1.c.lencr.org`
  * שרשראות:
    * EE‏ → YE1‏ → Root YE‏ → ISRG Root X2‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← YE1 ← Root YE ← ISRG Root X2
    * EE ← YE1 ← Root YE
* **Let's Encrypt YE2**
  * נושא: `O = Let's Encrypt,‏ CN = YE2`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=431054),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=431054)
  * פרטי האישור: [der](/certs/gen-y/int-ye2.der),‏ [pem](/certs/gen-y/int-ye2.pem),‏ [txt](/certs/gen-y/int-ye2.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `ye2.c.lencr.org`
  * שרשראות:
    * EE‏ → YE2‏ → Root YE‏ → ISRG Root X2‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← YE2 ← Root YE ← ISRG Root X2
    * EE ← YE2 ← Root YE
* **Let's Encrypt YR1**
  * נושא: `O = Let's Encrypt,‏ CN = YR1`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=432476),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=432476)
  * פרטי האישור: [der](/certs/gen-y/int-yr1.der),‏ [pem](/certs/gen-y/int-yr1.pem),‏ [txt](/certs/gen-y/int-yr1.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `yr1.c.lencr.org`
  * שרשראות:
    * EE‏ → YR1‏ → Root YR‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← YR1 ← Root YR
* **Let's Encrypt YR2**
  * נושא: `O = Let's Encrypt,‏ CN = YR2`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=432477),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=432477)
  * פרטי האישור: [der](/certs/gen-y/int-yr2.der),‏ [pem](/certs/gen-y/int-yr2.pem),‏ [txt](/certs/gen-y/int-yr2.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `yr2.c.lencr.org`
  * שרשראות:
    * EE‏ → YR2‏ → Root YR‏ → ISRG Root X1 (ברירת מחדל)
    * EE ← YR2 ← Root YR

לחיצה להלן תציג פרטים על אישורי תווך נוספים שאינם חלק משושלת ההנפקה הפעילה:

<details>
<summary>גיבוי</summary>

לרשויות אישורי הביניים האלה יש אישורים שתקפים כרגע, אך לא מתבצעת מהם הנפקה עוד. אנו עשויים להתחיל להנפיק אישורי מנויים מהם בכל זמן נתון, ללא אזהרה.

* **Let's Encrypt E9**
  * נושא: `O = Let's Encrypt,‏ CN = E9`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295812),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295812)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132894),‏ [der](/certs/2024/e9.der),‏ [pem](/certs/2024/e9.pem),‏ [txt](/certs/2024/e9.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132894),‏ [der](/certs/2024/e9-cross.der),‏ [pem](/certs/2024/e9-cross.pem),‏ [txt](/certs/2024/e9-cross.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e9.c.lencr.org`
* **Let's Encrypt R14**
  * נושא: `O = Let's Encrypt,‏ CN = R14`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295818),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295818)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132903),‏ [der](/certs/2024/r14.der),‏ [pem](/certs/2024/r14.pem),‏ [txt](/certs/2024/r14.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r14.c.lencr.org`
* **Let's Encrypt YE3**
  * נושא: `O = Let's Encrypt,‏ CN = YE3`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=432914),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=432914)
  * פרטי האישור: [der](/certs/gen-y/int-ye3.der),‏ [pem](/certs/gen-y/int-ye3.pem),‏ [txt](/certs/gen-y/int-ye3.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `ye3.c.lencr.org`
* **Let's Encrypt YR3**
  * נושא: `O = Let's Encrypt,‏ CN = YR3`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2028-09-02
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=432480),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=432480)
  * פרטי האישור: [der](/certs/gen-y/int-yr3.der),‏ [pem](/certs/gen-y/int-yr3.pem),‏ [txt](/certs/gen-y/int-yr3.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `yr3.c.lencr.org`

</details>

<details>
<summary>בדימוס</summary>

רשויות אישורי הביניים האלה לא משמשות עוד להנפקת אישורי מנויים. לאלו שעדיין יש להם אישורים תקפים יכולים להפיק CRLs (רשימות שלילת אישורים).

* **Let's Encrypt E1**
  * נושא: `O = Let's Encrypt,‏ CN = E1`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2025-09-15 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183283),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183283)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964),‏ [der](/certs/lets-encrypt-e1.der),‏ [pem](/certs/lets-encrypt-e1.pem),‏ [txt](/certs/lets-encrypt-e1.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e1.c.lencr.org`
* **Let's Encrypt E2**
  * נושא: `O = Let's Encrypt,‏ CN = E2`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2025-09-15 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183284),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183284)
  * פרטי אישורים (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963),‏ [der](/certs/lets-encrypt-e2.der),‏ [pem](/certs/lets-encrypt-e2.pem),‏ [txt](/certs/lets-encrypt-e2.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e2.c.lencr.org`
* **Let's Encrypt E5**
  * נושא: `O = Let's Encrypt,‏ CN = E5`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295810),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295810)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132891),‏ [der](/certs/2024/e5.der),‏ [pem](/certs/2024/e5.pem),‏ [txt](/certs/2024/e5.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132892),‏ [der](/certs/2024/e5-cross.der),‏ [pem](/certs/2024/e5-cross.pem),‏ [txt](/certs/2024/e5-cross.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e5.c.lencr.org`
* **Let's Encrypt E6**
  * נושא: `O = Let's Encrypt,‏ CN = E7`
  * סוג מפתח: `ECDSA P-384`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295819),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295819)
  * פרטי אישור (נחתם על ידי ISRG Root X2): [crt.sh](https://crt.sh/?id=12396132905),‏ [der](/certs/2024/e6.der),‏ [pem](/certs/2024/e6.pem),‏ [txt](/certs/2024/e6.txt)
  * פרטי אישור (חתימה צולבת על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132904),‏ [der](/certs/2024/e6-cross.der),‏ [pem](/certs/2024/e6-cross.pem),‏ [txt](/certs/2024/e6-cross.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `e6.c.lencr.org`
* **Let's Encrypt R3**
  * נושא: `O = Let's Encrypt,‏ CN = R3`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2025-09-15 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183267),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183267)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879),‏ [der](/certs/lets-encrypt-r3.der),‏ [pem](/certs/lets-encrypt-r3.pem),‏ [txt](/certs/lets-encrypt-r3.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=3479778542),‏ [der](/certs/lets-encrypt-r3-cross-signed.der),‏ [pem](/certs/lets-encrypt-r3-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r3-cross-signed.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r3.c.lencr.org`
* **Let's Encrypt R4**
  * נושא: `O = Let's Encrypt,‏ CN = R4`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2025-09-15 (התוקף פג)
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=183268),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=183268)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877),‏ [der](/certs/lets-encrypt-r4.der),‏ [pem](/certs/lets-encrypt-r4.pem),‏ [txt](/certs/lets-encrypt-r4.txt)
  * פרטי אישור (חתימה צולבת על ידי IdenTrust): [crt.sh](https://crt.sh/?id=3479778543),‏ [der](/certs/lets-encrypt-r4-cross-signed.der),‏ [pem](/certs/lets-encrypt-r4-cross-signed.pem),‏ [txt](/certs/lets-encrypt-r4-cross-signed.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r4.c.lencr.org`
* **Let's Encrypt R10**
  * נושא: `O = Let's Encrypt,‏ CN = R10`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295814),‏ [אישורים שהונפקו](https://crt.sh/?Identity=%25&iCAID=295814)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132896),‏ [der](/certs/2024/r10.der),‏ [pem](/certs/2024/r10.pem),‏ [txt](/certs/2024/r10.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r10.c.lencr.org`
* **Let's Encrypt R11**
  * נושא: `O = Let's Encrypt,‏ CN = R11`
  * סוג מפתח: `RSA 2048`
  * תקף עד: 2027-03-12
  * פרטי רשות אישורים: [crt.sh](https://crt.sh/?caid=295815),‏ [רשות אישורים](https://crt.sh/?Identity=%25&iCAID=295815)
  * פרטי אישור (נחתם על ידי ISRG Root X1): [crt.sh](https://crt.sh/?id=12396132897),‏ [der](/certs/2024/r11.der),‏ [pem](/certs/2024/r11.pem),‏ [txt](/certs/2024/r11.txt)
  * שם מארח לרשימת שלילת אישורים (CRL): `r11.c.lencr.org`
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

<p><!-- to get the right line spacing after a block element --></p>

# שרשראות

כאשר לקוח ACME מוריד אישור חדש שהונפק מה־ACME API של Let's Encrypt, האישור הזה הופך להיות חלק מה„שרשרת” שכוללת גם אישור תווך אחד או יותר. בדרך כלל השרשרת הזאת מורכבת מאישורי ישות הקצה ואישור ביניים אחד בלבד, אבל היא יכולה להכיל עוד אישורי ביניים. הרעיון הוא שעל ידי הצגת כל שרשרת האישורים האת לדפדפן המבקרים באתר, הדפדפן יוכל לאמת את החתימות כל הדרך עד לשורש שהדפדפן הזה סומך עליו מבלי להוריד אישורי ביניים נוספים.

לפעמים יש יותר משרשרת אחת תקפה לאישור מסוים: למשל, אם אישור תווך נחתם באופן צולב, אז כל אחד משני האישורים האלה יכול להיות הרשומה השנייה, „משתרשר עד” כל אחד משני המקורות השונים. במקרה כזה, מפעילי אתרים שונים יכולים לבחור בשרשראות שונות כתלות במאפיינים שהכי חשובים להם.

כל אחד מאישורי הביניים האלה מתעד איזו שרשרת מוצעת כברירת מחדל ואילו (אם בכלל) שרשראות נוספות עלולים לקוחות ACME לבקש. באופן כללי, שרשראות שמסתיימות ב־ISRG Root X1 הן הגדולות ביותר אבל גם הכי נתמכות בקרב לקוחות ישנים יותר. שרשראות שמסתיימות ב־ISRG Root X2 (מוצעות רק לאישורי ECDSA) הן קטנות יותר, אך תעבודנה רק עם לקוחות שאחסון האמון שלהן עודכנו לאחר 2022 פחות או יותר. שרשאות שמסתיימות ב־Root YE או ב־Root YR לא אמורות לעבוד עם מאגרי האמון העיקריים, כיוון שאישורי העל האלה עדיין לא הוטמעו.

מנויים שרוצים להשתמש באחת מהשרשראות החלופיות יכולים לפנות לתיעוד לקוח ה־ACME שלהם לקבלת הנחיות בנוגע לבקשת שרשרת חלופית (למשל, [הדגלון `‎--preferred-chain` של certbot](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
