---
title: "Let's Encrypt tanúsítványok GoDaddy tárhelyen"
slug: godaddy
top_graphic: 1
date: 2019-12-02
lastmod: 2019-12-02
show_lastmod: 1
---


Rengeteg kérdést kapunk arról, hogyan használjuk a Let's Encryptet a GoDaddy-n. Ha GoDaddy megosztott webtárhelyet használ, akkor arra jelenleg nagyon nehéz Let's Encrypt tanúsítványt telepíteni, ezért jelenleg nem javasoljuk a tanúsítványaink használatát a GoDaddyvel. Ez azért van, mert a GoDaddy nem támogatja az [ACME protokollt](https://tools.ietf.org/html/rfc8555) az automatikus tanúsítvány kiállításhoz és megújításhoz. Ehelyett a GoDaddy automatikus megújítást kínál saját tanúsítványaira, mely [ funkciók többletköltséget](https://www.godaddy.com/web-security/ssl-certificate) jelentenek.

Nem javasoljuk a Let's Encrypt tanúsítványok használatát olyan tárhelyszolgáltatóknál, amelyek nem implementálják közvetlenül az ACME protokollt, mivel ez azt jelenti, hogy nem tudja teljes mértékben automatizálni a megújításokat. Úgy gondoljuk, hogy az automatikus megújítás nagyon fontos része a tanúsítványok használatának. A megújítást automatizáló szoftver használatával sokkal kisebb a valószínűsége annak, hogy a tanúsítvány lejár, anélkül, hogy le lenne cserélve. Ha a tanúsítványa lejár, az nagyon frusztráló lehet a felhasználói számára, mert nem tudják elérni a weboldalát.

Mivel annyira hiszünk az automatikus megújításban, tanúsítványainkat úgy tervezzük, hogy azok használhatók legyenek ACME automatizációval. A Let's Encrypt tanúsítványt 60 nap után automatikusan meg kell újítani, és 90 nap után megszűnik működni, ha nem újítják meg.

Ha a fenti problémák áttekintése után úgy döntött, hogy szeretné megpróbálni a Let's Encrypt tanúsítvány fenntartását a GoDaddy megosztott tárhelyén, akkor arról a GoDaddy [nyújt útmutatást](https://www.godaddy.com/help/install-a-lets-encrypt-certificate-on-your-cpanel-hosting-account-28023). Ne feledje, hogy ezeknek az utasításoknak a követése időigényes, és ezt 60 naponta kell elvégeznie (nem 90 naponta, ahogy a hivatkozott oldalon le van írva).
