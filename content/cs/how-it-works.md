---
title: Jak to funguje
linkTitle: Jak funguje Let's Encrypt
slug: how-it-works
lastmod: 2025-08-02
show_lastmod: 1
---

Cílem Let's Encrypt a [protokolu ACME](https://tools.ietf.org/html/rfc8555) je umožnit nastavení serveru HTTPS a automatické získávání certifikátů důvěryhodných pro prohlížeče bez jakéhokoli zásahu člověka. Toho se dosáhne spuštěním ACME klienta na webovém serveru.

Abychom pochopili, jak tato technologie funguje, projdeme si proces nastavení `https://example.com/` s klientem ACME.

Tento proces má dva kroky. Nejprve klient ACME prokáže [certifikační autoritě](https://wikipedia.org/wiki/Certificate_authority) (CA), že webový server ovládá doménu. Poté může klient požádat o certifikáty pro danou doménu nebo je zrušit.

## Ověřování domén

Let's Encrypt identifikuje klientský software ACME pomocí [veřejného klíče](https://wikipedia.org/wiki/Public-key_cryptography). Při první interakci klienta ACME s Let's Encrypt se vygeneruje nový pár klíčů účtu a ověří se certifikační autoritě Let's Encrypt, že provozovatel spravuje jednu nebo více domén. To se podobá tradičnímu procesu certifikační autority, kdy se vytvoří účet a přidají se k němu domény.

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

Upozorňujeme, že tento proces nemůže používat protokol HTTPS, což ho činí zranitelným vůči určitým útokům. Aby se tento problém zmírnil, provádí Let's Encrypt ve skutečnosti několik ověření současně z různých síťových perspektiv. To výrazně ztěžuje útočníkovi úspěšné narušení procesu ověřování.

## Vydání a odvolání certifikátu

Jakmile je klient autorizován, jsou žádosti o certifikáty, jejich obnovování a rušení velmi jednoduché – stačí odeslat zprávy pro správu certifikátů a podepsat je pomocí autorizovaného páru klíčů účtu.

### Vydání

Aby klient získal certifikát pro doménu, vytvoří [žádost o podpis certifikátu](https://tools.ietf.org/html/rfc2986) (CSR) PKCS#10, která požádá certifikační autoritu Let's Encrypt o vydání certifikátu pro `example.com` s určeným veřejným klíčem. Jako obvykle CSR obsahuje podpis soukromým klíčem odpovídajícím veřejnému klíči v CSR. Klient také podepíše celý CSR autorizovaným klíčem pro `example.com`, aby certifikační autorita Let's Encrypt věděla, že je autorizovaný.

Když certifikační autorita Let's Encrypt obdrží požadavek, ověří oba podpisy. Pokud vše vypadá v pořádku, vystaví certifikát pro `example.com` s veřejným klíčem z CSR a vrátí jej klientovi. CA také odešle certifikát do mnoha veřejných protokolů transparentnosti certifikátů (CT). Více informací najdete [zde](https://certificate.transparency.dev/howctworks/#pki).

<div class="howitworks-figure">
<img alt="Žádost o certifikát pro example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Obnovení certifikátu v pozdějším termínu znamená opakování celého procesu vydávání – provedení ověření domény a následnou žádost o nový certifikát.

### Zrušení

Odvolání funguje podobně. Klient podepíše žádost o zrušení pomocí páru klíčů účtu autorizovaného pro `example.com` a certifikační autorita Let's Encrypt ověří, že žádost je autorizovaná. Pokud ano, zveřejní informace o zrušení prostřednictvím [seznamu zrušených certifikátů](https://en.wikipedia.org/wiki/Certificate_revocation_list) (CRL), aby se spoléhající strany, jako jsou prohlížeče, dozvěděly, že by neměly přijímat zrušený certifikát.

<div class="howitworks-figure">
<img alt="Žádost o odvolání ceritfikátu pro example.com"
     src="/images/howitworks_revocation.png"/>
</div>
