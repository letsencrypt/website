---
title: Tìm ID Của Tài Khoản
slug: account-id
top_graphic: 1
date: 2016-08-10
lastmod: 2019-07-30
show_lastmod: 1
---


Khi báo cáo sự cố, việc cung cấp ID tài khoản Let's Encrypt của bạn có thể hữu ích. Hầu hết thời gian, quá trình tạo tài khoản được xử lý tự động bởi phần mềm ứng dụng khách ACME mà bạn sử dụng để nói chuyện với Let's Encrypt và bạn có thể có nhiều tài khoản được cấu hình nếu bạn chạy ứng dụng khách ACME trên nhiều máy chủ.

ID tài khoản của bạn là một URL có dạng `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Nếu bạn sử dụng Certbot, bạn có thể tìm ID tài khoản của bạn bằng cách xem “uri” tại `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Nếu bạn đang sử dụng ACME khách khác, các hướng dẫn là khác nhau đối với từng ứng dụng khách. Kiểm tra logs để tìm các URL của biểu mẫu được mô tả ở trên. Nếu ứng dụng khách ACME của bạn không lưu trữ ID tài khoản, bạn có thể lấy nó bằng cách gửi một yêu cầu đăng ký mới với cùng một khóa. Xem [đặc tả kỹ thuật của ACME để biết thêm chi tiết](https://tools.ietf.org/html/rfc8555#section-7.3). Bạn cũng có thể tìm thấy số biểu mẫu ID của bạn trong Boulder-Requester header trong phản hồi của mỗi POST mà ứng dụng khách ACME thực hiện.
