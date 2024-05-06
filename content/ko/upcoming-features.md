---
title: 향후 기능
slug: upcoming-features
lastmod: 2021-09-16
show_lastmod: 1
---

## ACME 갱신 알림 (ARI)

저희는 현재 구독자들이 갱신이 필요할 때 API로 알려주는 시스템을 개발하고 있습니다. 이 시스템은, 예를 들어서 해지 예정일 등이 다가오면, 구독자들을 알릴 수 있습니다.

## ECDSA Root와 중간 인증서

저희는 프로덕션 ECDSA 중간 인증서를 오직 [허용된 계정](https://community.letsencrypt.org/t/ecdsa-availability-in-production-environment/150679)에게만 발급하고 있습니다. 이 허용된 계정 목록을 제거할 예상 날자는 아직 없습니다.

# 개발된 기능

## 다중관점 (유효성) 검증

* 활성된 날짜: 2020년 2월 19일

이제 [여러 네트워크 관점](https://letsencrypt.org/2020/02/19/multi-perspective-validation.html)에서 도메인 제어를 검증합니다.

## 인증서 투명성 로그

* 활성된 날짜: 2019년 5월 15일

현재 [인증서 투명성 로그](/docs/ct-logs)를 운영하고 있습니다.

## TLS ALPN 챌린지 지원

* 활성된 날짜: 2018년 7월 12일

[보안상의 이유로 중단](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811) 했던 TLS-SNI 검증 방법에 대해 [대체품](https://tools.ietf.org/html/rfc8737)을 지정하고 구현했습니다. 검증을 위해 포트 443만 사용하려는 가입자에게 대체품을 소개하는 것이 중요했습니다.

## 와일드카드 인증서

* 활성된 날짜: 2018년 3월 13일

## ACME v2 API

* 활성된 날짜: 2018년 3월 13일

## 완전한 IPv6 지원

* 활성된 날짜: 2016년 7월 26일
