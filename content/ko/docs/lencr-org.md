---
title: lencr.org
slug: lencr.org
date: 2020-12-04
lastmod: 2020-12-04
show_lastmod: 1
---


# lencr.org가 무엇입니까?

`lencr.org`는 Let's Encrypt에서 운영하는 도메인입니다. OCSP, CRL, 인증서 발급 프로그램을 호스트하는 데 사용합니다. 인증서에 표시되는 모든 URL들입니다.

`http://ocsp.int-x3.letsencrypt.org/`와 같은 긴 URL을 사용하기도 합니다. 그렇지만 저희가 [새 루트 및 중간 인증서][1]를 발급할 때, 이 길이를 최대한 짧게 만들고자 했습니다. (매일 10억에 달하는) 웹 상의 모든 HTTPS 연결에는 인증서 사본의 전송이 필요하므로, 바이트 하나하나가 중요한 것이죠. 저희는 **L**et's **ENCR**ypt와 비슷한 `lencr.org`를 링크로 채택했습니다. 발음은 Terry Pratchett 작가의 _Discworld_ 소설에 나오는 가상의 지역인 [Lancre][]와 비슷합니다.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://discworld.fandom.com/wiki/Lancre
