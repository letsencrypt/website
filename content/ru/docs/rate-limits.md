---
title: Ограничения
slug: rate-limits
top_graphic: 1
date: 2018-01-04
lastmod: 2019-05-30
---

{{< lastmod >}}

Let's Encrypt использует ограничения на использование ресурсов, чтобы обеспечить справедливое использование сервиса как можно большим числом пользователей. Мы считаем, что данные ограничения, в общем случае, не должны помешать работе пользователей. Ограничение на обновление сертификатов спроектировано так, что вряд ли будет превышено, поэтому большие организации могут постепенно увеличивать число выпущенных сертификатов, без необходимости вмешательства со стороны Let's Encrypt.

Если вы ведёте активную разработку или тестирование ACME-клиента, пожалуйста, используйте наше [Staging-окружение](/docs/staging-environment/), вместо Production-окружения. Если вы представляете компанию-хостера со множеством сайтов, и занимаетесь вопросами интеграции с Let's Encrypt, пожалуйста, [ознакомьтесь с нашим Руководством по интеграции](/docs/integration-guide).

Основное ограничение - это <a name="certificates-per-registered-domain"></a>**Число сертификатов на зарегистрированный домен** (50 в неделю). Зарегистрированный домен, это, другими словами, часть доменного имени, приобретённого вами у регистратора доменных имён. Например, для доменного имени `www.example.com`, зарегистрированным доменом будет `example.com`, для имени `new.blog.example.co.uk` - `example.co.uk`, и т.д. Для вычисления зарегистрированного домена мы используем [Public Suffix List](https://publicsuffix.org).

Если у вас много поддоменов, возможно, вам будет удобнее поместить их в один сертификат, с ограничением не более 100 <a name="names-per-certificate"></a>**Имён на сертификат**. Учитывая предыдущее ограничение, это означает, что вы можете выпустить сертификаты с 5000 уникальными субдоменами в неделю. Сертификаты, содержащие несколько доменных имён, обычно называются SAN- или, иногда, UCC-сертификатами. Важное замечание: с точки зрения производительности и надёжности, лучше использовать как можно меньше доменных имён внутри одного сертификата.

Обновления сертификатов обрабатываются по другой логике: их число учитывается не в ограничении на **Число сертификатов на зарегистрированный домен**, а в ограничении на **Дубли сертификатов** - не более 5 в неделю. Важное замечание: обновления учитывались в ограничении на **Число сертификатов на зарегистрированный домен** до марта 2019, [но более не учитываются](https://community.letsencrypt.org/t/rate-limits-fixing-certs-per-name-rate-limit-order-of-operations-gotcha/88189).

Сертификат считается обновлённым (или продублированным), если он содержит в точности тот же набор доменных имён, без учёта регистра написания и порядка указания. Например, если вы выпустили сертификат для доменных имён [`www.example.com`, `example.com`], вы можете выпустить ещё четыре сертификата для этих имён в течение недели. Если вы измените набор доменных имён, добавив к ним [`blog.example.com`], вы можете выпустить дополнительные сертификаты, и т.д.

Обработчик запроса на обновление сертификата проигнорирует предоставленный открытый ключ и расширения. Выдача сертификата будет считаться обновлением, даже если вы используете новый ключ.

Отзыв сертификата не сбрасывает счётчик ограничений, т.к. ресурсы на выпуск сертификата уже были использованы.

Существует ограничение на <a name="failed-validations"></a>**Число неудачных валидаций** - не более 5 неудачных попыток, для одного аккаунта, для одного доменного имени, в течение часа. Это ограничение увеличено в нашем [Staging-окружении](/docs/staging-environment/),таким образом, вы можете использовать это окружение для поиска причин проблем со связью.

На вызов методов "new-reg", "new-authz" и "new-cert" существует ограничение <a name="overall-requests"></a>**Число общих запросов** - не более 20 вызовов в секунду. На вызов методов из папок "/directory", "acme" и вложенных папок ограничение **Число общих запросов** составляет 40 вызовов в секунду.

Также существуют ещё два ограничения, с которыми вы вряд ли столкнётесь.

Возможно создать не более 10 <a name="accounts-per-ip-address"></a>**Аккаунтов на IP-адрес** в течение 3 часов. Возможно создать не более 500 **Аккаунтов на диапазон IP-адресов** внутри подсети IPv6 /48 в течение 3 часов. Вероятность достижения этих ограничений достаточно мала, но мы рекомендуем компаниям-интеграторам [использовать один аккаунт для множества клиентов](/docs/integration-guide).

Для одного аккаунта допускается не более 300 <a name="pending-authorizations"></a>**Запросов на авторизацию, ожидающих ответа**. Достижение этого ограничения маловероятно, и как правило, возникает при разработке ACME-клиента. Обычно это означает, что ваш клиент создаёт запросы на авторизацию, но не завершает их. Пожалуйста, используйте наше [Staging-окружение](/docs/staging-environment/) при разработке ACME-клиента.

При использовании ACME v2 API, вы можете создать не более 300 <a name="new-orders"></a>**Новых заказов** для одного аккаунта в течение 3 часов.

# <a name="overrides"></a>Overrides

If you've hit a rate limit, we don't have a way to temporarily reset it. You'll
need to wait until the rate limit expires after a week. We use a sliding window,
so if you issued 25 certificates on Monday and 25 more certificates on Friday,
you'll be able to issue again starting Monday. You can get a list of certificates
issued for your registered domain by [searching on crt.sh](https://crt.sh), which
uses the public [Certificate Transparency](https://www.certificate-transparency.org)
logs.

Revoking certificates does not reset rate limits, because the resources involved
in issuing the certificates have already been used.

If you are a large hosting provider or organization working on a Let's Encrypt
integration, we have a [rate limiting
form](https://goo.gl/forms/plqRgFVnZbdGhE9n1)
that can be used to request a higher rate limit. It takes a few weeks to process
requests, so this form is not suitable if you just need to reset a rate limit
faster than it resets on its own.

Note that most hosting providers don't need rate limit increases, because
there's no limit on the number of distinct registered domains for which you can issue.
So long as most of your customers don't have more than 2,000 subdomains on a
registered domain, you most likely do not need an increase. See our [Integration
Guide](/docs/integration-guide/) for more advice.

# <a name="clearing-pending"></a>Clearing Pending Authorizations

If you have a large number of pending authorization objects and are getting a
rate limiting error, you can trigger a validation attempt for those
authorization objects by submitting a JWS-signed POST to one of its challenges, as
described in the
[ACME spec](https://github.com/ietf-wg-acme/acme/blob/master/draft-ietf-acme-acme.md#responding-to-challenges).
The pending authorization objects are represented by URLs of the form
https://acme-v01.api.letsencrypt.org/acme/authz/XYZ, and should show up in your
client logs. Note that it doesn't matter whether validation succeeds or fails.
Either will take the authorization out of 'pending' state. If you do not
have logs containing the relevant authorization URLs, you need to wait for the
rate limit to expire. As described above, there is a sliding window, so this may
take less than a week depending on your pattern of issuance.

Note that having a large number of pending authorizations is generally the
result of a buggy client. If you're hitting this rate limit frequently you
should double-check your client code.
