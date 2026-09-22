---
title: Podpora IPv6
slug: ipv6-support
lastmod: 2026-08-04
show_lastmod: 1
---


Let's Encrypt podporuje IPv6 jak při přístupu klienta ACME k rozhraní API protokolu ACME, tak při vyhledávání v DNS a odesílání požadavků HTTP, kterými ověřujeme vaši kontrolu nad doménovými názvy.

## Ověřování domén

Při odchozím požadavku na ověření domény, která má adresu IPv4 i IPv6 (například záznam `A` i `AAAA`), se Let's Encrypt při prvním pokusu vždy připojuje přes IPv6. Pokud připojení přes IPv6 selže na úrovni sítě (například vyprší časový limit) a jsou k dispozici adresy IPv4, požadavek zopakujeme přes jednu z adres IPv4.

## Nesprávné adresy IPv6

Vlastníci domén často nevědí, že pro jejich doménu existuje záznam `AAAA`. Nesprávná adresa IPv6 v záznamu `AAAA` ovlivní proces ověření domény.

Adresa IPv6 často vede na jiný server než adresa IPv4, na které běží klient ACME. Klient ACME nastaví odpověď na výzvu pouze na serveru IPv4, takže při použití serveru IPv6 ověření domény selže.

Správným řešením je ve většině případů změnit adresu IPv6 tak, aby vedla na server s klientem ACME. Pokud doména nemá fungovat přes IPv6, záznam `AAAA` odstraňte. Let's Encrypt nelze požádat, aby upřednostňoval IPv4. Chybné nastavení musíte opravit.

## Podrobnosti o přechodu z IPv6 na IPv4

Po neúspěchu přes IPv6 se požadavek zopakuje přes IPv4 pouze tehdy, když vyprší časový limit připojení. U jiných typů chyb se neopakuje.

Například ve výše popsané situaci se požadavek nezopakuje, pokud na adrese IPv6 naslouchá webový server, který však není připraven odpovědět na výzvu ACME. Při přístupu na adresu IPv6 v takovém případě nevyprší časový limit připojení. Výzva selže bez opakování požadavku, protože server vrátil nesprávnou odpověď.

Aby software naší certifikační autority zůstal jednoduchý, opakujeme z IPv6 přes IPv4 pouze první požadavek při ověřování výzvy „http-01“. Na požadavky následující po přesměrování se tento postup nevztahuje.

Pokud má například doménový název záznam `AAAA`, u kterého vždy vyprší časový limit, a záznam `A` vedoucí na webový server, který přesměrovává z HTTP na HTTPS, přechod z IPv6 na IPv4 nebude fungovat správně. První požadavek na doménu správně přejde na IPv4 a obdrží přesměrování z HTTP na HTTPS. Následující požadavek opět upřednostní adresu IPv6, ale po vypršení časového limitu už na IPv4 nepřejde. Situaci vyřešíte opravou chybného nastavení IPv6 nebo zrušením přesměrování z HTTP na HTTPS pro požadavky směřující na cestu výzvy ACME HTTP-01.

## Jak získat pomoc

Potřebujete-li pomoci s diagnostikou problému souvisejícího s IPv6, navštivte naše [komunitní fórum](https://community.letsencrypt.org).
