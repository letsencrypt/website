---
title: 证书信任链
linkTitle: 证书信任链（根证书和中间证书）
slug: certificates
top_graphic: 5
lastmod: 2020-02-07
---

{{< lastmod >}}

# 根证书

我们的根证书离线存储在安全的地点。我们使用中间证书（在下节介绍）向用户颁发终端实体证书。

* 活跃证书
  * [ISRG Root X1 (自签名)](/certs/isrgrootx1.pem.txt)

我们设置了如下网站来测试根证书签发的终端实体证书的可用性。

* ISRG Root X1 有效证书
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 已吊销证书
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 过期证书
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中间证书

在正常情况下，Let's Encrypt 颁发的证书将来自“Let's Encrypt Authority X3”。另一个中间证书“Let's Encrypt Authority X4”将被用于灾难恢复，只有在我们无法“Let's Encrypt Authority X3”签发证书时才会被使用。我们已经不再使用X1 和 X2 中间证书。

IdenTrust已对我们的中间证书进行了交叉签名，以提高兼容性。


* 活跃证书
  * [Let's Encrypt Authority X3（由 IdenTrust 交叉签名）](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3（由 ISRG Root X1 签名）](/certs/letsencryptauthorityx3.pem.txt)
* 备用证书
  * [Let's Encrypt Authority X4（由 IdenTrust 交叉签名）](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4（由 ISRG Root X1 签名）](/certs/letsencryptauthorityx4.pem.txt)
* 已退役证书
  * [Let's Encrypt Authority X2（由 IdenTrust 交叉签名）](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2（由 ISRG Root X1 签名）](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1（由 IdenTrust 交叉签名）](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1（由 ISRG Root X1 签名）](/certs/letsencryptauthorityx1.pem.txt)

# 交叉签名

我们的中间证书“Let's Encrypt Authority X3”代表了一对公钥/私钥组合。其中的私钥负责为所有终端实体证书（也称为叶证书）——即我们颁发给您用于服务器使用的证书——签名。

我们的中间证书由 ISRG Root X1 签名。目前，ISRG的根证书已广受信任，但是我们的中间证书仍由IdenTrust的"DST Root CA X3"（现在称为"TrustID X3 Root"）进行交叉签名，以增强客户端兼容性。IdenTrust根证书存在的时间更长，因此与较旧的设备和操作系统（例如Windows XP）具有更好的兼容性。你可以[从 identrust.com 下载"TrustID X3 Root"证书](https://www.identrust.com/support/downloads)（或者，您也可以在此处下载我们的副本：[.pem](/certs/trustid-x3-root.pem.txt)，[.p7b](/certs/trustid-x3-root.p7b)）。

对中间证书进行交叉签名意味着现在有两张证书都可以代表我们的中间证书。一张由 DST Root CA X3 签发，另外一张由 ISRG Root X1 签发。区分这两张证书的最简单方法是查看其签发人（Issuer）字段。

在配置 Web 服务器时，服务器管理员不仅需要配置终端实体证书，也需要配置中间证书以帮助浏览器通过信任链验证终端实体证书由被浏览器信任的根证书签发。几乎所有的服务器管理员都会选择使用由“DST Root CA X3”签发的“Let’s Encrypt Authority X3”证书组成证书信任链。我们推荐的证书颁发软件 [Certbot](https://certbot.org) 将无缝化地配置这一证书信任链。

下图用视觉方式诠释了证书之间的关系：

<img src="/certs/isrg-keys.png" alt="ISRG 证书关系图">

# OCSP 签名证书

这张证书被用于对 Let's Encrypt Authority 中间证书的 OCSP 回复进行签名，这样我们就不用上线我们的根证书私钥来对这些回复签名。OCSP 回复中自动包括了该证书的副本，所以用户无需进行任何操作。下面的证书仅供参考。

* [ISRG Root OCSP X1（由 ISRG Root X1 签名）](/certs/isrg-root-ocsp-x1.pem.txt)

# 证书透明度

我们努力对我们的运营及证书颁发过程保持透明。我们在颁发证书时会将该证书发送到[证书透明度日志](https://www.certificate-transparency.org/)。您可以通过以下链接查看所有 Let's Encrypt 颁发的证书：

* [由 Let's Encrypt Authority X1 颁发的证书](https://crt.sh/?Identity=%25&iCAID=7395)
* [由 Let's Encrypt Authority X3 颁发的证书](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多信息

ISRG 根证书及 Let's Encrypt 中间证书的私钥均存储在硬件安全模块（HSM）上以提供高度保护，防止私钥被盗取。

当前所有 ISRG 私钥均为 RSA 私钥。我们正在[计划生成 ECDSA 私钥](/upcoming-features)。
