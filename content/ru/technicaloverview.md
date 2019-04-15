---
title: Как работает Let's Encrypt
slug: how-it-works
top_graphic: 3
---

Let's&nbsp;Encrypt и [протокол ACME](https://ietf-wg-acme.github.io/acme/) решают проблему автоматической настройки HTTPS на сервере, когда SSL / TLS сертификаты выдаются и обновляются без участия человека. Таким решением стал специальный сервис - агент по управлению сертификатами - работающий на web-сервере.

Для понимания технологии, разберём настройку домена `https://example.com/` для работы агента сертификатов Let's&nbsp;Encrypt, состоящую из двух этапов.

Прежде всего, агент уведомляет Центр Сертификации о том, у администратора сервера есть права на доменное имя. После подтверждения прав на домен, агент может запрашивать, обновлять и отзывать сертификаты.

## Проверка домена

Let's&nbsp;Encrypt идентифицирует администратора web-сервера по открытому ключу. Открытый и закрытый ключи генерируются агентом перед первым подключением к Центру сертификации Let's&nbsp;Encrypt. После подключения агента к Центру Сертификации, создаётся аккаунт администратора сервера. В созданный аккаунт добавляются доменные имена, которыми владеет администратор, аналогично тому, как это происходит в платных Центрах Сертификации.

Есть несколько способов проверить права на домен. Для каждого варианта Центр Сертификации Let's&nbsp;Encrypt подготавливает серию тестов. Например, перед проверкой прав на домен `example.com`, ЦС Let's&nbsp;Encrypt может предоставит агенту выбор:

* Предоставить DNS-запись для поддомена внутри `https://example.com`, или
* Предоставить HTTP-ресурс с определённым URI внутри `https://example.com/`

Одновременно с тестированием прав администратора на домен, Let's&nbsp;Encrypt проверяет права агента на открытый и закрытый ключи. Let's&nbsp;Encrypt отправляет агенту одноразовый пароль, который агент должен зашифровать закрытым ключом и отослать обратно.

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Агент пытается выполнить серию тестов для проверки прав на домен. Допустим, успешно выполнено задание по созданию HTTP-ресурса - создан файл по определённому пути внутри `https://example.com`. Кроме того, агентом получен одноразовый пароль, который был подписан закрытым ключом и отправлен обратно в Let's&nbsp;Encrypt. Как только эти пункты выполнены - агент уведомляет Центр Сертификации о завершении проверки.

Далее, Центр Сертификации проверяет, всё ли было сделано верно: корректную цифровую подпись на одноразовом пароле, возможность скачать созданный файл по URI, а также его содержимое.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Если цифровая подпись верна, и все тесты пройдены - агенту выдаются права на управление сертификатами для домена `example.com`. Ключевая пара (открытый и закрытый ключи), используемая при проверке прав на домен, называется "авторизованной ключевой парой" для `example.com`.

## Certificate Issuance and Revocation

Once the agent has an authorized key pair, requesting, renewing, and revoking certificates is simple---just send certificate management messages and sign them with the authorized key pair.

To obtain a certificate for the domain, the agent constructs a PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) that asks the Let's&nbsp;Encrypt CA to issue a certificate for `example.com` with a specified public key.  As usual, the CSR includes a signature by the private key corresponding to the public key in the CSR.  The agent also signs the whole CSR with the authorized key for `example.com` so that the Let's&nbsp;Encrypt CA knows it's authorized.

When the Let's&nbsp;Encrypt CA receives the request, it verifies both signatures.  If everything looks good, it issues a certificate for `example.com` with the public key from the CSR and returns it to the agent.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Revocation works in a similar manner.  The agent signs a revocation request with the key pair authorized for `example.com`, and the Let's&nbsp;Encrypt CA verifies that the request is authorized.  If so, it publishes revocation information into the normal revocation channels (i.e. OCSP), so that relying parties such as browsers can know that they shouldn't accept the revoked certificate.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>

