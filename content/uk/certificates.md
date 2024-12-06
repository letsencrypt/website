---
title: Ланцюги довіри
linkTitle: Ланцюги довіри (кореневі та проміжні сертифікати)
slug: certificates
lastmod: 2024-06-11
show_lastmod: 1
---

Ця сторінка описує всі поточні та відповідні історичні органи сертифікації, якими керує Let's Encrypt. Зверніть увагу, що CA найбільш правильно розглядається як ключ і ім'я: будь-який даний CA може бути представлений _ декількома сертифікатами_, які всі містять той же суб'єкт і інформацію про відкритий ключ. У таких випадках ми надали інформацію про всі сертифікати, які представляють Центр Сертифікації.

[![Діаграма ієрархії сертифікатів ISRG станом на червень 2024 року](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Кореневі ЦС

Наш основний матеріал зберігається безпечно в автономному режимі. Ми видаємо сертифікати кінцевих осіб абонентам з проміжних груп, описаних у наступному розділі. Усі суб'єкти кореневих сертифікатів мають поле Країна `C = US`.

Зверніть увагу, що кореневі центри сертифікації не мають терміну дії, як інші сертифікати. Хоча їхні само підписані сертифікати містять дату `notAfter`, кореневі програми та сховища довіри можуть вирішити довіряти кореневому ЦС після цієї дати або припинити довіру до нього до цієї дати. Таким чином, дати закінчення терміну дії, наведені нижче, є приблизними та ґрунтуються на поточних правилах програми Root.

* **ISRG корінь X1**
  * Тема: `O = Internet Security Research Group, CN = ISRG Root X1`
  * Тип ключа: `RSA 4096`
  * Термін дії: до 2030-06-04 (створено 2015-06-04)
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=7394), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=7394)
  * Реквізити сертифіката (само підпис): [crt.sh](https://crt.sh/?id=9314791), [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
  * Реквізити сертифікатів (підписані перехресним підписом DST Root CA X3): [crt.sh](https://crt.sh/?id=3958242236), [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt) (відкликаний)
  * Тестові сайти: [дійсний](https://valid-isrgrootx1.letsencrypt.org/), [відкликаний](https://revoked-isrgrootx1.letsencrypt.org/), [закінчився](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG коріньX2**
  * Тема: `O = Internet Security Research Group, CN = ISRG Root X2`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2035-09-04 (створено 2020-09-04)
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=183269), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=183269)
  * Реквізити сертифіката (само підпис): [crt.sh](https://crt.sh/?id=3335562555), [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
  * Реквізити сертифіката (з перехресним підписом ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561878), [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)
  * Тестові сайти: [дійсний](https://valid-isrgrootx2.letsencrypt.org/), [відкликаний](https://revoked-isrgrootx2.letsencrypt.org/), [закінчився](https://expired-isrgrootx2.letsencrypt.org/)

Додаткову інформацію про сумісність наших кореневих сертифікатів з різними пристроями та сховищами довіри можна знайти в статті [Сумісність сертифікатів](/docs/cert-compat).

# Підпорядковані (проміжні) ЦС

Наразі ми підтримуємо чотири проміжні продукти в активній ротації. Сертифікати підписувача, що містять відкритий ключ ECDSA, будуть випущені з одного з проміжних продуктів ECDSA; аналогічно, сертифікати підписувача, що містять відкритий ключ RSA, будуть випущені з одного з проміжних продуктів RSA.

Усі суб'єкти проміжних сертифікатів мають поле Країна `C = US`.

* **Let's Encrypt E5**
  * Тема: `O = Let's Encrypt, CN = E5`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295810), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295810)
  * Реквізити сертифікату (підписані ISRG Root X2): [der](/certs/2024/e5.der), [pem](/certs/2024/e5.pem), [txt](/certs/2024/e5.txt)
  * Реквізити сертифіката (перехресний підпис ISRG Root X1): [der](/certs/2024/e5-cross.der), [pem](/certs/2024/e5-cross.pem), [txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * Тема: `O = Let's Encrypt, CN = E6`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295819), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295819)
  * Реквізити сертифікату (підписані ISRG Root X2): [der](/certs/2024/e6.der), [pem](/certs/2024/e6.pem), [txt](/certs/2024/e6.txt)
  * Реквізити сертифіката (перехресний підпис ISRG Root X1): [der](/certs/2024/e6-cross.der), [pem](/certs/2024/e6-cross.pem), [txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * Тема: `O = Let's Encrypt, CN = R10`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295814), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295814)
  * Реквізити сертифікату (підписані ISRG Root X1): [der](/certs/2024/r10.der), [pem](/certs/2024/r10.pem), [txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * Тема: `O = Let's Encrypt, CN = R11`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295815), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295815)
  * Реквізити сертифікату (підписані ISRG Root X1): [der](/certs/2024/r11.der), [pem](/certs/2024/r11.pem), [txt](/certs/2024/r11.txt)

