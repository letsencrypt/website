---
title: 证书信任链
slug: certificates
top_graphic: 5
lastmod: 2019-05-01
---



# 根证书

我们的根证书离线存储在安全的地点。 我们使用中间证书（在下节介绍）向用户颁发终端实体证书。

* 活跃证书
  * [ISRG Root X1 (自签名)](/certs/isrgrootx1.pem.txt)

我们设置了如下网站来测试根证书签发的终端实体证书可用性。

* ISRG Root X1有效证书
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1已吊销证书
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1过期证书
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 中间证书

IdenTrust交叉签名了我们的中间证书。这允许我们在将我们自己的根证书添加到浏览器中的过程中，确保我们的终端实体证书被所有主流浏览器信任。

在正常情况下，Let's Encrypt颁发的证书将来自“Let's Encrypt Authority X3”。另一个中间证书“Let's Encrypt Authority X4”将被用于灾难恢复，只有在我们无法“Let's Encrypt Authority X3”签发证书时才会被使用。X1和X2是我们的第一代中间证书，已经被能更好兼容Windows XP的新中间证书（X3/X4）替换。


* 活跃证书
  * [Let's Encrypt Authority X3（由IdenTrust交叉签名）](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3（由ISRG Root X1签名）](/certs/letsencryptauthorityx3.pem.txt)
* 备用证书
  * [Let's Encrypt Authority X4（由IdenTrust交叉签名）](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4（由ISRG Root X1签名）](/certs/letsencryptauthorityx4.pem.txt)
* 已退役证书
  * [Let's Encrypt Authority X2（由IdenTrust交叉签名）](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2（由ISRG Root X1签名）](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1（由IdenTrust交叉签名）](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1（由ISRG Root X1签名）](/certs/letsencryptauthorityx1.pem.txt)

# 交叉签名

我们的中间证书“Let's Encrypt Authority X3”代表了一对公钥/私钥组合。其中的私钥负责为所有终端实体证书（也称为叶证书）——即我们颁发给您用于服务器使用的证书——签名。

我们的中间证书由ISRG Root X1签名。由于我们还是相当新的证书颁发机构，ISRG Root X1在大多数浏览器中尚未受到信任。为了能够马上被浏览器信任，我们中间证书同时也由IdenTrust——一个根证书已经受到全部主流浏览器信任的证书颁发机构——交叉签名。具体来说，IdenTrust使用他们的"DST Root CA X3"（现在称为“TrustID X3 Root”）交叉签名了我们的中间证书。你可以[从identrust.com下载"TrustID X3 Root"证书](https://www.identrust.com/support/downloads)（或者，您也可以在此处下载我们的副本：[.pem](/certs/trustid-x3-root.pem.txt)，[.p7b](/certs/trustid-x3-root.p7b)）。

这意味着现在有两张证书都可以代表我们的中间证书。一张由DST Root CA X3签发，另外一张由ISRG Root X1签发。区分这两张证书的最简单方法是查看其签发人（Issuer）字段。

在配置网络服务器时，服务器管理员不仅需要配置终端实体证书，也需要配置中间证书以帮助浏览器通过信任链验证终端实体证书由被浏览器信任的根证书签发。几乎所有的服务器管理员都会选择使用由“DST Root CA X3”签发的”Let’s Encrypt Authority X3“证书组成证书信任链。我们推荐的证书颁发软件[Certbot](https://certbot.org)将无缝化地配置这一证书信任链。

下图用视觉方式诠释了证书之间的关系：

<img src="/certs/isrg-keys.png" alt="ISRG证书关系图">

# OCSP签名证书

这张证书被用于对Let's Encrypt Authority中间证书的OCSP回复进行签名，这样我们就不用上线我们的根证书私钥来对这些回复签名。。OCSP回复中自动包括了该证书的副本，所以用户无需进行任何操作。下面的证书仅供参考。
* [ISRG Root OCSP X1（由ISRG Root X1签名）](/certs/isrg-root-ocsp-x1.pem.txt)

# 证书透明度

我们努力对我们的运营及证书颁发过程保持透明。我们在颁发证书时会将该证书发送到[证书透明度日志](https://www.certificate-transparency.org/)。您可以通过以下链接查看所有Let's Encrypt颁发的证书：

* [由Let's Encrypt Authority X1颁发的证书](https://crt.sh/?Identity=%25&iCAID=7395)
* [由Let's Encrypt Authority X3颁发的证书](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多信息

ISRG根证书及Let's Encrypt中间证书的私钥均存储在硬件安全模块（HSM）上以提供高度保护，防止私钥被盗取。

当前所有ISRG私钥均为RSA私钥。 我们正在[计划生成ECDSA私钥]({{< ref "/upcoming-features.md" >}})。
