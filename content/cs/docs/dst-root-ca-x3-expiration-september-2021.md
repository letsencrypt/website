---
title: Konec platnosti DST Root CA X3 (září 2021)
slug: dst-root-ca-x3-expiration-september-2021
lastmod: 2024-02-05
show_lastmod: 1
---

> **Aktualizace z 05. února 2024** Uplynuly dva roky a brzy skončí platnost níže popsaného křížového podpisu zajišťujícího kompatibilitu se systémem Android. V našem [nedávném příspěvku na blogu](https://letsencrypt.org/2023/07/10/cross-sign-expiration) najdete podrobné vysvětlení změn, které nastanou v průběhu roku 2024.

> **Aktualizace z 30. září 2021** Platnost křížového podpisu DST Root CA X3 podle plánu skončila a u téměř všech zařízení nyní důvěru zajišťuje náš vlastní certifikát ISRG Root X1. Podrobnosti o plánu najdete v následujícím textu. Aktualizovali jsme také vlákno Production Chain Changes na komunitním fóru. [Náš tým i komunita jsou připraveny pomoci](https://community.letsencrypt.org/t/production-chain-changes/150739/4) se všemi dotazy k tomuto konci platnosti.

Dne 30. září 2021 dojde k menší změně ve způsobu, jakým starší prohlížeče a zařízení důvěřují certifikátům Let's Encrypt. Provozujete-li běžný web, žádný rozdíl nezaznamenáte. Certifikát Let's Encrypt bude i nadále přijímat naprostá většina návštěvníků. Pokud poskytujete API nebo potřebujete podporovat zařízení IoT, budete muset změně věnovat trochu větší pozornost.

Let's Encrypt má „[kořenový certifikát][]“ s názvem [ISRG Root X1][]. Moderní prohlížeče a zařízení důvěřují certifikátu Let's Encrypt nainstalovanému na vašem webu, protože mají ISRG Root X1 ve svém seznamu kořenových certifikátů. Aby byly vydávané certifikáty důvěryhodné i na starších zařízeních, používáme také „křížový podpis“ staršího kořenového certifikátu DST Root CA X3.

Když jsme začínali, starší kořenový certifikát DST Root CA X3 nám umožnil rychle získat důvěru téměř všech zařízení. Novější kořenový certifikát ISRG Root X1 je nyní také široce důvěryhodný. Některá starší zařízení, například iPhone 4 nebo HTC Dream, mu však nikdy důvěřovat nebudou, protože již nedostávají aktualizace softwaru. [Kliknutím sem zobrazíte seznam platforem, které důvěřují certifikátu ISRG Root X1][compatibility].

Platnost DST Root CA X3 skončí 30. září 2021. Na starších zařízeních, která nedůvěřují ISRG Root X1, se proto při návštěvě webů používajících certifikáty Let's Encrypt začnou zobrazovat upozornění na certifikát. Existuje jedna důležitá výjimka: starší zařízení se systémem Android, která nedůvěřují ISRG Root X1, budou se službou Let's Encrypt fungovat i nadále [díky speciálnímu křížovému podpisu DST Root CA X3][cross-sign], jehož platnost přesahuje konec platnosti tohoto kořenového certifikátu. Tato výjimka funguje pouze v systému Android.

Co byste měli udělat? Většina uživatelů nemusí dělat vůbec nic. Vydávání certifikátů jsme nastavili tak, aby váš web ve většině případů automaticky používal správné řešení s důrazem na širokou kompatibilitu. Pokud poskytujete API nebo potřebujete podporovat zařízení IoT, musíte zajistit dvě věci: (1) všichni klienti API musí důvěřovat certifikátu ISRG Root X1, nikoli jen DST Root CA X3, a (2) používají-li klienti API knihovnu OpenSSL, [musí používat verzi 1.1.0 nebo novější][openssl]. Zvláštnost ověřování certifikátů v OpenSSL 1.0.x způsobí, že při předložení námi standardně doporučovaného řetězce certifikátů kompatibilního se systémem Android selžou i klienti důvěřující ISRG Root X1.

Další informace o probíhajících změnách produkčních řetězců najdete [v tomto vlákně na našem komunitním fóru][production].

Máte-li k nadcházejícímu konci platnosti jakékoli dotazy, [napište je do tohoto vlákna na našem fóru.][forum]

[kořenový certifikát]: /docs/glossary/#def-root
[ISRG Root X1]: /certificates/
[cross-sign]: /2020/12/21/extending-android-compatibility.html
[openssl]: https://community.letsencrypt.org/t/openssl-client-compatibility-changes-for-let-s-encrypt-certificates/143816
[forum]: https://community.letsencrypt.org/t/help-thread-for-dst-root-ca-x3-expiration-september-2021/149190
[compatibility]: /docs/cert-compat/
[production]: https://community.letsencrypt.org/t/production-chain-changes/150739
