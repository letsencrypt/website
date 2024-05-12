---
title: Jak to funguje
linkTitle: Jak funguje Let's Encrypt
slug: how-it-works
lastmod: 2019-10-18
show_lastmod: 1
---


Cílem Let's&nbsp;Encrypt a [protokolu ACME](https://tools.ietf.org/html/rfc8555) je umožnit nastavení serveru HTTPS a automatické získání důvěryhodného certifikátu prohlížeče bez zásahu člověka.  To se provádí spuštěním agenta, který spravuje certifikáty na webovém serveru.

Abychom pochopili, jak tato technologie funguje, projděme si proces nastavení stránky `https://example.com/` pomocí agenta spravujícího certifikáty, který podporuje Let's&nbsp;Encrypt.

Tento proces má dva kroky.  Nejprve se agent prokáže certifikační autoritě (CA), že webový server ovládá doménu.  Poté může agent žádat o certifikáty pro tuto doménu, obnovovat je a odebírat.

## Ověřování domén

Let's&nbsp;Encrypt identifikuje správce serveru pomocí veřejného klíče.  Při první interakci softwarového agenta s aplikací Let's&nbsp;Encrypt vygeneruje nový pár klíčů a prokáže certifikační autoritě Let's&nbsp;Encrypt, že server spravuje jednu nebo více domén.  To se podobá tradičnímu procesu certifikační autority, kdy se vytvoří účet a přidají se k němu domény.

Na začátku procesu se agent dotáže certifikační autority Let's Encrypt, co má udělat, aby prokázal, že ovládá server `example.com`.  Certifikační autorita Let's Encrypt se podívá na požadovaný název domény a vydá jednu nebo více sad výzev.   Jedná se o různé způsoby, kterými může agent prokázat kontrolu nad doménou.  Například certifikační autorita může dát agentovi na výběr z těchto možností:

* Zřízení záznamu DNS pod adresou `example.com`, nebo
* Poskytnutí prostředku HTTP pod známým URI na adrese `http://example.com/`

Spolu s výzvami poskytuje certifikační autorita Let's Encrypt také nonce, kterou musí agent podepsat svým párem soukromých klíčů, aby prokázal, že daný pár klíčů ovládá.

<div class="howitworks-figure">
<img alt="Vyžádat výzvy k ověření example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Softwarový agenta dokončí jednu z poskytnutých sad výzev.   Řekněme, že je schopen splnit druhou výše uvedenou úlohu: vytvoří soubor na zadané cestě na webu `http://example.com`.  Agent také podepíše poskytnutou nonce svým soukromým klíčem.  Jakmile agent dokončí tyto kroky, oznámí certifikační autoritě, že je připraven dokončit ověřování.

Poté je úkolem certifikační autority zkontrolovat, zda byly výzvy splněny.  Certifikační autorita ověří podpis na nonce a pokusí se stáhnout soubor z webového serveru a ujistí se, že má očekávaný obsah.

<div class="howitworks-figure">
<img alt="Žádost o oprávnění jednat za example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Pokud je podpis na nonce platný a výzvy jsou ověřeny, pak je agent identifikovaný veřejným klíčem oprávněn provádět správu certifikátů pro `example.com`.  Páru klíčů, který agent použil, říkáme například „autorizovaný pár klíčů“ pro `example.com`.


## Vydání a odvolání certifikátu

Jakmile má agent autorizovaný pár klíčů, je žádání o certifikáty, jejich obnovování a odvolávání jednoduché - stačí odesílat zprávy o správě certifikátů a podepisovat je autorizovaným párem klíčů.

Pro získání certifikátu pro doménu agent sestaví [žádost o podepsání certifikátu](https://tools.ietf.org/html/rfc2986) PKCS#10, která žádá certifikační autoritu Let's&nbsp;Encrypt o vystavení certifikátu pro `example.com` se zadaným veřejným klíčem.  Jako obvykle CSR obsahuje podpis soukromým klíčem odpovídajícím veřejnému klíči v CSR.  Agent také podepíše celý CSR autorizovaným klíčem pro `example.com`, aby certifikační autorita Let's&nbsp;Encrypt věděla, že je autorizovaná.

Když certifikační autorita Let's&nbsp;Encrypt obdrží požadavek, ověří oba podpisy.  Pokud vše vypadá v pořádku, vydá certifikát pro `example.com` s veřejným klíčem z CSR a vrátí jej agentovi.

<div class="howitworks-figure">
<img alt="Žádost o certifikát pro example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Odvolání funguje podobně.  Agent podepíše žádost o odvolání s párem klíčů autorizovaným pro `example.com` a certifikační autorita Let's&nbsp;Encrypt ověří, zda je žádost autorizovaná.  Pokud ano, zveřejní informace o odvolání do běžných kanálů odvolání (tj. OCSP), aby spoléhající se strany, jako jsou prohlížeče, věděly, že by odvolaný certifikát neměly přijmout.

<div class="howitworks-figure">
<img alt="Žádost o odvolání ceritfikátu pro example.com"
     src="/images/howitworks_revocation.png"/>
</div>

