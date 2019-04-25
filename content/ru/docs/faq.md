---
title: Часто задаваемые вопросы
linkTitle: Часто задаваемые вопросы
slug: faq
top_graphic: 1
date: 2017-07-06
lastmod: 2017-07-06
menu:
  main:
    weight: 30
    parent: about
---

{{< lastmod >}}

Этот раздел состоит из двух частей:

* [Общие вопросы](#general)
* [Технические вопросы](#technical)

# <a name="general">Общие вопросы</a>

## Какие услуги предлагает Let's Encrypt?

Let's Encrypt - это глобальный Центр Сертификации (ЦС), или Удостоверяющий Центр (УЦ). Мы даём возможность людям и организациям получать, обновлять и управлять SSL/TLS сертификатами. Наши сертификаты используются сайтами для организации доступа к ним по безопасному протоколу HTTPS.

Let’s Encrypt предлагает сертификаты с подверждением домена (Domain Validation, DV). Мы не выпускаем сертификаты с подтверждением организации (Organization Validation, OV) или сертификаты высокой надёжности (Extended Validation, EV), потому что не можем пока автоматизировать выдачу таких сертификатов.

Чтобы начать, посетите страницу документации [Приступая к работе](/ru/getting-started/).

## Сколько стоят услуги Let's Encrypt? Это действительно бесплатно?

Мы не берём плату за наши сертификаты. Let’s Encrypt - некоммерческая организация, свою миссию мы видим в создании более безопасного, и уважающего конфиденциальность Интернета через широкое распространение HTTPS. Наши услуги бесплатны и просты в использованнии, поэтому каждый может настроить HTTPS для своего сайта.

Нам нужна поддержка спонсоров, грантодателей и отдельных людей, чтобы предоставлять наши услуги бесплатно по всему миру. Если вы хотите поддержать нас - сделайте [пожертвование](/ru/donate/), или станьте [нашим спонсором](/ru/become-a-sponsor/).

Иногда, компании-интеграторы (например хостеры) могут взимать номинальную плату на административные и управленческие расходы для интеграции с Let’s Encrypt.

## Какую техническую поддержку вы предлагаете?

Let’s Encrypt - небольшая компания, мы полагаемся на автоматизацию для снижения издержек. Поэтому мы не можем предложить непосредственную техническую помощь каждому из наших пользователей. Но у нас есть другие способы помочь вам:

1. Полноценная [документация](/ru/docs/)
2. Активный и полезный [форум сообщества](https://community.letsencrypt.org/). Члены нашего сообщества ведут активную работу по поиску ответов на  вопросы, и, скорее всего, на ваш вопрос уже найден ответ.

Вот [видео](https://www.youtube.com/watch?v=Xe1TZaElTAs), которое нам нравится - о значимости большого сообщества.

## Сайт с сертификатом Let's Encrypt используется для фишинга / вредоносного ПО / мошенничества/..., что мне делать?

Мы рекомендуем уведомить об этом сервисы Google Safe Browsing и Microsoft Smart Screen, которые способны эффективно защитить пользователей Интернета.
Ниже ссылка на форму сообщения::

https://www.google.com/safebrowsing/report_badware/

Хотите узнать больше? Ознакомьтесь со статьёй [из нашего блога](/2015/10/29/phishing-and-malware.html).

# <a name="technical">Технические вопросы</a>

## Примет ли мой браузер сертификаты от Let’s Encrypt?

Да, большинство браузеров и операционных систем доверяют нашим сертификатам. Для подробной информации обратитесь к [реестру совместимости](/ru/docs/certificate-compatibility/).

## Does Let's Encrypt issue certificates for anything other than SSL/TLS for websites?

Let’s Encrypt certificates are standard Domain Validation certificates, so you can use them for any server that uses a domain name, like web servers, mail servers, FTP servers, and many more.

Email encryption and code signing require a different type of certificate that Let’s Encrypt does not issue.

## Does Let’s Encrypt generate or store the private keys for my certificates on Let’s Encrypt’s servers?

No. Never.

The private key is always generated and managed on your own servers, not by the Let's Encrypt certificate authority.

## What is the lifetime for Let's Encrypt certificates? For how long are they valid?

Our certificates are valid for 90 days. You can read about why [here](https://letsencrypt.org/2015/11/09/why-90-days.html).

There is no way to adjust this, there are no exceptions. We recommend automatically renewing your certificates every 60 days.

## Will Let’s Encrypt issue Organization Validation (OV) or Extended Validation (EV) certificates?

We have no plans to issue OV or EV certificates.

## Can I get a certificate for multiple domain names (SAN certificates or UCC certificates)?

Yes, the same certificate can contain several different names using the Subject Alternative Name (SAN) mechanism.

## Does Let’s Encrypt issue wildcard certificates?

Yes. Wildcard issuance must be done via ACMEv2 using the DNS-01 challenge. See [this post](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578) for more technical information.

## Is there a Let's Encrypt (ACME) client for my operating system?

There are a large number of [ACME clients](/docs/client-options/) available. Chances are something works well on your operating system. We recommend starting with [Certbot](https://certbot.eff.org/).

## Can I use an existing private key or Certificate Signing Request (CSR)?

Yes, but not all clients support this feature. [Certbot](https://certbot.eff.org/) does.

## What IP addresses does Let's Encrypt use to validate my web server?

We don't publish a list of IP addresses we use to validate, because they may change at any time. In the future we may validate from multiple IP addresses at once.

## I successfully renewed a certificate but validation didn't happen this time - how is that possible?

Once you successfully complete the challenges for a domain, the resulting authorization is cached for your account to use again later. Cached authorizations last for 30 days from the time of validation.
If the certificate you requested has all of the necessary authorizations cached then validation will not happen again until the relevant cached authorizations expire.
