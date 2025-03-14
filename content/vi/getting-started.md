---
title: Bắt đầu
slug: getting-started
top_graphic: 3
date: 2023-08-24
---

Để bật HTTPS trên trang web của mình, bạn cần lấy chứng chỉ (một loại tệp) từ Tổ chức phát hành chứng chỉ (CA). Let's Encrypt là một CA. 
Để có được chứng chỉ cho tên miền trang web của bạn từ Let's Encrypt, bạn phải chứng minh quyền kiểm soát tên miền. 
Với Let's Encrypt, bạn thực hiện việc này bằng cách sử dụng phần mềm sử dụng [giao thức ACME](https://tools.ietf.org/html/rfc8555) 
thường chạy trên máy chủ web của bạn.

Để tìm ra phương pháp nào sẽ phù hợp nhất với bạn, bạn sẽ cần biết liệu bạn có quyền [truy cập shell](https://en.wikipedia.org/wiki/Shell_account) 
(còn được gọi là truy cập SSH) vào máy chủ web của mình hay không. Nếu bạn quản lý trang web của mình hoàn toàn thông qua bảng điều khiển như [cPanel]
(https://cpanel.net/), [Plesk](https://www.plesk.com/) hoặc [WordPress](https://wordpress.org/), rất có thể bạn không có quyền truy cập shell. 
Bạn có thể yêu cầu nhà cung cấp dịch vụ lưu trữ của mình chắc chắn

# Với quyền truy cập Shell

Chúng tôi khuyên hầu hết mọi người có quyền truy cập shell nên sử dụng ứng dụng khách [Certbot](https://certbot.eff.org/) ACME. 
Nó có thể tự động hóa việc cấp và cài đặt chứng chỉ mà không có thời gian chết. 
Nó cũng có các chế độ chuyên gia cho những người không muốn tự động cấu hình. 
Nó dễ sử dụng, hoạt động trên nhiều hệ điều hành và có tài liệu tuyệt vời. 
[Truy cập trang Certbot](https://certbot.eff.org/) để nhận hướng dẫn tùy chỉnh cho hệ điều hành và máy chủ web của bạn.

Nếu [Certbot](https://certbot.eff.org/) không đáp ứng nhu cầu của bạn hoặc bạn muốn thử một cái gì đó khác, có rất 
[nhiều ứng dụng khách ACME khác để lựa chọn](https://letsencrypt.org/vi/docs/client-options/). 
Khi bạn đã chọn phần mềm máy khách ACME, hãy xem tài liệu cho máy khách đó để tiếp tục.

Nếu bạn đang thử nghiệm với các máy khách ACME khác nhau, hãy sử dụng
[môi trường dàn dựng](https://letsencrypt.org/vi/docs/staging-environment/) 
của chúng tôi để tránh đạt đến [giới hạn tốc độ](https://letsencrypt.org/vi/docs/rate-limits/).

# Không có quyền truy cập Shell

Cách tốt nhất để sử dụng Let's Encrypt mà không cần truy cập shell là sử dụng hỗ trợ tích hợp từ nhà cung cấp dịch vụ lưu trữ của bạn. 
Nếu nhà cung cấp dịch vụ lưu trữ của bạn cung cấp hỗ trợ Let's Encrypt, họ có thể yêu cầu chứng chỉ miễn phí thay mặt bạn, 
cài đặt và tự động cập nhật. Đối với một số nhà cung cấp dịch vụ lưu trữ, đây là cài đặt cấu hình bạn cần bật. 
Các nhà cung cấp khác tự động yêu cầu và cài đặt chứng chỉ cho tất cả khách hàng của họ.

[Kiểm tra danh sách các nhà cung cấp dịch vụ lưu trữ của chúng tôi](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920)
để xem liệu nhà cung cấp của bạn có trên đó không. 
Nếu vậy, hãy làm theo tài liệu của họ để thiết lập chứng chỉ Let's Encrypt của bạn.

Nếu nhà cung cấp dịch vụ lưu trữ của bạn không hỗ trợ Let's Encrypt, 
bạn có thể liên hệ với họ để yêu cầu hỗ trợ. 
Chúng tôi cố gắng hết sức để giúp bạn dễ dàng thêm hỗ trợ Let's Encrypt và các nhà cung cấp thường sẵn lòng nghe đề xuất từ khách hàng!

Nếu nhà cung cấp dịch vụ lưu trữ của bạn không muốn tích hợp Let's Encrypt, nhưng hỗ trợ tải lên các chứng chỉ tùy chỉnh, 
bạn có thể cài đặt Certbot trên máy tính của riêng mình và sử dụng nó ở [chế độ thủ công](https://certbot.eff.org/docs/using.html#manual). 
Ở chế độ thủ công, bạn tải một tệp cụ thể lên trang web của mình để chứng minh quyền kiểm soát của mình. 
Sau đó, Certbot sẽ truy xuất chứng chỉ mà bạn có thể tải lên nhà cung cấp dịch vụ lưu trữ của mình. 
Chúng tôi không khuyên bạn nên sử dụng tùy chọn này vì nó tốn thời gian và bạn sẽ cần 
lặp lại nhiều lần mỗi năm khi chứng chỉ của bạn hết hạn. 
Đối với hầu hết mọi người, tốt hơn là yêu cầu hỗ trợ Let's Encrypt từ nhà cung cấp dịch vụ lưu trữ của bạn
hoặc chuyển đổi nhà cung cấp nếu họ không có kế hoạch triển khai.

# Tìm trợ giúp

Nếu bạn có câu hỏi về việc chọn ứng dụng khách ACME hoặc về việc sử dụng một ứng dụng khách cụ thể 
hoặc bất kỳ điều gì khác liên quan đến Let's Encrypt, 
vui lòng thử các [diễn đàn cộng đồng hữu ích của chúng tôi](https://community.letsencrypt.org/).


