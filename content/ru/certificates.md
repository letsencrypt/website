---
title: Цепочка доверия
slug: certificates
top_graphic: 5
aliases: [/certs]
---

# Корневые сертификаты

Наши корневые сертификаты хранятся в надёжном месте и недоступны онлайн. Мы выпускаем сертификаты для пользователей на основе промежуточных сертификатов из следующего раздела.

* Active
  * [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

Мы создали сайты для проверки цепочек сертификатов вплоть до корневых.

* ISRG Root X1 Valid Certificate
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Revoked Certificate
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 Expired Certificate
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# Промежуточные сертификаты

Компания [IdenTrust](https://www.identrust.com/) подписала наши промежуточные сертификатры. Это позволяет всем основным браузерам принимать наши сертификаты с нашим же корневым сертификатом.

При обычных обстоятельствах, сертификаты Let’s Encrypt создаются на основе “Let’s Encrypt Authority X3”. Другой промежуточный сертификат, “Let’s Encrypt Authority X4”, находится в резерве на случай аварийного восстановления, и будет использован при невозможности использования “Let’s Encrypt Authority X3”. Первое поколение наших промежуточных сертификатов - сертификаты Х1 и Х2. Мы заменили их на новые, для бОльшей совместимости с Windows XP.

* Активные
  * [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* В резерве
  * [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Неиспользуемые
  * [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)

# Cross-подпись

Наш промежуточный сертификат “Let’s Encrypt Authority X3” содержит открытый и закрытый ключ. Закрытый ключ из этой пары подписывает все сертификаты конечного пользователя (они же "листовые сертификаты), т.е. сертификаты, которые мы выдаём для вашего web-сервера.

Сертификат “Let’s Encrypt Authority X3” подписан корневым сертификатом "ISRG Root X1". Центр Сертификации Let’s Encrypt появился недавно, поэтому сертификату "ISRG Root X1" доверяют не все браузеры. Для повышения доверия, наши промежуточные сертификаты были дополнительно подписаны другим Центром Сертификации - IdenTrust - чей корневой сертификат признаётся всеми основными браузерами. Конкретнее, IdenTrust подписал наш промежуточный сертификат своим [DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html) сертификатом.

Это означает, что есть два сертификата, представляющие собой наш промежуточный сертификат. Один подписан  DST Root CA X3, другой подписан ISRG
Root X1. Чтобы определить, какой из двух сертификатов используется, достаточно взглянуть на поле *Issuer*.

При настройке web-сервера, администратор указывает не только листовые сертификаты, но и список промежуточных сертификатов. Это помогает браузеру проверить, входит ли листовой сертификат в цепочку доверия, ведущую к корневому сертификату. Скорее всего администратор выберет цепочку, в которой будет промежуточный сертификат с полем *Subject: “Let’s Encrypt Authority X3”*, и полем *Issuer: “DST Root CA X3”*. Рекомендованный Let’s Encrypt ACME-клиент [Certbot](https://certbot.org) настроит ваш сервер автоматически.

Картинка ниже иллюстрируеи взаимосвязи между перечисленными сертификатами:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# Сертификат подписания OCSP

Этот сертификат используется для подписания ответов от OCSP для промежуточных Центров Сертификации  Let's Encrypt. Таким образом нам не нужно иметь онлайне-доступ к корневому сертификату, чтобы подписать эти ответы. Копия сертификата подписания включена в ответ от OCSP для информирования, дополнительно пользователям ничего делать не нужно.

* [ISRG Root OCSP X1 (Signed by ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Прозрачность сертификатов

We are dedicated to transparency in our operations and in the certificates we
issue. We submit all certificates to [Certificate Transparency
logs](https://www.certificate-transparency.org/) as we issue them. You can view all
issued Let's Encrypt certificates via these links:

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Дополнительно

The private keys for the ISRG root CA and the Let’s Encrypt intermediate CAs are stored on hardware security modules (HSMs), which provide a high degree of protection against the keys being stolen.

Все ключи ISRG - это RSA-ключи. Мы [планируем переход на ECDSA-ключи](/ru/upcoming-features/).
