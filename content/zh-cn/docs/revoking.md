---
title: 吊销证书
slug: revoking
date: 2017-06-08
lastmod: 2021-10-15
show_lastmod: 1
---


当证书不再安全使用时，您应该吊销它。 该情况可能由很多原因造成。 例如， 您可能意外的在某些公共网站上上传了您的私钥信息；黑客可能进入了您的服务器并复制了私钥；黑客可能暂时获取了您的服务器或 DNS 配置的控制权，并验证、颁发了他们控制私钥的证书。

当您在吊销 Let's Encrypt 证书时，Let's Encrypt 将使用[在线证书状态协议（OCSP）](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)发布该吊销信息，有些浏览器会检查 OCSP 并决定是否信任该证书。 请注意，OCSP 有些[根本性问题](https://www.imperialviolet.org/2011/03/18/revocation.html)，所以不是所有浏览器都将检查 OCSP 信息。 但是，吊销私钥已经泄露的证书十分重要，并且也是 Let's Encrypt 的[用户协议](/repository)中强制要求的。

若您要吊销 Let's Encrypt 颁发的证书，您需要通过 [Certbot](https://certbot.eff.org/) 之类的 ACME 客户端使用 [ACME API](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md) 进行操作。 您需要向 Let's Encrypt 证明您有权吊销证书。 有三种方法可以验证所有权：使用签发证书的原帐户，使用另一个授权签发的帐户，或使用证书私钥。

# 指定吊销原因代码

当吊销证书时，Let's Encrypt用户应该选择以下原因代码：

* 未提供任何理由或 `unspecified` (RFC 5280 CRLReason #0)
  - 当下面的原因代码不适用于吊销请求时，用户不能提供除“未指定”以外的理由代码。
* `keyCompromise` (RFC 5280 CRLReason #1)
  - 当用户有理由相信其证书的私钥已被泄露时，必须选择吊销原因“keyCompromise”。例如，未经授权的人可以访问证书的私钥。
  - 如果吊销请求是使用证书私钥而不是用户帐户私钥签署的，Let's Encrypt 可能会忽略请求中的吊销原因并将原因设置为“keyCompromise”。
* `superseded` (RFC 5280 CRLReason #4)
  - 用户在申请新证书以替换其现有证书时，应选择吊销原因“被取代”。
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - 当用户不再拥有证书中的所有域名或由于停止网站而不再使用证书时，应选择吊销原因“停止运营”。
  - 如果吊销请求来自未请求相关证书但已证明对证书中所有标识符的控制权的用户帐户，Let's Encrypt 可能会忽略请求中的吊销原因并将原因设置为“cessationOfOperation”。

使用除以上外的任何原因代码的吊销请求将被拒绝。

# 用颁发证书的账户吊销证书

如果最初是您自己颁发了证书，并且您仍然控制用于颁发该证书的帐户，则可以使用您的帐户凭据吊销该证书。 Certbot 将默认尝试使用该方法吊销证书。 例如：

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 使用其他授权帐户吊销证书

如果有人入侵了您的主机或 DNS 后颁发了证书，那么您一旦重新获得控制权，就会想要吊销该证书。 要吊销证书，Let's Encrypt 将需要确保您控制该证书中的域名（否则人们可以在未经许可的情况下吊销彼此的证书）！

为了验证您对该域名的控制权，您需要使用和您申请 Let's Encrypt 证书时相同的流程：您可以[添加一条 DNS TXT 记录](https://tools.ietf.org/html/rfc8555#section-8.4)或在[HTTP 服务器上放置指定文件](https://tools.ietf.org/html/rfc8555#section-8.3)。 通常情况下，ACME 客户端将为您处理这些工作。 然而，大多数 ACME 客户端将验证控制权和颁发证书这两个操作捆绑在一起，因此若要验证控制权您必须尝试颁发新证书。 若您不需要颁发的新证书，您可以将其吊销或删除证书私钥。

若您完全不想颁发一张新的证书，您可以尝试在请求中添加一个不存在的域名，这将导致证书颁发失败，但是仍旧能够证明您对需要吊销的域名的控制权。 例如：

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

并按照指引操作。 若您想要使用 HTTP 文件（而不是 DNS）来进行验证，请将 `--preferred-challenges=dns` 替换为 `--preferred-challenges=http`。

一旦您验证了要吊销的证书中所有域名的控制权，您就可以从 [crt.sh](https://crt.sh/) 中下载证书，然后和您自己颁发了证书的情况一样，使用如下命令吊销证书：

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# 使用证书私钥吊销证书

如果最初不是您颁发了证书，但是您拥有相应私钥的副本，则您可以使用该私钥对吊销请求进行签名。 例如，如果您发现有私钥被意外公开，即使您不是最初颁发使用该私钥的证书的人，您也可以使用此方法吊销这些证书。

若要使用此方法，您将首先需要以PEM格式复制私钥。

然后，如果您还没做，请下载要吊销的证书。 Let's Encrypt 颁发的所有证书都会录入[证书透明化](https://www.certificate-transparency.org/)日志，所以您可以在 [crt.sh](https://crt.sh/) 等日志监视系统中查找并下载证书。 搜索匹配 `SubjectPublicKeyInfo` (SPKI) 字段将找到使用私钥的所有证书。 从私钥中提取SPKI哈希值：
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

一旦您拥有私钥和证书，您就可以吊销该证书：

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
