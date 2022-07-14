---
title: Сертифікаційна сумісність
slug: certificate-compatibility
top_graphic: 1
lastmod: 2021-05-12
show_lastmod: 1
---


Основним фактором визначення того чи платформа може перевірити сертифікати Let's Encrypt є те, чи платформа довіряє сертифікаціїї ISRG Root X1 сертифікату. Деякі платформи можуть перевіряти наші сертифікати навіть якщо вони не включають сертифікат ISRG Root X1, бо вони довіряють сертифікації DST Root CA X3. Після вересня 2021, тільки платформи,які довіряють ISRG Root X1 продовжать перевіряти сертифікати Let's Encrypt ([ за винятком Android](/2020/12/21/extending-android-compatibility.html)).

Якщо Ваш сертифікат підтвердиться на деяких з "Сумісних" платформ, але не на інших, то проблема може бути в неправильній конфігурації веб-сервера. Якщо у вас виникли проблеми з новітніми платформами, найбільш поширеною причиною є помилка при здачі правильного ланцюжка сертифікату. Перевірте свій сайт з допомогою [SSL Lab's Server Test](https://www.ssllabs.com/ssltest/). Якщо це не розпізнає проблему, зверніться по допомогу до нашої
Форум-спільноти.



# Платформи, які довіряють ISRG Root X1

* Windows>= XP SP3 ([ припускаючи, що автоматичне оновлення сертифікату є вимкнено вручну](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/))
* [macOS >= 10.12.1](https://twitter.com/letsencrypt/status/790960929504497665?lang=en)
* [iOS>= 10](https://support.apple.com/en-us/HT207177) ([iOS 9 не містить в собі](https://support.apple.com/en-us/HT205205))
* [ iPhone 5 і вище можуть оновитись до iOS 10](https://en.wikipedia.org/wiki/IPhone_5) і таким чином можуть довіряти ISRG Root X1
* [ Android >>= 7.1.1](https://android.googlesource.com/platform/system/ca-certificates/+/android-7.1.1_r15) ( але Android>>= 2.3.6 буде працювати за замовчуванням [ через наш спеціальний крос-знак](https://letsencrypt.org/2020/12/21/extending-android-compatibility.html))
* [Mozilla Firefox >= 50.0](https://bugzilla.mozilla.org/show_bug.cgi?id=1204656)
* [Ubuntu >= xenial / 16.04](https://packages.ubuntu.com/xenial/all/ca-certificates/filelist)( зі застосованими оновленнями)
* [Debian >= jessie / 8](https://packages.debian.org/jessie/all/ca-certificates/filelist) (із застосованими оновленнями)
* [Java 8 >= 8u141](https://www.oracle.com/java/technologies/javase/8u141-relnotes.html)
* [Java 7 >= 7u151](https://www.oracle.com/java/technologies/javase/7u151-relnotes.html)
* [NSS >= 3.26](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/NSS_3.26_release_notes)

Браузери (Chrome, Safari, Edge, Opera), як правило, довіряють тим ж сертифікатам, що і операційна система, на якій вони працюють. Firefox є винятком: в ньому є власний кореневий магазин. Зовсім скоро, нова версія Chrome [ буде також мати свій власний кореневий магазин](https://www.chromium.org/Home/chromium-security/root-ca-policy).



# Платформи, які довіряють DST Root ЦС X3

* Windows >= XP SP3
* macOS (більшість версій)
* iOS (більшість версій)
* [Android >= v2.3.6](https://twitter.com/Tutancagamon/status/600783165087752192)
* Mozilla Firefox >= v2.0
* Ubuntu >= точніше / 12.04
* [Debian >= стисло / 6](https://twitter.com/TokenScandi/status/600806080684359680)
* Java 8 >= 8u101
* Java 7 >= 7u111
* NSS >= v3.11.9
* Amazon FireOS (Шліц - браузер)
* Cyanogen > v10
* Jolla Sailfish OS > v1.1.2.16
* Види > v3.4.1
* Blackberry >= 10.3.3
* PS4 гральна консоль з прошивкою >=5.00

Можливо Ви захочете відвідати [ цей форум для обговорень 2015-2017](https://community.letsencrypt.org/t/which-browsers-and-operating-systems-support-lets-encrypt/), щоб дізнатись більше інформації про сумісність.



# Відомі несумісності

* Blackberry < v10.3.3
* Android < v2.3.6
* Nintendo 3DS
* Windows XP до SP3 
    * не можна обробляти сертифікати SHA-2
* Java 7 < 7u111
* Java 8 < 8u101
* Windows Live Mail (клієнт електронної пошти 2012 року, а не веб-пошта) 
    * не можна обробляти сертифікати без CRL
* PS3 гральна консоль
* PS4 гральна консоль з прошивкою < 5.00



# ISRG Root X2 (новий корінь ECDSA) - незабаром

Ми представили ISRG Root X2 на Microsoft, apple, Google, Mozilla та Oracle кореневих програм для включення. ISRG Root X2 вже забезпечує довіру завдяки крос-знаку від нашого ISRG Root X1. Щоб отримати додаткову інформацію, перейдіть на наше[ повідомлення на форумі](https://community.letsencrypt.org/t/isrg-root-x2-submitted-to-root-programs/149385)


