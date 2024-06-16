---
title: Zásady ochrany osobních údajů
slug: privacy
lastmod: 2023-08-23
english_is_canonical: 1
show_lastmod: 1
---

Zásady ochrany osobních údajů společnosti Let's Encrypt popisují, jak shromažďujeme, používáme a zveřejňujeme vaše údaje ve třech různých kontextech:

- Když jako předávající strana navštívíte webovou stránku zabezpečenou protokolem HTTPS, která používá certifikát Let's Encrypt,
- Když jste odběratel, tj. když žádáte o certifikáty Let's Encrypt a používáte je,
- Když jste návštěvníkem webových stránek Let's Encrypt, komunitního diskusního fóra, dalších webových stránek pod letsencrypt.org a stránek sociálních médií třetích stran, na kterých Let's Encrypt provozuje účet.

Let's Encrypt je služba poskytovaná [Internet Security Research Group](https://www.abetterinternet.org/), neziskovou veřejně prospěšnou společností z Kalifornie ve Spojených státech.

## Předávající strana

Když používáte webovou stránku HTTPS nebo jinou službu TLS s certifikátem Let's Encrypt, může se váš prohlížeč (nebo klient TLS) dotázat společnosti Let's Encrypt, zda byl certifikát odvolán („požadavek OCSP“). Pokud váš prohlížeč zadá požadavek OCSP, naše servery automaticky zaznamenají vaši IP adresu, prohlížeč a operační systém do dočasných souborů protokolu serveru. Údaje z požadavků OCSP nepoužíváme k vytváření profilů ani k identifikaci osob. Dočasné protokoly serveru se používají pouze k provozním účelům a jsou obvykle do sedmi dnů smazány. Dílčí část serverových protokolů můžeme uchovávat po delší dobu, abychom mohli vyšetřit selhání softwaru nebo jeho zneužití. Pokud tak učiníme, po ukončení šetření všechny uložené protokoly odstraníme. Můžeme také vypočítávat, uchovávat a zveřejňovat souhrnné informace z protokolů serverů, například o tom, které certifikáty generují největší objem požadavků. Vždy se budeme snažit zajistit, aby tyto soubory dat neobsahovaly informace o aktivitách identifikovatelných uživatelů nebo zařízení.

## Odběratel

Pokud jste odběratel, žádáte společnost Let's Encrypt o důvěryhodný certifikát, který má veřejně zaručit, že ovládáte určité doménové jméno nebo jména, která jsou dostupná na internetu. V rámci procesu prokazování této kontroly bude Let's Encrypt shromažďovat různé informace týkající se ověřování a správy certifikátů. Tyto informace zahrnují IP adresy, ze kterých přistupujete ke službě Let's Encrypt, všechny adresy IP pro všechny požadované názvy domén, informace o serveru týkající se všech požadavků na ověření, úplné protokoly všech příchozích požadavků HTTP / ACME, všechny odchozí požadavky na ověření a informace odeslané nebo odvozené z vašeho klientského softwaru. Tyto informace budeme uchovávat minimálně po dobu sedmi let podle požadavků programu důvěryhodného roota. Tyto informace budou uchovávány po dobu až deseti let.

Musíme být schopni prokázat veřejnosti, včetně těch, kteří se spoléhají na důvěryhodnost našich certifikátů, že naše služby fungují podle očekávání. V důsledku toho se může stát, že nebudeme moci odstranit informace včetně IP adres. Tyto informace mohou být zveřejněny různými způsoby, včetně veřejných rozhraní API, veřejných úložišť a/nebo veřejných diskusí.

Můžete mít možnost poskytnout kontaktní údaje, například e-mailovou adresu, pro účely servisu a obnovy účtu. Vaše kontaktní údaje nebudou zveřejněny a budou sdíleny pouze v souladu s níže uvedeným odstavcem „Vymáhání práva a polehčující okolnosti“. Poskytnutím své e-mailové adresy souhlasíte s tím, že od nás budete dostávat e-maily týkající se našich služeb. Z odběru e-mailů souvisejících se službami se můžete kdykoli odhlásit kliknutím na odkaz „unsubscribe“ v dolní části našich e-mailů nebo nás můžete kontaktovat na adrese privacy@abetterinternet.org. Vaše kontaktní údaje nebudeme používat k marketingovým nebo propagačním účelům.

Možná budete muset stáhnout klientský software z úložiště, které provozuje například Debian, Ubuntu, Red Hat nebo Github. Vaše interakce s takovým softwarovým úložištěm se řídí jeho vlastními zásadami ochrany osobních údajů a/nebo podmínkami používání.

