---
title: 인증서 호환성
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt는 보안을 손상시키지 않으면서 최대한 많은 소프트웨어와 호환되는 것을 목표로 합니다. 특정 플랫폼에서 Let's Encrypt 인증서의 유효성을 검사 할 수 있는지 여부를 결정하는 주요 요인은 해당 플랫폼에 IdenTrust의 DST Root X3 인증서가 신뢰 저장소에 포함되어 있는지 여부입니다. 두 번째 요소는 해당 플랫폼이 현대적인 [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) 인증서를 지원하는지 여부입니다. 모든 Let's Encrypt 인증서가 SHA-2를 사용하기 때문입니다.

인증서가 아래 "알려진 호환성" 플랫폼 중 일부에 유효성을 검사하지만 다른 인증서는 유효하지 않은 경우, 문제는 웹 서버 구성 오류일 수 있으며 대부분 올바른 인증서 체인을 제공하지 못하게 됩니다. [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/)를 사용하여 사이트를 테스트하십시오. 그래도 문제가 확인되지 않으면 [커뮤니티 포럼](https://community.letsencrypt.org/)에 도움을 요청하십시오.

호환성에 대한 자세한 내용은 [이 커뮤니티 포럼 토론방](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)을 방문하십시오.

# 알려진 호환성 버전

* 모질라 파이어폭스 >= v2.0
* 구글 크롬
* 윈도우 XP SP3와 그 이상 버전에 설치된 인터넷 익스플로러
* 마이크로소프트 엣지
* 안드로이드 OS >= v2.3.6
* 맥OS 사파리 >= v4.0
* iOS 사파리 >= v3.1
* 데비안 리눅스 >= v6
* 우분투 리눅스 >= v12.04
* NSS 라이브러리 >= v3.11.9
* 아마존 파이어OS (실크 브라우저)
* Cyanogen (사이애노젠) > v10
* Jolla Sailfish (욜라 세일피시) OS > v1.1.2.16
* 아마존 킨들 > v3.4.1
* 자바 7 >= 7u111
* 자바 8 >= 8u101
* 블랙베리 OS >= 10.3.3
* PS4 게임 기기 내 펌웨어 >= 5.00

# 알려진 비호환성 버전

* 블랙베리 OS < v10.3.3
* 안드로이드 OS < v2.3.6
* 닌텐도 3DS 게임 기기
* 윈도우 XP SP3 이전 버전
  * SHA-2 서명 인증서를 처리할 수 없음
* 자바 7 < 7u111
* 자바 8 < 8u101
* 윈도우 라이브 메일 (2012버전 메일 클라이언트, 웹메일 아님)
  * CRL없이 인증서를 처리할 수 없음
* PS3 게임 기기
* PS4 게임 기기 내 펌웨어 < 5.00
