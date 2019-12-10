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

# Проверка HTTP-01

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

# Проверка DNS-01

Эта проверка требует подтверждения прав на домен с помощью специальной TXT-записи для 
доменного имени. Это сложнее в настройке, чем для проверки HTTP-01, но покрывает 
сценарии использования, недоступные для проверки HTTP-01. Кроме того, проверка DNS-01
позволяет выпускать сертификаты с подстановкой (wildcard-сертификаты). 
После того, как Let’s Encrypt вашему ACME-клиенту токен, клиент создаёт содержимое TXT-записи,
производную от токена и ключа аккаунта, и записывает её в `_acme-challenge.<YOUR_DOMAIN>`.
Далее, Let’s Encrypt запрашивает TXT-запись в DNS-зоне вашего домена. Если значения совпадают - 
сертификат можно использовать!

Крайне важно автоматизировать процессы выпуска и отзыва сертификатов, поэтому проверку DNS-01
имеет смысл использовать, когда ваш DNS-провайдер предоставляет API для автоматических
обновлений. Наше сообщество поддерживает [список таких DNS-провайдеров][dns-api-providers].
Ваш DNS-провайдер может быть либо вашим регистратором доменов (компанией, у которой вы купили
доменное имя), либо сторонней организацией. Если вы захотите сменить DNS-провайдера, нужно
будет будет сделать незначительные изменения у регистратора доменов. Ожидать окончания срока
действия сертификатов при этом не требуется.

Обратите внимание, что размещение полноправной учётной записи для DNS API на web-сервере существеннно
увеличивает возможный ущерб при взломе. Лучше всего использовать 
[учётную запись с ограниченными возможностями][securing-dns-credentials], или выполнять 
проверку DNS-01 на отдельном сервере, с последующим копированием сертификатов на web-сервер.

Т.к. Let’s Encrypt придерживается стандартов DNS для поиска TXT-записи при проверке DNS-01, 
вы можете задействовать записи CNAME или NS для делегирования права ответа за другие DNS-зоны. 
Например [настроив субдомен `_acme-challenge`][securing-dns-credentials] для специального 
сервера валидации. Или, если ваш DNS-провайдер медленно обновляет данные, и вы хотите использовать
более быстрый сервер.

У большинства DNS-провайдеров есть так называемый "период обновления данных", показывающий,
сколько времени пройдёт с момента изменения DNS-записи до её обновления на всех серверах 
провайдера. Этот период достаточно сложно оценить, т.к. зачастую DNS-провайдеры применяют 
[anycast] - когда несколько серверов имеют один и тот же IP-адрес. В этом случае, в зависимости
от вашей геолокации, вы и Let’s Encrypt можете взаимодействовать с разными серверами, 
и получать разные результаты. Лучшие DNS API содержат методы автоматического уведомления о полном
обновлении данных на всех серверах провайдера. Если ваш DNS-провайдер такой информации не даёт, 
вам придётся настроить ACME-клиент на достаточно долгое (не менее часа) ожидание перед запуском 
валидации.

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
