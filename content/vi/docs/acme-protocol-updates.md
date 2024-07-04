---
title: Cập Nhật Giao Thức ACME
slug: acme-protocol-updates
lastmod: 2019-10-07
show_lastmod: 1
---

Giao thức ACME được

tiêu chuẩn hoá theo IETF, [RFC 8555](https://datatracker.ietf.org/doc/rfc8555/), là nền tảng cách hoạt động của Let's Encrypt.



# API Endpoints

Chúng tôi hiện có các API endpoint sau. Vui lòng xem [tài liệu phân kỳ của chúng tôi](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md) Để so sánh việc triển khai chúng với tài liệu đặc tả ACME.



## ACME v2 (RFC 8555)

* [Production] `https://acme-v02.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging-v02.api.letsencrypt.org/directory`



## ACME v1 (không được dùng nữa)

* [Production] `https://acme-v01.api.letsencrypt.org/directory`
* [Staging] `https://acme-staging.api.letsencrypt.org/directory`



# Các tính năng tương thích ngược mới của ACME

Đôi khi, Let's Encrypt có thể triển khai các tính năng tương thích ngược mới cho các API endpoint hiện có. Thông thường, các tính năng tương thích ngược mới được giới thiệu vì chúng tôi đã quyết định triển khai một phần đặc tả của ACME mà chúng tôi chưa triển khai trước đây.

Khi các tính năng mới được giới thiệu cho các API endpoint hiện có, các tính năng sẽ luôn được chỉ định rõ ràng trong đặc tả ACME công khai và sẽ không phá vỡ các ứng dụng khách được triển khai đúng cách.



# Các phiên bản mới của ACME với những thay đổi đột phá

Chúng tôi không có kế hoạch thực hiện các thay đổi đột phá đối với việc hỗ trợ ACME của mình, nhưng nếu chúng tôi cảm thấy điều đó là quan trọng, chúng tôi sẽ nỗ lực để quá trình chuyển đổi suôn sẻ trong thời gian đủ và liên lạc trước càng nhiều càng tốt. Các quản trị viên hệ thống nên duy trì khả năng triển khai các bản cập nhật với các khách hàng ACME của họ trong trường hợp cần có một thay đổi đột ngột.
