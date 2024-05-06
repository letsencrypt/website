---
title: Boshlash
slug: getting-started
date: 2020-02-11
---

Saytinggizda HTTPSni yoqish uchun, Sertifikat Markazi(CA) dan sertifikat (fayl turi) olishinggiz lozim bo‘ladi. Let's Encrypt CA hisoblanadi. Saytinggiz uchun Let's Encryptdan sertifikat olish uchun, siz shu domen boshqaruvi sizda ekanligini isbotlashinggiz kerak. Let's Encrypt yordamida, siz buni [ACME protokol](https://tools.ietf.org/html/rfc8555)idan foydalanuvchi web hostda ishlaydigan ilova yordamida qilishinggiz mumkin.

Qaysi usul sizga mosligini bilish uchun, sizga web hostinggizga [shell access](https://en.wikipedia.org/wiki/Shell_account) (ya'ni SSH ruxsati) bor yoki yo‘qligini bilish kerak. Agar web saytinggizni to‘liq boshqaruv paneli kabi [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), yoki [WordPress](https://wordpress.org/), orqali boshqarsanggiz, sizda shell ruxsati yo‘q bo‘lish ehtimoli yuqori. Siz buni hosting provayderdan aniqlashtirishinggiz mumkin.

# Shell Ruxsati Yordamida

Shell ruxsatga ega insonlarga maxsus [Certbot](https://certbot.eff.org/ "Certbot") ACME klientidan foydalanishni tavsiya qilamiz. Bu sertifikatni chiqarish va o‘rnatishni avtomatlashtira oladi. Unda avtomatik sozlashni xohlamaydiganlar uchun maxsus, ekspert rejimi ham mavjud. U ishlatish uchun qulay, turli operatsion tizimlarda ishlaydi va yaxshi qo‘llanmaga ega. Sizning operatsion tiziminggiz va web serveringgiz uchun yo‘riqnomani olish uchun [Certbot saytiga kiring](https://certbot.eff.org/ "Certbot").

Agar [Certbot](https://certbot.eff.org/ "Certbot") sizning ehtiyojinggizni qondirmasa, yoki boshqasini sinab ko‘rmoqchi bo‘lsanggiz, boshqa [ACME klientlari ham mavjud](/docs/client-options).  ACME klientni tanlaganinggizdan so‘ng, o‘sha klientga oid qo‘llanmalardan foydalaning.

Agar turli ACME klientlarni sinab ko‘rayotgan bo‘lsanggiz, [tezlik cheklovlari](/docs/rate-limits)dan oshib ketmaslik uchun, bizning [sahnalashtiruvchi muhitimiz](/docs/staging-environment)ga kiring.

# Shell Ruxsatisiz

Let's Encryptdan shell ruxsatiga ega bo‘lmagan taqdirda, bu xizmatni hosting provayderidan olishinggiz o‘rinli. Agar hosting provayderinggiz Let's Encryptni taqdim qilsa, ular sizning nominggizdan avtomatik ravishda bepul sertifikat so‘rovini amalga oshirishlari, o‘rnatishlari va yangilab turishlari mumkin. Ba'zi hosting provayderlari uchun bu sozlamalardan tanlanuvchi xususiyat xolos. Boshqa provayderlar o‘z mijozlari uchun avtomatik so‘rov va sertifikatni o‘rnatishlari mumkin.

[Bizning hosting provayderlar ro‘yxatimiz bilan tanishing](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920). Agar sizning provayderinggiz ro‘yxatda bo‘lsa, Let's Encrypt sertifikatini o‘rnatish uchun ularning qo‘llanmasidan foydalaning.

Agar siz hosting provayderinggiz Let's Encryptni qo‘llab-quvvatlamasa, siz ularga qo‘llab-quvvatlash masalasida murojaat qilishinggiz mumkin. Biz Let's Encryptni qo‘llab-quvvatlanishi uchun qo‘limizdan kelgan barcha ishni qilamiz, va provayderlar o‘z mijozlaridan taklif qabul qilishlari zavqli!

Agar hosting provayderinggiz Let's Encryptni integratsiya qilinishiga rozi bo‘lmasa, lekin alohida sertifikatlarni yuklashni qo‘llab-quvvatlasa, siz Certbotni o‘z kompyuteringgizga o‘rnatishinggiz va foydalanishinggiz mumkin. [qo‘l rejimida](https://certbot.eff.org/docs/using.html#manual). Qo‘l rejimida, siz boshqaruv sizda ekanligini isbotlash uchun siz ma'lum bir faylni web saytinggizga yuklaysiz. Certbot siz hosting provayderinggiz uchun joylasa bo‘ladigan sertifikat tayyorlab beradi. Biz bunday usulni maslahat bermaymiz chunki u ko‘p vaqt talab etadi va yil davomida muddati kelganida bir necha marta bu jarayonni takrorlashinggizga to‘g‘ri keladi. Ko‘p hollarda, Let's Encrypt qo‘llab-quvvatlanishini hosting provayderdan so‘rash o‘rinli, yoki agar uni qo‘llab-quvvatlanishi rejalashtirilmayotgan bo‘lsa, provayderni almashtirish joiz.

# Yordam olish

Agar ACME klientni tanlash bo‘yicha yoki ma'lum bir klient bo‘yicha savollaringgiz bo‘lsa, yoki Let's Encryptga bog‘liq istalgan savol bo‘lsa, iltimoz bizning [foydali jamoatchilik forumi](https://community.letsencrypt.org/)dan foydalaning.
