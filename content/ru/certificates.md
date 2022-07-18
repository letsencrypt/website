---
title: Цепочка доверия
linkTitle: Цепочка доверия (Корневые и промежуточные сертификаты)
slug: certificates
top_graphic: 5
lastmod: 2021-09-24
show_lastmod: 1
---


[![Схема иерархии сертификатов ISRG по состоянию на декабрь 2020 г.](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# Корневые сертификаты

Наши корневые сертификаты хранятся в надёжном месте и недоступны онлайн. Мы выпускаем сертификаты для пользователей на основе промежуточных сертификатов из следующего раздела. Для дополнительной совместимости с новым Root X2 с различными корневыми хранилищами, мы также подписали его с Root X1.

* Активные
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [Самоподписанный](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [Кросс подписанный DST Root CA X3](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* Действующий, с ограничениями
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [Самоподписанный](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [Кросс-подписанный ISRG Root X1](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

Мы создали сайты для проверки цепочки сертификатов вплоть до активных корневых.

* ISRG Root X1
  * [Действительный](https://valid-isrgrootx1.letsencrypt.org/)
  * [Отозванный](https://revoked-isrgrootx1.letsencrypt.org/)
  * [Срок действия истёк](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [Действительный](https://valid-isrgrootx2.letsencrypt.org/)
  * [Отозванный](https://revoked-isrgrootx2.letsencrypt.org/)
  * [Срок действия истёк](https://expired-isrgrootx2.letsencrypt.org/)

# Промежуточные сертификаты

Как правило, сертификаты, выпущенные Let's Encrypt, создаются на основе "R3", промежуточного RSA. В настоящее время выпуск сертификатов из "E1", промежуточного ECDSA-сертификата, возможен только для ключей ECDSA из [разрешенных аккаунтов](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679). В будущем выпуск сертификатов из "Е1" будет доступен для всех.

Дополнительные промежуточные сертификаты ("R4" и "E2") зарезервированы для восстановления после стихийных бедствий, и будут использованы только в том случае, если мы потеряем доступ к нашими основным межуточным сертификатам. Мы больше не используем промежуточные сертификаты X1, X2, X3 и X4.

IdenTrust кросс-подписал наши промежуточные сертификаты RSA для дополнительной совместимости.

* Активные
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (Retired)
* Действующий, с ограничениями
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [Подписанный ISRG Root X2](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* Резервное копирование
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (Retired)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [Подписанный ISRG Root X2](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* Неиспользуемые
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [Подписанный ISRG Root X1](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [Кросс-подписанный IdenTrust](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# Кросс-подпись

## Промежуточные сертификаты

Каждый из наших промежуточных сертификатов представляет собой одну публичную/частную ключевую пару. Это позволяет всем основным браузерам принимать наши сертификаты с нашим же корневым сертификатом.

Наши промежуточные RSA-сертификаты подписаны ISRG Root X1. На данный момент ISRG Root X1 пользуется широким доверием, но у наших промежуточных RSA по-прежнему кросс-подпись "[DST Root CA X3](https://crt.sh/?id=8395)" IdenTrust (теперь он называется "TrustID X3 Root") для дополнительной клиент-совместимости. Корневой сертификат IdenTrust существует дольше и поэтому лучше совместим со старыми устройствами и операционными системами (например, Windows XP, Android 7). Вы можете [загрузить "TrustID X3 Root" из IdenTrust](https://www.identrust.com/support/downloads) (или, как вариант, вы можете [скачать копию у нас](/certs/trustid-x3-root.pem.txt)).

Кросс-подпись означает, что каждый из наших промежуточных сертификатов имеет два сертификата, представляющих один и тот же ключ подписи. Один подписан DST Root CA X3, другой подписан ISRG Root X1. Самый простой способ отличить их — посмотреть на поле "Issuer" (издатель).

При настройке web-сервера, администратор указывает не только листовые сертификаты, но и список промежуточных сертификатов. Это помогает браузеру проверить, входит ли листовой сертификат в цепочку доверия, ведущую к корневому сертификату. Почти все операторы серверов будут выбирать для обслуживания цепочку, включающую промежуточный сертификат с субъектом "R3" и издателем "ISRG Root X1". Рекомендуемое клиентское программное обеспечение Let's Encrypt, [Certbot](https://certbot.org), выполнит эту задачу без затруднений.

## Корневые сертификаты
Как и промежуточные сертификаты, корневые сертификаты могут быть кросс-подписаны, часто для увеличения клиентской совместимости. Наш корневой ECDSA-сертификат, ISRG Root X2 был создан осенью 2020 года и является корневым сертификатом для иерархии ECDSA. Он представлен двумя сертификатами: самоподписанным и подписанным ISRG Root X1.

Все сертификаты, подписанные промежуточным ECDSA-сертификатом "E1", будут иметь цепочку с промежуточным сертификатом, у которого субъект "ISRG Root X2", а издатель "ISRG Root X1". Почти все сервера выберут для обслуживания эту цепочку, поскольку она обеспечивает наибольшую совместимость до тех пор, пока ISRG Root X2 не получит широкого доверия.

# Сертификат подписания ответов OCSP

Этот сертификат используется для подписания ответов OCSP для промежуточных Центров Сертификации Let's Encrypt. Таким образом нам не нужно иметь онлайне-доступ к корневому сертификату, чтобы подписать эти ответы. Копия сертификата подписания включена в ответ OCSP для информирования, дополнительно пользователям ничего делать не нужно.

* ISRG Root OCSP X1 ([Подписанный ISRG Root X1](https://crt. sh/? id=2929281974)): [der](/certs/isrg-root-ocsp-x1. der), [pem](/certs/isrg-root-ocsp-x1. pem), [txt](/certs/isrg-root-ocsp-x1. txt)

У наших новых промежуточных сертификатов нет OCSP URL-адресов (их информация об отзыве вместо этого используется CRL), поэтому мы не выпустили сертификат подписи OCSP от ISRG Root X2.

# Прозрачность сертификата

В Let's Encrypt мы в нацелены на прозрачность в наших процессах и в сертификатах, которые выпускаем. Мы записываем сертификаты в [журнал Certificate Transparency](https://www.certificate-transparency.org/) сразу, как только выпускаем их. Все наши сертификаты доступны по ссылкам:

* [Выпущены Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Выпущены Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)
* [Выпущены Е1](https://crt.sh/?Identity=%25&iCAID=183283)
* [Выпущены R3](https://crt.sh/?Identity=%25&iCAID=183267)
