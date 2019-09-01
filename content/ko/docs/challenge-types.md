---
title: 도전 유형
slug: challenge-types
top_graphic: 1
date: 2019-02-25
lastmod: 2019-02-25
---

Let's Encrypt에서 인증서를 받으면 Google 서버는 ACME 표준에 정의된 대로 "도전"을 사용하여 해당 인증서의 도메인 이름을 제어하는지 확인합니다. 대부분의 경우 이 유효성 검사는 당신의 ACME 클라이언트가 자동으로 처리하지만 보다 복잡한 구성 결정이 필요한 경우 이에 대해 더 자세하게 알아두는 것이 좋습니다. 확실하지 않은 경우 클라이언트의 기본값 또는 HTTP-01을 사용하십시오.

# HTTP-01 챌린지

이것은 오늘날 가장 일반적인 도전 유형입니다. Let's Encrypt는 ACME 클라이언트에 토큰을 주고 ACME 클라이언트는 `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`의 웹서버에 파일을 저장합니다. 이 파일에는 토큰과 게정 키 지문이 들어있습니다. ACME 클라이언트가 Let's Encrypt에 파일이 준비되었음을 알리면 Let's Encrypt는 여러 유리한 지점에서 어쩌면 여러 번 해당 파일을 찾기 위해 노력합니다. 우리의 유효성 검사가 웹서버에서 올바른 응답을 받는다면 유효성 검사는 성공적인 것으로 간주되며 당신은 인증서를 발급받을 수 있습니다. 만약 유효성 검사가 실패하면 새 인증서로 다시 시도해야합니다.

우리의 HTTP-01 챌린지의 구현은 최대 10개의 리다이렉션까지 리다이렉션을 따릅니다. "http:" 또는 "https:"로의 리다이렉션만 허용하고 80번 포트나 443번 포트로만 리다이렉션합니다. IP 주소로의 리다이렉션은 허용하지 않습니다. HTTPS URL로 리다이렉션되면 인증서의 유효성을 검사하지 않습니다(이 문제는 유효한 인증서를 부트 스트랩하기 위한 것이므로 자체 서명되거나 만료된 인증서가 발생할 수 있음).

HTTP-01 챌린지는 80번 포트에서만 수행할 수 있습니다. 클라이언트가 임의의 포트를 지정할 수 있게 하면 문제가 덜 안전해지므로 ACME 표준에서는 허용되지 않습니다.

장점:

 - 도메인 구성에 대한 추가 지식 없이도 쉽게 자동화할 수 있습니다.
 - 호스팅 제공 업체는 CNAME 도메인에 대한 인증서를 발급 할 수 있습니다.
 - 상용 웹서버와 함께 작동합니다.

단점:

 - ISP가 포트 80을 차단하면 작동하지 않습니다 (드문 경우이지만 일부 가정용 ISP에서 일어남).
 - Let's Encrypt에서는이 과제를 사용하여 와일드 카드 인증서를 발급 할 수 없습니다.
 - 웹 서버가 여러 개인 경우 모든 서버에서 파일을 사용할 수 있는지 확인해야합니다.

# DNS-01 챌린지

이 챌린지는 해당 도메인 이름 아래 TXT 레코드에 특정 값을 넣어 도메인 이름의 DNS를 제어 함을 증명하도록 요청합니다. HTTP-01보다 구성하기가 어렵지만 HTTP-01이 할 수없는 시나리오에서는 작동 할 수 있습니다. 또한 당신이 와일드 카드 인증서를 발행할 수 있도록 해줍니다.
Let's Encrypt가 ACME 클라이언트에 토큰을 제공하면 클라이언트는 해당 토큰과 계정 키에서 파생된 TXT 레코드를 생성하고 해당 레코드를`_acme-challenge. <YOUR_DOMAIN>`에 넣습니다. 그러면 Let's Encrypt가 해당 레코드에 대한 DNS 시스템을 쿼리합니다. 일치하는 것이 있으면 인증서 발급을 진행할 수 있습니다!

발급 및 갱신 자동화는 매우 중요하므로 DNS 공급자에 업데이트 자동화에 사용할 수있는 API가있는 경우 DNS-01 문제를 사용하는 것이 좋습니다. 우리 커뮤니티는 [DNS 제공 업체 목록][dns-api-providers]을 시작했습니다. DNS 제공 업체는 등록 기관(도메인 이름을 구입한 회사)과 같거나 다를 수 있습니다. DNS 공급자를 변경하려면 등록 기관에서 약간만 변경하면됩니다. 도메인이 만료 될 때까지 기다릴 필요가 없습니다.

웹서버에 완전한 DNS API 자격 증명을 넣으면 해당 웹 서버가 해킹되었을 때 그 영향이 크게 증가함을 인지하십시오. 가장 좋은 사례는 [좀 더 좁은 범위의 API 자격 증명][securing-dns-credentials]을 사용하거나 별도의 서버에서 DNS 유효성 검사를 수행하고 인증서를 웹 서버에 자동으로 복사하는 것입니다.

