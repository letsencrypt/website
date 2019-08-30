---
title: localhost를 위한 인증서
permalink: /docs/certificates-for-localhost
top_graphic: 1
date: 2017-12-21
lastmod: 2017-12-21
---

{{< lastmod >}}

가끔 사람들은 로컬 개발에 사용하거나, 웹 앱과 통신해야 하는 네이티브 앱을 배포하기 위해 호스트 이름 "localhost"에 대한 인증서를 얻고 싶어합니다. Let's Encrypt는 "localhost"에 대한 인증서를 제공 할 수 없습니다. 그것을 아무도 고유하게 소유하지 않으며, ".com" 또는 ".net"과 같은 최상위 도메인에 뿌리를 두고 있지 않기 때문입니다. 127.0.0.1로 확인되는 자체 도메인 이름을 설정하고, DNS 챌린지를 사용하여 도메인 이름에 대한 인증서를 얻을 수 있습니다. 그러나 이건 일반적으로 나쁜 방법이며 더 나은 옵션이 있습니다.

# 로컬에서 개발하는 경우

웹 애플리케이션을 개발하는 경우, Apache 또는 Nginx와 같은 로컬 웹 서버를 실행하고 웹 브라우저에서 http://localhost:8000/ 을 통해 액세스하는 것이 유용합니다. 그러나 웹 브라우저는 HTTP 대 HTTPS 페이지에서 미묘하게 다른 방식으로 작동합니다. 주요 차이점은 HTTPS 페이지에서 HTTP URL로부터 JavaScript를 로드하라는 요청은 차단된다는 것입니다. 따라서 HTTP를 사용하여 로컬에서 개발하는 경우, 개발 컴퓨터에서는 잘 작동하지만 HTTPS 제작 사이트에 배포 할 때 중단된다는 스크립트 태그를 추가할 수 있습니다. 이런 종류의 문제를 파악하려면 로컬 웹 서버에 HTTPS를 설정하는 것이 좋습니다. 그러나 항상 인증서 경고를 보고 싶지는 않습니다. 로컬에서 녹색 잠금 표시를 어떻게 얻을까요?

가장 좋은 옵션은 자체 서명 또는 로컬 Root에서 서명한 자체 인증서를 생성하고 운영체제의 신뢰 저장소에서 신뢰하는 것입니다. 그런 다음 로컬 웹 서버에서 해당 인증서를 사용하십시오. 자세한 내용은 아래를 참조하십시오.

# 네이티브 앱이 웹 앱과 통신하는 경우

때로는 개발자가 추가 기능을 제공하기 위해 웹 사이트와 함께 사용할 수 있는 다운로드 가능한 네이티브 앱을 제공하려고 합니다. 예를 들어, 웹 앱은 할 수 없지만 Dropbox 및 Spotify 데스크톱 앱은 컴퓨터에서 파일을 스캔할 수 있습니다. 한 가지 공통적인 접근 방식은 이러한 네이티브 앱이 localhost에서 웹 서비스를 제공하고, 웹 앱에서 XMLHTTPRequest (XHR) 또는 WebSockets을 통해 요청을 수행하도록 하는 것입니다. 웹 앱은 거의 항상 HTTPS를 사용합니다. 즉, 브라우저가 XHR 또는 WebSockets 요청을 비보안 URL로 전송하는 것을 금지합니다. 이를 "혼합 콘텐츠 차단"이라고 합니다. 웹 앱과 통신하려면 네이티브 앱이 안전한 웹 서비스를 제공해야 합니다.

다행히 최신 브라우저는 "http://127.0.0.1:8000/"이 루프백 주소를 참조하기 때문에 ["잠재적으로 신뢰할 수있는"][secure-contexts] URL로 [간주][mcb-localhost]합니다. 127.0.0.1로 전송된 트래픽은 시스템을 떠나지 않도록 보장되므로 네트워크 차단에 대해 자동으로 안전하다고 간주됩니다. 즉, 웹 앱이 HTTPS이고 127.0.0.1에서 네이티브 앱 웹 서비스를 제공하는 경우 두 앱은 XHR을 통해 원활하게 통신할 수 있습니다. 불행히도 [localhost는 아직 동일한 기능을 제공받지 못합니다][let-localhost]. WebSockets 또한 어떤 이름이라도 이 기능을 제공받지 못합니다.

이러한 한계를 극복하기 위해 127.0.0.1 (예시: localhost.example.com)로 확인되는 도메인 이름을 전역 DNS에 설정하고, 그 도메인 이름에 대한 인증서를 얻을 수 있습니다. 해당 인증서를 발송할 개인 키를 네이티브 앱과 연결하고 웹 앱에 http://127.0.0.1:8000/ 대신 https://localhost.example.com:8000/ 과 통신하도록 알려줍니다. *이렇게 하지 마십시오.* 이 작업은 사용자가 위험에 처하게되고, 인증서가 취소될 수 있습니다.

