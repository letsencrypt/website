---
title: 证书兼容性
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


平台能否验证我们的加密证书的主要决定因素是，该平台是否信任ISRG的“ISRG Root X1”证书。 即使有些平台未包含 ISRG Root X1 证书，它们可以验证我们的证书，因为它们信任IdenTrust的 "DST Root CA X3" 证书。 2021年9月之后 只有那些信任ISRG Root X1的平台将可以继续验证我们的加密证书([除安卓](/2020/12/21/extending-android-compatibility.html) 之外)。

如果您的证书在仅能够在一部分（而不是全部）“已知兼容”的平台上通过验证，则问题可能在于 Web 服务器配置错误。 如果您在较新的系统中遇到问题，最常见的原因是网站没有提供正确的证书链。 您可以使用 [SSL Labs 的服务器测试](https://www.ssllabs.com/ssltest/)来测试您站点的兼容性。 如果这个测试仍旧不能帮助您确定问题所在，您可以在我们的[社区论坛](https://community.letsencrypt.org/)中寻求帮助。

# 信任ISRG RootX1的平台

* Windows >= XP SP3 ([如果自动 Root 证书更新没有手动禁用的话](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([不包括 iOS 9](https://support.apple.com/en-us/HT205205))
* [iPhone 5 及可以升级到 iOS 10的苹果手机](https://en.wikipedia.org/wiki/IPhone_5) ，因此可以信任ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) (但安卓 >= 2.3.6 默认情况下可兼容 [由于我们的特殊交叉证书](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist) (安装更新后)
* [Ubuntu >= xenial / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (安装更新后)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

浏览器(Chrome、Safari、Edge、Opera) 一般都信任他们所运行于的操作系统的根证书。 Firefox 是例外：它有自己的根证书列表。 不久，Chrome的新版本将 [也有自己的根证书列表](https://www.chromium.org/Home/chromium-security/root-ca-policy)。

# 信任DST Root CA X3的平台

* Windows >= XP SP3
* macOS (大多数版本)
* iOS (大多数版本)
* [Android OS >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= precise / 12.04
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Blackberry >= 10.3.3
* PS4 游戏机（固件版本 >= 5.00）

您可以在此[论坛讨论贴](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)中获取有更多关兼容性的信息。

# 已知不兼容

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP SP3 之前的系统
  * 无法处理 SHA-2 签名的证书
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail（2012 版邮件客户端，而非网页端邮件服务）
  * 无法处理不包含CRL的证书
* PS3 游戏机
* PS4 游戏机（固件版本 < 5.00 ）

# ISRG Root X2 (新 ECDSA root) - 即将推出
我们已经将ISRG Root X2提交给微软、苹果、谷歌、Mozilla和Oracle根证书程序以供兼容。 ISRG Root X2已经通过我们的 ISRG Root X1 的交叉签名得到广泛信任。 欲了解更多信息，请查看我们的 [社区论坛帖子](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


