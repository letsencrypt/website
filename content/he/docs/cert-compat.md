---
title: תאימות אישורים
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


הגורם מכריע ביכולת של פלטפורמה לתקף את האישורים של Let's Encrypt היא האם הפלטפורמה נותנת אמון באישורי „ISRG Root X1” או „ISRG Root X2”. שני אישורי העל האלה נכללים במאגרי האמון של הפלטפורמות מזה מספר שנים (ISRG Root X1 מאז סוף 2016, ISRG Root X2 משלהי 2022), אך עשוי לקחת זמן רב להתקנות רחבות טווח לעדכוני פלטפורמות. כיום, האמון ב־ISRG Root X1 נמצא כמעט בכל מקום, בעוד האמון ב־ISRG Root X2 עדיין מתפשט.

אם האישור שלך עובר תיקוף על כמה מהפלטפורמות תחת הרשימה „ידועים כנתמכים” אך לא עובר באחרות, יכול להיות שמדובר בהגדרות שגויות מצד השרת. אם נתקלת בתקלה עם פלטפורמות מודרניות, אחד הגורמים הנפוצים ביותר היא כשל באספקת שרשרת האישורים הנכונה. ניתן לבדוק את האתר שלך עם [שרת הבדיקה של SSL Labs](https://www.ssllabs.com/ssltest/). אם המערכת לא הצליחה לזהות את התקלה שלך, ניתן לבקש עזרה ב[פורומים הקהילתיים](https://community.letsencrypt.org/) שלנו.

אם הפלטפורמה שלך לא מופיעה כאן, נודה לקבל ממך [בקשות דחיפה](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) שכוללות תיעוד מתי כל אישור על נוסף למאגר האמון של הפלטפורמה הזאת.

# פלטפורמות שנותנות אמון ב־ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (אלא אם כן [עדכון אישורי בסיס אוטומטיים](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) הושבתו)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* אובונטו >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (מעודכן לגמרי)
* דביאן >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (מעודכן לגמרי)
* RHEL ‏>= 6.10, 7.4 ([מעודכן לחלוטין](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (גרסאות ותיקות יותר משתמש באחסון האמון של מערכת ההפעלה)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# פלטפורמות שנותנות אמון ב־ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (אל אם כן [עדכוני אישורי בסיס אוטומטיים](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) הושבתו)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* אובונטו >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (מעודכן לגמרי)
* דביאן >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL‏ >= 7.9, 8.6, 9.1 ([מעודכן לחלוטין](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (גרסאות ותיקות יותר משתמש באחסון האמון של מערכת ההפעלה)

נוסף על כך, כל הפלטפורמות שנותנות אמון ב־ISRG Root X1 נותנות גם אמון ב[גרסה של ISRG Root X2 שנחתמה באופן צולב](/certificates#root-cas).
