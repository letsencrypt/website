---
title: 용어 사전
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

{{% def id="AIA" name="Authority Information Access" abbr="AIA" %}} [인증서](#def-certificate)의 발급자에 대한 정보를 얻는 방법을 [사용자 에이전트](#def-user-agent)에 나타내는 데 사용되는 인증서 [연장](#def-extension)입니다. 일반적으로 [OCSP](#def-OCSP) URI와 [발행인 URI](#def-CAI)를 지정합니다. {{% /def %}}

{{% def id="ACME" name="Automatic Certificate Management Environment" abbr="ACME" abbr_first="1" %}} [Let's Encrypt](#def-LE)에서 구현한 프로토콜입니다. 해당 프로토콜과 호환되는 소프트웨어는 Let's Encrypt를 사용하여 [인증서](#def-leaf)를 요청할 수 있습니다. [ACME RFC](https://tools.ietf.org/html/rfc8555) - [위키피디아](https://en.wikipedia.org/wiki/Automated_Certificate_Management_Environment) {{% /def %}}

{{% def id="ACME-client" name="ACME Client" %}} ACME 서버와 통신하여 [인증서](#def-leaf)를 요청할 수 있는 프로그램입니다. {{% /def %}}

{{% def id="ACME-server" name="ACME Server" %}} [인증서](#def-leaf)를 생성할 수 있는 ACME 호환 서버입니다. Let's Encrypt의 소프트웨어인 [Bolder](#def-boulder)는 ACME와 호환되며, [일부 차이점이 있습니다](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md). {{% /def %}}

{{% def id="boulder" name="Boulder" %}} [Let's Encrypt](#def-LE)에서 개발하고 사용하는 ACME를 구현하는 소프트웨어입니다. [GitHub](https://github.com/letsencrypt/boulder) {{% /def %}}

{{% def id="BRs" name="Baseline Requirements" abbr="BRs" %}} CA에 대한 일련의 기술 및 정책 요구 사항입니다. 모든 주요 [root 프로그램](#def-root-program)에는 기본 요구 사항이 포함되므로 CA는 대부분의 브라우저에서 신뢰할 수 있는 다음 요구 사항을 따라야 합니다. {{% /def %}}

{{% def id="CAA" name="Certificate Authority Authorization" abbr="CAA" abbr_first="1" %}} 해당 도메인 이름에 대한 인증서를 발급할 수 있는 [CA](#def-CA)를 지정하는 DNS 레코드입니다. CAA 레코드는 브라우저가 아니라 CA에서 확인합니다. [Let's Encrypt](#def-LE) {{<link "명예 CAA 레코드" "/docs/caa" >}}에서 요구하는 대로 [기본 요구사항](#def-BRs)를 암호화합니다. - [위키피디아](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) {{% /def %}}

{{% def id="CNAME" name="Canonical Name record" abbr="CNAME" %}} 하나의 도메인 이름을 다른 도메인에 매핑하는 DNS 항목으로, 정형 이름이라고 합니다. [위키피디아](https://en.wikipedia.org/wiki/CNAME_record) {{% /def %}}

{{% def id="CA" name="Certificate Authority" abbr="CA" %}} [인증서](#def-leaf)를 발급하는 조직입니다. [Let's Encrypt](#def-LE), [IdenTrust](#def-IdenTrust), Sectigo, DigiCert가 인증 기관입니다. [위키피디아](https://en.wikipedia.org/wiki/Certificate_authority) {{% /def %}}

{{% def id="CAI" name="CA Issuers" %}} [AIA](#def-AIA) 필드에 [인증서](#def-leaf)의 발급자에 대한 정보가 포함되어 있습니다. [웹 서버](#def-web-server)가 신뢰할 수 있는 [인증서 체인](#def-chain)을 제공하지 않은 경우 유용할 수 있습니다. {{% /def %}}

{{% def id="certificate" name="Certificate" %}} 공용 키와 공용 키 사용 시기를 설명하는 기타 데이터가 들어 있는 [특정 형식](#def-X509)의 파일입니다. 가장 일반적인 종류의 인증서는 [리프 인증서](#def-leaf)입니다. [중간 인증서](#def-intermediate) 및 [root 인증서](#def-root)도 있습니다. {{% /def %}}

{{% def id="extension" name="Certificate extension" %}} 인증서에서는 대부분의 필드가 확장으로 정의됩니다. 예를 들어 [제목 대체 이름](#def-SAN) 및 [AIA](#def-AIA)는 확장입니다. 확장 메커니즘을 사용하면 원래 [X.509](#def-X509) 표준의 일부가 아닌 새 필드를 작성할 수 있습니다. {{% /def %}}

{{% def id="CABF" name="CA/Browser Forum" %}} 인증 기관, 인터넷 브라우저 소프트웨어 공급업체, 운영체제 및 기타 PKI 지원 응용 프로그램의 자발적 그룹입니다. CA/Browser Forum은 [기본 요구사항](#def-BRs)를 발행합니다. [Let's Encrypt](#def-LE)는 CA/Browser Forum의 회원입니다. [위키피디아](https://en.wikipedia.org/wiki/CA/Browser_Forum) {{% /def %}}

{{% def id="chain" name="Certificate chain" %}} [사용자 에이전트](#def-user-agent)가 [인증서 저장소](#def-store)의 [root 인증서](#def-root)에 연결하여 엔드 엔티티 또는 [리프 인증서](#def-leaf)를 신뢰할 수 있다고 판단하는 데 도움이 되는 [중간 인증서](#def-intermediate) 목록입니다. 참고: 체인이 항상 고유한 것은 아니며, 웹 사이트에서 하나의 root로 이어지는 인증서 체인을 표시할 때 사용자 에이전트는 다른 체인을 사용하여 인증서를 검증하도록 결정할 수 있습니다. [위키피디아](https://en.wikipedia.org/wiki/Public_key_certificate) {{% /def %}}

{{% def id="CP" name="Certificate Policy" abbr="CP" %}} 공통 보안 요구 사항이 있는 특정 커뮤니티 및 또는 애플리케이션 클래스에 인증서를 적용할 수 있음을 나타내는 명명된 규칙 집합입니다. 발행의 구체적인 내역은 [CPS](#def-CPS)에 정리되어 있습니다. {{<link "ISRG 인증서 정책" "/repository#isrg-certificate-policy" >}} - [RFC 3647](https://tools.ietf.org/html/rfc3647) - [위키피디아](https://en.wikipedia.org/wiki/Certificate_policy) {{% /def %}}

{{% def id="CPS" name="Certification Practice Statement" abbr="CPS" %}} 인증 기관에서 인증서를 발급, 관리, 해지 및 갱신 또는 재입력하는 데 사용하는 관행에 대한 설명입니다. {{<link "ISRG 인증 실무 명세서" "/repository#isrg-certification-practice-statement" >}} - [RFC 3647 3.4](https://tools.ietf.org/html/rfc3647#section-3.4) [위키피디아](https://en.wikipedia.org/wiki/Certification_Practice_Statement) {{% /def %}}

{{% def id="critical" name="Critical extension" %}} 인증서에 "중요"라고 표시된 [확장](#def-extension)이 포함될 수 있습니다. 즉, 소프트웨어가 확장을 처리하는 방법을 이해하지 않는 한 해당 인증서를 거부해야 합니다. 따라서 오래된 소프트웨어에 대한 위험을 야기하지 않고 보안에 중요한 새로운 확장을 도입할 수 있습니다. {{% /def %}}

{{% def id="CRL" name="Certificate Revocation List" abbr="CRL" %}} [사용자 에이전트](#def-user-agent)에 [인증서](#def-leaf)의 [해지](#def-revocation) 상태를 알리는 방법입니다. 이 목록은 해당 CA 중 서명하고 지정된 CA에서 해지한 모든 인증서의 일련 번호 목록입니다. [위키피디아](https://en.wikipedia.org/wiki/Certificate_revocation_list) {{% /def %}}

{{% def id="CSR" name="Certificate Signing Request" abbr="CSR" %}} [CA](#def-CA)에서 인증서를 생성하는 데 필요한 정보가 들어 있는 서명된 파일입니다. [Let's Encrypt](#def-LE)에 대한 관련 정보는 [공통 이름](#def-CN), [제목 대체 이름](#def-SAN), 제목 공개 키 정보입니다. 일반적으로 [클라이언트 응용 프로그램](#def-ACME-client)은 사용자에 대한 CSR을 자동으로 생성합니다. 웹 호스팅 공급자 또는 장치도 CSR을 생성할 수 있습니다. [위키피디아](https://en.wikipedia.org/wiki/Certificate_signing_request) {{% /def %}}

{{% def id="store" name="Certificate Store" %}} 인증서 저장소에는 신뢰할 수 있는 [root 인증서](#def-root) 목록이 있습니다. 운영체제(예: Windows, Android 또는 Debian) 및 [웹 브라우저](#def-web-browser) (예: 파이어폭스)는 인증서 저장소를 유지합니다. 웹 브라우저가 없는 경우 운영체제의 인증서 저장소에 의존합니다. [인증서](#def-leaf)에서 제공하는 [Let's Encrypt](#def-LE)는 {{<link "대부분의 인증서 저장소에서 신뢰" "/certificates" >}}합니다. {{% /def %}}

{{% def id="subject" name="Certificate subject" %}} 인증서 필드의 "제목" 필드는 인증서의 내용을 나타냅니다. 일반적으로 [공통 이름](#def-CN), Country 및 Organization과 같은 필드를 포함합니다. {{% /def %}}

{{% def id="CT" name="Certificate Transparency" abbr="CT" %}} 보안을 향상시키려면 인증서 또는 [사전 인증서](#def-precertificate)를 인증서 투명 로그: https://www.certificate-transparency.org/ 에 게시해야 합니다. [Let's Encrypt](#def-LE)는 [사전 인증서](#def-precertificate)를 생성하고 게시하며, 이후 [SCT](#def-SCT) 목록을 다음 [인증서](#def-leaf)에 포함합니다. Google Chrome과 같은 일부 [웹 브라우저](#def-web-browser)는 인증서의 유효성을 확인하기 위해 이 검증 가능한 약속의 존재를 요구합니다. [위키피디아](https://en.wikipedia.org/wiki/Certificate_Transparency) {{% /def %}}

{{% def id="CT-log" name="Certificate Transparency Log" %}} [인증서 투명성](#def-CT)의 구성 요소는 인증서 및 [사전 인증서](#def-precertificate)의 제출을 수락하고 이를 영구적이고 검증 가능하며 공개적으로 액세스 가능한 목록에 통합합니다. {{% /def %}}

{{% def id="CN" name="Common Name" abbr="CN" %}} 인증서의 내용을 설명하는 인증서 [제목](#def-subject)의 일부입니다. [root 인증서](#def-root) 및 [중간 인증서](#def-intermediate)의 경우 사람이 읽을 수있는 [인증 기관](#def-CA)의 이름입니다. [리프 인증서](#def-leaf)의 경우 인증서의 도메인 이름 중 하나입니다. 참고: 일반적인 이름은 63 자로 제한됩니다. 현재의 인터넷 표준은 소프트웨어가 인증서의 적용 가능성을 결정하기 위해 [제목 대체 이름](#def-SAN) 만 검사 할 것을 기대하기 때문에 인증서가 적용되는 도메인 이름을 나타내는 오래된 방법입니다. {{% /def %}}

{{% def id="cross-signing" name="Cross Signing" %}} 발급 인증서는 둘 이상의 [root 인증서](#def-root)에 의해 서명될 수 있습니다. 예를 들어 [Let's Encrypt](#def-LE) [중간 인증서](#def-intermediate)는 [IdenTrust](#def-IdenTrust)에 의해 크로스 서명됩니다. 시작 시 Let's Encrypt root는 아직 [인증서 저장소](#def-store)에 의해 신뢰되지 않았기 때문입니다. 기술적으로는 동일한 [제목](#def-subject) 및 동일한 [키 쌍](#def-key-pair)을 사용하여 두 개의 발급 인증서로 이루어지며, 하나는 Let's Encrypt root의 개인 키로 서명됩니다. 다른 하나는 IdenTrust root의 개인 키로 서명됩니다. {{< link "/certificates">}}. [위키피디아](https://en.wikipedia.org/wiki/X.509#Certificate_chains_and_cross-certification) {{% /def %}}

{{% def id="DANE" name="DNS-based Authentication of Named Entities" abbr="DANE" %}} DNS를 사용하여 제공된 [인증서](#def-leaf) 또는 암호화 키의 신뢰성을 확인하는 방법을 나타내는 메커니즘입니다. [위키피디아](https://en.wikipedia.org/wiki/DNS-based_Authentication_of_Named_Entities) {{% /def %}}

{{% def id="DNSSEC" name="Domain Name System Security Extensions" abbr="DNSSEC" %}} DNS 응답을 암호화된 방식으로 인증하는 메커니즘입니다. DNSSEC를 사용하려면 TLD, 도메인 이름 소유자 및 재귀적 확인자가 배포해야 합니다. 현재 적용이 다소 부족합니다. [위키피디아](https://en.wikipedia.org/wiki/Domain_Name_System_Security_Extensions) {{% /def %}}

{{% def id="DV" name="Domain-validated certificate" %}} 신청자가 도메인 이름 (요청 조직의 ID가 아닌)에 대한 제어권을 증명한 [인증서](#def-leaf)입니다. [Let's Encrypt](#def-LE)는 DV 인증서만 제공합니다 ([OV](#def-OV) 또는 [EV](#def-EV)가 아닌): {{<link "FAQ" "/docs/faq" >}} - [위키피디아](https://en.wikipedia.org/wiki/Domain-validated_certificate) {{% /def %}}

{{% def id="ECDSA" name="Elliptic Curve Digital Signature Algorithm" abbr="ECDSA" abbr_first="1" %}} 타원 곡선 암호화를 사용하는 DSA(디지털 서명 알고리즘)의 변형입니다. [위키피디아](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). [Let's Encrypt](#def-LE)는 [엔드 엔티티 또는 리프 인증서](#def-leaf)에 대해 ECDSA를 지원하지만 아직 [인증서 체인](#def-chain) 전체에는 지원하지 않습니다: {{<link "향후 기능" "/upcoming-features" >}} {{% /def %}}

{{% def id="Ed25519" name="Ed25519" %}} Ed448과 함께 특정 유형의 [EdDSA](#def-EdDSA)도 사용할 수 있습니다. {{% /def %}}

{{% def id="EdDSA" name="Edwards-curve Digital Signature Algorithm" abbr="EdDSA" abbr_first="1" %}} 타원 곡선 기반의 현대적인 공개 키 시그니처 시스템으로, 타원 곡선 암호화로 여러 가지 일반적인 [구현 문제](https://ed25519.cr.yp.to/)]를 해결하도록 설계되었습니다. [Let's Encrypt](#def-LE)와 같은 인증 기관은 아직 EdDSA 인증서를 제공할 수 없습니다. [위키피디아](https://en.wikipedia.org/wiki/EdDSA) {{% /def %}}

{{% def id="ECC" name="Elliptic Curve Cryptography" abbr="ECC" %}} 타원 곡선을 기반으로 하는 공용 키 암호화의 유형입니다. ECC는 비EC 암호화에 비해 작은 키를 사용하는 동시에 동등한 보안을 제공합니다. [클라우드플레어](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) - [위키피디아](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) {{% /def %}}

{{% def id="EV" name="Extended Validation" abbr="EV" %}} [CA](#def-CA)가 웹 사이트를 제어하는 법적 실체를 확인하는 인증서 검증 유형입니다. 여기에는 해당 엔티티에 대한 정보가 포함되어 있습니다. [CA](#def-CA)의 제어는 [OV](#def-OV) 인증서에 대한 제어보다 더 엄격합니다. [Let's Encrypt](#def-LE)는 EV 인증서를 제공하지 않습니다. [위키피디아](https://en.wikipedia.org/wiki/Extended_Validation_Certificate) {{% /def %}}

{{% def id="FQDN" name="Fully qualified domain name" abbr="FQDN" %}} 웹 사이트의 전체 도메인 이름입니다. 예를 들어 `www.example.com`은 *FQDN* 입니다. {{% /def %}}

{{% def id="IdenTrust" name="IdenTrust" %}} [인증 기관](#def-CA)입니다. IdenTrust는 [교차 서명한](#def-cross-signing) [Let's Encrypt](#def-LE) [중간 인증서](#def-intermediate)를 가지고 있습니다: {{< link "/certificates">}}. [위키피디아](https://en.wikipedia.org/wiki/IdenTrust) {{% /def %}}

{{% def id="intermediate" name="Intermediate certificate" %}} [root 인증서](#def-root) 또는 다른 중간에서 서명한 인증서이며 다른 인증서를 서명할 수 있습니다. root 인증서의 개인 키를 오프라인으로 유지하면서 리프 인증서를 서명하는 데 사용됩니다. 매개 변수는 [인증서 체인](#def-chain)에 포함되어 있습니다. [위키피디아](https://en.wikipedia.org/wiki/Public_key_certificate#Types_of_certificate) {{% /def %}}

{{% def id="IDNA" name="Internationalized Domain Names for Applications" abbr="IDNA" %}} [국제화된 도메인 이름](#def-IDN) 참조. {{% /def %}}

{{% def id="IDN" name="Internationalized Domain Name" abbr="IDN" %}} 도메인 이름에는 `a`~`z`, `0`~`9` 및 하이픈(`-`)이 아닌 다른 문자가 있습니다. 예를 들어, 그들은 아랍어, 중국어, 키릴어, 타밀어, 히브리어 또는 라틴어 문자 기반의 문자 (발음 구별 부호 또는 활자)를 포함할 수 있습니다. IDN 도메인의 인코딩된 표현은 `xn--`로 시작합니다. IDN은 [Let's Encrypt](#def-LE)에서 지원됩니다: https://letsencrypt.org/2016/10/21/introducing-idn-support.html. [위키피디아](https://en.wikipedia.org/wiki/Internationalized_domain_name) - [RFC 5890](https://tools.ietf.org/html/rfc5890) - [RFC 5891](https://tools.ietf.org/html/rfc5891) {{% /def %}}

{{% def id="ISRG" name="Internet Security Research Group" abbr="ISRG" %}} [Let's Encrypt](#def-LE) 뒤에 있는 조직입니다: [https://www.abetterinternet.org/about/](https://www.abetterinternet.org/about/). [위키피디아](https://en.wikipedia.org/wiki/Internet_Security_Research_Group) {{% /def %}}

{{% def id="issuer" name="Certificate issuer" %}} 인증서의 "Issuer" 필드는 인증서에 서명한 인증서를 설명합니다. 예를 들어, Let's Encrypt 엔티티 인증서의 Issuer 필드는 "Issuer: C = US, O = Let's Encryption, CN = Let's Encrypt Authority X3"일 수 있습니다. 일반적으로 [공통 이름](#def-CN), Country 및 Organization과 같은 필드를 포함합니다. Issuer 필드는 항상 일부 인증서의 [제목](#def-subject) 필드와 일치합니다. [root](#def-root)와 같은 [자체 서명된](#def-self-signed) 인증서의 경우 발급자는 제목과 동일합니다. "Issuer"라는 용어는 다른 인증서를 발급하는 인증서 ([중간 인증서](#def-intermediate) 또는 root) 또는 인증서를 발급하는 조직을 나타내는 데 사용할 수도 있습니다. {{% /def %}}

{{% def id="key-pair" name="Key-pair" %}} 서명 또는 암호화에 사용되는 개인 키와 공용 키의 조합입니다. 공용 키는 일반적으로 인증서에 내장되어 있는 반면 개인 키는 자체 저장되므로 비밀로 유지해야 합니다. 키 쌍은 애플리케이션에 따라 암호화 및 암호 해독, 서명 및 확인, 보조 키 협상 등에 사용할 수 있습니다. [위키피디아](https://en.wikipedia.org/wiki/Public-key_cryptography) {{% /def %}}

{{% def id="leaf" name="Leaf certificate (end-entity certificate)" %}} 일반적으로 [중간 인증서](#def-intermediate)으로 서명한 인증서는 도메인 집합에 유효하며 다른 인증서에 서명할 수 없습니다. [ACME 클라이언트](#def-ACME-client)에서 요청하고 [웹 서버](#def-web-server)에서 사용하는 인증서 유형입니다. [위키피디아](https://en.wikipedia.org/wiki/Public_key_certificate#End-entity_or_leaf_certificate) {{% /def %}}

{{% def id="LE" name="Let's Encrypt" abbr="LE" %}} [ISRG](#def-ISRG)에 의해 운영되는 [인증 기관](#def-CA)입니다. [위키피디아](https://en.wikipedia.org/wiki/Let%27s_Encrypt) {{% /def %}}

{{% def id="mixed-content" name="Mixed content" %}} HTTPS 웹 페이지가 HTTP를 통해 하위 리소스(Javascript, CSS 또는 이미지)를 로드하는 경우. [웹 브라우저](#def-web-browser)가 혼합 콘텐츠를 차단하거나 혼합 콘텐츠가 있을 때 페이지를 덜 안전한 것으로 표시할 수 있습니다: https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content. 혼합 콘텐츠 문제를 해결하려면 웹 개발자가 페이지를 변경해야 모든 리소스가 HTTPS URL을 사용할 수 있습니다. 웹 브라우저 내 [개발자 도구](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools)를 사용하여 혼합 콘텐츠 문제를 일으키는 리소스를 찾을 수 있습니다. {{% /def %}}

{{% def id="OCSP" name="Online Certificate Status Protocol" abbr="OCSP" abbr_first="1" %}} [인증서](#def-leaf)의 [해지](#def-revocation) 상태를 확인하는 방법입니다. 즉, [인증 기관](#def-CA)이 아직 만료 날짜에 도달하지 않았음에도 인증서가 더 이상 유효한 것으로 간주되지 않아야 함을 나타내는 방법입니다. 이 요청을 통해 인증 기관과 인터넷 서비스 공급자가 누가 사이트를 방문하는지 직접 관찰할 수 있으므로 개인 정보 보호 문제가 발생할 수 있습니다. [위키피디아](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol) {{% /def %}}

{{% def id="OCSP-must-staple" name="OCSP Must-Staple" %}} [인증서](#def-leaf) 확장자로, 해당 인증서가 있는 [웹 서버](#def-web-server)가 [OCSP 스테이핑](#def-OCSP-stapling)을 사용해야 한다는 것을 [웹 브라우저](#def-web-browser)에게 알립니다. 웹 서버가 모든 연결에 대해 [인증서](#def-leaf)의 최신 [해지](#def-revocation) 상태를 확인하는 데에 주로 필요하며, 해지 상태를 더 믿을 수 있게 합니다. [Let's Encrypt](#def-LE)는 요청 시 OCSP Must-Staple [연장](#def-extension)으로 인증서를 발급할 수 있습니다. [모질라 보안 블로그](https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/) [RFC 7633](https://tools.ietf.org/html/rfc7633) {{% /def %}}

{{% def id="OCSP-stapling" name="OCSP stapling" %}} [웹 서버](#def-web-server)가 [인증기관](#def-CA)에서 서명한 [웹 브라우저](#def-web-browser) 응답을 보내는 방법이므로 브라우저 자체가 CA의 속도 향상 및 개인 정보 보호를 위해 보조 OCSP 요청을 할 필요가 없습니다. TLS 인증서 상태 요청 확장이라고도 합니다. [위키피디아](https://en.wikipedia.org/wiki/OCSP_stapling) [클라우드플레어](https://blog.cloudflare.com/high-reliability-ocsp-stapling/) {{% /def %}}

{{% def id="OID" name="Object identifier" abbr="OID" %}} OID는 국제전기통신연합(ITU)과 ISO/IEC에 의해 표준화된 고유 숫자 식별자입니다. OID는 인증서 내에서 확장, 필드 또는 정책 주장을 정의하는 데 사용됩니다. 인터넷 표준 및 [인증서 정책](#def-CP) 및 [인증 실무 지침서](#def-CPS) 문서는 OID 사용을 정의합니다. [위키피디아](https://en.wikipedia.org/wiki/Object_identifier) {{% /def %}}

{{% def id="OV" name="Organization Validation" abbr="OV" %}} [CA](#def-CA)가 [이용자](#def-subscriber)의 법적 실체를 확인한 인증서입니다. 여기에는 해당 실체에 대한 정보가 포함되어 있습니다. [Let's Encrypt](#def-LE)는 OV 인증서를 제공하지 않습니다. [위키피디아](https://en.wikipedia.org/wiki/Public_key_certificate#Organization_validation) {{% /def %}}

{{% def id="pem" name="PEM file (.pem)" %}} 암호화 정보 형식 (기본적으로 보안 전자 메일을 위한 개인 정보 향상 메일 인터넷 표준의 일부로 지정됨)입니다. PEM 문서는 개인 키, 공용 키 또는 디지털 인증서와 같은 정보를 나타낼 수 있습니다. 이러한 파일은 "-\-\-\--BEGIN "으로 시작하며 그 다음은 데이터 유형입니다. [위키피디아](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) {{% /def %}}

{{% def id="pfx" name="Personal Information Exchange Files (.pfx)" %}} [리프 인증서](#def-leaf), root로의 [인증서 체인](#def-chain)과 리프 인증서의 개인 키가 포함된 파일입니다. https://en.wikipedia.org/wiki/PKCS_12 을 참조하세요. [마이크로소프트 하드웨어 개발 센터](https://docs.microsoft.com/en-us/windows-hardware/drivers/install/personal-information-exchange---pfx--files) {{% /def %}}

{{% def id="precertificate" name="Precertificate" %}} 사전 인증서는 [인증서 투명성](#def-CT)의 일부입니다. 사전 인증서는 CA가 발급하고자 하는 [리프 인증서](#def-leaf)의 사본으로, 사전 인증서가 외부 소프트웨어에 의해 받아들여지지 않도록 하기 위해 [치명적](#def-critical)이고 해로운 확장이 추가되었습니다. CA는 [SCT](#def-SCT)와 교환하여 사전 인증을 [CT 로그](#def-CT-log)에 제출합니다. 사전 인증서가 해당 인증서와 동일하지 않으므로 인증서 투명성 로그에 둘 다 포함될 수 있습니다. [RFC 6962 Section 3.1]( https://tools.ietf.org/html/rfc6962#section-3.1) {{% /def %}}

{{% def id="HPKP" name="HTTP Public Key Pinning" abbr="HPKP" %}} 웹 브라우저에 사이트의 [인증서 체인](#def-chain)이 향후 로드에 대해 특정 공용 키를 사용하도록 요구하는 보안 메커니즘입니다. Chrome은 CA의 타협으로부터 보호하기 위해 이 메커니즘을 도입했지만, 사이트 정전을 초래함에 따라 Chrome이 해당 메커니즘을 [사용 중단 및 제거](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/he9tr7p3rZ8)하게 되었습니다. [위키피디아](https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning) {{% /def %}}

{{% def id="PSL" name="Public Suffix List" abbr="PSL" %}} 여러 개별 엔티티가 하위 도메인을 등록할 수 있는 인터넷 도메인을 나타내는 *공용 접미사* 목록입니다. 예를 들어, `com`과 `co.uk`는 TLD가 아니지만 `co.uk`는 공공 접미사입니다. 웹 브라우저에서는 다른 엔티티에 의해 운영될 가능성이 있는 사이트가 서로 웹 쿠키를 공유하지 못하도록 차단하기 위해 이 목록을 사용합니다. [Let's Encrypt](#def-LE) 또한 속도 제한 계산에 목록을 사용합니다: {{< link "/rate-limits">}}. https://publicsuffix.org/ {{% /def %}}

{{% def id="relying-party" name="Relying Party" %}} 인증서의 정보에 의존하는 사용자입니다. 예를 들어, HTTPS 웹 사이트를 방문하는 사람은 상대편입니다. {{% /def %}}

{{% def id="revocation" name="Revocation" %}} 인증서는 [CA](#def-CA)에서 해지되었다고 하지 않는 한 만료 날짜까지 유효합니다. 개인 키의 손상 등 다양한 이유로 인증서가 해지될 수 있습니다. 웹 브라우저에서는 [OneCRL](https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/) 및 [CRLSets](https://dev.chromium.org/Home/chromium-security/crlsets)와 같은 최신 방법을 사용하여 인증서가 해지되었는지 확인할 수 있습니다. 많은 경우 [해지되지 않는다](https://www.imperialviolet.org/2011/03/18/revocation.html)는 점을 인지하세요. {{< link "/docs/revoking">}} {{% /def %}}

{{% def id="root" name="Root certificate" %}} [인증 기관](#def-CA)에 의해 [자체 서명된](#def-self-signed) 인증서는 [중급](#def-intermediate) 인증서에 서명하는 데 사용되며 [인증서 저장소](#def-store)에 포함됩니다. [위키피디아](https://en.wikipedia.org/wiki/Root_certificate) {{% /def %}}

{{% def id="root-program" name="Root Program" %}} 조직이 [인증서 저장소](#def-store)에 포함할 인증서를 결정하고 소프트웨어가 어떤 CA를 신뢰하는지 결정하는 데 사용하는 정책입니다. {{% /def %}}

{{% def id="RSA" abbr="RSA" %}} 암호화 및 디지털 서명 인증에 사용되는 공용 키 알고리즘입니다. [위키피디아](https://en.wikipedia.org/wiki/RSA_(cryptosystem)) {{% /def %}}

{{% def id="self-signed" name="Self-signed certificate" %}} [제목](#def-subject)이 [발행인](#def-issuer)과 동일한 자체 개인 키로 서명된 인증서입니다. 자체 서명된 인증서는 [신뢰할 수 있는 root 목록](#def-store)에 포함된 것과 같은 물리적 환경에서 이루어진 사전 준비로 인해만 신뢰됩니다. [root 인증서](#def-root)는 자체 서명됩니다. [위키피디아](https://en.wikipedia.org/wiki/Self-signed_certificate) {{% /def %}}

{{% def id="SNI" name="Server Name Indication" abbr="SNI" %}} [TLS](#def-user-agent) 핸드셰이크 중에 [웹 서버](#def-web-server) 연결할 도메인 이름을 지정하는 [사용자 에이전트](#def-TLS)가 보내는 필드입니다. 따라서 서버는 여러 도메인이 동일한 IP 뒤에 호스트될 때 적절한 [인증서](#def-leaf)로 응답할 수 있습니다. 클라이언트가 SNI에서 요청한 이름에 따라 웹 서버가 다른 인증서를 보내고 다른 내용을 표시할 수 있습니다. SNI는 암호화되지 않지만 실험 중인 대체, ESNI는 암호화가 됩니다. [위키피디아](https://en.wikipedia.org/wiki/Server_Name_Indication) {{% /def %}}

{{% def id="SCT" name="Signed Certificate Timestamp" abbr="SCT" %}} [인증서 투명 로그](#def-CT-log)에서 인증서를 게시할 수 있는 서명된 검증 가능한 약속입니다. [CT](#def-CT)를 시행하는 웹 브라우저는 [TLS](#def-TLS) 핸드셰이크에 SCT가 있는지 확인하고 로그 요구 사항을 충족하지 않는 사이트에 대한 연결을 거부합니다. 그러면 부정 또는 부정확한 인증서가 탐지될 가능성이 높아집니다. https://www.certificate-transparency.org/how-ct-works {{% /def %}}

{{% def id="SSL" name="Secure Sockets Layer" abbr="SSL" abbr_first="1" %}} [TLS](#def-TLS)의 이전 이름이며, 여전히 공통으로 사용됩니다. {{% /def %}}

{{% def id="staging" name="Staging" %}} [Let's Encrypt](#def-LE)는 속도 제한에 영향을 주지 않고 인증서 요청을 테스트할 수 있는 스테이징 API를 제공합니다. 스테이징 환경에서 생성된 인증서는 공개적으로 신뢰되지 *않습니다*. 준비 환경은 테스트, 디버깅 및 ACME 클라이언트 개발 용도로 사용해야 합니다. {{< link "/docs/staging-environment">}} {{% /def %}}

{{% def id="SAN" name="Subject Alternative Name" abbr="SAN" %}} 인증서가 유효한 도메인을 나타내는 [인증서](#def-leaf) 필드입니다. 이제 호환성 문제로만 제공되는 [공통 이름](#def-CN)의 사용을 대체합니다. 단일 인증서는 많은 SAN을 포함할 수 있으며 여러 가지 도메인 이름에 대해 유효합니다. [위키피디아](https://en.wikipedia.org/wiki/Subject_Alternative_Name) https://letsencrypt.org/docs/rate-limits/#names-per-certificate {{% /def %}}

{{% def id="subscriber" name="Subscriber" %}} 인증서를 요청하는 사용자 또는 조직입니다. {{% /def %}}

{{% def id="TLD" name="Top-Level Domain" abbr="TLD" %}} `.de`(독일), `.cn`(중국)과 같은 국가 코드 최상위 도메인(ccTLD), `.com`, `.org`와 같은 일반 최상위 도메인(gTLD)과 같은 계층적 도메인 이름 시스템에서 최고 수준입니다. [위키피디아](https://en.wikipedia.org/wiki/Top-level_domain) {{% /def %}}

{{% def id="TLS" name="Transport-Level Security" abbr="TLS" abbr_first="1" %}} HTTPS가 웹 페이지 방문을 암호화하고 인증하는 데 사용하는 프로토콜입니다. {{% /def %}}

{{% def id="TLSA" abbr="TLSA" %}} 특히 [TLS](#def-TLS) 연결의 검증과 관련된 [DANE](#def-DANE)의 부분입니다. {{% /def %}}

{{% def id="UCC" name="Unified Communications Certificate" abbr="UCC" %}} [제목 대체 이름 (SAN)](#def-SAN)이 여러 개 포함된 인증서에 대한 설명입니다. {{% /def %}}

{{% def id="web-browser" name="Web Browser" %}} 웹 페이지를 표시하는 데 사용되는 [사용자 에이전트](#def-user-agent)입니다. 예: *Mozilla Firefox*, *Google Chrome* 또는 *Internet Explorer* 입니다. [위키피디아](https://en.wikipedia.org/wiki/Web_browser) {{% /def %}}

{{% def id="user-agent" name="User Agent" %}} [웹 서버](#def-web-server)와 통신할 수 있는 소프트웨어입니다. 예: [웹 브라우저](#def-web-browser) 또는 [cURL](https://en.wikipedia.org/wiki/CURL). {{% /def %}}

{{% def id="web-server" name="Web server" %}} 웹 페이지 (또는 이를 호스팅하는 하드웨어 서버)를 제공하는 소프트웨어입니다. [위키피디아](https://en.wikipedia.org/wiki/Web_server) {{% /def %}}

{{% def id="wildcard" name="Wildcard Certificate" %}} 이 인증서는 한 수준 깊이 하위 도메인에 대해 유효합니다. 예를 들어 `*.example.com`에 대한 [SAN](#def-SAN)이 포함된 인증서는 `blog.example.com` 및 `www.example.com`에 유효하지만 `bork.bork.example.com` 또는 `example.com`에는 유효하지 **않습니다**. 와일드카드는 하위 도메인 대신 별표 문자 (*)로 표시됩니다. [Let's Encrypt](#def-LE)는 [2018년 3월부터 와일드카드 인증서를 제공합니다](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579). [위키피디아](https://en.wikipedia.org/wiki/Wildcard_certificate) {{% /def %}}

{{% def id="X509" abbr="X.509" %}} 공용 키 인증서의 형식을 정의하는 표준입니다. [위키피디아](https://en.wikipedia.org/wiki/X.509) {{% /def %}}

<link rel="stylesheet" href="/css/glossary.css">
<script src="/js/glossary.js" async></script>
