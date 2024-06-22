---
title: 证书信任链
linkTitle: 证书信任链（根证书和中间证书）
slug: certificates
lastmod: 2024-06-11
show_lastmod: 1
---

本页面描述了 Let's Encrypt 过往及当前运作的所有证书颁发机构（CA）。 所谓的 CA 应当理解为一组名称和密钥：一家 CA 可以由 _很多_ 证书表示，只要所有证书的主体和公钥信息相同即可。 对于这种情形，我们也提供了 CA 对应的所有证书的详细信息。

[![2024 年 6 月起的 ISRG 证书层级图示](/images/isrg-hierarchy.png)](/images/isrg-hierarchy.png)

# 根证书颁发机构

我们的根证书密钥是在安全的地点离线存储的， 而提供给用户的最终实体证书都是由下一节介绍的中间证书签发。 所有根证书中主体的国家字段均为 `C = US`。

需要注意的是，根证书的有效期限和其他证书有所不同。 作为一种自签名证书，根证书也有 `notAfter` 截止日期，但各类根证书项目和证书库可以选择延长或提前终止对根证书的信任。 因此，下列证书有效期限仅为依据各根证书项目的现行政策所作的预估。

* **ISRG Root X1**
  * 主体：`O = Internet Security Research Group, CN = ISRG Root X1`
  * 密钥类型：`RSA 4096`
  * 有效期限：2015-06-04 至 2030-06-04
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=7394)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=7394)
  * 证书详细信息（自签名版本）：[crt.sh](https://crt.sh/?id=9314791)、[der](/certs/isrgrootx1.der)、[pem](/certs/isrgrootx1.pem)、[txt](/certs/isrgrootx1.txt)
  * 证书详细信息（DST Root CA X3 交叉签名的版本）：[crt.sh](https://crt.sh/?id=3958242236)、[der](/certs/isrg-root-x1-cross-signed.der)、[pem](/certs/isrg-root-x1-cross-signed.pem)、[txt](/certs/isrg-root-x1-cross-signed.txt)（现已不再使用）
  * 测试网站：[正常证书](https://valid-isrgrootx1.letsencrypt.org/)、[已吊销证书](https://revoked-isrgrootx1.letsencrypt.org/)、[已过期证书](https://expired-isrgrootx1.letsencrypt.org/)
* **ISRG Root X2**
  * 主体：`O = Internet Security Research Group, CN = ISRG Root X2`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：2020-09-04 至 2035-09-04
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=183269)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=183269)
  * 证书详细信息（自签名版本）：[crt.sh](https://crt.sh/?id=3335562555)、[der](/certs/isrg-root-x2.der)、[pem](/certs/isrg-root-x2.pem)、[txt](/certs/isrg-root-x2.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[crt.sh](https://crt.sh/?id=3334561878)、[der](/certs/isrg-root-x2-cross-signed.der)、[pem](/certs/isrg-root-x2-cross-signed.pem)、[txt](/certs/isrg-root-x2-cross-signed.txt)
  * 测试网站：[正常证书](https://valid-isrgrootx2.letsencrypt.org/)、[已吊销证书](https://revoked-isrgrootx2.letsencrypt.org/)、[已过期证书](https://expired-isrgrootx2.letsencrypt.org/)

关于我们的根证书与各类设备及证书库的兼容性，详见[证书兼容性](/docs/cert-compat)页面。

# 中间证书颁发机构

我们目前有四份中间证书供轮转使用。 包含 ECDSA 公钥的用户证书由其中一份 ECDSA 中间证书签发，包含 RSA 公钥的用户证书则由其中一份 RSA 中间证书签发。

所有中间证书中主体的国家字段均为 `C = US`。

* **Let's Encrypt E5**
  * 主体：`O = Let's Encrypt, CN = E5`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295810)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295810)
  * 证书详细信息（ISRG Root X2 签名的版本）：[der](/certs/2024/e5.der)、[pem](/certs/2024/e5.pem)、[txt](/certs/2024/e5.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[der](/certs/2024/e5-cross.der)、[pem](/certs/2024/e5-cross.pem)、[txt](/certs/2024/e5-cross.txt)
* **Let's Encrypt E6**
  * 主体：`O = Let's Encrypt, CN = E6`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295819)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295819)
  * 证书详细信息（ISRG Root X2 签名的版本）：[der](/certs/2024/e6.der)、[pem](/certs/2024/e6.pem)、[txt](/certs/2024/e6.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[der](/certs/2024/e6-cross.der)、[pem](/certs/2024/e6-cross.pem)、[txt](/certs/2024/e6-cross.txt)
* **Let's Encrypt R10**
  * 主体：`O = Let's Encrypt, CN = R10`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295814)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295814)
  * 证书详细信息（ISRG Root X1 签名的版本）：[der](/certs/2024/r10.der)、[pem](/certs/2024/r10.pem)、[txt](/certs/2024/r10.txt)
