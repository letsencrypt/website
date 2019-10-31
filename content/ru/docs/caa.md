---
title: Авторизация в Центре сертификации (CAA)
slug: caa
top_graphic: 1
date: 2017-07-27
lastmod: 2017-07-27
---

{{< lastmod >}}

CAA --- тип записи DNS, с помощью которого владелец сайта может определить 
Центры сертификации (CAs) для выпуска сертификатов, содержащих 
конкретные доменные имена. Она была стандартизирована в 2013 году в 
[RFC 6844](https://tools.ietf.org/html/rfc6844), чтобы позволить Центру 
сертификации "уменьшить риск непреднамеренного ошибочного выпуска сертификата". 
По умолчанию каждый публичный Центр сертификации имеет право выпускать 
сертификаты для любого доменного имени в общедоступном DNS при условии, 
что контроль над этим доменным именем подтвержден. Это означает, что 
возможный баг в одном из множества проверочных процессов 
Центров сертификации потенциально может затронуть каждое доменное 
имя. CAA позволяет владельцам доменов уменьшить этот риск.

# Использование CAA

Если вам не нужна CAA, можно ничего не делать (но см. ошибки
CAA ниже). Если же вы хотели бы использовать CAA, чтобы ограничить число 
Центров сертификации, имеющих право выпуска сертификатов для 
вашего домена, нужно использовать DNS-провайдера, который поддерживает 
настройку записей CAA. Список таких провайдеров можно найти на 
[странице SSLMate's CAA](https://sslmate.com/caa/support). Если ваш 
провайдер нашелся в списке, можно использовать 
[генератор записей SSLMate's CAA](https://sslmate.com/caa/) для создания
набора записей CAA, перечисляющих центры сертификации, которые вы хотели бы разрешить.

Идентифицирующее доменное имя Let's Encrypt's для CAA --- `letsencrypt.org`.
Это официально задокументировано [в нашем Положении о практике сертификации
(CPS), секция 4.2.1]({{< relref "/repository.md" >}}).

## Где разместить запись

Можно разместить запись CAA на главном домене или на поддомене любого уровня.
Например, если ваше доменное имя `www.community.example.com`, вы можете 
разместить записи CAA либо для полного имени, либо для `community.example.com`, 
либо для `example.com`. Центры сертификации будут проверять любую версию 
слева направо и остановятся, как только обнаружат любую запись CAA.
Так, к примеру, запись CAA для `community.example.com` будет приоритетнее, 
чем запись для `example.com`. Большинство из тех, кто добавляет записи CAA, 
устанавливают их для зарегистрированного домена верхнего уровня (`example.com`), 
чтобы они действовали на все поддомены. Также обратите внимание, что 
записи CAA для поддоменов приоритетнее, чем записи для родительского домена, 
независимо от того, носят ли они разрешительный или запретительный характер. 
Таким образом, поддомен может не иметь ограничения, которое установлено 
для родительского домена.

Валидация CAA придерживается правил CNAMEs, как и другие DNS-запросы. Если 
`www.community.example.com` --- это CNAME для `web1.example.net`, то Центр 
сертификации сперва запросит записи CAA для `www.community.example.com`, 
далее, обнаружив CNAME вместо записи CAA для этого доменного имени, 
запросит CAA для `web1.example.net`. Обратите внимание, что если доменное 
имя имеет запись CNAME, оно не может иметь никаких других записей, 
согласно стандартам DNS.

[CAA RFC](https://tools.ietf.org/html/rfc6844) определяет дополнительное
поведение, называемое "tree-climbing", которое требует, чтобы Центры 
сертификации также проверяли родительские домены
для результата разрешения CNAME. Это дополнительное поведение было позже
удалено в [исправлении](https://www.rfc-editor.org/errata/eid5065), поэтому 
Let's Encrypt и другие Центры сертификации не реализовали его.

# CAA errors

Since Let's Encrypt checks CAA records before every certificate we issue, sometimes
we get errors even for domains that haven't set any CAA records. When we
get an error, there's no way to tell whether we are allowed to issue for the
affected domain, since there could be CAA records present that forbid issuance,
but are not visible because of the error.

If you receive CAA-related errors, try a few more times against our [staging
environment]({{< relref "/docs/staging-environment.md" >}}) to see if they
are temporary or permanent. If they are permanent, you will need to file a
support issue with your DNS provider, or switch providers. If you're not sure
who your DNS provider is, ask your hosting provider.

Some DNS providers that are unfamiliar with CAA initially reply to problem
reports with "We do not support CAA records." Your DNS provider does not need
to specifically support CAA records; it only needs to reply with a
NOERROR response for unknown query types (including CAA). Returning other
opcodes, including NOTIMP, for unrecognized qtypes is a violation of [RFC
1035](https://tools.ietf.org/html/rfc1035), and needs to be fixed.

# SERVFAIL

One of the most common errors that people encounter is SERVFAIL. Most often this
indicates a failure of DNSSEC validation. If you get a SERVFAIL error, your
first step should be to use a DNSSEC debugger like
[dnsviz.net](http://dnsviz.net/). If that doesn't work, it's possible that your
nameservers generate incorrect signatures only when the response is empty. And
CAA responses are most commonly empty.  For instance, PowerDNS [had this bug in
version 4.0.3 and below](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

If you don't have DNSSEC enabled and get a SERVFAIL, the second most likely
reason is that your authoritative nameserver returned NOTIMP, which as described
above is an RFC 1035 violation; it should instead return NOERROR with an empty
response. If this is the case, file a bug or a support ticket with your DNS provider.

Lastly, SERVFAILs may be caused by outages at your authoritative nameservers.
Check the NS records for your nameservers and ensure that each server is
available.

# Timeout

Sometimes CAA queries time out. That is, the authoritative name server never
replies with an answer at all, even after multiple retries. Most commonly this
happens when your nameserver has a misconfigured firewall in front of it that
drops DNS queries with unknown qtypes. File a support ticket with your DNS
provider and ask them if they have such a firewall configured.