Натисніть нижче, щоб дізнатися більше про додаткові проміжні продукти, які не є частиною активної ієрархії випусків:

<details>
<summary>Резервне копіювання</summary>

Ці проміжні центри сертифікації мають чинні сертифікати, але не видають їх. Ми можемо почати видачу сертифікатів передплатників з них у будь-який час без попередження.

* **Let's Encrypt E7**
  * Тема: `O = Let's Encrypt, CN = E7`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295813), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295813)
  * Реквізити сертифікату (підписані ISRG Root X2): [der](/certs/2024/e7.der), [pem](/certs/2024/e7.pem), [txt](/certs/2024/e7.txt)
  * Реквізити сертифіката (перехресний підпис ISRG Root X1): [der](/certs/2024/e7-cross.der), [pem](/certs/2024/e7-cross.pem), [txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * Тема: `O = Let's Encrypt, CN = E8`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295809), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295809)
  * Реквізити сертифікату (підписані ISRG Root X2): [der](/certs/2024/e8.der), [pem](/certs/2024/e8.pem), [txt](/certs/2024/e8.txt)
  * Реквізити сертифіката (перехресний підпис ISRG Root X1): [der](/certs/2024/e8-cross.der), [pem](/certs/2024/e8-cross.pem), [txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * Тема: `O = Let's Encrypt, CN = E9`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295812), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295812)
  * Реквізити сертифікату (підписані ISRG Root X2): [der](/certs/2024/e9.der), [pem](/certs/2024/e9.pem), [txt](/certs/2024/e9.txt)
  * Реквізити сертифіката (перехресний підпис ISRG Root X1): [der](/certs/2024/e9-cross.der), [pem](/certs/2024/e9-cross.pem), [txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * Тема: `O = Let's Encrypt, CN = R12`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295816), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295816)
  * Реквізити сертифікату (підписані ISRG Root X1): [der](/certs/2024/r12.der), [pem](/certs/2024/r12.pem), [txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * Тема: `O = Let's Encrypt, CN = R13`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2027-03-12
  * Деталі ЦС: [crt.sh](https://crt.sh/?caid=295817), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295817)
  * Реквізити сертифікату (підписані ISRG Root X1): [der](/certs/2024/r13.der), [pem](/certs/2024/r13.pem), [txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * Тема: `O = Let's Encrypt, CN = R14`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2027-03-12
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=295818), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=295818)
  * Реквізити сертифікату (підписані ISRG Root X1): [der](/certs/2024/r14.der), [pem](/certs/2024/r14.pem), [txt](/certs/2024/r14.txt)

</details>

<details>
<summary>На пенсії</summary>

Ці проміжні центри сертифікації більше не використовуються для випуску підписних сертифікатів. Ті, хто все ще має дійсні сертифікати, можуть створювати відповіді OCSP та/або CRL.

* **Let's Encrypt E1**
  * Тема: `O = Let's Encrypt, CN = E1`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2025-09-15
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=183283), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=183283)
  * Реквізити сертифіката (підписані ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671964), [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * Тема: `O = Let's Encrypt, CN = E2`
  * Тип ключа: `ECDSA P-384`
  * Термін дії: до 2025-09-15
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=183284), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=183284)
  * Реквізити сертифіката (підписані ISRG Root X2): [crt.sh](https://crt.sh/?id=3334671963), [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * Тема: `O = Let's Encrypt, CN = R3`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2025-09-15
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=183267), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=183267)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561879), [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=3479778542), [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * Тема: `O = Let's Encrypt, CN = R4`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2025-09-15
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=183268), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=183268)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=3334561877), [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=3479778543), [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt)
* **Let's Encrypt Authority X1**
  * Тема: `O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * Тип ключа: `RSA 2048`
  * Термін дії: закінчився 2020-06-04
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=7395), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=7395)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=9314792), [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=10235198), [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * Тема: `O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * Тип ключа: `RSA 2048`
  * Термін дії: закінчився 2020-06-04
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=9745), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=9745)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=12721505), [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=10970235), [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * Тема: `O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * Тип ключа: `RSA 2048`
  * Термін дії: закінчився 2021-10-06
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=16418), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=16418)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=47997543), [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=15706126), [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * Тема: `O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * Тип ключа: `RSA 2048`
  * Термін дії: закінчився 2021-10-06
  * Дані центру сертифікації: [crt.sh](https://crt.sh/?caid=16429), [видані сертифікати](https://crt.sh/?Identity=%25&iCAID=16429)
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=47997546), [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
  * Реквізити сертифікатів (підписані IdenTrust): [crt.sh](https://crt.sh/?id=15710291), [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>Делегований респондент OCSP</summary>

Ця пара ключів раніше використовувалася для підписання відповідей OCSP щодо статусу проміжних продуктів Let's Encrypt від імені кореня Let's Encrypt, щоб корінь міг безпечно залишатися в автономному режимі. Ми більше не видаємо відповіді OCSP для наших проміжних продуктів; натомість ми періодично видаємо CRL від нашого кореня, щоб повідомити про статус відкликання наших проміжних продуктів.

* **ISRG Root OCSP X1**
  * Тема: `O = Internet Security Research Group, CN = ISRG Root OCSP X1`
  * Тип ключа: `RSA 2048`
  * Термін дії: до 2025-06-10
  * Реквізити сертифіката (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=2929281974), [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)
  * Реквізити сертифікату (підписані ISRG Root X1): [crt.sh](https://crt.sh/?id=142051103) (термін дії закінчився)

</details>
<p><!-- to get the right line spacing after a block element --></p>

# Ланцюги

Коли ACME-клієнт завантажує щойно випущений сертифікат з ACME API Let's Encrypt, цей сертифікат є частиною "ланцюжка", який також містить в собі один або декілька проміжних сертифікатів. Зазвичай цей ланцюжок складається лише із сертифіката кінцевого суб'єкта та одного проміжного, але він може містити додаткові проміжні. Ідея полягає в тому, що, представивши весь цей ланцюжок сертифікатів браузеру відвідувача вебсайту, браузер зможе перевірити підписи аж до кореня, якому браузер довіряє, без необхідності завантажувати будь-які додаткові проміжні файли.

Іноді існує більше одного дійсного ланцюжка для даного сертифіката: наприклад, якщо проміжний продукт був підписаний перехресним підписом, то будь-який з цих двох сертифікатів може бути другим записом, "ланцюжком", що веде до одного з двох різних коренів. У цьому випадку, різні оператори вебсайтів можуть обирати різні ланцюжки залежно від властивостей, які є для них найбільш важливими.

Сертифікати абонентів з відкритими ключами RSA випускаються з наших проміжних RSA-сертифікатів, які випускаються тільки з нашого кореневого RSA-сервера ISRG Root X1 (тобто вони не мають перехресного підпису). Тому для всіх сертифікатів абонентів RSA доступний лише один ланцюжок:

<div style="text-align: center">
RSA Subscriber Cert ← RSA Intermediate (R10 або R11) ← ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

Сертифікати підписників з відкритими ключами ECDSA випускаються з наших проміжних ECDSA, які випускаються одночасно (тобто мають перехресний підпис) з нашого RSA кореневого ISRG Root X1 та нашого ECDSA кореневого ISRG Root X2. Тому ми пропонуємо два ланцюжки для цих сертифікатів:

<div style="text-align: center">
ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X1

ECDSA Subcriber Cert ← ECDSA Intermediate (E5 or E6) ← ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

Перший ланцюжок, аж до ISRG Root X1, забезпечує найбільшу сумісність, оскільки цей кореневий сертифікат входить до більшості сховищ довіри. Другий ланцюжок, аж до ISRG Root X2, споживає менше байтів пропускної здатності мережі при кожному рукостисканні TLS. Ми надаємо перший ланцюжок за замовчуванням, щоб забезпечити найширшу сумісність. Підписники, які бажають надати перевагу розміру над сумісністю, можуть звернутися до документації свого ACME-клієнта для отримання інструкцій щодо запиту альтернативного ланцюжка (наприклад, [certbot's `--preferred-chain` flag](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)).
