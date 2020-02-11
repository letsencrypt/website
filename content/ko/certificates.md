---
title: 신뢰의 사슬
linkTitle: 신뢰의 체인 (root 및 중간 인증서)
slug: certificates
top_graphic: 5
lastmod: 2019-10-18
---

{{< lastmod >}}

# Root 인증서

저희 root는 안전하게 오프라인 상태로 유지됩니다. 다음 섹션에서는 중간 인증서로부터 최종 기관 인증서를 가입자에게 발행합니다.

* 활성
  * [ISRG Root X1 (자체 서명)](/certs/isrgrootx1.pem.txt)

저희는 root를 추적하는 인증서를 테스트할 수 있는 웹 사이트를 만들었습니다.

* ISRG Root X1 유효 인증서
  * [https://valid-isrgrootx1.letsencrypt.org/](https://valid-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 해지된 인증서
  * [https://revoked-isrgrootx1.letsencrypt.org/](https://revoked-isrgrootx1.letsencrypt.org/)
* ISRG Root X1 만료된 인증서
  * [https://expired-isrgrootx1.letsencrypt.org/](https://expired-isrgrootx1.letsencrypt.org/)

# 중간 인증서

IdenTrust는 중간 인증서에 교차 서명했습니다. 이렇게 하면 저희가 고유 root를 전파하는 동안 모든 주요 브라우저가 최종 인증서를 수락할 수 있습니다.

정상적인 상황에서 Let's Encrypt가 발행한 인증서는 "Let's Encrypt Authority X3"에서 가져옵니다. 다른 중간 인증서인 "Let's Encrypt Authority X4"는 재해 복구용으로 예약되었으며 "Let's Encrypt Authority X3"으로 발급 할 수 있는 능력을 잃어버리면 사용됩니다. X1과 X2 중간 인증서는 1세대 중간 인증서였습니다. 저희는 이를 윈도우 XP와 더 호환되는 새로운 중간 인증서로 대체했습니다.

* 활성
  * [Let's Encrypt Authority X3 (IdenTrust에 의해 교차 서명)](/certs/lets-encrypt-x3-cross-signed.pem.txt)
    * [Let's Encrypt Authority X3 (ISRG Root X1에 의해 서명)](/certs/letsencryptauthorityx3.pem.txt)
* 백업
  * [Let's Encrypt Authority X4 (IdenTrust에 의해 교차 서명)](/certs/lets-encrypt-x4-cross-signed.pem.txt)
    * [Let's Encrypt Authority X4 (ISRG Root X1에 의해 서명)](/certs/letsencryptauthorityx4.pem.txt)
* 폐기
  * [Let's Encrypt Authority X2 (IdenTrust에 의해 교차 서명)](/certs/lets-encrypt-x2-cross-signed.pem.txt)
    * [Let's Encrypt Authority X2 (ISRG Root X1에 의해 서명)](/certs/letsencryptauthorityx2.pem.txt)
  * [Let's Encrypt Authority X1 (IdenTrust에 의해 교차 서명)](/certs/lets-encrypt-x1-cross-signed.pem.txt)
    * [Let's Encrypt Authority X1 (ISRG Root X1에 의해 서명)](/certs/letsencryptauthorityx1.pem.txt)

# 교차 서명

저희의 중간 인증서 "Let's Encrypt Authority X3"는 하나의 공개/개인 키 쌍을 나타냅니다. 이 쌍의 개인 키는 모든 최종 기관 인증서 (리프 인증서라고도 함)에 대한 서명, 즉 서버에서 사용하기 위해 발행된 인증서를 생성합니다.

중간 인증서는 ISRG Root X1에 의해 서명됩니다. 그러나 저희는 매우 새로운 인증 기관이기 때문에 ISRG Root X1은 대부분의 브라우저에서 아직 신뢰되지 않습니다. 곧바로 널리 인정받기 위해, 중간 인증서는 다른 주요 CA인 IdenTrust와 교차 서명을 합니다. IdenTrust는 root가 이미 모든 주요 브라우저에서 신뢰받고 있습니다. 특히, IdenTrust는 [DST Root CA X3](https://www.identrust.com/certificates/trustid/root-download-x3.html)을 사용하여 저희 중간 인증서에 서명했습니다.

즉, 두 가지 인증서가 모두 중간 인증서를 나타내는 것입니다. 하나는 DST Root CA X3에 의해 서명되고, 다른 하나는 ISRG Root X1에 의해 서명됩니다. 두 가지를 구별하는 가장 쉬운 방법은 Issuer 필드를 보는 것입니다.

웹 서버를 구성할 때, 서버 운영자는 최종 기관 인증서 뿐만 아니라 최종 기관 인증서에 신뢰할 수 있는 root 인증서로 이어지는 신뢰 관계가 있는지 확인하는 데 도움이 되는 중간 인증서 목록도 구성합니다. 거의 모든 서버 운영자는 제목이 "Let's Encrypt Authority X3"와 발급자 "DST Root CA X3"로 된 인증서를 포함하는 체인을 제공할 것입니다. 공식 Let's Encrypt 소프트웨어는 이 구성을 원활하게 수행할 것입니다.

다음 그림은 인증서 간의 관계를 시각적으로 설명합니다.

<img src="/certs/isrg-keys.png" alt="ISRG Key relationship diagram">

# OCSP 서명 인증서

이 인증서는 Let's Encrypt Authority 중간 인증서에 대한 OCSP 응답에 서명하는 데 사용되므로 이 응답에 서명하기 위해 root 키를 온라인 상태로 만들 필요가 없습니다. 이 인증서의 복사본은 OCSP 응답에 자동으로 포함되므로 구독자는 아무것도 할 필요가 없습니다. 정보 제공의 목적으로만 여기에 포함됩니다.

* [ISRG Root OCSP X1 (ISRG Root X1에 의해 서명)](/certs/isrg-root-ocsp-x1.pem.txt)

# 인증서 투명성

저희는 운영 방식 및 발행 인증서의 투명성에 전념합니다. 모든 인증서를 발행할 때 [인증서 투명성 로그](https://www.certificate-transparency.org/)에 제출합니다. 다음 링크를 통해 발행 된 Let's Encrypt 인증서를 모두 볼 수 있습니다.

* [Let's Encrypt Authority X1에 의해 발행](https://crt.sh/?Identity=%25&iCAID=7395)
* [Let's Encrypt Authority X3에 의해 발행](https://crt.sh/?Identity=%25&iCAID=16418)

# 추가 정보

ISRG Root CA 및 Let's Encrypt 중간 CA의 개인 키는 도난당한 키에 대해 높은 수준의 보호 기능을 제공하는 하드웨어 보안 모듈 (HSM)에 저장됩니다.

모든 ISRG 키는 현재 RSA 키입니다. 우리는 2018년 3월에 {{<link "ECDSA 키를 생성 할 계획" "/upcoming-features" >}}입니다.
