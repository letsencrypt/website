---
title: Ланцюг довіри
linkTitle: Ланцюг довіри (кореневий і проміжний сертифікати)
slug: certificates
top_graphic: 5
lastmod: 2021-09-24
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Кореневий сертифікат

Наше коріння зберігається в безпеці поза мережею. Ми видамо сертифікати кінцевої сутності підпісникам проміжного рівня у наступному розділі. Для додаткової сумісності, так як ми подаємо наш новий Root X2 у різноманітних кореневих програмах, ми схрестили його з Root X1.

* Активний
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Підписаний особисто](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [схрещений з DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Активна, обмежена доступність(перспективність)
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Самопідписаний](https://crt.sh/?id=3335562555)[](/certs/isrg-root-x2.der)[pem](/certs/isrg-root-x2.pem)[](/certs/isrg-root-x2.txt)
    * [Перехресний підпис ISRGRoot X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Ми створили веб -сайти для тестування сертифікатів, приєднаних до наших активних коренів.

* ISRG корінь X1
  * [Доступний](https://valid-isrgrootx1.letsencrypt.org/)
  * [Скасований](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Прострочений, в якого закінчився термін дії](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG коріньX2
  * [Доступний](https://valid-isrgrootx2.letsencrypt.org/)
  * [Скасований](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Прострочений](https://expired-isrgrootx2.letsencrypt.org/)

# Проміжні сертифікати

За звичайних обставин, сертифікати, видані Let's Encrypt, надходитимуть від "R3", проміжного продукту RSA. Наразі видача з "E1", посередника ECDSA, можлива лише для відповідей[дозволених акаунтів](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) В майбутньому видача від "E1" буде доступна для кожного.

Інші наші проміжні продукти ("R4" та "E2") зарезервовані для ліквідації наслідків катастрофи і будуть використовуватися лише в разі втрати можливості спілкування з нашими первинними проміжними продуктами. Ми не використовуємо X1, X2, X3 та X4 більше проміжних продуктів.

IdenTrust підписав наші проміжні продукти RSA для додаткової сумісності.

* Активність
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [підписаний  ISRG коренем X1 ](https://crt.sh/?id=3334561879)[](/certs/lets-encrypt-r3.der)[](/certs/lets-encrypt-r3.pem)[](/certs/lets-encrypt-r3.txt)
    * [Перехресно підписаний IdenTrust](https://crt.sh/?id=3479778542)[](/certs/lets-encrypt-r3-cross-signed.der)
[](/certs/lets-encrypt-r3-cross-signed.txt) На пенсії
      
      * Активна, обмежена доступність 
    * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`) 
        * [підписаний ISRG коренем Х2](https://crt.sh/?id=3334671964)[der](/certs/lets-encrypt-e1.der)[pem](/certs/lets-encrypt-e1.pem)[txt](/certs/lets-encrypt-e1.txt)
* Резервне копіювання 
    * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`) 
        * [підписаний ISRG корінь Х1](https://crt.sh/?id=3334561877)[der](/certs/lets-encrypt-r4.der)[pem](/certs/lets-encrypt-r4.pem)[txt](/certs/lets-encrypt-r4.txt)
      
          * [Перехресно підписаний IdenTrust](https://crt.sh/?id=3479778543)[der](/certs/lets-encrypt-r4-cross-signed.der)[pem](/certs/lets-encrypt-r4-cross-signed.pem)[txt](/certs/lets-encrypt-r4-cross-signed.txt) (На пенсії)

  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`) 
        * [підписаний ISRG коренем Х2](https://crt.sh/?id=3334671963)[der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)

* На пенсії 
    * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`) 
        * [підписаний ISRG коренем X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Перехресно підписаний IdenTrust](https://crt.sh/?id=10235198)[der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`) 
        * [підписаний ISRG коренем X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [перехресно підписаний IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`) 
        * [підписаний ISRG коренемX1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [перехресно підписаний IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`) 
        * [підписаний ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [перехресно підписаний IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)



# Перехресне підписання



## Проміжні речі

Кожен з наших середніх (проміжних) продуктів представляє єдину публічну/приватну пару відповідей. Приватна відповідь цієї пари генерує підпис для всіх кінцевих сертифікатів (також відомих як листові (паперові) сертифікати), тобто сертифікати, які ми видаємо для використання на вашому сервері.

Наші RSA проміжні речі підписані ISRG Root X1. ISRG Root X1 є досить довіряючий як правило, але наші проміжні продукти RSA все ще схрещені компанією IdenTrust[DST Root CA X3](https://crt.sh/?id=8395)"(зараз називається "TrustID X3 Root") для додаткової сумісності клієнтів. IdenTrust root існує довше і тому має кращу сумісність зі старими пристроями та операційними системами (e.g. Windows XP, Android 7). Ти можеш[завантажити "TrustID X3 Root" з IdenTrust](https://www.identrust.com/support/downloads) (or, замість цього, ти можеш [ завантажити копію від нас](/certs/trustid-x3-root.pem.txt)).

Маючи значення перехресних підписів, що кожен з наших RSA проміжних продуктів має два сертифікати, що представляють одну і ту ж розгадку підпису. Один підписаний DST Root ЦС X3, а інший підписаний ISRG Root X1. Найлегший спосіб розрізнити два це дивитися на поле видавця.

При налаштуванні веб -сервера оператор сервера налаштовує не тільки сертифікат кінцевої сутності, а також список проміжних продуктів, які допоможуть браузерам перевірити, що сертифікат кінцевої сутності має ланцюжок довіри, що веде до надійності сертифікату. Майже всі оператори серверів вирішать обслуговувати ланцюг, у тому числі проміжний сертифікат з предметом "R3" і видавцем "ISRG Root X1". Рекомендація клієнта програмного забезпечення Let's Encrypt [бот комп'ютерної допомоги](https://certbot.org)зробить конфігурацію без проблем.



## Корені

Подібно до проміжних продуктів, сертифікати можуть бути перехресними, часто для збільшення сумісності клієнта. Наш корінь ECDSA, ISRG Root X2 був створений восени 2020 року і є коренем сертифікату для ієрархії ECDSA. Він представлений двома сертифікатами: одним, який є самопідписаним і той, який підписаний ISRG Root X1.

Усі сертифікати, підписані проміжним ECDSA "E1", будуть поставлені з ланцюжком, включаючи проміжний сертифікат, предметом якого є "ISRG Root X2", а емітентом - "ISRG Root X1". Майже всі оператори серверів вирішать обслуговувати цей ланцюжок, оскільки він пропонує найбільшу сумісність до ISRG Root X2, який користується широкою довірою.



# OCSP Підписання Сертифікатів

Цей сертифікат використовується для підпису відповідей OCSP для Центру Let's Encrypt проміжних продуктів, тому нам не потрібно виводити початкову відповідь з метою записати ці відповіді. Копія цього сертифіката автоматично включає відповіді OCSP, тому підписникам не потрібно нічого з цим робити. Це подається тут лише з метою інормації.

* ISRG Root OCSP X1 ([підписаний ISRG Root X1](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

Наші новіші проміжні не мають OCSP URLs (інформація про їх відкликання надається через CRL), тому ми не видавали сертифікат підписання OCSP від ​​ISRG Root X2.



# Прозорість сертифіката

Ми прагнемо до прозорості у своїй діяльності та в виданих нами сертифікатах. Ми подаємо всі сертифікати до[ Журнали прозорості сертифікатів](https://www.certificate-transparency.org/)коли ми їх видаємо. Ти можеш переглянути всі видані Let's Encrypt сертифікати за допомогою цих посилань:

* [Видано Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Видано Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Видано E1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Видано R3](https://crt.sh/?Identity=%25&iCAID=183267)
