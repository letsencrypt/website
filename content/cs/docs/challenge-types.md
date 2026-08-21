---
title: Typy výzev
slug: challenge-types
lastmod: 2026-02-12
show_lastmod: 1
---


Při získávání certifikátu od Let's Encrypt naše servery pomocí „výzev“ definovaných standardem ACME ověřují, že máte názvy domén uvedené v certifikátu pod kontrolou. Ověření většinou automaticky provede váš klient ACME. Pokud však potřebujete rozhodnout o složitější konfiguraci, je užitečné výzvám lépe porozumět. Nejste-li si jistí, použijte výchozí nastavení klienta nebo výzvu HTTP-01.

# Výzva HTTP-01

V současnosti jde o nejběžnější typ výzvy. Let's Encrypt předá klientovi ACME token a klient umístí na webový server soubor na adrese `http://<YOUR_DOMAIN>/.well-known/acme-challenge/<TOKEN>`. Soubor obsahuje token a otisk klíče vašeho účtu. Jakmile klient ACME oznámí službě Let's Encrypt, že je soubor připravený, Let's Encrypt se jej pokusí načíst, případně několikrát z několika různých síťových perspektiv. Pokud naše validační kontroly obdrží z webového serveru správné odpovědi, ověření bude úspěšné a můžete pokračovat vydáním certifikátu. Pokud validační kontroly selžou, musíte znovu požádat o nový certifikát.

Naše implementace výzvy HTTP-01 následuje nejvýše 10 po sobě jdoucích přesměrování. Přijímá pouze přesměrování na „http:“ nebo „https:“ a jen na porty 80 či 443. Při přesměrování na adresu URL používající HTTPS neověřuje certifikáty. Účelem této výzvy je prvotní získání platného certifikátu, takže se během procesu může setkat s certifikáty podepsanými samy sebou nebo s prošlou platností.

Výzvu HTTP-01 lze provést pouze na portu 80. Možnost zadat libovolné porty by snižovala zabezpečení výzvy, a proto ji standard ACME nepovoluje.

Výhody:

- Lze ji snadno automatizovat bez dalších znalostí konfigurace domény.
- Umožňuje poskytovatelům hostingu vydávat certifikáty pro domény, které na ně odkazují pomocí CNAME.
- Funguje s běžně dostupnými webovými servery.
- Lze ji použít také k ověřování IP adres.

Nevýhody:

- Nefunguje, pokud poskytovatel internetového připojení blokuje port 80. Je to vzácné, ale někteří poskytovatelé připojení pro domácnosti jej blokují.
- Tuto výzvu nelze použít k vydávání zástupných certifikátů.
- Pokud máte několik webových serverů, musíte zajistit dostupnost souboru na všech z nich.

# Výzva DNS-01

Tato výzva po vás požaduje, abyste kontrolu nad systémem DNS názvu domény prokázali vložením konkrétní hodnoty do záznamu TXT pod tímto názvem. Konfigurace je obtížnější než u HTTP-01, funguje však i v situacích, ve kterých HTTP-01 použít nelze. Umožňuje také vydávat zástupné certifikáty. Jakmile Let's Encrypt předá klientovi ACME token, klient z něj a z klíče účtu odvodí záznam TXT a umístí jej na adresu `_acme-challenge.<YOUR_DOMAIN>`. Let's Encrypt poté tento záznam vyhledá v systému DNS. Pokud najde shodu, můžete pokračovat vydáním certifikátu.

Automatizace vydávání a obnovování je velmi důležitá, proto má používání výzev DNS-01 smysl pouze tehdy, pokud váš poskytovatel DNS nabízí API pro automatizaci aktualizací. Naše komunita začala vytvářet [seznam takových poskytovatelů DNS][dns-api-providers]. Poskytovatelem DNS může být váš registrátor, tedy společnost, od které jste název domény koupili, ale může jít také o jinou společnost. Chcete-li poskytovatele DNS změnit, stačí provést několik drobných změn u registrátora. Nemusíte čekat, až se přiblíží konec registrace domény.

Uložením úplných přihlašovacích údajů k API DNS na webovém serveru výrazně zvýšíte dopad případného napadení serveru. Doporučujeme používat [přihlašovací údaje k API s užším rozsahem oprávnění][securing-dns-credentials] nebo provádět ověření DNS na samostatném serveru a certifikáty automaticky kopírovat na webový server.

