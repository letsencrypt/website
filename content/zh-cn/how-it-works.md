---
title: Let's Encrypt 的运作方式
linkTitle: Let's Encrypt 的运作方式
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

Let's Encrypt 和 [ACME 协议](https://tools.ietf.org/html/rfc8555)的目标是实现可信数字证书的自动获取，从而简化 HTTPS 服务器部署中的人工操作。 这一过程是由网页服务器上的 ACME 客户端完成的。

为了理解该技术的工作原理，让我们来了解一下使用 ACME 客户端为 `https://example.com/` 申请证书的流程。

该流程分为两步。 首先 ACME 客户端需要向[证书颁发机构](https://zh.wikipedia.org/zh-cn/%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84) (CA) 证明该服务器拥有域名的控制权， 然后客户端就可以为此域名申请或吊销证书了。

## 域名认证

Let's Encrypt 通过[公钥](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)识别不同的 ACME 客户端。 ACME 客户端首次与 Let's Encrypt 交互时会生成一对密钥，并向 Let's Encrypt 证明其用户对若干域名具有控制权。 这与创建账户并添加域名的传统证书颁发流程类似。

首先，客户端会询问 Let's Encrypt CA 如何才能证明其对 `example.com` 的控制权。 Let's Encrypt CA 会根据申请的域名提供一种或多种验证方式， 客户端可以任选其一。 例如，CA 可能会让客户端选择：

* 在 `example.com` 下配置 DNS 记录，或者
* 在 `http://example.com/` 下的指定网址放置一项 HTTP 资源

<div class="howitworks-figure">
<img alt="询问如何证明对 example.com 的控制权"
     src="/images/howitworks_challenge.png"/>
</div>

客户端需要选择一种验证方式完成验证。 假设它选择了第二种方式，在 `http://example.com` 的指定路径创建了一份文件， 完成这一步骤后，客户端就会通知 CA 准备就绪。

接下来 CA 需要从[多个网络位置](/2020/02/19/multi-perspective-validation)进行核验。

<div class="howitworks-figure">
<img alt="申请验证对 example.com 的控制权"
     src="/images/howitworks_authorization.png"/>
</div>

如果验证顺利通过，那么该公钥对应的客户端就有权管理 `example.com` 的数字证书。

需要注意的是，这一过程不能通过 HTTPS 进行，否则会存在安全风险。 因此，Let's Encrypt 实际上会从多个网络位置同时进行验证， 从而有效防御验证过程中可能遭到的攻击。

## 证书颁发和吊销

客户端得到授权后，证书的申请、续期、吊销操作就简单了，只需将各类证书管理指令用经过授权的密钥签名后发给 CA 即可。

### 证书申请

为了获得该域名的证书，客户端首先创建一份 PKCS#10 [证书签名请求](https://tools.ietf.org/html/rfc2986) (CSR)，向 Let's Encrypt CA 申请为 `example.com` 颁发一份使用指定公钥的证书。 CSR 本身已经由其私钥进行了一次签名， 而客户端还会用 `example.com` 的授权密钥对整个 CSR 再进行一次签名，以便 Let's Encrypt CA 验证其来源。

Let's Encrypt CA 收到请求后对这两份签名进行验证， 如果全部通过，就为 CSR 中的公钥颁发 `example.com` 的证书，并将证书文件发给客户端。 CA 还会将证书上传至各类公开的证书透明化 (CT) 日志系统中， 详情可以在[此处](https://certificate.transparency.dev/howctworks/#pki)了解。

<div class="howitworks-figure">
<img alt="为 example.com 申请证书"
     src="/images/howitworks_certificate.png"/>
</div>

后续的证书续期流程与首次申请类似，先验证域名再申请新的证书。

### 证书吊销

证书吊销的流程也与申请类似， 客户端首先使用有权管理 `example.com` 证书的账户私钥签署一份吊销请求，Let's Encrypt CA 核实该请求后， 通过[证书吊销列表](https://zh.wikipedia.org/zh-cn/%E8%AF%81%E4%B9%A6%E5%90%8A%E9%94%80%E5%88%97%E8%A1%A8) (CRL) 发布吊销信息，从而使浏览器等依赖方停止接受这份已吊销的证书。

<div class="howitworks-figure">
<img alt="申请吊销 example.com 的证书"
     src="/images/howitworks_revocation.png"/>
</div>
