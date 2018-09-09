---
author: Josh Aas, ISRG Executive Director
date: 2017-10-17T00:00:00Z
excerpt: We’re excited that support for getting and managing TLS certificates via
  the ACME protocol is coming to the Apache HTTP Server Project (httpd).
title: Apache HTTP서버 프로젝트의 ACME지원
slug: acme-support-in-apache-httpd
---

TLS인증서를 가져오고 관리할 수 있도록 [Apache HTTP 서버 프로젝트(httpd)](https://httpd.apache.org/)에 [ACME 프로토콜](https://tools.ietf.org/html/draft-ietf-acme-acme-07) 지원이 포함되어 기쁩니다. ACME는 Let 's Encrypt가 사용하는 프로토콜이며 앞으로는 다른 인증 기관에서도 이 프로토콜을 수용하기를 희망합니다. ACME 프로토콜이 신규 및 기존 웹 사이트에 HTTPS를 적용하는 데 크게 도움이 될 것으로 예상합니다.

최대한 간단하게 TLS인증서를 받고 관리하기 위해 Let’s Encrypt를 만들었습니다. Let’s Encrypt 사용자의 경우, 이는 대개 ACME 클라이언트를 얻고 몇 가지 간단한 명령을 실행하는 것을 의미합니다. 궁극적으로, 대부분의 Let’s Encrypt 사용자들이 추가적인 소프트웨어를 설치할 필요가 없도록 그들의 서버 소프트웨어에 ACME 클라이언트를 구축하기를 바라고 있습니다. HTTPS를 배포하기 위해서는 사람들이 해야 할 일이 적을수록 좋습니다!

ACME가 세계에서 가장 유명한 웹 서버 중 하나인 아파치 httpd에 내장되어 있다는 것은 수백만 개의 웹 사이트에 HTTPS를 배포하는데 더 쉽기 때문에 좋습니다. 이것은 가능한 많은 사람에게 이상적인 인증서 발급 및 관리 경험을 제공하기 위한 큰 단계입니다.

아파치 httpd ACME 모듈을 mod_md라고 합니다. 이 모듈은 현재 [httpd의 개발 버전](https://svn.apache.org/viewvc/httpd/httpd/trunk/modules/md/)에 있으며 httpd 2.4.x 정식 배포로 새로운 기능을 지원할 계획입니다. 그리고 mod_md모듈은 [깃허브](https://github.com/icing/mod_md)에서 사용할 수 있습니다.

<div style="text-align: center;"><iframe width="560" height="315" src="https://www.youtube.com/embed/gNJUpzNNWMw?rel=0" frameborder="0" allowfullscreen></iframe></div>

또한, 현재 아파치 httpd 의 개발 버전은 [SSLPolicy 지시어](https://httpd.apache.org/docs/trunk/mod/mod_ssl.html#sslpolicy)에 대한 지원을 포함한다는 것도 언급할 필요가 있습니다. TLS를 적절히 구성하려면 예전부터 여러가지 복잡한 선택을 해야 했습니다. SSLPolicy 지시어를 사용하면 관리자는 간단하게 최신, 중간, 이전 TLS구성을 선택하기만 하면 되고, 그에 따라 합리적인 선택이 이루어집니다.

Mod_md모듈과 SSLPolicy 지시어 개발은 [모질라에 의해 후원](https://blog.mozilla.org/blog/2017/10/03/mozilla-awards-half-million-open-source-projects/)받았으며, 주로 [Greenbytes](https://www.greenbytes.de/)의 Stefan Eissing에 의해 수행되고 있습니다. 모질라와 Stefan Eissing에게 감사드립니다!

Let’s Encrypt는 현재 5,500만 개 이상의 웹 사이트에 인증서를 제공하고 있습니다. Let’s Encrypt 서비스를 통한 HTTPS 구축이 더욱 용이에 짐에 따라 더 많은 웹 사이트를 서비스할 수 있기를 기대하고 있습니다. 만약 당신이 HTTPS 웹의 잠재력에 대해 기대한다면, Let’s Encrypt 서비스에 [참여](https://letsencrypt.org/getinvolved/)하거나 [기부](https://letsencrypt.org/donate/)하거나 [후원](https://letsencrypt.org/become-a-sponsor/)하는 것을 고려해 주십시오.
