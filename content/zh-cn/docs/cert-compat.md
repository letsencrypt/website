---
title: 证书兼容性
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt 尽力在不影响安全性的前提下与尽可能多的软件兼容。Let's Encrypt 的证书能否通过平台的验证主要取决于该平台是否在其受信证书存储中包含 IdenTrust 的 DST Root X3 证书。另外这还受平台是否支持 [SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1) 证书影响，因为 Let's Encrypt 的所有证书都使用 SHA-2。

如果您的证书在仅在一部分（而不是全部）“已知兼容”的平台上能够通过验证，则问题可能在于 Web 服务器配置错误。如果您在较新的系统中遇到问题，最常见的原因是网站没有提供正确的证书链。如果您在 Windows XP 等较旧的平台上遇到问题，最常见的原因是没有配置好该平台支持的加密算法套件或 TLS 版本，或者该平台不支持服务器名称指示（SNI）。您可以使用 [SSL Labs 的服务器测试](https://www.ssllabs.com/ssltest/)测试您站点的兼容性。如果这个测试仍旧不能确定问题所在，您可以在我们的[社区论坛](https://community.letsencrypt.org/)中寻求帮助。

您可以在[此论坛讨论贴](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)中获取有关兼容性的更多信息。

# 已知兼容的软件

* Mozilla Firefox >= v2.0
* Google Chrome
* Windows XP SP3 及更高版本上的 Internet Explorer
* Microsoft Edge
* Android OS >= v2.3.6
* macOS 上的 Safari >= v4.0
* iOS 上的 Safari >= v3.1
* Debian Linux >= v6
* Ubuntu Linux >= v12.04
* NSS Library >= v3.11.9
* Amazon FireOS (Silk Browser)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Kindle > v3.4.1
* Java 7 >= 7u111
* Java 8 >= 8u101
* Blackberry >= 10.3.3
* 固件版本 >= 5.00 的 PS4 游戏机

# 已知不兼容的软件

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
* 固件版本 < 5.00 的 PS4 游戏机
