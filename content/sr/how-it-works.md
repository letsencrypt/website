---
title: Kako funkcioniše?
linkTitle: Kako Let's Encrypt funkcioniše?
slug: how-it-works
top_graphic: 3
lastmod: 2019-09-09
show_lastmod: 1
---


Cilj Let's&nbsp;Encrypt-a i [ACME protokola](https://tools.ietf.org/html/rfc8555) je da omogući konfigurisanje HTTPS servera i automatsko dobijanje sertifikata koji je pouzdan web pretraživačima , bez ikakve ljudske intervencije. To se postiže korišćenjem i  pokretanjem agenta za upravljanje sertifikatima na samom web serveru.

Da bi ste razumeli kako tehnologija i ceo proces funkcioniše, proći ćemo sa Vama kroz ceo postupak konfigurisanja `https://example.com/` sa agentom za upravljanje sertifikatima koji podržava Let's&nbsp;Encrypt.

Postoje dva koraka u ovom procesu.  Prvi proces, gde agent dokazuje sertifikacionom telu (CA) da web server kontroliše dotični domen. Zatim, agent može zatražiti novi, obnoviti, ili poništiti postojeće sertifikate za taj konkretni domen.

## Verifikacija domena

Let's&nbsp;Encrypt indentifikuje administratora servera putem javnog ključa (public key). Agent, tokom prve interakcije sa Let's&nbsp;Encrypt-om generiše novi par ključeva i dokazuje kod Let's&nbsp;Encrypt sertifikacionog tela (CA) da server kontroliše jedan ili više domena.  Ovo je jako slično sa tradicionalnim procesom sertifikacionog tela tokom kreiranja naloga i dodavanja domena u taj konkretan nalog.

Kako bih otpočeo sam proces, agent pita Let's Encrypt sertifikaciono telo (CA) šta treba da uradi kako bih dokazao da kontroliše domen `example.com`.  Tada će Let's Encrypt sertifikaciono telo (CA) pregledati domen i ponuditi jedan ili više načina za verifikaciju. Postoje različiti načini kako agent može da potvrdi vlasništvo nad domenom. Na primer, sertifikaciono telo (CA) može ponuditi agentu neke od sledećih načina verifikacije domena:

* Provizionisanje specifičnog DNS upisa unutar `example.com`, ili
* Provizionisanje specifičnog HTTP resursa (stranice) unutar "well-known URI" na serveru gde je vezan `http://example.com/`

Uz dostupne načine verifikacije, Let's Encrypt sertifikaciono telo (CA) takođe daje naznaku da agent mora potpisati sa svojim privatnim parom ključeva kako bi dokazao da kontroliše par javnih ključeva.

<div class="howitworks-figure">
<img alt="Requesting challenges to validate example.com"
     src="/images/howitworks_challenge.png"/>
</div>

Agentski softver završava verifikaciju jednim od ponuđenih načina. Recimo da je u stanju izvršiti verifikaciju koristeći drugi naveden način iznad: kreira datoteku na određenoj putanji na web serveru `http://example.com`. Agent takodje potpisuje svoj privatni ključ. Nakon što agent izvrši ove korake, obaveštava sertifikaciono telo (CA) da je spreman za potpunu proveru.

Nakon toga, posao sertifikacionog tela (CA) jeste da proveri da li su uslovi i verifikacija zadovoljena. Sertifikaciono telo (CA) proverava potpis bez prijave i pokušava da preuzme prethodno kreiranu datoteku s web servera i uveriti se da ima očekivani sadržaj.

<div class="howitworks-figure">
<img alt="Requesting authorization to act for example.com"
     src="/images/howitworks_authorization.png"/>
</div>

Ako je potpis dobar, a verifikacija validna, tada je agent koji je identifikovan javnim ključem ovlašćen za upravljanje sertifikatom za domen `example.com`.


## Izdavanje i poništavanje sertifikata

Jednom kada agent ima autorizovani par ključeva, potraživanje, obnova i poništavanje sertifikata je jednostavna---potrebno je samo poslati određene poruke menadžeru za sertifikate i potpisati iste sa autorizovanim parom ključeva.

Kako bi dobili sertifikat za domen, agent pravi PKCS#10 [Certificate Signing Request](https://tools.ietf.org/html/rfc2986) koji pita Let's&nbsp;Encrypt sertifikaciono telo (CA) da izda sertifikat za domen `example.com` sa specifičnim javnim ključem (public key). Obično, CSR sadrži potpise od strane privatnog ključa relevantnom javnom ključu unutar CSR-a.  Agent takođe potpisuje ceo CSR zajedno sa autorizovanim ključem za `example.com` tako da Let's&nbsp;Encrypt sertifikaciono telo (CA) zna da je autorizovano.

Kada Let's&nbsp;Encrypt sertifikaciono telo (CA) primi zahtev, ono onda verifikuje oba potpisa.  Ukoliko sve deluje u redu, sertifikaciono telo izdaje sertifikat za  `example.com` zajedno sa javnim ključem (public key) od CSR-a i dostavlja sertifikat agentu.

<div class="howitworks-figure">
<img alt="Requesting a certificate for example.com"
     src="/images/howitworks_certificate.png"/>
</div>

Poništavanje sertifikata funkcioniše na sličan način. Agent potpisuje zahtev za poništavanje sertifikata svojim javnim ključem za domen  `example.com`, gde nakon toga Let's&nbsp;Encrypt sertifikaciono telo (CA) verifikuje da je zahtev legitiman i odobren.  Ukoliko da, onda objavljuje informaciju o poništavanju sertifikata putem standardnih kanala (primer. OCSP), tako da zavisni partneri budu obavešteni o tome kao što su web pretraživači u cilju kako bih znali da više ne prihvataju taj konkretan sertifikat kao validan.

<div class="howitworks-figure">
<img alt="Requesting revocation of a certificate for example.com"
     src="/images/howitworks_revocation.png"/>
</div>
