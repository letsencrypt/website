---
title: 향후 기능
slug: upcoming-features
lastmod: 2026-03-16
show_lastmod: 1
---

향후 변경 사항에 대한 공지 사항을 받으려면 [기술 업데이트 메일링 목록에 가입](https://letsencrypt.org/opt-in/)하거나 Let's Encrypt 커뮤니티 포럼의 [API 공지 카테고리](https://community.letsencrypt.org/c/api-announcements/18)를 참조하세요.

# 향후 기능

## TLS 클라이언트 인증 EKU 제거

2026년 2월 11일, 저희는 기본 인증서 프로필에서 ["TLS 클라이언트 인증" 확장 키 사용(EKU)](https://letsencrypt.org/2025/05/14/ending-tls-client-authentication/)을 제거했습니다. 마이그레이션에 더 많은 시간이 필요한 고객을 위한 임시 방편으로 [tlsclient](https://letsencrypt.org/docs/profiles/#tlsclient) 프로필을 제공합니다. 2026년 5월 13일 이전에 이미 해당 서비스를 이용 중인 구독자는 2026년 7월 8일까지 계속 이용할 수 있습니다.

## 인증서 유효 기간을 45일로 단축

CA/브라우저 포럼 기본 요구 사항 변경 사항을 준수하기 위해, [인증서 유효 기간을 45일로 단축합니다](https://letsencrypt.org/2025/12/02/from-90-to-45). 2027년 2월 10일에 먼저 64일로 단축되고, 이후 2028년 2월 16일에 45일로 단축될 예정입니다. 또한 저희는 인증 재사용 기간을 10일로 단축하고, 이후 7시간으로 단축할 예정입니다.

# 개발된 기능

## 만료 알림 이메일 종료

2025년 6월 4일, 저희는 [만료 이메일 알림 서비스를 종료](https://letsencrypt.org/2025/01/22/ending-expiration-emails/)했으며, 프로덕션 데이터베이스에서 ACME 계정과 연결된 모든 이메일 주소를 삭제했습니다.

## OCSP URL 제거

활성화됨: [2025년 5월 7일](https://letsencrypt.org/2024/12/05/ending-ocsp/).

우리의 인증서에는 기관 정보 액세스(AIA) 항목의 온라인 인증서 상태 프로토콜 (OCSP) URL이 포함되지 않습니다. 대신, 인증서 폐지 목록(CRL) 배포 지점(CRLDP) URL이 포함되어 있습니다. 의존 당사자는 CRL을 통해 인증서 폐지 상태 정보를 조회할 수 있으며, ACME 클라이언트는 ARI를 통해 갱신 힌트를 얻을 수 있습니다(아래 참조).

## ACME 프로필

활성화됨: [2025년 1월 9일](https://letsencrypt.org/2025/01/09/acme-profiles/)

[ACME 프로필 확장 초안](https://www.ietf.org/archive/id/draft-aaron-acme-profiles-01.html)을 지원하는 클라이언트는 이제 인증서가 [지원되는 프로필 중 하나](https://letsencrypt.org/docs/profiles/)를 준수하도록 요청할 수 있습니다.

## 정적 CT 로그

활성화됨: [2024년 3월 14일](https://letsencrypt.org/2024/03/14/introducing-sunlight/)

저희는 이제 새로운 [정적 CT API 사양](https://c2sp.org/static-ct-api)을 준수하는 인증서 투명성(CT) 로그를 운영하고 있으며, [Sunlight](https://github.com/FiloSottile/sunlight) 소프트웨어를 사용하고 있습니다. 이제 이러한 로그를 사용하여 브라우저의 CT 요구 사항을 충족할 수 있습니다. [CT 로그 문서](https://letsencrypt.org/docs/ct-logs/)에서 현재 로그 목록을 확인할 수 있습니다.

## ACME 갱신 알림 (ARI)

활성화됨: [2023년 3월 23일](https://letsencrypt.org/2023/03/23/improving-resliiency-and-reliability-with-ari/).

이제 발급된 모든 인증서에 대한 권장 갱신 기간을 제공하며, 클라이언트는 [ACME ARI 확장 프로그램](https://www.rfc-editor.org/rfc/rfc9773.html)을 사용하여 이를 조회할 수 있습니다.

## 단기 인증서

클라이언트는 ACME 프로필을 사용하여 ["단기 유효 기간" 인증서를 요청](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/)할 수 있습니다. 이러한 인증서는 유효 기간이 매우 짧아서 폐지 정보를 내장할 필요가 전혀 없습니다.

## IP 주소 인증서

단기 인증서(위 참조)는 인증서의 주체 대체 이름에 [IP 주소](https://letsencrypt.org/2025/02/20/first-short-lived-cert-issued/)를 포함하도록 요청할 수 있습니다. 이러한 주소는 [현재의 DNS 이름과 거의 같은 방식으로 검증됩니다](https://www.rfc-editor.org/rfc/rfc8738.html).
