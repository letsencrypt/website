---
title: 证书兼容性
slug: certificate-compatibility
lastmod: 2024-07-04
show_lastmod: 1
---


一个平台能否验证 Let's Encrypt 颁发的证书，关键在于该平台是否信任 ISRG 的 ISRG Root X1 或 ISRG Root X2 根证书。 这两份根证书在多年前（ISRG Root X1 于 2016 年末，ISRG Root X2 于 2022 年中）就已收录至各平台的证书库中，但用户普遍完成版本更新则可能需要更长的时间。 目前 ISRG Root X1 已经得到了广泛信任，但 ISRG Root X2 仍待普及。

如果您的证书只能在部分已知的兼容平台上通过验证，原因可能是网站服务器配置不当。 如果您在较新的系统中遇到问题，最常见的原因是网站没有提供正确的证书链。 您可以使用 [SSL Labs 的服务器测试](https://www.ssllabs.com/ssltest/)来测试您站点的兼容性。 如果通过这项测试仍不能确定原因，可以在我们的[社群论坛](https://community.letsencrypt.org/)中寻求帮助。

如果您的平台尚未在下方列出，欢迎提交 [Pull Request](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) 予以补充，同时请引用官方文档注明该平台收录各根证书的时间。

# 信任 ISRG Root X1 的平台

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list)（关闭了 [Automatic Root Certificate Updates](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) 的系统除外）
* macOS >= [10.12.1 Sierra](https://support.apple.com/zh-cn/103425)
* iOS >= [10](https://support.apple.com/zh-cn/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102)（系统更新后）
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/)（系统更新后）
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place)（早期版本使用操作系统的证书库）
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# 信任 ISRG Root X2 的平台

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021)（关闭了 [Automatic Root Certificate Updates](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) 的系统除外）
* macOS >= [13](https://support.apple.com/zh-cn/103100)
* iOS >= [16](https://support.apple.com/zh-cn/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311)（系统更新后）
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place)（早期版本使用操作系统的证书库）

另外，所有信任 ISRG Root X1 的平台都可以信任 [ISRG Root X2 的交叉签名版本](/certificates#root-cas)。
