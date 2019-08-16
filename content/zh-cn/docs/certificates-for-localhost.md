---
title: localhost（本地）证书
slug: certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

有时，人们希望获得主机名为“localhost”的证书，用于本地开发，或者使用需要与Web应用程序通信的本机应用程序进行分发。 Let's Encrypt不能为“localhost”提供证书，因为没有人真正唯一拥有它，并且它不是“.com”或“.net”等顶级域名。 您可以将您自己的域名设置解析至“127.0.0.1”，并使用DNS验证获取证书。 然而，通常情况下这是个坏主意，您其实有更好的选择。

# 用于本地开发目的

如果您正在开发Web应用程序，那么您可能需要运行Apache或Nginx等本地网站服务器并在浏览器中通过`http://localhost:8000/`访问。但是，浏览器在HTTP与HTTPS页面上的行为方式略有不同。主要区别：在HTTPS页面上，将不会处理任何从HTTP链接加载的JavaScript的任何请求。 因此，若您在本地使用HTTP开发，您添加的脚本可能能在本地开发计算机正常工作，但是在部署至HTTPS站点时将出现问题。若您需解决此类问题， 您可能需要在本地网络服务器配置HTTPS版本。但是，您不希望始终看到证书错误警告。 您如何在访问本地网页版本时获得安全锁（绿色安全锁）？

最佳选择：生成您自己的证书，可以是自签名的，也可以是由本地根签名的，并且可以在您的操作系统的信任存储中信任它。 然后在本地网站服务器中使用该证书。 请参阅下文了解详情。

# 适用于与网络应用交谈的原生应用

有时开发人员希望提供可下载的本机应用程序，可以与网站一起使用以提供额外的功能。 例如，Dropbox和Spotify桌面应用程序会扫描您机器上的文件，而网页版不会被允许进行此操作。 一种常见的解决方法是让这些本机应用程序在localhost上提供网页服务，并让网页应用程序通过XMLHTTPRequest（XHR）或WebSockets向它发出请求。 网页应用程序几乎必须使用HTTPS，这意味着浏览器将禁止它将XHR或WebSockets请求发送到非安全链接。 这称为混合内容阻止。 要与网页应用程序通信，本机应用程序需要提供安全的网页服务。

值得庆幸的是，现代浏览器[认为][mcb-localhost] `http://127.0.0.1:8000/`是一个[“可信赖的”][secure-contexts]链接，因为它引用了一个环回地址。 发送到`127.0.0.1`的流量保证不会离开您的计算机，因此被视为自动防止网络拦截。 这意味着如果您的网络应用程序是HTTPS，并且您在`127.0.0.1`上提供本机应用程序的网络服务，则两者可以通过XHR进行通信。不幸的是，[localhost不会被认为默认安全][let-localhost]。 此外，WebSockets不会将这两个名称记录为安全。

您可能想通过在全局DNS中设置域名来解决这些限制，该域名恰好解析为`127.0.0.1`（例如，`localhost.example.com`），获取该域名的证书，将该证书和相应的私钥与您的本机应用程序一起发送，并告诉您的网页应用程序与`https://localhost.example.com:8000/`而不是`http://127.0.0.1:8000/`进行通信。 *请勿这样做。*它会使您的用户面临风险，您的证书也可能会被吊销。

通过使用域名而不是IP地址，攻击者可以使用中间人攻击（MitM）进行DNS查找，并注入指向不同IP地址的响应。 然后攻击者可以伪装成本地应用程序并将虚假回复发送回Web应用程序，取决于其设计方式，这可能会损害您在网页应用程序端的帐户。

在这种情况下成功的MitM是可能的，因为为了使其工作，您必须将私钥，公钥和应用程序一起分发。 这意味着下载应用程序的任何人都会获得私钥的副本，包括攻击者。 这被视为您泄露了您的私钥，并且如果您的CA发现了该泄露，则需要您的证书颁发机构（CA）吊销您的证书。[许多本机应用程序][mdsp1][因为将私钥和程序一起发送][mdsp3][被CA吊销证书][mdsp2]。

不幸的是，这使得本机应用程序没有很多好的，安全的选项来与相应的网站进行通信。如果浏览器进一步[缩进对来自网络的本地主机的访问][tighten-access]，将来情况可能会变得更加棘手。

另请注意，导出提供特权本机API的Web服务本身就存在风险，因为未经授权的网站可能会访问它们。 如果您要继续进行该行为，请务必阅读[跨源资源共享][cors]，使用Access-Control-Allow-Origin，并确保使用包括“内存安全”的HTTP解析器，因为即使是被禁止访问的网页也可能会利用解析器中的错误发送预检请求。

# 制作并信任您自己的证书

任何人都可以在没有CA帮助的情况下制作自己的证书。 唯一的区别是您自己制作的证书不会被其他任何人信任。 对于当地的发展，那没关系。

为localhost生成私钥和自签名证书的最简单方法是使用以下openssl命令：

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

然后，您可以使用localhost.crt和localhost.key配置本地网站服务器，并在本地受信任的根列表中安装localhost.crt。

如果您希望在开发证书中更加逼真，可以使用[minica][minica]生成自己的本地根证书，并颁发由其签名的终端（又称叶）证书。 然后，您将导入根证书而不是自签名的终端证书。

您还可以选择使用带有点的域，例如`www.localhost`，将其作为别名添加到/etc/hosts作为`127.0.0.1`的别名。这巧妙地改变了浏览器处理cookie存储的方式。

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
