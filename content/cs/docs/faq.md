---
title: Časté dotazy
linkTitle: Časté dotazy (FAQ)
slug: faq
lastmod: 2025-04-28
menu:
  main:
    weight: 30
    parent: about
show_lastmod: 1
---

Časté dotazy jsou rozděleny do následujících částí:

- [Obecné dotazy](#general)
- [Technické dotazy](#technical)

# <a id="general">Obecné dotazy</a>

## Jaké služby Let's Encrypt nabízí?

Let's Encrypt je globální certifikační autorita (CA). Umožňujeme lidem a organizacím z celého světa získávat, obnovovat a spravovat certifikáty SSL/TLS. Naše certifikáty umožňují webům používat zabezpečená připojení HTTPS.

Let's Encrypt nabízí certifikáty s ověřením domény (DV). Certifikáty s ověřením organizace (OV) ani rozšířeným ověřením (EV) nenabízíme, především proto, že jejich vydávání nelze automatizovat.

Chcete-li začít používat Let's Encrypt, navštivte stránku [Začínáme](/getting-started).

## Kolik používání Let's Encrypt stojí? Je služba opravdu zdarma?

Za certifikáty neúčtujeme žádné poplatky. Let's Encrypt je nezisková organizace. Naším posláním je vytvořit bezpečnější web, který více respektuje soukromí, prostřednictvím širokého zavádění HTTPS. Naše služby jsou bezplatné a snadno použitelné, aby mohl HTTPS nasadit každý web.

Abychom mohli služby poskytovat zdarma po celém světě, potřebujeme podporu štědrých sponzorů, poskytovatelů grantů a jednotlivců. Chcete-li nás podpořit, zvažte prosím [finanční příspěvek](/donate) nebo se [staňte sponzorem](https://www.abetterinternet.org/sponsor).

Integrátoři, například poskytovatelé hostingu, si v některých případech účtují malý poplatek odpovídající administrativním nákladům a nákladům na správu spojeným s poskytováním certifikátů Let's Encrypt.

## Jakou podporu nabízíte?

Let's Encrypt provozuje malý tým, který pomocí automatizace udržuje nízké náklady. Proto nemůžeme odběratelům nabízet přímou podporu. K dispozici jsou však jiné kvalitní možnosti podpory:

1. Nabízíme užitečnou [dokumentaci](/docs).
2. Máme velmi aktivní a ochotné [fórum komunitní podpory](https://community.letsencrypt.org/). Členové komunity výborně odpovídají na dotazy a mnoho nejčastějších otázek již bylo zodpovězeno.

Podívejte se na naše oblíbené [video o síle kvalitní komunitní podpory](https://www.youtube.com/watch?v=Xe1TZaElTAs).

## Web používající Let's Encrypt se věnuje phishingu, šíření malwaru, podvodům nebo jiné škodlivé činnosti. Co mám dělat?

Doporučujeme takové weby nahlásit službám Google Safe Browsing a Microsoft SmartScreen, které mohou uživatele chránit účinněji. Adresy URL pro hlášení:

- [https://safebrowsing.google.com/safebrowsing/report_badware/](https://safebrowsing.google.com/safebrowsing/report_badware/)
- [https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest](https://www.microsoft.com/en-us/wdsi/support/report-unsafe-site-guest)

Další informace o našich zásadách a jejich důvodech najdete zde:

https://letsencrypt.org/2015/10/29/phishing-and-malware.html

# <a id="technical">Technické dotazy</a>

## Důvěřuje můj prohlížeč certifikátům Let's Encrypt?

U většiny prohlížečů a operačních systémů ano. Podrobnosti najdete v [seznamu kompatibility](/docs/cert-compat).

## Vydává Let's Encrypt certifikáty i k jiným účelům než SSL/TLS pro weby?

Certifikáty Let's Encrypt jsou standardní certifikáty s ověřením domény. Můžete je tedy použít pro libovolný server využívající název domény, například webový, poštovní či FTP server.

Šifrování e-mailů a podepisování kódu vyžaduje jiný typ certifikátu, který Let's Encrypt nevydává.

## Generuje nebo ukládá Let's Encrypt soukromé klíče k mým certifikátům na svých serverech?

Ne. Nikdy.

Soukromý klíč se vždy generuje a spravuje na vašich vlastních serverech, nikoli ve službě Let's Encrypt.

## Jakou dobu platnosti mají certifikáty Let's Encrypt? Jak dlouho jsou platné?

Naše výchozí certifikáty jsou platné 90 dní. Důvody si můžete přečíst [zde](/2015/11/09/why-90-days.html).

Odběratelé si mohou zvolit krátkodobé certifikáty s platností šest dní. Další informace o nich najdete [zde](/2025/02/20/first-short-lived-cert-issued.html).

Tyto doby platnosti nelze upravit a neposkytujeme žádné výjimky. Certifikáty s platností 90 dní doporučujeme obnovovat každých 60 dní a certifikáty s platností šest dní každé tři dny.

## Bude Let's Encrypt vydávat certifikáty s ověřením organizace (OV) nebo rozšířeným ověřením (EV)?

Vydávání certifikátů OV ani EV neplánujeme.

## Mohu získat certifikát pro několik názvů domén, tedy certifikát SAN nebo UCC?

Ano. Jeden certifikát může pomocí mechanismu alternativního názvu subjektu (SAN) obsahovat několik různých názvů.

## Vydává Let's Encrypt zástupné certifikáty?

Ano. K vydávání zástupných certifikátů je nutné použít [výzvu DNS-01](/docs/challenge-types/#dns-01-challenge). Další technické informace najdete v [tomto příspěvku](https://community.letsencrypt.org/t/acme-v2-production-environment-wildcards/55578).

## Existuje klient Let's Encrypt (ACME) pro můj operační systém?

K dispozici je velké množství [klientů ACME](/docs/client-options). Pro váš operační systém pravděpodobně existuje vhodné řešení. Doporučujeme začít s klientem [Certbot](https://certbot.eff.org/).

## Mohu použít existující soukromý klíč nebo žádost o podepsání certifikátu (CSR)?

Ano, tuto funkci však nepodporují všichni klienti. Klient [Certbot](https://certbot.eff.org/) ji podporuje.

## Požádal jsem o certifikát a moje doména teď zaznamenává velký provoz. Proč k tomu dochází?

Jde o běžné a očekávané chování. Během [vydávání certifikátu](/how-it-works) ověří Let's Encrypt kontrolu nad vaší doménou z [několika síťových perspektiv](/2020/02/19/multi-perspective-validation). Po úspěšném ověření bude certifikát odeslán do několika [logů Certificate Transparency (CT)](/docs/ct-logs). Podrobnější vysvětlení, proč je to nezbytné, najdete [zde](https://certificate.transparency.dev/howctworks/#pki). Krátce po odeslání certifikátu do CT mohou automatizovaní roboti procházející logy CT objevit vaši doménu, pokusit se k ní přistoupit a vytvářet další provoz v protokolech webového serveru.

## Které IP adresy používá Let's Encrypt k ověřování mého webového serveru?

Seznam IP adres používaných k ověřování nezveřejňujeme a tyto adresy se mohou kdykoli změnit. V současnosti [ověřujeme z několika IP adres](/2020/02/19/multi-perspective-validation.html).

## Certifikát jsem úspěšně obnovil, ale tentokrát neproběhlo ověření. Jak je to možné?

Jakmile úspěšně dokončíte výzvy pro doménu, výsledná autorizace se uloží do mezipaměti vašeho účtu pro pozdější použití. Autorizace zůstávají v mezipaměti až 30 dní od ověření v závislosti na příslušném [profilu](/docs/profiles). Pokud jsou všechny potřebné autorizace pro požadovaný certifikát uložené v mezipaměti, ověření se znovu neprovede, dokud platnost příslušných autorizací v mezipaměti neskončí.

## Proč by se měl můj klient Let's Encrypt (ACME) spouštět v náhodně zvolenou dobu?

Žádáme, aby [klienti ACME prováděli pravidelné obnovování v náhodně zvolenou dobu](https://letsencrypt.org/docs/integration-guide/#when-to-renew). Zabrání se tak špičkám provozu v pevných časech, například přesně o půlnoci UTC nebo v první sekundě každé hodiny či minuty. Pokud je služba příliš vytížená, budou klienti požádáni, aby to [zkusili znovu později](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503). Náhodné rozložení časů obnovování tak pomáhá omezit zbytečné opakované pokusy.

## Kde se mohu dozvědět více o TLS/SSL a PKI obecně?

Dlouholetý bezpečnostní výzkumník a odborník Ivan Ristić vydal průvodce konfigurací s užitečnými informacemi o tom, co je třeba zvážit při <a href="https://www.feistyduck.com/library/bulletproof-tls-guide/online/" target="_blank" rel="noopener noreferer">nastavování TLS</a>.

Pro rozsáhlejší úvod a podrobnější informace doporučujeme knihu <a href="https://www.feistyduck.com/books/bulletproof-tls-and-pki/" target="_blank" rel="noopener noreferer">Bulletproof TLS and PKI</a>, jejímž autorem je rovněž Ristić.
