---
title: 향후 기능
slug: 향후 기능
top_graphic: 1
lastmod: 2019-07-03
---

## 다중관점 (유효성) 검증

현재 Let's Encrypt는 단일 네트워크 관점에서 유효성을 검사합니다. 여러 네트워크 관점에서 검증을 시작할 계획입니다.

## ECDSA Root와 중간 인증서

현재 Let's Encrypt는 RSA 중간체를 사용하여 최종 엔터티 인증서에만 서명합니다. SS는 최종 엔터티 인증서에 서명하는 데 사용할 수있는 ECDSA root 및 중간체를 생성할 것입니다.

# 개발된 기능

## 인증서 투명성 로그

* 활성된 날짜: 2019년 5월 15일

[인증서 투명성 로그]({{< ref "/docs/ct-logs.html" >}})를 운영하기 시작했습니다.

## TLS ALPN 챌린지 지원

* 활성된 날짜: 2018년 7월 12일

[보안상의 이유로 중단](https://community.letsencrypt.org/t/important-what-you-need-to-know-about-tls-sni-validation-issues/50811) 했던 TLS-SNI 검증 방법에 대해 [대체품](https://datatracker.ietf.org/doc/draft-ietf-acme-tls-alpn)을 지정하고 구현했습니다. 검증을 위해 포트 443만 사용하려는 가입자에게 대체품을 소개하는 것이 중요했습니다.

## SCT 영수증이 포함된 인증서

* 활성된 날짜: 2018년 3월 29일

## 와일드카드 인증서

* 활성된 날짜: 2018년 3월 13일

## ACME v2 API

* 활성된 날짜: 2018년 3월 13일

## IDN 지원

* 활성된 날짜: 2016년 10월 20일

Let's Encrypt는 국제화된 도메인 이름 (IDN)에 대한 발행을 지원합니다.

## 완전한 IPv6 지원

* 활성된 날짜: 2016년 7월 26일

처음에는 Let's Encrypt API 인프라의 일부만 IPv6를 통해 통신할 수 있었습니다. 이로 인해 IPv6 전용 시스템이 Let's Encrypt와 완전히 상호 작용할 수 없었습니다. 이 문제는 해결되었습니다. - 모든 기능에 대해 IPv6 지원이 활성화되었습니다.

## 윈도우 XP 인증서 호환성

* 활성된 날짜: 2016년 3월 25일

윈도우 XP에서 Let's Encrypt 인증서가 브라우저에서 허용되지 않도록 하는 인증서 체인의 문제를 해결했습니다.

## ECDSA 서명 지원

* 활성된 날짜: 2016년 2월 10일

Let's Encrypt의 RSA 중간 인증서를 사용하여 ECDSA 키에 서명하는 기능을 추가했습니다. 전체 ECDSA 인증서 체인이 있는 ECDSA 키 서명 지원은 나중에 추가됩니다.

## ACME DNS 챌린지 지원

* 활성된 날짜: 2016년 1월 20일

Let's Encrypt는 ACME 사양에 정의된 대로 DNS 레코드를 통한 유효성 검사를 허용합니다.
