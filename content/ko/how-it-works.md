---
title: 작동 방식
linkTitle: Let's Encrypt의 작동 방식
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


Let’s Encrypt와 [ACME 프로토콜](https://tools.ietf.org/html/rfc8555)의 목적은 HTTPS 서버를 설치할 수 있도록 하고, 사람의 개입 없이 브라우저에서 신뢰할 수 있는 인증서를 자동으로 취득하도록 하는 것입니다.  이것은 웹 서버에서 인증서 관리 에이전트를 실행함으로써 이루어집니다.

기술이 어떻게 작동하는지 이해하기 위해서, Let’s Encrypt를 지원하는 인증서 관리 에이전트와 `https://example.com`의 설치 과정을 살펴보십시오.

이 프로세스에는 두 가지 단계가 있습니다.  첫 번째로, 에이전트는 웹 서버가 해당 도메인을 제어하는 것을 CA에게 인증합니다.  그런 다음, 에이전트는 해당 도메인에 대한 인증서를 요청, 갱신 및 해지할 수 있습니다.

## 도메인 인증

Let’s Encrypt는 공개키로 서버 관리자를 확인합니다.  에이전트 소프트웨어가 Let’s Encrypt와 처음 작용할 때, 새로운 키 쌍을 생성하고 서버가 하나 이상의 도메인을 제어한다는 것을 Let’s Encrypt CA에 증명합니다.  이것은 계정을 만들고 그 계정에 도메인을 추가하는 전통적인 CA 과정과 비슷합니다.

이 과정을 시작하기 위해서, 에이전트는 `example.com`을 통제하는 것을 증명하기 위해 Let’s Encrypt CA에게 무엇을 해야 하는지 묻습니다.  Let’s Encrypt CA는 요청된 도메인 네임을 보고 하나 이상의 과제를 발행할 것입니다.   이것들은 해당 에이전트가 도메인의 통제를 증명할 수 있는 다른 방법들입니다.  예를 들어, CA는 해당 에이전트에게 둘 중 하나를 선택할 수 있도록 할 것입니다.

* `example.com` 에 DNS 기록을 제공하거나,
* `http://example.com`에서 잘 알려진 URI 아래의 HTTP 자원을 제공할 것입니다.

이 과제와 더불어, Let’s Encrypt CA는 또한 한 쌍의 키를 통제하는 것을 증명하기 위해 한 쌍의 개인 키로 서명해야 하는 임시 값을 제공합니다.

<div class="howitworks-figure">
<img alt="example.com을 검증하기 위해 과제를 요구한다"
     src="/images/howitworks_challenge.png"/>
</div>

해당 에이전트 소프트웨어는 제공된 도전 중 하나를 완료합니다.   두 번째 작업을 수행할 수 있다고 가정해 보십시오: `http://example.com` 웹 사이트의 특정한 경로에 파일을 생성합니다.  에이전트는 개인 키로 제공된 임시 값에 서명합니다.  에이전트가 이 단계들을 완료하면, 에이전트는 타당성 검증을 완료할 준비가 되었음을 CA에게 통지합니다.

그 후, 과제가 충족되었는지 검사하는 것이 CA의 일입니다.  CA는 임시 값에서 서명을 검증하고, 웹 서버에서 파일을 내려 받으려고 시도하며, 예상된 내용이 있는지 확인합니다.

<div class="howitworks-figure">
<img alt="example.com을 활동 허가를 요청하기"
     src="/images/howitworks_authorization.png"/>
</div>

임시 값에 대한 서명이 타당하고, 과제는 사실로 확인되면, 공개 키에 의해 확인된 에이전트는 `example.com` 인증서 관리를 하기 위해 권한이 부여됩니다.  에이전트가 `example.com`을 위해 사용했던 키의 쌍을 “권한을 부여 받은 키의 쌍”이라고 부릅니다.


## 인증서 발급 및 해지

에이전트가 권한 키의 쌍을 가지게 되면, 인증서 요청, 갱신, 폐지는 쉽습니다. 단지 인증서 관리 메시지를 보내고 권한 키의 쌍으로 그들에게 서명하면 됩니다.

도메인을 위해 인증서를 얻기 위해서, 에이전트는 Let’s Encrypt CA에게 특정한 공개 키를 가지고 `example.com`을 위해 인증서를 발행하는 것을 요구하는 PKCS#10 [인증서 서명 요청](https://tools.ietf.org/html/rfc2986)을 구성합니다.  통상적으로, CSR은 CSR의 공개 키에 상응하는 개인 키에 의해 서명이 포함되어 있습니다.  에이전트는 또한 `example.com`의 권한 키로 모든 CSR에 서명함으로써 Let’s Encrypt CA가 인증된 것을 알 수 있도록 합니다.

Let’s Encrypt CA가 요청을 받을 때, 두 서명을 모두 검증합니다.  모든 것이 좋아 보인다면, CSR로부터의 공개키로 `example.com`의 증명서를 발행해 에이전트에 돌려줍니다.

<div class="howitworks-figure">
<img alt="example.com 자격증 요청"
     src="/images/howitworks_certificate.png"/>
</div>

해지는 비슷한 방식으로 작동합니다.  에이전트가 `example.com`의 인증된 한 쌍의 키로 해지 요청에 서명하고, Let’s Encrypt CA가 그 요청이 권한이 있는지 검증합니다.  권한이 있다면, 브라우저와 같은 의존적인 당사자가 해지된 인증서를 받아들이면 안 된다는 것을 알 수 있도록 일반적인 해지 채널(예: OCSP)에 해지 정보를 게시합니다.

<div class="howitworks-figure">
<img alt="example.com에 대한 인증서 해지 요청"
     src="/images/howitworks_revocation.png"/>
</div>



