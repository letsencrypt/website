---
title: 信任链
slug: certificates
top_graphic: 5
---

# 根证书

我们的根源安全离线。 我们将在下一节中向中间人发放终端实体证书。

* Active
* [ISRG Root X1 (self-signed)](/certs/isrgrootx1.pem.txt)

我们已经建立了网站来测试链接到我们根源的证书

* ISRG Root X1 有效证书
* [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 撤销证书
* [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 过期证书
* [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)
# 中级证书


IdenTrust已经签署了我们的中间体。 这允许我们传播自己的根时，所有主要浏览器都接受我们的结束证书。

在正常情况下，Let's Encrypt颁发的证书将来自“Let's Encrypt Authority X3”。另一个中间件“Let's Encrypt Authority X4”保留用于灾难恢复，只有在我们失去发出“Let's Encrypt Authority X3”的能力时才会使用。X1和X2中间体是我们的第一代中间体。 我们已经用与Windows XP更兼容的新中间体替换它们。

* Active
* [Let's Encrypt Authority X3 (IdenTrust cross-signed)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
* [Let's Encrypt Authority X3 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx3.pem.txt)
* Backup
* [Let's Encrypt Authority X4 (IdenTrust cross-signed)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
* [Let's Encrypt Authority X4 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx4.pem.txt)
* Retired
* [Let's Encrypt Authority X2 (IdenTrust cross-signed)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
* [Let's Encrypt Authority X2 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx2.pem.txt)
* [Let's Encrypt Authority X1 (IdenTrust cross-signed)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
* [Let's Encrypt Authority X1 (Signed by ISRG Root X1)](/certs/letsencryptauthorityx1.pem.txt)


# 交叉签名

我们的中间“Let's Encrypt Authority X3”代表单个公钥/私钥对。 该对的私钥生成所有最终实体证书（也称为叶证书）的签名，即我们颁发给您的服务器使用的证书。
我们的中间体由ISRG Root X1签署。 但是，由于我们是一个非常新的证书颁发机构，因此ISRG Root X1在大多数浏览器中尚未受到信任。 为了立即得到广泛信任，我们的中间人还由另一个证书颁发机构IdenTrust进行交叉签名，该机构的根已经在所有主流浏览器中受到信任。 具体来说，IdenTrust使用他们的[DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html)对我们的中间人进行了交叉签名。
这意味着有两个证书可以代表我们的中间人。 一个由DST Root CA X3签名，另一个由ISRG Root X1签名。 区分这两者的最简单方法是查看其Issuer字段。

That means there are two certificates available that both represent our
intermediate. One is signed by DST Root CA X3, and the other is signed by ISRG
Root X1. The easiest way to distinguish the two is by looking at their Issuer field.
配置Web服务器时，服务器操作员不仅配置终端实体证书，还配置中介列表，以帮助浏览器验证最终实体证书是否具有通向受信任根证书的信任链。 几乎所有的服务器运营商都会选择服务链，包括主题为“Let's Encrypt Authority X3”的中间证书和Issuer“DST Root CA X3”。推荐的Let's Encrypt软件[Certbot](https://certbot.org)将无缝地进行此配置。

下图以视觉方式解释了我们的证书之间的关系：

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">


# OCSP签名证书

此证书用于为Let的加密机构中间人签署OCSP响应，因此我们无需在线提供根密钥以便对这些响应进行签名。 此证书的副本会自动包含在这些OCSP响应中，因此订阅者无需对其执行任何操作。 它仅供参考。

* [ISRG Root OCSP X1 (Signed by ISRG Root X1)](/certs/isrg-root-ocsp-x1.pem.txt)


# 证书透明度
我们致力于透明运营和我们颁发的证书。 我们在发布证书透明度[Certificate Transparency logs](https://www.certificate-transparency.org/)日志时会将所有证书提交给证书透明度日志。 您可以通过以下链接查看所有已颁发的Let's Encrypt证书：

* [Issued by Let's Encrypt Authority X1](https://crt.sh/?Identity=%25&iCAID=7395)
* [Issued by Let's Encrypt Authority X3](https://crt.sh/?Identity=%25&iCAID=16418)

# 更多信息

ISRG根CA和Let的加密中间CA的私钥存储在硬件安全模块（HSM）上，这些模块可以提供对被盗密钥的高度保护。
所有ISRG密钥当前都是RSA密钥。 我们[planning to generate ECDSA keys](/upcoming-features/).
