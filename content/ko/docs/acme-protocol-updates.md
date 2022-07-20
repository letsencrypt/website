---
title: ACME 프로토콜 업데이트
slug: acme-protocol-updates
top_graphic: 1
lastmod: 2019-10-07
show_lastmod: 1
---

ACME 프로토콜은 Let's Encrypt가 작동하는 방식의 기초입니다. 현재 표준 초안이며 아직 최종 RFC는 아닙니다. 시간이 지나면서 프로토콜 사양이 발전함에 따라 Let's Encrypt는 업데이트가 된 ACME를 구현할 것입니다. 그렇게 할 때, 하위 호환성과 밀접하게 연관지으면서 보안은 저희의 주요 관심사가 됩니다.

# 현재 구현된 ACME 버전

저희는 다음과 같은 API 엔드포인트를 가지고 있습니다. 이들은 프로토콜 문서 초안과 함께 발전하면서 하나로 고정된 ACME 사양의 초안을 구현하는 것은 아닙니다. 현재 구현된 ACME 초안과 비교하기 위해[각기 다른 문서](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)를 참조하십시오.

## ACME v2

* [제작] `https://acme-v02.api.letsencrypt.org/directory`
* [준비] `https://acme-staging-v02.api.letsencrypt.org/directory`

## ACME v1

* [제작] `https://acme-v01.api.letsencrypt.org/directory`
* [준비] `https://acme-staging.api.letsencrypt.org/directory`

# 새로운 하위 호환 ACME 기능

Let's Encrypt는 기존 API 엔드포인트에 대해 새로운 하위 호환 기능을 구현할 수 있습니다. 저희가 이전에 구현하지 않은 ACME 사양의 일부를 구현하기로 결정했기 때문에 새로운 하위 호환 기능이 도입되었습니다.

새로운 기능이 기존 API 엔드포인트에 도입되면서 해당 기능은 공용 ACME 사양에 명확히 지정될 것이며, 제대로 구현된 클라이언트 호환성을 깨뜨리지 않습니다.

# 변경사항이 있는 ACME의 새로운 버전

새로운 변경사항이 포함된 ACME의 새 버전을 구현하는 것이 중요하다고 판단되면, 저희는 새로운 API 엔드포인트를 도입하고 이전 버전의 엔드포인트와 병행하여 유지 관리합니다. 시스템 관리자는 이러한 취약점에 대한 대응으로 ACME 클라이언트에게 적시에 업데이트를 배포 할 수 있는 능력을 유지해야 합니다.
