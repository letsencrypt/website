---
title: lencr.org
slug: lencr.org
lastmod: 2025-07-31
show_lastmod: 1
---


# Co je `lencr.org`?

`lencr.org` je doména vlastněná organizací Let's Encrypt. Hostujeme na ní data, na která odkazují námi vydávané certifikáty.

# Proč můj počítač tato data stahuje? Jde o škodlivý obsah?

Ne, data na `lencr.org` nikdy nejsou škodlivá. Zařízení se připojí k doméně `lencr.org` tehdy, když jeho klientský software (například webový prohlížeč nebo aplikace) navštíví jiný web, obdrží od něj certifikát Let's Encrypt a snaží se ověřit jeho platnost. U mnoha klientů jde o běžný postup.

Nemůžeme však posoudit, zda je škodlivý *navštívený web*. Pokud prověřujete neobvyklou síťovou aktivitu, zaměřte se na připojení, které začalo bezprostředně před připojením k doméně `lencr.org`.

Připojení klientů k doméně `lencr.org` mohou působit neobvykle nebo nepravidelně. Někteří klienti data nestahují vůbec, jiní stáhnou jen jejich část nebo si je kvůli úspoře prostředků ukládají do mezipaměti. Přistupují k nim proto jen občas, například při prvním použití a po skončení jejich platnosti.

# K čemu přesně tato data slouží?

Když se klientský software (například webový prohlížeč nebo aplikace) připojí k webu, který předloží certifikát, měl by ověřit jeho pravost a platnost. Data klientům s tímto ověřením pomáhají několika způsoby.

* Na doméně `c.lencr.org` zveřejňujeme seznamy zneplatněných certifikátů (CRL), které obsahují všechny dosud platné certifikáty, jež jsme vydali a později zneplatnili.

* Na doméně `i.lencr.org` zveřejňujeme kopie našich mezilehlých certifikátů vydavatele. Ty jsou podepsány některým z našich kořenových certifikátů nebo křížově podepsány jinou certifikační autoritou (CA). Klient může tato data použít k ověření řetězce důvěry: od ověřovaného koncového certifikátu přes jeden či více mezilehlých certifikátů až ke kořenovému certifikátu certifikační autority, který zná a kterému důvěřuje.

# Proč právě „`lencr.org`“?

Dříve jsme používali delší adresy URL, například `http://example.int-x3.letsencrypt.org/`. Při vydání našich [nových kořenových a mezilehlých certifikátů][1] jsme však chtěli jejich velikost co nejvíce zmenšit. Při každém připojení přes HTTPS na webu (jde o miliardy připojení denně) je nutné odeslat kopii certifikátu, takže záleží na každém bajtu. Doménu `lencr.org` jsme zvolili kvůli podobnosti s naším názvem: **L**et's **ENCR**ypt. Vyslovujeme ji podobně jako název fiktivní země [Lancre][] z románů Terryho Pratchetta o _Zeměploše_.

[1]: https://letsencrypt.org/2020/09/17/new-root-and-intermediates.html
[Lancre]: https://wiki.lspace.org/Lancre
