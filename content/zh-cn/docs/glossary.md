---
title: 术语表
slug: glossary
top_graphic: 1
date: 2018-12-30
---

{{< lastmod >}}

{{% def id="AIA" name="颁发机构信息访问" english="Authority Information Access" abbr="AIA" %}} 用于提示[用户代理](#def-user-agent)获取[证书](#def-certificate)颁发者信息的方法的证书[扩展](#def-extension)。它通常会指定用于 [OCSP](#def-OCSP) 的 URI 地址和[颁发者的 URI 地址](#def-CAI)。 {{% /def %}}

{{% def id="ACME" name="自动证书管理环境" english="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} 由 [Let's Encrypt](#def-LE) 实现的协议。与该协议兼容的软件可以用它与 Let's Encrypt 通信以获取[证书](#def-leaf)。[ACME RFC](https://tools.ietf.org/html/rfc8555) - [维基百科条目](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME 客户端" english="ACME Client" %}} 能够与 ACME 服务器通信以获取[证书](#def-leaf)的程序。 {{% /def %}}

{{% def id="ACME-server" name="ACME 服务器" english="ACME Server" %}} 与 ACME 协议兼容的能生成[证书](#def-leaf)的服务器。Let's Encrypt 开发的软件 [Boulder](#def-boulder) 与 ACME 协议兼容，但[有一些差异](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)。 {{% /def %}}

{{% def id="boulder" english="Boulder" %}} 由 [Let's Encrypt](#def-LE) 开发并使用的实现了 ACME 协议的软件。[GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="底线要求" english="Baseline Requirements" abbr="BRs" %}} 一组针对 CA 的技术和政策上的要求。由于所有[根证书项目](#def-root-program)都包含了底线要求，CA 若要被大多数浏览器信任就必须遵循这些要求。 {{% /def %}}

{{% def id="CAA" name="证书颁发机构授权" english="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} 指定允许为对应域名颁发证书的 [CA](#def-CA) 的 DNS 记录。CAA 记录由 CA 而非浏览器检查。根据[底线要求](#def-BRs)，[Let's Encrypt](#def-LE) {{<link "尊重 CAA 记录" "/docs/caa" >}}。 - [维基百科条目](https://zh.wikipedia.org/wiki/DNS%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84%E6%8E%88%E6%9D%83) {{% /def %}}

{{% def id="CNAME" name="真实名称记录" english="Canonical Name record" abbr="CNAME" %}} 将一个域名映射到另一个域名（称为真实名称）的 DNS 记录。[维基百科条目](https://zh.wikipedia.org/wiki/CNAME%E8%AE%B0%E5%BD%95) {{% /def %}}

{{% def id="CA" name="证书颁发机构" english="Certificate Authority" abbr="CA" %}} 颁发[证书](#def-leaf)的组织。[Let's Encrypt](#def-LE)、[IdenTrust](#def-IdenTrust)、Sectigo 和 DigiCert 都是证书颁发机构。[维基百科条目](https://zh.wikipedia.org/wiki/%E8%AF%81%E4%B9%A6%E9%A2%81%E5%8F%91%E6%9C%BA%E6%9E%84) {{% /def %}}

{{% def id="CAI" name="CA 颁发者" english="CA Issuers" %}} [AIA](#def-AIA) 字段的一部分，包含[证书](#def-leaf)颁发者的信息。它在[Web 服务器](#def-web-server)没有提供受信任的[证书链](#def-chain)时可能会有用。 {{% /def %}}

{{% def id="certificate" name="证书" english="Certificate" %}} 包含公钥以及其他一些描述何时使用该公钥的信息的[特定格式](#def-X509)的文件。[叶证书](#def-leaf)是最常见的证书类型。另外还有[中间证书](#def-intermediate)和[根证书](#def-root)这两种证书。 {{% /def %}}

{{% def id="extension" name="证书扩展" english="Certificate extension" %}} 在证书中，大多数字段都是由扩展来定义的。例如，[主体备用名称](#def-SAN)和 [AIA](#def-AIA) 都是扩展。扩展机制使得添加并非原始 [X.509](#def-X509) 标准一部分的新字段成为可能。 {{% /def %}}

{{% def id="CABF" name="CA/浏览器论坛" english="CA/Browser Forum" %}} 由证书颁发机构、互联网浏览器软件的供应商、操作系统和其他使用 PKI 的应用程序组成的志愿团体。CA/浏览器论坛发布了[底线要求](#def-BRs)。[Let's Encrypt](#def-LE) 是 CA/浏览器论坛的成员。[维基百科条目](https://zh.wikipedia.org/wiki/CA/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%AE%BA%E5%9D%9B) {{% /def %}}

{{% def id="chain" name="证书链" english="Certificate chain" %}} 帮助[用户代理](#def-user-agent)决定它是否可以信任[叶证书](#def-leaf)（终端实体证书）的，将该证书链接到[证书存储](#def-store)中的[根证书](#def-root)的[中间证书](#def-intermediate)列表。注意：证书链并不总是唯一的，即使网站提供了链接到一个根证书的证书链，用户代理仍可能会选择使用另一个证书链来验证证书。[维基百科条目](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="证书政策" english="Certificate Policy" abbr="CP" %}} 一组指明证书对于一个特定的有着共同安全要求的社区和/或应用类型的适用性的规则。具体颁发过程的细节由 [CPS](#def-CPS) 描述。{{<link "ISRG 证书政策" "/repository#isrg-certificate-policy" >}} - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [维基百科条目](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="证书实践声明" english="Certification Practice Statement" abbr="CPS" %}} 证书颁发机构对证书进行颁发、管理、吊销、续期、更换密钥时所采用的实践的声明。{{<link "ISRG 证书实践声明" "/repository#isrg-certification-practice-statement" >}} - [RFC 3647 3.4 节](https://tools.ietf.org/html/rfc3647#section-3.4) [维基百科条目](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="关键扩展" english="Critical extension" %}} 证书中可以包含被标记为“关键”的[扩展](#def-extension)。这意味着软件如果不知道如何处理该扩展，就必须拒绝该证书。这使得引入对于安全性十分重要的新扩展时不在较老的软件上造成风险成为可能。 {{% /def %}}

{{% def id="CRL" name="证书吊销列表" english="Certificate Revocation List" abbr="CRL" %}} 通知[用户代理](#def-user-agent)[证书](#def-leaf)的[吊销](#def-revocation)状态的方法。这是一个由 CA 签名的，包含了所有已被该 CA 吊销的证书的序列号的列表。 [维基百科条目](https://zh.wikipedia.org/wiki/%E8%AF%81%E4%B9%A6%E5%90%8A%E9%94%80%E5%88%97%E8%A1%A8) {{% /def %}}

{{% def id="CSR" name="证书签名请求" english="Certificate Signing Request" abbr="CSR" %}} 包含了 [CA](#def-CA) 生成证书时所需信息的经过签名的文件。[Let's Encrypt](#def-LE) 需要的信息有[通用名称](#def-CN)、[主体备用名称](#def-SAN)以及主体公钥信息。通常，[客户端应用程序](#def-ACME-client)会自动为用户生成 CSR，Web 托管提供商或相关设备也可能会生成 CSR。[维基百科条目](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="证书存储" english="Certificate Store" %}} 证书存储包含有受信任的[根证书](#def-root)的列表。操作系统（如 Windows、Android、Debian）和[网页浏览器](#def-web-browser)（如 Firefox）都维护有证书存储。没有证书存储的浏览器依赖于操作系统的证书存储。[Let's Encrypt](#def-LE) 提供的[证书](#def-leaf){{<link "被大多数证书存储信任" "/certificates" >}}。 {{% /def %}}

{{% def id="subject" name="证书主体" english="Certificate subject" %}} 证书的“主体”字段指明其内容。它通产包含[通用名称](#def-CN)、国家以及组织等字段。 {{% /def %}}

{{% def id="CT" name="证书透明度" english="Certificate Transparency" abbr="CT" %}} 为了增强安全性，证书（或[准证书](#def-precertificate)）必须被发布到证书透明度日志上：[https://www.certificate-transparency.org/](https://www.certificate-transparency.org/)。[Let's Encrypt](#def-LE) 生成并发布[准证书](#def-precertificate)，并在之后的[证书](#def-leaf)中包含了准证书的 [SCT](#def-SCT) 列表。部分[浏览器](#def-web-browser)（如 Google Chrome）要求这一可验证的承诺必须出现在证书中，以便其验证该证书。[维基百科条目](https://zh.wikipedia.org/wiki/%E8%AF%81%E4%B9%A6%E9%80%8F%E6%98%8E%E5%BA%A6) {{% /def %}}

{{% def id="CT-log" name="证书透明度日志" english="Certificate Transparency Log" %}} [证书透明度](#def-CT)的一个组件。它接收证书和[准证书](#def-precertificate)并将它们添加到一个永久、可验证、公开的列表中。 {{% /def %}}

{{% def id="CN" name="通用名称" english="Common Name" abbr="CN" %}} 用于描述证书内容的[主体](#def-subject)信息的一部分。对于[根证书](#def-root)和[中间证书](#def-intermediate)来说它是[证书颁发机构](#def-CA)的人类可读的名字。对于[叶证书](#def-leaf)来说它是证书上的域名之一。注意：通用名称最长 63 个字符。它曾被用于指示证书适用的域名，但现在已被废弃，因为当前的互联网标准要求软件仅通过检查[主体备用名称](#def-SAN)来确定证书的适用性。 {{% /def %}}

{{% def id="cross-signing" name="交叉签名" english="Cross Signing" %}} 一个用于签发证书的证书可以被多个[根证书](#def-root)签名。例如，[Let's Encrypt](#def-LE) 的[中间证书](#def-intermediate)由 [IdenTrust](#def-IdenTrust) 交叉签名，因为刚开始时 Let's Encrypt 的根证书还没有被各个[证书存储](#def-store)信任。技术上讲，交叉签名需要两个有着相同[主体](#def-subject)和[密钥对](#def-key-pair)的证书，它们分别由 Let's Encrypt 和 IdeaTrust 的根证书的私钥签名：[{{< relref "/certificates" >}}]({{< relref "/certificates" >}})。[维基百科条目](https://zh.wikipedia.org/wiki/X.509#%E8%AF%81%E4%B9%A6%E9%93%BE%E5%92%8C%E4%BA%A4%E5%8F%89%E8%AE%A4%E8%AF%81) {{% /def %}}

{{% def id="DANE" name="基于 DNS 的实体认证" english="DNS-based Authentication of Named Entities" abbr="DANE" %}} 使用 DNS 指明如何验证[证书](#def-leaf)或加密密钥真伪的机制。[维基百科条目](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="域名系统安全扩展" english="Domain Name System Security Extensions" abbr="DNSSEC" %}} 使用密码学认证 DNS 回复的机制。要使 DNSSEC 生效，必须在 TLD、域名所有者以及递归解析服务器上都进行部署。目前其采用率较低。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8%E6%89%A9%E5%B1%95) {{% /def %}}

{{% def id="DV" name="域名验证型证书" english="Domain-validated certificate" %}} 申请者仅证明了其对域名（而非申请的组织）的控制权的[证书](#def-leaf)。[Let's Encrypt](#def-LE) 仅提供 DV 证书，不提供 [OV](#def-OV) 或 [EV](#def-EV) 证书：{{<link "常见问题" "/docs/faq" >}} - [维基百科条目](https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E9%AA%8C%E8%AF%81%E5%9E%8B%E8%AF%81%E4%B9%A6) {{% /def %}}

{{% def id="ECDSA" name="椭圆曲线数字签名算法" english="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} 使用椭圆曲线加密的数字签名算法（DSA）的变体。[维基百科条目](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E6%95%B0%E5%AD%97%E7%AD%BE%E5%90%8D%E7%AE%97%E6%B3%95)。[Let's Encrypt](#def-LE) 支持使用 ECDSA 的[叶证书（终端实体证书）](#def-leaf)，但没有全部使用 ECDSA 的完整[证书链](#def-chain)：[{{< relref "/upcoming-features" >}}]({{< relref "/upcoming-features" >}}) {{% /def %}}

{{% def id="Ed25519" english="Ed25519" %}} 一种特殊类型的 [EdDSA](#def-EdDSA)，类似的还有 Ed448。 {{% /def %}}

{{% def id="EdDSA" name="爱德华兹曲线数字签名算法" english="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} 基于椭圆曲线的现代公钥签名系统。它是为了解决一些常见的椭圆曲线加密的[实现问题](https://ed25519.cr.yp.to/)而被设计出来的。[Let's Encrypt](#def-LE) 等证书颁发机构暂时还不能提供 EdDSA 证书。[维基百科条目](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="椭圆曲线加密" english="Elliptic Curve Cryptography" abbr="ECC" %}} 基于椭圆曲线的公钥密码学。相较于非椭圆曲线的加密方式，ECC 在提供同等的安全性的前提下使用更小的密钥。[Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [维基百科条目](https://zh.wikipedia.org/wiki/%E6%A4%AD%E5%9C%86%E6%9B%B2%E7%BA%BF%E5%AF%86%E7%A0%81%E5%AD%A6) {{% /def %}}

{{% def id="EV" name="扩展验证" english="Extended Validation" abbr="EV" %}} [CA](#def-CA) 验证对网站有控制权的法律实体的证书验证方式。此类证书包含有该实体的相关信息。[CA](#def-CA) 对此类证书的控制比 [OV](#def-OV) 证书要更严格。[Let's Encrypt](#def-LE) 不提供 EV 证书。[维基百科条目](https://zh.wikipedia.org/wiki/%E6%89%A9%E5%B1%95%E9%AA%8C%E8%AF%81%E8%AF%81%E4%B9%A6) {{% /def %}}

{{% def id="FQDN" name="完全限定域名" english="Fully qualified domain name" abbr="FQDN" %}} 网站的完整域名。例如 `www.example.com` 就是一个 *FQDN* 。 {{% /def %}}

{{% def id="IdenTrust" english="IdenTrust" %}} [证书颁发机构](#def-CA)。IdenTrust [交叉签名](#def-cross-signing)了 [Let's Encrypt](#def-LE) 的[中间证书](#def-intermediate)：[{{< relref "/certificates" >}}]({{< relref "/certificates" >}})。 [维基百科条目](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="中间证书" english="Intermediate certificate" %}} 被[根证书](#def-root)或另一个空间证书签名的，能够对其他证书签名的证书。它们被用于在保持根证书的私钥离线的前体下对叶证书进行签名。中间证书会被包含在[证书链](#def-chain)中。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E8%AD%89%E6%9B%B8%E7%A8%AE%E9%A1%9E) {{% /def %}}

{{% def id="IDNA" name="应用程序中的国际化域名" english="Internationalized Domain Names for Applications" abbr="IDNA" %}} 详见[国际化域名](#def-IDN)。 {{% /def %}}

{{% def id="IDN" name="国际化域名" english="Internationalized Domain Name" abbr="IDN" %}} 含有除了 `a` 到 `z`、`0` 到 `9` 以及短横线（`-`）以外字符的域名。比如，它们可以使用阿拉伯文、中文、西里尔文、泰米尔文、希伯来文或其他基于拉丁字母表的使用变音符号或连体字母的字符。编码后的 IDN 域名以 `xn--` 开头。[Let's Encrypt](#def-LE) 支持 IDN：[https://letsencrypt.org/2016/10/21/introducing-idn-support.html](https://letsencrypt.org/2016/10/21/introducing-idn-support.html)。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E5%8C%96%E5%9F%9F%E5%90%8D) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="互联网安全研究组" english="Internet Security Research Group" abbr="ISRG" %}} 运营 [Let's Encrypt](#def-LE) 的组织：[https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/)。[维基百科条目](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="证书颁发者" english="Certificate issuer" %}} 证书中的"颁发者"字段描述了对该证书进行签名的证书。例如，Let's Encrypt 颁发的终端实体证书的颁发者字段可能是：“Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3”。它通常包含[通用名称](#def-CN)、国家、组织等字段。颁发者字段必须与某个证书的[主体](#def-subject)字段一致。对于[自签名证书](#def-self-signed)（例如[根证书](#def-root)）来说，颁发者字段和其主体字段内容相同。“颁发者”这个词也可以被用于指代颁发其他证书的证书（[中间证书](#def-intermediate)或根证书)或组织。 {{% /def %}}

{{% def id="key-pair" name="密钥对" english="Key-pair" %}} 用于签名或加密的公钥和私钥的组合。公钥通常嵌入在证书中，而私钥则独立保密存储。根据不同的应用情况，密钥对可以用于加密和解密、签名和验证数据或是协商二级密钥。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86) {{% /def %}}

{{% def id="leaf" name="叶证书（终端实体证书）" english="Leaf certificate (end-entity certificate)" %}} 大多数情况下，证书由[中间证书](#def-intermediate)签名，对一组域名有效，且不能对其他证书签名。由 [ACME 客户端](#def-ACME-client)请求并由[Web 服务器](#def-web-server)使用的就是此类证书。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E7%B5%82%E7%AB%AF%E5%AF%A6%E9%AB%94%E8%AD%89%E6%9B%B8) {{% /def %}}

{{% def id="LE" english="Let's Encrypt" abbr="LE" %}} 由 [ISRG](#def-ISRG) 运营的[证书颁发机构](#def-CA)。[维基百科条目](https://zh.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="混合内容" english="Mixed content" %}} 在 HTTPS 网页中通过 HTTP 加载子资源（JavaScript、CSS 或图片）。[浏览器](#def-web-browser)可能会阻止加载混合内容，或者在有混合内容时将页面标记为较不安全：[https://developer.mozilla.org/zh-CN/docs/Security/MixedContent](https://developer.mozilla.org/zh-CN/docs/Security/MixedContent)。要解决混合内容的问题，网页开发者必须把所有资源都改为使用 HTTPS 链接。浏览器中的[开发者工具](https://developer.mozilla.org/zh-CN/docs/Learn/Discover_browser_developer_tools)可以用于帮助找出导致混合内容问题的资源。 {{% /def %}}

{{% def id="OCSP" name="在线证书状态协议" english="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} 检查[证书](#def-leaf)的[吊销](#def-revocation)状态的方法。也就是说，这是一个检查[证书颁发机构](#def-CA)是否表明证书不再有效（即使还没有到过期日期）的方法。这种请求可能会造成隐私问题，因为它允许证书颁发机构的互联网服务提供商直接得知谁在在访问哪些网站。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%9C%A8%E7%BA%BF%E8%AF%81%E4%B9%A6%E7%8A%B6%E6%80%81%E5%8D%8F%E8%AE%AE) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP 必须装订" english="OCSP Must-Staple" %}} 告知[浏览器](#def-web-browser)使用该证书的[Web 服务器](#def-web-server)必须使用 [OCSP 装订](#def-OCSP-stapling)的[证书](#def-leaf)扩展。它被用于确保浏览器在每次连接到 Web 服务器时都确认[证书](#def-leaf)的最新[吊销](#def-revocation)状态，以使吊销操作更加可靠。如果被请求这么做，[Let's Encrypt](#def-LE) 可以颁发带有“OCSP 必须装订”[扩展](#def-extension)的证书。[Mozilla 安全博客文章](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP 装订" english="OCSP stapling" %}} [Web 服务器](#def-web-server)向[浏览器](#def-web-browser)发送由[证书颁发机构](#def-CA)签名的 [OCSP](#def-OCSP) 回复的方法。该方法使得浏览器自身不必单独向 CA 发送 OCSP 请求，能够加快网页加载速度并增强安全性。[维基百科条目](https://zh.wikipedia.org/wiki/OCSP%E8%A3%85%E8%AE%A2) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="对象标识符" english="Object identifier" abbr="OID" %}} OID 是由国际电信联盟（ITU）和 ISO/IEC 标准化的具有唯一性的数字标识符。在证书中，OID 被用于定义扩展、字段和政策断言。互联网协议、[证书政策](#def-CP)和[证书实践声明](#def-CPS)文档定义了 OID 的使用情况。[维基百科条目](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="组织验证" english="Organization Validation" abbr="OV" %}} [CA](#def-CA) 验证了[用户](#def-subscriber)的法律实体后颁发的证书。此类证书包含有该实体的相关信息。[Let's Encrypt](#def-LE) 不提供 OV 证书。[维基百科条目](https://zh.wikipedia.org/wiki/%E5%85%AC%E9%96%8B%E9%87%91%E9%91%B0%E8%AA%8D%E8%AD%89#%E7%B5%84%E7%B9%94%E9%A9%97%E8%AD%89%EF%BC%88OV%EF%BC%89) {{% /def %}}

{{% def id="pem" name="PEM 文件（.pem）" english="PEM file (.pem)" %}} 一种密码学信息的格式（原来作为“隐私增强型邮件”互联网标准的一部分被用于保护电子邮件）。PEM 文档可以用于表示私钥、公钥、数字证书等信息。这些文件以“-----BEGIN”加上数据类型开头。[维基百科条目](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="个人信息交换文件（.pfx）" english="Personal Information Exchange Files (.pfx)" %}} 可以包含[叶证书](#def-leaf)、其链接至根证书的[证书链](#def-chain)以及叶证书的私钥的文件。详见 [https://en.wikipedia.org/wiki/PKCS_12](https://en.wikipedia.org/wiki/PKCS_12)。[微软硬件开发者中心](https://docs.microsoft.com/zh-cn/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="准证书" english="Precertificate" %}} 准证书时[证书透明度](#def-CT)的一部分。准证书是CA想要颁发的[证书](#def-leaf)一份拷贝，但它带有一个[关键](#def-critical)的有毒扩展以防止它被其他软件接受。CA 将准证书提交到 [CT 日志](#def-CT-log)以取得 [SCT](#def-SCT)。由于准证书和它对应的证书并不完全相同，证书透明度日志可能最终会同时包含两者。[RFC 6962 3.1 节]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP公钥固定" english="HTTP Public Key Pinning" abbr="HPKP" %}} 要求浏览器在将来加载网页时确保网站的[证书链](#def-chain)使用特定公钥的安全机制。Chrome 引入了这项机制来应对 CA 被入侵的情况，但是它会导致网站停止工作，所以 Chrome 又[弃用并移除了它](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8)。[维基百科条目](https://zh.wikipedia.org/wiki/HTTP%E5%85%AC%E9%92%A5%E5%9B%BA%E5%AE%9A)。 {{% /def %}}

{{% def id="PSL" name="公共后缀列表" english="Public Suffix List" abbr="PSL" %}} 由 Mozilla 维护的公共后缀的列表，它包含了那些可供大量实体注册的互联网域名。例如，这个列表同时包含了 `com` 和 `co.uk`，尽管 `co.uk` 不是 TLD。网页浏览器使用这个列表和其他一些方法来防止可能是不同实体运营的网站互相共享 Cookies。[Let's Encrypt](#def-LE) 也使用这个列表来计算速率限制：[{{< relref "/rate-limits" >}}]({{< relref "/rate-limits" >}})。https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="信任方" english="Relying Party" %}} 依赖证书中的信息的人。例如，访问 HTTPS 网站的人是一个信任方。 {{% /def %}}

{{% def id="revocation" name="吊销" english="Revocation" %}} 证书在其到期之前一直有效，除非 [CA](#def-CA) 声明它被吊销了。证书可能因包括私钥泄露在内的多种原因被吊销。浏览器可以通过 [CRL](#def-CRL)、[OCSP](#def-OCSP) 或像 [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) 和 [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets) 一类的较新的方法来检查证书是否被吊销。注意在许多情况下，[吊销证书是没有用的](https://www.imperialviolet.org/2011/03/18/revocation.html)。[{{< relref "/docs/revoking" >}}]({{< relref "/docs/revoking" >}}) {{% /def %}}

{{% def id="root" name="根证书" english="Root certificate" %}} 由[证书颁发机构](#def-CA)控制，用于对[中间证书](#def-intermediate)签名且包含在[证书存储](#def-store)内的[自签名](#def-self-signed)证书。[维基百科条目](https://zh.wikipedia.org/wiki/%E6%A0%B9%E8%AF%81%E4%B9%A6) {{% /def %}}

{{% def id="root-program" name="根证书项目" english="Root Program" %}} 有关组织用于确定在其[证书存储](#def-store)中包含哪些证书（即哪些 CA 被其软件信任）的政策。 {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} 一种用于加密和数字签名证书的公钥加密算法。[维基百科条目](https://zh.wikipedia.org/wiki/RSA%E5%8A%A0%E5%AF%86%E6%BC%94%E7%AE%97%E6%B3%95) {{% /def %}}

{{% def id="self-signed" name="自签名证书" english="Self-signed certificate" %}} 由其自己的私钥签名，并且[主体](#def-subject)与[颁发者](#def-issuer)相同的证书。自签名证书仅会因为现实世界的事先安排（例如加入到[受信任的根证书列表](#def-store)中）而被信任。[根证书](#def-root)都是自签名的。[维基百科条目](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="服务器名称指示" english="Server Name Indication" abbr="SNI" %}} 在 [TLS](#def-TLS) 握手时由[用户代理](#def-user-agent)发送给[服务器](#def-web-server)，用于指定要连接的域名的字段。当同一个 IP 地址下有多个域名时，它允许服务器能够使用正确的[证书](#def-leaf)回应请求。Web 服务器可能会根据客户端用 SNI 指定的域名发送不同证书并且显示不同的内容。SNI 没有被加密，但它的实验性的替代品 ESNI 是被加密的。[维基百科条目](https://zh.wikipedia.org/wiki/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%90%8D%E7%A7%B0%E6%8C%87%E7%A4%BA) {{% /def %}}

{{% def id="SCT" name="签名证书时间戳" english="Signed Certificate Timestamp" abbr="SCT" %}} [证书透明度日志](#def-CT-log)提供的经过签名且可验证的对发布证书的承诺。使用 [CT](#def-CT) 浏览器会在网站的证书或是 [TLS](#def-TLS) 握手消息中检查 SCT 是否存在，并拒绝连接到不符合其日志要求的网站。这使得欺诈性的或错误的证书更容易被检测出来。https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="安全套接字层" english="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} [TLS](#def-TLS) 以前的名字，仍旧很常用。 {{% /def %}}

{{% def id="staging" name="测试" english="Staging" %}} [Let's Encrypt](#def-LE) 提供了用于在不会影响速率限制的前提下测试证书请求的测试 API。由测试环境生成的证书是 *不* 被信任的。测试环境应仅用于测试、调试和 ACME 客户端开发的目的。[{{< relref "/docs/staging-environment" >}}]({{< relref "/docs/staging-environment" >}}) {{% /def %}}

{{% def id="SAN" name="主体备用名称" english="Subject Alternative Name" abbr="SAN" %}} [证书](#def-leaf)中用于指定其对哪些域名有效的字段。它代替了[通用名称](#def-CN)字段（后者现在仅因兼容性原因而提供）。单个证书可能包含多个 SAN 以使其对多个不同域名生效。[维基百科条目](https://zh.wikipedia.org/wiki/%E4%B8%BB%E9%A2%98%E5%A4%87%E7%94%A8%E5%90%8D%E7%A7%B0) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="用户" english="Subscriber" %}} 请求证书的个人或组织。 {{% /def %}}

{{% def id="TLD" name="顶级域名" english="Top-Level Domain" abbr="TLD" %}} 分级域名系统中的最高等级，例如 `.de`（德国）、`.cn`（中国）一类的国家顶级域名（ccTLD）和 `.com`、`.org` 一类的通用顶级域名（gTLD）。[维基百科条目](https://zh.wikipedia.org/wiki/%E9%A0%82%E7%B4%9A%E5%9F%9F) {{% /def %}}

{{% def id="TLS" name="传输层安全" english="Transport-Level Security" abbr="TLS" abbr_first="1" %}} HTTPS 用于加密和认证网页访问的协议。 {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} [DANE](#def-DANE) 中专门与验证 [TLS](#def-TLS) 连接有关的部分。 {{% /def %}}

{{% def id="UCC" name="统一通信证书" english="Unified Communications Certificate" abbr="UCC" %}} 包含多个[主体备用名称（SAN）](#def-SAN)的证书。 {{% /def %}}

{{% def id="web-browser" name="网页浏览器" english="Web Browser" %}} 用于显示网页的[用户代理](#def-user-agent)。例如： *Mozilla Firefox* ， *Google Chrome* 和 *Internet Explorer* 。[维基百科条目](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8) {{% /def %}}

{{% def id="user-agent" name="用户代理" english="User Agent" %}} 能够与[Web 服务器](#def-web-server)通信的软件。例如：[网页浏览器](#def-web-browser)和 [cURL](https://zh.wikipedia.org/wiki/CURL)。 {{% /def %}}

{{% def id="web-server" name="Web 服务器" english="Web server" %}} 提供网页服务的软件（广义上也可以指运行该软件的硬件）。 [维基百科条目](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="通配符证书" english="Wildcard Certificate" %}} 对整一级子域名有效的证书。例如，含有 `*.example.com` [SAN](#def-SAN) 的证书对 `blog.example.com` 和 `www.example.com` 都有效，但是对 `bork.bork.example.com` 或 `example.com` 都**无效**。在子域名处使用星号（*）即表示通配符。[Let's Encrypt](#def-LE) [从 2018 年 3 月起提供通配符证书](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579)。[维基百科条目](https://zh.wikipedia.org/wiki/%E9%80%9A%E9%85%8D%E7%AC%A6%E8%AF%81%E4%B9%A6) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} 定义了公钥证书格式的标准。[维基百科条目](https://zh.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
