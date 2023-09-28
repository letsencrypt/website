---
title: 인증서 중복 제한
slug: duplicate-certificate-limit
top_graphic: 1
date: 2022-06-16
lastmod: 2022-06-16
show_lastmod: 1
---


# 설명
모든 발급 요청에는 *인증서 중복* 한도가 주당 5회로 적용됩니다. 인증서 복제 제한을 초과하면 ACME 클라이언트에서 다음과 같은 오류 메시지를 수신해야 합니다:
```
too many certificates (5) already issued for this exact set of domains in the
last 168 hours: example.com login.example.com: see https://letsencrypt.org/docs/duplicate-certificate-limit
```
이 오류가 나타내는 "호스트 집합"은 이 인증서에 대해 요청된 호스트 이름 집합입니다. 이 예에서는 `example.com`및 `login.example.com`입니다. 인증서가 `example.com`과 같은 하나의 이름으로만 발급되는 경우 인증서의 "호스트 이름 집합"은 `[example.com]`이 됩니다. 이 속도 제한은 가입자가 동일한 "정확한 호스트 이름 집합"에 대한 인증서를 한 주에 5회 이상 요청할 때 초과됩니다.

# 일반적인 원인

인증서 복제 제한에 도달한 가입자는 응용 프로그램 또는 서비스 배포 문제를 해결하려고 시도하는 동안 인증서 복제 제한에 도달하는 경우가 많습니다. 몇 가지 예:

ACME 클라이언트에서 오류를 인식하지 못하고 오류를 해결하는 과정에서 ACME 클라이언트를 제거하고 다시 설치하려고 여러 번 시도하는 경우 인증서 복제 제한을 초과할 수 있습니다.

인증서 설치에 실패할 때마다 ACME 클라이언트에 대한 구성 데이터를 삭제하면 5번 실패한 후 이 속도 제한에 도달합니다. 필요한 경우 이전에 발급된 인증서 및 개인 키에 액세스할 수 있도록 구성 데이터를 삭제하기 전에 복사본을 만드는 것이 가장 좋습니다.

애플리케이션 배포 문제를 해결하거나 테스트할 때는 ACME 클라이언트가 [스테이징 환경](/docs/staging-environment/)을 사용하도록 구성하는 것이 좋습니다. 스테이징 환경에 대한 [요금 제한은 훨씬 더 높습니다](/docs/staging-environment/#rate-limits).

# 도움 요청

준비 환경을 사용하도록 ACME 클라이언트를 구성하는 방법을 잘 모르거나 도움말 디버깅이 필요한 경우 [커뮤니티 포럼에 도움을 요청하는 것이 좋습니다](https://community.letsencrypt.org/c/help/13).

# 오버라이드 요청

인증서 복제 제한에 대한 재정의를 사용할 수 **없습니다**.

# 해결 방법

이전에 발급된 인증서를 취소해도 인증서 복제 제한이 재설정되지 않습니다. 그러나 제한을 초과한 경우에도 동일한 호스트 이름에 대해 다른 인증서가 필요하면 항상 다른 "정확한 호스트 이름 집합"에 대한 인증서를 요청할 수 있습니다. 예를 들어 `[example.com]`에 대한 인증서 복제 제한을 초과한 경우 `[example.com, login.example.com]`에 대한 인증서를 요청하는 데 성공합니다. 마찬가지로 `[example.com, login.example.com]`에 대한 인증서 복제 제한을 초과한 경우 `[example.com]`에 대한 인증서와 `[login.example.com]`에 대한 인증서를 별도로 요청합니다.

# 모니터링 속도 제한

현재로서는 가입자 요금 제한을 모니터링할 수 있는 방법을 제공하지 않습니다.
