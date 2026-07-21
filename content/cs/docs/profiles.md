---
title: Profily
slug: profiles
lastmod: 2026-07-14
show_lastmod: false
---

Profil tvoří soubor vlastností, které určují požadovaný postup validace i konečný obsah certifikátu. Naprostá většina odběratelů Let's Encrypt se o profily nemusí starat: nejlepší profil vybíráme automaticky a dbáme na to, aby splňoval všechny požadavky a osvědčené postupy Web PKI. Někteří uživatelé si však mohou chtít konkrétní profil zvolit sami. Na této stránce najdou informace potřebné k rozhodnutí.

# Naše profily

U každého profilu popisujeme, jak ovlivňuje postup validace a obsah vydaného certifikátu. Ne všechny profily jsou dostupné ve všech prostředích. Některé mohou být k dispozici jen v staging prostředí nebo jen v produkčním prostředí; jiné mohou být (dočasně) dostupné pouze uživatelům ze seznamu povolených, abychom je mohli zavádět postupně. Směrodatný seznam profilů uvádí endpoint `directory` serveru ACME.

Podrobné definice vlastností uvedených u jednotlivých profilů najdete na konci stránky.

<div class="boxed">

## classic

Profil classic se použije automaticky u všech objednávek, které výslovně nepožadují jiný profil. Postup validace i výsledný certifikát odpovídají tomu, na co jsou uživatelé Let's Encrypt z posledních let zvyklí. Tento profil doporučujeme odběratelům, kteří raději nechají novinky nejprve vyzkoušet ostatní.

