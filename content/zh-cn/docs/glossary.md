---
title: 术语表
slug: glossary
top_graphic: 1
date: 2018-12-30
---

{{< lastmod >}}

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

{{% def id="AIA" name="授权信息访问" abbr="AIA" %}} 证书[扩展](#def-extension)，用于指导[用户代理](#def-user-agent)如何获取[证书](#def-certificate)颁发者信息。它通常指定[OCSP](#def-OCSP) URI和[发布人URI](#def-CAI). {{% /def %}}

{{% def id="ACME" name="自动证书管理环境" abbr="ACME" abbr_first="1" %}}[Let's Encrypt](#def-LE)使用的协议。兼容这个协议的软件可以使用该协议与Let's Encrypt通信来获取[证书](#def-leaf). [ACME草案](https://tools.ietf.org/html/draft-ietf-acme-acme-16) - [维基百科](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME客户端" %}} 能够与ACME服务器通信请求[证书](#def-leaf)的程序。 {{% /def %}}

{{% def id="ACME-server" name="ACME服务器" %}} 一个ACME兼容可生成[证书](#def-leaf)的服务器。 Let's Encrypt的软件, [Boulder](#def-boulder)是兼容ACME的[有一定的分歧](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} 实施ACME的软件，由[Let's Encrypt](#def-LE)开发使用。 [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="基线要求" abbr="BRs" %}} CA的一组技术和策略需求。由于所有主要的[根程序](#def-root-program)（＃def-root-program）都包含基线要求，CA必须遵循这些需求才能被大部分浏览器信任。 {{% /def %}}

{{% def id="CAA" name="证书颁发机构授权" abbr="CAA" abbr_first="1" %}} 一条DNS记录，指定允许哪些[CA](#def-CA)为相应的域名发布证书。CAA记录由CA检验，不是浏览器。 [Let's Encrypt](#def-LE)根据[基线需求](#def-BRs)需要[授权CAA记录](https://letsencrypt.org/docs/caa/). - [维基百科](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="规范名称记录" abbr="CNAME" %}} 将一个域名映射到另一个域名的DNS条目，称为规范名称。 [维基百科](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="证书颁发机构" abbr="CA" %}} 发布[证书](#def-leaf)的机构。 [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, 和DigiCert都是证书颁发机构。 [维基百科](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="证书颁发机构发行人" %}} [授权信息访问](#def-AIA)内容的一部分，包含有关[证书](#def-leaf)颁发者信息。当一个[网络服务器](#def-web-server)不能提供一个可信的[证书链](#def-chain)的时候可能有用。 {{% /def %}}

{{% def id="certificate" name="证书" %}} 包含公钥的[特定格式](#def-X509)的文件以及描述何时使用该公钥的其他数据。 最常见的证书是[叶子证书](#def-leaf)。还有[中间](#def-intermediate)和[根](#def-root) 证书。 {{% /def %}}

{{% def id="extension" name="证书扩展" %}} 在证书中，大多数字段由扩展名定义。例如，[主题替代名称](#def-SAN)和[授权信息访问](#def-AIA)是扩展名。扩展机制允许创建不属于原始[X.509](#def-X509)标准的新字段。 {{% /def %}}

{{% def id="CABF" name="证书颁发机构/浏览器（CA/Browser）论坛" %}} 认证机构、互联网浏览器软件供应商、操作系统和其他支持PKI的应用程序的志愿组织。证书颁发机构/浏览器（CA/Browser）论坛发布[基线要求](#def-BRs). [Let's Encrypt](#def-LE)是CA/Browser论坛的一员。[维基百科](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="证书链" %}} [中级证书](#def-intermediate)列表，通过将其连接到其[证书存储](#def-store)中的[根证书](#def-root)，帮助[用户代理](#def-user-agent)确定它可以信任终端实体或[叶子证书](#def-leaf)。注意：证书链并不总是唯一的，当网站提供通向一个根的证书链时，用户代理可能决定使用另一个链来验证证书。[维基百科](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="证书政策" abbr="CP" %}} 一组命名规则，用于指示证书对具有共同安全要求的特定组织和/或应用程序类的适用性。发行的具体细节在[CPS](#def-CPS)中列出。[ISRG证书政策](https://letsencrypt.org/repository/#isrg-certificate-policy) - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [维基百科](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="认证实践声明" abbr="CPS" %}} 证书颁发机构在颁发，管理，撤销，续订或重新键入证书时使用的做法声明。[ISRG证书声明](https://letsencrypt.org/repository/#isrg-certification-practice-statement) - [RFC 3647 section 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [维基百科](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="关键扩展" %}} 证书可能包含标记为"关键"的[扩展名](#def-extension)。这意味着除非软件了解如何处理该扩展，否则软件必须拒绝该证书。这样就可以引入对安全性至关重要的新扩展，而不会为旧软件带来风险。 {{% /def %}}

{{% def id="CRL" name="证书撤销清单" abbr="CRL" %}} 通知[用户代理](#def-user-agent)[证书](#def-leaf)[撤销](#def-revocation)的方法。这是由该CA签名的来自给定CA的所有已撤销证书的序列号列表。[维基百科](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="证书签名请求" abbr="CSR" %}} 一个签名文件，包含[CA](#def-CA)生成证书所需的所需信息。[Let's Encrypt](#def-LE)的相关信息是[常用名称](#def-CN)，[主题替代名称](#def-SAN)和主题公钥信息。通常，[客户端应用程序](#def-ACME-client)自动地为用户生成证书签名请求，网络托管服务提供商或设备也也可能生成CSR。[维基百科](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="证书商店" %}} 证书商店包含一系列可信任的[根](#def-root)。操作系统（例如Windows，安卓或塞班）和[网络浏览器](#def-web-browser) (例如火狐) 拥有证书商店。浏览器的证书商店不依赖操作系统的证书商店。[Let's Encrypt](#def-LE)提供的证书 [Certificates](#def-leaf)被[大多数证书商店信任](https://letsencrypt.org/certificates/)。 {{% /def %}}

{{% def id="subject" name="证书主题" %}} 证书的"主题"说明了证书的内容。最常包含的列是[常用名称](#def-CN)、国家和组织。 {{% /def %}}

{{% def id="CT" name="证书透明度" abbr="CT" %}} 为了提高安全，证书(或者[预证书](#def-precertificate))必须在证书透明度日志（https://www.certificate-transparency.org/）中发布。 [Let's Encrypt](#def-LE)生成发布[预证书](#def-precertificate), 并在后续的[证书](#def-leaf)中包括预证书的[SCTs](#def-SCT)清单。一些[浏览器](#def-web-browser)，例如谷歌Chrome，要求存在此可验证的承诺以验证证书。[维基百科](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="证书透明度日志" %}} [证书透明度](#def-CT)的组成部分，能接收证书和[预证书](#def-precertificate)的提交，并将它们整合到一个永久的、可验证的、可公开访问的列表。 {{% /def %}}

{{% def id="CN" name="常用名称" abbr="CN" %}} 证书[主题](#def-subject)的一部分，描述证书是什么。对于[根](#def-root)和[中间](#def-intermediate)，它是[证书授权](#def-CA)可读名称。对于[叶子证书](#def-leaf)，它是证书上的域名。注意：常用名称限制在63个字符以内。它是一种过时的方法，用于指示证书适用的域名。因为当前的互联网标准要求软件仅检查[主题备选名称](#def-SAN)以确定证书的适用性。 {{% /def %}}

{{% def id="cross-signing" name="交叉签名" %}} 一个发布的证书可能被多个[根](#def-root)签名。例如，[Let's Encrypt](#def-LE)[中间件](#def-intermediate)被[IdenTrust](#def-IdenTrust)交叉签名，因为在启动时，证书存储尚未被[证书商店](#def-store)信任。从技术上讲，它通过两个颁发证书实现，使用相同[主题](#def-subject)和相同的[密钥对](#def-key-pair)，一个被Let's Encrypt根的私钥签名，另一个被IdenTrust根的私钥：https://letsencrypt.org/certificates/。 [维基百科](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="基于DNS的命名实体认证" abbr="DANE" %}} 一种使用DNS来指示如何验证所提供的[证书](#def-leaf)或加密密钥的真实性的机制。[维基百科](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="域名系统安全扩展" abbr="DNSSEC" %}} 一种加密验证DNS响应的机制。域名系统安全扩展需要TLD、域名所有者和递归解析器部署才能生效。使用率目前有点低。[维基百科](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="域名验证证书" %}} [证书](#def-leaf)申请人仅证明其对域名的控制权（而非申请组织的身份）。[Let's Encrypt](#def-LE)只提供DV证书(非[OV](#def-OV)或者[EV](#def-EV)): [FAQ](https://letsencrypt.org/docs/faq/) - [维基百科](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="椭圆曲线数字签名算法" abbr="ECDSA" abbr_first="1" %}} 数字签名算法（DSA）的一种变体，它使用椭圆曲线加密。[维基百科](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE)为[终端实体或叶子证书](#def-leaf)支持ECDSA，但不支持整个[证书链](#def-chain): https://letsencrypt.org/upcoming-features/ {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}}和Ed448一起，是[椭圆曲线数字签名算法](#def-EdDSA)的一个特殊类型。 {{% /def %}}

{{% def id="EdDSA" name="Edwards曲线数字签名算法" abbr="EdDSA" abbr_first="1" %}}  一种基于椭圆曲线的现代公钥签名系统，设计出来用于解决多个常见的[实施问题](https://ed25519.cr.yp.to/)。像[Let's Encrypt](#def-LE)一样的证书颁发机构还不能提供Edwards曲线数字签名算法。[维基百科](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="椭圆曲线密码学" abbr="ECC" %}} 一种基于椭圆曲线的公钥密码学。与非EC加密相比，椭圆曲线密码学使用更小的密钥，同时提供相同的安全性。[Cloudflare](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [维基百科](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="扩展验证" abbr="EV" %}} 一种证书验证，[证书颁发机构](#def-CA)已经验证了控制网站的合法实体。他们包含实体信息。[证书颁发机构](#def-CA)的控制比[OV](#def-OV)证书更加严格。[Let's Encrypt](#def-LE)不提供EV证书。[维基百科](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="完全合格的域名" abbr="FQDN" %}} 网站的完整域名。例如，`www.example.com` 是完整合格的域名。 {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} 一个[证书颁发机构](#def-CA)。IdenTrust拥有[交叉签名](#def-cross-signing) [Let's Encrypt](#def-LE) [中级证书](#def-intermediate): [https://letsencrypt.org/certificates/](https://letsencrypt.org/certificates/). [维基百科](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="中级证书" %}} 由[根](#def-root)或其他中间人签名并且能够签署其他证书的证书，并且能够签署其他证书的证书。它们用于签署叶证书，同时保持根证书的私钥离线。 [证书链](#def-chain)包含中级证书。[维基百科](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="应用程序的国际化域名" abbr="IDNA" %}} 查看[国际域名](#def-IDN). {{% /def %}}

{{% def id="IDN" name="国际域名" abbr="IDN" %}} 包含`a`到`z`, `0`到`9`和(`-`)以外的域名。例如，它们可以包含带有变音符号或连字符的阿拉伯语，中文，西里尔语，泰米尔语，希伯来语或拉丁字母字符。IDN域名的编码表示以`xn  - `开头。[Let's Encrypt](#def-LE)支持IDNs: https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [维基百科](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="互联网安全研究组" abbr="ISRG" %}} [Let's Encrypt](#def-LE)背后的组织: https://www.abetterinternet.org/about/. [维基百科](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="证书颁发者" %}} 证书的“颁发者”字段描述了对其签名的证书。例如，Let's Encrypt终端实体证书Issuer字段可能为"Issuer: C = US, O = Let's Encrypt, CN = Let's Encrypt Authority X3"。它经常包含字段如[常用名称](#def-CN)国家，组织。发布者字段经常与一些证书的[主题](#def-subject)字段想匹配。对于像[根证书](#def-root一样的[自签](#def-self-signed)，发布者与主题一致。"发布者"也可以用来表示颁发其他证书(一个[中级](#def-intermediate)或者根)的证书，或者表示一个发布证书的组织。{{% /def %}}

{{% def id="key-pair" name="秘钥对" %}} 用于签名或加密的私钥和公钥的组合。公钥通常嵌入在证书中，而私钥是自己存储的，应该保密。密钥可以用于加密和解密，签名和验证数据，或协商辅助密钥，具体取决于应用程序。 [维基百科](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="叶子证书(终端实体证书)" %}} 大多数情况，证书由[中级证书](#def-intermediate)签名，对一组域有效且无法对其他证书签名。这是[ACME客户端](#def-ACME-client)请求的证书类型, 并且被[web服务器](#def-web-server)使用。[维基百科](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} 由[ISRG](#def-ISRG)运营的[证书颁发机构](#def-CA)。[维基百科](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="混合内容" %}} 当一个HTTPS页面在HTTP的基础上加载子资源(Javascript, CSS 或者 images)。[浏览器](#def-web-browser)可能阻止混合内容，或当存在混合内容时将页面标记为不太安全: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. 为了解决混合内容问题，Web开发人员必须更改其页面，以便所有资源都使用HTTPS URL。浏览器中的[开发者工具](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)可以被用来找到哪个资源会造成混合内容问题。 {{% /def %}}

{{% def id="OCSP" name="在线证书状态协议" abbr="OCSP" abbr_first="1" %}} 检查[证书](#def-leaf)[回收](#def-revocation)的方法。换句话说，一种检查[证书颁发机构](#def-CA)是否表明证书不再被视为有效的方法，即使其到期日期尚未达到。此请求可能会产生隐私问题，因为它允许证书颁发机构和Internet服务提供商直接观察谁正在访问哪些站点。[维基百科](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="在线证书状态协议 Must-Staple" %}} 一个[证书](#def-leaf)扩展，告知[浏览器](#def-web-browser)有证书的[网络服务器](#def-web-server)必须使用[OCSP stapling](#def-OCSP-staping)。它用来要求Web服务器在每个连接上确认[证书](#def-leaf)的最新[回收](#def-revocation)状态，使回收更加可靠。[Let's Encrypt](#def-LE)可以根据请求，发布OCSP Must-Staple[扩展](#def-extension)的证书。[Mozilla安全日志](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="在线证书状态协议 stapling" %}} [web服务器](#def-web-server)发送给[浏览器](#def-web-browser)一个由[证书颁发机构](#def-CA)签名的[在线证书状态协议](#def-OCSP)响应的方式, 所以浏览器本身不需要向证书颁发机构发送二次在线证书状态协议请求,提高了速度和隐私。也称为TLS证书状态请求扩展。 [维基百科](https://en.wikipedia.org/wiki/OCSP_stapling) [Cloudflare](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="对象标识符" abbr="OID" %}} OID是由国际电信联盟（ITU）和ISO / IEC标准化的唯一数字标识符。OID在证书中用于定义扩展，字段或策略断言。网络标准和[证书策略](#def-CP)和[认证实践申明](#def-CPS)文档定义了对象标识符怎么使用。 [维基百科](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="组织验证" abbr="OV" %}} [证书颁发机构](#def-CA)验证[订阅者](#def-subscriber)法人实体的证书。他们包含实体信息。 [Let's Encrypt](#def-LE)不提供OV证书。 [维基百科](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM文件 (.pem)" %}} 加密信息的格式（最初指定为隐私增强邮件互联网安全电子邮件标准的一部分）。一个PEM文档能够代表私钥、公钥或数字证书信息。这些文件以"-\-\-\--BEGIN "开头，让后是一个数据类型。[维基百科](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="个人信息交换文件(.pfx)" %}} 可能包含[叶子证书](#def-leaf)的文件，它的[证书链](#def-chain)到根和叶子的私钥。也可以查看https://en.wikipedia.org/wiki/PKCS_12. [微软硬件发展中心](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="预证书" %}} 预证书是[证书透明度](#def-CT)的一部分。一个预证书是证书机构打算发布的[证书](#def-leaf)的副本，并且包含[严重的](#def-critical)病毒扩展，用来保护预证书被软件广泛接受。证书颁发机构提交一个预证书到[CT日志](#def-CT-log)来交换[SCTs](#def-SCT)。由于预证书与其相应的真正的证书不同，因此证书透明度日志最终可能包含两者。[RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP公钥固定" abbr="HPKP" %}} 一种安全机制，要求浏览器要求站点的[证书链](#def-chain)在将来加载时使用某些公钥。Chrome曾引入了此机制以防止CA泄露，但它导致网站中断，以至于Chrome[弃用并删除](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8)。 [维基百科](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="公共后缀列表" abbr="PSL" %}} 由Mozilla维护的*公共后缀*列表，指示哪些Internet域可用于许多单独的实体以注册子域。例如，该列表表明'com`和`co.uk`都是公共后缀，即使`co.uk`不是TLD。除其他外，Web浏览器使用该列表来防止可能由不同实体操作的站点彼此共享Web cookie。 [Let's Encrypt](#def-LE)也是用这个列表进行速率限制计算: https://letsencrypt.org/docs/rate-limits/. https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="依赖方" %}} 人依赖证书中的信息。例如，谁访问HTTPS网站是一个依赖方。 {{% /def %}}

{{% def id="revocation" name="回收" %}} 一个证书在过期前都是有效的，除非[证书发布机构](#def-CA)说它被回收了。证书被回收有多种原因，例如私钥泄漏。浏览器使用[CRL](#def-CRL), [OCSP](#def-OCSP), 或者更新的方法如[OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/)和[CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets)检验证书是否被回收。注意在很多场景，[回收不工作](https://www.imperialviolet.org/2011/03/18/revocation.html). https://letsencrypt.org/docs/revoking/ {{% /def %}}

{{% def id="root" name="根证书" %}} 一个被[证书发布机构](#def-CA)控制的[自签](#def-self-signed)证书，用来为[中级](#def-intermediate)证书签名，并且包含在[证书商店](#def-store). [维基百科](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="根程序" %}} 组织用来决定哪个证书[证书商店](#def-store)的政策，并且决定他们的软件被哪个证书颁发机构信任。 {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} 用于加密和对证书进行数字签名的公钥算法。[维基百科](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="自签证书" %}} 由自己私钥签名的证书，其[主题](#def-subject)与[发布者](#def-issuer)一致。自签名证书仅受到物理世界中事先安排的信任，例如包含在[受信任的根列表](#def-store). [根证书](#def-root)是自签的。[维基百科](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="服务器名称指示" abbr="SNI" %}} [用户代理](#def-user-agent)在[TLS](#def-TLS)握手期间发送到[服务器](#def-web-server)的字段，指定要连接的域名。这允许服务器在多个域托管在同一IP后面时使用适当的[证书](#def-leaf)进行应答。Web服务器可能会发送不同的证书，并显示不同的内容，具体取决于客户端请求SNI的名称。SNI没有加密，但ESNI是实验性替代品。[维基百科](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="签名证书时间戳" abbr="SCT" %}} 来源于[证书透明度日志](#def-CT-log)发布证书的签名的，可验证的承诺。浏览器强制[日志透明](#def-CT)检查站点证书或[TLS](#def-TLS)握手中是否存在SCT，并拒绝连接到不符合其日志记录要求的站点。这增加了检测到欺诈或不准确证书的可能性。https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="安全链路层" abbr="SSL" abbr_first="1" %}} [TLS](#def-TLS)老的名字，仍然在使用。 {{% /def %}}

{{% def id="staging" name="临时" %}} [Let's Encrypt](#def-LE)提供临时API以测试证书请求，而不会影响速率限制。临时环境生成的证书不被公众信任。临时环境应该用来做测试、调试和ACME客户端开发使用。 https://letsencrypt.org/docs/staging-environment/ {{% /def %}}

{{% def id="SAN" name="主题备选名称" abbr="SAN" %}} [证书](#def-leaf)的一个字段，用来表明证书在哪些域名是有效的。它代替了现在仅出于兼容性原因提供的[常用名称](#def-CN)的使用。单个证书可能包含许多SAN，并且对许多不同的域名有效。[维基百科](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="订阅者" %}} 请求证书的个人或组织。{{% /def %}}

{{% def id="TLD" name="最高级别域名" abbr="TLD" %}} 分层域名系统中的最高级别，例如国家代码顶级域名（ccTLD），如`.de`（德国），`。cn`（中国）和通用顶级域名（gTLD），如.com `，`.org`。[维基百科](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="传输级安全性" abbr="TLS" abbr_first="1" %}} HTTPS用于加密和验证网页访问的协议。 {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} [DANE](#def-DANE)的一部分，尤其与验证[TLS](#def-TLS)连接有关。 {{% /def %}}

{{% def id="UCC" name="统一通信证书" abbr="UCC" %}} 证书的描述，包含多个[主题备选名称 (SANs)](#def-SAN). {{% /def %}}

{{% def id="web-browser" name="网页浏览器" %}} 一个[用户代理](#def-user-agent)用来呈现网页。例如：*Mozilla火狐*, *谷歌Chrome* 或者 *Internet Explorer*。[维基百科](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="用户代理" %}} 能够与[网络服务器](#def-web-server)通信的软件。例如：一个[网页浏览器](#def-web-browser)或者[cURL](https://en.wikipedia.org/wiki/CURL).{{% /def %}}

{{% def id="web-server" name="网络服务器" %}} 提供网页的软件(或者，通过扩展，托管它的硬件服务器)。[维基百科](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="通配符证书" %}} 证书对一级深度的子域有效。例如，包含`* .example.com`的[SAN](#def-SAN)的证书对于`blog.example.com`和`www.example.com`有效，但**不是**对于` bork.bork.example.com`或`example.com`）。通配符由星号字符（*）代替子域表示。[Let's Encrypt](#def-LE) [提供截至2018年3月的通配符证书](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [维基百科](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} 定义公钥证书格式的标准。 [维基百科](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
