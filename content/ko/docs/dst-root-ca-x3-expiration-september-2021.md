---
title: DST Root CA X3 루트 인증서 만료 (2021년 9월)
slug: dst-root-ca-x3-expiration-september-2021
top_graphic: 1
lastmod: 2021-05-07
show_lastmod: 1
---


2021년 9월 30일부터 오래된 브라우저들과 기기들이 Let's Encrypt 인증서를 신뢰하는 방식에 작은 변화가 생깁니다. 만약 당신이 일반적인 웹사이트를 운영하고 있다면 대다수의 방문자들은 여전히 당신의 Let's Encrypt 인증서를 수용하므로 차이를 못 느낄 것입니다. 하지만 당신이 API를 제공하거나 IoT 기기들을 지원해야 한다면 이 변화에 주의를 기울여야 할 것입니다.

Let's Encrypt는 [ISRG Root X1][]이라 불리는 "[루트 인증서][]"를 갖고 있습니다. 최신 브라우저들과 기기들은 루트 인증서 목록에 ISRG Root X1이 포함되어 있기 때문에 당신의 웹사이트에 설치된 Let's Encrypt 인증서를 신뢰합니다. 오래된 기기들도 우리가 발행한 인증서들을 신뢰하도록 하기 위해, 우리는 DST Root CA X3라는 이전 루트 인증서에 "교차 서명(cross-signature)"을 갖고 있습니다.

이전 루트 인증서(DST Root CA X3) 는 오랫동안 우리의 작업을 순조롭게 도와주었고, 거의 모든 기기에서 바로 신뢰받을 수 있도록 도움을 주었습니다. 새로운 루트 인증서(ISRG Root X1)는 이제 이전 루트 인증서처럼 범용적으로 신뢰되고 있습니다. 하지만 몇몇 오래된 기기들은 소프트웨어 업데이트가 중단되었기에 앞으로 새로운 루트 인증서를 신뢰하지 않습니다. (예를 들어, iPhone 4와 HTC Dream). [여기를 클릭해 ISRG를 신뢰하는 플랫폼 목록 보기][compatibility]

DST Root CA X3 루트 인증서는 2021년 9월 30일 만료됩니다. 이것은 ISRG Root X1을 신뢰하지 않는 오래된 기기들이 Let's Encrypt 인증서를 사용하는 사이트를 방문할 때마다 인증서 경고를 받게 된다는 것을 의미합니다. 하지만 한 가지 중요한 예외가 있습니다. ISRG Root X1을 신뢰하지 않는 오래된 안드로이드 기기들은 이전 루트 인증서의 만료일을 연장시키는 [DST Root CA X3의 특수한 교차 서명 덕분에][cross-sign] Let's Encrypt와 계속해서 함께할 것입니다. 이것은 오직 안드로이드에만 적용되는 예외입니다.

그렇다면 당신은 무엇을 해야 할까요? 대부분의 사람들은 아무것도 할 필요가 없습니다! 우리는 넓은 호환성을 가진 인증서의 발행 준비를 마쳤기 때문에 대부분의 웹사이트는 정상적으로 작동할 것입니다. 만약 당신이 API를 제공하거나 IoT 기기를 지원해야 한다면, 두 가지를 확실히 해야합니다. (1) API의 모든 클라이언트가 반드시 ISRG Root X1를 신뢰해야 합니다. (DST Root CA X3만 신뢰해서는 안 됨) (2) 만약 API의 클라이언트가 OpenSSL을 사용하고 있다면 [반드시 1.1.0 이상의 버전을 사용해야 합니다][openssl]. OpenSSL 1.0.x 버전에서 인증서 검증의 특이점: 우리가 기본으로 추천하는 안드로이드 호환 인증서 체인이 제공되었을 때 ISRG Root X1을 신뢰하는 클라이언트마저도 연결에 실패합니다.

만약 현재 진행 중인 프로덕션 체인의 변화에 대해 더 자세한 정보를 얻고 싶다면 [Let's Encrypt 커뮤니티의 이 글타래를 확인해주세요][production].

만약 앞으로의 만료에 대해 궁금한 사항이 있을 경우 [Let's Encrypt 포럼의 이 글타래에 질문해 주세요.][forum]

[루트 인증서]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
