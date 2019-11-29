---
title: 계정 ID 찾기
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
---

{{< lastmod >}}

이슈를 제보할 때 Let's Encrypt 계정 ID를 제공하는 것이 유용할 수 있습니다. 대부분의 경우, 계정을 만드는 프로세스는 Let's Encrypt와 통신할 때 사용하는 ACME 클라이언트 소프트웨어에 의해 자동으로 처리됩니다. 그리고, 여러 서버에서 ACME 클라이언트를 실행하면 여러 계정이 구성될 수 있습니다.

계정 ID는 `https://acme-v02.api.letsencrypt.org/acme/acct/12345678` 또는
`https://acme-v01.api.letsencrypt.org/acme/reg/12345678`와 같은 URL 형태입니다. 또한 단축형으로 해당 URL의 끝에 있는 숫자를 사용할 수 있습니다.

Certbot을 사용하는 경우, 귀하의 계정 ID를 `/etc/letsencrypt/accounts/acme-v01.api.letsencrypt.org/directory/*/regr.json`의 "uri" 필드에서 확인하고 찾을 수 있습니다.

다른 ACME 클라이언트를 사용하는 경우, 지침은 클라이언트에 따라 다릅니다. 위에서 설명한 URL 형태의 로그를 확인하십시오. 귀하의 ACME 클라이언트가 계정 ID를 기록하지 않으면 동일한 키로 신규 등록 요청을 제출해서 검색할 수 있습니다. 자세한 내용은 [ACME 사양](https://tools.ietf.org/html/rfc8555#section-7.3)을 참조하십시오.
또한, ACME 클라이언트가 생성하는 각 POST 메소드에 대한 응답의 Boulder-Requester 헤더에서 숫자 형식의 ID를 찾을 수 있습니다.
