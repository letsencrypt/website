---
title: "אישורי Let's Encrypt באירוח של GoDaddy"
slug: godaddy
lastmod: 2025-08-11
show_lastmod: 1
---

אנו מקבלים שאלות רבות בנוגע לשימוש ב־Let’s Encrypt עם GoDaddy. ב־GoDaddy אין תמיכה ב[פרוטוקול ACME](https://tools.ietf.org/html/rfc8555) להנפקה וחידוש אישורים אוטומטית. במקום, מציעים ב־GoDaddy חידוש אוטומטי עם אישורים משלהם, שהם [בתוספת תשלום](https://www.godaddy.com/web-security/ssl-certificate).

כרגע אנחנו לא ממליצים להשתמש באישורים שלנו עם GoDaddy כיוון שזה מסובך ואי אפשר ליצור אוטומציה של התהליך. אנו חושבים שחידושים אוטומטיים חשובים לניהול אישורים. השימוש ברכיב תוכנה כדי לחדש אוטומטית מוריד את הסבירות שתוקף האישור שלך יפוג מבלי שיוחלף.

אם עדיין מעניין אותך לנסות להשתמש באישורי Let’s Encrypt עם אירוח משותף של GoDaddy, אפשר לבחון את האפשרויות הבאות:

1. להשתמש ב־[CertSage](https://certsage.com/) מבית Griffin Software. משתמשי Let's Encrypt אחרים ב־GoDaddy הצליחו בעזרתו.
2. GoDaddy [מספקים הנחיות](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). איננו יכולים להתחייב על הדיוק או הנכונות שלהם. כדאי לשים לב שמעקב אחר ההוראות האלה גוזל זמן רב וזאת פעולה שאמורה להתבצע באופן מחזורי, לפני פקיעת תוקף של כל אחד מהאישורים.
