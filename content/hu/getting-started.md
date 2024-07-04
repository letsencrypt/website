---
title: Kezdő lépések
slug: getting-started
date: 2020-02-11
---

A HTTPS engedélyezéséhez a webhelyen tanúsítványra van szükség (egyfajta fájl) egy tanúsító hatóságtól (CA). A Let's Encrypt egy tanúsító hatóság. Annak érdekében, hogy tanúsítványt kaphass a Let's Encrypt-től a weboldalad domainjéhez, bizonyítanod kell a domain felett való rendelkezésed. A Let's Encrypt-tel ezt egy olyan szoftverrel teheti meg, amely [ACME protokollt](https://tools.ietf.org/html/rfc8555) használ, mely jellemzően a a webtárhelyen fut.

Ahhoz, hogy rájöjjön, melyik módszer lesz a legmegfelelőbb az Ön számára, tudnia kell, hogy rendelkezik-e [shell hozzáféréssel](https://en.wikipedia.org/wiki/Shell_account) (más néven SSH hozzáférés) a webtárhelyéhez. Ha weboldalát teljes egészében egy vezérlőpanelen kezeli, mint például a [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/), vagy a [WordPress](https://wordpress.org/), akkor jó eséllyel nem rendelkezik shell hozzáféréssel. Hogy biztos lehessen benne, megkérdezheti a tárhelyszolgáltatóját.

# Shell hozzáféréssel

A legtöbb shell hozzáféréssel rendelkező ember számára azt javasoljuk, hogy használja a [Certbot](https://certbot.eff.org/ "Certbot") ACME klienst. Automatizálhatja a tanúsítványok kiállítását és telepítését állásidő nélkül. Rendelkezik expert üzemmóddal is azok számára, akik nem akarnak automatikus konfigurációt. Könnyű használni, számos operációs rendszeren működik, és nagyszerű dokumentációval rendelkezik. [Látogasson el a Certbot weboldalára](https://certbot.eff.org/ "Certbot"), az operációs rendszerére és webkiszolgálójára szabott instrukciókért.

Ha a [Certbot](https://certbot.eff.org/ "Certbot") nem felel meg az Ön igényeinek, vagy valami mást szeretne kipróbálni, akkor [sok más ACME-kliens közül is választhat](/docs/client-options).  Miután kiválasztotta az ACME-klienst, a folytatáshoz tekintse meg az adott kliens dokumentációját.

Ha különböző ACME-kliensekkel kísérletezik, használja a [staging környezetet](/docs/staging-environment), hogy elkerülje a [korlátozásokat](/docs/rate-limits).

# Shell hozzáférés nélkül

Shell hozzáférés nélkül a Let's Encryptet a saját tárhelyszolgáltatója által biztosított támogatással a legjobb használni. Ha tárhelyszolgáltatója kínál Let's Encrypt támogatást, akkor az Ön nevében kérhet egy ingyenes tanúsítványt, telepítheti, és automatikusan naprakészen tarthatja azt. Néhány tárhelyszolgáltató esetében ez egy konfigurációs beállítás, amelyet Önnek kell bekapcsolnia. Más szolgáltatók automatikusan igénylik és telepítik az ügyfeleik számára a tanúsítványokat.

[Tekintse meg tárhelyszolgáltatóink listáját](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) hogy megnézze, az Öné szerepel-e rajta. Ha igen, kövesse a dokumentációjukat, hogy beállítsa a Let's Encrypt tanúsítványát.

Ha a tárhelyszolgáltatója nem támogatja a Let's Encryptet, akkor kapcsolatba léphet velük, hogy jelezze támogatási igényét. Mindent megteszünk azért, hogy nagyon egyszerűvé tegyük a Let's Encrypt támogatás hozzáadását, és a szolgáltatók gyakran örömmel fogadják az ügyfelek javaslatait!

Ha a tárhelyszolgáltatója nem akarja integrálni a Let's Encryptet, de támogatja az egyéni tanúsítványok feltöltését, akkor telepítheti a Certbotot a saját számítógépére, melyet [manuális módban](https://certbot.eff.org/docs/using.html#manual) használhat. Manuális üzemmódban egy bizonyos fájlt tölt fel a weboldalára, hogy ezzel bizonyítsa a weboldala feletti rendelkezését. Ezután a Certbot lekér egy tanúsítványt, amelyet feltölthet a tárhelyszolgáltatójához. Nem ajánljuk ezt a lehetőséget, mert időigényes és évente többször is meg kell ismételnie, amikor a tanúsítványa lejár. A legtöbb ember számára jobb megoldás, ha a saját tárhelyszolgáltatójától kéri a Let's Encrypt támogatását, vagy szolgáltatót vált, ha az nem tervezi a bevezetését.

# Segítség kérése

Ha kérdése van az ACME kliens kiválasztásával, vagy egy adott kliens használatával kapcsolatban, vagy a Let's Encryptet illetően bármi mással kapcsolatban, kérjük, próbálja ki [segítőkész közösségi fórumainkat](https://community.letsencrypt.org/).
