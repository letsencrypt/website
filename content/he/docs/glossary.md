---
title: מונחון
slug: glossary
top_graphic: 1
date: 2018-12-30
show_lastmod: 1
---



<!--
Note for translators:
 
- Usage of the "def" macro (in other languages than English):
{% def 
    id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`" 
    name="The term to define (optional if english or abbr is provided)"
    abbr="an accronym (optional)"
    english="the english term (optional - if present the abbr is in english too)" %}}
        the definition
{% /def %}
    
- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" english="Authority Information Access" name="גישה למידע של הרשות" abbr="AIA" %}} [הרחבה](#def-extension) לאישור שייעודה לסמן ל[סוכני משתמש](#def-user-agent) איך לקבל מידע על מנפיק ה[אישור](#def-certificate). היא בדרך כלל מציינת את כתובת ה־[OCSP](#def-OCSP) ואת [כתובת המנפיק](#def-CAI). {{% /def %}}

{{% def id="ACME" english="Automatic Certificate Management Environment" name="סביבת ניהול אישורים אוטומטית" abbr="ACME" abbr_first="1" %}} הפרוטוקול שממומש על ידי [Let's Encrypt](#def-LE). תכניות שתואמות לפרוטוקול הזה יכולות להשתמש בו על מנת לתקשר עם Let's Encrypt ולבקש [אישור](#def-leaf). [ה־RFC של ACME](https://tools.ietf.org/html/rfc8555) - [ויקיפדיה](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" english="ACME Client" name="לקוח ACME" %}} תכנית שיכולה לתקשר עם שרת ACME כדי לבקש [אישור](#def-leaf). {{% /def %}}

{{% def id="ACME-server" english="ACME Server" name="שרת ACME" %}} שרת תואם ACME שיכול לייצר [אישורים](#def-leaf). התכנית שלLet's Encrypt,‏ [Boulder](#def-boulder), היא תואמת ACME [עם מספר שינויים קלים](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="בולדר" english="Boulder" %}} התכנית שמממשת את ACME, בפיתוח ובשימוש של [Let's Encrypt](#def-LE). [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="דרישות יסוד" abbr="BRs" english="Baseline Requirements" %}} סדרה של דרישות טכניות והגדרות מדינִיוּת עבור רשויות אישורים. מאחר שכל [התכניות העליונות](#def-root-program) ממזגות את ה־Baseline Requirements (דרישות היסוד), על רשויות האישורים לעקוב אחר הדרישות האלה כדי שרוב הדפדפנים יוכלו לתת בהן אמון. {{% /def %}}

{{% def id="CAA" english="Certificate Authority Authorization" abbr="CAA" abbr_first="1" name="הרשאת רשות אישורים" %}} רשומת DNS שמציינת אילו [רשויות אישורים](#def-CA) מורשות להנפיק אישורים לשם התחום התואם. רשומות CAA נבדקות על ידי רשויות אישורים, לא על ידי דפדפנים. ב־[Let's Encrypt](#def-LE) [מכבדים את רשומות ה־ CAA](/docs/caa) כפי שנדרש ב[דרישות היסוד](#def-BRs). - [ויקיפדיה](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" english="Canonical Name record" abbr="CNAME" name="רשומת שם קנוני" %}} רשומת DNS שממפה שם תחום אחד לאחר, נקראת שם קנוני. [ויקיפדיה](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" english="Certificate Authority" abbr="CA" name="רשות אישורים" %}} ארגון שמנפיק [אישורים](#def-leaf). [Let's Encrypt](#def-LE),‏ [IdenTrust](#def-IdenTrust),‏ Sectigo ו־DigiCert הן רשויות אישורים. [ויקיפדיה](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" english="CA Issuers" name="רשויות אישורים מנפיקות" %}} חלק מהשדה [AIA](#def-AIA) שמכיל מידע על מנפיק ה[אישור](#def-leaf). עשוי להיות שימושי כאשר [שרת האינטרנט](#def-web-server) לא סיפק [שרשרת אישורים](#def-chain) מהימנה. {{% /def %}}

{{% def id="certificate" english="Certificate" name="אישור" %}} קובץ ב[תבנית מסוימת](#def-X509) שמכיל מפתח ציבורי ונתונים אחרים שמתארים מתי להשתמש במפתח הציבורי הזה. סוג האישור הנפוץ ביותר הוא [אישור עלה](#def-leaf). ישנם גם אישורים [מתווכים](#def-intermediate) ו[עליונים](#def-root). {{% /def %}}

{{% def id="extension" english="Certificate extension" name="הרחבת אישור" %}} באישורים, רוב השדות מוגדרים כהרחבות. למשל, [Subject Alternative Names](#def-SAN) ו־[AIA](#def-AIA) הן הרחבות. מנגנון ההרחבה מאפשר ליצור שדות חדשים שלא היו חלק מתקן [X.509](#def-X509) המקורי. {{% /def %}}

{{% def id="CABF" english="CA/Browser Forum" name="פורום דפדפנים/רשויות אישורים" %}} קבוצה התנדבותית של רשויות אישורים, יצרני דפדפני אינטרנט, מערכות הפעלה ויישומים נוספים שתומכים ב־PKI. פורום דפדפנים/רשויות אישורים מפרסם את [דרישות היסוד](#def-BRs). ארגון [Let's Encrypt](#def-LE) חבר בפורום דפדפנים/רשויות אישורים. [ויקיפדיה](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" english="Certificate chain" name="שרשרת אישורים" %}} רשימה של [אישורי תווך](#def-intermediate) שמסייעים ל[סוכן משתמש](#def-user-agent) לקבוע שיוכל לתת אמון ביישות קצה או ב[אישור עלה](#def-leaf), על ידי חיבורו אל [אישור עליון](#def-root) ב[מאגר האישורים](#def-store) שלו. נא לשים לב: השרשרת אינה תמיד ייחודית וכאשר אתר מציג שרשרת אישורים שמובילה לאישור עליון אחד, סוכן המשתמש עשוי להחליט להשתמש בשרשרת אחרת כדי לתקף את האישור. [ויקיפדיה](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" english="Certificate Policy" abbr="CP" name="מדיניות אישורים" %}} סדרה שמית של כללים שמציינים את יישימותו של אישור לקהילה ו/או מחלקה של יישומים מסוימים עם דרישות אבטחה משותפות. פרטים נקודתיים על הנפקה מפורטים תחת [CPS](#def-CPS) (הכרזת מדיניות אישור). [מדיניות האישורים של ISRG](/repository#isrg-certificate-policy)‏ - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [ויקיפדיה](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" english="Certification Practice Statement" abbr="CPS" name="הצהרת אופן אישור" %}} הצהרה של דרכי הפעולה בהן נוקטת רשות אישורים לטובת הנפקה, ניהול, שלילה וחיפוש או החלפת מפתח לאישורים. [הצהרת אופן האישור של ISRG](/repository#isrg-certification-practice-statement)‏ - [RFC 3647 סעיף 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) - [ויקיפדיה](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" english="Critical extension" name="הרחבה קריטית" %}} אישור יכול להכיל [הרחבות](#def-extension) שמסומנות כ„קריטיות”. משמעות הדבר היא שתכניות חייבות לדחות את האישור הזה אלא אם כן התכניות מבינות איך לעבד את ההרחבה הזאת. מאפשר להציג הרחבות חדשות שחשובות לאבטחה מבלי ליצור סיכונים לתכניות ישנות. {{% /def %}}

{{% def id="CRL" english="Certificate Revocation List" abbr="CRL" name="רשימת אישורים שנשללו" %}} שיטה ליידע את [סוכני המשתמש](#def-user-agent) על מצב [שלילת](#def-revocation) [אישור](#def-leaf). זו רשימת המספרים הסידוריים של כל האישורים שנשללו על ידי רשות אישורים מסוימת ונחתמו קודם על ידיה. [ויקיפדיה](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" english="Certificate Signing Request" abbr="CSR" name="בקשת חתימה על אישור" %}} קובץ חתום שמכיל את המידע שדורשת [רשות האישורים](#def-CA) כדי לייצר אישור. המידע שדרוש ל־[Let's Encrypt](#def-LE) הוא ה־[Common Name](#def-CN) (שם נפוץ),‏ [Subject Alternative Names](#def-SAN) (שמות נושא חלופיים) ו־Subject Public Key Info (פרטי מפתח ציבורי של הנושא). בדרך כלל, [יישומי לקוחות](#def-ACME-client) מייצרים את בקשת החתימה על האישור אוטומטית עבור הלקוח, למרות שספקית אחסון או מכשיר כלשהו גם כן יכולים לייצר בקשה לחתימה על האישור. [ויקיפדיה](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" english="Certificate Store" name="מאגר אישורים" %}} מאגר אישורים מכיל רשימה של [אישורים עליונים](#def-root) מהימנים. מערכות הפעלה (כגון Windows,‏ Android או דביאן) ו[דפדפנים](#def-web-browser) (כגון Firefox) מחזיקים מאגר אישורים. למעט הדפדפן הזה שאר הדפדפנים מסתמכים על מאגר האישורים של מערכת ההפעלה. [אישורים](#def-leaf) שמסופקים על ידי [Let's Encrypt](#def-LE) נחשבים [מהימנים בעיני רוב מאגרי האישורים](/certificates). {{% /def %}}

{{% def id="subject" english="Certificate subject" name="נושא אישור" %}} השדה „Subject” (נושא) באישור מציין על מה האישור. הוא בדרך כלל מכיל שדות כגון [Common Name](#def-CN) (שם נפוץ), Country (מדינה), ו־Organization (ארגון). {{% /def %}}

{{% def id="CT" english="Certificate Transparency" abbr="CT" name="שקיפות אישורים" %}} כדי לשפר את האבטחה, יש לפרסם אישורים (או [קדם אישורים](#def-precertificate)) ליומני שקיפות אישורים: https://www.certificate-transparency.org/‎. מערכת [Let's Encrypt](#def-LE) מייצרת ומפרסמת [אישורי קדם](#def-precertificate) וכוללת ב[אישור](#def-leaf) העוקב רשימה של [SCTs](#def-SCT) (חותמות זמן של אישור חתום) עבור אישור הקדם. חלק מה[דפדפנים](#def-web-browser), כגון Chrome מבית Google, דורש את נוכחותה של הבטחה זו שניתן לאמת כדי לתקף את האישור. [ויקיפדיה](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" english="Certificate Transparency Log" name="יומני שקיפות אישורים" %}} רכיב בתוך [שקיפות אישורים](#def-CT) שמקבל הגשות של אישורים ו[אישורי קדם](#def-precertificate) ומאגד אותם לכדי רשימה קבועה, ניתנת לאימות ונגישה לציבור. {{% /def %}}

{{% def id="CN" english="Common Name" abbr="CN" name="שם נפוץ" %}} חלק מה[נושא](#def-subject) (Subject) של האישור שמסביר מה טיב האישור. עבור [אישורים עליונים](#def-root) ו[אישורי תווך](#def-intermediate) מדובר בשם של [רשות האישורים](#def-CA) שגם בני אדם יכולים להבין. עבור [אישורי עלה](#def-leaf) זה אחד משמות התחום שבאישור. נא לשים לב: השם הנפוץ מוגבל ל־63 תווים. זו שיטה מיושנת לציון שם התחום עליו חל האישור מאחר שהתקנים העדכניים באינטרנט מצפים מצד התכנה לבדוק רק את [Subject Alternative Names](#def-SAN) (שמות נושא חלופיים) כדי לקבוע את ישימות האישור. {{% /def %}}

{{% def id="cross-signing" english="Cross Signing" name="חתימה צולבת" %}} על אישור לחתימה ניתן לחתום עם יותר מ[אישור עליון](#def-root) אחד. למשל, [אישורי התווך](#def-intermediate) של [Let's Encrypt](#def-LE) חתומים באופן צולב גם על ידי [IdenTrust](#def-IdenTrust), כיוון שבזמן ההשקה האישור העליון של Let's Encrypt עדיין לא נחשב מהימן בעיני [מאגרי אישורים](#def-store). טכנית, ניתן לבצע זאת עם שני אישורי הנפקה, באמצעות אותו ה[נושא](#def-subject) (Subject) ואותו [צמד המפתחות](#def-key-pair) (Key-pair), האחד חתום על ידי המפתח הפרטי של האישור העליון של Let's Encrypt והשני חתום על ידי המפתח הפרטי של האישור העליון של IdenTrust: [אישורים](/certificates). [ויקיפדיה](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" english="DNS-based Authentication of Named Entities" abbr="DANE" name="הרשאה מבוססת DNS ליישויות שמיות" %}} מנגנון שמשתמש ב־DNS שמציין איך לוודא את האמינות של ה[אישור](#def-leaf) או של מפתח ההצפנה שהוצג.  [ויקיפדיה](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" english="Domain Name System Security Extensions" abbr="DNSSEC" name="הרחבות אבטחה למערכת שמות תחום" %}} מנגנון לאימות קריפטוגרפי של תגובות DNS. DNSSEC דורש הטמעה על ידי TLDs (סיומות אינטרנט), בעלי שמות תחום ופותרים רקורסיביים כדי שיחול. האימוץ כרגע הוא די נמוך. [ויקיפדיה](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" english="Domain-validated certificate" name="אישור תקף שם תחום" %}} [אישור](#def-leaf) בו המועמד הוכיח את שליטתו על שם התחום (ולא על זהות הארגון המבקש). [Let's Encrypt](#def-LE) מציעה רק אישורי DV (לא [OV](#def-OV) או [EV](#def-EV)): [שו״ת](/docs/faq) - [ויקיפדיה](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" english="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" name="אלגוריתם חתימה דיגיטלית מעל עקום אליפטי" %}} סוג של אלגוריתם חתימה דיגיטלית (Digital Signature Algorithm - DSA) שמשתמש בהצפנת עקום אליפטי.  [ויקיפדיה](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE) תומכת ב־ECDSA עבור [אישורי יישות קצה או עלה](#def-leaf), אך עדיין לא עבור כל ה[שרשרת](#def-chain): [תכונות-מתוכננות](/upcoming-features) {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} סוג מסוים של [EdDSA](#def-EdDSA), לצד Ed448. {{% /def %}}

{{% def id="EdDSA" english="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" name="אלגוריתם חתימה דיגיטלית על עקום אדוארדס" %}}  מערכת מודרנית לחתימה עם מפתח ציבורי על בסיס עקומים אליפטיים, תוכנן כדי לפתור מספר [תקלות מימוש](https://ed25519.cr.yp.to/) נפוצות עם הצפנה על עקום אליפטי. רשויות אישורים כגון [Let's Encrypt](#def-LE) עדיין לא יכולות לספק אישורי EdDSA. [ויקיפדיה](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" english="Elliptic Curve Cryptography" abbr="ECC" name="הצפנה מבוססת עקום אליפטי" %}} סוג של הצפנת מפתח ציבורי שמבוסס על עקומות אליפטיות. ECC (הצפנת עקום אליפטי) משתמשת במפתחות קטנים יותר ביחס להצפנה שאינה מבוססת עקום אליפטי תוך אספקת אבטחה ברמה דומה. [Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [ויקיפדיה](https://he.wikipedia.org/wiki/הצפנה_מבוססת_עקום_אליפטי) {{% /def %}}

{{% def id="EV" english="Extended Validation" abbr="EV" name="תיקוף מורחב" %}} סוג של תיקוף אישור שעבורו [רשות האישורים](#def-CA) אימתה את היישות המשפטית ששולטת באתר. הם מכילים מידע על היישות הזאת. הפקדים מ[רשות האישורים](#def-CA) הם יותר מחמירים עבור אישורי [OV](#def-OV)‏. [Let's Encrypt](#def-LE) אינה מציעה אישורי EV. [ויקיפדיה](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" english="Fully qualified domain name" abbr="FQDN" name="שם תחום מלא" %}} שם התחום המלא של אתר. למשל, `www.example.com` הוא *FQDN* (שם תחום מלא). {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} [רשות אישורים](#def-CA). הרשות IdenTrust [חתמה באופן צולב](#def-cross-signing) על [אישורי התווך](#def-intermediate) של [Let's Encrypt](#def-LE)‏: [‎/certificates](/certificates). [ויקיפדיה](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} אישור שנחתם על ידי אישור [עליון](#def-root) או אישור מתווך אחר ומסוגל לחתום על אישורים אחרים. הם משמשים לחתום על אישור עלה תוך שמירה על המפתח הפרטי של האישור העליון מחוץ לאינטרנט. אישורי תווך נכללים בתור [שרשרת האישורים](#def-chain). [ויקיפדיה](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" english="Internationalized Domain Names for Applications" abbr="IDNA" name="שמות תחום תואמי בינאום ליישומים" %}} להלן [שמות תחום תואמי בינאום](#def-IDN). {{% /def %}}

{{% def id="IDN" english="Internationalized Domain Name" abbr="IDN" name="שם תחום תואם בינאום" %}} שם תחום עם תווים מחוץ לטווח של `a` עד `z`, `0` עד `9` ומינוס (`-`). השמות יכולים להכיל תווים עבריים, ערביים, סיניים, טמילים, קיריליים או מבוססי לטיניים עם סימנים סובבי תו או ליגטורות. הייצוג המקודד של שמות תחום תואמי בינאום מתחיל ב־`xn--‎`. ב־[Let's Encrypt](#def-LE) קיימת תמיכה בשמות תחום תואמי בינאום: https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [ויקיפדיה](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890)‏ - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" english="Internet Security Research Group" abbr="ISRG" name="קבוצת מחקר אבטחת האינטרנט" %}} הארגון שמאחורי [Let's Encrypt](#def-LE):‏ [https://www.abetterinternet.org/about/‎](https://www.abetterinternet.org/about/). [ויקיפדיה](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" english="Certificate issuer" name="מנפיק האישור" %}} השדה „Issuer” (מנפיק) באישור שמתאר איזה אישור חתם עליו. למשל, שדה המנפיק (Issuer) באישור יישות קצה של Let's Encrypt עשוי להיות „Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3”. הוא בדרך כלל מכיל אישורים כגון [Common Name](#def-CN) (שם נפוץ), Country (מדינה) ו־Organization (ארגון). שדה המנפיק (Issuer) תמיד תואם לאיזשהו שדה [Subject](#def-subject) (נושא) באישור. לאישורים [חתומים עצמית](#def-self-signed) כגון [אישורים עליונים](#def-root), ה־Issuer תמיד זהה ל־Subject. המונח „מנפיק” יכול גם לציין אישורים שמנפיק אישורים אחרים (כגון [אישור תווך](#def-intermediate) או אישור עליון) או ארגון שמנפיק אישורים.{{% /def %}}

{{% def id="key-pair" english="Key-pair" name="צמד מפתחות" %}} שילוב של מפתח פרטי וציבורים שמשמשים יחד לחתימה או להצפנה. המפתח הציבורי בדרך כלל מוטמע בתוך אישור, בעוד המפתח הפרטי מאוחסן בנפרד ויש לשמור עליו בסוד. צמד מפתחות יכול לשמש להצפנה ולפענוח, כדי לחתום ולאמת נתונים או כדי לשאת ולתת על מפתחות משניים, בהתאם ליישום. [ויקיפדיה](https://he.wikipedia.org/wiki/מפתח_ציבורי) {{% /def %}}

{{% def id="leaf" english="Leaf certificate (end-entity certificate)" name="אישור עלה (אישור יישות קצה)" %}} הנפוץ ביותר, אישור שנחתם על ידי אישור [תווף](#def-intermediate), תקף לסדרה מסוימת של שמות תחום ואין אפשרות לחתום אתו על אישורים אחרים. זה סוג האישור שמבקשים [לקוחות ACME](#def-ACME-client) וגם זה שבו משתמשים [שרתי אינטרנט](#def-web-server). [ויקיפדיה](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [רשות האישורים](#def-CA) שמופעלת על ידי [ISRG](#def-ISRG). [ויקיפדיה](https://he.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" english="Mixed content" name="תוכן מעורב" %}} כאשר עמוד HTTPS טוען תת־משאבים (Javascript,‏ CSS או תמונות) על גבי HTTP. [דפדפנים](#def-web-browser) עשויים לחסום תוכן מעורב או לסמן את העמוד הזה כפחות מאובטח כאשר קיים תוכן מעורב: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. כדי לתקן בעיית תוכן מעורב, על גורם פיתוח האתר להחליף את העמודים שלהם כדי שכל המשאבים יהיו בכתובות HTTPS. [כלי מפתחים](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) שמובנים בתוך הדפדפנים עשויים לשמש כדי לאתר אילו משאבים גורמים לבעיית התוכן המעורב. {{% /def %}}

{{% def id="OCSP" english="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" name="פרוטוקול מצב אישורים מקוון" %}} שיטה לבדוק את מצב ה[שלילה](#def-revocation) של [אישור](#def-leaf). במילים אחרות, דרך לבדוק האם [רשות אישורים](#def-CA) מציינת שהאישור לא אמור להיחשב עוד כתקף, על אף שתאריך התפוגה שלו לא הגיע עדיין. הבקשה הזאת יכולה להוביל לבעיות פרטיות כיוון שהיא מרשה לרשות האישורים ולספקיות האינטרנט לצפות באופן ישיר מי מבקר ובאיזה אתרים. [ויקיפדיה](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" english="OCSP Must-Staple" name="חובת שידוך OCSP" %}} הרחבת [אישור](#def-leaf) שמודיעה ל[דפדפן](#def-web-browser) ש[שרת האינטרנט](#def-web-server) עם האישור הזה חייב להשתמש ב[שידוך OCSP](#def-OCSP-stapling). ההרחבה משמשת לדרוש שמצב [שלילה](#def-revocation) עדכני של ה[אישור](#def-leaf) יאומת על ידי שרת האינטרנט עם כל חיבור, מה שהופך את השלילה ליותר אמינה. ל־[Let's Encrypt](#def-LE) יש אפשרות להנפיק אישורים עם [הרחבת](#def-extension) חובת שידוך OCSP לפי בקשה. [בלוג האבטחה של Mozilla‏](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" english="OCSP stapling" name="שידוך פרוטוקול מצב אישורים מקוון" %}} דרך ל[שרת האינטרנט](#def-web-server) לשלוח ל[דפדפן](#def-web-browser) תגובת [OCSP](#def-OCSP) שחתומה על ידי [רשות אישורים](#def-CA), כדי שהדפדפן עצמו לא יצטרך לבצע בקשת OCSP (פרוטוקול מצב אישור מקוון) משנית אל רשות האישורים, מציג שיפור במהירות ובפרטיות. מוכר גם בתור הרחבת בקשת מצב אישור TLS. [ויקיפדיה](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" english="Object identifier" abbr="OID" name="מזהה עצם" %}} OIDs (מזהי עצמים) הם מזהים מספריים ייחודיים שתוקננו על ידי International Telecommunications Union ‏(ITU - איגוד הטלקומוניקציה הבינלאומי) וגם על ידי ISO/IEC (ארגון התקינה הבינלאומי/הנציבות הבין-לאומית לאלקטרוטכניקה). במזהי עצמים נעשה שימוש בתוך אישורים כדי להגדיר הרחבות, שדות או קביעות מדיניות. תקני אינטרנט ו[מדיניות אישורים](#def-CP) ומסמכי [הצהרת מדיניות אישורים](#def-CPS) מגדירים את אופן השימוש במזהי עצמים. [ויקיפדיה](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" english="Organization Validation" abbr="OV" name="תיקוף ארגון" %}} אישורים שעבורם [רשות אישורים](#def-CA) אימתה את היישות המשפטית של ה[מנוי](#def-subscriber). הם מכילים מידע על היישות הזאת. [Let's Encrypt](#def-LE) אינה מציעה אישורי OV. [ויקיפדיה](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" english="PEM file (.pem)" name="קובץ PEM ‏(‎.pem)" %}}  סוג קובץ למידע מוצפן (במקור צוין כחלק מתוך ערכת תקני האינטרנט Privacy Enhanced Mail - דוא״ל עם פרטיות מורחבת לאבטחה של דוא״ל). מסמך PEM יכול לייצג מידע כגון מפתח פרטי, מפתח ציבורי או אישור דיגיטלי. קבצים אלו נפתחים ב־„‎-\-\-\--BEGIN ‎” ואז סוג הנתונים. [ויקיפדיה](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" english="Personal Information Exchange Files (.pfx)" name="קובצי החלפת פרטים אישיים (‎.pfx)" %}} קובץ שמכיל [אישור עלה](#def-leaf), את ה[שרשרת](#def-chain) שלו עד האישור העליון ואת המפתח הפרטי של אישור העלה. ניתן גם לקרוא את https://en.wikipedia.org/wiki/PKCS_12. [מרכז פיתוח החומרה של Microsoft](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} אישורי קדם הם חלק מ[שקיפות אישורים](#def-CT). אישור קדם הוא עותק של ה[אישור](#def-leaf) שרשות האישורים מתכננת להנפיק, עם תוספת הרחבת רעל a [חמורה](#def-critical) כדי להגן מפני מצב בו האישור יתקבל על ידי תכנה כלשהי. רשות אישורים מגישה אישור קדם ל[יומני רשות אישורים](#def-CT-log) בתמורה ל־[SCTs](#def-SCT). מאחר שאישור קדם אינו זהה לאישור התואם שלך, יכול להיות שביומני שקיפות האישורים יופיעו שניהם. [RFC 6962 סעיף 3.1](https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" english="HTTP Public Key Pinning" abbr="HPKP" name="נעיצת מפתח ציבורי עם HTTP" %}} מנגנון אבטחה שמבקש מהדפדפן לדרוש ש[שרשרת אישורים](#def-chain) תשתמש במפתחות ציבוריים מסוימים בטעינות עתידיות. Chrome הציג את המנגנון הזה כדי להגן מפני חבלות מצד רשות האישורים אך זה גרם לתקלות גישה לאתרים, מה שהוביל את Chrome [לצמצם את השימוש בו ולהסיר אותו](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8). [ויקיפדיה](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" english="Public Suffix List" abbr="PSL" name="רשימת סיומות ציבורית" %}} רשימה של *סיומות ציבוריות* שמתוחזקת על ידי Mozilla ומציינת אילו שמות תחום באינטרנט זמינים לטובת יישויות שונות כדי לרשום תת־מתחמים. למשל, הרשימה מציינת שגם `com` וגם `co.uk` הן סיומות ציבוריות למרות ש־`co.uk` אינו שם תחום עליון. דפדפנים משתמשים ברשימה הזאת, לצד מקורות נוספים, כדי למנוע מאתרים שכפי הנראה מופעלים על ידי יישויות שונות לשתף ביניהם עוגיות. [Let's Encrypt](#def-LE) משתמשת ברשימה גם כדי לחשב מגבלת מיכסות: [מגבלת-מיכסות](/rate-limits). https://publicsuffix.org/‎ {{% /def %}}

{{% def id="relying-party" english="Relying Party" name="גוף נסמך" %}} הגוף שסומך על המידע שבאישור. למשל, מבקר באתר HTTPS הוא גוף נסמך. {{% /def %}}

{{% def id="revocation" english="Revocation" name="שלילה" %}} אישור תקף עד למועד תפוגת תוקפו, אלא אם כן [רשות האישורים](#def-CA) מכריזה שהוא נשלל. האישור עשוי להישלל ממגוון סיבות כגון פגיעה במפתח הפרטי. דפדפנים יכולים לבדוק אם אישור נשלל בעזרת [CRL](#def-CRL),‏ [OCSP](#def-OCSP) או שיטות חדשות יותר כגון [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) ו־[CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets). כדאי לשים לב שבמקרים רבים, [שלילה לא עובדת](https://www.imperialviolet.org/2011/03/18/revocation.html). [/docs/revoking](/docs/revoking) {{% /def %}}

{{% def id="root" english="Root certificate" name="אישור עליון" %}} אישור ש[נחתם עצמית](#def-self-signed) שנשלט על ידי [רשות אישורים](#def-CA), משמש לחתימה על אישורי ה[תווך](#def-intermediate) ונכלל ב[מאגרי המהימנים](#def-store). [ויקיפדיה](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" english="Root Program" name="תכנית עליונה" %}} מסמכי המדיניות בהן משתמש ארגון כדי להחליט אילו אישורים לכלול ב[מאגר המהימנות](#def-store) ולפיכך להחליט אילו רשויות אישורים נחשבות מהימנות על ידי התכנה שלהם. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} אלגוריתם מפתח ציבורי שמשמש להצפנה ולחתימה דיגיטלית של אישורים. [ויקיפדיה](https://he.wikipedia.org/wiki/RSA) {{% /def %}}

{{% def id="self-signed" english="Self-signed certificate" name="אישור בחתימה עצמית" %}} אישור שנחתם באמצעות המפתח הפרטי שלו עצמו כאשר ה־[Subject](#def-subject) (נושא) שווה ל־[Issuer](#def-issuer) (מנפיק). אישורים בחתימה עצמית מהימנים רק בעקבות סידורים מוקדמים שבוצעו בעולם הפיזי כגון הוספה ל[רשימת האישורים העליונים המהימנים](#def-store). [אישורים עליונים](#def-root) חתומים עצמית. [ויקיפדיה](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" english="Server Name Indication" abbr="SNI" name="ציון שם שרת" %}} שדה ששולח [סוכן משתמש](#def-user-agent) ל[שרת](#def-web-server) במהלך [לחיצת יד TLS](#def-TLS) ומציין את שם התחום להתחבר אליו. מנגנון זה מאפשר לשרת לענות עם ה[אישור](#def-leaf) הנכון כאשר מספר שמות תחום מתארחים מאחורי אותה כתובת IP. שרת האינטרנט עשוי לשלוח אישור אחר ולהציג תוכן אחר בהתאם לשרת שביקש הלקוח דרך SNI (ציון שם שרת). השדה SNI אינו מוצפן אבל חלופה ניסיונית בשם ESNI כן. [ויקיפדיה](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" english="Signed Certificate Timestamp" abbr="SCT" name="חותמות זמן לאישורים חתומים" %}} הבטחה חתומה וניתנת לאימות לפרסם אישור מתוך [יומן שקיפות אישורים](#def-CT-log). דפדפנים שאוכפים בדיקת [שקיפות אישורים](#def-CT) בודקים נוכחות של חותמות זמן לאישורים חתומים, או בלחיצת היד [TLS](#def-TLS) (אבטחה ברמת התעבורה) ומסרבים להתחבר לאתרים שלא עומדים בדרישות התיעוד שלהם ביומן. בדיקה זו מעלה את הסיכוי לזיהוי אישורים שנועדו לצורכי הונאה או שאינם מדויקים. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" english="Secure Sockets Layer" abbr="SSL" abbr_first="1" name="שכבת שקעים מאובטחת" %}} השם הקודם של [TLS](#def-TLS), עדיין נפוץ להשתמש בו. {{% /def %}}

{{% def id="staging" english="Staging" name="הכנה להקמה" %}} מערכת [Let's Encrypt](#def-LE) מספקת API במסגרת הכנה להקמה כדי לבדוק בקשות אישורים מבלי להשפיע על מגבלת המיכסות. אישורים שנוצרו על ידי סביבת ההכנה להקמה *אינם* מהימנים בקרב הציבור. סביבת ההכנה להקמה מיועדת לטובת בדיקות, ניפוי שגיאות ופיתוח לקוח ACME. [/docs/staging-environment](/docs/staging-environment) {{% /def %}}

{{% def id="SAN" english="Subject Alternative Name" abbr="SAN" name="שם חלופי לנושא" %}} שדה ב[אישור](#def-leaf) שמציין על איזה שם תחום או על אילו שמות תחום האישור תקף. מחליף את השימוש ב־[Common Name](#def-CN) (שם נפוץ), שמסופק כעת מטעמי תאימות בלבד. אישור בודד יכול להכיל מספר SANs ולהיות תקף למספר שמות תחום שונים. [ויקיפדיה](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" english="Subscriber" name="מנוי" %}} האדם או הארגון שמבקשים אישור. {{% /def %}}

{{% def id="TLD" english="Top-Level Domain" abbr="TLD" name="שמות תחום עליונים" %}} הרמה הגבוהה ביותר במערכת שמות התחום, כגון שמות תחום עליונים לפי קוד מדינה (ccTLDs) כגון `‎.il` (ישראל), `‎.cn` (סין) ושמות תחום עליונים כלליים (gTLDs) כגון `‎.com`,‏ `‎.org`. [ויקיפדיה](https://he.wikipedia.org/wiki/סיומת_אינטרנט) {{% /def %}}

{{% def id="TLS" english="Transport-Level Security" abbr="TLS" abbr_first="1" name="אבטחה ברמת התעבורה" %}} הפרוטוקול בו משתמש HTTPS כדי להצפין ולאמת ביקורים בדפי אינטרנט. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} החלק ב־[DANE](#def-DANE) (הרשאה מבוססת DNS ליישויות שמיות) שקשור נקודתית לתיקוף חיבורי [TLS](#def-TLS). {{% /def %}}

{{% def id="UCC" english="Unified Communications Certificate" abbr="UCC" name="אישור דרכי תקשורת מאוגדות" %}} תיאור של אישור שמכיל מספר [Subject Alternative Names - שמות נושא חלופיים (SANs)](#def-SAN). {{% /def %}}

{{% def id="web-browser" english="Web Browser" name="דפדפן אינטרנט" %}} [סוכן משתמש](#def-user-agent) שמשמש להצגת עמודי תוכן מהאינטרנט. דוגמאות: *Firefox מבית Mozilla*,‏ *Chrome מבית Google* או *Internet Explorer*. [ויקיפדיה](https://he.wikipedia.org/wiki/דפדפן) {{% /def %}}

{{% def id="user-agent" english="User Agent" name="סוכן משתמש" %}} תכנית שמסוגלת לתקשר עם [שרת אינטרנט](#def-web-server). לדוגמה: [דפדפן אינטרנט](#def-web-browser) או [cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" english="Web server" name="שרת אינטרנט" %}} תכנית שמגישה עמודי אינטרנט (או, בהתאם לסיומת, את החומרה של השרת שמעארח אותה). [ויקיפדיה](https://he.wikipedia.org/wiki/שרת_HTTP) {{% /def %}}

{{% def id="wildcard" english="Wildcard Certificate" name="אישור כוללני" %}} אישור שתקפים לתת־שמות תחומים עד עומק של רמה אחת למטה. למשל, אישור שמכיל [SAN](#def-SAN) ל־`*.example.com` תקף על `blog.example.com` ועל `www.example.com` אך **לא** על `bork.bork.example.com` או על `example.com`). אישור כוללני נבדל בכך שמופיעה בו כוכבית (*) בהתחלה במקום תת־שם תחום. [Let's Encrypt](#def-LE) [מספקת אישורים כוללניים החל ממרץ 2018](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [ויקיפדיה](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} התקן שמגדיר את תצורת אישורי המפתח הציבורי. [ויקיפדיה](https://he.wikipedia.org/wiki/X.509) {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css" />
<script src="/js/glossary.js" async></script>

