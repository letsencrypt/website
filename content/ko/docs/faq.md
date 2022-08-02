---
title: FAQ
linkTitle: 자주 묻는 질문
slug: faq
top_graphic: 1
lastmod: 2020-04-23
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---


FAQ는 다음의 두 개로 나누어 집니다:

* [일반적인 질문](#general)
* [기술 질문](#technical)

# <a id="general">일반적인 질문</a>

## Let’s Encrypt는 어떤 서비스를 제공하나요?

Let’s Encrypt는 글로벌 공인인증기관(Certificate Authority, CA)입니다. 전 세계 사람과 조직들이 SSL/TLS 인증서를 확득하고, 갱신하고, 관리할 수 있도록 합니다. 인증서는 안전한 HTTPS 연결을 도와주는 데도 이용될 수 있습니다.

Let’s Encrypt는 DV(Domain Validation) 인증서를 제공합니다. 자동 발행을 할 수 없는 OV(Organization Validation) 또는 EV(Extended Validation) 유형의 인증서는 제공하지 않습니다.

Let’s Encrypt를 사용하려면 [시작하기](/getting-started) 페이지를 방문해 주세요.

## Let’s Encrypt를 사용하는 데는 얼마나 드나요? 정말로 무료인가요?

인증서 이용은 무료입니다. Let’s Encrypt는 비영리이며, 임무는 HTTPS를 널리 채택케 하여 더욱 안전하고 사생활이 보호되는 웹을 만드는 것입니다. 서비스는 무료이며 모든 웹 사이트가 HTTPS를 배포하기도 쉽습니다.

전 세계에 무료 서비스를 제공하기 위해 양질의 스폰서, 후원 기관, 개인으로부터의 후원이 필요합니다. 만약 후원에 관심 있으시다면, [기부](/donate/) 또는 [스폰서가 되는 법](https://www.abetterinternet.org/sponsor//)을 고려해 주십시오.

경우에 따라, 통합 서비스 제공자(예:호스팅 공급자)는 Let’s Encrypt 인증서를 제공하는데 발생하는데 계상된 행정 관리 비용만을 반영하는 방식으로 명목상 비용만을 부담할 수 있습니다.

## 어떤 종류의 지원을 제공하나요?

Let’s Encrypt는 소규모 조직이 운영하며 비용을 줄이기 위한 자동화된 시스템에 의존합니다. 사정이 그런 탓에, 구독자들께 직접적인 지원은 제공할 수 없습니다. 다음의 선택지를 통한 훌륭한 지원이 이루어 집니다:

1. 정말로 도움되는 [문서](/docs)가 있습니다.
2. 아주 활발하고 유용한 [커뮤니티 지원 포럼](https://community.letsencrypt.org/)이 있습니다. 커뮤니티 회원들은 질의 응답 전문가이면서, 대부분의 공통적인 질문들은 이미 답변이 되었습니다.

[비디오](https://www.youtube.com/watch?v=Xe1TZaElTAs)를 통해 방대한 커뮤니티 지원력을 확인하시기 바랍니다.

## Let's Encrypt를 사용하는 웹사이트가 피싱/멀웨어/스캠 등에 연루되어 있습니다. 저는 어떻게 해야 할까요?

사용자를 더욱 효과적으로 보호할 수 있는 Google 세이프 브라우징이나 Microsoft 스마트 스크린 프로그램에 해당 사이트를 신고하시길 추천드립니다. 아래는 신고 URL입니다.

* [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
* [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

If you'd like to read more about our policies and rationale, you can do so here:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">기술 질문</a>

## 내 브라우저에서 Let’s Encrypt의 인증서를 신뢰할 수 있습니까?

대부분 브라우저와 운영 체제에서는 그렇습니다. 자세한 내용은 [호환성 목록](/docs/cert-compat)을 참조하십시오

## Let's Encrypt는 웹사이트에 대한 SSL/TLS 이외의 다른 항목에 대해서도 인증서를 발급하나요?

Let's Encrypt 인증서는 일반적인 도메인 검증 인증서이므로 귀하는 웹 서버, 메일 서버, FTP 서버 등과 같은 도메인 이름을 사용하는 모든 서버에 사용할 수 있습니다.

전자 메일 암호화 및 코드 서명에는 Let's Encrypt가 발행하지 않는 다른 인증서가 요구됩니다.

## Let's Encrypt는 Let's Encrypt 서버에 내 인증서의 개인 키를 생성하거나 저장합니까?

아니요. 절대 안 합니다.

개인 키는 항상 자체 서버에서 생성 및 관리되며, Let's Encrypt 인증 기관에서 관리하는 것이 아닙니다.

## Let's Encrypt 인증서의 기간은 얼마입니까? 얼마나 오래 유효합니까?

인증서는 90일 동안 유효합니다. [여기](/2015/11/09/why-90-days.html)에서 그 이유를 읽을 수 있습니다.

이것을 조정할 방법이 없습니다, 예외는 없습니다. 60일마다 인증서를 자동으로 갱신하는 것이 좋습니다.

## Let's Encrypt는 OV(Organization Validation) 또는 EV(Extended Validation) 인증서를 발행할 계획이 있습니까?

OV 또는 EV 인증서를 발급할 계획이 없습니다.

## 여러 도메인 이름 (SAN 인증서 또는 UCC 인증서) 에 대한 인증서를 받을 수 있습니까?

네, 같은 인증서는 Subject Alternative Name(SAN) 메커니즘을 이용하여 여러 개의 다른 이름이 포함될 수 있습니다.

## Let's Encrypt는 와일드카드 인증서를 발행합니까?

네. 와일드카드 발급은 DNS-01 과제를 사용하여 ACMEv2를 통해 수행해야 합니다. [이 글](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578)에서 자세한 기술 정보를 확인하십시오.

## Let's Encrypt는 운영체제에 맞는 (ACME) 클라이언트가 있습니까?

사용 가능한 [ACME 클라이언트](/docs/client-options/)가 많습니다. 운영체제에서 잘 작동될 가능성이 높습니다. [Certbot](https://certbot.eff.org/)부터 시작하는 것이 좋습니다.

## 기존 키 혹은 CSR (인증서 서명 요청) 을 사용할 수 있습니까?

네, 하지만 모든 클라이언트가 이 기능을 지원하는 것은 아닙니다. [Certbot](https://certbot.eff.org/)을 참고하십시오.

## Let's Encrypt는 웹 서버를 인증하기 위하여 어떤 IP 주소를 사용합니까?

IP 주소는 언제든지 변경될 수 있기 때문에 검증하는데 사용하는 IP 주소 목록은 게시하지 않습니다. 앞으로는 여러 IP 주소에서 한 번에 검증할 수 있습니다.

## 인증서를 성공적으로 갱신했지만, 검증이 실행되지 않았습니다 - 어떻게 그게 가능합니까?

도메인에 대한 과제를 성공적으로 완료하면, 나중에 귀하의 계정에서 다시 사용될 수 있도록 인증이 캐시에 저장됩니다. 캐시에 저장된 인증은 유효성 검사 시점으로부터 30일 동안 지속합니다. 요청한 인증서에 필요한 모든 권한이 캐시에 저장된 경우 캐시에 저장된 관련 권한이 만료될 때까지 유효성 검사가 다시 수행되지 않습니다.