Let's Encrypt při vyhledávání záznamů TXT pro ověření DNS-01 dodržuje standardy DNS, takže můžete odpovídání na výzvu delegovat do jiných zón DNS pomocí záznamů CNAME nebo NS. Tímto způsobem lze [delegovat subdoménu `_acme-challenge`][securing-dns-credentials] na server nebo zónu určenou k ověřování. Delegování můžete využít také tehdy, když poskytovatel DNS aktualizuje záznamy pomalu a chcete použít rychlejší server.

Většina poskytovatelů DNS má určitou „dobu šíření“, která určuje, za jak dlouho od aktualizace záznamu DNS bude změna dostupná na všech jejich serverech. Tuto dobu může být obtížné změřit, protože poskytovatelé často používají také [anycast][]. Několik serverů tak může mít stejnou IP adresu a podle vaší polohy můžete komunikovat s jiným serverem a obdržet jinou odpověď než Let's Encrypt. Nejlepší API DNS umožňují automaticky zkontrolovat, zda se aktualizace již plně rozšířila. Pokud to poskytovatel DNS neumožňuje, musíte klienta nastavit tak, aby před spuštěním ověření počkal dostatečně dlouho na rozšíření aktualizace, často až hodinu.

Pro stejný název můžete současně vytvořit několik záznamů TXT. Může k tomu dojít například při současném ověřování výzvy pro zástupný a běžný certifikát. Staré záznamy TXT však nezapomeňte odstraňovat. Pokud bude odpověď příliš velká, Let's Encrypt ji začne odmítat.

Výhody:

- Pomocí této výzvy můžete vydávat certifikáty obsahující zástupné názvy domén.
- Funguje dobře i při používání několika webových serverů.
- Pomocí této výzvy můžete ověřovat názvy domén, jejichž webové servery nejsou přístupné z veřejného internetu.

Nevýhody:

- Uchovávání přihlašovacích údajů k API na webovém serveru je rizikové.
- Poskytovatel DNS nemusí nabízet API.
- API DNS nemusí poskytovat informace o době šíření změn.
- Nelze ji použít k ověřování IP adres.

# TLS-ALPN-01

Tato výzva byla vyvinuta po označení TLS-SNI-01 za zastaralou a vzniká jako [samostatný standard][tls-alpn]. Stejně jako TLS-SNI-01 se provádí prostřednictvím TLS na portu 443. Používá však vlastní protokol ALPN, který zajišťuje, že na validační požadavky odpovědí pouze servery podporující tento typ výzvy. Validační požadavky tohoto typu výzvy tak mohou používat pole SNI odpovídající ověřovanému názvu domény, což zvyšuje zabezpečení.

Tato výzva není vhodná pro většinu uživatelů. Nejlépe se hodí pro vývojáře reverzních proxy serverů ukončujících TLS, kteří chtějí provádět ověření založené na názvu hostitele podobně jako u HTTP-01, ale z důvodu oddělení odpovědností chtějí celý postup provést na vrstvě TLS. V současnosti jde především o velké poskytovatele hostingu.

Výhody:

- Funguje i v případě, že nemáte k dispozici port 80.
- Lze ji provést výhradně na vrstvě TLS.
- Lze ji použít také k ověřování IP adres.

Nevýhody:

- Podpora v klientech ACME je omezená.
- Stejně jako u HTTP-01 musí při používání několika serverů všechny odpovídat stejným obsahem.
- Tuto metodu nelze použít k ověřování zástupných domén.

# TLS-SNI-01

Tato výzva byla definována v pracovních verzích protokolu ACME. Provedla navázání spojení TLS na portu 443, odeslala konkrétní hlavičku [SNI][] a očekávala certifikát obsahující token. V [březnu 2019 byla odstraněna][tls-sni-disablement], protože nebyla dostatečně bezpečná.

[dns-api-providers]: https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[securing-dns-credentials]: https://www.eff.org/deeplinks/2018/02/technical-deep-dive-securing-automation-acme-dns-challenge-validation
[anycast]: https://en.wikipedia.org/wiki/Anycast
[SNI]: https://en.wikipedia.org/wiki/Server_Name_Indication
[tls-sni-disablement]: https://community.letsencrypt.org/t/march-13-2019-end-of-life-for-all-tls-sni-01-validation-support/74209
[tls-alpn]: https://tools.ietf.org/html/rfc8737