* **Let's Encrypt R11**
  * 主体：`O = Let's Encrypt, CN = R11`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295815)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295815)
  * 证书详细信息（ISRG Root X1 签名的版本）：[der](/certs/2024/r11.der)、[pem](/certs/2024/r11.pem)、[txt](/certs/2024/r11.txt)

点击下方展开当前签发层级外的其他中间证书颁发机构：

<details>
<summary>备用证书</summary>

这些中间证书已经生效，但尚未用于签发其他证书。 我们随时可能在无预先告知的情况下将下列证书用于签发流程。

* **Let's Encrypt E7**
  * 主体：`O = Let's Encrypt, CN = E7`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295813)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295813)
  * 证书详细信息（ISRG Root X2 签名的版本）：[der](/certs/2024/e7.der)、[pem](/certs/2024/e7.pem)、[txt](/certs/2024/e7.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[der](/certs/2024/e7-cross.der)、[pem](/certs/2024/e7-cross.pem)、[txt](/certs/2024/e7-cross.txt)
* **Let's Encrypt E8**
  * 主体：`O = Let's Encrypt, CN = E8`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295809)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295809)
  * 证书详细信息（ISRG Root X2 签名的版本）：[der](/certs/2024/e8.der)、[pem](/certs/2024/e8.pem)、[txt](/certs/2024/e8.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[der](/certs/2024/e8-cross.der)、[pem](/certs/2024/e8-cross.pem)、[txt](/certs/2024/e8-cross.txt)
* **Let's Encrypt E9**
  * 主体：`O = Let's Encrypt, CN = E9`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295812)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295812)
  * 证书详细信息（ISRG Root X2 签名的版本）：[der](/certs/2024/e9.der)、[pem](/certs/2024/e9.pem)、[txt](/certs/2024/e9.txt)
  * 证书详细信息（ISRG Root X1 交叉签名的版本）：[der](/certs/2024/e9-cross.der)、[pem](/certs/2024/e9-cross.pem)、[txt](/certs/2024/e9-cross.txt)
* **Let's Encrypt R12**
  * 主体：`O = Let's Encrypt, CN = R12`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295816)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295816)
  * 证书详细信息（ISRG Root X1 签名的版本）：[der](/certs/2024/r12.der)、[pem](/certs/2024/r12.pem)、[txt](/certs/2024/r12.txt)
* **Let's Encrypt R13**
  * 主体：`O = Let's Encrypt, CN = R13`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295817)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295817)
  * 证书详细信息（ISRG Root X1 签名的版本）：[der](/certs/2024/r13.der)、[pem](/certs/2024/r13.pem)、[txt](/certs/2024/r13.txt)
* **Let's Encrypt R14**
  * 主体：`O = Let's Encrypt, CN = R14`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2027-03-12
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=295818)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=295818)
  * 证书详细信息（ISRG Root X1 签名的版本）：[der](/certs/2024/r14.der)、[pem](/certs/2024/r14.pem)、[txt](/certs/2024/r14.txt)

</details>

<details>
<summary>已不再使用的证书</summary>

这些中间证书已不再用于签发用户证书。 其中尚未过期的中间证书仍有可能产生 OCSP 应答和/或 CRL。

