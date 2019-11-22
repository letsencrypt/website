---
title: Сертификаты для localhost
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

Иногда разработчикам нужен сертификат для доменного имени "localhost" - для локальной разработки, или для распространения внутри нативных приложений для взаимодействия с web-приложением. Let's Encrypt не предоставляет сертификатов для "localhost", т.к. во-первых, у этого доменного имени нет определённого владельца, и во-вторых, он не имеет домена первого уровня - например, ".com" или ".net". Теоретически, возможно настроить выбранное вами доменное имя так, чтобы оно резолвилось на адрес `127.0.0.1`, и выпустить для него сертификат после прохождения проверки DNS. Тем не менее, есть более удачные решения.

# Для локальной разработки

При разработке web-приложения обычно запускают локальный web-сервер (Apache, Nginx), настроенный на `http://localhost:8000/`. Однако, браузеры по-разному обрабатывают HTTP- и HTTPS-запросы. На HTTPS-странице любая попытка загрузить Javascript по HTTP-протоколу будет заблокирована. Поэтому, при локальной разработке, используя HTTP, все скрипты будут загружаться нормально, но после выкладки на боевые HTTPS-сервера возникнут проблемы. Чтобы избежать такой ситуации, нужно настроить доступ по HTTPS на локальном web-сервере. Но как избавиться от постоянных сообщений об ошибке сертификата, как увидеть "зелёный зам**о**к" в адресной строке?

Наилучшим решением будет создание собственного сертификата - самоподписанного, или подписанного локальным корневым сертификатом - и добавление в доверенное хранилище операционной системы. Подробности см.ниже.

# Для нативных приложений, взаимодействующих с web-приложениями

Sometimes developers want to offer a downloadable native app that can be
used alongside a web site to offer extra features. For instance, the Dropbox
and Spotify desktop apps scan for files from across your machine, which a
web app would not be allowed to do. One common approach is for these native
apps to offer a web service on localhost, and have the web app make requests
to it via XMLHTTPRequest (XHR) or WebSockets. The web app almost always uses HTTPS, which
means that browsers will forbid it from making XHR or WebSockets requests
to non-secure URLs. This is called Mixed Content Blocking. To communicate with
the web app, the native app needs to provide a secure web service.

Fortunately, modern browsers [consider][mcb-localhost] `http://127.0.0.1:8000/` to be a
["potentially trustworthy"][secure-contexts]
URL because it refers to a loopback address. Traffic sent to `127.0.0.1` is guaranteed
not to leave your machine, and so is considered automatically secure against
network interception. That means if your web app is HTTPS, and you offer a
native app web service on `127.0.0.1`, the two can happily communicate via XHR.
Unfortunately, [localhost doesn't yet get the same treatment][let-localhost].
Also, WebSockets don't get this treatment for either name.

You might be tempted to work around these limitations by setting up
a domain name in the global DNS that happens to resolve to `127.0.0.1`
(for instance, `localhost.example.com`), getting a certificate for that
domain name, shipping that certificate and corresponding private key
with your native app, and telling your web app to
communicate with `https://localhost.example.com:8000/` instead of `http://127.0.0.1:8000/`.
*Don't do this.* It will put your users at risk, and your certificate may get revoked.

By introducing a domain name instead of an IP address, you make it possible for
an attacker to Man in the Middle (MitM) the DNS lookup and inject a response that
points to a different IP address. The attacker can then pretend to be the local
app and send fake responses back to the web app, which may compromise your
account on the web app side, depending on how it is designed.

The successful MitM in this situation is possible because in order to make it
work, you had to ship the private key to your certificate with your native app.
That means that anybody who downloads your native app gets a copy of
the private key, including the attacker. This is considered a compromise of your
private key, and your Certificate Authority (CA) is required to revoke your
certificate if they become aware of it. [Many native apps][mdsp1] have [had their
certificates][mdsp2] revoked for [shipping their private key][mdsp3].

Unfortunately, this leaves native apps without a lot of good, secure options to
communicate with their corresponding web site. And the situation may get
trickier in the future if browsers further [tighten access to localhost from the
web][tighten-access].

Also note that exporting a web service that offers privileged native APIs is
inherently risky, because web sites that you didn't intend to authorize may
access them. If you go down this route, make sure to read up on [Cross-Origin
Resource Sharing][cors], use Access-Control-Allow-Origin, and make sure to use a
memory-safe HTTP parser, because even origins you don't allow access to can send
preflight requests, which may be able to exploit bugs in your parser.

# Making and trusting your own certificates

Anyone can make their own certificates without help from a CA. The only
difference is that certificates you make yourself won't be trusted by anyone
else. For local development, that's fine.

The simplest way to generate a private key and self-signed certificate for
localhost is with this openssl command:

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

You can then configure your local web server with localhost.crt and
localhost.key, and install localhost.crt in your list of locally trusted roots.

If you want a little more realism in your development certificates, you can use
[minica][minica] to generate your own local root certificate, and issue
end-entity (aka leaf) certificates signed by it. You would then import the root
certificate rather than a self-signed end-entity certificate.

You can also choose to use a domain with dots in it, like `www.localhost`, by
adding it to /etc/hosts as an alias to `127.0.0.1`. This subtly changes how
browsers handle cookie storage.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