## Návštěvník

Pokud jako návštěvník procházíte webové stránky ISRG, máte možnost přispět. Dary jsou zpracovávány našimi důvěryhodnými platebními partnery, jako jsou DonorBox, Stripe, Shopify a PayPal, v závislosti na zvolené platební metodě, a podle potřeby jsou ukládány do databáze Salesforce a Sage Intacct společnosti ISRG. Při darování shromažďujeme vaše jméno a e-mailovou adresu, a pokud nám ji poskytnete, také vaši poštovní adresu. Jakmile nám přispějete, použijeme vaše údaje pro účely našeho oprávněného záměru zpracovávat a spravovat váš příspěvek, včetně připomínek a obnovení sbírky. Vaše interakce s [DonorBox](https://donorbox.org/privacy), [Stripe](https://stripe.com/privacy/), [PayPal](https://www.paypal.com/us/webapps/mpp/ua/privacy-full), [Shopify](https://www.shopify.com/legal/privacy), [The Giving Block](https://thegivingblock.com/about/privacy-policy/), Gemini, [SHIPHERO](https://shiphero.com/privacy-data-policy/), [Salesforce](https://www.salesforce.com/company/privacy/) a [Sage Intacct](https://www.sageintacct.com/privacy_policy_website) se řídí jejich příslušnými zásadami ochrany osobních údajů. Neshromažďujeme ani neuchováváme žádné informace o kreditních kartách nebo bankovních údajích spojených s dary.

Můžete poskytnout svou e-mailovou adresu pro zasílání sdělení týkajících se projektů ISRG prostřednictvím registrace na webu ISRG a prostřednictvím dalších marketingových materiálů. Veškerá komunikace doručená prostřednictvím Salesforce a vaše interakce se [Salesforce](https://www.salesforce.com/company/privacy/) se řídí jejich zásadami ochrany osobních údajů. Vaši e-mailovou adresu můžeme příležitostně použít k zasílání personalizovaných sdělení týkajících se ISRG a našich projektů. Můžete požádat o odstranění své e-mailové adresy tak, že se odhlásíte v patičce našich e-mailů nebo nám napíšete na adresu press@abetterinternet.org

Pokud se zaregistrujete k používání fóra podpory komunity ISRG, řídí se vámi poskytnuté osobní údaje a vaše činnost v něm zásadami ochrany osobních údajů našeho poskytovatele hostingu a softwaru pro fórum, [Civilized Discourse Construction Kit](https://www.discourse.org/privacy). Prostřednictvím tohoto fóra podpory neshromažďujeme ani neuchováváme osobní údaje.

## Vaše údaje ani informace neprodáváme

Vaše údaje ani informace neprodáváme. To zahrnuje údaje a informace o předávající straně, odběrateli a návštěvníkovi.

## Žádosti orgánů činných v trestním řízení a polehčující okolnosti

V rozsahu, v jakém je máme k dispozici, můžeme za omezených okolností zpřístupnit vaše osobní údaje třetím stranám. Mezi takové okolnosti patří případy, kdy máme váš souhlas nebo kdy jsme v dobré víře přesvědčeni, že to vyžaduje zákon, například na základě soudního předvolání nebo jiného soudního či správního příkazu. Informace o obnově účtu můžeme také sdělit, pokud jsme v dobré víře přesvědčeni, že je to nezbytné k zabránění ztrátě života, zranění osob, poškození majetku nebo významné finanční újmě.

Pokud jsme ze zákona povinni zveřejnit informace, které jste nám poskytli, pokusíme se vás předem upozornit (pokud nám to není zakázáno nebo by to bylo zbytečné), že byla podána žádost o vaše informace, abychom vám dali příležitost vznést proti zveřejnění námitku. Toto oznámení se pokusíme poskytnout jakýmkoli rozumně proveditelným způsobem. Pokud proti žádosti o zpřístupnění informací nevznesete námitku, můžeme být ze zákona povinni vaše informace předat.

Kromě toho si vyhrazujeme právo, výhradně podle našeho uvážení, samostatně odmítnout některé žádosti (o přístup k informacím o uživatelích našich produktů a technologií), které považujeme za nevhodné.

## Jaká práva mají podle GDPR předávající strany, předplatitelé a návštěvníci z Evropského hospodářského prostoru a jak je mohu uplatnit?

Osobní údaje zpracováváme způsobem popsaným v těchto zásadách. Účel a zákonný základ pro zpracování informací je následující:

**Účel:** Zpracování informací o stavu certifikátu (OCSP)

**Právní základ:** Oprávněné zájmy

**Další informace:** Shromažďujeme a zpracováváme informace od předávajících stran, abychom mohli spolehlivě poskytovat informace o stavu certifikátu.

**Účel:** Poskytování služeb vydávání a správy certifikátů

**Právní základ:** Smlouva, oprávněné zájmy

**Další informace:** Informace od účastníků shromažďujeme a zpracováváme, abychom mohli poskytovat spolehlivé a bezpečné služby vydávání a správy certifikátů a abychom mohli veřejnosti prokázat, že naše služby fungují podle očekávání.

**Účel:** Poskytování informací návštěvníkům

**Právní základ:** Souhlas, oprávněné zájmy

**Další informace:** Informace od návštěvníků shromažďujeme a zpracováváme za účelem spolehlivého a efektivního poskytování informací prostřednictvím webu a e-mailu.

**Účel:** Zpracování dotazů na dary a sponzorství

**Právní základ:** Oprávněné zájmy

**Další informace:** Informace shromažďujeme a zpracováváme za účelem zpracování a podpory darů.

**Účel:** Zákonné povinnosti a polehčující okolnosti

**Právní základ:** Právní povinnost, oprávněné zájmy

**Další informace:** Informace můžeme shromažďovat a zpracovávat, abychom splnili zákonné povinnosti a pokud jsme v dobré víře přesvědčeni, že je to nezbytné k zabránění ztrátám na životech, zranění osob, škodám na majetku nebo významným finančním škodám.

Vezměte prosím na vědomí, že se může stát, že nebudeme moci odstranit informace včetně IP adres, protože tyto informace jsou nezbytné pro ostatní při určování důvěryhodnosti našich certifikátů. V některých případech můžeme zpracovávat osobní údaje na základě zákonné povinnosti nebo za účelem ochrany vašich životně důležitých zájmů nebo zájmů jiné osoby.

Vaše osobní údaje mohou být shromažďovány nebo předávány do jurisdikcí, kde my a naši poskytovatelé služeb ukládáme nebo zpracováváme údaje, včetně Spojených států. Tyto jurisdikce nemusí poskytovat stejnou úroveň ochrany údajů jako vaše jurisdikce, včetně EHP. Podnikli jsme kroky k zajištění toho, aby naši poskytovatelé služeb poskytovali odpovídající úroveň ochrany osobních údajů obyvatel EHP, a to i tím, že jsme uzavřeli smlouvy o zpracování údajů s použitím standardních smluvních doložek schválených Evropskou komisí nebo s použitím jiných ochranných opatření schválených Evropskou komisí. Máte právo získat podrobnosti o mechanismu, podle kterého jsou vaše osobní údaje předávány mimo EU, a to tak, že nám zašlete e-mail na níže uvedené kontaktní údaje.

Osoby nacházející se v Evropském hospodářském prostoru (EHP) mají určitá práva týkající se jejich osobních údajů, včetně práva na přístup, opravu nebo vymazání osobních údajů, které zpracováváme při používání našich stránek a služeb. Pokud jste fyzická osoba, která je předávající stranou, předplatitelem nebo návštěvníkem se sídlem v EHP, můžete:

- Vyžádat si e-mailem zprávu o osobních údajích na privacy@abetterinternet.org. Tato zpráva bude obsahovat osobní údaje, které o vás máme, a bude vám poskytnuta ve strukturovaném, běžně používaném a přenosném formátu. Vezměte prosím na vědomí, že před zveřejněním jakýchkoli informací si od vás můžeme vyžádat další informace k ověření vaší totožnosti.

- Požádat o opravu nebo vymazání svých údajů na adrese privacy@abetterinternet.org.

- Vznést námitku proti zpracování vašich údajů. Můžete nás požádat, abychom vaše údaje přestali používat, včetně používání vašich údajů k zasílání servisních e-mailů. Svůj souhlas se zasíláním servisních e-mailů můžete kdykoli odvolat kliknutím na odkaz „unsubscribe“, který najdete v e-mailech Let's Encrypt.

- Podat stížnost regulačnímu orgánu. Pokud se nacházíte v EHP a domníváte se, že jsme nedodrželi zákony o ochraně osobních údajů, máte právo podat stížnost u místního dozorového úřadu.

Chcete-li získat další informace nebo nahlásit problém s ochranou osobních údajů, obraťe se prosím na privacy@abetterinternet.org.
