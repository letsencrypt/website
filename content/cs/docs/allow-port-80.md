---
title: 'Doporučený postup: port 80 ponechte otevřený'
slug: allow-port-80
lastmod: 2019-01-24
show_lastmod: 1
---


Občas dostáváme hlášení od uživatelů, kterým nefunguje výzva HTTP-01, protože přístup k portu 80 jejich webového serveru blokuje firewall. Doporučujeme, aby všechny servery určené k běžnému provozu webů nabízely HTTP na portu 80 i HTTPS na portu 443. Všechny požadavky na portu 80 by také měly přesměrovávat a požadavky (na portu 443) mohou případně opatřit hlavičkou HSTS.

Povolením portu 80 nezvětšíte útočnou plochu serveru, protože požadavky na portu 80 zpravidla obsluhuje stejný software jako požadavky na portu 443.

Uzavření portu 80 nesnižuje riziko pro uživatele, který váš web omylem navštíví přes HTTP. Za běžných okolností by byl přesměrován na HTTPS a jeho další provoz by byl chráněný. Pokud by byl uživatel vystaven aktivnímu útoku MITM, útočník by odpověděl na portu 80, takže váš web by ani nedostal příležitost spojení odmítnout.

Ponecháte-li port 80 otevřený kvůli přesměrování, pomůžete uživatelům přejít na správnou, tedy HTTPS verzi webu. Uživatel se může krátce ocitnout na HTTP verzi webu z různých důvodů, které nemůžete ovlivnit. Může jít například o automatické vytvoření odkazu v e-mailu nebo ruční zadání názvu domény. Je lepší, když bude přesměrován, než aby se mu zobrazila chyba.

Bohužel nemusíte mít možnost ovlivnit, zda je port 80 pro váš web blokovaný. Někteří poskytovatelé internetového připojení (zejména pro domácnosti) port 80 z různých důvodů blokují. Pokud to dělá i váš poskytovatel, ale přesto chcete získávat certifikáty od Let's Encrypt, máte dvě možnosti: můžete používat výzvy DNS-01 nebo [některého z klientů podporujících výzvy TLS-ALPN-01](https://community.letsencrypt.org/t/which-client-support-tls-alpn-challenge/75859/2) na portu 443.