IP 주소 대신 도메인 이름을 도입하면 공격자가 중간자 (MitM)에서 DNS를 조회하고 다른 IP 주소를 가리키는 응답을 삽입할 수 있습니다. 그런 다음 공격자가 로컬 앱인 것처럼 위조된 응답을 웹 앱으로 보내면, 웹 앱의 디자인에 따라 귀하의 계정을 손상시킬 수 있습니다.

이 상황에서 성공적인 중간자 (MitM)가 가능한 이유는 네이티브 앱으로 인증서에 개인 키를 보내야했기 때문입니다. 즉, 네이티브 앱을 다운로드 한 사람은 공격자를 포함한 누구나 개인 키의 사본을 얻습니다. 이는 개인 키의 손상으로 간주되며 CA (Certificate Authority)가 알게 되면 인증서를 해지해야 합니다. [많은 네이티브 앱][mdsp1]이 [개인 키를 전달하다가][mdsp3] [인증서][mdsp2]를 폐기했습니다.

안타깝게도 이 기능을 사용하면 웹 사이트와 통신할 때 안전하고 좋은 옵션이 없어도 네이티브 앱을 사용할 수 있습니다. 그리고 브라우저가 [웹에서 localhost에 대한 액세스를 더욱 강화하면][tighten-access] 상황이 더 까다로워질 수 있습니다.

또한 권한을 가진 네이티브 API를 제공하는 웹 서비스를 내보내면 권한이 부여되지 않은 웹 사이트가 액세스할 수 있으므로 본질적으로 위험할 수 있습니다. 이 방법을 사용하는 경우, [Cross-Origin Resource Sharing][cors]을 읽고 Access-Control-Allow-Origin와 메모리 보호가 적용된 HTTP 파서를 사용해야 합니다. 원본에서도 적용 전 사전 요청 보내기를 허용하지 않기 때문이며, 이는 파서의 버그를 악용할 수 있습니다.

# 고유 인증서 생성과 신뢰

CA의 도움없이 누구나 고유 인증서를 만들 수 있습니다. 자신이 만든 인증서는 다른 사람이 신뢰하지 않는다는 것이 유일한 차이점입니다. 로컬 개발용으로는 괜찮습니다.

localhost에 대한 개인 키와 자체 서명된 인증서를 생성하는 가장 간단한 방법은 다음과 같은 openssl 명령을 사용하는 것입니다.

    openssl req -x509 -out localhost.crt -keyout localhost.key \
      -newkey rsa:2048 -nodes -sha256 \
      -subj '/CN=localhost' -extensions EXT -config <( \
       printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

localhost.crt와 localhost.key로 로컬 웹서버를 구성하고, 신뢰할 수 있는 root 목록에 localhost.crt를 설치하십시오.

그런 다음 localhost.crt 및 localhost.key를 사용하여 로컬 웹 서버를 구성하고 로컬로 신뢰할 수있는 루트 목록에 localhost.crt를 설치할 수 있습니다.

개발 인증서를 좀 더 사실적으로 만들고 싶으면, [minica][minica]를 사용하여 로컬 root 인증서를 생성하고, 서명된 최종 사용자 (일명 리프) 인증서를 발행할 수 있습니다. 그러면 자체 서명된 최종 사용자 인증서가 아닌 root 인증서를 가져옵니다.

또한 "www.localhost"와 같이 점이 있는 도메인을 /etc/hosts 파일에 127.0.0.1의 별칭으로 추가하여 사용할 수 있습니다. 이는 브라우저가 쿠키 저장을 처리하는 방법을 미묘하게 변경합니다.

[mcb-localhost]: https://bugs.chromium.org/p/chromium/issues/detail?id=607878
[secure-contexts]: https://www.w3.org/TR/secure-contexts/#is-origin-trustworthy
[let-localhost]: https://tools.ietf.org/html/draft-ietf-dnsop-let-localhost-be-localhost-02
[mdsp1]: https://groups.google.com/d/msg/mozilla.dev.security.policy/eV89JXcsBC0/wsj5zpbbAQAJ
[mdsp2]: https://groups.google.com/d/msg/mozilla.dev.security.policy/T6emeoE-lCU/-k-A2dEdAQAJ
[mdsp3]: https://groups.google.com/d/msg/mozilla.dev.security.policy/pk039T_wPrI/tGnFDFTnCQAJ
[tighten-access]: https://bugs.chromium.org/p/chromium/issues/detail?id=378566
[minica]: https://github.com/jsha/minica
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
