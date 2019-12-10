---
title: Виды проверок
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

Когда вы запрашиваете новый сертификат у Let’s Encrypt, наши серверы проверяют 
ваши права на доменные имена в сертификате, используя так называемые "испытания" 
(или "проверки", согласно стандарта ACME. Обычно проверки выполняются с помощью
вашего ACME-клиента и не требуют дополнительной настройки, но для сложных конфигураций
будет полезным узнать о проверках чуть больше. Если вы не уверены, какую именно проверку
применять - используйте настройки по-умолчанию для вашего ACME-клиента, 
или проверку HTTP-01.

# HTTP-01 challenge

Этот тип проверки используется чаще всего. Let’s Encrypt выдаёт ACME-клиенту токен,
а ACME-клиент записывает этот токен в файл на вашем web-сервере по пути
`http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. В этом файле содержится 
сам токен, плюс отпечаток ключа вашего аккаунта. Как только ACME-клиент сообщит
Let’s Encrypt, что файл готов, Let’s Encrypt будет пытаться получить этот файл 
по URL (возможно, несколько раз, с с различных адресов). Если полученный ответ будет
верным, проверка считается успешной, и сертификат можно использовать для выбранного домена.
Если проверка прошла неудачно, требуется повторить попытку с новым сертификатом. 

Наша реализация проверки HTTP-01 разрешает редиректы запросов, общим числом не более 10. 
Редиректы принимаются только на адреса, начинающиеся с “http:” или “https:”, 
и только на порты 80 или 443. Редиректы на IP-адреса не принимаются. Если редирект был на 
URL c HTTPS, то сертификат не считается подтверждённым (т.к. проверка предназначена новых валидных
сертификатов, в ходе проверки могут обнаружиться самоподписанные или просроченные сертификаты).

Проверка HTTP-01 может быть выполнена только с использованием порта 80. Произвольный порт
для проверки может снизить её надёжность, и потому запрещён стандартом ACME.

Плюсы:

 - Упрощённая автоматизация процесса, не требующая дополнительных знаний по настройке доменов
 - Позволяет хостинг-провайдерам выпускать сертификаты для доменов, принадлежащих им по CNAME.
 - Совместим с уже настроенными web-серверами.
 
 Минусы:
 
 - Требует открытого порта 80 (редко, но интернет-провайдеры блокируют этот адрес)
 - Let’s Encrypt не позволяет использовать эту проверку для сертификатов с возможностью
 подстановки (wildcard-сертификатов).
 - Если у вас несколько web-серверов, файл требуется создавать для каждого из них.

# DNS-01 challenge

This challenge asks you to prove that you control the DNS for your
domain name by putting a specific value in a TXT record under that domain
name. It is harder to configure than HTTP-01, but can work in scenarios
that HTTP-01 can’t. It also allows you to issue wildcard certificates.
After Let’s Encrypt gives your ACME client a token, your client
will create a TXT record derived from that token and your account key,
and put that record at `_acme-challenge.<YOUR_DOMAIN>`. Then Let’s
Encrypt will query the DNS system for that record. If it finds a match,
you can proceed to issue a certificate!

Since automation of issuance and renewals is really important, it only
makes sense to use DNS-01 challenges if your DNS provider has an API you
can use to automate updates. Our community has started a [list of such DNS
providers here][dns-api-providers]. Your DNS provider may be the same as
your registrar (the company you bought your domain name from), or it
might be different. If you want to change your DNS provider, you just
need to make some small changes at your registrar. You don’t need to
wait for your domain to be close to expiration to do so.

Note that putting your fully DNS API credentials on your web server
significantly increases the impact if that web server is hacked. Best
practice is to use [more narrowly scoped API
credentials][securing-dns-credentials], or perform DNS
validation from a separate server and automatically copy certificates
to your web server.

Since Let’s Encrypt follows the DNS standards when looking up TXT
records for DNS-01 validation, you can use CNAME records or NS records to
delegate answering the challenge to other DNS zones. This can be used to
[delegate the `_acme-challenge` subdomain][securing-dns-credentials]
to a validation-specific server or zone. It can also be used if your DNS
provider is slow to update, and you want to delegate to a quicker-updating
server.

Most DNS providers have a “propagation time” that governs how long it
takes from the time you update a DNS record until it’s available on all
of their servers. It can be hard to measure this because they often also
use [anycast], which means multiple servers can have the same IP address,
and depending on where you are in the world you might talk to a different
server (and get a different answer) than Let’s Encrypt does. The best
DNS APIs provide a way for you to automatically check whether and update
is fully propagated. If your DNS provider doesn’t have this, you just
have to configure your client to wait long enough (often as much as an
hour) to ensure the update is propagated before triggering validation.

You can have multiple TXT records in place for the same name. For
instance, this might happen if you are validating a challenge for a
wildcard and a non-wildcard certificate at the same time. However, you
should make sure to clean up old TXT records, because if the response
size gets too big Let’s Encrypt will start rejecting it.

Pros:

 - You can use this challenge to issue certificates containing wildcard domain names.
 - It works well even if you have multiple web servers.

Cons:

 - Keeping API credentials on your web server is risky.
 - Your DNS provider might not offer an API.
 - Your DNS API may not provide information on propagation times.

# TLS-SNI-01

This challenge was defined in draft versions of ACME. It did a TLS
handshake on port 443 and sent a specific [SNI] header, looking for
certificate that contained the token. It [will be disabled in March
2019][tls-sni-disablement]
because it was not secure enough.

# TLS-ALPN-01

This challenge was developed after TLS-SNI-01 became deprecated, and is
being developed as [a separate standard][tls-alpn]. Like TLS-SNI-01, it is performed
via TLS on port 443. However, it uses a custom ALPN protocol to ensure
that only servers that are aware of this challenge type will respond
to validation requests. This also allows validation requests for this
challenge type to use an SNI field that matches the domain name being
validated, making it more secure.

This challenge is not suitable for most people. It is best suited
to authors of TLS-terminating reverse proxies that want to perform
host-based validation like HTTP-01, but want to do it entirely at the
TLS layer in order to separate concerns. Right now that mainly means
large hosting providers, but mainstream web servers like Apache and
Nginx could someday implement this (and [Caddy already does][caddy-tls-alpn]).

Pros:

 - It works if port 80 is unavailable to you.
 - It can be performed purely at the TLS layer.

Cons:

 - It’s not supported by Apache, Nginx, or Certbot, and probably won’t be soon.
 - Like HTTP-01, if you have multiple servers they need to all answer with the same content.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
