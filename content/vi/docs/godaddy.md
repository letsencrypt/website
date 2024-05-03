---
title: "Các Chứng Chỉ Let's Encrypt trên GoDaddy Hosting"
slug: godaddy
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Chúng tôi nhận được rất nhiều câu hỏi về cách sử dụng Let’s Encrypt trên GoDaddy. Nếu bạn sử dụng dịch vụ lưu trữ web chia sẻ của GoDaddy, thì hiện tại rất khó cài đặt chứng chỉ Let’s Encrypt, vì vậy chúng tôi hiện không khuyên bạn nên sử dụng chứng chỉ của chúng tôi với GoDaddy. Đó là vì GoDaddy không hỗ trợ [giao thức ACME](https://tools.ietf.org/html/rfc8555) để cấp và gia hạn chứng chỉ tự động. Thay vào đó, GoDaddy cung cấp tính năng gia hạn tự động với các chứng chỉ của riêng họ, là một [ tính năng bổ sung ](https://www.godaddy.com/web-security/ssl-certificate).

Chúng tôi khuyên bạn không nên sử dụng chứng chỉ Let's Encrypt của các nhà cung cấp hosting không trực tiếp triển khai giao thức ACME, bởi vì điều đó có nghĩa là bạn không thể tự động hóa hoàn toàn việc gia hạn. Chúng tôi nghĩ việc tự động gia hạn là một phần rất quan trọng của việc sử dụng chứng nhận. Việc sử dụng phần mềm để tự động hóa gia hạn giúp giảm thiểu rằng chứng chỉ của bạn sẽ hết hạn mà không được thay thế. Nếu chứng chỉ của bạn hết hạn, người dùng sẽ rất khó chịu vì họ không thể truy cập trang web của bạn.

Bởi vì chúng tôi rất tin tưởng vào việc gia hạn tự động, chúng tôi thiết kế các chứng chỉ của mình để sử dụng với tự động hóa ACME. Chứng chỉ Let’s Encrypt được hiểu là tự động gia hạn sau 60 ngày và sẽ ngừng hoạt động sau 90 ngày nếu không được gia hạn.

Nếu sau khi xem xét các sự cố trên, bạn quyết định muốn thử duy trì chứng chỉ Let's Encrypt trên máy chủ lưu trữ dùng chung của GoDaddy, GoDaddy [cung cấp hướng dẫn](https://www.godaddy.com/help/install-a-lets -encrypt-certificate-on-your-cpanel-hosting-account-28023). Hãy nhớ rằng việc làm theo các hướng dẫn này tốn nhiều thời gian và bạn phải thực hiện 60 ngày một lần (không phải 90 ngày một lần như được mô tả trên trang được liên kết).
