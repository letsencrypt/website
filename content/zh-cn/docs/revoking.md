---
title: 吊销证书
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

当证书的相应私钥不再安全时，您应该吊销证书。该情况可能由很多原因造成。例如， 您可能意外的在某些公共网站上上传了您的私钥信息；黑客可能进入了您的服务器并复制了私钥；黑客可能暂时获取了您的服务器或 DNS 配置的控制权，并验证、颁发了他们控制私钥的证书。

当您在吊销 Let's Encrypt 证书时，Let's Encrypt 将使用[在线证书状态协议（OCSP）](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)发布该吊销信息，有些浏览器会检查 OCSP 并决定是否信任该证书。请注意，OCSP 有些[根本性问题](https://www.imperialviolet.org/2011/03/18/revocation.html)，所以不是所有浏览器都将检查 OCSP 信息。但是，吊销私钥已经泄露的证书十分重要，并且也是 Let's Encrypt 的{{<link "用户协议" "/repository" >}}中强制要求的。

若您要吊销 Let's Encrypt 颁发的证书，您需要通过 [Certbot](https://certbot.eff.org/) 之类的 ACME 客户端使用 [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md) 进行操作。有三种方法可以吊销颁发的证书：

# 用颁发证书的账户吊销证书

如果最初是您自己颁发了证书，并且您仍然可以控制用于颁发该证书的帐户，则可以使用您的帐户凭据吊销该证书。Certbot 将默认尝试使用该方法吊销证书。例如：

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 使用证书私钥吊销证书

如果最初不是您颁发了证书，但是您拥有相应私钥的副本，则您可以使用该私钥对吊销请求进行签名。例如，如果您发现有私钥被意外公开，即使您不是最初颁发使用该私钥的证书的人，您也可以使用此方法吊销这些证书。

要使用此方法，首先需要下载要吊销的证书。Let's Encrypt 将所有颁发的证书记录到[证书透明度](https://www.certificate-transparency.org/)日志中，所以您可以从日志监视器（例如 [crt.sh](https://crt.sh/)）中查找并下载证书。

您还需要 PEM 格式的私钥副本。当您拥有这些文件后，您可以像这样吊销证书：

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# 使用其他授权帐户吊销证书

如果有人入侵了您的主机或 DNS 后颁发了证书，那么您一旦重新获得控制权，就会想要吊销该证书。要吊销证书，Let's Encrypt 将需要确保您控制该证书中的域名（否则人们可以在未经许可的情况下吊销彼此的证书）！为了验证您对该域名的控制权，您需要使用和您申请 Let's Encrypt 证书时相同的流程：您可以在[添加一条 DNS TXT 记录](https://ietf-wg-acme.github.io/acme/#rfc.section.8.5)、在[HTTP 服务器上放置指定文件](https://ietf-wg-acme.github.io/acme/#rfc.section.8.3)或提供[特殊 TLS 证书](https://ietf-wg-acme.github.io/acme/#rfc.section.8.4)。通常情况下，ACME 客户端将为您处理这些工作。然而，大多数 ACME 客户端将验证控制权和颁发证书这两个操作捆绑在一起，因此若要验证控制权您必须尝试颁发新证书。若您不需要颁发的新证书，您可以将其吊销或删除证书私钥。若您完全不想颁发一张新的证书，您可以尝试在请求中添加一个不存在的域名，这将导致证书颁发失败，但是仍旧能够证明您对需要吊销的域名的控制权。要这样做，请运行：

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

并按照指引操作。若您想要使用 HTTP 文件（而不是 DNS）来进行验证，请将 `--preferred-challenges=dns` 替换为 `--preferred-challenges=http`。

一旦您验证了要吊销的证书中所有域名的控制权，您就可以从 [crt.sh](https://crt.sh/) 中下载证书，然后和您自己颁发了证书的情况一样，使用如下命令吊销证书：

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
