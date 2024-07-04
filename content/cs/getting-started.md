---
title: Jak začít
slug: getting-started
date: 2020-02-11
lastmod: 2023-12-20
---

<div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 15px;">
  <div>URL adresáře Let's Encrypt ACME je:</div>
  <div><a href="https://acme-v02.api.letsencrypt.org"><code>https://acme-v02.api.letsencrypt.org/directory</code></a></div>
</div>

Chcete-li na svých webových stránkách povolit protokol HTTPS, musíte získat certifikát (typ souboru) od certifikační autority (CA). Let's Encrypt je CA. Abyste mohli získat certifikát pro doménu svého webu od Let's Encrypt, musíte prokázat, že doménu provozujete. U Let's Encrypt to provedete pomocí softwaru používajícího [protokol ACME](https://tools.ietf.org/html/rfc8555), který obvykle běží na vašem webovém hostiteli.

Abyste zjistili, jaká metoda pro vás bude nejlepší, musíte vědět, zda máte [shell access](https://en.wikipedia.org/wiki/Shell_account) ( známý také jako SSH přístup) k vašemu webovému hostiteli. Pokud své webové stránky spravujete výhradně prostřednictvím ovládacího panelu, jako je [cPanel](https://cpanel.net/), [Plesk](https://www.plesk.com/) nebo [WordPress](https://wordpress.org/), je velká pravděpodobnost, že shell access nemáte. Pro jistotu se můžete zeptat svého poskytovatele hostingu.

# Přístup přes shell

Pro shell access většině lidí doporučujeme používat ACME klienta [Certbot][]. Ten dokáže automatizovat vydávání a instalaci certifikátů bez prostojů. Má také expertní režimy pro lidi, kteří nechtějí automatickou konfiguraci. Snadno se používá, funguje v mnoha operačních systémech a má skvělou dokumentaci. Instrukce přizpůsobené vašemu operačnímu systému a webovému serveru najdete na [stránkách Certbot][Certbot].

Pokud [Certbot][] nevyhovuje vašim potřebám nebo chcete vyzkoušet něco jiného, můžete si vybrat z [mnoha dalších ACME klientů](/docs/client-options).  Jakmile si vyberete softwarového ACME klienta, přečtěte si jeho dokumentaci pro další postup.

Pokud zkoušíte různé ACME klienty, použijte naše [staging prostředí](/docs/staging-environment), abyste nebyli omezení [rate limity](/docs/rate-limits).

# Bez přístupu přes shell

Nejlepší způsob, jak používat Let's Encrypt bez přístupu přes shell, je využít integrovanou podporu vašeho poskytovatele hostingu. Pokud váš poskytovatel hostingu podporuje Let's Encrypt, může vaším jménem požádat o bezplatný certifikát, nainstalovat jej a automaticky jej aktualizovat. U některých poskytovatelů hostingu to jde zapnout v nastaveních. Jiní poskytovatelé automaticky žádají o certifikáty a instalují je pro všechny své zákazníky.

[Podívejte se na náš seznam poskytovatelů hostingu](https://community.letsencrypt.org/t/web-hosting-who-support-lets-encrypt/6920) a zjistěte, zda je na něm i ten váš. Pokud ano, postupujte podle jejich dokumentace a nastavte si certifikát Let's Encrypt.

Pokud váš poskytovatel hostingu nepodporuje Let's Encrypt, můžete jej kontaktovat a požádat o podporu. Snažíme se, aby bylo velmi snadné začít podporovat Let's Encrypt, a poskytovatelé si často rádi vyslechnou návrhy od zákazníků!

Pokud váš poskytovatel hostingu nechce integrovaci s Let's Encrypt, ale podporuje nahrávání vlastních certifikátů, můžete si Certbot nainstalovat do vlastního počítače a používat ho v [ručním režimu](https://certbot.eff.org/docs/using.html#manual). V ručním režimu nahrajete na své webové stránky konkrétní soubor, kterým prokážete své správcovství. Certbot poté načte certifikát, který můžete nahrát vašemu poskytovateli hostingu. Tuto možnost nedoporučujeme, protože je časově náročná a budete ji muset opakovat několikrát ročně, pokaždé když platnost certifikátu vyprší. Pro většinu lidí je lepší požádat o podporu Let's Encrypt svého poskytovatele hostingu nebo změnit poskytovatele, pokud ji neplánuje implementovat.

# Jak získat pomoc

Pokud máte dotazy týkající se výběru ACME klienta, používání konkrétního klienta nebo čehokoli, co souvisí s aplikací Let's Encrypt, využijte pomoci našeho [komunitního fóra](https://community.letsencrypt.org/).

[Certbot]: https://certbot.eff.org/ "Certbot"

[Certbot]: https://certbot.eff.org/ "Certbot"
