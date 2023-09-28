---
title: 인증서 호환성
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


특정 플랫폼에서 Let's Encrypt 인증서의 유효성을 검사 할 수 있는지 여부를 결정하는 주요 요인은 해당 플랫폼에 ISRG의 ISRG Root X1 인증서가 신뢰 저장소에 포함되어 있는지 여부입니다. 몇몇 플랫폼들은 ISRG Root X1 인증서가 없어도 IdenTrust의 "DST Root CA X3" 인증서를 신뢰하기 때문에 인증서를 신뢰할 수 있습니다. 2021년 9월 이후, ([안드로이드를 제외한](/2020/12/21/extending-android-compatibility.html)) 모든 플랫폼들은 ISRG Root X1 인증서를 신뢰하는 플랫폼만 Let's Encrypt 인증서를 신뢰합니다.

인증서가 아래 "알려진 호환성" 플랫폼 중 일부에 유효성을 검사하지만 다른 인증서는 유효하지 않은 경우, 문제는 웹 서버 구성 오류일 수 있으며 대부분 올바른 인증서 체인을 제공하지 못하게 됩니다. 최신 플랫폼에서 문제가 발생하는 경우, 대부분 올바른 인증서 체인을 제공하지 못하여 발생하는 문제입니다. [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/) 를 사용하여 사이트를 테스트하십시오. 그래도 문제가 확인되지 않으면 [커뮤니티 포럼](https://community.letsencrypt.org/)에 도움을 요청하십시오.

# ISRG Root X1를 신뢰하는 플랫폼

* 윈도우 >= XP SP3 ([자동 루트 인증서 업데이트를 강제로 비활성화하지 않았다는 전제 하](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [맥OS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 제외](https://support.apple.com/en-us/HT205205))
* [iPhone 5 이상은 iOS 10으로 업그레이드 후](https://en.wikipedia.org/wiki/IPhone_5) ISRG Root X1 신뢰 가능
* [안드로이드 >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (안드로이드 >= 2.3.6은 [특별한 교차 서명](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html)으로 기본적으로 신뢰함)
* [모질라 파이어폭스 >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [우분투 >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (업데이트 적용 후)
* [데비안 >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (업데이트 적용 후)
* [자바 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [자바 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

브라우저 (크롬, 사파리, 엣지, 오페라) 는 기본적으로 운영 체제의 루트 인증서를 신뢰합니다. 파이어폭스는 예외입니다: 이는 루트 인증서 저장소를 직접 가지고 있습니다. 곧, 새로운 버전의 크롬도 [루트 인증서 저장소를 직접 가질 예정입니다](https://www.chromium.org/Home/chromium-security/root-ca-policy).

# DST Root CA X3를 신뢰하는 플랫폼

* 윈도우 >= XP SP3
* 맥OS (대부분의 버전)
* iOS (대부분의 버전)
* [안드로이드 >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* 모질라 파이어폭스 >= v2.0
* 우분투 >= precise / 12.04
* [데비안 >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* 자바 8 >= 8u101
* 자바 7 >= 7u111
* NSS >= v3.11.9
* 아마존 파이어OS (실크 브라우저)
* Cyanogen (사이애노젠) > v10
* Jolla Sailfish (욜라 세일피시) OS > v1.1.2.16
* 아마존 킨들 > v3.4.1
* 블랙베리 OS >= 10.3.3
* PS4 게임 기기 내 펌웨어 >= 5.00

호환성에 대한 자세한 내용은 [이 2015-2017 커뮤니티 포럼 토론방](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)을 방문하십시오.

# 알려진 비호환성 버전

* 블랙베리 OS < v10.3.3
* 안드로이드 OS < v2.3.6
* 닌텐도 3DS 게임 기기
* 윈도우 XP SP3 이전 버전
  * SHA-2 서명 인증서를 처리할 수 없음
* 자바 7 < 7u111
* 자바 8 < 8u101
* 윈도우 라이브 메일 (2012버전 메일 클라이언트, 웹메일 아님)
  * CRL없이 인증서를 처리할 수 없음
* PS3 게임 기기
* PS4 게임 기기 내 펌웨어 < 5.00

# ISRG Root X2 (새로운 ECDSA 루트) - 곧 예정
저희는 ISRG Root X2를 마이크로소프트, 애플, 구글, 모질라, 그리고 오라클에 제출했습니다. ISRG Root X2는 ISRG Root X1의 교차 서명으로 이미 많은 플랫폼에서 신뢰받고 있습니다. 자세한 정보를 원하시면 저희의 [커뮤니티 포럼 포스트](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)를 확인해 보세요.


