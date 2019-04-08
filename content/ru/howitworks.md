---
title: Приступая к работе
slug: getting-started
top_graphic: 3
aliases : [/howitworks]
---

Для использования протокола HTTPS для доступа к вашему сайту, необходим сертификат
(файл) Центра Сертификации (далее ЦС). Let's Encrypt - один из таких Центров.
Чтобы получить сертификат для доменного имени сайта, нужно подтвердить право
на управление доменом. Let's Encrypt использует для этого специально ПО -
[протокол ACME](https://ietf-wg-acme.github.io/acme/), запускаемое на web-сервере.

Чтобы понять, какой способ получения сертификата подойдёт вам лучше всего, уточните,
есть ли у вас [доступ по SSH](https://en.wikipedia.org/wiki/Shell_account) к
операционной системе (ОС) web-сервера. Если вы администрируете сайты с помощью панели
управления типа [cPanel](https://cpanel.com/), [Plesk](https://www.plesk.com/), или
[WordPress](https://wordpress.org/) - скорее всего, такого доступа у вас нет.
В случае сомнений - уточните наличие доступа у сервис-провайдера.

# Есть доступ по SSH

Мы рекомендуем использовать [Certbot]. Этот ACME-клиент автоматически создаёт и устанавливает
сертификаты, не требуя остановки web-сервера. Он прост в использовании, работает на большинстве
операционных систем, и отлично документирован. Также в наличии экспертный режим, с расширенным
набором настроек. [Зайдите на сайт][Certbot], чтобы получить инструкции по установке и использованию
на вашем web-сервере.

Если вас не устраивает [Certbot], или же вы хотите попробовать альтернативные варианты - есть
[множество других ACME-клиентов](/docs/client-options/), со своей документацией. Экспериментировать
с различными ACME-клиентами лучше всего на наших [тестовых серверах](/docs/staging-environment/),
во избежание срабатывания [ограничений](/docs/rate-limits/).

[Certbot]: https://certbot.eff.org/  "Certbot"

# Нет доступа по SSH

Идеальный вариант - если панель управления сайтом имеет поддержку Let's Encrypt (возможно,
потребуется активировать эту опцию). В этом случае компания-хостер может запрашивать
сертификаты от вашего имени, устанавливать и обновлять их автоматически.
[Ознакомьтесь со списком компаний](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920),
поддерживающих интеграцию с Let's Encrypt. Если ваш хостер в их числе - обратитесь к документации
на сайте компании для работы с сертификатами.


If your hosting provider does not support Let's Encrypt, you can contact them to
request support. We do our best to make it very easy to add Let's Encrypt
support, and providers are often happy to hear suggestions from customers!

If your hosting provider doesn't want to integrate Let's Encrypt, but does
support uploading custom certificates, you can install Certbot on your own
computer and use it in [manual mode](https://certbot.eff.org/docs/using.html#manual).
In manual mode, you upload a specific file to your website to prove your
control. Certbot will then retrieve a certificate that you can upload to your
hosting provider. We don't recommend this option because it is time-consuming
and you will need to repeat it several times per year as your certificate
expires. For most people it is better to request Let's Encrypt support from your
hosting provider, or switch providers if they do not plan to implement it.

# Getting Help

If you have questions about selecting an ACME client, or about using a particular client, or anything else related to Let's Encrypt, please try our [helpful community forums](https://community.letsencrypt.org/).
