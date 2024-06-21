---
title: 术语表
slug: glossary
date: 2018-12-30
show_lastmod: 1
---


<!--
Note for translators:
 
- Usage of the "def" macro (in other languages than English):
{% def 
    id="a unique id for anchor - the SAME than for english. will be prefixed by `def-`" 
    name="The term to define (optional if english or abbr is provided)"
    abbr="an accronym (optional)"
    english="the english term (optional - if present the abbr is in english too)" %}}
        the definition
{% /def %}
    
- Check the javascript console for errors.

- Automatic titles on definition's link cuts everything after the last point (to remove source links)

-->

{{% def id="AIA" name="颁发机构信息访问" english="Authority Information Access" abbr="AIA" %}} 用于提示[用户代理](#def-user-agent)获取[证书](#def-certificate)颁发者信息的方法的证书[扩展](#def-extension)。 它通常会指定用于 [OCSP](#def-OCSP) 的 URI 地址和[颁发者的 URI 地址](#def-CAI)。  {{% /def %}}

{{% def id="ACME" name="自动证书管理环境" english="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} 由 [Let's Encrypt](#def-LE) 实现的协议。 与该协议兼容的软件可以用它与 Let's Encrypt 通信以获取[证书](#def-leaf)。 参见 [ACME RFC](https://tools.ietf.org/html/rfc8555) 和[维基百科条目](https://zh.wikipedia.org/zh-cn/%E8%87%AA%E5%8B%95%E6%86%91%E8%AD%89%E6%9B%B4%E6%96%B0%E7%92%B0%E5%A2%83)。 {{% /def %}}

{{% def id="ACME-client" name="ACME 客户端" english="ACME Client" %}} 能够与 ACME 服务器通信以获取[证书](#def-leaf)的程序。  {{% /def %}}

{{% def id="ACME-server" name="ACME 服务器" english="ACME Server" %}} 兼容 ACME 协议的服务器，能够生成[证书](#def-leaf)。 Let's Encrypt 开发的软件 [Boulder](#def-boulder) 与 ACME 协议兼容，但[有一些差异](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md)。  {{% /def %}}

{{% def id="boulder" english="Boulder" %}} 一款实现了 ACME 协议的软件，由 [Let's Encrypt](#def-LE) 开发并投入使用。 参见 [GitHub 代码仓库](https://github.com/letsencrypt/boulder)。 {{% /def %}}

{{% def id="BRs" name="底线要求" english="Baseline Requirements" abbr="BRs" %}} 一组针对 CA 的技术和政策上的要求。 由于所有[根证书项目](#def-root-program)都包含了底线要求，CA 若要被大多数浏览器信任就必须遵循这些要求。  {{% /def %}}

{{% def id="CAA" name="证书颁发机构授权" english="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} 一类 DNS 记录，用于指定哪些 [CA](#def-CA) 有权为相应的域名颁发证书。 CAA 记录需要 CA 遵守，而非由浏览器检查。 按照[底线要求](#def-BRs)的规定，[Let's Encrypt](#def-LE)[ 严格遵循 CAA 记录](/docs/caa)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/DNS%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83)。 {{% /def %}}

{{% def id="CNAME" name="真实名称记录" english="Canonical Name record" abbr="CNAME" %}} 将一个域名映射到另一个域名（称为真实名称）的 DNS 记录。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/CNAME%E8%AE%B0%E5%BD%95)。 {{% /def %}}

{{% def id="CA" name="证书颁发机构" english="Certificate Authority" abbr="CA" %}} 颁发[证书](#def-leaf)的组织。 [Let's Encrypt](#def-LE)、[IdenTrust](#def-IdenTrust)、Sectigo 和 DigiCert 都是证书颁发机构。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84)。 {{% /def %}}

{{% def id="CAI" name="CA 颁发者" english="CA Issuers" %}}[AIA](#def-AIA) 字段的一部分，包含[证书](#def-leaf)颁发者的信息。 如果[网页服务器](#def-web-server)没有提供可信的[证书链](#def-chain)，这一信息可能会有用。  {{% /def %}}

{{% def id="certificate" name="证书" english="Certificate" %}} 包含公钥以及其他一些描述何时使用该公钥的信息的[特定格式](#def-X509)的文件。 [叶证书](#def-leaf)是最常见的证书类型。 另外还有[中间证书](#def-intermediate)和[根证书](#def-root)这两种证书。 {{% /def %}}

{{% def id="extension" name="证书扩展" english="Certificate extension" %}} 在证书中，大多数字段都是由扩展来定义的。 例如，[主体备用名称](#def-SAN)和 [AIA](#def-AIA) 都属于扩展。 [X.509](#def-X509) 标准最初没有定义的字段可以通过扩展机制得到应用。 {{% /def %}}

{{% def id="CABF" name="CA/浏览器论坛" english="CA/Browser Forum" %}} 由证书颁发机构、互联网浏览器软件的供应商、操作系统和其他使用 PKI 的应用程序组成的志愿团体。 CA/浏览器论坛发布了[底线要求](#def-BRs)。 [Let's Encrypt](#def-LE) 也是 CA/浏览器论坛的成员。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/CA/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BA%E5%9D%9B)。 {{% /def %}}

{{% def id="chain" name="证书链" english="Certificate chain" %}} 包含一系列[中间证书](#def-intermediate)，将[叶证书](#def-leaf)逐步连接到[证书库](#def-store)中的[根证书](#def-root)，从而协助[用户代理](#def-user-agent)确认叶证书是否可信。 注意：证书链并不总是唯一的，即使网站提供了一条证书链，用户代理也可以选择另一条证书链执行验证。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89)。 {{% /def %}}

{{% def id="CP" name="证书管理制度" english="Certificate Policy" abbr="CP" %}} 一系列具体的规定，表明证书是否适用于具备同等安全需求的特定社群和/或特定应用类型。 证书颁发流程的细节则由 [CPS](#def-CPS) 描述。 参见 [ISRG 证书管理制度](/repository#isrg-certificate-policy)、[RFC 3647](https://tools.ietf.org/html/rfc3647) 和[英文维基百科条目](https://en.wikipedia.org/wiki/Certificate_policy)。 {{% /def %}}

{{% def id="CPS" name="证书运作声明" english="Certification Practice Statement" abbr="CPS" %}} 证书颁发机构对于证书颁发、管理、吊销、续期、更换密钥的流程所作的声明。 参见 [ISRG 证书运作声明](/repository#isrg-certification-practice-statement)、[RFC 3647 第 3.4 节](https://tools.ietf.org/html/rfc3647#section-3.4)和[英文维基百科条目](https://en.wikipedia.org/wiki/Certification_Practice_Statement)。 {{% /def %}}

{{% def id="critical" name="关键扩展" english="Critical extension" %}} 证书中的[扩展](#def-extension)可以标记为“关键”扩展， 如果软件不知道如何处理此扩展，就必须拒绝使用该证书。 这使得对于安全性至关重要的功能也可以通过扩展的形式实现，不会在旧版本软件中造成风险。 {{% /def %}}

{{% def id="CRL" name="证书吊销列表" english="Certificate Revocation List" abbr="CRL" %}} 一种将[证书](#def-leaf)的[吊销](#def-revocation)情况告知[用户代理](#def-user-agent)的方式。 列表中包含某一 CA 吊销的所有证书的序列号，由该 CA 加以数字签名。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E8%AF%81%E4%B9%A6%E5%90%8A%E9%94%80%E5%88%97%E8%A1%A8)。 {{% /def %}}

{{% def id="CSR" name="证书签名请求" english="Certificate Signing Request" abbr="CSR" %}} 一份经过数字签名的文件，包含 [CA](#def-CA) 生成证书所需的信息。 [Let's Encrypt](#def-LE) 所需的信息包括[通用名称](#def-CN)、[主体备用名称](#def-SAN)以及主体公钥信息。 通常，[客户端应用程序](#def-ACME-client)会自动为用户生成 CSR，Web 托管提供商或相关设备也可能会生成 CSR。 参见[英文维基百科条目](https://en.wikipedia.org/wiki/Certificate_signing_request)。 {{% /def %}}

{{% def id="store" name="证书库" english="Certificate Store" %}} 证书库包含一系列受信任的[根证书](#def-root)。 操作系统（如 Windows、Android、Debian）和[网页浏览器](#def-web-browser)（如 Firefox）厂商通常会维护各自的证书库， 但也有一些浏览器直接使用操作系统的证书库。 [Let's Encrypt](#def-LE) 提供的[证书](#def-leaf)已得到[大多数证书库的信任](/certificates)。  {{% /def %}}

{{% def id="subject" name="证书主体" english="Certificate subject" %}} 证书的“主体”表示这份证书是授予谁的， 其中常包括[通用名称](#def-CN)、国家、组织等字段。 {{% /def %}}

{{% def id="CT" name="证书透明化" english="Certificate Transparency" abbr="CT" %}} 为了增强安全性，证书（以及[准证书](#def-precertificate)）必须通过证书透明化日志公开发布：https://www.certificate-transparency.org/。 [Let's Encrypt](#def-LE) 会先生成并发布[准证书](#def-precertificate)，随后在实际[证书](#def-leaf)中列出准证书的 [SCT](#def-SCT)。 部分[浏览器](#def-web-browser)（如 Google Chrome）要求这一可验证的承诺必须出现在证书中，以便其验证该证书。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E8%AF%81%E4%B9%A6%E9%80%8F%E6%98%8E%E5%BA%A6)。 {{% /def %}}

{{% def id="CT-log" name="证书透明化日志" english="Certificate Transparency Log" %}} [证书透明化](#def-CT)机制的一部分，将接收到的证书和[准证书](#def-precertificate)加入一份永久、公开且可验证的列表中。  {{% /def %}}

{{% def id="CN" name="通用名称" english="Common Name" abbr="CN" %}} 证书[主体](#def-subject)信息的一部分，表示证书的所有者。 在[根证书](#def-root)和[中间证书](#def-intermediate)中，通用名称即为[证书颁发机构](#def-CA)面向用户的名称， 而在[叶证书](#def-leaf)中则是证书包含的一个域名。 注意：通用名称最长 63 个字符。 在过去，通用名称还用于表示证书对应的域名，但在现行的互联网标准中，软件只会通过[主体备用名称](#def-SAN)确定证书的有效性。 {{% /def %}}

{{% def id="cross-signing" name="交叉签名" english="Cross Signing" %}} 一份具备证书签发能力的证书也可以由不同的[根证书](#def-root)签名。 例如，[Let's Encrypt](#def-LE) 的[中间证书](#def-intermediate)由 [IdenTrust](#def-IdenTrust) 交叉签名，因为 Let's Encrypt 的根证书在创立初期还没有得到[证书库](#def-store)的广泛信任。 交叉签名在原理上需要两份[主体](#def-subject)和[密钥对](#def-key-pair)都相同的证书，一份由 Let's Encrypt 的私钥签名，另一份则由 IdenTrust 根证书的私钥签名：[/certificates](/certificates)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/X.509#%E8%AF%81%E4%B9%A6%E9%93%BE%E5%92%8C%E4%BA%A4%E5%8F%89%E8%AE%A4%E8%AF%81)。 {{% /def %}}

{{% def id="DANE" name="基于 DNS 的实体认证" english="DNS-based Authentication of Named Entities" abbr="DANE" abbr_first="1" %}} 一种通过 DNS 表明[证书](#def-leaf)或密钥验证方式的机制。  参见[英文维基百科条目](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities)。 {{% /def %}}

{{% def id="DNSSEC" name="域名系统安全扩展" english="Domain Name System Security Extensions" abbr="DNSSEC" abbr_first="1" %}} 一种使用密码学验证 DNS 应答的机制。 要使 DNSSEC 生效，必须在 TLD、域名所有者以及递归解析服务器上都进行部署。 目前其采用率较低。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8%E6%89%A9%E5%B1%95)。 {{% /def %}}

{{% def id="DV" name="域名验证型证书" english="Domain-validated certificate" abbr="DV 证书" abbr_first="1" %}} 此类[证书](#def-leaf)的申请者仅证明了其对域名（而非自称的组织团体）的控制权。 [Let's Encrypt](#def-LE) 只提供 DV 证书，不提供 [OV](#def-OV) 及 [EV](#def-EV) 证书。参见[常见问题](/docs/faq)和[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E9%AA%8C%E8%AF%81%E5%9E%8B%E8%AF%81%E4%B9%A6)。 {{% /def %}}

{{% def id="ECDSA" name="椭圆曲线数字签名算法" english="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} 一种采用椭圆曲线密码学的数字签名算法（DSA）。  参见[维基百科条目](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D%E7%AE%97%E6%B3%95)。 [Let's Encrypt](#def-LE) 支持在[叶证书（最终实体证书）](#def-leaf)中使用 ECDSA，但暂时没有完整的 ECDSA [证书链](#def-chain)。参见[即将推出的功能](/upcoming-features)。{{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} [EdDSA](#def-EdDSA) 的一种类型，类似的还有 Ed448。  {{% /def %}}

{{% def id="EdDSA" name="爱德华兹曲线数字签名算法" english="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} 基于椭圆曲线的现代公钥签名系统，其设计旨在解决椭圆曲线密码的一些常见[实现问题](https://ed25519.cr.yp.to/)。 [Let's Encrypt](#def-LE) 这样的证书颁发机构暂时还不能提供 EdDSA 证书。 参见[英文维基百科条目](https://en.wikipedia.org/wiki/EdDSA)。{{% /def %}}

{{% def id="ECC" name="椭圆曲线密码学" english="Elliptic Curve Cryptography" abbr="ECC" abbr_first="1" %}} 基于椭圆曲线的一种公钥密码学。 相较于非椭圆曲线的加密方式，ECC 在提供同等的安全性的前提下使用更小的密钥。 参见 [Cloudflare 博客文章](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/)和[维基百科条目](https://zh.wikipedia.org/zh-cn/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6)。{{% /def %}}

{{% def id="EV" name="扩展验证" english="Extended Validation" abbr="EV" abbr_first="1" %}} [CA](#def-CA) 在颁发证书前核实对网站具有控制权的法人， 证书中包含法人的具体信息。 [CA](#def-CA) 对此类证书的控制比 [OV](#def-OV) 证书更为严格。 [Let's Encrypt](#def-LE) 不提供 EV 证书。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E6%89%A9%E5%B1%95%E9%AA%8C%E8%AF%81%E8%AF%81%E4%B9%A6)。 {{% /def %}}

{{% def id="FQDN" name="完全限定域名" english="Fully qualified domain name" abbr="FQDN" abbr_first="1" %}} 网站的完整域名。 例如，`www.example.com` 就是一个 *FQDN*。  {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} 一家[证书颁发机构](#def-CA)。 IdenTrust 为 [Let's Encrypt](#def-LE) 的[中间证书](#def-intermediate)提供了[交叉签名](#def-cross-signing)：[/certificates](/certificates)。 参见[英文维基百科条目](https://en.wikipedia.org/wiki/IdenTrust)。 {{% /def %}}

{{% def id="intermediate" name="中间证书" english="Intermediate certificate" %}} 由[根证书](#def-root)或另一中间证书签名的、能够为其他证书签名的证书。 此类证书用于为叶证书签名，从而使根证书的私钥可以在离线环境下安全存储。 中间证书会包含在[证书链](#def-chain)中。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E8%AD%89%E6%9B%B8%E7%A8%AE%E9%A1%9E)。 {{% /def %}}

{{% def id="IDNA" name="应用程序中的国际化域名" english="Internationalized Domain Names for Applications" abbr="IDNA" abbr_first="1" %}} 参见[国际化域名](#def-IDN)。  {{% /def %}}

{{% def id="IDN" name="国际化域名" english="Internationalized Domain Name" abbr="IDN" abbr_first="1" %}} 含有 `a` 到 `z`、`0` 到 `9`、短横线（`-`）以外字符的域名。 此类域名中可以使用带有变音符或连字的拉丁字母，也可以使用汉字、阿拉伯文、西里尔文、泰米尔文、希伯来文等文字。 编码后的 IDN 以 `xn--` 开头。 [Let's Encrypt](#def-LE) 支持 IDN：https://letsencrypt.org/2016/10/21/introducing-idn-support.html。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%9B%BD%E9%99%85%E5%8C%96%E5%9F%9F%E5%90%8D)、[RFC 5890](https://tools.ietf.org/html/rfc5890) 和 [RFC 5891](https://tools.ietf.org/html/rfc5891)。 {{% /def %}}

{{% def id="ISRG" name="互联网安全研究组" english="Internet Security Research Group" abbr="ISRG" abbr_first="1" %}} [Let's Encrypt](#def-LE) 背后的运作机构：[https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/)。 参见[英文维基百科条目](https://en.wikipedia.org/wiki/Internet_Security_Research_Group)。 {{% /def %}}

{{% def id="issuer" name="证书颁发者" english="Certificate issuer" %}} 证书的“颁发者”字段表示这份证书是由谁签名的。 例如，Let's Encrypt 颁发的终端实体证书的颁发者字段可能是：“Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3”。 颁发者通常包含[通用名称](#def-CN)、国家、组织等字段， 且必须和某一份证书的[主体](#def-subject)字段一致。 [自签名](#def-self-signed)证书（如[根证书](#def-root)）的颁发者与主体字段内容相同。 “颁发者”一词也泛指所有能够签发其他证书的证书（包括[中间证书](#def-intermediate)和根证书），或者有资格颁发证书的机构。 {{% /def %}}

{{% def id="key-pair" name="密钥对" english="Key-pair" %}} 用于签名或加密的公钥和私钥的组合。 公钥通常嵌入在证书中，而私钥则独立保密存储。 根据不同的应用情况，密钥对可以用于加密和解密、签名和验证数据或是协商二级密钥。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86)。 {{% /def %}}

{{% def id="leaf" name="叶证书（最终实体证书）" english="Leaf certificate (end-entity certificate)" %}} 一般是由[中间证书](#def-intermediate)签名的一份证书，仅对一系列域名有效，且不能用于签发其他证书。 [ACME 客户端](#def-ACME-client)申请及[网页服务器](#def-web-server)使用的都是此类证书。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E7%B5%82%E7%AB%AF%E5%AF%A6%E9%AB%94%E8%AD%89%E6%9B%B8)。 {{% /def %}}

{{% def id="LE" english="Let's Encrypt" abbr="LE" %}} 一家由 [ISRG](#def-ISRG) 运营的[证书颁发机构](#def-CA)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/Let%27s_Encrypt)。 {{% /def %}}

{{% def id="mixed-content" name="混合内容" english="Mixed content" %}} 在 HTTPS 网页中通过 HTTP 加载子资源（JavaScript、CSS 或图片）。 [浏览器](#def-web-browser)可能会屏蔽混合内容，或将含有混合内容的页面标为不安全：https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content。 要解决混合内容的问题，网页开发者必须把所有资源都改为使用 HTTPS 链接。 通过浏览器内置的[开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools)可以找到哪些资源存在混合内容的问题。  {{% /def %}}

{{% def id="OCSP" name="在线证书状态协议" english="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} 一种检查[证书](#def-leaf)是否已被[吊销](#def-revocation)的方式。 也就是询问[证书颁发机构](#def-CA)，某一份证书是否尚未到期就已提前失效。 这种方式存在隐私问题，因为证书颁发机构和网络运营商都能得知谁访问了哪些网站。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%9C%A8%E7%BA%BF%E8%AF%81%E4%B9%A6%E7%8A%B6%E6%80%81%E5%8D%8F%E8%AE%AE)。 {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP 强制装订" english="OCSP Must-Staple" %}} 一种[证书](#def-leaf)扩展，告知[浏览器](#def-web-browser)使用此证书的[网页服务器](#def-web-server)必须采用 [OCSP 装订](#def-OCSP-stapling)。 这能保证每次连接时[证书](#def-leaf)的实时[吊销](#def-revocation)状态都能得到服务器确认，使吊销机制更加可靠。 [Let's Encrypt](#def-LE) 可以根据申请颁发带有 OCSP 强制装订[扩展](#def-extension)的证书。 参见 [Mozilla 安全博客文章](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/)和 [RFC 7633](https://tools.ietf.org/html/rfc7633)。 {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP 装订" english="OCSP stapling" %}} [网页服务器](#def-web-server)将[证书颁发机构](#def-CA)签名的 [OCSP](#def-OCSP) 响应直接发送给[浏览器](#def-web-browser)，使浏览器不必再自行询问证书颁发机构，从而提升网页加载速度并保护用户隐私。 这种方式也称为 TLS 证书状态请求扩展。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/OCSP%E8%A3%85%E8%AE%A2)和 [Cloudflare 博客文章](https://blog.cloudflare.com/high-reliability-ocsp-stapling/)。 {{% /def %}}

{{% def id="OID" name="对象标识符" english="Object identifier" abbr="OID" abbr_first="1" %}} 一种全球唯一的数字型标识符，由国际电信联盟（ITU）和 ISO/IEC 标准化。 OID 在证书中用于定义扩展、字段和制度声明， 具体用法由互联网协议、[证书颁发制度](#def-CP)和[证书运作声明](#def-CPS)规定。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E7%89%A9%E4%BB%B6%E8%AD%98%E8%BE%A8%E7%AC%A6)。 {{% /def %}}

{{% def id="OV" name="组织验证" english="Organization Validation" abbr="OV" abbr_first="1" %}} [CA](#def-CA) 核实[用户](#def-subscriber)的法人身份后颁发的证书， 此类证书含有该法人的相关信息。 [Let's Encrypt](#def-LE) 不提供 OV 证书。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E7%B5%84%E7%B9%94%E9%A9%97%E8%AD%89%EF%BC%88OV%EF%BC%89)。 {{% /def %}}

{{% def id="pem" name="PEM 文件（.pem）" english="PEM file (.pem)" %}} 一种密码学信息的格式（原来作为“隐私增强型邮件”互联网标准的一部分被用于保护电子邮件）。 PEM 文档可以用于表示私钥、公钥、数字证书等信息。 这些文件以“-----BEGIN”加上数据类型开头。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/Pem%E6%A0%BC%E5%BC%8F)。 {{% /def %}}

{{% def id="pfx" name="个人信息交换文件（.pfx）" english="Personal Information Exchange Files" %}} 一种文件格式，其中可包含[叶证书](#def-leaf)及其私钥，以及该证书到根证书的[证书链](#def-chain)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/PKCS_12)和 [Microsoft 硬件开发者中心文章](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files)。 {{% /def %}}

{{% def id="precertificate" name="准证书" english="Precertificate" %}} [证书透明化](#def-CT)系统的一部分。 准证书由 CA 即将颁发的[证书](#def-leaf)外加一项[关键](#def-critical)扩展组成，该扩展用于防止一般软件将准证书作为正常证书使用。 CA 将生成的准证书提交至 [CT 日志](#def-CT-log)系统，从而获得 [SCT](#def-SCT)。 由于准证书与其对应的证书并不完全相同，二者最终可能都会录入证书透明化日志系统中。 参见 [RFC 6962 第 3.1 节](https://tools.ietf.org/html/rfc6962#section-3.1)。 {{% /def %}}

{{% def id="HPKP" name="HTTP 公钥固定" english="HTTP Public Key Pinning" abbr="HPKP" %}} 一种安全机制，要求浏览器连接网站时确保[证书链](#def-chain)必须使用特定的公钥。 Chrome 浏览器曾引入这一机制应对 CA 被入侵的情况，但网站常因此出现问题，最终 Chrome [废除了该功能](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/HTTP%E5%85%AC%E9%92%A5%E5%9B%BA%E5%AE%9A)。 {{% /def %}}

{{% def id="PSL" name="公共后缀列表" english="Public Suffix List" abbr="PSL" %}} 由 Mozilla 维护的公共后缀的列表，它包含了那些可供大量实体注册的互联网域名。 例如，这个列表同时包含了 `com`和 `co.uk`，尽管 `co.uk` 不是 TLD。 网页浏览器使用这个列表和其他一些方法来防止可能是不同实体运营的网站互相共享 Cookies。 [Let's Encrypt](#def-LE) 也使用了这一列表，用于实施[速率限制](/rate-limits)。 https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="依赖方" english="Relying Party" %}} 需要使用证书中的信息的人， 例如 HTTPS 网站的用户。  {{% /def %}}

{{% def id="revocation" name="吊销" english="Revocation" %}} 证书在到期前始终有效，除非 [CA](#def-CA) 声明该证书已被提前吊销。 吊销的原因有很多种，比如私钥泄露。 浏览器可以通过 [CRL](#def-CRL)、[OCSP](#def-OCSP) 或 [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/)、[CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets) 等较新的方式核实证书是否已被吊销。 需要注意的是，[吊销证书经常无法起到作用](https://www.imperialviolet.org/2011/03/18/revocation.html)。 \[/docs/revoking\](/docs/revoking) {{% /def %}}

{{% def id="root" name="根证书" english="Root certificate" %}} 一份由[证书颁发机构](#def-CA)控制的[自签名证书](#def-self-signed)，收录于各[证书库](#def-store)中，用于签发其[中间证书](#def-intermediate)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E6%A0%B9%E8%AF%81%E4%B9%A6)。 {{% /def %}}

{{% def id="root-program" name="根证书项目" english="Root Program" %}} 组织机构对于哪些证书可收录于其[证书库](#def-store)中所作的规定，即哪些 CA 可得到其软件的信任。  {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} 一种用于加密和数字签名证书的公钥加密算法。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95)。 {{% /def %}}

{{% def id="self-signed" name="自签名证书" english="Self-signed certificate" %}} 一份[主体](#def-subject)和[颁发者](#def-issuer)相同的证书，由其自身的私钥签名。 自签名证书只能通过现实中的事先安排得到信任，例如收录于[可信根证书列表](#def-store)中。 所有[根证书](#def-root)都是自签名证书。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E8%87%AA%E7%AD%BE%E5%90%8D%E8%AF%81%E4%B9%A6)。 {{% /def %}}

{{% def id="SNI" name="服务器名称指示" english="Server Name Indication" abbr="SNI" abbr_first="1" %}} [用户代理](#def-user-agent)在 [TLS](#def-TLS) 握手过程中发送给[服务器](#def-web-server)的一个字段，表示其正在连接的域名。 如果一个 IP 地址有多个域名，服务器可以借助 SNI 提供合适的[证书](#def-leaf)。 例如，网页服务器可以根据客户端指定的 SNI 域名发送不同的证书并展示相应的内容。 SNI 没有加密，但其尚处实验阶段的替代品 ESNI 是加密的。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%90%8D%E7%A7%B0%E6%8C%87%E7%A4%BA)。 {{% /def %}}

{{% def id="SCT" name="签名证书时间戳" english="Signed Certificate Timestamp" abbr="SCT" abbr_first="1" %}} 一种经过数字签名的、可验证的承诺，保证将证书发布至[证书透明化日志](#def-CT-log)系统。 严格遵循 [CT](#def-CT) 的浏览器会检查所有网站证书或 [TLS](#def-TLS) 握手过程中的 SCT 字段，如果不符合其日志要求则拒绝连接。 这使得欺诈性的或错误的证书更容易被检测出来。  https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="安全套接字层" english="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} [TLS](#def-TLS) 的原名，至今仍然很常用。  {{% /def %}}

{{% def id="staging" name="测试环境" english="Staging" %}} [Let's Encrypt](#def-LE) 提供的接口，可用于调试证书申请流程，避免触发速率限制。 测试环境中生成的证书是*不会*被广泛信任的， 因此测试环境只应在测试、调试和 ACME 客户端开发过程中使用。 参见[测试环境文档](/docs/staging-environment)。 {{% /def %}}

{{% def id="SAN" name="主体备用名称" english="Subject Alternative Name" abbr="SAN" %}} [证书](#def-leaf)中的一个字段，表明该证书对哪些域名有效。 这一功能原先由[通用名称](#def-CN)提供，但该字段已取而代之，通用名称的这一功能也只因兼容性得以保留。 一份证书可以包含多个 SAN，从而对多个域名有效。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E4%B8%BB%E9%A2%98%E5%A4%87%E7%94%A8%E5%90%8D%E7%A7%B0)和[速率限制](/docs/rate-limits/#names-per-certificate)。 {{% /def %}}

{{% def id="subscriber" name="用户" english="Subscriber" %}} 申请证书的个人或组织。  {{% /def %}}

{{% def id="TLD" name="顶级域名" english="Top-Level Domain" abbr="TLD" abbr_first="1" %}} 域名系统中的最高层级，例如德国的 `.de`、中国的 `.cn` 等国家顶级域名（ccTLD），又如 `.com`、`.org` 等通用顶级域名（gTLD）。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E9%A0%82%E7%B4%9A%E5%9F%9F)。 {{% /def %}}

{{% def id="TLS" name="传输层安全" english="Transport-Level Security" abbr="TLS" abbr_first="1" %}} HTTPS 用于加密和认证网页访问的协议。  {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} [DANE](#def-DANE) 的一部分，专门用于验证 [TLS](#def-TLS) 连接。  {{% /def %}}

{{% def id="UCC" name="统一通信证书" english="Unified Communications Certificate" abbr="UCC" abbr_first="1" %}} 对包含多个[主体备用名称（SAN）](#def-SAN)的证书的一种称呼。 {{% /def %}}

{{% def id="web-browser" name="网页浏览器" english="Web Browser" %}} 一类用于显示网页内容的[用户代理](#def-user-agent)， 例如 *Mozilla Firefox*、*Google Chrome* 和 *Safari*。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8)。{{% /def %}}

{{% def id="user-agent" name="用户代理" english="User Agent" %}} 能够与[网页服务器](#def-web-server)通信的软件， 例如[网页浏览器](#def-web-browser)和 [cURL](https://zh.wikipedia.org/zh-cn/CURL)。 {{% /def %}}

{{% def id="web-server" name="网页服务器" english="Web server" %}} 提供网页服务的软件，广义上也可以指运行该软件的硬件。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E7%B6%B2%E9%A0%81%E4%BC%BA%E6%9C%8D%E5%99%A8)。 {{% /def %}}

{{% def id="wildcard" name="通配符证书" english="Wildcard Certificate" %}} 对下一级子域名有效的证书。 例如，[SAN](#def-SAN) 只包含 `*.example.com` 的证书对 `blog.example.com` 和 `www.example.com` 都有效，但对 `bork.bork.example.com` 和 `example.com` 都**无效**。 在子域名处使用星号（*）即表示通配符。 [Let's Encrypt](#def-LE) [从 2018 年 3 月起提供通配符证书](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579)。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/%E9%80%9A%E9%85%8D%E7%AC%A6%E8%AF%81%E4%B9%A6)。 {{% /def %}}

{{% def id="X509" abbr="X.509" %}} 定义了公钥证书格式的标准。 参见[维基百科条目](https://zh.wikipedia.org/zh-cn/X.509)。 {{% /def %}}

{{% renderglossary %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
