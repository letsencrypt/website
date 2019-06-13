---
title: 本地证书
permalink: /docs/certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

有时候用户想为主机名"localhost"设置一个证书，或者在本地开发环境使用，或者用于需要与web应用程序的本地应用程序。
我们不能为"localhost"提供证书，因为没人唯一拥有它，并且他不是顶级域名".com"或".net"的的子域名。设置你的域名
解析为127.0.0.1，使用DNS解析为它设置证书。然而，这通常很糟糕，并且有更好的选择。

# 对于本地开发

如果你正在开发网站，使用一个像Apache或Nginx的本地web服务将会很有用，在你的浏览器上通过http://localhost:8000/访问它。
然而，web浏览器在HTTP和HTTPS页面上表现方式略有不同。主要的不同是，在HTTPS页面，从HTTP地址加载JavaScript脚本
的请求将被阻止。所以你在本地开发使用HTTP，你添加一个脚本标签可能在你的开发机器上运行很好，但是当部署在生产环境的时候
将会有问题。为了解决这种问题，在你本地web服务器上设置HTTPS会很有用。然而，你一直不想看到证书警告，你如何获取
本地的绿色锁？

最好的选择，生成你自己的证书，自己签名或者本地根签名，并且可以在你的操作系统的信任存储中信任他。然后在你本地web服务器上使用它。
查看下面详情。

# 适用于与网络应用程序通信的本地应用程序

有时开发人员想提供可下载的本地应用程序，可以与网站一起使用，来提供额外的服务。例如，Dropbox和Spotify桌面应用程序
从你的机器扫描文件，但是网络应用程序不允许这样做。一个常用的方法是在本机为这些本地应用程序提供网络服务，让web应用程序
通过XMLHTTPRequest (XHR)或者WebSockets发送请求。web应用程序绝大部分使用HTTPS，意味着浏览器将阻止它生成XHR或者WebSockets
请求到非安全的地址。这被称为混合内容阻止。为了与web应用程序通信，本地的应用程序需要提供一个安全的web服务。

幸运的是，现在的浏览器[认为][mcb-localhost] "http://127.0.0.1:8000/"是一个["可能被信赖"][secure-contexts]的地址
因为它指的是回调地址。发送到127.0.0.1的流量保证不离开你的机器，因此被认为是自动防止网络拦截。这意味着如果你的网站
是HTTPS，如果你在127.0.0.1上提供本地应用程序服务，这两个可以通过XHR高兴地通信。
不幸的是，[localhost 没有相同的待遇][let-localhost].并且WebSockets也没有这样的待遇。

您可能想通过在全局DNS中设置一个恰好解析为127.0.0.1的域名来解决这些限制（例如，localhost.example.com），
为这个域名获取证书，将证书和相应的私钥与您的原生应用程序一起发送，并且告诉你的网站使用https://localhost.example.com:8000/，
而不是http://127.0.0.1:8000/。
*别这么做。*它会使您的用户面临风险，您的证书可能会被撤销。

通过使用一个域名代替IP地址，你使攻击者可以通过中间人（MitM）进行DNS查找并注入指向不同IP地址的响应。
然后攻击者可以伪装成本地应用程序并将虚假回复发送回Web应用程序，这可能会损害您在Web应用程序端的帐户，
具体取决于其设计方式。

在这个场景最成功的MitM是可能的，因为为了使它能够运行，您必须使用本机应用程序将私钥发送到您的证书。
这意味着谁下载你的本地应用程序将得到私钥的一个备份，包括攻击者。这被认为是对您的私钥的妥协，如果您的证书意识到它，
您的证书颁发机构（CA）将撤销您的证书。[许多原生应用程序][mdsp1]因为[发送私钥][mdsp3]导致[他们的证书][mdsp2]被撤销。 

不幸的是，这使本地的应用程序没有很多好的、安全的选择来与他们的web网站通信。如果浏览器未来[加强对来自网络的本地主机的访问][紧缩访问]，
这种问题以后将更加棘手。

另请注意，导出提供特权本机API的Web服务本身就存在风险，因为您不打算授权的网站可以访问它们。
如果要继续这么做，请务必仔细阅读[跨资源共享][cors]，使用Access-Control-Allow-Origin，确保使用一个内存安全的
HTTP解析器，因为即使你不允许访问的起源也可以发送预检请求，这可能会利用解析器中的错误.

# 制作并信任你的证书

每个人都可以在没有CA的帮助下生成证书。唯一的区别就是你自己制作的证书不会被其他人信任。对于本地开发，没有问题。

为localhost生成私钥和自签名证书的最简单方法是使用此openssl命令：

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

你可以使用localhost.crt和localhost.key配置你本地的web服务，并且在你本地可受信任的根列表中安装localhost.crt。

如果您希望在开发证书中更加真实一点，你可以使用[minica][minica]来生成你自己的本地的根证书，并且发布其签署的终端实体
(aka leaf)证书。然后导入根证书，而不是自己签名终端实体证书。这巧妙地改变了浏览器处理cookie存储的方式。

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
