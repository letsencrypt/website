---
title: Руководство по интеграции
slug: integration-guide
top_graphic: 1
date: 2016-08-08
lastmod: 2018-06-20
---

{{< lastmod >}}

Этот документ будет полезен хостинг-провайдерам, интеграторам и разработчикам клиентского ПО для Let's Encrypt.

# Планирование изменений

И Let's Encrypt, и технология Web PKI продолжают развиваться. Вам нужно быть готовыми к необходимым обновлениям всех сервисов, которые использует Let's Encrypt. Особое внимание необходимо уделить регулярному обновлению исходного кода ACME-клиентов.

Нами запланированы следующие изменения:

* корневой и промежуточный сертификаты, на основании которых мы выпускаем сертификаты
* алгоритм хэширования для подписи сертификатов
* типы ключей и проверок ключей, для подписи сертификатов
* и сам протокол ACME

Мы будем стараться предупреждать наших пользователей о грядущих изменениях заранее, насколько это возможно. Тем не менее, в случае обнаружения критической уязвимости, мы будем вынуждены внести изменения в течение короткого времени, или даже немедленно. Не стоит вносить в код промежуточные изменения протокола ACME, т.к. они часто обновляются. Рекомендуем использовать содержимое заголовка [`Link: rel="up"`](https://tools.ietf.org/html/draft-ietf-acme-acme-03#section-6.3.1) из ответа от серверов Let's Encrypt.

Аналогично, мы меняем URL ссылки на условия использования сервиса (terms of service, ToS) сразу после их обновления. Избегайте явного указания URL для ToS в исходном коде ACME-клиентов, вместо этого используйте содержимое заголовка [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/draft-ietf-acme-acme-03#section-6.2) из ответа от серверов Let's Encrypt.

Вам также потребуется поддерживать в актуальном состоянии TLS-конфигурацию, для противодействия вновь найденным уязвимостям в наборах шифров или версиях TLS-протокола.

# Уведомления об изменениях

Для получения кратких уведомлений о важных изменениях (таких, как описано выше), подпишитесь на группу рассылки [API Announcements](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836). Рекомендуется как разработчикам клиентского ПО, так и хостинг-провайдерам.

Для получения развёрнутой информации по обслуживанию и остановках работы сервиса, посетите нашу [страницу текущего состояния](https://letsencrypt.status.io/), и нажмите кнопку Subscribe справа вверху. Рекомендуется хостинг-провайдерам.

Убедитесь, что вы указали верный адрес электронной почты для своего ACME-аккаунта. Мы используем этот адрес для отправки уведомлений об истечении срока действия выпущенных для вас сертификатов, а также для взаимодействия с вами в случае проблем, специфичных для вашего аккаунта.

# Кто такой "Подписчик"

В нашем [Соглашении]({{< ref "/repository.md" >}}), под термином "Подписчик" мы понимаем любого владельца закрытого ключа для сертификата. Если вы - хостинг-провадер, то подписчиком являетесь вы, а не ваши клиенты. Если вы разрабатываете клиентское ПО, которое пользователю необходимо развернуть и настроить самостоятельно, то подписчиком будет тот, кто разворачивает клиентское ПО.

Адрес электронной почты, указываемый при создании аккаунта Let's Encrypt (он же "регистрация") должен принадлежать Подписчику. Мы используем этот адрес для отправки предупреждений об истечении срока действия сертификатов, и уведомлений об изменении нашей [политики конфиденциальности]({{< ref "/privacy.md" >}}). Если вы - хостинг-провайдер, эти уведомления должны приходить к вам, а не к вашим клиентам. Идеально было бы настроить список рассылки, чтобы несколько сотрудников могли получать от нас уведомления в ваше отстутствие.

Другими словами, если вы - хостинг-провайдер, вам не нужно передавать нам адреса электронной почты ваших клиентов, или ознакомлять их с политикой конфиденциальности. Вам достаточно выпустить сертификаты для доменов под вашим управлением, и тут же начать их использовать.

# Один аккаунт или несколько?

Согласно протоколу ACME, для авторизации и выпуска сертификатов возможно использование как одного общего аккаунта для нескольких клиентов, так и индивидуальных аккаунтов для каждого клиента в отдельности. Это может быть полезным, например, для хостинг-провайдеров. Создание индивидуальных аккаунтов для клиентов, с последующим их раздельным хранением, поможет в ситуации, когда один или несколько аккаунтов скомпрометированы, но остальные аккаунты в безопасности.

Тем не менее, для большинства хостинг-провайдеров мы рекомендуем использовать один общий аккаунт для всех клиентов, с хорошо охраняемым закрытым ключом для него. Это облегчит определение, кому именно принадлежит тот или иной сертификат, упростит актуализацию контактной информации и управление ограничениями, при необходимости. Мы не сможем эффективно корректировать ограничения в случае использования индивидуальных аккаунтов для ваших клиентов.

# Мультидоменные сертификаты (SAN)

Наша [политика выпуска сертификатов]({{< ref "/docs/rate-limits.md" >}}) ограничивает число доменных имён для одного сертификата - не более 100. Использовать ли вам отдельный сертификат для каждого доменного имени, или сгруппировать доменные имена для нескольких сертификатов - мы оставляем на ваше усмотрение.

Выпуск уникальных сертификатов на каждое доменное имя упрощает добавление или удаление доменов, по мере необходимости. Кроме того, отдельные сертификаты имеют минимальный размер, что ускоряет этап "рукопожатия" между браузером клиента и web-сервером в сетях с низкой пропускной способностью.

С другой стороны, использование мультидоменных сертификатов уменьшает их общее число, что удобнее при их администрировании. Если вам требуется поддержка Windows XP, для которой не реализована технология TLS Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)), вам потребуется уникальный IP-адрес для каждого сертификата. Таким образом, чем больше доменных имён будет включено в сертификат, тем меньше уникальных IP-адресов вам потребуется.

Что касается безопасности, то сертификаты для одного доменного имени, и мультидоменные сертификаты - равнозначны.

# Хранение и повторное использование сертификатов и ключей

Особую ценность Let's Encrypt придаёт возможность автоматического выпуска сертификата для нового сайта. Однако, если ваша инфраструктура предполагает создание новых интерфейсов для одного и того же сайта, целесообразнее использовать сертификат и закрытый ключ из долговременнного хранилища. Новый сертификат ст**о**ит выпускать в случае, когда имеющиеся сертификаты закончились, или истёк срок их действия.

Такой подход поможет Let's Encrypt качественно предоставлять свои услуги как можно б**о**льшему количеству клиентов. Вы же всегда сможете запустить свой новый сайт в любое удобное вам время, независимо от состояния сервисов Let's Encrypt.

К примеру, всё чаще web-мастера используют Docker для создания новых инстансов для сайтов. Если вы настроите контейнеры Docker на выпуск сертификатов в момент старта, вместо использования сертификатов и ключей из долговременного хранилища, то, скорее всего, вы превысите ограничения на использование ресурсов Let's Encrypt. В худшем случае, при пересоздании всех ваши инстансов одновременно, вы окажетесь в ситуации, когда ни один из инстансов не сможет получить сертификат, и ваш сайт окажется недоступным в течение нескольких дней, пока ограничения не будут сняты. Та же проблема возникнет, если по каким-либо причинам сервисы Let's Encrypt будут недоступны.

Некоторые подходы к развёртыванию сайтов проповедуют хранение закрытых ключей строго на тех компьютерах, на которых они были созданы. Эта модель также совместима с Let's Encrypt до тех пор, пока вы обеспечиваете длительный аптайм ваших машин, данных в хранилище, и отслеживаете момент наступления ограничений.

# Выбор способа проверки

Если вы используете проверку http-01 ACME, вам необходимо обеспечить формирование ответа от всех интерфейсов перед уведомлением Let's Encrypt о готовности пройти проверку. Если таких интерфейсов у вас много, задача будет непростой. В этом случае, разумнее выбрать проверку dns-01. Разумеется, если у вас несколько географически разнесённых DNS серверов, необходимо убедиться, что TXT-запись есть на каждом из них.

Кроме того, при использовании проверки dns-01 необходимо удалить старые TXT-записи, чтобы ответ на запрос Let's Encrypt не оказался слишком большим.

Если же вы настаиваете на проверке http-01, возможно, вам пригодятся HTTP-редиректы. Вы можете настроить интерфейсы ваших сайтов на редирект адреса /.well-known/acme-validation/XYZ на validation-server.example.com/XYZ для любого XYZ. Это перенесёт ответственность за выдачу сертификатов на сервер валидации, так что позаботьтесь о его безопасности.

# Центральные серверы валидации

Учитывая вышесказанное, если вы используете множество интерфейсов для сайтов, имеет смысл поддерживать небольшое количество серверов для выпуска сертификатов. Так будет проще организовать редирект для проверки http-01, и реализовать долговременное хранение ключей и сертификатов.

# Реализация сшивания OCSP (OCSP Stapling)

Многие браузеры проверяют сертификат Let's Encrypt с помощью OCSP, когда загружают сайт, что вызывает [проблему производительности и безопасности](https://blog.cloudflare.com/ocsp-stapling-how-cloudflare-just-made-ssl-30/). В идеале, подключение к вашему сайту не должно ожидать результата дополнительного подключения к Let's Encrypt. Кроме того, в запросах OCSP содержится информация о сайтах, которые посещают пользователи. Мы придерживаемся нашей политики конфиденциальности, и не сохраняем данные пользователей из OCSP-запросов, мы в принципе не нуждаемся в получении этих данных. Кроме того, расходы на трафик по обслуживанию OCSP-запросов для всех сайтов с сертификатом Let's Encrypt составили бы значительную долю наших инфраструктурных издержек.

Настроив сшивание OCSP на ваших web-серверах, вы улучшите производительность ваших сайтов, обеспечите конфиденциальность для ваших пользователей, и поможете Let's Encrypt эффективнее обслуживать как можно больше клиентов.

# Настройка брандмауера

Для работы Let's Encrypt необходимо разрешить исходящий трафик для порта 443 на машинах с запущенным ACME-клиентом. Мы не публикуем IP-адреса наших ACME-сервисов, и, как правило, изменяем их без уведомления.

Для проверки http-01, необходимо разрешить входящий трафик для порта 80. Мы не публикуем IP-адреса для выполнения проверки, и. как правило, изменяем их без уведомления.

Обратите внимание: мы рекомендуем всегда настраивать HTTP-доступ до вашего web-сервера, с последующим редиректом на HTTPS. Для пользователей это будет лучше, чем сбром соединения по порту 80, при том же уровне безопасности.

Для всех проверок, необходимо разрешить входящий трафик на порт 53 (TCP и UDP) для ваших DNS-серверов.

# Supported Key Algorithms

Let's Encrypt accepts RSA keys from 2048 to 4096 bits in length, and P-256 and P-384 ECDSA keys. That's true for both account keys and certificate keys. You can't reuse an account key as a certificate key.

Our recommendation is to serve a dual-cert config, offering an RSA certificate by default, and a (much smaller) ECDSA certificate to those clients that indicate support.

# HTTPS by default

For hosting providers, our recommendation is to automatically issue
certificates and configure HTTPS for all hostnames you control, and to offer a
user-configurable setting for whether to redirect HTTP URLs to their HTTPS
equivalents. We recommend that for existing accounts, the setting be disabled by
default, but for new accounts, the setting be enabled by default.

Reasoning: Existing websites are likely to include some HTTP subresources
(scripts, CSS, and images). If those sites are automatically redirected to
their HTTPS versions, browsers will block some of those subresources due to
Mixed Content Blocking. This can break functionality on the site. However,
someone who creates a new site and finds that it redirects to HTTPS will
most likely include only HTTPS subresources, because if they try to include
an HTTP subresource they will notice immediately that it doesn't work.

We recommend allowing customers to set an HTTP Strict-Transport-Security
(HSTS) header with a default max-age of sixty days. However, this setting
should be accompanied by a warning that if the customer needs to move to
a hosting provider that doesn't offer HTTPS, the cached HSTS setting in
browsers will make their site unavailable. Also, both customer and hosting
provider should be aware that the HSTS header will make certificate errors into
hard failures. For instance, while people can usually click through a browser
warning about a name mismatch or expired certificate, browsers do not allow such
a click through for hostnames with an active HSTS header.

# When to Renew

We recommend renewing certificates automatically when they have a third of their
total lifetime left. For Let's Encrypt's current 90-day certificates, that means
renewing 30 days before expiration.

If you are issuing for more than 10,000 hostnames, we also recommend automated
renewal in small runs, rather than batching up renewals into large chunks.
This reduces risk: If Let's Encrypt has an outage at the time you need to
renew, or there is a temporary failure in your renewal systems, it will only
affect a few of your certificates, rather than all of them. It also makes our
capacity planning easier.

You may want to bulk-issue certificates for all of your domains to get started
quickly, which is fine. You can then spread out renewal times by doing a
one-time process of renewing some certificates 1 day ahead of when you would
normally renew, some of them 2 days ahead, and so on.

If you offer client software that automatically configures a periodic batch
job, please make sure to run at a randomized hour and minute during the day,
rather than always running at a specific time. This ensures that Let's Encrypt
doesn't receive arbitrary spikes of traffic at the top of the hour. Since Let's
Encrypt needs to provision capacity to meet peak load, reducing traffic spikes
can help keep our costs down.

# Retrying failures

Renewal failure should not be treated as a fatal error. You should implement
graceful retry logic in your issuing services using an exponential backoff
pattern, maxing out at once per day per certificate. For instance, a reasonable
backoff schedule would be: 1st retry after one minute, 2nd retry after ten
minutes, third retry after 100 minutes, 4th and subsequent retries after one
day. You should of course have a way for administrators to
request early retries on a per-domain or global basis.

Backoffs on retry means that your issuance software should keep track of
failures as well as successes, and check if there was a recent failure before
attempting a fresh issuance. There's no point in attempting issuance hundreds
of times per hour, since repeated failures are likely to be persistent.

All errors should be sent to the administrator in charge, in order to see if
specific problems need fixing.
