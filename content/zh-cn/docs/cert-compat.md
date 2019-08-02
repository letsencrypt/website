---
title: 证书兼容性
slug: certificate-compatibility
top_graphic: 1
date: 2016-12-05
lastmod: 2016-12-05
---

{{< lastmod >}}

Let's Encrypt旨在与尽可能多的软件兼容，而不会影响安全性。 平台是否可以验证Let's Encrypt证书的主要决定因素是该平台是否在其信任存储中包含IdenTrust的DST Root X3证书。 次要因素是平台是否支持[SHA-2](https://konklone.com/post/why-google-is-hurrying-the-web-to-kill-sha-1)证书，因为所有Let's Encrypt证书都使用SHA-2。

如果您的证书在某些“已知兼容”平台上可以使用，而在其他平台上无法使用，则问题可能是网站服务器配置错误。 如果您在较新系统中遇到问题，最常见的原因是网站没有提供正确的证书链。 如果您在0Windows XP等较旧平台遇到问题，最常见的原因是无法配置平台支持的密码套件或TLS版本，或者平台缺乏对服务器名称指示（SNI）的支持。您可以使用[SSL Labs的服务器测试](https://www.ssllabs.com/ssltest/)测试您的站点兼容性。 如果这不能确定问题，请在我们的[社区论坛](https://community.letsencrypt.org/)中寻求帮助。

您可能希望访问[此论坛讨论贴](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/)，以获取有关兼容性的更多信息。

# 已知兼容

* Mozilla Firefox >= v2.0
* Google Chrome
* Windows XP SP3及更高版本上的Internet Explorer
* Microsoft Edge
* Android OS >= v2.3.6
* macOS上Safari >= v4.0
* iOS上Safari >= v3.1
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
* 固件>= 5.00的PS4游戏机

# 已知不兼容系统

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP SP3之前的系统
  * 无法处理SHA-2签名证书
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail（2012邮件客户端，非网页邮）
  * 证书内必须有CRL，否则无法处理
* PS3游戏机
* 固件<5.00的PS4游戏机
