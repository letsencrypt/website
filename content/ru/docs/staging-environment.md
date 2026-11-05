---
title: Тестовое окружение
slug: staging-environment
lastmod: 2026-04-10
show_lastmod: 1
---


Мы настоятельно рекомендуем производить проверку в тестовом окружении, перед тем как использовать рабочий сервер. Это позволит обнаружить проблему еще до выпуска доверенных сертификатов и уменьшит шанс столкнуться с ограничениями по лимиту.

URL-адрес ACME нашего [тестового окружения ACME v2](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605):

`https://acme-staging-v02.api.letsencrypt.org/directory`

Если вы используете [Certbot](https://certbot.eff.org/), можете воспользоваться нашей тестовой средой, указав флаг `--test-cert` или `--dry-run`. В случае других ACME-клиентов ищите информацию по использованию нашего тестового окружения в их инструкциях.

Обратите внимание, что учетные записи ACME привязаны к конкретной среде, поэтому для тестовой среды требуется отдельная учетная запись. Certbot берет это на себя.

# Лимиты

В тестовой (staging) среде действуют те же ограничения частоты запросов, что и [описанные для рабочей (production) среды](/docs/rate-limits), но с другими значениями:

* Лимит на **[количество новых регистраций с одного IP-адреса](/docs/rate-limits/#new-registrations-per-ip-address)** составляет 50 за 3 часа.
* Лимит на **[количество новых регистраций для одного диапазона IPv6](/docs/rate-limits/#new-registrations-per-ipv6-range)** составляет 500 за 3 часа (столько же, сколько в рабочей среде).
* Лимит на **[новые заказы для одного аккаунта](/docs/rate-limits/#new-orders-per-account)** составляет 1500 за 3 часа.
* Лимит на **[новые сертификаты для зарегистрированного домена](/docs/rate-limits/#new-certificates-per-registered-domain)** составляет 30000 в секунду.
* Лимит на **[новые сертификаты для точного набора идентификаторов](/docs/rate-limits/#new-certificates-per-exact-set-of-identifiers)** составляет 30000 в неделю.
* Лимит на **[ошибки авторизации для одного идентификатора в рамках одного аккаунта](/docs/rate-limits/#authorization-failures-per-identifier-per-account)** составляет 200 в час.
* Лимит на **[последовательные сбои авторизации для одного идентификатора в рамках одного аккаунта](/docs/rate-limits/#consecutive-authorization-failures-per-identifier-per-account)** составляет 3600 за 6 часов.

[Общие лимиты запросов](/docs/rate-limits/#overall-requests-limit) следующие:

| Конечная точка     | Запросов на IP (в секунду) | Пропускная способность |
| ------------------ | -------------------------- | ---------------------- |
| /acme/new-nonce    | 20                         | 10                     |
| /acme/new-account  | 5                          | 15                     |
| /acme/new-order    | 20                         | 40                     |
| /acme/revoke-cert  | 10                         | 100                    |
| /acme/renewal-info | 1000                       | 100                    |
| /acme/*            | 20                         | 20                     |
| /directory         | 40                         | 40                     |

# Иерархия тестовых сертификатов

В тестовом окружении имеется своя иерархия сертификатов, [повторяющая рабочую](/certificates). Названия были изменены: к ним добавлен префикс (STAGING) и уникальный идентификатор, чтобы их можно было четко отличить от соответствующих объектов в рабочей среде.

## Корневые ЦС

В тестовой среде (staging) имеется четыре активных корневых сертификата — «(STAGING) Pretend Pear X1», «(STAGING) Bogus Broccoli X2», «(STAGING) Yearning Yucca Root YE» и «(STAGING) Yonder Yam Root YR», — которые **отсутствуют** в хранилищах доверенных сертификатов браузеров или клиентских приложений.

Если вы хотите настроить клиент, предназначенный только для тестирования, так, чтобы он доверял тестовой среде (staging environment), вы можете сделать это, добавив соответствующие сертификаты в хранилище доверенных сертификатов, используемое при тестировании. **Важное примечание:** Не добавляйте промежуточные или корневые сертификаты из тестовой среды (staging) в хранилище доверенных сертификатов, которое вы используете для обычного просмотра веб-страниц или других повседневных задач. Такие сертификаты не проходят аудит и к ним не предъявляются те же требования, что и к нашим рабочим (production) корневым сертификатам, поэтому их использование для любых целей, кроме тестирования, небезопасно.

* **Pretend Pear X1**
  * Субъект: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Pretend Pear X1`
  * Тип ключа: `RSA 4096`
  * Сведения о сертификате: [der](/certs/staging/letsencrypt-stg-root-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x1.txt)
  * Тестовые веб-сайты: [valid (рабочий)](https://valid.x1.staging-test-certs.letsencrypt.org/), [revoked (отозванный)](https://revoked.x1.staging-test-certs.letsencrypt.org/), [expired (устаревший)](https://expired.x1.staging-test-certs.letsencrypt.org/)
* **Bogus Broccoli X2**
  * Субъект: `O = (STAGING) Internet Security Research Group, CN = (STAGING) Bogus Broccoli X2`
  * Тип ключа: `ECDSA P-384`
  * Сведения о сертификате (самоподписанном): [der](/certs/staging/letsencrypt-stg-root-x2.der), [pem](/certs/staging/letsencrypt-stg-root-x2.pem), [txt](/certs/staging/letsencrypt-stg-root-x2.txt)
  * Сведения о сертификате (с перекрестной подписью Pretend Pear X1): [der](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.der), [pem](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.pem), [txt](/certs/staging/letsencrypt-stg-root-x2-signed-by-x1.txt)
  * Тестовые веб-сайты: [valid (рабочий)](https://valid.x2.staging-test-certs.letsencrypt.org/), [revoked (отозванный)](https://revoked.x2.staging-test-certs.letsencrypt.org/), [expired (устаревший)](https://expired.x2.staging-test-certs.letsencrypt.org/)
* **Yearning Yucca Root YE**
  * Субъект:  `O = ISRG, CN = (STAGING) Yearning Yucca Root YE`
  * Тип ключа: `ECDSA P-384`
  * Сведения о сертификате (самоподписанном): [der](/certs/staging/gen-y/root-ye.der), [pem](/certs/staging/gen-y/root-ye.pem), [txt](/certs/staging/gen-y/root-ye.txt)
  * Сведения о сертификате (с перекрестной подписью Bogus Broccoli X2): [der](/certs/staging/gen-y/root-ye-by-x2.der), [pem](/certs/staging/gen-y/root-ye-by-x2.pem), [txt](/certs/staging/gen-y/root-ye-by-x2.txt)
  * Тестовые веб-сайты: [valid (рабочий)](https://valid.ye.staging-test-certs.letsencrypt.org/), [revoked (отозванный)](https://revoked.ye.staging-test-certs.letsencrypt.org/), [expired (устаревший)](https://expired.ye.staging-test-certs.letsencrypt.org/)
* **Yonder Yam Root YR**
  * Субъект: `O = ISRG, CN = (STAGING) Yonder Yam Root YR`
  * Тип ключа: `RSA 4096`
  * Сведения о сертификате (самоподписанном): [der](/certs/staging/gen-y/root-yr.der), [pem](/certs/staging/gen-y/root-yr.pem), [txt](/certs/staging/gen-y/root-yr.txt)
  * Сведения о сертификате (с перекрестной подписью Pretend Pear X1): [der](/certs/staging/gen-y/root-yr-by-x1.der), [pem](/certs/staging/gen-y/root-yr-by-x1.pem), [txt](/certs/staging/gen-y/root-yr-by-x1.txt)
  * Тестовые веб-сайты: [valid (рабочий)](https://valid.yr.staging-test-certs.letsencrypt.org/), [revoked (отозванный)](https://revoked.yr.staging-test-certs.letsencrypt.org/), [expired (устаревший)](https://expired.yr.staging-test-certs.letsencrypt.org/)

## Нижестоящие (промежуточные) ЦС

В тестовой среде имеются промежуточные сертификаты, имитирующие сертификаты для рабочей среды и выданные на основе указанных выше недоверенных корневых сертификатов. Как и в рабочей среде, не все они используются одновременно. Полный список текущих промежуточных сертификатов:

* (STAGING) Pseudo Plum E5
* (STAGING) False Fennel E6
* (STAGING) Puzzling Parsnip E7
* (STAGING) Mysterious Mulberry E8
* (STAGING) Fake Fig E9
* (STAGING) Counterfeit Cashew R10
* (STAGING) Wannabe Watercress R11
* (STAGING) Riddling Rhubarb R12
* (STAGING) Tenuous Tomato R13
* (STAGING) Not Nectarine R14
* (STAGING) Artificial Amaranth YE1
* (STAGING) Baloney Bulgur YE2
* (STAGING) Cad Corn YE3
* (STAGING) Dastardly Durum YR1
* (STAGING) Ersatz Emmer YR2
* (STAGING) Fake Farro YR3

Эти промежуточные сертификаты могут быть изменены в любой момент; ни одна система не должна полагаться на них или жестко привязываться к ним. В целом можно ожидать, что промежуточные сертификаты в тестовой среде будут соответствовать аналогичным промежуточным сертификатам в рабочей (доверенной) среде. При крайней необходимости полные сведения о сертификате можно получить [здесь](https://github.com/letsencrypt/website/blob/main/static/certs/staging).

# Прозрачность сертификата (CT)

В тестовой среде используется несколько тестовых CT-логов. SCT из этих логов включаются в тестовые (staging) сертификаты. Однако тестовая (staging) среда является только тестовой, и использовать CT для надежного отслеживания сертификатов, выданных в этой среде, нельзя.

В число этих логов входят [тестовые логи](/docs/ct-logs#testing) Let's Encrypt, а также тестовые логи от других операторов логов прозрачности сертификатов.

Кроме того, могут использоваться некоторые логи [ct-test-srv](https://pkg.go.dev/github.com/letsencrypt/boulder/test/ct-test-srv), которые не являются настоящими логами и не хранят выданные сертификаты.

# Непрерывная интеграция (CI)/тестирование разработки

Лимиты тестового окружения достаточны для проведения тестирования, но не подходят для интеграции в среды разработки или непрерывной интеграции (CI). Запросы к внешним серверам снижают стабильность окружения. Кроме того, тестовое окружение не может "подделать" результаты DNS или HTTP-проверок, что усложняет проведение тестирования

В дополнение к тестовому окружению, Let's Encrypt предлагает ACME-сервер для окружения разработки и CI под названием [Pebble](https://github.com/letsencrypt/pebble). Запуск Pebble на машине разработчика или CI-сервере выполняется [быстро и просто](https://github.com/letsencrypt/pebble#docker).
