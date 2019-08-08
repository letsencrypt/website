---
Title: 工作方法
slug: how-it-works
top_graphic: 3
date: 2019-08-08
---

部署HTTPS服务器时，免值守自动获取浏览器证书是Let's&nbsp;Encrypt与[ACME 协议](https://ietf-wg-acme.github.io/acme/)的主要作用，您可以通过在网页服务器上运行一个证书管理器实现。

为了更好地了解其技术原理，让我们一起来看看如何使用Let's&nbsp;Encrypt兼容的证书管理器搭建`https://example.com/`。

该流程可以分为两步，管理器首先向CA证明它拥有该域名，然后就能申请、续签或吊销该域名的证书。

## 域名验证

Let's&nbsp;Encrypt通过公钥鉴别服务器管理员。当证书管理器首次与Let's&nbsp;Encrypt通信时，它会生成新的密钥对，并向Let's&nbsp;Encrypt CA证明这台服务器拥有其声明的域名。这类似于传统的CA流程：注册帐号，然后往帐号添加域名。

首先，证书管理器需询问Let's Encrypt CA：我要怎么证明拥有`example.com`？Let's Encrypt CA收到询问后，会检查域名并向管理器提出一系列挑战。管理器可以通过多种方式证明其域名控制权，比如CA会让管理器任选一项：

* 在`example.com`下生成一条指定的DNS记录，或
* 在`https://example.com/`的服务器上生成一张指定URI的HTTP网页

Let's Encrypt CA还会在挑战中夹带一个不重复的数字，证书管理器必须用其私钥签名该数字，来证明其密钥对的控制权。

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

证书管理器需选择并完成其中一项挑战。假设其选择了第二项挑战：管理器在`https://example.com`网站的指定目录下创建一个文件，并用私钥对CA发来的不重复数字进行签名。完成后它会告知CA执行结果，准备接受验证。

下一步，CA检查证书管理器是否完成了挑战，它会查验不重数字的签名、尝试下载服务器上的指定文件并判断其中内容是否正确。

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

如果不重数字的签名正确，且证书管理器成功完成了URI挑战，那么持有这个公钥的管理器将被授权管理`example.com`的证书。我们将管理器的这对密钥称为`example.com`的“授权密钥对”。





一旦证书管理器获得了授权密钥对，申请、续签和吊销证书将变得非常简单——发送证书管理消息，并用授权密钥对对消息进行签名即可。

要获得域名的证书，证书管理器需创建一个PKCS#10的[证书签名申请](https://tools.ietf.org/html/rfc2986)（Certificate Signing Request，简称CSR），这个文件用于向Let's&nbsp;Encrypt CA请求包含特定公钥的`example.com`证书。向之前一样，CSR包含了一个签名，这个签名由私钥完成，且这个私钥对应CSR中声明的公钥。证书管理器再用`example.com`的授权密钥签名整个CSR，Let's&nbsp;Encrypt CA即可确定请求的合法性。

Let's&nbsp;Encrypt CA收到请求后开始验证上述两个签名，如果一切正常，则签发一份关于CSR公钥的`example.com`证书，并发送给管理器。

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

吊销过程也类似于签发过程。证书管理器用`example.com`的授权密钥对，签名一份吊销请求，Let's&nbsp;Encrypt CA验证请求合法性。若合法，CA向正常吊销渠道发布吊销信息（比如OCSP），如此一来浏览器之类的下游节点就知道不该再信任已吊销的证书。

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>

