---
title: 인증서 해지
slug: revoking
top_graphic: 1
date: 2017-06-08
lastmod: 2017-06-08
---

{{< lastmod >}}

인증서에 대응하는 개인 키가 더 이상 안전하지 않으면 인증서를 해지해야 합니다. 이것은 몇 가지 다른 이유로 발생할 수 있습니다. 예를 들어, 실수로 공용 웹 사이트에서 개인 키를 공유하거나 해커가 서버에서 개인 키를 복사할 수 있습니다. 또는 해커가 서버 또는 DNS 구성을 일시적으로 제어하고, 이를 사용하여 개인 키를 보유하고 있는 인증서의 유효성을 검사하고 발급할 수 있습니다.

Let's Encrypt 인증서를 취소하면 Let's Encrypt는 [OCSP (온라인 인증서 상태 프로토콜)](https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol)를 통해 해당 해지 정보를 게시하고, 일부 브라우저는 OCSP에서 인증서를 신뢰해야 하는지 여부를 확인합니다. OCSP에는 [근본적인 문제가 있으므로](https://www.imperialviolet.org/2011/03/18/revocation.html) 모든 브라우저가 이 검사를 수행하지는 않습니다. 그러나 손상된 개인 키에 대응하는 인증서를 해지하는 것은 중요한 실천이며 Let's Encrypt의 {{<link "구독자 계약" "/repository" >}}에 따라 필요합니다.

Let's Encrypt로 인증서를 취소하려면 대부분 [Certbot](https://certbot.eff.org/)과 같은 ACME 클라이언트를 통해 [ACME API](https://github.com/letsencrypt/boulder/blob/master/docs/acme-divergences.md)를 사용하게 됩니다. 귀하에게 인증서를 철회할 수있는 권한이 있음을 Let's Encrypt에 증명해야 합니다. 이 작업에는 세 가지 방법이 있습니다.

# 인증서를 발급한 계정에서 하는 경우

인증서를 원래 발급했었고, 인증서 발급에 사용한 계정을 계속 제어할 수 있는 경우, 계정 자격 증명을 사용하여 인증서를 해지할 수 있습니다. Certbot은 기본적으로 이를 시도합니다. 예시:

```
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# 인증서의 개인 키를 사용하는 경우

인증서를 원래 발급하지 않았지만 해당 개인 키의 복사본이 있는 경우, 개인 키를 사용하여 해지 요청에 서명하고 인증서를 해지할 수 있습니다. 예를 들어, 개인 키가 실수로 공개 된 것을 알았을 때 이 인증서를 처음 발행한 사람이 아니더라도 이 방법을 사용하여 개인 키를 사용한 인증서를 해지할 수 있습니다.

이 방법을 사용하려면 먼저 해지할 인증서를 다운로드해야 합니다. Let's Encrypt는 모든 인증서를 [인증서 투명성](https://www.certificate-transparency.org/) 로그에 기록하므로 [crt.sh](https://crt.sh/)와 같은 로그 모니터에서 인증서를 찾아 다운로드할 수 있습니다.

PEM 형식의 개인 키 사본도 필요합니다. 일단 이들을 모두 가지고 있으면, 다음과 같이 인증서를 취소할 수 있습니다.

```
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/key.pem
```

# 승인된 다른 계정을 사용하는 경우

호스트 또는 DNS를 손상시킨 후 누군가가 인증서를 발급한 경우, 다시 제어권을 얻었을 때 해당 인증서를 해지하고 싶을 것입니다. 인증서 해지를 위해 Let's Encrypt는 귀하가 인증서의 도메인 이름을 제어하고 있다는 것을 확인해야 합니다 (그렇지 않으면 사람이 서로의 인증서를 허가없이 취소할 수 있습니다)! 이 제어권의 유효성을 검사하기 위해 Let's Encrypt는 인증서를 발급하는 데 사용하는 것과 동일한 메서드를 사용합니다. [DNS TXT 레코드에 값](https://tools.ietf.org/html/rfc8555#section-8.4)을 넣거나, [HTTP 서버에 파일](https://tools.ietf.org/html/rfc8555#section-8.3)을 저장하거나, [특수한 TLS 인증서](https://tools.ietf.org/html/rfc8737#section-3)를 제공할 수 있습니다. 일반적으로 ACME 클라이언트가 이를 처리합니다. 대부분의 ACME 클라이언트는 유효성 검사와 발급을 합치므로, 유효성 검사를 요청하는 유일한 방법은 발급을 시도하는 것입니다. 그런 다음 원하지 않는 인증서를 취소하거나, 단순히 개인 키를 삭제할 수 있습니다. 인증서를 아예 발행하지 않으려면, 명령줄에 존재하지 않는 도메인 이름을 포함시키면 됩니다. 이는 다른 기존 도메인 이름의 유효성을 검사하는 동안 인증서 발급에 실패하게 만듭니다. 이렇게 하려면 다음을 실행하십시오.

```
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

그리고 다음 지침을 따르십시오. DNS가 아닌 HTTP를 사용하여 검증하는 것을 선호한다면 `--preferred-challenges` 플래그를 `--preferred-challenges = http`로 수정하십시오.

해지하려는 인증서에서 모든 도메인 이름을 제어할 수 있는지 확인한 후에는 [crt.sh](https://crt.sh/)에서 인증서를 다운로드한 다음 인증서를 발급한 것처럼 인증서를 해지할 수 있습니다.

```
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```
