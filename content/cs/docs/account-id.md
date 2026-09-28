---
title: Vyhledání ID účtu
slug: account-id
lastmod: 2021-12-27
show_lastmod: 1
---


Při hlášení problémů může být užitečné uvést ID vašeho účtu Let's Encrypt. Vytvoření účtu většinou automaticky zajišťuje klientský software ACME, kterým komunikujete se službou Let's Encrypt. Pokud klienty ACME provozujete na více serverech, můžete mít nakonfigurováno několik účtů.

ID účtu je adresa URL v následujícím formátu: `https://acme-v02.api.letsencrypt.org/acme/acct/12345678`.

Pokud používáte [Certbot](https://certbot.eff.org/) verze 1.23.0 nebo novější, ID účtu zjistíte spuštěním dílčího příkazu `certbot show_account`. Pokud používáte Certbot starší než 1.23.0, ID účtu najdete v poli „uri“ v souboru `/etc/letsencrypt/accounts/acme-v02.api.letsencrypt.org/directory/*/regr.json`.

Používáte-li jiného klienta ACME, závisí postup na konkrétním klientovi. Vyhledejte v protokolech adresy URL ve výše uvedeném formátu. Pokud váš klient ACME ID účtu nezaznamenává, můžete je získat odesláním nové žádosti o registraci se stejným klíčem. Podrobnosti najdete ve [specifikaci ACME](https://tools.ietf.org/html/rfc8555#section-7.3). Číselnou podobu svého ID najdete také v hlavičce Boulder-Requester v odpovědi na každý požadavek POST odeslaný vaším klientem ACME.
