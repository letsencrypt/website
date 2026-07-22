---
title: Khả năng tương thích của Chứng chỉ
slug: certificate-compatibility
lastmod: 2024-08-25
show_lastmod: 1
---


Yếu tố quyết định để một nền tảng có thể xác thực chứng chỉ của Let's Encrypt hay không là liệu nền tảng đó có tin cậy các chứng chỉ "ISRG Root X1" hoặc "ISRG Root X2" của ISRG hay không. Cả hai chứng chỉ gốc này đã được đưa vào kho lưu trữ tin cậy của các nền tảng trong vài năm nay (ISRG Root X1 từ cuối năm 2016, ISRG Root X2 từ giữa năm 2022), nhưng có thể mất nhiều thời gian hơn để các bản cập nhật nền tảng được cài đặt rộng rãi. Hiện nay, sự tin cậy đối với ISRG Root X1 đã gần như phổ biến ở khắp mọi nơi, trong khi sự tin cậy đối với ISRG Root X2 vẫn đang trong quá trình lan tỏa.

Nếu chứng chỉ của bạn xác thực được trên một số nền tảng trong danh sách "Đã biết tương thích" (Known Compatible) nhưng lại không hoạt động trên các nền tảng khác, vấn đề có thể nằm ở việc cấu hình sai máy chủ web. Nếu bạn đang gặp sự cố với các nền tảng hiện đại, nguyên nhân phổ biến nhất là do không cung cấp được chuỗi chứng chỉ chính xác. Kiểm tra trang web của bạn với [SSL Labs' Server Test](https://www.ssllabs.com/ssltest/). Nếu điều đó không giúp xác định được vấn đề, hãy yêu cầu trợ giúp tại [Diễn đàn Cộng đồng](https://community.letsencrypt.org/) của chúng tôi.

Nếu nền tảng của bạn không được liệt kê ở đây, chúng tôi rất hoan nghênh các [yêu cầu kéo (pull requests)](https://github.com/letsencrypt/website/blob/main/content/en/docs/cert-compat.md) bao gồm tài liệu về thời điểm mỗi chứng chỉ gốc được thêm vào kho lưu trữ tin cậy của nền tảng đó.

# Các nền tảng tin cậy ISRG Root X1

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/participants-list) (trừ khi [Cập nhật Chứng chỉ Gốc Tự động](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) đã bị vô hiệu hóa)
* macOS >= [10.12.1 Sierra](https://support.apple.com/en-us/103425)
* iOS >= [10](https://support.apple.com/en-us/HT207177)
* Android >= [7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15)
* Firefox >= [50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* Ubuntu >= [12.04 Precise Pangolin](https://launchpad.net/ubuntu/+source/ca-certificates/20161102) (với các bản cập nhật đã được áp dụng)
* Debian >= [8 / Jessie](https://tracker.debian.org/news/812114/accepted-ca-certificates-20161102-source-all-into-unstable/) (với các bản cập nhật đã được áp dụng)
* RHEL >= 6.10, 7.4 ([với các bản cập nhật đã được áp dụng](https://src.fedoraproject.org/rpms/ca-certificates/c/02204a071d2effe7cdb840c1a2763bcdc396c4be)), 8+
* Java >= [7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html), [8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html), [9+](https://www.oracle.com/java/technologies/javase/9-all-relnotes.html#JDK-8177539)
* NSS >= [3.26](https://nss-crypto.org/reference/security/nss/legacy/nss_releases/nss_3.26_release_notes/index.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (các phiên bản trước đó sử dụng kho lưu trữ tin cậy của hệ điều hành)
* PlayStation >= [PS4 v8.0.0](https://web.archive.org/web/20210306180757/https://www.sie.com/content/dam/corporate/jp/guideline/PS4_Web_Content-Guidelines_e.pdf)

# Các nền tảng tin cậy ISRG Root X2

* Windows >= [XP SP3, Server 2008](https://learn.microsoft.com/en-us/security/trusted-root/2021/may2021) (trừ khi [Automatic Root Certificate Updates](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/cc733922(v=ws.10)) đã bị vô hiệu hóa)
* macOS >= [13](https://support.apple.com/en-us/103100)
* iOS >= [16](https://support.apple.com/en-us/103100)
* Android >= [14](https://android.googlesource.com/platform/system/ca-certificates/+/c8d7f51bbb3de2c40a0d868972be008070eb25d8)
* Firefox >= [97](https://bugzilla.mozilla.org/show_bug.cgi?id=1701317)
* Ubuntu >= [18.04 Bionic Beaver](https://launchpad.net/ubuntu/+source/ca-certificates/20230311) (với các bản cập nhật đã được áp dụng)
* Debian >= [12 / Bookworm](https://tracker.debian.org/news/1426477/accepted-ca-certificates-20230311-source-into-unstable/)
* RHEL >= 7.9, 8.6, 9.1 ([với các bản cập nhật đã được áp dụng](https://src.fedoraproject.org/rpms/ca-certificates/c/f6b8f45e836dfc9c69585bf7ef0250ad734b086a))
* Java >= [21.0.2](https://jdk.java.net/21/release-notes)
* NSS >= [3.74](https://firefox-source-docs.mozilla.org/security/nss/releases/nss_3_74.html)
* Chrome >= [105](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/faq.md#when-are-these-changes-taking-place) (các phiên bản trước đó sử dụng kho lưu trữ tin cậy của hệ điều hành)

Ngoài ra, tất cả các nền tảng tin cậy ISRG Root X1 cũng tin cậy [phiên bản ký chéo (cross-signed) của ISRG Root X2](/certificates#root-cas).
