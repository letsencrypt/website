-
--
title: Revoking certificates
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}
当证书的相应私钥不再安全时，你应该撤销证书。 这可能由于几个不同的原因而发生。例如，你可能会意外地在公共网站上共享私钥;
黑客可能会从您的服务器上复制私钥; 或黑客可能会暂时控制您的服务器或DNS配置，并使用它来验证和颁发他们持有私钥的证书。

当你重置一个Let's Encrypt证书，Let's Encrypt会在[Online Certificate Status Protocol(OCSP)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)发布重置的消息，并且一些浏览器会检查OCSP来判断他们是否应该信任某个证书。
请注意,虽然不是所有的浏览器都会检查OCSP[has some fundamental problems](https://www.imperialviolet.org/2011/03/18/revocation.html)，但是重置危险的私钥仍然是重要的行为，并且被Let's Encrypt's[Subscriber Agreement](https://letsencrypt.org/repository/)所要求。

你需要使用[ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)重置Let's Encrypt证书，很像ACME客户端[Certbot](https://certbot.eff.org/).
你需要向Let's Encrypt证明您有权撤销证书。 有三种方法可以做到这一点：


# 通过账号来颁发证书

如果你最初颁发了证书，并且仍然可以控制用于签发该帐户的帐户，则可以使用您的帐户凭据撤消该帐户。Certbot默认尝试做这些。例如:

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 使用证书的私钥

如果你最初没有颁发证书，但是你拥有相应私钥的副本，则可以使用该私钥撤销对吊销请求进行签名。例如，如果你发现私钥被意外公开，你可以使用此方法撤销使用该私钥的证书，即使你不是最初颁发这些证书的人。

使用这种方式，你首先需要下载要重置的证书。让加密将所有证书记录到证书透明度日志，以便你可以从日志监视器（如[crt.sh](https://crt.sh/)）中查找和下载证书。
你还需要PEM格式的私钥副本。获得这些后，你可以像这样撤销证书：

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# 使用其他授权的账号

如果有人在你的主机或DNS遭到破坏后颁发了证书，那么一旦重新获得控制权，你就会想要撤销该证书。 为了撤销证书，Let's Encrypt将需要确保您控制该证书中的域名（否则人们可以在未经许可的情况下撤销彼此的证书）！ 为验证此控件，让我们的加密使用与验证控件发布相同的方法：
你可以[在DNS文本记录中设置一个值](https://ietf-wg-acme.github.io/acme/#rfc.section.8.5)，[在HTTP服务器中放一个文件](https://ietf-wg-acme.github.io/acme/#rfc.section.8.3)，或者提供一个[TLS证书](https://ietf-wg-acme.github.io/acme/#rfc.section.8.4)
通常，ACME客户端将为你处理这些问题。请注意，大多数ACME客户端结合了验证和发布，因此要求验证的唯一方法是尝试发布。 如果你不想要它，则可以撤销生成的证书，或者只是销毁私钥。 如果想要完全避免颁发证书，你可以在命令行中包含不存在的域名，这将导致颁发失败，同时仍然验证其他现有域名。为了做这些事情，运行:

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```
并按照说明操作。如果你用HTTP而不是DNS,把`--preferred-challenges`标记替换为`--preferred-challenges=http`。

一旦您验证了要撤消的证书中所有域名的控制权，就可以从[crt.sh](https://crt.sh/)下载证书，然后继续撤销证书，就像您发布了证书一样

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```