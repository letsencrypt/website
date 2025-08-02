---
title: Jak to funguje
linkTitle: Jak funguje Let's Encrypt
slug: how-it-works
lastmod: 2025-07-31
show_lastmod: 1
---

Cílem Let's Encrypt a [protokolu ACME](https://tools.ietf.org/html/rfc8555) je umožnit nastavení serveru HTTPS a automatické získání důvěryhodného certifikátu prohlížeče bez zásahu člověka. Toho se dosáhne spuštěním klienta ACME na webovém serveru.

Abychom pochopili, jak tato technologie funguje, projdeme si proces nastavení `https://example.com/` s klientem ACME.

Tento proces má dva kroky. Nejprve klient ACME prokáže [certifikační autoritě](https://simple.wikipedia.org/wiki/Certificate_authority) (CA), že webový server ovládá doménu. Poté může agent žádat o certifikáty pro tuto doménu, obnovovat je a odebírat.

## Ověřování domén

Let's Encrypt identifikuje klientský software ACME pomocí [veřejného klíče](https://simple.wikipedia.org/wiki/Public-key_cryptography). Při první interakci klienta ACME s Let's Encrypt se vygeneruje nový pár klíčů účtu a ověří se certifikační autoritě Let's Encrypt, že provozovatel spravuje jednu nebo více domén. To se podobá tradičnímu procesu certifikační autority, kdy se vytvoří účet a přidají se k němu domény.

Na začátku procesu se klient zeptá certifikační autority Let's Encrypt, co musí udělat, aby prokázal, že spravuje doménu `example.com`. Certifikační autorita Let's Encrypt se podívá na požadovaný název domény a vydá jednu nebo více sad výzev. Klient může prokázat kontrolu nad doménou různými způsoby. Například CA může klientovi nabídnout jednu z následujících možností:

* Zřízení záznamu DNS pod adresou `example.com`, nebo
* Poskytnutí prostředku HTTP pod známým URI na adrese `http://example.com/`

<div class="howitworks-figure">
<img alt="Vyžádat výzvy k ověření example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Klientský software dokončí jednu z poskytnutých sad úkolů. Řekněme, že je schopen splnit druhou výše uvedenou úlohu: vytvoří soubor na zadané cestě na webu `http://example.com`. Jakmile klient dokončí tyto kroky, oznámí certifikační autoritě, že je připraven dokončit ověření.

Úkolem CA je pak zkontrolovat, zda byly výzvy splněny z [více perspektiv sítě](/2020/02/19/multi-perspective-validation).

<div class="howitworks-figure">
<img alt="Žádost o oprávnění jednat za example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Pokud jsou výzvy splněny, je klient identifikovaný veřejným klíčem oprávněn provádět správu certifikátů pro `example.com`.


## Vydání a odvolání certifikátu

Jakmile je klient autorizován, jsou žádosti o certifikáty, jejich obnovování a rušení velmi jednoduché – stačí odeslat zprávy pro správu certifikátů a podepsat je pomocí autorizovaného páru klíčů účtu.

### Vydání

To obtain a certificate for the domain, the agent constructs a PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) (CSR) that asks the Let's Encrypt CA to issue a certificate for `example.com` with a specified public key. Jako obvykle CSR obsahuje podpis soukromým klíčem odpovídajícím veřejnému klíči v CSR. Agent také podepisuje celý CSR autorizovaným klíčem pro `example.com`, aby certifikační autorita Let's Encrypt věděla, že je autorizován.

Když certifikační autorita Let's Encrypt obdrží požadavek, ověří oba podpisy. Pokud vše vypadá v pořádku, vydá certifikát pro `example.com` s veřejným klíčem z CSR a vrátí jej agentovi. CA také odešle certifikát do mnoha veřejných protokolů transparentnosti certifikátů (CT). Více informací najdete [zde](https://certificate.transparency.dev/howctworks/#pki).

<div class="howitworks-figure">
<img alt="Žádost o certifikát pro example.com"
     src="/images/howitworks_certificate.png"/>
</div>

### Zrušení

Odvolání funguje podobně. Klient podepíše žádost o zrušení pomocí páru klíčů účtu autorizovaného pro `example.com` a certifikační autorita Let's Encrypt ověří, že žádost je autorizovaná. Pokud ano, zveřejní informace o zrušení prostřednictvím [seznamu zrušených certifikátů](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), aby se spoléhající strany, jako jsou prohlížeče, dozvěděly, že by neměly přijímat zrušený certifikát.

<div class="howitworks-figure">
<img alt="Žádost o odvolání ceritfikátu pro example.com"
     src="/images/howitworks_revocation.png"/>
</div>
