---
title: Zneplatnění certifikátů
slug: revoking
lastmod: 2025-07-31
show_lastmod: 1
---


Jakmile přestane být používání certifikátu bezpečné, měli byste jej zneplatnit. Může k tomu dojít z několika důvodů. Soukromý klíč například můžete omylem zveřejnit na webu, útočníci jej mohou zkopírovat z vašich serverů nebo mohou dočasně ovládnout vaše servery či nastavení DNS a využít je k ověření a vydání certifikátu, k němuž vlastní soukromý klíč.

Když zneplatníte certifikát Let's Encrypt, může Let's Encrypt zveřejnit údaje o jeho zneplatnění v [seznamech zneplatněných certifikátů (CRL)](https://en.wikipedia.org/wiki/Certificate_revocation_list). Některé prohlížeče podle těchto seznamů kontrolují, zda mají certifikátu důvěřovat. Zneplatnění certifikátů, jejichž soukromé klíče byly kompromitovány, je důležitý bezpečnostní postup a vyžaduje je také [Smlouva s odběratelem](/repository) Let's Encrypt.

Certifikát zneplatníte prostřednictvím [rozhraní API protokolu ACME](https://github.com/letsencrypt/boulder/blob/main/docs/acme-divergences.md), nejčastěji pomocí klienta ACME, jako je [Certbot](https://certbot.eff.org/). Organizaci Let's Encrypt musíte prokázat, že jste oprávněni certifikát zneplatnit. Můžete to udělat třemi způsoby: z účtu, který certifikát vydal, pomocí jiného oprávněného účtu nebo pomocí soukromého klíče certifikátu.

# Uvedení kódu důvodu

Odběratelé Let's Encrypt by při zneplatnění certifikátu měli vybrat kód důvodu podle následujících pravidel:

* Bez uvedení důvodu nebo `unspecified` (RFC 5280 CRLReason #0)
  - Pokud se na žádost o zneplatnění nevztahuje žádný z níže uvedených důvodů, odběratel nesmí uvést jiný kód než „unspecified“.
* `keyCompromise` (RFC 5280 CRLReason #1)
  - Odběratel certifikátu musí vybrat důvod zneplatnění „keyCompromise“, pokud má důvod se domnívat, že byl soukromý klíč jeho certifikátu kompromitován, například k němu získala přístup neoprávněná osoba.
  - Pokud je žádost o zneplatnění podepsána soukromým klíčem certifikátu, nikoli soukromým klíčem účtu odběratele, může Let's Encrypt důvod uvedený v žádosti ignorovat a nastavit jej na „keyCompromise“.
* `superseded` (RFC 5280 CRLReason #4)
  - Odběratel certifikátu by měl vybrat důvod zneplatnění „superseded“, pokud žádá o nový certifikát, který má nahradit stávající certifikát.
* `cessationOfOperation` (RFC 5280 CRLReason #5)
  - Odběratel certifikátu by měl vybrat důvod zneplatnění „cessationOfOperation“, pokud už nevlastní všechny doménové názvy uvedené v certifikátu nebo certifikát přestane používat, protože ruší svůj web.
  - Pokud žádost o zneplatnění podá účet odběratele, který daný certifikát neobjednal, ale prokázal kontrolu nad všemi identifikátory v certifikátu, může Let's Encrypt důvod uvedený v žádosti ignorovat a nastavit jej na „cessationOfOperation“.

Žádosti o zneplatnění s jiným kódem důvodu, než jsou kódy uvedené výše, budou zamítnuty.

# Z účtu, který certifikát vydal

Pokud jste si certifikát původně nechali vydat a stále ovládáte účet použitý k jeho vydání, můžete jej zneplatnit pomocí přihlašovacích údajů k tomuto účtu. Certbot se o tento postup pokusí ve výchozím nastavení. Příklad:

```bash
certbot revoke --cert-path /etc/letsencrypt/archive/${YOUR_DOMAIN}/cert1.pem
```

# Pomocí jiného oprávněného účtu

Pokud někdo po napadení vašeho serveru nebo DNS vydal certifikát, měli byste jej po obnovení kontroly zneplatnit. Let's Encrypt se musí před zneplatněním certifikátu ujistit, že ovládáte doménové názvy, které obsahuje. Jinak by mohl kdokoli bez svolení zneplatňovat cizí certifikáty.

Let's Encrypt ověřuje tuto kontrolu stejnými metodami jako při vydávání certifikátů: můžete vložit [hodnotu do záznamu DNS TXT](https://tools.ietf.org/html/rfc8555#section-8.4) nebo umístit [soubor na server HTTP](https://tools.ietf.org/html/rfc8555#section-8.3). Obvykle se o to postará klient ACME. Většina klientů ACME spojuje ověření s vydáním certifikátu, takže o samotné ověření lze požádat jen pokusem o vydání certifikátu. Výsledný certifikát pak můžete zneplatnit, pokud jej nechcete, nebo jednoduše zničit soukromý klíč.

Chcete-li se vydání certifikátu zcela vyhnout, přidejte do příkazového řádku neexistující doménový název. Vydání certifikátu selže, ale ostatní existující doménové názvy se přesto ověří. Příklad:

```bash
certbot certonly --manual --preferred-challenges=dns -d ${YOUR_DOMAIN} -d nonexistent.${YOUR_DOMAIN}
```

Poté postupujte podle pokynů, ale přeskočte krok ověření domény `nonexistent.${YOUR_DOMAIN}`. Chcete-li místo DNS použít ověření přes HTTP, nahraďte přepínač `--preferred-challenges` přepínačem `--preferred-challenges=http`. Varianta tohoto postupu s DNS v mnoha případech nebude fungovat, pokud přepínač `--manual` nahradíte pluginem Certbotu pro automatické plnění výzev DNS-01. Má-li k tomu oprávnění, Certbot totiž bez potíží vloží záznam TXT na adresu `_acme-challenge.nonexistent.${YOUR_DOMAIN}`.

Po ověření kontroly nad všemi doménovými názvy v certifikátu, který chcete zneplatnit, můžete certifikát stáhnout z webu [crt.sh](https://crt.sh/) a poté jej zneplatnit stejným postupem, jako byste jej sami vydali:

```bash
certbot revoke --cert-path /PATH/TO/downloaded-cert.pem
```

# Pomocí soukromého klíče certifikátu

Pokud jste certifikát původně nevydali, ale máte kopii příslušného soukromého klíče, můžete certifikát zneplatnit tak, že tímto klíčem podepíšete žádost o zneplatnění. Zjistíte-li například, že byl soukromý klíč omylem zveřejněn, můžete touto metodou zneplatnit certifikáty, které jej používaly, i když jste je původně nevydali vy.

Nejprve budete potřebovat kopii soukromého klíče ve formátu PEM.

Pokud ještě nemáte certifikát, který chcete zneplatnit, stáhněte si jej. Let's Encrypt zaznamenává všechny certifikáty do logů [transparentnosti certifikátů](https://www.certificate-transparency.org/). Certifikáty proto můžete vyhledat a stáhnout pomocí nástroje pro sledování logů, například [crt.sh](https://crt.sh/). Vyhledáním odpovídajícího pole `SubjectPublicKeyInfo` (SPKI) najdete všechny certifikáty, které používají daný soukromý klíč. Hash SPKI ze soukromého klíče získáte takto:
```bash
openssl pkey -outform DER -in /PATH/TO/privkey.pem -pubout | openssl sha256
```

Máte-li soukromý klíč i certifikát, můžete certifikát zneplatnit následujícím příkazem:

```bash
certbot revoke --cert-path /PATH/TO/cert.pem --key-path /PATH/TO/privkey.pem --reason keyCompromise
```
