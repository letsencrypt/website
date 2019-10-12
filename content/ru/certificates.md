---
title: Цепочка доверия
linkTitle: Цепочка доверия (Корневые и промежуточные сертификаты)
slug: certificates
top_graphic: 5
lastmod: 2019-05-01
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

Сертификат “Let’s Encrypt Authority X3” подписан корневым сертификатом "ISRG Root X1". Центр Сертификации Let’s Encrypt появился недавно, поэтому сертификату "ISRG Root X1" доверяют не все браузеры. Для повышения доверия, наши промежуточные сертификаты были дополнительно подписаны другим Центром Сертификации - IdenTrust - чей корневой сертификат признаётся всеми основными браузерами. Конкретнее, IdenTrust подписал наш промежуточный сертификат своим сертификатом "DST Root CA X3" (недавно переименованным в "TrustID X3 Root").  [Скачайте сертификат "TrustID X3 Root" с identrust.com](https://www.identrust.com/support/downloads), либо, его копию отсюда: [.pem](/certs/trustid-x3-root.pem.txt), [.p7b](/certs/trustid-x3-root.p7b).

Это означает, что есть два сертификата, представляющие собой наш промежуточный сертификат. Один подписан  DST Root CA X3, другой подписан ISRG
Root X1. Чтобы определить, какой из двух сертификатов используется, достаточно взглянуть на поле *Issuer*.

При настройке web-сервера, администратор указывает не только листовые сертификаты, но и список промежуточных сертификатов. Это помогает браузеру проверить, входит ли листовой сертификат в цепочку доверия, ведущую к корневому сертификату. Скорее всего администратор выберет цепочку, в которой будет промежуточный сертификат с полем *Subject: “Let’s Encrypt Authority X3”*, и полем *Issuer: “DST Root CA X3”*. Рекомендованный Let’s Encrypt ACME-клиент [Certbot](https://certbot.org) настроит ваш сервер автоматически.

Картинка ниже иллюстрируеи взаимосвязи между перечисленными сертификатами:

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# Сертификат подписания ответов OCSP

Этот сертификат используется для подписания ответов OCSP для промежуточных Центров Сертификации Let's Encrypt. Таким образом нам не нужно иметь онлайне-доступ к корневому сертификату, чтобы подписать эти ответы. Копия сертификата подписания включена в ответ OCSP для информирования, дополнительно пользователям ничего делать не нужно.

* [ISRG Root OCSP X1 (Signed by ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)

# Прозрачность сертификатов

В Let's Encrypt мы в нацелены на прозрачность в наших процессах и в сертификатах, которые выпускаем. Мы записываем сертификаты в [журнал Certificate Transparency](https://www.certificate-transparency.org/) сразу, как только выпускаем их. Все наши сертификаты доступны по ссылкам:

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# Дополнительно

Закрытые ключи для корневого ISRG и промежуточных Let’s Encrypt Центров Сертификации надёжно хранятся в аппаратных модулях безопасности (hardware security modules, HSMs), что обеспечивает высокий уровень защиты от кражи ключей.

Все ключи ISRG - это RSA-ключи. Мы [планируем переход на ECDSA-ключи]({{< ref "/upcoming-features.md" >}}).
