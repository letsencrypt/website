---
title: Let's Encrypt运作方式
slug: how-it-works
top_graphic: 3
lastmod: 2018-06-24
---

Let's Encrypt和[ACME协议](https://ietf-wg-acme.github.io/acme/)的目标是使配置能够自动获取受信任浏览器的证书的HTTPS服务器成为可能。这是通过在网站服务器上运行证书管理软件（Agent）来达成的。

为了理解该技术的工作原理，让我们来看一下使用支持Let's Encrypt的证书管理软件（Agent）来配置`https://example.com/`的流程。

该流程分为两步。首先，管理软件向证书颁发机构证明该服务器拥有域名的控制权。之后，该管理软件就可以申请、续期或吊销该域名的证书。

## 域名认证

Let's Encrypt通过公钥识别服务器管理员。证书管理软件（Agent）首次与Let's Encrypt交互时，会生成新的密钥对，并向Let's Encrypt CA证明服务器控制着一个或多个域名。这类似于创建帐户和向该帐户添加域名的传统证书颁发流程。

为了启动该过程，证书管理软件（Agent）向Let's Encrypt CA询问它需要做什么才能证明它控制`example.com`。Let's Encrypt CA将查看所请求的域名并发出一组或多组挑战。这些挑战就是管理软件（Agent）可以用于证明对域名的控制权的不同方式。例如，CA可能会让证书管理软件（Agent）选择： 
* 在`example.com`下配置DNS记录，或者
* 在`https://example.com/`的已知URI下放置一个HTTP资源

除了挑战之外，Let's Encrypt CA还会提供一个nonce（一次性数字）要求证书管理软件（Agent）使用私钥对它签名，以证明其对密钥对的控制权。

<div class="howitworks-figure">
<img alt="请求挑战以验证example.com控制权"
     src="/images/howitworks_challenge.png"/>
</div>

证书管理软件（Agent）需要完其中一项提供的挑战。假设它能够完成上面的第二个任务：它在`https：// example.com`站点的指定路径上创建了一个文件。证书管理软件（Agent）还使用其私钥对提供的nonce（一次性数字）进行签名。完成这些步骤后，证书管理软件（Agent）会通知CA它已准备好完成验证。

然后，CA的工作就是检查挑战是否已经被完成。CA会验证nonce（一次性数字）上的签名，并尝试从网站服务器下载该文件，并确保其具有CA需要的内容。

<div class="howitworks-figure">
<img alt="请求代表example.com进行操作的授权"
     src="/images/howitworks_authorization.png"/>
</div>

如果nonce上的签名有效，并且挑战也成功完成，那么由公钥代表的证书管理软件（Agent）将被授权对`example.com`进行证书管理。 我们将证书管理软件（Agent）使用的密钥对称为`example.com`的“授权密钥对”。


## 证书颁发和吊销

一旦代理拥有了授权公私钥，那么请求、更新和撤销证书就会变得很简单——只需发送证书管理消息并使用授权私钥对其进行签名。

为了获得该域名的证书，证书管理软件（Agent）将创建一个PKCS#10[证书签名请求（CSR）](https://tools.ietf.org/html/rfc2986)，要求Let's Encrypt CA为指定的公钥颁发`example.com`的证书。通常，CSR中包含与CSR中的公钥对应的私钥的签名。证书管理软件（Agent）还使用`example.com`的授权私钥签署整个CSR，以便Let's Encrypt CA知道它已获得授权。

当Let's Encrypt CA收到请求时，它会验证这两个签名。如果一切正常，CA将为CSR中的公钥颁发`example.com`的证书，并将文件发送回证书管理软件(Agent)。

<div class="howitworks-figure">
<img alt="为example.com申请证书"
     src="/images/howitworks_certificate.png"/>
</div>

申请吊销证书的流程类似。证书管理软件（Agent）使用`example.com`的授权私钥签署一个吊销请求，Let's Encrypt CA将验证该请求是否已被授权。如果已授权，则将吊销信息发布到正常的吊销通道（即OCSP）中，以便浏览器等依赖方知道他们不应该接受这个已被吊销的证书。

<div class="howitworks-figure">
<img alt="申请吊销example.com的证书的流程"
     src="/images/howitworks_revocation.png"/>
</div>