| Vlastnost                                                                                         | Hodnota                                    |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [Doba platnosti čekající autorizace](#doba-platnosti-čekající-autorizace)                         | 7 dní                                      |
| [Doba opětovného použití autorizace](#doba-opětovného-použití-autorizace)                         | 30 dní                                     |
| [Doba platnosti objednávky](#doba-platnosti-objednávky)                                           | 7 dní                                      |
| [Pole Common Name v certifikátu](#pole-common-name-v-certifikátu)                                 | <a href="#footnote-1">Ano<sup>\*</sup></a> |
| [Příznak Key Encipherment v rozšíření Key Usage](#příznak-key-encipherment-v-rozšíření-key-usage) | <a href="#footnote-2">Ano<sup>†</sup></a>  |
| [Rozšíření Subject Key Identifier](#rozšíření-subject-key-identifier)                             | Ano                                        |
| [Doba platnosti](#doba-platnosti)                                                                 | 90 dní                                     |
| [Informace o odvolání](#informace-o-odvolání)                                                     | CRL                                        |
| [Maximální počet názvů](#maximální-počet-názvů)                                                   | 100                                        |
| [Typy identifikátorů](#typy-identifikátorů)                                                       | DNS                                        |

<sup id="footnote-1">\*</sup>: Pokud CSR odeslaný při finalizaci požaduje konkrétní hodnotu Common Name odpovídající alternativnímu názvu subjektu typu dNSName, požadavek respektujeme. Pokud CSR konkrétní Common Name nepožaduje, použije se jako Subject Common Name první požadovaný alternativní název subjektu typu dNSName. Pokud se požadovaný název nebo název, který by se měl použít, nevejde do pole Common Name (má 64 nebo více znaků), zůstane Common Name prázdné.

<sup id="footnote-2">†</sup>: Pouze u certifikátů s veřejným klíčem RSA.

</div>
<div class="boxed">

## tlsserver

Profil tlsserver aktualizuje několik vlastností validace i certifikátu podle nejnovějších doporučení v Baseline Requirements fóra CA/Browser Forum a podle obecného vývoje v komunitě Web PKI. Tento profil doporučujeme odběratelům, kteří chtějí menší certifikáty a mají celý proces plně automatizovaný.

Aby profil ještě více podporoval automatizaci, zkrátila se doba platnosti čekající autorizace. Plně automatizovaný systém zvládne validační výzvu během několika sekund, takže jedna hodina je více než dostatečná. Doba pro opětovné použití autorizace byla zkrácena na sedm hodin. Baseline Requirements totiž vyžadují po osmi hodinách znovu zkontrolovat autorizaci certifikační autority (CAA). Kratší doba pro opětovné použití proto odstraňuje potřebu těchto opakovaných kontrol. Doba platnosti objednávky byla zkrácena na součet dob platnosti dvou autorizací. Delší platnost objednávky by neměla smysl, protože objednávka na příslušných autorizacích závisí.

Vydaný certifikát neobsahuje pole Common Name. Je duplicitní k alternativním názvům subjektu (SAN) a Baseline Requirements jeho použití označují jako NOT RECOMMENDED. Příznak Key Encipherment se v rozšíření Key Usage neuvádí. Je potřebný jen u sad šifer TLS bez dopředného utajení (forward secrecy), které všechny hlavní prohlížeče kvůli významu této vlastnosti přestaly podporovat. Certifikát neobsahuje rozšíření Subject Key ID, protože u certifikátů koncových subjektů nemá význam a Baseline Requirements je označují jako NOT RECOMMENDED. Výsledný certifikát má nakonec platnost jen 45 dní. Připravujeme se tak na chystané omezení, podle kterého budou moci mít všechny certifikáty platnost nejvýše 47 dní.

| Vlastnost                                                                                         | Hodnota  |
| ------------------------------------------------------------------------------------------------- | -------- |
| [Doba platnosti čekající autorizace](#doba-platnosti-čekající-autorizace)                         | 1 hodina |
| [Doba opětovného použití autorizace](#doba-opětovného-použití-autorizace)                         | 7 hodin  |
| [Doba platnosti objednávky](#doba-platnosti-objednávky)                                           | 8 hodin  |
| [Pole Common Name v certifikátu](#pole-common-name-v-certifikátu)                                 | Ne       |
| [Příznak Key Encipherment v rozšíření Key Usage](#příznak-key-encipherment-v-rozšíření-key-usage) | Ne       |
| [Rozšíření Subject Key Identifier](#rozšíření-subject-key-identifier)                             | Ne       |
| [Doba platnosti](#doba-platnosti)                                                                 | 45 dní   |
| [Informace o odvolání](#informace-o-odvolání)                                                     | CRL      |
| [Maximální počet názvů](#maximální-počet-názvů)                                                   | 25       |
| [Typy identifikátorů](#typy-identifikátorů)                                                       | DNS      |

</div>
<div class="boxed">

## shortlived

Profil shortlived se od profilu tlsserver liší jedinou podstatnou věcí: výsledný certifikát platí jen přibližně 6 dní. Díky tomu tyto certifikáty splňují definici „Short-Lived Subscriber Certificates“ v Baseline Requirements a nemusí obsahovat informace o odvolání. Certifikáty tak mohou být ještě menší a klient nemůže omylem důvěřovat certifikátu, který už byl odvolán. V současnosti tyto certifikáty stále obsahují adresu URL seznamu CRL, jak ukazuje tabulka níže. [V budoucnu se to však může změnit](https://github.com/letsencrypt/boulder/issues/7673).

Tento profil doporučujeme jen uživatelům, kteří se mohou plně spolehnout, že jejich automatizace certifikáty včas obnoví. Tento profil není vhodný pro každého.

| Vlastnost                                                                                         | Hodnota   |
| ------------------------------------------------------------------------------------------------- | --------- |
| [Doba platnosti čekající autorizace](#doba-platnosti-čekající-autorizace)                         | 1 hodina  |
| [Doba opětovného použití autorizace](#doba-opětovného-použití-autorizace)                         | 7 hodin   |
| [Doba platnosti objednávky](#doba-platnosti-objednávky)                                           | 8 hodin   |
| [Pole Common Name v certifikátu](#pole-common-name-v-certifikátu)                                 | Ne        |
| [Příznak Key Encipherment v rozšíření Key Usage](#příznak-key-encipherment-v-rozšíření-key-usage) | Ne        |
| [Rozšíření Subject Key Identifier](#rozšíření-subject-key-identifier)                             | Ne        |
| [Doba platnosti](#doba-platnosti)                                                                 | 160 hodin |
| [Informace o odvolání](#informace-o-odvolání)                                                     | CRL       |
| [Maximální počet názvů](#maximální-počet-názvů)                                                   | 25        |
| [Typy identifikátorů](#typy-identifikátorů)                                                       | DNS, IP   |

</div>
<div class="boxed">

## tlsclient

Od 8. července 2026 již tento profil není dostupný.

Certifikáty vydané s profilem tlsclient obsahovaly rozšířené použití klíče (EKU) TLS Client Auth.
V ostatních ohledech byl profil shodný s profilem classic.

</div>

# Výběr profilu

Výběr profilu popisuje [tento návrh Internet-Draft](https://datatracker.ietf.org/doc/draft-aaron-acme-profiles/). Ve spolupráci s pracovní skupinou IETF ACME z něj chceme vytvořit řádné RFC. Tento návrh zatím nepodporují všichni klienti ACME. Klient, kterého používáte, proto ještě nemusí umět profil vybrat.

Chcete-li vybrat konkrétní profil, postupujte obecně takto:

1. V dokumentaci svého klienta ACME zjistěte, zda výběr profilu podporuje a jak v něm požadovaný profil zadat.
2. Načtěte objekt adresáře z [produkčního](https://acme-v02.api.letsencrypt.org/directory) nebo [testovacího](https://acme-staging-v02.api.letsencrypt.org/directory) prostředí Let's Encrypt a zjistěte, které profily jsou dostupné.
3. Nastavte požadovaný profil v klientovi ACME.

# Glosář

## Vlastnosti validace

Profily mohou ovlivnit následující vlastnosti validace.

### Doba platnosti čekající autorizace

Určuje, za jak dlouho musí klient ACME dokončit validační výzvu k ověření kontroly nad doménou. Lhůta začíná vytvořením objektu ACME Authorization (obvykle při vytvoření nové objednávky). Její konec udává časový údaj [`expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) v čekajícím objektu Authorization. Baseline Requirements omezují tuto dobu [nejvýše na 30 dní](https://github.com/cabforum/servercert/blob/main/docs/BR.md#322419-agreed-upon-change-to-website---acme).

### Doba opětovného použití autorizace

Určuje, jak dlouho lze již validovanou autorizaci znovu použít pro nové objednávky se stejným identifikátorem. Lhůta začíná úspěšným splněním výzvy. Její konec udává časový údaj [`expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.4) v platném objektu Authorization. [Baseline Requirements](https://github.com/cabforum/servercert/blob/main/docs/BR.md#421-performing-identification-and-authentication-functions) omezují tuto dobu na 200 dní; limit se snižuje na 100 dní pro certifikáty vydané od 15. března 2027 a na 10 dní od 15. března 2029.

### Doba platnosti objednávky

Určuje, kolik času má klient ACME na celý proces objednání nového certifikátu: vytvoření objednávky, dokončení všech čekajících autorizací a finalizaci objednávky. Lhůta začíná vytvořením nového objektu Order. Její konec udává časový údaj [`expires`](https://datatracker.ietf.org/doc/html/rfc8555#section-7.1.3) v tomto objektu.

## Vlastnosti certifikátu

Profily mohou ovlivnit následující vlastnosti certifikátu.

### Pole Common Name v certifikátu

Certifikáty TLS mohou obsahovat názvy (např. doménová jména nebo IP adresy) na dvou místech: v [poli Subject Common Name](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.6) a v [rozšíření Subject Alternative Name (SAN)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6). Pole Common Name bývalo nejběžnějším místem pro doménové jméno a dodnes ho zobrazuje mnoho nástrojů pro analýzu certifikátů. Do pole Common Name se však vejde jen jeden název, zatímco certifikát často potřebuje obsahovat více názvů (například `example.com`, `www.example.com` a `blog.example.com`). Pole Common Name je dnes z velké části nadbytečné: každý název v něm musí být _zároveň_ uveden v rozšíření Subject Alternative Name (SAN). Podle [Baseline Requirements je nyní uvedení tohoto pole v certifikátu NOT RECOMMENDED](https://github.com/cabforum/servercert/blob/main/docs/BR.md#71272-domain-validated).

### Příznak Key Encipherment v rozšíření Key Usage

Certifikáty TLS obsahují [rozšíření „Key Usage“](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.3), které určuje, k jakým kryptografickým operacím lze použít klíč obsažený v certifikátu. Všechny certifikáty Let's Encrypt obsahují příznak Digital Signature v rozšíření Key Usage (KU), který je nutný k navázání spojení TLS. Starší verze TLS vyžadovaly příznak Key Encipherment v rozšíření KU pro některé způsoby navazování spojení pomocí klíčů RSA. Dnes víme, že tyto operace nejsou bezpečné. Prohlížeče jejich podporu již před lety označily za zastaralou a odstranily ji. Podle [Baseline Requirements je nyní použití příznaku Key Encipherment NOT RECOMMENDED](https://github.com/cabforum/servercert/blob/main/docs/BR.md#712711-subscriber-certificate-key-usage).

### Rozšíření Subject Key Identifier

Certifikáty TLS mohou obsahovat [rozšíření „Subject Key Identifier“](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.2) s krátkým řetězcem, který jednoznačně identifikuje veřejný klíč v certifikátu. Pro certifikáty CA je toto rozšíření velmi důležité: prohlížeč díky němu rychle najde certifikát CA, která vydala certifikát koncového subjektu předložený webem. U certifikátů koncových subjektů však rozšíření nemá význam a Baseline Requirements jeho použití označují jako NOT RECOMMENDED.

### Doba platnosti

Určuje dobu mezi časovými údaji [`notBefore` a `notAfter`](https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5) uloženými v certifikátu TLS, tedy jak dlouho bude certifikát platný. [Baseline Requirements](https://github.com/cabforum/servercert/blob/main/docs/BR.md#632-certificate-operational-periods-and-key-pair-usage-periods) omezují tuto dobu na 200 dní; limit se snižuje na 100 dní pro certifikáty vydané od 15. března 2027 a na 47 dní od 15. března 2029.

### Informace o odvolání

Klienti TLS potřebují zjistit, zda byl certifikát odvolán. Web PKI k tomu používá tři mechanismy: protokol Online Certificate Status Protocol (OCSP), seznamy odvolaných certifikátů (CRL) a natolik krátkou dobu platnosti, že odvolání není nutné. Let's Encrypt nepodporuje OCSP. Toto pole udává, zda certifikáty vydané v daném profilu obsahují adresu URL seznamu CRL.

### Maximální počet názvů

Udává maximální počet [alternativních názvů subjektu (SAN)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6), které můžeme uvést v jednom certifikátu.

### Typy identifikátorů

Určuje, které typy [alternativních názvů subjektu (SAN)](https://datatracker.ietf.org/doc/html/rfc5280#section-4.2.1.6) (`dnsName` nebo `iPAddress`) smí certifikát obsahovat.
