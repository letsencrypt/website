---
author: Josh Aas, ISRG 총괄 책임자
date: 2015-06-04T00:00:00Z
excerpt: Let’s Encrypt의 기반이 될 키들과 인증서들이 생성되었습니다.
title: Let’s Encrypt 루트와 중계 CA들
slug: isrg-ca-certs
---

Let’s Encrypt의 기반이 될 키들과 인증서들이 생성되었습니다. 이는 오늘 secure facility에서 있던 주요 행사에서 행해졌습니다. 다음의 오브젝트들이 생성되었습니다:

* ISRG 루트를 위한 키쌍과 자가 서명된 인증서
* ISRG 루트의 OCSP를 위한 키쌍과 인증서
* Let’s Encrypt의 2개 중계 기관들을 위한 키쌍과 인증서
* Let’s Encrypt 중계지가 폐지되지 않았다는 것을 나타내는 ISRG 루트 하단의 CRL

공개키를 통한 인증서들은 당연히 공개될 수 있습니다:

* <a href="/certs/isrgrootx1.pem.txt">ISRG Root X1 Certificate</a>
* <a href="/certs/letsencryptauthorityx1.pem.txt">Let's Encrypt Intermediate X1 CA Certificate</a>
* <a href="/certs/letsencryptauthorityx2.pem.txt">Let's Encrypt Intermediate X2 CA Certificate</a>

Let’s Encrypt는 루트 CA를 오프라인 상에서 안전하게 유지하기 위해, 중계 CA들로 부터 구독자 대상으로 인증서를 발행할 것입니다. IdenTrust가 중계지들을 교차 서명할 것입니다. 이는 루트를 전파하는 동안 종단 인증서들이 모든 주요 브라우저들에게 수용될 수 있도록 허가할 것입니다.

일반적인 상황에서 Let’s Encrypt가 발행한 인증서들은 “Let’s Encrypt Intermediate X1” 로부터 나옵니다. 다른 중계지 “Let’s Encrypt Intermediate X2”는 저희의 재해 복구 사이트와 연결되어 있으며, “Let’s Encrypt Intermediate X1”의 발행 기능을 상실할 경우에만 이용됩니다.

![ISRG Key Diagram](/images/isrg-keys.png "ISRG Key Diagram")

ISRG 루트 CA와 Let’s Encrypt 중계 CA들을 위한 개인키는 도난 당할 경우를 대비하여 강력한 보호 수준을 제공하는 하드웨어 보안 모듈(HSM)들에 저장되어 있습니다.

모든 ISRG 키들은 현재 RSA 키입니다. ECDSA 키를 올 해 이후 생성할 계획입니다.

이들 키와 인증서 생성은 Let’s Encrypt가 인증서 발행 준비에 접어들었다는 중요한 단계입니다. 추후 몇 주 내로, 진행 중인 몇 가지 추가 계획을 발표할 것입니다. 그 동안 여러분도 이곳에 [참여해](https://letsencrypt.org/getinvolved/) 주십시오.