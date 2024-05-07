---
title: 证书信任链
linkTitle: 证书信任链（根证书和中间证书）
slug: certificates
lastmod: 2021-10-02
show_lastmod: 1
---


[![ISRG Certificate Hierarchy Diagram, as of December 2020](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# 根证书

我们的根证书离线存储在安全的地点。 我们使用中间证书（在下节介绍）向用户签发终端实体证书。 在提交新 Root X2 至多款根证书程序的同时，我们还使用 Root X1 交叉签名来获得更好的兼容性。

* 活跃证书
  * ISRG Root X1 (`RSA 4096, O = Internet Security Research Group, CN = ISRG Root X1`)
    * [自签名](https://crt.sh/?id=9314791): [der](/certs/isrgrootx1.der), [pem](/certs/isrgrootx1.pem), [txt](/certs/isrgrootx1.txt)
    * [通过 DST Root CA X3 交叉签名](https://crt.sh/?id=3958242236): [der](/certs/isrg-root-x1-cross-signed.der), [pem](/certs/isrg-root-x1-cross-signed.pem), [txt](/certs/isrg-root-x1-cross-signed.txt)
* 活跃证书 (有限可用)
  * ISRG Root X2 (`ECDSA P-384, O = Internet Security Research Group, CN = ISRG Root X2`)
    * [自签名](https://crt.sh/?id=3335562555): [der](/certs/isrg-root-x2.der), [pem](/certs/isrg-root-x2.pem), [txt](/certs/isrg-root-x2.txt)
    * [通过 ISRG Root X1 交叉签名](https://crt.sh/?id=3334561878): [der](/certs/isrg-root-x2-cross-signed.der), [pem](/certs/isrg-root-x2-cross-signed.pem), [txt](/certs/isrg-root-x2-cross-signed.txt)

我们设置了如下网站来测试根证书签发的终端实体证书的可用性。

* ISRG Root X1
  * [有效证书](https://valid-isrgrootx1.letsencrypt.org/)
  * [已吊销证书](https://revoked-isrgrootx1.letsencrypt.org/)
  * [过期证书](https://expired-isrgrootx1.letsencrypt.org/)
* ISRG Root X2
  * [有效证书](https://valid-isrgrootx2.letsencrypt.org/)
  * [已吊销证书](https://revoked-isrgrootx2.letsencrypt.org/)
  * [过期证书](https://expired-isrgrootx2.letsencrypt.org/)

# 中间证书

正常情况下，Let’s Encrypt 颁发的证书均来自 RSA 中间证书 “R3”。 目前，只有 ECDSA 订阅者密钥在[授权账户列表](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679) 上，才能从 ECDSA 中间证书“E1”签发证书。 今后，每个人都可从“E1”获得证书。

我们的其他中间证书 ("R4"和"E2") 被用于灾难恢复，只有在我们无法使用主要中间证书签发证书时才会被使用。 我们已经不再使用 X1、X2、X3 和 X4 中间证书。‎

IdenTrust 已对我们的 RSA 中间证书进行了交叉签名，以提高兼容性。

* 活跃证书
  * Let's Encrypt R3 (`RSA 2048, O = Let's Encrypt, CN = R3`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=3334561879): [der](/certs/lets-encrypt-r3.der), [pem](/certs/lets-encrypt-r3.pem), [txt](/certs/lets-encrypt-r3.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=3479778542): [der](/certs/lets-encrypt-r3-cross-signed.der), [pem](/certs/lets-encrypt-r3-cross-signed.pem), [txt](/certs/lets-encrypt-r3-cross-signed.txt) (不再使用)
* 活跃证书，可用性有限
  * Let's Encrypt E1 (`ECDSA P-384, O = Let's Encrypt, CN = E1`)
    * [通过 ISRG Root X2 签出](https://crt.sh/?id=3334671964): [der](/certs/lets-encrypt-e1.der), [pem](/certs/lets-encrypt-e1.pem), [txt](/certs/lets-encrypt-e1.txt)
* 备用证书
  * Let's Encrypt R4 (`RSA 2048, O = Let's Encrypt, CN = R4`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=3334561877): [der](/certs/lets-encrypt-r4.der), [pem](/certs/lets-encrypt-r4.pem), [txt](/certs/lets-encrypt-r4.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=3479778543): [der](/certs/lets-encrypt-r4-cross-signed.der), [pem](/certs/lets-encrypt-r4-cross-signed.pem), [txt](/certs/lets-encrypt-r4-cross-signed.txt) (不再使用)
  * Let's Encrypt E2 (`ECDSA P-384, O = Let's Encrypt, CN = E2`)
    * [通过 ISRG Root X2 签出](https://crt.sh/?id=3334671963): [der](/certs/lets-encrypt-e2.der), [pem](/certs/lets-encrypt-e2.pem), [txt](/certs/lets-encrypt-e2.txt)
* 已不再使用的证书
  * Let's Encrypt Authority X1 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X1`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=9314792): [der](/certs/letsencryptauthorityx1.der), [pem](/certs/letsencryptauthorityx1.pem), [txt](/certs/letsencryptauthorityx1.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=10235198): [der](/certs/lets-encrypt-x1-cross-signed.der), [pem](/certs/lets-encrypt-x1-cross-signed.pem), [txt](/certs/lets-encrypt-x1-cross-signed.txt)
  * Let's Encrypt Authority X2 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X2`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=12721505): [der](/certs/letsencryptauthorityx2.der), [pem](/certs/letsencryptauthorityx2.pem), [txt](/certs/letsencryptauthorityx2.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=10970235): [der](/certs/lets-encrypt-x2-cross-signed.der), [pem](/certs/lets-encrypt-x2-cross-signed.pem), [txt](/certs/lets-encrypt-x2-cross-signed.txt)
  * Let's Encrypt Authority X3 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X3`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=47997543): [der](/certs/letsencryptauthorityx3.der), [pem](/certs/letsencryptauthorityx3.pem), [txt](/certs/letsencryptauthorityx3.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=15706126): [der](/certs/lets-encrypt-x3-cross-signed.der), [pem](/certs/lets-encrypt-x3-cross-signed.pem), [txt](/certs/lets-encrypt-x3-cross-signed.txt)
  * Let's Encrypt Authority X4 (`RSA 2048, O = Let's Encrypt, CN = Let's Encrypt Authority X4`)
    * [通过 ISRG Root X1 签出](https://crt.sh/?id=47997546): [der](/certs/letsencryptauthorityx4.der), [pem](/certs/letsencryptauthorityx4.pem), [txt](/certs/letsencryptauthorityx4.txt)
    * [通过 IdenTrust 交叉签名](https://crt.sh/?id=15710291): [der](/certs/lets-encrypt-x4-cross-signed.der), [pem](/certs/lets-encrypt-x4-cross-signed.pem), [txt](/certs/lets-encrypt-x4-cross-signed.txt)

# 交叉签名

## 中间证书

我们的每个中间证书代表了一对公钥/私钥组合。 其中的私钥负责为所有终端实体证书（也称为叶证书）——即我们颁发给您用于服务器使用的证书——签名。

我们的RSA中间证书由 ISRG Root X1 签名。 目前，ISRG的根证书已广受信任，但是我们的RSA中间证书仍由IdenTrust的"[DST Root CA X3](https://crt.sh/?id=8395)"（现在称为"TrustID X3 Root"）进行交叉签名，以增强客户端兼容性。 IdenTrust根证书存在的时间更长，因此与较旧的设备和操作系统（例如Windows XP和Android 7）具有更好的兼容性。 您可以 [从 IdenTrust下载 "TrustID X3 Root" 证书](https://www.identrust.com/support/downloads)(或者, 您也可以 [在此处下载我们的副本](/certs/trustid-x3-root.pem.txt)).

对中间证书进行交叉签名意味着现在有两张证书都可以代表我们的中间证书。 一张由 DST Root CA X3 签发，另外一张由 ISRG Root X1 签发。 区分这两张证书的最简单方法是查看其签发人（Issuer）字段。

在配置 Web 服务器时，服务器管理员不仅需要配置终端实体证书，也需要配置中间证书以帮助浏览器通过信任链验证终端实体证书由被浏览器信任的根证书签发。 几乎所有服务器管理员都会选择提供主题为"R3"， 签发人为"ISRG Root X1"的中间证书。 推荐使用 Let's Encrypt 客户端软件， [Certbot](https://certbot.org), 体验无缝配置。

## 根证书
类似中间证书，根证书可以进行交叉签名，通常是为了提高客户端 的兼容性。 我们的 ECDSA 根证书，ISRG Root X2 在2020年秋季生成，是ECDSA 类型的 根证书。 它由两份证书代表：一份是 自签名，另一份由 ISRG Root X1 签名。

由ECDSA 中间证书“E1”签名的所有证书都将带有一个链条，其中包括一个中间的 证书，其主题是“ISRG Root X2”，其发行者是"ISRG Root X1"。 几乎所有服务器管理员 都会选择提供这个证书链，因为直到ISRG Root X2 被广泛信任之前，它能提供最大的兼容性。

# OCSP 签名证书

这张证书被用于对 Let's Encrypt Authority 中间证书的 OCSP 响应进行签名，这样我们就不用使用我们的根证书私钥来对这些响应签名。 OCSP 回复中自动包括了该证书的副本，所以用户无需进行任何操作。 下面的证书仅供参考。

* ISRG Root OCSP X1([通过 ISRG Root X1 签名](https://crt.sh/?id=2929281974)): [der](/certs/isrg-root-ocsp-x1.der), [pem](/certs/isrg-root-ocsp-x1.pem), [txt](/certs/isrg-root-ocsp-x1.txt)

我们较新的中间证书没有OCSP URLs(而是通过CRL提供吊销信息)，因此我们尚未从ISRG Root X2发行OCSP签名证书。

# 证书透明化

我们努力对我们的运营及证书颁发过程保持透明。 因此，我们颁发的所有证书都会录入[证书透明化日志](https://www.certificate-transparency.org/)系统中。 您可以通过以下链接查看所有 Let's Encrypt 颁发的证书：

* [由 Let's Encrypt Authority X1 颁发的证书](https://crt.sh/?Identity=%25&iCAID=7395)
* [由 Let's Encrypt Authority X3 颁发的证书](https://crt.sh/?Identity=%25&iCAID=16418)
* [由 E1 颁发的证书](https://crt.sh/?Identity=%25&iCAID=183283)
* [由 R3 颁发的证书](https://crt.sh/?Identity=%25&iCAID=183267)
