---
title: 참여
slug: getinvolved
top_graphic: 5
lastmod: 2019-01-11
menu:
  main:
    weight: 60
    parent: donate
---

## 커뮤니티

언제나 [Let’s Encrypt 커뮤니티 지원](https://community.letsencrypt.org/)을 활용하고 있습니다. 왜 커뮤니티 지원 기여가 중요한지는 [이 블로그 포스팅](https://letsencrypt.org/2015/08/13/lets-encrypt-community-support.html)을 확인하세요.

## 코드

또한 소프트웨어 개발을 이용하고 있습니다. 모든 코드는 [GitHub](https://github.com/letsencrypt/)에 있습니다.

### 클라이언트 소프트웨어

[Certbot](https://github.com/certbot/certbot)은 당신의 웹 사이트가 인증서를 취득하고 HTTPS로 자동 전환될 수 있도록 동작하는 파이선 기반 도구입니다. Certbot은 새로 시작하는 대부분의 사람들에게 권장하는 클라이언트입니다. 다양한 [써드파티 선택지](https://letsencrypt.org/docs/client-options/)도 있습니다.

### 서버단 CA 소프트웨어

[Boulder](https://github.com/letsencrypt/boulder)는 Let’s Encrypt CA를 구현하기 위한 도구입니다. [ACME](https://github.com/ietf-wg-acme/acme) 프로토콜 기반이고, 우선은 Go 프로그램 언어로 작성되었습니다. 시작하기에 좋은 곳은 ['도움을 원해요' 목록](https://github.com/letsencrypt/boulder/issues?q=is%3Aopen+is%3Aissue+label%3Astatus%2Fhelp-wanted)과 [공헌자 가이드](https://github.com/letsencrypt/boulder/blob/master/CONTRIBUTING.md)입니다.

### letsencrypt.org

[여기](https://github.com/letsencrypt/website)에서 이 웹사이트의 문서를 개선하거나 [번역](https://github.com/letsencrypt/website/blob/master/TRANSLATION.md)에 도움을 줄 수 있습니다.

## 프로토콜

Let’s Encrypt CA는 웹 서버에서 동작하는 인증서 관리 소프트웨어와 통신합니다. 여기에 사용되는 프로토콜은 ACME(Automated Certificate Management Environment, 자동화된 인증서 관리 환경)라 불립니다. ACME 임시 사양은 [Github에서 확인](https://github.com/ietf-wg-acme/acme) 가능합니다. IETF가 ACME를 진정한 공개 표준으로 만들기 위해 작업 중입니다. 여러분도 [IETF 메일링 리스트](https://www.ietf.org/mailman/listinfo/acme)를 통해서 ACME 프로토콜 개발 토론에 참여할 수 있습니다.
