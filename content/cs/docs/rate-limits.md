---
title: Limity četnosti požadavků
slug: rate-limits
lastmod: 2026-08-05
show_lastmod: true
---

Let's Encrypt používá limity četnosti požadavků, aby mohlo službu spravedlivě využívat co nejvíce lidí. Jsme přesvědčeni, že výchozí hodnoty těchto limitů vyhovují většině uživatelů. Limity jsme také navrhli tak, aby se při obnovení certifikátu téměř nikdy nepřekročily a aby velké organizace mohly postupně zvyšovat počet vydávaných certifikátů bez zásahu Let's Encrypt.

Pokud právě vyvíjíte nebo testujete klienta Let's Encrypt, používejte místo produkčního rozhraní API naše [staging prostředí](/docs/staging-environment). Pokud integrujete Let's Encrypt jako poskytovatel služby nebo pro velký web, přečtěte si naši [příručku k integraci](/docs/integration-guide).

# Jak fungují limity četnosti požadavků

Limity se pro každý požadavek počítají pomocí algoritmu [token bucket](https://en.wikipedia.org/wiki/Token_bucket). Tento přístup umožňuje přidělené požadavky využívat flexibilně. Požadavky můžete odeslat naráz až do výše celého limitu, nebo je rozložit v čase a snížit tak riziko jeho překročení.

Překročený limit neumíme dočasně vynulovat. Kapacita limitu se však postupně sama doplňuje, takže bez dalšího zásahu budete moci odesílat další požadavky. Zneplatněním certifikátů se limity **nevynulují**, protože prostředky potřebné k jejich vydání už byly spotřebovány. Další informace najdete v oddílu [Opakování požadavku po překročení limitů četnosti požadavků](#opakování-požadavku-po-překročení-limitů-četnosti-požadavků).

# Limity registrace účtů

Následující limity platí, když odběratelé žádají o nový účet prostřednictvím endpointu API new-account. K překročení těchto limitů dochází jen velmi zřídka. Velkým integrátorům doporučujeme řešení, které [používá jeden účet pro více zákazníků](/docs/integration-guide).

<div class="boxed">

## Nové registrace na IP adresu

Z jedné IP adresy lze vytvořit až 10 účtů každé 3 hodiny. Kapacita pro vytváření nových účtů se doplňuje rychlostí 1 účet za 18 minut.

### Výjimky

Pro tento limit **neposkytujeme** výjimky.

</div>
<div class="boxed">

## Nové registrace na rozsah IPv6

Až 500 účtů lze z jedné podsítě /48 IPv6 vytvořit každé 3 hodiny.
Kapacita pro vytváření nových účtů se doplňuje rychlostí 1 účet za 22 sekund.

### Výjimky

Pro tento limit **neposkytujeme** výjimky.

</div>

# Limity vydávání certifikátů

Následující limity platí, když odběratelé žádají o nový certifikát prostřednictvím endpointu API `new-order`. K překročení těchto limitů dochází častěji, zejména u velkých poskytovatelů hostingu nebo organizací, které vydávají certifikáty pro mnoho názvů hostitelů.

<div class="boxed">

## Nové objednávky na účet

Při každé žádosti o certifikát od Let's Encrypt vznikne nová objednávka.
Jeden certifikát může obsahovat až 100 identifikátorů (názvů DNS nebo IP adres) v závislosti na zvoleném [profilu certifikátu](/docs/profiles/). Kvůli výkonu je lepší používat méně identifikátorů na certifikát, kdykoliv je to možné.

### Limit

Jeden účet může vytvořit až 300 nových objednávek každé 3 hodiny. Kapacita pro vytváření nových objednávek se doplňuje rychlostí 1 objednávka za 36 sekund.

### Výjimky

Chcete-li tento limit překročit, musíte [požádat o jeho navýšení](https://isrg.formstack.com/forms/rate_limit_adjustment_request) pro konkrétní účet.

</div>
<div class="boxed">

## Nové certifikáty na registrovanou doménu

Registrovaná doména je obecně ta část domény, kterou jste zakoupili od registrátora doménových jmen. Například u názvu `www.example.com` je registrovanou doménou `example.com`. U názvu `new.blog.example.co.uk` je registrovanou doménou `example.co.uk`. Registrované domény určujeme podle [seznamu Public Suffix List](https://publicsuffix.org/).

Pokud žádáte o certifikát pro IP adresu, snažíme se za „registrovanou doménu“ považovat také nejběžnější přidělovaný rozsah, který obvykle získáte od poskytovatele připojení nebo hostingu. U adres IPv4 považujeme za registrovanou doménu konkrétní adresu. U adres IPv6 považujeme za registrovanou doménu rozsah /64, do kterého adresa patří.

Seznam certifikátů vydaných pro vaši registrovanou doménu najdete pomocí služeb [crt.sh](https://crt.sh/) nebo [Censys](https://search.censys.io/#), které využívají veřejné logy [transparentnosti certifikátů](https://www.certificate-transparency.org/).

### Limit

Až 50 certifikátů lze pro jednu registrovanou doménu (nebo adresu IPv4 či rozsah IPv6 /64) vydat každých 7 dní. Jde o globální limit, do kterého se započítávají všechny nové objednávky bez ohledu na účet, ze kterého byly odeslány.
Kapacita pro vydávání nových certifikátů pro stejnou registrovanou doménu se doplňuje rychlostí 1 certifikát za 202 minut.

### Výjimky

Chcete-li tento limit překročit, musíte [požádat o jeho navýšení](https://isrg.formstack.com/forms/rate_limit_adjustment_request) pro konkrétní registrovanou doménu nebo účet.

</div>
<div class="boxed">

## Nové certifikáty pro přesnou sadu identifikátorů

Pokud požádáte o certifikát pro `192.168.1.1`, `example.com` a `login.example.com`, bude „přesnou sadou identifikátorů“ `[192.168.1.1,
example.com, login.example.com]`. Pokud požádáte o certifikát pouze pro 1 identifikátor, například `example.co.uk`, bude přesnou sadou identifikátorů `[example.co.uk]`.

### Limit

Pro naprosto stejnou sadu identifikátorů lze vydat až 5 certifikátů každých 7 dní. Jde o globální limit, do kterého se započítávají všechny nové objednávky bez ohledu na účet, ze kterého byly odeslány. Kapacita pro žádosti o nové certifikáty se stejnou přesnou sadou identifikátorů se doplňuje rychlostí 1 certifikát za 34 hodin.

### Časté příčiny

Tento limit často překročíte při opakované přeinstalaci klienta během řešení neznámé chyby nebo při mazání konfiguračních dat klienta ACME při každém nasazení aplikace. Limit jsme záměrně nastavili poměrně nízko, aby systémy s chybami nebo vyvíjený software rychle nevyčerpaly kapacitu ostatních limitů.

Při testování nebo řešení potíží doporučujeme nastavit klienta na naše [staging prostředí](/docs/staging-environment), které má [výrazně vyšší](/docs/staging-environment/#limity-četnosti-požadavků) limity.

### Náhradní řešení

Pokud jste tento limit překročili, můžete sadu identifikátorů změnit například přidáním `blog.example.com` a požádat o další certifikáty. Tyto nové objednávky se však nebudou považovat za obnovení. Budou se na ně proto vztahovat limity [Nové objednávky na účet](#nové-objednávky-na-účet) a [Nové certifikáty na registrovanou doménu](#nové-certifikáty-na-registrovanou-doménu).

### Výjimky

Pro tento limit **neposkytujeme** výjimky.

</div>
<div class="boxed">

## Neúspěšné autorizace na identifikátor a účet

Pro každý identifikátor (název DNS nebo IP adresu) v objednávce se vytvoří autorizace. Před vydáním certifikátu musí být úspěšně ověřeny všechny autorizace v objednávce. Neúspěšná autorizace znamená, že požadavky na ověření byly úspěšně odeslány, ale všechny pokusy Let's Encrypt ověřit kontrolu nad identifikátorem selhaly.

### Limit

Jeden účet může každou hodinu zaznamenat až 5 neúspěšných autorizací na identifikátor. Kapacita pro neúspěšné autorizace se doplňuje rychlostí 1 neúspěšná autorizace na identifikátor za 12 minut. Po překročení limitu nemůže stejný účet až do jeho obnovení vytvářet nové objednávky pro stejný identifikátor.

### Časté příčiny

Než začnete řešit potíže, doporučujeme nastavit klienta na naše [staging prostředí](/docs/staging-environment). Toto prostředí má [výrazně vyšší](/docs/staging-environment/#limity-četnosti-požadavků) limity, takže můžete problémy najít a vyřešit bez čerpání produkčních limitů.

- Selhání ověření metodami `HTTP-01` a `TLS-ALPN-01` obvykle způsobuje nastavení sítě nebo firewallu, které ověřovacím serverům Let's Encrypt brání v přístupu k vašemu serveru.

- Selhání ověření metodou `DNS-01` často způsobují vynechané kroky nebo překlepy při počátečním nastavení. Tato metoda ověření obvykle vyžaduje vytvoření záznamu CNAME v hlavní zóně DNS, aby mohl klient během ověřování nastavit potřebné záznamy DNS.

### Výjimky

Pro tento limit **neposkytujeme** výjimky.

</div>
<div class="boxed">

## Po sobě jdoucí neúspěšné autorizace na identifikátor a účet

Tento limit se podobá limitu [Neúspěšné autorizace na identifikátor a účet](#neúspěšné-autorizace-na-identifikátor-a-účet), ale vztahuje se pouze na po sobě jdoucí selhání. Má zabránit tomu, aby klienti natrvalo uvízli ve smyčce neúspěšných ověření.

### Limit

Jeden účet může zaznamenat až 1 152 po sobě jdoucích neúspěšných autorizací na identifikátor. Kapacita pro neúspěšné autorizace se doplňuje rychlostí 1 neúspěšná autorizace na identifikátor za den. Po úspěšném ověření autorizace daného identifikátoru se počítadlo vynuluje. Po překročení limitu nemůže účet žádat o nové certifikáty pro daný identifikátor. Při každém pokusu požádat o certifikát obdrží odběratel chybu s odkazem na náš samoobslužný portál. V něm může obnovit vydávání pro pozastavený identifikátor a až 49 999 dalších pozastavených identifikátorů spojených s účtem.

| Počet selhání za den | Doba do pozastavení                         |
| -------------------- | ------------------------------------------- |
| 1                    | ∞ (nikdy se nepozastaví) |
| 2                    | 1 152 dní (3,16 roku)    |
| 5                    | 288 dní (9,46 měsíce)    |
| 10                   | 128 dní (4,21 měsíce)    |
| 15                   | 82 dní (2,70 měsíce)     |
| 20                   | 61 dní (1,99 měsíce)     |
| 30                   | 40 dní                                      |
| 40                   | 30 dní                                      |
| 120                  | 10 dní                                      |

### Časté příčiny

Než začnete řešit potíže, doporučujeme nastavit klienta na naše [staging prostředí](/docs/staging-environment). Toto prostředí má [výrazně vyšší](/docs/staging-environment/#limity-četnosti-požadavků) limity, takže můžete problémy najít a vyřešit bez čerpání produkčních limitů.

- Selhání ověření metodami `HTTP-01` a `TLS-ALPN-01` obvykle způsobuje nastavení sítě nebo firewallu, které ověřovacím serverům Let's Encrypt brání v přístupu k vašemu serveru.

- Selhání ověření metodou `DNS-01` často způsobují vynechané kroky nebo překlepy při počátečním nastavení. Tato metoda ověření obvykle vyžaduje vytvoření záznamu CNAME v hlavní zóně DNS, aby mohl klient během ověřování nastavit potřebné záznamy DNS.

### Výjimky

Pro tento limit **neposkytujeme** výjimky.

</div>

# Celkový limit požadavků

Vedle limitů [registrace účtů](#limity-registrace-účtů) a [vydávání certifikátů](#limity-vydávání-certifikátů) platí pro jednotlivé endpointy také celkové limity požadavků na IP adresu. Tyto limity vynucují naše nástroje pro vyrovnávání zátěže. Chrání rozhraní API protokolu ACME před zahlcením klienty, kteří odesílají příliš mnoho požadavků současně.

| Endpoint           | Počet požadavků na IP adresu (za sekundu) | Nárazová kapacita |
| ------------------ | ------------------------------------------------------------ | ----------------- |
| /acme/new-nonce    | 20                                                           | 10                |
| /acme/new-account  | 5                                                            | 15                |
| /acme/new-order    | 300                                                          | 200               |
| /acme/revoke-cert  | 10                                                           | 100               |
| /acme/renewal-info | 1000                                                         | 100               |
| /acme/\*           | 250                                                          | 125               |
| /directory         | 40                                                           | 40                |

Odběratelé, kteří tyto limity překročí, obdrží kód odpovědi HTTP `503 Service Unavailable`. Odpověď bude obsahovat hlavičku `Retry-After`.

# Výjimky z limitů pro obnovení

Let's Encrypt rozpoznává novou objednávku certifikátu jako „obnovení“ dvěma způsoby. Upřednostňovaná metoda používá ACME Renewal Info (ARI) a nepodléhá žádným limitům četnosti požadavků. Druhá metoda vychází ze starší logiky, která za obnovení považuje objednávky s naprosto stejnou sadou identifikátorů; na ty se však některé limity stále vztahují.

## Obnovení pomocí ARI

Jedinečnou výhodou obnovení koordinovaných pomocí ARI je, že nepodléhají žádným limitům četnosti požadavků. Klienti s podporou ARI se pravidelně dotazují serverů Let's Encrypt, zda je třeba stávající certifikát obnovit. Jakmile nastane optimální období pro obnovení, klient vytvoří novou objednávku a výslovně uvede certifikát, který nahrazuje. Pokud nová objednávka obsahuje alespoň jeden identifikátor shodný s nahrazovaným certifikátem a tento certifikát dosud nebyl nahrazen pomocí ARI, nebudou se na objednávku vztahovat žádné limity četnosti požadavků.

## Obnovení bez ARI

Pokud klient nebo poskytovatel hostingu zatím nepodporuje ARI, může se objednávka přesto považovat za obnovení dřívějšího certifikátu, pokud obsahuje naprosto stejnou sadu identifikátorů. Na velikosti písmen ani pořadí identifikátorů nezáleží. Pokud jste například požádali o certifikát pro identifikátory `[192.168.1.1, www.example.com, example.com]`, můžete požádat o další čtyři certifikáty pro `[192.168.1.1, www.example.com, example.com]`, než překročíte limit [Nové certifikáty pro přesnou sadu identifikátorů](#nové-certifikáty-pro-přesnou-sadu-identifikátorů). Každá z těchto nových objednávek se bude považovat za obnovení a nebude podléhat limitům [Nové objednávky na účet](#nové-objednávky-na-účet) a [Nové certifikáty na registrovanou doménu](#nové-certifikáty-na-registrovanou-doménu).
Na rozdíl od obnovení pomocí ARI se však na tyto objednávky budou vztahovat limity [Neúspěšné autorizace na identifikátor a účet](#neúspěšné-autorizace-na-identifikátor-a-účet) a [Nové certifikáty pro přesnou sadu identifikátorů](#nové-certifikáty-pro-přesnou-sadu-identifikátorů).

# Opakování požadavku po překročení limitů četnosti požadavků

Všechna chybová hlášení o limitech četnosti požadavků mají stejný formát. Příklad:

```
too many new registrations (10) from this IP address in the last 3h0m0s,
retry after 1970-01-01 00:18:15 UTC.
```

Po uvedeném datu a čase by mělo být možné stejný požadavek úspěšně zopakovat. Pokud požadavek překročí kapacitu více limitů, vrátíme vždy chybové hlášení limitu, který se obnoví nejpozději.

## Hlavička Retry-After

Ve všech chybových odpovědích souvisejících s limity uvádíme hlavičku `Retry-After`, která určuje, jak dlouho má klient před dalším pokusem čekat.

# Žádost o navýšení limitu

Velcí poskytovatelé hostingu a organizace, které integrují Let's Encrypt, mohou o vyšší limity požádat prostřednictvím [formuláře pro navýšení limitů](https://isrg.formstack.com/forms/rate_limit_adjustment_request). Vyřízení žádosti trvá několik týdnů. Formulář proto není vhodný, pokud potřebujete limit pouze vynulovat dříve, než se sám obnoví.
