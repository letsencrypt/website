---
title: Уведомления об истечении срока действия
slug: expiration-emails
top_graphic: 1
date: 2016-07-02
lastmod: 2019-05-29
---

{{< lastmod >}}

# Подписка на уведомления

Если вы указали адрес электронной почты при создании аккаунта на Let's Encrypt, мы будем автоматически уведомлять вас о необходимости обновить сертификат. Первое уведомления отправляется за 20 дней до истечения срока действия сертификата, второе уведомление отправляется за 10 дней, третье уведомление - за 1 день.

# В каком случае вы получите уведомление об истечении срока действия сертификата

Если ваш сертификат уже обновлён, мы не будем беспокоить вас. Мы решаем, что сертификат требует обновления, если имеется более поздний сертификат с точно таким же набором доменных имён, независимо от того, в чьём аккаунте он создан. Если вы выпустили новый сертификат, в котором отсутствуют доменные имена, в сравнении с предыдущим сертификатом - вы получите уведомление об истечении срока действия предыдущего сертификата. Если текущий используемый сертификат для доменного имени показывает верную дату - никаких дополнительных действий не требуется.

# Отмена подписки на уведомления

The email body has a link to unsubscribe from future notices. If you
hit that link, you won't get any expiration notices for the next year.
The list of "who's unsubscribed" is independent for Staging notices and
Production notices, so you can feel free to unsubscribe from Staging without
affecting your Production status.

Note that your unsubscribe is only valid for one year, so you will have to
renew it every year.

There's not yet a way for us to efficiently re-subscribe
you if you unsubscribe. Our email provider, Mandrill,
[has a manual mechanism that we still need to
automate](https://mandrill.zendesk.com/hc/en-us/articles/205582947-About-Unsubscribes).

However, you can change the email address on your account, which effectively
re-subscribes you. Many common email services treat `yourname+1@example.com` the
same as `yourname@example.com`. So if you update your email address to
`yourname+1@example.com`, you can start getting expiry mail again. With Certbot,
use:

`certbot update_account --email yourname+1@example.com`
