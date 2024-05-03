---
title: Phương Pháp Hay Nhất - Giữ Cổng 80 Mở
slug: allow-port-80
date: 2019-01-24
lastmod: 2019-01-24
show_lastmod: 1
---


Đôi khi chúng tôi nhận được báo cáo từ những người gặp sự cố khi sử dụng HTTP-01 vì họ đã chặn cổng 80 tới máy chủ web của họ. Khuyến nghị của chúng tôi là tất cả các máy chủ dành cho mục đích sử dụng web chung phải cung cấp cả HTTP trên cổng 80 và HTTPS trên cổng 443. Họ cũng phải gửi yêu cầu chuyển hướng cho tất cả các yêu cầu tới cổng 80 và có thể là một tiêu đề HSTS (trên các yêu cầu tới cổng 443).

Việc cho phép cổng 80 không tạo ra tấn công bề mặt trên máy chủ của bạn, vì các yêu cầu trên cổng 80 thường được phục vụ bởi cùng một phần mềm chạy trên cổng 443.

Đóng cổng 80 không làm giảm rủi ro cho người vô tình truy cập trang web của bạn qua HTTP. Trong trường hợp bình thường, người đó sẽ nhận được yêu cầu chuyển hướng đến HTTPS và lưu lượng truy cập tiếp theo của họ sẽ được bảo vệ. Nếu người đó gặp phải một cuộc tấn công xen giữa, Tấn công xen giữa sẽ trả lời ở cổng 80, do đó trang web của bạn không bao giờ có cơ hội trả lời là "kết nối bị từ chối."

Cuối cùng, giữ cho cổng 80 được mở để phục vụ điều hướng giúp mọi người tới đúng phiên bản của trang web (phiên bản HTTPS). Có nhiều tình huống ngoài tầm kiểm soát của bạn có thể khiến ai đó truy cập phiên bản HTTP của trang web - ví dụ: liên kết tự động trong email hoặc nhập tên miền theo cách thủ công. Tốt hơn là họ nhận được một sự chuyển hướng hơn là một lỗi.

Rất tiếc, bạn có thể không kiểm soát được việc cổng 80 có bị chặn đối với trang web của mình hay không. Một số ISP (chủ yếu là dân cư) chặn cổng 80 vì nhiều lý do khác nhau. Nếu ISP của bạn thực hiện điều này nhưng bạn vẫn muốn nhận chứng chỉ từ Let's Encrypt, bạn có hai lựa chọn: Bạn có thể sử dụng DNS-01 hoặc bạn có thể sử dụng [ một trong những ứng dụng hỗ trợ TLS-ALPN-01](https://community.letsencrypt.org/t / which-client-support-tls-alpn-challenge / 75859/2) (trên cổng 443).
