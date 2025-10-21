---
title: ACME 프로토콜 업데이트
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---


[IETF 표준](https://letsencrypt.org/2019/03/11/acme-protocol-ietf-standard.html) ACME 프로토콜인 [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/)는 Let's Encrypt가 작동하는 기반입니다.

# 현재 구현된 ACME 버전

저희는 다음과 같은 API 엔드포인트를 가지고 있습니다. 현재 구현과 ACME 사양의 차이점을 비교하기 위해 [이 불일치 문서](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md)를 참조하십시오.

## ACME v2 (RFC 8555)

* [제작] `https://acme-v02.api.letsencrypt.org/directory`
* [준비] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1 (사용 중단)

* [제작] `https://acme-v01.api.letsencrypt.org/directory`
* [준비] `https://acme-staging.api.letsencrypt.org/directory`

# 새로운 하위 호환 ACME 기능

Let's Encrypt는 기존 API 엔드포인트에 대해 하위 호환을 유지하면서 새로운 기능을 구현할 수 있습니다. 저희가 이전에 구현하지 않은 ACME 사양의 일부를 구현하기로 결정했기 때문에 새로운 기능이 도입되었습니다.

새로운 기능이 기존 API 엔드포인트에 도입되면 해당 기능은 공용 ACME 사양에 명확히 지정될 것이며, 제대로 구현된 클라이언트 호환성을 깨뜨리지 않습니다.

# 변경사항이 있는 ACME의 새로운 버전

새로운 변경사항이 포함된 ACME의 새 버전을 구현하는 것이 중요하다고 판단되면, 저희는 새로운 API 엔드포인트를 도입하고 이전 버전의 엔드포인트와 병행하여 유지 관리합니다. 시스템 관리자는 이러한 중요한 변경에 대한 대응으로 ACME 클라이언트에게 적시에 업데이트를 배포 할 수 있는 능력을 유지해야 합니다.
