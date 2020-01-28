---
title: ACME 클라이언트 구현
slug: client-options
top_graphic: 1
lastmod: 2019-05-24
---

{{< clientslastmod >}}

Let's Encrypt에서는 ACME 프로토콜을 사용하여 지정된 도메인 이름을 제어하는지 확인하고 인증서를 발급합니다. Let's Encrypt 인증서를 받으려면 사용할 ACME 클라이언트 소프트웨어 일부를 선택해야 합니다.

아래의 ACME 클라이언트는 타사에서 제공합니다. Let's Encrypt는 타사 클라이언트를 제어하거나 검토하지 않으며, 고객의 안전이나 신뢰성에 대한 보증을 할 수 없습니다.

일부 브라우저 내 ACME 클라이언트를 사용할 수 있지만 이 클라이언트는 사용자 환경이 좋지 않고 리뉴얼 누락 위험이 증가하는 수동 리뉴얼 워크플로우를 권장하기 때문에 여기에 나열하지 않습니다.

# 권장: Certbot

대부분의 경우 [Certbot](https://certbot.eff.org/) 클라이언트에서 시작할 것을 권장합니다. 원하는 항목에 따라 간단히 인증서를 받거나 설치에도 도움이 될 수 있습니다. 사용하기 쉽고, 많은 운영체제에서 작동하며, 문서화가 매우 우수합니다.

certbot이 사용자의 요구를 충족하지 못하거나 다른 작업을 수행하고자 할 경우, 아래에서 선택할 수 있는 더 많은 클라이언트가 있습니다. 이 클라이언트는 해당 언어 또는 환경에 따라 그룹화됩니다.

{{< clients acme_v2="ACME v2 Compatible Clients" libraries="Libraries" projects="Projects integrating with Let’s Encrypt" >}}

Python [acme](https://github.com/certbot/certbot/tree/master/acme) 모듈은 Certbot 트리의 일부이지만 다른 여러 클라이언트에서도 사용되며 [PyPI](https://pypi.python.org/pypi/acme), [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) 및 여러 배포판에서 독립 실행형 패키지로 사용할 수 있습니다.

{{< /clients >}}

# 클라이언트/프로젝트 추가

ACME 클라이언트 또는 위 페이지에 없는 Let's Encrypt와 통합된 프로젝트를 알고 계신 경우, `data/clients.json` 파일을 업데이트하는 풀 요청을 GitHub의 [웹사이트 저장소](https://github.com/letsencrypt/website/)]에 제출해 주십시오.

풀 요청 전에 확인할 사항:

1. 당신의 클라이언트가 {{<link "Let's Encrypt의 상표 정책" "/trademarks" >}}을  따르는지
1. 당신의 클라이언트가 브라우저 기반 버전이 아니며 자동 갱신을 지원하는지
1. 커밋이 클라이언트를 관련 섹션의 **끝**에 추가하는지 (해당되는 경우 "acme_v2"도 잊지 마십시오!)
1. 당신의 커밋이 `clients.json`의 맨 위에 있는 `lastmod`날짜 스탬프를 업데이트 하는지
