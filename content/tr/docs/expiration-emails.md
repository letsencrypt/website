---
title: Süre Dolum Epostaları
slug: expiration-emails
date: 2016-07-02
lastmod: 2023-01-09
show_lastmod: 1
---


# Abone Olmak

Eğer hesabınızı oluştururken Let's Encrypt'e eposta adresi sağlarsanız, sertifikanızın yenilenme zamanı geldiğinde size otomatik olarak süre dolum bildirimleri göndermek için elimizden geleni yapacağız. İlk bildirimi sertifikanızın süresi dolmadan 20 gün önce, ve son bildirimi 7 gün önce göndermeye çalışıyoruz. Sertifikalarınızı otomatik olarak yenilemesi için ACME istemcinizi kullanmanızı ve bu uyarıları sadece otomasyonunuzu kontrol etmek için kullanmanızı öneriririz.

# Süre Dolum Epostası Aldığınızda

Eğer sertifikanız çoktan yenilenmiş ise, süre dolum bildirimi göndermeyiz. Eğer aynı isim dizisiyle yeni bir sertifika varsa, hangi hesabın oluşturmuş olduğuna bakmaksızın, o sertifikayı yenilenmiş kabul ederiz. Eğer eski sertifikanızla alakalı olan bir ismi ekleyen ya da çıkaran yeni bir sertifika çıkardıysanız, eski sertifikanız hakkında bir süre dolum epostası alacaksınız. Eğer websitenizde anlık olarak çalışan sertifikayı kontrol ederseniz, ve doğru tarihi gösteriyorsa, başka eylem gerekli değildir. Alan adınız için çıkarılmış olan sertifikaların geçmişini görmek için, alan adınızı [crt.sh](https://crt.sh/) gibi sertifika şeffaflık günlüğü izleyicilerinde aratabilirsiniz.

# Abonelikten Çıkmak

Eposta içeriğinde gelecek bildirimlerin aboneliğinden çıkmak için bir bağlantı mevcut. Eğer o bağlantıya basarsanız, gelecek yıl için hiç süre dolum bildirimi almazsınız. "Kimin abonelikten çıktığı" listesi Sahneleme (staging) ve Üretim (production) bildirimlerinden bağımsız, yani Üretim durumunuzu etkilemeden gönlünüzce Sahneleme aboneliğinden çıkabilirsiniz.

Abonelikten çıkışınızın yalnızca bir yıl için geçerli olduğunu, yani her yıl yenilemenizin gerektiğini akılda bulundurun.

Eğer abonelikten çıkarsanız henüz sizi tekrar verimli bir şekilde aboneliğe katmamızın bir yolu yok. Eposta sağlayıcımız, Mandrill, [ hala otomatikleştirmemiz gereken manuel bir mekanizmaya sahip](https://mandrill.zendesk.com/hc/en-us/articles/360039299913).

Ancak, hesabınızın eposta adresini değiştirebilirsiniz, ki bu sonuç olarak sizi yeniden aboneliğe katar. Birçok yaygın eposta hizmeti `isminiz+1@ornek.com` adresini ` isminiz@ornek.com` adresiyle aynı kabul eder. Yani eposta adresinizi `isminiz+1@ornek.com` olarak güncellerseniz tekrar süre dolum postası almaya başlayabilirsiniz. Certbot ile şunu kullanın:

`certbot update_account --email yourname+1@example.com`
