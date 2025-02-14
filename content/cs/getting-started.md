---
title: Jak začít
slug: getting-started
lastmod: 2025-01-23
---

Let's Encrypt vydává certifikáty prostřednictvím automatizovaného rozhraní API založeného na [protokolu ACME](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).

K interakci s rozhraním API služby Let's Encrypt a získání certifikátu je zapotřebí software, kterému říkáme „ACME klient“. Na těchto webových stránkách, které mají pouze informační charakter, neprobíhá žádná část procesu získání certifikátu.

Lidé kteří chtějí začít používat Let's Encrypt, se nejdříve ptají: Získá a bude pro mě můj poskytovatel hostingu spravovat certifikáty od Let's Encrypt, nebo musíme ACME klienta spustit sami?

# Získání certifikátů přes poskytovatele hostingu

Pro mnoho lidí získá a spravuje certifikáty od společnosti Let's Encrypt jejich poskytovatel hostingu. Pokud je to vás případ, váš poskytovatel použije ACME klienta a vy nemusíte přemýšlet o tom, jak získat nebo provozovat klientský software ACME.

Pokud pro vás poskytovatel získává a spravuje certifikáty, děje se tak buď automaticky, nebo je třeba povolit možnost konfigurace. Zkontrolujte dokumentaci poskytovatele a možnosti konfigurace.

# Vlastní výběr a provoz klienta ACME

Pokud váš poskytovatel hostingu nezajišťuje získání a správu certifikátů za vás a pokud máte možnost spouštět příkazy na serveru s dostatečnými právy, můžete si vybrat klienta ACME a spustit jej sami, abyste získali certifikáty od společnosti Let's Encrypt.

Většině uživatelů doporučujeme [kliente Certbot ACME](https://certbot.eff.org/). Na webových stránkách Certbotu je k dispozici vynikající dokumentace a návod k obsluze Certbotu.

Pokud vám Certbot z nějakého důvodu nevyhovuje, existuje [mnoho dalších možností klientského softwaru ACME](/docs/client-options/).

Pokud má být váš klient nakonfigurován s koncovým bodem rozhraní API Let's Encrypt ACME, nechť použije:

<code>[https://acme-v02.api.letsencrypt.org/directory](https://acme-v02.api.letsencrypt.org/directory)</code>

Doporučujeme nejprve otestovat na naší [staging API](/docs/staging-environment/).

# Jak získat pomoc

Pokud máte dotazy týkající se výběru ACME klienta, používání konkrétního klienta nebo čehokoli, co souvisí s aplikací Let's Encrypt, využijte pomoci našeho [komunitního fóra](https://community.letsencrypt.org/).

Na našich webových stránkách najdete také [rozsáhlou dokumentaci](/docs/), pokud potřebujete další podrobnosti.