Let's Encrypt는 DNS-01 유효성 검사를 위해 TXT 레코드를 찾을 때 DNS 표준을 따르므로 CNAME 레코드 또는 NS 레코드를 사용하여 도전에 대한 답변을 다른 DNS 영역에 위임할 수 있습니다. 이것은 유효성 검사별 서버 또는 영역에 [`_acme-challenge` 하위 도메인을 위임][securing-dns-credentials]하는 데 사용될 수 있습니다. 이것은 DNS 제공 업체의 업데이트 속도가 느려서 빠른 업데이트 서버에 위임하려는 경우에도 사용할 수 있습니다.

대부분의 DNS 제공자는 DNS 레코드를 업데이트하는 시간부터 모든 서버에서 사용할 수 있을 때까지 걸리는 시간을 결정하는 "지연 시간"을 가지고 있습니다. 또한 [anycast]를 자주 사용하기 때문에 이 문제를 측정하기가 어려울 수 있습니다. 즉, 여러 서버가 동일한 IP 주소를 가질 수 있으며, 사용자가 어디에 있는지 여부에 따라 Let's Encrypt가 하는 것과 다른 서버와 통신하여 다른 대답을 얻을 수도 있습니다. 최상의 DNS API를 사용하면 업데이트가 완전히 전파되는지 여부를 자동으로 확인할 수 있습니다. DNS 제공자에 이 기능이 없는 경우 유효성 검사를 하기 전에 업데이트가 전파되도록 클라이언트를 구성하기만 하면 됩니다.

동일한 이름의 TXT 레코드를 여러 개 배치할 수 있습니다. 예를 들어 와일드카드와 비와일드카드 인증서에 대한 과제를 동시에 검증하는 경우 이 기능을 사용할 수 있습니다. 그러나 응답 크기가 너무 커지면 Let's Encrypt에서 거부하기 시작하므로 이전 TXT 레코드를 정리해야 합니다.

장점:

 - 이 문제를 사용하여 와일드카드 도메인 이름이 포함된 인증서를 발급할 수 있습니다.
 - 여러 개의 웹서버로도 잘 작동합니다.

단점:

 - 웹 서버에 API 자격 증명을 유지하는 것은 위험합니다.
 - DNS 제공자가 API를 제공하지 않을 수 있습니다.
 - DNS API가 전파 시간에 대한 정보를 제공하지 않을 수 있습니다.

# TLS-SNI-01

이 문제는 ACME의 초안 버전에서 정의되었습니다. 포트 443에서 TLS 핸드셰이크를 수행했으며 토큰이 포함된 인증서를 찾는 특정 [SNI] 헤더를 보냈습니다. It [will be disabled in March
2019][tls-sni-disablement]
because it was not secure enough. 이것은 안전이 충분히 확보되지 않아서 [2019년 3월에 비활성화됩니다][tls-sni-disablement].

# TLS-ALPN-01

이 과제는 TLS-SNI-01이 더 이상 사용되지 않아 개발되었으며 [별도의 표준][tls-alpn]으로 개발되고 있습니다. TLS-SNI-01과 마찬가지로 443번 포트에서 TLS를 통해 수행됩니다. 그러나 사용자 지정 ALPN 프로토콜을 사용하여 이 문제 유형을 알고 있는 서버만 유효성 검사 요청에 응답하도록 합니다. 또한 이 챌린지 유형에 대한 유효성 검사 요청이 유효성 검사 중인 도메인 이름과 일치하는 SNI 필드를 사용하므로 보안이 향상됩니다.

이 문제는 대부분의 사람들에게 적합하지 않습니다. 이는 HTTP-01과 같은 호스트 기반 유효성 검사를 수행하려는 TLS 종료 역방향 프록시의 작성자에게 가장 적합하지만 문제를 분리하기 위해 TLS 계층에서 완전히 수행하기를 원합니다. 지금은 주로 대규모 호스팅 공급자를 의미하지만 Apache 및 Nginx와 같은 메인스트림 웹 서버는 언젠가 이를 구현할 수 있습니다(그리고 [캐디도 이미 실행 중][caddy-tls-alpn]).

장점:

 - 80번 포트를 사용할 수 없는 경우 작동합니다.
 - TLS 계층에서만 수행할 수 있습니다.

단점:

 - Apache, Nginx 또는 Certbot에서 지원되지 않으며 가까운 시일 내에 지원되지는 않을 것입니다.
 - HTTP-01처럼 서버가 여러 대 있는 경우 모든 서버가 동일한 컨텐츠로 응답해야 합니다.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/draft-ietf-acme-tls-alpn-01
[caddy-tls-alpn]: https://caddy.community/t/caddy-supports-the-acme-tls-alpn-challenge/4860