* **Let's Encrypt E1**
  * 主体：`O = Let's Encrypt, CN = E1`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2025-09-15
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=183283)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=183283)
  * 证书详细信息（ISRG Root X2 签名的版本）：[crt.sh](https://crt.sh/?id=3334671964)、[der](/certs/lets-encrypt-e1.der)、[pem](/certs/lets-encrypt-e1.pem)、[txt](/certs/lets-encrypt-e1.txt)
* **Let's Encrypt E2**
  * 主体：`O = Let's Encrypt, CN = E2`
  * 密钥类型：`ECDSA P-384`
  * 有效期限：至 2025-09-15
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=183284)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=183284)
  * 证书详细信息（ISRG Root X2 签名的版本）：[crt.sh](https://crt.sh/?id=3334671963)、[der](/certs/lets-encrypt-e2.der)、[pem](/certs/lets-encrypt-e2.pem)、[txt](/certs/lets-encrypt-e2.txt)
* **Let's Encrypt R3**
  * 主体：`O = Let's Encrypt, CN = R3`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2025-09-15
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=183267)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=183267)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=3334561879)、[der](/certs/lets-encrypt-r3.der)、[pem](/certs/lets-encrypt-r3.pem)、[txt](/certs/lets-encrypt-r3.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=3479778542)、[der](/certs/lets-encrypt-r3-cross-signed.der)、[pem](/certs/lets-encrypt-r3-cross-signed.pem)、[txt](/certs/lets-encrypt-r3-cross-signed.txt)
* **Let's Encrypt R4**
  * 主体：`O = Let's Encrypt, CN = R4`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2025-09-15
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=183268)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=183268)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=3334561877)、[der](/certs/lets-encrypt-r4.der)、[pem](/certs/lets-encrypt-r4.pem)、[txt](/certs/lets-encrypt-r4.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=3479778543)、[der](/certs/lets-encrypt-r4-cross-signed.der)、[pem](/certs/lets-encrypt-r4-cross-signed.pem)、[txt](/certs/lets-encrypt-r4-cross-signed.txt)
* **Let's Encrypt Authority X1**
  * 主体：`O = Let's Encrypt, CN = Let's Encrypt Authority X1`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2020-06-04
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=7395)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=7395)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=9314792)、[der](/certs/letsencryptauthorityx1.der)、[pem](/certs/letsencryptauthorityx1.pem)、[txt](/certs/letsencryptauthorityx1.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=10235198)、[der](/certs/lets-encrypt-x1-cross-signed.der)、[pem](/certs/lets-encrypt-x1-cross-signed.pem)、[txt](/certs/lets-encrypt-x1-cross-signed.txt)
* **Let's Encrypt Authority X2**
  * 主体：`O = Let's Encrypt, CN = Let's Encrypt Authority X2`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2020-06-04
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=9745)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=9745)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=12721505)、[der](/certs/letsencryptauthorityx2.der)、[pem](/certs/letsencryptauthorityx2.pem)、[txt](/certs/letsencryptauthorityx2.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=10970235)、[der](/certs/lets-encrypt-x2-cross-signed.der)、[pem](/certs/lets-encrypt-x2-cross-signed.pem)、[txt](/certs/lets-encrypt-x2-cross-signed.txt)
* **Let's Encrypt Authority X3**
  * 主体：`O = Let's Encrypt, CN = Let's Encrypt Authority X3`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2021-10-06
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=16418)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=16418)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=47997543)、[der](/certs/letsencryptauthorityx3.der)、[pem](/certs/letsencryptauthorityx3.pem)、[txt](/certs/letsencryptauthorityx3.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=15706126)、[der](/certs/lets-encrypt-x3-cross-signed.der)、[pem](/certs/lets-encrypt-x3-cross-signed.pem)、[txt](/certs/lets-encrypt-x3-cross-signed.txt)
* **Let's Encrypt Authority X4**
  * 主体：`O = Let's Encrypt, CN = Let's Encrypt Authority X4`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2021-10-06
  * CA 详细信息：[crt.sh](https://crt.sh/?caid=16429)、[已签发的证书](https://crt.sh/?Identity=%25&iCAID=16429)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=47997546)、[der](/certs/letsencryptauthorityx4.der)、[pem](/certs/letsencryptauthorityx4.pem)、[txt](/certs/letsencryptauthorityx4.txt)
  * 证书详细信息（IdenTrust 交叉签名的版本）：[crt.sh](https://crt.sh/?id=15710291)、[der](/certs/lets-encrypt-x4-cross-signed.der)、[pem](/certs/lets-encrypt-x4-cross-signed.pem)、[txt](/certs/lets-encrypt-x4-cross-signed.txt)

</details>

<details>
<summary>OCSP 响应专用证书</summary>

此证书曾代替 Let's Encrypt 的根证书用于签发 OCSP 响应，传达 Let's Encrypt 中间证书的状态，从而使根证书能够以离线的形式安全存储。 现在我们已不再为中间证书提供 OCSP 响应，而是定期使用根证书发布 CRL 通告各中间证书的吊销情况。

* **ISRG Root OCSP X1**
  * 主体：`O = Internet Security Research Group, CN = ISRG Root OCSP X1`
  * 密钥类型：`RSA 2048`
  * 有效期限：至 2025-06-10
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=2929281974)、[der](/certs/isrg-root-ocsp-x1.der)、[pem](/certs/isrg-root-ocsp-x1.pem)、[txt](/certs/isrg-root-ocsp-x1.txt)
  * 证书详细信息（ISRG Root X1 签名的版本）：[crt.sh](https://crt.sh/?id=142051103)（现已不再使用）

</details>
<p><!-- to get the right line spacing after a block element --></p>

# 证书链

ACME 客户端通过 Let's Encrypt 的 ACME 接口下载的新证书实际上是“证书链”的一部分，这条链中还包含若干份中间证书。 一般情况下，证书链中只有最终实体证书和一份中间证书，但中间证书也可以有多份。 这样设计的意图在于，只要把这一整条证书链提供给网站访客的浏览器，浏览器就能顺着这条链逐一验证数字签名，直至找到其信任的根证书，全程不需要再下载其他的中间证书。

一份证书还可能有多条证书链。例如，当中间证书存在交叉签名时，任选其一均可形成证书链，并最终到达各自的根证书。 在这种情况下，各网站可以根据需要选择使用不同的证书链。

使用 RSA 公钥的用户证书均由我们的 RSA 中间证书签发，对应的根证书也只有使用 RSA 的 ISRG Root X1（即不存在交叉签名）。 因此，所有 RSA 用户证书都只有一条证书链：

<div style="text-align: center">
RSA 用户证书 ← RSA 中间证书（R10 或 R11）← ISRG Root X1
</div>
<p><!-- to get the right line spacing after a block element --></p>

使用 ECDSA 公钥的用户证书则由我们的 ECDSA 中间证书签发，对应的根证书既有使用 RSA 的 ISRG Root X1，也有使用 ECDSA 的 ISRG Root X2（即存在交叉签名）。 所以我们为此类证书提供了两条证书链：

<div style="text-align: center">
ECDSA 用户证书 ← ECDSA 中间证书（E5 或 E6）← ISRG Root X1

ECDSA 用户证书 ← ECDSA 中间证书（E5 或 E6）← ISRG Root X2
</div>
<p><!-- to get the right line spacing after a block element --></p>

第一条到 ISRG Root X1 的证书链兼容性更高，因为大多数证书库都收录了这份根证书。 第二条到 ISRG Root X2 的证书链则能降低每次 TLS 握手过程所占据的带宽。 为了保障兼容性，我们在默认情况下提供的是第一条证书链， 相比兼容性更注重数据量的用户可以查阅其 ACME 客户端的文档了解如何获取另一条证书链（例如使用 [Certbot 的 `--preferred-chain` 选项](https://eff-certbot.readthedocs.io/en/stable/using.html#certbot-command-line-options)）。
