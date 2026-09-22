---
title: Implementace klientů ACME
slug: client-options
lastmod: 2025-01-22
---

{{< clientslastmod >}}

Let's Encrypt používá protokol ACME k ověření, že máte daný název domény pod kontrolou, a k vydání certifikátu. Chcete-li získat certifikát Let's Encrypt, musíte si vybrat klientský software ACME.

Níže uvedené klienty ACME nabízejí třetí strany. Let's Encrypt klienty třetích stran nekontroluje ani neposuzuje a nemůže zaručit jejich bezpečnost či spolehlivost.

Existují také klientské aplikace ACME spouštěné v prohlížeči, zde je však neuvádíme. Vedou totiž k ručnímu obnovování, které zhoršuje uživatelské prostředí a zvyšuje riziko, že certifikát nebude včas obnoven.

# Doporučený klient: Certbot

Většině uživatelů doporučujeme začít s klientem [Certbot](https://certbot.eff.org/). Podle vašich potřeb může certifikát pouze získat, nebo vám pomoci také s jeho instalací. Snadno se používá, funguje v mnoha operačních systémech a nabízí kvalitní dokumentaci.

Pokud Certbot nesplňuje vaše potřeby nebo si jednoduše chcete vyzkoušet něco jiného, níže najdete mnoho dalších klientů rozdělených podle jazyka nebo prostředí, ve kterém fungují.

# Další možnosti klientů

Všichni následující klienti podporují API ACMEv2 ([RFC 8555](https://tools.ietf.org/html/rfc8555)). V červnu 2021 jsme [ukončili podporu ACMEv1](https://community.letsencrypt.org/t/end-of-life-plan-for-acmev1/88430/27). Pokud již některého z níže uvedených klientů používáte, aktualizujte jej na nejnovější verzi. Není-li váš klient uveden níže, nemusí podporovat ACMEv2. V takovém případě doporučujeme kontaktovat správce projektu nebo přejít na jiného klienta.

{{< clients libraries="Knihovny" projects="Projekty integrované se službou Let's Encrypt" >}}

Modul [acme](https://github.com/certbot/certbot/tree/main/acme) pro Python je součástí Certbotu, používá jej však také řada dalších klientů. Jako samostatný balíček je dostupný prostřednictvím [PyPI](https://pypi.python.org/pypi/acme), distribucí [Debian](https://packages.debian.org/search?keywords=python-acme), [Ubuntu](https://launchpad.net/ubuntu/+source/python-acme), [Fedora](https://bodhi.fedoraproject.org/updates/?packages=python-acme) a dalších distribucí.

{{< /clients >}}

# Přidání klienta nebo projektu

Pokud znáte klienta ACME nebo projekt integrovaný s API ACMEv2 služby Let's Encrypt, který na této stránce chybí, odešlete pull request do našeho [repozitáře webu](https://github.com/letsencrypt/website/) na GitHubu a aktualizujte soubor `data/clients.json`.

Před odesláním pull requestu ověřte následující:

1. Klient dodržuje [zásady používání ochranných známek Let's Encrypt](https://www.abetterinternet.org/trademarks).
1. Klient není založený na prohlížeči a podporuje automatické obnovování.
1. Klient provádí [pravidelné obnovování v náhodně zvolenou dobu](/docs/integration-guide#when-to-renew) nebo takové nastavení doporučuje.
1. Váš commit přidá klienta na **konec** příslušných částí.
1. Váš commit aktualizuje datum `lastmod` v horní části souboru `clients.json`.

Záznamy projektů, které již zřejmě nejsou vyvíjeny, můžeme pravidelně odstraňovat. Pokud bude vývoj projektu obnoven, můžete jej novým pull requestem opět přidat.
