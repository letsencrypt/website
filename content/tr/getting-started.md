---
title: Başlangıç
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt, sertifikaları [ACME protokolü](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment) bazlı otomatikleştirilmiş bir API aracılığıyla dağıtmaktadır.

Let's Encrypt API ile etkileşime girmek için ve sertifika almak için, "ACME client (istemcisi)" denilen bir parça yazılım gerekmektedir. Yalnızca bilgilendirme amaçlı olan bu websitede, sertifika alma işleminin hiçbir kısmı gerçekleşmez.

Let's Encrypt kullanmaya başlamak isteyen insanlar için cevap verilmesi gereken ilk soru şudur: yer sağlayıcım sertifikaları benim için Let's Encrypt'den getirip yönetecek mi, yoksa kendim bir ACME istemcisi çalıştırmam mı gerekiyor?

# Yer sağlayıcınız yoluyla sertifika almak

Çoğu kişi için, [barındırma sağlayıcıları Let's Encrypt'ten sertifikaları alıp yönetir](https://certbot.eff.org/hosting_providers). Eğer durumunuz buysa, sağlayıcınız bir ACME istemcisi çalıştırıyor demektir ve kendi başınıza bir ACME istemcisi yazılımı elde edip çalıştırmayı düşünmeniz gerekmemektedir.

Eğer sağlayıcınız sertifikaları sizin için getirip yönetiyorsa, ya otomatik olarak gerçekleşecektir ya da etkinleştirmeniz gereken bir yapılandırma seçeneği olacaktır. Sağlayıcınızın dokümentasyonunu ve yapılandırma seçeneklerini kontrol edin.

# Kendi başınıza bir ACME istemcisi seçmek ve çalıştırmak

Eğer yer sağlayıcınız sizin için sertifikaları getirip yönetmeyi halletmiyorsa, ve sunucunuzda yeterli izinlerle komut çalıştırma kabiliyetine sahipseniz, Let's Encrypt'den sertifika almak için bir ACME istemcisi seçip kendiniz çalıştırabilirsiniz.

Çoğu kişi için [Certbot ACME istemcisini](https://certbot.eff.org/) tavsiye ederiz. Certbot websitesi Certbot'u kullanmak için harika dokümentasyon ve talimatlara sahiptir.

Bir nedenden dolayı Certbot ihtiyaçlarınızı karşılamıyorsa, [ACME istemcisi yazılımı](/docs/client-options/) için daha birçok seçenek mevcut.

Eğer istemciniz Let's Encrypt ACME API uç noktasıyla yapılandırılması gerekiyorsa, şudur:

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

İlk önce [sahneleme API'ına](/docs/staging-environment/) karşı test yapmayı öneriririz.

# Yardım Almak

ACME istemcisi seçmek yahut belli bir istemci kullanmak hakkında, ya da Let's Encrypt ile alakalı başka herhangi bir şey hakkında sorularınız varsa lütfen [faydalı topluluk forumlarımızı](https://community.letsencrypt.org/) deneyin.

Eğer daha fazla detaya ihtiyacınız varsa, websitemiz ayrıca [kapsamlı dokümentasyona](/docs/) sahip.
