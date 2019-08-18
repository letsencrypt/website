---
title: 吊销证书
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

当证书的相应私钥不再安全时，您应该吊销证书。该情况可能由很多原因造成。 例如， 您可能意外的在某些公共网站上上传了您的私钥信息；黑客可能进入了您的服务器并复制了私钥；黑客可能暂时劫持了您的DNS或者服务器，并验证/颁发了他们控制私钥的证书。

当您在吊销一张Let's Encrypt证书时，Let's Encrypt将使用[在线证书状态协议 (OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)发布该吊销信息,有些浏览器会检查OCSP并决定是否信任该证书。请注意，OCSP有些[基础性问题](https://www.imperialviolet.org/2011/03/18/revocation.html)，所以不是所有浏览器都将检查OCSP信息。但是，吊销已经泄露的证书/私钥十分重要，并且也是Let's Encrypt的[用户协议]({{< ref "/repository.md" >}})中强制要求的。

若您需要吊销一张Let's Encrypt颁发的证书， 您需要通过像[Certbot](https://certbot.eff.org/)之类的ACME客户端使用[ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)吊销。有三种方法可以吊销颁发的证书：

# 从颁发证书的账户吊销证书

如果您最初颁发了证书，并且仍然可以控制用于签发该证书的帐户，则可以使用您的帐户凭据吊销该证书。Certbot将默认尝试使用该方法吊销证书。例如：
```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 使用证书私钥吊销证书

如果您最初没有颁发证书，但是您拥有相应私钥的副本，则可以使用该私钥对吊销请求进行签名。例如，如果您发现私钥被意外公开，即使您不是最初颁发这些证书的人也可以使用此方法吊销使用该私钥的证书。

要使用此方法，首先需要下载要撤销的证书。Let's Encrypt将所有颁发的证书记录到[证书透明度](https://www.certificate-transparency.org/)日志，以便您可以从日志监视器中查找和下载证书。 例如[crt.sh](https://crt.sh/)。

您还需要PEM格式的私钥副本。当您拥有这些文件后，您可以像这样撤销证书：

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# 使用其他授权帐户吊销证书

如果有人在您的主机或DNS遭到破坏后颁发了证书，那么一旦重新获得控制权，您就会想要吊销该证书。为了吊销证书，Let's Encrypt将需要确保您控制该证书中的域名（否则人们可以在未经许可的情况下吊销彼此的证书）！为了验证您对该域名的控制权，您需要使用和您申请Let's Encrypt证书时的相同流程： 您可以在[添加一条DNS TXT记录](https://ietf-wg-acme.github.io/acme/#rfc.section.8.5)，在[网站服务器中放置指定文件](https://ietf-wg-acme.github.io/acme/#rfc.section.8.3), 或提供[特殊TLS证书](https://ietf-wg-acme.github.io/acme/#rfc.section.8.4)。 
通常情况下，ACME客户端将为您处理这些问题。然而，大多数ACME客户端将验证所有权和颁发证书捆绑，若需验证所有权您必须尝试颁发新证书。若您不需要已经颁发的新证书， 您可以将其吊销或删除证书私钥。若您完全不想颁发一张新的证书，您可以尝试添加一个您没有所有权的域名，这将导致证书颁发失败，但是仍旧证明您拥有需要吊销域名的所有权。请运行：

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

并按照指引操作。 若您需要使用HTTP文件（而不是DNS）来证明所有权，请将`--preferred-challenges=dns`替换为`--preferred-challenges=http`.

一旦您验证了要吊销的证书中所有域名的控制权，就可以从[crt.sh](https://crt.sh/)中下载证书，并像您颁发了该证书一样吊销该证书：

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
