---
title: Let's Encrypt 的运作方式
linkTitle: Let's Encrypt 的运作方式
slug: how-it-works
top_graphic: 3
lastmod: 2019-10-18
---

{{< lastmod >}}

Let's Encrypt 和 [ACME 协议](https://tools.ietf.org/html/rfc8555)的目标是使配置能够自动获取受信任浏览器的证书的 HTTPS 服务器成为可能。这是通过在 Web 服务器上运行证书管理软件（Agent）来达成的。

为了理解该技术的工作原理，让我们来看一下使用支持 Let's Encrypt 的证书管理软件来配置 `https://example.com/` 的流程。

该流程分为两步。首先，管理软件向证书颁发机构证明该服务器拥有域名的控制权。之后，该管理软件就可以申请、续期或吊销该域名的证书。

## 域名认证

Let's Encrypt 通过公钥识别服务器管理员。证书管理软件首次与 Let's Encrypt 交互时，会生成新的密钥对，并向 Let's Encrypt CA 证明服务器控制着一个或多个域名。这类似于创建帐户和向该帐户添加域名的传统证书颁发流程。

为了启动该过程，证书管理软件向 Let's Encrypt CA 询问它需要做什么才能证明它控制 `example.com`。Let's Encrypt CA 将查看所请求的域名并发出一组或多组验证请求。这些验证请求就是管理软件可以用于证明对域名的控制权的不同方式。例如，CA 可能会让证书管理软件（Agent）选择：
* 在 `example.com` 下配置 DNS 记录，或者
* 在 `https://example.com/` 的已知 URI 下放置一个 HTTP 资源

除了验证请求之外，Let's Encrypt CA 还会提供一个 nonce（一次性数字）要求证书管理软件使用私钥对它签名，以证明其对密钥对的控制权。

<div class="howitworks-figure">
<img alt="请求验证 example.com 的控制权"
     src="/images/howitworks_challenge.png"/>
</div>

证书管理软件需要完其中一项提供的验证请求。假设它能够完成上面的第二个任务：它在 `https://example.com` 站点的指定路径上创建了一个文件。证书管理软件还使用其私钥对提供的 nonce（一次性数字）进行签名。完成这些步骤后，证书管理软件会通知 CA 它已准备好完成验证。

然后，CA 的工作就是检查验证是否已经完成。CA 会验证 nonce 上的签名，并尝试从 Web 服务器下载该文件，并确保其具有 CA 需要的内容。

<div class="howitworks-figure">
<img alt="请求代表 example.com 进行操作的授权"
     src="/images/howitworks_authorization.png"/>
</div>

如果 nonce 上的签名有效，并且验证也成功完成，那么由公钥代表的证书管理软件将被授权对 `example.com` 进行证书管理。 我们将证书管理软件使用的密钥对称为 `example.com` 的“授权密钥对”。


## 证书颁发和吊销

一旦代理拥有了授权公私钥，那么请求、续期和撤销证书就会变得很简单——只需发送证书管理消息并使用授权私钥对其进行签名。

为了获得该域名的证书，证书管理软件将创建一个 PKCS#10 [证书签名请求（CSR）](https://tools.ietf.org/html/rfc2986)，要求 Let's Encrypt CA 为指定的公钥颁发 `example.com` 的证书。通常，CSR 中包含与 CSR 中的公钥对应的私钥的签名。证书管理软件还使用 `example.com` 的授权私钥签署整个 CSR，以便 Let's Encrypt CA 知道它已获得授权。

当 Let's Encrypt CA 收到请求时，它会验证这两个签名。如果一切正常，CA 将为 CSR 中的公钥颁发 `example.com` 的证书，并将文件发送回证书管理软件。

<div class="howitworks-figure">
<img alt="为 example.com 申请证书"
     src="/images/howitworks_certificate.png"/>
</div>

申请吊销证书的流程类似。证书管理软件使用 `example.com` 的授权私钥签署一个吊销请求，Let's Encrypt CA 将验证该请求是否已被授权。如果已授权，则将吊销信息发布到正常的吊销通道（即 OCSP）中，以便浏览器等依赖方知道他们不应该接受这个已被吊销的证书。

<div class="howitworks-figure">
<img alt="申请吊销 example.com 的证书的流程"
     src="/images/howitworks_revocation.png"/>
</div>
