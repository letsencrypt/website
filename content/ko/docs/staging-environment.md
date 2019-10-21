---
title: 준비 환경
slug: staging-environment
top_graphic: 1
date: 2018-01-05
lastmod: 2019-09-16
---

{{< lastmod >}}

배포 환경을 사용하기 전에 준비 환경을 테스트하는 것이 좋습니다. 이렇게 하면 신뢰할 수 있는 인증서를 발급하기 전에 제대로 작동하는지 확인할 수 있고 속도 제한에 맞춰 달릴 기회가 줄어 듭니다.

[ACME v2 준비 환경](https://community.letsencrypt.org/t/staging-endpoint-for-acme-v2/49605)을 위한 ACME URL은 다음과 같습니다.

`https://acme-staging-v02.api.letsencrypt.org/directory`

Certbot을 사용하는 경우 준비 환경을 `--dry-run` 플래그와 함께 사용할 수 있습니다. 다른 ACME 고객의 경우 준비 환경에서의 테스트에 대한 정보는 해당 지침을 읽으십시오. v2 준비 환경에는 v2 호환 ACME 클라이언트가 필요함을 유의해 주십시오.

# 속도 제한

준비 환경에서는 다음 예외를 제외하고 [배포 환경에 대해 설명한 것]({{< relref "/docs/rate-limits.md" >}})과 동일한 속도 제한을 사용합니다.

* **등록 된 도메인 당 인증서** 수 한도는 주당 30,000입니다.
* **중복 인증서** 한도는 주당 30,000입니다.
* **실패한 유효성 검사** 제한은 시간당 60입니다.
* **계정 당 IP 주소** 제한은 IP 당 3시간, 3시간당 50계정입니다.

# 루트 인증서

준비 환경 중간 인증서 (["Fake LE Intermediate X1"](/certs/fakeleintermediatex1.pem))는 브라우저/클라이언트 신뢰 저장소에 **없는** root 인증서에 의해 발급됩니다. 테스팅 목적으로 준비 환경을 신뢰하도록 테스트 전용 클라이언트를 수정하려는 경우, 테스트 신뢰 저장소에 ["Fake LE Root X1"](/certs/fakelerootx1.pem) 인증서를 추가하면 됩니다. 중요 사항: 평범한 탐색이나 다른 활동에 사용하는 신뢰 저장소에 준비 root나 중간 인증서를 추가하지 마십시오. 이들은 감사나 배포 root와 동일한 표준을 따르지 않으므로 테스트 외 다른 용도로 사용하기에 안전하지 않습니다.

# 인증서 투명성

준비 환경은 Google의 [testtube](http://www.certificate-transparency.org/known-logs#TOC-Test-Logs) CT 테스트 로그에 사전 인증서를 제출하며, 발급된 인증서에 반환된 SCT를 포함합니다.
