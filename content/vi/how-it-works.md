---
title: Cách Hoạt Động
linkTitle: 1
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


Mục tiêu của Let's Encrypt và [ giao thức ACME ](https://tools.ietf.org/html/rfc8555) là giúp bạn có thể thiết lập một máy chủ HTTPS và để nó tự động lấy chứng chỉ được trình duyệt tin cậy mà không có bất kỳ sự can thiệp nào của con người.  Điều này được thực hiện bằng cách chạy một agent quản lý chứng chỉ trên máy chủ web.

Để hiểu cách hoạt động của công nghệ này, hãy xem qua quá trình thiết lập `https://example.com/` với một agent quản lý chứng chỉ hỗ trợ Let's Encrypt.

Có hai bước cho quá trình này.  Đầu tiên, agent chứng minh với CA rằng máy chủ web kiểm soát một domain.  Sau đó, agent có thể yêu cầu, gia hạn và thu hồi chứng chỉ cho domain đó.

## Xác Thực Tên Miền

Let's Encrypt xác định quản trị viên máy chủ bằng khóa công khai.  Đầu tiên phần mềm agent tương tác với Let's Encrypt, nó sẽ tạo ra một cặp khóa mới và chứng minh cho Let's Encrypt CA rằng máy chủ kiểm soát một hoặc nhiều domain.  Điều này tương tự như quy trình CA truyền thống là tạo một tài khoản và thêm các domains vào tài khoản đó.

Để bắt đầu quá trình, agent hỏi Let's Encrypt CA những gì nó cần làm để chứng minh rằng nó kiểm soát `example.com`.  Let's Encrypt CA sẽ xem xét tên miền được yêu cầu và đưa ra một hoặc nhiều bộ thử thách.   Đây là những cách khác nhau mà agent có thể chứng minh quyền kiểm soát domain.  Ví dụ, CA có thể cho agent một trong hai lựa chọn:

* Cung cấp một bản ghi DNS trong `example.com` hoặc
* Cung cấp một tài nguyên HTTP dưới một URI nổi tiếng trên `http://example.com/`

Cùng với những thách thức, Let's Encrypt CA cũng đưa ra quy định bắt buộc rằng agent phải ký bằng cặp khóa riêng của mình để chứng minh rằng họ kiểm soát cặp khóa.

<div class="howitworks-figure">
<img alt="Yêu cầu thử thách để xác thực example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Phần mềm agent hoàn thành một trong những bộ thử thách được cung cấp.   Giả sử nó có thể hoàn thành nhiệm vụ thứ hai ở trên: nó tạo một tệp với một đường dẫn cụ thể trên trang web `http://example.com`.  Agent cũng ký nonce được cung cấp bằng khóa riêng của nó.  Khi agent đã hoàn thành các bước này, nó sẽ thông báo cho CA rằng nó đã sẵn sàng để hoàn tất việc xác thực.

Sau đó, nhiệm vụ của CA là kiểm tra xem các thử thách đã được thỏa mãn chưa.  CA xác minh chữ ký trên nonce và nó cố gắng tải xuống tệp từ máy chủ web và đảm bảo rằng nó có nội dung như mong đợi.

<div class="howitworks-figure">
<img alt="Yêu cầu ủy quyền để hành động cho example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Nếu chữ ký over the nonce là hợp lệ và các thử thách được kiểm tra, thì agent được xác định bằng khóa công khai được ủy quyền thực hiện quản lý chứng chỉ cho `example.com`.  Chúng tôi gọi cặp khóa mà agent đã sử dụng là "cặp khóa được ủy quyền" cho `example.com`.


## Cấp và Thu hồi Chứng chỉ

Khi agent có cặp khóa được ủy quyền, việc yêu cầu, gia hạn và thu hồi chứng chỉ rất đơn giản---chỉ cần gửi thông báo quản lý chứng chỉ và ký chúng bằng cặp khóa được ủy quyền.

Để nhận chứng chỉ cho domain, agent tạo một [yêu cầu ký chứng chỉ](https://tools.ietf.org/html/rfc2986) PKCS#10 yêu cầu Let's Encrypt CA cấp chứng chỉ cho `example.com` với một khóa công khai được chỉ định.  Như thường lệ, CSR bao gồm chữ ký bằng khóa riêng tương ứng với khóa công khai trong CSR.  Agent cũng ký toàn bộ CSR bằng khóa được ủy quyền cho `example.com` để Let's Encrypt CA biết nó được ủy quyền.

Khi Let's Encrypt CA nhận được yêu cầu, nó sẽ xác minh cả hai chữ ký.  Nếu mọi thứ đều ổn, nó sẽ cấp chứng chỉ cho `example.com` với khóa công khai từ CSR và trả lại cho đại lý.

<div class="howitworks-figure">
<img alt="Yêu cầu một chứng nhận cho example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Thu hồi hoạt động theo cách tương tự.  Agent ký yêu cầu thu hồi bằng cặp khóa được ủy quyền cho `example.com` và Let's Encrypt CA xác minh rằng yêu cầu được ủy quyền.  Nếu vậy, nó xuất bản thông tin thu hồi vào các kênh thu hồi thông thường (tức là OCSP), để các bên phụ thuộc như trình duyệt có thể biết rằng họ không nên chấp nhận chứng chỉ đã thu hồi.

<div class="howitworks-figure">
<img alt="Yêu cầu thu hồi một chứng nhận cho example.com"
     src="/images/howitworks_revocation.png"/>
</div>



