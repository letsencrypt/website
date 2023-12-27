---
title: 证书兼容性
slug: certificate-compatibility
top_graphic: 1
lastmod: 2023-08-02
show_lastmod: 1
---


平台能否验证Let's Encrypt证书的主要决定因素是，该平台是否信任ISRG的“ISRG Root X1”证书。 在2021年9月之前， 有些平台即使未信任 ISRG Root X1 证书也可以验证我们的证书，因为它们信任IdenTrust的 "DST Root CA X3" 证书。 自2021年10月起，只有那些信任ISRG Root X1的平台才能验证Let's Encrypt证书([Android平台除外][android-compat])。

如果您的证书只能在部分已知的兼容平台上通过验证，原因可能是网站服务器配置不当。 如果您在较新的系统中遇到问题，最常见的原因是网站没有提供正确的证书链。 您可以使用 [SSL Labs 的服务器测试](https://www.ssllabs.com/ssltest/)来测试您站点的兼容性。 如果这个测试仍旧不能帮助您确定问题所在，您可以在我们的[社区论坛](https://community.letsencrypt.org/)中寻求帮助。

# 信任ISRG RootX1的平台

* Windows >= XP SP3（[如果没有手动关闭“自动更新根证书”功能](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/)）
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS >= 10](https://support.apple.com/en-us/HT207177) ([不包括 iOS 9](https://support.apple.com/en-us/HT205205))
* [iPhone 5 及更新款可升级至 iOS 10](https://en.wikipedia.org/wiki/IPhone_5) ，因此可以信任 ISRG Root X1
* [Android >= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) ([由于我们的特殊交互签名证书](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html)，安卓 >= 2.3.6 默认情况下可信任)
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= Precise Pangolin / 12.04（安装更新后）
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (安装更新后)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Chrome、Safari、Edge、Opera 浏览器信任的根证书通常与操作系统一致。 Firefox 是例外：它有自己的根证书列表。 不久以后 Chrome 也将有[独立的根证书列表][chrome-root-store]。

# 信任DST Root CA X3但不信任ISRG Root X1的平台

这些平台在2021年9月前可以使用， 但是现在不再验证 Let's Encrypt 证书。

* macOS < 10.12.1
* iOS < 10
* Mozilla Firefox < 50
* Ubuntu >= intrepid / 8.10
* [Debian >= squeeze / 6](https://twitter.com/TokenScandi/status/600806080684359680), < jessie /8
* Java 8 >= 8u101, < 8u141
* Java 7 >= 7u111, < 7u151
* NSS >= v3.11.9, < 3.26
* Amazon FireOS (Silk Browser) (版本范围未知)
* Cyanogen > v10 (添加 ISRG Root X1 信任的版本未知)
* Jolla Sailfish OS > v1.1.2.16 (添加 ISRG Root X1 信任的版本未知)
* Kindle > v3.4.1 (添加 ISRG Root X1 信任的版本未知)
* Blackberry >= 10.3.3 (添加 ISRG Root X1 信任的版本未知)
* 固件 >= 5.00 的 PS4 游戏机 (添加 ISRG Root X1 信任的版本未知)

# 已知不兼容的平台

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

# ISRG Root X2（新 ECDSA 根证书）：即将推出

我们已将 ISRG Root X2 提交至 Microsoft、Apple、Google、Mozilla 和 Oracle 的根证书项目。

此前 ISRG Root X2 就已经通过 ISRG Root X1 的交叉签名得到了广泛信任， 多个根证书项目也已接纳 ISRG Root X2 作为可信根证书。

关于根证书的准入进展，请查阅我们的[社群论坛讨论帖](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)。

在等待 ISRG Root X2 根证书得到广泛信任的同时，您也可以主动选择由 ISRG Root X2 为您颁发 ECDSA 证书。 详情请见我们的[社群论坛讨论帖](https://community.letsencrypt.org/t/root-x2-alternate-chain-for-ecdsa-opt-in-accounts/202884)。

[android-compat]: /2020/12/21/extending-android-compatibility.html

[chrome-root-store]: https://www.chromium.org/Home/chromium-security/root-ca-policy
