---
author: ISRG전무, Josh Aas
date: 2017-07-06T00:00:00Z
excerpt: Let’s Encrypt will begin issuing wildcard certificates in January of 2018.
title: 2018년 1월 와일드카드 인증서 출시
slug: wildcard-certificates-coming-jan-2018
---

> **Update, March 13, 2018**
> 
> Wildcard certificate support [is live](https://community.letsencrypt.org/t/acme-v2-and-wildcard-certificate-support-is-live/55579/).

Let’s Encrypt는 2018년 1월에 와일드 카드 인증서 발행을 시작합니다. 와일드 카드 인증서는 일반적으로 요구되는 기능이며, HTTPS를 더 쉽게 배포할 수 있는 몇 가지 사용 사례가 있음을 알고 있습니다.
와일드 카드를 제공하여 웹이 100% HTTPS로 나아가도록 가속화할 수 있기를 희망합니다.

Let’s Encrypt는 현재 완전 자동화된 DV인증서 발급 및 관리 API를 통하여 4천 7백만개의 도메인을 확보하고 있습니다. 2015년 Let’s Encrypt 서비스가 시작된 이후로, 웹의 암호화된 페이지 로드가 40%에서 58%로 증가했습니다. 만약 와일드 카드가 가능한 점과 100% 암호화된 웹 사이트에 접속하는 것이 흥미로우시다면, [여름 기금 모금 캠페인](https://letsencrypt.org/donate/)에 참여해 주시기를 부탁드립니다.

와일드 카드 인증서는 기본 도메인의 모든 하위 도메인(예시:*.example.com)을 보호할 수 있습니다. 이를 통해 관리자는 도메인과 모든 하위 도메인에 대해 단일 인증서와 키 페어를 사용할 수 있으며, 이는 HTTPS 배포를 훨씬 더 쉽게 만들 수 있습니다.

와일드 카드 인증서는 [예정되어 있는 ACME v2 API 엔드 포인트](https://letsencrypt.org/2017/06/14/acme-v2-api.html)를 통해 무료로 제공될 예정입니다. 처음에는 와일드 카드 인증서용 DNS를 통해서 기본 도메인의 유효성 검사만을 지원하지만, 이후 추가 유효성 검사 옵션을 검색할 수 있습니다. [커뮤니티 포럼]https://community.letsencrypt.org/)에서 와일드 카드 인증서 지원과 관련하여 궁금한 사항들을 질문하도록 권장하고 있습니다.

Let’s Encrypt서비스를 이용하는 지역 사회에 아낌없는 지원 덕분에 존재하는 비영리 단체이기 때문에, 여름 후원 캠페인 기간동안 이 흥미로운 발전을 발표하기로 결정했습니다. 만약 여러분이 좀 더 안전하고 개인적인 웹에 대해 지지하고 싶다면, [오늘 기부](https://letsencrypt.org/donate/)하세요!

이 모든 일을 가능하게 도와 준 [공동체](https://letsencrypt.org/getinvolved/)와 [후원자](https://letsencrypt.org/sponsors/)들에게 감사드리고 싶습니다. 만약 여러분의 회사나 조직이 Let’s Encrypt 서비스의 후원자가 되고 싶다면 [sponsor@letsencrypt.org](mailto:sponsor@letsencrypt.org)로 이메일을 보내주십시오.