---
title: Autorizace certifikační autority (CAA)
slug: caa
lastmod: 2023-08-16
show_lastmod: 1
---


CAA je typ záznamu DNS, který vlastníkům webů umožňuje určit, které certifikační autority (CA) smějí vydávat certifikáty obsahující jejich názvy domén. Poprvé byl standardizován v roce 2013. Verzi, kterou používáme dnes, standardizovaly v roce 2019 dokumenty [RFC 8659](https://datatracker.ietf.org/doc/html/rfc8659) a [RFC 8657](https://datatracker.ietf.org/doc/html/rfc8657). Ve výchozím nastavení smí každá veřejná certifikační autorita vydat certifikát pro libovolný název domény ve veřejném systému DNS, pokud ověří, kdo má daný název domény pod kontrolou. To znamená, že chyba v procesu ověřování kterékoli z mnoha veřejných certifikačních autorit může potenciálně ovlivnit každý název domény. CAA umožňuje držitelům domén toto riziko snížit.

# Používání CAA

Pokud CAA používat nechcete, zpravidla nemusíte nic dělat. Přečtěte si však níže uvedenou část o chybách CAA. Chcete-li pomocí CAA omezit certifikační autority, které smějí vydávat certifikáty pro vaši doménu, potřebujete poskytovatele DNS podporujícího nastavení záznamů CAA. Seznam takových poskytovatelů najdete na [stránce CAA služby SSLMate](https://sslmate.com/caa/support). Pokud je váš poskytovatel v seznamu, můžete pomocí [generátoru záznamů CAA služby SSLMate](https://sslmate.com/caa/) vytvořit sadu záznamů CAA se seznamem povolených certifikačních autorit.

## Kam záznam umístit

Záznamy CAA se obvykle nastavují na registrované doméně, například „example.org“ nebo „mysite.co.uk“. Budou se tak vztahovat na tuto doménu i všechny její subdomény, například „community.example.org“.

Certifikační autorita vždy respektuje záznam CAA, který je *nejblíže* názvu domény, pro nějž certifikát vydává. Při žádosti o certifikát pro „www.community.example.org“ proto certifikační autorita postupně zkontroluje „www.community.example.org“, „community.example.org“ a „example.org“ a zastaví se u prvního nalezeného záznamu CAA.

Nastavení CAA tedy můžete pro jednotlivé subdomény přepsat. Předpokládejme například, že doménu „example.org“ hostujete sami, ale „api.example.org“ provozujete u poskytovatele cloudu. Pomocí záznamu CAA na „example.org“ můžete povolit vydávání certifikátů pro tuto doménu a všechny její subdomény pouze službě Let's Encrypt. Záznamem CAA na „api.example.org“ však toto nastavení přepíšete a povolíte poskytovateli cloudu vydávat certifikáty pro danou subdoménu.

Kontrola CAA stejně jako všechny ostatní požadavky DNS následuje přesměrování CNAME. Pokud je „community.example.org“ záznamem CNAME odkazujícím na „example.forum.com“, certifikační autorita bude respektovat záznamy CAA nastavené na „example.forum.com“. Název domény se záznamem CNAME nesmí mít žádné další záznamy, takže mezi záznamy CAA původního názvu a záznamy CAA cíle přesměrování nemůže dojít ke konfliktu.

## Co do záznamu uvést

Všechny záznamy CAA používají stejný základní formát:

```
CAA <flags> <tag> <value>
```

Pole **flags** je celé číslo. Téměř vždy by mělo obsahovat hodnotu `0`, která označuje, že nejsou nastaveny žádné příznaky. Příznaky můžete nastavit také na celé číslo `128`. To znamená, že je nastaven „kritický bit“ a certifikační autority musí vydávání okamžitě zastavit, pokud nerozpoznají obsah pole tag.

Pole **tag** je řetězec určující typ záznamu CAA, ve většině případů `issue` nebo `issuewild`. Podrobněji je popisujeme níže.

Pole **value** je řetězec obsahující nejvýše jeden identifikátor certifikační autority, například „letsencrypt.org“, a volitelné parametry oddělené středníky, které rovněž popisujeme níže.

### Vlastnosti `issue` a `issuewild`

Záznamy s tagem `issue` určují, zda smí certifikační autorita vydávat certifikáty pro tuto doménu a její subdomény. Obvykle jde o jediný potřebný záznam. Pokud neexistují jiné záznamy, řídí vydávání běžných certifikátů, například pro „example.org“, i zástupných certifikátů, například pro „*.example.org“. Certifikační autoritu oprávněnou vydávat certifikáty pro doménu určíte uvedením jejího identifikačního názvu domény v části value záznamu CAA.

Záznamy s tagem `issuewild` určují, zda smí certifikační autorita vydávat *zástupné* certifikáty, například pro „*.example.org“. Záznamy `issuewild` potřebujete pouze tehdy, pokud chcete pro vydávání zástupných a běžných certifikátů nastavit odlišná oprávnění.

Můžete vytvořit více záznamů se stejným typem vlastnosti. Jejich účinek se *sčítá*: pokud vydávání dané certifikační autoritě povoluje kterýkoli z těchto záznamů, je povoleno.

Identifikační název domény Let's Encrypt pro CAA je `letsencrypt.org`. Oficiálně je uveden v [části 4.2.1 našich zásad CP/CPS](https://cps.letsencrypt.org/#4.2.1-performing-identification-and-authentication-functions).

### Parametr `validationmethods`

Tento parametr lze uvést za identifikačním názvem domény certifikační autority a určit jím metody, kterými smí autorita ověřit kontrolu nad doménou. Ověřování tak můžete omezit na metody, kterým více důvěřujete. Chcete-li například certifikační autoritě povolit pouze metodu TLS-ALPN-01, můžete k hodnotě záznamu CAA připojit `;validationmethods=tls-alpn-01`.

Let's Encrypt rozpoznává následující řetězce metod ověřování:

* `http-01`
* `dns-01`
* `tls-alpn-01`

### Parametr `accounturi`

Tento parametr lze uvést za identifikačním názvem domény certifikační autority a určit jím účty ACME, které smějí požádat o vydání certifikátu pro danou doménu. Můžete tak zabránit vydání podvodných certifikátů útočníkem, který dočasně ovládne vaši doménu, ale nemá přístup ke klíči vašeho účtu ACME.

Identifikátory URI účtů Let's Encrypt mají podobu `https://acme-v02.api.letsencrypt.org/acme/acct/1234567890`, kde číslice na konci představují ID vašeho účtu.

### Příklady

Jednoduchý záznam CAA, který povoluje službě Let's Encrypt vydávat certifikáty pro „example.org“, může vypadat takto:

```
example.org         CAA 0 issue "letsencrypt.org"
```

Složitější sada záznamů CAA může vypadat takto:

```
example.org         CAA 0 issue "myca.org;validationmethods=dns-01"
example.org         CAA 0 issuewild "myca.org"
example.org         CAA 128 issue "otherca.com;accounturi=https://otherca.com/acct/123456"
```

V tomto příkladu může MyCA vydávat certifikáty pro „example.org“, ale pouze pomocí metody ověřování DNS-01. Může také vydávat zástupné certifikáty libovolnou metodou ověřování. Certifikáty může vydávat také OtherCA, ale pouze tehdy, když požadavek pochází z účtu číslo `123456` a OtherCA rozpoznává omezení `accounturi` a umí je správně zpracovat.


# Chyby CAA

Protože Let's Encrypt kontroluje záznamy CAA před vydáním každého certifikátu, dochází někdy k chybám i u domén, které žádné záznamy CAA nenastavily. Při chybě nelze zjistit, zda smíme pro dotčenou doménu certifikát vydat. Mohou totiž existovat záznamy CAA, které vydání zakazují, ale kvůli chybě nejsou viditelné.

Pokud se setkáte s chybami souvisejícími s CAA, zkuste požadavek ještě několikrát odeslat do našeho [staging prostředí](/docs/staging-environment) a ověřte, zda jsou chyby dočasné, nebo trvalé. Pokud jsou trvalé, musíte problém nahlásit podpoře poskytovatele DNS nebo přejít k jinému poskytovateli. Pokud nevíte, kdo je vaším poskytovatelem DNS, zeptejte se poskytovatele hostingu.

Někteří poskytovatelé DNS, kteří CAA neznají, zpočátku na hlášení problémů odpovídají: „Záznamy CAA nepodporujeme.“ Poskytovatel DNS nemusí záznamy CAA výslovně podporovat. Na neznámé typy dotazů, včetně CAA, musí pouze odpovídat kódem NOERROR. Vrácení jiných operačních kódů, včetně NOTIMP, u nerozpoznaných typů dotazů je porušením [RFC 1035](https://tools.ietf.org/html/rfc1035) a musí být opraveno.

## SERVFAIL

Jednou z nejčastějších chyb je SERVFAIL. Nejčastěji označuje selhání ověření DNSSEC. Pokud se zobrazí chyba SERVFAIL, nejprve použijte ladicí nástroj DNSSEC, například [dnsviz.net](http://dnsviz.net/). Pokud to nepomůže, mohou vaše servery DNS vytvářet nesprávné podpisy pouze v případě, že je odpověď prázdná. Odpovědi CAA bývají nejčastěji prázdné.  Tuto chybu měl například PowerDNS [ve verzi 4.0.3 a starších](https://community.letsencrypt.org/t/caa-servfail-changes/38298/2?u=jsha).

Pokud nemáte zapnuté DNSSEC a zobrazí se chyba SERVFAIL, druhou nejpravděpodobnější příčinou je, že autoritativní server DNS vrátil kód NOTIMP. Jak je popsáno výše, jde o porušení RFC 1035. Server by měl namísto něj vrátit kód NOERROR s prázdnou odpovědí. V takovém případě nahlaste chybu nebo odešlete požadavek podpoře poskytovatele DNS.

Chyby SERVFAIL mohou být způsobeny také výpadky autoritativních serverů DNS. Zkontrolujte záznamy NS svých serverů DNS a ověřte, zda jsou všechny servery dostupné.

## Vypršení časového limitu

U dotazů CAA někdy vyprší časový limit. To znamená, že autoritativní server DNS vůbec neodpoví, a to ani po několika opakovaných pokusech. Nejčastější příčinou je nesprávně nakonfigurovaný firewall před serverem DNS, který zahazuje dotazy neznámého typu. Odešlete požadavek podpoře poskytovatele DNS a zeptejte se, zda takový firewall používá.
