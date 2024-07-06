---
title: Let's Encrypt 的运作方式
linkTitle: Let's Encrypt 的运作方式
slug: how-it-works
lastmod: 2024-06-26
show_lastmod: 1
---


Let's&nbsp;Encrypt 和 [ACME 协议](https://tools.ietf.org/html/rfc8555)的目标是实现可信数字证书的自动获取，从而简化 HTTPS 服务器部署中的人工操作。  这一目标是由 Web 服务器上的证书管理软件完成的。

为了理解该技术的工作原理，让我们来看一下使用支持 Let's&nbsp;Encrypt 的证书管理软件来配置 `https://example.com/` 的流程。

该流程分为两步。  首先，管理软件向证书颁发机构证明该服务器拥有域名的控制权。  之后，该管理软件就可以申请、续期或吊销该域名的证书。

## 域名认证

Let's&nbsp;Encrypt 通过公钥识别服务器管理员。  证书管理软件首次与 Let's&nbsp;Encrypt 交互时，会生成新的密钥对，并向 Let's&nbsp;Encrypt CA 证明服务器控制着一个或多个域名。  这类似于创建帐户和向该帐户添加域名的传统证书颁发流程。

为了启动该过程，证书管理软件向 Let's Encrypt CA 询问它需要做什么才能证明它控制 `example.com`。  Let's Encrypt CA 会根据申请的域名提供一种或多种验证方式，   管理软件可以任选其一证明域名控制权。  例如，CA 可能会让证书管理软件（Agent）选择：

* 在 `example.com` 下配置 DNS 记录，或者
* 在 `http://example.com/` 下的指定网址放置一项 HTTP 资源

除了验证方式外，Let's Encrypt CA 还会提供一个一次性的数字 nonce，管理软件需要用私钥予以签名，从而证明该软件确实持有密钥。

<div class="howitworks-figure">
<img alt="询问如何证明对 example.com 的控制权"
     src="/images/howitworks_challenge.png"/>
</div>

证书管理软件需要选择一种验证方式完成验证。   假设它选择了第二种方式，在 `http://example.com` 的指定路径创建了一份文件，  并用私钥对收到的 nonce 进行数字签名。  完成这些步骤后，证书管理软件会通知 CA 它已准备好完成验证。

接下来 CA 需要从[多个网络位置](/2020/02/19/multi-perspective-validation)进行核验。  CA 会验证 nonce 的签名，并尝试从 Web 服务器下载指定文件，确认内容准确无误。

<div class="howitworks-figure">
<img alt="申请验证对 example.com 的控制权"
     src="/images/howitworks_authorization.png"/>
</div>

如果 nonce 的签名有效，验证也顺利通过，那么该公钥对应的证书管理软件就有权管理 `example.com` 的数字证书。  证书管理软件使用的密钥称为 `example.com` 的“授权密钥”。


## 证书颁发和吊销

管理软件具备授权密钥后，证书的申请、续期、吊销操作就简单了，只需将各类证书管理指令用授权密钥签名后发给 CA 即可。

为了获得该域名的证书，证书管理软件将创建一个 PKCS#10 [证书签名请求（CSR）](https://tools.ietf.org/html/rfc2986)，要求 Let's&nbsp;Encrypt CA 为指定的公钥颁发 `example.com` 的证书。  CSR 本身已经由其私钥进行了一次签名，  而证书管理软件还会用 `example.com` 的授权密钥对整个 CSR 再进行一次签名，以便 Let's&nbsp;Encrypt CA 验证其来源。

Let's&nbsp;Encrypt CA 收到请求后对这两份签名进行验证，  如果全部通过，就为 CSR 中的公钥颁发 `example.com` 的证书，并将证书文件发给管理软件。 CA 还会将证书上传至各类公开的证书透明化日志系统中， 详情可以在[此处](https://certificate.transparency.dev/howctworks/#pki)了解。

<div class="howitworks-figure">
<img alt="为 example.com 申请证书"
     src="/images/howitworks_certificate.png"/>
</div>

申请吊销证书的流程类似。  证书管理软件使用 `example.com` 的授权私钥签署一个吊销请求，Let's&nbsp;Encrypt CA 将验证该请求是否已被授权。  如果已授权，则通过正常的吊销通道（即 OCSP）发布吊销信息，使浏览器等依赖方不再接受这份证书。

<div class="howitworks-figure">
<img alt="申请吊销 example.com 的证书"
     src="/images/howitworks_revocation.png"/>
</div>

