---
title: Návod k integraci
linkTitle: Návod k integraci pro klientské aplikace a velké poskytovatele
slug: integration-guide
lastmod: 2025-06-23
show_lastmod: 1
---

Tento dokument obsahuje užitečná doporučení pro poskytovatele hostingu a provozovatele velkých webů, kteří integrují Let's Encrypt, i pro vývojáře klientského softwaru pro Let's Encrypt.

# Počítejte se změnami

Let's Encrypt i infrastruktura Web PKI se budou nadále vyvíjet.  Zajistěte proto, abyste mohli snadno aktualizovat všechny služby, které Let's Encrypt používají. Pokud zároveň nasazujete klientské aplikace, které se spoléhají na certifikáty Let's Encrypt, dbejte zejména na jejich pravidelnou aktualizaci.

V budoucnu se pravděpodobně změní:

  * kořenové a mezilehlé certifikáty, ze kterých vydáváme certifikáty
  * hashovací algoritmy, které používáme k podepisování certifikátů
  * typy klíčů a požadavky na jejich sílu, které jsme ochotni akceptovat při podepisování koncových certifikátů
  * a protokol ACME

O takových změnách se vždy budeme snažit informovat s co největším předstihem. Pokud však bude v některé součásti objevena závažná bezpečnostní chyba, může být nutné provést změny ve velmi krátké době nebo okamžitě. Zejména při změnách mezilehlých certifikátů byste neměli napevno určovat, který z nich se má použít. Místo toho používejte hlavičku [`Link: rel="up"`](https://tools.ietf.org/html/rfc8555#section-7.4.2) protokolu ACME, protože mezilehlé certifikáty se budou pravděpodobně měnit.

Podobně se při aktualizacích smluvních podmínek (ToS) pravděpodobně změní i jejich adresa URL. Adresu URL smluvních podmínek nezadávejte napevno. Správnou adresu určujte pomocí hlavičky [`Link: rel="terms-of-service"`](https://tools.ietf.org/html/rfc8555#section-7.3.3).

Měli byste také umět průběžně aktualizovat konfiguraci TLS, protože mohou být objeveny nové útoky na šifrovací sady nebo verze protokolu.

# Odebírejte aktualizace

Chcete-li dostávat občasná upozornění na důležité změny, jako jsou ty popsané výše, přihlaste se k odběru skupiny [API Announcements](https://community.letsencrypt.org/t/about-the-api-announcements-category/23836). Tato skupina je užitečná pro vývojáře klientských aplikací i poskytovatele hostingu.

Častější informace o údržbě a výpadcích najdete na naší [stavové stránce](https://letsencrypt.status.io/). Vpravo nahoře klikněte na tlačítko Subscribe. Tyto informace jsou nejužitečnější pro poskytovatele hostingu.

# Kdo je odběratelem

V našich [zásadách CP/CPS a Smlouvě s odběratelem](/repository) je jako odběratel označen ten, kdo vlastní soukromý klíč k certifikátu. V případě poskytovatelů hostingu je tedy odběratelem poskytovatel, nikoli jeho zákazník. Pokud vyvíjíte software, který si uživatelé nasazují sami, je odběratelem ten, kdo software nasazuje.

Pro poskytovatele hostingu z toho vyplývá, že od svých zákazníků nemusí vyžadovat souhlas s naší Smlouvou s odběratelem. Pro domény, které máte pod kontrolou, můžete jednoduše vydat certifikáty a začít je používat.

# Jeden účet, nebo více?

Protokol ACME umožňuje vytvořit jeden účet pro všechna ověření a vydávání certifikátů, nebo samostatný účet pro každého zákazníka. Tato flexibilita může být užitečná. Někteří poskytovatelé hostingu například mohou chtít používat samostatný účet pro každého zákazníka a ukládat klíče účtů odděleně. Napadení jednoho klíče účtu pak neumožní vydávat certifikáty pro všechny zákazníky.

Většině větších poskytovatelů hostingu však doporučujeme používat jediný účet a jeho klíč důkladně zabezpečit. Díky tomu lze snáze rozpoznat certifikáty patřící stejnému subjektu a v případě potřeby upravit limity četnosti požadavků. Pokud používáte mnoho různých účtů, nedokážeme limity četnosti požadavků účinně upravit.

# Vícedoménové certifikáty (SAN)

Naše [zásady vydávání certifikátů](/docs/rate-limits) povolují až 100 názvů v jednom certifikátu. Je na vás, zda použijete samostatný certifikát pro každý název hostitele, nebo mnoho názvů hostitelů seskupíte do několika málo certifikátů.

Samostatné certifikáty pro jednotlivé názvy hostitelů zjednodušují přidávání a odebírání domén při jejich zřizování a vyřazování. Samostatné certifikáty jsou také menší, což může urychlit navazování spojení HTTPS v sítích s malou šířkou pásma.

Velké certifikáty s mnoha názvy hostitelů naopak znamenají, že celkově spravujete méně certifikátů. Pokud potřebujete podporovat starší klienty, jako je Windows XP, které nepodporují rozšíření Server Name Indication ([SNI](https://en.wikipedia.org/wiki/Server_Name_Indication)) protokolu TLS, budete pro každý certifikát potřebovat jedinečnou IP adresu. Více názvů v jednom certifikátu proto snižuje potřebný počet IP adres.

Z hlediska zabezpečení jsou pro většinu nasazení obě možnosti rovnocenné.

# Ukládání a opakované používání certifikátů a klíčů

Velká část přínosu Let's Encrypt spočívá v tom, že při zřizování nového webu umožňuje certifikát vydat automaticky. Pokud však vaše infrastruktura může pro stejný web opakovaně vytvářet nové frontendové servery, měly by se nejprve pokusit použít certifikát a soukromý klíč z trvalého úložiště. Nový certifikát by měly vydat pouze tehdy, když žádný není k dispozici nebo když už skončila platnost všech stávajících certifikátů.

Nám v Let's Encrypt to pomáhá efektivně poskytovat služby co největšímu počtu lidí. Vám to zajišťuje možnost nasadit web, kdykoli potřebujete, bez ohledu na aktuální stav služby Let's Encrypt.

Mnoho webů například začíná používat Docker k vytváření nových frontendových instancí podle potřeby. Pokud kontejnery Docker nastavíte tak, aby při spuštění vydávaly certifikát, ale certifikáty a klíče neukládáte trvale, při současném spuštění příliš mnoha instancí pravděpodobně narazíte na limity četnosti požadavků. V nejhorším případě můžete být nuceni zničit a znovu vytvořit všechny instance najednou. Žádná z nich pak nemusí být schopná získat certifikát a váš web může být několik dní nedostupný, dokud omezení četnosti požadavků nevyprší. Tento problém se však netýká jen limitů četnosti požadavků. Stejný problém nastane, pokud služba Let's Encrypt nebude z jakéhokoli důvodu dostupná ve chvíli, kdy budete potřebovat spustit frontendové servery.

Některé koncepce nasazení vyžadují, aby kryptografické klíče nikdy neopustily fyzický počítač, na kterém byly vygenerovány. Tento model může s Let's Encrypt dobře fungovat, pokud zajistíte dlouhou životnost počítačů i jejich dat a budete pečlivě hlídat limity četnosti požadavků.

# Volba typu výzvy

Pokud používáte výzvu ACME http-01, musíte odpověď na výzvu umístit na všechny frontendové servery ještě předtím, než službě Let's Encrypt oznámíte, že jste připraveni výzvu splnit. U velkého počtu frontendových serverů to může být obtížné. V takovém případě bude pravděpodobně snazší použít výzvu dns-01. Pokud ovšem máte mnoho geograficky rozmístěných serverů DNS, musíte zajistit, aby byl záznam TXT dostupný na každém z nich.

Při používání výzvy dns-01 také nezapomeňte odstraňovat staré záznamy TXT, aby odpověď na dotaz služby Let's Encrypt nebyla příliš velká.

Pokud přesto chcete použít výzvu http-01, můžete využít přesměrování HTTP. Každý frontendový server můžete nastavit tak, aby pro všechna `XYZ` přesměroval adresu `/.well-known/acme-challenge/XYZ` na `validation-server.example.com/XYZ`. Odpovědnost za vydávání certifikátů tím převedete na `validation-server`, proto tento server důkladně zabezpečte.

# Centrální validační servery

V souvislosti s předchozími dvěma body může být při velkém počtu frontendových serverů vhodné spravovat vydávání certifikátů jen na menší skupině serverů. Usnadní se tím používání přesměrování při ověřování http-01 a vznikne místo pro trvalé ukládání certifikátů a klíčů.

# Konfigurace firewallu

Chcete-li používat Let's Encrypt, musíte na počítačích s klientem ACME povolit odchozí provoz na portu 443. Rozsahy IP adres naší služby ACME nezveřejňujeme a mohou se bez upozornění změnit.

Pro výzvu ACME „http-01“ musíte povolit příchozí provoz na portu 80. Rozsahy IP adres, ze kterých provádíme ověřování, nezveřejňujeme a mohou se bez upozornění změnit.

Poznámka: Doporučujeme vždy povolit nešifrovaný přístup HTTP k webovému serveru a přesměrovat jej na HTTPS. Ve srovnání s webovým serverem, který odmítá nebo zahazuje připojení na portu 80, to uživatelům přináší lepší prostředí při stejné úrovni zabezpečení.

U všech výzev musíte na autoritativních serverech DNS povolit příchozí provoz na portu 53 (TCP i UDP).

# Podporované algoritmy klíčů

Let's Encrypt přijímá klíče RSA o délce 2048, 3072 nebo 4096 bitů a klíče ECDSA P-256 nebo P-384. Platí to pro klíče účtů i klíče certifikátů. Klíč účtu nelze znovu použít jako klíč certifikátu.

Doporučujeme používat konfiguraci se dvěma certifikáty: ve výchozím nastavení nabízet certifikát RSA a klientům, kteří oznámí jeho podporu, poskytovat také výrazně menší certifikát ECDSA.

# HTTPS ve výchozím nastavení

Poskytovatelům hostingu doporučujeme automaticky vydávat certifikáty a konfigurovat HTTPS pro všechny názvy hostitelů, které mají pod kontrolou. Uživatelé by zároveň měli mít možnost nastavit, zda se mají adresy HTTP přesměrovávat na odpovídající adresy HTTPS. U stávajících účtů doporučujeme toto nastavení ve výchozím stavu vypnout, u nových účtů naopak zapnout.

Důvod: Stávající weby pravděpodobně obsahují některé dílčí prostředky načítané přes HTTP, například skripty, soubory CSS nebo obrázky. Pokud budou tyto weby automaticky přesměrovány na verze HTTPS, prohlížeče některé z těchto prostředků zablokují kvůli blokování smíšeného obsahu. To může narušit fungování webu. Kdo však vytvoří nový web a zjistí, že se přesměrovává na HTTPS, bude pravděpodobně používat pouze prostředky načítané přes HTTPS. Kdyby se pokusil vložit prostředek přes HTTP, okamžitě by zjistil, že nefunguje.

Doporučujeme umožnit zákazníkům nastavit hlavičku HTTP Strict-Transport-Security (HSTS) s výchozí hodnotou max-age šedesát dní. Toto nastavení by však mělo doprovázet upozornění, že pokud zákazník bude potřebovat přejít k poskytovateli hostingu bez podpory HTTPS, nastavení HSTS uložené v mezipaměti prohlížečů jeho web znepřístupní. Zákazník i poskytovatel hostingu by si také měli uvědomit, že hlavička HSTS změní chyby certifikátu na nepřekonatelné chyby. Uživatelé mohou například obvykle obejít upozornění prohlížeče na neshodu názvu nebo prošlý certifikát. U názvů hostitelů s aktivní hlavičkou HSTS však prohlížeče takové pokračování nepovolují.

# Kdy certifikáty obnovovat

Doporučujeme nejméně dvakrát denně [kontrolovat informace ACME o obnovení (ARI)](https://letsencrypt.org/2024/04/25/guide-to-integrating-ari-into-existing-acme-clients/) každého certifikátu. Endpoint ARI doporučí vhodný čas k obnovení.

Jako záložní řešení pro případ nedostupnosti ARI doporučujeme certifikáty automaticky obnovovat ve chvíli, kdy jim zbývá třetina celkové doby platnosti. Certifikáty s dobou platnosti kratší než 10 dní doporučujeme obnovovat v polovině jejich celkové doby platnosti. U současných certifikátů Let's Encrypt s platností 90 dní to znamená obnovu 30 dní před skončením platnosti.

Pokud vydáváte certifikáty pro více než 10 000 názvů hostitelů, doporučujeme také automatické obnovování v malých dávkách, nikoli hromadné obnovování ve velkých blocích. Snižuje se tím riziko: pokud bude mít Let's Encrypt výpadek právě ve chvíli, kdy potřebujete certifikáty obnovit, nebo dočasně selže váš systém obnovování, ovlivní to jen několik certifikátů, nikoli všechny. Nám to navíc usnadňuje plánování kapacity.

Na začátku můžete certifikáty pro všechny domény vydat hromadně, abyste celý proces urychlili. Časy obnovení pak můžete rozložit jednorázovým obnovením některých certifikátů o 1 den dříve než obvykle, jiných o 2 dny dříve a tak dále.

Pokud nabízíte klientský software, který automaticky nastavuje pravidelnou dávkovou úlohu, spouštějte ji v náhodně zvolenou sekundu dne, nikoli vždy v konkrétní čas. Let's Encrypt díky tomu nebude na začátku každé hodiny nebo minuty čelit náhodným špičkám provozu. Let's Encrypt musí zajistit kapacitu odpovídající špičkovému zatížení, takže omezení výkyvů provozu nám pomáhá držet náklady pod kontrolou.

# Opakování neúspěšných pokusů

Neúspěšné obnovení by nemělo být považováno za kritickou chybu. Ve službách pro vydávání certifikátů implementujte šetrnou logiku opakování s exponenciálním prodlužováním intervalů, nejvýše však jednou denně pro každý certifikát. Vhodný plán může vypadat například takto: 1. opakování po jedné minutě, 2. po deseti minutách, třetí po 100 minutách a 4. i každé další po jednom dni. Správci by samozřejmě měli mít možnost vyžádat si dřívější opakování pro konkrétní doménu i pro všechny domény.

Prodlužování intervalů mezi pokusy znamená, že software pro vydávání certifikátů musí zaznamenávat neúspěchy stejně jako úspěchy a před novým pokusem zkontrolovat, zda nedávno nedošlo k chybě. Nemá smysl pokoušet se o vydání stokrát za hodinu, protože opakované chyby budou pravděpodobně přetrvávat.

Všechny chyby je třeba hlásit odpovědnému správci, aby mohl zjistit, zda je nutné odstranit konkrétní problémy.
