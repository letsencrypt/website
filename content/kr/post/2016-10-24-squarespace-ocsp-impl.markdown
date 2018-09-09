---
author: 스퀘어 스페이스사, Franklin Angulo
date: 2016-10-24T00:00:00Z
excerpt: OCSP stapling is an alternative approach to the Online Certificate Status
  Protocol (OCSP) for checking the revocation status of certificates.
title: 스퀘어 스페이스사의 OCSP 스테이플링 구현
slug: squarespace-ocsp-impl
---

> We’re excited that Squarespace has decided to protect the millions of sites they host with HTTPS! While talking with their
> team we learned they were deploying OCSP Stapling from the get-go, and we were impressed. We asked them to share their
> experience with our readers in our first guest blog post (hopefully more to come).
> 
> \- ISRG / Let’s Encrypt 전무 Josh Aas

[OCSP 스테이플링](https://en.wikipedia.org/wiki/OCSP_stapling)은 인증서 해지 상태를 확인하기 위한 OCSP(Online Certificate Status Protocol)의 대체 방법입니다.
* 인증서 발표자는 CA가 처음 TLS 핸드 셰이크 과정에서 서명한 타임스탬프 OCSP응답(“스테이플링”)하여 클라이언트가 CA에 문의할 필요가 없도록 함으로써 OCSP 응답 제공과 관련된 리소스 비용을 대신 부담하도록 합니다.
인증서 보유자는 정기적으로 OCSP 응답자를 질의하고 응답을 캐시하도록 합니다.


기존 OCSP는 CA가 인증서 해지 정보를 요청하는 각 클라이언트에 응답하도록 요구합니다. 유명 웹 사이트에 대한 인증서가 발급되면 대량의 조회를 위해 CA의 OCSP 응답 서버에 접속되기 시작합니다. 정보는 제 3자를 통과해야 하고 제3자가 어느 사이트에 언제 방문했는지를 판단할 수 있기 때문에 사생활을 침해당할 위험을 내포할 수 있습니다. 또한, 대부분 브라우저는 웹 페이지에 아무 것이나 로딩하기 전에 OCSP응답자에게 응답해야 하기 때문에 성능 문제도 발생할 수 있습니다. OCSP 스테이플링은 사용자에게 CA가 별도로 연결할 필요가 없기 때문에 효율적이며, OCSP응답이 디지털 서명되어 탐지 없이 수정될 수 없기 때문에 안전합니다.

## OCSP 스테이플링 @ 스퀘어스페이스

스퀘어스페이스 플랫폼의 모든 사용자 지정 도메인에 대해서 SSL을 사용하도록 할 계획이었기 때문에, 서비스 출시 시점에 OCSP 스택을 지원하기로 결정했습니다. [종단 인프라 팀](https://www.squarespace.com/about/careers?gh_jid=245517)이 구축한 리버스 프록시는 모든 SSL 트래픽을 종료하는 역할을 합니다. 이 프록시는, Java로 만들어 졌으며 Netty에 의해 작동합니다. 하지만 안타깝게도 클라이언트 전용의 Java JDK 8에서만 OCSP스테이플링을 지원합니다. JDK 9이 [JEP 249](http://openjdk.java.net/jeps/249)와 함께 OCSP 스테이플링을 소개하고 있지만 아직 이용할 수는 없습니다.

이 리버스 프록시는 JDK의 SSL 구현을 사용하지는 않습니다. 대신에 [netty-Tcnative](https://netty.io/wiki/forked-tomcat-native.html)를 통해 OpenSSL을 사용합니다. 이 시점에서 원래 tcnative나 Netty’s의 포크는 OCSP를 지원하지 않습니다. 그러나 tcnative 라이브러리는 SSL 컨텍스트 및 엔진에 대한 주소 포인터를 포함하여 OpenSSL 내부 작동을 노출시킵니다. JNI를 사용하여 netty-tcnative 라이브러리를 확장하고 [tlsext_status](https://www.openssl.org/docs/man1.0.2/ssl/SSL_set_tlsext_status_type.html) OpenSSL C 함수를 사용하여 OCSP 스테이플링 지원을 추가할 수 있었습니다. 이 확장판은 독립형 라이브러리이지만 netty-tcnative 라이브러리 자체에 똑같이 포함할 수 있습니다. 만약 관심이 있다면, Netty의 다음 API 개발 주기의 일부로서 업스트림에 기여할 수 있습니다.

OCSP 스테이플링의 초기 목표 중 하나는 OCSP 응답자의 운영자를 최대한 활용하는 것이었는데, Let’s Encrypt가 그 역할을 하고 있습니다. 플랫폼에 있는 웹 사이트 특성상, 매우 긴 꼬리를 가지고 있습니다. 적어도 시작하기 전에, 모든 OCSP응답을 사전에 확인하고 캐시하지는 않습니다. 그래서 OCSP응답을 비동기식으로 가져오기로 결정했고, 나중에 두 개 이상의 클라이언트가 이를 사용할 경우에만 그렇게 하기 위해 노력하고 있습니다. 블룸 필터는 캐시할 가치가 없는 “한 번의 경이로움”을 구분하는데 사용됩니다.

스퀘어 스페이스 사는 고객의 웹 사이트와 그 사이트 방문객들의 안전에 투자합니다. 최종적으로 모든 요청에 대한 OCSP 스테이플링을 확보하기 위해 OCSP 스테이플링 구현을 계속해서 개선할 것입니다. 기존의 OCSP의 보안 당면 과제에 대해 더욱 심도 있게 논의하려면 [이 블로그의 게시물](https://www.imperialviolet.org/2014/04/19/revchecking.html)을 참조하시기 바랍니다.