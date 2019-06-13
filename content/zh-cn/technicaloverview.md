---
title: How It Works
slug: how-it-works
top_graphic: 3
---

Let's Encrypt和 [ACME协议](https://ietf-wg-acme.github.io/acme/)的目的是让建立一个没有人为干预的可以自动获取浏览器信任证书的https服务成为可能。这是通过在Web服务器上运行证书管理代理来完成的。

为了理解该技术的工作原理，让我们来看一下使用支持Let's Encrypt的证书管理代理设置`https://example.com/`的过程。

这个过程有两个步骤。 首先，代理向CA验证该Web服务器的域名。 然后，代理可以请求，续订和撤消该域的证书。

## 域名验证

Let's&nbsp;Encrypt通过公钥标识服务器管理员。代理软件第一次与let's encrypt交互时，它会生成一个新的密钥对，并向Let's&nbsp;Encrypt CA证明它控制着一个或多个域名。这和传统的CA过程类似，创建一个账户，并将域名添加到该账户下。

为了启动这个处理程序，代理向Let's Encrypt CA询问为了证明它控制着 `example.com`这个域名到底应该做什么。Let's Encrypt CA将查看请求的域名，并发送一个或多个请求。以下是一些可以让代理证明它控制着这个域名的不同方法。比如，CA可以为代理提供以下选型之一：

* 在`example.com`下设置DNS记录，或者
* 在`https://example.com/`站点上的某个已知的URI设置一个HTTP资源

除了请求之外， Let's Encrypt CA还提供一个随机字符串，代理必须使用其私钥对其进行签名，以证明其控制着密钥对。

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

代理软件完成请求中的其中一个。我们假设它能够完成上面说的第二个任务：在`https://example.com`站点上的指定路径上创建一个文件。代理还使用其私钥对提供的nonce(随机字符串)进行签名。代理完成这些步骤后，会通知CA它已经准备好完成验证。

然后，CA的工作就是检查请求是否已经完成。CA验证nonce上的签名，并尝试从Web服务器下载文件，并确保其具有预期的内容。

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

如果nonce上的签名有效，并且请求有效，那么由公钥识别的代理被授权可以对`example.com`进行证书管理， 我们将代理使用的密钥对称为`example.com`的“授权密钥对”。

## 证书颁发和撤销

一旦代理具有授权密钥对，请求、更新和撤销证书很简单 - 只需发送证书管理消息并使用授权密钥对对其进行签名。

要获取域名的证书，代理需要构造一个PKCS#10[Certificate Signing Request](https://tools.ietf.org/html/rfc2986)请求Let's&nbsp;Encrypt CA使用指定的公钥给`example.com`颁发一个证书。与往常一样，CSR包括一个与CSR中的公钥对应的私钥签名。代理还使用`example.com`的授权密钥对整个CSR进行签名，以便Let's&nbsp;Encrypt CA知道它是授权的。

当let's encrypt CA接收到请求时，它会验证这两个签名。如果一切正常，它将使用CSR中的公钥给`example.com`颁发证书，并将其返回给代理。

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

撤销的工作方式类似。代理使用`example.com`授权的密钥对吊销请求签名，Let's&nbsp;Encrypt CA验证该请求是否获得授权。如果已经获得授权，它会将吊销信息发布到正常的吊销通道（即OCSP）中，这样浏览器等依赖方就可以知道他们不应该接受被吊销的证书。

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>
