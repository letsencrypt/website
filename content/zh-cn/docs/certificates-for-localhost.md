---
title: localhost 证书
slug: certificates-for-localhost
date: 2017-12-21
lastmod: 2017-12-21
show_lastmod: 1
---


有时，人们希望获得主机名为“localhost”的证书，以用于本地开发或与需要与 Web 应用程序通信的原生应用程序一同分发。 Let’s Encrypt 不能为“localhost”提供证书，因为没有人唯一地拥有它，并且它不在“.com”或“.net”等顶级域名下。 您可以将您自己的域名设置为解析至“127.0.0.1”，并使用 DNS 验证获取证书。 然而，通常情况下这是个坏主意，您其实有更好的选择。

# 用于本地开发目的

如果您正在开发 Web 应用程序，那么您可能需要运行 Apache 或 Nginx 等本地 Web 服务器并在浏览器中通过 `http://localhost:8000/` 访问它。 但是，浏览器在 HTTP 与 HTTPS 页面上的行为方式略有不同。 主要区别是：在 HTTPS 页面上，从 HTTP 链接加载 JavaScript 的请求都会被阻断。 因此，若您在本地使用 HTTP 开发，您添加的脚本可能能在本地开发环境正常工作，但是将在部署至 HTTPS 站点时出现问题。 若要发现此类问题，您可能需要在本地 Web 服务器配置 HTTPS。 但是，您不希望始终看到证书错误警告。 那么如何在访问本地网页版本时让浏览器显示那个绿色锁标志呢？

最佳选择是：生成您自己的证书（自签名的或由本地根证书签名），并且可以在您的操作系统的受信证书存储中信任它。 然后在本地网页服务器中使用该证书。 请参阅下文了解详情。

# 用于与 Web 应用通信的原生应用

有时开发人员希望提供可下载的原生应用程序，可以与网站一起使用以提供额外的功能。 例如，Dropbox 和 Spotify 桌面应用程序会扫描您机器上的文件，而网页版无法进行此操作。 一种常见的解决方案是让这些原生应用程序在 localhost 上提供 Web 服务，由 Web 应用通过 XMLHTTPRequest (XHR) 或 WebSockets 与之通信。 Web 应用程序基本上都使用了 HTTPS，这意味着浏览器将禁止它向非安全链接发送 XHR 或 WebSockets 请求。 这称为混合内容阻断。 要与 Web 应用程序通信，原生应用程序需要提供安全的 Web 服务。

幸运的是，现代浏览器[认为][mcb-localhost] `http://127.0.0.1:8000/` 是一个 [“可能可信赖的”][secure-contexts]链接，因为它指向一个环回地址。 发送到 `127.0.0.1` 的流量肯定不会离开您的计算机，因此它自然而然地不受网络拦截的影响。 这意味着如果您的 Web 应用程序使用HTTPS，并且您在 `127.0.0.1` 上提供原生应用程序的 Web 服务，则两者可以通过 XHR 进行通信。 不幸的是，[localhost 没有受到相同的待遇][let-localhost]。 此外，在 WebSockets 中这两类地址都不会受到特殊对待。

您可能会想到一些规避的方法，例如在公网 DNS 中注册一个解析到 `127.0.0.1` 的域名（如 `localhost.example.com`），申请该域名的证书，并将证书及私钥与原生应用程序共同分发，这样就能让 Web 应用与 `https://localhost.example.com:8000/`（而非 `http://127.0.0.1:8000/`）通信了。 *但请不要这样做。*这会给您的用户带来安全风险，您的证书也可能会被吊销。

由于您使用的是域名而非 IP 地址，攻击者可以作为中间人 (MitM) 劫持 DNS 查询，将域名指向其他 IP 地址。 这可能会导致您在 Web 应用程序上的帐户遭到入侵，具体取决于其设计方式。

这种中间人攻击之所以能够奏效，是因为证书的私钥必然要和原生应用程序捆绑分发， 这意味着任何人只要下载了应用程序就能获得私钥，包括攻击者在内。 这等同于您的私钥泄露，证书颁发机构一旦知情就有义务将该证书吊销。 [很多原生应用程序][mdsp1]都是因为[携带私钥][mdsp3]而被[吊销了证书][mdsp2]。

不幸的是，这也意味着原生应用很难找到足够安全的途径与其网站通信。 如果浏览器进一步[缩紧来自 Web 的对 localhost 的访问][tighten-access]，将来情况可能会变得更加棘手。

还需要注意的是，原生应用程序通过 Web API 提供权限较高的功能本身就存在风险，因为这样的接口可能会被其他网站恶意调用。 如果您执意这么做，请务必了解[跨源资源共享][cors]并使用 Access-Control-Allow-Origin。另外还要确保使用内存安全的 HTTP 解析器，因为其他网站即使无权调用接口也可以发送预检请求，从而利用解析器中的漏洞发动攻击。

# 制作并信任您自己的证书

任何人都可以在没有 CA 帮助的情况下制作自己的证书。 唯一的区别是您自己制作的证书不会被其他任何人信任。 当然如果用于本地开发，那没什么关系。

为 localhost 生成私钥和自签名证书的最简单方法是使用以下 openssl 命令：

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

然后，您就可以使用 localhost.crt 和 localhost.key 配置本地 Web 服务器，并在本地的受信任根证书列表中安装 localhost.crt。

如果您希望您的开发用证书更加逼真，您可以使用 [minica][minica] 生成自己的本地根证书，并颁发由其签名的终端实体证书（又称叶证书）。 然后，您就可以导入根证书而不是自签名的终端实体证书。

您还可以选择使用多级域名，例如将 `www.localhost` 作为 `127.0.0.1` 的别名加入 /etc/hosts 中， 这对于浏览器处理 Cookie 的方式有一定的影响。

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
